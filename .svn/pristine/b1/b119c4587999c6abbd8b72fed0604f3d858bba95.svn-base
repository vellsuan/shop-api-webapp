"use strict";

/**
 * @author mm
 */
//var Token = require("../model/Token.js");
var log = require("../../utils/logUtil.js")("indexService.js");
var sendRequest = require("../../utils/httpClient.js");
var User = require("../../model/base/User.js");
var tools = require("../../utils/utils.js");

exports.indexBanner = async data => {
  var obj = await sendRequest(data || {}, "CM100111", "POST");
  var jsondata = {
    code: obj.code,
    message: obj.message,
    result: obj.result || []
  };
  return jsondata;
};

exports.brandlist = async data => {
  var obj = await sendRequest(data || {}, "PR104012", "POST");
  var jsondata = {
    code: obj.code,
    message: obj.message,
    result: obj.result || []
  };
  return jsondata;
};

// 楼层
exports.indexDevLi = async data => {
  var obj = await sendRequest(data || {}, "CM100010", "POST");
  var jsondata = {
    code: obj.code,
    message: obj.message,
    result: obj.result || []
  };
  return jsondata;
};

// 会员特权
exports.vipSpecProduct = async data => {
  var obj = await sendRequest(data || {}, "PM100000", "POST");
  var jsondata = {
    code: obj.code,
    message: obj.message,
    result: obj.result || []
  };
  return jsondata;
};

//搜索商品列表
exports.queryGoodsList = async data => {
  var obj = await sendRequest(data || {}, "PM100001", "POST");
  var jsondata = {
    code: obj.code,
    message: obj.message,
    result: obj.result || []
  };
  return jsondata;
};

// 获取门店地址
exports.shopAddress = async data => {
  var obj = await sendRequest(data || {}, "PS110011", "POST");
  var jsondata = {
    code: obj.code,
    message: obj.message,
    result: obj.result || []
  };
  return jsondata;
};
