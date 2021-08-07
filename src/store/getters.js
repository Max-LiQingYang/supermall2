export default {
  cartLength (state) {
    return state.cartlist.length;
  },

  cartList (state) {
    return state.cartlist;
  },

  totalPrice (state) {
    return '￥' +state.cartlist.filter( item => {
      return item.checked;
    }).reduce((preValue, item) => {
      return preValue + item.price * item.count;
    }, 0)
  },

  toCalculate (state) {
    return state.cartlist.filter(item => {
      return item.checked;
    }).length;
  }
}