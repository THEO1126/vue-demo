import {getPermissionByUserId} from '@/api/permissionApi' // 引入获取菜单权限 api 接口

const naviBar = {
    state: {
        menu: JSON.parse(localStorage.getItem('menuArr')) ? JSON.parse(localStorage.getItem('menu')) : []
    },
    getters: {
        menu: state => {
            let menu = state.menu;
            if(!menu){
                menu = JSON.parse(localStorage.getItem("menu"))
            }
            return menu;
        },
    },
    mutations: {
        setMenu(state, menu) {
            state.menu = menu
            localStorage.setItem("menu",menu)
        },
    },
    actions: {
      // 获取菜单权限列表
      GetPermissionByUserId({commit},userId){
        return new Promise((resolve, reject) => { //封装一个 Promise
          getPermissionByUserId(userId).then(response => { //使用 permission 接口进行网络请求
            let menu=JSON.stringify(response.data.data)
            commit("setMenu",menu)
            resolve(response) //将结果封装进 Promise
          }).catch(error => {
            reject(error)
          })
        })
      },
    }
}  

export default naviBar