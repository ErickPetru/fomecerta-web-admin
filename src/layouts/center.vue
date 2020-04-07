<template>
  <v-app id="app">
    <v-content>
      <v-container class="fill-height" fluid>
        <nuxt />
      </v-container>
    </v-content>

    <Snackbar />
  </v-app>
</template>

<script>
export default {
  name: 'LayoutCenter',
  components: {
    Snackbar: () => import('@/components/Snackbar.vue')
  }
}
</script>

<style lang="scss" scoped>
#app {
  background: transparent;
}
</style>
