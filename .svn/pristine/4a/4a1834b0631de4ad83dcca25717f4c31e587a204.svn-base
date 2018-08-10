import Vue from 'vue'
import Router from 'vue-router'

//import travelproject from "../views/index"
//import TravelProjectOrder from "../views/travelprojectorder"

const travelproject = () => import('../views/index');
const TravelProjectOrder = () => import('../views/travelprojectorder');



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/:id',
      name: 'travelproject',
      component: travelproject
    },
    {
      path: '/travelprojectorder',
      name: 'travelprojectorder',
      component: TravelProjectOrder
    }
  ]
})
