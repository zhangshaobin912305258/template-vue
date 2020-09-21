const state = {
  routes: [],
  currentRoute: null,
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.routes = routes
    console.log(state.routes)
  },
}

const actions = {
  setRoutes({ commit }, routes) {
    commit('SET_ROUTES', routes)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
