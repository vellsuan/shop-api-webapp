<template>
    <div class="order-button">
        <img src="../assets/tbdd_xuanfu_but.png" alt=""  @click="goToUsercenter"/>
    </div>
</template>
<script>
export default {
    components: {

    },
    data () {
        return{

        }
    },
    mounted () {
    },
    methods:{
        goToUsercenter(){
            let userInfo = JSON.parse(localStorage.getItem("userInfo"));
            if(userInfo&&userInfo.phone){
                if (process.env.NODE_ENV === 'production') {
                    // koa page-router配置跳转地址 不带#号
                    window.location.href = "/homestay/usercenter#/orders?active=0"
                }
                if (process.env.NODE_ENV === 'development') {
                    // vue哈希路有。 带#号
                    window.location.href = "/usercenter.html#/orders?active=0"
                }
            }else{
                let recording = true;
                window.localStorage.setItem("recording",recording);
                if (process.env.NODE_ENV === 'production') {
                    // koa page-router配置跳转地址 不带#号
                    window.location.href = "/homestay/home#/bindphone"
                }
                if (process.env.NODE_ENV === 'development') {
                    // vue哈希路有。 带#号
                    window.location.href = "/home.html#/bindphone"
                }
            }
        }
    }
}
</script>
<style lang="less">
    #app{
        position: relative;
        .order-button{
            position: absolute;
            bottom: 112px;
            right: 30px;
            img{
                width:116px;
                height:116px;
            }
        }
    }
</style>
