import {getRoleList,insertRole,updateRole} from '@/api/roleApi'

const role={
    actions: {
        // 获取角色
      GetRoleList({ commit }) {
        return new Promise((resolve, reject) => { //封装一个 Promise
          getRoleList().then(response => { //使用  getAllMenu 接口进行网络请求
            resolve(response) //将结果封装进 Promise
          }).catch(error => {
            console.log("role.js GetRoleList 错误")
            reject(error)
          })
        })
      },

      InsertRole({ commit },roleInfo) {
        return new Promise((resolve, reject) => { //封装一个 Promise
          insertRole(roleInfo).then(response => { //使用  getAllMenu 接口进行网络请求
            resolve(response) //将结果封装进 Promise
          }).catch(error => {
            console.log("role.js InsertRole 错误")
            reject(error)
          })
        })
      },
      
      UpdateRole({ commit },roleInfo) {
        return new Promise((resolve, reject) => { //封装一个 Promise
          updateRole(roleInfo).then(response => { //使用  getAllMenu 接口进行网络请求
            resolve(response) //将结果封装进 Promise
          }).catch(error => {
            console.log("role.js UpdateRole 错误")
            reject(error)
          })
        })
      },
    }
}

export default role