<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <Logo class="logo" />

      <v-card class="elevation-12">
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
              autocomplete="new-password"
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
              autocomplete="off"
              :loading="passwordStrength !== null"
              @click:append="() => (showPassword = !showPassword)"
              @keypress.enter="createUser"
              @keydown.up="setFocus('email')"
              @keydown.down="setFocus('confirm')"
            >
              <template v-slot:progress>
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
              autocomplete="off"
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
            <span>Confirmar cadastro</span>
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

export default {
  middleware: 'guest',
  layout: 'center',
  components: {
    Logo: () => import('@/components/Logo.vue')
  },
  mixins: [formValidation],
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
      if (this.formData.password === '') {
        return null
      }

      let index = 0
      const colors = ['red', 'deep-orange', 'amber', 'lime', 'green']
      const levels = ['Muito fraca', 'Fraca', 'Média', 'Forte', 'Muito forte']

      // Password length lower than 7.
      if (this.formData.password.length < 7) {
        return {
          value: 1,
          color: colors[index],
          level: levels[index]
        }
      }

      // Password contains uppercase letters.
      if (/[A-Z]/.test(this.formData.password)) index += 0.75

      // Password contains lowercase letters.
      if (/[a-z]/.test(this.formData.password)) index += 0.75

      // Password contains numbers.
      if (/\d/.test(this.formData.password)) index += 0.75

      // Password contains special characters.
      if (/[!-/:-@[-`{-~]/.test(this.formData.password)) index++

      // Password length greater than 9.
      if (this.formData.password.length > 9) index++

      index = index > 4 ? 4 : Math.floor(index)

      let value = Math.ceil((index + 1) * 16.6)
      value = value > 80 ? 100 : value > 50 ? 75 : value

      return {
        value,
        color: colors[index],
        level: levels[index]
      }
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

        this.$snackbar.showMessage(messages['auth/user-created'], 'success')
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
    title: 'Novo cadastro'
  })
}
</script>

<style lang="scss" scoped>
@import url('@/assets/guest.scss');
</style>
