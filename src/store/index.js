import Vue from 'vue'
import Vuex from 'vuex'

import actions from './action'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

const state = {
  cartlist: [],
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store;