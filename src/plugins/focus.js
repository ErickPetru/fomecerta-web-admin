import Vue from 'vue'

function isFocusable (el) {
  if (!el.isConnected ||
    el.offsetParent === null ||
    el.hidden ||
    el.disabled) {
      return false
  }

  if (el.localName === 'input' ||
    el.localName === 'textarea' ||
    el.localName === 'select' ||
    el.localName === 'iframe' ||
    el.localName === 'button') return true

  if (el.localName === 'a' || el.localName === 'area') {
    if (el.href) return true
  }

  if (el.isContentEditable === true) return true

  const tabIndex = +el.tabindex
  if (!isNaN(tabIndex) && tabIndex > -1) return true

  return false
}

function findChildren (parent, callbackFn) {
  const result = []
  const stack = [ parent ]
  while (stack.length) {
    const node = stack.pop()
    if (callbackFn(node)) result.push(node)
    node.children && stack.push(...node.children)
  }
  result.push(stack.pop() || null)
  return result.filter(node => node !== null)
}

function performOperation (el, binding) {
  let target = null

  if (isFocusable(el)) {
    target = el
  } else {
    const focusables = findChildren(el, c => isFocusable(c))
    if (focusables && focusables.length) target = focusables.reverse()[0]
  }

  if (target) {
    if (binding.value === false) target.blur()
    else {
      target.focus()
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = target.value.length
      }, 0)
    }
  }
}

export const focus = {
  inserted (el, binding) {
    performOperation(el, binding)
  },

  componentUpdated (el, binding) {
    if (binding.modifiers.lazy) {
      if (!!binding.value === !!binding.oldValue) {
        return
      }
    }

    performOperation(el, binding)
  }
}

Vue.directive('focus', focus)

export const mixin = {
  directives: {
    focus
  }
}

Vue.mixin('focus', focus)
