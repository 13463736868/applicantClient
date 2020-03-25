import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters.js'
import actions from './actions.js'
import mutations from './mutations.js'

Vue.use(Vuex)

const state = {
  // token: null
  filingType: null,
  userInfo: null,
  caseId: '',
  caseInfo: null,
  myCaseListInfo: null,
  goPaymentCaseIds: '',
  paymentInfoId: '',
  userState: null,
  myCaseShowBtn: null,
  myCaseCrossE: null
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
