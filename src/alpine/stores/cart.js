export default {
  name: 'cart',
  store() {
    return {
      counter: 0,
      items: [],
      add(data) {
        fetch('/cart/add.js', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then((response) => response.json())
          .then((addedItemData) => {
            // const itemExists = this.items.some(item => item.key != addedItemData.key && item.variant_id == addedItemData.variant_id)

            this.items[addedItemData.variant_id] = addedItemData
          })
          .catch((error) => {
            console.error('Error:', error)
          })
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
      update() {
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
            if (data.item_count === 0) {
              this.items = []
            }
          })
          .catch((error) => {
            console.error('Error:', error)
          })
      }
    }
  }
}
