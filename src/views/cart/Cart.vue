<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list />

     <!--底部汇总-->
     <cart-botton-bar :cartList="cartList"/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childComps/CartList.vue";
import CartBottonBar from "./childComps/CartBottonBar.vue"

import { mapGetters } from "vuex"

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottonBar
  },
  data() {
    return {};
  },
  props: {},
  methods: {},
  computed: {
    ...mapGetters([
      'cartLength',
      'cartList'
    ])
  },
};
</script>

<style scoped>
.cart {
  height: 100vh;
}

.nav-bar {
  background-color: var(--color-tint);
  font-size: 19px;
  color: rgb(226, 226, 226);
  font-weight: 350;
}
</style>
