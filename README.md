# Slayed Shopify Boilerplate (A Shopify Theme Labs Fork)

This fork is not much of a departure from upstream. I have just made some opinionated additions to the project structure, JS entry file, and shopify template that help me get going on a Shopify project.

#### Important differences from upstream:
- Vue.js removed.
- SCSS compilation installed. SCSS files that are imported into `main.js` will be compiled to individual chunks to reduce unused CSS importing into templates/pages.
- Alpine.js **store** and **component** automatic module registering with directories at `./src/alpine/stores/` and `./src/alpine/components/` respectively. 
- A javascript helpers file with helper functions being mapped to `[namespace].helpers.[function-name]`. `[namespace]` is the project's namespace defined in `main.js`.


## Getting Started

### Install

```bash
$ npm i
```

### Development

```bash
$ npm run start
```

### Deployment

```bash
$ npm run deploy
```

## Add React

1. Install NPM packages

```bash
npm i react react-dom
```

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