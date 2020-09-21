
const state = {
    sideBar: false
}

const mutations = {
    TOGGLE_SIDEBAR : state => {
        state.sideBar = !state.sideBar
        console.log(state.sideBar)
    }
}
const actions = {
    toggleSideBar({ commit }) {
        commit('TOGGLE_SIDEBAR')
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}