
const state = {
  language:"zhCN"
}

const actions = {

}

const mutations = {
  changeLanguage(state, language) {
    state.language = language
  }
}

export default{
  namespaced: true,
  state,
  actions,
  mutations
}