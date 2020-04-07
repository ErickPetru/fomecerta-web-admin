import colors from 'vuetify/es5/util/colors'
import pt from 'vuetify/es5/locale/pt'

export default {
  customVariables: ['~/assets/variables.scss'],
  treeShake: true,
  theme: {
    dark: false,
    themes: {
      light: {
        primary: colors.yellow.darken2,
        accent: colors.red.darken1,
        secondary: colors.amber.base,
        info: colors.blueGrey.darken1,
        warning: colors.brown.base,
        error: colors.deepOrange.darken4,
        success: colors.green.darken4
      }
    }
  },
  lang: {
    locales: { pt },
    current: 'pt'
  }
}
