import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutation'
import state from './state'
import actions from './action'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  actions,
  mutations
})
