// 状态管理

import Vue from 'vue' //引入 Vue
import Vuex from 'vuex' //引入 Vuex

//引入 module 主要是登录、获取菜单列表、系统管理
import loginVo from './modules/login'
import user from './modules/user' 
import menu from './modules/menu' 
import company from './modules/company' 
import role from './modules/role'
import purchase from './modules/purchase'
import naviBar from './modules/permission'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    loginVo,
    naviBar,
    user, //使用 user.js 中的 action
    menu,
    company,
    role,
    purchase
  }
})

export default store