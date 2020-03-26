const colors = require('vuetify/es5/util/colors').default

module.exports = {
  mode: 'universal',
  head: {
    titleTemplate: '%s - FomeCerta',
    title: 'FomeCerta',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
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
  css: [
  ],
  plugins: [
    '~/plugins/snackbar.js'
  ],
  buildModules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  modules: [
  ],
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  buildDir: 'nuxt',
  build: {
    extractCSS: true,
    extend (config, ctx) {
    }
  }
}
