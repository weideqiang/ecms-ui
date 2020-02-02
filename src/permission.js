import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // getToken from cookie
import userApi from '@/commjs/userMngApi'
import http from '@/commjs/httpAxios'

NProgress.configure({ showSpinner: false })// NProgress configuration

// const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.matched.some(res => res.meta.requireAuth)) { // 判断是否需要登录权限
    // alert('需要登录')
    if (getToken()) { // 判断是否登录
      if (store.getters.roles.length === 0) {
        // 获取用户交易列表
        http(userApi.getUserTrx).then(res => {
          // const trxList = res.data
          const trxList = ['T1001', 'T1002', 'T1003', 'T1004']
          if (trxList.length !== 0) {
            store.dispatch('GetInfo', trxList)
            store.dispatch('GenerateRoutes', trxList)
            router.addRoutes(store.getters.addRouters)
            next()
            NProgress.done()
          } else {
            Message.error('未查询到用户权限')
          }
        })
      } else {
        next()
      }
    } else { // 没登录则跳转到登录界面
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
