<template>
    <div class="price-enjoy-order">
            <x-header :left-options="{backText: ''}">订单确认</x-header>
            <div class="contentOrder">
                <div class="box">
                    <div class="header"></div>
                    <div class="hotel-name">
                        <div class="hotel-name-top">
                            <span>{{hotelNameCn}}/{{roomTypeName}}/{{brandName}}</span>
                        </div>
                        <div class="hotel-name-bottom" @click="clickChooiceDay" >
                            <div class="check-in">
                                <span>{{choiceDate.showStartDate | dateToMMDD}}</span>
                                <span>周{{choiceDate.showStartDate | dateToDay}}&nbsp;入住</span>
                            </div>
                            <div>
                                <div>
                                    <span>共{{choiceDate.daysNum}}晚</span>
                                </div>
                                <div class="line"></div>
                            </div>
                            <div class="check-in">
                                <span>{{choiceDate.showEndDate  | dateToMMDD}}</span>
                                <span>周{{choiceDate.showEndDate  | dateToDay}}&nbsp;离店</span>
                            </div>
                        </div>
                    </div>
                    <!-- 左滑删除选中的旅游项目 -->
                    <!-- <swipeout>
                        <swipeout-item :threshold=".5" underlay-color="#ccc"  v-for="(item,index) in tourList" :key="index" >
                            <div slot="right-menu">
                                <swipeout-button @click.native="delTravelButtonClick(item)" background-color="#D23934">删除</swipeout-button>
                            </div>
                            <div slot="content" class="demo-content">
                                <div class="hotel-name">
                                    <div class="hotel-name-top tour-top">
                                        <span>{{item.routeTitle}}</span>
                                        <span>&yen;{{item.price}}</span>
                                    </div>
                                    <div class="hotel-name-bottom tour-bottom" @click="dateCheck =true;dayChooice=true;choiceId=index">
                                        <div class="check-in">
                                            <span>出游日期：{{item.showStartDate   | dateToMMDD}}</span>
                                            <span> 周{{item.showStartDate   | dateToDay}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </swipeout-item>
                    </swipeout> -->

                    <div class="hotel-name" v-for="(item,index) in tourList" :key="index">
                        <div class="hotel-name-top tour-top">
                            <span>{{item.routeTitle}}</span>
                            <span>&yen;{{item.price}}</span>
                        </div>
                        <div class="hotel-name-bottom tour-bottom" @click="dateCheck =true;dayChooice=true;choiceId=index">
                            <div class="check-in">
                                <span>出游日期：{{item.showStartDate   | dateToMMDD}}</span>
                                <span> 周{{item.showStartDate   | dateToDay}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <group class="form-justify" label-width="5.5em" label-margin-right="2em" label-align="left">
                    <!-- <x-number title="房间数量" align="right" v-model="numberValue" button-style="round" :min="1" :max="5"></x-number> -->
                    <popup-radio title="性别" :options="checkSex" v-model="checkinSex">
                        <p slot="popup-header" class="vux-1px-b demo3-slot">选择性别</p>
                        <template  slot-scope="props" slot="each-item">
                            <p><img :src="props.icon" class="vux-radio-icon" /><span>{{props.label}}</span></p>
                        </template>
                    </popup-radio>
                    <!-- <div class="weui-cell">
                        <div>住客数量</div>
                    </div> -->
                    <x-input title="住客姓名" v-model="checkinName"  name="username" placeholder="请输入姓名" :max="10"></x-input>
                    <!-- <popup-radio title="是否有婴儿" :options="options2" v-model="option2"></popup-radio> -->
                </group>
                <group class="form-message" label-width="5.5em" label-margin-right="2em" label-align="left">
                    <x-input title="联系手机" v-model="contactPhone" name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile"></x-input>
                    <x-input title="Email" v-model="contactEmail" name="email" placeholder="请输入邮箱地址" is-type="email"></x-input>
                </group>
                <group class="form-coupon" label-width="7em" label-margin-right="2em" label-align="left">
                    <x-switch title="使用优惠券"  v-model="isCoupon" @on-change="checkUseCoupon"></x-switch>
                    <cell v-show="isCoupon" title="可使用优惠券"  :value="couponListNum+'张可用'" is-link value-align="right"  @click.native="showCoupon" ></cell>
                    <x-switch title="可用积分"  :inline-desc="userPoints"  prevent-default  v-model="integralValue"  @on-click="pointChecked"></x-switch>
                     <x-input   :class="{integralDisplay:true}"  ref="consumptionPoints"  v-model="consumptionPoints" :min="1" :max="String(parseInt(this.userPoints)).length"  @on-change="changePoint"><span slot="right" class="">可抵用 <span class="pointmoney">{{pointsSum}}元</span></span> </x-input>
                     <x-switch title="使用会员卡" v-model="usehyCard"  prevent-default   @on-click="usehyCardChecked"  ></x-switch>
                    <cell title="会员卡信息" is-link  @click.native="addUserCard" v-show="usehyCard" class="cellHeight"></cell>
                    <div v-if="showUsehyCard" class="membership-card-info">
                        <div>
                            <span>卡号</span>
                            <span>{{discountCardNo}}</span>
                        </div>
                        <div>
                            <span>姓名</span>
                            <span>{{discountName}}</span>
                        </div>
                        <div>
                            <span>手机号</span>
                            <span>{{discountPhone}}</span>
                        </div>
                    </div>
                </group>

                <group class="form-amount">
                    <cell title="商品金额" :value="productTotalprice | productPrice"></cell>
                    <cell v-show="showUseCoupon" title="优惠券抵扣" :value="'-¥'+couponSum"></cell>
                    <cell v-show="showUsePoint" title="积分抵扣" :value="'-¥'+pointsSum"></cell>
                    <cell v-show="showUsehyCard" :title="userCardName" :value="'-¥'+userCardMoney"></cell>
                    <cell title="小计" :value="totalSum | productPrice"></cell>
                </group>
                <group class="form-invoice">
                    <x-switch title="开发票"  v-model="isInvoice"   @on-change="userInvoice"></x-switch>
                    <cell title="选择发票" :value="invoiceContent" is-link @click.native="changeInvoice" v-show="isInvoice"></cell>
                    <div class="weui-cell order-notes">
                        <div><span>订单备注</span></div>
                        <x-textarea :max="50" placeholder="请输入备注内容" v-model="remark" ></x-textarea>
                    </div>
                </group>
                <div class="tips">
                    <p>温馨提示：*抵达日期前7天取消预订,不收取费用作为违约费用. *抵达日期前3-6天取消预订,收取总费用的50%作为违约费用. *抵达日期前1-2天取消预订,收取总费用的90%作为违约费用.</p>
                    <p>*公众假期期间预订不可以更改及取消,已经支付的房费不予以退还.</p>
                </div>
            </div>
            <footer>
                <div class="total" @click="showPriceDetail=true">
                    <span>合计金额</span>
                    <span>&yen;{{totalSum}}</span>
                </div>
                <div @click="goPay">
                    <span>立即支付</span>
                </div>
            </footer>
            <!-- 选择支付方式 -->
            <div v-transfer-dom>
                <popup v-model="showPayPanel" is-transparent  style="height: 100%;background: rgba(0,0,0,0.6);">
                <Paypopup :totalSum="totalSum"  v-on:closePayPanel="closePayPanel" ></Paypopup>
                </popup>
            </div>
            <!--显示价格明细 -->
            <div v-transfer-dom>
                <popup v-model="showPriceDetail" is-transparent  style="height: 100%;background: rgba(0,0,0,0.4);">
                    <div class="priceBox">
                        <div class="userCadrdHeader">价格明细<x-icon type="ios-close-empty" preserveAspectRatio="xMidYMid meet" @click.native="showPriceDetail=false"></x-icon>
                        </div>
                        <ul>
                            <li class="priceList" v-for="(list,index) in roomPriceList" :key="index">
                                <div class="desr">
                                    <p>{{list.InHouseDate.substr(0,10)}}</p><p refs="tourPrice">&yen;{{Number(list.price).toFixed(2)}}</p>
                                </div>
                            </li>
                        </ul>
                        <div class="userCardbtn">
                            <p>总额</p><p refs="tourPrice">&yen;{{totalSum}}</p>
                        </div>
                    </div>
                </popup>
            </div>
            <!-- 输入会员卡 -->
            <div v-transfer-dom>
                <popup v-model="usehyCardAdd"  class="calenderPopup" position="bottom" @on-hide="checkUserCard">
                    <div class="useStyle">
                        <div class="userCadrdHeader">添加会员卡 <x-icon type="ios-close-empty" preserveAspectRatio="xMidYMid meet" @click.native="usehyCardAdd=false;usehyCard = false;discountCardNo='';discountName='';discountPhone='';authCode='';"></x-icon>
                        </div>
                        <group class="useStyleCard">
                            <x-input title="卡号" v-model="discountCardNo" type="number" keyboard="number" placeholder="请输入卡号">
                                <img slot="label" src="../assets/cardNumber.png">
                            </x-input>
                            <x-input title="姓名" v-model="discountName"   name="username"  placeholder="持卡人姓名">
                                <img slot="label" src="../assets/userName.png" >
                            </x-input>
                            <x-input title="手机号" type="number" v-model="discountPhone" keyboard="number" :max="15"  placeholder="请输入绑定的手机号">
                                <img slot="label" src="../assets/tbgr_8.png">
                            </x-input>
                            <x-input title="验证码" v-model="authCode" :show-clear="false" placeholder="请输入验证码">
                                <img slot="label" src="../assets/tbgr_9.png">
                                <div slot="right" class="send-verification-code">
                                    <!-- <x-button slot="right" type="primary" mini @click.native="getPhoneCode"  v-if="getVcodeStatus || vcodeTime < 0">发送验证码</x-button> -->
                                    <span @click="getPhoneCode" v-if="getVcodeStatus || vcodeTime < 0">获取验证码</span>
                                    <span class="countdown" v-else><countdown v-model="vcodeTime" :start="start" @on-finish="onFinish"></countdown>s</span>
                                </div>
                            </x-input>
                        </group>
                        <div class="userCardbtn">
                            <x-button @click.native="verifyPhoneCode">确定</x-button>
                        </div>
                    </div>
                </popup>
            </div>
            <!-- 查看优惠卷 -->
            <div v-transfer-dom>
                <popup v-model="showCouponList"  class="calenderPopup" position="bottom" @on-hide="checkUserCoupon">
                    <div class="coupon">
                        <div class="userCadrdHeader">优惠券<x-icon type="ios-close-empty" preserveAspectRatio="xMidYMid meet" @click.native="showCouponList=false;isCoupon = false;"></x-icon>
                        </div>
                        <group class="useStyleCard">
                           <checker v-model="couponChecked" default-item-class="check-item" selected-item-class="check-item-selected">
                                <ul>
                                    <!-- <li class="couponList" v-for="(list,index) in couponList" :key="index">
                                        <checker-item :value="list" ></checker-item>
                                        <div class="checkImg" :class="list.flag?'active':''" @click="checkCoupon(list)"></div>  //之前注释过的
                                        <div class="desr">
                                            <p>{{list.couponsTypeName}}</p><span>|</span><p refs="tourPrice">价值{{list.Cash}}</p>
                                            <span>|</span><p>有效期截止到{{list.UseEnd.substr(0,10)}}</p> //之前注释过的
                                        </div>
                                    </li> -->
                                    <li class="couponList" v-for="(list,index) in couponList" :key="index">
                                        <checker-item :value="list" ></checker-item>
                                        <div class="coupon-price">
                                            <img v-if='list.CouponUse == "N"' src="../../usercenter/assets/yh_fang@2x.png" alt="fang">
                                            <div v-else-if='list.CouponUse == "CASH"' class="cash">{{list.Cash | intNumber}}<span>元</span></div>
                                            <span v-if='list.CouponUse == "N"'>抵房券</span>
                                            <span v-if='list.CouponUse == "CASH"'>满{{list.LeastCost}}元减</span>
                                        </div>
                                        <div class="coupon-introduce">
                                            <div class="top-introduce">
                                                <p>{{list.couponsTypeName}}</p>
                                                <span>优惠码：{{list.SerialNumber}}</span>
                                            </div>
                                            <div class="bottom-introduce">
                                                <p>有效日期至:{{list.UseEnd | substringStr}}</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </checker>
                        </group>
                        <div class="userCardbtn">
                            <x-button @click.native="sureCheckCoupon">确定</x-button>
                        </div>
                    </div>
                </popup>
            </div>
            <!-- 选择发票 -->
            <div v-transfer-dom>
                <popup v-model="isInvoiceShow" class="calenderPopup" position="bottom"  @on-hide="checkInvoice">
                    <div class="invoice">
                        <div class="userCadrdHeader">选择发票类型 <x-icon type="ios-close-empty" preserveAspectRatio="xMidYMid meet" @click.native="closeInvoice"></x-icon>
                        </div>
                        <group class="invoice-type">
                            <cell title="发票类型" class="radioXinput">
                                <div slot="default" class="invoice-checked">
                                    <div @click="isActiveSi=true;isActiveRi=false;">
                                        <input type="radio" name="pay" value="2" :class="{ checked: isActiveSi }">
                                        <label for=""></label>
                                        <span>专票</span>
                                    </div>
                                    <div @click="isActiveSi=false;isActiveRi=true;">
                                        <input type="radio" name="pay" value="1" :class="{ checked: isActiveRi }">
                                        <label for=""></label>
                                        <span>普票</span>
                                    </div>
                                </div>
                            </cell>
                            <div v-if="isActiveSi">
                            		<x-textarea title="单位名称" style="display: none;" text-align="left" :height="29"></x-textarea>
                                <x-textarea title="单位名称"  v-model="companyName" text-align="left" :height="29" :show-counter="false" :rows="1" autosize></x-textarea>
                                <x-textarea title="注册地址"  v-model="registerAddress" text-align="left"  :height="29" :show-counter="false" :rows="1" autosize> </x-textarea>
                                <x-input title="税号" v-model="taxCode"  text-align="left"></x-input>
                                <x-input type="number" title="注册电话" :min="10" :max="15"  v-model="registerTel"    text-align="left"  novalidate  @on-blur="verifyTel"  keyboard="number" ></x-input>
                                <x-input title="开户银行" v-model="accountBank"   text-align="left" ></x-input>
                                <x-input title="银行账号" :min="15" :max="23" v-model="accountNo"  keyboard="number" mask="9999 9999 9999 9999 999"   text-align="left" novalidate   @on-blur="verifyNo" ></x-input>
                                <x-input title="开票金额" disabled  :value="totalSum | productPrice"   text-align="left"></x-input>
                            </div>
                            <div v-else-if="isActiveRi">
                                <x-textarea title="发票抬头"  v-model="invoiceTitle" :max="50" :rows="4" autosize text-align="left" show-counter></x-textarea>
                                <x-input title="开票金额" disabled :value="totalSum | productPrice" text-align="left"></x-input>
                            </div>
                        </group>
                        <div class="invoiceBtn">
                            <div @click="onSubmit">提交</div>
                        </div>
                    </div>
                </popup>
            </div>
            <!-- 根据不同情况调用日期组件 -->
            <div v-transfer-dom>
                <popup class="calenderPopup"  hide-on-blur v-model="dateCheck"  position="bottom" @on-hide="dateCheck=false">
                    <calender
                        v-if="dateCheck"
                        :date="new Date(newDate)"
                        :monthNumber="4"
                        v-on:asureEvent="asureClick"
                        :onlyOne="dayChooice"
                        :dateObj="choiceDate"
                        v-on:closeChangeDate="closeChangeDate"
                        ></calender>
                </popup>
            </div>
    </div>
</template>
<script>
import { XHeader, Group, Cell, XInput, Selector, PopupPicker, XNumber, XTextarea, XSwitch, PopupRadio,Popup,XButton,Swipeout, SwipeoutItem, SwipeoutButton, trim, Countdown,Checker, CheckerItem} from 'vux'
import Calender from '@/components/calender'
import Paypopup from '@/components/paypopup'
import { mapState, mapMutations, mapActions } from 'vuex'
import _moment from "moment";
import womanIcon from "../assets/pic_thumb.jpg";
import manIcon from "../assets/pic_hd.jpg";

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
        PopupRadio,
        Popup,
        Calender,
        Paypopup,
        Swipeout,
        SwipeoutItem,
        SwipeoutButton,
        Checker,
        CheckerItem,
        XButton,
        Countdown
    },
    data () {
        return {
            show2:false,
            show1:true,
            numberValue: 1,                        //房间数量
            checkinSex: '请选择',                       //称呼首选
            checkSex:[ {
                key: '1',
                icon:manIcon,
                value: '男'
            }, {
                key: '2',
                icon:womanIcon,
                value: '女'
            }],     //称呼
            option2: '否',
            options2: ['是', '否'],
            userInfo:{},                          //用户信息
            contactEmail:'',                     //邮箱
            userPoints:"",                       //当前用户所拥有的积分总额
            creditPro:1,                          //积分兑换金额的比例
            consumptionPoints:"",                         //输入的想要兑换的积分
            pointsSum:0,                       //该积分对应的金额
            showUsePoint:false,                   //是否展示下面计算价钱的积分抵扣
            couponCode:"",	//优惠劵码	string
            couponSum:0,	//优惠劵抵扣金额
            integralValue: false,                //是否使用积分
            integralDisabled:false,            //是否禁用积分选择
            usehyCard:false,                     //是否使用会员卡
            usehyCardAdd:false,                  //是否展开添加会员卡页面
            cardRate:1,                          //会员卡打折率
            userCardName:"",                      //会员卡名字
            userCardMoney:0,                    // 会员卡折扣价
            authCode:"",	                    //验证码	string
            getVcodeStatus: true,
            vcodeTime: 60,
            start: false,
            discountCardNo:"",	                  //打折卡号	string
            discountName:"",	                  //打折卡姓名	string
            discountPhone:"",	                  //打折卡手机号	string
            showUsehyCard:false,                 //显示打折卡详情
            isActivewx:true,                     //微信支付
            isActiveAlipay : false,              //支付宝支付
            dateCheck:false,                    //是否显示日期选择器
            dayChooice:false,                   //判断选择住宿日期 还是旅游项目日期
            showPayPanel:false,                 //是否展示支付方式
            choiceId:0,                      //记录当前选择的旅游项目的下标
            newDate:0,                         //获取到的系统时间
            choiceDate:{                        //时间选择
                showStartDate: "",              //开始日期
                showEndDate:"",                 //结束日期
                daysNum: 1                      //日期间隔
            },
            brandName:this.$store.state.roomDetails.brandName,	   //品牌名称
            hotelNameCn:this.$store.state.roomDetails.hotelNameCn,   //酒店中文名称
            hotelNameEn:this.$store.state.roomDetails.hotelNameEn,   //酒店英文名称
            roomTypeName:this.$store.state.roomDetails.roomTypeName,  //房型名称
            tourList:[],        //旅游项目列表
            checkinName:"",     //入住人姓名
            contactPhone:"",    //联系手机
            isCoupon:false,      //是否使用优惠券
            showCouponList:false,      //优惠列表展示
            showUseCoupon:false,        //是否展示下面计算价钱的优惠卷
            couponList:[],          //优惠列表
            couponChecked:[],         //优惠券选中value
            checkCouponSure:false,    //是否点击了提交所选优惠卷按钮
            couponListNum:0,        //优惠卷数量
            isFreebus:false,	    //是否接送服务
            isInvoice:false,		//是否需要发票
            showInvoice:false,     //发票详情
            isInvoiceShow:false,   //发票选择展示
            invoiceContent:"专票",       //
            invoiceType:1,         //发票类型
            isActiveSi:true,          //专票
            isActiveRi:false,          //普票
            invoiceTitle:"",       //发票抬头
            accountBank:"",        //开户银行
            accountNo:"",          //银行账号
            companyName:"",        //单位名称
            registerAddress:"",    //单位地址
            registerTel:"",        //注册电话
            taxCode:"",             //税号
            isItem:false,			//是否选择精品项目
            categoryCode:[],
            itemCode:[],
            itemPrice:[],
            additionalItem:[],       //精品项目|附加项目
            itemQuantity:[],
            isParking:false,		//是否预留车位
            roomSum:this.$store.state.roomDetails.roomSum,	        //当前时间一天的房费
            totalSum:0,	        //订单总金额
            productTotalprice:0,  //商品金额
            availableRooms:"",  // 房间数量
            roomTotalprice:0,  //所选日期范围内的房间总金额
            roomPriceList:[],  //所选日期范围内的房间每日金额
            allRoomPrice:0,  //房间总金额
            remark:"",             //备注信息
            orderNo:"",           //订单编号
            orderId:"",           //订单ID
            paySum:"",           //支付金额	number
            payType:"",           //支付方式
            showPriceDetail:false,      //价钱明细
            isClickClose:true,        //判断是否点击了关闭按钮

        }
    },
    created(){
        //下单页面返回详情页
        window.onpageshow = function (e) {
            if (e.persisted) {
                window.location.reload(true)
            }
        }
    },
    mounted(){
        //微信初始化
         this.wxAauthSDK()
         console.log(this.startTime,this.checkinDate,"ced");
         this.$nextTick(()=>{
            this.dateCheck=false;
        })
        if(this.checkinDate==""){
            this.getSystemTime();
        }else{
            var daysNum=(_moment(this.checkoutDate).format('X') - _moment(this.checkinDate).format('X')) / (24 * 60 * 60);
            this.getParams(this.startTime*1000,this.checkinDate,this.checkoutDate,daysNum);
        }
        if(JSON.parse(localStorage.getItem("userInfo"))){
            this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
            this.getUserPoints();
        }
        // if(this.$store.state.isUseInvoice){
        //         this.isInvoice=true;
        //     if(this.$store.state.invoiceType==2){
        //         this.invoiceContent="专票";
        //         this.invoiceType=2;
        //         this.invoiceTitle=this.$store.state.invoiceContent.invoiceTitle;
        //     }else if(this.$store.state.invoiceType==1){
        //         this.invoiceContent="普票";
        //         this.invoiceType=1;
        //         this.accountBank=this.$store.state.invoiceContent.accountBank;     //开户银行	string
        //         this.accountNo=this.$store.state.invoiceContent.accountNo;	     //银行账号	string
        //         this.companyName=this.$store.state.invoiceContent.companyName;	     //单位名称	string
        //         this.registerAddress=this.$store.state.invoiceContent.registerAddress;	 //单位地址	string
        //         this.registerTel=this.$store.state.invoiceContent.registerTel;	     //注册电话	string
        //         this.taxCode=this.$store.state.invoiceContent.taxCode;	         //税号	string
        //     }
        // }else{
        //     this.isInvoice=false;
        // }
    },
    computed:mapState({
      // 映射 this.checkinDate 为 store.state.checkInOutInfo.checkinDate
      checkinDate (state) {
        return state.checkInOutInfo.checkinDate
      },
      checkoutDate (state) {
        return state.checkInOutInfo.checkoutDate
      },
      startTime (state) {
        return state.checkInOutInfo.startTime
      },
      checkDays (state) {
        return  (_moment(state.checkoutDate).format('X') - _moment(state.checkinDate).format('X')) / (24 * 60 * 60)
      }
    }),
    methods:{
        ...mapActions([
            'checkInOutInfo',
            'selectTourCode',
            'roomDetails'
        ]),
        ...mapMutations([
            'IS_USE_INVOICE',
            'INVOICE_TYPE',
            'INVOICE_CONTENT'
        ]),

        clickChooiceDay(){
            // console.log(this.newDate,"222313123ds");
            this.dateCheck =true;
            this.dayChooice=false;
        },
        // 获取系统时间
        getSystemTime(){
            const timeParams = {
                url : '/index/getSystemTime'
            }
            this.api.post(timeParams, res=> {
                let sysTime = res && res.sysTime;
                this.newDate=sysTime;
                let nowDate=_moment(sysTime).format("YYYY-MM-DD");
                let endDate=_moment(sysTime+ 24 * 60 * 60 * 1000).format("YYYY-MM-DD");
                this.checkInOutInfo({
                    checkinDate: nowDate,
                    checkoutDate: endDate,
                    startTime:_moment(sysTime).unix()
                })
                this.getParams(sysTime,nowDate,endDate,1);
            });
        },
        //根据时间获取相应的数据信息
        getParams(sysTime,nowDate,endDate,daysNum){
            this.newDate=sysTime;
            this.choiceDate.showStartDate=nowDate;
            this.choiceDate.showEndDate=endDate;
            this.choiceDate.daysNum=daysNum;
            let array=this.$store.state.selectTourCode;
            let beginDate=[];
            if(array.length>0){
                for(var i in array){
                    beginDate.push(nowDate);
                }
                const tourParams = {
                    url: "/getTourDetailsByCode",
                    data: {
                        arrival: nowDate, //入住日期
                        beginDate: beginDate.join(","), //旅游项目开始时间
                        departure:endDate, //离店日期
                        hotelCode:this.$store.state.roomDetails.hotelCode, //房型code
                        itemCode: array.join(","), //旅游项目code
                        langId: "CN"
                    }
                };
                this.getTourDetailsByCode(tourParams);
            }
            this.getRoomDayPrice({
                    showStartDate:nowDate,
                    showEndDate:endDate,
                    daysNum:daysNum
                });
        },
        // 获取选择的旅游路线的信息
        getTourDetailsByCode(tourParams){
            this.api.post(tourParams, res => {
                this.tourList=res&&res.list;
                for(var i in this.tourList){
                    this.tourList[i].showStartDate=this.choiceDate.showStartDate;
                }
                this.getTotalPrice();
            });
        },
        // 获取房间的详细信息
        getRoomDetailsByCode(roomParams){
            roomParams = {
                url: "/priceenjoydetails",
                data: {
                    arrival: nowDate, //开始时期
                    beginDate: beginDate.join(","), //旅游项目开始时间
                    departure:endDate, //结束时间
                    hotelCode:this.$store.state.roomDetails.hotelCode, //房型code
                    itemCode: array.join(","), //旅游项目code
                    langId: "CN"
                }
            };
            this.api.post(roomParams, res => {
                console.log(res,"roomDetails");
            });
        },
        // 查询每日房价及房量
        getRoomDayPrice(dateJson){
            console.log(dateJson,"sdgayfsua");
            var dayParams={
                url: "/getHotelDayPrice",
                data: {
                    adultNum:"1",	//成人数量
                    arrival:dateJson.showStartDate, 	//入住日期	YYYY-MM-DD
                    departure:dateJson.showEndDate,	//离店日期	YYYY-MM-DD
                    hotelCode:this.$store.state.roomDetails.hotelCode,	//	酒店Code
                    rateCode:this.$store.state.roomDetails.rateCode,	//	房价代码
                    roomCode:this.$store.state.roomDetails.roomCode,	//	房型Code
                    roomNum:"1",	//	房间数量
                // 选填参数
                    account:"",	//	客户协议号
                    cardLevel:"",	//	会员卡级别
                    cardNo:"",	//	会员卡号
                    cardType:""	//	会员卡类型
                }
            }
            this.api.post(dayParams, res => {
                this.availableRooms=res.availableRooms;
                if(res.availableRooms<=0 || res.availableRooms==""){
                    this.$vux.toast.text("所选时间内无房","middle");
                    this.dateCheck=false;
                }else{
                    console.log(dateJson,"sdjufsu");
                    this.choiceDate.showStartDate=dateJson.showStartDate;
                    this.choiceDate.showEndDate=dateJson.showEndDate;
                    this.choiceDate.daysNum=dateJson.daysNum;
                    if(dateJson.startDate){
                        this.checkInOutInfo({
                            checkinDate: dateJson.startDate.format,
                            checkoutDate: dateJson.endDate.format
                        })
                    }
                    
                    this.roomPriceList=res.listDaily;
                    this.roomTotalprice=res.roomSum;
                    this.allRoomPrice=res.roomSum;
                    this.getTotalPrice();
                    this.dateCheck=false;
                }
            });
        },
        //判断是否使用优惠卷
        checkUseCoupon(){
            if(!this.isCoupon){
                this.showCouponList=false;
                this.showUseCoupon=false;
                this.couponCode="";	//优惠券码	string
                this.couponSum="";	//优惠券抵扣金额	string
                this.integralDisabled=false;
            }else{
                if(this.usehyCard){
                    this.usehyCard=false;
                    this.usehyCardAdd=false;
                    this.showUsehyCard=false;
                    this.discountCardNo="";	//打折卡号
                    this.discountName="";     //姓名
                    this.discountPhone="";
                    this.authCode="";
                }
                this.getCouponList();
            }
            this.getTotalPrice();
        },
        showCoupon(){
            if(this.couponListNum<=0){
                this.$vux.toast.text("您无可用优惠券","middle");
                return false;
            }else{
                this.showCouponList=true;
                this.checkCouponSure=false;
            }
        },
        // //选择想要使用的优惠卷
        // checkCoupon(value, disabled){
        //     console.log(this.couponChecked.SerialNumber,this.couponChecked.Cash,"111111");
        //     //  console.log(value.Cash,value.SerialNumber, disabled,"xuanze");
        //         // this.couponCode=value.code;
        //         this.couponCode=this.couponChecked.SerialNumber;
        //         this.couponSum=this.couponChecked.Cash;
        // },
        //点击确定提交想要使用的优惠卷
        sureCheckCoupon(){
            // console.log(this.couponChecked.SerialNumber,this.couponChecked.Cash,"111111");
            this.couponCode=this.couponChecked.SerialNumber;
            this.couponSum=this.couponChecked.Cash;
            if(this.couponChecked&&this.couponCode&&this.couponSum){
                this.getTotalPrice();
                // console.log(this.roomTotalprice,this.couponSum,"ssss");
                if(this.integralValue&&(Number(this.allRoomPrice)==Number(this.couponSum))){
                    this.consumptionPoints="";
                    this.pointsSum=0;
                    this.integralValue=false;
                    this.showUsePoint=false;
                }
                this.showCouponList=false;
                this.showUseCoupon=true;
                this.checkCouponSure=true;
            }else{
                this.checkCouponSure=false;
                this.$vux.toast.text("请选择你想要使用的优惠券","middle");
                return false;
            }
        },
        //判断蒙层消失时是否提交信息
        checkUserCoupon(){
            if(this.couponChecked&&this.checkCouponSure){


            }else{
                this.showCouponList=false;
                this.isCoupon = false;
                this.couponChecked=[];
            }
        },
        //获取优惠卷信息
        getCouponList(){
            let params={
                url: "/getCouponList",
                data: {
                    CouponUse:"CASH,N",       //优惠券种类（CASH-代金券 N-其他礼券 FREE - 免费券 DISCOUNT-折扣券
                    arrival:this.$store.state.checkInOutInfo.checkinDate,         //入住日期
                    cardNo:this.userInfo.cardNo,          //会员卡号
                    cashSort:"1",               //如果要倒序排 此项不能为空 如果不按照金额倒叙排 此项为空
                    departure:this.$store.state.checkInOutInfo.checkoutDate,       //离店日期
                    hotelCode:this.$store.state.roomDetails.hotelCode,       //酒店code
                    orderPrice:"",      //订单（房间）金额
                    rateCode:this.$store.state.roomDetails.rateCode,        //房价code
                    roomCode:this.$store.state.roomDetails.roomCode,        //房型code
                    status:"1"          //礼券状态（ 1未使用 2 已使用 3已过期）
                }
            }
            this.api.post(params, res => {
                // console.log(res.list.length,"优惠券");
                if(res && res.list && res.list.length > 0){
                    this.couponList=res.list;
                    this.couponListNum=res.list.length;
                    this.couponChecked=this.couponList[0];
                    this.couponCode=this.couponChecked.SerialNumber;
                    this.couponSum=this.couponChecked.Cash;
                    this.showUseCoupon=true;
                    this.isCoupon=true;
                    this.getTotalPrice();
                }else{
                    this.$vux.toast.text("您无可用优惠券","middle");
                    this.showUseCoupon=false;
                    this.isCoupon=false;
                }
                // console.log(this.couponChecked.SerialNumber,this.couponChecked.Cash,"222322");
            });
        },
        // 查询当前用户的积分
        getUserPoints(params){
            params={
                url: "/getUserPoints",
                data: {
                    cardNo:this.userInfo.cardNo,	//	会员卡号
                }
            }
            this.api.post(params, res => {
                this.userPoints=res.memberInfo.Points;
                this.creditPro=res.creditPro;
                // console.log(res,"jifenbili");
            });
        },
        //点击选择是否使用积分
        pointChecked(newVal, oldVal){
            if(this.isCoupon&&this.roomTotalprice<=0&&!this.integralValue){
                this.$vux.toast.text("当前房费已被抵扣完","middle");
                return false;
            }else{
                // this.userPoints=10
                if(this.userPoints==0){
                    this.$vux.toast.text("您无可用积分","middle")
                }else{
                    this.integralValue=newVal;
                    if(this.integralValue){
                        if(this.usehyCard){
                            // console.log(this.roomTotalprice,this.allRoomPrice,"会员卡钱");
                            this.consumptionPoints=Number(this.allRoomPrice)/this.creditPro;
                        }else{
                            this.consumptionPoints=Number(this.roomTotalprice)/this.creditPro;
                        }
                        if(this.isCoupon&&this.roomTotalprice>0){
                            this.consumptionPoints=Number(this.roomTotalprice)/this.creditPro;
                        }
                        this.$refs.consumptionPoints.focus();
                        this.showUsePoint=true;
                    }else if(this.isCoupon){
                        this.consumptionPoints="";
                        this.pointsSum=0;
                        this.integralValue=false;
                        this.showUsePoint=false;
                    }else{
                        this.consumptionPoints="";
                        this.pointsSum=0;
                        this.integralValue=false;
                        this.showUsePoint=false;
                    }
                }
            }
            this.getTotalPrice();
        },
        //输入想要使用的积分数
        changePoint(val){
            var rgx=/^[1-9]\d*$/;
            if(this.integralValue){
                if(rgx.test(this.consumptionPoints)){
                    if(Number(this.consumptionPoints) >= Number(this.userPoints)){
                        this.consumptionPoints=this.userPoints;
                    }
                    this.pointsSum=Number(this.consumptionPoints)*this.creditPro;
                    if(this.isCoupon){
                        if(Number(this.pointsSum)>(Number(this.allRoomPrice)-Number(this.couponSum))){
                            this.consumptionPoints=(Number(this.allRoomPrice)-Number(this.couponSum))/this.creditPro;
                            this.pointsSum=(Number(this.allRoomPrice)-Number(this.couponSum)).toFixed(2);
                            this.$vux.toast.text("您输入的积分大于当前房费","middle");
                        }
                    }else{
                        if(Number(this.pointsSum)>Number(this.allRoomPrice)){
                            this.pointsSum=Number(this.allRoomPrice);
                            this.$vux.toast.text("您输入的积分大于当前房费","middle");
                            this.consumptionPoints=Number(this.allRoomPrice)/this.creditPro;
                        }
                    }
                    this.$refs.consumptionPoints.reset(val = this.consumptionPoints);
                    this.getTotalPrice();
                    return  false;
                }else if(this.consumptionPoints==""){
                     this.pointsSum=0;
                     this.getTotalPrice();
                }else{
                    this.$vux.toast.text("积分输入不正确","middle");
                    this.consumptionPoints="";
                    this.pointsSum=0;
                    this.getTotalPrice();
                    return false;
                }
            }
        },
        // 根据积分查询对应的金额
        // getPointMoney(params){
        //     params={
        //         url: "/getPointMoney",
        //         data: {
        //             cardNo:this.userInfo.cardNo,	//	会员卡号
        //             credit:this.consumptionPoints||0,	//	积分	string	必填
        //             userId:this.userInfo.userId	//	用户id
        //         }
        //     }
        //     this.api.post(params, res => {
        //         this.pointsSum=res&&res.ct;
        //         if(this.isCoupon){
        //             if(Number(this.pointsSum)>(Number(this.allRoomPrice)-Number(this.couponSum))){
        //                 this.$vux.toast.text("您输入的积分大于当前房费","middle");
        //                 this.pointsSum=(Number(this.allRoomPrice)-Number(this.couponSum)).toFixed(2);
        //             }
        //         }else if(this.showUsehyCard){
        //             this.roomTotalprice=Number(this.roomTotalprice)*Number(this.cardRate);
        //             if(Number(this.pointsSum)>(Number(this.roomTotalprice)*Number(this.cardRate))){
        //                 this.$vux.toast.text("您输入的积分大于当前房费","middle");
        //                 this.pointsSum=(Number(this.roomTotalprice)*Number(this.cardRate)).toFixed(2);
        //             }
        //         }else{
        //             if(Number(this.pointsSum)>Number(this.allRoomPrice)){
        //                 this.$vux.toast.text("您输入的积分大于当前房费","middle");
        //                 this.pointsSum=Number(this.allRoomPrice);
        //             }
        //         }
        //         this.consumptionPoints=Number(this.pointsSum)/this.creditPro;
        //         this.getTotalPrice();
        //     },false,errmsg => {
        //         this.$vux.toast.text(errmsg,"middle")
        //     });
        // },
        // 使用会员卡给该手机号发送验证码
        getPhoneCode(params){
            if(this.discountCardNo&&this.discountName&&this.discountPhone){
                params={
                    url: "/getPhoneCode",
                    data: {
                        cardNo:this.discountCardNo,	//打折卡号
                        name:this.discountName,     //姓名
                        phone:this.discountPhone,     //手机号
                        smsChannel:"1028",      //渠道
                        langId:"CN"    //语言
                    }
                }
                this.api.post(params, res => {
                    console.log(res,"getPhoneCode");
                    if(res.phoneVacodeId){
                        this.start = true;
                        this.getVcodeStatus = false;
                    }
                },false,errmsg => {
                    this.$vux.toast.text(errmsg,"middle")
                });
            }else{
                this.$vux.toast.text("请输入会员卡信息","middle")
            }
        },
        //倒计时结束后触发的方法
        onFinish (index) {
            this.start = false;
            this.vcodeTime = 60;
            this.getVcodeStatus = true;
        },
        usehyCardChecked(newVal,oldVal){
                this.usehyCard=newVal;
                if(!this.usehyCard){
                    this.usehyCardAdd=false;
                    this.showUsehyCard=false;
                    this.discountCardNo="";	//打折卡号
                    this.discountName="";     //姓名
                    this.discountPhone="";
                    this.authCode="";
                }else{
                    if(this.isCoupon){
                        this.isCoupon=false;
                        this.couponCode="";	//优惠码	string
                        this.couponSum="";	//优惠抵扣金额	string
                    }
                }
            this.getTotalPrice();
        },
        //添加会员信息
        addUserCard(){
            this.usehyCardAdd=true;
        },
        //判断蒙层消失时是否提交信息
        checkUserCard(){
            if(this.showUsehyCard){
                this.usehyCardAdd = false;
                this.usehyCard= true;
            }else{
                this.usehyCardAdd=false;
                this.usehyCard = false;
                this.discountCardNo='';
                this.discountName='';
                this.discountPhone='';
                this.authCode='';
            }
        },
        // 使用会员卡验证该手机验证码
        verifyPhoneCode(params){
            if(this.discountCardNo&&this.discountName&&this.discountPhone&&this.authCode){
                params={
                    url: "/verifyPhoneCode",
                    data: {
                        cardNo:this.discountCardNo,	//	打折卡号
                        name:this.discountName,     //姓名
                        phone:Number(this.discountPhone),     //手机号
                        code:this.authCode,   //验证码
                        phoneVacodeId:"2", //验证码标识
                        langId:"CN"    //语言
                    }
                }
                this.api.post(params, res => {

                    // console.log(res,"verifyPhoneCode");
                    this.usehyCardAdd=false;
                    this.showUsehyCard=true;
                    this.userCardName="会员卡"+(res.rebate*10)+"折特权"
                    this.cardRate=res.rebate;
                    this.getTotalPrice();
                },false,errmsg => {
                    this.$vux.toast.text(errmsg,"middle");
                });
            }else{
                this.$vux.toast.text("会员卡信息不完整","middle")
            }

        },
        // 提交订单
        goPay(){
            if(this.isActiveSi){
                this.invoiceType=2;
            }else if(this.isActiveRi){
                this.invoiceType=1;
            }
            if(this.tourList.length>0){
                this.isItem=1;
                for(let i=0;i<this.tourList.length;i++){
                    // this.categoryCode.push(this.tourList[i].categoryCode);
                    // this.itemCode.push(this.tourList[i].itemCodes);
                    // this.itemPrice.push(this.tourList[i].price);
                    // this.itemQuantity.push(1);
                    this.additionalItem[i]={
                        'beginDate':this.tourList[i].showStartDate,
                        'categoryCode':this.tourList[i].categoryCode,
                        'endDate':this.tourList[i].showStartDate,
                        'itemCode':this.tourList[i].itemCodes,
                        'itemPrice':String(this.tourList[i].price),
                        'itemQuantity':"1"
                    };
                }
            }
            var phoneReg=/1[34578]\d{9}/;
            if(!phoneReg.test(this.contactPhone)){
                this.$vux.toast.text("联系手机格式不正确","middle");
                this.contactPhone="";
                return false;
            }
            var emailReg=/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
            if(!emailReg.test(this.contactEmail)){
                this.$vux.toast.text("联系人邮箱格式不正确","middle");
                this.contactEmail="";
                return false;
            }
            //验证是否选择性别
            if(this.checkinSex != 1 && this.checkinSex != 2){
                this.$vux.toast.text("请选择住客性别","middle");
                return false
            }
          //800303
          //13116176325
          //刘德华
        //   console.log(this.consumptionPoints,this.pointsSum,"jifen");
            const  orderParams={
                url: "/submitOrder",
                data:{
                    cardNo:this.userInfo.cardNo,	//会员卡号	string	会员必传散客不传
                    isdiscountCard:this.usehyCard?1:0, //0不打折1打折
                    authCode:this.usehyCard?this.authCode:"",	//验证码	string
                    discountCardNo:this.usehyCard?this.discountCardNo:"",	//打折卡号	string
                    discountName:this.usehyCard?this.discountName:"",	//打折卡姓名	string
                    discountPhone:this.usehyCard?this.discountPhone:"",	//打折卡手机号	string
                    phoneVacodeId:this.usehyCard? 2 : "",	//验证码记录id	number
                    adultNum:1,	//成人数量	string
                    checkinDays:this.choiceDate.daysNum || 1,	//入住天数	string
                    checkinName:this.checkinName || "",	//入住人姓名	string
                    checkinSex:this.checkinSex || 0,	//入住人性别	string	1-男，2-女，0-未知
                    checkinTime:this.choiceDate.showStartDate,	//入住日期	string	YYYY-MM-DD
                    checkoutTime: this.choiceDate.showEndDate,	//离店日期	string	YYYY-MM-DD
                    childNum:0,	//儿童数量	string
                    // childInfo:"",	//儿童信息	string	格式说明：儿童姓名:儿童生日(yyyy-MM-dd);儿童姓名:儿童生日(yyyy-MM-dd)(childNum>0时);
                    contactName:this.checkinName,	//联系人姓名	string
                    contactPhone:this.contactPhone,	//联系手机	string
                    hotelCode:this.$store.state.roomDetails.hotelCode,	//酒店Code	string
                    infantNum:0,	//婴儿数量	string
                    isCoupon:this.isCoupon?0:1,	//是否优惠券	string	0-是，1-否
                    couponCode:this.isCoupon?this.couponCode:"",	//优惠券码	string
                    couponSum:this.isCoupon?this.couponSum:"",	//优惠券抵扣金额	string
                    isFreebus:this.isFreebus?1:0,	//是否接送服务	string	0-否，1-是
                    // arriveNo:this.isFreebus?this.arriveNo:"",	//抵达航班号/车次	string
                    // arriveStation:this.isFreebus?this.arriveStation:"",	//抵达地点	string
                    // arriveTime:this.isFreebus?this.arriveTime:"",	//抵达时间	string	yyyy-MM-dd HH:mm:ss
                    // departNo:this.isFreebus?this.departNo:"",	//离开航班号/车次	string
                    // departStation:this.isFreebus?this.departStation:"",	//离开地点	string
                    // departTime:this.isFreebus?this.departTime:"",	//离开时间	string	yyyy-MM-dd HH:mm:ss
                    // siteType:this.isFreebus?this.siteType:"",	//地点类型	string	1-机场 2-火车站
                    isInvoice:this.isInvoice?1:0,	//是否需要发票	string	0-否，1-是
                    invoiceType:this.isInvoice?this.invoiceType:"",	     //发票类型	object	1-普通发票 2-增值税发票
                    invoiceTitle:this.invoiceTitle || "",	 //发票抬头	string
                    accountBank:this.accountBank || "",	     //开户银行	string
                    accountNo:trim(this.accountNo) || "",	     //银行账号	string
                    companyName:this.companyName || "",	     //单位名称	string
                    registerAddress:this.registerAddress || "",	 //单位地址	string
                    registerTel:this.registerTel|| "",	     //注册电话	string
                    taxCode:this.taxCode || "",	         //税号	string
                    isItem:this.isItem?1:0,	//是否选择精品项目	string	0-否，1-是
                    // categoryCode:this.isItem?this.categoryCode.join(","):"",	//项目大类编码	string	多个项目以英文字符的逗号“,”分隔
                    // itemCode:this.isItem?this.itemCode.join(","):"",	//项目编码	string	多个项目以英文字符的逗号“,”分隔
                    // itemPrice:this.isItem?this.itemPrice.join(","):"",	//项目价格	number	多个项目以英文字符的逗号“,”分隔
                    // itemQuantity:this.isItem?this.itemQuantity.join(","):"",	//项目数量	number	多个项目以英文字符的逗号“,”分隔
                    additionalItem:this.isItem?JSON.stringify(this.additionalItem):[],   //附加项目内容
                    isParking:this.isParking?1:0,	//是否预留车位	string	0-否，1-是
                    // licenseNos:this.isParking?this.licenseNos:"",	//车牌号码	string
                    isPoints:this.integralValue?1 : 0,	//是否使用积分	string	0-否，1-是
                    consumptionPoints:this.integralValue?this.consumptionPoints:"",   //消费积分数	string
                    pointsSum:this.integralValue?this.pointsSum:"",       //积分抵扣金额	string
                    rateCode:this.$store.state.roomDetails.rateCode,	//房价CODE	string
                    reserveType:this.$store.state.roomDetails.reserveType,	//预定类型CODE	string
                    roomCode:this.$store.state.roomDetails.roomCode,	//房间Code	string
                    roomNum:1,	//房间数量	string
                    roomSum:this.allRoomPrice,	//房费	number
                    totalSum:this.totalSum,	//订单总金额	number
                    contactEmail:this.contactEmail || "",	//联系人邮箱	string
                    remark:this.remark || "",	//备注信息	string
                   userId:this.userInfo.userId,	//会员ID
//                userId:117,	//会员ID
                    langId:"CN",
                    isSync:this.$store.state.roomDetails.isSync
                }
            }
            this.api.post(orderParams, res => {

                // console.log(res,"order");
               /* this.orderId=res.orderId;
                this.orderNo=res.orderNo;
                this.paySum=res.paySum;*/
//                var test = window.location.href;


                this.paymentOrder(res);


            },false,errmsg => {
                this.$vux.toast.text(errmsg,"middle");
            });
        },
      //授权微信sdk
      wxAauthSDK(){
          var url = window.location.href.split('#')[0];
          var _t = this;
          var data = {
            "url":url
          };
        this.api.post({url:'/wx/wxAauthSDK',data:data}, res => {
          _t.initWeChat(res);
        })
        },
      //初始化微信sdk
      initWeChat(data) {
        var _t = this;
        var wxMethod = ["checkJsApi","closeWindow","getLocation","chooseWXPay","getNetworkType","onMenuShareTimeline","onMenuShareAppMessage"];
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: data.appid+"" || "", // 必填，公众号的唯一标识
          timestamp: data.timestamp+"" || "", // 必填，生成签名的时间戳
          nonceStr: data.nonceStr+"" || '', // 必填，生成签名的随机串
          signature: data.signature+"" || '', // 必填，签名，见附录1
          jsApiList:wxMethod
        });
        this.applyWeChat(wxMethod);
      },
      //
      applyWeChat(wxMethod) {
        var _t = this;
        wx.ready(function() {
//
        });
        wx.error(function(res) {

        });
      },
        // 模拟支付
        paymentOrder(list){

          if(list.isNeedSum!=0){
            let params = {
              url: "/wx/wxPay",
              data: {
                orderNo:list.orderNo
              }
            };
            this.api.post(params, res => {
              this.wxpay(res,list)
            })
          }else{

            let  pardata = {
              url: "/paymenthtAction",
              data: {
                orderId:list.orderId,
                payType:list.payType,
                paySum:list.paySum
              }
            };
            this.$router.push({path: "/paymentsuccess",query:{
              orderSn:list.orderNo,
              payMoney:list.paySum
            }})
//          history.replaceState(null,"","/homestay/wxPay");
            this.api.post(pardata, data => {

            })
          }

        },
        wxpay(data,list){
          WeixinJSBridge.invoke('getBrandWCPayRequest', {
              "appId": data.appId, //公众号名称，由商户传入
              "timeStamp": data.timeStamp, //时间戳，自1970年以来的秒数
              "nonceStr": data.nonceStr || '', //随机串
              "package": data["package"],
              "signType": data.signType || "MD5", //微信签名方式:
              "paySign": data.paySign || '' //微信签名
            },
            function(res) {

                data.title = "付款结果";
                if(res.err_msg == 'get_brand_wcpay_request:ok') {


                  data.content = "支付成功！";
                  data.type = "success";
                   window.location.href="/homestay/usercenter#/paymentsuccess?orderSn="+list.orderNo+'&payMoney='+list.needSum
                } else {

                  data.type = "error";
                  data.content = "支付失败！";
                  window.location.href="/homestay/usercenter#/paymentfailed?orderSn="+list.orderNo+'&payMoney='+list.needSum
                }


           //   _t.callback&&_t.callback(data);
            }
          );
          //this.bindBridgeReady();

        },
        // 支付宝支付订单
        payOrderByAliPay(params){
            params={
                url: "/payOrderByAliPay",
                data: {
                    orderNo:this.orderNo,     //订单编号
                    langId:"CN"    //语言
                }
            }
            this.api.post(params, res => {
                console.log(res,"payOrderByAliPay");
            });
        },
        // 微信支付订单
        payOrderByWechat(params){
            params={
                url: "/wx/wxPay",
                data: {
                    channelNo:"1000001",	//微信渠道号
                    orderNo:this.orderNo,     //订单编号
                    langId:"CN"    //语言
                }
            }
            this.api.post(params, res => {
                console.log(res,"payOrderByWechat");
            });
        },
        //选择日期之后接受日期子组件返回的值
        asureClick (chooseDate) {
            if(!this.dayChooice){
                // this.choiceDate.showStartDate=chooseDate.showStartDate;
                // this.choiceDate.showEndDate=chooseDate.showEndDate;
                // this.choiceDate.daysNum=chooseDate.daysNum;
                this.getRoomDayPrice({
                    showStartDate:chooseDate.showStartDate,
                    showEndDate:chooseDate.showEndDate,
                    daysNum:chooseDate.daysNum,
                    startDate:chooseDate.startDate,
                    endDate:chooseDate.endDate
                });
                if(this.availableRooms>0){
                    let array=this.$store.state.selectTourCode;
                    let beginDate=[];
                    if(array.length>0){
                        for(var i in array){
                            beginDate.push(this.choiceDate.showStartDate);
                        }
                        const tourParams = {
                            url: "/getTourDetailsByCode",
                            data: {
                                arrival: this.choiceDate.showStartDate, //入住日期
                                beginDate: beginDate.join(","), //旅游项目开始时间
                                departure:this.choiceDate.showEndDate, //离店日期
                                hotelCode:this.$store.state.roomDetails.hotelCode, //房型code
                                itemCode: array.join(","), //旅游项目code
                                langId: "CN"
                            }
                        };
                        this.getTourDetailsByCode(tourParams);
                    }
                }
                
            }else{
                this.tourList[this.choiceId].showStartDate=chooseDate.showStartDate;
                let travelParams={
                    url: "/getTourDetailsByCode",
                    data: {
                        arrival:this.$store.state.checkInOutInfo.checkinDate, //开始时期
                        beginDate:chooseDate.startDate.format, //旅游项目开始时间
                        departure:this.$store.state.checkInOutInfo.checkoutDate, //结束时间
                        hotelCode:this.$store.state.roomDetails.hotelCode, //房型code
                        itemCode: this.tourList[this.choiceId].itemCodes, //旅游项目code
                        langId: "CN"
                    }
                };
                this.api.post(travelParams, res => {
                    this.tourList[this.choiceId].price=res&&res.list[0].price;
                    this.getTotalPrice();
                    this.dateCheck=false;
                });
            }
        },
        //计算总价钱
        getTotalPrice(){
            this.totalSum=0;
            this.productTotalprice=0;
            this.roomTotalprice=this.allRoomPrice;
            if(this.isCoupon&&!this.showUsehyCard){
                this.roomTotalprice=Number(this.roomTotalprice)-Number(this.couponSum);

            }
            if(this.integralValue){
                if(Number(this.pointsSum)>Number(this.roomTotalprice)){
                    this.pointsSum=this.roomTotalprice;
                }
                this.roomTotalprice=Number(this.roomTotalprice)-Number(this.pointsSum);
            }
            if(!this.isCoupon&&this.showUsehyCard){
                this.userCardMoney=(Number(this.roomTotalprice)-(Number(this.roomTotalprice)*Number(this.cardRate))).toFixed(2);
                this.roomTotalprice=Number(this.roomTotalprice)*Number(this.cardRate);
            }
            if(Number(this.roomTotalprice)<=0){
                this.roomTotalprice=0;
            }
            this.totalSum+=Number(this.roomTotalprice);
            this.productTotalprice+=Number(this.allRoomPrice);
            if(this.tourList.length){
                for(var i in this.tourList){
                    this.totalSum+=Number(this.tourList[i].price);
                    this.productTotalprice+=Number(this.tourList[i].price);
                }
            }
            this.totalSum=Number(this.totalSum).toFixed(2);
            this.productTotalprice=Number(this.productTotalprice).toFixed(2);
            // console.log(this.totalSum);
        },
        verifyTel(){
            if(this.registerTel.length<10||this.registerTel.length>15){
                this.$vux.toast.text("注册电话长度应在10-15之间","middle");
                return false;
            }
        },
        verifyNo(){
            var reg=/^([1-9]{1})(\d{15}|\d{18})$/;
            if(!reg.test(this.accountNo.replace(/\s+/g, ""))){
                this.$vux.toast.text("请正确输入银行卡号！","middle");
                return false;
            }
        },
        //点击发票提交按钮添加发票内容
        onSubmit(){
            if(this.isInvoice){
                if(this.isActiveSi){
                    var reg=/^([1-9]{1})(\d{15}|\d{18})$/;
                    if(!reg.test(this.accountNo.replace(/\s+/g, ""))){
                        this.$vux.toast.text("请正确输入银行卡号！","middle");
                        return false;
                    }
                    if(/[\u4E00-\u9FA5]/i.test(this.taxCode)){
                        this.$vux.toast.text("请输入正确的税号！","middle");
                        return false;
                    }
                    if(this.accountBank&&this.accountNo&&this.companyName&&this.registerAddress&&this.registerTel&&this.taxCode){
                        if(this.registerTel.length<10||this.registerTel.length>15){
                            this.$vux.toast.text("注册电话长度应在10-15之间","middle");
                            return false;
                        }
                        this.invoiceContent="专票";
                        this.isInvoiceShow=false;
                        this.showInvoice=true;
                    }else{
                        this.$vux.toast.text("输入内容不能为空","middle");
                    }
                }else if(this.isActiveRi){
                    if(this.invoiceTitle.length > 50){
                        this.$vux.toast.text("发票抬头内容不得大于50长度","middle");
                    }else{
                        if(this.invoiceTitle){
                            this.invoiceContent="普票";
                            this.isInvoiceShow=false;
                            this.showInvoice=true;
                        }else{
                            this.$vux.toast.text("必须输入发票抬头","middle");
                        }
                    }
                }
            }
            this.isClickClose=false;
            console.log(this.isInvoice,666);
        },
        // 关闭日历插件
        closeChangeDate(){
            this.dateCheck=false;
        },
        // 关闭支付弹窗
        closePayPanel(){
            this.showPayPanel=false;
        },
        userInvoice(newVal){
            if(!this.isInvoice){
                this.clearInvoice();
            }

        },
        //判断是否展示选择发票页面
        changeInvoice(){
            if(this.isInvoice){
                this.isInvoiceShow=true;
                // if (process.env.NODE_ENV === 'production') {
                // // koa page-router配置跳转地址 不带#号
                //     window.location.href = "/homestay/priceenjoyDetails#/invoicepage/"+this.totalSum;;
                // }
                // if (process.env.NODE_ENV === 'development') {
                // // vue哈希路有。 带#号
                //     window.location.href = "/priceenjoy.html#/invoicepage/"+this.totalSum;
                // }
            }
        },
        // // 清空发票内容
        clearInvoice(val){
            if(!this.isInvoice){
                this.invoiceContent="专票";
                this.isActiveSi=true;
                this.isActiveRi=false;
                this.accountBank="";
                this.accountNo="";
                this.companyName="";
                this.registerAddress="";
                this.registerTel="";
                this.taxCode="";
                this.invoiceTitle="";
            }
        },
        // // 关闭发票
        closeInvoice(){
            this.isInvoiceShow = false;
            this.isInvoice= false;
            this.clearInvoice();
        },
        //判断发票蒙层消失时是否提交信息
        checkInvoice(){
            if(this.showInvoice){
                this.isInvoiceShow = false;
                this.isInvoice= true;
            }else{
                this.closeInvoice();
            }
        },
        //删除该选择
        delTravelButtonClick (item) {

        }
    },
    filters:{
        productPrice(value){
            if(value){

                return "￥"+value
            }else{
             /* this.discountCardNo='';
              this.discountName='';
              this.discountPhone='';
              this.authCode='';*/
                return value
            }
        },
        fuProductPrice(value){
            return "-￥"+value
        },
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
    .vux-toast .weui-toast{
        z-index:10001;
    }
    .calenderPopup{
        width:100%;
    }
    .priceBox{
        width:508px;
        margin:auto;
        height:656px;
        display: flex;
        flex-direction: column;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        border-radius: 12px;
        background-color: rgba(255, 255, 255, 1);
        border: 1px solid rgba(238, 238, 238, 1);
        .userCadrdHeader{
            width:100%;
            height:98px;
            line-height: 98px;
            text-align: center;
            color:#000;
            font-size: 30px;/*px*/
            position: relative;
            .vux-x-icon{
                position: absolute;
                left:10px;
                top:10px;
                width:80px;
                height:80px;
                fill:rgb(216, 216, 216);
            }
        }
        ul{
            flex:1;
            overflow: hidden;
            overflow-y: auto;
        }
        .priceList{
            width:100%;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            min-height: 98px;
            padding:0  30px;
            color:#2d2d2d;
            font-size: 28px;/*px*/
            .desr {
                width:100%;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                min-height: 98px;
                color:#2d2d2d;
                font-size: 28px;/*px*/
                p {
                    width:auto;
                    color:#2d2d2d;
                    font-size: 28px;/*px*/
                }
                p:first-child{
                    width:auto;
                    color:#989898;
                    font-size: 28px;/*px*/
                }
            }
        }
        .userCardbtn{
            border-top:1px solid #E5E5E5;
            border-bottom:1px solid #E5E5E5;
            box-shadow:0 -1px 2px 0 rgba(0,0,0,0);
            margin:30px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            height: 74px;
            font-size: 28px;/*px*/
            p {
                width:auto;
                color:#B6A382;
                font-size: 28px;/*px*/
            }
            p:first-child{
                width:auto;
                color:#989898;
                font-size: 28px;/*px*/
            }
        }
    }
    #app{
        .price-enjoy-order{
            height: 100%;
            color: #5d5d5d;
            display: flex;
            flex-direction: column;
            overflow:auto;/* winphone8和android4+ */
            -webkit-overflow-scrolling: touch; /* ios5+ */
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
            .contentOrder{
                flex:1;
                overflow-y: auto;
                .box{
                    left:0;
                    right:0;
                    position: relative;
                    top:-160px;
                    padding-top: 210px;
                     .header{
                        width: 100%;
                        height:calc(~"100% - 115px");
                        background:#5d5d5d url(../assets/bg_fdd.png) no-repeat center center;
                        background-size: 100% 100%;
                        position: absolute;
                        //z-index: -1;
                        top: 0;
                    }
                    .hotel-name{
                        position: relative;
                      z-index: 2;
                        background:#ffffff;
                        box-shadow:0 2px 4px 0 rgba(0,0,0,0.10);
                        border-radius:10px;
                        margin: 0 30px 30px;
                        display: flex;
                        flex-direction: column;
                        padding: 20px;
                        .hotel-name-top{
                            padding-bottom:22px;
                            width: 100%;
                            border-bottom: 1px solid #eeeeee;
                            display: flex;
                            justify-content: center;
                            span{
                                font-size:28px;/*px*/
                                color:#2d2d2d;
                                display:block;
                            }
                        }
                        .tour-top{
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            span:last-child{
                                color:#ea5414;
                                margin-top:10px;
                            }
                        }
                        .hotel-name-bottom{
                            height: 100%;
                            width: 100%;
                            display: flex;
                            justify-content: center;
                            padding-top:20px;
                            div:nth-child(2){
                                width: 106px;
                                margin: 0 28px;
                                display: flex;
                                flex-direction: column;
                                justify-content: center;
                                align-items: center;
                                div{
                                    border:1PX solid #b6a382;
                                    border-radius:100px;
                                    width:100%;
                                    height:34px;
                                    line-height:34px;
                                    text-align: center;
                                    margin-bottom: 10px;
                                    span{
                                        font-size:22px;/*px*/
                                        color:#b6a382;
                                    }
                                }
                                .line{
                                    opacity:0.5;
                                    background:#b6a382;
                                    width:1px;
                                    height:30px;
                                }
                            }
                            .check-in{
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                span:first-child{
                                    font-size:28px;/*px*/
                                    color:#2d2d2d;
                                    margin-right: 16px;
                                }
                                span:last-child{
                                    font-size:22px;/*px*/
                                    color:#bbbbbb;
                                    line-height: 22px;
                                }
                            }
                        }
                    }
                    .vux-swipeout{
                        width:100%;
                        height:auto;
                        margin:0 auto;
                        .vux-swipeout-item{
                            background:#ffffff;
                            box-shadow:0 2px 4px 0 rgba(0,0,0,0.10);
                            border-radius:10px;
                            margin: 0 30px 30px;
                            overflow: hidden;
                            .hotel-name{
                                margin:0;
                            }
                        }
                    }
                }
                .form-justify{
                    margin-top: -170px;
                    .weui-cells{
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
                                width:18px;
                                height:18px;
                                border-color: #b6a382;
                                margin-top:-5.5PX;
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
                            .weui-cell__bd{
                                 height:46px;
                                input{
                                     height: 46px;
                                     line-height: 46px;
                                    text-align: right;
                                    color:#666666;
                                }
                            }
                        }
                        .weui-cell:before{
                            left: 0;
                            border-top:1px solid #eeeeee;
                        }
                        .weui-cell_access{
                            padding-right: 20PX;
                            .weui-cell__ft{
                                padding-right: 20PX;
                            }
                        }
                    }
                    .weui-cells:before{
                        height: 0;
                        border:none;
                    }
                    .weui-cells:after{
                        height: 0;
                        border: none;
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
                                 height: 46px;
                                input{
                                    height: 46px;
                                    line-height: 46px;
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
                    .weui-cells:before{
                        height: 0;
                        border:none;
                    }
                    .weui-cells:after{
                        height: 0;
                        border: none;
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
                            overflow: hidden;
                        }
                        .cellHeight .weui-cell__ft{
                            height:50px;
                        }
                        .weui-cell__ft:after{
                            border-width:2PX 2PX 0 0;
                            width:18px;
                            height:18px;
                            border-color: #b6a382;
                            margin-top:-6PX;
                        }
                        .weui-cell:before{
                            left: 0;
                            border-top:1px solid #eeeeee;
                        }
                        .vux-x-switch .weui-label{
                            display: inline!important;
                        }
                        .vux-x-switch .vux-label-desc{
                            color:#B6A382;
                            font-size:28px;/*px*/
                            margin-left:20px;
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
                            .pointmoney{
                                font-size:24px;/*px*/
                                color:#B6A382;
                            }
                        }
                        .membership-card-info{
                            height: 226px;
                            padding: 30px;
                            div{
                                display: flex;
                                justify-content: space-between;
                                margin-bottom: 20px;
                                span:nth-child(1){
                                    left: 30px;
                                    height: 42px;
                                    line-height: 42px;
                                    color: rgba(102, 102, 102, 1);
                                    font-size: 24px;/*px*/
                                }
                                span:nth-child(2){
                                    height: 42px;
                                    line-height: 42px;
                                    color: rgba(182, 163, 130, 1);
                                    font-size: 24px;/*px*/
                                }
                            }
                        }
                    }
                    .weui-cells:before{
                        height: 0;
                        border:none;
                    }
                    .weui-cells:after{
                        height: 0;
                        border: none;
                    }
                }
                .form-payment-title{
                    font-size:26px;/*px*/
                    color:#989898;
                    line-height:26px;
                    margin-top: 20px;
                    margin-left: 15PX;
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
                    .weui-cells:before{
                        height: 0;
                        border:none;
                    }
                    .weui-cells:after{
                        height: 0;
                        border: none;
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
                                .weui-switch:checked{
                                    border-color: #2d2d2d;
                                    background-color: #2d2d2d;
                                }
                            }
                            .weui-cell__ft:after{
                                border-width:2PX 2PX 0 0;
                                width:18px;
                                height:18px;
                                border-color: #b6a382;
                                margin-top:-6PX;
                            }
                        }
                    }
                    .weui-cells:before{
                        height: 0;
                        border:none;
                    }
                    .weui-cells:after{
                        height: 0;
                        border: none;
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
                            padding:20px;
                            height: 198px;
                            width: 100%;
                            border:1px solid #efefef;
                            .weui-cell__hd{
                                width: 0px;
                            }
                            .weui-cell__bd{
                                width: 100%;
                                height:100%;
                                .weui-textarea{
                                    width: 100%;
                                    height:78%;
                                    font-size: 24px;/*px*/
                                }
                                .weui-textarea-counter{
                                    font-size: 24px;/*px*/
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
                z-index:501;
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
    .v-transfer-dom{
        .vux-popup-dialog{
            z-index:10000;
            .weui-cells_radio{
                text-align: center;
                margin-bottom: 60px;
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
                .weui-cell:before{
                    border: none;
                    height: 0;
                }
            }
            .demo3-slot{
                font-weight: bold;
                text-align: center;
                height: 98px;
                font-size: 32px;/*px*/
                line-height: 98px;
            }
            .vux-1px-b:after{
                border: none;
                height: 0;
            }
        }
        .v-transfer-dom .vux-popup-dialog{
                bottom:98px;
            }
            .useStyle{
                width: 100%;
                background-color:#fff;
                margin:0 auto;
                border-radius:6px;
                .userCadrdHeader{
                    width:100%;
                    height:98px;
                    line-height: 98px;
                    text-align: center;
                    color:#000;
                    font-size: 30px;/*px*/
                    position: relative;
                    .vux-x-icon{
                        position: absolute;
                        right:10px;
                        top:10px;
                        width:88px;
                        height:88px;
                        fill:rgb(216, 216, 216);
                    }
                }
                .weui-cells{
                    margin:0;
                    padding-bottom:168px;
                    .weui-cell:before{
                        height:0;
                        border:0;
                    }
                    .weui-cell__hd{
                        width:80px;
                        img{
                            height:40px;
                            margin:0 auto;
                            display: block;
                        }
                    }
                    .weui-input{
                        font-size: 28px;/*px*/
                        color:rgb(45, 45, 45);
                    }
                    .weui-input::-webkit-input-placeholder{
                        color: rgb(187, 187, 187);
                    }
                    button.weui-btn{
                        background-color:#fff;
                        padding-left:30px;
                        border-left:1PX solid rgb(216, 216, 216);
                        border-radius: 0;
                        color:rgb(45,45,45);
                    }
                    .weui-btn:after{
                        border:0;
                        height:0;
                    }
                }
                .weui-cells:before{
                    height:0;
                    border:none;
                }
                .weui-cells:after{
                    height: 0;
                    border: none;
                }
                .userCardbtn{
                    padding:10px 30px;
                    box-shadow:0 -1px 2px 0 rgba(0,0,0,0);
                    .weui-btn{
                        width:100%;
                        height:78px;
                        line-height:78px;
                        padding:0;
                        border-radius: 6px;
                        background-color:rgba(4,4,4,1);
                        color:#fff;
                        text-align: center;
                        font-size:30px;/*px*/
                    }
                }
                .countdown{
                    display: flex;
                    justify-content: center;
                }
                .useStyleCard{
                    .weui-cells{
                        margin-top: 0;
                        .vux-x-input{
                            height: 98px;
                            padding: 25px 30px;
                            .weui-cell__hd{
                                // img{
                                //     height: 44px;
                                //     width: 44px;
                                // }
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
                                    span{
                                        display: block;
                                        font-size: 28px;/*px*/
                                        color: #2D2D2D;
                                        margin-left: 30px;
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
                    .weui-cells:before{
                        height: 0;
                        border:none;
                    }
                    .weui-cells:after{
                        height: 0;
                        border: none;
                    }
                }
            }
            .coupon{
                width: 100%;
                background-color:#fff;
                margin:0 auto;
                border-radius:6px;
                display: flex;
                flex-direction: column;
                height:780px;
                .userCadrdHeader{
                    width:100%;
                    height:98px;
                    line-height: 98px;
                    text-align: center;
                    color:#000;
                    font-size: 30px;/*px*/
                    position: relative;
                    .vux-x-icon{
                        position: absolute;
                        right:10px;
                        top:10px;
                        width:88px;
                        height:88px;
                        fill:rgb(216, 216, 216);
                    }
                }
                .useStyleCard{
                    flex:1;
                    overflow: hidden;
                    overflow-y: auto;
                }
                .couponList{
                    // display: flex;
                    // flex-direction: row;
                    // justify-content: flex-start;
                    // align-items: center;
                    // min-height: 98px;
                    // padding:0  30px;
                    // color:#2d2d2d;
                    // font-size: 28px;/*px*/
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
                        padding-right: 20px;
                        height: 100%;
                        width: 180px;
                        justify-content: center;
                        align-items: center;
                        background: url('../../usercenter/assets/Path 5@2x.png') right center no-repeat;
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
                            background: url('../../usercenter/assets/Path 4@2x.png') left bottom no-repeat;
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
                                    background: url('../../usercenter/assets/select@2x.jpg') center no-repeat;
                                    background-size:100% 100%;
                                }
                                .iconTrans{

                                    transform: rotate(180deg);
                                }
                            }
                        }
                    }
                    .checkImg{
                        width:56px;
                        height:100%;
                        min-height: 98px;
                        background: url(../assets/a3_iconk.png) no-repeat left center;
                        background-size:36px 36px;
                        &.active{
                            background: url(../assets/a3_icon.png) no-repeat left center;
                            background-size:36px 36px;
                        }
                    }
                    &:last-child {
                        border: none;
                    }
                    .desr {
                        display: flex;
                        flex-direction: row;
                        justify-content: flex-start;
                        align-items: center;
                        min-height: 98px;
                        color:#2d2d2d;
                        font-size: 28px;/*px*/
                        p {
                            width:auto;
                            color:#2d2d2d;
                            font-size: 28px;/*px*/
                            text-align: left;
                        }
                        span{
                            color:#2d2d2d;
                            font-size: 28px;/*px*/
                            margin:0 3PX;
                        }
                    }
                }
                .weui-cells{
                    margin:0;
                    padding-bottom:60px;
                    .weui-cell:before{
                        height:0;
                        border:0;
                    }
                    .weui-cell__hd{
                        width:80px;
                        img{
                            height:40px;
                            margin:0 auto;
                            display: block;
                        }
                    }
                    .weui-input{
                        font-size: 28px;/*px*/
                        color:rgb(45, 45, 45);
                    }
                    .weui-input::-webkit-input-placeholder{
                        color: rgb(187, 187, 187);
                    }
                    button.weui-btn{
                        background-color:#fff;
                        padding-left:30px;
                        border-left:1PX solid rgb(216, 216, 216);
                        border-radius: 0;
                        color:rgb(45,45,45);
                    }
                    .weui-btn:after{
                        border:0;
                        height:0;
                    }
                }
                .weui-cells:before{
                    height: 0;
                    border:none;
                }
                .weui-cells:after{
                    height: 0;
                    border: none;
                }
                .userCardbtn{
                    padding:10px 30px;
                    box-shadow:0 -1px 2px 0 rgba(0,0,0,0);
                    .weui-btn{
                        width:100%;
                        height:78px;
                        line-height:78px;
                        padding:0;
                        border-radius: 6px;
                        background-color:rgba(4,4,4,1);
                        color:#fff;
                        text-align: center;
                        font-size:30px;/*px*/
                    }
                }
                .countdown{
                    display: flex;
                    justify-content: center;
                }
                .useStyleCard{
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
                    .weui-cells:before{
                        height: 0;
                        border:none;
                    }
                    .weui-cells:after{
                        height: 0;
                        border: none;
                    }
                }
            }
            .invoice{
                width:100%;
                height:100vh;
                color: #5d5d5d;
                background-color:#efeff4;
                margin:0 auto;
                display: flex;
                flex-direction: column;
                border-radius:6px;
                .userCadrdHeader{
                    width:100%;
                    height:98px;
                    line-height: 98px;
                    text-align: center;
                    color:#000;
                    font-size: 30px;/*px*/
                    position: relative;
                    background: #fff;
                    .vux-x-icon{
                        position: absolute;
                        right:10px;
                        top:10px;
                        width:88px;
                        height:88px;
                        fill:rgb(216, 216, 216);
                    }
                }
                .invoice-type{
                    flex:1;
                    overflow:auto;/* winphone8和android4+ */
                    -webkit-overflow-scrolling: touch; /* ios5+ */
                    padding:20px 0;
                    .radioXinput{
                        border-bottom:1PX solid #eeeeee;
                    }
                    .radioXinput.disabled{
                        color:rgba(0, 0, 0, 0.3)!important;
                    }
                    .weui-cells{
                        margin-top:0;
                        background: #fff;
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
                                font-size:28px;
                                color:#666666;
                                height:100%;
                                .weui-input{
                                    height:100%;
                                }
                            }
                            .weui-cell__ft{
                                width:auto;
                                overflow: hidden;
                            }
                            .weui-cell__hd{
                                width: 210px;
                            }
                        }
                        .vux-x-input.disabled{
                            color:#2d2d2d;
                            .weui-input{
                                color:#EA5414;
                            }
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
                               /* height:46px;*/
                                line-height: 1.5;
                            }
                            textarea:disabled{
                                background:#fff;
                            }
                        }
                        &:before{
                            height:0;
                            border:0;
                        }
                    }
                    .weui-cells:before{
                        height: 0;
                        border:none;
                    }
                    .weui-cells:after{
                        height: 0;
                        border: none;
                    }
                }
                .invoiceBtn{
                    background:#ffffff;
                    box-shadow:0 -1px 2px 0 rgba(0,0,0,0.10);
                    width:100%;
                    padding:10px 30px;
                    div:last-child{
                        background:#090b0c;
                        width:100%;
                        height:98px;
                        line-height:98px;
                        border-radius: 6PX;
                        text-align: center;
                        font-size:30px;/*px*/
                        color:#ffffff;
                    }
                }
            }
    }
    .popupStyle{
        height:100%!important;
    }
   .postionRe{

    }

.vux-checker-box{
    width:100%;
}
.check-item {
    width:50px;
    height:98px;
    background: url(../assets/a3_iconk.png) no-repeat left center;
    background-size:36px 36px;
}
.check-item-selected {
    width:50px;
    height: 98px;
    background: url(../assets/a3_icon.png) no-repeat left center;
    background-size:36px 36px;
}

.v-transfer-dom .weui-cells_radio p{
    font-size: 28px;/*px*/
}
.v-transfer-dom .weui-cells_radio .weui-cell__ft{
    display:none!important;
}
.v-transfer-dom .weui-cells_radio .vux-radio-icon{
    width:44px;
    height:44px;
    margin-right: 20px;
}

   /* */
</style>

