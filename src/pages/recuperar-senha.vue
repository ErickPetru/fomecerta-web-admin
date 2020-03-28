<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="6" lg="4">
      <Logo class="logo" />

      <v-card class="elevation-12" :loading="loading">
        <v-toolbar color="primary" flat>
          <v-btn icon nuxt to="/acesso-restrito" class="ma-0 mr-2">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-toolbar-title class="pa-0">{{ $metaInfo.title }}</v-toolbar-title>
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
              @keypress.enter="sendPasswordReset"
            />
          </v-form>
        </v-card-text>

        <v-card-actions class="flex flex-column pa-4 pt-0 pb-0">
          <v-btn
            large
            depressed
            color="primary black--text mb-4"
            :loading="loading"
            @click="sendPasswordReset"
          >
            <v-icon class="ma-0 mr-2 text--secondary">mdi-email-send</v-icon>
            <span>Enviar e-mail de recuperação</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import messages from '@/helpers/messages'
import rules from '@/helpers/validation-rules'
import formValidation from '@/mixins/form-validation'
import restrictAuthenticated from '@/mixins/restrict-authenticated'

export default {
  name: 'PagePasswordRetrive',
  middleware: 'guest',
  layout: 'center',
  components: {
    Logo: () => import('@/components/Logo.vue')
  },
  mixins: [formValidation, restrictAuthenticated],
  data () {
    return {
      loading: false,
      focused: 'email',
      formData: {
        email: ''
      }
    }
  },
  computed: {
    formRules () {
      return {
        email: rules.email
      }
    }
  },
  methods: {
    async sendPasswordReset () {
      if (!this.validate()) return false

      try {
        this.loading = true

        await this.$fireAuth.sendPasswordResetEmail(this.formData.email, {
          url: `${window.location.origin}/acesso-restrito`
        })

        await await this.$fireAuth.logOut()

        this.$snackbar.showMessage(
          messages['auth/password-reset-sent'],
          'success'
        )
        this.$router.push('/acesso-restrito')
      } catch (error) {
        console.error(error)
        this.$snackbar.showMessage(messages[error.code], 'error')
      } finally {
        this.loading = false
      }
    }
  },
  head: () => ({
    title: 'Solicitar recuperação de senha'
  })
}
</script>

<style lang="scss" scoped>
@import url('@/assets/guest.scss');
</style>
