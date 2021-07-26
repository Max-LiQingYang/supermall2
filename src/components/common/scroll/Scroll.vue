<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'Scroll',
  props:{
    probeType:{
      Type: Number,
      default: 0
    },
    pullUpLoad:{
      Type:Boolean,
      default: false
    },
  },
  data() { 
    return {
      scroll: null,
    }
  },
  components:{
  },
  methods:{
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },

    finishPullUp(){
      this.scroll.finishPullUp();
    },

    refresh () {
      this.scroll && this.scroll.refresh();
      console.log("---");
    },

    getScrollY () {
      return this.scroll ? this.scroll.y : 0;
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpload:this.pullUpLoad,
    });

    //监听滚动的位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on('scroll', position => {
        //console.log(position);
        this.$emit('scroll', position)
      });
    }
    
    //监听上拉事件
    if (this.pullUpLoad){
      this.scroll.on("pullingUp", () => {
        this.$emit('pullingUp')
      });
    }
  },
 }
</script>

<style scoped>
  
</style>