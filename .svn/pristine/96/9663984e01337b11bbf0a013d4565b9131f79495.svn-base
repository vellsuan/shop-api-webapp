<template>
    <div id="anchor2" class="rules comm">
        <div>
            <span class="line"></span>
            <span class="text">预订规则</span>
        </div>
        <div class="rules1" v-html="reserveRule">
            <!-- <div>
                <div>
                    <span>退房12:00之前</span>
                </div>
            </div>
            <div>
            </div>
            <div>
                <div>
                    <span>入住15:00以后</span>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {

        }
    },
    props:["reserveRule"]
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
    .rules{
            background:#ffffff;
            box-shadow:0 1px 2px 0 rgba(0,0,0,0.10);
            overflow: hidden;
            // height:250px;
            .rules1{
                    width: 100%;
                    font-size:22px;/*px*/
                    padding: 0 30px 20px;
                    margin:0;
                    p{
                        font-size:22px;/*px*/
                    }
                    div:first-child{
                        height: 74px;
                        width: 342px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        border-left: 3px solid #090b0c;
                        border-bottom: 8px solid #090b0c;
                        div:first-child{
                            text-align: center;
                            background:#090b0c;
                            line-height:46px;
                            width:177px;
                            height:46px;
                            span{
                                font-size:22px;/*px*/
                                color:#ffffff;
                            }
                        }
                    }
                    div:nth-child(2){
                        background:#efefef;
                        width:78px;
                        height:4px;
                        margin-bottom: 1px;
                    }
                    div:last-child{
                        height: 74px;
                        width: 264px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        border-left: 3px solid #090b0c;
                        border-bottom: 8px solid #090b0c;
                        div:first-child{
                            text-align: center;
                            background:#090b0c;
                            line-height:46px;
                            width:177px;
                            height:46px;
                            span{
                                font-size:22px;/*px*/
                                color:#ffffff;
                            }
                        }
                    }
            }
    }
</style>


