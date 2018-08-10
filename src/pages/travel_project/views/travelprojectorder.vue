<template>
    <div class="price-enjoy-order">
            <x-header :left-options="{backText: ''}">订单确认</x-header>
            <div class="content">
                <div class="header"></div>
                <div class="hotel-name">
                    <div class="hotel-name-top">
                        <span>老君山飞拉达一日游</span>
                    </div>
                    <div class="hotel-name-bottom">
                        <span>出游日期：2018-03-09</span>
                    </div>
                </div>
                <div class="form-payment-title mg-top">
                    <span>注：此价包含：2位成人/1位儿童</span>
                </div>
                <group class="form-justify" label-width="5.5em" label-margin-right="2em" label-align="left">
                    <x-number title="购买数量" align="right" v-model="numberValue" button-style="round" :min="1" :max="5"></x-number>
                </group>
                <div class="form-payment-title">
                    <span>联系信息</span>
                </div>
                <group class="form-message" label-width="5.5em" label-margin-right="2em" label-align="left">
                    <x-input title="联系人" v-model="value1"></x-input>
                    <x-input title="联系手机" v-model="contactPhone" name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile"></x-input>
                    <x-input title="Email" v-model="email" name="email" placeholder="请输入邮箱地址" is-type="email"></x-input>
                </group>
                <group class="form-coupon" label-width="7em" label-margin-right="2em" label-align="left">
                    <x-switch title="使用优惠券" v-model="couponValue"></x-switch>
                    <cell v-if="couponValue==true" title="可使用优惠券" value="2张可用" is-link value-align="right"></cell>
                    <x-switch title="可用积分" v-model="integralValue"></x-switch>
                    <cell v-if="integralValue==true" :title="2000" class="integralDisplay" :value="'可抵用 20.00元'" @click.native="onClick"></cell>
                </group>
                <div class="form-payment-title">
                    <span>选择支付方式</span>
                </div>
                <group class="form-payment" label-width="7em" label-margin-right="2em" label-align="left">
                    <div class="weui-cell wxpay">
                        <div class="wxpay-ridio" @click="isActivewx=true;isActivehyk=false">
                            <input type="radio" name="pay" value="1" :class="{ checked: isActivewx }">
                            <label for=""></label>
                        </div>
                        <div class="wxlogo">
                            <img src="../assets/wx_logo@2x.png" alt="" >
                            <span>微信支付</span>
                        </div>
                    </div>
                    <div class="weui-cell hykpay">
                        <div class="hykpay-ridio" @click="isActivewx=false;isActivehyk=true">
                            <input type="radio" name="pay" value="2" :class="{ checked: isActivehyk }">
                            <label for=""></label>
                        </div>
                        <div class="hyklogo">
                            <img src="../assets/hyk_logo@2x.png" alt="" >
                            <span>会员卡支付</span>
                        </div>
                    </div>
                </group> 
                <group class="form-amount">
                    <cell title="商品金额" value="￥28888.00"></cell>
                    <cell title="优惠券抵扣" value="-￥20.00"></cell>
                    <cell title="会员卡7折特权" value="-￥200.00"></cell>
                    <cell title="小计" value="￥28888.00"></cell>
                </group>
                <group class="form-invoice">
                    <cell title="发票" value="需要" is-link value-align="right"></cell>
                    <div class="weui-cell order-notes">
                        <div>
                            <span>订单备注</span>
                        </div>
                        <x-textarea :max="50" placeholder="请输入备注内容" @on-focus="onEvent('focus')" @on-blur="onEvent('blur')"></x-textarea>
                    </div>
                </group>
                <div class="tips">
                    <p>温馨提示：1.出游前填写的发票将于出游归来后5个工作日内开具，请注意查收。2.旅游费用和保险费用的发票分开，添加旅游费用发票自动生成保险费用发票。3.发票开具有效期为出游归来后两个月内，如有疑问请电讯。</p>
                    <p>4.发票开具后，若办理退款，需先退还原发票，并保持发票兑奖联完好（如有兑奖联）。</p>
                </div>
            </div>
    </div>    
</template>
<script>
import { XHeader, Group, Cell, XInput, Selector, PopupPicker, XNumber, XTextarea, XSwitch, PopupRadio} from 'vux'
export default {
    components: {
        XHeader,
        Group,
        Cell,
        XInput,
        Selector,
        PopupPicker,
        XNumber,
        XTextarea,
        XSwitch,
        PopupRadio
    },
    data () {
        return {
            value1:"郭佳丽",
            numberValue: 1,                        //房间数量
            title: '请选择',                       //称呼首选
            titles: ['请选择', '男士', '女士'],     //称呼
            option2: '否',
            options2: ['是', '否'],
            contactPhone:'', //联系手机
            email:'',  //email
            couponValue: false,
            integralValue: false,
            isActivewx:true,
            isActivehyk : false,
        }
    },
    methods:{
        change (val, label) {
            console.log('change', val, label)
        },
        onEvent (event) {
            console.log('on', event)
        }
    },
}
</script>
<style lang="less">
    #app{
        .price-enjoy-order{
            height: 100%;
            color: #5d5d5d;
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
                flex:1;   
                overflow-y: auto; 
                .header{
                    width: 100%;
                    height:200px;
                    background:#5d5d5d url(../assets/bg_fdd.png) no-repeat center center;
                    background-size: 100% 100%;
                }
                .mg-top{
                    margin-top: -140px !important;
                }
                .hotel-name{
                    background:#ffffff;
                    box-shadow:0 2px 4px 0 rgba(0,0,0,0.10);
                    border-radius:10px;
                    height:200px;
                    margin: 0 30px;
                    left:0;
                    right:0;
                    position: relative;
                    top:-160px;
                    display: flex;
                    flex-direction: column;
                    padding: 20px 20px 0;
                    .hotel-name-top{
                        text-align: center;
                        height: 60px;
                        width: 100%;
                        padding-bottom: 24px;
                        border-bottom: 1px solid #eeeeee;
                        span{
                            font-size:28px;/*px*/
                            color:#2d2d2d;
                        }
                    }
                    .hotel-name-bottom{
                        height: 100%;
                        width: 100%;
                        padding: 30px 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        span{
                            font-size:28px;/*px*/
                            color:#2d2d2d;
                        }
                    }
                }
                .form-justify{
                    .weui-cells{
                        margin-top: 20px;
                        .weui-cell{
                            height: 98px;
                            font-size:28px;/*px*/
                            color:#2d2d2d;
                            .weui-cell__ft{
                                div:first-child{
                                    .vux-number-input{
                                        font-size:30px;/*px*/
                                        color:#2d2d2d;
                                        line-height:38px;
                                    }
                                }
                                .vux-cell-value{
                                    color: #666;
                                }
                            }
                            .weui-cell__ft:after{
                                border-width:2PX 2PX 0 0;
                                width:12px;
                                height:12px;
                                border-color: #b6a382;
                            }
                            .vux-number-selector-plus{
                                padding:0;
                            }
                            .vux-number-selector-sub{
                                padding:0;
                            }
                            .vux-number-selector svg{
                                height:16PX;
                                width:16PX;
                                fill:#b6a382;
                            }
                            .vux-number-selector{
                                border: 1px solid #b6a382;
                            }
                            
                            .vux-number-round .vux-number-selector-sub svg{
                                top:0;
                            }
                            .price-enjoy-order .form-justify .vux-number-selector svg{
                                height:18PX;
                                width:18PX;
                            }
                            .vux-number-disabled{
                                border-color: #eeeeee;
                                svg{
                                    fill:#c1c1c1;
                                }
                            }
                        }
                        .weui-cell:before{
                            left: 0;
                            border-top:1px solid #eeeeee;
                        }    
                    }    
                }
                .form-message{
                    .weui-cells{
                        margin-top: 20px;
                        .weui-cell{
                            height: 98px;
                            font-size:28px;/*px*/
                            color:#2d2d2d;
                            .weui-cell__bd{
                                input{
                                    text-align: right;
                                    color:#666666;
                                }
                            }
                        }
                        .weui-cell:before{
                            left: 0;
                            border-top:1px solid #eeeeee;
                        }    
                    }  
                }
                .form-coupon{
                    .weui-cells{
                        margin-top: 20px;
                        .weui-cell{
                            height: 98px;
                            font-size:28px;/*px*/
                            color:#2d2d2d;
                            .weui-switch:checked{
                                background: #2d2d2d;
                                border-color: #2d2d2d;
                            }
                        }
                        .weui-cell__ft{
                            font-size:24px;/*px*/
                            color:#b6a382;
                        }
                        .weui-cell__ft:after{
                            border-width:2PX 2PX 0 0;
                            width:12px;
                            height:12px;
                            border-color: #b6a382;
                        }
                        .weui-cell:before{
                            left: 0;
                            border-top:1px solid #eeeeee;
                        }
                        .integralDisplay{
                            .vux-cell-bd {
                                font-size:28px;/*px*/
                                color:#666666;
                            }
                            .weui-cell__ft{
                                font-size:24px;/*px*/
                                color:#bbbbbb;
                            }    
                        }
                    }        
                }
                .form-payment-title{
                    font-size:26px;/*px*/
                    color:#989898;
                    line-height:26px;
                    margin-top: 20px;
                    margin-left: 15PX;
                }
                .form-payment{
                    .weui-cells{
                        margin-top: 20px;
                        .weui-cell{
                            height: 98px;
                            font-size:28px;/*px*/
                            color:#2d2d2d;
                        }
                        .weui-cell:before{
                            left: 0;
                            border-top:1px solid #eeeeee;
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
                                display: flex;
                                align-items: center;
                                img{
                                    width: 40px;
                                    height: 35px;
                                    margin-right: 20px;
                                }
                                span{
                                    font-size:28px;/*px*/
                                    color:#2d2d2d;
                                }
                            }
                        }
                        .hykpay{
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            .hykpay-ridio{
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
                            .hyklogo{
                                display: flex;
                                align-items: center;
                                img{
                                    width: 44px;
                                    height: 34px;
                                    margin-right: 20px;
                                }
                                span{
                                    font-size:28px;/*px*/
                                    color:#2d2d2d;
                                }
                            }
                        }
                    }
                }
                .form-amount{
                    .weui-cells{
                        margin-top: 20px;
                        .weui-cell{
                            height: 98px;
                            font-size:28px;/*px*/
                            color:#2d2d2d;
                            .weui-cell__ft{
                                font-size:28px;/*px*/
                                color:#2d2d2d;
                            }
                        }
                        .weui-cell:nth-child(2){
                            font-size:24px;/*px*/
                            color:#666666;
                            .weui-cell__ft{
                                color:#b6a382;
                            }
                        }
                        .weui-cell:nth-child(3){
                            font-size:24px;/*px*/
                            color:#666666;
                            .weui-cell__ft{
                                color:#b6a382;
                            }
                        }
                        .weui-cell:last-child{
                            font-size:24px;/*px*/
                            .vux-cell-bd{
                                p{
                                    margin-right: 20px;
                                    display: flex;
                                    justify-content: flex-end;
                                }
                            }
                            .weui-cell__ft{
                                font-size:30px;/*px*/
                                color:#ea5414;
                            }
                        }
                        .weui-cell:before{
                            left: 0;
                            border-top:1px solid #eeeeee;
                        }
                    }      
                }
                .form-invoice{
                    .weui-cells{
                        margin-top: 20px;
                        .weui-cell{
                            height: 98px;
                            font-size:28px;/*px*/
                            color:#2d2d2d;
                            .weui-cell__ft{
                                color:#bbbbbb;
                                line-height: 42px;
                            }
                            .weui-cell__ft:after{
                                border-width:2PX 2PX 0 0;
                                width:12px;
                                height:12px;
                                border-color: #b6a382;
                                margin-top: -3PX;
                            }
                        }
                    }
                    .weui-cell:nth-child(2) :before{
                        left: 0;
                        border-top:none;
                    }
                    .weui-cell:before{
                        left: 0;
                        border-top:1px solid #eeeeee;
                    }
                    .order-notes{
                        height:320px !important;
                        display: flex;
                        flex-direction: column;
                        div:first-child{
                            margin: 10px 0 20px;
                            width: 100%;
                        }
                        .vux-x-textarea{
                            height: 198px;
                            width: 100%;
                            border:1px solid #efefef;
                            .weui-cell__hd{
                                width: 0px;
                            }
                            .weui-cell__bd{
                                width: 100%;
                                .weui-textarea{
                                    width: 100%;
                                }
                            }
                        }
                    }        
                }
                .tips{
                    width: 100%;
                    padding: 20px 30px 0 30px;;
                    height: 196px;
                    margin-bottom: 100px;
                    p{
                        font-size:22px;/*px*/
                        color:#989898;
                        line-height:44px;
                    }
                }
            }    
            footer{
                z-index:9999;
                background:#ffffff;
                box-shadow:0 -1px 2px 0 rgba(0,0,0,0.10);
                width:100%;
                height:98px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .total{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    span:first-child{
                        margin-left: 30px;
                        font-size:30px;/*px*/
                        color:#666666;
                        line-height:36px;
                    }
                    span:last-child{
                        margin-left: 20px;
                        font-size:30px;/*px*/
                        color:#ea5414;
                        line-height:36px;
                    }
                }
                div:last-child{
                    background:#090b0c;
                    width:256px;
                    height:98px;
                    text-align: center;
                    span{
                        line-height: 95px;
                        font-size:30px;/*px*/
                        color:#ffffff;
                    }
                }
            }   
        }
    }  
</style>
