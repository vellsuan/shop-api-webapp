<template>
    <div class="contentTravel">
        <x-header :left-options="{backText: ''}">旅游详情</x-header>
        <div class="travel" id="vux_view_box_body" v-on:scroll.passive="onScroll" >
            <div class="bannerDiv swiper-container" ref="mySwiper">
                <swiper :options="swiperOption" class="swiper-wrapper" v-if="bannerImgList.length > 1">
                    <swiper-slide v-if="bannerImgList" v-for="(imgList,index) in bannerImgList" :key="index"><img class="banner" :src="imgUrl+imgList" /></swiper-slide>
                    <swiper-slide v-else><img class="banner" src="../assets/zw_lyxmxq.png"><img></swiper-slide>
                    <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
                    <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
                </swiper>
                <div class="swiper-wrapper" v-else>
                    <img class="banner" :src="imgUrl+bannerImgList[0]" />
                </div>
            </div>

            <div class="hotelName">
                <div>
                    <span>{{travelDetailsdata.routeTitle}}</span>
                </div>
                <div>
                    <span>此价包含：</span>
                    <span>{{travelDetailsdata.feePeople}}</span>
                </div>
            </div>
            <!-- <div class="goDate">出游日期：{{travelDetailsdata.goDate}}</div> -->
            <div class="tabmenu">
                <mySticky scroll-box="vux_view_box_body" ref="sticky" :check-sticky-support="false" :offset="47" :height="44">
                    <tab default-color="#2d2d2d" active-color="#b6a382" custom-bar-width="17px">
                        <tab-item  selected @on-item-click="onItemClick">行程安排</tab-item>
                        <tab-item  @on-item-click="onItemClick">价格包含</tab-item>
                        <tab-item  @on-item-click="onItemClick">预订规则</tab-item>
                        <tab-item  @on-item-click="onItemClick">取消规则</tab-item>
                        <tab-item  @on-item-click="onItemClick">景点介绍</tab-item>
                    </tab>
                </mySticky>
            </div>
            <div class="tabPanel" id="tabPanel">
                <div class="detailContent" >
                    <div id="anchor0" class="roomDevice comm">
                        <div>
                            <span class="line"></span>
                            <span class="text">行程安排</span>
                        </div>
                        <div class="scheduling">
                            <ul class="vux-timeline">
                                <li class="vux-timeline-item" v-for="item in travelDetailsdata.planList" :key="item .id">
                                    <div class="timer">{{item.ext1}}</div>
                                    <div class="linitem">
                                        <div class="clicall">
                                            <img src="../assets/tb_xch.png" alt="">
                                        </div>
                                        <div class="schedutext">{{item.content}}</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <price-cover :content="priceCover"></price-cover>
                    <reserve-rules :reserveRule="decodeURIComponent(travelDetailsdata.orderRule)"></reserve-rules>
                    <cancel-rules :cancelRule="decodeURIComponent(travelDetailsdata.cancelRule)"></cancel-rules>
                    <div id="anchor4" class="deltail comm">
                        <div>
                            <span class="line"></span>
                            <span class="text">景点介绍</span>
                        </div>
                        <div>
                            <img v-for="item in introduction" :src="imgUrl+item" :key="item.id" alt="" />
                            <div class="detailDes" v-html="decodeURIComponent(travelDetailsdata.scenicDesc)"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <footer>
      <div>
        <inline-x-number width="50px" button-style="round" :min="1" :value="1"></inline-x-number>
      </div>
      <div class="moneyText">&yen;
        <span>1000</span>
      </div>
      <div class="submitbtn">立即预订</div>
    </footer> -->
    </div>
</template>
<script>
import {
    XHeader,
    Tab,
    TabItem,
    Timeline,
    TimelineItem,
    InlineXNumber,
    Sticky
} from "vux";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import PriceCover from "@/components/pricecover";
import ReserveRules from "@/components/reserverules";
import CancelRules from "@/components/cancelrules";
import mySticky from "@/components/sticky/index";

export default {
    components: {
        XHeader,
        Tab,
        TabItem,
        swiper,
        swiperSlide,
        Sticky,
        mySticky,
        "price-cover": PriceCover,
        "reserve-rules": ReserveRules,
        "cancel-rules": CancelRules,
        Timeline,
        TimelineItem,
        InlineXNumber
    },
    data() {
        return {
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
            introduction:[],
            travelDetailsdata: {},
            imgUrl: "",
            bannerImgList: [],
            priceCover:{},
            clickNum:0,           //记录tab点击次数
            isSticky: false, //判断是否吸顶
            tabIndex:0         //记录点击的tab下标
        };
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.swiper;
        }
    },
    mounted() {
        let config = JSON.parse(window.localStorage.getItem("config"));
        this.imgUrl = config.ServerImgURL;
        const params = {
            url: "/hoteltravelRouteDetails",
            data: {
                id: this.$route.params.id,
                langId:"CN"
            }
        };

        this.api.post(params, res => {
            this.travelDetailsdata = res.entity;

            this.introduction=this.travelDetailsdata.scenicImg.split(',')

            // console.log(res.entity.itemImg);
            if (res.entity.itemImg) {
                this.bannerImgList = res.entity.itemImg.split(",");
            }
            this.priceCover = {
                priceInclude: res.entity.feeDesc,
                priceIncludeImg: res.entity.feeImg
            };

            this.$nextTick(() => {
                this.$refs.sticky.bindSticky();
            });
        });

        this.$nextTick(() => {
            this.$refs.sticky.bindSticky();
        });
        this.tabPanel=document.getElementById("tabPanel");
        this.offsetHeight=(document.documentElement && document.documentElement.offsetHeight) || document.body.offsetHeight-46-44;
    },
    methods: {
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

        }
    }
};
</script>
<style lang="less">
body {
    background: #efeff4;
}

// .stickytop{
//     top:44PX;
// }

.schedutext {
    font-size: 22px;/*px*/
    color: #2d2d2d;
    max-width: 460px;
    padding-bottom: 36px;
    overflow: hidden;
    text-overflow: ellipsis;
}

.vux-timeline-item-content {
    padding: 0 0 0.6rem 1.2rem !important;
}

.weui-icon-success-no-circle:before {
    content: none !important;
}

.vux-timeline-item-tail {
    width: 1px !important;
    /*no*/
    background-color: #dad1c0 !important;
}

.vux-timeline-item-head {
    background: #fff;
    border: 2px solid #dad1c0;
}

.contentTravel {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    overflow: auto; /* winphone8和android4+ */
    -webkit-overflow-scrolling: touch; /* ios5+ */
}

.travel {
    flex: 1;
    overflow: auto;
    position: relative;
}

footer {
    z-index: 9999;
    height: 100px;
    background: #ffffff;
    box-shadow: 0 -1px 2px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 30px;
    .moneyText {
        margin-left: 30px;
        font-size: 30px;/*px*/
        color: #2d2d2d;
        line-height: 36px;
    }
    .submitbtn {
        background: #090b0c;
        width: 256px;
        height: 100%;
        font-size: 30px;/*px*/
        color: #ffffff;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .vux-number-round .vux-number-selector {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        padding: 0;
        border-color: #b6a382;
        color: #b6a382;
    }
    .vux-number-round .vux-number-selector-sub svg {
        top: 0;
        fill: #b6a382;
    }
    .vux-number-selector-plus svg {
        fill: #b6a382;
    }
    .vux-number-input {
        font-size: 30px;/*px*/
    }
}

.travel .bannerDiv {
    height: 561px;
    .banner {
        height: 561px;
        width: 100%;
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

.travel .hotelName {
    background: #fff;
    border-radius: 6px;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
    margin: 0 30px 30px;
    padding:40px 34px 30px;
    text-align: center;
    left: 0;
    z-index: 2;
    right: 0;
    position: relative;
    top: -40px;
    margin-bottom:-10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    div:first-child {
        margin-bottom: 15px;
        span {
            line-height: 50px;
            font-size: 36px;/*px*/
            color: #2d2d2d;
        }
    }
    div:last-child {
        span {
            font-size: 22px;/*px*/
            color: #b6a382;
            line-height: 30px;
        }
    }
}

.goDate {
    background: #ffffff;
    height: 88px;
    line-height: 88px;
    text-align: center;
    margin-bottom: 11px;
    font-size: 28px;/*px*/
    color: #2d2d2d;
    margin-top: -10px;
    margin-bottom: 11px;
}
.tabPanel{
    width:100%;
    overflow: auto;
    position: relative;
    top:0;
}
.detailContent {
    div.comm {
        margin-bottom: 20px;
        background: #ffffff;
        transform: translateY(0);
        transition: transform 0.2s;
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
            margin-top: 14px; // margin-bottom: 40px;
        }
    }
    .roomDevice {
        height: auto;
        .scheduling {
            width: 100%;
            height: auto;
            .vux-timeline {
                padding: 0 42px 0 30px;
                padding-bottom: 60px;
                .vux-timeline-item {
                    list-style: none;
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    justify-content: flex-start;
                    // align-items: center;

                    // padding-top: 36px;
                    .vux-timeline-item-head {
                        border: none;
                    }

                    .timer {
                        width: 90px;
                        font-size: 24px;/*px*/
                        display: flex;
                        padding-bottom: 36px;
                    }

                    .vux-timeline-item-head-first {
                        margin: 0 10px;
                        .vux-timeline-item-checked {
                            display: block;
                            width: 20px;
                            height: 28px;
                            background: url(../assets/tb_xch.png) center 100%;
                            background-size: 100% 100%;
                            border: none;
                            border-radius: 0;
                        }
                    }
                    .vux-timeline-item-checked {
                        display: block;
                        width: 14px;
                        height: 14px;
                        border-radius: 50%;
                        border: 1px solid #dad1c0;
                        box-sizing: border-box;
                    }
                    .vux-timeline-item-color {
                        position: relative;
                        /*margin:20 14px 0 26px;*/

                        // border-left: 1px solid red;
                    }
                    .linitem {
                        display: flex;
                        border-left: 1px solid #dad1c0;
                        margin-left: 30px;
                        padding-left: 20px;
                    }
                    /* .line{
                    display: block;
                    position:relative;
                    left:-25px;
                    background:#dad1c0;
                    width:1PX;
                  height: auto;

                }*/
                }

                li + li {
                    line-height: 44px;
                    // padding-top: 36px;
                }
            }
        }
    }
    .deltail {
        background: #ffffff;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
        img {
            width: 100%;
            margin-bottom: 30px;
        }
        p {
            width: 100%;
        }
        .detailDes{
            padding: 0 30px 40px;
        }
    }
    li:nth-child(1) {
        .clicall {
            width: 20px;
            height: 29px;
            position: absolute;
            border: none;
            //  background: url("../assets/tb_xch.png") center no-repeat;
            background-size: 100%;
            border-radius: 0;
            margin-left: -30px;
            margin-top: 0;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
    .clicall {
        width: 16px;
        height: 16px;
        position: absolute;
        border: 1px solid #dad1c0;
        background: #ffffff;
        border-radius: 8px;
        margin-left: -28px;
        margin-top: 14px;
        img {
            width: 0;
            height: 0;
        }
    }
}
</style>
<style lang="less">
    .contentTravel{
        overflow-x:hidden;
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
</style>
