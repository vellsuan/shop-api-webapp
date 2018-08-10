'use strict'

var Token = require("../../model/base/Token.js");
var sendRequest = require("../../utils/httpClient.js");

exports.isValdateLoginReToken = function*(userID, deviceID) {
	var token = Token.findOne({
		userID: userID,
		deviceID: deviceID
	}).exec();
	if(token) {
		return true;
	} else {
		return false;
	}
}


exports.miniLogin = async (data) => {
	
	let rsdata = {code:"222222",message:"系统错误",result:{}};
    try{
		var obj = await sendRequest(data || {}, `https://api.weixin.qq.com/sns/jscode2session?appid=wx01920c894d7f4973&secret=83a20d5f5573f67c4c84ca66e6d31cce&js_code=${data.code}&grant_type=authorization_code`, "get");
    }catch(e){
        console.log(e)
    }
    return  obj
}
exports.wxLogin = async (data) => {
	
	let rsdata = {code:"222222",message:"系统错误",result:{}};
    try{
		var obj = await sendRequest(data || {}, "/org/business/CU100015.do", "POST");
    }catch(e){
        console.log(e)
    }
    return  obj
}





/**
 * 第三方登录验证
 * @param {[type]} data          [description]
 * @yield {[type]} [description]
 */
exports.checkThirdLogin = function*(data){
	console.log(data)
	try{
        var obj = yield sendRequest(data|| {}, "/org/business/MU100003.do", "POST");
	}catch(e){
		  console.log(e)
	}
    console.log(obj)
	return obj;
}
/**
 * 第三方登录绑定
 * @param {[type]} data          [description]
 * @yield {[type]} [description]
 */
exports.bindThirdLogin = function*(data){
	//随机生成一串密码
	// data.loginPwd = [1,2,3,4,5,6,"a"].map(function(x){
	// 	return Math.floor(Math.random()*10)+x;
	// }).join("");
	var obj = yield sendRequest(data|| {}, "/org/business/MU100004.do", "POST");
	return obj;
 }
