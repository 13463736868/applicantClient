export default {
  //  小写
  // 为啥login 引用 ...mapActions不好使
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
  }
}
