export default {
  randomNumber(min = 0, max = 1000) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  },
  debounce(fn, wait) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), wait);
    };
  },
  fetchConfig(type = 'json') {
    return {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': `application/${type}` }
    };
  }
}