import * as cookies from '@/cookies'
import store from '@/store'

const beforeEach = (to, from, next) => {
  let loc = null
  if (window.localStorage) {
    loc = window.localStorage
  }
  if (to.meta.requireAuth) {
    // 如果使用store.state.admin_token 的话 需要注意页面刷新问题 登录成功后存俩份
    // if (store.state.token === null) {
    //   if (loc.getItem('token')) {
    //     store.commit('SET_TOKEN', window.localStorage.getItem('token'))
    //   }
    // }
    if (cookies.getToken() && loc !== null && loc.getItem('userInfo') !== null) {
      if (store.state.userInfo === null) {
        if (loc.getItem('userInfo')) {
          store.commit('SET_USERINFO', JSON.parse(loc.getItem('userInfo')))
        }
      }
      if (to.fullPath.indexOf('filing') === -1) {
        loc.removeItem('caseId')
        store.commit('SET_CASEID', '')
        store.commit('SET_CASEINFO', null)
      } else {
        if (store.state.caseId === '') {
          if (loc.getItem('caseId')) {
            store.commit('SET_CASEID', loc.getItem('caseId'))
          }
        }
      }
      if (to.fullPath.indexOf('caseInfo') === -1) {
        loc.removeItem('myCaseId')
        loc.removeItem('myCaseState')
        store.commit('SET_MYCASEID', '')
        store.commit('SET_MYCASESTATE', null)
      } else {
        if (store.state.myCaseId === '') {
          if (loc.getItem('myCaseId')) {
            store.commit('SET_MYCASEID', loc.getItem('myCaseId'))
          }
        }
        if (store.state.myCaseState === null) {
          if (loc.getItem('myCaseState')) {
            store.commit('SET_MYCASESTATE', loc.getItem('myCaseState'))
          }
        }
      }
      if (to.fullPath.indexOf('goPayment') === -1) {
        loc.removeItem('goPaymentOldId')
        // store.commit('SET_GOPAYMENTOLDID', '') 销毁组件前已经清理了
      } else {
        if (store.state.goPaymentOldId === '') {
          if (loc.getItem('goPaymentOldId')) {
            store.commit('SET_GOPAYMENTOLDID', loc.getItem('goPaymentOldId'))
          }
        }
      }
      if (to.fullPath.indexOf('paymentInfo') === -1) {
        loc.removeItem('paymentInfoId')
        // store.commit('SET_PAYMENTINFOID', '') 销毁组件前已经清理了
      } else {
        if (store.state.paymentInfoId === '') {
          if (loc.getItem('paymentInfoId')) {
            store.commit('SET_PAYMENTINFOID', loc.getItem('paymentInfoId'))
          }
        }
      }
      next()
    } else {
      store.commit('SET_USERINFO', null)
      store.commit('SET_CASEID', '')
      store.commit('SET_CASEINFO', null)
      store.commit('SET_MYCASEID', '')
      store.commit('SET_MYCASESTATE', null)
      store.commit('SET_GOPAYMENTOLDID', '')
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    if (to.path === '/login') {
      if (cookies.getToken() && loc !== null && loc.getItem('userInfo') !== null) {
        let redirect = decodeURIComponent(to.query.redirect || '/')
        next({
          path: redirect
        })
      } else {
        next()
      }
    } else {
      next()
    }
  }
  // iView.LoadingBar.start()
}

export default {
  beforeEach
}
