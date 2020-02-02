import { asyncRouterMap, constantRouterMap } from '@/router'
import http from '@/commjs/httpAxios'
import systemPublicApi from '@/commjs/systemPublicApi.js'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.name) {
    return roles.includes(route.meta.name)
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}
const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      const roles = data
      let accessedRouters = filterAsyncRouter(asyncRouterMap, roles)// 预加载
      commit('SET_ROUTERS', accessedRouters)
      getBranchInfo().then(function(value) {
        const zoneNo = value.split('|')[0]
        const branchNo = value.split('|')[1]
        accessedRouters = filterAsyncRouter(refreshMapInfo(asyncRouterMap, zoneNo, branchNo), roles)// 刷新
        commit('SET_ROUTERS', accessedRouters)
      })
    }
  }
}
async function getBranchInfo() {
  let returnInfo = ''
  await http(systemPublicApi.getSystemPublicInfo)
    .then(
      res => {
        returnInfo = res.data.CurrentZoneNo + '|' + res.data.CurrentBranchNo
      })
  console.log('zoneNo|BranchNo: ' + returnInfo)
  return returnInfo
}
function refreshMapInfo(asyncRouterMap1, zoneNo, BranchNo) { // 增加监控机构/地区号
  const DzUrl = 'http://10.172.95.72:3000'
  const Link1 = '?refresh=10s&orgId=1&var-showZoneno=1&var-zno=' + zoneNo
  const Link2 = '?refresh=10s&orgId=1&var-showZoneno=0&var-zno=' + zoneNo
  const FhLink = (zoneNo === '00' || BranchNo === '019807') ? Link1 : Link2
  const WdLink = '?refresh=10s&orgId=1&var-showBrno=0&var-bno=' + BranchNo
  const WdLink1 = '&var-showBrno=1&var-bno=' + BranchNo
  const WdLink2 = '&var-showBrno=0&var-bno=' + BranchNo
  const WdLink11 = (zoneNo === '00' || BranchNo === '019807') ? WdLink1 : WdLink2
  const GyLink = FhLink + WdLink11
  asyncRouterMap1.forEach((item) => {
    if (item.path === '运营实时监控') {
      item.children.forEach((item1) => {
        if (item1.name === 'T9001') { // 分行监控
          item1.path = DzUrl + '/d/BBUhD-eik/fen-xing-yun-ying-shi-shi-jian-kong' + FhLink
        } else if (item1.name === 'T9002') { // 网点监控
          item1.path = DzUrl + '/d/-CKlmJkWk/wang-dian-yun-ying-shi-shi-jian-kong' + WdLink
        }
      })
    } else if (item.path === '/DataStaAnalysis') { // 报表分析
      item.children.forEach((item1) => {
        if (item1.path === '/bsScene') { // 业务场景操作时长
          item1.children.forEach((item2) => {
            switch (item2.name) {
              case 'T9104' : item2.path = DzUrl + '/d/XzpTHYRZz' + FhLink
                break
              case 'T9105' : item2.path = DzUrl + '/d/WRNmtYRZz' + FhLink
                break
              case 'T9106' : item2.path = DzUrl + '/d/_eCPcYgWk' + FhLink
                break
              case 'T9107' : item2.path = DzUrl + '/d/DINbbYRWz' + FhLink
                break
              case 'T9108' : item2.path = DzUrl + '/d/kxA9fYRZk' + FhLink
                break
              case 'T9109' : item2.path = DzUrl + '/d/Z4P2fLRWz/' + FhLink
                break
              case 'T9110' : item2.path = DzUrl + '/d/hhRttLRWz' + GyLink
                break
              case 'T9111' : item2.path = DzUrl + '/d/VojN0YgZk' + GyLink
                break
              case 'T9112' : item2.path = DzUrl + '/d/LateTLgWz' + GyLink
                break
            }
          })
        } else if (item1.path === '/bsStatistics') { // 业务量统计
          item1.children.forEach((item2) => {
            switch (item2.name) {
              case 'T9201' : item2.path = DzUrl + '/d/tf5CEMkWz' + FhLink
                break
              case 'T9202' : item2.path = DzUrl + '/d/PyE5PGkZz' + FhLink
                break
              case 'T9203' : item2.path = DzUrl + '/d/pesEPMkWk' + FhLink
                break
              case 'T9207' : item2.path = DzUrl + '/d/-wmJBMzWk' + FhLink
                break
              case 'T9208' : item2.path = DzUrl + '/d/jw-m-GkWz' + FhLink
                break
              case 'T9209' : item2.path = DzUrl + '/d/-RjFBGzWk' + FhLink
                break
              case 'T9210' : item2.path = DzUrl + '/d/JnlLBMkZz' + GyLink
                break
              case 'T9211' : item2.path = DzUrl + '/d/6vz9YGzWz' + GyLink
                break
              case 'T9212' : item2.path = DzUrl + '/d/ZnSULGkWz' + GyLink
                break
            }
          })
        } else if (item1.path === '/queueTimesAnalysis') { // 客户排队时长分析
          item1.children.forEach((item2) => {
            switch (item2.name) {
              case 'T9304' : item2.path = DzUrl + '/d/hPvzhrgZz' + FhLink
                break
              case 'T9305' : item2.path = DzUrl + '/d/cRXA1lgZz' + FhLink
                break
              case 'T9306' : item2.path = DzUrl + '/d/P-d-trRWz' + FhLink
                break
              case 'T9307' : item2.path = DzUrl + '/d/BCMAT9RZz' + GyLink
                break
              case 'T9308' : item2.path = DzUrl + '/d/qK5kjwRWz' + GyLink
                break
              case 'T9309' : item2.path = DzUrl + '/d/VmaNo9RZk' + GyLink
                break
            }
          })
        } else if (item1.path === '/csServiceTimes') { // 客户服务时长
          item1.children.forEach((item2) => {
            switch (item2.name) {
              case 'T9404' : item2.path = DzUrl + '/d/JylYsygZz' + FhLink
                break
              case 'T9405' : item2.path = DzUrl + '/d/iRD9UyRWk' + FhLink
                break
              case 'T9406' : item2.path = DzUrl + '/d/etG8UygWk' + FhLink
                break
              case 'T9407' : item2.path = DzUrl + '/d/hpyT3sRWk' + FhLink
                break
              case 'T9408' : item2.path = DzUrl + '/d/qcz1gURZz' + FhLink
                break
              case 'T9409' : item2.path = DzUrl + '/d/NxTY6ygWk' + FhLink
                break
              case 'T9410' : item2.path = DzUrl + '/d/DxiI3sgWz' + GyLink
                break
              case 'T9411' : item2.path = DzUrl + '/d/IgTU_yRZk' + GyLink
                break
              case 'T9412' : item2.path = DzUrl + '/d/cBz3CsgZz' + GyLink
                break
            }
          })
        } else if (item1.path === '/csFlowAnalysis') { // 客户流量分析
          item1.children.forEach((item2) => {
            switch (item2.name) {
              case 'T9501' : item2.path = DzUrl + '/d/hdq1xfgWz' + FhLink
                break
              case 'T9502' : item2.path = DzUrl + '/d/9S93EpRWk' + FhLink
                break
              case 'T9503' : item2.path = DzUrl + '/d/2tJWhTgZk' + FhLink
                break
              case 'T9507' : item2.path = DzUrl + '/d/VWMWN-gWz' + FhLink
                break
              case 'T9508' : item2.path = DzUrl + '/d/90RefogZk' + FhLink
                break
              case 'T9509' : item2.path = DzUrl + '/d/2Xm6zaRZk' + FhLink
                break
              case 'T9510' : item2.path = DzUrl + '/d/IzC61fRZk' + GyLink
                break
              case 'T9511' : item2.path = DzUrl + '/d/1BZzTTRWz' + GyLink
                break
              case 'T9512' : item2.path = DzUrl + '/d/vq6VAbgZk' + GyLink
                break
            }
          })
        }
      })
    }
  })
  return asyncRouterMap1
}
export default permission
