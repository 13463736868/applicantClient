import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters.js'
import actions from './actions.js'
import mutations from './mutations.js'

Vue.use(Vuex)

const state = {
  // token: null
  userInfo: null,
  caseTypeCode: '',
  caseId: '',
  caseInfo: null,
  myCaseId: '',
  myCaseOldId: '',
  myCaseState: null,
  goPaymentCaseIds: '',
  paymentInfoId: '',
  userState: null,
  myCaseShowBtn: null,
  myCasePartieType: null,
  myCaseCrossE: null
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
