import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutation'
import actions from './actions'
// import getters from './getters'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const state = {
  roomDetails:{},               //房间详情
  selectTourCode:[],             //选中的相关旅游项目
  checkInOutInfo:{
    checkinDate: '',  //入住时间
    checkoutDate: '',   //离店时间
    startTime:''       //开始时间戳
  },   //日期
  isUseInvoice:false,     //是否需要发票
  invoiceType:1,   //1-普通发票 2-增值税发票
  invoiceContent:{},   //发票信息
  orderContent:{}       //订单信息
}

localStorage.state=JSON.stringify(state);

export default new Vuex.Store({
  state,
  actions,
  mutations,
  plugins: [createPersistedState()]
})
