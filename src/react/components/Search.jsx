import React from 'react'

class MyComponent extends React.Component {
  render() {
    return(
      <div className="slayed-search-container">
        <label for="slayed-search-input">Search the site:</label>
        <input id="slayed-search-input" className="slayed-search-input" type="search" />
        <button>Search</button>
      </div>
    )
  }
}

export default MyComponent