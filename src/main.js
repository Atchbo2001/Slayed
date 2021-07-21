/**
 * imports
 */

import './css/main.scss'

// eslint-disable-next-line
import React from 'react'
import { render } from 'react-dom'

/**
 * react components
 * auto-map all react components to dom elements
 */
const reactComponents = require.context('./react/components/', true, /\.(jsx|js)$/)

reactComponents.keys().forEach(key => {
  const Component = reactComponents(key).default

  // transform file name to PascalCase
  const name = key.replace(/\.(\/|jsx|js)/g, '').replace(/(\/|-|_|\s)\w/g, (match) => match.slice(1).toUpperCase())

  const domElement = document.querySelector(`[react-component='${name}']`)
  render(<Component/>, domElement)
})

/**
 * fix: properly render vue components inside sections on user insert in the theme editor
 * add the 'vue' keyword to the section's wrapper classes e.g.:
 * {% schema %}
 * {
 *   "class": "vue-section"
 * }
 * {% endschema %}
 */
// Shopify.designMode && document.addEventListener('shopify:section:load', (event) => {
//   if (event.target.classList.value.includes('vue')) {
//     createVueApp().mount(event.target)
//   }
// })