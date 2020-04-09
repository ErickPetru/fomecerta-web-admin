<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="6" lg="4">
      <Logo class="logo" />

      <v-card class="elevation-12" :loading="loading">
        <v-toolbar color="primary" flat>
          <v-btn icon nuxt to="/" class="ma-0 mr-2">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-toolbar-title class="pa-0">{{ $metaInfo.title }}</v-toolbar-title>
        </v-toolbar>

        <v-card-text class="pa-4">
          {{ message }}
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import restrictNotAdmin from '@/mixins/restrict-not-admin'

export default {
  name: 'PageTestCache',
  middleware: 'admin',
  layout: 'center',
  transition: 'scroll-x-reverse-transition',
  components: {
    Logo: () => import('@/components/Logo.vue')
  },
  mixins: [restrictNotAdmin],
  data () {
    return {
      loading: true,
      message: 'Olá Mundo!'
    }
  },
  mounted () {
    this.loading = false
  },
  head: () => ({
    title: 'Teste de cache do navegador'
  })
}
</script>

<style lang="scss" scoped>
@import url('@/assets/guest.scss');
</style>
