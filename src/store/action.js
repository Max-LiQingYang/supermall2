export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartlist.find(item => item.iid === payload.iid);
      if (oldProduct) {
        context.commit('addCounter', oldProduct)
        resolve('商品数量+1');
      } else {
        // payload.count += 1;
        context.commit('addToCart', payload)
        resolve('添加了新的商品');
      }
      reject('商品添加失败');
    })
  },

  showCart (context) {
    context.commit('showCart');
  },

  selectAll (context) {
    context.commit('selectAll');
  },
}