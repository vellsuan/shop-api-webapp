<template>
    <div class="onepriceenjoy wrapper" ref="wrapper">
        <flexbox class="content" :gutter="0" wrap="wrap">
            <flexbox-item v-for="(item,i) in priceEnjoy" :key="i" >
                <div class="flex-demo" @click="priceEnjoyDetail(priceEnjoy[i])">
                    <div class="enjoy-list-img">
                        <img :src="imgURL + priceEnjoy[i].roomDetailImg" alt="" />
                        <div class="enjoy-list-name">
                            <span>{{priceEnjoy[i].brandName}} | {{priceEnjoy[i].roomNameCn}}</span>
                        </div>
                    </div>
                    <div class="enjoy-list-content">
                        <div class="content-piece vux-1px"></div>
                        <div class="content-title">
                            <span>{{priceEnjoy[i].hotelNameCn}}</span>
                            <span>&yen;{{Number(priceEnjoy[i].roomPrice).toFixed(2)}}</span>
                        </div>
                    </div>
                </div>
            </flexbox-item>
            <load-more v-show="showdata" :show-loading="false"  tip="没有更多了"></load-more>
        </flexbox>
        <!-- <load-more v-show="show"  tip="正在加载"></load-more> -->
    </div>
</template>
<script>
import { Flexbox, FlexboxItem ,LoadMore, Toast} from 'vux'
import BScroll from 'better-scroll';
import { dateFormat } from 'vux'
export default {
    components: {
        Flexbox,
        FlexboxItem,
        LoadMore,
        Toast
    },
    props: ['tabIndex'],
    data () {
        return {
            Arrival : '',
            Departure :'',
            priceEnjoy : '', //一价竞享列表
            imgURL : '',
            show:false,
            showdata:false,
            userInfo: JSON.parse(window.localStorage.getItem("userInfo")),
            guesttypeCode:'0000',
            // showdata:true
        }
    },
    mounted (){
        if(this.userInfo&&this.userInfo.phone&&this.userInfo.phone!=''){
            this.guesttypeCode = '0002';
            this.show = true;
            this.getSystemTime(this.userInfo.cardNo);
        }else{
            this.guesttypeCode = '0000';
            this.show = true;
            this.getSystemTime();
        }
    },
    methods:{
        getSystemTime(cardNo){
            const params = {
                url : '/index/getSystemTime'
            }
            this.api.post(params, res=> {
                this.imgURL = JSON.parse(window.localStorage.getItem("config")).ServerImgURL
                let sysTime = res && res.sysTime;
                this.Arrival = dateFormat(sysTime, 'YYYY-MM-DD')
                this.Departure =dateFormat(1000 * 60 * 60 * 24 + sysTime, 'YYYY-MM-DD')   // 时间戳加一天
                const priceParams = {
                    url : '/priceenjoy',
                    data: {
                        CardNo : cardNo,
                        Arrival : this.Arrival,
                        Departure : this.Departure,
                        GuesttypeCode: this.guesttypeCode,
                        langId : 'CN',
                    }
                }
               this.getPriceEnjoy(priceParams)
            });
        },
        // fmtDate(obj,num){
        //     let date =  new Date(obj);
        //     console.log(date)
        //     let y = 1900+date.getYear();
        //     let m = "0"+(date.getMonth()+1);
        //     let d = '';
        //     if(num == 1){
        //         d = "0"+(date.getDate()+1);
        //     }else{
        //         d = "0"+date.getDate();
        //     }
        //     return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
        // },
        getPriceEnjoy(params){
            this.api.post(params, res=> {
                this.priceEnjoy = res && res.roomList;
                this.showdata = true;
                this.show = false;
            });
        },
        priceEnjoyDetail(item){
            //console.log(item);
            //brandCode,cardNo,companyCode,hotelCode,rateCode,roomCode
            if (process.env.NODE_ENV === 'production') {
                // koa page-router配置跳转地址 不带#号
                window.location.href = "/homestay/priceenjoyDetails#/?brandCode="+item.brandCode+"&hotelCode="+item.hotelCode+"&rateCode="+item.rateCode+"&roomCode="+item.roomCode+"&guaranteeRuleCode="+item.guaranteeRuleCode+"&arrival="+this.Arrival+"&departure="+this.Departure+"&isSync="+item.isSync;
            }
            if (process.env.NODE_ENV === 'development') {
                // vue哈希路有。 带#号
                window.location.href = "/priceenjoy.html#/?brandCode="+item.brandCode+"&hotelCode="+item.hotelCode+"&rateCode="+item.rateCode+"&roomCode="+item.roomCode+"&guaranteeRuleCode="+item.guaranteeRuleCode+"&arrival="+this.Arrival+"&departure="+this.Departure+"&isSync="+item.isSync;
            }
        }
    }
}
</script>
<style lang="less">
    .onepriceenjoy{
        background: #ffffff;
        .vux-flexbox{
            padding: 0 20px;
            .vux-flexbox-item{
                width: 49%;
                height: 500px;
                margin-bottom: 20px;
                flex:none;
                .flex-demo{
                    .enjoy-list-img{
                        width: 100%;
                        height: 345px;
                        position: relative;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                        .enjoy-list-name{
                            opacity:0.8;
                            background:#2d2d2d;
                            width:100%;
                            height:44px;
                            position: absolute;
                            bottom: 0;
                            text-align:center;
                            span{
                                font-size:20px;/*px*/
                                color:#ffffff;
                                line-height:44px;
                            }
                        }
                    }
                    .enjoy-list-content{
                        //width: calc(~"100% - 2px");
                        width: 100%;
                        height: 156px;
                        background:#ffffff;
                        border:1px solid #efefef;
                        position: relative;
                        .content-piece{
                            margin: 10px auto 0px;
                            //border:1px solid #eeeeee;
                            width:94px;
                            height:70px;
                        }
                        .vux-1px:before{
                            border: 1PX solid #eeeeee;
                            color: #eeeeee;
                        }
                        .content-title{
                            width: 100%;
                            margin: 0 auto;
                            display: flex;
                            flex-direction:column;
                            position: absolute;
                            top:30px;
                            padding: 0 20px;
                            span{
                                font-size:22px;/*px*/
                                color:#2d2d2d;
                                line-height:22px;
                                text-align:center;
                                margin-bottom: 10px;
                            }
                            // span:first-child{
                            // }
                            span:nth-child(2){
                                overflow: hidden;
                                text-overflow:ellipsis;
                                white-space: nowrap;
                            }
                            span:last-child{
                                font-weight:700;
                                margin-top: 40px;
                                font-size:30px;/*px*/
                                color:#2d2d2d;
                                line-height:36px;
                            }
                        }
                    }
                }
            }
            .vux-flexbox-item:nth-child(2n){
                margin-left: 14px;
            }
        }
    }
</style>
