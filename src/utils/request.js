import axios from 'axios' //引入 axios
import baseUrl from '../api/baseUrl' //使用环境变量 + 模式的方式定义基础URL
import { VXETable } from 'vxe-table'
import router from '../router/index' //引入路由配置
// 创建 axios 实例
const service = axios.create({
  baseURL: baseUrl, // api 的 base_url
  timeout: 15000, // 请求超时时间
})

// 添加请求拦截器，在请求头中加 token
service.interceptors.request.use(function (config) {
  if (localStorage.getItem('loginToken')) {
    config.headers.token = JSON.parse(localStorage.getItem('loginToken'));
  }
  return config;
}, function (error) {
  return Promise.reject(error)
})

//  响应
service.interceptors.response.use(response => {
  let statusCode = response.data.statusCode
  if(statusCode==401){
    VXETable.modal.message({ content: response.data.msg, status: 'error' })
    router.push({
      path: "/login",
    })
  }
  return response //响应了拦截器（在响应之后对数据进行一些处理）
}, err => {
  return Promise.reject(err)//Promise.reject方法会返回一个新的 Promise 实例，该实例的状态为rejected
})

export default service
