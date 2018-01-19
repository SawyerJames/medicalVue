import Vue from 'vue'
import Router from 'vue-router'
// 首页
import Index from '@/views/index/Index.vue'
// 查询相关
import Search from '@/views/search/Search.vue'
import SearchOther from '@/views/search/SearchOther.vue'
import SearchMy from '@/views/search/SearchMy.vue'
// 支付相关
import PayMy from '@/views/pay/PayMy.vue'
import PayOther from '@/views/pay/PayOther.vue'
import PayOtherSee from '@/views/pay/PayOtherSee.vue'
import PayOtherAdd from '@/views/pay/PayOtherAdd.vue'
// 通告相关
import Notice from '@/views/notice/Notice.vue'
import Ndetail from '@/views/notice/N-detail.vue'
import Oopinion from '@/views/notice/O-opinion.vue'
// 个人中心
import Center from '@/views/center/Center.vue'
import CenterUser from '@/views/center/CenterUser.vue'
import Notion from '@/views/center/Notion.vue'
import Address from '@/views/center/Address.vue'
import PaymentDetails from '@/views/center/PaymentDetails.vue'
import Security from '@/views/center/Security.vue'
import ModPhone from '@/views/center/ModPhone.vue'
import UnbundIdcard from '@/views/center/UnbundIdcard.vue'
import ModNewPhone from '@/views/center/ModNewPhone.vue'
import AppealPhone from '@/views/center/AppealPhone.vue'
// 注册相关
import Register from '@/views/register/Register.vue'
import PhoneRegister from '@/views/register/PhoneRegister.vue'
import AddRegister from '@/views/register/AddRegister.vue'
import ErrorRegister from '@/views/register/ErrorRegister.vue'

Vue.use(Router)

export default new Router({
  base: '/wap',  //基目录：文件目录
  routes: [
    // 首页
    {
      path: '/',
      name: 'Index',
      component: Index,
      children: [
        // 医保查询首页
        {
          path: '/search',
          name: 'search',
          component: Search,
        },
      ]
    },
    // 医保查询
    {
      path: '/search-my',
      name: 'search-my',
      component: SearchMy
    },
    {
      path: '/search-other',
      name: 'search-other',
      component: SearchOther
    },
    // 个人缴费
    {
      path: '/pay-my',
      name: 'pay-my',
      component: PayMy,
    },
    // 代缴保费
    {
      path: '/pay-other',
      name: 'pay-other',
      component: PayOther,
    },
    {
      path: '/payOtherAdd',
      name: 'payOtherAdd',
      component: PayOtherAdd,
    },
    {
      path: '/payOtherSee',
      name: 'payOtherSee',
      component: PayOtherSee,
    },
    // tabBar 底部三栏
    {
      path: '/notice',
      name: 'notice',
      component: Notice
    },
    {
      path: '/center',
      name: 'center',
      component: Center
    },
    // 通知公告
    {
      path: '/notice',
      name: 'notice',
      component: Notice
    },
    {
      path: '/n-detail',
      name: 'n-detail',
      component: Ndetail
    },
    // 意见反馈
    {
      path: '/o-opinion',
      name: 'o-opinion',
      component: Oopinion
    },
    // 个人中心->详细
    {
      path: '/user',
      name: 'user',
      component: CenterUser
    },
    {
      path: '/notion',
      name: 'notion',
      component: Notion
    },
    {
      path: '/address',
      name: 'address',
      component: Address
    },
    {
      path: '/paymentDetails',
      name: 'PaymentDetails',
      component: PaymentDetails
    },
    {
      path: '/security',
      name: 'security',
      component: Security
    },
    {
      path: '/modPhone',
      name: 'modPhone',
      component: ModPhone
    },
    {
      path: '/unbundIdcard',
      name: 'unbundIdcard',
      component: UnbundIdcard
    },
    {
      path: '/appealPhone',
      name: 'appealPhone',
      component: AppealPhone
    },
    {
      path: '/modNewPhone',
      name: 'modNewPhone',
      component: ModNewPhone
    },
    // 注册
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/phoneRegister',
      name: 'phoneRegister',
      component: PhoneRegister
    },
    {
      path: '/errorRegister',
      name: 'errorRegister',
      component: ErrorRegister
    },
    {
      path: '/addRegister',
      name: 'addRegister',
      component: AddRegister
    }
  ]
})
