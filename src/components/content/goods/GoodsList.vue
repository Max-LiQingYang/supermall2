<template>
  <div class="goods">
    <goods-list-item v-for="items in goods" :goods-item="items"/>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue'

export default {
  name: 'GoodsList',
  props:{
    goods:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data() { 
    return {
      
    }
  },
  components:{
    GoodsListItem,
  },
  methods:{
    
  },
  mounted() {
    
  },
 }
</script>

<style scoped>
    .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    padding: 2px;
  }

</style>