<template>
    <div>
      <group>
        <x-input title="必须输入2333" v-model="name"  placeholder="持卡人姓名">
          <img slot="label"
               style="display:block;"class="imgTbgr" src="../assets/tbgr_1.png" >
        </x-input>
        <x-input title="必须输入2333" v-model="phone"  placeholder="持卡人电话">
          <img slot="label"
               style="display:block;"
               class="imgTbgr" src="../assets/tbgr_8.png" >
        </x-input>
        <x-input title="验证码" ref="reg_code"  v-model="codePhone"  placeholder="请输入验证码" required  text-align="left"
                 class="weui-vcode Regname inputWidth">
          <img slot="label" style="display:block;"  class="imgTbgr" src="../assets/tbgr_9.png" >
          <slot>
            <button slot="right" :class="{btn:true,disBtn:disBtn}" type="button" :disabled="nofunCl" mini
                    @click="getCode">{{msg}}
            </button>
          </slot>
        </x-input>
        <slot name="input" ></slot>
      </group>

    </div>
</template>
<script>
    import { XHeader,XButton,Group,XInput,Cell} from 'vux'
    export default {

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
              phone:''
            }
        },
      methods: {

        getCode() { //获取验证码

          let _t = this;
          /*	if(this.disBtn) {
                        return;
                    }*/
          let pramese = {
            url: 'CM100001',
            data: {
              channel: _t.channel,
              phone: _t.phone
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
            this.api.post(pramese
              , response => {

              });
          } else {

            this.api.post(pramese
              , response => {

              });
          }
        }
      },
      watch: {
        codePhone(){
          let obj={
            phone:this.phone,
            codePhone:this.codePhone,
            name:this.name,
          };
          this.$emit('msgdata',obj)
        }
      }
    }
</script>
<style lang='less'>
</style>
