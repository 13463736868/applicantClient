import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './axios'
import iView from 'iview'
import logic from './logic'
// import './mock'
// 正式时 注视掉mock 另外前缀aip,和附件上传前api前缀
// Vue.config.productionTip = false

Vue.use(iView)

router.beforeEach(logic.beforeEach)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
