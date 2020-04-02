import { mapGetters } from 'vuex'

const destination = '/'

export default {
  computed: {
    ...mapGetters(['authUser']),

    isAdmin () {
      try {
        return this.authUser.role === 'admin'
      } catch {
        return false
      }
    }
  },
  watch: {
    authUser () {
      if (!this.isAdmin) {
        this.$router.push(destination)
      }
    }
  },
  beforeMount () {
    if (!this.isAdmin) {
      this.$router.push(destination)
    }
  }
}
