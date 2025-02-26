const path = require('path')
const fs = require('fs')

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  mode: 'spa',
  head: {
    titleTemplate: '%s - Fome Certa',
    title: 'Fome Certa - O aplicativo certo para sua fome!',
    description: 'Plataforma on-line de admininstração do aplicativo Fome Certa',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'O aplicativo certo para sua fome!' },
      { name: 'msapplication-TileImage', content: '/cropped-icon-site-270x270.png' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', sizes: '32x32', href: '/cropped-icon-site-32x32.png' },
      { rel: 'icon', sizes: '192x192', href: '/cropped-icon-site-192x192.png' },
      { rel: 'apple-touch-icon-precomposed', href: '/cropped-icon-site-180x180.png' }
    ]
  },
  loading: { color: '#fff' },
  layoutTransition: 'fade-transition',
  pageTransition: 'fade-transition',
  css: [
    '~/assets/global.scss'
  ],
  plugins: [
    '~/plugins/currency-filter.js',
    '~/plugins/snackbar.js',
    '~/plugins/focus.js'
  ],
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    'nuxt-webfontloader'
  ],
  modules: [
    '@nuxtjs/firebase',
    '@nuxtjs/pwa',
    ['vue-currency-input/nuxt', {
      globalOptions: {
        currency: 'BRL',
        locale: 'pt-BR',
        autoDecimalMode: true
      }
    }]
  ],
  vuetify: {
    optionsPath: './vuetify.options.js'
  },
  firebase: {
    config: {
      apiKey: "AIzaSyApIJzDL5nJtIX16PffTP68HyfR1I9cWJ0",
      authDomain: "fome-certa-app.firebaseapp.com",
      databaseURL: "https://fome-certa-app.firebaseio.com",
      projectId: "fome-certa-app",
      storageBucket: "fome-certa-app.appspot.com",
      messagingSenderId: "306617561272",
      appId: "1:306617561272:web:44ff1022e07df15bfa044d"
    },
    onFirebaseHosting: !isDev,
    services: {
      auth: {
        initialize: {
          onAuthStateChangedAction: 'onAuthStateChanged'
        },
        ssr: false
      },
      firestore: true,
      storage: true,
      functions: {
        location: 'us-east4'
      }
    }
  },
  pwa: {
    meta: false,
    icon: false,
    manifest: {
      name: 'Fome Certa',
      description: 'Plataforma on-line de admininstração do aplicativo Fome Certa',
      background_color: '#a10101',
      lang: 'pt-BR',
      display: 'browser'
    },
    workbox: {
      dev: false,
      debug: isDev,
      publicPath: '/_nuxt',
      cleanupOutdatedCaches: true,
      cacheNames: {
        prefix: 'fomecerta-web-admin',
        suffix: 'v2004091318'
      }
    }
  },
  server: {
    https: isDev ? {
      key: fs.readFileSync(path.resolve(__dirname, 'private/localhost.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'private/localhost.crt'))
    } : true
  },
  buildDir: '.nuxt',
  build: {
    parallel: isDev,
    extend (config, { isDev, isClient }) {
      if (isDev) {
        config.devtool = isClient ? 'source-map' : 'inline-source-map'
      }

      config.optimization.splitChunks.maxSize = 220000
    }
  }
}
