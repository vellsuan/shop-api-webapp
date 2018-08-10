'use strict'
var Base = require('../controller/base/baseAction.js');
var utils = require('../utils/utils.js');
var log = require("../utils/logUtil.js")("/controllers/render");
var config = require("../config/config.js");

module.exports = () => {
    return async(ctx, next) => {
        ctx.html = async function(viewName, data, opt) {
            if(!data){
                data = {};
            }
            data.tools = utils;
            data.Util = utils;
            var userInfo = Base.getUserInfo(ctx);

            //匹配域名URL正则表达式
            var urlReg = /(https?|ftp|file):\/\/[-A-Za-z0-9+&@#\/%?=~_|!:,.;]+[-A-Za-z0-9+&@#\/%=~_|]/;
            if(userInfo && userInfo.user && userInfo.user.userImg && !urlReg.test(userInfo.user.userImg)){ //未匹配到微信头像域名
                userInfo.user.userImg = config.IMG_URL + userInfo.user.userImg;
            }
            if(userInfo) data.userInfo = userInfo;
		    data.ServerPath = config.ServerPath||{};
		    data.isShowWchetHeader = true;
            await ctx.render(viewName, data, opt);
        }
        await next();
    }
}