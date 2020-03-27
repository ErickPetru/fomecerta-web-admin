import { mapGetters } from 'vuex'

const destination = '/'

export default {
  computed: {
    ...mapGetters(['authUser']),

    isAuthenticated () {
      return this.authUser !== null
    }
  },
  watch: {
    authUser () {
      if (this.isAuthenticated) {
        this.$router.push(destination)
      }
    }
  },
  beforeMount () {
    if (this.isAuthenticated) {
      this.$router.push(destination)
    }
  }
}
