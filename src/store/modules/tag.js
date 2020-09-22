const state = {
  tags: [
    {
      path: '/',
      name: 'home',
      label: '首页',
    },
  ],
  currentTag: {
    path: '/',
    name: 'home',
    label: '首页',
  },
}

const mutations = {
  ADD_TAG: (state, tag) => {
    let tagNames = state.tags.map((tagTemp) => tagTemp.name)
    if (!tagNames.includes(tag.name)) {
      state.tags.push(tag)
    }
    state.currentTag = tag
    console.log(state.currentTag)
    console.log(state.tags)
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
