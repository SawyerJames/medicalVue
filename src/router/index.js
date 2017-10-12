import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login.vue'
import Index from '@/views/Index.vue'
import About from '@/views/About.vue'
import Center from '@/views/Center.vue'
import Search from '@/views/Search.vue'
import Pay from '@/views/Pay.vue'
import Notice from '@/views/Notice.vue'
import Omsg from '@/views/O-msg.vue'
import Oopinion from '@/views/O-opinion.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',    //路由模式
  base: __dirname,    //基目录：文件目录
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/center',
      name: 'center',
      component: Center
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/pay',
      name: 'pay',
      component: Pay
    },
    {
      path: '/notice',
      name: 'notice',
      component: Notice
    },
    {
      path: '/o-opinion',
      name: 'o-opinion',
      component: Oopinion
    },
    {
      path: '/o-msg',
      name: 'o-msg',
      component: Omsg
    }
  ]
})
