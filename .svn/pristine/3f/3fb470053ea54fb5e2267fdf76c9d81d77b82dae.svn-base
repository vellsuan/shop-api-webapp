<template>
    <div class="content">
        <x-header :left-options="{backText: ''}">{{room.roomTypeName}}</x-header>
        <div class="enjoy" id="vux_view_box_body" v-on:scroll.passive="onScroll">
            <div class="bannerDiv swiper-container" :class="{bannerIos:isIphone}" ref="mySwiper">
                <swiper :options="swiperOption" class="swiper-wrapper" v-if="enjoyDetailsdata.listimg2 && enjoyDetailsdata.listimg2.length > 1">
                    <swiper-slide v-if="enjoyDetailsdata.listimg2" v-for="(item,i) in enjoyDetailsdata.listimg2" :key="i"><img class="banner" :src="imgUrl+item" /></swiper-slide>
                    <swiper-slide  v-else ><img class="banner" :src="imgUrl+enjoyDetailsdata.listimg"><img></swiper-slide>
                    <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
                    <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
                </swiper>
                <div class="swiper-wrapper" v-else>
                    <img class="banner" :src="imgUrl+enjoyDetailsZreo" />
                </div>
            </div>
            <div class="enjoyTop">
                <div class="roomPrice">&yen;
                    <span>{{room.roomPrice}}</span>
                </div>
                <div class="hotelName">
                    <div>
                        <span>{{enjoyDetailsdata.brandName}}/{{room.roomTypeName}}</span>
                    </div>
                    <div>
                        <span>{{enjoyDetailsdata.hotelNameCn}}</span>
                        <!-- <span>{{enjoyDetailsdata.hotelNameEn}}</span> -->
                    </div>

                </div>
                <checker type="checkbox" default-item-class="check-item" selected-item-class="check-item-selected" v-show="haveTour">
                    <ul class="tourRoute">
                        <li>旅游线路
                        </li>
                        <li class="tourList" v-for="(list,index) in tourList.list" :key="index">
                            <div class="checkImg" :class="list.flag?'active':''" @click="checkClick(list)"></div>
                            <div class="desr">
                                <h3>{{list.routeTitle}}<img v-if="list.ext1==1" src="../assets/hotIcon.png" alt=""></h3>
                                <p refs="tourPrice">￥{{list.price}}</p>
                            </div>
                            <div class="link" @click="linkTo(list.id)">
                                <span>查看详情></span>
                            </div>
                        </li>
                    </ul>
                </checker>
            </div>
            <div class="tabmenu" >
                <mySticky scroll-box="vux_view_box_body" ref="sticky" :check-sticky-support="false" :offset="47" :height="44" :footerHeight="49">
                    <tab default-color="#2d2d2d" active-color="#b6a382" custom-bar-width="17px">
                        <tab-item selected @on-item-click="onItemClick">房间配备</tab-item>
                        <tab-item   @on-item-click="onItemClick">价格包含</tab-item>
                        <tab-item   @on-item-click="onItemClick">预订规则</tab-item>
                        <tab-item   @on-item-click="onItemClick">取消规则</tab-item>
                        <tab-item   @on-item-click="onItemClick">详情展示</tab-item>
                    </tab>
                </mySticky>
            </div>
            <div class="tabPanel" id="tabPanel">
                <div class="detailContent">
                    <!-- <div class="isHeight"></div> -->
                    <div id="anchor0" class="roomDevice comm">
                        <div>
                            <span class="line"></span>
                            <span class="text">房间配备</span>
                        </div>
                        <ul class="roomContent">
                            <li v-for="(deviceList,index) in enjoyDetailsdata.listfn" :key="index">
                                <img :src="imgUrl+deviceList.facilityImageUrl" alt="">
                                <span>{{deviceList.text}}</span>
                            </li>
                        </ul>
                    </div>
                    <price-cover :content="priceCover"></price-cover>
                    <reserve-rules :reserveRule="decodeURIComponent(room.ruleReserve)"></reserve-rules>
                    <cancel-rules :cancelRule="decodeURIComponent(room.ruleCancel)"></cancel-rules>
                    <div id="anchor4" class="deltail comm">
                        <div>
                            <span class="line"></span>
                            <span class="text">详情展示</span>
                        </div>
                        <div class="detailShow">
                            <img :src="imgUrl+room.roomDetailImg" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <footer>
            <div class="moneyText">
                <span>合计金额</span><span>&yen;</span><span>{{totalPrice}}</span>
            </div>
            <x-button class="submitbtn" :text="submitbtnText" @click.native="goOrder" type="primary"></x-button>
        </footer>
        <!-- 选择日期 -->
        <div v-transfer-dom>
            <popup v-model="dateCheck" hide-on-blur  @on-hide="dateCheck=false"   position="bottom">
                <calender
                    v-if="dateCheck"
                    :date="new Date(newDate)"
                    :monthNumber="4"
                    v-on:asureEvent="asureClick"
                    :onlyOne="false"
                    :dateObj="choiceDate"
                    v-on:closeChangeDate="closeChangeDate"
                    ></calender>
            </popup>
        </div>

    </div>
</template>
<script>
import {
    XHeader,
    Checker,
    CheckerItem,
    Tab,
    Group,
    Cell,
    TabItem,
    XButton,
    Sticky,
    Popup,
    Scroller
} from "vux";
import Calender from '@/components/calender'
import { swiper, swiperSlide } from "vue-awesome-swiper";
import PriceCover from "@/components/pricecover";
import ReserveRules from "@/components/reserverules";
import CancelRules from "@/components/cancelrules";
import mySticky from "@/components/sticky/index";
import { setInterval } from "timers";
import { mapState, mapMutations,mapActions } from "vuex";
import _moment from "moment";
// import BScroll from 'better-scroll';

export default {
    components: {
        XHeader,
        Checker,
        CheckerItem,
        Tab,
        TabItem,
        swiper,
        swiperSlide,
        Group,
        Cell,
        Popup,
        Calender,
        Sticky,
        mySticky,
        XButton,
        Scroller,
        "price-cover": PriceCover,
        "reserve-rules": ReserveRules,
        "cancel-rules": CancelRules
    },
    data() {
        return {
            isActive: false,
            swiperOption: {
                //循环
                loop: true,
                //设定初始化时slide的索引
                initialSlide: 0,
                //自动播放
                autoplay: 3000,
                //滑动速度
                speed: 800,
                autoplayDisableOnInteraction:false,
                prevButton:'.swiper-button-prev',
                nextButton:'.swiper-button-next',
                // //滑动速度
                // speed: 800,
                // navigation: {
                //     nextEl: ".swiper-button-next",
                //     prevEl: ".swiper-button-prev"
                // }
            },
            enjoyDetailsdata: {},
            tourList: {},
            haveTour:false,
            imgUrl: "",
            room: {},
            totalPrice: 0,
            array: [],
            priceCover: {},
            searchBarFixed: false,
            rateCode: "", //房价code
            hotelCode: "", //酒店code
            roomCode: "", //房型code
            brandCode: "", //品牌code
            isSync : "",//调用详情接口需要用到这个参数
            cardNo: "", //卡号
            companyCode: "1001", //集团code,
            reserveType: "", //预订类型CODE
            arrival: "", //入住日期
            departure: "", //	离店日期
            isSticky: false, //判断是否吸顶
            clickNum:0,           //记录tab点击次数
            nohaveRoom:false,    //是否有房间
            submitbtnText:"立即预订",
            isMarginTop:false,   //第一次点击未吸顶之前需给地下的元素加一个默认高
            dateCheck:false,                    //是否显示日期选择器
            newDate:0,                         //获取到的系统时间
            choiceDate:{                        //时间选择
                showStartDate: "",              //开始日期
                showEndDate:"",                 //结束日期
                daysNum: 1                      //日期间隔
            },
            enjoyDetailsZreo: '',                //当轮播只有一张图的时候
            isIphone:false
        };
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.swiper;
        }
    },
    mounted() {
        this.dateCheck=false;
        this.$nextTick(()=>{
            this.isIphone = this.terminal().iPhone
        })
        window.localStorage.removeItem('recording');
        this.selectTourCode([]);
        //   var that = this;
        //   this.swiper.slideTo(0,0,false);
        //   //自动播放
        //   setInterval(function(){
        //       that.swiper.slideNext()
        //   },2000);
        let config = JSON.parse(window.localStorage.getItem("config"));
        this.imgUrl = config.ServerImgURL;
        this.rateCode = this.getParams().rateCode;
        this.hotelCode = this.getParams().hotelCode;
        this.roomCode = this.getParams().roomCode;
        this.brandCode = this.getParams().brandCode;
        this.cardNo = this.getParams().cardNo;
        this.reserveType = this.getParams().guaranteeRuleCode;
        this.arrival = this.getParams().arrival; //入住日期
        this.departure = this.getParams().departure;
        this.isSync = this.getParams().isSync; //调用详情接口需要用到这个参数
        const hotelParams = {
            url: "/priceenjoydetails",
            data: {
                arrival: this.arrival, //入住日期
                departure: this.departure, //	离店日期
                rateCode: this.rateCode, //房价code
                hotelCode: this.hotelCode, //酒店code
                roomCode: this.roomCode, //房型code
                brandCode: this.brandCode, //品牌code
                // cardNo:this.cardNo|"",        //卡号
                companyCode: "1001", //集团code
                langId: "CN",
                isSync:this.isSync //必填 酒店的字段
            }
        };
        const tourParams = {
            url: "/hoteltravelRoute",
            data: {
                Arrival: this.arrival,
                Departure: this.departure,
                hotelCode: this.hotelCode,
                langId: "CN"
            }
        };
        this.api.post(hotelParams, res => {
            this.enjoyDetailsdata = res;
            this.room = res.room;
            if(this.enjoyDetailsdata && this.enjoyDetailsdata.listimg2.length <= 1){
                this.enjoyDetailsZreo =  this.enjoyDetailsdata.listimg2[0];
            }
            this.totalPrice += res.room.roomPrice;
            this.priceCover = {
                priceInclude: res.room.priceInclude,
                priceIncludeImg: res.room.priceIncludeImg || ''
            };
            let detailsObj = {
                rateCode: this.rateCode, //房价code
                hotelCode: this.hotelCode, //酒店code
                roomCode: this.roomCode, //房型code
                brandCode: this.brandCode, //品牌code
                cardNo: this.cardNo, //卡号
                roomSum: res.room.roomPrice, //房费
                reserveType: this.reserveType, //预订类型CODE
                brandName: res.brandName, //品牌名称
                hotelNameCn: res.hotelNameCn, //酒店中文名称
                hotelNameEn: res.hotelNameEn, //酒店英文名称
                roomTypeName: res.room.roomTypeName, //房型名称
                isSync:this.isSync //调用详情接口需要用到这个参数
            };
            this.roomDetails(detailsObj);
            this.$nextTick(() => {
                if(this.$refs.sticky){
                    this.$refs.sticky.bindSticky();
                }    
            });
        });
        this.api.post(tourParams, res => {
            this.tourList = res;
            if(this.tourList && this.tourList.list && this.tourList.list.length>0){
                this.haveTour=true;
            }
            this.$nextTick(() => {
                if(this.$refs.sticky){
                    this.$refs.sticky.bindSticky();
                }
            });
        });
        this.$nextTick(() => {
            if(this.$refs.sticky){
                this.$refs.sticky.bindSticky();
            }
        });
        this.tabPanel=document.getElementById("tabPanel");
        this.offsetHeight=(document.documentElement && document.documentElement.offsetHeight) || document.body.offsetHeight-46-44-49;
    },
    methods: {
        ...mapActions([
            'checkInOutInfo',
            'selectTourCode',
            'roomDetails'
        ]),
        onItemClick(index) {
            if(this.$refs.sticky.$el.className.indexOf("vux-fixed")==-1){
                this.clickNum=0;
                this.tabPanel.style.height="auto";
                document.getElementById("anchor" + index).scrollIntoView({
                    block: "start",
                    behavior: "smooth"
                });
            }
            this.clickNum++;
            this.tabIndex=index;
            document.getElementById("anchor" + index).scrollIntoView({
                block: "start",
                behavior: "smooth"
            });
        },
        onScroll() {
            if(this.clickNum==1){
                this.tabPanel.style.height="auto";
            }
            if(this.$refs.sticky.$el.className.indexOf("vux-fixed")==1){
                if(this.clickNum==1){
                    this.tabPanel.style.height=this.offsetHeight+"px";
                }
            }

        },
        // 获取系统时间
        getSystemTime(){
            const timeParams = {
                url : '/index/getSystemTime'
            }
            this.api.post(timeParams, res=> {
                let sysTime = res && res.sysTime;
                let nowDate=_moment(sysTime).format("YYYY-MM-DD");
                let endDate=_moment(sysTime+ 24 * 60 * 60 * 1000).format("YYYY-MM-DD");
                let obj={
                    checkinDate: nowDate,
                    checkoutDate: endDate,
                    startTime:_moment(sysTime).unix()
                };
                this.checkInOutInfo(obj);
                this.newDate=sysTime;
                this.choiceDate.showStartDate=nowDate;
                this.choiceDate.showEndDate=endDate;
                this.dateCheck =true;
            });
        },
        getParams() {
            var search = "?" + window.location.href.split("?")[1]; //获取location的search属性，保存在search中
            var params = {}; //创建空对象params
            if (search != "") {
                //如果search不是空字符串
                search
                    .slice(1)
                    .split("&")
                    .forEach(
                        //?username=zhangdong&pwd=123456;//search去开头?，按&切割为数组，forEach
                        function(val) {
                            var arr = val.split("="); //将当前元素值按=切割，保存在arr中
                            params[arr[0]] = arr[1]; //向params中添加一个元素,属性名为arr[0],值为arr[1]
                        }
                    );
            }
            return params;
        },
        checkClick(list) {
            list.flag = !list.flag;
            if (list.flag) {
                this.totalPrice += Number(list.price);
                this.array.push(list.itemCodes);
                this.selectTourCode(this.array);
            } else {
                this.totalPrice -= Number(list.price);
                this.$store.state.selectTourCode = "";
                let index = this.array.indexOf(list.itemCodes);
                this.array.splice(index, 1);
                this.selectTourCode(this.array);
            }
        },
        //查看旅游项目详情
        linkTo(id) {
            if (process.env.NODE_ENV === 'production') {
                // koa page-router配置跳转地址 不带#号
                window.location.href = "/homestay/travelDetails#/" + id;
            }
            if (process.env.NODE_ENV === 'development') {
                // vue哈希路有。 带#号
                window.location.href = "/travelproject.html#/" + id;
            }
        },
        // 查询每日房价及房量
        getRoomDayPrice(dayParams){
            dayParams={
                url: "/getHotelDayPrice",
                data: {
                    adultNum:"1",	//成人数量
                    arrival:this.arrival, 	//入住日期	YYYY-MM-DD
                    departure:this.departure,	//离店日期	YYYY-MM-DD
                    hotelCode:this.hotelCode,	//	酒店Code
                    rateCode:this.rateCode,	//	房价代码
                    roomCode:this.roomCode,	//	房型Code
                    roomNum:"1",	//	房间数量
                }
            }
            this.api.post(dayParams, res => {
                // console.log(res,23);
                if(res.availableRooms<=0 || res.availableRooms==""){
                    this.$vux.toast.text("所选时间内无房","middle")
                }else{
                    if (process.env.NODE_ENV === 'production') {
                        // koa page-router配置跳转地址 不带#号
                        window.location.href = "/homestay/priceenjoyDetails#/priceenjoyorder";
                    }
                    if (process.env.NODE_ENV === 'development') {
                        // vue哈希路有。 带#号
                        window.location.href = "/priceenjoy.html#/priceenjoyorder";
                    }
                }
            });
        },
        //选择日期之后接受日期子组件返回的值
        asureClick (chooseDate) {
            this.choiceDate.showStartDate=chooseDate.showStartDate;
            this.choiceDate.showEndDate=chooseDate.showEndDate;
            this.choiceDate.daysNum=chooseDate.daysNum;
            this.checkInOutInfo({
                checkinDate: chooseDate.startDate.format,
                checkoutDate: chooseDate.endDate.format,
                startTime:chooseDate.startDate.time
            });
            this.arrival=chooseDate.startDate.format;
            this.departure=chooseDate.endDate.format;
            this.getRoomDayPrice();
            this.dateCheck=false;
        },
        closeChangeDate(){
            this.dateCheck=false;
        },
        goOrder() {
            let userInfo = JSON.parse(localStorage.getItem("userInfo"));
            if(userInfo){
                this.getSystemTime();
            }else{
                if (process.env.NODE_ENV === 'production') {
                    // koa page-router配置跳转地址 不带#号
                    window.location.href = "/homestay/home#/bindphone";
                }
                if (process.env.NODE_ENV === 'development') {
                    // vue哈希路有。 带#号
                    window.location.href = "/home.html#/bindphone";
                }
            }
        }
    }
};
</script>
<style lang="less" scoped>
body {
    background: #efeff4;
}
.content {
    overflow-x: hidden;
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    overflow: auto; /* winphone8和android4+ */
    -webkit-overflow-scrolling: touch; /* ios5+ */
    /deep/
    .vux-header{
        background:#2d2d2d;
        height:47PX;
        .vux-header-title{
            height:44PX;
            line-height:44PX;
            font-size: 32px;/*px*/
            font-weight:400;
        }
        .vux-header-left{
            .left-arrow{
                
            }
            .left-arrow:before{
                width:10PX;
                height:10PX;
                border-width: 2PX 0 0 2PX;
                top: 0;
                bottom:0;
                margin:auto;
            }
        }
    }
}
.enjoy {
    flex: 1;
    overflow: auto;
    position: relative;
}
.enjoyTop {
    width: 95%;
    height: auto;
    background: #fff;
    border-radius: 6px;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
    margin: -40px auto;
    // left: 0;
    // right: 0;
     position: relative;
    // top: -40px;
    margin-bottom:20px;
     z-index: 222;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .roomPrice {
        width: 230px;
        height: 96px;
        color: #fff;
        line-height: 96px;
        font-size: 46px;/*px*/
        text-align: center;
        background: #2d2d2d;
        margin-top: -40px;
        position: relative;
        z-index: 20;
        span {
            color: #fff;
            font-size: 46px;/*px*/
            margin-left: 10px;
            font-weight: 600;
        }
    }
    .hotelName {
        width: 90%;
        margin: 40px auto 30px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        div:first-child {
            line-height: 50px;
            text-align: center;
            margin-bottom: 10px;
            span {
                line-height: 50px;
                font-size: 36px;/*px*/
                color: #2d2d2d;
            }
        }
        div:last-child {
            text-align: center;
            span {
                font-size: 26px;/*px*/
                color: #b6a382;
                line-height: 30px;
            }
            span:first-child {
                margin-right: 20px;
            }
        }
    }
}
.tourRoute {
    width: 100%;
    height: auto;
    border-top: 1px solid #eeeeee;
    padding:30px;
    padding-bottom: 0;
    li {
        list-style: none;
        &:first-child {
            height: 34px;
            line-height:  34px;
            background: url(../assets/tb_xch.png) no-repeat left center;
            background-size: 28px 28px;
            padding-left: 56px;
            color: #B6A382;
            font-size: 24px;/*px*/
            letter-spacing: 0;
            text-align: left;
        }
    }
    .tourList {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        min-height: 130px;
        border-bottom: 1px solid #eee;
        padding: 23px 0;
        .checkImg{
            width:56px;
            height:100%;
            min-height: 100px;
            background: url(../assets/a3_iconk.png) no-repeat left center;
            background-size:36px 36px;
            &.active{
                background: url(../assets/a3_icon.png) no-repeat left center;
                background-size:36px 36px;
            }
        }
        &:last-child {
            border: none;
        }
        div.desr {
            flex: 1;
            h3 {
                width: 100%;
                color: rgba(45, 45, 45, 1);
                font-size: 26px;/*px*/
                text-align: left;
                font-weight:400;
                margin-bottom: 20px;
                img{
                    height: 28px;
                    margin-left:12px;
                    vertical-align: middle;
                }
            }
            p {
                width: 100%;
                height: 33px;
                line-height: 33px;
                color: rgba(234, 84, 20, 1);
                font-size: 28px;/*px*/
                text-align: left;
            }
        }
        .link {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            height: 30px;
            line-height: 30px;
            color: rgba(102, 102, 102, 1);
            font-size: 22px;/*px*/
            .vux-x-icon {
                fill: rgba(102, 102, 102, 1);
            }
        }
    }
}
.vux-checker-box{
    width:100%;
}
.check-item {
    font-size: 36px;/*px*/
    width: 36px;
    height: 36px;
    display: block;
    margin-right: 20px;
    color: #2d2d2d !important;
    border: 2px solid #979797;
    border-radius: 50%;
}
.check-item-selected {
    background: url(../assets/a3_icon.png) no-repeat center center;
    background-size: 100% 100%;
    border: 0;
}
footer {
    z-index:400;
    height: 49PX;
    background: #ffffff;
    box-shadow: 0 -1px 2px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .moneyText {
        margin-left: 30px;
        font-size: 30px;/*px*/
        color: rgba(234, 84, 20, 1);
        line-height: 36px;
        span{
            font-size: 30px;/*px*/
            color: rgba(234, 84, 20, 1);
        }
        span:first-child {
            line-height: 36px;
            color: rgba(102, 102, 102, 1);
            font-size: 26px;/*px*/
            margin-right: 24px;
        }
        span:last-child {
            margin-left: 4px;
            font-weight: 700;
        }
    }
    .submitbtn {
        background: #090b0c;
        width: 256px;
        height: 100%;
        font-weight: 700;
        font-size: 30px;/*px*/
        color: #ffffff;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        margin:0;
        padding:0;
        border-radius: 0;
        &.noRoombtn {
            background: darkgray;
        }
        &:active {
            border:none;
            color:#ffffff!important;
            background-color: #090b0c!important;
        }
    }
}

.tabPanel{
    width:100%;
    overflow: auto;
    position: relative;
    top:0;
}
.detailContent {
    position: relative;
    div.comm {
        margin-bottom: 20px;
        background: #ffffff;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
        > div:first-child {
            display: flex;
            padding-left: 30px;
            height: 120px;
            align-items: center;
            .line {
                width: 3px; /*no*/
                height: 24px;
                margin-right: 20px;
                opacity: 0.5;
                background: #B6A382;
                border-radius: 100px;
            }
            .text {
                font-size: 30px;/*px*/
                color: #2d2d2d;
            }
        }
        > div:last-child {
            margin-top: 14px;
            // margin-bottom: 40px;
        }
    }
    .roomDevice {
        .roomContent {
            // height: 264px;
            width: 100%;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-items: center;
            > li {
                width: 25%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin-bottom: 30px;
                > img {
                    height: 60px;
                    margin-bottom: 20px;
                }
                > span {
                    font-size: 20px;/*px*/
                    color: #2d2d2d;
                    text-align: center;
                }
            }
        }
    }
    .deltail {
        background: #ffffff;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
        .detailShow {
            width: 100%;
            padding-bottom: 40px;
            margin: 0 auto;
            img {
                display: block;
                width: 100%;
                margin-bottom: 20px;
                &:last-child {
                    margin: 0;
                }
            }
        }
    }
}
</style>
<style lang="less">
.stickytop{
    // top: 44PX;
    // padding-bottom:44PX;
}
.vux-sticky-box{
    z-index:1000;
}
.content{
    #vux_view_box_body{
        .tabmenu{
            .vux-tab{
                .vux-tab-ink-bar{
                    .vux-tab-bar-inner{
                        border-radius: 100px;
                    }
                }
            }
        }
    }
    .isHeight{
        height:90PX;
        position: absolute;
        top:-90PX;
        width: 100%;
        visibility: hidden;
    }
}
.enjoy .bannerDiv {
    height: 561px;
    //z-index:-1;
    z-index: 0;
    .banner {
        height: 561px;
        width: 100%;
    }
    .swiper-wrapper{
        .swiper-wrapper{
            z-index: -1;
        }
    }
    .swiper-button-prev,
    .swiper-button-next {
        width: 52px;
        height: 52px;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.6);
        box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.3);
        background-size: 12px 20px;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        border: none;
        outline: none;
    }
}
.enjoy .bannerIos{
    z-index:-1;
}
</style>
