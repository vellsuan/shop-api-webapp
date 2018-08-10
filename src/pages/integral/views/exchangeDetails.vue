<template>
    <div class="exchange-detail">
        <x-header :left-options="{backText: ''}">兑换详情</x-header>
        <div class="detial-content">
            <div class="detial-status" v-if="exchangeInfo.sendStatus==0 || exchangeInfo.sendStatus==1 || exchangeInfo.sendStatus==2">
                <div class="status" :class="'active'+ exchangeInfo.sendStatus">{{exchangeInfo.sendStatus | sendStatus}}</div>
                <div class="explanation" v-if="exchangeInfo.sendStatus==1">您积分兑换的商品已发货，详细物流信息可通过单号进行查询。</div>
                <div class="explanation" v-else-if="exchangeInfo.sendStatus==0">我们将在您下单后48小时内为您安排发货，请您耐心等待，如有疑问可拨打电话4002932837联系我们。</div>
            </div>
            <div class="order-process" v-if="exchangeInfo.sendState == 1">
                <flow>
                    <flow-state :is-done="submitOrder">
                        <div slot="title">
                            <span>提交订单</span>
                            <span>{{createTime}}</span>
                        </div>
                    </flow-state>
                    <flow-line is-done></flow-line>
                    <flow-state :is-done="shipped">
                        <div slot="title">
                            <span>已发货</span>
                            <span>{{fahuoTime}}</span>
                        </div>
                    </flow-state>
                    <flow-line is-done></flow-line>
                    <flow-state :is-done="receiveGoods">
                        <div slot="title">
                            <span v-if="exchangeInfo.sendStatus == 2">成交</span>
                            <span v-else>确认收货</span>
                            <span>{{shouhuoTime}}</span>
                        </div>
                    </flow-state>
                </flow>
            </div>
            <div class="hotel">
                <div class="hotel-title">兑换商品</div>
                <div class="hotel-info">
                    <img  :src="imgURL + exchangeInfo.img" alt="" />
                    <div>
                        <p>{{exchangeInfo.productName}}</p>
                        <p>兑换时间：{{createTime}}</p>
                        <p>x{{number}}</p>
                    </div>
                </div>
            </div>
            <div class="order">
                <group class="order-info"  label-width="2rem" label-margin-right="0"  label-align="left">
                    <cell value-align="left" title="订单编号:" :value="exchangeInfo.exchangeId"></cell>
                    <cell value-align="left" title="支付方式" value="积分支付"></cell>
                    <cell class="orderState"  primary="content" title="发货状态：" v-if="exchangeInfo.sendState ==1 && exchangeInfo.sendStatus == 1">
                        <div  class="orderStateDes">
                            <div class="stateDes">
                                <p>{{exchangeInfo.logisticsNum}}</p>
                                <p v-if="exchangeInfo.sendStatus == 0"></p>
                                <p v-else>您的订单{{exchangeInfo.logisticsCompany}}已发出</p>
                                <p>{{fahuoTime}}</p>
                            </div>
                            <button class="copyBtn" :data-clipboard-text="exchangeInfo.logisticsNum" @click="clipboardSuccess">复制单号</button>
                        </div>
                    </cell>
                    <cell value-align="left" align-items="flex-start" title="备注" :value="exchangeInfo.remark" class="remarkalign"></cell>
                    <div class="cantact-button">
                        <a href="tel:13116176325">
                        <img src="../assets/phone.png" alt="" />
                        <span>联系我们</span>
                        </a>
                    </div>
                </group>
                <div class="info-title" v-if="exchangeInfo.sendState == 1">
                    <span>收货信息</span>
                </div>
                <group class="order-info"  label-width="2rem" label-margin-right="0" label-align="left" v-if="exchangeInfo.sendState == 1">
                    <cell title="联系人"   primary="content" value-align="left" :value="exchangeInfo.userName"></cell>
                    <cell title="联系手机"   primary="content" value-align="left"  :value="exchangeInfo.linkManPhone"></cell>
                    <cell title="详细地址"   primary="content" value-align="left"  :value="exchangeInfo.shippingAddress"></cell>
                </group>
                <group class="form-amount" label-width="6.7em">
                    <cell title="商品积分" :value="exchangeInfo.integral"></cell>
                    <!-- <cell title="运费" value="￥20.00"></cell> -->
                    <div class="totalPrice"> <span>实付积分</span><span>{{exchangeInfo.num}}</span> </div>
                </group>
                <div class="tips">
                    <p>温馨提示：本产品为积分兑换商品，概不退换。</p>
                </div>
            </div>
            <!-- 复制成功弹窗 -->
            <toast v-model="showPositionValue" type="text" :time="800" is-show-mask text="复制成功"></toast>
            <!-- 确认收货弹窗 -->
            <div v-transfer-dom class="confirmDeletionV">
                <confirm v-model="confirmDeletionV"
                title="确定删除？"
                @on-confirm="delRedemption">
                </confirm>
            </div>
            <!-- 确认删除弹窗 -->
            <div v-transfer-dom class="confirmReceiptV">
                <confirm v-model="confirmReceiptV"
                title="确定收货？"
                @on-confirm="confirmReceipt">
                </confirm>
            </div>
        </div>
        <div class="detail-bottom" v-if="exchangeInfo.sendStatus !=0">
            <x-button class="cacelBtn" @click.native="confirmDeletionV = true" v-if="exchangeInfo.sendStatus==2">删除</x-button>
            <x-button class="sureBtn" @click.native="confirmReceiptV = true" v-else-if="exchangeInfo.sendStatus==1">确认收货</x-button>
        </div>
    </div>
</template>
<script>
import { XHeader, Tab, TabItem, XButton, Flow, FlowState, FlowLine, Group, Cell, Toast, Confirm, TransferDomDirective as TransferDom,dateFormat } from 'vux'
import Clipboard from 'clipboard';
export default {
    filters: {
        dateFormat
    },
    directives: {
        TransferDom
    },
    components: {
        XHeader,
        XButton,
        Flow,
        FlowState,
        FlowLine,
        Group,
        Cell,
        Toast,
        Confirm
    },
    data(){
        return{
            exchangeInfo:{},
            fahuoTime : '',
            shouhuoTime : '',
            imgURL: JSON.parse(window.localStorage.getItem("config")).ServerImgURL,
            number : 1,
            showPositionValue: false,       //弹窗显示隐藏
            clipboard : '',
            confirmDeletionV : false,       //confirm确认删除提示
            confirmReceiptV : false,        //confirm确认收货提示
            submitOrder : false,            //提交订单状态
            shipped : false,                //已经发货状态
            receiveGoods :false,            //待收货状态
            createTime :''
        }
    },
    mounted () {
        this.clipboard = new Clipboard('.copyBtn');
        this.getExchangeDetail();
    },
    methods: {
        //获取积分兑换详情
        getExchangeDetail(){
            const params = {
                url: "/recordDataDetail",
                data: {
                    id: this.$route.query.id
                }
            };
            this.api.post(params, res => {
                this.exchangeInfo = res && res.entity;
                this.fahuoTime = dateFormat(this.exchangeInfo.fahuoTime,'MM-DD HH:mm');
                this.shouhuoTime = dateFormat(this.exchangeInfo.shouhuoTime,'MM-DD HH:mm')
                this.createTime = dateFormat(this.exchangeInfo.createTime,'MM-DD HH:mm')
                if(this.exchangeInfo.sendStatus == 0){
                    this.submitOrder = true;
                }else if(this.exchangeInfo.sendStatus == 1){
                    this.submitOrder = true;
                    this.shipped = true;
                }else if(this.exchangeInfo.sendStatus == 2){
                    this.submitOrder = true;
                    this.shipped = true;
                    this.receiveGoods = true;
                }
            })
        },
        //复制单号
        clipboardSuccess(){
            //复制成功执行的回调
            this.clipboard.on('success', (e)=> {
                this.showPositionValue = true;
            });

            //复制失败执行的回调
            this.clipboard.on('error', (e)=> {
                this.showPositionValue = false;
            });
        },
        //确认收货
        confirmReceipt(){
            const params = {
                url: "/confirmReceipt",
                data: {
                    id: this.$route.query.id,
                    sendStatus : '2'
                }
            };
            this.api.post(params, res => {
                if(res){
                    this.$router.push({path:'/exchangerecord'});    
                }
            },false)
        },
        //删除当前记录
        delRedemption(){
            const params = {
                url: "/delRedemption",
                data: {
                    id: this.$route.query.id,
                    isdel : '1'
                }
            };
            this.api.post(params, res => {
                if(res){
                    this.$router.push({path:'/exchangerecord'});    
                }
            },true)
        }
    },
    filters: {
        sendStatus(value){
            switch (value) {
                case "0":
                    return '待发货'
                    break;
                case "1":
                    return '已发货'
                        break;
                case "2":
                    return '已完成'
                    break;
                default:
                    break;
            }
        },
    }
}
</script>
<style lang="less">
#app{
    .exchange-detail{
        height: 100%;
        background:#efeff4;
        display: flex;
        flex-direction: column;
        background:#efeff4;
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
        .detial-content{
            margin-top:20px;
            flex: 1;
            overflow-y: auto;
            overflow-x: hidden;
            .detial-status{
                background:#ffffff;
                box-shadow:0 1px 2px 0 rgba(0,0,0,0.10);
                // height:210px;
                padding: 30px;
                .status{
                    font-size:30px;/*px*/
                    color:#1aad19;
                }
                .active1{
                    color:#1aad19;
                }
                .active2{
                    color:#b6a382;
                }
                .active3{
                    color:#666666;
                }
                .active0{
                    color:#ea5414;
                }
                .explanation{
                    margin-top:20px;
                    font-size:26px;/*px*/
                    color:#989898;
                }
            }
            .order-process{
                margin-top: 20px;
                background:#ffffff;
                box-shadow:0 1px 2px 0 rgba(0,0,0,0.10);
                height:210px;
                padding: 30px;
                display: flex;
                flex-direction: column;
                .weui-wepay-flow{
                    padding: 0;
                    .weui-wepay-flow__bd{
                        .weui-wepay-flow__li{
                            background:#DDDDDD;
                            width:30px;
                            height:30px;
                            border-radius:100%;
                            // border: 6px solid #DDDDDD;
                            .weui-wepay-flow__state{
                                background-color:#bbbbbb;
                                width:20px;
                                height:20px;
                                border-radius:100%;
                                bottom: 0;
                                right: 0;
                                margin: auto;
                            }
                            .weui-wepay-flow__title-bottom{
                                display: flex;
                                flex-direction: column;
                                top:30PX;
                                div{
                                    display: flex;
                                    flex-direction: column;
                                    span:nth-child(1){
                                        font-size:26px;/*px*/
                                        color:#2d2d2d;
                                    }
                                    span:nth-child(2){
                                        font-size:22px;/*px*/
                                        color:#bbbbbb;
                                    }
                                }
                            }
                        }
                        .weui-wepay-flow__li:first-child{
                            .weui-wepay-flow__title-bottom{
                                margin-left: 40px;
                                span:last-child{
                                    margin-left: 20px;
                                }
                            }
                        }
                        .weui-wepay-flow__li:last-child{
                            .weui-wepay-flow__title-bottom{
                                span{
                                    margin-right: 50px;
                                }
                            }
                        }
                        .weui-wepay-flow__li_done{
                            background:#DAD1C0;
                            width:30px;
                            height:30px;
                            border-radius:100%;
                            .weui-wepay-flow__state{
                                background-color:#b6a382;

                            }
                        }
                        .weui-wepay-flow__line{
                            background:#d8d8d8;
                            height: 2px;
                        }
                        .weui-wepay-flow__process{
                            background:#d8d8d8;
                            height: 2px;
                        }
                    }
                }

            }
            .hotel{
                margin-top: 20px;
                background:#ffffff;
                box-shadow:0 1px 2px 0 rgba(0,0,0,0.10);
                width: 100%;
                padding:40px 30px;
                .hotel-title{
                    height: 42px;
                    line-height: 42px;
                    color: rgba(45, 45, 45, 1);
                    font-size: 30px;/*px*/
                    text-align: left;
                    margin-bottom:30px;
                }
                .hotel-info{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                    height: 200px;
                    img{
                        width:200px;
                        height:200px;
                    }
                    div{
                        flex:1;
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        align-items: flex-start;
                        margin-left: 20px;
                        p:first-child{
                            width: 470px;
                            height: 98px;
                            line-height: 48px;
                            color: rgba(45, 45, 45, 1);
                            font-size: 28px;/*px*/
                            text-align: left;
                        }
                        p:nth-child(2){
                            width: 404px;
                            height: 24px;
                            line-height: 24px;
                            color: rgba(187, 187, 187, 1);
                            font-size: 22px;/*px*/
                            text-align: left;

                        }
                        p:nth-child(3){
                            width: 53px;
                            height: 24px;
                            line-height: 24px;
                            color: rgba(152, 152, 152, 1);
                            font-size: 24px;/*px*/
                            text-align: left;

                        }
                    }
                }
                .hotel-button{
                    display: flex;
                    height: 88px;
                    div{
                        width: 50%;
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        img{
                            width: 40px;
                            height: 40px;
                            margin-right: 30px;
                        }
                        span{
                            font-size:28px;/*px*/
                            color:#666666;
                        }
                    }
                    div:first-child{
                        border-right: 1px solid #d8d8d8;
                    }
                }
            }
            .order{
                margin-top: 20px;
                .order-title{
                    background:#b6a382;
                    padding: 30px;
                    height:166px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    div{
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        margin-right: 66px;
                        span:nth-child(1){
                            font-size:30px;/*px*/
                            color:#ffffff;
                        }
                        span:nth-child(2){
                            margin-top: 20px;
                            font-size:26px;/*px*/
                            color:#ffffff;
                        }
                    }
                    img{
                        width: 13px;
                        height: 20px;
                    }
                }
                .order-info{
                    .weui-cells{
                        margin-top: 0;
                        .weui-cell{
                            padding: 30px;
                            .vux-cell-bd{
                                p{
                                    label{
                                        font-size:26px;/*px*/
                                        color:#989898;
                                    }
                                }
                            }
                            .weui-cell__ft{
                                font-size:26px;/*px*/
                                color:#666666;
                            }
                        }
                        .weui-cell:before{
                            left: 20px;
                            right: 20px;
                        }
                        .remarkalign{
                            min-height: 88px;
                            height: auto;
                            word-break:break-all;
                        }
                        .orderState{
                            height:auto;
                            align-items: flex-start;
                            .orderStateDes{
                                display: flex;
                                flex-direction: row;
                                justify-content: space-between;
                                align-items: center;
                                .stateDes{
                                    display: flex;
                                    flex-direction: column;
                                    justify-content: space-between;
                                    align-items: flex-start;
                                    width: 80%;
                                    p{
                                        margin-bottom:12px;
                                        line-height: 37px;
                                        color: rgba(102, 102, 102, 1);
                                        font-size: 26px;/*px*/
                                        word-wrap:break-word; 
                                        text-align: left;
                                        width: 90%;

                                    }
                                    p:first-child{
                                        font-size: 24px;/*px*/
                                        color:#2d2d2d;
                                    }
                                    p:last-child{
                                        height: 33px;
                                        margin-bottom:0;
                                        line-height: 33px;
                                        color: rgba(187, 187, 187, 1);
                                        font-size: 24px;/*px*/
                                    }
                                }
                                .copyBtn{
                                    width: 144px;
                                    height: 58px;
                                    line-height: 58px;
                                    color: rgba(45, 45, 45, 1);
                                    font-size: 28px;/*px*/
                                    text-align: center;
                                    border-radius: 6px;
                                    border: 1PX solid rgba(45, 45, 45, 1);
                                    background: #fff;
                                }
                            }
                        }   
                    }
                    
                }
                .cantact-button{
                    width:100%;
                    height:98px;
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    position: relative;
                    &:after{
                        content: " ";
                        position: absolute;
                        left: 0;
                        top: 0;
                        right: 0;
                        height: 1PX;
                        border-top: 1PX solid #D9D9D9;
                        color: #D9D9D9;
                        -webkit-transform-origin: 0 0;
                        transform-origin: 0 0;
                        -webkit-transform: scaleY(0.5);
                        transform: scaleY(0.5);
                        left: 15PX;
                    }
                    img{
                        width:40px;
                        height:40px;
                        margin-right:30px;
                        vertical-align: middle;
                    }
                    span{
                        color: rgba(102, 102, 102, 1);
                        font-size: 28px;/*px*/
                        a{
                            text-decoration: none;
                        }
                        a:link {
                            color: rgba(102, 102, 102, 1);
                        }
                        a:visited {
                            color: rgba(102, 102, 102, 1);
                        }
                        a:hover {
                            color: rgba(102, 102, 102, 1);
                        }
                        a:active {
                            color:rgba(102, 102, 102, 1);
                        }
                    }
                }
                .info-title{
                    height: 66px;
                    padding: 20px 0 20px 30px;
                    font-size:26px;/*px*/
                    line-height:26px;
                    color:#989898;
                }
                .form-amount{
                    .weui-cells{
                        margin-top: 20px;
                        .weui-cell{
                            padding: 30px;
                            font-size:28px;
                            color:#2d2d2d;
                            .weui-cell__ft{
                                font-size:28px;/*px*/
                                color:#2d2d2d;
                            }
                        }
                        .weui-cell:nth-child(2){
                            font-size:24px;/*px*/
                            color:#666666;
                            .weui-cell__ft{
                                color:#b6a382;
                            }
                        }
                        .weui-cell:nth-child(3){
                            font-size:24px;/*px*/
                            color:#666666;
                            .weui-cell__ft{
                                color:#b6a382;
                            }
                        }
                        .weui-cell:last-child{
                            font-size:24px;/*px*/
                            .vux-cell-bd{
                                margin-right: -120px;
                                p{
                                    margin-right: 20px;
                                    display: flex;
                                    justify-content: flex-end;
                                }
                            }
                            .weui-cell__ft{
                                font-size:30px;/*px*/
                                color:#ea5414;
                            }
                        }
                        .weui-cell:before{
                            left: 0;
                        }
                    }
                    .totalPrice{
                        width:100%;
                        height:98px;
                        display: flex;
                        flex-direction: row;
                        justify-content: flex-end;
                        align-items: center;
                        padding:0 30px;
                        position: relative;
                        &:after{
                            content: " ";
                            position: absolute;
                            left: 0;
                            top: 0;
                            right: 0;
                            height: 1PX;
                            border-top: 1PX solid #D9D9D9;
                            color: #D9D9D9;
                            -webkit-transform-origin: 0 0;
                            transform-origin: 0 0;
                            -webkit-transform: scaleY(0.5);
                            transform: scaleY(0.5);
                            left: 15PX;
                        }
                        span:first-child{
                            display: block;
                            color: rgba(102, 102, 102, 1);
                            font-size: 24px;/*px*/
                            margin-right:20px;
                        }
                        span:last-child{
                            display: block;
                            color: rgba(234, 84, 20, 1);
                            font-size: 30px;/*px*/
                        }
                    }
                }
                .tips{
                    margin: 20px 30px 80px;
                    p{
                        font-size:24px;/*px*/
                        color:#989898;
                    }
                }
            }


        }
        .detail-bottom{
                background:#ffffff;
                box-shadow:0 -1px 1px 0 rgba(0,0,0,0.10);
                height:96px;
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
                align-items: center;
                padding:0 30px;
                button{
                    border-radius:6PX;/* no */
                    height:59px;
                    line-height:58px;
                    font-size:28px;/*px*/
                    color:#ffffff;
                    margin:0;
                    padding:0;
                }
                .cacelBtn{
                    width: 116px;
                    color:#989898;
                    background: transparent;
                    border: 1px solid rgba(206, 206, 206, 1);
                    &:after{
                        content: " ";
                        width: 200%;
                        height: 200%;
                        position: absolute;
                        top: 0;
                        left: 0;
                        border:0;
                        -webkit-transform: scale(0.5);
                        transform: scale(0.5);
                        -webkit-transform-origin: 0 0;
                        transform-origin: 0 0;
                        -webkit-box-sizing: border-box;
                        box-sizing: border-box;
                        border-radius:6PX;
                    }
                }
                .sureBtn{
                    width: 144px;
                    margin-left:20px;
                    background-color: rgba(4, 4, 4, 1);
                }
            }
            .weui-cells:after{
                height:0;
                border:0;
            }
    }
}
.confirmReceiptV{
    .weui-dialog{
        .weui-dialog__hd{
            .weui-dialog__title{
                font-size: 32px;/*px*/
            }
        }
        .weui-dialog__bd{
            min-height: 40px;
        }
        .weui-dialog__ft{
            a{
                font-size: 28px;/*px*/
            }
            .weui-dialog__btn_primary{
              color:#2d2d2d;
            }
        }
    }
}
.confirmDeletionV{
    .weui-dialog{
        .weui-dialog__hd{
            .weui-dialog__title{
                font-size: 32px;/*px*/
            }
        }
        .weui-dialog__bd{
            min-height: 40px;
        }
        .weui-dialog__ft{
            a{
                font-size: 28px;/*px*/
            }
            .weui-dialog__btn_primary{
              color:#2d2d2d;
            }
        }
    }
}  
</style>
