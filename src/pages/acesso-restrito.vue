<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <Logo class="logo ma-6 mt-0" />

      <v-card class="elevation-12">
        <v-toolbar color="primary" flat>
          <v-toolbar-title>Acesso à área restrita</v-toolbar-title>
        </v-toolbar>
        <v-card-text class="pa-4">
          <v-form ref="form" v-model="formValid">
            <v-text-field
              v-model="formData.email"
              :rules="formRules.email"
              label="E-mail"
              prepend-icon="mdi-account"
              type="text"
              autofocus
              autocomplete="off"
            />
            <v-text-field
              v-model="formData.password"
              :rules="formRules.password"
              label="Senha"
              prepend-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'password' : 'text'"
              autocomplete="off"
              @click:append="() => (showPassword = !showPassword)"
            />
          </v-form>
        </v-card-text>
        <v-card-actions class="flex flex-column pa-4 pt-0 pb-0">
          <v-btn large color="primary black--text mb-4" @click="signInUser">
            <span>Entrar</span>
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>

          <p class="mt-4">
            <span>Ainda não tem uma conta?</span>
            <v-btn nuxt text to="/novo-registro" color="secondary">Cadastre-se agora</v-btn>
          </p>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  middleware: 'guest',
  layout: 'center',
  components: {
    Logo: () => import('@/components/Logo.vue')
  },
  data () {
    return {
      formData: {
        email: '',
        password: ''
      },
      showPassword: false,
      formValid: false,
      formRules: {
        email: [
          (v) => !!v || 'É necessário informar o e-mail.',
          (v) => /.+@.+\..+/.test(v) || 'Por favor, informe um e-mail válido.'
        ],
        password: [(v) => !!v || 'É necessário informar a senha.']
      }
    }
  },
  computed: {
    ...mapState({
      authUser: (state) => state.authUser
    }),
    ...mapGetters({
      isLoggedIn: 'isLoggedIn'
    })
  },
  methods: {
    signInUser () {
      this.$refs.form.validate()
      if (!this.formValid) return

      try {
        // await this.$fireAuth.signInWithEmailAndPassword(
        //   this.formData.email,
        //   this.formData.password
        // )
        this.$router.push('/')
      } catch {
        this.$snackbar.showMessage(
          'A comunicação com o servidor não pôde ser concluída.'
        )
      }
    }
  },
  head: () => ({
    title: 'Acesso à área restrita'
  })
}
</script>

<style lang="scss" scoped>
.logo {
  height: auto !important;
}

.logo ::v-deep .title {
  fill: #fff;
}

button {
  width: 100%;
}

a.v-btn {
  margin: -2px 0 0 0.25em;
  padding: 0 0.5em !important;
}
</style>
