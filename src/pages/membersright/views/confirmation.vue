<template>
  <div class="confirmation">
    <x-header  :left-options="{backText: ''}">订单确认</x-header>
    <div class="contain">
      <!--<div class="adrepp">
        <div class="adressPt">
          <div class="adressPtC">
          <img src="../assets/tb_dingwei.png" alt="">
          </div>
          <div class="adressOne">
            <div class="adrssTitle">
              <p>收货人:<span v-text="datamsg.name"></span></p>
              <p v-text="datamsg.phone"></p>
            </div>
            <div class="adrssContent">
              <div>
                <p>收货地址:&nbsp&nbsp<span v-text="datamsg.address"></span></p>
              </div>
            </div>

          </div>
          <div class="adressPtC Ptctwo" @click="backpage">
          <img src="../assets/a1_icon.png" alt="">
          </div>
        </div>
        <div class="adressLine">
          <img src="../assets/bg_zfdz.png" alt="">
        </div>
      </div>-->
      <div class="buy">
        <div class="buytitle">购买商品</div>
        <div class="buyFlex">
          <div class="buyImg">
            <img :src="imgIp+datamsg.img" alt="">
          </div>

          <div class="buyContent">
            <p v-text="datamsg.describes"></p>
            <p ><span>有效期至：<span class="timeleft" v-text="datamsg.time"></span></span></p>
            <div class="ptherr">
              <div>
                <span>￥</span><span v-text="datamsg.price">28888.00</span>
              </div>
              <div>
                <span>x</span>1<span>张</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <!-- <div v-model="Points" style="display: none"></div> -->
        <group  class="form-coupon" label-width="7em" label-margin-right="2em" label-align="left">
            <x-switch title="可用积分"  :inline-desc="Points-numval"  prevent-default  v-model="show1"  @on-click="fcousFun"></x-switch>
          <input   :class="{integralDisplay:true,maxinput:true}"  ref="memberInputs"  v-model="numval" :min="1" :max="String(parseInt(Points)).length"  ><span class="kediyong"><span>可抵用&nbsp&nbsp</span><span class="pointmoney">{{ct}}元</span></span>

          <!-- <x-switch ref="inputs" :title="'<p>可用积分<span>'+(Points-numval)+'</span></p>'"  prevent-default :nm="Points" v-model="show1" @on-click="fcousFun">
          </x-switch>
          <cell :title="msg">
            <span slot="title">
              <span class="spannum">
                <!-<x-input   :placeholder="textFen" :disabled="!show1"  v-model="numval" ></x-input>-->
                <!-- <input   v-show="show1" ref="memberInputs" class="maxinput"   v-model="numval">
              </span>
            </span>
            <span class="mangspanPt" slot="value" >可抵用<span class="mangspan" v-text="ct+'元'"></span></span>
          </cell> -->
        </group>

      </div>
      <!--<div>
        <group>
          <cell :title="payment" >
            <span class="zhifs" slot="title">
              支付方式
            </span>
            <div slot="value" class="rightMang">
              <img src="../assets/ddqr_zfb@2x.png" alt="">
              <p>支付宝支付</p>
            </div>
          </cell>
        </group>
      </div>-->
      <div>
        <group>
          <cell :title="payment" >
            <span class="zhifs" slot="title">
              商品金额
            </span>
            <div slot="value" class="rightMang">
              <p>￥<span v-text="datamsg.price">28888.00</span></p>
            </div>
          </cell>
          <cell :title="payment" v-if="ct > 0 && onIntegral">
            <span class="zhifst" slot="title">
              积分抵扣
            </span>
            <div slot="value" class="rightMangt">
              <p >-￥<span v-text="ct"></span></p>
            </div>
          </cell>
          <cell :title="payment" >
            <span class="zhifst" slot="title">
             <!-- 快递:￥0.00-->
            </span>
            <div slot="value" class="rightMangr">
              <p v-if="show1">小计 <span class="xiaojifont">￥<span v-text="datamsg.price-ct"></span></span></p>
              <p v-else>小计 <span class="xiaojifont">￥<span v-text="datamsg.price"></span></span></p>
            </div>
          </cell>
        </group>
      </div>
      <div class="textPrent">
        <div class="textPone">
          <div class="textSign">订单备注</div>
          <div class="textOut">
            <!--<div class="leftBorder"></div>-->
            <group>
              <x-textarea :max="50" :placeholder="msg" v-model="remark" @on-focus="onEvent('focus')"
                          @on-blur="onEvent('blur')" ></x-textarea>
            </group>
          <!--  <div class="rightBorder"></div>-->
          </div>
        </div>
      </div>

    </div>
    <footer>

      <div v-if="show1" class="heji"><p >合计金额</p><p class="jiacu" v-text="'￥'+((datamsg.price)-ct)"></p></div>
      <div v-else class="heji"><p >合计金额</p><p class="jiacu" v-text="'￥'+(datamsg.price)"></p></div>
      <div class="btnsure jiacu"  @click="pay" >立即支付</div>
    </footer>
    <loading :show="show2" text=""></loading>
   <!-- <confirm v-model="confirm"
             :title="confirmmsg">
      <slot>
        <group title="隐藏时不影响其他popup-picker的mask">
          <popup-picker  title="显示值" :data="['我不会影响遮罩层'.split('')]" v-model="value6"></popup-picker>
        </group>
        <div @click="onHide" >123123</div>
        <x-button :plain="false"  @click.native="pay" class="greenBtn">确认支付</x-button>
      </slot>
    </confirm>-->
  </div>
</template>
<script>

  import {GroupTitle, Group,  XInput, Selector, PopupPicker,Confirm,XHeader, XButton, XTextarea, Cell, XSwitch,XAddress,Loading, TransferDomDirective as TransferDom} from 'vux'


  export default {
    directives: {
      TransferDom,
      focus: {
        // 指令的定义
        inserted: function (el) {
           console.log(el)
          el.focus()
        }
      }
    },
    components: {
      Confirm,
      XInput,
      XTextarea,
      XHeader,
      XButton,
      XSwitch,
      XAddress,
      Loading,
      PopupPicker,
      Group,
      GroupTitle,
      Cell,


    },
    data() {
      return {
        datalist:['广东省', '深圳市', '南山区'],
        value6:[],
        confirmmsg:' ',
        confirm:true,
        textFen:'输入积分金额',
        msg: '请输入备注内容',
        show1: this.Points,
        userName: '郭佳丽',
        phone: '18829338475',
       /* htmlval: '<p>可用积分<span >{{Points}}</span></p>',*/
        payment: '支付方式',
        address:'北京市朝阳区呼家楼博瑞大厦B座北京市朝阳区',
        remark:'',
        datamsg:this.$route.query,
        numval:'',
        imgIp:JSON.parse(window.localStorage.getItem("config")).ServerImgURL,
        userInfo:JSON.parse(window.localStorage.getItem("userInfo")) || '',
        Points:0,
        ct:0,
        usePoint:0,
        jsonPoint:0,
        show2:true,
        numvalMax:'',
        oldvalt:0,
        creditPro:0,
        onetiam:false,
        onIntegral:false,         //切换使用积分控制积分抵扣显示和隐藏

      }
    },
    methods: {
      onShow () {
        this.confirm=true;
        console.log('plugin show')
      },
      onHide(){
        this.confirm=false;
      },
      onConfirm(){},
      onCancel(){},
      xiangqingye(){
        if (process.env.NODE_ENV === 'production') {
          // koa page-router配置跳转地址 不带#号
          window.location.href='/membersright#/?id'+'='+this.datamsg.id
        //  window.location.href='homestay/home#/bindphone'
        }
        if (process.env.NODE_ENV === 'development') {
          // vue哈希路有。 带#号
          window.location.href='/membersright.html#/?id'+'='+this.datamsg.id
        }

       // this.$router.push({path:'/membersright'})
      },
      fenDkou(){
          var   type="^[0-9]*[1-9][0-9]*$";
          var   re   =   new   RegExp(type);
          if(re.test(this.numval+'')){

              if(this.numval==''){
                this.ct=0;
              }
              console.log(this.numval)
              if(Number(this.numval)<=this.Points && this.numval!=='' && Number(this.numval)<=this.datamsg.price){

                if(this.numval==''){
                  this.ct=0;
                }else{
                  this.ct=this.numval;
                }
              }else{
                if(Number(this.numval)>Number(this.Points)){
                  if(this.onetiam==true) {
                    this.dilog('积分不足');
                  }
                  this.numval=Number(this.Points)
                }

                if(Number(this.numval)>Number(this.datamsg.price)){
                  if(this.onetiam==true){
                  this.dilog('积分超过总金额');
                  }
                  this.numval=Number(this.datamsg.price)
                }
                this.onetiam=true
              }
          }else{
            if(this.numval!=''){
              this.dilog("请输入正整数");
            }
            this.numval='';
            this.ct=0;
            return;
          }
      },
      fcousFun(newVal, oldVal){
        console.log(this.show1)
        this.onetiam=false
        if(this.show1){
          this.numval=''

        }
        this.onIntegral = newVal;
        //当积分打开时候，开始计算抵扣钱数
        if(this.onIntegral == true){
          if(this.Points*this.creditPro>=((this.datamsg.price)-this.ct)){
            this.numval=this.Points*this.creditPro
          }else{
            this.numval=((this.datamsg.price)-this.ct)
          }
        }else{
          this.ct = 0
        }
        if(this.Points<=0){
          this.show1 = false;
          this.dilog('您无可用积分');
        }else{
          if(this.show1){
           // this.numval='';
           // this.ct='';
            this.show1 = false
          }else{
            this.$refs.memberInputs.focus();
            this.show1 = true;
             }
          }
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
        if(this.show1){
          params.integral=this.numval;
        }else{
          params.integral='';
        }
        this.api.post(params, res=> {

          if(res.isNeedSum==1 ){

            let  params = {
              url: "/wx/wxPay",
              data: {
                orderNo:res.orderSn,
              /*  payType:'5'*/

              }
            };
//          history.replaceState(null,"","/homestay/wxPay");
            this.api.post(params, data => {
                this.wxpay(data,res)
            })
          }else{

            let  params = {
              url: "/paymenthtAction",
              data: {
                orderId:res.orderId,
                payType:res.payType,
                paySum:res.payMoney
              }
            };
            this.$router.push({path: "/paymemtsuccess",query:{
              orderSn:res.orderSn,
              payMoney:res.payMoney
            }})
//          history.replaceState(null,"","/homestay/wxPay");
            this.api.post(params, data => {

            })
          }
        });
      },

      tiemend(){

        let params={
          url:'/timeendAction',
          data:{
            cardNo:this.userInfo.cardNo

          }
        };

        this.api.post(params, res=> {


            this.jsonPoint=JSON.stringify(res.memberInfo.Points);
            this.Points= res.memberInfo.Points;

            this.creditPro=res.creditPro;

              // if(this.Points*this.creditPro>=((this.datamsg.price)-this.ct)){
              //   this.numval=this.Points*this.creditPro
              // }else{
              //   this.numval=((this.datamsg.price)-this.ct)
              // }
            this.show2=false;


        });
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
	            window.location.href="/homestay/usercenter#/paymentsuccess?orderSn="+res.orderSn+'&payMony='+res.payMoney
            } else {
              data.type = "error";
              data.content = "支付失败！";
              window.location.href="/homestay/usercenter#/paymentfailed?orderSn="+res.orderSn+'&payMony='+res.payMoney
            }
            //   _t.callback&&_t.callback(data);
          }
        );
        //this.bindBridgeReady();
      }
    },
    mounted() {
      this.tiemend();
    },
    created(){
//       history.replaceState(null,"","/homestay/wxPay");
    },
    watch:{
      numval(){
        this.fenDkou();
      }
    }
  }
</script>
<style lang='less' >
  html, body {
    width: 100%;
    height: 100%;
   /* margin: 0px;
    padding: 0px;
    overflow: hidden;*/
  }
  .weui-textarea-counter{
    font-size: 24px;/*px*/
  }

  .confirmation {
    display: flex;
    height: 100%;
    //overflow: auto;
    flex-direction: column;
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
    .mangspan {
      font-family: PingFangSC-Regular;
      font-size: 24px;/*px*/
      color: #b6a382;
      letter-spacing: 0;
      line-height: 42px;
      margin-left: 10px;
    }
    .mangspanPt {
      font-family: PingFangSC-Regular;
      font-size: 24px;/*px*/
      color: #bbbbbb;
      letter-spacing: 0;
      line-height: 42px;
    }
    .rightMang {
      display: flex;
      align-items: center;
      img {
        width: 37px;
        height: 34px;
      }
      p {
        margin-left: 20px;
        font-family: PingFangSC-Regular;
        font-size: 28px;/*px*/
        color: #2d2d2d;
        letter-spacing: 0;
        line-height: 42px;
      }
    }
    .spannum, .zhifs {
      font-family: PingFangSC-Regular;
      font-size: 28px;/*px*/
      color: #2d2d2d;
      letter-spacing: 0;
      line-height: 42px;
    }
    .weui-cell:before {
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
      /* left: 15PX; */
    }
    .weui-cells{
      margin-top: 20px;
    }
    .zhifst{
      font-family:PingFangSC-Regular;
      font-size:24px;/*px*/
      color:#666666;
      letter-spacing:0;
      line-height:42px;
    }
    .rightMangt{
      font-family:PingFangSC-Regular;
      font-size:24px;/*px*/
      color:#b6a382;
      letter-spacing:0;
      line-height:42px;
    }
    .rightMangr{
      .xiaojifont{
        font-size: 24px;/*px*/
      }
      p{
        font-family:PingFangSC-Regular;
        font-size:24px;/*px*/
        color:#666666;
        letter-spacing:0;
        line-height:42px;
      }
      span{
        font-family:PingFangSC-Regular;
        font-size:30px;/*px*/
        color:#ea5414;
        letter-spacing:0;
        line-height:42px;
      }
    }
  }

  .contain {
  /*  position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    overflow: auto;
    z-index: 1;
     top: 94px;*/
    flex: 1;
    overflow:auto;/* winphone8和android4+ */
    -webkit-overflow-scrolling: touch; /* ios5+ */
  }

  .weui-textarea {
    border: 1px solid #efefef;
    font-family: PingFangSC-Regular;
    font-size: 24px;/*px*/
    color: #bbbbbb;
    letter-spacing: 0;
    line-height: 42px;
    height: 200px;
    width: 690px;
  }

  footer {
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 96px;
    z-index: 2;
    overflow: hidden;
    background: #ffff;
    display: flex;
    justify-content: space-between;
    .btnsure{
      background:#090b0c;
      width:256px;
      height:98px;
      font-family:PingFangSC-Semibold;
      font-size:30px;/*px*/
      color:#ffffff;
      letter-spacing:0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .heji{
      background: #fff;
      p:nth-child(1){
        display: flex;
        align-items: center;
        margin-left: 30px;
        font-family:PingFangSC-Regular;
        font-size:30px;/*px*/
        color:#666666;
        letter-spacing:0;
        line-height:36px;

      }
      p:nth-child(2){
        font-family:PingFangSC-Semibold;
        font-size:30px;/*px*/
        color:#ea5414;
        letter-spacing:0;
        line-height:36px;
        display: flex;
        align-items: center;
        margin-left: 20px;
      }

    }

  }

  .adrssTitle {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-top: 30px;
    margin-bottom: 20px;
    font-family: PingFangSC-Regular;
    font-size: 28px;/*px*/
    color: #2d2d2d;
    letter-spacing: 0;

  }

  .adressPt {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 208px;
    img:nth-child(1){
     margin-right: 20px;
    }
    img:nth-child(3){
      margin-left: 20px;
    }
    .adressOne {
      width: 585px;
      height: 100%;
      font-family: PingFangSC-Regular;
      font-size: 28px;/*px*/
      color: #2d2d2d;
      letter-spacing: 0;
    }
    img {
      width: 27px;
      height: 34px;
    }
  }

  .adressLine {
    height: 12px;
    img {
      height: 100%;
      display: block;
     // vertical-align:top;
    }
  }

  .adrepp {
    background: #ffffff;
    // padding-bottom: 20px;
  }

  .buy {
    background: #ffffff;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.10);
    height: 352px;
    margin-top: 20px;
  }

  .buyImg {
    width: 200px;
    height: 200px;
    img {
      width: 200px;
      height: 200px;
    }

  }

  .buyFlex {
    padding-left: 30px;
    padding-right: 30px;
    display: flex;
  }

  .buyContent {
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    margin-left: 20px;
    p:nth-child(1) {
      font-family: PingFangSC-Regular;
      font-size: 28px;/*px*/
      color: #2d2d2d;
      letter-spacing: 0;
      line-height: 48px;
      flex-basis: 100%;
      display: flex;
      justify-content: space-between;
    }
    p:nth-child(2) {
      flex-basis: 100%;
      display: flex;
      justify-content: space-between;
      font-family: PingFangSC-Regular;
      font-size: 22px;/*px*/
      color: #bbbbbb;
      letter-spacing: 0;
      line-height: 24px;
      align-self: center;
    }
    .ptherr {
      display: flex;
      justify-content: space-between;
      flex-basis: 100%;
      div:nth-child(1){
        font-size:30px;
        color:#b6a382;
        line-height:30px;
      }
      div:nth-child(2){
        font-size:24px;
        color:#989898;
        letter-spacing:0;
        line-height:24px;
      }

    }
  }

  .buytitle {
    font-family: PingFangSC-Regular;
    font-size: 30px;/*px*/
    color: #2d2d2d;
    letter-spacing: 0;
    padding-top: 40px;
    padding-bottom: 30px;
    padding-left: 30px;
  }

  .weui-label {
    p {
      white-space: nowrap;
      font-family: PingFangSC-Regular;
      font-size: 28px;/*px*/
      color: #2d2d2d;
      letter-spacing: 0;
      line-height: 42px;
      span {
        margin-left: 20px;
        font-size: 28px;/*px*/
        color: #b6a382;
        letter-spacing: 0;
        line-height: 42px;
      }
    }
  }
  .heji{
    display: flex;
  }

/*  .vux-header{
    position: fixed;
    z-index: 100;
  }*/
  .textPrent{
    padding-top: 20px;
    padding-bottom: 136px;
  //  background: #ffffff;
    .textPone{
      background: #ffffff;
      padding-bottom: 30px;
      .textOut{
        .vux-no-group-title{
          margin: 0;

        }
        .weui-cells{
          width: 690px;
          margin: auto;
          border-left: 1px solid #efefef;
          border-right: 1px solid #efefef;

        }

      }
      .textSign{
        padding-left: 30px;
        padding-top: 30px;
        padding-bottom: 20px;
        font-family:PingFangSC-Regular;
        font-size:28px;/*px*/
        color:#2d2d2d;
        letter-spacing:0;
        line-height:42px;
      }
    }

  }
   .adressPtC{
    /* width: 12px;
     height: 20px;*/
     height: 100%;

     display: flex;
     justify-content: center;
     align-items: center;
     flex: auto;
   }
   .Ptctwo{
     img{
       width: 12px;
       height: 20px;
     }
   }
   .adrssContent{
     font-size:24px;
     color:#2d2d2d;
     letter-spacing:0;
     line-height:44px;
   }
   .jiacu{
     font-weight:700;
     font-family:PingFangSC-Semibold;
     font-size:30px;
     color:#ea5414;
   }
  .fontFlay{
    font-weight: 700;
  }
  .timeleft{
    text-align: left;
  }
  .maxinput{
    width: 498px;
    border: none;
    font-family:PingFangSC-Regular;
    font-size:28px;
    color:#666666;
    letter-spacing:0;
    line-height:42px;
    text-align:left;
    outline:medium;
    padding-left: 30px;
  }
  .maxinput:disabled{
    border: none;
    background-color: #ffffff;
    color:#ACA899;
  }
  @button-primary-bg-color: #1AAD19;


.form-coupon{
    .weui-cells{
        margin-top: 20px;
        .weui-cell{
            height: 98px;
            font-size:28px;/*px*/
            color:#2d2d2d;
            .weui-switch:checked{
                background: #2d2d2d;
                border-color: #2d2d2d;
            }
        }
        .weui-cell__ft{
            font-size:24px;/*px*/
            color:#b6a382;
            overflow: hidden;
        }
        .cellHeight .weui-cell__ft{
            height:50px;
        }
        .weui-cell__ft:after{
            border-width:2PX 2PX 0 0;
            width:18px;
            height:18px;
            border-color: #b6a382;
            margin-top:-6PX;
        }
        .weui-cell:before{
            left: 0;
            border-top:1px solid #eeeeee;
        }
        .vux-x-switch .weui-label{
            display: inline!important;
        }
        .vux-x-switch .vux-label-desc{
            color:#B6A382;
            font-size:28px;/*px*/
            margin-left:20px;
        }
        .integralDisplay{

            .vux-cell-bd {
                font-size:28px;/*px*/
                color:#666666;
            }
            .weui-cell__ft{
                font-size:24px;/*px*/
                color:#bbbbbb;
            }

        }
    }
    .weui-cells:before{
        height: 0;
        border:none;
    }
    .weui-cells:after{
        height: 0;
        border: none;
    }
  .kediyong{

    color: rgba(187, 187, 187, 1);
    font-size: 24px;
    text-align: right;
    font-family: PingFangSC-Regular;
    spna:nth-child(2){
      //#B6A382
      color:#B6A382;

    }

  }
  .pointmoney{
    font-size:24px;/*px*/
    color:#B6A382;
  }
}
  /*
  */
</style>
