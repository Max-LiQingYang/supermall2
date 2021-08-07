<template>
  <div class="cart-botton-bar" @click="selectAll" >
    <div class="check-content" >
      <check-button :is-checked="isSelectAll" />
      <span>全选</span>
    </div>
    <div class="all">合计：{{ totalPrice }}</div>
    <div class="calculate">去计算:({{ toCalculate }})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";

import { mapGetters } from "vuex";

export default {
  name: "CartBottonBar",
  props: {
    cartList: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {};
  },
  components: {
    CheckButton,
  },
  methods: {
    selectAll() {
      this.$store.dispatch("selectAll");
    },
  },
  computed: {
    ...mapGetters(["totalPrice", "toCalculate"]),
    isSelectAll() {
      return !this.cartList.find((item) => item.checked === false) && this.cartList.length !== 0;
    },
  },
  mounted() {},
};
</script>

<style scoped>
.cart-botton-bar {
  position: absolute;
  height: 40px;
  width: 100%;
  line-height: 40px;
  background-color: pink;
  bottom: 50px;
}

.check-content {
  margin-left: 5px;
  margin-top: 5px;
}

.check-content span {
  position: relative;
  top: -16px;
  left: 20px;
}

.cart-botton-bar .all {
  position: absolute;
  top: 0;
  right: 150px;
}

.cart-botton-bar .calculate {
  position: absolute;
  top: 0;
  right: 0;
  background-color: antiquewhite;
}
</style>