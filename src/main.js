import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './axios'
import iView from 'iview'
import * as login from '@/cookies'
import './mock'

// Vue.config.productionTip = false

Vue.use(iView)

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    // 如果使用store.state.admin_token 的话 需要注意页面刷新问题 登录成功后存俩份
    // if (window.localStorage.getItem('token')) {
    //   store.commit('随便个名', window.localStorage.getItem('token'))
    // }
    if (login.getToken()) {
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    if (to.path === '/login') {
      if (login.getToken()) {
        let redirect = decodeURIComponent(to.query.redirect || '/')
        router.push({
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
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
