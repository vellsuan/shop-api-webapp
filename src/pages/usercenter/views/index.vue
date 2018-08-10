<template>
    <div class="user-center">
        <drawer
            :show.sync="drawerVisibility"
            :show-mode="showModeValue"
            :placement="showPlacementValue"
            :drawer-style="{'background-color':'#2d2d2d', 'box-shadow' : '1px 0 2px 0 rgba(0,0,0,0.10)', width: '4.4rem'}">
            <!-- drawer content -->
            <div slot="drawer">
                <div class="ms_logo">
                    <img src="../../home/assets/xijuntaiwxlogo.svg" />
                </div>
                <div class="ms_menu">
                    <div class="member-card">
                        <img src="../assets/tb_hyk1.png" alt="" />
                        <span @click="goIndexList(1)">会员卡</span>
                    </div>
                    <div class="one-price-enjoy">
                        <img src="../assets/tb_yjjx2.png" alt="" />
                        <span @click="goIndexList(2)">房间预订</span>
                    </div>
                    <div class="order-center">
                        <img src="../assets/tb_ddzx4.png" alt="" />
                        <span @click="drawerVisibility = false">会员中心</span>
                    </div>
                    <!-- <div class="member-card">
                        <img src="../assets/tb_hyk1.png" alt="" />
                        <span>会员卡</span>
                    </div>
                    <div class="one-price-enjoy">
                        <img src="../assets/tb_yjjx2.png" alt="" />
                        <span>房间预定</span>
                    </div>
                    <div class="tourism-project">
                        <img src="../assets/tb_lyxm3.png" alt="" />
                        <span>旅游项目</span>
                    </div> -->
                    <!-- <div class="order-center">
                        <img src="../assets/tb_ddzx4.png" alt="" />
                        <span>订单中心</span>
                    </div> -->
                </div>
            </div>

            <view-box ref="viewBox" body-padding-bottom="0">
                <x-header slot="header" @on-click-more="onClickMore">
                    <img slot="overwrite-title" src="../../../assets/header_logo_new.png" />
                    <div slot="overwrite-left" size="35">
                        <img src="../assets/tb_cbl.png"  @click="drawerVisibility = !drawerVisibility"/>
                    </div>
                    <img slot="right" src="../../../assets/contact_us.png" @click="goToContactUs" />
                </x-header>

                    <div class="banner">
                        <router-link to="/personalinfo">
                            <div class="nick-name">
                                <img :src="userImg">
                                <span>{{nickName}}</span>
                            </div>
                        </router-link>
                    </div>

                <div class="details">
                    <div class="details-centent">
                        <router-link to="/orders?active=0">
                            <div class="details-t">
                                <div class="details-tl">
                                    <img src="../assets/tbdzx_icon.png">
                                    <span>我的订单</span>
                                </div>
                                <div class="details-tr"></div>
                            </div>
                        </router-link>
                        <div class="details-m">
                            <router-link to="/orders?active=1">
                            <div class="btn">
                                <span>{{noPayCount}}</span>
                                <span>待付款</span>
                            </div>
                            </router-link>
                            <router-link to="/orders?active=2">
                            <div class="btn">
                                <span>{{noEvaluateCount}}</span>
                                <span>待评价</span>
                            </div>
                            </router-link>
                            <router-link to="/orders?active=0">
                            <div class="btn">
                                <span>{{orderCounts}}</span>
                                <span>全部订单</span>
                            </div>
                            </router-link>
                        </div>
                        <div class="border-t vux-1px-t"></div>
                        <div class="details-b">
                            <router-link to="/cardbug">
                            <div class="btn">
                                <span>我的卡包</span>
                                <span>{{giftBag}}</span>
                            </div>
                            </router-link>
                            <router-link to="/coupon">
                                <div class="btn">
                                    <span>优惠券</span>
                                    <span>{{coupon}}</span>
                                </div>
                            </router-link>
                            <div class="btn" @click="points">
                                <span>积分管理</span>
                                <span>{{pointsNum}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </view-box>
        </drawer>
    </div>
</template>
<script>
import {Cell, Drawer,ViewBox, XHeader, XButton ,Loading} from 'vux'
import userImg from '../assets/userimg@2x.png';
export default {
    components: {
        Cell,
        XHeader,
        XButton,
        Drawer,
        ViewBox,
        Loading
    },
    data () {
        return {
            coupon:"0",
            giftBag:"0",
            nickName:"",
            noEvaluateCount:"0",
            noPayCount:"0",
            orderCounts:"0",
            pointsNum:"0",
            pointExchange:"0",
            showMenu: false,
            drawerVisibility: false,
            showMode: 'push',
            showModeValue: 'push',
            showPlacement: 'left',
            showPlacementValue: 'left',
            imgURL : JSON.parse(window.localStorage.getItem("config")).ServerImgURL,
            userImg: JSON.parse(window.localStorage.getItem("userInfo")).userImg
            }
    },
    mounted () {
        const params = {
            url: "/userOrderCenter",
            data: {
                userId:JSON.parse(window.localStorage.getItem("userInfo")).userId
            }
        };
        this.api.post(params, res => {
            this.coupon = res.coupon
            this.giftBag = res.giftBag
            this.nickName = res.nickName
            this.noEvaluateCount = res.noEvaluateCount
            this.noPayCount = res.noPayCount
            this.orderCounts = res.orderCounts
            this.pointsNum = res.pointsNum
            this.pointExchange = res.pointExchange
            // this.userImg = res.userImg
            if(!this.userImg){
                if(res.userImg && res.userImg != "null"){
                    this.userImg = res.userImg
                }else{
                    this.userImg = userImg
                }
            }
            // else if(JSON.parse(window.localStorage.getItem("userInfo")).userImg){
            //     this.userImg = JSON.parse(window.localStorage.getItem("userInfo")).userImg
            // }
        },false,msg=>{
            this.userImg = userImg
        });
        //首页，个人中心页面侧滑，进入页面背景颜色整改，（让侧滑不出现空白间隙）
        this.$nextTick(()=>{
            document.body.style.background ="rgb(45,45,45)"
        });
    },
    methods: {
        onClickMore () {
            this.showMenu = true
        },
        points(){
            if (process.env.NODE_ENV === 'production') {
                // koa page-router配置跳转地址 不带#号
                window.location.href='/homestay/integral'
            }
            if (process.env.NODE_ENV === 'development') {
                // vue哈希路有。 带#号
                window.location.href='/integral.html#/'
            }
        },
        //跳转到首页选择指定列表
        goIndexList(num){
            if(num == 1){
                if (process.env.NODE_ENV === 'production') {
                    // koa page-router配置跳转地址 不带#号
                    window.location.href='/homestay/home#/?num=0'
                }
                if (process.env.NODE_ENV === 'development') {
                    // vue哈希路有。 带#号
                    window.location.href='/home.html#/?num=0'
                }
            }else{
                if (process.env.NODE_ENV === 'production') {
                    // koa page-router配置跳转地址 不带#号
                    window.location.href='/homestay/home#/?num=1'
                }
                if (process.env.NODE_ENV === 'development') {
                    // vue哈希路有。 带#号
                    window.location.href='/home.html#/?num=1'
                }
            }
        },
        //跳转联系我们页面
        goToContactUs(){
            if (process.env.NODE_ENV === 'production') {
                // koa page-router配置跳转地址 不带#号
                window.location.href = "/homestay/usercenter#/contactus"
            }
            if (process.env.NODE_ENV === 'development') {
                // vue哈希路有。 带#号
                window.location.href = "/usercenter.html#/contactus"
            }
        }
    }
}
</script>
<style lang="less">
    .user-center{
        height: 100%;
        overflow-x: hidden;
        .vux-drawer{
            height: 100%;
            .vux-drawer-content{
                div{
                    display: flex;
                    flex-direction: column;
                    .ms_logo{
                        height: 250px;
                        width: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        img{
                            height: 158px;
                            width: 158px;
                        }
                        span{
                            font-size:28px;/*px*/
                            color:#ffffff;
                            text-align:center;
                        }
                    }
                    .ms_menu{
                    height: 100%;
                    width: 100%;
                    padding-left: 40px;
                        .member-card,.one-price-enjoy,.order-center{
                            width: 100%;
                            height: 40px;
                            margin-bottom: 80px;
                            display: block;
                            img{
                                float: left;
                            width: 36px;
                            height: 36px;
                            margin-right: 40px;
                            }
                            span{
                                line-height: 36px;
                                width: 60%;
                                float: left;
                                font-size:32px;/*px*/
                                color:#ffffff;
                            }
                        }
                    }
                }
            }
            .vux-drawer-body{
                .weui-tab{
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    background: #efeff4;
                    .vux-header{
                        background: #2d2d2d!important;
                        height: 47PX;
                        .vux-header-left{
                            div{
                            margin-top: 3px;
                                img{
                                    width: 40px;
                                    height: 34px;
                                }
                            }
                        }
                        .vux-header-title{
                            line-height:44PX;
                            font-size: 32px;/* px */
                        }
                    }
                    .weui-tab__panel{
                        flex:1;
                        overflow-y: auto;
                    }
                }
            }
        }
        .vux-header{
            background:#2d2d2d;
            height:47PX;
            padding:6PX 0;
            .vux-header-title{
                height:44PX;
                line-height:44PX;
                font-size: 32px;/*px*/
                font-weight:400;
                span{
                    font-size: 32px;/*px*/
                }
            }
            .vux-header-title-area{
                text-align: center;
                line-height: 44PX;
                img{
                    //width: 44PX;
                    height:36PX;
                }
            }
            .vux-header-left{
                div{
                    img{
                        width: 40px;
                        height: 34px;
                    }
                }
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
            .vux-header-right{
                img{
                    width: 20PX;
                    height: 20PX;
                }
            }
        }
        .banner{
            height:440px;
            background:url('../assets/bgdzx_bg.png') center no-repeat;
            background-size: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            .nick-name{
                width: 200px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                img{
                    width: 164px;
                    height: 164px;
                    border: 4px solid #fff;
                    border-radius:100%;
                }
                span{
                    font-size: 28px;/* px */
                    line-height: 40px;
                    margin: 30px 0;
                    color:#b6a382;
                }
            }
        }
        .details{
            background: #fff;
            border-radius:6px;
            width:690px;
            height:604px;
            margin: -40px auto 0;
            padding: 20px;
            .details-centent{
                height: 100%;
                width: 100%;
                padding-top: 40px;
                background: url("../assets/wddd_bk.png") 0 0 no-repeat;
                background-size: 100%;
                .border-t{
                    height: 0px;
                    margin: 60px 0 0;
                    padding-bottom: 80px;
                }
                .border-t.vux-1px-t:before{
                    border-color: #eeeeee;
                }
                .details-t{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 0 40px 0 40px ;
                    .details-tl{
                        display: flex;
                        width: 100%;
                        align-items: center;
                        height: 48px;
                        img,span{
                            display: block;
                            height: 48px;
                            line-height: 48px;
                        }
                        span{
                            padding-left: 30px;
                            color:#2d2d2d;
                            font-size: 32px;/* px */
                        }
                    }
                    .details-tr{
                        width: 16px;
                        height: 16px;
                        border-top: 2px solid #b6a382;
                        border-right: 2px solid #b6a382;
                        transform: rotate(45deg);
                    }
                }
                .details-m,.details-b{
                    height: 96px;
                    display: flex;
                    justify-content: space-around;
                    margin-top: 42px;
                    // padding: 0 82px 0 108px;
                    .btn,a{
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        align-items: center;
                        height: 100%;
                        flex: 1;
                        span{
                            font-size:24px;/* px */
                            color:#666666;
                        }
                        span:first-child{
                            font-size:34px;/* px */
                            color:#b6a382;
                        }
                    }
                }
                .details-b{
                    margin: 0;
                    height: 120px;
                    .btn{
                        span{
                            font-size:34px; /* px */
                            color:#ae7f47;
                        }
                        span:first-child{
                            font-size:24px; /* px */
                            color:#989898;
                        }
                        &::after{
                            content:"";
                            display: block;
                            background:#ae7f47;
                            border-radius:100px;
                            width:30px;
                            height:3px;
                        }
                    }

                }

            }
        }
    }
</style>
