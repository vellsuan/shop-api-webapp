<template>
   <div class="orders">
        <x-header :left-options="{backText: ''}">我的订单</x-header>
        <tab v-model.number="tabIndex" active-color="#2d2d2d" default-color="#989898" bar-active-color="#b6a382" custom-bar-width="17px">
            <tab-item  @on-item-click="onItemClick">全部</tab-item>
            <tab-item  @on-item-click="onItemClick">待付款</tab-item>
            <tab-item  @on-item-click="onItemClick">待评价</tab-item>
            <tab-item  @on-item-click="onItemClick">已取消</tab-item>
        </tab>
        <div class="orders-list wrapper" v-if="dataAll">
          <Scroll ref="scroll"
                  :data='items'
                  :pullUpLoad="pullUpLoad"
                  :listenScrollEnd="true"
                  @pullingUp="onItemClick(index,currentPageNum)">
              <div class="orders-detial content">
                  <div  class="orders-card" v-for="list in items" :key="list.orderId">
                      <router-link v-if='list.type == "1"' :to="'/detail?id=' + list.orderId + '&orderStatus=' + list.orderStatus + '&isEvaluate=' + list.isEvaluate">
                          <div class="order-card-t vux-1px-b">
                              <div class="order-num">订单号：{{list.orderNo}}</div>
                              <div class="order-status" :class="'active'+ list.orderStatus">{{list.orderStatus | orderStatus}}</div>
                          </div>
                          <div class="order-card-mt vux-1px-b">
                              <div class="order-name">{{list.roomName}}</div>
                              <div class="order-date">{{list.checkinTimeStr}} 至 {{list.checkoutTimeStr}} 共{{list.checkinDays}}晚</div>
                          </div>
                          <div class="order-card-mb ">
                              <div class="order-day">{{list.createTimeStr}}</div>
                              <div class="order-money" v-if="list.orderStatus == 1 || list.orderStatus == 3">实付金额 <span>￥{{list.paySum}}</span></div>
                              <div class="order-money" v-else>应付金额 <span>￥{{list.needSum}}</span></div>
                          </div>
                      </router-link>
                      <router-link v-if='list.type == "2"' :to="'/detail?no=' + list.orderNo + '&orderStatus=' + list.orderStatus + '&isEvaluate=' + list.isEvaluate">
                          <div class="order-card-t vux-1px-b">
                              <div class="order-num">订单号：{{list.orderNo}}</div>
                              <div class="order-status" :class="'active'+ list.orderStatus">{{list.orderStatus | orderStatus}}</div>
                          </div>
                          <div class="order-card-mt vux-1px-b">
                              <div class="order-name">{{list.statusName}}</div>
                              <div class="order-date">有效期至：{{list.cancelTimeStr}}</div>
                          </div>
                          <div class="order-card-mb ">
                              <div class="order-day">{{list.createTimeStr}}</div>
                              <div class="order-money" v-if="list.orderStatus == 1">实付金额 <span>￥{{list.paySum}}</span></div>
                              <div class="order-money" v-else>应付金额 <span>￥{{list.needSum}}</span></div>
                          </div>
                      </router-link>
                          <div class="order-card-b vux-1px-t" v-if="list.type == 1 && list.orderStatus < 2 || (list.orderStatus == 3 && list.isEvaluate == 0)">
                              <x-button v-if="list.orderStatus==1 || list.orderStatus==0" mini plain @click.native='showlDialog1(list)'>取消订单</x-button>
                              <x-button v-if="list.isEvaluate == 0 && list.orderStatus==3" class="assess" mini plain @click.native='showRater1(list)'>去评价</x-button>
                              <x-button v-if="list.orderStatus==0" class="payment" @click.native='paymentOrder(list)' mini plain>支付订单</x-button>
                          </div>
                          <div class="order-card-b vux-1px-t" v-if="list.type == 2 && list.orderStatus==0">
                              <x-button mini plain @click.native='showlDialog1(list)'>取消订单</x-button>
                              <x-button class="payment" @click.native='paymentOrder(list)' mini plain>支付订单</x-button>
                          </div>

                  </div>
                  <!-- <load-more v-show="showdata" :show-loading="false"  tip="没有更多了"></load-more> -->
              </div>
          </Scroll>
        </div>
        <div class="orders-list" v-else>
            <blank-data-page>
              <img slot="img" src="../assets/wodedingdnan_kong@2x.png" alt="" />
              <span slot="tips">还没有订单哦</span>
              <a slot="goToVisit" href="/homestay/home">
                    <span>去逛逛</span>
              </a>
            </blank-data-page>
        </div>
        <!-- <load-more v-show="show"  tip="正在加载"></load-more> -->
        <Evaluation :comment='commentShow' :orderId='orderId' :orderNo='orderNo' :createTimeStr="createTimeStr" @changeComment='showComment' @refreshFList='refreshList'></Evaluation>
        <Cancel :invitor="isShow" :orderId='orderId' @changingType="showlDialog" @refreshFList='refreshList'></Cancel>
    </div>
</template>
<script>
import BScroll from "better-scroll";
import Cancel from '../module/cancel';
import Evaluation from '../module/evaluation';
import blankDataPage from '@/components/blankdatapage';
import Scroll from '@/components/scroll';
import {
  XHeader,
  Tab,
  TabItem,
  XButton,
  Popup,
  LoadMore,
  Group,
  Checker,
  CheckerItem,
} from "vux";
export default {
  components: {
    XHeader,
    Tab,
    TabItem,
    XButton,
    LoadMore,
    Popup,
    XButton,
    Group,
    Checker,
    CheckerItem,
    Cancel,
    Evaluation,
    Scroll,
    'blank-data-page' : blankDataPage,
  },
  data() {
    return {
      dataAll:true,
      items: [],
      tabIndex:0,
      currentPageNum: 1,
      index: 0,
      orderList: {},
      commentGrade: 5,
      commentContent: "",
      isShow:false,
      orderId:'',
      commentShow:false,
      createTimeStr:'',
      orderNo:'',
      pullUpLoad: {
        threshold: 50,
        txt: {more: '', noMore: '没有更多了'}
      },
    }
  },
  created() {
  },
  mounted () {
    if (this.$route.query.active) {
      this.index = this.$route.query.active;
      this.$nextTick(()=>{
        this.tabIndex = Number(this.index);
        this.items = [];
        this.onItemClick(this.index,1)
      })
    }
  },
  methods: {
    onItemClick(index, currentPageNum) {
        this.$router.replace(`?active=${index}`);
        this.index = index
        if (!currentPageNum) {
          this.currentPageNum = 1;
          this.items = [];
          if(this.$refs.scroll){
          this.$refs.scroll.scrollTo(0,0,0,'bounce')
          }
        }
        if (index == 0) {
          this.getOrder({ orderStatus: "", isEvaluate: "" });
        } else if (index == 1) {
          this.getOrder({ orderStatus: 0});
        } else if (index == 2) {
          this.getOrder({ orderStatus: 3, isEvaluate: 0 });
        } else if (index == 3) {
         this.getOrder({ orderStatus: 2 });
        }
    },
    // 获取列表
    getOrder(obj) {
      const params = {
        url: "/userOrderDetail",
        data: {
          userId: JSON.parse(window.localStorage.getItem("userInfo")).userId,
          currentPageNum: this.currentPageNum++,
          pageCount: 10,
          orderStatus: isNaN(obj.orderStatus) ? "" : obj.orderStatus,
          isEvaluate: isNaN(obj.isEvaluate) ? "" : obj.isEvaluate,
          cancelStatus: isNaN(obj.cancelStatus) ? "" : obj.cancelStatus
        }
      };
      this.api.post(params, res => {
        if (res.page.datas[0]) {
          this.items = this.items.concat(res.page.datas);
        } else {
          this.$refs.scroll.forceUpdate()
        }
        if(this.items.length){
          this.dataAll=true;
        }else{
          this.dataAll=false;
        }
      },false,msg => {
        console.log(msg);
      },false);
    },
    // 展示评价等级
    showRater1(list) {
      this.commentShow = true;
      this.createTimeStr = list.createTimeStr
      this.orderNo = list.orderNo
      this.orderId = list.orderId
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
 /*    // 提交评价
    submitReview() {
      const params = {
        url: "/submitReview",
        data: {
          userId: JSON.parse(window.localStorage.getItem("userInfo")).userId,
          commentContent: this.commentContent,
          commentGrade: this.commentGrade,
          commentImgs: "",
          orderId: this.orderList.orderId
        }
      };
      this.api.post(params, res => {
        console.log(res);
        this.commentGrade = 5;
        this.commentContent = "";
        this.items = [];
        this.currentPageNum = 1;
        this.getOrder({ orderStatus: 3, isEvaluate: 0 });
      });
    }, */
    // 通知主页面是否取消订单显示
    showlDialog(data){
      if(data == 'false'){
        this.isShow = false;
      }else{
        this.isShow = true;
      }
    },
    // 删除订单
     showlDialog1(list){
       if(list.type == 1){
         this.orderId = list.orderId
         this.showlDialog()
       }else{
        const _this = this // 需要注意 onCancel 和 onConfirm 的 this 指向
        this.$vux.confirm.show({
           title: '确认取消订单？',
          // 组件除show外的属性
          // onCancel () {
          //   console.log(_this) // 当前 vm
          // },
          onConfirm () {
            const params = {
              url: "/cancelCardOrder",
              data: {
                orderSn:list.orderNo
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
            },false);
          }
        })
       }
    },
    // 刷新页面
    refreshList(){
      console.log(123);
      this.onItemClick(this.index)
    },
    // 模拟支付
    paymentOrder(list){
      if(list.type!=1){//买卡
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

        }
  },
  filters: {
    orderStatus(value) {
      switch (value) {
        case "0":
          return "待付款";
          break;
        case "1":
          return "已付款";
          break;
        case "2":
          return "已取消";
          break;
        case "3":
          return "已完成";
        default:
          break;
      }
    }
  }
};
</script>
<style lang="less">
.orders {
  height: 100%;
  background: #efeff4;
  display: flex;
  flex-direction: column;
    .vux-header{
        background:#2d2d2d;
        height:47PX;
        z-index: 9999;
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
  .vux-tab {
    height: 98px;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.1);
    z-index: 1;
    .vux-tab-item {
      background: #fff;
      font-size: 28px; /* px */
      line-height: 98px;
    }
    .vux-tab-ink-bar{
      .vux-tab-bar-inner{
        border-radius: 100px;
      }
    }
  }
  .orders-list {
    flex: 1;
    overflow: auto;
    // -webkit-overflow-scrolling: touch; /* ios5+ */
    .orders-detial {
      // margin-bottom: 20px;
      padding-bottom: 10px;
      .orders-card {
        background: #ffffff;
        box-shadow: 0 2px 4px 0 rgba(83, 83, 83, 0.1);
        border-radius: 7px;
        width: 690px;
        height: 414px;
        margin: 20px auto 0;
        padding: 0 30px 20px;
        .order-card-t {
          height: 96px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .order-num {
            font-size: 26px;/*px*/
            color: #666666;
          }
          .order-status {
            font-size: 28px;/*px*/
            color: #1aad19;
          }
          .active2 {
            color: #666666;
          }
          .active3 {
            color: #b6a382;
          }
          .active0 {
            color: #ea5414;
          }
        }
        .order-card-mt {
          height: 144px;
          padding: 30px 0 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: flex-start;
          .order-name {
            font-size: 28px;/*px*/
            color: #2d2d2d;
            line-height: 40px;
            margin-bottom: 20px;
          }
          .order-date {
            font-size: 24px;/*px*/
            color: #989898;
            line-height: 33px;
          }
        }
        .order-card-mb {
          height: 74px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .order-day {
            font-size: 24px;/*px*/
            color: #989898;
          }
          .order-money {
            font-size: 24px;/*px*/
            color: #2d2d2d;
            span {
              font-size: 30px;/*px*/
              color: #ea5414;
            }
          }
        }
        .order-card-b {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding-top: 20px;
          .weui-btn {
            margin: 0;
            margin-left: 20px;
          }
          button.weui-btn_plain-default {
            border-color: #cecece;
            font-size: 28px;/*px*/
            color: #989898;
            height: 60px;
          }
          button.weui-btn_mini{
            line-height: 1.2;
          }
          button.weui-btn_plain-default.assess {
            border-color: #b6a382;
            color: #b6a382;
          }
          button.weui-btn_plain-default.payment {
            background: #040404;
            color: #fff;
            border-color: transparent;
          }
        }
        .vux-1px-b:after{
          border-bottom: 1PX solid #eeeeee;
        }
        .vux-1px-t:before{
          border-top: 1PX solid #eeeeee;
        }
      }
    }
  }
  .evaluationStyle {
    width: 100%;
    background-color: #fff;
    margin: 0 auto;
    .userCadrdHeader {
      width: 100%;
      height: 98px;
      line-height: 98px;
      text-align: center;
      color: #000;
      font-size: 30px;/*px*/
      position: relative;
      .vux-x-icon {
        position: absolute;
        right: 10px;
        top: 10px;
        width: 88px;
        height: 88px;
        fill: rgb(216, 216, 216);
      }
    }
    .weui-cells {
      margin: 0;
      padding-bottom: 60px;
      .weui-cell:before {
        height: 0;
        border: 0;
      }
      .weui-cell__hd {
        width: 80px;
        img {
          height: 40px;
          margin: 0 auto;
          display: block;
        }
      }
      .weui-input {
        font-size: 28px;/*px*/
        color: rgb(45, 45, 45);
      }
      .weui-input::-webkit-input-placeholder {
        color: rgb(187, 187, 187);
      }
      button.weui-btn {
        background-color: #fff;
        padding-left: 30px;
        border-left: 1px solid rgb(216, 216, 216);
        border-radius: 0;
        color: rgb(45, 45, 45);
      }
      .weui-btn:after {
        border: 0;
        height: 0;
      }
    }
    .weui-cells:before {
      height: 0;
      border: 0;
    }
    .userCardbtn {
      padding: 10px 30px;
      border-top: 1PX solid #D9D9D9;
      .weui-btn {
        width: 100%;
        height: 78px;
        line-height: 78px;
        padding: 0;
        border-radius: 6px;
        background-color: rgba(4, 4, 4, 1);
        color: #fff;
        text-align: center;
        font-size: 30px;/*px*/
      }
    }
    .assess-group {
      display: flex;
      flex-direction: column;
      .order-num-date {
        height: 96px;
        margin: 0 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 24px;/*px*/
        color: #666666;
      }
      .vux-rater {
        margin: 80px auto 20px;
      }
      p {
        font-size: 28px;/*px*/
        color: #666666;
        text-align: center;
        margin-bottom: 80px;
      }
    }
    .cancel-group{
      display: flex;
      flex-direction: column;
      padding: 0 30px;
      margin-bottom: 80px;
      .order-num-date{
       p{
          line-height: 48px;
          color: rgba(102, 102, 102, 1);
          font-size: 24px;/*px*/
          text-align: left;
        }
      }
    }
  }
}
.weui-dialog__ft a{
  color: #2d2d2d;
}
</style>
