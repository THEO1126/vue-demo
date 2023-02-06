import Vue from 'vue'
import App from './App.vue'
import router from './router/router' //引入路由配置
import store from './store' //引入 Vuex 状态管理

/* 插件 */
import './plugins/element.js'  // element-ui
import './plugins/vxe-table.js' // vxe-table

/* 工具 */

import {dataFormat} from './utils/dateUtil'  // 日期格式化
 
/*导入qs axios*/
import qs from 'qs';
import axios from 'axios'

// global css 全局样式 自己编写的
import './assets/styles/index.scss'
import './assets/styles/view.css'
import './assets/styles/table.css'

// font-awesome 样式和图标
import 'font-awesome/css/font-awesome.min.css'

// 阿里巴巴图标
import './assets/iconfont/iconfont.css'

// vue 函数库
import XEUtils from 'xe-utils'



/*全局绑定*/
Vue.prototype.$qs = qs;
Vue.prototype.$axios =axios;
Vue.prototype.http=axios
Vue.config.productionTip = false
Vue.prototype.$XEUtils = XEUtils

Vue.prototype.$dataFormat = dataFormat

new Vue({
  render: h => h(App),
  router, //使用路由配置
  store //使用 Vuex 进行状态管理
}).$mount('#app')
