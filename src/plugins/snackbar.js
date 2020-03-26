export default ({ store }, inject) => {
  inject('snackbar', {
    showMessage (content = '', color = 'error') {
      store.dispatch('snackbar/showMessage', { content, color })
    }
  })
}
