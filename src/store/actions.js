export default {
  //  小写
  // setToken ({commit}, id) {
  //   commit('SET_TOKEN', id)
  // }
  setFilingType ({commit, state}, obj) {
    commit('SET_FILINGTYPE', obj)
  },
  setUserInfo ({commit, state}, obj) {
    commit('SET_USERINFO', obj)
  },
  setCaseId ({commit, state}, id) {
    commit('SET_CASEID', id)
  },
  setCaseInfo ({commit, state}, obj) {
    commit('SET_CASEINFO', obj)
  },
  setFiling ({commit, state}, obj) {
    commit('SET_FILING', obj)
  },
  setMyCaseListInfo ({commit, state}, obj) {
    commit('SET_MYCASELISTINFO', obj)
  },
  setGoPaymentCaseIds ({commit, state}, id) {
    commit('SET_GOPAYMENTCASEIDS', id)
  },
  setPaymentInfoId ({commit, state}, id) {
    commit('SET_PAYMENTINFOID', id)
  },
  setUserState ({commit, state}, obj) {
    commit('SET_USERSTATE', obj)
  },
  setMyCaseShowBtn ({commit, state}, obj) {
    commit('SET_MYCASESHOWBTN', obj)
  },
  setMyCaseCrossE ({commit, state}, obj) {
    commit('SET_MYCASECROSSE', obj)
  }
}
