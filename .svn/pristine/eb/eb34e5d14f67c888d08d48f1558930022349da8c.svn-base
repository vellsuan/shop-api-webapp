"use strict";

var log = require("../../utils/logUtil.js")("assortService.js");
var sendRequest = require("../../utils/httpClient.js");

/**
 * 分类查询菜单列表
 * @param {Object} data
 *
 */
exports.getListCategory = async data => {
  var obj = await sendRequest(data || {}, "PM100004", "POST");
  var jsondata = {
    code: obj.code,
    message: obj.message,
    result: obj.result || []
  };
  return jsondata;
};

/**
 * 根据id查询普通商品列表
 * @param {Object} data
 *
 */
exports.getProductList = async data => {
  var obj = await sendRequest(data || {}, "PM100003", "POST");
  var jsondata = {
    code: obj.code,
    message: obj.message,
    result: obj.result || []
  };
  return jsondata;
};

/**
 * 根据id查看商品详情
 * @param {Object} data
 *
 */
exports.getProductDetail = async data => {
  var obj = await sendRequest(data || {}, "PR100001", "POST");
  var jsondata = {
    code: obj.code,
    message: obj.message,
    result: obj.result || []
  };
  return jsondata;
};
/**
 * 查询商品详情
 * @param {[type]} data          [description]
 * @await {[type]} [description]
 */
exports.queryGoodsDetail = async data => {
  var obj = await sendRequest(data || {}, "PR900001", "POST");
  return obj;
};
/**
 * 查询商品评价
 * @param {[type]} data          [description]
 * @await {[type]} [description]
 */
exports.queryEval = async data => {
  var obj = await sendRequest(data || {}, "OR100092", "POST");
  return obj;
};
