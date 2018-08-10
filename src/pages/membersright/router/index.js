import Vue from 'vue'
import Router from 'vue-router'
//import  membersright from "../views/membersright"
//import  registemessage from "../views/registemessage"
//import  confirmation from "../views/confirmation"
//import  cardsright from "../views/cardsright"
//import  cardbug from "../views/cardbug"
//import  paymemtsuccess from "@/components/paymentsuccess"
//import  paymentfailed from "@/components/paymentfailed"

const membersright = () => import('../views/membersright');
const registemessage = () => import('../views/registemessage');
const confirmation = () => import('../views/confirmation');
const cardsright = () => import('../views/cardsright');
const cardbug = () => import('../views/cardbug');
const paymemtsuccess = () => import('@/components/paymentsuccess');
const paymentfailed = () => import('@/components/paymentfailed');

Vue.use(Router)

export default new Router({
  // mode: "history",
  routes: [
    {
      path: "/",
      name: "membersright",
      component: membersright
    },
    {
      path: "/registemessage",
      name: "registemessage",
      component: registemessage
    },
    {
      path: "/confirmation",
      name: "confirmation",
      component: confirmation
    },
    {
      path: "/cardsright",
      name: "cardsright",
      component: cardsright
    },
    {
      path: "/cardbug",
      name: "cardbug",
      component: cardbug
    },
    {
      path: "/paymemtsuccess",
      name: "paymemtsuccess",
      component: paymemtsuccess
    },
    {
      path: "/paymentfailed",
      name: "paymentfailed",
      component: paymentfailed
    }
  ]
});
