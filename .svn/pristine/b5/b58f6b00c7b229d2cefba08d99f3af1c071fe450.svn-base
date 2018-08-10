var tokenService = require("./../service/base/tokenService.js");
var Base = require('./../controller/base/baseAction.js');
var loginAction = require('./../controller/base/loginAction.js');
var Wechat = require("../wechat-api/Wechat.js");
var log = require("../utils/logUtil.js")("/middleware/auth");
const convert = require('koa-convert');

exports.isAuthenticated = async(ctx, next) => {
    var isToken = await tokenService.verifyToken(ctx.cookies);
    if (config.ServiceUserDemo) {
        userdata = require("../../mock/CU100015.json");
        console.log("../../mock/CU100015.json  ======>" + JSON.stringify(userdata));
        var userinfo = userdata.result || {};
        Base.saveSessionData(ctx, "sessionConstant_userInfo", userinfo);
        isToken = true
    }
    var userinfo = Base.getUserInfo(ctx);
    if (!userinfo || !userinfo.user || !userinfo.user.userId || !isToken) {
        Base.clearLoginData(ctx);
        await  ctx.redirect("http://m1.qijuntai.com/page404.html");
        return;
    }
    await next();
};

exports.is2Wex = async(ctx, next) => {
    var that = ctx;
    var parms = that.request.query;
    var userdata = {};
    if (config.ServiceUserDemo) {
        userdata = require("../../mock/CU100015.json");
        console.log("../../mock/CU100015.json  ======>" + JSON.stringify(userdata));
    } else {
        if (parms && parms.code) {
        		var wxCode = Base.getSessionData(that.session,"wechat_code")||"";
        		if(wxCode == parms.code){
        			log.info({ "message": "微信code重复使用","code":wxCode });
        			Base.getResponseRes(ctx.request, { "message": "微信code重复使用！" });
        			await next();
        			return;
        		}
        		Base.saveSessionData(that, "wechat_code", parms.code);
            var wechat = Wechat.getWechat();
            var wxdata = await wechat.getWebUserInfo(parms.code);
            if(!wxdata.openid){
            		log.info({ "message": "微信code重复使用","info":wxdata });
        			Base.getResponseRes(ctx.request, { "message": wxdata });
        			await next();
        			return;
            }
            userdata = await loginAction.loginWx(that.request, wxdata);
            if(userdata.code !="000000"){
            		await  ctx.redirect("http://m1.qijuntai.com/page404.html");
            		return;
            }
            Base.clearLoginData(that);
        } else {
            userdata.result = Base.getUserInfo(that);
        }
    }
    var userinfo = userdata.result || {};
    that.cookies.set('authorization', userinfo.token || "a4539a6eafd2dd44902830deaf5d68159f67b799", { signed: true });
    Base.saveSessionData(that, "sessionConstant_userInfo", userinfo);
    await next();
}
