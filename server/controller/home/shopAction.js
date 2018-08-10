"use strict";

var Base = require("./../../controller/base/baseAction.js");
var tools = require("../../utils/utils.js");
var log = require("../../utils/logUtil.js")("shopAction");


//选择门店
exports.shopListBySN = async (ctx, next) => {
	var params = Base.getParams(ctx);

	var shopInfoList = Base.getSessionData(ctx.session,"sessionConstant_shopInfoList") || [];

  var data = await Base.shopService.shopListBySN(params);
  
	var shops = data && data.result && data.result.shops || {};
      shops.shop_sn = shops.shopSn || "";
  data.result.shops = shops;
	Base.updateSessionData(ctx.session,"sessionConstant_shopInfo", shops);
	var json = { "code": data.code, "message": data.message, "result": data.result || "" };
	Base.getResponseRes(ctx, json);
}
/**
 * 购物车列表
 * @param next
 */
exports.shoppingList = async (ctx, next) => {
  var shopParam = Base.getParams(ctx);

  var shopInfo = Base.getShopInfo(ctx);
  var userInfo = Base.getUserInfo(ctx);
  shopParam.userId = shopParam.userId || userInfo.user.userId;

  shopParam.shopSn = shopParam.shopSn || shopInfo["shop_sn"];

  shopParam.userShopPlatformKey =
    shopParam.userId + "_" + shopParam.shopSn + "_platform0";

  var json = await Base.shopService.shoppingList(shopParam);
  if (json.code == "000000") {
    var result = json.result;
    var osEntity = result.osEntity;
    var itemBranchList = osEntity && osEntity.itemBranchList || [];
    var itemCookList = itemBranchList[0].itemCookList || [] // 外卖堂食数组
    var supplierList = itemCookList[0].supplierList || [] // 供应商数组  我自己理解成以前的itemShopList
    var productList = supplierList[0].productList || []
    supplierList[0].isFetchSend = (result.realTotalMoney - result.cxSubMoney + Number(osEntity.topBaoZhuang)) > supplierList[0].startSendPrice
    productList.forEach(element => {
      element.product.isOtherPro = false; //是否是赠品
      element.product.isExchange = false; //是否可换购
      element.product.isExchangePro = false; //是否是换购品
      //商品真实价格
      element.product.cxPrice = Number(element.product.price) == 0 ? element.product.price : Number(element.product.price - (element.product.cxSubPrice / element.num)).toFixed(2);
      //单个商品促销价
      element.product.singleCxSubPrice = element.product.cxSubPrice / element.num
      if (element.product.productId.indexOf("ZCX") > -1 && element.product.cxType == "2") {
        element.product.isOtherPro = true;
      }
      if (element.product.productId.indexOf("CX") > -1 && element.product.productId.substring(0, 3) != "ZCX" && element.product.cxType == "5") {
        element.product.isExchange = true;
      }
      if (element.product.productId.substring(0, 3) == "ZCX" && element.product.cxType == "5") {
        element.product.isExchangePro = true;
      }
    });
  }

  Base.getResponseRes(ctx, json);
};
//下单
exports.placeOrder = async (ctx, next) => {
  var shopParam = Base.getParams(ctx);
  var shopInfo = Base.getShopInfo(ctx);
  var userInfo = Base.getUserInfo(ctx);

  var json = await Base.shopService.placeOrder(shopParam);

  var result = json.result
  var osEntity = result.osEntity;
  var listDis = result.listDis;
  var couponList = result.couponList;
  var itemBranchList = osEntity && osEntity.itemBranchList || []; //平台数组
  var itemCookList = itemBranchList[0].itemCookList || []; //外卖堂食数组
  var itemShopList = itemCookList[0].supplierList || []; //供应商数组  我自己理解成以前的itemShopList
  var itemProductList = itemShopList[0].productList || [];
  var productList = [];
  for (var i = 0; i < itemProductList.length; i++) {
    var itemSh = itemProductList[i];
    productList = productList.concat(itemSh);
  }
  result.defaultAddress = {};
  if (listDis.length != 0) {
    for (var i = 0; i < listDis.length; i++) {
      if (listDis[i].isHost == "0") {
        result.defaultAddress = listDis[i];
      }
    }
  }
  Base.saveSessionData(ctx.session, "settlement_data", result);
  Base.saveSessionData(ctx.session, "productList", productList);
  Base.saveSessionData(ctx.session, "addressList", listDis);
  Base.saveSessionData(ctx.session, "couponList", couponList);
  Base.getResponseRes(ctx, json);
};

//商品列表
exports.shopList = async (ctx, next) => {

  var productList = Base.getSessionData(ctx.session, "productList");
  var jsondata = {
    code: "000000",
    message: "业务处理成功",
    result: {
      "productList": productList
    }
  };
  Base.getResponseRes(ctx, jsondata);
}
//加价换购列表
exports.addMoneyExchange = async (ctx, next) => {
  var param = Base.getParams(ctx);
  var shopInfo = Base.getShopInfo(ctx);
  param.shopSn = shopInfo["shop_sn"];
  var jsondata = await Base.shopService.addMoneyExchange(param);
  Base.getResponseRes(ctx, jsondata);
}
//换购确认
exports.exchangeComfirm = async (ctx, next) => {
  var param = Base.getParams(ctx);
  var userInfo = Base.getUserInfo(ctx);
  var shopInfo = Base.getShopInfo(ctx);

  param.shopSn = shopInfo["shop_sn"];
  param.userId = userInfo.user.userId;
  param.userShopPlatformKey = param.userId + "_" + param.shopSn + "_platform0";

  var json = await Base.shopService.exchangeComfirm(param);
  Base.getResponseRes(ctx, json);
}
/**
 * 购物车商品 选中|取消
 * @param next
 */
exports.selectCartPro = async (ctx, next) => {
  var param = Base.getParams(ctx);
  var userInfo = Base.getUserInfo(ctx);
  var shopInfo = Base.getShopInfo(ctx);

  param.userId = userInfo.user.userId;
  param.userShopPlatformKey = param.userId + "_" + shopInfo["shop_sn"] + "_platform0";

  var json = await Base.shopService.selectCartPro(param);
  Base.getResponseRes(ctx, json);
}

/**
 * 添加购物车
 * @param next
 *
 * 	 { "productId": productId,   商品id /有活动活动id   activityproid||productId   必须
 *    "activityproid":activityproid,  //活动id  必须
 *    "price":price,  //金融   必须
 *    "type": "add",  //操作类型   必须
 *    "supplierId": supplierId || 0,  //供应商id  必须
 *    "stock": stock,   //库存  非必须 不传默认为0
 *     isApp：2， //渠道 非必须 不传默认为2
 * 	   num：1  添加数量  非必须   默认为1
 *     };
 *
 *
 */
exports.addCart = async (ctx, next) => {
  var jsondata = Base.getParams(ctx);
  var userInfo = Base.getUserInfo(ctx);
  var shopInfo = Base.getShopInfo(ctx);
  jsondata.userId = jsondata.userId || userInfo.user.userId || "";
  jsondata.shopSn = shopInfo["shop_sn"];
  jsondata.isApp = jsondata.isApp || "2";
  jsondata.num = jsondata.num || "1";
  jsondata.stock = jsondata.stock || "0";

  jsondata.productId = jsondata.activityproid || jsondata.productId; //如果促销Id存在，原生商品Id 也应该传促销Id
  jsondata.userShopPlatformKey = jsondata.userId + "_" + jsondata.shopSn + "_platform0";
  var stock = jsondata.stock || "0";
  var stockData = await Base.shopService.getCartNum(jsondata);
  if (stockData.code !== "000000") {
    Base.getResponseRes(ctx, stockData);
    return;
  }
  var strs = stockData.result || null;
  if (strs && Number(strs.num || 0) + Number(jsondata.num) > Number(stock)) {
    Base.getResponseRes(ctx, {
      code: "222222",
      message: "商品数量不足！"
    });
  } else {
    var jsdata = "";
    if (!jsondata.activityproid) {
      jsdata = await Base.shopService.addGoCart(jsondata, strs.num);
    } else {
      if (
        jsondata.activityproid.indexOf("MJ") != "-1" ||
        jsondata.activityproid.indexOf("TG") != "-1"
      ) {
        //满减
        jsdata = await Base.shopService.addGoCart(jsondata, strs.num);
      } else {
        jsondata.productId = jsondata.activityproid || jsondata.productId || "";
        jsdata = await Base.shopService.CKAddRefshCart(jsondata, strs.num);
      }
    }
    Base.getResponseRes(ctx, jsdata);
  }
};

/**
 * 删除购物车
 * @param next
 * { "productId": productId,  活动id||商品id
 *   "type": "del", 操作类型
 *    "num": num,  当前数量
 *    "activityproid":activityproid   //活动id
 *     isSend：2， //渠道 非必须 不传默认为2
 *
 * };
 */
exports.delCart = async (ctx, next) => {
  var jsondata = Base.getParams(ctx);
  var shopInfo = Base.getShopInfo(ctx);
  var userInfo = Base.getUserInfo(ctx);
  jsondata.userId = jsondata.userId || userInfo.user.userId || "";
  jsondata.shopSn = jsondata.shopSn || shopInfo["shop_sn"];
  jsondata.isSend = jsondata.isSend || "1";
  if (jsondata.isInvite && jsondata.isInvite == "1") {
    jsondata.userShopPlatformKey =
      jsondata.userId + "_" + jsondata.shopSn + "_platform5";
  } else {
    jsondata.userShopPlatformKey =
      jsondata.userId + "_" + jsondata.shopSn + "_platform0";
  }
  var resData = "";
  if (!jsondata.activityproid) {
    if (jsondata.num == 0) {
      resData = await Base.shopService.deleteCart(jsondata);
    } else {
      resData = await Base.shopService.updateCart(jsondata);
    }
  } else {
    if (
      jsondata.activityproid.indexOf("MJ") != "-1" ||
      jsondata.activityproid.indexOf("TG") != "-1"
    ) {
      //满减
      if (jsondata.num == 0) {
        resData = await Base.shopService.deleteCart(jsondata);
      } else {
        resData = await Base.shopService.updateCart(jsondata);
      }
    } else {
      jsondata.num = "1"; //优惠大促删除购物车只能传1
      resData = await Base.shopService.CKAddRefshCart(jsondata);
      if (jsondata.cxType && jsondata.cxType == "1") {
        await doJieSuanFun.call(ctx);
      }
    }
  }
  var dataHandle = resData.result || null;
  if (resData.code === "000000" && dataHandle.checkCode == "111111") {
    var json = {
      code: "222222",
      message: dataHandle.msg,
      result: dataHandle
    };
    Base.getResponseRes(ctx, json);
  } else {
    Base.getResponseRes(ctx, resData);
  }
};


//下单时，得到商品ID串，数量串
var getSomeSubmitData = async (ctx, jsondata) => {
  var settlement_data;
  var shopInfo = Base.getShopInfo(ctx);
  jsondata.shopSn = shopInfo["shop_sn"];
  settlement_data = Base.getSessionData(ctx.session, "settlement_data");
  jsondata.userShopPlatformKey = jsondata.userId + "_" + jsondata.shopSn + "_platform0";

  var itemBranchList = settlement_data.osEntity && settlement_data.osEntity.itemBranchList || []; //平台数组
  var itemCookList = itemBranchList[0].itemCookList || []; //外卖堂食数组
  var itemShopList = itemCookList[0].supplierList || []; //供应商数组  我自己理解成以前的itemShopList

  for (var i = 0; i < itemShopList.length; i++) {
    var itemShop = itemShopList[i];
    for (var j = 0; j < itemShop.productList.length; j++) {
      var ProductItem = itemShop.productList[j];
      jsondata.numsIds += ProductItem.num + ",";
      jsondata.productIds += ProductItem.product.productId + ",";
    }
  }
  jsondata.numsIds = jsondata.numsIds.substring(0, jsondata.numsIds.length - 1);
  jsondata.productIds = jsondata.productIds.substring(0, jsondata.productIds.length - 1);
  return jsondata;
}
/**
 * 校验价格是否变动
 * @param next
 */
exports.checkOrderPrice = async (ctx, next) => {
  var param = Base.getParams(ctx);
  var userInfo = Base.getUserInfo(ctx);
  var shopInfo = Base.getShopInfo(ctx);
  param.userId = userInfo.user.userId;
  param = await getSomeSubmitData(ctx, param);

  var jsondata = param;
  var dateNow = new Date();
  var currentTimestamp = dateNow.getTime();
  var openTime = shopInfo.openTime; //小时点
  var closeTime = shopInfo.closeTime;

  var distributionOpenTime = shopInfo.distributionOpenTime; //小时点
  var distributionCloseTime = shopInfo.distributionCloseTime;

  var sendOpenTimeTamp = new Date(dateNow.toLocaleDateString() + " " + distributionOpenTime).getTime();
  var sendCloseTimeTamp = new Date(dateNow.toLocaleDateString() + " " + distributionCloseTime).getTime();
  var takeOpenTimeTamp = new Date(dateNow.toLocaleDateString() + " " + openTime).getTime(); //门店开始时间
  var takeCloseTimeTamp = new Date(dateNow.toLocaleDateString() + " " + closeTime).getTime(); //门店结束时间
  //如果门店营业时间已结束，只能选择将来时间。
  if (jsondata.hopeTime == "0") {
    if (takeCloseTimeTamp < currentTimestamp) {
      var json = {
        "code": "222222",
        "message": "抱歉，已打烊。请选择明日配送或自提！",
        "result": {}
      }
      Base.getResponseRes(ctx, json);
      return;
    } else if (takeOpenTimeTamp > currentTimestamp) {
      var json = {
        "code": "222222",
        "message": "抱歉，今日营业时间未到。请稍后下单！",
        "result": {}
      }
      Base.getResponseRes(ctx, json);
      return;
    }

  }
  //如果配送时间已结束，只能选择将来时间。
  if (jsondata.hopeTime == "0" && jsondata.isSend == "0") {
    if (sendCloseTimeTamp < currentTimestamp) {
      var json = {
        "code": "222222",
        "message": "抱歉，今日配送时间已过。请选择明日配送或自提！",
        "result": {}
      }
      Base.getResponseRes(ctx, json);
      return;
    } else if (sendOpenTimeTamp > currentTimestamp) {
      var json = {
        "code": "222222",
        "message": "抱歉，今日配送时间未到。请选择配送时间或自提下单！",
        "result": {}
      }
      Base.getResponseRes(ctx, json);
      return;
    }

  }

  var data = await Base.shopService.checkOrderPrice(param);
  var json = {
    "code": data.code,
    "message": data.message
  }
  Base.getResponseRes(ctx, json);
}
/**
 * 提交订单
 * @param next
 */
exports.submitOrder = async (ctx, next) => {
  var param = Base.getParams(ctx);
  var userInfo = Base.getUserInfo(ctx);
  param.userId = userInfo.user.userId;

  param = await getSomeSubmitData(ctx, param);
  var json = await Base.shopService.submitOrder(param);
  Base.getResponseRes(ctx, json);
}

/**
 * 下单页跳转地址库，选择地址回来时通过Id 查找地址
 * @param next
 */
exports.filterAddress = async (ctx, next) => {
  var param = Base.getParams(ctx);
  let addressId = param.addressId;
  var listDis = Base.getSessionData(ctx.session, "addressList");

  var obj = {};
  for (var i = 0; i < listDis.length; i++) {
    if (listDis[i].id == addressId) {
      obj = listDis[i];
      break;
    }
  }
  var jsondata = {
    code: "000000",
    message: "业务处理成功",
    result: {
      "defaultAddress": obj
    }
  };
  Base.getResponseRes(ctx, jsondata);
}
/**
 * 下单页跳转优惠券，选择优惠券回来时通过Id 查找优惠券
 * @param next
 */
exports.filterCoupon = async (ctx, next) => {
  var param = Base.getParams(ctx);
  let addressId = param.addressId;
  var couponList = Base.getSessionData(ctx.session, "couponList");

  var obj = {};
  for (var i = 0; i < couponList.length; i++) {
    if (couponList[i].id == couponId) {
      obj = couponList[i];
      break;
    }
  }
  var jsondata = {
    code: "000000",
    message: "业务处理成功",
    result: {
      "coupon": obj
    }
  };
  Base.getResponseRes(ctx, jsondata);
}

/**
 * 后台获取快递运费
 */
exports.adjustSendPrice =  async (ctx, next) => {
  var param = Base.getParams(ctx);
  var shopInfo = Base.getShopInfo(ctx);
  var userInfo = Base.getUserInfo(ctx);
  param.shopSn = param.shopSn || shopInfo["shop_sn"];
  param.userId = param.userId || userInfo.user.userId;
  var json = await Base.shopService.adjustSendPrice(param);
  Base.getResponseRes(ctx, json);
}

//获取默认地址对象
var getAddressOBj = async (ctx,id) => {
  var listDis = Base.getSessionData(ctx.session,"addressList");

  var obj = {};
  for(var i = 0; i < listDis.length; i++) {
       if(listDis[i].id == id) {
           obj = listDis[i];
           break;
       }
  }
  return obj;
}
/**
 * 咖啡门店距离 (校验地址是否在配送范围)
 * @param next
 */
exports.shopDistance = async (ctx, next) => {
  var param = Base.getParams(ctx);
  var addressObj = await getAddressOBj(ctx,param.addressId);
  var shopInfo = Base.getShopInfo(ctx);


  param.origins = (shopInfo.latitude || "39.93") + "," + (shopInfo.longitude || "116.46");
  param.destinations = addressObj.latitude + "," + addressObj.longitude;
  var rsdata = await Base.mapService.routeMatrix(param);
  var distanceVul = rsdata && rsdata.result&&rsdata.result[0]&&rsdata.result[0].distance&&rsdata.result[0].distance.value || "0";
  //门店距离是否小于3500米
  var json = { "message": rsdata.message, "result":  {flag:rsdata.status==0?Number(distanceVul)<3500:false} || "" }
  Base.getResponseRes(ctx, json);
}
