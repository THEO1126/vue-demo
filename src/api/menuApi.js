import request from '@/utils/request' //引入封装好的 axios 请求

export function getAllMenu() { // 获取 菜单列表
  return request({ //使用封装好的 axios 进行网络请求
    url: '/getAllMenu',
    method: 'get',
  })
}

export function updateMenu(menu) { // 更新菜单
  return request({ //使用封装好的 axios 进行网络请求
    url: '/updateMenu',
    method: 'post',
    data:menu
  })
}

export function insertMenu(menu) { // 插入菜单
  return request({ //使用封装好的 axios 进行网络请求
    url: '/insertMenu',
    method: 'post',
    data:menu
  })
}

export function deleteMenu(id) { // 删除菜单
  return request({ //使用封装好的 axios 进行网络请求
    url: '/deleteMenu',
    method: 'get',
    params:{
      id:id
    }
  })
}