<template>
  <div class="goodsDetail">
      <x-header :left-options="{backText: ''}">{{goodInfo.couponName}}</x-header>
      <section class="detail-box">
          <div class="detail comm">
              <div class="goods-img">
                  <img :src="imgURL + goodInfo.imgUrl" alt="">
              </div>
              <div class="goods-title">
                 <h4 class="name">{{ goodInfo.couponName }}</h4>
                 <p class="points">{{ goodInfo.credits }}<sub>分</sub></p>
              </div>
              <div class="goods-detail">
                  <div class="detail-title">
                      <span class="line"></span>
                      <span class="text">产品详情</span>
                  </div>
                  <div class="detail-info">
                      <p v-html="productDetail"></p>
                  </div>
              </div>
              <div class="exchange-detail">
                  <div class="detail-title">
                      <span class="line"></span>
                      <span class="text">兑换说明</span>
                  </div>
                  <div class="exchange-info">
                      <p v-html="explainText"></p>
                  </div>
              </div>
          </div>
      </section>
      <footer class="footer" @click="confirmExchange">立即兑换</footer>
  </div>
</template>

<script>
    import { XHeader, Cell, Group, XTextarea, dateFormat, Confirm, TransferDomDirective as TransferDom } from "vux";
    export default {
      directives: {
          TransferDom
      },
      components: {
        XHeader,
        Cell,
        Group,
        XTextarea,
        Confirm
      },
      data () {
        return {
            id: "",
            receiver: "",    //收货人
            phone: "",       //收货人手机号
            address : "",    //收货人地址
            remark : '',                     //备注
            goodInfo: {},
            imgURL: JSON.parse(window.localStorage.getItem("config")).ServerImgURL,
            userInfo: JSON.parse(window.localStorage.getItem("userInfo")) || '',  //获取登录时的用户ID
        };
      },
      created () {
          this.queryGoodsDetail();
      },
      mounted () {

      },
      methods: {
        // 查看兑换商品详情
        queryGoodsDetail () {
            const params = {
              url: "/getGoodsDetail",
              data: {
                couponKeyCode : this.$route.query.couponKeyCode,
                productDetail : '',
                explainText : ''
              }
            };
            this.api.post(params, res => {
                if(res && res.entity) {
                    this.goodInfo = res.entity;
                    this.productDetail = decodeURIComponent(this.goodInfo.productDetail);
                    this.explainText = decodeURIComponent(this.goodInfo.explainText)
                }
            });
        },

        // 点击立即兑换弹窗
        confirmExchange(){
            let route = this.$route.query;
            this.$router.push({ path:'/confirmexchange', query:{ couponKeyCode : route.couponKeyCode ,sendState: route.sendState}})
        }
      }
    };
</script>

<style lang="less">
    .goodsDetail {
        height: 100%;
        background: #f5f5f5;
        display: flex;
        flex-direction: column;
        overflow: hidden;

        .vux-header {
            background:#2d2d2d;
            height:47PX;
            .vux-header-title {
                height:44PX;
                line-height:44PX;
                font-size: 32px;
                font-weight:400;
            }
            .vux-header-left {
                .left-arrow {

                }
                .left-arrow:before {
                    width:10PX;
                    height:10PX;
                    border-width: 2PX 0 0 2PX;
                    top: 0;
                    bottom:0;
                    margin:auto;
                }
            }
        }
        .detail-box {
            position: relative;
            overflow-y: scroll;
            padding-bottom: 98px;
            div.comm {
                margin-bottom: 20px;
                background: #f5f5f5;
                box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
                div.detail-title {
                    display: flex;
                    padding-left: 30px;
                    height: 120px;
                    align-items: center;
                    .line {
                        width: 3px; /*no*/
                        height: 24px;
                        margin-right: 20px;
                        opacity: 0.5;
                        background: #B6A382;
                        border-radius: 100px;
                    }
                    .text {
                        font-size: 30px;
                        color: #2d2d2d;
                    }
                }
            }
            .detail {
                background: #ffffff;
                box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);

                .goods-img {
                    width: 100%;
                    margin: 0 auto;
                    img {
                        display: block;
                        width: 100%;
                    }
                }

                .goods-title {
                    box-sizing: border-box;
                    padding: 20px 30px;
                    height: 148px;
                    background-color: #fff;
                    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1);

                    .name {
                        height: 42px;
                        line-height: 42px;
                        color: rgba(45, 45, 45, 1);
                        font-size: 30px;
                        text-align: left;
                        font-family: PingFangSC-Regular;
                    }

                    .points {
                        height: 50px;
                        line-height: 50px;
                        margin-top: 12px;
                        color: rgba(182, 163, 130, 1);
                        font-size: 36px;
                        text-align: left;
                        font-family: PingFangSC-Semibold;

                        sub {
                            font-size: 24px;
                            margin-left: 10px;
                            vertical-align: inherit;
                        }
                    }
                }

                .goods-detail {
                    background: #fff;
                    margin-top: 20px;
                    .detail-info {
                        box-sizing: border-box;
                        padding: 0 30px 40px;
                        color: #2D2D2D;
                        font-size: 26px;
                        text-align: left;
                    }
                }

                .exchange-detail {
                    background: #fff;
                    margin-top: 20px;
                    .exchange-info {
                        box-sizing: border-box;
                        padding: 0 30px 40px;
                        line-height: 44px;
                        color: #2D2D2D;
                        font-size: 26px;
                        text-align: left;
                        font-family: PingFangSC-Regular;
                    }
                }
            }
        }
        .footer {
            position: fixed;
            bottom: 0;
            width: 100%;
            height: 98px;
            line-height: 98px;
            background-color: rgba(4, 4, 4, 1);
            color: rgba(255, 255, 255, 1);
            font-size: 30px;
            text-align: center;
            font-family: PingFangSC-Semibold;

        }
    }
</style>
