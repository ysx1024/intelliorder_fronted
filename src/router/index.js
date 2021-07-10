import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminManagement from '../views/Admin/AdminManagement.vue'
import CookerInformation from '../views/Cook/CookerInformation.vue'
import CookDishlist from "../views/Cook/CookDishlist.vue";

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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
