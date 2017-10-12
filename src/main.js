import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import tools from './extend/tools'

Vue.prototype.$http = axios
Vue.prototype.$tools = tools

//路由初始化根目录
router.onReady(function () {
  router.push('/')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
