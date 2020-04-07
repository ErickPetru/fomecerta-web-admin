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
                    return-object
                    item-text="name"
                    @keypress.enter="save"
                  >
                    <template #item="{ item }">
                      <v-avatar size="30px" class="mr-3">
                        <img
                          v-if="item.imageURL"
                          :src="item.imageURL.replace('_1000x1000', '_50x50')"
                          max-width="50"
                          max-height="50"
                        />
                        <v-icon
                          v-else
                          small
                          dark
                          class="grey white--text font-weight-medium font-normal"
                          v-text="item.name.charAt(0)"
                        />
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
                    class="sku-field"
                    @keypress.enter="save"
                  >
                    <template #append>
                      <v-tooltip
                        top
                        color="info"
                        max-width="500"
                        transition="scroll-y-reverse-transition"
                      >
                        <p>
                          SKU (
                          <i>Stock Keeping Unit</i>), ou Unidade de Controle de Estoque.
                          Refere-se a um
                          <b>código de identificação único</b> para cada um
                          dos seus produtos,
                          <b>criado e gerenciado por você mesmo(a)</b>,
                          para facilitar a rápida identificação do item e simplificar a
                          integração com outros sistemas.
                        </p>
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
                    hint="Nome visível no cardápio (ex.: Quatro Queijos)."
                    persistent-hint
                    type="text"
                    autocomplete="off"
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
                  <v-textarea
                    ref="description"
                    v-model="formData.description"
                    label="Descrição do item"
                    hint="Descrição do que compõe o item (ex.: Pizza de muçarela, parmesão, gorgonzola e provolone)."
                    persistent-hint
                    auto-grow
                    rows="1"
                    type="text"
                    autocomplete="off"
                    @keypress.enter="save"
                  />
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
                  <p>Abaixo você encontra uma simulação de como seu cliente verá este item do seu cardápio no aplicativo para consumidores. Garanta que as informações que você está preenchendo estão entregando o resultado desejado.</p>
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
                    >{{ formData.name || 'Item sem nome' }}</h1>
                    <p class="body-2 grey--text mb-auto">{{ formData.description }}</p>

                    <p class="body-2 grey--text mt-auto mb-0">
                      <span>Valor:</span>
                      <strong class="body-1 font-weight-bold red--text">{{ priceFormmated }}</strong>
                    </p>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-fab-transition>
      <v-btn v-if="fabVisible" fab fixed bottom right dark :color="fabColor" :loading="loading" @click="save">
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
  name: 'PageMenuItem',
  middleware: 'auth',
  mixins: [restrictGuests],
  async asyncData ({ app, params, store, redirect }) {
    const formData = {
      category: null,
      categoryOld: null,
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
        if (formData.imageURL) {
          formData.imageURL = formData.imageURL.replace(
            '_1000x1000',
            '_400x400'
          )
          formData.imageFile = doc.id
        }
        formData.category = {
          id: doc.get('category').id,
          name: doc.get('category').name
        }
      } else {
        return redirect('/itens-cardapio/incluir')
      }
    }

    if (formData.category) {
      formData.categoryOld = formData.category
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
      formValid: false,
      fabVisible: false
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

    priceFormmated () {
      if (!this.formData.price) return 'Indisponível'
      else if (this.formData.price.toString().startsWith('R$'))
        return this.formData.price
      else return `R$ ${this.formData.price}`
    },

    priceRaw () {
      return this.$parseCurrency(this.formData.price) || null
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
    setTimeout(() => (this.fabVisible = true), 150)
    this.loading = false
  },
  methods: {
    async save () {
      if (!this.$refs.form.validate()) return false

      try {
        this.loading = true

        const data = {}
        const ref = this.id
          ? this.$fireStore.collection('menuItems').doc(this.id)
          : this.$fireStore.collection('menuItems').doc()
        const doc = this.id ? await ref.get() : null
        const batch = this.$fireStore.batch()

        if (doc && doc.exists) {
          if (doc.get('uid') !== this.authUser.uid) return false

          data.updatedAt = this.$fireStoreObj.Timestamp.now()
        } else {
          data.createdAt = this.$fireStoreObj.Timestamp.now()
          data.uid = this.authUser.uid

          batch.update(this.$fireStore.doc(`establishments/${data.uid}`), {
            'sizes.menuItems': this.$fireStoreObj.FieldValue.increment(1)
          })
        }

        data.sku = this.formData.sku ? this.formData.sku.toUpperCase() : null
        data.name = this.formData.name || null
        data.description = this.formData.description || null
        data.price = this.priceRaw

        const category = this.formData.category
        const categoryOld = this.formData.categoryOld

        if (categoryOld && (!category || categoryOld.id !== category.id)) {
          batch.update(
            this.$fireStore.doc(`menuCategories/${categoryOld.id}`),
            { usedBy: this.$fireStoreObj.FieldValue.increment(-1) }
          )
        }

        if (!categoryOld || (category && categoryOld.id !== category.id)) {
          batch.update(this.$fireStore.doc(`menuCategories/${category.id}`), {
            usedBy: this.$fireStoreObj.FieldValue.increment(1)
          })
        }

        data.category = category
          ? { id: category.id, name: category.name }
          : null

        this.formData.categoryOld = this.formData.category

        if (this.formData.imageURL === 'delete') {
          for (const size of ['', ...imageSizes]) {
            const refName = `menuItems/${ref.id}${size}`
            const storage = this.$fireStorage.ref(refName)

            storage
              .getDownloadURL()
              .then(() => {
                storage.delete()
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
          const refName = `menuItems/${ref.id}`
          const storage = this.$fireStorage.ref(refName)
          const snapshot = await storage.put(this.formData.imageFile)
          const downloadURL = await snapshot.ref.getDownloadURL()
          data.imageURL = downloadURL.split('?').join('_1000x1000?')
          this.formData.imageFile = ref.id
        }

        batch.set(ref, data, { merge: true })
        await batch.commit()

        this.$snackbar.showMessage(getMessage('save-success'), 'success')

        if (this.mode === 'insert') {
          this.$router.push('/itens-cardapio')
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
