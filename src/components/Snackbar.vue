<template>
  <v-snackbar v-model="show" :color="color">
    {{ content }}
    <v-btn text @click="show = false">Fechar</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      content: '',
      color: ''
    }
  },
  created () {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'snackbar/SHOW_MESSAGE') {
        this.content = state.snackbar.content
        this.color = state.snackbar.color
        this.show = !!this.content
      }
    })
  }
}
</script>
