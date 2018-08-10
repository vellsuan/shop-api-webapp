<template>
    <div class="personalinfo">
        <x-header :left-options="{backText: ''}">个人信息</x-header>
        <div class="info-content">
            <group class="basis-info" label-width="3rem">
                <cell title="昵称" is-link>
                    <img slot="icon" src="../assets/tbgr_1@2x.png">
                    <x-input class="x-input" text-align="right" v-model="nickName" placeholder="请输入昵称" :max="6"></x-input>
                </cell>
                <cell title="真实姓名" is-link>
                    <img slot="icon" src="../assets/tbgr_2@2x.png">
                    <x-input class="x-input" required v-model="userName" placeholder="请输入真实姓名" :max="10"></x-input>
                </cell>
                <popup-radio title="性别" :options="sexs" v-model="gender">
                    <img slot="icon" src="../assets/tbgr_3@2x.png">
                </popup-radio>
                 <popup-radio title="证件类型" :options="cards" v-model="card">
                    <img slot="icon" src="../assets/tbgr_4@2x.png">
                </popup-radio>
                <cell title="证件号" is-link>
                    <img slot="icon" src="../assets/tbgr_5@2x.png">
                    <x-input class="x-input" required v-model="idNo" placeholder="请输入证件号码"></x-input>
                </cell>
                <cell title="生日" is-link>
                    <img slot="icon" src="../assets/tbgr_6@2x.png">
                    <button @click="showPlugin">{{birthday}}</button>
                </cell>
            </group>
            <group class="other-info" label-width="2rem">
                <router-link to="/bindemail">
                    <cell title="邮箱" label-width="1.5rem" is-link :value="Unbound" :class="{email:!email}">
                        <img slot="icon" src="../assets/tbgr_7@2x.png">
                    </cell>
                </router-link>
                <cell title="绑定手机号" :value="phone">
                    <img slot="icon" src="../assets/tbgr_8@2x.png">
                </cell>
                <!--引入一次datetime，一遍防止直接调用时间插件出现bug start -->
                <datetime style="display: none"></datetime>
                <!--引入一次datetime，一遍防止直接调用时间插件出现bug end -->
            </group>
        </div>
        <footer>
            <div class="sign-out" @click="submit">
                <span>保存</span>
            </div>
        </footer>
    </div>
</template>
<script>
import { XHeader, Cell, Group, XInput, PopupRadio, XButton, Datetime, dateFormat} from 'vux'
export default {
    components: {
        XHeader,
        Group,
        Cell,
        XInput,
        PopupRadio,
        XButton,
        Datetime
    },
    data () {
        return{
            nickName:'',
            userName:'',
            idType:'1',
            idNo:'',
            birthday:'',
            email:'',
            phone:'',
            cards:['身份证','护照','军官证'],
            card:'',
            sexs:['男','女'],
            gender:'',
            sex:"1",
            Unbound:''
        }
    },
    mounted () {
        const params = {
            url: "/userDetailCenter",
            data: {
                userId:JSON.parse(window.localStorage.getItem("userInfo")).userId
            }
        };
        this.api.post(params, res => {
            this.nickName = res.entity.nickName
            this.userName = res.entity.userName
            this.idType = res.entity.idType
            this.idNo = res.entity.idNo
            this.birthday = res.entity.birthday
            this.email = res.entity.email
            this.phone = res.entity.phone
            this.sex = res.entity.sex
            this.Unbound = this.email || "未绑定"
            this.card = this.cards[this.idType-1]
            this.gender = this.sexs[this.sex-1]
        });
    },
    methods: {
        // 生日弹出选择
         showPlugin () {
            let _this = this
            this.$vux.datetime.show({
                cancelText: '取消',
                confirmText: '确定',
                format: 'YYYY-MM-DD',
                startDate: "1900-01-01",
                endDate: dateFormat(new Date(), 'YYYY-MM-DD'),
                onConfirm (val) {
                    _this.birthday = val
                }
            })
        },
        // 保存用户信息
        submit(){
            let idType = this.cards.indexOf(this.card)+1
            if(!this.userName){
                this.$vux.toast.show({
                    text: '真实姓名不能为空',
                     type: "text"
                })
            }else if(!this.nickName){
                this.$vux.toast.show({
                    text: '昵称不能为空',
                    type: "text"
                }) 
            }else if(!this.idNo){
                this.$vux.toast.show({
                    text: '证件号码不能为空',
                    type: "text"
                })
            }else if(idType == 1 && !/^\d{14}\d{3}?\w$/.test(this.idNo)){
                this.$vux.toast.show({
                    text: '身份证输入有误',
                    type: "text"
                })
            }else if(idType == 2 && !/^1[45][0-9]{7}|G[0-9]{8}|P[0-9]{7}|S[0-9]{7,8}|D[0-9]+$/.test(this.idNo)){
                this.$vux.toast.show({
                    text: '护照输入有误',
                    type: "text"
                })
            }else if(idType == 3 && !/^[a-zA-Z0-9]{7,21}$/.test(this.idNo)){
                this.$vux.toast.show({
                    text: '军官证输入有误',
                    type: "text"
                })
            }else{
                 const params = {
                    url: "/addUserInfo",
                    data: {
                        userId:JSON.parse(window.localStorage.getItem("userInfo")).userId,
                        idNo: this.idNo,
                        idType: idType,
                        userName: this.userName,
                        birthday:this.birthday,
                        nickName: this.nickName,
                        sex: this.sexs.indexOf(this.gender)+1
                    }
                };
                this.api.post(params, res => {
                    this.$router.push("/")
                },true)
            }

        }
    },
    watch: {
        card(val, oldval){
            if(oldval != '' && val !== oldval){
                this.idNo = ''
            }
        }
    },
    beforeRouteLeave(to, from, next) {
        this.$vux.datetime.hide()
        next()
      }
}
</script>
<style lang="less">
    .personalinfo{
        background:#efeff4;
        height: 100%;
        display: flex;
        flex-direction: column;
        .weui-cell::after{
            border-color:#efeff4;
        }
        [class^="weui-icon-"]:before, [class*=" weui-icon-"]:before{
            margin-right: 0;
        }
        .vux-cell-value{
            color: #2d2d2d;
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
        .info-content{
            flex:1;
            overflow-y: auto;
            & > .basis-info{
                & > .weui-cells{
                    margin-top:20px;
                    & > .weui-cell{
                        background:#ffffff;
                        height:98px;
                        padding: 27px 30px 27px 30px;
                        & > .weui-cell__hd{
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            img{
                                height: 44px;
                                width: 44px;
                                margin-right: 20px;
                            }
                            span{
                                height: 44px;
                                width: 44px;
                                margin-right: 20px;
                            }
                        }
                        .vux-cell-bd{
                            p{
                                label{
                                    font-size:28px;/*px*/
                                    color:#bbbbbb;
                                }
                            }
                        }
                         & > .weui-cell__ft{
                            font-size:28px;/*px*/
                            color:#2d2d2d;

                            .x-input{
                                height: 94px;
                            }
                            input,button{
                                width: 320px;
                                display: block;
                                outline: none;
                                border: none;
                                font-size: 28px;/* px */
                                text-align: right;
                                background: #fff;
                                color: #2d2d2d;
                            }
                            button{
                                padding: 27px 0 27px 30px;
                            }
                        }
                       .weui-cell__ft:after{
                            /* color:#dedede;
                            height: 8PX;
                            width: 8PX */
                            display: none;
                        }
                    }
                    .weui-cell:before{
                        left: 0;
                        border-color:#efeff4;
                    }
                    .weui-cell_access .weui-cell__ft{
                        padding-right: 0px;
                    }
                    .vux-tap-active{
                        & > .weui-cell__ft{
                            padding: 0;
                            & > .x-input{
                                padding-right:0;
                            }
                        }
                    }
                }
            }
            .other-info{
                .weui-cells{
                    margin-top:20px;
                    .weui-cell{
                        background:#ffffff;
                        height:98px;
                        padding: 27px 30px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        .weui-cell__hd{
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            img{
                                height: 44px;
                                width: 44px;
                                margin-right: 20px;
                            }
                        }
                        .vux-cell-bd{
                            p{
                                label{
                                    font-size:28px;/*px*/
                                    color:#bbbbbb;
                                }
                            }
                        }
                        .weui-cell__ft{
                            font-size:28px;/*px*/
                            color:#2d2d2d;
                        }
                        .weui-cell__ft:after{
                            color:#dedede;
                            height: 8PX;
                            width: 8PX
                        }
                    }
                    .weui-cell:before{
                        left: 0;
                        border-color:#efeff4;

                    }
                    .email{
                        & > .weui-cell__ft{
                            font-size:28px;/*px*/
                            color:#ea5414;
                        }
                    }
                    .weui-cell_access{
                        .vux-cell-primary{
                            p{
                                label{
                                    width: 1.4rem !important;
                                }
                            }
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
            padding: 10px 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .sign-out{
                height:78px;
                width: 100%;
                background:#040404;
                border-radius:6px;
                display: flex;
                justify-content: center;
                align-items: center;
                span{
                    font-size:30px;/*px*/
                    color:#ffffff;
                }
            }
        }
    }
    .v-transfer-dom{
        .vux-popup-dialog{
            bottom: 98px;
            overflow:hidden;
            .weui-cells_radio{
                .weui-cell{
                    height: 98px;
                    .weui-cell__bd{
                        p{
                            span{
                                font-size: 32px;/*px*/
                            }
                        }
                    }
                    .weui-cell__ft{
                        .weui-icon-checked:before{
                            color: #B6A382
                        }
                    }
                }
            }
        }
    }

</style>
