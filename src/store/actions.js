export default {
  //  小写
  // getUser ({commit}) {
  //   commit('ADMIN_TOKEN', '111111xxx')
  // }
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
  setMyCaseId ({commit, state}, id) {
    commit('SET_MYCASEID', id)
  },
  setMyCaseOldId ({commit, state}, id) {
    commit('SET_MYCASEOLDID', id)
  },
  setMyCaseState ({commit, state}, obj) {
    commit('SET_MYCASESTATE', obj)
  }
}
