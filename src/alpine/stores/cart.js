export default {
  name: 'cart',
  store() {
    return {
      items: [],
      initialize(cart) {
        this.syncItems(cart.items)
      },
      fetchConfig(type = 'json') {
        return {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': `application/${type}` }
        };
      },
      syncItems(returnedItems) {
        returnedItems.forEach((element, index) => {
          this.items[element.variant_id] = element
        })

        console.log(this.items)
      },
      addItem(item) {
        let formData = {
          'items': [item]
        }

        this.cartFetch(
          '/cart/add.js',
          'POST',
          formData,
          {
            'success': (data) => {
              console.log(data)
            }
          }
        )
      },
      addItems(items) {
        let formData = {
          'items': items
        }

        this.cartFetch(
          '/cart/add.js',
          'POST',
          formData,
          {
            'success': (data) => {
              console.log('success func ran')
              console.log(data)
            }
          }
        )
      },
      async get() {
        let response = await fetch('/cart.js', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        let data = await response.json()

        return data
      },
      updateQuantity(variant_id, qty) {
        let formData = {
          'id': variant_id.toString(),
          'quantity': qty.toString()
        }

        fetch('/cart/change.js', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(item => {
          console.log(this.items)
          conerr
        })
      },
      clear() {
        fetch('/cart/clear.js', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data)
            if (data.item_count === 0) {
              this.items = []
            }
          })
          .catch((error) => {
            console.error('Error:', error)
          })
      },
      cartFetch(endpoint, method = 'GET', data = {}) {
        let success = () => {}
        let error = (error) => {
          console.error('An error occurred: ' + error)
        }

        for (var i = 0; i < arguments.length; ++i) {
          var arg = arguments[i];
      
          if (arg.hasOwnProperty('success')) {
            success = arg['success']
          } else if (arg.hasOwnProperty('error')) {
            error = arg['error']
          }
        }

        let fetchConfig = {
          method: method,
          headers: {
            'Content-Type': 'application/json'
          }
        }

        if (Object.keys(data).length !== 0) {
          fetchConfig['body'] = JSON.stringify(data)
        }

        fetch(endpoint, fetchConfig)
          .then((response) => response.json())
          .then(success)
          .catch(error)
      }
    }
  }
}
