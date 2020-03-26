export default {
  async nuxtServerInit ({ dispatch }, context) {
    if (this.$fireAuth === null || context.$fireAuth === null || context.app.$fireAuth === null) {
      throw new Error('$fireAuth cannot be accessed')
    }

    if (context.res && context.res.locals && context.res.locals.user) {
      const { allClaims: claims, ...authUser } = context.res.locals.user

      console.info(
        'Authenticated user verified on server-side. User: ',
        authUser,
        'Claims:',
        claims
      )

      await dispatch('onAuthStateChanged', { authUser, claims })
    }
  },

  onAuthStateChanged ({ commit }, { authUser }) {
    if (authUser) {
      commit('SET_AUTH_USER', { authUser })
    } else {
      commit('RESET_STORE')
    }
  },

  checkVuexStore (context) {
    if (this.$fireAuth === null || context.$fireAuth === null) {
      throw new Error('$fireAuth cannot be accessed')
    }

    return alert('Success. Objects can be accessed in store actions via this.$fire___')
  },

  setDrawerOpen ({ commit }, drawerOpen) {
    commit('SET_DRAWER_OPEN', drawerOpen)
  }
}
