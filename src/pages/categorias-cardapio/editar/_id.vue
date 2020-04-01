<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" xl="6">
        <v-card :loading="loading" class="float-over-expanded">
          <v-toolbar color="primary" flat>
            <v-btn icon nuxt exact to="/categorias-cardapio" class="ma-0 mr-2">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-toolbar-title class="pa-0">{{ $metaInfo.title }}</v-toolbar-title>
          </v-toolbar>

          <v-card-text class="pa-5 pt-3">
            <v-form ref="form" v-model.lazy="formValid">
              <div>
                <v-text-field
                  ref="name"
                  v-model="formData.name"
                  :rules="formRules.name"
                  label="Nome da categoria"
                  hint="Informe o nome visível na listagem do menu (ex.: Bebidas)."
                  persistent-hint
                  type="text"
                  autocomplete="off"
                  class="pb-2"
                  @keypress.enter="save"
                />

                <v-combobox
                  ref="synonyms"
                  v-model="formData.synonyms"
                  label="Sinônimos para pesquisa"
                  hint="Escolha sinônimos opicionais que podem localizar esta categoria (ex.: Drinks, Cervejas, Refrigerantes)."
                  persistent-hint
                  multiple
                  small-chips
                  class="pb-2"
                  :delimiters="[' ', ',', ';']"
                  @keypress.enter="save"
                  @input="synonymsToLowerCase"
                >
                  <template #selection="{ attrs, item, index, parent }">
                    <v-chip
                      v-bind="attrs"
                      color="gray"
                      label
                      small
                      close
                      @click:close="parent.value.splice(index, 1)"
                    >
                      <span class="pr-2">{{ item }}</span>
                    </v-chip>
                  </template>
                </v-combobox>

                <v-card
                  v-if="!formData.imageFile && formData.imageURL"
                  class="grey lighten-3 mt-3 mb-1"
                  width="280"
                  :loading="formData.imageURL === 'loading'"
                >
                  <v-img
                    v-if="formData.imageURL !== 'loading'"
                    :src="formData.imageURL"
                    height="240"
                  ></v-img>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn small icon @click="markImageToDelete">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>

                <v-alert
                  v-else-if="formData.imageFile === 'delete'"
                  class="mt-3 mb-1"
                  type="warning"
                >
                  <span>Confirme para remover definitivamente esta imagem.</span>
                </v-alert>

                <div v-else>
                  <v-file-input
                    v-model="formData.imageFile"
                    label="Arquivo de imagem"
                    hint="Dica: imagens quadradas de aproximadamente 600px para melhores resultados."
                    persistent-hint
                    :rules="formRules.imageFile"
                    show-size
                    truncate-length="50"
                    accept="image/*"
                    class="pt-2"
                  />
                </div>
              </div>

              <div>
                <v-btn
                  color="primary black--text"
                  class="pl-4 pr-4 mt-6 mr-2"
                  :loading="loading"
                  @click="save"
                >
                  <v-icon class="ma-0 mr-2 text--secondary">mdi-check-circle</v-icon>
                  <span>Confirmar</span>
                </v-btn>

                <v-btn text class="pl-4 pr-4 mt-6" nuxt exact to="/categorias-cardapio">
                  <v-icon class="ma-0 mr-2 text--secondary">mdi-chevron-left</v-icon>
                  <span>Voltar</span>
                </v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { getMessage } from '@/helpers/messages'
import rules from '@/helpers/validation-rules'
import restrictGuests from '@/mixins/restrict-guests'

export default {
  name: 'PageMenuCategory',
  middleware: 'auth',
  mixins: [restrictGuests],
  async asyncData ({ app, params, store }) {
    const formData = {
      name: '',
      imageFile: null,
      imageURL: null,
      synonyms: []
    }

    if (params && params.id) {
      const doc = await app.$fireStore
        .collection('menuCategories')
        .doc(params.id)
        .get()

      if (doc.exists && doc.data().uid === store.state.authUser.uid) {
        formData.name = doc.data().name
        formData.synonyms = doc.data().synonyms
        formData.imageURL = doc.data().imageURL
      } else {
        app.router.push('/categorias-cardapio/incluir')
      }
    }

    return {
      formData
    }
  },
  data () {
    return {
      loading: true,
      formValid: false
    }
  },
  computed: {
    ...mapGetters(['authUser']),

    id () {
      return this.mode === 'insert' ? null : this.$route.params.id
    },

    mode () {
      return this.$route.params.id ? 'edit' : 'insert'
    },

    formRules () {
      return {
        name: rules.required,
        imageFile: rules.singleImageUpload
      }
    }
  },
  mounted () {
    this.loading = false
  },
  methods: {
    async save () {
      if (!this.$refs.form.validate()) return false

      try {
        this.loading = true

        const collection = this.$fireStore.collection('menuCategories')

        const data = {}
        const doc = this.id ? await collection.doc(this.id) : collection.doc()

        if (doc.exists) {
          if (doc.data().uid !== this.authUser.uid) return false

          data.updatedAt = this.$fireStoreObj.Timestamp.now()
        } else {
          data.createdAt = this.$fireStoreObj.Timestamp.now()
        }

        data.uid = this.authUser.uid
        data.name = this.formData.name || null
        data.synonyms =
          this.formData.synonyms && this.formData.synonyms.length
            ? this.formData.synonyms
            : null

        if (this.formData.imageFile) {
          if (this.formData.imageFile === 'delete') {
            const refName = `menuCategories/${doc.id}_1024x1024`
            await this.$fireStorage.ref(refName).delete()
            data.imageURL = null
            this.formData.imageURL = null
          } else {
            const refName = `menuCategories/${doc.id}`
            const storage = this.$fireStorage.ref(refName)
            const snapshot = await storage.put(this.formData.imageFile)
            const downloadURL = await snapshot.ref.getDownloadURL()
            data.imageURL = downloadURL.split('?').join('_1024x1024?')
            this.formData.imageURL = 'loading'
          }

          this.formData.imageFile = null
          this.$refs.form.resetValidation()
        }

        await doc.set(data, { merge: true })
        this.$snackbar.showMessage(getMessage('save-success'), 'success')

        if (this.formData.imageURL === 'loading') {
          setTimeout(() => {
            this.formData.imageURL = data.imageURL
          }, 3000)
        }
      } catch (error) {
        console.error(error)
        this.$snackbar.showMessage(getMessage(error), 'error')
      } finally {
        this.loading = false
      }
    },

    markImageToDelete () {
      this.formData.imageFile = 'delete'
    },

    synonymsToLowerCase (value) {
      if (this.formData)
        this.formData.synonyms = value.map((item) => item.toLowerCase())
    }
  },
  head () {
    return {
      title: this.mode === 'edit' ? 'Editar categoria' : 'Incluir categoria'
    }
  }
}
</script>

<style lang="scss" scoped>
.v-autocomplete ::v-deep input[type='text'] {
  text-transform: lowercase;
}
</style>
