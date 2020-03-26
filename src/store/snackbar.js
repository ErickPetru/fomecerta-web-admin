export const mutations = {
  SHOW_MESSAGE (state, payload) {
    state.content = payload.content
    state.color = payload.color
  }
}

export const actions = {
  showMessage ({ commit }, { content, color }) {
    commit('SHOW_MESSAGE', { content, color })
  }
}

export const state = () => ({
  content: '',
  color: ''
})
