import Vue from 'vue' //引入 Vue
import VueRouter from 'vue-router' //引入 Vue 路由
import Main from "@/views/Main";
import Home from "@/views/Home";
import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'

Vue.use(VueRouter); //安装插件

export const constantRouterMap = [

    // 用于测试
    {
        path:'/index',
        component:()=>import('@/views/index')
    },

    //配置默认的路径，默认显示登录页
    {
        path: '/',
        redirect:'/login',
        component: () => import('@/views/Login'),
        children:[{
            path:"/login",
            name:'登录',
            component: () => import('@/views/Login')
        }]
    },
    //配置登录成功页面，使用时需要使用 path 路径来实现跳转
    {
        path:'/',
        component: Main,
        // redirect:'/home',
        children: [

            // 一级菜单且无子菜单 menu.type=1
            {
                path: '/dashboard',
                name: '首页',
                // 静态加载组件
                component: Home
            },
            {
                path: '/customerList',
                name: '客户管理',
                component: () => import('../views/firstMenu/customerList')
            },
            {
                path: '/purchaseContract',
                name: '采购单',
                component: () => import('../views/firstMenu/purchaseContract')
            },
            {
                path: '/processContract',
                name: '加工单',
                component: () => import('../views/firstMenu/processContract')
            },
            {
                path: '/warehouseManagement',
                name: '仓库管理',
                component: () => import('../views/firstMenu/warehouseManagement')
            },
            {
                path: '/ownCompanyList',
                name: '公司管理',
                component: () => import('../views/firstMenu/ownCompanyList')
            },
            {
                path: '/saleContract',
                name: '销售单',
                component: () => import('../views/firstMenu/saleContract')
            },
            {
                path: '/purchasePaymentContract',
                name: '采购付款单',
                component: () => import('../views/firstMenu/purchasePaymentContract')
            },
            {
                path: '/processPaymentContract',
                name: '加工付款单',
                component: () => import('../views/firstMenu/processPaymentContract')
            },
            {
                path: '/logisticsPaymentContract',
                name: '物流付款单',
                component: () => import('../views/firstMenu/logisticsPaymentContract')
            },



            // 二级菜单 menu.type=1

            // 出纳的子菜单
            {
                path: '/cashier/cashierPurchasePayment',
                name: '采购付款单',
                // 动态加载组件:只有在需要时才加载
                component: () => import('../views/cashier/cashierPurchasePayment')
            },
            {
                path: '/cashier/cashierProcessPayment',
                name: '加工付款单',
                component: () => import('../views/cashier/cashierProcessPayment')
            },
            {
                path: '/cashier/cashierSale',
                name: '出纳销售单',
                component: () => import('../views/cashier/cashierSale')
            },
            {
                path: '/cashier/cashierLogisticsPayment',
                name: '物流付款单',
                component: () => import('../views/cashier/cashierLogisticsPayment')
            },
            {
                path: '/cashier/cashierShipping',
                name: '出纳海运单',
                component: () => import('../views/cashier/cashierShipping')
            },
            {
                path: '/cashier/cashierOfficeExpense',
                name: '办公经费',
                component: () => import('../views/cashier/cashierOfficeExpense')
            },

            // 系统管理 的子菜单
            {
                path: '/userList',
                name: '员工管理',
                component: () => import('../views/system/userList')
            },
            {
                path: '/roleList',
                name: '角色管理',
                component: () => import('../views/system/roleList')
            },
            {
                path: '/menuList',
                name: '菜单管理',
                component: () => import('../views/system/menuList')
            },
            {
                path: 'logList',
                name: '日志管理',
                component: () => import('../views/system/logList')
            },

            // 出库信息 的子菜单
            {
                path: '/outbound/outboundLogisticsList',
                name: '出库物流单',
                component: () => import('../views/outbound/outboundLogisticsList')
            },
            {
                path: '/outbound/outboundShippingList',
                name: '出库海运单',
                component: () => import('../views/outbound/outboundShippingList')
            },


            // 财务管理的子菜单

            {
                path: '/finance/reportAnalysis',
                name: '报表分析',
                component: () => import('../views/finance/reportAnalysis')
            },
            {
                path: '/finance/officeExpense',
                name: '办公经费',
                component: () => import('../views/finance/officeExpense')
            },
            {
                path: '/finance/priceTrend',
                name: '单价走势',
                component: () => import('../views/finance/priceTrend')
            }
        ]
    },



    //配置登录成功页面，使用时需要使用 path 路径来实现跳转
    { path: '/success', component: () => import('@/views/success')},

    //配置登录失败页面，使用时需要使用 path 路径来实现跳转
    // { path: '/error', component: () => import('@/views/error'), hidden: true }
]

export default new VueRouter({
    mode:"history",
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap //指定路由列表
})

