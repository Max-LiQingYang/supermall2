<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: 'Toast',
    props:{
    },
    data() { 
      return {
        isShow: false,
        message: ''
      }
    },
    components:{
    },
    computed: {
    },
    methods:{
      showToast (message='默认文字', duration=1000) {
        this.isShow = true;
        this.message = message;
        setTimeout(() => {
          this.isShow = false;
        }, duration);
      }
    },
    mounted() {
      
    },
   }
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    color: antiquewhite;
    transform: translate(-50%, -50%);
    background-color: rgb(0, 0, 0);
    padding: 8px 10px;
    opacity: .8;
    transition: opacity 2s;
    z-index: 999;
  }
</style>