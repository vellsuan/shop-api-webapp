<template>
    <div id="anchor3" class="cancelRules comm">
            <div>
                <span class="line"></span>
                <span class="text">取消规则</span>
            </div>
            <div class="cancelRulesContent" v-html="cancelRule">
                <!-- <div>
                    <span></span>
                    <span>提前72小时免费取消</span>
                </div>
                <div><span></span><span>72小时内扣除整单房费50%</span></div>
                <div><span></span><span>24小时之内取消扣全额</span></div> -->
            </div>
    </div>
</template>

<script>
export default {
    data () {
        return {

        }
    },
    props:["cancelRule"]
}
</script>

<style lang="less" scoped>
    div.comm{
        margin-bottom: 20px;
        background:#ffffff;
        box-shadow:0 1px 2px 0 rgba(0,0,0,0.10);
        
        > div:first-child{
            display: flex;
            padding-left: 30px;
            height: 120px;
            align-items: center;
            .line{
                background:#b6a382;
                border-radius:100px;
                width:3px;/*no*/
                height:24px;
                opacity: 0.5;
                // margin-top: 14px;
                margin-right: 20px;
            }
            .text{
                font-size:30px;/*px*/
                color:#2d2d2d;
            }
        }
        > div:last-child{
            margin-top: 14px;
            // margin-bottom: 40px;
        }
    }
    .cancelRules{
            background:#ffffff;
            box-shadow:0 1px 2px 0 rgba(0,0,0,0.10);
            // height:342px;
            .cancelRulesContent{
                padding:0 30px 30px;
                margin: 0;
                font-size:22px;/*px*/
                overflow: hidden;
                p{
                    font-size:22px;/*px*/
                }
                div{
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
                div:first-child{
                    span:first-child{
                        width:70px;
                        height:70px;
                        display: block;
                        background-image: url(../pages/price_enjoy/assets/tb_72s.png);
                        background-size: 100%;
                    }
                    span:last-child{
                        text-align: center;
                        font-size:20px;/*px*/
                        color:#2d2d2d;
                        line-height:36px;
                        width:49%;
                        display: block;
                    }
                }
                div:nth-child(2){
                    span:first-child{
                        width:70px;
                        height:70px;
                        display: block;
                        background-image: url(../pages/price_enjoy/assets/tb_48s.png);
                        background-size: 100%;
                    }
                    span:last-child{
                        text-align: center;
                        font-size:20px;/*px*/
                        color:#2d2d2d;
                        line-height:36px;
                        width:56%;
                        display: block;
                    }
                }
                div:last-child{
                    span:first-child{
                        width:70px;
                        height:70px;
                        display: block;
                        background-image: url(../pages/price_enjoy/assets/tb_24s.png);
                        background-size: 100%;
                    }
                    span:last-child{
                        text-align: center;
                        font-size:20px;/*px*/
                        color:#2d2d2d;
                        line-height:36px;
                        width:50%;
                        display: block;
                    }
                }

            }
    }
</style>


