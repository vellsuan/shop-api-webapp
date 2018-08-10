'use strict'

var User = require("../../model/base/User.js");
var tools = require("../../utils/utils.js");
var sendRequest = require("../../utils/httpClient.js");

/**
 * 电子账户支付
 * @param data
 * @returns {*}
 */
exports.coffeeAccountPay =  async (data) =>{
    var obj = await sendRequest(data||{},"DE100013","POST");
    return obj;
}
// 绑定用户手机号
exports.bindPhoneUser = async (data) =>{
    var obj = await sendRequest(data||{},"CU100009","POST");
    var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
	return jsondata;
}
/**
 * 获取手机验证码
 * @param data
 * @returns {*}
 */
exports.getMobileCode =  async (data) =>{
	var jsondata = await sendRequest(data||{},"CM100001","POST");
	return jsondata;
}

// 会员特权
exports.appPrivilegeList = async (data) => {
    var obj = await sendRequest(data || {}, "CR200004", "POST");
    var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
    return jsondata;
}
// 用户订单信中心
exports.userOrderCenter = async (data) =>{
    var obj = await sendRequest(data||{},"MU100022","POST");
    var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
	return jsondata;
}

// 用户详情信息
exports.userDetailCenter = async (data) =>{
    var obj = await sendRequest(data||{},"MU100014","POST");
    var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
	return jsondata;
}
//用户订单详情
exports.userOrderDetail = async (data) =>{
    var obj = await sendRequest(data||{},"OR100003","POST");
    var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
	return jsondata;
}

//用户订单中心-积分管理（明细）-总积分
exports.integralTotal = async (data) =>{
    var obj = await sendRequest(data||{},"PRXH00005","POST");
    var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
	return jsondata;
}

// 用户订单中心-积分管理（明细）
exports.integralManage = async (data) =>{
    var obj = await sendRequest(data||{},"MU100020","POST");
    var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
	return jsondata;
}

/********** 积分开始 ***********/
// 用户订单中心-积分兑换列表
exports.integralList = async (data) =>{
    var obj = await sendRequest(data || {},"PR300001","POST");
    var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
	return jsondata;
}

// 用户订单中心-积分兑换列表-立即兑换
exports.redeemNow = async (data) => {
    var obj = await sendRequest(data || {}, "PRXH00009", "POST");
    var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
    return jsondata;
}

// 用户订单中心-积分兑换列表-获取用户总积分
exports.queryPointByuserId = async (data) => {
    var obj = await sendRequest(data || {}, "CR100001", "POST");
    var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
    return jsondata;
}

/********** 积分结束 ***********/


// 用户订单中心-积分兑换
exports.integralExchange = async (data) =>{
    var obj = await sendRequest(data||{},"CRED00018","POST");
    var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
	return jsondata;
}

// 用户订单中心-积分兑换-获取默认地址
exports.getShippingAddress = async (data) =>{
    var obj = await sendRequest(data||{},"ADDRESS4","POST");
    var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
	return jsondata;
}

// // 用户订单中心-积分兑换-立即兑换
// exports.redeemNow = async (data) =>{
//     var obj = await sendRequest(data||{},"PRXH00009","POST");
//     var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
// 	return jsondata;
// }

// 用户订单中心-积分兑换-兑换记录
exports.recordData = async (data) =>{
    var obj = await sendRequest(data||{},"CRED00008","POST");
    var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
	return jsondata;
}

// 用户订单中心-积分兑换-兑换记录详情
exports.recordDataDetail = async (data) =>{
    var obj = await sendRequest(data||{},"CRED00010","POST");
    var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
	return jsondata;
}

//用户订单中心-积分兑换-兑换记录详情-确认收货
exports.confirmReceipt = async (data) =>{
    var obj = await sendRequest(data||{},"CRED00009","POST");
    var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
	return jsondata;
}

//用户订单中心-积分兑换-兑换记录详情-删除兑换记录
exports.delRedemption = async (data) =>{
    var obj = await sendRequest(data||{},"CRED00011","POST");
    var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
	return jsondata;
}

// 获取轮播图
exports.getListBanner = async (data) =>{
    var obj = await sendRequest(data||{},"CM000006","POST");
    var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
	return jsondata;
}
//优惠券
exports.getListCoupon = async (data) =>{
    var obj = await sendRequest(data||{},"PRXH00020","POST");
    var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
	return jsondata;
}

//提交评价
exports.submitReview = async (data) =>{
    var obj = await sendRequest(data||{},"OR100010","POST");
    var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
	return jsondata;
}

//订单确认
exports.orderConfirmation = async (data) =>{
    var obj = await sendRequest(data||{},"OR100004","POST");
    var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
	return jsondata;
}

//用户登录
exports.login = async (data) =>{
    var obj = await sendRequest(data||{},"MU100002","POST");
    var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
	return jsondata;
}

// 完善用户信息
exports.addUserInfo = async (data) =>{
    var obj = await sendRequest(data||{},"MU100005","POST");
    var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
	return jsondata;
}

// 绑定邮箱
exports.addEmail = async (data) =>{
    var obj = await sendRequest(data||{},"MU100013","POST");
    var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
	return jsondata;
}


//收货地址添加
exports.addAddress = async (data) =>{
    var obj = await sendRequest(data||{},"ADDRESS2","POST");
    var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
	return jsondata;
}

//收货地址修改
exports.modifyAddress = async (data) =>{
    var obj = await sendRequest(data||{},"ADDRESS3","POST");
    var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
	return jsondata;
}

//收货地址反显
exports.getAddressDetail = async (data) =>{
    var obj = await sendRequest(data||{},"ADDRESS7","POST");
    var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
	return jsondata;
}

//收货地址列表
exports.addressList = async (data) =>{
    var obj = await sendRequest(data||{},"ADDRESS1","POST");
    var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
	return jsondata;
}

//收货地址删除
exports.delAddress = async (data) =>{
    var obj = await sendRequest(data||{},"ADDRESS6","POST");
    var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
	return jsondata;
}

//设置默认收货地址
exports.isHostAddress= async (data) =>{
    var obj = await sendRequest(data||{},"ADDRESS5","POST");
    var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
	return jsondata;
}

//优惠券转赠
exports.transferCoupons= async (data) =>{
    var obj = await sendRequest(data||{},"PRXH00022","POST");
    var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
	return jsondata;
}
// 取消原因
exports.whyCancel = async (data) => {
    var obj = await sendRequest(data || {}, "OR100005", "POST");
    var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
    return jsondata;
}

// 取消订单
exports.cancelOrder = async (data) => {
    var obj = await sendRequest(data || {}, "OR100006", "POST");
    var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
    return jsondata;
}

// 获取卡详情
exports.getCardDetail = async (data) => {
    var obj = await sendRequest(data || {}, "RECORD13", "POST");
    var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
    return jsondata;
}

// 取消卡订单
exports.cancelCardOrder = async (data) => {
    var obj = await sendRequest(data || {}, "RECORD12", "POST");
    var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
    return jsondata;
}

// 查看兑换商品详情
exports.getGoodsDetail = async (data) => {
    var obj = await sendRequest(data || {}, "CRED00018", "POST");
    var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
    return jsondata;
}


// 设置支付密码
exports.setPayPassword = async (data) => {
    var obj = await sendRequest(data || {}, "DE100002", "POST");
    var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
    return jsondata;
}

// 修改支付密码
exports.modifyPayPassword = async (data) => {
    var obj = await sendRequest(data || {}, "DE100001", "POST");
    var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
    return jsondata;
}

/**
 * 根据userId查询用户信息
 * @param userId
 * @returns {*}
 */
exports.queryUserInfoByUserId = async (data) => {
    var obj = await sendRequest(data || {}, "CU100010", "POST");
    var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
    return jsondata;
}

/**
 * 修改个人信息
 * @param data
 * @returns {*}
 */
exports.prefectInfo = async (data) => {
    var obj = await sendRequest(data || {}, "CU100006", "POST");
    var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
    return jsondata;
}
//订单列表
exports.myOrderList = async (data) => {
    var obj = await sendRequest(data || {}, "OR100001", "POST");
    var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
    return jsondata;
}
/**
 * 删除订单
 * @param data
 * @returns {*}
 */
exports.orderDelete = async (data) => {
    var obj = await sendRequest(data||{},"OR100007","POST");
     var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
    return jsondata;
}
/**
 * 订单详情
 * @param data
 * @returns {*}
 */
exports.orderDetail = async (data) => {
    var obj = null;
    var params = {
        orderId:data.orderId
    };
    if(data.payStatus==0){
        obj = await sendRequest(params||{},"OR100012","POST");
    }else{
        obj = await sendRequest(params||{},"OR100013","POST");
    }
     var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
    return jsondata;
}
/**
 * 取消订单
 * @param data
 * @returns {*}
 */
exports.orderCancel = async (data) => {
    var obj = await sendRequest(data||{},"OR100011","POST");
    var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
    return jsondata;
}
//待评价/已评价商品列表
exports.evaluateOrderDetail = async (data) => {
	var obj = await sendRequest(data||{},"OR800002","POST");
	 var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
	return jsondata;
}
exports.releaseEvalute = async (data) => {
    var obj = await sendRequest(data||{},"OR300003","POST");
    var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
    return jsondata;
}
exports.productEvalute = async (data) => {
    var obj = await sendRequest(data||{},"OR100091","POST");
    var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
    return jsondata;
}
//我的钱包-收支明细
exports.queryBudgetList = async (data) => {
    var obj = await sendRequest(data || {}, "TJ000005", "POST");
    var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
    return jsondata;
}

// 充值反显充值金额
exports.moneyList = async (data) => {
    var obj = await sendRequest(data || {}, "RE200001", "POST");
    var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
    return jsondata;
}
//充值特权介绍
exports.privilegeList = async (data) => {
    var obj = await sendRequest(data || {}, "CR200013", "POST");
    var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
    return jsondata;
}

//----------------地址库开始--------------------//
exports.queryAddress = async (data) => {
  var obj = await sendRequest(data || {}, "CR300004", "POST");
  var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
  return jsondata;
}
exports.queryPersonal = async (data) => {
  var obj = await sendRequest(data || {}, "CR300005", "POST");
  var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
  return jsondata;
}
exports.queryAddPer = async (data) => {
  var obj = await sendRequest(data || {}, "CR300001", "POST");
  var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
  return jsondata;
}
exports.queryAddressDefault = async (data) => {
  var obj = await sendRequest(data || {}, "CR300002", "POST");
  var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
  return jsondata;
}
exports.queryAddressEdit = async (data) => {
  var obj = await sendRequest(data || {}, "CR300002", "POST");
  var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
  return jsondata;
}
exports.delAddress = async (data) => {
  var obj = await sendRequest(data || {}, "CR300003", "POST");
  var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
  return jsondata;
}
//----------------地址库结束--------------------//
//----------------优惠券开始--------------------//
exports.queryCoupon = async (data) => {
  var obj = await sendRequest(data || {}, "CY200022", "POST");
  var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
  return jsondata;
}
exports.queryCode = async (data) => {
    var obj = await sendRequest(data || {}, "DE100016", "POST");
    var jsondata = { "code": obj.code, "message": obj.message, "result": obj.result || [] }
    return jsondata;
  }
//----------------优惠券结束--------------------//
