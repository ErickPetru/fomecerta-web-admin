export default {
  data () {
    return {
      focused: null,
      formValid: false
    }
  },
  methods: {
    validate () {
      this.focused = null
      this.$refs.form.validate()
      if (!this.formValid) {
        const keys = Object.keys(this.$refs)
        for (const key of keys) {
          const field = this.$refs[key]
          if (!field.valid && field.$el.localName !== 'form') {
            this.focused = key
            break
          }
        }
        return false
      }

      return true
    },

    isFocused (name) {
      return !!name && this.focused === name
    },

    setFocus (name = null) {
      this.focused = name
    }
  }
}
