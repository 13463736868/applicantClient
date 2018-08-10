import * as cookies from '@/cookies'
import store from '@/store'

const beforeEach = (to, from, next) => {
  let loc = null
  if (window.localStorage) {
    loc = window.localStorage
  }
  if (to.meta.requireAuth) {
    // 如果使用store.state.admin_token 的话 需要注意页面刷新问题 登录成功后存俩份
    // if (window.localStorage.getItem('token')) {
    //   store.commit('随便个名', window.localStorage.getItem('token'))
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
      next()
    } else {
      store.commit('SET_CASEID', '')
      store.commit('SET_CASEINFO', null)
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
