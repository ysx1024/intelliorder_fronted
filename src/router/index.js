import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminManagement from '../views/Admin/AdminManagement.vue'
import AdminDishManage from "../views/Admin/AdminDishManage";
import CookerInformation from '../views/Cook/CookerInformation.vue'
import CookDishlist from "../views/Cook/CookDishlist.vue";
import ReceptionInformation from "../views/Reception/ReceptionInformation"
import WaiterInformation from "../views/Waiter/WaiterInformation"

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
    path: '/reception/receptionInformation',
    name: 'ReceptionInformation',
    component: ReceptionInformation
  },
  {
    path: '/waiter/waiterInformation',
    name: 'WaiterInformation',
    component: WaiterInformation
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
