import Vue from 'vue';
import Router from 'vue-router';
//import Integral from "../views/index";
//import IntegralExchange from "../views/integralexchange";
//import RedeemList from "../views/redeemlist";
//import ConfirmExchange from "../views/confirmexchange"
//import ExchangeRecord from "../views/exchangerecord"
//import ExchangeDetails from "../views/exchangeDetails"

const Integral = () => import('../views/index');
const IntegralExchange = () => import('../views/integralexchange');
const RedeemList = () => import('../views/redeemlist');
const ConfirmExchange = () => import('../views/confirmexchange');
const ExchangeRecord = () => import('../views/exchangerecord');
const ExchangeDetails = () => import('../views/exchangeDetails');
const goodsDetail = () => import('../views/goodsDetail');

Vue.use(Router)

export default new Router({
  // mode: '',
  routes: [
    {
      path: '/',
      name: 'integral',
      component: Integral
    },
    ,
    {
      path: '/integralexchange',
      name: 'integralexchange',
      component: IntegralExchange
    },
    {
      path: '/redeemlist',
      name: 'redeemlist',
      component: RedeemList
    },
    {
      path: '/confirmexchange',
      name: 'confirmexchange',
      component: ConfirmExchange,
    },
    {
      path: '/exchangerecord',
      name: 'exchangerecord',
      component: ExchangeRecord
    },
    {
      path: '/exchangeDetails',
      name: 'exchangeDetails',
      component: ExchangeDetails
    },
    {
        path: '/goodsDetail',
        name: 'goodsDetail',
        component: goodsDetail
    }
  ]
})
