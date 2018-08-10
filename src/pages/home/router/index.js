import Vue from 'vue'
import Router from 'vue-router'
//import Index from "../views/index"
//import MemberCard from "../views/membercard"
//import OnePriceEnjoy from "../views/onepriceenjoy"
//import TourismProject from "../views/tourismproject"
//import OrderButton from "@/components/orderbutton"
//import Index from "@/components/sidebar"
//import BindPhone from "@/components/bindphone"
//import PaymentSuccess from "@/components/paymentsuccess"
//import PaymentFailed from "@/components/paymentfailed"

const OnePriceEnjoy= () => import('../views/membercard');
const MemberCard= () => import('../views/onepriceenjoy');
const TourismProject= () => import('../views/tourismproject');
const OrderButton= () => import('@/components/orderbutton');
const Index = () => import('@/components/sidebar');
const BindPhone = () => import('@/components/bindphone');
const PaymentSuccess = () => import('@/components/paymentsuccess');
const PaymentFailed = () => import('@/components/paymentfailed');



Vue.use(Router)

export default new Router({
  // mode: "history",
  routes: [
    {
      path: "/",
      name: "index",
      component: Index
    },
    {
      path: "/membercard",
      name: "memberCard",
      component: MemberCard
    },
    {
      path: "/onepriceenjoy",
      name: "onePriceEnjoy",
      component: OnePriceEnjoy
    },
    {
      path: "/tourismproject",
      name: "tourismproject",
      component: TourismProject
    },
    {
      path: "/orderbutton",
      name: "orderbutton",
      component: OrderButton
    },
    {
      path: "/bindphone",
      name: "bindphone",
      component: BindPhone
    },
    {
      path: "/paymentsuccess",
      name: "paymentsuccess",
      component: PaymentSuccess
    },
    {
      path: "/paymentfailed",
      name: "paymentfailed",
      component: PaymentFailed
    }
  ]
});
