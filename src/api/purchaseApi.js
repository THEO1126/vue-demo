import request from '@/utils/request' //引入封装好的 axios 请求

export function getAllPurchaseContract() { 
  return request({ //使用封装好的 axios 进行网络请求
    url: '/getAllPurchaseContract',
    method: 'get',
  })
}

// 采购单 分页查询
export function getPurchaseContractByPage(tablePage){
  let currentPage=tablePage.currentPage
  let pageSize=tablePage.pageSize
  return request({
    url:'/getPurchaseContractByPage',
    method:'get',
    params:{
      currentPage:currentPage,
      pageSize:pageSize
    }
  })
}

// 采购单 总数量
export function getPurchaseContractTotalPage(){
  return request({
    url:'/getPurchaseContractTotalPage',
    method:'get'
  })
}
