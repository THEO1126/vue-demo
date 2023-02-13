import { getAllCompany,updateCompany,deleteCommpanyById,insertCompany,getCompanyListByPage} from '@/api/companyApi' 

const company = {

  actions: {

    GetAllCompany({ commit }) { 
      return new Promise((resolve, reject) => { //封装一个 Promise
        getAllCompany().then(response => { 
          resolve(response) //将结果封装进 Promise
        }).catch(error => {
          reject(error)
        })
      })
    },

    UpdateCompany({commit},menu){
      return new Promise((resolve, reject) => { //封装一个 Promise
        updateCompany(menu).then(response => { //使用 permission 接口进行网络请求
          resolve(response) //将结果封装进 Promise
        }).catch(error => {
          console.log("company.js UpdateCompany 错误")
          reject(error)
        })
      })
    },

    InsertCompany({commit},menu){
      return new Promise((resolve, reject) => { //封装一个 Promise
        insertCompany(menu).then(response => { //使用 permission 接口进行网络请求
          resolve(response) //将结果封装进 Promise
        }).catch(error => {
          console.log("company.js InsertCompany 错误")
          reject(error)
        })
      })
    },

    DeleteCommpanyById({commit},id){
      return new Promise((resolve, reject) => { //封装一个 Promise
        deleteCommpanyById(id).then(response => { //使用 permission 接口进行网络请求
          resolve(response) //将结果封装进 Promise
        }).catch(error => {
          console.log("company.js DeleteCommpanyById 错误")
          reject(error)
        })
      })
    },

    GetCompanyListByPage({commit},tablePage){
        return new Promise((resolve, reject) => { //封装一个 Promise
        getCompanyListByPage(tablePage).then(response => { //使用 permission 接口进行网络请求
            resolve(response) //将结果封装进 Promise
          }).catch(error => {
            console.log("company.js GetCompanyListByPage 错误")
            reject(error)
          })
        })
      },
  }
}

export default company
