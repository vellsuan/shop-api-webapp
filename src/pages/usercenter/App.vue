<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
html,body,#app{
  height: 100%;
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: inherit;
}
.vux-alert .vux-x-dialog .weui-dialog{
  border-radius: 12px;
  .weui-dialog__hd{
    height: 1.30667rem;
    line-height: 1.30667rem;
    padding: 0;
    position: relative;
    &::after{
        content: " ";
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        height: 1PX;
        border-bottom: 1PX solid #C7C7C7;
        color: #C7C7C7;
        -webkit-transform-origin: 0 100%;
        transform-origin: 0 100%;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
    }
  }
  .weui-dialog__bd{
    padding: 0.8rem 0.64rem;
    line-height: 0.69333rem;
    color:#333;
  }
  .weui-dialog__ft{
    width: 6.24rem;
    height: 1.12rem;
    margin: 0 auto 0.26667rem;
    border-radius: 8px;
    background-color: rgba(9, 11, 12, 1);
    .weui-dialog__btn_primary{
      color: rgba(251, 251, 251, 1);
      font-size: 16px;
      text-align: center;
    }
  }
}
</style>
