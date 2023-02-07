import request from '@/utils/request' //引入封装好的 axios 请求

export function getUserList() { // 获取 员工列表
  return request({ //使用封装好的 axios 进行网络请求
    url: '/getUserList',
    method: 'get',
  })
}
/*
    员工列表 分页查询
    currentPage：求第几页的数据
    pageSize：每页显示 pageSize 条数据
*/ 
export function getUserListByPage(tablePage){
  let currentPage=tablePage.currentPage
  let pageSize=tablePage.pageSize
  return request({
    url:'/getUserListByPage',
    method:'get',
    params:{
      currentPage:currentPage,
      pageSize:pageSize
    }
  })
}

/**
 *     
 * 删除员工 
 * 根据 userId 删除
 * 返回布尔类型
 */

export function deleteUser(userId){
  return request({
    url:'/deleteUser',
    method:'get',
    params:{
      userId:userId
    }
  })
}

/**
 * 获取角色列表（只获取roleId和roleName）
 */
export function getRoleNameList(){
  return request({
    url:'/getRoleNameList',
    method:'get'
  })
}


/**
 * 插入员工
 */
export function insertUser(userInfo){
  return request({
    url:'/insertUser',
    method:'post',
    data:userInfo
  })
}

/**
 * 更新员工
*/
export function updateUser(userInfo){
  return request({
    url:'/updateUser',
    method:'post',
    data:userInfo
  })
}