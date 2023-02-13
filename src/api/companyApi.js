import request from '@/utils/request' //引入封装好的 axios 请求

export function getAllCompany() { // 获取 公司列表
  return request({ //使用封装好的 axios 进行网络请求
    url: '/getAllCompany',
    method: 'get',
  })
}

export function updateCompany(company) { // 更新公司
  return request({ //使用封装好的 axios 进行网络请求
    url: '/updateCompany',
    method: 'post',
    data:company
  })
}

export function insertCompany(company) { // 插入公司
  return request({ //使用封装好的 axios 进行网络请求
    url: '/insertCompany',
    method: 'post',
    data:company
  })
}

export function deleteCommpanyById(id) { // 删除公司
  return request({ //使用封装好的 axios 进行网络请求
    url: '/deleteCommpanyById',
    method: 'get',
    params:{
      id:id
    }
  })
}

/*
     分页查询
    currentPage：求第几页的数据
    pageSize：每页显示 pageSize 条数据
*/ 
export function getCompanyListByPage(tablePage){
  let currentPage=tablePage.currentPage
  let pageSize=tablePage.pageSize
  return request({
    url:'/getCompanyListByPage',
    method:'get',
    params:{
      currentPage:currentPage,
      pageSize:pageSize
    }
  })
}

/**
 * 获取公司列表总的数量
 */
export function getCompanyListTotalPage(){
  return request({
    url:'/getCompanyListTotalPage',
    method:'get'
  })
}

/**
 * @param name:公司名 
 * 根据公司名 查询公司列表
 * 分页查询
 */
export function searchCompanyList(searchInfo){
  let name=searchInfo.name
  let pageSize=searchInfo.pageSize
  let currentPage=searchInfo.currentPage
  return request({
    url:'/searchCompanyList',
    method:'get',
    params:{
      name:name,
      currentPage:currentPage,
      pageSize:pageSize
    }
  })
}


/**
 * @param name:公司名 
 * 根据公司名 查询公司列表 的数量
 */
export function searchCompanyListTotalPage(searchInfo){
  let name=searchInfo.name
  return request({
    url:'/searchCompanyListTotalPage',
    method:'get',
    params:{
      name:name,
    }
  })
}