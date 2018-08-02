import * as types from './mutations-types.js'

export default {
  // 大写
  // ADMIN_TOKEN (state, data) {
  //   state.admin_token = data
  // }
  [types.GET_CASEID] (state, id) {
    state.caseId = id
  },
  [types.GET_CASEINFO] (state, obj) {
    state.caseInfo = obj
  }
}
