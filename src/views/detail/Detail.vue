<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo" />
      <detail-commen-info :commentInfo="commentInfo" />
      <goods-list :goods='recommends' />
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar.vue"
  import DetailSwiper from "./childComps/DetailSwiper.vue"
  import DetailBaseInfo from "./childComps/DetailBaseInfo.vue"
  import DetailShopInfo from "./childComps/DetailShopInfo.vue"
  import Scroll from "components/common/scroll/Scroll"
  import DetailParamInfo from "./childComps/DetailParamInfo.vue"
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue"
  import DetailCommenInfo from "./childComps/DetailCommenInfo.vue"
  import GoodsList from "components/content/goods/GoodsList"

  import { getDetail, GoodsInfo, Shop, GoodsParam, getRecommend  } from "network/detail"
  import { debounce } from "common/utils.js"
  import { itemListenerMixin } from "common/mixin.js"


  export default {
    name: 'Detail',
    props:{
      
    },
    data() { 
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop:{},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends:[],
      }
    },
    components:{
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

    methods:{
      imageLoad() {
        this.$refs.scroll.refresh();
      }
    },
    created(){
      //获取id
      console.log(this.$route.params);
      this.iid = this.$route.params.iid;

      //请求详情数据
      getDetail(this.iid).then(res => {
        // console.log(res);
        const data = res.result;
        this.topImages = res.result.itemInfo.topImages;
        console.log(this.topImages);

        this.goods = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services);
        
        this.shop = new Shop(data.shopInfo);

        this.detailInfo = data.detailInfo;

        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

        //取出评论
        if(data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0];
        }
      })

      //请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list;
      });

    },
    mixins: [itemListenerMixin],
    mounted() {
    },

    destroyed() {
      this.$bus.$off('itemimageLoad', this.itemimgListener);
    }
   }
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
    height: calc(100% - 44px);
  }


</style>