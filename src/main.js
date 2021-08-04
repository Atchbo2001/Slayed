import Alpine from 'alpinejs'
import helpers from './helpers.js'

import './scss/base.scss'
import './scss/section-main-page-contact.scss'
import './scss/component-minicart.scss'
import './scss/section-main-collection.scss'
import './scss/header.scss'

window.Alpine = Alpine

// Declare our namespace on the window
const namespace = 'slayed'

// Map helper functions to window[namespace].helpers
window[namespace] = {
  helpers: {}
}

for (const [key, value] of Object.entries(helpers)) {
  window[namespace].helpers[key] = value
}

// Construct Alpine stores
const alpineStores = require.context('./alpine/stores/', true, /\.js$/)

alpineStores.keys().forEach((key) => {
  const store = alpineStores(key).default

  const name = store.name

  Alpine.store(name, store.store())
})

// Map Alpine componentw

const alpineComponents = require.context('./alpine/components/', true, /\.js$/)

alpineComponents.keys().forEach((key) => {
  const component = alpineComponents(key).default

  // Component name will be named exactly as entered as property in component module
  const name = component.name

  Alpine.data(name, component.component)
})

Alpine.start()
