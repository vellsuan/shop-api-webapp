<template>
    <div class="confirmexchang">
        <x-header :left-options="{backText: ''}">
            <span>确认兑换</span>
        </x-header>
        <div class="exchang-content">
            <div v-show="showAddress">
                <div class="shipping-address" @click="goAddressList">
                    <div class="shipping-address-logo">
                        <img src="../assets/tb_dingwei.png" alt="" />
                    </div>
                    <div class="shipping-address-content" v-if="receiver != ''">
                        <div class="address-top">
                            <div>
                                <span>收货人：</span>
                                <span>{{receiver}}</span>
                            </div>
                            <span>{{phone}}</span>
                        </div>
                        <div class="address-buttom">
                            <span>收货地址：</span>
                            <span>{{address}}</span>
                        </div>
                    </div>
                    <div class="shipping-address-content" v-else>
                        <div class="shipping-address-default">
                            <span>请添加收货地址</span>
                        </div>
                    </div>
                    <div class="shipping-address-cell">
                        <img src="../assets/a1_icon.png" alt="" />
                    </div>
                </div>
                <div class="shipping-address-bg"></div>
            </div>
            <div class="exchange-goods">
                <span>兑换商品</span>
                <div class="exchange-goods-content">
                    <div class="exchange-goods-img">
                        <img :src="imgURL + redeemContent.imgUrl" alt="" />
                    </div>
                    <div class="exchange-goods-introduce">
                        <p>{{redeemContent.couponName || ''}}</p>
                        <p>兑换时间：{{currentTime}}</p>
                        <p>x{{number}}</p>
                    </div>
                </div>
            </div>
            <group class="redeem-points">
                <!-- <cell v-show="showAddress" title="运费"  @click.native="onClick"></cell> -->
                <cell :title="'共'+number+'件商品'" :value="'消耗：'+ (redeemContent.credits || 0) + '积分'"></cell>
                <!-- <cell :title="'共'+number+'件商品'" :value="'消耗：'+ (redeemContent.credits || 0) + '积分'"></cell> -->
            </group>
            <div class="order-notes">
                <span>订单备注</span>
                <group class="order-notes-textarea">
                    <x-textarea :max="50" placeholder="请输入备注内容" v-model="remark" :height="45" @on-focus="onEvent('focus')" @on-blur="onEvent('blur')"></x-textarea>
                </group>
            </div>
        </div>
        <footer class="exchang-footer">
            <div class="footer-left">
                <span>积分消耗</span>
                <span>{{redeemContent.credits || 0}}</span>
                <!-- <span>{{points}}</span> -->
            </div>
            <div class="footer-right" @click="confirmExchange">
                <span>立即兑换</span>
            </div>
        </footer>
        <!-- <div v-transfer-dom class="confirmexchangV">
            <Confirm v-model="confirmExchange"
            title="确定兑换？"
            @on-confirm="redeemNow">
            </Confirm>
        </div> -->
    </div>
</template>
<script>
import { XHeader, Cell, Group, XTextarea, dateFormat, Confirm, TransferDomDirective as TransferDom } from "vux";
export default {
  directives: {
      TransferDom
  },
  components: {
    XHeader,
    Cell,
    Group,
    XTextarea,
    Confirm
  },
  data() {
    return {
      id : '',           //积分兑换商品ID
      userInfo: JSON.parse(window.localStorage.getItem("userInfo")) || '',  //获取登录时的用户ID
      number: 1,
      points: 3000,
      //freight: 0.0,
      showAddress: false,
      redeemContent: [],
      imgURL: JSON.parse(window.localStorage.getItem("config")).ServerImgURL,
      currentTime: "",
      receiver: "",    //收货人
      phone: "",       //收货人手机号
      address : "",    //收货人地址
      remark : '',                     //备注
      userAddress : JSON.parse(window.localStorage.getItem("userAddress")) //选择地址存进来的值
    };
  },
  created(){
    window.onpageshow = function (e) {
      if (e.persisted) {
        window.location.reload(true)
      }
    }
    // if(window.localStorage.getItem("integraLPage")){
    //   window.localStorage.removeItem("integraLPage")
    // }
  },
  mounted() {
    if(this.userAddress){
      // this.receiver = decodeURIComponent(this.getParams().receiver)
      // this.phone = decodeURIComponent(this.getParams().phone)
      // this.address = decodeURIComponent(this.getParams().address)
      this.receiver = this.userAddress.receiver
      this.phone = this.userAddress.phone
      this.address = this.userAddress.address
    }else{
      this.getShippingAddress();
    }
    this.integralExchange();
    if (this.$route.query.sendState == 1) {
      this.showAddress = true;
    } else {
      this.showAddress = false;
    }
  },
  methods: {
    onEvent(event) {
      console.log("on", event);
    },
    //获取地址栏地址
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
    //点击进入地址列表页
    goAddressList() {
        if(!this.userAddress){
          let url = window.location.href;
          let index=url.indexOf("/homestay");
          url = url.slice(index);
          window.localStorage.setItem("integraLPage",url);
        }else{
          window.localStorage.removeItem("userAddress");
          let url = window.location.href;
          let index=url.indexOf("/homestay");
          url = url.slice(index);
          window.localStorage.setItem("integraLPage",url);
        }

        if (process.env.NODE_ENV === 'production') {
            // koa page-router配置跳转地址 不带#号
            window.location.href = "/homestay/usercenter#/shippingaddress"
        }
        if (process.env.NODE_ENV === 'development') {
            // vue哈希路有。 带#号
            window.location.href = "/usercenter.html#/shippingaddress";
        }
    },
    //获取收货地址
    getShippingAddress(){
      const params = {
        url: "/getShippingAddress",
        data: {
          isHost : 1,
          userId : this.userInfo.userId
        }
      };
      this.api.post(params, res => {
          let list = res && res.ua
          if(list){
            this.receiver = list.userName;
            this.phone = list.tel;
            this.address = list.provinceName + ' ' + list.districtName + ' ' + list.areaName + ' ' + list.address;
          }
      });
    },
    //获取兑换积分内容
    integralExchange() {
      const params = {
        url: "/integralExchange",
        data: {
          couponKeyCode: this.$route.query.couponKeyCode
        }
      };
      this.api.post(params, res => {
        this.redeemContent = res && res.entity;
        this.id = res.entity.id;
        this.currentTime = dateFormat(res.currentTime, "YYYY-MM-DD HH:mm:ss");
      });
    },
    // 点击立即兑换弹窗
    confirmExchange(){
      if(this.$route.query.sendState == 1){
          if(!this.receiver){
            this.$vux.toast.text("请先添加收货信息","middle");
            return;
          }
      }
      const _this = this // 需要注意 onCancel 和 onConfirm 的 this 指向
        this.$vux.confirm.show({
            title: '确定兑换？',
            onConfirm () {
              _this.redeemNow()
            }
        })
    },
    //立即兑换
    redeemNow() {
      //this.confirmExchange = true;
      // if(this.redeemContent.length < 0){

      // }
      const params = {
        url: "/redeemNow",
        data: {
          couponCodeKey: this.$route.query.couponKeyCode,
          id : this.id ,
          userId : this.userInfo.userId || '',
          shippingAddress : this.address,
          tel : this.userInfo.phone || '',
          userName : this.receiver,
          remark : this.remark,
          linkManPhone:this.phone
        }
      };
      this.api.post(params, res => {
          if(res && res.list){
             this.$router.push({path:'/'});
          }
      },true);
    },
  }
};
</script>
<style lang="less">
#app{
  .confirmexchang {
    height: 100%;
    background: #f5f5f5;
    display: flex;
    flex-direction: column;
    overflow: hidden;
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
    .exchang-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch; /* ios5+ */
      .shipping-address {
        margin-top: 20px;
        width: 100%;
        height: 208px;
        background-color: rgba(255, 255, 255, 1);
        padding: 30px;
        display: flex;
        align-items: center;
        .shipping-address-logo {
          margin-right: 20px;
          img {
            width: 27px;
            height: 35px;
          }
        }
        .shipping-address-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          .address-top {
            display: flex;
            justify-content: space-between;
            height: 40px;
            line-height: 40px;
            color: rgba(45, 45, 45, 1);
            font-size: 28px;/*px*/
            margin-bottom: 20px;
          }
          .address-buttom {
            span {
              height: 44px;
              line-height: 44px;
              color: rgba(45, 45, 45, 1);
              font-size: 24px;/*px*/
            }
          }
          .shipping-address-default{
            span{
              font-size: 30px;/*px*/
              color: #666666;
            }
          }
        }
        .shipping-address-cell {
          margin-left: 45px;
          img {
            width: 12px;
            height: 20px;
          }
        }
      }
      .shipping-address-bg {
        height: 12px;
        width: 100%;
        background: url(../assets/bg_zfdz.png) no-repeat center center;
        background-size: 100% 100%;
      }
      .exchange-goods {
        margin-top: 20px;
        width: 100%;
        background-color: rgba(255, 255, 255, 1);
        box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1);
        padding: 24px 30px 0;
        span {
          display: block;
          height: 42px;
          line-height: 42px;
          color: rgba(45, 45, 45, 1);
          font-size: 30px;/*px*/
        }
        .exchange-goods-content {
          width: 100%;
          height: 242px;
          margin-top: 20px;
          display: flex;
          .exchange-goods-img {
            width: 200px;
            height: 200px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .exchange-goods-introduce {
            flex: 1;
            display: flex;
            flex-direction: column;
            margin-left: 20px;
            p:nth-child(1) {
              height: 98px;
              color: rgba(45, 45, 45, 1);
              font-size: 28px;/*px*/
            }
            p:nth-child(2) {
              margin-top: 28px;
              line-height: 24px;
              color: rgba(187, 187, 187, 1);
              font-size: 22px;/*px*/
            }
            p:nth-child(3) {
              margin-top: 26px;
              line-height: 24px;
              color: rgba(152, 152, 152, 1);
              font-size: 24px;/*px*/
            }
          }
        }
      }
      .redeem-points {
        margin-top: 20px;
        background-color: rgba(255, 255, 255, 1);
        .weui-cells {
          margin-top: 0;
          // .weui-cell {
          //   height: 98px;
          //   padding: 28px 30px;
          //   .vux-cell-bd {
          //     p {
          //       .vux-label {
          //         height: 42px;
          //         line-height: 42px;
          //         color: rgba(45, 45, 45, 1);
          //         font-size: 28px;/*px*/
          //       }
          //     }
          //   }
          //   .weui-cell__ft {
          //     line-height: 42px;
          //     color: rgba(182, 163, 130, 1);
          //     font-size: 28px;/*px*/
          //   }
          // }
          .weui-cell:nth-child(1) {
            height: 98px;
            padding: 28px 30px;
            .vux-cell-bd {
              p {
                .vux-label {
                  height: 42px;
                  line-height: 42px;
                  color: rgba(187, 187, 187, 1);
                  font-size: 24px;/*px*/
                }
              }
            }
            .weui-cell__ft {
              line-height: 42px;
              color: rgba(102, 102, 102, 1);
              font-size: 28px;/*px*/
            }
          }
          .weui-cell:before {
            left: 0;
            border: 1px solid rgba(239, 239, 239, 1);
          }
        }
        .weui-cells:after {
          border: none;
        }
        .weui-cells:before {
          border: none;
        }
      }
      .order-notes {
        margin: 20px 0 40px;
        padding: 30px;
        width: 100%;
        height: 322px;
        background: rgba(255, 255, 255, 1);
        span {
          height: 42px;
          line-height: 42px;
          color: rgba(45, 45, 45, 1);
          font-size: 28px;/*px*/
        }
        .order-notes-textarea {
          margin-top: 20px;
          .weui-cells {
            margin-top: 0;
            .vux-x-textarea {
              margin-top: 0;
              border: 1px solid rgba(239, 239, 239, 1);
              .weui-cell__bd {
                .weui-textarea {
                  line-height: 42px;
                  font-size: 24px;/*px*/
                }
                .weui-textarea-counter {
                  line-height: 42px;
                  color: rgba(187, 187, 187, 1);
                  font-size: 24px;/*px*/
                  span {
                    line-height: 42px;
                    color: rgba(187, 187, 187, 1);
                    font-size: 24px;/*px*/
                  }
                }
              }
            }
            .weui-cell {
              padding: 20px;
            }
          }
          .weui-cells:before {
            border: none;
          }
          .weui-cells:after {
            border: none;
          }
        }
      }
    }
    .exchang-footer {
      height: 98px;
      background-color: rgba(255, 255, 255, 1);
      box-shadow: 0px -1px 2px 0px rgba(0, 0, 0, 0.1);
      display: flex;
      justify-content: space-between;
      .footer-left {
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          height: 36px;
          line-height: 36px;
          font-size: 30px;/*px*/
        }
        span:nth-child(1) {
          color: rgba(102, 102, 102, 1);
          margin-left: 30px;
        }
        span:nth-child(2) {
          color: rgba(234, 84, 20, 1);
          margin-left: 20px;
          font-weight: 700;
        }
      }
      .footer-right {
        width: 256px;
        height: 98px;
        background-color: rgba(9, 11, 12, 1);
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          height: 42px;
          line-height: 42px;
          color: rgba(255, 255, 255, 1);
          font-size: 30px;/*px*/
          font-weight: 700;
        }
      }
    }
  }
}
.vux-confirm{
  .vux-x-dialog{
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
}
</style>
