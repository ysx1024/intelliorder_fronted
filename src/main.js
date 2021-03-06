import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import VueAxios from 'vue-axios'
import * as echarts from 'echarts'
import qs from 'qs';

Vue.use(VueAxios, axios)
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$echarts=echarts
Vue.prototype.$qs = qs

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
