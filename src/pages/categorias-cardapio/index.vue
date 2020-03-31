<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" xl="6">
        <v-card :loading="loading" class="float-over-expanded">
          <v-toolbar color="primary" flat>
            <v-btn icon nuxt to="/" class="ma-0 mr-2">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-toolbar-title class="pa-0">{{ $metaInfo.title }}</v-toolbar-title>
          </v-toolbar>

          <v-card-text class="pa-5 pt-3">
            <v-data-table
              must-sort
              disable-pagination
              hide-default-footer
              :headers="headers"
              :loading="loading"
              :items="items"
              no-data-text="Não há dados para exibir"
            >
              <template #items="{ props }">
                <td class="text-left">{{ props.item.name }}</td>
                <td class="text-center">{{ props.item.usedBy }}</td>
              </template>
            </v-data-table>

            <v-btn
              fab
              absolute
              bottom
              right
              color="secondary"
              nuxt
              to="/categorias-cardapio/incluir"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import restrictGuests from '@/mixins/restrict-guests'

export default {
  name: 'PageMenuCategories',
  middleware: 'auth',
  mixins: [restrictGuests],
  async asyncData ({ app }) {
    const snapshot = await app.$fireStore
      .collection('menuCategories')
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
      search: '',
      loading: false,
      headers: [{ text: 'Nome da categoria', value: 'name', align: 'left' }]
    }
  },
  computed: {
    ...mapGetters(['authUser'])
  },
  head: () => ({
    title: 'Categorias do cardápio'
  })
}
</script>
