import Vue from 'vue'
import Router from 'vue-router'
import 'iview/dist/styles/iview.css'

const login = r => require.ensure([], () => r(require('@/page/login/login.vue')), 'login')
const register = r => require.ensure([], () => r(require('@/page/register/register.vue')), 'register')
const forget = r => require.ensure([], () => r(require('@/page/forget/forget.vue')), 'forget')
const home = r => require.ensure([], () => r(require('@/page/home/home.vue')), 'home')
const goPayment = r => require.ensure([], () => r(require('@/page/goPayment/goPayment.vue')), 'goPayment')
const paymentInfo = r => require.ensure([], () => r(require('@/page/paymentInfo/paymentInfo.vue')), 'paymentInfo')
const caseInfo = r => require.ensure([], () => r(require('@/page/caseInfo/caseInfo.vue')), 'caseInfo')
const basicInfo = r => require.ensure([], () => r(require('@/page/caseInfo/children/basicInfo.vue')), 'basicInfo')
const proposerInfo = r => require.ensure([], () => r(require('@/page/caseInfo/children/proposerInfo.vue')), 'proposerInfo')
const respondentInfo = r => require.ensure([], () => r(require('@/page/caseInfo/children/respondentInfo.vue')), 'respondentInfo')
const claimItem = r => require.ensure([], () => r(require('@/page/caseInfo/children/claimItem.vue')), 'claimItem')
const revClaimItem = r => require.ensure([], () => r(require('@/page/caseInfo/children/revClaimItem.vue')), 'revClaimItem')
const evidencesInfo = r => require.ensure([], () => r(require('@/page/caseInfo/children/evidencesInfo.vue')), 'evidencesInfo')
const sendInfo = r => require.ensure([], () => r(require('@/page/caseInfo/children/sendInfo.vue')), 'sendInfo')
const endCaseInfo = r => require.ensure([], () => r(require('@/page/caseInfo/children/endCaseInfo.vue')), 'endCaseInfo')
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
      path: '/forget',
      name: 'forget',
      component: forget
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
      path: '/goPayment',
      name: 'goPayment',
      meta: {
        requireAuth: true
      },
      component: goPayment
    },
    {
      path: '/paymentInfo',
      name: 'paymentInfo',
      meta: {
        requireAuth: true
      },
      component: paymentInfo
    },
    {
      path: '/caseInfo',
      meta: {
        requireAuth: true
      },
      component: caseInfo,
      children: [
        {
          path: '',
          redirect: '/caseInfo/basicInfo'
        },
        {
          path: 'basicInfo',
          name: 'basicInfo',
          meta: {
            requireAuth: true
          },
          component: basicInfo
        },
        {
          path: 'proposerInfo',
          name: 'proposerInfo',
          meta: {
            requireAuth: true
          },
          component: proposerInfo
        },
        {
          path: 'respondentInfo',
          name: 'respondentInfo',
          meta: {
            requireAuth: true
          },
          component: respondentInfo
        },
        {
          path: 'claimItem',
          name: 'claimItem',
          meta: {
            requireAuth: true
          },
          component: claimItem
        },
        {
          path: 'revClaimItem',
          name: 'revClaimItem',
          meta: {
            requireAuth: true
          },
          component: revClaimItem
        },
        {
          path: 'evidencesInfo',
          name: 'evidencesInfo',
          meta: {
            requireAuth: true
          },
          component: evidencesInfo
        },
        {
          path: 'sendInfo',
          name: 'sendInfo',
          meta: {
            requireAuth: true
          },
          component: sendInfo
        },
        {
          path: 'endCaseInfo',
          name: 'endCaseInfo',
          meta: {
            requireAuth: true
          },
          component: endCaseInfo
        }
      ]
    },
    {
      path: '/filing',
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
          meta: {
            requireAuth: true
          },
          component: proposer
        },
        {
          path: 'respondent',
          name: 'respondent',
          meta: {
            requireAuth: true
          },
          component: respondent
        },
        {
          path: 'claimItems',
          name: 'claimItems',
          meta: {
            requireAuth: true
          },
          component: claimItems
        },
        {
          path: 'evidences',
          name: 'evidences',
          meta: {
            requireAuth: true
          },
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
