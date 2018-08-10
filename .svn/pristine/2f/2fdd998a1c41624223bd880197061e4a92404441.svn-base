<template>
    <div class="integral">
         <x-header :left-options="{backText: ''}">
            <span slot="default">积分管理</span>
            <span slot="right" @click="goExchangeRecord">兑换记录</span>
        </x-header>
        <div class="integral-content">
            <div class="my-integral">
                <div class="my-integral-all">
                    <span>我的积分</span>
                    <span>{{points}}</span>
                </div>
                <div class="points-mall" @click="integralMall">
                    <img src="../assets/jfbj_yq.png" alt="" />
                    <span>积分商城</span>
                    <x-icon type="ios-arrow-right" size="20"></x-icon>
                </div>
            </div>
            <div class="showtitlle">
                <div class="line"></div>
                <p>积分明细</p>
                <div class="line"></div>
            </div>
            <div v-if="dataAll" class="integral-details" >
                <div class="integral-item" v-for="(item,i) in res" :key="i">
                    <div class="integral-item-left">
                        <span>{{res[i].accrueTypeName}}</span>
                        <span>订单号:{{res[i].id}}</span>
                    </div>
                    <div class="integral-item-right">
                        <span>{{(res[i].dt).substring(0,10)}}</span>
                        <span v-if="Number(res[i].points) > 0">+{{res[i].points}}</span>
                        <span v-else id="integral-consume">{{res[i].points}}</span>
                    </div>
                </div>
                <!-- <div class="integral-item">
                    <div class="integral-item-left">
                        <span>登录送积分</span>
                    </div>
                    <div class="integral-item-right">
                        <span>2018-03-21</span>
                        <span>+20</span>
                    </div>
                </div> -->
            </div>
        </div>
        <div class="bg"  v-if="dataZero">
        <blank-data-page>
          <img slot="img" src="../../usercenter/assets/wodedingdnan_kong@2x.png" alt="" />
          <span slot="tips">暂无积分明细</span>

        </blank-data-page>
      </div>
    </div>
</template>
<script>
import { XHeader} from 'vux'
import blankDataPage from '@/components/blankdatapage';
export default {
    components: {
        XHeader,
      'blank-data-page' : blankDataPage,
    },
    data () {
        return {
          dataAll:true,
          dataZero:false,
            res : {},
            points : 0,
            userInfo: JSON.parse(window.localStorage.getItem("userInfo"))
        }
    },
    mounted(){
        this.getTotalIntegral();
        this.getIntegralDetails();
    },
    methods:{
        getTotalIntegral(){
            const params = {
                url : '/integralTotal',
                data : {
                    //cardNo: '600017'
                    cardNo : this.userInfo.cardNo
                }
            }
            this.api.post(params, res=> {
                this.points = res && res.memberInfo.Points;
            });
        },
        getIntegralDetails(){
           /* this.dataAll=false;
            this.dataZero=false;*/
            const params = {
                url : '/integralManage',
                data : {
                    // currentPageNum : 1,
                    // pageCount : 10,
                    //userId : 61
                    userId : this.userInfo.userId
                }
            }
            this.api.post(params, res=> {
                this.res = res && res.list;
              //this.res=[{"accrueTypeCode":"E","accrueTypeName":"积分兑换动作","cardNo":"600082","createTime":1527066478000,"dt":"2018-05-23 17:07:58","id":"639","membernoCode":"C288335A6CF441B4A1A7C1FFF61619FF","membernoName":"15210859211|15210859211 15210859211","memo":"Transaction：Redeem Points；Card No.600082；Remark：-100","placename":"栖君台酒店管理（北京）有限公司-集团-集团","points":"-100","status":"0","userId":9}]
                if(this.res.length){
                  this.dataAll=true;
                  this.dataZero=false;
                }else{
                 this.dataZero=true;
                  this.dataAll=false;
                }
            });
        },
        integralMall(){
            this.$router.push({ path: '/integralexchange'})
        },
        goExchangeRecord(){
            this.$router.push({ path: '/exchangerecord' })
        }
    }
}
</script>
<style lang="less">

    .integral{
      .black-data-page .black-page-btn{
        margin-top: 20%;
      }
      .go-to-visit{
        display: none;
      }
        height: 100%;
        background: #f5f5f5;
        display: flex;
        flex-direction: column;
        overflow: hidden;
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
        .vux-header-right{
            color: rgba(255, 255, 255, 1);
            font-size: 28px;/*px*/
        }
    }
        .integral-content{
            flex: 1;
            overflow-y: auto;
            .my-integral{
                height: 340px;
                background: url(../assets/integral_bg.png) no-repeat center center;
                background-size:100% 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .my-integral-all{
                    margin-left: 60px;
                    display: flex;
                    flex-direction: column;
                    span:first-child{
                        font-size: 28px;/*px*/
                        color: #fff;
                        margin-left: 5px;
                    }
                    span:last-child{
                        line-height: 70px;
                        font-size: 68px;/*px*/
                        color: #fff;
                    }
                }
                .points-mall{
                    background: #8c785e;
                    height: 72px;
                    width: 238px;
                    border-top-left-radius:100px;
                    border-bottom-left-radius:100px;
                    display: flex;
                    align-items: center;
                    img{
                        width: 66px;
                        height: 66px;
                        margin-top: 10px;
                        margin-left: 6px;
                    }
                    span{
                        font-size: 28px;/*px*/
                        color: #fff;
                        margin-left: 6px;
                    }
                    .vux-x-icon{
                        padding-top: 3px;
                        fill: #fff;
                    }
                }
            }
            .showtitlle{
                height: 120px;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                .line{
                    width: 45px;
                    height: 1px/*no*/;
                    background: #747474;
                }
                p{
                    font-size: 28px;/*px*/
                    font-weight: 400;
                    font-stretch: normal;
                    color: #747474;
                    margin: 0 26px;
                }
            }
            .integral-details{
                width: 100%;
                .integral-item{
                    background: #fff;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    height: 168px;
                    margin:0 24px 26px;
                    padding: 0 20px;
                    flex-direction: row;
                    border-radius: 10px;
                    .integral-item-left{
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        span:nth-child(1){
                            font-size: 32px;/*px*/
                            color: #2d2d2d;
                            margin-bottom: 5px;
                            width: 500px;
                            overflow: hidden;
                            text-overflow:ellipsis;
                            white-space: nowrap;
                        }
                        span:nth-child(2){
                            font-size: 24px;/*px*/
                            color:#bbbbbb;
                        }
                    }
                    .integral-item-right{
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        span:nth-child(1){
                            font-size: 24px;/*px*/
                            color: #989898;
                            margin-bottom: 5px;
                        }
                        span:nth-child(2){
                            display: flex;
                            justify-content:flex-end ;
                            font-size: 32px;/*px*/
                            color:#83B000;
                        }
                        #integral-consume{
                            display: flex;
                            justify-content:flex-end ;
                            font-size: 32px;/*px*/
                            color:#2f2f2f;
                        }
                    }
                }
            }
        }
    }
</style>
