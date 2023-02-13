import {getRoleList,insertRole,updateRole,deleteRoleById} from '@/api/roleApi'
import {searchRoleByName,insertRoleMenu} from '@/api/roleApi'

const role={
    actions: {
        // 获取角色
      GetRoleList({ commit }) {
        return new Promise((resolve, reject) => { //封装一个 Promise
          getRoleList().then(response => { 
            resolve(response) //将结果封装进 Promise
          }).catch(error => {
            console.log("role.js GetRoleList 错误")
            reject(error)
          })
        })
      },

      InsertRole({ commit },roleInfo) {
        return new Promise((resolve, reject) => { //封装一个 Promise
          insertRole(roleInfo).then(response => {
            resolve(response) //将结果封装进 Promise
          }).catch(error => {
            console.log("role.js InsertRole 错误")
            reject(error)
          })
        })
      },
      
      UpdateRole({ commit },roleInfo) {
        return new Promise((resolve, reject) => { //封装一个 Promise
          updateRole(roleInfo).then(response => { 
            resolve(response) //将结果封装进 Promise
          }).catch(error => {
            console.log("role.js UpdateRole 错误")
            reject(error)
          })
        })
      },

      DeleteRoleById({ commit },roleId) {
        return new Promise((resolve, reject) => { //封装一个 Promise
          deleteRoleById(roleId).then(response => { 
            resolve(response) //将结果封装进 Promise
          }).catch(error => {
            console.log("role.js DeleteRoleById 错误")
            reject(error)
          })
        })
      },

      SearchRoleByName({ commit },roleName) {
        return new Promise((resolve, reject) => { //封装一个 Promise
          searchRoleByName(roleName).then(response => { 
            resolve(response) //将结果封装进 Promise
          }).catch(error => {
            console.log("role.js SearchRoleByName 错误")
            reject(error)
          })
        })
      },

      
      InsertRoleMenu({ commit },role) {
        return new Promise((resolve, reject) => { //封装一个 Promise
          insertRoleMenu(role).then(response => { 
            resolve(response) //将结果封装进 Promise
          }).catch(error => {
            console.log("role.js InsertRoleMenu 错误")
            reject(error)
          })
        })
      },
    }
}

export default role