import Vue from 'vue'
import Router from 'vue-router'
//import userCenter from "../views/index"
//import Coupon from "../views/coupon";
//import Orders from "../views/orders";
//import Detail from "../views/detail";
//import PersonalInfo from "../views/personalinfo";
//import BindEmail from "../views/bindemail";
//import ShippingAddress from "../views/shippingaddress";
//import AddShipping from "../views/addshipping";
//import  Cardsright from "../views/cardsright"
//import  Cardbug from "../views/cardbug"
//import PaymentSuccess from "@/components/paymentsuccess";
//import BlankDataPage from "@/components/blankdatapage";

const userCenter = () => import('../views/index');
const Coupon = () => import('../views/coupon');
const Orders = () => import('../views/orders');
const Detail = () => import('../views/detail');
const PersonalInfo = () => import('../views/personalinfo');
const BindEmail = () => import('../views/bindemail');
const ShippingAddress = () => import('../views/shippingaddress');
const AddShipping = () => import('../views/addshipping');
const Cardsright = () => import('../views/cardsright');
const Cardbug = () => import('../views/cardbug');
const PaymentSuccess = () => import('@/components/paymentsuccess');
const PaymentFailed = () => import('@/components/paymentfailed');
const ContactUs = () => import('@/components/contactus');


Vue.use(Router)

export default new Router({
  // mode: '',
  routes: [
    {
      path: "/",
      name: "userCenter",
      component: userCenter
    },
    {
      path: "/coupon",
      name: "Coupon",
      component: Coupon
    },
    {
      path: "/orders",
      name: "Orders",
      component: Orders
    },
    {
      path: "/detail",
      name: "Detail",
      component: Detail
    },
    {
      path: "/personalinfo",
      name: "PersonalInfo",
      component: PersonalInfo,
    },
    {
      path: "/bindemail",
      name: "bindemail",
      component: BindEmail
    },
    {
      path: "/shippingaddress",
      name: "shippingaddress",
      component: ShippingAddress
    },
    {
      path: "/addshipping",
      name: "addshipping",
      component: AddShipping
    },
    {
      path: "/cardbug",
      name: "cardbug",
      component: Cardbug
    },
    {
      path: "/cardsright",
      name: "cardsright",
      component: Cardsright
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
    },
    {
      path: '/contactus',
      name: 'contactus',
      component: ContactUs
    }
    // {
    //   path: "/blankdatapage",
    //   name: "blankdatapage",
    //   component: BlankDataPage
    // }
  ]
});
