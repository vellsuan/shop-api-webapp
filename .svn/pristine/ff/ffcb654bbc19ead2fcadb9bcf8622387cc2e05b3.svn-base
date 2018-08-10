<template>
    <div class="shippingaddress">
        <x-header :left-options="{backText: ''}">
            <span>收货地址</span>
        </x-header>
        <div class="address-content" v-if="showAddress">
            <div class="address-detail" v-for="list in addressList" :key="list.id">
                <div class="address-detail-top" @click="goToIntegralDetails(list)">
                    <div class="top">
                        <span>{{list.userName}}</span>
                        <span>{{list.tel}}</span>
                    </div>
                    <div class="bottom">
                        <p>{{list.provinceName}} {{list.districtName}} {{list.areaName}} {{list.address}}</p>
                    </div>
                </div>
                <div class="address-detail-bottom">
                    <div class="is-checked">
                        <div v-if="list.isHost == 1" class="is-checked-default" @click="isHostAddress(list.id,list.isHost)">
                            <img src="../../price_enjoy/assets/a3_icon.png" alt="">
                        </div>
                        <div v-else class="is-checked-none" @click="isHostAddress(list.id,list.isHost)">

                        </div>
                        <span @click="isHostAddress(list.id,list.isHost)">设为默认</span>
                    </div>
                    <div class="operating">
                        <router-link :to="'/addshipping?id=' +list.id ">
                            <div class="address-edit">
                                <img src="../assets/wx_edit@2x.png" alt=""/>
                                <span>编辑</span>
                            </div>
                        </router-link>
                        <div class="address-del" @click="isDel = true; id = list.id">
                            <img src="../assets/wx_del@2x.png" alt=""/>
                            <span>删除</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="address-content" v-else>
            <blank-data-page>
              <img slot="img" src="../assets/youhuijuan.png" alt="" />
              <span slot="tips">暂无地址</span>
            </blank-data-page>
        </div>
        <router-link :to="'/addshipping'">
            <footer class="address-footer">
                <span>添加新地址</span>
            </footer>
        </router-link>
        <div v-transfer-dom class="shippingaddressV">
            <confirm v-model="isDel"
            title="确定要删除当前地址吗？"
            @on-confirm="delAddress">
            </confirm>
        </div>
    </div>
</template>
<script>
import { XHeader, Cell, Group, XTextarea, Confirm, TransferDomDirective as TransferDom  } from 'vux'
import blankDataPage from '@/components/blankdatapage';
export default {
    directives: {
        TransferDom
    },
    components: {
        XHeader,
        Cell,
        Group,
        XTextarea,
        Confirm,
        'blank-data-page' : blankDataPage,
    },
    data () {
        return {
            checked : 1,
            userInfo:JSON.parse(window.localStorage.getItem("userInfo")),
            addressList:[],
            isDel: false,
            id : '',
            showAddress : true
        }

    },
    mounted(){
        this.getAddressList();
    },
    methods: {
        //获取地址列表
        getAddressList(){
            const params = {
                url : '/addressList',
                data : {
                    userId : this.userInfo.userId
                }
            }
            this.api.post(params, res=> {
                if(res && res.page && res.page.datas){
                    this.addressList = res && res.page.datas;
                    if(this.addressList[0]){
                        this.showAddress = true;
                    }else{
                        this.showAddress = false;
                    }
                }else{
                    this.showAddress = false;
                }
            });
        },
        //删除列表地址
        delAddress(){
            const params = {
                url : '/delAddress',
                data : {
                    id : this.id
                }
            }
            this.api.post(params, res=> {
                if(res){
                    this.getAddressList();
                    this.$vux.toast.text("删除成功","middle");
                }
            },false);
        },
        //设置默认地址
        isHostAddress(id,isHost){
            const params = {
                url : '/isHostAddress',
                data : {
                    id : id,
                    isHost : 1,
                    userId : this.userInfo.userId
                }
            }
            this.api.post(params, res=> {
                if(res){
                    this.getAddressList();
                    // let integraLPage = localStorage.getItem("integraLPage");
                    // window.location.href = integraLPage;
                }
            });
        },
        goToIntegralDetails(list){
            let integraLPage = localStorage.getItem("integraLPage")  || '';
            let address = list.provinceName + " " + list.districtName + " " + list.areaName + " " + list.address;
            let userAddress = {"receiver" : list.userName, "phone" : list.tel,"address" : address}
            let obj = JSON.stringify(userAddress);
            window.localStorage.setItem("userAddress",obj)
            window.location.href = integraLPage
        }
    }
}
</script>
<style lang="less">
    #app{
        .shippingaddress{
            height: 100%;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            background-color: rgba(239, 239, 244, 1);
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
            .address-content{
                flex: 1;
                overflow: hidden;
                overflow-y: auto;
                -webkit-overflow-scrolling: touch; /* ios5+ */
                .address-detail{

                    background: #fff;
                    display: flex;
                    flex-direction: column;
                    margin-bottom: 20px;
                    .address-detail-top{
                        padding: 20px 30px;
                        border-bottom: 1px solid #efefef;
                        .top{
                            height: 42px;
                            display: flex;
                            justify-content: space-between;
                            span{
                                height: 42px;
                                line-height: 42px;
                                color: rgba(45, 45, 45, 1);
                                font-size: 30px;/*px*/
                            }
                        }
                        .bottom{
                            margin-top:20px;
                            p{
                                line-height: 38px;
                                color: rgba(152, 152, 152, 1);
                                font-size: 24px;/*px*/
                            }
                        }
                    }
                    .address-detail-bottom{
                        padding: 22px 30px;
                        display: flex;
                        justify-content: space-between;
                        .is-checked{
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            .is-checked-none{
                                width: 36px;
                                height: 36px;
                                background-color: rgba(255, 255, 255, 1);
                                border: 1px solid rgba(151, 151, 151, 1);
                                border-radius: 18px;
                                margin-right: 20px;

                            }
                            .is-checked-default{
                                margin-right: 20px;
                                width: 36px;
                                height: 36px;
                                img{
                                    width: 100%;
                                    height: 100%;
                                }
                            }
                            span{
                                display: block;
                                height: 42px;
                                line-height: 42px;
                                color: rgba(45, 45, 45, 1);
                                font-size: 24px;/*px*/
                            }
                        }
                        .operating{
                            display: flex;
                            div{
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                img{
                                    width: 36px;
                                    height: 36px;
                                    margin-right: 20px;
                                }
                                span{
                                    height: 42px;
                                    line-height: 42px;
                                    color: rgba(45, 45, 45, 1);
                                    font-size: 24px;/*px*/
                                }
                            }
                            .address-edit{
                                margin-right: 40px;
                            }
                        }
                    }
                }
                .black-data-page{
                    .black-page-btn{
                        display: none;
                    }
                }
            }
            .address-footer{
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
    .shippingaddressV{
        .weui-dialog{
            .weui-dialog__hd{
                .weui-dialog__title{
                    font-size: 32px;/*px*/
                }
            }
            .weui-dialog__bd{
                min-height: 40px;
            }
            .weui-dialog__ft{
                a{
                    font-size: 28px;/*px*/
                }
            }
        }
    }
</style>
