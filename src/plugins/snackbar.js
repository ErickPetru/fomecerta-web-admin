export default ({ store }, inject) => {
  inject('snackbar', {
    showMessage (content, color = '', icon = 'information', actionButton = null, closeButton = 'Fechar') {
      if (typeof content === 'object') {
        color = content.color || ''
        icon = content.icon || 'information'
        actionButton = content.actionButton || null
        closeButton = content.closeButton || 'Fechar'
        content = content.content
      }

      if (color && icon === 'information') {
        if (color === 'warning') icon = 'exclamation'
        else if (color === 'success') icon = 'check-circle'
        else if (color === 'error') icon = 'alert'
      }

      store.dispatch('snackbar/showMessage', { content, color, icon, actionButton, closeButton })
    }
  })
}
