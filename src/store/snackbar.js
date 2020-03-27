export const mutations = {
  SHOW_MESSAGE (state, payload) {
    state.content = payload.content
    state.color = payload.color
    state.icon = payload.icon
    state.buttons = {
      action: payload.actionButton,
      close: payload.closeButton
    }
  }
}

export const actions = {
  showMessage ({ commit }, { content, color, icon, actionButton, closeButton }) {
    commit('SHOW_MESSAGE', { content, color, icon, actionButton, closeButton })
  }
}

export const state = () => ({
  content: '',
  color: '',
  icon: '',
  buttons: {
    action: null,
    close: null
  }
})
