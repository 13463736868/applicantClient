import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import {removeToken} from '@/cookies'

Vue.config.productionTip = process.env.NODE_ENV === 'production'
// 在axios拦截器中判断当前环境，来决定是否增加前缀
// 使用axios来发ajax
// 增加一个拦截器，当method为form时，使用表单提交的方式
// 使用qs包将data转为表单数据
// https://www.jianshu.com/p/042632dec9fb
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  if (!Vue.config.productionTip) {
    config.url = '/api' + config.url
    // if (store.state.admin_token) {//如何不用cookie的话 给每个http header加token
    //   config.headers.Authorization = `token $(store.state.admin_token)`
    // }
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

axios.interceptors.response.use((res) => {
  if (res.data.flag === true) {
    return res
  } else {
    return Promise.reject(res.data.message)
  }
}, (error) => {
  switch (error.status) {
    case 401:
      removeToken()
      this.$router.replace({
        path: '/login',
        query: {redirect: this.$router.currentRoute.fullpath}
      })
  }
  return Promise.reject(error.status)
})

Vue.prototype.$http = axios
