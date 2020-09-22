const getters = {
  sideBar: (state) => state.header.sideBar,
  tags: (state) => state.tag.tags,
  currentTag: (state) => state.tag.currentTag,
  routes: (state) => state.route.routes,
}
export default getters
