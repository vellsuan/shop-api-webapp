'use strict'
var Base = require('./baseAction.js');
var config = require('../../config/config.js');


exports.getServStatic = async(ctx, next) => {
    var json = { "code": "000000", "message": "业务处理成功", "result": config.ServerPath };
    var userInfo = Base.getSessionData(ctx.session, "sessionConstant_userInfo");
    json.result.user = userInfo && userInfo.user || {};
    Base.getResponseRes(ctx, json);
}

//获取系统时间戳
exports.getSystemTime = async(ctx, next) => {
    var sysTimeThamp = new Date().getTime();
    var json = { "code": "000000", "message": "业务处理成功", "result": { "sysTime": sysTimeThamp } };
    Base.getResponseRes(ctx, json);
}