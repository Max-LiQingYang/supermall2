<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行', '新款', '时尚']"
      key=""
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperItemLoad"/>
      <recommend-view :recommends="recommends" />
      <feature-view></feature-view>
      <tab-control
        :titles="['流行', '新款', '时尚']"
        key=""
        @tabClick="tabClick"
        ref="tabControl2"
      />
      <goods-list :goods="showGoods" />
    </scroll>

    <back-top v-show="showBackTop" @click.native="backClick" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper.vue";
import RecommendView from "./childComps/RecommendView.vue";
import FeatureView from "./childComps/FeatureView.vue";
import GoodsList from "components/content/goods/GoodsList";

import TabControl from "components/content/tabControl/TabControl";

import { getHomeMultidata, getHomeGoods } from "network/home";

/*
* 引入外部工具
*/
import { debounce } from "common/utils.js"
import { itemListenerMixin } from "common/mixin.js"

/*
 * 引入外部组件
 */
import Scroll from "components/common/scroll/Scroll";

/*
 * 引入图标
 */
import BackTop from "components/content/backTop/BackTop";

export default {
  name: "Home",
  components: {
    NavBar,
    FeatureView,
    HomeSwiper,
    RecommendView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      recommends: [],
      banners: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      showBackTop: false,
      tabOffSetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    this.getHomeMultidata();

    //请求商品
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  methods: {
    /*
     * 事件监听
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl2.currentIndex = index;
      this.$refs.tabControl1.currentIndex = index;
    },

    /*
     * 网络请求
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.result = res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        this.$refs.scroll.finishPullUp();
      });
    },

    /*
     * 监听上升箭头点击
     */
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 300);
    },

    /*
     * 隐藏上升箭头
     */
    contentScroll(position) {
      //监听位置，显示向上箭头
      this.showBackTop = position.y < -1000;

      //设置
      this.isTabFixed = position.y < -(this.tabOffSetTop);
    
    },


    /*
     * 加载更多
     */
    loadMore() {
      this.getHomeGoods(this.currentType);

      this.$refs.scroll.refresh();
    },

    swiperItemLoad () {
      this.tabOffSetTop = this.$refs.tabControl2.$el.offsetTop;
    }

  },

  mixins:[itemListenerMixin],
  mounted() {
  },

  activated(){
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },

  deactivated(){
    this.saveY = this.$refs.scroll.getScrollY();

    //取消全局事件的监听
    this.$bus.$off('itemimageLoad', this.itemImgListener);
  }
};
</script>

<style scoped>
#home {
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /*在使用浏览器原生滚动时, 为了让导航不跟随一起滚动*/
  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
  /*z-index: 9;*/
}

.content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tab-control {
  position: relative;
  z-index: 9;
}
</style>
