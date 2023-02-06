<!-- <template>
  <li>
    <router-link v-if="menu.type!=0" :to="menu.url" >
      <span :class="`iconfont icon-${menu.icon.toLowerCase()}`"></span>
      {{ menu.name }}
    </router-link>

    <a @click.prevent="isExpand=!isExpand" v-else>
      <span :class="`iconfont icon-${menu.icon.toLowerCase()}`"></span>{{ menu.name }}
      <i v-if="isExpand" class="el-icon-arrow-down"></i>
      <i v-else="isExpand" class="el-icon-arrow-up"></i>
    </a>
    
    <ul class="submenu" v-if="menu.childs.length!=0" v-show="isExpand">
      <tree-menu v-for="(childMenu,idx) in menu.childs" :key="idx" :menu="childMenu"/>
    </ul>
  </li>
</template> -->

<template>
  <!-- 一级菜单无子菜单 -->
  <router-link  v-if="menu.type!=0" :to="menu.url" >
    <el-menu-item :index="(menu.perId).toString()">
      <span :class="`iconfont icon-${menu.icon.toLowerCase()}`"></span>
      <span slot="title"> {{ menu.name }}</span>
    </el-menu-item>
  </router-link>
  <!-- 一级菜单有子菜单 -->
  <el-submenu v-else class="submenu" :index="(menu.perId).toString()">
    <template slot="title" >
      <span :class="`iconfont icon-${menu.icon.toLowerCase()}`"></span>
      <span slot="title">{{ menu.name }}</span>
    </template>
    <!-- 二级菜单 -->
      <ul v-if="menu.childs.length!=0" class="childMenu">
        <tree-menu v-for="(childMenu,idx) in menu.childs" :key="idx" :menu="childMenu"/>
      </ul>
  </el-submenu>
</template>

<script>
export default {
  name: "TreeMenu",
  props: ['menu'], // 用来接收父组件传给子组件的数据
  data() {
    return {
      // isExpand: false,
    }
  },
}
</script>

<style scoped>
/* 图标 */
span{
  margin-right: 10px;
}

/* li a:hover{
  background-color: aquamarine;
} */
/*  一级  */
/* li a{
  padding-left: 25px;
  width: 100%;
  height: 50px;
  line-height: 50px;
} */
/* 图标 */
/* li span{
  margin-right: 10px;
} */
/* 折叠的图标 */
/* li a i{
  height: 40px;
  line-height: 40px;
  position: absolute;
  right: 20px;
} */

</style>