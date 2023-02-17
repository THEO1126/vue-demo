<template>
  <div id="content">
    <p v-if="user">{{user.nickName}}</p>
    <el-avatar id="avatar" :size="50" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
    【
    <p v-for="roleName in roleNameList">
        {{ roleName }}
    </p>
    】
    <el-button id="exitBtn"
      type="success"
      @click.native.prevent="exitBtn"
    >退出</el-button>
    <!-- <p>
      test:{{ test }}
    </p> -->
  </div>
</template>

<script>
export default {
  name: "Head",
  data() {
    return {
      userId:JSON.parse(window.localStorage.getItem("userId")),
      user:JSON.parse(window.localStorage.getItem("user")),
      roleNameList:[],
    };
  },
  methods:{
    exitBtn(){
      this.$router.push({
          path: "/login",
      })
      // localStorage.removeItem("userId")
      localStorage.removeItem("loginToken")
      // localStorage.removeItem("user")
    },
    getUserByUserId(){
      this.$store.dispatch("GetUserByUserId",this.userId).then(res=>{
         let statusCode=res.data.statusCode
         if(statusCode==200){
          let user=JSON.parse(localStorage.getItem("user"))
          user.roleList.forEach(item => {
              this.roleNameList.push(item.roleName)
          });
         }
      })
    }
  },

  //mounted在页面渲染完成之后使用，也就是此时页面已完全取出Vue中的数据。
  mounted(){
    if(this.userId && !this.user){
      this.getUserByUserId()
    }else{
      let user=JSON.parse(localStorage.getItem("user"))
      this.roleNameList=[]
      user.roleList.forEach(item => {
        this.roleNameList.push(item.roleName)
      });
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