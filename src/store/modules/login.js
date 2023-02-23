import { login,getUserByUserId } from '@/api/loginApi'//引入登录 api 接口
import { getToken } from '@/utils/auth'


const loginVo={
    state: {
        userId: JSON.parse(localStorage.getItem("userId")) ? JSON.parse(localStorage.getItem("userId")):'',
         // 用户token，用户确认当前用户是否登录
        loginToken: JSON.parse(localStorage.getItem("loginToken")) ? JSON.parse(localStorage.getItem("loginToken")):'',  // 用户token，用户确认当前用户是否登录
        user:JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")):'',
    },
    getters: {
        userId: state => {
            let userId = state.userId;
            if(!userId){
                userId = JSON.parse(localStorage.getItem("userId"))
            }
            return userId;
        },
        loginToken: state => {
            let loginToken = state.loginToken;
            if(!loginToken){
                loginToken = JSON.parse(localStorage.getItem("loginToken"))
            }
            return loginToken;
        },
        user:state => {
            let user = state.user
            if(!user){
                user = JSON.parse(localStorage.getItem("user"))
            }
            return user;
        },
    },
    mutations: {
        setUserId: (state,userId) => {
            state.userId = userId;
            localStorage.setItem("userId",userId)
        }, 
        setLoginToken: (state,loginToken) => {
            state.loginToken = loginToken;
            localStorage.setItem("loginToken",loginToken)
        }, 
        setUser:(state,user)=>{
            state.user=user,
            localStorage.setItem("user",user)
        }
    },
    actions:{
        // 登录
        Login({ commit }, loginInfo) { //定义 Login 方法，在组件中使用 this.$store.dispatch("Login") 调用
            return new Promise((resolve, reject) => { //封装一个 Promise
            login(loginInfo).then(response => { //使用 login 接口进行网络请求
                if(response.data.statusCode==200){
                    let userId=JSON.stringify(response.data.data.userId)
                    let loginToken=JSON.stringify(response.data.data.loginToken)
                    commit('setUserId',userId)
                    commit('setLoginToken',loginToken)
                }
                // localStorage.setItem("loginToken",JSON.stringify(response.data.data.loginToken))
                resolve(response) //将结果封装进 Promise
            }).catch(error => {
                reject(error)
            })
            })
        },
        GetUserByUserId({commit},userId){
            return new Promise((resolve, reject) => { //封装一个 Promise
              getUserByUserId(userId).then(response => { //使用 permission 接口进行网络请求
                if(response.data.statusCode==200){
                    let user=JSON.stringify(response.data.data)
                    commit('setUser',user)
                }
                resolve(response) //将结果封装进 Promise
              }).catch(error => {
                reject(error)
              })
            })
        },
    }
}

export default loginVo