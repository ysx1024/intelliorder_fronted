import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminManagement from '../views/Admin/AdminManagement.vue'
import CookerInformation from '../views/Cook/CookerInformation.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/cook/cookerInformation',
    name: 'CookerInformation',
    component: CookerInformation
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
