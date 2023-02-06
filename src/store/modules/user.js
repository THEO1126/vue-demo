import { login } from '@/api/login'//引入登录 api 接口
import {getPermissionByUserId} from '@/api/permission' // 引入获取菜单权限 api 接口
import { getUserList,getUserListByPage,deleteUser,getRoleNameList,insertUser,updateUser} from '@/api/userApi' // 引入 员工管理接口

import { getToken } from '@/utils/auth'


const user = {
  // state: {
  //   // token: getToken(),
  //   // 是否登录
  //   isLogin:false,
  //   userId:'1'
  // },
  // mutations: {
  //   SET_TOKEN: (state, token) => {
  //     state.token = token
  //   },
  //   SET_ISLOGIN:(state,isLogin)=>{
  //       state.isLogin=isLogin
  //   },
  //   SET_USERID:(state,userId)=>{
  //     state.userId=userId
  //   }
  // },
  actions: {
    // 登录
    Login({ commit }, loginInfo) { //定义 Login 方法，在组件中使用 this.$store.dispatch("Login") 调用
      return new Promise((resolve, reject) => { //封装一个 Promise
        login(loginInfo).then(response => { //使用 login 接口进行网络请求
          // commit('') //提交一个 mutation，通知状态改变
          // commit('SET_ISLOGIN',true)
          // commit('SET_USERID',1)
          resolve(response) //将结果封装进 Promise
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取菜单权限列表
    GetPermissionByUserId({commit},userId){
      return new Promise((resolve, reject) => { //封装一个 Promise
        getPermissionByUserId(userId).then(response => { //使用 permission 接口进行网络请求
          resolve(response) //将结果封装进 Promise
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取员工列表
    GetUserList({commit}){
      return new Promise((resolve, reject) => { //封装一个 Promise
        getUserList().then(response => { //使用 permission 接口进行网络请求
          resolve(response) //将结果封装进 Promise
        }).catch(error => {
          reject(error)
        })
      })
    },

    GetUserListByPage({commit},tablePage){
      return new Promise((resolve, reject) => { //封装一个 Promise
        getUserListByPage(tablePage).then(response => { //使用 permission 接口进行网络请求
          resolve(response) //将结果封装进 Promise
        }).catch(error => {
          console.log("system.js GetUserListByPage 错误")
          reject(error)
        })
      })
    },

    // 删除员工
    DeleteUser({commit},userId){
      return new Promise((resolve, reject) => { //封装一个 Promise
        deleteUser(userId).then(response => { //使用 permission 接口进行网络请求
          resolve(response) //将结果封装进 Promise
        }).catch(error => {
          console.log("system.js DeleteUser 错误")
          reject(error)
        })
      })
    },

    // 获取角色列表（只获取roleId和roleName）
    GetRoleNameList({commit}){
      return new Promise((resolve, reject) => { //封装一个 Promise
        getRoleNameList().then(response => { //使用 permission 接口进行网络请求
          resolve(response) //将结果封装进 Promise
        }).catch(error => {
          console.log("system.js GetRoleNameList 错误")
          reject(error)
        })
      })
    },

    InsertUser({commit},userInfo){
      return new Promise((resolve, reject) => { //封装一个 Promise
         insertUser(userInfo).then(response => { //使用 permission 接口进行网络请求
          resolve(response) //将结果封装进 Promise
        }).catch(error => {
          console.log("system.js InsertUser 错误")
          reject(error)
        })
      })
    },

    UpdateUser({commit},userInfo){
      return new Promise((resolve, reject) => { //封装一个 Promise
         updateUser(userInfo).then(response => { //使用 permission 接口进行网络请求
          resolve(response) //将结果封装进 Promise
        }).catch(error => {
          console.log("system.js UpdateUser 错误")
          reject(error)
        })
      })
    },
  }
}

export default user
