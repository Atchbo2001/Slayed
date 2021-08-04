# Slayed Shopify Boilerplate

## Add React

1. Install NPM packages

`npm i react react-dom`

2. Add component mapping logic to `src/main.js`

```javascript
/**
 * react components
 * auto-map all react components to dom elements
 */
const reactComponents = require.context('./react/components/', true, /\.(jsx|js)$/)

reactComponents.keys().forEach(key => {
  const Component = reactComponents(key).default

  // transform file name to PascalCase
  const name = key.replace(/\.(\/|jsx|js)/g, '').replace(/(\/|-|_|\s)\w/g, (match) => match.slice(1).toUpperCase()).replace(/^[A-Za-z]/, (match) => match.toUpperCase())

  const domElement = document.querySelector(`[react-component='${name}']`)
  render(<Component/>, domElement)
})
```

3. Create a react components directory and example component in the `/src/` at `/src/react/components/MyComponent.jsx`

```javascript

import React from 'react'

class MyComponent extends React.Component {
  render() {
    return(
      <div>
        React Component Example
      </div>
    )
  }
}

export default MyComponent
```

4. Insert an HTML element with the `react-component` attribute and the exact name of your component
```html
<div react-component="MyComponent"></div>
```

Your rendered component markup will now look like
```html
<div react-component="MyComponent">
  <div>
    React Component Example
  </div>
</div>
```