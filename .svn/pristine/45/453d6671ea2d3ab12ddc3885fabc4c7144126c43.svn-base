// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import router from './router'
import App from './App.vue'
import 'lib-flexible'
import api from "api/api";
import moment from 'moment'
import {ToastPlugin,LoadingPlugin } from 'vux'

/*window.location.replace("/homestay/priceenjoyDetails")*/
/*history.replaceState(null,"订单确认","/homestay/priceenjoyDetails");*/
Vue.prototype.$moment=moment
Vue.prototype.api = api;
Vue.use(VueRouter)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin);
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
    
    // console.log(key, 'is changed to', value); //name is changed to lisi
    return this
  }
};
var proxyEngineer = new Proxy(api, interceptor);
Vue.prototype.api = proxyEngineer;
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
  render: h => h(App)
}).$mount('#app-box')
