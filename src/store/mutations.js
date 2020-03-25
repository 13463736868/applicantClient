import * as types from './mutations-types.js'

export default {
  // 大写
  // [types.SET_TOKEN] (state, data) {
  //   state.token = data
  // }
  [types.SET_FILINGTYPE] (state, obj) {
    state.filingType = obj
  },
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
  },
  [types.SET_MYCASELISTINFO] (state, obj) {
    state.myCaseListInfo = obj
  },
  [types.SET_GOPAYMENTCASEIDS] (state, id) {
    state.goPaymentCaseIds = id
  },
  [types.SET_PAYMENTINFOID] (state, id) {
    state.paymentInfoId = id
  },
  [types.SET_USERSTATE] (state, obj) {
    state.userState = obj
  },
  [types.SET_MYCASESHOWBTN] (state, obj) {
    state.myCaseShowBtn = obj
  },
  [types.SET_MYCASECROSSE] (state, obj) {
    state.myCaseCrossE = obj
  }
}
