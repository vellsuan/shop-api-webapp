'use strict'
var Base = require('./baseAction.js');
var log = require("../../utils/logUtil.js")("loginAction");

/**
 * 微信小程序登录
 * @param next
 */
exports.loginMiniProgrom = async(ctx, next) => {
    var params = Base.getParams(ctx);
    // var jscode = params.code;
    var code =  params.code;
    var jsondata = await Base.loginService.miniLogin({'code':code});

    var rawData = params.rawData && JSON.parse(params.rawData) || {};
 
    var data={
        nickName:rawData.nickName||'',
        sex:rawData.gender || '',
        userImg:rawData.avatarUrl,
        unionid:jsondata.openid, 
        realUnionid:jsondata.unionid || jsondata.openid   //必传，测试环境未在微信开放平台（open.weixin.qq.com）绑定公众号，无法获取unionid
    }
    var userdata = await Base.loginService.wxLogin(data);
    if(userdata.code=="000000"){
        Base.saveSessionData(ctx.session,"sessionConstant_userInfo",userdata.result.user);
    }
    Base.getResponseRes(ctx,userdata)
}

/**
 * 微信公众号登录
 * @param next
 */
var loginWx = async(request, userinfo) => {
    var data = {
        "nickName": userinfo.nickname || "",
        "sex": userinfo.sex,
        "unionid": userinfo.openid,
        "userImg": userinfo.headimgurl || "http://weixin.brunocaffe.cn/images/headPortrait.png"
    };
    var userdata = await Base.loginService.wxLogin(data);
    
    if (userdata&&userdata.result&&userdata.result.user) {
        userdata = userdata.result;
        var data = await Base.tokenService.checkAndIssueToken(request, userdata.user);
        if (data && data.userId) {
            userdata.token = data.token || "";
            userdata.user.loginPwd = "1q2w3e4r5t";
           // await Base.userService.userUpdate(userdata.user);
            userdata.user.loginPwd = "";
            userdata = { "code": "000000", "message": "业务处理成功！", "result": userdata };
        } else {
            userdata = { "code": "222222", "message": "系统异常！", "result": {} };
        }
    } else {
        userdata = { "code": "222222", "message": userdata.message || "系统异常！", "result": {} };
    }
    return userdata
}
exports.loginWx = loginWx;