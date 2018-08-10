<template>
    <div class="bind-phone">
        <x-header :left-options="{backText: ''}">
            <span>绑定手机号</span>
        </x-header>
        <group class="phone-check">
            <x-input placeholder="请输入手机号" v-model="mobilePhone" is-type="china-mobile">
                <img slot="label" style="display:block;" src="../pages/price_enjoy/assets/tbgr_8@2x.png">
                <img slot="right-full-height" src="https://ws1.sinaimg.cn/large/663d3650gy1fq684go3glj203m01hmwy.jpg">
            </x-input>
            <x-input class="weui-vcode" placeholder="请输入验证码" v-model="verificationCode" :show-clear="false">
                <img slot="label" style="display:block;" src="../pages/price_enjoy/assets/tbgr_9@2x.png" >
                <!-- <x-button slot="right" type="primary" mini>发送验证码</x-button> -->
                <div slot="right" class="send-verification-code">
                    <span @click="getVcode" v-if="getVcodeStatus || vcodeTime < 0">获取验证码</span>
                    <span class="countdown" v-else><countdown v-model="vcodeTime" :start="start" @on-finish="onFinish"></countdown>s</span>
                </div>
            </x-input>
        </group>
        <div class="phone-bottom">
            <x-button @click.native="bindUserPhone">确认</x-button>
        </div>
    </div>
</template>

<script>
import { XHeader, XInput, Group, XButton, Countdown} from 'vux'
export default {
    components: {
        XHeader,
        XInput,
        XButton,
        Group,
        Countdown
    },
    data () {
        return {
            mobilePhone: '',
            verificationCode: '',
            getVcodeStatus: true,
            vcodeTime: 60,
            start: false
        }
    },
    mounted () {

    },
    methods: {
        //获取验证码
        getVcode(){
            if(this.mobilePhone){
                const params = {
                    url : '/getVcode',
                    data :{
                        phone : this.mobilePhone,
                        smsChannel : '1028',
                        smsType : '1'
                    }
                }
                this.api.post(params, res=> {
                    this.start = true;
                    this.getVcodeStatus = false;
                });
            }else{
                this.$vux.toast.text("请填写手机号","middle")
                return
            }
        },
        //倒计时结束后触发的方法
        onFinish (index) {
            this.start = false;
            this.vcodeTime = 60;
            this.getVcodeStatus = true;
        },
        //绑定用户
        bindUserPhone(){
            let config = JSON.parse(localStorage.getItem("config"));
            let user = localStorage.getItem("userInfo")
            let userInfo = {}
            if(user){
                userInfo = JSON.parse(user);
            }
            let reg = /^1[3|4|5|6|7|8][0-9]{9}$/; //验证规则
            if(this.mobilePhone == ''){
                this.$vux.toast.text("请填写手机号","middle")
                return false
            }
            if(!reg.test(this.mobilePhone)){
                this.$vux.toast.text("请填写正确手机号","middle")
                return false
            }
            if(this.verificationCode == ''){
                this.$vux.toast.text("请输入正确的验证码","middle")
                return false
            }
            const params = {
                url : '/bindPhoneUser',
                data :{
                    phone : this.mobilePhone,
                    smsChannel : '1028',
                    smsType: '7',
                    vacode : this.verificationCode,
                    userId: userInfo && userInfo.userId || config && config.user && config.user.userId,
                }
            }
            this.api.post(params, res=> {
                if(res && res.userInfo){
                    let obj = JSON.stringify(res.userInfo);
                    window.localStorage.setItem("userInfo",obj);

                    let recording = window.localStorage.getItem("recording");
                    if(!recording){
                        if (process.env.NODE_ENV === 'production') {
                        // koa page-router配置跳转地址 不带#号
                            window.location.href = "/homestay/home";
                        }
                        if (process.env.NODE_ENV === 'development') {
                        // vue哈希路有。 带#号
                            window.location.href = "/home.html#/";
                        }
                    }else{
                        if (process.env.NODE_ENV === 'production') {
                        // koa page-router配置跳转地址 不带#号
                            window.location.href = "/homestay/usercenter";
                        }
                        if (process.env.NODE_ENV === 'development') {
                        // vue哈希路有。 带#号
                            window.location.href = "/usercenter.html#/";
                        }
                    }    

                }
            });
        },
        // 临时修改成登陆
        login(){
             const params = {
                url : '/login',
                data :{
                    phone : this.mobilePhone,
                    loginPwd : this.verificationCode,
                    valCode : "222222"
                }
            }
            this.api.post(params, res=> {
                if(res && res.userInfo){
                    let obj = JSON.stringify(res.userInfo);
                    window.localStorage.setItem("userInfo",obj);
                    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
                    window.location.href = "/home.html#/";
                }
            });
        }
    }
}
</script>

<style lang="less">
#app{
    .bind-phone{
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
        .phone-check{
            flex: 1;
            overflow-y: auto;
            .weui-cells{
                margin-top: 0;
                .vux-x-input{
                    height: 98px;
                    padding: 25px 30px;
                    .weui-cell__hd{
                        img{
                            height: 44px;
                            width: 44px;
                        }
                    }
                    .weui-cell__bd{
                        margin-left: 20px;
                        height: 48px;
                        input{
                            height: 100%;
                            font-size: 28px;/*px*/
                            vertical-align: top;
                        }
                    }
                    .weui-cell__ft{
                        .send-verification-code{
                            border-left: 1px solid #D8D8D8;
                            width: 170px;
                            span{
                                display: block;
                                font-size: 28px;/*px*/
                                color: #2D2D2D;

                            }
                            .countdown{
                                display: flex;
                                justify-content: center;
                            }
                        }
                    }
                }
                .weui-cell:before{
                    left: 0;
                }
            }
        }
        .phone-bottom{
            background:#ffffff;
            box-shadow:0 -1px 1px 0 rgba(0,0,0,0.10);
            height:98px;
            padding-top: 10px;
            button{
                background:#040404;
                border-radius:6px;/* no */
                width:690px;
                height:78px;
                font-size:30px;/*px*/
                color:#ffffff;
            }
        }
    }
    .order-button{
        display: none;
    }
}    
</style>
