export default {
  isLoggedIn (state) {
    try {
      return state.authUser.id !== null
    } catch {
      return false
    }
  },

  isDrawerOpen (state) {
    return state.drawerOpen
  },

  authUser (state) {
    return state.authUser
  }
}
