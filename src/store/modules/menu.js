import { getAllMenu,updateMenu,insertMenu,deleteMenu } from '@/api/menuApi'//引入 获取菜单列表 api  接口

const menu = {
  actions: {
    // 获取菜单列表
    GetAllMenu({ commit }) {
      return new Promise((resolve, reject) => { //封装一个 Promise
        getAllMenu().then(response => { //使用  getAllMenu 接口进行网络请求
          resolve(response) //将结果封装进 Promise
        }).catch(error => {
          console.log("menu.js GetAllMenu 错误")
          reject(error)
        })
      })
    },
    // 更新菜单
    UpdateMenu({ commit },menu) {
      return new Promise((resolve, reject) => { //封装一个 Promise
        updateMenu(menu).then(response => { 
          resolve(response) //将结果封装进 Promise
        }).catch(error => {
          console.log("menu.js UpdateMenu 错误")
          reject(error)
        })
      })
    },
    // 插入菜单
    InsertMenu({ commit },menu) {
      return new Promise((resolve, reject) => { //封装一个 Promise
        insertMenu(menu).then(response => { 
          resolve(response) //将结果封装进 Promise
        }).catch(error => {
          console.log("menu.js InsertMenu 错误")
          reject(error)
        })
      })
    },
    // 删除菜单
    DeleteMenu({ commit },id) {
      return new Promise((resolve, reject) => { //封装一个 Promise
        deleteMenu(id).then(response => { 
          resolve(response) //将结果封装进 Promise
        }).catch(error => {
          console.log("menu.js DeleteMenu 错误")
          reject(error)
        })
      })
    },
  }
}

export default menu
