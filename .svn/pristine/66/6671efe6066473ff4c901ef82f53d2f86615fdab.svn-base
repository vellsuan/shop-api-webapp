<template>
<div class="membersrigths">
  <x-header  :left-options="{backText: ''}">{{name}}</x-header>
  <div class="mcontent">
    <div class="bg">
      <div class="bgimg">
        <img class="bg_one" :src="imgIp+img" alt="">
      </div>
    </div>
    <div class="contentShow">
      <img :src="imgIp+vipPrivilegeImg" class="vipPhtml">
     <!-- <div class="mRight">
        <div class="mRighta">会员特权</div>
      </div>
      <div class="vipHtml">
       <img :src="imgIp+vipPrivilegeImg" class="vipPhtml">
      </div>-->
    </div>
  </div>
  <div class="fbtn">
    <x-button @click.native="sure" class="fontFlay" :gradients="['#040404', '#040404']">立即购卡</x-button>
 </div>
</div>
</template>
<script>
  import { XHeader,XButton} from 'vux'
  import List from '../module/list'

export default {
  components: {
    XHeader,
    XButton
  },
  data () {
    return {
      img:'',
      imgIp:JSON.parse(window.localStorage.getItem("config")).ServerImgURL,
      userInfo:JSON.parse(window.localStorage.getItem("userInfo")) || '',
      vipPrivilegeImg:'',
      br:null,
      name:''
    }
  },
  mounted(){
    window.localStorage.removeItem('recording');
    this.getServerConfig();

  },
  methods:{
    sure(){
      if(this.userInfo&&this.userInfo.phone){
         this.$router.push({path:'/registemessage',query:this.br})
      }else{
        if (process.env.NODE_ENV === 'production') {
          // koa page-router配置跳转地址 不带#号
          window.location.href='/homestay/home#/bindphone'
        }
        if (process.env.NODE_ENV === 'development') {
          // vue哈希路有。 带#号
          window.location.href='/home.html#/bindphone'
        }

      }
    },
    getServerConfig(){
      const params = {
        url : '/getmembersright',
        data : {
          id:this.getParams().id
        }
      };

      this.api.post(params, res=> {
        this.br=res.br;
        this.img=res.br.img;
        this.vipPrivilegeImg=res.br.vipPrivilegeImg
        this.name=res.br.name
      });
    },
    getParams(){
      var search="?"+window.location.href.split("?")[1];	//获取location的search属性，保存在search中

      var params={};		//创建空对象params
      if(search!=""){		//如果search不是空字符串
        search.slice(1).split("&").forEach(	//?username=zhangdong&pwd=123456;//search去开头?，按&切割为数组，forEach
          function(val){
            var arr=val.split("=");		//将当前元素值按=切割，保存在arr中
            params[arr[0]]=arr[1];		//向params中添加一个元素,属性名为arr[0],值为arr[1]
          }
        );
      }
      console.log(params)
      return params;
    }
  }
}
</script>
<style lang="less" >
  html,body,.membersrigths{
    height: 100%;
    width: 100%;
  }
  body {overflow-x: hidden}
  .membersrigths{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .vux-header{
        width:100%;
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
        .vux-header-right{
        line-height: 44PX;
        color: rgba(255, 255, 255, 1);
        font-size: 24px;/*px*/
      }
    }
    .mcontent{
      width: 100%;
      flex: 1;
      overflow:auto;
      -webkit-overflow-scrolling: touch;
      .bg{
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
      .contentShow{
        .mRight{
          width: 100%;
          height: 140px;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          .mRighta{
            width: 212px;
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
        .vipPhtml{
          width: 100%;
        }
        .vipHtml{
          margin-top: 40px;
          padding-left: 80px;
          padding-right: 80px;
          .vipPhtml{
              width: 100%;
          }
        }

      }
    }
    .fontFlay{
      font-weight: 700;
    }
    .fbtn{
     /* position: absolute;
      bottom: 0px;*/
      width: 100%;
      height: 96px;
      background:#040404;
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
   }

</style>
