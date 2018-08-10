'use strict'
var log = require("../../utils/logUtil.js")("/controller/base/mapAction");
var Base = require('./baseAction.js');

/**
 * 根据坐标获取一个范围的门店
 * @param {Object} data
 */
exports.searchAction = async (ctx, next) =>{
    var rsdata = Base.getParams(ctx);
    var location = rsdata["location"]||"";
    var rstjosn = {"code":"222222","message":"定位异常！"};
    if(!location){
        var ip = Base.getClientIp(ctx.request);
        var point =  await Base.mapService.locationIP({"ip":ip});
        if(!point||!point.x){
            rstjosn.message = "获取坐标异常！";
            Base.getResponseRes(ctx,rstjosn);
            return ;
        }
        location = (point.x + "," + point.y)||"";
    }else{
        var data = {};
        data["coords"] = location;
        data["from"] =  "1";
        data["to"] = "6";
        var  point = await  Base.mapService.getXYToXY(data);
        if(!point){
            rstjosn.message = "坐标转化失败！";
            Base.getResponseRes(ctx,rstjosn);
            return;
        }
        location = (point.x + "," + point.y)||"";
    }

    var searbyList =  await Base.mapService.searchSearby({"location": location});
    if(!searbyList){
        rstjosn.message = "获取门店附近门店异常！";
        Base.getResponseRes(ctx,rstjosn);
        return ;
    }

    console.log("定位前sessionData门店数据："+JSON.stringify(Base.getSessionData(ctx.session,"sessionConstant_shopInfo")));
    //附近门店定位 暂时先用博瑞大厦
    searbyList = [{"telphone":"010-52080819","openTime":"8:00","closeTime":"21:00","tags":"brunocaffe-博瑞店","uid":2089100275,"province":"北京市","geotable_id":165819,"shop_sn":"B00019","modify_time":1494573318,"district":"朝阳区","create_time":1493888521,"city":"北京市","location":[12965420.196819026,4828531.374553259],"address":"北京市朝阳区东三环北路28号609","title":"brunocaffe-博瑞店","coord_type":4,"direction":"西","type":0,"distance":5920,"weight":0}];
    var shopInfo = searbyList&&searbyList[0]||{};
	if(shopInfo&&shopInfo.location){
		var data = {};
        data["coords"] = shopInfo.location[0]+","+shopInfo.location[1];
        data["from"] =  "6";
        data["to"] = "5";
        var  point = await  Base.mapService.getXYToXY(data);
        if(!point){
            rstjosn.message = "坐标转化失败！";
            Base.getResponseRes(ctx,rstjosn);
            return;
        }
        shopInfo.longitude  = point.x;
        shopInfo.latitude = point.y;
	}
	shopInfo.shopSn = shopInfo.shop_sn||"";
    log.info("当前门店信息 ===>"+JSON.stringify(shopInfo));
    Base.saveSessionData(ctx.session,"sessionConstant_shopInfoList",searbyList);
    Base.saveSessionData(ctx.session,"sessionConstant_shopInfo",shopInfo);
    Base.getResponseRes(ctx,{result:shopInfo});
}


/**
 *坐标转化
 * @param coords：需要转化的坐标串  from 当前类型  to 转换出的类型
 */
exports.getXYToXY = async(ctx, next) => {
    var parms = Base.getParams(ctx);
    var data = {};
    data["coords"] = parms.coords || "";
    data["from"] = parms.form || "1";
    data["to"] = parms.to ||"6";
    var  point = await  Base.mapService.getXYToXY(data);
    // var locationXY = (point.x + "," + point.y)||"";
    if(!point){
        var rstjosn = {"code":"222222","message":"坐标转化！"};
        Base.getResponseRes(ctx,rstjosn);
        return;
    }
    Base.getResponseRes(ctx,{result:point});
}


/**
 * 获取门店列表
 * @param data
 */
exports.getShopList = async(ctx, next) => {
   var shopInfo = Base.getSessionData(ctx.session,"sessionConstant_shopInfo");
   if(!shopList.length){
       var rstjosn = {"code":"222222","message":"门店列表获取失败!"};
       Base.getResponseRes(ctx,rstjosn);
       return
   }
   Base.getResponseRes(ctx,{result:shopInfo});
}


/**
 * 检索匹配用户地址
 * @param next
 */
exports.getUserAddress = async(ctx, next) =>{
    var parms = Base.getParams(ctx)||{};
    var userAddress = await Base.mapService.getUserAddress(parms);
    var list = userAddress.result || [];
    Base.getResponseRes(ctx,{result:list});
}

/**
 * 根据坐标检索匹配用户详细地址
 * @param next
 */
exports.getAddressDetail = async(ctx, next) =>{
    var parms = Base.getParams(ctx)||{};
    var detailAddress = await Base.mapService.getAddressDetail(parms);
    Base.getResponseRes(ctx,{result:detailAddress});
}


/**
 *计算距离
 * @param next
 */
exports.routeMatrix = async(ctx, next) =>{
	var parms = Base.getParams(ctx)||{};
    var rsdata = await Base.mapService.routeMatrix(parms);
    Base.getResponseRes(ctx,rsdata);
}
