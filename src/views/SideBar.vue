<template>
  <nav id="nav">
    <div id="navTitle">广西永湘物流公司</div>
    <!-- 默认激活的是 首页 -->
      <el-menu id ="menu" :default-active="defaultActive">
        <ul v-for="menu in menus" :key="menu.name">
          <tree-menu :menu="menu" :key="menu.name"></tree-menu>
        </ul>
      </el-menu>
  </nav>
</template>

<script>

import TreeMenu from "@/views/TreeMenu";

export default {
  name: "SideBar",
  // 引入子组件
  components: {TreeMenu},

  data() {
    return {
      defaultActive: "首页", //关键 当前激活菜单的 index
      userId:JSON.parse(localStorage.getItem("userId")),
      menus:localStorage.getItem("menu") ? JSON.parse(localStorage.getItem("menu")):''
    }
  },
  methods: {
    getPermissionByUserId(){
      this.$store.dispatch('GetPermissionByUserId',this.userId).then((res) => {
        // 拿到结果
        let statusCode = res.data.statusCode
        this.menus=res.data.data
        // 判断结果
          if (statusCode==200) {
            console.log("获取权限成功")
          } else {
            console.log("获取权限错误")
          }
      }).catch(() => {
        this.loading = false
      })
    },
    setCurrentRoute () {
      //关键   通过他就可以监听到当前路由状态并激活当前菜单
      this.defaultActive = this.$route.name 
    }
  },

  // 解决了 刷新页面保持当前菜单选中项及路由
  watch: {
    $route () {
      this.setCurrentRoute()
    }
  },
  created () {
    this.setCurrentRoute()
  },
  // 页面加载时触发函数
  mounted:function(){ 
    if(this.userId){
      this.getPermissionByUserId()
    }
  }
}
</script>

<style>

#nav {
  z-index: 1000;
  min-width: 250px;
  height:100%;
  background-color: rgb(255, 253, 253);
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  width: 250px;
  position: absolute;
  border-right: 1px solid #e3e3e3;
}

#nav #menu{
    /*只是y方向*/
  overflow-y: auto;
  height: 100%;
}

#nav #navTitle{
  font-size: 20px;
  height: 50px;
  min-height: 50px;
  line-height: 50px;
  font-weight: 600;
  width: 100%;
  text-align: center;
  color: white;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.49);
  background-color: #009688;
}


/* li {
  border-bottom: 0.1em solid #E5E5E5;
} */

/* 
li {
  list-style: none;
  position: relative;
  border-style: solid;
  border-width: 1px 0 0;
  border-color: #E5E5E5;
}

.submenu > li {
  position: relative;
}


.submenu > li a{
  padding-left: 45px;
}
a {
  display: block;
  width: 189px;
  height: 36px;
  color: #5d5d5d;
  text-decoration: none;
  line-height: 36px;
}

.submenuHide {
  display: none;
  position: relative;
}

.submenuShow {
  display: block;
  position: relative;
}

.submenu:before {
  content: "";
  display: block;
  position: absolute;
  z-index: 1;
  left: 15px;
  top: 37px;
  bottom: 0;
  border: 1px dotted;
  border-width: 0 0 0 1px; 
}

.submenu > li:before {
  content: "";
  display: block;
  width: 10px;
  position: absolute;
  z-index: 1;
  left: 20px;
  top: 17px;
  border: 1px dotted;
  border-width: 1px 0 0; 
} */

</style>
