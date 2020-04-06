export default {
  async nuxtServerInit ({ dispatch }, { $fireAuth, app, res }) {
    if (this.$fireAuth === null || $fireAuth === null || app.$fireAuth === null) {
      throw new Error('$fireAuth cannot be accessed')
    }

    if (res && res.locals && res.locals.user) {
      const { allClaims: claims, ...authUser } = res.locals.user
      await dispatch('onAuthStateChanged', { authUser, claims })
    }
  },

  async onAuthStateChanged ({ commit }, { authUser, claims }) {
    if (authUser) {
      const establishment = await this.$fireStore.doc(`establishments/${authUser.uid}`).get()

      if (establishment.exists && !!establishment.get('termsAccepted')) {
        authUser.termsAccepted = true
      } else {
        authUser.termsAccepted = false
      }

      authUser.role = claims.role
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
