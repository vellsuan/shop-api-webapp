'use strict'
const convert = require('koa-convert');
const mapAction = require("../controller/base/mapAction.js");
const wxAction = require("../controller/base/wecahtAction.js");
const loginAction = require("../controller/base/loginAction.js");
const staticAction = require("../controller/base/staticAction.js");
const wx = require("../wechat-api/wx.js");


module.exports = (router) => {
    //微信服务器验证及回复
    router.all('/api/wx', convert(wxAction.wxHandler("", wx.reply)));

     //小程序登陆服务
     router.post('/api/wx/loginMiniProgrom',loginAction.loginMiniProgrom);

    //js_sdk微信授权
    router.post('/api/wx/wxAauthSDK', convert(wxAction.wxAauthSDK()));
    //微信支付
    router.post('/api/wx/wxPay', convert(wxAction.wxPay()));
    //百度地图 查询附近门店
    router.post('/api/map/searchSearby', mapAction.searchAction);
    //坐标转化
    router.post('/api/map/getXYToXY', mapAction.getXYToXY);
    //本地信息检索
    router.post('/api/map/getUserAddress', mapAction.getUserAddress);
    //检索匹配用户详细信息
    router.post('/api/map/getAddressDetail', mapAction.getAddressDetail);
    //计算距离
    router.post('/api/map/routeMatrix', mapAction.routeMatrix);
    //获取系统时间
    router.post("/api/index/getSystemTime", staticAction.getSystemTime);
    //获取配置文件信息(后台请求地址，图片服务器地址等)
    router.all('/api/getServStatic', staticAction.getServStatic);
}