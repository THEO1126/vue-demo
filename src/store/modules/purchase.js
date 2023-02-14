import {getAllPurchaseContract,getPurchaseContractByPage,getPurchaseContractTotalPage} from '@/api/purchaseApi'


const purchase={
    actions: {
        // 获取 采购单
       GetAllPurchaseContract({ commit }) {
        return new Promise((resolve, reject) => { //封装一个 Promise
            getAllPurchaseContract().then(response => { 
            resolve(response) //将结果封装进 Promise
          }).catch(error => {
            console.log("purchase.js GetAllPurchaseContract 错误")
            reject(error)
          })
        })
      },

      GetPurchaseContractByPage({ commit },tablePage) {
        return new Promise((resolve, reject) => { //封装一个 Promise
          getPurchaseContractByPage(tablePage).then(response => { 
            resolve(response) //将结果封装进 Promise
          }).catch(error => {
            console.log("purchase.js GetPurchaseContractByPage 错误")
            reject(error)
          })
        })
      },
      
      GetPurchaseContractTotalPage({ commit }) {
        return new Promise((resolve, reject) => { //封装一个 Promise
          getPurchaseContractTotalPage().then(response => { 
            resolve(response) //将结果封装进 Promise
          }).catch(error => {
            console.log("purchase.js GetPurchaseContractTotalPage 错误")
            reject(error)
          })
        })
      },
    }
}

export default purchase