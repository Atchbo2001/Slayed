export default {
  name: 'cart',
  store () {
    return {
      counter: 0,
      items: [],
      test() {
        this.counter = this.counter + 1
        console.log( this.counter );
      }
    }
  }
}
