<template>
    <div class="contactus">
        <x-header :left-options="{backText: ''}">
            <span>联系我们</span>
        </x-header>
        <div class="contactus-content">
            <div class="contactus_bg">
                <div class="contactus_address_logo">
                    <img src="../assets/contactus-address.png"  />
                </div>
                <div class="contactus_address">
                    <span>联系地址</span>
                    <span>栖君台丽江市</span>
                    <span>云南省丽江市古城区复华度假世界（玉泉路西）</span>
                </div>
            </div>
            <div class="contactus-qrcode">
                <div class="contactus-wb">
                    <img src="../assets/wxqrcode@2x.png" alt="wb" />
                </div>
                <!-- <div class="contactus-font">
                    <span>关注栖君台微博</span>
                </div> -->
                <div class="contactus-wx">
                    <img src="../assets/wbqrcode@2x.png" alt="wx" />
                </div>
                <!-- <div class="contactus-font">
                    <span>关注栖君台微信</span>
                </div> -->
            </div>
        </div>
        <group class="contact-information">
            <a href="tel:0888-3060666">
                <cell  title="野奢帐篷" value="0888-3060666" >
                    <img slot="icon" src="../assets/contactus-tel.png" />
                </cell>
            </a>
            <a href="tel:0888-3021888">
                <cell  title="南诏府／琴瑟情趣" value="0888-3021888" >
                    <img slot="icon" src="../assets/contactus-tel.png" />
                </cell>
            </a>    
        </group>
    </div>
</template>

<script>
import { XHeader, Cell, Group} from 'vux'
export default {
    components: {
        XHeader,
        Cell,
        Group
    },
    data () {
        return {
            
        }
    },
    mounted () {

    },
    methods: {
        
    }
}
</script>

<style lang="less">
    .contactus{
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        background: #ffffff;
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
        .contactus-content{
            flex: 1;
            overflow-y: auto;
            .contactus_bg{
                height:288px;
                background: url(../assets/contactus_bg.png) no-repeat center center;
                background-size: 100% 100%;
                padding: 40px 30px 0;
                display: flex;
                .contactus_address_logo{
                    margin-top: 4px;
                    margin-right: 20px;
                    img{
                        width: 30px;
                        height: 30px;
                    }
                }
                .contactus_address{
                    display: flex;
                    flex-direction: column;
                    span:first-child{
                        height: 40px;
                        line-height: 40px;
                        color: rgba(255, 255, 255, 1);
                        font-size: 28px;
                        margin-bottom: 20px;
                    }
                    span{
                        line-height: 41px;
                        color: rgba(255, 255, 255, 1);
                        font-size: 24px;
                    }
                }
            }
            .contactus-qrcode{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                .contactus-wb,.contactus-wx{
                    width: 252px;
                    height: 252px;
                    margin-bottom: 20px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .contactus-font{
                    margin-bottom: 20px;
                    span{
                        height: 28px;
                        line-height: 28px;
                        color: rgba(152, 152, 152, 1);
                        font-size: 26px;/*px*/
                    }
                }
            }
        }
        .contact-information{
            height: 176px;
            .weui-cells{
                margin-top: 0;
                .weui-cell{
                    height: 88px;
                    .weui-cell__hd{
                        margin-left: 15px;
                        img{
                            width: 30px;
                            height: 30px;
                        }
                    }
                    .vux-cell-bd{
                        margin-left: 20px;
                        p{
                          .vux-label{
                            height: 40px;
                            line-height: 40px;
                            color: rgba(102, 102, 102, 1);
                            font-size: 28px;/*px*/
                          }  
                        }
                    }
                    .weui-cell__ft{
                        height: 40px;
                        line-height: 40px;
                        color: rgba(185, 163, 123, 1);
                        font-size: 28px;
                    }
                }
                .weui-cell:before{
                    right: 15PX;
                }
            }
            .weui-cells:before{
                border: none;
            }
            .weui-cells:after{
                border: none;
            }
        }
    }
</style>
