<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" xl="6">
        <v-card :loading="loading">
          <v-toolbar color="primary" flat>
            <v-btn icon nuxt to="/" class="ma-0 mr-2">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-toolbar-title class="pa-0">{{ $metaInfo.title }}</v-toolbar-title>
          </v-toolbar>

          <v-card-text class="pa-0">
            <v-form ref="form" v-model="formValid">
              <v-list>
                <v-subheader>Dados gerais</v-subheader>
                <v-divider />

                <div class="pa-4 pt-0 pb-0">
                  <v-text-field
                    ref="name"
                    v-model="formData.name"
                    v-focus.lazy="isFocused('name')"
                    :rules="formRules.name"
                    label="Nome do estabelecimento"
                    hint="Informe o nome oficial, visível ao público."
                    persistent-hint
                    type="text"
                    autocomplete="off"
                    class="pb-2"
                    @keypress.enter="save"
                    @keydown.down="setFocus('type')"
                  />

                  <v-select
                    ref="type"
                    v-model="formData.type"
                    v-focus.lazy="isFocused('type')"
                    :rules="formRules.type"
                    :items="establishmentTypes"
                    label="Tipo de estabelecimento"
                    hint="É possível escolher mais de um tipo, se desejado."
                    persistent-hint
                    multiple
                    class="pb-2"
                    @keypress.enter="createUser"
                    @keydown.up="setFocus('name')"
                  />
                </div>

                <v-subheader class="mt-6">Entregas a domicílio</v-subheader>
                <v-divider />

                <div class="delivery pa-4 pt-0 pb-0">
                  <v-row>
                    <v-col class="flex-grow-0 flex-shrink-0">
                      <v-checkbox
                        ref="deliveryEnabled"
                        v-model="formData.delivery.enabled"
                        v-focus.lazy="isFocused('deliveryEnabled')"
                        label="Realiza entregas?"
                        class="mb-1"
                      />
                    </v-col>
                    <v-col v-if="formData.delivery.enabled">
                      <v-text-field
                        ref="deliveryPrice"
                        v-model="formData.delivery.price"
                        v-focus.lazy="isFocused('deliveryPrice')"
                        v-money="moneyFormat"
                        label="Preço por entrega"
                        hint="Informe o preço fixo para entrega."
                        persistent-hint
                        autocomplete="off"
                      />
                    </v-col>
                  </v-row>
                </div>

                <v-subheader class="mt-0">Horários de funcionamento</v-subheader>
                <v-divider />

                <v-list class="active-days pt-2">
                  <v-list-item v-for="day of formData.activeDays" :key="day.key">
                    <v-list-item-action class="flex-row align-center mt-1 mb-1">
                      <span class="mt-3 mb-3 mr-2 font-weight-medium">{{ day.text }}:</span>
                      <v-switch
                        v-model="day.checked"
                        :label="day.checked ? 'Aberto' : 'Fechado'"
                        :prepend-text="day.text"
                        dense
                        class="ma-1"
                      />
                    </v-list-item-action>
                    <v-list-item-content class="pt-1 pb-1">
                      <v-row v-if="day.checked" align="center" class="ma-0">
                        <v-col cols="5" class="pa-0">
                          <v-combobox
                            v-model="day.start"
                            placeholder="Abre às"
                            :items="['24 horas', ...defaultHours]"
                            hide-no-data
                            hide-details
                            filled
                            dense
                          >
                            <template
                              #item="{ item }"
                              :class="{ 'v-divider': item === '24 horas' }"
                            >
                              <span class="body-2">{{ item }}</span>
                            </template>
                          </v-combobox>
                        </v-col>
                        <template v-if="day.start !== '24 horas'">
                          <v-col class="pa-0 pl-2 pr-2 flex-grow-0">-</v-col>
                          <v-col cols="5" class="pa-0">
                            <v-combobox
                              v-model="day.end"
                              placeholder="Fecha às"
                              :items="defaultHours"
                              hide-no-data
                              hide-details
                              filled
                              dense
                            >
                              <template #item="{ item }">
                                <span class="body-2">{{ item }}</span>
                              </template>
                            </v-combobox>
                          </v-col>
                        </template>
                        <v-col v-if="day.start || day.end" class="pa-0 pl-2 pr-2 flex-grow-0">
                          <v-btn small icon @click="day.start = day.end = ''">
                            <v-icon>mdi-close</v-icon>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-list>
            </v-form>
          </v-card-text>

          <v-card-actions class="justify-center pa-4 pt-0 pb-0">
            <v-btn
              large
              depressed
              color="primary black--text"
              class="mb-4 pl-6 pr-6"
              :loading="loading"
              @click="save"
            >
              <v-icon class="ma-0 mr-2 text--secondary">mdi-check-circle</v-icon>
              <span>Confirmar</span>
            </v-btn>

            <v-btn
              large
              depressed
              nuxt
              color="secondary lighten-3 black--text"
              class="mb-4 pl-6 pr-6"
              to="/"
            >
              <v-icon class="ma-0 mr-2 text--secondary">mdi-close</v-icon>
              <span>Cancelar</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { VMoney as money } from 'v-money'
// import messages from '@/helpers/messages'
import rules from '@/helpers/validation-rules'
import formValidation from '@/mixins/form-validation'
import restrictGuests from '@/mixins/restrict-guests'

export default {
  name: 'PageEstablishment',
  middleware: 'auth',
  directives: { money },
  mixins: [formValidation, restrictGuests],
  // async asyncData (context) {
  //   const establishmentTypes = []

  //   const snapshot = await context.app.$fireStore
  //     .collection('establishmentTypes')
  //     .orderBy('text', 'asc')
  //     .limit(50)
  //     .get()

  //   snapshot.forEach((item) => {
  //     establishmentTypes.push(item.data())
  //   })

  //   return { establishmentTypes }
  // },
  data () {
    return {
      establishmentTypes: ['Restaurante', 'Lanchonete', 'Pizzaria'],
      loading: false,
      focused: 'name',
      formData: {
        type: '',
        name: '',
        delivery: {
          enabled: false,
          price: ''
        },
        activeDays: [
          { key: 'seg', text: 'Segunda-feira' },
          { key: 'ter', text: 'Terça-feira' },
          { key: 'qua', text: 'Quarta-feira' },
          { key: 'qui', text: 'Quinta-feira' },
          { key: 'sex', text: 'Sexta-feira' },
          { key: 'sab', text: 'Sábado' },
          { key: 'dom', text: 'Domingo' }
        ]
      },
      defaultHours: [],
      moneyFormat: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2
      }
    }
  },
  computed: {
    formRules () {
      return {
        type: rules.required,
        name: rules.required
      }
    }
  },
  mounted () {
    // this.syncEstablishmentTypes()

    // TODO: Futuramente carregar os dados salvos no banco.
    for (const day of this.formData.activeDays) {
      this.$set(day, 'checked', false)
      this.$set(day, 'start', '')
      this.$set(day, 'end', '')
    }

    for (let i = 0; i < 24; i++) {
      const hour = i.toString().padStart(2, '0')
      this.defaultHours.push(hour + ':00')
      this.defaultHours.push(hour + ':30')
    }
  },
  methods: {
    save () {
      if (!this.validate()) return false

      try {
        this.loading = true
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    }

    // async syncEstablishmentTypes () {
    //   try {
    //     this.loading = true

    //     await this.$fireStore
    //       .collection('establishmentTypes')
    //       .orderBy('text', 'asc')
    //       .limit(50)
    //       .onSnapshot((snapshot) => {
    //         if (!snapshot.size) this.establishmentTypes = []
    //         snapshot.docChanges().forEach((change) => {
    //           const data = change.doc.data()
    //           console.log(change.type, data)
    //         })
    //       })
    //   } catch (error) {
    //     console.error(error)
    //     this.$snackbar.showMessage(messages[error.code], 'error')
    //   } finally {
    //     this.loading = false
    //   }
    // }
  },
  head: () => ({
    title: 'Dados do estabelecimento'
  })
}
</script>

<style lang="scss" scoped>
.delivery {
  .col:first-child {
    min-width: 12.5rem;
  }
}

.active-days {
  .v-list-item__action {
    width: 13.5rem;
  }

  .v-list-item__content .col {
    max-width: 8rem;
  }
}
</style>
