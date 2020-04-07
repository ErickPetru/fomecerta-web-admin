import Vue from 'vue'

Vue.filter('currency', function (value) {
  if (!value) return ''
  value = parseFloat(value).toFixed(2)
  return 'R$ ' + value.replace('.', ',')
})
