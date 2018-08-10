<template>
  <div id="app">
    <router-view></router-view>
    <order-button v-show="sidebarShow"></order-button>
  </div>
</template>

<script>
import OrderButton from '@/components/orderbutton';
export default {
    name: 'app',
    data () {    
      return{
        sidebarShow : true
      }
    },
   components: {
     'order-button' : OrderButton
   },
   computed: {
      // displayOrder(){
      //     this.show = false;
      // }
   }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';


body {
  background-color:#ffffff;
}
html,body,#app{
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: inherit;
}
</style>
