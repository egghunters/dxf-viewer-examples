import { createStore } from 'vuex'

const store = createStore({
  state: {
    examples: []
  },
  getters: {
  },
  mutations: {
    setExamples(state, value) {
      state.examples = value;
    }
  },
  actions: {
  },
  modules: {
  }
})

export default store