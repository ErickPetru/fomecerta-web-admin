<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="9" xl="6">
        <v-card :loading="loading" class="float-over-expanded">
          <v-toolbar color="primary" flat>
            <v-btn icon nuxt exact to="/tipos-estabelecimento" class="ma-0 mr-2">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-toolbar-title class="pa-0">{{ $metaInfo.title }}</v-toolbar-title>
          </v-toolbar>

          <v-card-text class="pa-5 pt-3">
            <v-alert v-if="formData.usedBy" icon="mdi-exclamation-thick" type="warning">
              Cuidado ao realizar alterações, pois elas serão refletidas em
              <strong
                v-if="formData.usedBy === 1"
              >1 estabelecimento</strong>
              <strong v-else>{{ formData.usedBy }} estabelecimentos</strong>.
            </v-alert>

            <v-form ref="form" v-model.lazy="formValid">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    ref="name"
                    v-model="formData.name"
                    :rules="formRules.name"
                    label="Nome do tipo"
                    hint="Nome utilizado em pesquisas (ex.: Pizzas, Lanches, Cozinha Italiana)."
                    persistent-hint
                    type="text"
                    autocomplete="off"
                    @keypress.enter="save"
                  />
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-fab-transition>
      <v-btn
        v-if="fabVisible"
        fab
        fixed
        bottom
        right
        dark
        :color="fabColor"
        :loading="loading"
        @click="save"
      >
        <v-icon>mdi-content-save</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-container>
</template>

<script>
import { getMessage } from '@/helpers/messages'
import rules from '@/helpers/validation-rules'
import restrictNotAdmin from '@/mixins/restrict-not-admin'

export default {
  name: 'PageEstablishmentType',
  middleware: 'auth',
  mixins: [restrictNotAdmin],
  async asyncData ({ app, params, store, redirect }) {
    const formData = {
      name: '',
      nameOld: '',
      usedBy: null
    }

    if (params && params.id) {
      const doc = await app.$fireStore
        .collection('establishmentTypes')
        .doc(params.id)
        .get()

      if (doc.exists) {
        formData.name = doc.get('name')
        if (formData.name) {
          formData.nameOld = formData.name
        }
        formData.usedBy = doc.get('usedBy')
      } else {
        return redirect('/tipos-estabelecimento/incluir')
      }
    }

    return {
      formData
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

    formRules () {
      return {
        name: rules.required
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
          ? this.$fireStore.collection('establishmentTypes').doc(this.id)
          : this.$fireStore.collection('establishmentTypes').doc()
        const doc = this.id ? await ref.get() : null
        const batch = this.$fireStore.batch()
        const increment = this.$fireStoreObj.FieldValue.increment

        if (doc && doc.exists) {
          data.updatedAt = this.$fireStoreObj.Timestamp.now()
        } else {
          data.createdAt = this.$fireStoreObj.Timestamp.now()

          batch.set(this.$fireStore.doc('sizes/global'), {
            establishmentTypes: increment(1)
          }, { merge: true })
        }

        const name = this.formData.name
        const nameOld = this.formData.nameOld

        if (name !== nameOld) {
          const typeOfEstablishment = { id: ref.id, name: nameOld }

          const snapshot = await this.$fireStore
            .collection('establishments')
            .where(
              'typesOfEstablishment',
              'array-contains',
              typeOfEstablishment
            )
            .get()

          if (!snapshot.empty) {
            const arrayRemove = this.$fireStoreObj.FieldValue.arrayRemove
            const arrayUnion = this.$fireStoreObj.FieldValue.arrayUnion

            snapshot.forEach((doc) => {
              batch.update(doc.ref, {
                typesOfEstablishment: arrayRemove(typeOfEstablishment)
              })

              batch.update(doc.ref, {
                typesOfEstablishment: arrayUnion({
                  id: typeOfEstablishment.id,
                  name
                })
              })
            })
          }
        }

        data.name = name || null
        this.formData.nameOld = this.formData.name

        batch.set(ref, data, { merge: true })
        await batch.commit()

        this.$snackbar.showMessage(getMessage('save-success'), 'success')

        if (this.mode === 'insert') {
          this.$router.push('/tipos-estabelecimento')
        }
      } catch (error) {
        console.error(error)
        this.$snackbar.showMessage(getMessage(error), 'error')
      } finally {
        this.loading = false
      }
    }
  },
  head () {
    return {
      title:
        this.mode === 'edit'
          ? 'Editar tipo de estabelecimento'
          : 'Incluir tipo de estabelecimento'
    }
  }
}
</script>

<style lang="scss" scoped>
.v-autocomplete ::v-deep input[type='text'] {
  text-transform: lowercase;
}
</style>
