import * as types from './mutations-types.js'

export default {
  // 大写
  // ADMIN_TOKEN (state, data) {
  //   state.admin_token = data
  // }
  [types.SET_USERINFO] (state, obj) {
    state.userInfo = obj
  },
  [types.SET_CASEID] (state, id) {
    state.caseId = id
  },
  [types.SET_CASEINFO] (state, obj) {
    state.caseInfo = obj
  },
  [types.SET_FILING] (state, obj) {
    state.caseInfo[obj.type] = obj.data
  }
}
