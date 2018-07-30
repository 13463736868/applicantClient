import Vue from 'vue'
import Router from 'vue-router'
import 'iview/dist/styles/iview.css'

const login = r => require.ensure([], () => r(require('@/page/login/login.vue')), 'login')
const register = r => require.ensure([], () => r(require('@/page/register/register.vue')), 'register')
const home = r => require.ensure([], () => r(require('@/page/home/home.vue')), 'home')
const filing = r => require.ensure([], () => r(require('@/page/filing/filing.vue')), 'filing')
const proposer = r => require.ensure([], () => r(require('@/page/filing/children/proposer.vue')), 'proposer')
const respondent = r => require.ensure([], () => r(require('@/page/filing/children/respondent.vue')), 'respondent')
const claimItems = r => require.ensure([], () => r(require('@/page/filing/children/claimItems.vue')), 'claimItems')
const evidences = r => require.ensure([], () => r(require('@/page/filing/children/evidences.vue')), 'evidences')
const notApplied = r => require.ensure([], () => r(require('@/page/notApplied/notApplied.vue')), 'notApplied')
const paymentSlip = r => require.ensure([], () => r(require('@/page/paymentSlip/paymentSlip.vue')), 'paymentSlip')
const userInfo = r => require.ensure([], () => r(require('@/page/userInfo/userInfo.vue')), 'userInfo')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      redirect: '/home'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/home',
      name: 'home',
      meta: {
        requireAuth: true
      },
      component: home
    },
    {
      path: '/filing',
      name: 'filing',
      meta: {
        requireAuth: true
      },
      component: filing,
      children: [
        {
          path: '',
          redirect: '/filing/proposer'
        },
        {
          path: 'proposer',
          name: 'proposer',
          component: proposer
        },
        {
          path: 'respondent',
          name: 'respondent',
          component: respondent
        },
        {
          path: 'claimItems',
          name: 'claimItems',
          component: claimItems
        },
        {
          path: 'evidences',
          name: 'evidences',
          component: evidences
        },
        {
          path: '*',
          redirect: '/filing/proposer'
        }
      ]
    },
    {
      path: '/notApplied',
      name: 'notApplied',
      meta: {
        requireAuth: true
      },
      component: notApplied
    },
    {
      path: '/paymentSlip',
      name: 'paymentSlip',
      meta: {
        requireAuth: true
      },
      component: paymentSlip
    },
    {
      path: '/userInfo',
      name: 'userInfo',
      meta: {
        requireAuth: true
      },
      component: userInfo
    }
  ]
})
