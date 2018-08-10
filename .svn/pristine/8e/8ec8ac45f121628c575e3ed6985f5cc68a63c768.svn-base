'use strict'

var Base = require('../controller/base/baseAction.js');
var utils = require('../utils/utils.js');
var log = require("../utils/logUtil.js")("/controllers/koa1_render");

module.exports = function(app) {
	app.context.html = function *(viewName,data,opt){
	    if(!data){
	        data = {};
	    }
        data.tools = utils;
	    var userInfo = Base.getUserInfo(this);
	    var afternoonMark = Base.getSessionData(this.session, "sessionConstant_afternoonMark") || false;

	    //匹配域名URL正则表达式
	    var urlReg = /(https?|ftp|file):\/\/[-A-Za-z0-9+&@#\/%?=~_|!:,.;]+[-A-Za-z0-9+&@#\/%=~_|]/;
	    if(userInfo && userInfo.user && userInfo.user.userImg && !urlReg.test(userInfo.user.userImg)){ //未匹配到微信头像域名
	    	userInfo.user.userImg = config.IMG_URL + userInfo.user.userImg;
	    }
	    if(userInfo) data.userInfo = userInfo;
	    data.afternoonMark = afternoonMark;
	    yield this.render(viewName, data,opt);
	}
}