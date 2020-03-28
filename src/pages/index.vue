<template>
  <v-container class="fill-height" fluid>
    <v-layout column justify-center align-center>
      <v-flex xs12 sm8 md6>
        <v-card>
          <v-card-title>
            Boas-vindas ao
            <Logo class="ml-2" />!
          </v-card-title>
          <v-card-text>
            <p>Em breve, teremos cartões de acesso rápido nesta página inicial.</p>

            <p>
              Por enquanto, utilize o
              <a href="/menu" @click.prevent="showDrawer">menu lateral</a> para navegar.
            </p>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import restrictGuests from '@/mixins/restrict-authenticated'

export default {
  name: 'PageHome',
  middleware: 'auth',
  components: {
    Logo: () => import('@/components/Logo.vue')
  },
  mixins: [
    restrictGuests
  ],
  computed: {
    ...mapGetters(['isDrawerOpen'])
  },
  methods: {
    ...mapActions(['setDrawerOpen']),

    showDrawer () {
      if (!this.isDrawerOpen) this.setDrawerOpen(true)
    }
  },
  head: () => ({
    title: 'Página inicial'
  })
}
</script>
