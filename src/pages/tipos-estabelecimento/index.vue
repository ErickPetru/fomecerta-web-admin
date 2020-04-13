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

          <v-card-text class="pa-5 pt-3 pb-3">
            <v-data-table
              v-model="selected"
              :headers="headers"
              :loading="loading"
              :items="items"
              :options.sync="options"
              :footer-props="{ 'items-per-page-options': [10] }"
              :server-items-length="options.total"
              must-sort
              show-select
              single-select
              @click:row="rowClicked"
              @item-selected="itemSelected"
            >
              <template #item.usedBy="{ item }">
                <span
                  v-if="!!item.usedBy"
                  class="caption font-weight-medium error--text"
                >{{ item.usedBy }}</span>
                <span v-else class="caption">0</span>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-fab-transition>
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
        <v-btn fab dark small color="green darken-2" nuxt :to="destinationInsert">
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
import restrictNotAdmin from '@/mixins/restrict-not-admin'

export default {
  name: 'PageEstablishmentTypes',
  middleware: 'admin',
  mixins: [restrictNotAdmin],
  data () {
    return {
      loading: true,
      isInsert: true,
      speedDial: false,
      speedDialTimer: null,
      showRemoveDialog: false,
      selected: [],
      options: {
        sortBy: ['name'],
        itemsPerPage: 10,
        lastPage: null,
        total: 0
      },
      headers: [
        { text: 'Nome', value: 'name' },
        {
          text: 'Estabelecimentos',
          value: 'usedBy',
          sortable: false,
          width: 150
        }
      ],
      items: []
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
      return '/tipos-estabelecimento/incluir'
    },

    destinationEdit () {
      return this.selectedItem
        ? `/tipos-estabelecimento/editar/${this.selectedItem.id}`
        : null
    }
  },
  watch: {
    options: {
      deep: true,
      handler: 'get'
    }
  },
  mounted () {
    this.loading = false
  },
  methods: {
    async get (val, oldVal) {
      if (
        val.page === oldVal.page &&
        val.itemsPerPage === oldVal.itemsPerPage &&
        val.sortBy === oldVal.sortBy &&
        val.sortDesc === oldVal.sortDesc
      ) {
        return false
      }

      this.loading = true
      this.selectedItem = null

      try {
        const count = await this.$fireStore.doc('sizes/global').get()
        this.options.total = count.exists ? count.get('establishmentTypes') : 0

        const { page, itemsPerPage, lastPage } = this.options
        let { sortBy, sortDesc } = this.options

        sortBy = sortBy ? sortBy[0] : null
        sortDesc = sortDesc ? sortDesc[0] : null

        let query = this.$fireStore
          .collection('establishmentTypes')
          .orderBy(sortBy, sortDesc ? 'desc' : 'asc')

        if (lastPage && lastPage < page) {
          const start = this.items[this.items.length - 1][sortBy]
          query = query.startAfter(start).limit(itemsPerPage)
        } else if (lastPage && lastPage > page) {
          const end = this.items[0][sortBy]
          query = query.endBefore(end).limitToLast(itemsPerPage)
        } else {
          query = query.limit(itemsPerPage)
        }

        const snapshot = await query.get()
        this.options.lastPage = page

        this.items = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            name: doc.get('name'),
            usedBy: doc.get('usedBy')
          }
        })
      } finally {
        this.loading = false
      }
    },

    async remove () {
      try {
        this.showRemoveDialog = false
        if (!this.selectedItem) return false

        this.loading = true

        const doc = await this.$fireStore
          .collection('establishmentTypes')
          .doc(this.selectedItem.id)
          .get()

        if (!doc.exists) {
          return this.localRemove()
        }

        const batch = this.$fireStore.batch()
        const increment = this.$fireStoreObj.FieldValue.increment

        batch.set(
          this.$fireStore.doc('sizes/global'),
          {
            establishmentTypes: increment(-1)
          },
          { merge: true }
        )

        batch.delete(this.$fireStore.doc(`establishmentTypes/${doc.id}`))
        await batch.commit()

        return this.localRemove()
      } catch (error) {
        console.error(error)
        this.$snackbar.showMessage(getMessage(error), 'error')
      } finally {
        this.loading = false
      }
    },

    localRemove () {
      this.loading = true

      const indexOf = this.items.findIndex((i) => i.id === this.selectedItem.id)

      if (indexOf > -1) {
        this.items.splice(indexOf, 1)
        this.selectedItem = null
        this.$snackbar.showMessage(getMessage('remove-success'), 'success')
      }

      this.loading = false
      return true
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
    title: 'Tipos de estabelecimento'
  })
}
</script>
