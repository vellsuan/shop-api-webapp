<template>
    <div class="detail">
        <x-header :left-options="{backText: ''}">订单详情</x-header>
        <div v-if='orderId' class="detial-content">
            <div class="detial-status">
                <div class="status" :class="'active'+ orderInfo.orderStatus">{{orderInfo.orderStatus | status}}</div>
                <div class="explanation" v-if="orderInfo.orderStatus==1">酒店已收到您的订单，请您在预订时间内抵达酒店，出示您的证件办理入住手续。</div>
            </div>
            <div class="order-process">
                <flow>
                    <flow-state :is-done="submitOrder">
                        <div slot="title">
                            <span>提交订单</span>
                            <span>{{createTime}}</span>
                        </div>
                    </flow-state>
                    <flow-line is-done></flow-line>
                    <flow-state :is-done="submitOrder">
                        <div slot="title">
                            <span>酒店确认</span>
                            <span>{{createTime}}</span>
                        </div>
                    </flow-state>
                    <flow-line></flow-line>
                    <flow-state :is-done="successPayment">
                        <div slot="title">
                            <span>{{timeLineName}}</span>
                            <!-- <span>付款成功</span> -->
                            <span>{{payTimeStr}}</span>
                        </div>
                    </flow-state>
                    <flow-line v-if="orderStatus2"></flow-line>
                    <flow-state v-if="orderStatus2" :is-done="deal">
                        <div slot="title">
                            <span>{{isDeal}}</span>
                            <span>{{cancelTimeStr}}</span>
                        </div>
                    </flow-state>
                    <flow-state v-else :is-done="deal">
                        <div slot="title">
                            <span>{{isDeal}}</span>
                            <span>{{cancelTimeStr}}</span>
                        </div>
                    </flow-state>
                </flow>
            </div>
            <div class="info-title">
                <span>房间预订</span>
            </div>
            <div class="hotel">
                <div class="hotel-info">
                    <div>
                        <span>{{orderInfo.roomName}}</span>
                        <span>{{hotel.address}}</span>
                    </div>
                    <!-- <img src="../assets/info-arrow.png" alt="" > -->
                </div>
                <div class="hotel-button">
                    <div @click='checkMap(hotel)'>
                        <img src="../assets/map.png" alt="">
                        <span>查看地图</span>
                    </div>
                    <a :href="'tel:'+ hotel.linkPhone">
                        <div>
                            <img src="../assets/phone.png" alt="">
                            <span>联系酒店</span>
                        </div>
                    </a>
                </div>
            </div>
            <div class="tourism" v-if="listItem.length">
                <div class="info-title">
                    <span>旅游项目</span>
                </div>
                 <div class="tourism-title" v-for="item in listItem" :key="item.itemCode">
                    <div>
                        <span>{{item.itemName}}</span>
                        <span>出游日期：{{item.beginDate}}</span>
                    </div>
                </div>
            </div>
            <div class="order">
                <div class="order-title">
                    <div>
                        <!-- <span>{{orderInfo.roomName}}</span>
                        <span>此价包含：{{orderInfo.adultNum}}位成人/{{orderInfo.childNum}}位儿童</span> -->
                        <span>{{orderInfo.hotelName}}</span>
                        <span>{{orderInfo.roomName}}</span>
                    </div>
                    <!-- <img src="../assets/arrow-white.png" alt="" > -->
                </div>
                <group class="order-info"  label-width="5em" label-margin-right="2em" label-align="left">
                    <cell title="订单编号" :value="orderInfo.orderNo"></cell>
                    <cell title="支付方式" :value="orderInfo.payType | payType"></cell>
                    <cell title="入住时间" :value="`${orderInfo.checkinTimeStr} 至 ${orderInfo.checkoutTimeStr} 共${orderInfo.checkinDays}晚`"></cell>
                    <cell title="住客信息" :value="orderInfo.checkinName"></cell>
                </group>
                <div class="info-title">
                    <span>联系信息</span>
                </div>
                <group class="order-info"  label-width="5em" label-margin-right="2em" label-align="left">
                    <cell value-align="left" title="联系人" :value="orderInfo.contactName"></cell>
                    <cell value-align="left" title="联系手机" :value="orderInfo.contactPhone"></cell>
                    <cell value-align="left" title="Email" :value="orderInfo.contactEmail"></cell>
                    <cell value-align="left" align-items="flex-start" title="备注" :value="orderInfo.remark" class="remarkalign"></cell>
                </group>
                <div v-if='isInvoice == 1' class="info-title">
                    <span>发票信息</span>
                </div>
                <group v-if='isInvoice == 1' class="order-info"  label-width="5em" label-margin-right="2em" label-align="left">
                    <cell value-align="left" title="发票类型" :value="invoiceInfo.invoiceType+'' | invoiceType"></cell>
                    <cell value-align="left" align-items="flex-start" v-if="invoiceInfo.invoiceType == 1" title="发票抬头" :value="invoiceInfo.invoiceTitle" class="remarkalign"></cell>
                    <cell value-align="left" align-items="flex-start" v-else title="发票抬头" :value="invoiceInfo.companyName" class="remarkalign"></cell>
                    <!-- <cell title="发票内容" value="缺发票内容"></cell> -->
                </group>
                <group class="form-amount" label-width="6.7em">
                    <cell title="商品金额" :value="'￥'+orderInfo.totalSum"></cell>
                    <cell v-if='couponSum' title="优惠券抵扣" :value="'-￥'+ couponSum"></cell>
                    <cell v-if='pointsSum' title="积分抵扣" :value="'-￥'+ pointsSum"></cell>
                    <cell v-if='discountedPrice' title="会员卡折特权" :value="'-￥' + discountedPrice"></cell>
                    <cell v-if="orderInfo.orderStatus == 0" title="应付" :value="'￥'+orderInfo.needSum"></cell>
                    <cell v-else title="实付" :value="'￥'+orderInfo.paySum"></cell>
                </group>
                <div class="tips">
                    <p>酒店提示：*栖君台精品民宿客栈根据您的付款方式进行预授权或者扣除房费，如订单不确认将解除预授权或全额退款至您的付款账户。</p>
                </div>
            </div>
        </div>
        <div v-if='orderSn' class="detial-content">
            <div class="detial-status">
                <div class="status" :class="'active'+ cardDetail.orderState">{{cardDetail.orderState+'' | status}}</div>
            </div>
            <div class="order-process">
                <flow>
                    <flow-state :is-done="submitOrderCard">
                        <div slot="title">
                            <span>提交订单</span>
                            <span>{{cardCreateTime}}</span>
                        </div>
                    </flow-state>
                    <flow-line is-done></flow-line>
                    <flow-line></flow-line>
                    <flow-state :is-done="dealCard">
                        <div slot="title">
                            <span>{{timeLineNameCard}}</span>
                            <span>{{cardBbuyTime}}</span>
                        </div>
                    </flow-state>
                </flow>
            </div>
            <div v-if='false' class="hotel">
                <div class="hotel-info">
                    <div>
                        <span>{{orderInfo.roomName}}</span>
                        <span>{{hotel.address}}</span>
                    </div>
                    <!-- <img src="../assets/info-arrow.png" alt="" > -->
                </div>
                <div class="hotel-button">
                    <div>
                        <img src="../assets/map.png" alt="">
                        <span>查看地图</span>
                    </div>
                    <div>
                        <img src="../assets/phone.png" alt="">
                        <span>联系酒店</span>
                    </div>
                </div>
            </div>
            <div class="order">
                <div class="order-title">
                    <div>
                        <span>{{cardDetail.productName}}</span>
                        <span>有效期至：{{cardDetail.validTime | dateFormat}}</span>
                    </div>
                    <!-- <img src="../assets/arrow-white.png" alt="" > -->
                </div>
                <group class="order-info"  label-width="5em" label-margin-right="2em" label-align="left">
                    <cell title="订单编号" :value="cardDetail.orderNum"></cell>
                    <cell title="支付方式" :value="cardDetail.payType+'' | payType"></cell>
                    <cell title="购买人" :value="cardDetail.userName"></cell>
                </group>
                <div class="info-title">
                    <span>持卡人信息</span>
                </div>
                <group class="order-info"  label-width="8em" label-margin-right="2em" label-align="left">
                    <cell value-align="left" title="持卡人姓名" :value="cardDetail.ownerName"></cell>
                    <cell value-align="left" title="持卡人手机号" :value="cardDetail.phone"></cell>
                    <cell value-align="left" align-items="flex-start" title="备注" :value="cardDetail.remark" class="remarkalign"></cell>
                </group>
                <group class="form-amount" label-width="6.7em">
                    <cell title="商品金额" :value="'￥'+cardDetail.totalMoney"></cell>
                    <cell v-if="cardDetail.integralMoney" title="积分抵扣" :value="'-￥'+ cardDetail.integralMoney"></cell>
                    <cell v-if="cardDetail.payStat == 0" title="应付" :value="'￥'+cardDetail.payMoney"></cell>
                    <cell v-else title="实付" :value="'￥'+cardDetail.payMoney"></cell>
                </group>
                <div class="tips">
                    <p>温馨提示：本卡不可退。</p>
                </div>
            </div>
        </div>
        <div class="detail-bottom" v-if="orderStatus == 0 && orderId">
            <div class="order-card-b vux-1px-t">
                <x-button mini plain @click.native='showlDialog1'>取消订单</x-button>
                <x-button class="payment" mini plain @click.native="paymentOrder(orderInfo,1)">支付订单</x-button>
            </div>
        </div>
        <!-- <div class="detail-bottom" v-if="orderStatus < 2 || (orderStatus == 3 && orderId  && isEvaluate == 0)"> -->
        <div class="detail-bottom" v-if="orderStatus == 0 && orderSn">
            <div class="order-card-b vux-1px-t">
                <x-button mini plain @click.native='cancelCardDetail'>取消订单</x-button>
                <x-button class="payment" mini plain @click.native="paymentOrder(cardDetail,2)">支付订单</x-button>
            </div>
        </div>
        <!-- <div>
            <popup v-model="goEvaluation" is-transparent>
                <div class="evaluationStyle">
                    <div class="userCadrdHeader vux-1px-b">评价 <x-icon type="ios-close-empty" preserveAspectRatio="xMidYMid meet" @click.native="goEvaluation = false"></x-icon>
                    </div>
                    <div class="assess-group">
                        <div class="order-num-date vux-1px-b">
                            <div class="order-num">订单号：{{orderList.orderNo}}</div>
                            <div class="order-day">{{orderList.createTimeStr}}</div>
                        </div>
                        <rater v-model="commentGrade" :font-size="40" :min="1"></rater>
                        <p>总体评价</p>
                        <group>
                            <x-textarea placeholder="您可以聊聊酒店服务、位置、设施、环境卫生等方面的个人体验，所有真实有效的评价都会被显示。" v-model="commentContent"></x-textarea>
                        </group>
                    </div>
                    <div class="userCardbtn">
                        <x-button @click.native="submitReview">提交评价</x-button>
                    </div>
                </div>
            </popup>
        </div> -->
        <Cancel :invitor="isShow" :orderId='orderId' @changingType="showlDialog" @refreshFList='refreshList'></Cancel>
        <Evaluation :comment='commentShow' :orderId='orderId' :orderNo='orderNo' :createTimeStr="createTimeStr" @changeComment='showComment' @refreshFList='refreshList'></Evaluation>
        <div v-transfer-dom>
            <x-dialog v-model="showMap" class="map-dialog" hide-on-blur>
                <div class="img-div"><img :src="addressImg" alt=""></div>
                <div class="close" @click="showMap = false"><img src="../assets/close@2x.png" alt="close"></div>
            </x-dialog>
        </div>
    </div>
</template>
<script>
import { XHeader, Tab, TabItem, XButton, Flow, FlowState, FlowLine, Group, Cell, dateFormat, XDialog, TransferDomDirective as TransferDom } from 'vux'
import Cancel from '../module/cancel';
import Evaluation from '../module/evaluation';
export default {
    components: {
        XHeader,
        XButton,
        Flow,
        FlowState,
        FlowLine,
        Group,
        Cell,
        Cancel,
        XDialog,
        Evaluation
    },
    directives: {
        TransferDom
    },
    data(){
        return{
            orderInfo:{},
            invoiceInfo:{},
            hotel:{},
            isInvoice:'',
            orderStatus:this.$route.query.orderStatus,
            isEvaluate:this.$route.query.isEvaluate,
            isShow:false,
            orderId:this.$route.query.id || '',
            orderSn:this.$route.query.no || '',
            cardDetail:{},
            couponSum:'',
            pointsSum:'',
            discountedPrice:'',
            timeLineName : '付款成功',       //酒店订单详情订单状态name
            orderStatus2 : true,            //订单状态为2（已取消）控制后边的展示
            submitOrder : false,            //提交订单状态
            successPayment : false,         //付款成功状态
            deal :false,                    //成交状态
            createTime : '',                //提交订单，酒店确认时间
            payTimeStr : '',                //支付时间
            cancelTimeStr : '',             //取消时间
            submitOrderCard : false,        //提交订单状态
            dealCard :false,                //成交状态
            cardCreateTime : '',            //买卡下单时间
            cardBbuyTime : '',              //买卡支付时间(取消时间)
            timeLineNameCard : '付款成功',   //打折卡详情订单详情订单状态name
            isDeal:'成交',                   //打折卡详情订单详情订单状态name(付款过成交还是已经取消)
            showMap:false,
            addressImg:'',
            createTimeStr:'',
            orderNo:'',                      // 房子或卡的订单号
            commentShow:false,
            listItem:[]                     // 旅游项目列表
        }
    },
    mounted () {
        this.refreshList()
    },
    methods: {

        // 获取房间详情
        getOrderDetail(){
            const params = {
                url: "/orderConfirmation",
                data: {
                    hideFlag:"",
                    id: this.$route.query.id
                }
            };
            this.api.post(params, res => {
                console.log(res);
                this.orderInfo = res.orderInfo;
                this.listItem = res.listItem
                if(this.orderInfo.remark=='' || this.orderInfo.remark==null){
                  this.orderInfo.remark='无'
                }

                this.createTimeStr = res.orderInfo.createTimeStr
                this.orderStatus = res.orderInfo.orderStatus
                this.isEvaluate = res.orderInfo.isEvaluate
                this.orderNo = res.orderInfo.orderNo
                this.invoiceInfo = res.invoiceInfo
                this.hotel = res.hotel
                this.isInvoice = res.isInvoice
                this.discountedPrice = res.orderInfo.discountedPrice
                this.couponSum = res.orderInfo.couponSum
                this.pointsSum = res.orderInfo.pointsSum
                this.payTimeStr = dateFormat(this.orderInfo.payTimeStr,'MM-DD HH:mm')
                this.createTime = dateFormat(this.orderInfo.createTime,'MM-DD HH:mm')
                this.orderStatus = res.orderInfo.orderStatus
                //this.cancelTimeStr = dateFormat(this.orderInfo.cancelTimeStr,'MM-DD HH:mm')
                if(this.orderInfo.orderStatus == 0){
                    this.submitOrder = true;
                }else if(this.orderInfo.orderStatus == 1){
                    this.submitOrder = true;
                    this.successPayment = true;
                }else if(this.orderInfo.orderStatus == 2 && this.orderInfo.payStatus == 1){
                    this.submitOrder = true;
                    this.successPayment = true;
                    // this.timeLineName = "已取消"
                    this.isDeal = "已取消"
                    this.orderStatus2 = true;
                    this.deal = true;
                    this.payTimeStr = dateFormat(this.orderInfo.cancelTimeStr,'MM-DD HH:mm')
                }else if(this.orderInfo.orderStatus == 2 && this.orderInfo.payStatus == 1){
                    this.submitOrder = true;
                    this.successPayment = true;
                    // this.timeLineName = "已取消"
                    this.isDeal = "已取消"
                    this.orderStatus2 = true;
                    this.deal = true;
                    this.payTimeStr = dateFormat(this.orderInfo.payTimeStr,'MM-DD HH:mm')
                    this.cancelTimeStr = dateFormat(this.orderInfo.cancelTime,'MM-DD HH:mm')
                }else if(this.orderInfo.orderStatus == 3){
                    this.submitOrder = true;
                    this.successPayment = true;
                    this.deal = true;
                }else if(this.orderInfo.orderStatus == 2 && this.orderInfo.payStatus == 2){
                    this.submitOrder = true;
                    this.successPayment = true;
                    this.isDeal = "已取消"
                    // this.orderStatus2 = false;
                    this.deal = true;
                    this.payTimeStr = dateFormat(this.orderInfo.payTimeStr,'MM-DD HH:mm')
                    this.cancelTimeStr = dateFormat(this.orderInfo.cancelTimeStr,'MM-DD HH:mm')
                }else if(this.orderInfo.orderStatus == 2 && this.orderInfo.payStatus == 0){
                    this.submitOrder = true;
                    this.successPayment = false;
                    this.orderStatus2 = true;
                    this.isDeal = "已取消"
                    this.deal = true;
                    this.cancelTimeStr = dateFormat(this.orderInfo.cancelTimeStr,'MM-DD HH:mm')
                }
            })
        },
        // 获取卡详情
        getCardDetail(){
            const params = {
                url: "/getCardDetail",
                data: {
                    orderSn: this.orderSn
                }
            };
            this.api.post(params, res => {
                console.log(res);
                this.cardDetail = res.entity
                this.orderNo = res.entity.orderNum
                if(this.cardDetail.remark=='' || this.cardDetail.remark==null){
                  this.cardDetail.remark='无'
                }
                console.log(this.orderNo);
                this.orderStatus = res.entity.orderState
                this.cardCreateTime = dateFormat(this.cardDetail.createTime,'MM-DD HH:mm')
                this.cardBbuyTime = dateFormat(this.cardDetail.buyTime,'MM-DD HH:mm')
                if(this.cardDetail.orderState == 0){
                    this.submitOrderCard = true;
                }else if(this.cardDetail.orderState == 1){
                    this.submitOrderCard = true;
                    this.dealCard = true;
                    this.timeLineNameCard = '付款成功'
                }else if(this.cardDetail.orderState == 2){
                    this.submitOrderCard = true;
                    this.dealCard = true;
                    this.timeLineNameCard = '已取消'
                }
            })
        },
        showlDialog(data){
            if(data == 'false'){
                this.isShow = false;
            }else{
                this.isShow = true;
            }
        },
        showlDialog1(){
            this.showlDialog()
        },
        refreshList(msg){
            console.log(msg);
            // this.$router.push("/")
            if(this.orderId){
            this.getOrderDetail()
            }else if(this.orderSn){
                this.getCardDetail()
            }
        },
        // 查看地图
        checkMap(hotle){
            this.showMap = true
            this.addressImg = JSON.parse(window.localStorage.getItem("config")).ServerImgURL + hotle.addressImg
        },
        // 展示评价等级
        showRater1() {
            this.commentShow = true;
            this.showComment()
        },
      //通知主页面是否评价订单显示
        showComment(data){
        console.log("showComment");
        if(data == 'false'){
            this.commentShow = false;
        }else{
            this.commentShow = true;
        }
        },
        //详情业取消卡订单
        cancelCardDetail(){
            // 需要注意 onCancel 和 onConfirm 的 this 指向
            const _this = this
            console.log(_this.orderNo);
            this.$vux.confirm.show({
                title: '确认取消订单？',
                // 组件除show外的属性
                // onCancel () {
                //   console.log(_this) // 当前 vm
                // },
                onConfirm () {
                    console.log(_this.orderNo);
                    const params = {
                    url: "/cancelCardOrder",
                    data: {
                        orderSn:_this.orderNo
                    }
                    };
                    _this.api.post(params, res => {
                        _this.refreshList()
                        _this.$vux.toast.show({
                            text :"订单取消成功",
                            type:"text",
                            width:'8.6em',
                            position:"middle",
                            onShow () {
                                console.log(123123123123);
                            }
                        });
                    });
                }
            })
        },
        // 模拟支付
        paymentOrder(list,num){
        		if(num!=1){//买卡
        			list.orderNo = list.orderNum
        		}

	        let params = {
	          url: "/wx/wxPay",
	          data: {
	            orderNo:list.orderNo
	          }
	        };
	        this.api.post(params, res => {
	          this.wxpay(res,list)
	        })

        },
        wxpay(data,list){
          WeixinJSBridge.invoke('getBrandWCPayRequest', {
              "appId": data.appId, //公众号名称，由商户传入
              "timeStamp": data.timeStamp, //时间戳，自1970年以来的秒数
              "nonceStr": data.nonceStr || '', //随机串
              "package": data["package"],
              "signType": data.signType || "MD5", //微信签名方式:
              "paySign": data.paySign || '' //微信签名
            },
            function(res) {

                data.title = "付款结果";
                if(res.err_msg == 'get_brand_wcpay_request:ok') {
                  data.content = "支付成功！";
                  data.type = "success";
                  window.location.href="/homestay/usercenter#/paymentsuccess?orderSn="+list.orderNo+'&payMony='+list.paySum
                } else {
                  data.type = "error";
                  data.content = "支付失败！";
                  window.location.href="/homestay/usercenter#/paymentfailed?orderSn="+list.orderNo+'&payMony='+list.paySum
                }


           //   _t.callback&&_t.callback(data);
            }
          );
          //this.bindBridgeReady();

        },
      pay(){

        //弹出确认支付页面
        let params={
          url:'/getcardOrder',
          data:{
            address:this.datamsg.address,
            cardId:	this.datamsg.id,
            cardNumber:this.userInfo.cardNo,
            integral:this.numval,
            integralMoney:this.ct,
            ownerName	:this.datamsg.newname,
            payMoney:	this.datamsg.price-this.ct,
            phone	:this.userInfo.phone,
            remark:	this.remark,
            totalMoney:	this.datamsg.price,
            userId:	this.userInfo.userId,
            userName:this.userInfo.userName,
            companyCode:this.datamsg.companyCode,
            companyName:this.datamsg.companyName,
            //payType:'5'
          }
        };

        this.api.post(params, res=> {
          console.log(res);
          history.replaceState(null,"订单确认","/homestay/priceenjoyDetails");
          if(res.isNeedSum!=0 ){

            let  params = {
              url: "/wx/wxPay",
              data: {
                orderNo:res.orderSn,
              //  payType:'5'
              }
            };
            this.api.post(params, data => {
              this.wxpay(data)
            })
          }else{
            this.$router.push({path: "/paymemtsuccess",query:{
              //orderSn:res.orderSn
            }})
          }

        });
      }
    },
    filters: {
        dateFormat,
        status(value){
            switch (value) {
                case "0":
                    return '待付款'
                    break;
                case "1":
                    return '已付款'
                    break;
                case "2":
                    return '已取消'
                    break;
                case "3":
                    return '已完成'
                default:
                    break;
            }
        },
        payType(value){
            switch (value) {
                case "0":
                    return '暂未支付'
                    break;
                case "1":
                    return 'B2C网银'
                    break;
                case "2":
                    return 'B2B网银'
                    break;
                case "3":
                    return '信用卡'
                case "4":
                    return '借记卡'
                    break;
                case "5":
                    return '微信'
                    break;
                case "6":
                    return '支付宝'
                    break;
                case "7":
                    return '活动抵扣'
                    break;
                case " ":
                    return '暂未支付'
                    break;
                case null:
                    return '暂未支付'
                    break;
                default:
                    break;
            }
        },
        invoiceType(value){
            switch (value) {
                case "1":
                    return '普通发票'
                    break;
                case "2":
                    return '增值税专票'
                    break;
                default:
                    break;
            }
        },
    }
}
</script>
<style lang="less">
#app .detail{
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
        .detial-status{
            background:#ffffff;
            box-shadow:0 1px 2px 0 rgba(0,0,0,0.10);
            // height:210px;
            padding: 30px;
            .status{
                font-size:30px;/*px*/
                color:#1aad19;
            }
            .active2{
                color:#666666;
            }
            .active3{
                color:#b6a382;
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
                        p.weui-wepay-flow__title-bottom{
                            right:10px;
                            left:auto;
                            transform: none;
                            div{
                                span:nth-child(1){
                                    margin-right: -10px;
                                    // margin-left: -20px;
                                }
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
            // margin-top: 20px;
            background:#ffffff;
            box-shadow:0 1px 2px 0 rgba(0,0,0,0.10);
            height:254px;
            display: flex;
            width: 100%;
            flex-direction: column;
            .hotel-info{
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                height: 165px;
                padding: 30px;
                border-bottom:1px solid #d8d8d8;
                div:first-child{
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    margin-right: 60px;
                    span:nth-child(1){
                        font-size:30px;/*px*/
                        color:#2d2d2d;
                        line-height: 41px;
                    }
                    span:nth-child(2){
                        margin-top: 20px;
                        font-size:26px;/*px*/
                        color:#bbbbbb;
                        line-height: 44px;
                    }
                }
                img{
                    width: 13px;
                    height: 20px;
                }
            }
            .hotel-button{
                display: flex;
                height: 88px;
                a{
                    width: 50%;
                    height: 100%;
                    div{
                        width: 100%;
                    }
                }
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
        .info-title{
            height: 66px;
            padding: 20px 0 20px 30px;
            font-size:26px;/*px*/
            line-height:26px;
            color:#989898;
        }
        .tourism{
            .tourism-title{
                margin-top: 20px;
                background: #fff;
                padding: 30px;
                div{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    span:nth-child(1){
                        font-size:30px;/*px*/
                        color:#2d2d2d;
                    }
                    span:nth-child(2){
                        margin-top: 20px;
                        font-size:26px;/*px*/
                        color:#bbbbbb;
                    }
                }
            }
            .tourism-title:nth-of-type(2){
                margin-top: 0;
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
            }
            .order-info{
                .weui-cells{
                    margin-top: 0;
                    .weui-cell{
                        height: 88px;
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
                }
            }
            .form-amount{
                .weui-cells{
                    margin-top: 20px;
                    .weui-cell{
                        height: 98px;
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
        height: 98px;
        background:#ffffff;
        box-shadow:0 -1px 2px 0 rgba(0,0,0,0.10);
     .order-card-b {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding-top: 20px;
          padding-right: 30px;
          .weui-btn {
            margin: 0;
            margin-left: 20px;
          }
          button.weui-btn_plain-default {
            border-color: #cecece;
            font-size: 28px;/*px*/
            color: #989898;
          }
          button.weui-btn_plain-default.assess {
            border-color: #b6a382;
            color: #b6a382;
          }
          button.weui-btn_plain-default.payment {
            background: #040404;
            color: #fff;
          }
        }
        }
}
.map-dialog .weui-dialog{
    max-width: 690px;
    width: 690px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: auto;
    background: transparent;
    .img-div{
        width: 690px;
        height: 690px;
        border-radius: 12px;/* no */
        background: #fff;
        img{
            width: 690px;
            height: 690px;
            border-radius: 12px;/* no */
        }
    }
    .close{
        margin-top: 58px;
        img{
            width: 58px;
            height: 58px;
        }

    }
}
</style>
