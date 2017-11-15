import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import tools from './extend/tools'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import Vuex from 'vuex'

Vue.use(ElementUI);
Vue.use(Vuex);

// http方法
Vue.prototype.$http = axios;
Vue.prototype.$tools = tools;

// vuex全局存储
Vue.prototype.$store = new Vuex.Store({
  state: {
    userFlag: '',
    userMsg: [],
    tabMana: false,
    tabSearch: false
  }
})

//路由初始化根目录
router.onReady(function () {
  router.push('/');
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
