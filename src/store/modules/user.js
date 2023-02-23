import { getUserList,getUserListByPage,deleteUser,getRoleNameList,insertUser} from '@/api/userApi' // 引入 员工管理接口
import { updateUser,getUserListTotalPage,searchUserList,searchUserListTotalPage} from '@/api/userApi' // 引入 员工管理接口

const user = {

  actions: {

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
          console.log("System.js DeleteUser 错误")
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

    GetUserListTotalPage({commit}){
      return new Promise((resolve, reject) => { //封装一个 Promise
        getUserListTotalPage().then(response => { //使用 permission 接口进行网络请求
          resolve(response) //将结果封装进 Promise
        }).catch(error => {
          console.log("system.js GetUserListTotalPage 错误")
          reject(error)
        })
      })
    },

    SearchUserList({commit},searchInfo){
      return new Promise((resolve, reject) => { //封装一个 Promise
        searchUserList(searchInfo).then(response => { //使用 permission 接口进行网络请求
          resolve(response) //将结果封装进 Promise
        }).catch(error => {
          console.log("system.js SearchUserList 错误")
          reject(error)
        })
      })
    },
    
    SearchUserListTotalPage({commit},searchInfo){
      return new Promise((resolve, reject) => { //封装一个 Promise
        searchUserListTotalPage(searchInfo).then(response => { //使用 permission 接口进行网络请求
          resolve(response) //将结果封装进 Promise
        }).catch(error => {
          console.log("system.js searchUserListTotalPage 错误")
          reject(error)
        })
      })
    },
  }
}

export default user
