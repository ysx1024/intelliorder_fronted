import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminManagement from '../views/Admin/AdminManagement.vue'
import AdminDishManage from "../views/Admin/AdminDishManage";
import CookerInformation from '../views/Cook/CookerInformation.vue'
import CookDishlist from "../views/Cook/CookDishlist.vue";
import ReceptionInformation from "../views/Reception/ReceptionInformation"
import WaiterInformation from "../views/Waiter/WaiterInformation"
import OrderList from "../views/Reception/OrderList";
import BusinessData from "../views/Admin/BusinessData";
import AdminInformation from "../views/Admin/AdminInformation";
import Service from "../views/Waiter/Service";
import Login from "../views/Login/Login";


Vue.use(VueRouter)

const routes = [
  {
    path: '/cook/cookerInformation',
    name: 'CookerInformation',
    component: CookerInformation
  },
  {
    path: '/cook/cookDishlist',
    name: 'CookDishlist',
    component: CookDishlist
  },
  {
    path: '/admin/adminmanagement',
    name: 'AdminManagement',
    component: AdminManagement
  },
  {
    path: '/admin/admindishmanage',
    name: 'AdminDishManage',
    component: AdminDishManage
  },
  {
    path: '/admin/businessdata',
    name: 'BusinessData',
    component: BusinessData
  },{
    path: '/admin/admininformation',
    name: 'AdminInformation',
    component: AdminInformation
  },
  {
    path: '/reception/receptionInformation',
    name: 'ReceptionInformation',
    component: ReceptionInformation
  },
  {
    path: '/reception/orderList',
    name: 'OrderList',
    component: OrderList
  },
  {
    path: '/waiter/waiterInformation',
    name: 'WaiterInformation',
    component: WaiterInformation
  },
  {
    path: '/waiter/service',
    name: 'Service',
    component: Service
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
