import Vue from 'vue'
import axios from 'axios'
import router from '@/router'
import qs from 'qs'
import {removeToken} from '@/cookies'

Vue.config.productionTip = process.env.NODE_ENV === 'production'
// 在axios拦截器中判断当前环境，来决定是否增加前缀
// 使用axios来发ajax
// 增加一个拦截器，当method为form时，使用表单提交的方式
// 使用qs包将data转为表单数据
// https://www.jianshu.com/p/042632dec9fb
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
axios.defaults.timeout = 20000
axios.interceptors.request.use((config) => {
  config.headers['source'] = 'web'
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  if (!Vue.config.productionTip) {
    config.url = '/api' + config.url
    // if (store.state.admin_token) {//如果不用cookie的话 给每个http header加token
    //   config.headers.Authorization = `token $(store.state.admin_token)`
    // }
  } else {
    config.url = '/api' + config.url
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

axios.interceptors.response.use((res) => {
  if (res.data.flag === true) {
    return res
  } else {
    switch (res.data.code) {
      case '000121':
        // 没有登录
        removeToken()
        // 如何跳转到登录页面
        if (router.currentRoute.path !== '/login') {
          router.replace({
            path: '/login',
            query: {redirect: router.currentRoute.fullpath}
          })
        }
        break
    }
    return Promise.reject(res.data.message)
  }
}, (error) => {
  switch (error.status) {
    case 401:
    case 403:
      removeToken()
      // 清除token store localStorage 等等
      // this 不是 vue 实例对象 下面代码不需要
      // this.$router.replace({
      //   path: '/login',
      //   query: {redirect: this.$router.currentRoute.fullpath}
      // })
      break
  }
  return Promise.reject(error.message)
})

Vue.prototype.$http = axios
