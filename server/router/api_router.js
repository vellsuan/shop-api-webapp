"use strict";

const config = require("../config/config.js");
const indexAction = require("../controller/home/indexAction.js");
const assentAction = require("../controller/home/assentAction.js");
const shopAction = require("../controller/home/shopAction.js");
const userAction = require("../controller/home/userAction.js");

const auth = require("../middleware/auth.js");

const prefix = config.ServerPath.ApiPath || "";

module.exports = function(router) {
  // 首页banner
  router.post(prefix + "/indexBanner", indexAction.indexBanner);

  // 品牌数据
  router.post(prefix + "/brandlist", indexAction.brandlist);

  // 楼层
  router.post(prefix + "/indexDevLi", indexAction.indexDevLi);

  // 会员特价
  router.post(prefix + "/vipSpecProduct", indexAction.vipSpecProduct);

  // 获取验证码
   router.post(prefix + "/getMobileCode", userAction.getMobileCode);

  // 绑定手机号
  router.post(prefix + "/bindPhoneUser", userAction.bindPhoneUser);

  // 获取店铺地址
  router.post(prefix + "/shopAddress", indexAction.shopAddress);

  //  用户订单中心
  router.post(prefix + "/userOrderCenter", userAction.userOrderCenter);

  // 用户订单详情
  router.post(
    prefix + "/usercenter/userOrderDetail",
    userAction.userOrderDetail
  );

  // 用户卡详情
  router.post(prefix + "/getCardDetail", userAction.getCardDetail);

  // 取消卡订单
  router.post(prefix + "/cancelCardOrder", userAction.cancelCardOrder);

  //  用户详情信息
  router.post(prefix + "/userDetailCenter", userAction.userDetailCenter);

  // 优惠券列表
  router.post(prefix + "/getListCoupon", userAction.getListCoupon);

  // 转赠优惠券
  router.post(prefix + "/transferCoupons", userAction.transferCoupons);

  // 用户订单中心-积分管理（明细）-总积分
  router.post(prefix + "/integralTotal", userAction.integralTotal);

  // 用户订单中心-积分管理（明细）
  router.post(prefix + "/integralManage", userAction.integralManage);

  // 用户订单中心-积分兑换
  router.post(prefix + "/integralExchange", userAction.integralExchange);

  // 用户订单中心-积分兑换-获取默认地址
  router.post(prefix + "/getShippingAddress", userAction.getShippingAddress);

  // 用户订单中心-积分兑换-立即兑换
  router.post(prefix + "/redeemNow", userAction.redeemNow);

  // 用户订单中心-积分兑换-兑换记录
  router.post(prefix + "/recordData", userAction.recordData);

  // 用户订单中心-积分兑换-兑换记录详情
  router.post(prefix + "/recordDataDetail", userAction.recordDataDetail);

  //用户订单中心-积分兑换-兑换记录详情-确认收货
  router.post(prefix + "/confirmReceipt", userAction.confirmReceipt);

  //用户订单中心-积分兑换-兑换记录详情-删除兑换记录
  router.post(prefix + "/delRedemption", userAction.delRedemption);

  // 用户订单中心-积分兑换列表-轮播图
  router.post(prefix + "/getListBanner", userAction.getListBanner);

  router.post(prefix + "/integralList", userAction.integralList);

  // 提交评价
  router.post(prefix + "/submitReview", userAction.submitReview);

  // 订单确认
  router.post(prefix + "/orderConfirmation", userAction.orderConfirmation);

  // 订单取消原因
  router.post(prefix + "/whyCancel", userAction.whyCancel);

  // 取消订单
  router.post(prefix + "/cancelOrder", userAction.cancelOrder);

  // 用户登录
  router.post(prefix + "/login", userAction.login);

  // 完善用户信息
  router.post(prefix + "/addUserInfo", userAction.addUserInfo);

  // 绑定邮箱
  router.post(prefix + "/addEmail", userAction.addEmail);

  // 兑换商品详情
  router.post(prefix + "/getGoodsDetail", userAction.getGoodsDetail);

  //收货地址添加和修改
  router.post(prefix + "/addAddress", userAction.addAddress);

  //收货地址修改
  //router.post(prefix+"/modifyAddress", userAction.modifyAddress);

  //反显收货地址
  router.post(prefix + "/getAddressDetail", userAction.getAddressDetail);

  //收货地址删除
  router.post(prefix + "/delAddress", userAction.delAddress);

  //收货地址列表
  router.post(prefix + "/addressList", userAction.addressList);

  //设置默认地址
  router.post(prefix + "/isHostAddress", userAction.isHostAddress);

  // ---------------------收货地址结束--------------------------- //

  // ---------------------购物车start--------------------------- //
  //购物车列表
  router.post(prefix + "/shopcart/shoppingList", shopAction.shoppingList);
  //删除购物车
  router.post(prefix + "/shopcart/delCart", shopAction.delCart);
  //加入购物车
  router.post(prefix + "/shopcart/addCart", shopAction.addCart);
  //下单页
  router.post(prefix + "/shopcart/placeOrder", shopAction.placeOrder);
  //商品列表
  router.post(prefix + "/shopcart/shopList", shopAction.shopList);

  //购物车商品 选中\取消
  router.post(prefix + "/shopcart/selectCartPro", shopAction.selectCartPro);
  //加钱换购
  router.post(
    prefix + "/shopcart/addMoneyExchange",
    shopAction.addMoneyExchange
  );
  router.post(prefix + "/shopcart/exchangeComfirm", shopAction.exchangeComfirm);

  //校验价格是否变动
  router.post(prefix + "/shopcart/checkOrderPrice", shopAction.checkOrderPrice);
  //提交订单
  router.post(prefix+"/shopcart/submitOrder",shopAction.submitOrder);
  //电子账户支付
  router.post(prefix+"/usercenter/coffeeAccountPay",userAction.coffeeAccountPay);
  //选择的地址
  router.post(prefix+"/shopcart/filterAddress",shopAction.filterAddress);
  //选择的优惠券
  router.post(prefix+"/shopcart/filterCoupon",shopAction.filterCoupon);
  //门店信息
  router.post(prefix+"/shopcart/shopListBySN",shopAction.shopListBySN);
  // 后台获取快递运费
  router.post(prefix+"/shopcart/adjustSendPrice",shopAction.shopListBySN);

  // ---------------------购物车end--------------------------- //

  // ---------------------分类--------------------------- //
  //商品菜单
  router.post(
    prefix + "/assortment/getListCategory",
    assentAction.getListCategory
  );
  // 根据id查询普通商品列表
  router.post(
    prefix + "/assortment/getProductList",
    assentAction.getProductList
  );
  // 查询商品详情
  router.post(
    prefix + "/assortment/queryGoodsDetail",
    assentAction.queryGoodsDetail
  );
  // 根据商品id查询普通商品详情
  router.post(
    prefix + "/assortment/getProductDetail",
    assentAction.getProductDetail
  );
  // 根据商品id查询商品评价
  router.post(prefix + "/assortment/queryEval", assentAction.queryEval);
  //搜索页面商品
  router.post(prefix + "/index/queryGoodsList", indexAction.queryGoodsList);
  // ---------------------分类--------------------------- //

  // ---------------------积分--------------------------- //
  // 用户订单中心-积分兑换列表
  router.post(prefix + "/integral/integralList", userAction.integralList);
  // 用户订单中心-积分兑换列表-立即兑换
  router.post(prefix + "/integral/redeemNow", userAction.redeemNow);
  // 用户订单中心-积分兑换列表-获取用户总积分
  router.post(
    prefix + "/integral/queryPointByuserId",
    userAction.queryPointByuserId
  );

  // ---------------------积分结束--------------------------- //

  //设置支付密码
  router.post(
    prefix + "/usercenter/setPayPassword",
    auth.isAuthenticated,
    userAction.setPayPassword
  );

  //修改支付密码
  router.post(
    prefix + "/usercenter/modifyPayPassword",
    auth.isAuthenticated,
    userAction.modifyPayPassword
  );

  //获取用户信息
  router.all("/api/getUserInfo", auth.is2Wex, userAction.getUserInfo);
  // 会员特权
  router.post(
    prefix + "/member/appPrivilegeList",
    auth.isAuthenticated,
    userAction.appPrivilegeList
  );

  // ---------------------结束--------------------------- //
  //修改用户信息
  router.post(
    prefix + "/usercenter/prefectInfo",
    auth.isAuthenticated,
    userAction.prefectInfo
  );
  //地址
  router.post(
    prefix + "/address/addressList",
    auth.isAuthenticated,
    userAction.addressList
  );
  // ---------------------分类--------------------------- //
  // ---------------------订单--------------------------- //
  //订单列表
  router.post(prefix + "/usercenter/myOrderList", userAction.myOrderList);
  //订单详情
  router.post(prefix + "/usercenter/orderDetail", userAction.orderDetail);
  //删除订单
  router.post(prefix + "/usercenter/orderDelete", userAction.orderDelete);
  //取消订单
  router.post(prefix + "/usercenter/orderCancel", userAction.orderCancel);
  //去评价
  router.post(
    prefix + "/usercenter/allRoundEvaluation",
    userAction.allRoundEvaluation
  );
  //提交评价
  router.post(prefix + "/usercenter/releaseEvalute", userAction.releaseEvalute);
  //发布评价
  router.post(prefix + "/usercenter/productEvalute", userAction.productEvalute);

  // ---------------------我的钱包开始--------------------------- //
  //我的钱包总金额
  router.post(
    prefix + "/usercenter/getMyPurseMoney",
    userAction.getMyPurseMoney
  );

  //我的钱包-收支明细
  router.post(
    prefix + "/usercenter/queryBudgetList",
    userAction.queryBudgetList
  );

  //充值
  //充值金额列表
  router.post(prefix + "/usercenter/moneyList", userAction.moneyList);
  //充值特权介绍
  router.post(prefix + "/usercenter/privilegeList", userAction.privilegeList);
  // ---------------------我的钱包结束--------------------------- //

  // ---------------------地址库开始--------------------------- //
  router.post(prefix + "/usercenter/queryAddress", userAction.queryAddress);
  router.post(prefix + "/usercenter/queryPersonal", userAction.queryPersonal);
  router.post(prefix + "/usercenter/queryAddPer", userAction.queryAddPer);
  router.post(
    prefix + "/usercenter/queryAddressDefault",
    userAction.queryAddressDefault
  );
  router.post(
    prefix + "/usercenter/queryAddressEdit",
    userAction.queryAddressEdit
  );
  router.post(prefix + "/usercenter/delAddress", userAction.delAddress);
  // ---------------------地址库结束--------------------------- //
  //----------------优惠券开始--------------------//
  router.post(prefix + "/usercenter/queryCoupon", userAction.queryCoupon);
  router.post(prefix + "/usercenter/queryCode", userAction.queryCode);
  //----------------优惠券结束--------------------//
};
