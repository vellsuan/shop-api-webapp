<template>
  <div class="adminMsg">
    <x-header  :left-options="{backText: ''}">会员卡信息提交</x-header>
    <div class="adminMsgContent">
      <div>
        <div class="titlemsg">持卡人信息</div>
        <message @msgdata="msgCall" :url="urladd" >
          <!--  <x-input slot="input" title="必须输入2333"   placeholder="持卡人电话">
              <img slot="label"
                   style="display:block;"
                   class="imgTbgr" src="../assets/tbgr_8.png" >
            </x-input>-->
        </message>
      </div>
      <div class="adressCity">
        <div class="titlemsg">地址</div>
        <div class="select-address-main">
          <group class="selectAddress">
            <x-address :title="title2" placeholder="请选择地址" v-model="value2" raw-value :list="addressData"
                       value-text-align="right"></x-address>
            <x-input title="详细地址" v-model="adressXi"></x-input>
          </group>

        </div>
      </div>
    </div>
    <div class="fbtn">
      <x-button class="fontFlay" @click.native="sure" :gradients="['#040404', '#040404']">确认购买</x-button>
    </div>
    <toast v-model="show1" @on-hide="onHide">{{textval}}</toast>
  </div>
</template>
<script>
  import message from '../module/list.vue'
  import {
    XHeader,
    XButton,
    Group,
    XInput,
    Cell,
    XAddress,
    Toast,
    Value2nameFilter as value2name,
    ChinaAddressV4Data
  } from 'vux'

  export default {
    components: {
      XHeader,
      XButton,
      Group,
      XInput,
      ChinaAddressV4Data,
      XAddress,
      message,
      Toast
    },
    data() {
      return {
        urladd: '/getregisteMessage',
        value2: [],
        addressData: ChinaAddressV4Data,
        title2: '所在地区',
        parmes: {
          name: '',
          phone: "",
          phoneVacodeId: '',
          codePhone: ''
        },
        show1: false,
        textval: '',
        adressXi: ''

      }
    },
    methods: {
      onHide() {

      },
     isEmojiCharacter(substring) {
    for ( var i = 0; i < substring.length; i++) {
      var hs = substring.charCodeAt(i);
      if (0xd800 <= hs && hs <= 0xdbff) {
        if (substring.length > 1) {
          var ls = substring.charCodeAt(i + 1);
          var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
          if (0x1d000 <= uc && uc <= 0x1f77f) {
            return true;
          }
        }
      } else if (substring.length > 1) {
        var ls = substring.charCodeAt(i + 1);
        if (ls == 0x20e3) {
          return true;
        }
      } else {
        if (0x2100 <= hs && hs <= 0x27ff) {
          return true;
        } else if (0x2B05 <= hs && hs <= 0x2b07) {
          return true;
        } else if (0x2934 <= hs && hs <= 0x2935) {
          return true;
        } else if (0x3297 <= hs && hs <= 0x3299) {
          return true;
        } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030
          || hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b
          || hs == 0x2b50) {
          return true;
        }
      }
    }
  },

  getName(value) {

        return value2name(value, ChinaAddressV4Data)
      },
      sure() {

        const params = {
          url: '/phoneAction',
          data: {

            phone: this.parmes.phone,
            phoneVacodeId: this.parmes.phoneVacodeId,
            vaCode: this.parmes.codePhone
          }
        };



        if (this.parmes.name == '') {
          this.dilog('持卡人姓名不能为空')
        }else if((/^([u4e00-u9fa5]|[0-9a-zA-Z|[\x21-\x7e]])+$/).test(this.parmes.name)){
          this.dilog('输入正确的持卡人姓名')
          return false
        }else if(this.isEmojiCharacter(this.parmes.name)){
          this.dilog('持卡人姓名不能包含表情')
          return false
        }else if((/[\-\_\,\!\|\~\`\(\)\#\$\%\^\&\*\{\}\:\;\"\L\<\>\@\！\￥?]/g).test(this.parmes.name)){
          this.dilog('请输入正确的持卡人姓名')
          return false
        }
        else if (params.data.phone == '') {
          this.dilog('手机号不能为空')
        } else if (params.data.vaCode == '') {
          this.dilog('验证码不能为空')
        } else if (this.value2 == '') {
          this.dilog('所在地区不能为空')
        } else if (this.adressXi == '') {
          this.dilog('详细地址不能为空')
        }
        else {
          this.parmes.name=this.parmes.name.replace(/\ +/g,"");
          params.data.phone=params.data.phone.replace(/\ +/g,"");
          params.data.vaCode=params.data.vaCode.replace(/\ +/g,"");
          this.api.post(params, res => {
            this.parmes.br = this.$route.query;
            function removeAllSpace(str) {
              return str.replace(/\s+/g, "");
            }
            this.parmes.address = removeAllSpace(this.getName(this.value2)) + this.adressXi;
            this.$router.push({path: '/confirmation', query: {
              address:this.parmes.address,id:this.parmes.br.id,describes:this.parmes.br.describes,
              name:this.parmes.br.name,
              newname:this.parmes.name,
              price:this.parmes.br.price,
              companyCode:this.parmes.br.companyCode,
              companyName:this.parmes.br.companyName,
              img:this.parmes.br.orderSmallImg,
              phone:this.parmes.phone,
              time:this.parmes.br.vTime
            }})
          });
        }
      },
      msgCall(msg) {
        this.parmes = msg;

      }
    },
    mounted() {

    }
  }
</script>
<style lang='less'>
  #app{
    .adminMsg {
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
      .weui-cells {
        margin-top: 0;
        //height: 96px;
      }
      .adminMsgContent{
        flex: 1;
        .adressCity{
          .select-address-main{
            .selectAddress{
              .weui-cells{
                .vux-cell-box{
                  .weui-cell{
                    .vux-cell-primary{
                        .vux-popup-picker-select{
                            .vux-cell-value{
                                margin-right: 10px;
                            }
                            .vux-cell-placeholder{
                                margin-right: 10px;
                            }
                        }
                    }
                    .weui-cell__ft:after{
                        color: #dedede;
                        height: 8PX;
                        width: 8PX;
                    }
                  }
                }
              }
            }
          }
        }
      }
      .vux-x-input {
        height: 96px;
        padding-top: 0px;
        padding-bottom: 0px;
        padding-left: 34px;
        font-family: PingFangSC-Regular;
        font-size: 28px;/*px*/
        color: #2d2d2d;

      }
      .weui-cell_access {
        height: 96px;
        padding-top: 0px;
        padding-bottom: 0px;
        padding-left: 34px;
        font-family: PingFangSC-Regular;
        font-size: 28px;/*px*/
        color: #2d2d2d;
      }
      .titlemsg {
        height: 64px;
        display: flex;
        align-items: center;
        margin-left: 30px;
        font-family: PingFangSC-Regular;
        font-size: 26px;/*px*/
        color: #666666;
        letter-spacing: 0;
        line-height: 26px;
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
      .fbtn {
        width: 100%;
        height: 96px;
        background: #040404;
        .weui-btn {
          width: 100%;
          height: 100%;
          background: #040404;
          font-family: PingFangSC-Semibold;
          font-size: 28px;/*px*/
          color: #ffffff;
          letter-spacing: 0;
        }

      }
      .btn {
        border: none;
        font-family: PingFangSC-Regular;
        font-size: 28px;/*px*/
        color: #2d2d2d;
        background: #ffffff;
        letter-spacing: 0;
        text-align: right;
      }

      input::placeholder {
        font-family: PingFangSC-Regular;
        font-size: 28px;/*px*/
        color: #bbbbbb;
        letter-spacing: 0;
        text-align: left;
      }

      .weui-input {
        margin-left: 20px;
      }
    }
  }
  .v-transfer-dom{
    .vux-popup-dialog{
        .vux-popup-picker-container{
            .vux-popup-header{
                .vux-popup-header-right{
                    color: #2d2d2d;
                }
            }
        }
    }
  }
  .fontFlay{
    font-weight: 700;
  }
</style>
