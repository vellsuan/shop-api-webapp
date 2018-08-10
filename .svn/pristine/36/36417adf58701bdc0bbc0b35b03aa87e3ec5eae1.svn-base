<template>
    <div id="anchor1" class="price comm">
        <div>
            <span class="line"></span>
            <span class="text">价格包含</span>
        </div>
        <div class="pricebg"  :style="priceIncludeImg">
            <!-- <img :src="priceIncludeImg" alt=""> -->
            <div class="contentfont" v-html="decodeURIComponent(content.priceInclude)" >

            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            imgUrl:"",
        }
    },
    props:["content"],
    mounted(){
        let config=JSON.parse(window.localStorage.getItem("config"));
        this.imgUrl=config.ServerImgURL;
    },
    computed:{
        priceIncludeImg(){

            if(this.content&&this.content.priceIncludeImg){
                return `background: url(${this.imgUrl + this.content.priceIncludeImg}) no-repeat;background-size: cover;`;
            }
        }
    }
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
    }
    .price{
        height:408px;
        .pricebg{
            height:234px;

            display: flex;
            justify-content: center;
            align-items: center;
            background-size: 100% 100%;
            span{
                width: 574px;
                height: 132px;
                font-size:22px;/*px*/
                color:#ffffff;
                line-height:44px;
                text-align: center;
                overflow: hidden;
            }
        }
    }
  .contentfont{
    height:134px;
    overflow : hidden;
    padding-left: 88px;
    padding-right: 88px;
    line-height:42px;
  }
</style>


