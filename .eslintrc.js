module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:nuxt/recommended'
  ],
  plugins: [
    'prettier'
  ],
  rules: {
    'nuxt/no-cjs-in-config': 'off',
    'space-before-function-paren': 'warn',
    'no-console': 'off',
    'no-unused-vars': 'warn'
  }
}
