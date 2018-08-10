"use strict";

let Base = require("./../../controller/base/baseAction.js");
let log = require("../../utils/logUtil.js")("assentAction");
var assortService = require("../../service/home/assortService.js");

// 分类菜单
exports.getListCategory = async (ctx, next) => {
  var params = Base.getParams(ctx);
  params.maxLen = "1";
  var data = await assortService.getListCategory(params);
  var json = {
    code: data.code,
    message: data.message,
    result: data.result || ""
  };
  Base.getResponseRes(ctx, json);
};

// 商品列表
exports.getProductList = async (ctx, next) => {
  var params = Base.getParams(ctx); 
  params.takeout = "2";
  var data = await assortService.getProductList(params);
  var json = {
    code: data.code,
    message: data.message,
    result: data.result || ""
  };
  Base.getResponseRes(ctx, json);
};
// 根据商品id获取详情
exports.getProductDetail = async (ctx, next) => {
  var params = Base.getParams(ctx);
  params.takeout = "2"; //微信商城只要外卖
  var data = await assortService.getProductDetail(params);
  var json = {
    code: data.code,
    message: data.message,
    result: data.result || ""
  };
  Base.getResponseRes(ctx, json);
};
// 查询商品详情
exports.queryGoodsDetail = async (ctx, next) => {
  var params = Base.getParams(ctx);
  params.takeout = "2"; //微信商城只要外卖
  var data = await assortService.queryGoodsDetail(params);
  var json = {
    code: data.code,
    message: data.message,
    result: data.result || ""
  };
  Base.getResponseRes(ctx, json);
};

// 查询商品评价
exports.queryEval = async (ctx, next) => {
  var params = Base.getParams(ctx);
  var data = await assortService.queryEval(params);
  var json = {
    code: data.code,
    message: data.message,
    result: data.result || ""
  };
  Base.getResponseRes(ctx, json);
};
