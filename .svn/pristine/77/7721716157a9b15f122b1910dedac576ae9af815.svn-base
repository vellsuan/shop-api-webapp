<template>
<div class="contentHeight">
  <x-header :left-options="{backText: ''}">我的卡包</x-header>
  <div class="content">
    <div class="bg">
      <div class="bgimg" v-for="item in datas" :key="item.id" @click="sure(item)" >
        <img class="bg_one" src="../assets/zwka_2.png" :alt="item">
       <!-- <img class="bg_one" :src="imgIp+item.img" :alt="item">-->
      </div>
    </div>
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
      imgIp:JSON.parse(window.localStorage.getItem("config")).ServerImgURL,
      datas:null,
      userInfo:JSON.parse(window.localStorage.getItem("userInfo")) || '',
    }
  },
  mounted(){
    this.getServerConfig()
  },
  methods:{
    sure(item){
        this.$router.push({path:'/cardsright',query:{id:item.id,discountCardNo:item.cardNum,userId:item.userId}})
    },
    getServerConfig(){
      const params = {
        url : '/getcardlist',
        data : {
          langId:'CN',
          phone:this.userInfo.phone
        }
      };
      this.api.post(params, res=> {
        this.datas=res.list;

      });
    }
  }
}
</script>
<style lang="less">

  html, body {
    width: 100%;
    height: 100%;
    .contentHeight{
      height: 100%;
      display: flex;
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
      .content{
        flex: 1;
        -webkit-overflow-scrolling : touch;
        overflow:auto;/* winphone8和android4+ */
        .bg{
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .bgimg{
            width: 700px;
            height: 400px;
            padding-top: 30px;
            img{
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
</style>
