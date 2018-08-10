<template>
    <div class="redeemlist">
        <flexbox :gutter="0" wrap="wrap">
            <flexbox-item v-for="(item,i) in integralList" :key="i">
                <div class="flex-demo">
                    <div class="redeem-list-img">
                        <router-link :to="{ path:'/goodsDetail', query:{id : integralList[i].id, couponKeyCode : integralList[i].couponCodeKey ,sendState:integralList[i].sendState}}">
                            <img :src='imgURL + integralList[i].imgUrl' alt="" />
                        </router-link>
                        <!-- <div class="redeem-list-name">
                            <span></span>
                        </div> -->
                    </div>
                    <div class="redeem-list-content">
                        <div class="content-piece"></div>
                        <div class="content-title">
                            <span>{{integralList[i].couponName}}</span>
                            <!-- <span></span> -->
                            <span>{{integralList[i].credits}}分</span>
                        </div>
                        <!-- <router-link :to="'/confirmexchange?id=' + integralList[i].id + '&sendState='+integralList[i].sendState"> -->
                        <router-link :to="{ path:'/confirmexchange', query:{couponKeyCode : integralList[i].couponCodeKey ,sendState:integralList[i].sendState}}">
                            <div class="redeem-now">
                                <span>立即兑换</span>
                            </div>
                        </router-link>
                    </div>
                </div>
            </flexbox-item>
        </flexbox>
    </div>
</template>
<script>
import { Flexbox, FlexboxItem } from 'vux'
import BScroll from 'better-scroll'

export default {
    components: {
        Flexbox,
        FlexboxItem,
    },
    data () {
        return {
            integralList:[],
            imgURL : JSON.parse(window.localStorage.getItem("config")).ServerImgURL,
            showIntegralMain:true
        }
    },
    methods:{
        getintegralList(currentPageNum){
            const params = {
                url : '/integralList',
                data : {
                    currentPageNum : currentPageNum,
                    pageCount : 4,
                    langId : 'CN',
                    state : '0'
                }
            }
            this.api.post(params, res=> {
                if(res.page.datas[0]){
                    this.integralList = this.integralList.concat(res.page.datas);
                    this.$emit("echoShow",1,this.integralList)
                }else{
                    this.$emit("echoShow",2,this.integralList)
                }
                if(!this.integralList[0]){
                    this.$emit("echoShow",3,this.integralList)
                }
            });
        },
        // goToDetail(Id){
        //     // 查看兑换商品详情
        //     this.$router.push({ path: '/goodsDetail', query: {"couponKeyCode": Id} });
        // }
    }
}
</script>
<style lang="less">
    .redeemlist{
        background: #ffffff;
        .vux-flexbox{
            padding: 0 20px;
            .vux-flexbox-item{
                width: 49%;
                height: 500px;
                margin-bottom: 20px;
                flex:none;
                .flex-demo{
                    .redeem-list-img{
                        width: 100%;
                        height: 345px;
                        position: relative;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                        .redeem-list-name{
                            opacity:0.8;
                            background:#2d2d2d;
                            width:100%;
                            height:44px;
                            position: absolute;
                            bottom: 0;
                            text-align:center;
                            span{
                                font-size:22px;/*px*/
                                color:#ffffff;
                                line-height:44px;
                            }
                        }
                    }
                    .redeem-list-content{
                        width: 100%;
                        height: 158px;
                        background:#ffffff;
                        border:1px solid #efefef;
                        position: relative;
                        .content-piece{
                            margin: 10px auto 0px;
                            border:1px solid #eeeeee;
                            width:94px;
                            height:70px;
                        }
                        .content-title{
                            width: 100%;
                            margin: 0 auto;
                            display: flex;
                            flex-direction:column;
                            position: absolute;
                            top:20px;
                            span{
                                font-size:22px;/*px*/
                                color:#2d2d2d;
                                line-height:22px;
                                text-align:center;
                                margin-bottom: 8px;
                            }
                            span:last-child{
                                font-size: 22px;/*px*/
                                color: rgba(182, 163, 130, 1);
                                line-height: 22px;
                                margin-bottom: 0;
                            }
                        }
                        .redeem-now{
                            margin: 15px 62px 0;
                            height: 48px;
                            background-color: rgba(4, 4, 4, 1);
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            span{
                                line-height: 36px;
                                color: rgba(255, 255, 255, 1);
                                font-size: 28px;/*px*/
                            }
                        }
                    }
                }
            }
            .vux-flexbox-item:nth-child(2n){
                margin-left: 14px;
            }
        }
        .redeemlistNaN{
            .black-data-page{
                .black-page-btn{
                    display: none;
                }
            }
        }
    }
    .wrapper{
        width: 100%;
    }
</style>
