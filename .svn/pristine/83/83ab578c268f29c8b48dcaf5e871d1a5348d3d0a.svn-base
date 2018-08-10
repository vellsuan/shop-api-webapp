<template>
    <div class="invoice">
        <x-header :left-options="{backText: ''}">
            <span>发票</span>    
        </x-header>
        <div class="invoice-content">
            <group class="is-invoice">
                <x-switch title="需要发票" v-model="isInvoice" @on-change="onchange"></x-switch>
            </group>
            <group class="invoice-type">
                <cell title="发票类型" class="radioXinput" v-if="isInvoice">
                    <div slot="default" class="invoice-checked">
                        <div @click="isActiveSi=true;isActiveRi=false">
                            <input type="radio" name="pay" value="2" :class="{ checked: isActiveSi }">
                            <label for=""></label>
                            <span>专票</span>
                        </div>
                        <div @click="isActiveSi=false;isActiveRi=true">
                            <input type="radio" name="pay" value="1" :class="{ checked: isActiveRi }">
                            <label for=""></label>
                            <span>普票</span>
                        </div>        
                    </div>
                </cell>
                <cell title="发票类型"  :class={disabled:isDisabled}  class="radioXinput" v-else>
                    <div slot="default" class="invoice-checked">
                        <div>
                            <input type="radio" name="pay" value="2">
                            <label for=""></label>
                            <span>专票</span>
                        </div>
                        <div>
                            <input type="radio" name="pay" value="1">
                            <label for=""></label>
                            <span>普票</span>
                        </div>        
                    </div>
                </cell>
                <div v-if="isActiveSi" >
                    <x-textarea title="单位名称"   :class={disabled:isDisabled} :disabled='isDisabled'  v-model="companyName" text-align="left" :height="29" :show-counter="false" :rows="1" autosize></x-textarea>
                    <x-textarea title="注册地址"   :class={disabled:isDisabled} :disabled='isDisabled'  v-model="registerAddress" text-align="left"  :height="29" :show-counter="false" :rows="1" autosize> </x-textarea>
                    <x-input title="税号"  :class={disabled:isDisabled} :disabled='isDisabled'  v-model="taxCode"  text-align="left"></x-input>
                    <x-input title="注册电话"  :class={disabled:isDisabled} :disabled='isDisabled'  :min="10" :max="15"  v-model="registerTel"    text-align="left"   keyboard="number" type="number"></x-input>
                    <x-input title="开户银行"  :class={disabled:isDisabled} :disabled='isDisabled'  v-model="accountBank"   text-align="left" ></x-input>
                    <x-input title="银行账号"  :class={disabled:isDisabled} :disabled='isDisabled'  :min="16" :max="23" v-model="accountNo"  keyboard="number" mask="9999 9999 9999 9999 999"   text-align="left"></x-input>
                </div>
                <div v-else-if="isActiveRi">
                    <x-textarea title="发票抬头"  :class={disabled:isDisabled} :disabled='isDisabled'   v-model="invoiceTitle"   autosize text-align="left"></x-textarea>
                </div>
            </group>
        </div>
        <footer>
            <div class="total">
                <span>开票总额</span>
                <span>&yen;{{totalSum}}</span>
            </div>
            <div @click="onSubmit">
                <span>提交</span> 
            </div>
        </footer>    
    </div>
</template>
<script>
import { XHeader, Group, XSwitch, Cell, XInput,XTextarea} from 'vux';
import { mapState, mapMutations } from 'vuex'
export default {
    components: {
        XHeader,
        Group,
        XSwitch,
        Cell,
        XInput,
        XTextarea
    },
    data () {
        return {
            isInvoice: true,
            isActive : true,
            isActiveTwo: false,
            isDisabled:false,
            totalSum:this.$route.params.totalPrice,
            showInvoice:false,     //发票详情
            isInvoiceShow:false,   //发票选择展示
            invoiceContent:"专票",       //
            invoiceType:2,         //发票类型
            isActiveSi:true,          //专票
            isActiveRi:false,          //普票
            invoiceTitle:"",       //发票抬头
            accountBank:"",        //开户银行
            accountNo:"",          //银行账号
            companyName:"",        //单位名称
            registerAddress:"",    //单位地址
            registerTel:"",        //注册电话
            taxCode:""             //税号
        }
    },
    methods: {
        ...mapMutations([
            'IS_USE_INVOICE',
            'INVOICE_TYPE',
            'INVOICE_CONTENT'
        ]),
        // onBlur (val) {
        //     console.log('on blur', val);
        //     function getdate(){
        //         var list=$("input");
        //         var strData={};
        //         for(var i=0;i<list.length;i++){
        //             strData[list.eq(i).attr('name')]=list.eq(i).value;
        //         }
        //         return strData;
        //     }
        // },  
        //点击发票提交按钮添加发票内容
        onSubmit(){
            let invoiceObj={};
            if(this.isInvoice){
                if(this.isActiveSi){
                    if(this.accountBank&&this.accountNo&&this.companyName&&this.registerAddress&&this.registerTel&&this.taxCode){
                        if(this.registerTel.length<10||this.registerTel.length>15){
                            this.$vux.toast.text("注册电话长度应在10-15之间","middle");
                            return false;
                        }
                        this.INVOICE_TYPE(2);
                        invoiceObj={
                            accountBank:this.accountBank,        //开户银行
                            accountNo:this.accountNo,          //银行账号
                            companyName:this.companyName,        //单位名称
                            registerAddress:this.registerAddress,    //单位地址
                            registerTel:this.registerTel,        //注册电话
                            taxCode:this.taxCode                 //税号
                        }
                        this.$router.push({ path: '/priceenjoyorder'})
                    }else{
                        this.$vux.toast.text("输入内容不能为空","middle");
                    }
                }else if(this.isActiveRi){
                    if(this.invoiceTitle){
                        this.INVOICE_TYPE(1);
                        invoiceObj={
                            invoiceTitle:this.invoiceTitle    //发票抬头
                        }
                        this.$router.push({ path: '/priceenjoyorder'})
                    }else{
                        this.$vux.toast.text("必须输入发票抬头","middle");
                    }
                }
                this.INVOICE_CONTENT(invoiceObj);
                this.IS_USE_INVOICE(this.isInvoice);
            }else{
                this.INVOICE_CONTENT(null);
                this.IS_USE_INVOICE(false);
                this.INVOICE_TYPE(1);
                this.$router.push({ path: '/priceenjoyorder'})
            }
        },
        // 清空发票内容
        clearInvoice(val){
            if(!this.isInvoice){
                this.invoiceContent="专票";
                this.accountBank="";
                this.accountNo="";
                this.companyName="";
                this.registerAddress="";
                this.registerTel="";
                this.taxCode="";
                this.invoiceTitle="";
            }
        },
        onchange(currentValue){
            if(this.isInvoice){
                this.isDisabled=false;
            }else{
                this.isDisabled=true;
            }
        }
    },
    mounted(){
        if(this.$store.state.isUseInvoice){
                this.isInvoice=true;
            if(this.$store.state.invoiceType==2){
                this.invoiceContent="专票";
                this.invoiceType=2;
                this.isActiveSi=true;
                 this.isActiveRi=false;
                this.accountBank=this.$store.state.invoiceContent.accountBank;     //开户银行	string
                this.accountNo=this.$store.state.invoiceContent.accountNo;	     //银行账号	string
                this.companyName=this.$store.state.invoiceContent.companyName;	     //单位名称	string
                this.registerAddress=this.$store.state.invoiceContent.registerAddress;	 //单位地址	string
                this.registerTel=this.$store.state.invoiceContent.registerTel;	     //注册电话	string
                this.taxCode=this.$store.state.invoiceContent.taxCode;	         //税号	string
            }else if(this.$store.state.invoiceType==1){
                this.invoiceContent="普票";
                this.invoiceType=1;
                this.isActiveSi=false;
                 this.isActiveRi=true;
                this.invoiceTitle=this.$store.state.invoiceContent.invoiceTitle; 
            }
        }    
        // }else{
        //     this.isInvoice=false;
        // }
    },
    computed: mapState({
      isUseInvoice: 'isUseInvoice'
    })
}
</script>
<style lang="less">
    .invoice{
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
        .invoice-content{    
            flex:1;   
            overflow-y: auto;
            padding-top: 20px;
            .is-invoice{
                background:#ffffff;
                width: 100%;
                height:98px;
                .weui-cells{
                    .weui-cell {
                        height:98px;
                        .weui-cell__bd{
                            line-height: 98px;
                            font-size:28px;/*px*/
                            color:#2d2d2d;
                        }
                        .weui-cell__ft{
                            .weui-switch:checked{
                                border-color: #2d2d2d;
                                background-color: #2d2d2d;
                            }
                        }
                    }    
                }
                .vux-no-group-title{
                    margin-top: 0;
                }
            }
            .invoice-type{
                .radioXinput{
                    border-bottom:1PX solid #eeeeee;
                }
                .radioXinput.disabled{
                    color:rgba(0, 0, 0, 0.3)!important;
                }
                .weui-cells{
                    margin-top:20px;
                    .weui-cell{
                        height:98px;
                        font-size:28px;/*px*/
                        color:#2d2d2d;
                        .vux-cell-bd{
                            p{
                                .vux-label{
                                    width: 190px;
                                }
                            }
                        }
                        .weui-cell__ft{
                            width: 100%;
                            .invoice-checked{
                                display: flex;
                                align-items: center;
                                div{
                                    width: 160px;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    input{
                                        width:46px;
                                        height:46px;
                                        outline: none;
                                        position: absolute;
                                        clip: rect(0, 0, 0, 0);
                                    }
                                    label{
                                        margin-right: 20px;
                                        display: block;
                                        border:2px solid #c9c9c9;
                                        border-radius: 50%;
                                        width:46px;
                                        height:46px;
                                        background:#fff;
                                    }
                                    input.checked + label{
                                        background:#fff  url(../assets/a3_icon.png) no-repeat center center;
                                        background-size: 100% 100%;
                                        border:0;
                                    }
                                    span{
                                        font-size:28px;/*px*/
                                        color:#2d2d2d;
                                        line-height:42px;
                                    }
                                }    
                            }
                        }
                    }
                    .weui-cell:before{
                        left: 0;
                        border-top:1PX solid #eeeeee;
                    }
                    .vux-x-input{
                        .weui-cell__bd{
                            font-size:28px;/*px*/
                            color:#666666;
                            height:100%;
                            .weui-input{
                                height:100%;
                            }
                        }    
                        .weui-cell__ft{
                            width:0;
                            overflow: hidden;
                        }
                        .weui-cell__hd{
                            width: 210px;
                        }
                    }
                    .vux-x-input.disabled{
                        color:rgba(0, 0, 0, 0.3);
                    }
                    .vux-x-textarea.disabled{
                        color:rgba(0, 0, 0, 0.3);
                    }
                    .vux-x-textarea{
                        height:auto;
                        .weui-cell__hd{
                            width: 210px;
                        }
                        .weui-textarea{
                            min-height:46px!important;
                            line-height: 1.5;
                        }
                        textarea:disabled{
                            background:#fff;
                        }
                    }
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
</style>