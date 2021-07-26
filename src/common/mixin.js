import { debounce } from "./utils"

export const itemListenerMixin = {
  data() {
    return {
      itemimgListener: null,
    }
  },
  mounted() {
    let newRefresh = debounce(this.$refs.scroll.refresh, 100);

    this.itemimgListener = () => {
      newRefresh();
    };

    this.$bus.$on('itemimageLoad', this.itemimgListener);

    console.log("我是minin mounted");
  }
}