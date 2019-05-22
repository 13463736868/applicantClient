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
        loc.removeItem('caseTypeId')
        store.commit('SET_CASEID', '')
        store.commit('SET_CASETYPEID', '')
        store.commit('SET_ARBID', '')
        store.commit('SET_CASEINFO', null)
      } else {
        if (store.state.caseId === '') {
          if (loc.getItem('caseId')) {
            store.commit('SET_CASEID', loc.getItem('caseId'))
          }
        }
        if (store.state.caseTypeId === '') {
          if (loc.getItem('caseTypeId')) {
            store.commit('SET_CASETYPEID', loc.getItem('caseTypeId'))
          }
        }
        if (store.state.arbId === '') {
          if (loc.getItem('arbId')) {
            store.commit('SET_ARBID', loc.getItem('arbId'))
          }
        }
      }
      if (to.fullPath.indexOf('caseInfo') === -1) {
        loc.removeItem('myCaseId')
        loc.removeItem('myCaseOldId')
        loc.removeItem('myCaseState')
        loc.removeItem('myCaseShowBtn')
        loc.removeItem('myCasePartieType')
        loc.removeItem('myCaseCrossE')
        store.commit('SET_MYCASEID', '')
        store.commit('SET_MYCASEOLDID', '')
        store.commit('SET_MYCASESTATE', null)
        store.commit('SET_MYCASESHOWBTN', null)
        store.commit('SET_MYCASEPARTIETYPE', null)
        store.commit('SET_MYCASECROSSE', null)
      } else {
        if (store.state.myCaseId === '') {
          if (loc.getItem('myCaseId')) {
            store.commit('SET_MYCASEID', loc.getItem('myCaseId'))
          }
        }
        if (store.state.myCaseOldId === '') {
          if (loc.getItem('myCaseOldId')) {
            store.commit('SET_MYCASEOLDID', loc.getItem('myCaseOldId'))
          }
        }
        if (store.state.myCaseState === null) {
          if (loc.getItem('myCaseState')) {
            store.commit('SET_MYCASESTATE', loc.getItem('myCaseState'))
          }
        }
        if (store.state.myCaseShowBtn === null) {
          if (loc.getItem('myCaseShowBtn')) {
            store.commit('SET_MYCASESHOWBTN', JSON.parse(loc.getItem('myCaseShowBtn')))
          }
        }
        if (store.state.myCasePartieType === null) {
          if (loc.getItem('myCasePartieType')) {
            store.commit('SET_MYCASEPARTIETYPE', JSON.parse(loc.getItem('myCasePartieType')))
          }
        }
        if (store.state.myCaseCrossE === null) {
          if (loc.getItem('myCaseCrossE')) {
            store.commit('SET_MYCASECROSSE', JSON.parse(loc.getItem('myCaseCrossE')))
          }
        }
      }
      if (to.fullPath.indexOf('goPayment') === -1) {
        loc.removeItem('goPaymentCaseIds')
        loc.removeItem('goPaymentArbiId')
        // store.commit('SET_GOPAYMENTCASEIDS', '') 销毁组件前已经清理了
      } else {
        if (store.state.goPaymentCaseIds === '') {
          if (loc.getItem('goPaymentCaseIds')) {
            store.commit('SET_GOPAYMENTCASEIDS', loc.getItem('goPaymentCaseIds'))
          }
        }
        if (store.state.goPaymentArbiId === '') {
          if (loc.getItem('goPaymentArbiId')) {
            store.commit('SET_GOPAYMENTARBIID', loc.getItem('goPaymentArbiId'))
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
      store.commit('SET_CASETYPEID', '')
      store.commit('SET_ARBID', '')
      store.commit('SET_CASEINFO', null)
      store.commit('SET_MYCASEID', '')
      store.commit('SET_MYCASESTATE', null)
      store.commit('SET_GOPAYMENTCASEIDS', '')
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
        store.commit('SET_CASETYPEID', '')
        store.commit('SET_ARBID', '')
        store.commit('SET_CASEINFO', null)
        store.commit('SET_MYCASEID', '')
        store.commit('SET_MYCASESTATE', null)
        store.commit('SET_GOPAYMENTCASEIDS', '')
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
