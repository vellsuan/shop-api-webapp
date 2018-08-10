import Vue from 'vue'
import Router from 'vue-router'
//import priceenjoy from "../views/index"
//import PriceEnjoyOrder from "../views/priceenjoyorder"
//import InvoicePage from "@/components/invoicepage"
//import PaymentSuccess from "@/components/paymentsuccess"
//import PayFailed from "@/components/orderfailed"

const priceenjoy = () => import('../views/index');
const PriceEnjoyOrder = () => import('../views/priceenjoyorder');
const InvoicePage = () => import('@/components/invoicepage');
const PaymentSuccess = () => import('@/components/paymentsuccess');
const PayFailed = () => import('@/components/orderfailed');

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'priceenjoy',
      component: priceenjoy
    },
    {
      path: '/priceenjoyorder',
      name: 'priceenjoyorder',
      component: PriceEnjoyOrder
    },
    {
      path: '/invoicepage/:totalPrice',
      name: 'invoicepage',
      component: InvoicePage
    },
    {
      path: '/paymentsuccess',
      name: 'paymentsuccess',
      component: PaymentSuccess
    },
    {
      path: '/payfailed',
      name: 'payfailed',
      component: PayFailed
    }
  ]
})
