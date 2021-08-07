<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="detailNavBar"/>
    <scroll
      class="content"
      ref="scroll"
      @scroll="contentScroll"
      :probe-type="2"
    >
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-commen-info ref="comment" :commentInfo="commentInfo" />
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>
    <back-top v-show="isShowBackTop" @click.native="backClick"/>
    <detail-buttom-bar @addCart="addCart"/>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import Scroll from "components/common/scroll/Scroll";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailCommenInfo from "./childComps/DetailCommenInfo.vue";
import GoodsList from "components/content/goods/GoodsList";
import DetailButtomBar from "./childComps/DetailButtomBar.vue"


import { BACK_POSITION } from "common/const.js"

import {
  getDetail,
  GoodsInfo,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";
import { debounce } from "common/utils.js";
import { itemListenerMixin, backTop } from "common/mixin.js";

export default {
  name: "Detail",
  props: {},
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopTs: [],
      currentIndex: 0,
    };
  },
  components: {
    DetailButtomBar,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailCommenInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    GoodsList,
    Scroll,
  },

  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
      this.themeTopTs.push(0);
      this.themeTopTs.push(this.$refs.params.$el.offsetTop);
      this.themeTopTs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopTs.push(this.$refs.recommend.$el.offsetTop);

    },

    titleClick(event) {
      switch (event) {
        case 0:
          this.$refs.scroll.scrollTo(0, -this.themeTopTs[0], 1000);
          break;
        case 1:
          this.$refs.scroll.scrollTo(0, -this.themeTopTs[1], 1000);
          break;
        case 2:
          this.$refs.scroll.scrollTo(0, -this.themeTopTs[2], 1000);
          break;
        case 3:
          this.$refs.scroll.scrollTo(0, -this.themeTopTs[3], 1000);
          break;
        default:
          break;
      }
    },

    contentScroll(position) {
      //获取y值
      const POSITION_Y = -position.y;
      for (let i in this.themeTopTs) {
        i = parseInt(i);
        if (
          (i < this.themeTopTs.length &&
            POSITION_Y >= this.themeTopTs[i] &&
            POSITION_Y < this.themeTopTs[i + 1]) ||
          (i === this.themeTopTs.length - 1 && POSITION_Y >= this.themeTopTs[i])
        ) {
          if (this.currentIndex !== i) {
            this.currentIndex = i;
            this.$refs.detailNavBar.currentIndex = this.currentIndex;
          }
        }
      }

      //是否显示回到顶部
      this.isShowBackTop = -position.y > BACK_POSITION;
    },

    addCart () {
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      //添加购物车成功
      this.$store.dispatch('addCart', product).then(res => {
        this.$toast.showToast(res, 2000);
      });
    }
  },


  created() {
    //获取id
    console.log(this.$route.params);
    this.iid = this.$route.params.iid;

    //请求详情数据
    getDetail(this.iid).then((res) => {
      // console.log(res);
      const data = res.result;
      this.topImages = res.result.itemInfo.topImages;
      console.log(this.topImages);

      this.goods = new GoodsInfo(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      this.shop = new Shop(data.shopInfo);

      this.detailInfo = data.detailInfo;

      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      //取出评论
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }

      // this.$nextTick(() => {
      //   //根据最新的数据,对应的DOM已经渲染出来了, 但是图片依然没有加载完成
      //   //获取详情页中的组件的相应位置
      //   this.themeTopTs.push(0);
      //   this.themeTopTs.push(this.$refs.params.$el.offsetTop);
      //   this.themeTopTs.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopTs.push(this.$refs.recommend.$el.offsetTop);
      // });
    });

    //请求推荐数据
    getRecommend().then((res) => {
      this.recommends = res.data.list;
    });

    //监听详情页图片事件加载完成
  },
  mixins: [itemListenerMixin, backTop],
  mounted() {},

  destroyed() {
    this.$bus.$off("itemimageLoad", this.itemimgListener);
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px - 49px);
}
</style>