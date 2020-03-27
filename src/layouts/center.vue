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
  components: {
    Snackbar: () => import('@/components/Snackbar.vue')
  }
}
</script>

<style lang="scss" scoped>
#app {
  background: #a10101 url('~assets/bg.jpg') center center / cover no-repeat;
}
</style>
