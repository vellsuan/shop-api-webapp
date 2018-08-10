<template>
  <popup v-model="goEvaluation" is-transparent @on-hide="hide">
      <div class="evaluationStyle">
          <div class="userCadrdHeader vux-1px-b">评价 <x-icon type="ios-close-empty" preserveAspectRatio="xMidYMid meet" @click.native="goEvaluation = false"></x-icon>
          </div>
          <div class="assess-group">
              <div class="order-num-date vux-1px-b">
                  <div class="order-num">订单号：{{orderNo}}</div>
                  <div class="order-day">{{createTimeStr}}</div>
              </div>
              <rater v-model="commentGrade" :font-size="40" :margin="15" :min="1"></rater>
              <p>总体评价</p>
              <group>
                  <x-textarea placeholder="您可以聊聊酒店服务、位置、设施、环境卫生等方面的个人体验，所有真实有效的评价都会被显示。" v-model="commentContent"></x-textarea>
              </group>
          </div>
          <div class="userCardbtn">
              <x-button @click.native="submitReview">提交评价</x-button>
          </div>
      </div>
  </popup>
</template>
<script>
import {
  XButton,
  Popup,
  XTextarea,
  Rater,
  Group,
} from "vux";
export default {
  components: {
    XButton,
    Popup,
    XTextarea,
    Rater,
    Group,
  },
  props:['comment','orderId','createTimeStr','orderNo'],
  data () {
    return {
      goEvaluation:this.comment,
      commentContent:'',
      commentGrade:5
    }
  },
  watch:{
      comment(cur){
        //监听comment值的变化
        if(cur == true){//当父组件传递值为true是，则显示
           this.goEvaluation = true;
        }
      },
    },
  methods: {
    // 弹层消失事件
    hide(){
        this.$emit('changeComment','false');//调用父组件的自定义事件，并传值
      },

    // 提交评价
    submitReview() {
      const params = {
        url: "/submitReview",
        data: {
          userId: JSON.parse(window.localStorage.getItem("userInfo")).userId,
          commentContent: this.commentContent,
          commentGrade: this.commentGrade,
          commentImgs: "",
          orderId: this.orderId
        }
      };
      this.api.post(params, res => {
        console.log(res);
        this.commentGrade = 5;
        this.commentContent = "";
        this.goEvaluation = false;
        this.items = [];
        this.currentPageNum = 1;
        // this.getOrder({ orderStatus: 3, isEvaluate: 0 });
        this.$emit('refreshFList','1231');
      });
    },
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
      color: #000;
      font-size: 30px;
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
    .assess-group {
      display: flex;
      flex-direction: column;
      .order-num-date {
        height: 96px;
        margin: 0 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 24px;
        color: #666666;
      }
      .vux-rater {
        margin: 80px auto 20px;
      }
      p {
        font-size: 28px;
        color: #666666;
        text-align: center;
        margin-bottom: 80px;
      }
      .weui-cells {
        .vux-x-textarea {
          .weui-cell__bd {
            .weui-textarea {
              background: #f5f5f5;
              border: 1px solid #eeeeee; /* no */
              border-radius: 6px; /* no */
              border-top: 0;
              width: 688px;
              height: 228px;
              font-size: 24px;
              padding: 30px;
            }
          }
        }
      }
    }
    .cancel-group{
      display: flex;
      flex-direction: column;
      padding: 0 30px;
      .order-num-date{
       p{
          line-height: 36px;
          color: rgba(102, 102, 102, 1);
          font-size: 24px;
          text-align: left;
        }
      }
    }
  }
</style>
