<template>
<div class="cardsright">
  <x-header :left-options="{backText: ''}">会员卡详情</x-header>
  <div class="contents">
    <div class="contains">
    <div class="bgs">
      <div class="bgimg">
        <img class="bg_one" :src="imgIp+img" alt="">
      </div>
    </div>
    <div class="cardMsg">
      <div class="cardMleft">
        <div><span>卡号:</span><span class="fontval" v-text="cardNum"></span></div>
        <div><span>有效期至:</span><span class="fontval" v-text="validTime"></span></div>
       <!-- <div><span class="fontyue">余额</span></div>
        <div style="color: #B6A382"><span class="fontmang">￥</span><span class="fontmang"></span></div>-->
      </div>
      <div class="cardMright">
        <!--<div><span>卡号:</span><span class="fontval" v-text="cardNum"></span></div>
        <div><span>有效期至:</span><span class="fontval" v-text="validTime"></span></div>-->
       <!-- <div>
          <button>转赠此卡</button>
        </div>-->
      </div>
    </div>
    <div class="tabseletPt">
      <div class="tabselet">
        <tab :line-width='3'    v-model="index" custom-bar-width="17px" bar-active-color="#b6a382">
          <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @on-item-click="itemChoice(index)" :key="index">{{item}}</tab-item>
        </tab>
        <div class="item1" v-if="showitem">
         <div class="describes" v-if='dataalld'>
           <img class="imgwidth" :src="imgIp+vipPrivilege" alt="">
         </div>
          <div class="datanul"  v-if="dataelnul">
            <img  slot="img" src="../../usercenter/assets/wodedingdnan_kong@2x.png" alt="" />
            <div slot="tips">暂无会员特权</div>
          </div>
        </div>
        <div v-else class="padwaip">

          <div class="padwai" v-if='dataallp'>
          <div class="itemBg"  v-for="(item,index) in list" :key="index" >
            <x-input title="item"  disabled  :class="{'xiangqing':true}">

              <div slot="label" :class="{'spanx':true}">
                <div class="numfont">订单号:&nbsp;&nbsp;<span v-text="item.orderNo"></span></div>
                <div  ><span v-text="item.createTimeStr" >3123123</span></div>
              </div>
              <div slot="right" :class="{'spanx':true}">
                <div v-text="item.checkinName"  class="fontName">郭佳丽</div>
                <div class="fontCol">￥<span v-text="item.discountedPrice" class="fontCol">123123123</span></div>
              </div>
            </x-input>
          </div>
        </div>
          <div class="datanul" v-if="dataelp">
            <img  slot="img" src="../../usercenter/assets/wodedingdnan_kong@2x.png" alt="" />
            <div slot="tips">暂无消费详情</div>
          </div>
        </div>
      </div>
      <div>

      </div>
    </div>
    </div>
  </div>
  <div class="fbtn">
    <x-button class="fontWiegt" @click.native="sure">返回首页</x-button>
  </div>

</div>
</template>
<script>
  import { XHeader,XButton,Tab, TabItem, Sticky, Divider,  Swiper, SwiperItem,Group} from 'vux'

  import List from '../module/list'
  import XInput from "../../../../node_modules/vux/src/components/x-input/index.vue";
  const list = () => ['会员特权', '消费详情']
export default {
  components: {
    XInput,
    XHeader,
    XButton,
    Tab,
    TabItem,
    Sticky,
    Divider,
    Swiper,
    SwiperItem,
    Group
  },
  data () {
    return {
      dataalld:false,
      dataelnul:false,
      dataallp:false,
      dataelp:false,
      list2: list(),
      demo2: '美食',
      index: 0,
      showitem:true,
      vipPrivilege:'',
      cardNum:'',
      validTime:'',
      imgIp:JSON.parse(window.localStorage.getItem("config")).ServerImgURL,
      img:'',
      list:null,
      userInfo:JSON.parse(window.localStorage.getItem("userInfo")) || '',
    }
  },
  mounted(){
    this.getServerConfig();
    this.getcarddetails();
  },
  methods:{

    itemChoice(index){
      if(index){
        this.showitem=false
      }else{
        this.showitem=true
      }
    },
    getServerConfig(){
      const params = {
        url : '/getcardsright',
        data : {
          cardNo:this.$route.query.discountCardNo || ''
        }
      };
      this.api.post(params, res=> {
        let data=res.entity;

        this.img=data.img;
        this.cardNum=data.cardNum;
        this.validTime= this.$moment(data.validTime).format("YYYY-MM-DD");
        this.vipPrivilege=data.vipPrivilegeImg;
        if(this.vipPrivilege!='' || this.vipPrivilege!=null){
          this.dataalld=true;
          this.dataelnul=false;
        }else{
          this.dataalld=false;
          this.dataelnul=true;
        }
      });
    },
    getcarddetails(){
      const params = {
        url : '/getcarddetails',
        //OR100003.do
        data : {
          discountCardNo:this.$route.query.discountCardNo || '',
          //userId:this.$route.query.userId || '',
          getServerConfig:'1',
          pageCount:'10000',
          orderStatusNoDelCancelCommit : '1',
          payStatus : '1',
          type:'1'
         // cancelStatus:''
        }
      };
      this.api.post(params, res=> {
        let newres= res.page.datas ;
        this.list=newres;

        if(this.list.length){
          this.dataallp=true;
            this.dataelp=false;
        }else{
          this.dataallp=false;
          this.dataelp=true;
        }
      });
    },
    sure(){
      if (process.env.NODE_ENV === 'production') {
        // koa page-router配置跳转地址 不带#号
        window.location.href='/homestay/home#/'
      }
      if (process.env.NODE_ENV === 'development') {
        // vue哈希路有。 带#号
        window.location.href='/home.html#/'
      }
     // window.location.href='/home.html#/'
       // this.$router.push({path:'/registemessage'})
    }
  },
  watch:{
    showitem(x){
      if(!x){
        this.getcarddetails()
      }else{
        this.getServerConfig()
      }
    }
  }
}
</script>
<style lang="less">
  html,body{
    width: 100%;
    height: 100%;
   /* margin: 0px;
    padding: 0px;
    overflow: hidden;*/
  }
  .cardsright{
    display: flex;
    height: 100%;
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
    .fontyue{
      font-size: 24px;/*px*/
      color: #2D2D2D;
    }
    .fontmang{
      font-size: 40px;/*px*/
    }
  }

  .contents{
    flex: 1;
    overflow:auto;/* winphone8和android4+ */
    -webkit-overflow-scrolling: touch; /* ios5+ */
    display: flex;
    //height: 100%;
   /* overflow: auto;*/

    background: #EFEFF4;
    flex-direction: column;
    .contains{

      position: relative;
     // bottom: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
     /* overflow: auto;
      z-index: 1;*/
     /* top: 92px;*/

    }
    .padwaip{
      background: #fff;
    }
    .padwai{
      padding-left: 30px;
      padding-right: 30px;
    }
    .weui-cell{
      padding: 0;
    }
    .weui-cells {
      margin-top: 0;
    }
    .vux-swiper{
      height: auto;
    }
    .cardMsg{
      background:#ffffff;
      box-shadow:0 1px 2px 0 rgba(0,0,0,0.10);
      width:750px;
      height:256px;
      display: flex;
      justify-content: space-between;
      padding-left: 60px;
      padding-right: 60px;

    }
    .vux-tab-bar-inner{
      width: 17px;

      border-radius:100px;
      background:#b6a382;
    }
    .vux-tab .vux-tab-item{
      font-family:PingFangSC-Regular;
      font-size:26px;/*px*/
      color:#989898;
      letter-spacing:0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
.vux-tab .vux-tab-item.vux-tab-selected{
  font-family:PingFangSC-Regular;
  font-size:26px;/*px*/
  color:#2d2d2d;
  letter-spacing:0;
}
    .vux-tab{
      height: 96px;
    }
    .cardMleft,.cardMright{
      display: flex;
      flex-direction: column;
      //justify-content: center;
       font-size: 24px;/*px*/
      color: #666666;
      // align-items: center;
      div:nth-child(2){
        flex-basis: 100%;
      }
    }

    .cardMleft{
      align-items: flex-start;
      padding-top: 94px;
      padding-bottom: 53px;
      div:nth-child(2){
       display: flex;
        align-items: flex-end;
      }
    }
    .cardMright{
      align-items: flex-end;
      padding-top: 70px;
      padding-bottom: 28px;
      div:nth-child(2){
        display: flex;
        align-items: center;
      }


      button{
        border:1px solid #B6A382;
        width:159px;
        height:46px;
        background: #fff;
        font-family:PingFangSC-Regular;
        font-size:24px;/*px*/
        color:#B6A382;
        letter-spacing:0;
        text-align:center;
      }
    }

    .tabselet{
      margin-top: 20px;
     // margin-bottom: 220px;
      //height: 100%;
    }

  }
  .bgs{
    height: 398px;
    width: 100%;
    background: url('../assets/zwka_bg.png') no-repeat center 100% ;
    background-size: 100% 100%;
    position: relative;
    .bgimg{
      position: absolute;
      width: 100%;
      text-align: center;
      top: 38px;
      .bg_one{
        width: 698px;
        height: 398px;
        border-radius: 8px;
        box-shadow: 0 4px 10px 0 rgba(0,0,0,0.3);
      }
    }
  }
  .fbtn{
   /* position: absolute;
    bottom: 0px;*/
    width: 100%;
    height: 96px;
    background:#040404;
  /*  z-index: 2;*/
    /*overflow: hidden;
    background: #ffff;*/
    display: flex;
    .weui-btn{
      width: 100%;
      height: 100%;
      background:#040404;
      font-family:PingFangSC-Semibold;
      font-size:28px;/*px*/
      color:#ffffff;
      letter-spacing:0;
    }
  }
  .contentShow{
    .mRight{
      width: 100%;
      height: 140px;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      .mRighta{
        width: 162px;
        height: 60px;
        background: url("../assets/bghytq_bg.png") no-repeat 100%;
        background-size: 100% 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family:PingFangSC-Regular;
        font-size:28px;/*px*/
        color:#2d2d2d;
        letter-spacing:0;
      }
    }
  }
  .describes{
    /*background: white;
   // height: 100%;

    padding-top: 80px;
    padding-right: 80px;
    padding-left: 80px;*/
    .vipPhtml{



    }
  }
  .xiangqing{
    height: 126px;
    font-family:PingFangSC-Regular;
    font-size:24px;/*px*/
    color:#2d2d2d;
    letter-spacing:0;
    line-height:24px;
    text-align:left;

    border-bottom: 1px solid #eeeeee;;
  }
  .tabseletPt{
    //height: 100%;
  }
  .item1{
    height: 100%;
  }
  .spanx{
    div{
      padding-top: 20px;
    }
  }
  .fontCol{
    font-family:PingFangSC-Regular;
    font-size:24px;/*px*/
    color:#b6a382;
    letter-spacing:0;
    line-height:24px;
    text-align:right;
  }
  .fontName{
    font-family:PingFangSC-Regular;
    font-size:24px;/*px*/
    color:#2d2d2d;
    letter-spacing:0;
    line-height:24px;
    text-align:right;
  }
  .numfont{
    font-family:PingFangSC-Regular;
    font-size:24px;/*px*/
    color:#2d2d2d;
    letter-spacing:0;
    line-height:24px;
    text-align:left;
  }
   .fontval{
     margin-left: 15px;
   }
   .itemBg{
     background: #fff;
   }
  .fontWiegt{
    font-weight: 700;
  }
  .imgwidth{
    width: 100%;
  }
  .datanul{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
    flex-direction: column;
    div{
      margin-top: 20px;
    }
    img{
      width: 245px;
      height: 245px;
    }
  }
</style>
