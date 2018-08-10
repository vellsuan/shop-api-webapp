<template>
    <div class="choicePayBox">   
        <div class="headerTitle">选择付款方式
            <x-icon type="ios-close-empty" preserveAspectRatio="xMidYMid meet" @click.native="closePayPanel"></x-icon>
        </div>
        <group class="form-payment" label-width="7em" label-margin-right="2em" label-align="left">
            <div class="weui-cell alipay">
                <div class="alipaylogo">
                    <img src="../assets/alipay_logo@2x.png" alt="" >
                    <span>支付宝支付</span>
                </div>
                <div class="alipay-ridio" @click="isActivewx=false;isActiveAlipay=true">
                    <input type="radio" name="pay" value="2" :class="{ checked: isActiveAlipay }">
                    <label for=""></label>
                </div>
            </div>
            <div class="weui-cell wxpay">
                <div class="wxlogo">
                    <img src="../assets/wx_logo@2x.png" alt="" >
                    <span>微信支付</span>
                </div>
                <div class="wxpay-ridio" @click="isActivewx=true;isActiveAlipay=false">
                    <input type="radio" name="pay" value="1" :class="{ checked: isActivewx }">
                    <label for=""></label>
                </div>
            </div>
        </group>
        <div class="payPrice">
            <span>需付款</span>
            <span>&yen;{{totalSum}}</span>
        </div>
        <div class="payBtn">确认支付</div>
    </div>
</template>

<script>
import { Group} from 'vux'
export default {
    components: {
        Group
    },
    data () {
        return {
            isActivewx:true,                     //微信支付
            isActiveAlipay : false              //支付宝支付
        }
    },
    props:["totalSum"],
    methods:{
        closePayPanel(){
            this.$emit("closePayPanel",false);
        }
    }
}
</script>

<style lang="less" scoped>
    .choicePayBox{
        width:508px;
        height:509px;
        background:#fff;
        border-radius: 12px;
        border:1px solid #eee;
        margin:284px auto 0;
        .headerTitle{
            width:100%;
            height:90px;
            line-height:90px;
            font-size: 30px;/*px*/
            color:#000;
            text-align: center;
            position: relative;
            .vux-x-icon{
                position: absolute;
                width:88px;
                height:88px;
                left:0;
                top:0;
                .st0{
                    fill:#d8d8d8;
                }
            }
        }
        .form-payment{
            margin:0 auto;
            /deep/
            .vux-no-group-title{
                margin-top:0;
            }
            .weui-cells{
                margin-top:0;
                &::before{
                    border:0;
                    height:0;
                }
                &::after{
                    border:0;
                    height:0;
                }
                .weui-cell{
                    height: 98px;
                    font-size:28px;/*px*/
                    color:#2d2d2d;
                }
                .weui-cell::before{
                    left: 0;
                    border:none;
                }
                .wxpay{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .wxpay-ridio{
                        display: flex;
                        align-items: center;
                        input{
                            width:42px;
                            height:42px;
                            outline: none;
                            position: absolute;
                            clip: rect(0, 0, 0, 0);
                        }
                        label{
                            display: block;
                            border:2px solid #c9c9c9;
                            border-radius: 50%;
                            width:42px;
                            height:42px;
                            background:#fff;
                        }
                        input.checked + label{
                            background:#fff  url(../assets/a3_icon.png) no-repeat center center;
                            background-size: 100% 100%;
                            border:0;
                        }
                    }
                    .wxlogo{
                        height: 48px;
                        display: flex;
                        align-items: center;
                        img{
                            width: 48px;
                            height: 48px;
                            margin-right: 20px;
                        }
                        span{
                            font-size:28px;/*px*/
                            color:#989898;
                        }
                    }
                }
                .alipay{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .alipay-ridio{
                        display: flex;
                        align-items: center;
                        input{
                            width:42px;
                            height:42px;
                            outline: none;
                            position: absolute;
                            clip: rect(0, 0, 0, 0);
                        }
                        label{
                            display: block;
                            border:2px solid #c9c9c9;
                            border-radius: 50%;
                            width:42px;
                            height:42px;
                            background:#fff;
                        }
                        input.checked + label{
                            background:#fff  url(../assets/a3_icon.png) no-repeat center center;
                            background-size: 100% 100%;
                            border:0;
                        }
                    }
                    .alipaylogo{
                        height: 48px;
                        display: flex;
                        align-items: center;
                        img{
                            width: 48px;
                            height: 48px;
                            margin-right: 20px;
                        }
                        span{
                            font-size:28px;/*px*/
                            color:#989898;
                        }
                    }
                }
            }
        }
        .payPrice{
            margin:0 auto;
            width:468px;
            height:76px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            border-top:1px solid #e5e5e5;
            border-bottom:1px solid #e5e5e5;
            padding:0 10px;
            margin-bottom:50px;
            span{
                display: block;
                color:#989898;
                font-size:28px;/*px*/
            }
            span:last-child{
                color:#B6A382;
            }
        }
        .payBtn{
            width:468px;
            height:84px;
            line-height:84px;
            margin:0 auto;
            background:#090B0C;
            text-align: center;
            color:#fbfbfb;
            border-radius: 8px;
            font-size:30px;/*px*/

        }
    }
</style>