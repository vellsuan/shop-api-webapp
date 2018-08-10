<template>
    <div class="codeverify">
      <group>
        <x-input
          title="必须输入2333"
          v-model="name"
          placeholder="持卡人姓名">
          <img
            slot="label"
            style="display:block;"
            class="img1"
            src="../assets/tbgr_1.png" >
        </x-input>
        <x-input
          title="必须输入2333"
          :style="{color:'#2d2d2d'}"
          :disabled="true"
          v-model="phone"
          placeholder="持卡人电话">
          <img
               slot="label"
               style="display:block;"
               class="img2"
               src="../assets/tbgr_8.png" >
        </x-input>
        <x-input
          title="验证码" ref="reg_code"
          v-model="codePhone"
          placeholder="请输入验证码"
          :required="false"
          :show-clear="false"
          text-align="left"
          class="weui-vcode Regname inputWidth lastinput">
          <img
            slot="label"
            style="display:block;"
            class="img3"
            src="../assets/tbgr_9.png" >

          <slot >
           <div class="codeyanzheng"  slot="right">
             <div class="yishu"></div>
             <button

               :class="{btn:true,disBtn:disBtn}"
               type="button"
               :disabled="nofunCl" mini
               @click="getCode">
               {{msg}}
             </button>
           </div>
          </slot>
        </x-input>
        <slot name="input" ></slot>
      </group>

    </div>
</template>
<script>
    import { XHeader,XButton,Group,XInput,Cell} from 'vux'
    export default {
      props:['url'],
      components: {
        XHeader,
        XButton,
        Group,
        XInput
      },
        data() {
            return {
              codePhone:'',
              name:'',
              nofunCl: false,
              msg:'获取验证码',
              disBtn: false,
              phone:JSON.parse(window.localStorage.getItem("userInfo")).phone || '',
              obj:{

              }
            }
        },
      methods: {

        getCode() { //获取验证码

          let _t = this;
          /*	if(this.disBtn) {
                        return;
                    }*/
          let pramese = {
            url: this.url,
            data: {
              smsChannel:1028,
              phone: _t.phone,
              smsType:'4'
            }
          };
          if (pramese.data.phone !== '') {

            let sec = 60;
            /*this.disBtn = true;*/
            this.msg = "60秒后重发";
            this.nofunCl = true;

            let timer = setInterval(() => {

              sec--;
              this.msg = sec + "秒后重发";
              /*	this.disBtn = true;*/
              if (sec <= 1) {

                this.msg = "获取验证码";
                /*	this.disBtn = false;*/
                this.nofunCl = false;
                clearInterval(timer)
              }
            }, 1000);
           // this.$emit('msgdata',this.phone)
            let _t=this;
            this.api.post(pramese
              , response => {
               this.obj.phoneVacodeId=response.phoneVacodeId

              });
          } else {
            console.log('填写电话')
          }
        }
      },
      watch: {
        codePhone(){
          this.obj.phone=this.phone;
          this.obj.codePhone=this.codePhone;
          this.obj.name=this.name;
          this.$emit('msgdata',this.obj)
        },
        name(){
          this.obj.phone=this.phone;
          this.obj.codePhone=this.codePhone;
          this.obj.name=this.name;
          this.$emit('msgdata',this.obj)
        },
        phone(){
          this.obj.phone=this.phone;
          this.obj.codePhone=this.codePhone;
          this.obj.name=this.name;
          this.$emit('msgdata',this.obj)        }
      }
    }
</script>
<style lang='less'>
   .codeverify{
     .img1{
       width: 35px;
       height: 44px;
       margin-right: 2px;
       margin-left: 2px;
     }
     .img2{
       width: 29px;
       height: 44px;
       margin-right: 5px;
       margin-left: 5px;
     }
     .img3{
       width: 38px;
       height: 42px;
     }

     .whippletree{
       width: 20px;
       height: 20px;
       background: red;
       border:1px solid #000;
     }
     .codeyanzheng{
       display: flex;
     }
     .yishu{
       padding-right:30px;

     }
     .weui-cell__ft{
       display: flex;

     }
     button{
       width: 160px;
       height: 40px;
       font-size: 28px;
       text-align: left;
     }
     @media (-webkit-min-device-pixel-ratio: 2) {
       .yishu{
         border-left:0.5px solid #D8D8D8;
       }
     }

   }
</style>
