"use strict";

var log = require("../../utils/logUtil.js")("shopService.js");
var sendRequest = require("../../utils/httpClient.js");

/**
 * 获取商品在购物车的数量
 * @param data
 * @returns {*}
 */
exports.getCartNum = async data => {
  var obj = await sendRequest(data || {}, "OR200008", "POST");
  var jsondata = {
    code: obj.code,
    message: obj.message,
    result: obj.result || []
  };
  return jsondata;
};

/**
 * 获取购物车总数量
 * @param data
 * @returns {*}
 */
exports.getCartAll = async data => {
  var obj = await sendRequest(data || {}, "OR200006", "POST");
  var jsondata = {
    code: obj.code,
    message: obj.message,
    result: obj.result || []
  };
  return jsondata;
};
//校验该用户等级是否可以购买该优惠商品
exports.vipProductValidte = async data => {
  var obj = await sendRequest(data || {}, "CK200043", "POST");
  var jsondata = {
    code: obj.code,
    message: obj.message,
    result: obj.result || []
  };
  return jsondata;
};
/**
 * 加入购物车
 * @param data
 * @returns {*}
 */
exports.addGoCart = async (data, num) => {
  var obj = await sendRequest(data || {}, "OR200001", "POST");
  obj.result.num = num + 1;
  var jsondata = {
    code: obj.code,
    message: obj.message,
    result: obj.result || []
  };
  return jsondata;
};

/**
 * 获取购物车列表
 * @param {Object} data
 * @param {Object} callback
 */
exports.shoppingList = async data => {
  var obj = await sendRequest(data || {}, "OR200101", "POST");
  var jsondata = {
    code: obj.code,
    message: obj.message,
    result: obj.result || []
  };
  return jsondata;
};

/**
 * 下单页列表
 * @param {Object} data
 * @param {Object} callback
 */
exports.placeOrder = async data => {
  var obj = await sendRequest(data || {}, "OR200102", "POST");
  var jsondata = {
    code: obj.code,
    message: obj.message,
    result: obj.result || []
  };
  return jsondata;
};

/**
 * 换购商品列表
};

/**
 * 换购商品列表
 * @param data
 * @returns {*}
 */
exports.addMoneyExchange = async data => {
  var jsondata =  await sendRequest(data,"CK200041","POST");
  return jsondata;
}
/**
 * 确认换购
 * @param data
 * @returns {*}
 */
exports.exchangeComfirm =  async data => {
  var jsondata =  await sendRequest(data,"CK200042","POST");
  return jsondata;
}
/**
 * 购物车商品 选中|取消
 * @param data
 * @returns {*}
 */
exports.selectCartPro = async data => {
  var jsondata =  await sendRequest(data,"OR200010","POST");
  return jsondata;
}
/**
 * 积分兑换（预定或者团购预约 优惠券兑换）  显示购物清单和结算信息
 * @param {Object} data
 * @param {Object} callback
 */
exports.showScoreExchange = async data => {
  var obj = await sendRequest(data || {}, "OR100009", "POST");
  var jsondata = {
    code: obj.code,
    message: obj.message,
    result: obj.result || []
  };
  return jsondata;
};
/**
 * 修改购物车
 * @param data
 * @returns {*}
 */
exports.updateCart =  async data => {
  data.isApp = "1";
  var jsondata =  await sendRequest(data,"OR200002","POST");
  return jsondata;
}
/**
 * 删除购物车
 * @param data
 * @returns {*}
 */
exports.deleteCart = async data => {
  var obj = await sendRequest(data || {}, "OR200003", "POST");
  var jsondata = {
    code: obj.code,
    message: obj.message,
    result: obj.result || []
  };
  return jsondata;
};
/**
 * 获取商品在购物车的数量
 * @param data
 * @returns {*}
 */
exports.getCartNum = async data => {
  var obj = await sendRequest(data || {}, "OR200008", "POST");
  var jsondata = {
    code: obj.code,
    message: obj.message,
    result: obj.result || []
  };
  return jsondata;
};
/**
 * 优惠大促增删购物车
 * @param {Object} data
 * @param {Object} callback
 */
exports.CKAddRefshCart = async (data, snum) => {
  var obj = await sendRequest(data || {}, "CK200040", "POST");
  if (obj.code === "000000") {
    if (data.type == "del") {
      var num = obj.result.thisNum || 0;
      obj.result.num = num;
    } else {
      obj.result.num = snum + 1;
    }
  }
  var jsondata = {
    code: obj.code,
    message: obj.message,
    result: obj.result || []
  };
  return jsondata;
};
/**
 * 下单前校验价格是否变动
 * @param data
 * @returns {*}
 */
exports.checkOrderPrice = async data => {
  var jsondata =  await sendRequest(data,"OR200106","POST");
  return jsondata;
}
/**
 * 下单
 * @param data
 * @returns {*}
 */
exports.submitOrder = async data => {
  var jsondata = await sendRequest(data||{},"OR200104","POST");
  return jsondata;
}
/**
 * 选择门店
 * @param {Object} data
 *
 */
exports.shopListBySN =  async data => {
  var jsondata = await sendRequest(data, "PS100007", "POST");
  return jsondata;
}
/**
 * 选择地址重新计算运费
 * @param {Object} data
 *
 */
exports.adjustSendPrice =  async data => {
  var jsondata = await sendRequest(data, "OR100017", "POST");
  return jsondata;
}
