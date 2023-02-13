// 状态管理

import Vue from 'vue' //引入 Vue
import Vuex from 'vuex' //引入 Vuex

//引入 user module 主要是登录、获取菜单列表、系统管理
import user from './modules/user' 
import menu from './modules/menu' 
import company from './modules/company' 

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    user, //使用 user.js 中的 action
    menu,
    company
  }
})

export default store