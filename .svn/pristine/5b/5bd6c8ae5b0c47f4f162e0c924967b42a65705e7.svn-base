<template>
    <div class="coupon">
        <x-header :left-options="{backText: ''}">
            <span slot="default">优惠券</span>
            <span slot="right" v-if="change" @click="onCancelTransfer" style="color:#fff;">取消</span>
        </x-header>
        <tab active-color="#2d2d2d" default-color="#989898" bar-active-color="#b6a382" custom-bar-width="17px">
                <tab-item selected @on-item-click="onItemClick">未使用</tab-item>
                <tab-item @on-item-click="onItemClick">已使用</tab-item>
                <tab-item @on-item-click="onItemClick">已过期</tab-item>
        </tab>

        <div v-if="dataAll" class="coupon-list">
            <!-- <checker type="checkbox" default-item-class="check-item" selected-item-class="check-item-selected">
                <ul >
                    <li v-for="(list,index) in items" :key="index">
                        <checker-item :value="list" >{{index}}</checker-item>
                    </li>
                </ul>
            </checker> -->
            <checker v-model="checkItem" type="checkbox" default-item-class="check-item" selected-item-class="check-item-selected">
                 <div class="coupon-details" :class="{invalid:isInvalid}" v-for="(list,index) in items" :key="list.ID">
                    <div class="item">
                        <checker-item :class="{visibility:visible}" :value="list"></checker-item>
                        <div class="coupon-price">
                            <img v-if='list.CouponUse == "N" && isInvalid == false' src="../assets/yh_fang@2x.png" alt="fang">
                            <img v-else-if='list.CouponUse == "FREE" && isInvalid == false' src="../assets/yh_cj@2x.png" alt="canyin">
                            <img v-else-if='list.CouponUse == "N" && isInvalid == true' src="../assets/yh_fangysy@2x.png" alt="fang">
                            <img v-else-if='list.CouponUse == "FREE" && isInvalid == true' src="../assets/yh_cjysy@2x.png" alt="canyin">
                            <div v-else-if='list.CouponUse == "CASH"' class="cash">{{list.Cash | intNumber}}<span>元</span></div>
                            <span v-if='list.CouponUse == "N"'>抵房券</span>
                            <span v-if='list.CouponUse == "FREE"'>餐饮券</span>
                            <span v-if='list.CouponUse == "CASH"'>满{{list.LeastCost}}元减</span>
                        </div>
                        <div class="coupon-introduce">
                            <div class="top-introduce">
                                <p>{{list.couponsTypeName}}</p>
                                <span>优惠码：{{list.SerialNumber}}</span>
                            </div>
                            <div class="bottom-introduce">
                                <p>有效日期至:{{list.UseEnd | substringStr}}</p>
                                <span @click="showDetail(index)">详情<i :class="{iconTrans:(index == i ? rotate : false)}"></i></span>
                            </div>
                        </div>
                    </div>
                    <div v-show='index == i' class="coupon-detail">
                        {{list.svcUdf1}}
                    </div>
                </div>
            </checker>
        </div>
      <div class="coupon-list"  v-else >
        <blank-data-page>
          <img slot="img" src="../assets/youhuijuan.png" alt="" />
          <span slot="tips" v-text="msgyouhui">暂无优惠券</span>
          <a slot="goToVisit" href="/homestay/home">
            <span>去逛逛</span>
          </a>
        </blank-data-page>
      </div>
        <div v-show="dataAll" class="coupon-bottom" v-if='index == 0'>
            <x-button v-if="!change"  @click.native="exchange">转赠</x-button>
            <x-button v-else @click.native="entry">确认</x-button>
        </div>
        <div v-transfer-dom>
            <x-dialog v-model="showToast" class="dialog" hide-on-blur>
                <div class="dialog-header vux-1px-b">
                    <div @click="showToast=false">
                        <img src="../assets/close@2x.jpg" alt="close">
                    </div>
                    <div class='dialog-tittle'>转赠人</div>
                </div>
                <div class="dialog-content">
                    <div class="dialog-explain">温馨提示*需要您填写转赠人在平台注册的手机号哦！</div>
                    <group>
                        <x-input placeholder="请输入手机号" class="vux-1px-b" ref="phone" required v-model="mobilePhone" is-type="china-mobile">
                            <img slot="label" style="display:block;" src="../assets/tbgr_8@2x.png">
                        </x-input>
                    </group>
                </div>
                <x-button  @click.native="entryChange">确认转赠</x-button>
            </x-dialog>
        </div>
    </div>
</template>
<script>

import { XHeader, Tab, TabItem, XButton, Checker, CheckerItem, XDialog, TransferDomDirective as TransferDom, XInput, Group } from 'vux'
import blankDataPage from '@/components/blankdatapage';
export default {
    directives: {
    TransferDom
    },
    components: {
      XHeader,
      Tab,
      TabItem,
      XButton,
      Checker,
      CheckerItem,
      XDialog,
      XInput,
      Group,
      'blank-data-page' : blankDataPage,
    },
    data () {
        return {
            dataAll:true,
            msgyouhui:"暂无优惠券",
            items:[],
            checkItem:[],
            i: -1,
            change:false,
            visible:true,
            rotate: false,
            isInvalid:false,
            showToast:false,
            mobilePhone:'',
            index:0
        }
    },
    mounted () {
        this.getCouponList(1)
    },
    methods: {
         onItemClick (index) {
             this.dataAll=true;
             this.index = index;
             console.log(index)
           if(index==1){
             this.msgyouhui='暂无已使用优惠券'
           }else if(index==2){
             this.msgyouhui='暂无已过期优惠券'
           }else{
             this.msgyouhui='暂无未使用优惠券'
           }

            this.item = []
            this.i = -1
            this.checkItem = []
            this.change = false
            this.visible = true
            this.rotate = false
            this.isInvalid = false
            this.showToast= false
            if(index != '0'){

                this.isInvalid = true
            }else{

                this.isInvalid = false
            }
            this.getCouponList(index+1)
        },
        getCouponList(status){
            const params = {
                url: "/getListCoupon",
                data: {
                    cardNo:JSON.parse(window.localStorage.getItem("userInfo")).cardNo,
                    status:status
                }
            };
            this.api.post(params, res => {
                console.log(res);
                this.items = res.list;
                if(this.items.length){
                    this.dataAll=true;
                }else{
                    this.dataAll=false;
                }
            });
        },
        checkClick(list){
            console.log(list);
        },
        // 详情展示
        showDetail(index){
            this.rotate = true
            if(this.i == index){
                this.i = -1
            }else{
                this.i = index
            }
        },
        // 兑换点击
        exchange(){
            if(this.index == "0"){
                this.change = true
                this.visible = false
            }else{
                this.$vux.toast.text('无法转赠')
            }
        },
        // 选择转赠后确认按钮
        entry(){
            if(this.checkItem.length>0){
                this.showToast = true
            }else{
                this.$vux.toast.text('请选择转赠优惠券')
            }

        },
        // 确认转赠按钮
        entryChange(){
            let couponIds = this.checkItem.map((value)=>{
                    return value.ID
                })
                console.log(this.$refs.phone);
            if(this.$refs.phone.valid){
                 const params = {
                    url: "/transferCoupons",
                    data: {
                        sourceCardNo:JSON.parse(window.localStorage.getItem("userInfo")).cardNo,
                        phone: this.mobilePhone,
                        couponIds:couponIds.join()
                    }
                };
                this.api.post(params, res => {
                    this.$vux.toast.text('优惠券转增成功','middle')
                    this.checkItem = []
                    this.showToast = false
                    this.getCouponList(1)
                },false)
            }
        },
        //取消选中优惠券按钮
        onCancelTransfer(){
            this.change = false
            this.checkItem = []
            this.visible = true
            this.mobilePhone = ''
        }
    },
     filters: {
        substringStr(value){
            return value.substring(0,10)
        },
        intNumber(value){
            console.log(value);
            if(value > 9999){
                return 9999
            }else{
                return Math.floor(value)
            }
        }
     }

}
</script>
<style lang="less">
.coupon{
    height: 100%;
    background:#efeff4;
    display: flex;
    flex-direction: column;
    .vux-tab{
        height: 98px;
        box-shadow: 0 1px 2px 0 rgba(0,0,0,0.1);
        z-index: 1;
        .vux-tab-item{
            padding-top: 3px;/*no*/
            background: #fff;
            font-size: 28px;/* px */
        }
        .vux-tab-ink-bar{
            .vux-tab-bar-inner{
                border-radius: 100px;
            }
        }
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
    .coupon-list{
        flex: 1;
        overflow:auto;/* winphone8和android4+ */
        -webkit-overflow-scrolling: touch; /* ios5+ */
        .coupon-details{
            .item{
                background:#ffffff;
                box-shadow:0 2px 4px 0 rgba(83,83,83,0.10);/*no*/
                border-radius:7px;
                width:690px;
                height:210px;
                margin: 20px auto 0;
                padding: 20px 30px 10px 10px;
                display: flex;
                position: relative;
                align-items: center;
                justify-content: space-between;
                .coupon-price{
                    display: flex;
                    flex-direction: column;
                    padding-right: 30px;
                    padding-left: 30px;
                    height: 100%;
                    width: 200px;
                    justify-content: center;
                    align-items: center;
                    background: url('../assets/Path 5@2x.png') right center no-repeat;
                    img{
                        width: 110px;
                        height: 110px;
                    }
                    span{
                        padding-top: 10px;
                        line-height: 33px;
                        color: rgba(102, 102, 102, 1);
                        font-size: 24px;/*px*/
                        text-align: center;
                    }
                    .cash{
                        width: 138px;
                        height: 90px;
                        line-height: 90px;
                        color: rgba(4, 4, 4, 1);
                        font-size: 50px;/*px*/
                        text-align: center;
                        &>span{
                            width: 24px;
                            height: 33px;
                            line-height: 33px;
                            color: rgba(4, 4, 4, 1);
                            font-size: 24px;/*px*/
                            text-align: center;
                        }
                    }
                }
                .coupon-introduce{
                    display: flex;
                    flex-direction: column;
                    padding-left: 24px;
                    flex: 1;
                    .top-introduce{
                        background: url('../assets/Path 4@2x.png') left bottom no-repeat;
                        p{
                            width: 380px;
                            height: 80px;
                            line-height: 40px;
                            color: rgba(45, 45, 45, 1);
                            font-size: 28px;/*px*/
                            text-align: left;
                            display: flex;
                            // justify-content: center;
                            align-items: center;
                        }
                        span{
                                width: 380px;
                                height: 30px;
                                line-height: 50px;
                                color: rgba(187, 187, 187, 1);
                                font-size: 22px;/*px*/
                                text-align: left;
                                padding-bottom: 10px;
                        }
                    }
                    .bottom-introduce{
                        padding-top: 14px;
                        display: flex;
                        justify-content: space-between;
                        position: relative;
                        p{
                            height: 30px;
                            line-height: 30px;
                            color: rgba(187, 187, 187, 1);
                            font-size: 22px;/*px*/
                            text-align: left;
                        }
                        span{
                            height: 120px;
                            color: rgba(182, 163, 130, 1);
                            font-size: 22px;/*px*/
                            text-align: right;
                            position: absolute;
                            right: 0;
                            top: -28px;
                            padding-top: 40px;
                            i{
                                display: inline-block;
                                width: 16px;
                                height: 16px;
                                margin-left: 4px;
                                background: url('../assets/select@2x.jpg') center no-repeat;
                                background-size:100% 100%;
                            }
                            .iconTrans{

                                transform: rotate(180deg);
                            }
                        }
                    }
                }
                .visibility{
                    display: none;
                }
            }
            .coupon-detail{
                background: #fff;
                width: 650px;
                padding: 20px;
                margin: 0 auto;
                line-height: 36px;
                color: rgba(102, 102, 102, 1);
                font-size: 22px;/*px*/
                text-align: left;
                box-shadow:0 2px 4px 0 rgba(83,83,83,0.10);
            }

        }
        .coupon-details.invalid .item {
             .top-introduce p,.coupon-price .cash{
                color: rgba(102, 102, 102, 1)
            }
        }
        .coupon-details:last-child{
            margin-bottom: 20px;
        }
    }
    .coupon-bottom{
            background:#ffffff;
            box-shadow:0 -1px 1px 0 rgba(0,0,0,0.10);
            height:98px;
            padding-top: 10px;
            button{
                background:#040404;
                border-radius:6px;/* no */
                width:690px;
                height:78px;
                font-size:30px;/* px */
                color:#ffffff;
            }
        }
    .check-item {
        // font-size: 36px;/*px*/
        // width: 36px;
        // height: 36px;
        // display: block;
        // color: #2d2d2d !important;
        // border: 2px solid #979797;
        // border-radius: 50%;
        width:56px;
        height:100%;
        background: url(../assets/a3_iconk.png) no-repeat left center;
        background-size:36px 36px;
    }
    .check-item-selected {
        background: url(../assets/a3_icon.png) no-repeat left center;
        background-size: 36px 36px;
        border: 0;
    }
    .vux-tap-active{
        -webkit-tap-highlight-color:transparent;
        position: absolute;
        width: 200px;
        &:active{
            background-color:transparent;
        }
    }
}
.dialog{
    .weui-dialog{
        width: 628px;
        border-radius: 12px;
        background-color: rgba(255, 255, 255, 1);
        border: 1px solid rgba(238, 238, 238, 1);
        .dialog-header{
            height: 98px;
            padding: 28px 30px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            img{
                height: 48px;
                width: 48px;
            }
            .dialog-tittle{
                padding-right:24PX;
                flex: 1;
                left: 302px;
                line-height: 42px;
                color: rgba(0, 0, 0, 1);
                font-size: 30px;/*px*/
                text-align: center;

            }
        }
        .dialog-content{
            padding: 40px 60px;
            padding-bottom: 0;
            .dialog-explain{
                line-height: 40px;
                color: rgba(0, 0, 0, 1);
                font-size: 28px;/*px*/
                text-align: left;
                margin-bottom:20px;
            }
            .weui-cells::before{
                display: none;
            }
            .vux-x-input{
                height: 98px;
                padding: 25px 8px;
                .weui-cell__hd{
                    padding-right: 26px;
                    img{
                        height: 44px;
                        width: 44px;
                    }
                }
            }
        }
        .weui-btn{
                width: 468px;
                height: 84px;
                border-radius: 8px;
                background-color: rgba(45, 45, 45, 1);
                margin: 20px auto;
                line-height: 42px;
                color: rgba(251, 251, 251, 1);
                font-size: 30px;/*px*/
                text-align: center;
            }
    }
}
</style>
