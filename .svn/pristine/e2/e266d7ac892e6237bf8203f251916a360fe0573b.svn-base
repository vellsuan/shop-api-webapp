<template>
    <div class="vue-calendar" data-index="0">
        <div class="vue-calendar-content vue-component-calendar-content-transition" id="vueCalendarTemplate">
            <div class="closeBtn" @click="closeChangeDate"><img src="../assets/a4_icon.png" alt=""></div>
            <div class="vue-calendar-content-title-wrapper" id="topHeight1" v-show="!onlyOne">
                <div class="hotel-timeShow">
                    <div class="check">
                        <span>入住日期</span>
                        <span class="check-in">{{showStartDate | dateToMMDD}}</span>
                        <span>星期{{showStartDate  | dateToDay}}</span>
                    </div>
                    <div class="dayNum">
                        <div class="days">共{{daysNum}}晚</div>
                        <div class="line"></div>
                    </div>
                    <div class="check">
                        <span>离开日期</span>
                        <span class="check-out">{{showEndDate | dateToMMDD}}</span>
                        <span>星期{{showEndDate | dateToDay}}</span>
                    </div>
                </div>
            </div>
            <div class="vue-calendar-content-title-wrapper" id="topHeightTwo" v-show="onlyOne">
                <div class="hotel-timeShow">
                    <div class="check">
                        <span>出游日期:</span>
                        <span class="check-in">{{showStartDate | dateToMMDD}}</span>
                        <span>星期{{showStartDate  | dateToDay}}</span>
                    </div>
                </div>
            </div>
            <div class="week-bar" id="topHeight2">
                <ul>
                    <li class="weekend">日</li>
                    <li>一</li>
                    <li>二</li>
                    <li>三</li>
                    <li>四</li>
                    <li>五</li>
                    <li class="weekend">六</li>
                </ul>
            </div>
            <div class="month-bar-fixed" id="fixedBarEle" style="opacity: 0; transform: translate(0px, 0px);"></div>
            <div id="scrollPanelWrapper" ref="scrollPanelWrapper">
                <div class="vue-calendar-date-wrapper" id="scrollPanel">
                    <div class="month-panel" v-for="(month, index) in monthList" :key="index" :data-index="index">
                        <div class="month-bar first-month-bar selected-month" :id="'monthBar-' + index">{{month.month}}</div>
                        <div class="month-list">
                            <ul>
                                <!-- <template v-for="(dayItem, day) in month.daysList"  :key="day" > -->
                                <li v-for="(dayItem, day) in month.daysList" :key="day" class="tips-hook" :class="{
                          'disabled' : timeDisabled(dayItem.time),
                          'selected-start' : dayItem.time === startDate.time,
                          'onlyOne':onlyOne==true,
                          'selected-end' : dayItem.time === endDate.time,
                          'selected-line' : (dayItem.time > startDate.time && dayItem.time < endDate.time)
                          }" :date-sec="dayItem.time" :data-date-format="dayItem.format" @click="dayItemClick(dayItem,timeDisabled(dayItem.time))">
                                    <span class="dd">{{dayItem.day}}</span>
                                    <i></i>
                                    <span class="holiday"></span>
                                </li>
                                <!-- </template> -->
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="submitSure">
                <div class="submitBtn" @click="asureClick">确定预订</div>
            </div>
        </div>
    </div>
</template>
<script>
import _moment from "moment";
import BScroll from "better-scroll";
import { mapState, mapMutations } from 'vuex';
const formatZh = "YYYY年MM月DD日";
const formatEn = "YYYY-MM-DD";
export default {
    name: "Calender",
    props: {
        date: Date,
        monthNumber: Number, // 显示多少个月可供选择
        onlyOne: Boolean, // 仅选择一个日期
        dateObj:Object
    },
    created() {
        // console.log(this.date,"www");
    },
    beforeMount(){
    },
    mounted() {
        this.getSystemTime();
        this.$refs.scrollPanelWrapperBox;
    },
    data() {
        return {
            startDate: {},
            endDate: {},
            monthList: [],
            showStartDate:this.dateObj.showStartDate,
            showEndDate:this.dateObj.showEndDate,
            daysNum:this.dateObj.daysNum,
            sysTime:""      //获取当前系统时间
        };
    },
    computed: {
        currentDayTime() {
            let newDate;
            if(_moment(_moment(this.date).format(formatEn)).format("x")>this.sysTime){
                newDate = this.sysTime;
            }else{
                newDate = this.date;
            }
            return _moment(_moment(newDate).format(formatEn)).format("X");
        },
        onlyOneStartTime(){
            return _moment(this.$store.state.checkInOutInfo.checkinDate).format("X");
        },
        onlyOneEndTime(){
            return _moment(this.$store.state.checkInOutInfo.checkoutDate).format("X");
        },
    },
    watch: {
        onlyOne(newOnlyOne) {
            if (newOnlyOne) {
                this.endDate = {};
            } else {
                this.initStartAndEndDays(this.startDate.format);
                this.$emit("asureEvent", {
                    startDate: this.startDate,
                    endDate: this.endDate
                });
            }
        },
        date(newDateValue){
            if (newDateValue) {
                this.initStartAndEndDays(new Date(newDateValue));
            }
        }
    },
    methods: {
        initData() {
            let initDate= this.sysTime;
            console.log(this.date,_moment(_moment(this.date).format(formatEn)).format("x"),this.sysTime,"shijian");
            // if(_moment(_moment(this.date).format(formatEn)).format("x")>this.sysTime){
            //     initDate = this.sysTime;
            // }else{
            //     initDate = this.date;
            // }
            console.log(initDate,"LALALALAL");
            let monthList = [];
            let monthNumber = this.monthNumber;
            for (let i = 0; i < monthNumber; i += 1) {
                let month = _moment(initDate)
                    .add(i, "M")
                    .format("YYYY年MM月");
                let daysNumber = _moment(month, "YYYY年MM月").daysInMonth();
                let firstDayOfMonth = _moment(month + "1日", formatZh).format("e");
                let daysList = [];
                for (let k = 0; k < firstDayOfMonth; k++) {
                    daysList.push({
                        time: "",
                        format: ""
                    });
                }
                for (let j = 1; j <= daysNumber; j++) {
                    let dayFormat = month + j + "日";
                    daysList.push(this.itemDay(dayFormat, j));
                }
                let preFixLength = daysList.length;
                for (let m = 0; m < 7 - preFixLength % 7; m++) {
                    daysList.push({
                        time: "",
                        format: ""
                    });
                }
                monthList.push({
                    month: month,
                    daysNumber: daysNumber,
                    daysList: daysList
                });
            }
            this.monthList = monthList;
        },
        timeDisabled(date){   //判断是否在选择范围内
            if(this.onlyOne){
                if(date >= this.onlyOneEndTime | date < this.onlyOneStartTime){
                    return true;
                } else{
                    return false;
                }
            }else{
                if(date < this.currentDayTime){
                    return true;
                } else{
                    return false;
                }
            }
        },
        dateSec(dayFormatZh) {
            return _moment(dayFormatZh, formatZh).format("X");
        },
        dataDateFormat(dayFormatZh) {
            return _moment(dayFormatZh, formatZh).format(formatEn);
        },
        itemDay(dayFormat, day) {
            return {
                time: this.dateSec(dayFormat),
                format: this.dataDateFormat(dayFormat),
                day: day
            };
        },
        // 获取系统时间
        getSystemTime(){
            const timeParams = {
                url : '/index/getSystemTime'
            }
            this.api.post(timeParams, res=> {
                let sysTime = res && res.sysTime;
                this.sysTime=sysTime;
                console.log(sysTime,"MEMEME");
                this.initData();
                // 根据传入的当前时间 初始化化 startDate 和 endDate
                this.initStartAndEndDays(this.date);
            });
        },
        initStartAndEndDays(currentDayEn) {
            let currentDay = _moment(currentDayEn);
            if (this.onlyOne) {
                this.startDate = this.itemDay(
                    _moment(this.$store.state.checkInOutInfo.checkinDate).format(formatZh),
                    _moment(this.$store.state.checkInOutInfo.checkinDate).format("DD")
                );
                this.endDate = {};
            } else {
                let nextDay = _moment(currentDayEn).add(1, "d");
                this.startDate = this.itemDay(
                    _moment(this.$store.state.checkInOutInfo.checkinDate).format(formatZh),
                    _moment(this.$store.state.checkInOutInfo.checkinDate).format("DD")
                );
                this.endDate = this.itemDay(
                    _moment(this.$store.state.checkInOutInfo.checkoutDate).format(formatZh),
                    _moment(this.$store.state.checkInOutInfo.checkoutDate).format("DD")
                );
            }
        },
        dayItemClick(item, disabled) {
            if (disabled) {
                return;
            }
            // console.log(this.onlyOne,item);
            let startTime = this.startDate.time;
            let endTime = this.endDate.time;
            // 钟点房
            if (this.onlyOne) {
                //   console.log('ok')
                this.startDate = item;
                this.endDate = {};
                this.showStartDate = this.startDate.format;
            } else {
                //   console.log('22')
                if (startTime && endTime) {
                    this.startDate = item;
                    this.endDate = {};
                    this.showStartDate =this.startDate.format;
                } else if (startTime && !endTime) {
                    // console.log('33')
                    if (item.time <= startTime) {
                        this.startDate = item;
                        this.showStartDate =this.startDate.format;
                    } else {
                        this.endDate = item;
                        this.showEndDate =this.endDate.format;
                        this.daysNum=(this.endDate.time-this.startDate.time)*1000/(24*60*60*1000);
                    }
                } else if (!startTime && !endTime) {
                    this.startDate = item;
                }
            }
        },
        asureClick() {
            let startTime = this.startDate.time;
            let endTime = this.endDate.time;
            if(!endTime&&!this.onlyOne){
                this.$vux.toast.text("请选择离店日期","middle")
                return;
            }
            if (this.onlyOne && startTime) {
                this.$emit("asureEvent", {
                    startDate: this.startDate,
                    endDate: {},
                    startTime:startTime,
                    endTime:'',
                    showStartDate:this.showStartDate,
                    showEndDate:"",
                    daysNum:this.daysNum
                });
            } else {
                if (startTime && endTime) {
                    this.$emit("asureEvent", {
                        startDate: this.startDate,
                        endDate: this.endDate,
                        startTime:startTime,
                        endTime:endTime,
                        showStartDate:this.showStartDate,
                        showEndDate:this.showEndDate,
                        daysNum:this.daysNum
                    });
                }
            }
        },
        closeChangeDate(){
            this.$emit("closeChangeDate",false);
        }
    }
};
</script>
<style lang="less" scoped>
.vue-calendar{
    width:100%;
}
.hotel-timeShow {
    height: 100%;
    width: 100%;
    padding: 0 40px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .dayNum {
        width: 106px;
        margin: 0 28px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .days {
            width: 100%;
            height: 34px;
            text-align: center;
            margin-bottom: 10px;
            font-size: 24px;/*px*/
            color: #b6a382;
        }
        .line {
            opacity: 0.5;
            background: #b6a382;
            width: 99px;
            height: 2px;
        }
    }
    .check {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        span:first-child {
            font-size: 20px;/*px*/
            color: #2d2d2d;
            margin-bottom: 10px;
        }
        span:nth-child(2) {
            font-size: 36px;/*px*/
            color: #2d2d2d;
            margin-bottom: 10px;
        }
        span:last-child {
            font-size: 20px;/*px*/
            color: #2d2d2d;
        }
    }
}
.vue-calendar-backdrop {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 999;
}
.vue-calendar-content {
    background: #fff;
    border-radius: 6px 6px 0 0;
    padding-top: 30px;
    width: 100%;
    height: calc(~"100vh - 47PX");
    display: flex;
    flex-direction: column;
    overflow: hidden;
    font-size: 0.4rem;
    .closeBtn {
        width: 50px;
        height: 50px;
        margin-left:calc(~"100% - 60px");
        margin-bottom:10px;
        img {
            display: block;
            width: 28px;
            height: 28px;
        }
    }
    .submitSure {
        width: 100%;
        height: 98px;
        padding: 10px 0;
        background: #fff;
        .submitBtn {
            margin: 0 auto;
            background: #040404;
            border-radius: 6px;
            width: 92%;
            height: 78px;
            text-align: center;
            line-height: 78px;
            font-size: 30px;/*px*/
            color: #ffffff;
            letter-spacing: 0;
        }
    }
    .vue-calendar-content-title-wrapper {
        background: #fff;
        z-index: 1003;
        width: 100%;
        position: relative;
        margin-bottom:40px;
        .text {
            float: left;
            padding-left: 0.26667rem;
            color: #666;
            font-size: 0.42667rem;
        }
        .vue-component-calendar-complete-button {
            float: right;
            margin-right: 0.26667rem;
            a {
                color: #2eb6a8;
                font-size: 0.4rem;/*px*/
                text-decoration: none;
                padding: 10 20;
                padding: 0.13333rem 0.26667rem;
                border: 0.02rem solid #2eb6a8;
                border-radius: 0.08rem;
            }
        }
    }
    #topHeightTwo{
        height:160px;
        .hotel-timeShow{
            .check{
                flex-direction: row;
                justify-content: center;
                align-items: center;
                span{
                    font-size: 36px;/*px*/
                    margin-bottom:0;
                    color:#2d2d2d;
                }
                span:nth-child(2){
                    margin:0 20px;
                }
                span:last-child{
                    color:#bbbbbb;
                    font-size:26px;/*px*/
                }
            }
        }
    }
    .week-bar {
        width: 100%;
        height: 0.8rem;
        line-height: 0.8rem;
        position: relative;
        background: #fff;
        padding: 0 30px;
        z-index: 1001;
        ul {
            border-top: 1px solid #efefef;
            border-bottom: 1px solid #efefef;
            display: -ms-flexbox;
            display: flex;
            li {
                color: #666;
                -ms-flex: auto;
                flex: auto;
                list-style: none;
                text-align: center;
                margin-right:1PX;
                &:last-child{
                    margin-right:0;
                }
            }
            .weekend {
                color: #d69d54;
            }
        }
    }
    .month-bar-fixed {
        overflow: visible;
        text-align: center;
        height: 0.8rem;
        line-height: 0.08rem;
        width: 100%;
        position: fixed;
        top: 2rem;
        background: #fafafa;
        z-index: 1000;
    }
    #scrollPanelWrapper {
        width: 100%;
        position: relative;
        padding: 0 30px;
        flex: 1;
        overflow: auto;
        .vue-calendar-date-wrapper {
            -webkit-overflow-scrolling: touch;
            overflow-scrolling: touch;
            overflow: auto;
            position: relative;
            -webkit-transform: translateZ(0);
            .month-bar {
                text-align: center;
                padding: 40px 0;
                width: 100%;
            }
        }
        .month-list {
            ul {
                overflow: hidden;
                li {
                    list-style: none;
                }
            }
            li {
                display: inline-block;
                width: 14%;
                text-align: center;
                position: relative;
                height: 88px;
                line-height:88px;
                color: #333;
                box-sizing:border-box;
                margin-right:0.3%;
                &:nth-child(7n){
                    margin-right:0;
                }
                .dd {
                    position: relative;
                    display: inline-block;
                    font-size: 20px;/*px*/
                    top: -0.2rem;
                }
                &.disabled {
                    color: #a2a2a2;
                }
                &.selected-start {
                    i {
                        &:after {
                            content: "\5165\4F4F";
                        }
                    }
                }
                &.selected-start.onlyOne {
                    i {
                        &:after {
                            content: "\51FA\6E38";
                        }
                    }
                }
                &.selected-end {
                    i {
                        &:after {
                            content: "\79BB\5E97";
                        }
                    }
                }
                &.selected-line {
                    background: #f8d5a8;
                    color: #333;
                    height: 88px;
                    line-height: 88px;
                    &:before {
                        content: "";
                        position: absolute;
                        left: 0;
                        right: 0;
                        transform: scaleY(0.5);
                        transform-origin: 0 0;
                    }
                }
            }
        }
    }
}
.vue-calendar-content #scrollPanelWrapper .month-list li.selected-start,
.vue-calendar-content #scrollPanelWrapper .month-list li.selected-end {
    height: 88px;
    line-height:88px;
    color: #fff;
    background: #d69d54;
    border-bottom: none;
}
.vue-calendar-content #scrollPanelWrapper .month-list li.selected-start i:after,
.vue-calendar-content #scrollPanelWrapper .month-list li.selected-end i:after {
    position: absolute;
    top: 0.26667rem;
    left: 0;
    font-size: 18px;/*px*/
    font-style: normal;
    text-align: center;
    width: 100%;
}
</style>
