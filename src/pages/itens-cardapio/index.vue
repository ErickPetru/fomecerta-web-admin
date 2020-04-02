<template>
  <v-container class="form-with-fab" fluid>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="9" xl="6">
        <v-card :loading="loading" class="float-over-expanded">
          <v-toolbar color="primary" flat>
            <v-btn icon nuxt to="/" class="ma-0 mr-2">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-toolbar-title class="pa-0">{{ $metaInfo.title }}</v-toolbar-title>
          </v-toolbar>

          <v-card-text class="pa-5 pt-3">
            <v-data-table
              v-model="selected"
              :headers="headers"
              :loading="loading"
              :items="items"
              :sort-by.sync="sortBy"
              no-data-text="Não há dados para exibir"
              must-sort
              disable-pagination
              hide-default-footer
              calculate-widths
              show-select
              single-select
              @click:row="rowClicked"
              @item-selected="itemSelected"
            >
              <template #item.description="{ item }">
                <span class="d-inline-block text-truncate" style="max-width: 15vw">{{ item.description }}</span>
              </template>
              <template #item.imageURL="{ item }">
                <span v-if="!!item.imageURL" class="caption font-weight-medium success--text">Sim</span>
                <span v-else class="caption error--text">Não</span>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-fab-transition mode="out-in">
      <v-btn
        v-if="!loading && isInsert"
        fab
        absolute
        fixed
        bottom
        right
        color="green darken-2"
        dark
        nuxt
        :to="destinationInsert"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-speed-dial
        v-else-if="!loading"
        v-model="speedDial"
        absolute
        fixed
        bottom
        right
        direction="top"
        transition="scale-transition"
      >
        <template #activator>
          <v-btn v-model="speedDial" color="grey darken-2" dark fab>
            <v-icon v-if="speedDial || speedDialTimer">mdi-close</v-icon>
            <v-icon v-else>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-btn ref="teste" fab dark small color="green darken-2" nuxt :to="destinationInsert">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-btn v-if="selectedItem" fab dark small color="indigo" nuxt :to="destinationEdit">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn
          v-if="selectedItem && !selectedItem.usedBy"
          fab
          dark
          small
          color="accent"
          @click="showRemoveDialog = true"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-speed-dial>
    </v-fab-transition>

    <v-dialog v-model="showRemoveDialog" persistent max-width="380">
      <v-card>
        <v-card-title class="headline">Deseja confirmar a exclusão?</v-card-title>
        <v-card-text>O registro será excluído definitivamente e não será possível recuperá-lo posteriormente.</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="showRemoveDialog = false">Cancelar</v-btn>
          <v-btn text color="error" class="font-weight-bold" @click="remove">Excluir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { getMessage } from '@/helpers/messages'
import restrictGuests from '@/mixins/restrict-guests'

export default {
  name: 'PageMenuItems',
  middleware: 'auth',
  mixins: [restrictGuests],
  async asyncData ({ app, store }) {
    const snapshot = await app.$fireStore
      .collection('menuItems')
      .where('uid', '==', store.state.authUser.uid)
      .orderBy('name', 'asc')
      .get()

    return {
      items: snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        }
      })
    }
  },
  data () {
    return {
      loading: true,
      isInsert: true,
      speedDial: false,
      speedDialTimer: null,
      showRemoveDialog: false,
      search: '',
      sortBy: 'name',
      selected: [],
      headers: [
        { text: 'Categoria', value: 'category.name' },
        { text: 'Nome', value: 'name' },
        { text: 'Descrição', value: 'description' },
        { text: 'Preço', value: 'price' },
        { text: 'Imagem', value: 'imageURL' }
      ]
    }
  },
  computed: {
    selectedItem: {
      get () {
        if (this.selected.length) return this.selected[0]
        return null
      },

      set () {
        this.itemSelected({ value: false })
        this.selected = []
      }
    },

    destinationInsert () {
      return '/itens-cardapio/incluir'
    },

    destinationEdit () {
      return this.selectedItem
        ? `/itens-cardapio/editar/${this.selectedItem.id}`
        : null
    }
  },
  mounted () {
    this.loading = false
  },
  methods: {
    async remove () {
      try {
        this.showRemoveDialog = false
        if (!this.selectedItem) return false

        this.loading = true

        const doc = await this.$fireStore
          .collection('menuItems')
          .doc(this.selectedItem.id)
          .get()

        if (!doc.exists) {
          this.loading = false
          return false
        }

        if (doc.data().imageURL) {
          const refName = `menuItems/${doc.id}_1024x1024`
          await this.$fireStorage.ref(refName).delete()
        }

        await this.$fireStore
          .collection('menuItems')
          .doc(doc.id)
          .delete()

        this.items.splice(
          this.items.indexOf((item) => item.id === doc.id),
          1
        )
        this.selectedItem = null

        this.$snackbar.showMessage(getMessage('remove-success'), 'success')
      } catch (error) {
        console.error(error)
        this.$snackbar.showMessage(getMessage(error), 'error')
      } finally {
        this.loading = false
      }
    },

    rowClicked (value) {
      if (this.selectedItem && this.selectedItem.id === value.id) {
        this.selected = []
      } else {
        this.selected = [value]
      }

      this.itemSelected({ item: value, value: !!this.selected.length })
    },

    itemSelected ({ value }) {
      if (typeof this.speedDialTimer === 'number') {
        clearTimeout(this.speedDialTimer)
        this.speedDialTimer = null
      }

      if (value) {
        this.isInsert = false
        this.speedDialTimer = setTimeout(() => {
          this.speedDial = true
          this.speedDialTimer = null
        }, 550)
      } else {
        this.speedDial = false
        this.speedDialTimer = setTimeout(() => {
          this.isInsert = true
          this.speedDialTimer = null
        }, 250)
      }
    }
  },
  head: () => ({
    title: 'Itens do cardápio'
  })
}
</script>
