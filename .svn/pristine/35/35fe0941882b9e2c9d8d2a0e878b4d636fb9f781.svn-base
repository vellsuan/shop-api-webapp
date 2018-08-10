<template>
   <div class="exchangerecord">
        <x-header :left-options="{backText: ''}">兑换记录</x-header>
        <tab active-color="#2d2d2d" default-color="#989898" bar-active-color="#b6a382" custom-bar-width="17px">
            <tab-item :selected="exchange" @on-item-click="onItemClick">全部</tab-item>
            <tab-item :selected="toBeDelivered" @on-item-click="onItemClick">待发货</tab-item>
            <tab-item :selected="received" @on-item-click="onItemClick">已发货</tab-item>
        </tab>
        <div class="exchange-list wrapper" v-if="dataAll">
          <Scroll ref="scroll"
                  :data='items'
                  :pullUpLoad="pullUpLoad"
                  :listenScrollEnd="true"
                  @pullingUp="onItemClick(index,currentPageNum)">
            <div class="exchange-detial content">
                <div class="exchange-card" v-for="list in items" :key="list.id">
                    <!-- <router-link :to="'/detail?id=' + 1"> -->
                    <div class="exchange-card-order vux-1px-b">
                        <div class="exchange-num">订单号：{{list.exchangeId}}</div>
                        <!-- <div class="exchange-status" :class="'active' +list.sendStatus" v-if="list.sendStatus == 0">待发货</div>
                        <div class="exchange-status" :class="'active' +list.sendStatus" v-else>已发货</div> -->
                        <div class="exchange-status" :class="'active' +list.sendStatus">{{list.sendStatus | sendStatus}}</div>
                    </div>
                    <div class="exchange-card-detail vux-1px-b">
                      <router-link :to="'/exchangeDetails?id=' + list.id">
                          <div class="exchange-detail-img">
                              <img :src="imgURL + list.img" alt="" />
                          </div>
                          <div class="exchange-detail-title">
                              <span>{{list.productName}}</span>
                          </div>
                          <div class="exchange-detail-cell">
                              <img src="../assets/a1_icon.png" alt="" />
                          </div>
                      </router-link>
                    </div>
                    <div class="exchange-card-integral vux-1px-b">
                      <div class="exchange-l">
                        <span>{{list.createTime | dateFormat}}</span>
                      </div>
                      <div class="exchange-r">
                        <span>消费积分：</span>
                        <span>{{list.num}}</span>
                      </div>
                    </div>
                    <!-- </router-link> -->
                    <div class="exchange-card-b">
                      <router-link :to="'/exchangeDetails?id=' + list.id">
                        <x-button class="payment" mini plain>查看信息</x-button>
                      </router-link>
                    </div>
                </div>
            </div>
          </Scroll>
        </div>
        <div class="exchange-list wrapper" ref="wrapper" v-else>
            <blank-data-page>
              <img slot="img" src="../assets/zanwujifen_kong@2x.png" alt="" />
              <span slot="tips">暂无兑换记录</span>
              <a slot="goToVisit" href="/homestay/integral#/integralexchange">
                    <span>去逛逛</span>
              </a>
            </blank-data-page>
        </div>
    </div>
</template>
<script>
import BScroll from "better-scroll";
import {XHeader, Tab, TabItem, XButton, Popup, XTextarea, LoadMore, Rater, Group,dateFormat} from "vux";
import blankDataPage from '@/components/blankdatapage';
import Scroll from '@/components/scroll';
export default {
  components: {
    XHeader,
    Tab,
    XTextarea,
    TabItem,
    XButton,
    LoadMore,
    Popup,
    XButton,
    Rater,
    Group,
    Scroll,
    'blank-data-page' : blankDataPage,
  },
  data() {
    return {
      dataAll:true,
      items: [],
      currentPageNum: 1,          //页面
      index: 0,                   //选项卡index
      show: false,                //上拉加载
      showdata: false,            //上拉加载
      exchange: true,             //选项卡（全部）
      toBeDelivered: false,       //选项卡（待发货）
      received: false,            //选项卡（已发货）
      commentGrade: 5,
      commentContent: "",
      userInfo : JSON.parse(window.localStorage.getItem("userInfo")),
      imgURL: JSON.parse(window.localStorage.getItem("config")).ServerImgURL,
      pullUpLoad: {
          threshold: 50,
          txt: {more: '', noMore: '没有更多了'}
        },
    };
  },
  created() {
     this.onItemClick(this.index);
  },
  methods: {
    onItemClick(index, currentPageNum) {
      this.index = index;
      this.showdata = false;
      if (!currentPageNum) {
        this.currentPageNum = 1;
        this.items = [];
        if(this.$refs.scroll){
          this.$refs.scroll.scrollTo(0,0,0,'bounce')
        }
      }

      if (index == 0) {
        this.recordData({ sendStatus: ""});
      } else if (index == 1) {
        this.recordData({ sendStatus: 0 });
      } else if (index == 2) {
        this.recordData({ sendStatus: 1 });
      }
    },
    recordData(obj) {
      const params = {
        url: "/recordData",
        data: {
          cardNo: this.userInfo.cardNo,
          currentPageNum: this.currentPageNum++,
          pageCount: 3,
          userId: this.userInfo.userId,
          sendStatus: isNaN(obj.sendStatus) ? "" : obj.sendStatus,
          isdel : "0"
        }
      };
      this.api.post(params, res => {
        if (res.page.datas[0]) {
          this.items = this.items.concat(res.page.datas);
          this.show = false;
        } else {
          this.showdata = true;
          this.show = false;
          this.$refs.scroll.forceUpdate()
        }
        if(this.items.length){
          this.dataAll=true;
        }else{
          this.dataAll=false;
        }
        // this.$nextTick(() => {
        //   if (!this.scroll) {
        //     this.scroll = new BScroll(this.$refs.wrapper, {click : true});
        //     this.scroll.on("touchEnd", pos => {
        //       // 上拉动作
        //       if (pos.y < this.scroll.maxScrollY - 50) {
        //         this.show = true;
        //         this.onItemClick(this.index, this.currentPageNum++);
        //       }
        //     });
        //   } else {
        //     this.scroll.refresh();
        //   }
        // });
      },false,msg=>{

      },false);
    }
  },
  filters: {
    dateFormat,
    sendStatus(value){
        switch (value) {
            case "0":
                return '待发货'
                break;
            case "1":
                return '已发货'
                    break;
            case "2":
                return '已完成'
                break;
            default:
                break;
        }
    },
  }
};
</script>
<style lang="less">
.exchangerecord {
  height: 100%;
  background: #efeff4;
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
  .vux-tab {
    height: 98px;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.1);
    z-index: 1;
    .vux-tab-item {
      background: #fff;
      font-size: 28px; /* px */
    }
    .vux-tab-ink-bar{
      .vux-tab-bar-inner{
        border-radius: 100px;
      }
    }
  }
  .exchange-list {
    flex: 1;
    overflow: auto;
    .exchange-detial {
      margin: 20px 30px 0;
      padding-bottom: 40px;
      .exchange-card {
        margin-bottom: 20px;
        background: #ffffff;
        box-shadow: 0 2px 4px 0 rgba(83, 83, 83, 0.1);
        border-radius: 7px;
        padding: 0 30px 20px;
          .exchange-card-order{
            height: 96px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .exchange-num {
              font-size: 26px;/*px*/
              color: rgba(102, 102, 102, 1);
            }
            .exchange-status {
              font-size: 28px;/*px*/
              color: rgba(26, 173, 25, 1);
            }
            .active0 {
              color: rgba(234, 84, 20, 1);
            }
            .active1 {
              color: rgba(26, 173, 25, 1);
            }
            .active2 {
              color: #b6a382;
            }
          }
          .exchange-card-detail{
            height: 144px;
            padding: 14px 0;
            display: flex;
            align-items: center;
            a{
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: space-between;
              .exchange-detail-img{
                width: 116px;
                height: 100%;
                border-radius: 50%;
                overflow:hidden;
                margin-right: 24px;
                line-height: 100%;
                img{
                  width: 100%;
                  height: 100%;
                }
              }
              .exchange-detail-title{
                flex: 1;
                span{
                  line-height: 40px;
                  color: rgba(45, 45, 45, 1);
                  font-size: 28px;/*px*/
                }
              }
              .exchange-detail-cell{
                margin-left: 14px;
                  img{
                    width: 12px;
                    height: 20px;
                  }
              }
            }
          }
          .exchange-card-integral{
            height: 74px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 0;
            .exchange-l{
              line-height: 33px;
              color: rgba(152, 152, 152, 1);
              font-size: 24px;/*px*/
            }
            .exchange-r{
              span:nth-child(1){
                color: rgba(45, 45, 45, 1);
                font-size: 24px;/*px*/
              }
              span:nth-child(2){
                color: rgba(234, 84, 20, 1);
                font-size: 30px;/*px*/
              }
            }
          }
          .exchange-card-b{
            margin-top: 20px;
            display: flex;
            justify-content:flex-end;
            height: 58px;
            .weui-btn{
              margin: 0;
            }
            .weui-btn_mini{
              padding:0 .5rem;
            }
            button{
              height: 100%;
              line-height: 40px;
              color: rgba(45, 45, 45, 1);
              font-size: 28px;/*px*/
            }
          }
      }
    }
  }
}
</style>
