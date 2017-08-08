import Vue from 'vue'
import App from './App'
import router from './router'
// import axios from 'axios'
import VueResource from 'vue-resource'
import fastclick from 'fastclick'

// Vue.prototype.axios = axios
Vue.use(VueResource)

Vue.config.productionTip = false

import '@/common/stylus/index.styl'

fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
