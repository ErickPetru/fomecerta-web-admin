<template>
  <v-app id="app">
    <v-navigation-drawer v-model="isDrawerOpen" fixed temporary color="primary">
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

        <v-list-item
          v-if="authUser && authUser.role === 'admin'"
          to="/atribuir-perfil"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>mdi-account-box</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Atribuir perfil</v-list-item-title>
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
      extended
      :flat="!isHome"
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
import { getMessage } from '@/helpers/messages'

export default {
  name: 'LayoutDefault',
  components: {
    Logo: () => import('@/components/Logo.vue'),
    Snackbar: () => import('@/components/Snackbar.vue')
  },
  data () {
    return {
      drawerShow: false,
      isExpanded: false
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
      return (
        this.$route.path === '/' ||
        this.$route.path === '/acesso-restrito' ||
        this.$route.path === '/atribuir-perfil'
      )
    },

    extensionHeight () {
      if (!this.isExpanded) return 0

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
  watch: {
    isHome: {
      immediate: true,
      handler (value) {
        if (value) {
          setTimeout(() => (this.isExpanded = false), 250)
        } else {
          this.isExpanded = true
        }
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
        console.error(error)
        this.$snackbar.showMessage(getMessage(error))
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

.v-app-bar,
.v-app-bar .v-toolbar__content,
.v-app-bar .v-toolbar__extension {
  will-change: height;
  transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1) height,
    0.2s cubic-bezier(0.4, 0, 0.2, 1) transform,
    0.2s cubic-bezier(0.4, 0, 0.2, 1) background-color,
    0.2s cubic-bezier(0.4, 0, 0.2, 1) left,
    0.2s cubic-bezier(0.4, 0, 0.2, 1) right,
    280ms cubic-bezier(0.4, 0, 0.2, 1) box-shadow,
    0.25s cubic-bezier(0.4, 0, 0.2, 1) max-width,
    0.25s cubic-bezier(0.4, 0, 0.2, 1) width;
}
</style>
