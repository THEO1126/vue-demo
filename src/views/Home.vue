<template>
    <img id="content" :style="'background-image:url('+ Background +');'">
</template>

<script>
import Background from '@/assets/images/home.jpg'
export default {
  name: "Home",
  data(){
    return{
      Background:Background
    }
  }
}
</script>

<style scoped>
/* 局部引入 */
/* @import '../assets/styles/view.css'; */

#content{
  width: 99%;
  height: 88%;
  margin: auto;
}
</style>