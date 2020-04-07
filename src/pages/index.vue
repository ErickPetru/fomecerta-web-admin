<template>
  <v-container class="fill-height" fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="10" md="9" xl="6">
        <v-row>
          <v-col cols="12" md="6">
            <v-card height="100%">
              <v-card-title>
                Boas-vindas ao
                <Logo class="ml-2" />!
              </v-card-title>
              <v-card-text>
                <p
                  class="body-1"
                >É ótimo saber que você deseja fazer parte de nossa rede de parceiros, oferecedo produtos através de nosso aplicativo.</p>

                <p>
                  Utilize esta plataforma para gerenciar seu estabelecimento e seu cardápio, conforme desejar que os clientes finais visualizem. Se já souber o que deseja fazer neste momento, utilize o
                  <a
                    href="/menu"
                    class="secondary--text text--darken-1 text-no-wrap"
                    @click.prevent="showDrawer"
                  >
                    <v-icon small color="secondary darken-1">mdi-arrow-left</v-icon>
                    <span>menu ao lado</span>
                  </a> para navegar entre as telas.
                </p>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="6">
            <v-card height="100%" class="d-flex flex-column">
              <v-card-title class="blue-grey">
                <v-avatar color="white" class="mr-3">
                  <v-icon color="blue-grey">mdi-help-circle-outline</v-icon>
                </v-avatar>

                <span class="white--text">Precisa de ajuda?</span>
              </v-card-title>
              <v-card-text class="pa-5 pb-2 flex-grow-1">
                É muito simples utilizar esta plataforma de gerenciamento do
                <b>Fome Certa</b>, mas preparamos um tutorial em vídeo para que você possa conhecer rapidamente todos os recursos existentes, para ganhar em produtividade.
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn text color="blue-grey">
                  <span>Ver tutorial</span>
                  <v-icon small class="ml-2">mdi-open-in-new</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="4">
            <v-card>
              <v-img
                :src="establishment && establishment.imageURL ? establishment.imageURL : ''"
                :lazy-src="establishment && establishment.imageURL && establishment.imageURL.startsWith('http') ? establishment.imageURL.replace('_400x400', '_50x50') : establishment.imageURL"
                class="white--text align-end"
                :class="isEstablishmentCompleted ? 'grey' : 'error'"
                gradient="to bottom, rgba(0,0,0,.05), rgba(0,0,0,.75)"
                height="200px"
              >
                <template #placeholder>
                  <v-row class="fill-height ma-0" align="center" justify="center">
                    <v-progress-circular indeterminate color="grey lighten-5" />
                  </v-row>
                </template>

                <v-card-title v-if="establishment && establishment.name">{{ establishment.name }}</v-card-title>
                <v-card-title v-else>
                  Estabelecimento&nbsp;
                  <span class="text-no-wrap">sem nome</span>
                </v-card-title>
                <v-card-subtitle v-if="isEstablishmentCompleted" class="d-flex">
                  <v-icon small color="success lighten-2">mdi-check-outline</v-icon>
                  <span
                    class="ml-2 success--text text--lighten-4"
                  >Configurações totalmente preenchidas</span>
                </v-card-subtitle>
                <v-card-subtitle v-else class="d-flex">
                  <v-icon small color="error lighten-2">mdi-exclamation-thick</v-icon>
                  <span class="ml-2 error--text text--lighten-4">Configurações incompletas</span>
                </v-card-subtitle>
              </v-img>

              <v-card-actions>
                <v-spacer />

                <v-btn text nuxt to="/estabelecimento">
                  <v-icon small class="mr-1">mdi-pencil</v-icon>
                  <span>Editar</span>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card>
              <v-img
                class="white--text align-end"
                :class="menuCategoriesCount ? 'grey darken-1' : 'warning'"
                height="200px"
              >
                <template v-if="menuCategoriesCount === 1">
                  <v-card-title class="display-4">1</v-card-title>
                  <v-card-subtitle class="grey--text text--lighten-2">categoria no cardápio</v-card-subtitle>
                </template>
                <template v-else>
                  <v-card-title class="display-4">{{ menuCategoriesCount }}</v-card-title>
                  <v-card-subtitle class="grey--text text--lighten-2">categorias no cardápio</v-card-subtitle>
                </template>
              </v-img>

              <v-card-actions>
                <v-spacer />

                <v-btn v-if="menuCategoriesCount > 0" text nuxt to="/categorias-cardapio">
                  <v-icon small class="mr-1">mdi-eye</v-icon>
                  <span>Ver</span>
                </v-btn>

                <v-btn text nuxt to="/categorias-cardapio/incluir">
                  <v-icon small class="mr-1">mdi-plus</v-icon>
                  <span>Incluir</span>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card>
              <v-img
                class="white--text align-end"
                :class="menuItemsCount ? 'grey darken-1' : 'warning'"
                height="200px"
              >
                <template v-if="menuItemsCount === 1">
                  <v-card-title class="display-4">1</v-card-title>
                  <v-card-subtitle class="grey--text text--lighten-2">item no cardápio</v-card-subtitle>
                </template>
                <template v-else>
                  <v-card-title class="display-4">{{ menuItemsCount }}</v-card-title>
                  <v-card-subtitle class="grey--text text--lighten-2">itens no cardápio</v-card-subtitle>
                </template>
              </v-img>

              <v-card-actions>
                <v-spacer />

                <v-btn v-if="menuItemsCount > 0" text nuxt to="/itens-cardapio">
                  <v-icon small class="mr-1">mdi-eye</v-icon>
                  <span>Ver</span>
                </v-btn>

                <v-btn text nuxt to="/itens-cardapio/incluir">
                  <v-icon small class="mr-1">mdi-plus</v-icon>
                  <span>Incluir</span>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
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
  mixins: [restrictGuests],
  async asyncData ({ app, store }) {
    const doc = await app.$fireStore
      .collection('establishments')
      .doc(store.state.authUser.uid)
      .get()

    if (!doc.exists)
      return {
        establishment: null
      }

    return {
      establishment: {
        id: doc.id,
        ...doc.data()
      }
    }
  },
  computed: {
    ...mapGetters(['isDrawerOpen']),

    isEstablishmentCompleted () {
      return !!(
        this.establishment &&
        this.establishment.name &&
        this.establishment.typesOfEstablishment &&
        this.establishment.imageURL &&
        this.establishment.address &&
        this.establishment.geolocation &&
        this.establishment.activeDays &&
        this.establishment.activeDays.length
      )
    },

    menuCategoriesCount () {
      if (
        this.establishment &&
        this.establishment.sizes &&
        this.establishment.sizes.menuCategories
      ) {
        return this.establishment.sizes.menuCategories
      } else {
        return 0
      }
    },

    menuItemsCount () {
      if (
        this.establishment &&
        this.establishment.sizes &&
        this.establishment.sizes.menuItems
      ) {
        return this.establishment.sizes.menuItems
      } else {
        return 0
      }
    }
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

<style lang="scss" scoped>
a {
  text-decoration: none;
}

.v-card ::v-deep .v-responsive {
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0) 20%,
    rgba(0, 0, 0, 0.35)
  );
}
</style>
