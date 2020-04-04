<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="9" xl="6">
        <v-card :loading="loading" class="float-over-expanded">
          <v-toolbar color="primary" flat>
            <v-btn icon nuxt exact to="/categorias-cardapio" class="ma-0 mr-2">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-toolbar-title class="pa-0">{{ $metaInfo.title }}</v-toolbar-title>
          </v-toolbar>

          <v-card-text class="pa-5 pt-3">
            <v-form ref="form" v-model.lazy="formValid">
              <v-row>
                <v-col cols="12" lg="5">
                  <v-text-field
                    ref="name"
                    v-model="formData.name"
                    :rules="formRules.name"
                    label="Nome da categoria"
                    hint="Nome visível na listagem do cardápio (ex.: Pizzas Grandes)."
                    persistent-hint
                    type="text"
                    autocomplete="off"
                    @keypress.enter="save"
                  />
                </v-col>

                <v-col cols="12" lg="7">
                  <v-combobox
                    ref="synonyms"
                    v-model="formData.synonyms"
                    label="Sinônimos para pesquisa"
                    hint="Sinônimos opicionais que podem localizar a categoria (ex.: pizzas, píteças, píteças grandes)."
                    persistent-hint
                    multiple
                    hide-no-data
                    append-icon
                    small-chips
                    :delimiters="[',', ';']"
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
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-if="typeof formData.imageFile === 'string'"
                    v-model="formData.imageFile"
                    label="Arquivo de imagem"
                    hint="Dica: imagens quadradas de aproximadamente 800px para melhores resultados."
                    persistent-hint
                    prepend-icon="mdi-paperclip"
                    clearable
                    readonly
                    @keydown.delete="markImageToDelete"
                    @click:clear="markImageToDelete"
                  />
                  <v-file-input
                    v-else
                    v-model="formData.imageFile"
                    :rules="formRules.imageFile"
                    show-size
                    label="Arquivo de imagem"
                    hint="Dica: imagens quadradas de aproximadamente 800px para melhores resultados."
                    persistent-hint
                    truncate-length="50"
                    accept=".jpg, .jpeg, .png"
                    @change="onImageChange"
                  />
                </v-col>
              </v-row>
            </v-form>

            <v-row align="center" justify="center" class="item-preview">
              <v-col cols="12" sm="11" md="10" lg="9" align="center">
                <v-tooltip
                  top
                  color="info"
                  max-width="550"
                  transition="scroll-y-reverse-transition"
                >
                  <p>Abaixo você encontra uma simulação de como seu cliente verá esta categoria do seu cardápio no aplicativo para consumidores. Garanta que as informações que você está preenchendo estão entregando o resultado desejado.</p>
                  <template #activator="{ on }">
                    <span class="help-icon" v-on="on">
                      <span class="overline">Pré-visualização</span>
                      <v-icon small class="info--text" v-on="on">mdi-help-circle</v-icon>
                    </span>
                  </template>
                </v-tooltip>

                <v-card class="mt-3 mb-1 d-flex" color="grey lighten-5" height="180">
                  <v-img
                    v-if="formData.imageURL && formData.imageURL !== 'delete'"
                    :src="formData.imageURL"
                    :lazy-src="formData.imageURL && formData.imageURL.startsWith('http') ? formData.imageURL.replace('_400x400', '_50x50') : formData.imageURL"
                    max-width="180"
                    width="180"
                    height="180"
                  >
                    <template #placeholder>
                      <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate color="grey lighten-5" />
                      </v-row>
                    </template>
                  </v-img>

                  <div class="ma-5 ml-6 mr-12 d-flex flex-column text-left">
                    <h1
                      class="headline font-weight-bold mb-2"
                    >{{ formData.name || 'Categoria sem nome' }}</h1>

                    <p class="body-2 grey--text">
                      <span>Quantidade de opções:</span>
                      <strong class="body-1 font-weight-bold">{{ formData.usedBy || 0 }}</strong>
                    </p>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-fab-transition mode="out-in">
      <v-btn fab fixed bottom right dark :color="fabColor" :loading="loading" @click="save">
        <v-icon>mdi-content-save</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-container>
</template>

<script>
import { getMessage } from '@/helpers/messages'
import imageSizes from '@/helpers/image-sizes'
import rules from '@/helpers/validation-rules'
import restrictGuests from '@/mixins/restrict-guests'

export default {
  name: 'PageMenuCategory',
  middleware: 'auth',
  mixins: [restrictGuests],
  async asyncData ({ app, params, store, redirect }) {
    const formData = {
      name: '',
      synonyms: [],
      usedBy: null,
      imageFile: null,
      imageURL: null
    }

    if (params && params.id) {
      const doc = await app.$fireStore
        .collection('menuCategories')
        .doc(params.id)
        .get()

      if (doc.exists && doc.get('uid') === store.state.authUser.uid) {
        formData.name = doc.get('name')
        formData.synonyms = doc.get('synonyms')
        formData.usedBy = doc.get('usedBy')
        formData.imageURL = doc.get('imageURL')
        if (formData.imageURL) {
          formData.imageURL = formData.imageURL.replace(
            '_1000x1000',
            '_400x400'
          )
          formData.imageFile = doc.id
        }
      } else {
        return redirect('/categorias-cardapio/incluir')
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
    id () {
      return this.mode === 'insert' ? null : this.$route.params.id
    },

    mode () {
      return this.$route.params.id ? 'edit' : 'insert'
    },

    fabColor () {
      return this.mode === 'insert' ? 'green darken-2' : 'indigo'
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
          if (doc.get('uid') !== this.authUser.uid) return false

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

        if (this.formData.imageURL === 'delete') {
          for (const size of ['', ...imageSizes]) {
            const ref = this.$fireStorage.ref(`menuCategories/${doc.id}${size}`)
            ref
              .getDownloadURL()
              .then(() => {
                ref.delete()
              })
              .catch(() => {
                return true
              })
          }

          data.imageURL = null
          this.formData.imageURL = null
          this.formData.imageFile = null
        } else if (
          this.formData.imageFile &&
          typeof this.formData.imageFile === 'object'
        ) {
          const refName = `menuCategories/${doc.id}`
          const storage = this.$fireStorage.ref(refName)
          const snapshot = await storage.put(this.formData.imageFile)
          const downloadURL = await snapshot.ref.getDownloadURL()
          data.imageURL = downloadURL.split('?').join('_1000x1000?')
          this.formData.imageFile = doc.id
        }

        await doc.set(data, { merge: true })
        this.$snackbar.showMessage(getMessage('save-success'), 'success')

        if (this.mode === 'insert') {
          this.$router.push('/categorias-cardapio')
        }
      } catch (error) {
        console.error(error)
        this.$snackbar.showMessage(getMessage(error), 'error')
      } finally {
        this.loading = false
      }
    },

    markImageToDelete () {
      this.formData.imageURL = 'delete'
      this.formData.imageFile = null
    },

    onImageChange (file) {
      if (
        !file ||
        !file.type ||
        !['image/jpeg', 'image/png'].includes(file.type) ||
        file.size > 2000000
      ) {
        this.formData.imageURL = null
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => (this.formData.imageURL = e.target.result)
      reader.readAsDataURL(file)
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
