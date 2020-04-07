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
              @keypress.enter="save"
              @keydown.down="setFocus('role')"
            />

            <v-select
              ref="role"
              v-model="formData.role"
              v-focus.lazy="isFocused('role')"
              :rules="formRules.role"
              :items="roles"
              label="Perfil"
              prepend-icon="mdi-account-box"
              item-value="id"
              item-text="name"
              @keypress.enter="save"
              @keydown.up="setFocus('email')"
            />
          </v-form>
        </v-card-text>

        <v-card-actions class="flex flex-column pa-4 pt-0 pb-0">
          <v-btn large depressed color="primary black--text mb-4" :loading="loading" @click="save">
            <v-icon class="ma-0 mr-2 text--secondary">mdi-save</v-icon>
            <span>Salvar</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { getMessage } from '@/helpers/messages'
import rules from '@/helpers/validation-rules'
import formValidation from '@/mixins/form-validation'
import restrictNotAdmin from '@/mixins/restrict-not-admin'

export default {
  name: 'PageChangeUserRole',
  middleware: 'admin',
  layout: 'center',
  transition: 'scroll-x-reverse-transition',
  components: {
    Logo: () => import('@/components/Logo.vue')
  },
  mixins: [formValidation, restrictNotAdmin],
  data () {
    return {
      loading: false,
      focused: 'email',
      roles: [
        { id: 'customer', name: 'Cliente' },
        { id: 'establishment', name: 'Estabelecimento' },
        { id: 'admin', name: 'Administrador' }
      ],
      formData: {
        email: '',
        role: null
      }
    }
  },
  computed: {
    formRules () {
      return {
        email: rules.email,
        role: rules.required
      }
    }
  },
  methods: {
    async save () {
      if (!this.validate()) return false

      try {
        this.loading = true

        await this.$fireFunc.httpsCallable('grantCustomRole')({
          email: this.formData.email,
          role: this.formData.role
        })

        if (this.authUser && this.formData.email === this.authUser.email) {
          await this.$fireAuth.currentUser.reload()
          await this.$fireAuth.currentUser.getIdTokenResult(true)
          await this.$fireAuth.signOut()
        }

        this.$snackbar.showMessage(getMessage('save-success'), 'success')
      } catch (error) {
        console.error(error)
        this.$snackbar.showMessage(getMessage(error), 'error')
      } finally {
        this.loading = false
      }
    }
  },
  head: () => ({
    title: 'Atribuir perfil'
  })
}
</script>

<style lang="scss" scoped>
@import url('@/assets/guest.scss');
</style>
