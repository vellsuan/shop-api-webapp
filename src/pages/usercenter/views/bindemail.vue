<template>
    <div class="email-phone">
        <x-header :left-options="{backText: ''}">绑定邮箱</x-header>
        <group class="email-check">
            <x-input placeholder="邮箱" is-type="email" v-model="email" required ref="email">
                <img slot="label" style="display:block;" src="../assets/tbgr_7@2x.png" >
                <img slot="right-full-height" src="https://ws1.sinaimg.cn/large/663d3650gy1fq684go3glj203m01hmwy.jpg">
            </x-input>
        </group>
        <div class="email-bottom" @click="submit">
            <x-button>确认</x-button>
        </div>
    </div>
</template>

<script>
import { XHeader, XInput, Group, XButton} from 'vux'
export default {
    components: {
        XHeader,
        XInput,
        XButton,
        Group,
    },
    data () {
        return {
            email: ''
        }
    },
    methods: {
        submit(){
            if(this.$refs.email.valid){
                const params = {
                    url: "/addEmail",
                    data: {
                        userId:JSON.parse(window.localStorage.getItem("userInfo")).userId,
                        email: this.email
                    }
                };
                this.api.post(params, res => {
                    let _this = this
                    this.$vux.alert.show({
                        title: '提示',
                        content: '激活邮件已发送至您的邮箱，请登录邮箱进行激活！',
                        buttonText: '我知道了',
                        onHide () {
                            _this.$router.push("/")
                        }
                    })
                })
            }
        }
    }
}
</script>

<style lang="less">
    .email-phone{
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
        .email-check{
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
                        }
                    }
                }
                .weui-cell:before{
                    left: 0;
                }
            }
        }
        .email-bottom{
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
</style>
