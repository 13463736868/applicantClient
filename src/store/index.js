import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters.js'
import action from './actions.js'
import mutations from './mutations.js'

Vue.use(Vuex)

const state = {
  // admin_token: null
}

export default new Vuex.Store({
  state,
  getters,
  action,
  mutations
})
