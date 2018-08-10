// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { DatetimePlugin, AlertPlugin, ConfirmPlugin, LoadingPlugin, ToastPlugin } from "vux";
import FastClick from 'fastclick'
import router from './router'
import App from './App'
import 'lib-flexible'
import moment from 'moment'
import api from "api/api";

Vue.prototype.api = api;
Vue.prototype.$moment=moment
Vue.use(AlertPlugin)
Vue.use(ToastPlugin);
Vue.use(ConfirmPlugin);
Vue.use(LoadingPlugin)

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

FastClick.attach(document.body)

Vue.config.productionTip = false

Vue.use(DatetimePlugin)
/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
