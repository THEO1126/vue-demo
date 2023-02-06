<template>
  <div id="content">
    <p> 当前用户:{{username}}</p>
    <el-avatar id="avatar" :size="50" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
    <el-button id="exitBtn"
      type="success"
      @click.native.prevent="exitBtn"
    >退出</el-button>
  </div>
</template>

<script>
export default {
  name: "Head",
  data() {
    return {
      username: JSON.parse(window.localStorage.getItem("user")).data.username
    };
  },
  methods:{
    exitBtn(){
      this.$router.push({
          path: "/login",
        })
    }
  }
}
</script>

<style scoped>
#content{
  display: flex;
  align-items: center;
  width:100%;
  min-height: 50px;
  justify-content: center;
  /* 设置子元素间距 */
  gap: 10px;
}
#content p{
  font-size: 20px;
  color: aliceblue;
}
</style>