import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import tools from './extend/tools'
import API from './extend/api';
import Vuex from 'vuex'
import errAlert from './components/errAlert'
import alert from './components/alert'
import loading from './components/loading'
import smallUser from './components/smallUser'

// 使用插件-Vuex
Vue.use(Vuex);

// http方法
Vue.prototype.$http = axios;
Vue.prototype.$tools = tools;

// API接口
Vue.prototype.API = API;

// 全局注册组件
// 信息提示弹窗，错误提示弹窗，预加载组件，小型头部组件
Vue.component('alert',alert);
Vue.component('errAlert',errAlert);
Vue.component('loading',loading);
Vue.component('smallUser',smallUser);

// vuex全局存储
Vue.prototype.$store = new Vuex.Store({
  state: {
    userFlag: '',
    userMsg: [],
    tabMana: false,
    tabSearch: false,
    userType: ''
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
