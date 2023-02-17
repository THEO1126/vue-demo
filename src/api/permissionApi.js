import request from '@/utils/request' //引入封装好的 axios 请求

export function getPermissionByUserId(userId) { //获取菜单权限接口
  return request({ //使用封装好的 axios 进行网络请求
    url: '/getPermissionByUserId',
    method: 'get',
    params:{
      userId:userId
    }
  })
}