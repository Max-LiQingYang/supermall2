import { ADD_COUNTER, ADD_TO_CART } from "./mutation-type";

export default {
  [ADD_COUNTER] (state, payload) {
    payload.count += 1;
    payload.checked = true;
    console.log(payload);
  },

  [ADD_TO_CART] (state, payload) {
    payload.checked = true;
    payload.count = 1;
    state.cartlist.push(payload);
    console.log(payload);
  },

  showCart (state) {
    console.log(state.cartlist);
  },

  selectAll (state) {
    if(state.cartlist.find(item => item.checked === false)) {
      for(let element of state.cartlist) {
        element.checked = true;
      }
    } else {
      state.cartlist.forEach(element => {
        element.checked = false;
      });
  }},

  
}