<template>
  <div>
    <nav-bar>
      <div slot="left" @click="backClick" class="back">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item, index) in titles"
          :class="{active: index === currentIndex}"
          @click="titleClick(index)"
          class="title-item">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar"

  export default {
    name: 'DetailNavBar',
    props:{
    },
    data() { 
      return {
        titles:['商品', '参数', '评论', '推荐'],
        isactive: false,
        currentIndex: 0,
      }
    },
    components:{
      NavBar,
    },
    methods:{
      titleClick (index) {
        this.currentIndex = index;
      },

      backClick () {
        this.$router.back();
      }
    },
    mounted() {
      
    },
   }
</script>

<style scoped>
  .title {
    display: flex;
    font-size: 13px;
  }

  .title-item {
    flex: 1;
  }

  .active {
    color: var(--color-high-text);
  }

  .back img {
    margin-top: 12px;
  }
</style>