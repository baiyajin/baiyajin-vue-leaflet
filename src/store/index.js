import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    clickId: localStorage.getItem('clickId') && localStorage.getItem('clickId') !== 'undefined' ? JSON.parse(localStorage.getItem('clickId')) : 1
  },
  mutations: {
    setClickId (state, clickId) {
      localStorage.setItem('clickId', JSON.stringify(clickId))
      state.clickId = clickId
    }
  },
  actions: {
  }
})
export default store
