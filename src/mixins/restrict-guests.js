import { mapGetters } from 'vuex'

const destination = '/acesso-restrito'

export default {
  computed: {
    ...mapGetters(['authUser']),

    isAuthenticated () {
      return this.authUser !== null
    }
  },
  watch: {
    authUser () {
      if (!this.isAuthenticated) {
        this.$router.push(destination)
      }
    }
  },
  beforeMount () {
    if (!this.isAuthenticated) {
      this.$router.push(destination)
    }
  }
}
