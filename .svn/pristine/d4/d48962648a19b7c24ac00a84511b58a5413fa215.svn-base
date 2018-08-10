<template>
    <div class="addshipping">
        <x-header :left-options="{backText: ''}">
            <span v-if="!id">新增收货地址</span>
            <span v-if="id">修改收货地址</span>
        </x-header>
        <div class="addshipping-content">
            <group class="add-shipping">
                <group-title slot="title">收货人信息</group-title>
                <x-input placeholder="收货人" :max="6" v-model="receiver">
                    <img slot="label" style="display:inline-block;vertical-align:middle;" src="../assets/tbgr_1@2x.png">
                </x-input>
                <x-input placeholder="请输入手机号" is-type="china-mobile" v-model="phone">
                    <img slot="label" style="display:inline-block;vertical-align:middle;" src="../assets/tbgr_8@2x.png">
                </x-input>
            </group>
            <group class="select-shipping">
                <group-title slot="title">收货地址</group-title>
                <x-address :title="addressTitle" placeholder="请选择地址" v-model="addressValue" raw-value :list="addressData"  value-text-align="right"></x-address>
                <x-input title="详细地址" v-model="adressDetail" :max="50"></x-input>
            </group>
            <div class="is-default">
              <div class="switcDiv">
                <x-switch class="switchFlex" title="设置默认地址" :value-map="['0', '1']" v-model="stringValue"></x-switch>
              </div>

            </div>
        </div>
        <footer class="addshipping-footer" @click="saveAddress">
            <span>保存</span>
        </footer>
    </div>
</template>
<script>
import { XHeader, Cell, Group, XInput, GroupTitle, ChinaAddressV4Data, XAddress, XSwitch, Value2nameFilter as value2name} from 'vux'
export default {
    components: {
        XHeader,
        Cell,
        Group,
        XInput,
        GroupTitle,
        ChinaAddressV4Data,
        XAddress,
        XSwitch
    },
    data () {
        return {
            id : '',
            receiver : '',        //收货人
            checked : 1,
            addressTitle: '所在地区',
            addressData: ChinaAddressV4Data,
            addressValue: [],
            stringValue: '0',
            adressDetail : '',
            phone:'',
            userInfo:JSON.parse(window.localStorage.getItem("userInfo")),
            tips:{
                "userName" : "收货人不能为空",
                "tel" : "手机号不能为空",
                "address" : "请认真填写详细地址"
            },
        }

    },
    mounted () {
        this.id = this.$route.query.id;
        if(this.id){
            this.getAddressMain();
        }
    },
    methods: {
        //根据ID获取详情
        getAddressMain(){
            const params = {
                url : '/getAddressDetail',
                data : {
                    id : this.id
                }
            }
            this.api.post(params, res=> {
                let list = res && res.ua;
                this.receiver = list.userName;
                this.phone = list.tel;
                this.addressValue = [list.provinceName,list.districtName,list.areaName];
                this.adressDetail = list.address;
                this.stringValue = list.isHost;
            });
        },
        //保存添加（修改数据）
        saveAddress(){
            let address = (this.getName(this.addressValue)).split(" ");
            let data = {
                "id" : this.id ,
                "userId" : this.userInfo.userId || '',
                "userName" :  this.receiver,
                "tel" : this.phone,
                "provinceCode" : this.addressValue[0],
                "provinceName" : address[0],
                "districtCode" : this.addressValue[1],
                "districtName" : address[1],
                "areaCode" : this.addressValue[2],
                "areaName" : address[2],
                "address" : this.adressDetail,
                "isHost" : this.stringValue,
            }
            for(let key in this.tips){
                if(!data[key]){
                    this.dilog(this.tips[key]);
                    return false;
                }
            }
            if(this.addressValue.length <= 0){
                this.dilog("请选择地区");
                return false;
            }
            if(!(/^1[34578]\d{9}$/.test(this.phone))){ 
                this.$vux.toast.text("请输入正确手机号","middle");
                return false; 
            }
            const params = {
                url : '/addAddress',
                data : data
            }
            this.api.post(params, res=> {
                this.$router.push({path:'/shippingaddress'});
                this.dilog('地址保存成功')
            },false);
        },
        //根据地区code码编译对应城市
        getName (value) {
            return value2name(value, ChinaAddressV4Data)
        },
    }
}
</script>
<style lang="less">
    #app{
        .addshipping{
                height: 100%;
                display: flex;
                flex-direction: column;
                overflow: hidden;
                background-color: rgba(239, 239, 244, 1);
                .switcDiv{
                  height: 98px;
                  background: #fff;
                  display: flex;
                  align-items: center;
                }
          .switchFlex{
            flex: 1;
          }
          .weui-switch:after, .weui-switch-cp__box:after{
          /*  width: 42px;
            height: 42px;*/
          }
          .weui-switch:before, .weui-switch-cp__box:before{
           /* height: 42px;*/
          }
          .weui-switch, .weui-switch-cp__box{
           /* height: 46px;*/
          }
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
                .addshipping-content{
                    flex: 1;
                    .add-shipping{
                        .weui-cells__title{
                            margin: 20px 30px;
                            padding: 0;
                            height: 26px;
                            line-height: 26px;
                            color: rgba(102, 102, 102, 1);
                            font-size: 26px;/*px*/
                        }
                        .weui-cells{
                            .weui-cell{
                                height: 98px;
                                padding: 27px 30px;
                                .weui-cell__hd{
                                    width: 44px;
                                    height: 100%;
                                    margin-right: 20px;
                                    img{
                                        margin-top: -6px;
                                        width: 100%;
                                        height: 100%;
                                    }
                                }
                                .weui-cell__bd{
                                    input{
                                        height: 40px;
                                        line-height: 40px;
                                        color: rgba(45, 45, 45, 1);
                                        font-size: 28px;/*px*/
                                    }
                                }
                            }
                            .weui-cell:before{
                                left: 0;
                            }
                        }
                        .weui-cells:after{
                            border: none;
                        }
                        .weui-cells:before{
                            border: none;
                        }
                    }
                    .select-shipping{
                        .weui-cells__title{
                            margin: 20px 30px;
                            padding: 0;
                            height: 26px;
                            line-height: 26px;
                            color: rgba(102, 102, 102, 1);
                            font-size: 26px;/*px*/
                        }
                        .weui-cells{
                            .weui-cell{
                                height: 98px;
                                padding: 29px 30px;
                                label{
                                    height: 40px;
                                    line-height: 40px;
                                    color: rgba(45, 45, 45, 1);
                                    font-size: 28px;/*px*/
                                }
                                span{
                                    height: 40px;
                                    display: block;
                                    line-height: 40px;
                                    font-size: 28px;/*px*/
                                }
                                input{
                                    height: 40px;
                                    line-height: 40px;
                                    font-size: 28px;/*px*/
                                    color: rgba(45, 45, 45, 1);
                                }
                                .weui-cell__primary{
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    margin-right: 10px;
                                }
                            }
                            .weui-cell:before{
                                left: 0;
                            }
                            .vux-cell-box{
                                .weui-cell{
                                     height: 148px;
                                    .vux-cell-primary{
                                        padding-left: 20px;
                                        .vux-popup-picker-select{
                                          text-align: left!important;
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
                        .weui-cells:after{
                            border: none;
                        }
                        .weui-cells:before{
                            border: none;
                        }
                    }
                    .is-default{
                        margin-top: 20px;
                        height: 98px;
                        .weui-cells{
                            height: 100%;
                            margin: 0;
                            padding: 28px 30px;
                            .vux-x-switch{
                                padding: 0;
                                label{
                                    line-height: 42px;
                                    color: rgba(45, 45, 45, 1);
                                    font-size: 28px;/*px*/
                                }
                                .weui-cell__ft{
                                    .weui-switch{
                                        width: 94px;
                                        height: 50px;
                                        border-radius:100px;
                                    }
                                    .weui-switch:after, .weui-switch-cp__box:after{
                                        width:46px;
                                        height:46px;
                                        border-radius:50%;
                                    }
                                    .weui-switch:checked:after, .weui-switch-cp__input:checked ~ .weui-switch-cp__box:after{
                                            transform: translateX(44px);
                                    }
                                    .weui-switch:checked{
                                        border-color: #000;
                                        background-color: #000;
                                    }
                                }
                            }
                        }
                        .weui-cells:after{
                            border: none;
                        }
                        .weui-cells:before{
                            border: none;
                        }
                    }
                }
                .addshipping-footer{
                    width: 100%;
                    height: 98px;
                    background-color: rgba(4, 4, 4, 1);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    span{
                        height: 42px;
                        line-height: 42px;
                        color: rgba(255, 255, 255, 1);
                        font-size: 30px;/*px*/
                        font-weight: 700;
                    }
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
</style>
