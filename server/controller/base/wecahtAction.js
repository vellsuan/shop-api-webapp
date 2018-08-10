'use strict'

var log = require("../../utils/logUtil.js")("/controller/base/wecahtAction");
var Base = require('./baseAction.js');
var sha1 = require("sha1");
var getRawBody = require("raw-body");
var utils = require("../../utils/utils.js");
var Wechat = require("../../wechat-api/Wechat.js");

var wechat = Wechat.getWechat();
var config = require("../../wechat-api/config.js");

module.exports.wxHandler = function(opts,handler){
   return  function *(next){
        //var wechat = Wechat.getWechat();
        var token = config.wechat.Token;
        var signature = this.query.signature;
        var timestamp = this.query.timestamp;
        var nonce = this.query.nonce;
        var echostr = this.query.echostr;
        var str=[token,timestamp,nonce].sort().join("");
        var sha = sha1(str);
        if(sha !== signature){
            this.body =  "";
            return false;
        }
       	//this.body =  "true";
        if(this.method ==="GET"){
            if(sha === signature){
                this.body = echostr+'';
            }
        }else if(this.method ==="POST"){
            var data = yield getRawBody(this.req,{
                length:this.length,
                limit:'1mb',
                encoding:this.charset
            });
            var content = yield utils.parseXMLAsync(data);
            var message = yield utils.formatMessage(content.xml);
            this.wxMessage = message;
            yield handler.call(this,next);
            wechat.reply.call(this);
        }
    }
}

/**
 * 用户授权登录
 * @returns {Function}
 */
module.exports.wxAauth2 = function(){
    return  function *(next){
        var parms = this.request.query||"";
        var state="STATE"
        var redirect_uri = config.api.redirect_uri;
        if(parms&&parms.id){
            redirect_uri ="http://weixin.brunocaffe.cn/usercenter/takecoffee";
            state =parms.id+"||"+parms.orderId+"||"+parms.num
        }
        var appid = config.wechat.appID;
        var url = config.api.authorize+"&state="+state+"&appid="+appid+"&redirect_uri="+redirect_uri+"#wechat_redirect";
        this.redirect(url);
    }
}

/**
 * 授权微信jssdk
 * @returns {Function}
 */
module.exports.wxAauthSDK = function(){
    return  function *(next){
        var parms = this.request.body;
        var json = {};
        var data = yield wechat.getTicket();
        data = data&&JSON.parse(data);
        var jsApiTicket = data.ticket;
        json.nonceStr = utils.createNonceStr();
        json.timestamp = utils.createTimestamp();
        var url = decodeURIComponent(parms.url);
        var sortData = "jsapi_ticket=" + jsApiTicket + "&noncestr=" + json.nonceStr + "&timestamp=" + json.timestamp + "&url=" + url;
        json.signature = sha1(sortData);
        json.appid = config.wechat.appID;
        Base.getResponseRes(this,{result:json});
    }
}

/**
 *微信支付
 * @returns {Function}
 */
module.exports.wxPay = function(){
    return  function *(next){
        var reqdata = this.request.body||{};
        reqdata["device_info"] = "web";
        reqdata["trade_type"] = "JSAPI";
        reqdata["spbill_create_ip"] = Base.getClientIp(this.request);
        var userdata =  Base.getSessionData(this.session,"sessionConstant_userInfo");
        var userinfo = userdata&&userdata.user||{};
        reqdata["openid"] = userinfo.unionid || "";
        var rsdata = "";
        var payType = reqdata["payType"]||"pay";
        if(payType === "pay"){
            reqdata["body"] = "订单支付";
            reqdata["accountType"] = "5";  //：账户类型：1电子账户 2.押金账户 3.理财账户 4.现金 5.其他
            rsdata = yield Base.payService.weixinPay(reqdata);
        }else if(payType ==="full"){
            reqdata["body"] = "充值";
            reqdata["userId"] = userinfo.userId || "";
            reqdata["accountType"] = "1";  //：账户类型：1电子账户 2.押金账户 3.理财账户 4.现金 5.其他
            rsdata = yield Base.payService.weixinFull(reqdata);
        }
        var result = rsdata.result|| {};
        result.payType = payType||"pay";
        rsdata.result = result;
        Base.getResponseRes(this,rsdata);
    }
}



