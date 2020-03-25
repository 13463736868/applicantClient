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
      if (to.fullPath.indexOf('iling') === -1) {
        loc.removeItem('caseId')
        loc.removeItem('filingType')
        store.commit('SET_CASEID', '')
        store.commit('SET_CASEINFO', null)
        store.commit('SET_FILINGTYPE', null)
      } else {
        if (store.state.caseId === '') {
          if (loc.getItem('caseId')) {
            store.commit('SET_CASEID', loc.getItem('caseId'))
          }
        }
        if (from.fullPath.indexOf('filing') !== -1 && to.fullPath.indexOf('archiveFiling') !== -1) {
          loc.removeItem('caseId')
          store.commit('SET_CASEID', '')
          store.commit('SET_CASEINFO', null)
        }
        if (to.fullPath.indexOf('filing') !== -1 && from.fullPath.indexOf('archiveFiling') !== -1) {
          loc.removeItem('caseId')
          store.commit('SET_CASEID', '')
          store.commit('SET_CASEINFO', null)
        }
      }
      if (to.fullPath.indexOf('caseInfo') === -1) {
        loc.removeItem('myCaseShowBtn')
        loc.removeItem('myCaseCrossE')
        loc.removeItem('myCaseListInfo')
        store.commit('SET_MYCASESHOWBTN', null)
        store.commit('SET_MYCASECROSSE', null)
        store.commit('SET_MYCASELISTINFO', null)
      }
      if (to.fullPath.indexOf('goPayment') === -1) {
        loc.removeItem('goPaymentCaseIds')
        // store.commit('SET_GOPAYMENTCASEIDS', '') 销毁组件前已经清理了
      } else {
        if (store.state.goPaymentCaseIds === '') {
          if (loc.getItem('goPaymentCaseIds')) {
            store.commit('SET_GOPAYMENTCASEIDS', loc.getItem('goPaymentCaseIds'))
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
      store.commit('SET_USERSTATE', null)
      store.commit('SET_CASEID', '')
      store.commit('SET_CASEINFO', null)
      store.commit('SET_GOPAYMENTCASEIDS', '')
      store.commit('SET_FILINGTYPE', null)
      store.commit('SET_MYCASELISTINFO', null)
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
        store.commit('SET_USERINFO', null)
        store.commit('SET_USERSTATE', null)
        store.commit('SET_CASEID', '')
        store.commit('SET_CASEINFO', null)
        store.commit('SET_GOPAYMENTCASEIDS', '')
        store.commit('SET_FILINGTYPE', null)
        store.commit('SET_MYCASELISTINFO', null)
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
