export default {
  //  小写
  // 为啥login 引用 ...mapActions不好使
  // getUser ({commit}) {
  //   commit('ADMIN_TOKEN', '111111xxx')
  // }
  getCaseId ({commit, state}, id) {
    commit('GET_CASEID', id)
  },
  getCaseInfo ({commit, state}, obj) {
    commit('GET_CASEINFO', obj)
  }
}
