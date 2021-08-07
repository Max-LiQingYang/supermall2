import { debounce } from "./utils";
import BackTop from "components/content/backTop/BackTop";

export const itemListenerMixin = {
  data() {
    return {
      itemimgListener: null,
      newRefresh:null,
    }
  },
  mounted() {
    this.newRefresh = debounce(this.$refs.scroll.refresh, 100);

    this.itemimgListener = () => {
      this.newRefresh();
    };

    this.$bus.$on('itemimageLoad', this.itemimgListener);

    console.log("我是minin mounted");
  }
}

export const backTop = {
  components: {
    BackTop,
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0,0, 1000);
    }
  },
}