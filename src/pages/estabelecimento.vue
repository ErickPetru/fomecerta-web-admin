<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="9" xl="6">
        <v-card :loading="loading" class="float-over-expanded">
          <v-toolbar color="primary" flat>
            <v-btn icon nuxt to="/" class="ma-0 mr-2">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-toolbar-title class="pa-0">{{ $metaInfo.title }}</v-toolbar-title>
          </v-toolbar>

          <v-card-text class="pt-0 pl-0 pr-0">
            <v-stepper
              v-model="stepper.current"
              vertical
              class="elevation-0"
              @change="stepperChanged"
            >
              <v-stepper-step :complete="stepper.current > 1" :step="1" editable>
                <span>Informações gerais</span>
                <small>Preencha com as informações gerais do estabelecimento</small>
              </v-stepper-step>

              <v-stepper-content :step="1">
                <v-form ref="formGeneral" v-model.lazy="formGeneralValid" class="pb-4">
                  <div>
                    <v-text-field
                      ref="name"
                      v-model="formData.name"
                      :rules="formRules.name"
                      label="Nome do estabelecimento"
                      hint="Nome oficial visível ao público em geral."
                      persistent-hint
                      type="text"
                      autocomplete="off"
                      class="pb-2"
                      :loading="loading"
                      :readonly="loading"
                      @keypress.enter="save"
                    />

                    <v-autocomplete
                      ref="typesOfEstablishment"
                      v-model="formData.typesOfEstablishment"
                      :rules="formRules.typesOfEstablishment"
                      :items="establishmentTypes"
                      label="Tipo de estabelecimento"
                      hint="Um ou mais tipos que definem o estabelecimento."
                      persistent-hint
                      hide-no-data
                      multiple
                      small-chips
                      deletable-chips
                      return-object
                      auto-select-first
                      :search-input.sync="typesOfEstablishmentSearch"
                      class="pb-2"
                      item-text="name"
                      :loading="loading"
                      :readonly="loading"
                      @keypress.enter="save"
                      @change="typesOfEstablishmentSearch = ''"
                    />
                  </div>

                  <div class="delivery pb-1">
                    <v-row align="center" class="ma-0">
                      <v-checkbox
                        ref="delivery"
                        v-model="formData.delivery.enabled"
                        label="Realiza entregas?"
                        hide-details
                        class="shrink mr-5 mt-0"
                        :loading="loading"
                        :readonly="loading"
                      />
                      <v-text-field
                        v-if="formData.delivery.enabled"
                        ref="deliveryPrice"
                        v-model="formData.delivery.price"
                        v-currency
                        :rules="formRules.deliveryPrice"
                        label="Preço por entrega"
                        hint="Preço fixo por entrega."
                        persistent-hint
                        autocomplete="off"
                        :loading="loading"
                        :readonly="loading"
                        @keypress.enter="save"
                      />
                      <v-text-field v-else label="Preço por entrega" disabled />
                    </v-row>
                  </div>
                </v-form>
              </v-stepper-content>

              <v-stepper-step :complete="stepper.current > 2" :step="2" editable>
                <span>Logomarca</span>
                <small>Escolha a imagem com a logomarca de seu negócio</small>
              </v-stepper-step>

              <v-stepper-content :step="2">
                <v-form ref="formImage" v-model="formImageValid" class="pb-4">
                  <v-text-field
                    v-if="typeof formData.imageFile === 'string'"
                    v-model="formData.imageFile"
                    label="Arquivo de imagem"
                    hint="Dica: imagens quadradas de aproximadamente 800px para melhores resultados."
                    persistent-hint
                    prepend-icon="mdi-paperclip"
                    clearable
                    readonly
                    :loading="loading"
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
                    :loading="loading"
                    :readonly="loading"
                    @change="onImageChange"
                  />
                </v-form>
              </v-stepper-content>

              <v-stepper-step :complete="stepper.current > 3" :step="3" editable>
                <span>Endereço</span>
                <small>Informe onde seu estabelecimento se encontra fisicamente</small>
              </v-stepper-step>

              <v-stepper-content :step="3">
                <v-form ref="formAddress" v-model.lazy="formAddressValid" class="pb-4">
                  <v-row>
                    <v-col cols="12" sm="6" md="4" lg="3" class="pt-0">
                      <v-text-field
                        ref="addressZipCode"
                        v-model="formData.address.zipCode"
                        v-mask="'#####-###'"
                        :rules="formRules.address.zipCode"
                        label="CEP"
                        hint="Código de endereçamento postal."
                        persistent-hint
                        type="text"
                        autocomplete="off"
                        :loading="loading"
                        :readonly="loading"
                        @keypress.enter="searchZipCode"
                        @change="searchZipCode"
                      />
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" md="8" lg="6" class="pt-0">
                      <v-text-field
                        ref="addressStreet"
                        v-model="formData.address.street"
                        :rules="formRules.address.street"
                        label="Endereço"
                        hint="Logradouro completo do endereço."
                        persistent-hint
                        type="text"
                        autocomplete="off"
                        :loading="loading"
                        :readonly="loading"
                        @keypress.enter="save"
                      />
                    </v-col>

                    <v-col cols="12" md="4" lg="2" class="pt-0">
                      <v-text-field
                        ref="addressNumber"
                        v-model="formData.address.number"
                        label="Número"
                        hint="Número do endereço."
                        persistent-hint
                        type="text"
                        autocomplete="off"
                        :loading="loading"
                        :readonly="loading"
                        @keypress.enter="save"
                      />
                    </v-col>

                    <v-col cols="12" md="5" lg="4" class="pt-0">
                      <v-text-field
                        ref="addressComplement"
                        v-model="formData.address.complement"
                        label="Complemento"
                        hint="Complemento do endereço."
                        persistent-hint
                        type="text"
                        autocomplete="off"
                        :loading="loading"
                        :readonly="loading"
                        @keypress.enter="save"
                      />
                    </v-col>

                    <v-col cols="12" md="7" lg="6" class="pt-0">
                      <v-text-field
                        ref="addressDistrict"
                        v-model="formData.address.district"
                        :rules="formRules.address.district"
                        label="Bairro"
                        hint="Bairro do estabelecimento."
                        persistent-hint
                        type="text"
                        autocomplete="off"
                        :loading="loading"
                        :readonly="loading"
                        @keypress.enter="save"
                      />
                    </v-col>

                    <v-col cols="12" md="8" lg="4" class="pt-0">
                      <v-text-field
                        ref="addressCity"
                        v-model="formData.address.city"
                        label="Cidade"
                        hint="Cidade do estabelecimento."
                        persistent-hint
                        type="text"
                        autocomplete="off"
                        disabled
                        :loading="loading"
                        :readonly="loading"
                        @keypress.enter="save"
                      />
                    </v-col>

                    <v-col cols="12" md="4" lg="2" class="pt-0">
                      <v-select
                        ref="addressState"
                        v-model="formData.address.state"
                        :items="states"
                        label="Estado"
                        hint="Unidade federativa."
                        persistent-hint
                        type="text"
                        autocomplete="off"
                        disabled
                        :loading="loading"
                        :readonly="loading"
                        @keypress.enter="save"
                      />
                    </v-col>
                  </v-row>
                </v-form>
              </v-stepper-content>

              <v-stepper-step :complete="stepper.current > 4" :step="4" editable>
                <span>Geolocalização</span>
                <small>Informe com precisão o posicionamento geográfico do estabelecimento</small>
              </v-stepper-step>

              <v-stepper-content :step="4">
                <v-form ref="formGeolocation" v-model.lazy="formGeolocationValid" class="pb-4">
                  <v-row>
                    <v-col cols="12" md="6" class="pt-0">
                      <v-text-field
                        ref="geolocationLat"
                        v-model.number="formData.geolocation.lat"
                        v-mask="geolocation.mask"
                        :rules="formRules.geolocation.latitude"
                        label="Latitude"
                        hint="Latitude geográfica do estabelecimento."
                        persistent-hint
                        type="text"
                        autocomplete="off"
                        :loading="loading"
                        :readonly="loading"
                        @keypress.enter="save"
                      />
                    </v-col>

                    <v-col cols="12" md="6" class="pt-0">
                      <v-text-field
                        ref="geolocationLong"
                        v-model.number="formData.geolocation.lng"
                        v-mask="geolocation.mask"
                        :rules="formRules.geolocation.longitude"
                        label="Longitude"
                        hint="Longitude geográfica do estabelecimento."
                        persistent-hint
                        type="text"
                        autocomplete="off"
                        :loading="loading"
                        :readonly="loading"
                        @keypress.enter="save"
                      />
                    </v-col>
                  </v-row>

                  <v-row no-gutters>
                    <v-col cols="12">
                      <v-card outlined class="geolocation-map mt-4">
                        <client-only>
                          <l-map
                            v-if="stepper.current === 4"
                            ref="map"
                            :zoom="isGeolocationSet ? 16 : 14"
                            :center="getMapCenter"
                            :max-bounds="geolocation.maxBounds"
                            @click="mapClick"
                          >
                            <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <l-marker
                              v-if="isGeolocationSet"
                              ref="markerObject"
                              :lat-lng.sync="formData.geolocation"
                              :draggable="true"
                              :auto-pan="true"
                              :auto-pan-padding="[15, 15]"
                            />
                          </l-map>
                        </client-only>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-form>
              </v-stepper-content>

              <v-stepper-step :step="5" editable>
                <span>Horários de funcionamento</span>
                <small>Selecione os dias e preencha com os horários de cada dia</small>
              </v-stepper-step>

              <v-stepper-content :step="5" class="pb-2">
                <v-form ref="formActiveDays" v-model.lazy="formActiveDaysValid" class="ml-n8">
                  <v-list class="active-days pt-1">
                    <v-list-item
                      v-for="day of formData.activeDays"
                      :key="day.day"
                      class="pl-0 flex-wrap"
                    >
                      <v-list-item-action class="flex-row align-center mt-1 mb-1">
                        <span class="mt-3 mb-3 mr-2 font-weight-medium">{{ day.fullName }}:</span>
                        <v-switch
                          v-model="day.active"
                          :label="day.active ? 'Aberto' : 'Fechado'"
                          dense
                          class="ma-1"
                        />
                      </v-list-item-action>
                      <v-list-item-content class="pt-1 pb-1 flex-nowrap">
                        <v-row v-if="day.active" align="center" class="ma-0 flex-nowrap flex-row">
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
                              :loading="loading"
                              :readonly="loading"
                              @keypress.enter="save"
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
                                :loading="loading"
                                :readonly="loading"
                                @keypress.enter="save"
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
                            <v-btn small icon @click="clearTimes(day)">
                              <v-icon>mdi-close</v-icon>
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-form>
              </v-stepper-content>
            </v-stepper>

            <v-row align="center" justify="center" class="item-preview">
              <v-col cols="12" sm="11" md="10" lg="9" align="center">
                <v-tooltip
                  top
                  color="info"
                  max-width="550"
                  transition="scroll-y-reverse-transition"
                >
                  <p>Abaixo você encontra uma simulação de como seu cliente verá seu estabelecimento no aplicativo para consumidores. Garanta que as informações que você está preenchendo estão entregando o resultado desejado.</p>
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
                    <v-overlay
                      v-if="!isOpenToday"
                      absolute
                      opacity=".75"
                      color="red accent-4"
                      class="white--text body-1 font-weight-bold"
                      style="mix-blend-mode: hard-light"
                    >Fechado</v-overlay>
                    <template #placeholder>
                      <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate color="grey lighten-5" />
                      </v-row>
                    </template>
                  </v-img>
                  <v-avatar
                    v-else-if="!isOpenToday"
                    tile
                    max-width="180"
                    width="180"
                    height="180"
                    color="red accent-4"
                    class="white--text body-1 font-weight-bold"
                    style="opacity: .75"
                  >Fechado</v-avatar>
                  <v-avatar
                    v-else
                    tile
                    max-width="180"
                    width="180"
                    height="180"
                    color="grey lighten-3"
                  />

                  <div class="ma-5 ml-6 mr-12 d-flex flex-column text-left">
                    <h1
                      class="headline font-weight-bold mb-2"
                    >{{ formData.name || 'Estabelecimento sem nome' }}</h1>
                    <p class="body-2 grey--text mb-auto">
                      {{ typesDescription }}
                      <span v-if="formData.geolocation.lat && formData.geolocation.lng">
                        <b class="ml-1 mr-1">&bull;</b> 0,1 km
                      </span>
                    </p>

                    <p v-if="formData.delivery.enabled" class="body-2 grey--text mt-auto mb-0">
                      <span>Realiza entregas:</span>
                      <strong
                        v-if="deliveryPriceRaw === 0"
                        class="body-1 font-weight-bold red--text"
                      >Grátis!</strong>
                      <strong v-else class="body-1 font-weight-bold">Sim</strong>
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
      <v-btn fab fixed bottom right dark color="indigo" :loading="loading" @click="save">
        <v-icon>mdi-content-save</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { mask } from '@titou10/v-mask'
import { EsriProvider } from 'leaflet-geosearch'
import { getMessage } from '@/helpers/messages'
import imageSizes from '@/helpers/image-sizes'
import rules from '@/helpers/validation-rules'
import brazilianStates from '@/helpers/brazilian-states'
import restrictGuests from '@/mixins/restrict-guests'

const weekdays = [
  { day: 'seg', fullName: 'Segunda-feira' },
  { day: 'ter', fullName: 'Terça-feira' },
  { day: 'qua', fullName: 'Quarta-feira' },
  { day: 'qui', fullName: 'Quinta-feira' },
  { day: 'sex', fullName: 'Sexta-feira' },
  { day: 'sab', fullName: 'Sábado' },
  { day: 'dom', fullName: 'Domingo' }
]

async function getEstablishmentTypes ($fireStore) {
  const snapshot = await $fireStore
    .collection('establishmentTypes')
    .orderBy('name', 'asc')
    .limit(100)
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
  directives: { mask },
  mixins: [restrictGuests],
  async asyncData ({ app, store }) {
    const establishmentTypes = await getEstablishmentTypes(app.$fireStore)

    const establishment = await getEstablishment(
      app.$fireStore,
      store.state.authUser
    )

    const activeDays = weekdays.map((weekday) => {
      if (establishment && establishment.activeDays) {
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

    const formData = {
      name: establishment ? establishment.name : '',
      typesOfEstablishment: establishment
        ? establishment.typesOfEstablishment
        : '',
      imageFile: null,
      imageURL: establishment ? establishment.imageURL : '',
      delivery: {
        enabled:
          establishment && establishment.delivery
            ? establishment.delivery.enabled
            : false,
        price:
          establishment && establishment.delivery
            ? establishment.delivery.price
            : ''
      },
      address:
        establishment && establishment.address
          ? establishment.address
          : {
              zipCode: '',
              street: '',
              number: '',
              complement: '',
              district: '',

              // TODO: Remover valores fixos quando lançar para outras cidades.
              city: 'Taquaritinga',
              state: 'SP'
            },
      geolocation:
        establishment && establishment.geolocation
          ? {
              lat: establishment.geolocation.latitude,
              lng: establishment.geolocation.longitude
            }
          : {
              lat: '',
              lng: ''
            },
      activeDays
    }

    if (formData.imageURL) {
      formData.imageURL = formData.imageURL.replace('_1000x1000', '_400x400')
      formData.imageFile = establishment.id
    }

    return {
      establishmentTypes,
      formData
    }
  },
  data () {
    return {
      stepper: {
        current: 1,
        old: 1
      },
      loading: true,
      formGeneralValid: false,
      formImageValid: false,
      formAddressValid: false,
      formGeolocationValid: false,
      formActiveDaysValid: false,
      typesOfEstablishmentSearch: '',
      defaultHours: [],
      geolocation: {
        mask: {
          mask: '?#???######',
          tokens: { '#': { pattern: /\d/ }, '?': { pattern: /[\d-+.]/ } }
        },
        maxBounds: [
          // TODO: Remover valores fixos quando lançar para outras cidades.
          [-21.3545491, -48.6845582],
          [-21.5399754, -48.3947651]
        ],
        provider: new EsriProvider()
      },
      states: brazilianStates,
      weekdays
    }
  },
  computed: {
    ...mapGetters(['authUser']),

    formRules () {
      return {
        name: rules.required,
        typesOfEstablishment: rules.required,
        deliveryPrice: rules.required,
        imageFile: rules.singleImageUpload,
        timeStart: rules.required,
        timeEnd: rules.required,
        address: rules.address,
        geolocation: rules.geolocation
      }
    },

    deliveryPriceFormmated () {
      if (!this.formData.delivery.price) return 'Indisponível'
      else if (this.formData.delivery.price.startsWith('R$'))
        return this.formData.delivery.price
      else return `R$ ${this.formData.delivery.price}`
    },

    deliveryPriceRaw () {
      const rawValue = this.$parseCurrency(this.formData.delivery.price)
      return rawValue === 0 ? rawValue : rawValue || null
    },

    typesDescription () {
      if (!this.formData.typesOfEstablishment) return 'Sem tipo definido'
      else {
        return this.formData.typesOfEstablishment
          .map((item) => item.name)
          .join(', ')
          .replace(/,(?=[^,]*$)/, ' e')
      }
    },

    currentWeekday () {
      const currentDay = new Date().getDay()
      return this.weekdays[currentDay - 1] || this.weekdays[6]
    },

    isOpenToday () {
      if (!this.formData.activeDays) {
        return false
      } else {
        return !!this.formData.activeDays.find(
          (item) => item.active && item.day === this.currentWeekday.day
        )
      }
    },

    isGeolocationSet () {
      return !!this.formData.geolocation.lat && !!this.formData.geolocation.lng
    },

    getMapCenter () {
      if (this.isGeolocationSet) {
        return [this.formData.geolocation.lat, this.formData.geolocation.lng]
      } else {
        // TODO: Remover valores fixos quando lançar para outras cidades.
        return [-21.40611, -48.50472]
      }
    }
  },
  mounted () {
    for (let i = 0; i < 24; i++) {
      const hour = i.toString().padStart(2, '0')
      this.defaultHours.push(hour + ':00')
    }

    this.loading = false
  },
  methods: {
    async stepperChanged (step) {
      if (step !== this.stepper.old) {
        const result = await this.save(this.stepper.old, false)

        if (result !== false) {
          this.stepper.old = step
        } else {
          this.stepper.current = this.stepper.old
        }
      }
    },

    async save (...args) {
      const step = args.length === 1 ? this.stepper.current : args[0]
      const goToNextStep = args.length === 1 ? true : args[1]

      if (step === 1 && !this.$refs.formGeneral.validate()) return false
      if (step === 2 && !this.$refs.formImage.validate()) return false
      if (step === 3 && !this.$refs.formAddress.validate()) return false
      if (step === 4 && !this.$refs.formGeolocation.validate()) return false
      if (step === 5 && !this.$refs.formActiveDays.validate()) {
        this.$snackbar.showMessage(
          'É necessário preencher todos os horários de atendimento.',
          'error'
        )
        return false
      }

      try {
        this.loading = true

        const doc = this.$fireStore
          .collection('establishments')
          .doc(this.authUser.uid)

        const data = {}
        const snapshot = await doc.get()

        if (snapshot.exists && !!snapshot.get('createdAt')) {
          data.updatedAt = this.$fireStoreObj.Timestamp.now()
        } else {
          data.createdAt = this.$fireStoreObj.Timestamp.now()
        }

        if (step === 1) {
          data.name = this.formData.name || null
          data.typesOfEstablishment =
            this.formData.typesOfEstablishment &&
            this.formData.typesOfEstablishment.length
              ? this.formData.typesOfEstablishment.map((item) => ({
                  id: item.id,
                  name: item.name
                }))
              : null
          data.delivery = {
            enabled: this.formData.delivery.enabled,
            price: this.deliveryPriceRaw
          }
        } else if (step === 2) {
          if (this.formData.imageURL === 'delete') {
            for (const size of ['', ...imageSizes]) {
              const ref = this.$fireStorage.ref(
                `establishments/${doc.id}${size}`
              )
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
            const refName = `establishments/${doc.id}`
            const storage = this.$fireStorage.ref(refName)
            const snapshot = await storage.put(this.formData.imageFile)
            const downloadURL = await snapshot.ref.getDownloadURL()
            data.imageURL = downloadURL.split('?').join('_1000x1000?')
            this.formData.imageFile = doc.id
          }
        } else if (step === 3) {
          data.address = {
            zipCode: this.formData.address.zipCode,
            street: this.formData.address.street,
            number: this.formData.address.number || null,
            complement: this.formData.address.complement || null,
            district: this.formData.address.district,
            city: this.formData.address.city,
            state: this.formData.address.state
          }
        } else if (step === 4) {
          data.geolocation = {
            latitude: this.formData.geolocation.lat,
            longitude: this.formData.geolocation.lng
          }
        } else if (step === 5) {
          data.activeDays = this.formData.activeDays
            .filter((item) => !!item.active)
            .map((item) => ({
              day: item.day,
              timeStart: item.timeStart,
              timeEnd: item.timeEnd || null
            }))
        }

        await doc.set(data, { merge: true })

        if (goToNextStep) {
          this.$snackbar.showMessage(getMessage('save-success'), 'success')

          if (this.stepper.current < 5) {
            this.stepper.current++

            if (this.stepper.current === 4) {
              await this.searchGeolocationByAddress()
            }
          }
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

    clearTimes (day) {
      day.timeStart = ''
      day.timeEnd = ''
    },

    async searchZipCode () {
      if (this.formData.address.zipCode.length !== 9) return false

      try {
        this.loading = true

        const data = await fetch(
          `https://viacep.com.br/ws/${this.formData.address.zipCode}/json/`,
          {
            method: 'GET',
            mode: 'cors',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
          }
        ).then((response) => response.json())

        if (data.erro) {
          this.formData.address.street = ''
          this.formData.address.complement = ''
          this.formData.address.district = ''
        } else {
          this.formData.address.street = data.logradouro
          this.formData.address.complement = data.complemento
          this.formData.address.district = data.bairro
        }
      } catch (error) {
        this.formData.address.street = ''
        this.formData.address.complement = ''
        this.formData.address.district = ''

        console.error(error)
        this.$snackbar.showMessage(getMessage(error), 'error')
      } finally {
        this.loading = false
      }
    },

    mapClick (e) {
      if (!this.formData.geolocation.lat && !this.formData.geolocation.lng) {
        this.formData.geolocation.lat = e.latlng.lat
        this.formData.geolocation.lng = e.latlng.lng
      }
    },

    async searchGeolocationByAddress () {
      if (this.formData.geolocation.lat && this.formData.geolocation.lng) {
        return false
      }

      if (
        !this.formData.address.street ||
        !this.formData.address.city ||
        !this.formData.address.state
      ) {
        return false
      }

      try {
        this.loading = true

        const fullAddress =
          this.formData.address.street +
          `, ${this.formData.address.city}` +
          `, ${this.formData.address.state}`

        const results = await this.geolocation.provider.search({
          query: fullAddress
        })

        if (!results || !results.length || results.length > 10) {
          return false
        } else {
          this.formData.geolocation.lat = results[0].y
          this.formData.geolocation.lng = results[0].x
          this.$refs.map.mapObject.setView([results[0].y, results[0].x], 15)
        }
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

  .v-list-item__content {
    overflow: initial;

    .col {
      max-width: 8rem;
    }
  }
}

.geolocation-map {
  height: 300px;

  ::v-deep .leaflet-control-attribution {
    display: none !important;
  }
}
</style>
