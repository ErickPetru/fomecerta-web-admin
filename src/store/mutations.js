import baseState from './state'

export default {
  RESET_STORE (state) {
    Object.assign(state, baseState())
  },

  SET_AUTH_USER (state, { authUser }) {
    state.authUser = {
      uid: authUser.uid,
      email: authUser.email,
      emailVerified: authUser.emailVerified,
      displayName: authUser.displayName
    }
  },

  SET_DRAWER_OPEN (state, drawerOpen) {
    state.drawerOpen = drawerOpen
  }
}
