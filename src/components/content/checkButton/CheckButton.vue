<template>
  <div class="check-button">
    <img :class="{checked: isChecked}" src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: 'CheckButton',
    props:{
      isChecked: {
        type: Boolean,
        default: true
      }
    },
    data() { 
      return {
        
      }
    },
    components:{
    },
    methods:{
      
    },
    mounted() {
      
    },
   }
</script>

<style scoped>
  .check-button {
    width: 15px;
    height: 15px;
  }

  .check-button img{
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 2px solid #aaa;
  }

  /* .check-button img {
    width: 15px;
    height: 15px;
    background-color: black;
  } */

  .checked {
    border-color: red;
    background-color: red;
  }

</style>