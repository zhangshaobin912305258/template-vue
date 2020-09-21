const state = {
  tags: [],
  currentTag: null,
}

const mutations = {
  ADD_TAG: (state, tag) => {
    let tagNames = state.tags.map((tagTemp) => tagTemp.name)
    if (!tagNames.includes(tag.name)) {
      state.tags.push(tag)
    }
  },
  REMOVE_TAG: (state, tag) => {
    let tagNames = state.tags.map((tagTemp) => tagTemp.name)
    if (tagNames.includes(tag.name)) {
      state.tags.remove(tag)
    }
  },
}
const actions = {
  addTag({ commit }, tag) {
    commit('ADD_TAG', tag)
  },
  removeTag({ commit }, tag) {
    commit('REMOVE_TAG', tag)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
