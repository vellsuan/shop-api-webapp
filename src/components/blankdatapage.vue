<template>
    <div class="black-data-page">
        <div class="black-page-img">
            <div class="images">
                <slot name="img"></slot>
                <!-- <img src="../assets/wodedingdnan_kong@2x.png" alt="" /> -->
            </div>
            <div class="tips">
                <slot name="tips"></slot>
                <!-- <span>还没有订单哦</span> -->
            </div>    
        </div>
        <div class="black-page-btn">
            <div class="go-to-visit">
                <slot name="goToVisit"></slot>
                <!-- <a slot="goToVisit" href="">
                    <span>去逛逛</span>
                </a> -->
            </div>
        </div>   
    </div>
</template>

<script>

export default {
    components: {
       
    },
    data () {
        return {
            
        }
    },
    mounted () {

    },
    methods: {
        
    }
}
</script>

<style lang="less">
    .black-data-page{
        height: 100%;
        padding-top: 100px;
        .black-page-img{
            width: 100%;
            .images{
                width: 242px;
                height: 242px;
                margin: 0 auto 30px;
                img{
                    width: 100%;
                }
            }
            .tips{
                text-align: center;
                span{
                    font-size: 28px;/*px*/
                    color: #989898;
                }
            }
        }
        .black-page-btn{
            margin-top: 70px;
            .go-to-visit{
                margin: 0 auto;
                width: 302px;
                height: 98px;
                border-radius: 100px;
                border: 1PX solid #040404;
                text-align: center;
                line-height: 98px;
                a{
                    display: block;
                    width: 100%;
                    height: 100%;
                }
                span{
                    font-size: 32px;/*px*/
                    color: #2d2d2d;
                }
            }
        }
    }
</style>
