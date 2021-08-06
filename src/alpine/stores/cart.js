export default {
  name: 'cart',
  store() {
    return {
      items: [],
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
              this.items[data['items'][0].variant_id] = data['items'][0]
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
            'success': (addedItemsData) => {
              console.log('success func ran')
              console.log(this)

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
      update(updates) {
        let data = {
          updates: updates
        }

        fetch('/cart/update.js', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data)
          })
          .catch((error) => {
            console.error('Error:', error)
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

        let fetchData = {
          method: method,
          headers: {
            'Content-Type': 'application/json'
          }
        }

        
        if (Object.keys(data).length !== 0) {
          fetchData['body'] = JSON.stringify(data)
        }

        console.log(fetchData)

        fetch(endpoint, fetchData)
          .then((response) => {
            if (response.ok) {
              return response.json()
            } else {
              console.error('An error occured while interacting with the Shopify Cart API.')
            }
          })
          .then(success)
          .catch(error)
      }
    }
  }
}
