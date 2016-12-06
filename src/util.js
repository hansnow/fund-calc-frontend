/* globals localStorage */
export default {
  store: {
    set (data) {
      localStorage.setItem('funds', JSON.stringify(data))
    },
    get () {
      return JSON.parse(localStorage.getItem('funds'))
    }
  }
}
