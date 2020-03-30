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
            <v-stepper v-model="stepper" vertical>
              <v-stepper-step :complete="stepper > 1" step="1" editable>
                <span>Informações gerais</span>
                <small>Preencha com as informações gerais do estabelecimento</small>
              </v-stepper-step>

              <v-stepper-content step="1">
                <v-form ref="formGeneral" v-model.lazy="formGeneralValid" class="pb-4">
                  <div class="pa-0 pt-0 pb-0">
                    <v-text-field
                      ref="name"
                      v-model="formData.name"
                      :rules="formRules.name"
                      label="Nome do estabelecimento"
                      hint="Informe o nome oficial, visível ao público."
                      persistent-hint
                      type="text"
                      autocomplete="off"
                      class="pb-2"
                      @keypress.enter="saveGeneral"
                    />

                    <v-select
                      ref="types"
                      v-model="formData.types"
                      :rules="formRules.types"
                      :items="establishmentTypes"
                      label="Tipo de estabelecimento"
                      hint="É possível escolher mais de um tipo, se desejado."
                      persistent-hint
                      multiple
                      class="pb-2"
                      item-value="id"
                      item-text="name"
                      @keypress.enter="saveGeneral"
                    />
                  </div>

                  <div class="delivery pb-1">
                    <v-row align="center" class="ma-0">
                      <v-checkbox
                        ref="delivery"
                        v-model="formData.deliveryEnabled"
                        label="Realiza entregas?"
                        hide-details
                        class="shrink mr-5 mt-0"
                      />
                      <v-text-field
                        v-if="formData.deliveryEnabled"
                        ref="deliveryPrice"
                        v-model="formData.deliveryPrice"
                        v-currency
                        :rules="formRules.deliveryPrice"
                        label="Preço por entrega"
                        hint="Informe o preço fixo para entrega."
                        persistent-hint
                        autocomplete="off"
                        @keypress.enter="saveGeneral"
                      />
                      <v-text-field v-else label="Preço por entrega" disabled />
                    </v-row>
                  </div>

                  <div class="mt-2">
                    <v-btn
                      color="primary black--text"
                      class="mr-2 pl-6 pr-6"
                      :loading="loading"
                      @click="save"
                    >
                      <v-icon class="ma-0 mr-2 text--secondary">mdi-check-circle</v-icon>
                      <span>Confirmar</span>
                    </v-btn>
                  </div>
                </v-form>
              </v-stepper-content>

              <v-stepper-step :complete="stepper > 2" step="2" :editable="formGeneralValid">
                <span>Logomarca</span>
                <small>Escolha a imagem com a logomarca de seu negócio</small>
              </v-stepper-step>

              <v-stepper-content step="2">
                <v-form ref="formImage" v-model="formImageValid">
                  <div>Futuramente...</div>

                  <div class="mt-2">
                    <v-btn
                      depressed
                      color="primary black--text"
                      class="mb-4 pl-6 pr-6"
                      :loading="loading"
                      @click="save"
                    >
                      <v-icon class="ma-0 mr-2 text--secondary">mdi-check-circle</v-icon>
                      <span>Confirmar</span>
                    </v-btn>

                    <v-btn text class="mb-4 pl-6 pr-6" @click="stepper = 1">
                      <v-icon class="ma-0 mr-2 text--secondary">mdi-chevron-left</v-icon>
                      <span>Voltar</span>
                    </v-btn>
                  </div>
                </v-form>
              </v-stepper-content>

              <v-stepper-step
                :complete="stepper > 3"
                step="3"
                :editable="formGeneralValid && formImageValid"
              >
                <span>Horários de funcionamento</span>
                <small>Selecione os dias e preencha com os horários de cada dia</small>
              </v-stepper-step>

              <v-stepper-content step="3" class="pb-2">
                <v-form ref="formActiveDays" v-model.lazy="formActiveDaysValid" class="ml-n8">
                  <v-list class="active-days pt-1">
                    <v-list-item v-for="day of formData.activeDays" :key="day.day" class="pl-0">
                      <v-list-item-action class="flex-row align-center mt-1 mb-1">
                        <span class="mt-3 mb-3 mr-2 font-weight-medium">{{ day.fullName }}:</span>
                        <v-switch
                          v-model="day.active"
                          :label="day.active ? 'Aberto' : 'Fechado'"
                          dense
                          class="ma-1"
                        />
                      </v-list-item-action>
                      <v-list-item-content class="pt-1 pb-1">
                        <v-row v-if="day.active" align="center" class="ma-0">
                          <v-col cols="5" class="pa-0">
                            <v-combobox
                              v-model="day.timeStart"
                              placeholder="Abre às"
                              :items="['24 horas', ...defaultHours]"
                              :rules="formRules.timeStart"
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
                          <template v-if="day.timeStart !== '24 horas'">
                            <v-col class="pa-0 pl-2 pr-2 flex-grow-0">-</v-col>
                            <v-col cols="5" class="pa-0">
                              <v-combobox
                                v-model="day.timeEnd"
                                placeholder="Fecha às"
                                :items="defaultHours"
                                :rules="formRules.timeEnd"
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
                          <v-col
                            v-if="day.timeStart || day.timeEnd"
                            class="pa-0 pl-2 pr-2 flex-grow-0"
                          >
                            <v-btn small icon @click="day.timeStart = day.timeEnd = ''">
                              <v-icon>mdi-close</v-icon>
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>

                  <div class="mt-2">
                    <v-btn
                      depressed
                      color="primary black--text"
                      class="pl-6 pr-6"
                      :loading="loading"
                      @click="save"
                    >
                      <v-icon class="ma-0 mr-2 text--secondary">mdi-check-circle</v-icon>
                      <span>Confirmar</span>
                    </v-btn>

                    <v-btn text class="pl-6 pr-6" @click="stepper = 2">
                      <v-icon class="ma-0 mr-2 text--secondary">mdi-chevron-left</v-icon>
                      <span>Voltar</span>
                    </v-btn>
                  </div>
                </v-form>
              </v-stepper-content>
            </v-stepper>
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

async function getEstablishmentTypes ($fireStore) {
  const snapshot = await $fireStore
    .collection('establishmentTypes')
    .orderBy('name', 'asc')
    .limit(50)
    .get()

  return snapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data()
    }
  })
}

async function getEstablishment ($fireStore, authUser) {
  const doc = await $fireStore
    .collection('establishments')
    .doc(authUser.uid)
    .get()

  if (!doc.exists) return null

  return {
    id: doc.id,
    ...doc.data()
  }
}

export default {
  name: 'PageEstablishment',
  middleware: 'auth',
  mixins: [restrictGuests],
  async asyncData ({ app }) {
    const establishmentTypes = await getEstablishmentTypes(app.$fireStore)

    const establishment = await getEstablishment(
      app.$fireStore,
      app.store.state.authUser
    )

    const weekdays = [
      { day: 'seg', fullName: 'Segunda-feira' },
      { day: 'ter', fullName: 'Terça-feira' },
      { day: 'qua', fullName: 'Quarta-feira' },
      { day: 'qui', fullName: 'Quinta-feira' },
      { day: 'sex', fullName: 'Sexta-feira' },
      { day: 'sab', fullName: 'Sábado' },
      { day: 'dom', fullName: 'Domingo' }
    ]

    const activeDays = weekdays.map((weekday) => {
      if (establishment) {
        const activeDay = establishment.activeDays.find(
          (item) => item.day === weekday.day
        )
        if (activeDay) {
          return {
            fullName: weekday.fullName,
            active: true,
            ...activeDay
          }
        }
      }

      return {
        ...weekday,
        active: false,
        timeStart: '',
        timeEnd: ''
      }
    })

    return {
      establishmentTypes,
      formData: {
        name: establishment ? establishment.name : '',
        types: establishment ? establishment.types : '',
        deliveryEnabled: establishment ? establishment.deliveryEnabled : false,
        deliveryPrice: establishment ? establishment.deliveryPrice : '',
        activeDays
      }
    }
  },
  data () {
    return {
      stepper: 1,
      loading: false,
      formGeneralValid: false,
      formImageValid: false,
      formActiveDaysValid: false,
      defaultHours: []
    }
  },
  computed: {
    ...mapGetters(['authUser']),

    formRules () {
      return {
        name: rules.required,
        types: rules.required,
        deliveryPrice: rules.required,
        timeStart: rules.required,
        timeEnd: rules.required
      }
    },

    deliveryPrice () {
      return this.$parseCurrency(this.formData.deliveryPrice) || null
    }
  },
  mounted () {
    for (let i = 0; i < 24; i++) {
      const hour = i.toString().padStart(2, '0')
      this.defaultHours.push(hour + ':00')
    }
  },
  methods: {
    async save () {
      if (this.stepper === 1 && !this.$refs.formGeneral.validate()) return false
      if (this.stepper === 2 && !this.$refs.formImage.validate()) return false
      if (this.stepper === 3 && !this.$refs.formActiveDays.validate()) {
        this.$snackbar.showMessage(
          'É necessário preencher todos os horários de atendimento.',
          'error'
        )
        return false
      }

      try {
        this.loading = true

        const activeDays = this.formData.activeDays
          .filter((item) => !!item.active)
          .map((item) => ({
            day: item.day,
            timeStart: item.timeStart,
            timeEnd: item.timeEnd || null
          }))

        const data = {
          name: this.formData.name || null,
          types: this.formData.types.length ? this.formData.types : null,
          deliveryEnabled: this.formData.deliveryEnabled,
          deliveryPrice: this.deliveryPrice,
          activeDays
        }

        const ref = this.$fireStore
          .collection('establishments')
          .doc(this.authUser.uid)

        const doc = await ref.get()
        if (doc.exists) {
          data.updatedAt = this.$fireStoreObj.Timestamp.now()
        } else {
          data.createdAt = this.$fireStoreObj.Timestamp.now()
        }

        await ref.set(data, { merge: true })

        if (this.stepper < 3) this.stepper++
        this.$snackbar.showMessage(getMessage('save-success'), 'success')
      } catch (error) {
        console.error(error)
        this.$snackbar.showMessage(getMessage(error), 'error')
      } finally {
        this.loading = false
      }
    }
  },
  head: () => ({
    title: 'Configurações do estabelecimento'
  })
}
</script>

<style lang="scss" scoped>
.delivery {
  .v-text-field {
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
