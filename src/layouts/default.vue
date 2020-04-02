<template>
  <v-app id="app">
    <v-navigation-drawer v-model="isDrawerOpen" fixed app color="primary">
      <v-list-item v-if="authUser" two-line>
        <v-list-item-avatar>
          <img src="/cropped-icon-site-32x32.png" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-if="authUser.displayName">{{ authUser.displayName }}</v-list-item-title>
          <v-list-item-subtitle>{{ authUser.email }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider />
      <v-list>
        <v-list-item to="/" router exact>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Página inicial</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider />
      <v-subheader class="caption">Configurações</v-subheader>

      <v-list>
        <v-list-item to="/estabelecimento" router exact>
          <v-list-item-action>
            <v-icon>mdi-domain</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Estabelecimento</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider />
      <v-subheader class="caption">Cardápio</v-subheader>

      <v-list>
        <v-list-item to="/categorias-cardapio" router exact>
          <v-list-item-action>
            <v-icon>mdi-book-open-page-variant</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Categorias</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/itens-cardapio" router exact>
          <v-list-item-action>
            <v-icon>mdi-pen</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Itens</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template #append>
        <v-divider />
        <v-list-item href="acesso-restrito" @click.prevent="logout">
          <v-list-item-action>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Encerrar acesso</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-navigation-drawer>

    <v-app-bar
      color="accent"
      dark
      app
      :flat="!isHome"
      :extended="!isHome"
      :extension-height="extensionHeight"
      class="flex-grow-0"
    >
      <v-app-bar-nav-icon @click.stop="setDrawerOpen(!isDrawerOpen)" />
      <v-toolbar-title class="pl-1">
        <v-btn nuxt text to="/" class="logo pa-2">
          <Logo />
        </v-btn>
      </v-toolbar-title>
    </v-app-bar>

    <v-content class="grey lighten-3">
      <nuxt />
    </v-content>

    <Snackbar />
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import messages from '@/helpers/messages'

export default {
  name: 'LayoutDefault',
  components: {
    Logo: () => import('@/components/Logo.vue'),
    Snackbar: () => import('@/components/Snackbar.vue')
  },
  data () {
    return {
      drawerBackground: require('@/assets/bg.jpg'),
      drawerShow: false
    }
  },
  computed: {
    ...mapGetters(['authUser']),

    isDrawerOpen: {
      get () {
        return this.$store.getters.isDrawerOpen
      },

      set (value) {
        this.setDrawerOpen(value)
      }
    },

    isHome () {
      return this.$route.path === '/'
    },

    extensionHeight () {
      if (this.isHome) return null

      if (
        this.$vuetify.breakpoint.name === 'xs' ||
        this.$vuetify.breakpoint.name === 'sm'
      ) {
        return 60
      } else {
        return 70
      }
    }
  },
  methods: {
    ...mapActions(['setDrawerOpen']),

    async logout () {
      try {
        await this.$fireAuth.signOut()
        this.$router.push('/acesso-restrito')
      } catch (error) {
        this.$snackbar.showMessage(messages[error.code])
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.logo.v-btn--active::before {
  opacity: 0;
}

.logo svg {
  height: 2.25em;
  margin-bottom: -2px;
}

.logo ::v-deep .title {
  fill: #fff;
}

.caption {
  text-transform: uppercase;
  height: auto;
  padding-top: 1.25rem;
}

.v-avatar {
  background-color: #ccc;
}

.v-avatar img {
  width: 30px;
  height: 30px;
}
</style>
