<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="9" xl="6">
        <v-card :loading="loading" class="float-over-expanded">
          <v-toolbar color="primary" flat>
            <v-btn icon nuxt exact to="/itens-cardapio" class="ma-0 mr-2">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-toolbar-title class="pa-0">{{ $metaInfo.title }}</v-toolbar-title>
          </v-toolbar>

          <v-card-text class="pa-5 pt-3">
            <v-form ref="form" v-model.lazy="formValid">
              <v-row>
                <v-col cols="12" sm="6" lg="3">
                  <v-select
                    ref="category"
                    v-model="formData.category"
                    :rules="formRules.category"
                    :items="categories"
                    label="Categoria do item"
                    hint="Categoria do item (ex.: Pizzas)."
                    persistent-hint
                    class="pb-2"
                    return-object
                    item-text="name"
                    @keypress.enter="save"
                  >
                    <template #item="{ item }">
                      <v-avatar size="30px" class="mr-3">
                        <img
                          v-if="item.imageURL"
                          :src="item.imageURL"
                          max-width="50"
                          max-height="50"
                        />
                        <v-icon v-else color="grey" v-text="item.name.charAt(1)"></v-icon>
                      </v-avatar>

                      <span>{{ item.name }}</span>
                    </template>
                  </v-select>
                </v-col>

                <v-col cols="12" sm="6" lg="3">
                  <v-text-field
                    ref="sku"
                    v-model="formData.sku"
                    :rules="formRules.sku"
                    label="Código SKU"
                    hint="Identificação única (ex.: PZ4QUJG)."
                    persistent-hint
                    type="text"
                    autocomplete="off"
                    class="sku-field pb-2"
                    @keypress.enter="save"
                  >
                    <template #append>
                      <v-tooltip
                        left
                        color="info"
                        max-width="500"
                        transition="scroll-x-reverse-transition"
                      >
                        <span>
                          SKU (
                          <i>Stock Keeping Unit</i>), ou
                          <b>Unidade de Controle de Estoque</b>. Trata-se apenas de um código de identificação único para cada um dos seus produtos,
                          <b>criado e gerenciado por você mesmo(a)</b>, para facilitar a rápida identificação do item e simplificar a integração com outros sistemas.
                        </span>
                        <template #activator="{ on }">
                          <v-icon class="help-icon info--text" v-on="on">mdi-help-circle</v-icon>
                        </template>
                      </v-tooltip>
                    </template>
                  </v-text-field>
                </v-col>

                <v-col cols="12" sm="8" lg="6">
                  <v-text-field
                    ref="name"
                    v-model="formData.name"
                    :rules="formRules.name"
                    label="Nome do item"
                    hint="Nome visível no cardápio (ex.: 4 Queijos)."
                    persistent-hint
                    type="text"
                    autocomplete="off"
                    class="pb-2"
                    @keypress.enter="save"
                  />
                </v-col>

                <v-col cols="12" sm="4" lg="3">
                  <v-text-field
                    ref="price"
                    v-model="formData.price"
                    v-currency
                    :rules="formRules.price"
                    label="Preço unitário"
                    hint="Preço para o cliente (ex.: R$ 29,90)."
                    persistent-hint
                    autocomplete="off"
                    @keypress.enter="save"
                  />
                </v-col>

                <v-col cols="12" lg="9">
                  <v-text-field
                    ref="description"
                    v-model="formData.description"
                    label="Descrição do item"
                    hint="Descrição do que compõe o item (ex.: Pizza de muçarela, parmesão, gorgonzola e provolone)."
                    persistent-hint
                    type="text"
                    autocomplete="off"
                    class="pb-2"
                    @keypress.enter="save"
                  />
                </v-col>

                <v-col cols="12">
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
                      accept="image/jpeg, image/png"
                      class="pt-2"
                    />
                  </div>
                </v-col>
              </v-row>

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

                <v-btn text class="pl-4 pr-4 mt-6" nuxt exact to="/itens-cardapio">
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
  name: 'PageMenuItem',
  middleware: 'auth',
  mixins: [restrictGuests],
  async asyncData ({ app, params, store, redirect }) {
    const formData = {
      category: null,
      sku: '',
      name: '',
      description: '',
      price: '',
      imageFile: null,
      imageURL: null
    }

    if (params && params.id) {
      const doc = await app.$fireStore
        .collection('menuItems')
        .doc(params.id)
        .get()

      if (doc.exists && doc.get('uid') === store.state.authUser.uid) {
        formData.sku = doc.get('sku')
        formData.name = doc.get('name')
        formData.description = doc.get('description')
        formData.price = doc.get('price')
        formData.imageURL = doc.get('imageURL')
        formData.category = {
          id: doc.get('category').id,
          name: doc.get('category').name
        }
      } else {
        return redirect('/itens-cardapio/incluir')
      }
    }

    const snapshot = await app.$fireStore
      .collection('menuCategories')
      .where('uid', '==', store.state.authUser.uid)
      .orderBy('name', 'asc')
      .get()

    return {
      formData,
      categories: snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          name: doc.get('name'),
          imageURL: doc.get('imageURL')
        }
      })
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
        category: rules.required,
        sku: rules.sku,
        name: rules.required,
        price: rules.required,
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

        const collection = this.$fireStore.collection('menuItems')

        const data = {}
        const doc = this.id ? await collection.doc(this.id) : collection.doc()

        if (doc.exists) {
          if (doc.get('uid') !== this.authUser.uid) return false

          data.updatedAt = this.$fireStoreObj.Timestamp.now()
        } else {
          data.createdAt = this.$fireStoreObj.Timestamp.now()
        }

        data.uid = this.authUser.uid
        data.sku = this.formData.sku ? this.formData.sku.toUpperCase() : null
        data.name = this.formData.name || null
        data.description = this.formData.description || null
        data.price = this.formData.price || null
        data.category = this.formData.category
          ? {
              id: this.formData.category.id,
              name: this.formData.category.name
            }
          : null

        if (this.formData.imageFile) {
          if (this.formData.imageFile === 'delete') {
            const refName = `menuItems/${doc.id}_1024x1024`
            await this.$fireStorage.ref(refName).delete()
            data.imageURL = null
            this.formData.imageURL = null
          } else {
            const refName = `menuItems/${doc.id}`
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

        if (this.mode === 'insert') {
          this.$router.push('/itens-cardapio')
        } else if (this.formData.imageURL === 'loading') {
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
      title: this.mode === 'edit' ? 'Editar item' : 'Incluir item'
    }
  }
}
</script>

<style lang="scss" scoped>
.sku-field ::v-deep input[type='text'] {
  text-transform: uppercase;
}
</style>
