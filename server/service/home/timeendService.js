'use strict'

var User = require("../../model/base/User.js");
var tools = require("../../utils/utils.js");
var sendRequest = require("../../utils/httpClient.js");
//CARD0107
exports.timeendService = async (data)=>{
    var obj = await sendRequest(data||{},"PRXH00005","POST");
    var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
	return jsondata;
}

