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
import PayMy from '@/views/PayMy.vue'
import PayOther from '@/views/PayOther.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',    //路由模式
  base: __dirname,    //基目录：文件目录
  routes: [
    // 首页
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    // tabBar 底部三栏
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
    // 微信缴费
    {
      path: '/pay',
      redirect: '/pay-my',
      name: 'pay',
      component: Pay,
      children: [
        {
          path: '/pay-my',
          name: 'pay-my',
          component: PayMy,
        },
        {
          path: '/pay-other',
          name: 'pay-other',
          component: PayOther,
        }
      ]
    },
    // 通知公告
    {
      path: '/notice',
      name: 'notice',
      component: Notice
    },
    // 其他社保信息
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
