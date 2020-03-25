import store from './index'
export default {
  filingType: (state) => {
    if (!state.filingType) {
      store.commit('SET_FILINGTYPE', JSON.parse(window.localStorage.getItem('filingType')))
      return JSON.parse(window.localStorage.getItem('filingType'))
    } else {
      return state.filingType
    }
  },
  userInfo: state => state.userInfo,
  caseId: state => state.caseId,
  caseInfo: state => state.caseInfo,
  myCaseListInfo: (state) => {
    if (!state.myCaseListInfo) {
      store.commit('SET_MYCASELISTINFO', JSON.parse(window.localStorage.getItem('myCaseListInfo')))
      return JSON.parse(window.localStorage.getItem('myCaseListInfo'))
    } else {
      return state.myCaseListInfo
    }
  },
  goPaymentCaseIds: state => state.goPaymentCaseIds,
  paymentInfoId: state => state.paymentInfoId,
  userState: state => state.userState,
  myCaseShowBtn: (state) => {
    if (!state.myCaseShowBtn) {
      store.commit('SET_MYCASESHOWBTN', JSON.parse(window.localStorage.getItem('myCaseShowBtn')))
      return JSON.parse(window.localStorage.getItem('myCaseShowBtn'))
    } else {
      return state.myCaseShowBtn
    }
  },
  myCaseCrossE: (state) => {
    if (!state.myCaseCrossE) {
      store.commit('SET_MYCASECROSSE', JSON.parse(window.localStorage.getItem('myCaseCrossE')))
      return JSON.parse(window.localStorage.getItem('myCaseCrossE'))
    } else {
      return state.myCaseCrossE
    }
  }
}
