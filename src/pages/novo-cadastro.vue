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
              ref="name"
              v-model="formData.name"
              v-focus.lazy="isFocused('name')"
              :rules="formRules.name"
              label="Nome completo"
              prepend-icon="mdi-account"
              type="text"
              autocomplete="off"
              @keypress.enter="createUser"
              @keydown.down="setFocus('email')"
            />

            <v-text-field
              ref="email"
              v-model="formData.email"
              v-focus.lazy="isFocused('email')"
              :rules="formRules.email"
              label="E-mail"
              prepend-icon="mdi-email-open"
              type="text"
              autocomplete="off"
              @keypress.enter="createUser"
              @keydown.up="setFocus('name')"
              @keydown.down="setFocus('password')"
            />

            <v-text-field
              ref="password"
              v-model="formData.password"
              v-focus.lazy="isFocused('password')"
              :rules="formRules.password"
              label="Escolha uma senha"
              prepend-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="new-password"
              :loading="passwordStrength !== null"
              @click:append="() => (showPassword = !showPassword)"
              @keypress.enter="createUser"
              @keydown.up="setFocus('email')"
              @keydown.down="setFocus('confirm')"
            >
              <template #progress>
                <v-progress-linear
                  :value="passwordStrength.value"
                  :color="passwordStrength.color"
                  absolute
                  bottom
                  rounded
                  background-opacity=".75"
                  height="22"
                >
                  <span class="caption">{{ passwordStrength.level }}</span>
                </v-progress-linear>
              </template>
            </v-text-field>

            <v-text-field
              ref="confirm"
              v-model="formData.confirm"
              v-focus.lazy="isFocused('confirm')"
              :rules="formRules.confirm"
              label="Confirme sua senha"
              prepend-icon="mdi-lock"
              :append-icon="showConfirm ? 'mdi-eye-off' : 'mdi-eye'"
              :type="showConfirm ? 'text' : 'password'"
              autocomplete="new-password"
              @click:append="() => (showConfirm = !showConfirm)"
              @keypress.enter="createUser"
              @keydown.up="setFocus('password')"
            />
          </v-form>
        </v-card-text>

        <v-card-actions class="flex flex-column pa-4 pt-0 pb-0">
          <v-btn
            large
            depressed
            color="primary black--text mb-4"
            :loading="loading"
            @click="createUser"
          >
            <v-icon class="ma-0 mr-2 text--secondary">mdi-check-circle</v-icon>
            <span>Confirmar cadastro</span>
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
import restrictAuthenticated from '@/mixins/restrict-authenticated'

export default {
  name: 'PageSignUp',
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
      showConfirm: false,
      focused: 'name',
      formData: {
        name: '',
        email: '',
        password: '',
        confirm: ''
      }
    }
  },
  computed: {
    formRules () {
      return {
        name: rules.fullName,
        email: rules.email,
        password: rules.password,
        confirm: rules.passwordConfirm(this.formData.password)
      }
    },

    passwordStrength () {
      return rules.passwordStrength(this.formData.password)
    }
  },
  methods: {
    async createUser () {
      if (!this.validate()) return false

      try {
        this.loading = true

        const { user } = await this.$fireAuth.createUserWithEmailAndPassword(
          this.formData.email,
          this.formData.password
        )

        await user.updateProfile({
          displayName: this.formData.name
        })

        await this.$fireFunc.httpsCallable('grantCustomRole')({
          email: this.formData.email,
          role: 'establishment'
        })

        await user.sendEmailVerification({
          url: `${window.location.origin}/acesso-restrito`
        })

        await this.$fireAuth.signOut()

        this.$snackbar.showMessage(getMessage('auth/user-created'), 'success')
        this.$router.push('/acesso-restrito')
      } catch (error) {
        console.error(error)
        this.$snackbar.showMessage(getMessage(error), 'error')
      } finally {
        this.loading = false
      }
    }
  },
  head: () => ({
    title: 'Novo cadastro'
  })
}
</script>

<style lang="scss" scoped>
@import url('@/assets/guest.scss');
</style>
