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
  }
}
