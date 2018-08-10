// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import router from './router'
import store from './store/'
import App from './App'
import 'lib-flexible'
import api from "api/api"
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import moment from 'moment'
import {ToastPlugin, TransferDom, ViewBox, BusPlugin,LoadingPlugin} from 'vux'

Vue.use(VueAwesomeSwiper)
Vue.prototype.api = api;
Vue.use(VueRouter)
Vue.use(ToastPlugin);
Vue.use(LoadingPlugin)
Vue.use(BusPlugin);
Vue.component('view-box', ViewBox)
Vue.directive('transfer-dom', TransferDom)

let vm = new Vue();
Vue.prototype.dilog = function (value) {
  vm.$vux.toast.show({
    text: value || "业务处理成功",
    type: 'text',
    width: "5rem",
    position: 'middle'
  });
};
Vue.prototype.loadingEnd = function (value) {
  
  vm.$vux.loading.show({
    text: '加载中...'
  })
};
Vue.prototype.loadingHide = function (value) {
 
  vm.$vux.loading.hide()
};
var interceptor = {
  set: function (recObj, key, value) {
    if(value=='2'){
      vm.loadingEnd()
    }else
    if(value=='3'){
      vm.loadingHide()
    }else {
      vm.dilog(value);
    }
    return this
  }
};
var proxyEngineer = new Proxy(api, interceptor);
Vue.prototype.api = proxyEngineer;

Vue.prototype.terminal = (function() {
    var u = navigator.userAgent; //app = navigator.appVersion;
    return { //浏览器版本信息
        trident: u.indexOf('Trident') > -1,
        presto: u.indexOf('Presto') > -1,
        webKit: u.indexOf('AppleWebKit') > -1,
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') > -1,
        mobile: !!u.match(/AppleWebKit.*Mobile.*/),
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
        iPhone: u.indexOf('iPhone') > -1,
        iPad: u.indexOf('iPad') > -1,
        webApp: u.indexOf('Safari') > -1,
        weixin: u.indexOf('MicroMessenger') > -1 && u.replace(/.*(MicroMessenger\/[^\s]*).*/, "$1").replace("MicroMessenger/", "") || false
    };
});

// 日期选择器
moment.locale('zh-cn', {
    relativeTime: {
      future: '%s',
      past: '%s前',
      s: '几秒',
      m: '1 分钟',
      mm: '%d 分钟',
      h: '1 小时',
      hh: '%d 小时',
      d: '1',
      dd: '%d',
      M: '1 个月',
      MM: '%d 个月',
      y: '1 年',
      yy: '%d 年'
    }
})
// 全局过滤器
Vue.filter('dateToMMDD', function (date) {
    return moment(date, 'YYYY-MM-DD').format('MM月DD日')
})
Vue.filter('dateToDay', function (date) {
    let dayToChinese = {
        0: '日',
        1: '一',
        2: '二',
        3: '三',
        4: '四',
        5: '五',
        6: '六'
    }
    return dayToChinese[moment(date, 'YYYY-MM-DD').format('e')]
})
// const routes = [{
//   path: '/',
//   component: Home1
// },{
//   path: '/hello',
//   name: 'HelloWorld',
//   component: HelloWorld
// }]

// const router = new VueRouter({
//   routes
// })

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
