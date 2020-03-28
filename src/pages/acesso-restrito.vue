<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="6" lg="4">
      <Logo class="logo" />

      <v-card class="elevation-12" :loading="loading">
        <v-toolbar color="primary" flat>
          <v-toolbar-title>{{ $metaInfo.title }}</v-toolbar-title>
        </v-toolbar>

        <v-card-text class="pa-4">
          <v-form ref="form" v-model="formValid">
            <v-text-field
              ref="email"
              v-model="formData.email"
              v-focus.lazy="isFocused('email')"
              :rules="formRules.email"
              label="E-mail"
              prepend-icon="mdi-email-open"
              type="text"
              autocomplete="off"
              @keypress.enter="signInUser"
              @keydown.down="setFocus('password')"
            />

            <v-text-field
              ref="password"
              v-model="formData.password"
              v-focus.lazy="isFocused('password')"
              :rules="formRules.password"
              label="Senha"
              prepend-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="off"
              @click:append="() => (showPassword = !showPassword)"
              @keypress.enter="signInUser"
              @keydown.up="setFocus('email')"
            />
          </v-form>
        </v-card-text>

        <v-card-actions class="flex flex-column pa-4 pt-0 pb-5">
          <v-btn
            large
            depressed
            color="primary black--text mb-4"
            :loading="loading"
            @click="signInUser"
          >
            <span>Entrar</span>
            <v-icon class="text--secondary">mdi-chevron-right</v-icon>
          </v-btn>

          <p class="ma-0 mt-2 font-weight-light body-2">
            <span>Esqueceu sua senha?</span>
            <v-btn outlined small nuxt to="/recuperar-senha" color="secondary">Enviar recuperação</v-btn>
          </p>

          <p class="ma-0 mt-2 font-weight-light body-2">
            <span>Ainda não tem uma conta?</span>
            <v-btn outlined small nuxt to="/novo-cadastro" color="secondary">Cadastrar-se agora</v-btn>
          </p>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import messages, { ApplicationError } from '@/helpers/messages'
import rules from '@/helpers/validation-rules'
import formValidation from '@/mixins/form-validation'
import restrictAuthenticated from '@/mixins/restrict-authenticated'

export default {
  name: 'PageLogin',
  middleware: 'guest',
  layout: 'center',
  components: {
    Logo: () => import('@/components/Logo.vue')
  },
  mixins: [formValidation, restrictAuthenticated],
  data () {
    return {
      loading: false,
      showPassword: false,
      focused: 'email',
      formData: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    formRules () {
      return {
        email: rules.email,
        password: rules.password
      }
    }
  },
  methods: {
    async signInUser () {
      if (!this.validate()) return false

      try {
        this.loading = true

        const { user } = await this.$fireAuth.signInWithEmailAndPassword(
          this.formData.email,
          this.formData.password
        )

        if (!user) {
          throw new ApplicationError()
        }

        if (!user.emailVerified) {
          const actionButton = {
            text: 'Reenviar',
            callback: this.resendEmailVerification
          }

          throw new ApplicationError('auth/email-not-verified', actionButton)
        }

        this.$snackbar.showMessage(messages['auth/success'], 'success')
      } catch (error) {
        console.error(error)
        this.$snackbar.showMessage({
          content: messages[error.code],
          color: 'error',
          actionButton: error.details
        })

        this.loading = false
      }
    },

    async resendEmailVerification () {
      try {
        this.loading = true

        const user = await this.$fireAuth.currentUser

        if (!this.authUser || !user) {
          throw new ApplicationError()
        }

        await user.sendEmailVerification({
          url: `${window.location.origin}/acesso-restrito`
        })

        await this.$fireAuth.signOut()

        this.$snackbar.showMessage(
          messages['auth/user-verification-sent'],
          'success'
        )
      } catch (error) {
        console.error(error)
        this.$snackbar.showMessage(messages[error.code], 'error')
      } finally {
        this.loading = false
      }
    }
  },
  head: () => ({
    title: 'Acesso à área restrita'
  })
}
</script>

<style lang="scss" scoped>
@import url('@/assets/guest.scss');

a.v-btn {
  margin: -2px 0 0 0.25em;
  padding: 0 0.5em !important;
}
</style>
