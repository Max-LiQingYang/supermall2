<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props:{
    goodsItem:{
      type:Object,
      default(){
        return {};
      }
    }
  },
  data() { 
    return {
      
    }
  },
  components:{
  },
  computed: {
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img;
    }
  },
  methods:{
    imageLoad () {
      /*
      * 判断是在Home中的图片刷新还是推荐中的图片刷新
      */
      
      //路由方法
      // if(this.$route.path.indexOf('/home')) {
      //   this.$bus.$emit('homeItemImgLoad');
      // } else(this.$route.path.indexOf('/detail')) {
      //   this.$bus.$emit('detailItemImgLoad');
      // }
      
      //取消全局事件监听方法
      //在监听该事件的组件中 this.$bus.$off("itemimageLoad", 执行函数)
      



      this.$bus.$emit('itemimageLoad');
    },

    itemClick () {
      this.$router.push('/detail/' + this.goodsItem.iid);
    }
  },
  mounted() {
    
  },
 }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;

    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>