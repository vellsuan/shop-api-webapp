<template>
  <div class="paymentsuccess">
    <!-- <div class="success-logo">
         <img src="../assets/tb_1dui.png" alt="" />
     </div>
     <div class="success-content">
         <span>支付成功</span>
         &lt;!&ndash;<span>订单号：<span v-text="orderSn"></span></span>&ndash;&gt;
     </div>
     <div class="success-button">
         <x-button @click.native="backHome" >返回首页</x-button>
         <x-button @click.native="lookOrder" >查看订单</x-button>
     </div>-->
    <div class="paymentparent">

      <img class="payimg" src="../assets/tb_2xuo.png" alt="" />
      <p class="fauked">支付失败,请重新支付</p>
      <div class="success-button">
        <div><x-button class="backHome" @click.native="backHome" >返回首页</x-button></div>
        <div><x-button class="lookOrder" style="color: #2D2D2D;border: solid #2D2D2D 1px" @click.native="lookOrder" >重新支付</x-button></div>
        <!-- <x-button @click.native="backHome" >返回首页</x-button>
         <x-button @click.native="backHome" >返回首页</x-button>-->
        <!-- <x-button @click.native="lookOrder" >查看订单</x-button>-->
      </div>

    </div>
    <img class="payjuchi" src="../assets/Group@2x.png">

    <div class="huodong">
      <div class="line"></div><div class="fontline">活动</div><div class="line"></div>
    </div>
    <div class="tupiandi">
      <div class="tuipasda" id="bannerBox">
        <remote-js :src='src'></remote-js>
      </div>
    </div>

<!--    <remote-js src="http://117.78.36.172:7060/assets/scripts/adver.banner.pic.js?positionId=2&nodeId=bannerBox&userId={{JSON.parse(window.localStorage.getItem('serInfo')).userId || ''}}"></remote-js>-->
  </div>
</template>
<script>
  import { XButton } from 'vux'
  export default {
    components: {
      XButton,
      'remote-js': {
        render(createElement) {
          return createElement('script', { attrs: { type: 'text/javascript', src: this.src ,charset: 'utf-8' }});
        },
        props: {
          src: { type: String, required: true },
        },
      }
    },
    data(){
      return {
        orderSn:"",
        isNeedSum:'',
        src:'http://117.78.36.172:7060/assets/scripts/adver.banner.swiper.js?positionId=38&branch=1006&nodeId=bannerBox&userId='+ (JSON.parse(window.localStorage.getItem('userInfo')).userId || '')
      }
    },
    mounted() {

      this.orderSn = this.getParams().orderSn;
    },
    methods: {
      backHome(){
        if (process.env.NODE_ENV === 'production') {
          // koa page-router配置跳转地址 不带#号
          window.location.href = "/homestay/home";
        }
        if (process.env.NODE_ENV === 'development') {
          // vue哈希路有。 带#号
          window.location.href = "/home.html#/";
        }
      },
      lookOrder(){
        let _t=this;
            let  params = {
              url: "/wx/wxPay",
              data: {
                orderNo:_t.orderSn,
                /*  payType:'5'*/
              }
            };
//          history.replaceState(null,"","/homestay/wxPay");
            this.api.post(params, data => {
              this.wxpay(data)
            })
       ;
       /* if (process.env.NODE_ENV === 'production') {
          // koa page-router配置跳转地址 不带#号
          window.location.href = "/homestay/usercenter#/orders?active=0";
        }
        if (process.env.NODE_ENV === 'development') {
          // vue哈希路有。 带#号
          window.location.href = "/usercenter.html#/orders?active=0";
        }*/
      },
      wxpay(data){

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
              window.location.href="/homestay/usercenter#/paymentsuccess?orderSn="+res.orderSn+'payMony='+res.payMoney
            } else {
              data.type = "error";
              data.content = "支付失败！";
              window.location.href="/homestay/usercenter#/paymentfailed?orderSn="+res.orderSn+'payMony='+res.payMoney
            }
            //   _t.callback&&_t.callback(data);
          }
        );
        //this.bindBridgeReady();
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
    }
  }
</script>
<!--<remote-js src="http://117.78.36.172:7060/assets/scripts/adver.banner.pic.js?positionId=36&nodeId=bannerBox&userId={{JSON.parse(window.localStorage.getItem('serInfo')).userId || ''}}"></remote-js>
&lt;!&ndash;图片&ndash;&gt;

&lt;!&ndash;banner&ndash;&gt;
<remote-js src="http://117.78.36.172:7060/assets/scripts/adver.banner.swiper.js?positionId=38&nodeId=bannerBox&userId={{JSON.parse(window.localStorage.getItem('serInfo')).userId || ''}}"></remote-js>

&lt;!&ndash;视频&ndash;&gt;
<remote-js src="http://117.78.36.172:7060/assets/scripts/adver.banner.vie.js?positionId=37&nodeId=bannerBox&userId={{JSON.parse(window.localStorage.getItem('serInfo')).userId || ''}}"></remote-js>-->
<style lang="less">
  html,body,#app,.paymentsuccess{
    height: auto;
  }
  .paymentsuccess{
    background-color: rgba(239, 239, 244, 1);
    display: flex;
    flex-direction: column;
    overflow:auto;
    .weui-btn:after{
      border:none;
    }

    //  padding-top: 200px;
    .paymentparent{
      display: flex;

      align-items: center;
      flex-direction: column;
      height: 604px;
      background: #ffffff;
    }
    p{
      padding-top: 20px;
      font-size: 28px;
    }
    .huodong{
      width: 100%;
      margin-top: 30px;
      /* text-align: center;*/
      font-size: 24px;
      color: #BBBBBB;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .line{
      height: 1px;
      width: 300px;
      background: #E4E4E8;
    }
    .fontline{
      padding-left: 20px;
      padding-right: 20px;
    }
    .tupiandi{
      width: 100%;
      padding-bottom: 20px;
      //tb_2xuo.png

      .tuipasda{

        margin: auto;
        margin-top: 20px;

        width: 690px;
        height: 490px;
        background: #ffffff;
      }
    }
    .payimg{
      margin-top: 96px;
      width: 126px;
      height: 126px;
    }
    .success-logo{
      margin: 0 auto;
      width: 186px;
      height: 186px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .success-content{
      margin-top: 50px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      span:nth-child(1){
        height: 56px;
        line-height: 56px;
        color: rgba(0, 0, 0, 1);
        font-size: 40px;/*px*/
      }
      span:nth-child(2){
        margin-top: 30px;
        height: 40px;
        line-height: 40px;
        color: rgba(136, 136, 136, 1);
        font-size: 28px;/*px*/
      }
    }
    .success-button{
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-top: 140px;
      padding-left: 50px;
      padding-right: 50px;

      button{

        width: 300px;
        height: 72px;
        border-radius: 10px;
        font-size: 30px;/*px*/
        background-color: rgba(248, 248, 248, 1);
        border: 2px solid rgba(5, 5, 5, 0.08);
        line-height: 50px;
        color: #989898;
      }


    }

    .swiper-container{
      width: 100%;
      height: 100%;
	      img{
	      	height: 100%;
	      }
    }
    .fauked{
      width: 300px;
      height: 42px;
      line-height: 42px;
      color: #2D2D2D;
      font-weight: 700;
      font-size: 30px;
      text-align: center;
      font-family: PingFangSC-Regular;
      margin-top: 66px;
    }
  }
</style>
