<template>
  <popup v-model="goCancel" is-transparent @on-hide="hide">
      <div class="evaluationStyle">
          <div class="userCadrdHeader ">取消订单 <x-icon type="ios-close-empty" preserveAspectRatio="xMidYMid meet" @click.native="goCancel = false"></x-icon>
          </div>
          <div class="cancel-group">
              <div class="order-num-date">
                  <p>温馨提示：</p>
                  <p>1.限时特价、预约资格等购买优惠可能一并取消</p>
                  <p>2.如遇订单拆分，将换成同等价值优惠券返还</p>
                  <p>3.优惠卷不予返还；支付优惠一并取消</p>
              </div>
              <div class="cancel-why">
                <p>请选择取消订单原因（必选）：</p>
                <checker v-model="checkItem" default-item-class="check-item" selected-item-class="check-item-selected">
                  <div class="cancel-list" v-for='(list,index) in items' :key='list.id'>
                      <checker-item :value="index" ></checker-item>
                      <p>{{list.reason}}</p>
                  </div>
                </checker>
              </div>
          </div>
          <div class="userCardbtn">
              <x-button @click.native="submitReview">提交</x-button>
          </div>
      </div>
  </popup>
</template>
<script>
import {
  XButton,
  Popup,
  Checker,
  CheckerItem
} from "vux";
export default {
  components: {
      XButton,
      Popup,
      Checker,
      CheckerItem
    },
    props:['invitor','orderId'],
     data () {
      return {
        goCancel:this.invitor,//因为props是单向传值，所以需要新声明一个局部变量，并将invitor初值赋值给它
        checkItem:'',
        items:[]
      }
    },
    watch:{
      invitor(cur){//监听invitor值的变化
        if(cur == true){//当父组件传递值为true是，则显示
           this.goCancel = true;
           const params = {
              url: "/whyCancel",
              data: {
                type:"1"
              }
            };
            this.api.post(params, res => {
              this.items = res.list;
            })
        }
      },
    },
    methods: {
      //弹层消失事件
      hide(){
        this.$emit('changingType','false');//调用父组件的自定义事件，并传值
        this.checkItem = '';
        this.items = [];
      },
      // 取消订单
      submitReview(){
        console.log(this.checkItem);
        const _this = this
       if(this.checkItem || this.checkItem === 0){
          const params = {
            url: "/cancelOrder",
            data: {
              cancelReason: this.items[this.checkItem].reason,
              orderId: this.orderId
            }
          };
          this.api.post(params, res => {
            this.goCancel = false;
            //取消订单时取消选中项
            this.checkItem = '';
             _this.refreshList()
            this.$vux.toast.show({
                text :"订单取消成功",
                type:"text",
                width:'8.6em',
                position:"middle",
                onShow () {
                  console.log(12321323123);
                }
            });
            //this.refreshList()
          },false);
        }else{
          this.$vux.toast.text("请选择取消原因");
        }

      },
      // 刷新列表
      refreshList(){
        this.$emit('refreshFList','123');
      }
    }
}
</script>
<style lang="less">
  .evaluationStyle {
    width: 100%;
    background-color: #fff;
    margin: 0 auto;
    .userCadrdHeader {
      width: 100%;
      height: 98px;
      line-height: 98px;
      text-align: center;
      font-size:30px;
      color:#000;
      position: relative;
      .vux-x-icon {
        position: absolute;
        right: 10px;
        top: 10px;
        width: 88px;
        height: 88px;
        fill: rgb(216, 216, 216);
      }
    }
    .weui-cells {
      margin: 0;
      padding-bottom: 60px;
      .weui-cell:before {
        height: 0;
        border: 0;
      }
      .weui-cell__hd {
        width: 80px;
        img {
          height: 40px;
          margin: 0 auto;
          display: block;
        }
      }
      .weui-input {
        font-size: 28px;
        color: rgb(45, 45, 45);
      }
      .weui-input::-webkit-input-placeholder {
        color: rgb(187, 187, 187);
      }
      button.weui-btn {
        background-color: #fff;
        padding-left: 30px;
        border-left: 1px solid rgb(216, 216, 216);
        border-radius: 0;
        color: rgb(45, 45, 45);
      }
      .weui-btn:after {
        border: 0;
        height: 0;
      }
    }
    .weui-cells:before {
      height: 0;
      border: 0;
    }
    .userCardbtn {
      border-top: 1PX solid #D9D9D9;
      padding: 10px 30px;
      .weui-btn {
        width: 100%;
        height: 78px;
        line-height: 78px;
        padding: 0;
        border-radius: 6px;
        background-color: rgba(4, 4, 4, 1);
        color: #fff;
        text-align: center;
        font-size: 30px;
      }
    }
    .cancel-group{
      display: flex;
      flex-direction: column;
      padding: 0 30px;
      margin-bottom: 80px;
      .order-num-date{
       p{
          line-height: 48px;
          color: rgba(102, 102, 102, 1);
          font-size: 24px;
          text-align: left;
        }
      }
      .cancel-why{
        &>p{
          line-height: 33px;
          color: rgba(45, 45, 45, 1);
          font-size: 24px;
          text-align: left;
          padding-top: 20px;
        }
        .cancel-list{
          display: flex;
          align-items: center;
          // padding: 30px 0;
          .check-item {
            // font-size: 36px;/*px*/
            // width: 36px;
            // height: 36px;
            // display: block;
            // color: #2d2d2d !important;
            // border: 2px solid #979797;
            // border-radius: 50%;
            width:80px;
            height: 70px;
            background: url(../assets/a3_iconk.png) no-repeat center center;
            background-size:36px 36px;
          }
          .check-item-selected {
              background: url(../assets/a3_icon.png) no-repeat center center;
              background-size: 36px 36px;
              border: 0;
          }
          .vux-tap-active{
              -webkit-tap-highlight-color:transparent;
              &:active{
                  background-color:transparent;
              }
          }
          p{
            padding-left: 10px;
            left: 96px;
            line-height: 70px;
            color: rgba(45, 45, 45, 1);
            font-size: 28px;
            text-align: left;
            width: calc(~"100% - 80px");
          }
        }
      }
    }
  }
</style>
