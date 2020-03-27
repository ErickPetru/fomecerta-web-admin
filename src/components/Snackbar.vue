<template>
  <v-snackbar v-model="show" bottom multi-line :color="color">
    <v-icon dark class="ml-1 mr-3">{{ `mdi-${ icon }` }}</v-icon>
    {{ content }}
    <v-btn v-if="buttons.action && buttons.action.text && buttons.action.callback"
      small
      text
      @click="buttons.action.callback"
    >{{ buttons.action.text }}</v-btn>
    <v-btn  v-if="buttons.close" small text @click="show = false">{{ buttons.close }}</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      content: '',
      color: '',
      icon: '',
      buttons: {
        action: null,
        close: null
      }
    }
  },
  created () {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'snackbar/SHOW_MESSAGE') {
        this.content = state.snackbar.content
        this.color = state.snackbar.color
        this.icon = state.snackbar.icon
        this.buttons.action = state.snackbar.buttons.action
        this.buttons.close = state.snackbar.buttons.close
        this.show = !!this.content
      }
    })
  }
}
</script>
