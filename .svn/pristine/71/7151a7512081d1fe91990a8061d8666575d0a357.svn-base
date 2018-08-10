"use strict";
var indexService = require("../../service/home/indexService.js");
var Base = require("./../../controller/base/baseAction.js");
var Wechat = require("../../wechat-api/Wechat.js");

var log = require("../../utils/logUtil.js")("indexAction");

// 首页banner
exports.indexBanner = async (ctx, next) => {
  var params = Base.getParams(ctx);
  params.maxLen = "1";
  params.placeSign = "BANNERDVER";
  var data = await indexService.indexBanner(params);
  var json = {
    code: data.code,
    message: data.message,
    result: data.result || ""
  };
  Base.getResponseRes(ctx, json);
};

// 品牌数据
exports.brandlist = async (ctx, next) => {
  var params = Base.getParams(ctx);
  params.maxLen = "1";
  params.placeSign = "BANNERDVER";
  var data = await indexService.brandlist(params);
  var json = {
    code: data.code,
    message: data.message,
    result: data.result || ""
  };
  Base.getResponseRes(ctx, json);
};

// 楼层
exports.indexDevLi = async (ctx, next) => {
  var params = Base.getParams(ctx);
  params.maxLen = "1";
  params.placeSign = "BANNERDVER";
  var data = await indexService.indexDevLi(params);
  var json = {
    code: data.code,
    message: data.message,
    result: data.result.sitefloor || ""
  };
  Base.getResponseRes(ctx, json);
};

// 会员特价
exports.vipSpecProduct = async (ctx, next) => {
  var params = Base.getParams(ctx);
  var data = await indexService.vipSpecProduct(params);
  var json = {
    code: data.code,
    message: data.message,
    result: data.result || ""
  };
  Base.getResponseRes(ctx, json);
};

//搜索商品列表
exports.queryGoodsList = async (ctx, next) => {
  var params = Base.getParams(ctx);
  var data = await indexService.queryGoodsList(params);
  var json = {
    code: data.code,
    message: data.message,
    result:
      (data &&
        data.result &&
        data.result &&
        data.result.list &&
        JSON.parse(data.result.list)) ||
      []
  };
  Base.getResponseRes(ctx, json);
};

// 获取门店地址 shopAddress
exports.shopAddress = async (ctx, next) => {
  var params = Base.getParams(ctx);
  var data = await indexService.shopAddress(params);
  var json = {
    code: data.code,
    message: data.message,
    result: data.result || ""
  };
  if (data.code == "000000" && data.result.list.length != 0) {
    let shopInfo = data.result.list[0];
    Base.saveSessionData(
      ctx.session,
      "sessionConstant_shopInfoList",
      data.result.list
    );
    Base.saveSessionData(ctx.session, "sessionConstant_shopInfo", shopInfo);
  }
  Base.getResponseRes(ctx, json);
};
