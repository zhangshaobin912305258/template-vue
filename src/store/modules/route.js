const state = {
  routes: [],
  currentRoute: null,
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.routes.push({
      path: 'home',
      name: 'home',
      label: '首页',
      icon: '',
      jump: true,
      directory: false,
      parent: null,
      children: [],
    })
    for (let index = 0; index < routes.length; index++) {
      state.routes.push(routes[index])
    }
    //state.routes = routes
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
