import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
 **/
const externalLinkBaseUrl = 'http://10.172.95.72:3000'

export const constantRouterMap = [
  { path: '/login',
    hidden: true,
    component: () => import('@/views/00-login/Login'),
    children: [
      {
        path: '/ActivatePwd',
        name: 'ActivatePwd',
        component: () => import('@/views/00-login/ActivatePwd')
      }
    ]
  },
  { path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  // { path: '/ESignnature',
  //   component: () => import('@/views/dashboard/ESignnature'),
  //   meta: { title: '电子签名', name: 'ESignnature' }
  // },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    meta: {
      requireAuth: true
    },
    children: [
      {
        path: 'dashboard',
        name: 'index',
        component: () => import('@/views/dashboard/index')
      },
      {
        path: 'perStatistics',
        name: 'index',
        component: () => import('@/views/dashboard/MobileIndex')
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
export const asyncRouterMap = [
  {
    path: '/system',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    meta: { title: '权限管理', icon: 'example', requireAuth: true },
    children: [
      {
        path: 'resetPwd',
        name: 'ResetPwd',
        component: () => import('@/views/00-index/ResetPwd'),
        meta: { title: '密码修改', name: 'ResetPwd' }
      },
      {
        path: 'T1001',
        name: 'T1001',
        component: () => import('@/views/usermanagement/T1001/T1001'),
        meta: { title: '用户信息查询', name: 'T1001' },
        children: [
          {
            path: 'T10011',
            name: 'T10011',
            hidden: true,
            component: () => import('@/views/usermanagement/T1001/T1001_1')
          }
        ]
      },
      {
        path: 'T1007',
        name: 'T1007',
        component: () => import('@/views/usermanagement/T1007/T1007'),
        meta: { title: '机构信息查询', name: 'T1007' },
        children: [
          {
            path: 'T10071',
            name: 'T10071',
            hidden: true,
            component: () => import('@/views/usermanagement/T1007/T1007_1')
          }
        ]
      },
      {
        path: 'T10012',
        name: 'T10012',
        component: () => import('@/views/usermanagement/T1001/T1001_2'),
        meta: { title: '用户信息新增', name: 'T10012' }
      },
      {
        path: 'T1002',
        name: 'T1002',
        component: () => import('@/views/usermanagement/T1002/T1002'),
        meta: { title: '角色信息查询维护', name: 'T1002' }
      },
      {
        path: 'T10021',
        name: 'T10021',
        hidden: true,
        component: () => import('@/views/usermanagement/T1002/T1002_1'),
        meta: { title: '角色信息维护', icon: 'tree', requireAuth: true }
      },
      {
        path: 'T10022',
        name: 'T10022',
        component: () => import('@/views/usermanagement/T1002/T1002_2'),
        meta: { title: '角色信息新增', icon: 'tree', name: 'T10022' }
      },
      {
        path: 'T1003',
        name: 'T1003',
        component: () => import('@/views/usermanagement/T1003/T1003'),
        meta: { title: '密码重置', name: 'T1003' }
      },
      {
        path: 'T1004',
        name: 'T1004',
        component: () => import('@/views/usermanagement/T1004/T1004'),
        meta: { title: '强制签退', name: 'T1004' }
      },
      {
        path: 'T1005',
        name: 'T1005',
        component: () => import('@/views/usermanagement/T1005/T1005'),
        meta: { title: '角色下挂交易查询维护', name: 'T1005' }
      },
      {
        path: 'T1006',
        name: 'T1006',
        component: () => import('@/views/usermanagement/T1006/T1006'),
        meta: { title: '用户下挂角色查询维护', name: 'T1006' }
      },
      {
        path: 'T1007',
        name: 'T1007',
        component: () => import('@/views/usermanagement/T1007/T1007'),
        meta: { title: '机构信息查询维护', name: 'T1007' }
      },
      {
        path: 'T10071',
        name: 'T10071',
        hidden: true,
        component: () => import('@/views/usermanagement/T1007/T1007_1'),
        meta: { title: '机构信息维护', icon: 'tree', requireAuth: true }
      },
      {
        path: 'T10072',
        name: 'T10072',
        component: () => import('@/views/usermanagement/T1007/T1007_2'),
        meta: { title: '机构信息新增', icon: 'tree', name: 'T10072' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    meta: { title: '人员管理', icon: 'example', requireAuth: true },
    children: [
      {
        path: '/work',
        component: () => import('@/views/layout/components/AppMain'),
        // component: () => import('@/views/layout/components/AppMain'),
        redirect: 'noredirect',
        alwaysShow: true,
        meta: { title: '排班管理', requireAuth: true },
        children: [
          {
            path: 'T2001',
            name: 'T2001',
            component: () => import('@/views/workforcemanagement/T2001/T2001'),
            meta: { title: '排班表生成', name: 'T2001' }
          },
          {
            path: 'T2002',
            name: 'T2002',
            component: () => import('@/views/workforcemanagement/T2002/T2002'),
            meta: { title: '排班信息查询', name: 'T2002' }
          },
          {
            path: 'T2003',
            name: 'T2003',
            component: () => import('@/views/workforcemanagement/T2003/T2003'),
            meta: { title: '排班人员设置', name: 'T2003' }
          },
          {
            path: 'T200301',
            name: 'T200301',
            hidden: true,
            component: () => import('@/views/workforcemanagement/T2003/T200301'),
            meta: { title: '排班人员增加', requireAuth: true }
          },
          {
            path: 'T2004',
            name: 'T2004',
            component: () => import('@/views/workforcemanagement/T2004/T2004'),
            meta: { title: '排班统计信息查询', name: 'T2004' }
          },
          {
            path: 'T2005',
            name: 'T2005',
            component: () => import('@/views/workforcemanagement/T2005/T2005'),
            meta: { title: '排班班次设置', name: 'T2005' }
          },
          {
            path: 'T20051',
            name: 'T20051',
            hidden: true,
            component: () => import('@/views/workforcemanagement/T2005/T20051'),
            meta: { title: '排班班次设置', requireAuth: true }
          },
          {
            path: 'T2006',
            name: 'T2006',
            component: () => import('@/views/workforcemanagement/T2006/T2006'),
            meta: { title: '排班个人信息查询', name: 'T2006' }
          },
          {
            path: 'T2001_01',
            name: 'T2001_01',
            component: () => import('@/views/workforcemanagement/T2001/T2001_01'),
            meta: { title: '手机端排班信息查询', name: 'T2001_01' }
          },
          {
            path: 'T2007',
            name: 'T2007',
            component: () => import('@/views/workforcemanagement/T2007/T2007'),
            meta: { title: '排班参数管理', name: 'T2007' }
          }, {
            path: externalLinkBaseUrl + '/d/QdPAaazWzL',
            name: 'T2008',
            meta: { title: '次月排班业务量分析-月视图', name: 'T2008' }
          }, {
            path: 'T2009',
            name: 'T2009',
            component: () => import('@/views/workforcemanagement/T2009/T2009'),
            meta: { title: '排班调整', name: 'T2009' }
          }, {
            path: 'TinputExcel',
            name: 'TinputExcel',
            hidden: true,
            component: () => import('@/views/workforcemanagement/T2009/TinputExcel'),
            meta: { title: '排班调整', requireAuth: true }
          }
        ]
      }
    ]
  },
  {
    path: '/warning',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    meta: { title: '预警管理', icon: 'example', requireAuth: true },
    children: [
      {
        path: 'T2101',
        name: 'T2101',
        component: () => import('@/views/preWarningManagement/T2101/T2101'),
        meta: { title: '预警异常处理', name: 'T2101' }
      },
      {
        path: 'T210101',
        name: 'T210101',
        hidden: true,
        component: () => import('@/views/preWarningManagement/T2101/T210101'),
        meta: { title: '预警异常处理-状态修改', icon: 'tree', requireAuth: true }
      }
    ]
  },
  {
    path: '/register',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    meta: { title: '登记簿', icon: 'example', requireAuth: true },
    children: [
      {
        path: 'T5501',
        name: 'T5501',
        component: () => import('@/views/registerbook/T5501/T5501'),
        meta: { title: '客户单证领取、收回登记簿', name: 'T5501' }
      },
      {
        path: 'T55011',
        name: 'T55011',
        hidden: true,
        component: () => import('@/views/registerbook/T5501/T5502'),
        meta: { title: '客户单证领取、收回登记簿查询结果', requireAuth: true }
      },
      {
        path: 'T55012',
        name: 'T55012',
        hidden: true,
        component: () => import('@/views/registerbook/T5501/T5503'),
        meta: { title: '客户单证领取、收回记录', requireAuth: true }
      },
      {
        path: 'T5502',
        name: 'T5502',
        component: () => import('@/views/registerbook/T5502/T5502'),
        meta: { title: '存款查询登记簿', name: 'T5502' }
      },
      {
        path: 'T55021',
        name: 'T55021',
        hidden: true,
        component: () => import('@/views/registerbook/T5502/T55021'),
        meta: { title: '存款查询登记簿查询结果', requireAuth: true }
      },
      {
        path: 'T5503',
        name: 'T5503',
        component: () => import('@/views/registerbook/T5503/T5503'),
        meta: { title: '重要空白凭证出售登记簿', name: 'T5503' }
      },
      {
        path: 'T55031',
        name: 'T55031',
        hidden: true,
        component: () => import('@/views/registerbook/T5503/T55031'),
        meta: { title: '重要空白凭证出售登记簿查询结果', requireAuth: true }
      },
      {
        path: 'T5504',
        name: 'T5504',
        component: () => import('@/views/registerbook/T5504/T5504'),
        meta: { title: '交接登记簿', name: 'T5504' }
      },
      {
        path: 'T55041',
        name: 'T55041',
        hidden: true,
        component: () => import('@/views/registerbook/T5504/T55041'),
        meta: { title: '交接登记簿查询结果', requireAuth: true }
      },
      {
        path: 'T5505',
        name: 'T5505',
        component: () => import('@/views/registerbook/T5505/T5505'),
        meta: { title: '代发工资登记簿', name: 'T5505' }
      },
      {
        path: 'T55051',
        name: 'T55051',
        hidden: true,
        component: () => import('@/views/registerbook/T5505/T55051'),
        meta: { title: '代发工资登记簿查询结果', requireAuth: true }
      },
      {
        path: 'T5506',
        name: 'T5506',
        component: () => import('@/views/registerbook/T5506/T5506'),
        meta: { title: '客户存取款差错登记簿', name: 'T5506' }
      },
      {
        path: 'T55061',
        name: 'T55061',
        hidden: true,
        component: () => import('@/views/registerbook/T5506/T55061'),
        meta: { title: '客户存取款差错登记簿查询结果', requireAuth: true }
      },
      {
        path: 'T5507',
        name: 'T5507',
        component: () => import('@/views/registerbook/T5507/T5507'),
        meta: { title: '重要印章（秘钥、卡、具）保管使用登记簿', name: 'T5507' }
      },
      {
        path: 'T55071',
        name: 'T55071',
        hidden: true,
        component: () => import('@/views/registerbook/T5507/T55071'),
        meta: { title: '重要印章（秘钥、卡、具）保管使用登记簿查询结果', requireAuth: true }
      },
      {
        path: 'T5508',
        name: 'T5508',
        component: () => import('@/views/registerbook/T5508/T5508'),
        meta: { title: '票据交接登记簿', name: 'T5508' }
      },
      {
        path: 'T55081',
        name: 'T55081',
        hidden: true,
        component: () => import('@/views/registerbook/T5508/T55081'),
        meta: { title: '票据交接登记簿查询结果', requireAuth: true }
      },
      {
        path: 'T5509',
        name: 'T5509',
        component: () => import('@/views/registerbook/T5509/T5509'),
        meta: { title: '检查登记簿', name: 'T5509' }
      },
      {
        path: 'T55091',
        name: 'T55091',
        hidden: true,
        component: () => import('@/views/registerbook/T5509/T55091'),
        meta: { title: '检查登记簿查询结果', requireAuth: true }
      },
      {
        path: 'T5510',
        name: 'T5510',
        component: () => import('@/views/registerbook/T5510/T5510'),
        meta: { title: '假币收缴代保管登记簿', name: 'T5510' }
      },
      {
        path: 'T55101',
        name: 'T55101',
        hidden: true,
        component: () => import('@/views/registerbook/T5510/T55101'),
        meta: { title: '假币收缴代保管登记簿查询结果', requireAuth: true }
      },
      {
        path: 'T5519',
        name: 'T5519',
        component: () => import('@/views/registerbook/T5519/T5519'),
        meta: { title: '企业资料交接登记查询', name: 'T5519' }
      },
      {
        path: 'T5520',
        name: 'T5520',
        component: () => import('@/views/registerbook/T5520/T5520'),
        meta: { title: '上门核实或面签登记', name: 'T5520' }
      },
      {
        path: 'T552001',
        name: 'T552001',
        hidden: true,
        component: () => import('@/views/registerbook/T5520/T552001'),
        meta: { title: '核实登记', requireAuth: true }
      },
      {
        path: 'T5521',
        name: 'T5521',
        component: () => import('@/views/registerbook/T5521/T5521'),
        meta: { title: '交接资料登记', name: 'T5521' }
      },
      {
        path: 'T552101',
        name: 'T552101',
        hidden: true,
        component: () => import('@/views/registerbook/T5521/T552101'),
        meta: { title: '核实登记', requireAuth: true }
      },
      {
        path: 'T5522',
        name: 'T5522',
        component: () => import('@/views/registerbook/T5522/T5522'),
        meta: { title: '报送资料登记', name: 'T5522' }
      },
      {
        path: 'T552201',
        name: 'T552201',
        hidden: true,
        component: () => import('@/views/registerbook/T5522/T552201'),
        meta: { title: '报送资料', requireAuth: true }
      },
      {
        path: 'T5523',
        name: 'T5523',
        component: () => import('@/views/registerbook/T5523/T5523'),
        meta: { title: '通知客户登记', name: 'T5523' }
      },
      {
        path: 'T552301',
        name: 'T552301',
        hidden: true,
        component: () => import('@/views/registerbook/T5523/T552301'),
        meta: { title: '通知客户', requireAuth: true }
      },
      {
        path: 'T5524',
        name: 'T5524',
        component: () => import('@/views/registerbook/T5524/T5524'),
        meta: { title: '领回开户许可证登记', name: 'T5524' }
      },
      {
        path: 'T552401',
        name: 'T552401',
        hidden: true,
        component: () => import('@/views/registerbook/T5524/T552401'),
        meta: { title: '领会开户许可证', requireAuth: true }
      },
      {
        path: 'T5525',
        name: 'T5525',
        component: () => import('@/views/registerbook/T5525/T5525'),
        meta: { title: '领取开户许可证', name: 'T5525' }
      },
      {
        path: 'T552501',
        name: 'T552501',
        hidden: true,
        component: () => import('@/views/registerbook/T5525/T552501'),
        meta: { title: '领取开户许可证', requireAuth: true }
      },
      {
        path: 'T5526',
        name: 'T5526',
        component: () => import('@/views/registerbook/T5526/T5526'),
        meta: { title: '联网核查身份信息登记簿', name: 'T5526' }
      },
      {
        path: 'T55261',
        name: 'T55261',
        hidden: true,
        component: () => import('@/views/registerbook/T5526/T55261'),
        meta: { title: '联网核查身份信息登记簿查询结果', requireAuth: true }
      },
      {
        path: 'T5527',
        name: 'T5527',
        component: () => import('@/views/registerbook/T5527/T5527'),
        meta: { title: '委派会计经理登记簿', name: 'T5527' }
      },
      {
        path: 'T552701',
        name: 'T552701',
        hidden: true,
        component: () => import('@/views/registerbook/T5527/T552701'),
        meta: { title: '签到/签退', requireAuth: true }
      },
      {
        path: 'T5549',
        name: 'T5549',
        component: () => import('@/views/registerbook/T5549/T5549'),
        meta: { title: '签约信息登记簿', name: 'T5549' }
      },
      {
        path: 'T554901',
        name: 'T554901',
        hidden: true,
        component: () => import('@/views/registerbook/T5549/T554901'),
        meta: { title: '签约信息登记簿-查询结果', requireAuth: true }
      },
      {
        path: 'T5550',
        name: 'T5550',
        component: () => import('@/views/registerbook/T5550/T5550'),
        meta: { title: '大额付款联系查证登记簿', name: 'T5550' }
      },
      {
        path: 'T555001',
        name: 'T555001',
        hidden: true,
        component: () => import('@/views/registerbook/T5550/T555001'),
        meta: { title: '大额付款联系查证登记簿-查询结果', requireAuth: true }
      },
      {
        path: 'T5551',
        name: 'T5551',
        component: () => import('@/views/registerbook/T5551/T5551'),
        meta: { title: '大额存取款登记簿', name: 'T5551' }
      },
      {
        path: 'T555101',
        name: 'T555101',
        hidden: true,
        component: () => import('@/views/registerbook/T5551/T555101'),
        meta: { title: '大额存取款登记簿-查询结果', requireAuth: true }
      },
      {
        path: 'T5552',
        name: 'T5552',
        component: () => import('@/views/registerbook/T5552/T5552'),
        meta: { title: '出入库房人员登记簿', name: 'T5552' }
      },
      {
        path: 'T555201',
        name: 'T555201',
        hidden: true,
        component: () => import('@/views/registerbook/T5552/T555201'),
        meta: { title: '出入库房人员登记簿-查询结果', requireAuth: true }
      },
      {
        path: 'T5553',
        name: 'T5553',
        component: () => import('@/views/registerbook/T5553/T5553'),
        meta: { title: '会计档案登记簿', name: 'T5553' }
      },
      {
        path: 'T555301',
        name: 'T555301',
        hidden: true,
        component: () => import('@/views/registerbook/T5553/T555301'),
        meta: { title: '会计档案登记簿-查询结果', requireAuth: true }
      },
      {
        path: 'T5554',
        name: 'T5554',
        component: () => import('@/views/registerbook/T5554/T5554'),
        meta: { title: '封包交接登记簿', name: 'T5554' }
      },
      {
        path: 'T555401',
        name: 'T555401',
        hidden: true,
        component: () => import('@/views/registerbook/T5554/T555401'),
        meta: { title: '封包交接登记簿-查询结果', requireAuth: true }
      },
      {
        path: 'T5555',
        name: 'T5555',
        component: () => import('@/views/registerbook/T5555/T5555'),
        meta: { title: '港澳台居民开销户登记簿', name: 'T5555' }
      },
      {
        path: 'T555501',
        name: 'T555501',
        hidden: true,
        component: () => import('@/views/registerbook/T5555/T555501'),
        meta: { title: '港澳台居民开销户登记簿-客户查询', requireAuth: true }
      },
      {
        path: 'T555502',
        name: 'T555502',
        hidden: true,
        component: () => import('@/views/registerbook/T5555/T555502'),
        meta: { title: '港澳台居民开销户登记簿-账户查询', requireAuth: true }
      }
    ]
  },
  {
    path: '/DataStaAnalysis',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    meta: { title: '报表分析', icon: 'example', requireAuth: true },
    children: [
      {
        path: '/bsScene',
        // component: Layout,
        redirect: 'noredirect',
        alwaysShow: true,
        meta: { title: '业务场景操作时长' },
        children: [
          {
            path: externalLinkBaseUrl + '/d/TqumsBRZk',
            name: 'T9101',
            meta: { title: '全行业务场景操作时长分析-年视图', name: 'T9101' }
          },
          {
            path: externalLinkBaseUrl + '/d/WiwSabRWz',
            name: 'T9102',
            meta: { title: '全行业务场景操作时长分析-日视图', name: 'T9102' }
          },
          {
            path: externalLinkBaseUrl + '/d/WhxFQfgZz',
            name: 'T9103',
            meta: { title: '全行业务场景操作时长分析-月视图', name: 'T9103' }
          },
          {
            path: externalLinkBaseUrl + '/d/XzpTHYRZz',
            name: 'T9104',
            meta: { title: '分行业务场景操作时长分析-年视图', name: 'T9104' }
          },
          {
            path: externalLinkBaseUrl + '/d/WRNmtYRZz',
            name: 'T9105',
            meta: { title: '分行业务场景操作时长分析-日视图', name: 'T9105' }
          },
          {
            path: externalLinkBaseUrl + '/d/_eCPcYgWk',
            name: 'T9106',
            meta: { title: '分行业务场景操作时长分析-月视图', name: 'T9106' }
          },
          {
            path: externalLinkBaseUrl + '/d/DINbbYRWz',
            name: 'T9107',
            meta: { title: '柜员业务场景平均时长分析-年视图', name: 'T9107' }
          },
          {
            path: externalLinkBaseUrl + '/d/kxA9fYRZk',
            name: 'T9108',
            meta: { title: '柜员业务场景平均时长分析-日视图', name: 'T9108' }
          },
          {
            path: externalLinkBaseUrl + '/d/Z4P2fLRWz/',
            name: 'T9109',
            meta: { title: '柜员业务场景平均时长分析-月视图', name: 'T9109' }
          },
          {
            path: externalLinkBaseUrl + '/d/hhRttLRWz',
            name: 'T9110',
            meta: { title: '网点业务场景平均时长分析-年视图', name: 'T9110' }
          },
          {
            path: externalLinkBaseUrl + '/d/VojN0YgZk',
            name: 'T9111',
            meta: { title: '网点业务场景平均时长分析-日视图', name: 'T9111' }
          },
          {
            path: externalLinkBaseUrl + '/d/LateTLgWz',
            name: 'T9112',
            meta: { title: '网点业务场景平均时长分析-月视图', name: 'T9112' }
          }
        ]
      },
      {
        path: '/bsStatistics',
        // component: Layout,
        redirect: 'noredirect',
        alwaysShow: true,
        meta: { title: '业务量统计', requireAuth: true },
        children: [
          {
            path: externalLinkBaseUrl + '/d/tf5CEMkWz',
            name: 'T9201',
            meta: { title: '分行业务量-年视图', name: 'T9201' }
          },
          {
            path: externalLinkBaseUrl + '/d/PyE5PGkZz',
            name: 'T9202',
            meta: { title: '分行业务量-日视图', name: 'T9202' }
          },
          {
            path: externalLinkBaseUrl + '/d/pesEPMkWk',
            name: 'T9203',
            meta: { title: '分行业务量-月视图', name: 'T9203' }
          },
          {
            path: externalLinkBaseUrl + '/d/Oxh0tSzWk',
            name: 'T9204',
            meta: { title: '总行业务量统计-年视图', name: 'T9204' }
          },
          {
            path: externalLinkBaseUrl + '/d/hTBfsGkWz',
            name: 'T9205',
            meta: { title: '总行业务量统计-日视图', name: 'T9205' }
          },
          {
            path: externalLinkBaseUrl + '/d/u7pKpSkZk',
            name: 'T9206',
            meta: { title: '总行业务量统计-月视图', name: 'T9206' }
          },
          {
            path: externalLinkBaseUrl + '/d/-wmJBMzWk',
            name: 'T9207',
            meta: { title: '柜员业务量统计-年视图', name: 'T9207' }
          },
          {
            path: externalLinkBaseUrl + '/d/jw-m-GkWz',
            name: 'T9208',
            meta: { title: '柜员业务量统计-日视图', name: 'T9208' }
          },
          {
            path: externalLinkBaseUrl + '/d/-RjFBGzWk',
            name: 'T9209',
            meta: { title: '柜员业务量统计-月视图', name: 'T9209' }
          },
          {
            path: externalLinkBaseUrl + '/d/JnlLBMkZz',
            name: 'T9210',
            meta: { title: '网点业务量统计-年视图', name: 'T9210' }
          },
          {
            path: externalLinkBaseUrl + '/d/6vz9YGzWz',
            name: 'T9211',
            meta: { title: '网点业务量统计-日视图', name: 'T9211' }
          },
          {
            path: externalLinkBaseUrl + '/d/ZnSULGkWz',
            name: 'T9212',
            meta: { title: '网点业务量统计-月视图', name: 'T9212' }
          }
        ]
      },
      {
        path: '/queueTimesAnalysis',
        // component: Layout,
        redirect: 'noredirect',
        alwaysShow: true,
        meta: { title: '客户排队时长分析', requireAuth: true },
        children: [
          {
            path: externalLinkBaseUrl + '/d/cWDFKrRWk',
            name: 'T9301',
            meta: { title: '全行客户排队平均时长分析-年视图', name: 'T9301' }
          },
          {
            path: externalLinkBaseUrl + '/d/8ZCjU_gZk',
            name: 'T9302',
            meta: { title: '全行客户排队平均时长分析-日视图', name: 'T9302' }
          },
          {
            path: externalLinkBaseUrl + '/d/XbZfO9gWz',
            name: 'T9303',
            meta: { title: '全行客户排队平均时长分析-月视图', name: 'T9303' }
          },
          {
            path: externalLinkBaseUrl + '/d/hPvzhrgZz',
            name: 'T9304',
            meta: { title: '分行客户排队平均时长分析-年视图', name: 'T9304' }
          },
          {
            path: externalLinkBaseUrl + '/d/cRXA1lgZz',
            name: 'T9305',
            meta: { title: '分行客户排队平均时长分析-日视图', name: 'T9305' }
          },
          {
            path: externalLinkBaseUrl + '/d/P-d-trRWz',
            name: 'T9306',
            meta: { title: '分行客户排队平均时长分析-月视图', name: 'T9306' }
          },
          {
            path: externalLinkBaseUrl + '/d/BCMAT9RZz',
            name: 'T9307',
            meta: { title: '网点客户排队平均时长分析-年视图', name: 'T9307' }
          },
          {
            path: externalLinkBaseUrl + '/d/qK5kjwRWz',
            name: 'T9308',
            meta: { title: '网点客户排队平均时长分析-日视图', name: 'T9308' }
          },
          {
            path: externalLinkBaseUrl + '/d/VmaNo9RZk',
            name: 'T9309',
            meta: { title: '网点客户排队平均时长分析-月视图', name: 'T9309' }
          }
        ]
      },
      {
        path: '/csServiceTimes',
        // component: Layout,
        redirect: 'noredirect',
        alwaysShow: true,
        meta: { title: '客户服务时长', requireAuth: true },
        children: [
          {
            path: externalLinkBaseUrl + '/d/20ZodsRZk',
            name: 'T9401',
            meta: { title: '全行客户服务平均时长分析-年视图', name: 'T9401' }
          },
          {
            path: externalLinkBaseUrl + '/d/y8QSyyRZk',
            name: 'T9402',
            meta: { title: '全行客户服务平均时长分析-日视图', name: 'T9402' }
          },
          {
            path: externalLinkBaseUrl + '/d/3ULCPsRWk',
            name: 'T9403',
            meta: { title: '全行客户服务平均时长分析-月视图', name: 'T9403' }
          },
          {
            path: externalLinkBaseUrl + '/d/JylYsygZz',
            name: 'T9404',
            meta: { title: '分行客户平均服务时长分析-年视图', name: 'T9404' }
          },
          {
            path: externalLinkBaseUrl + '/d/iRD9UyRWk',
            name: 'T9405',
            meta: { title: '分行客户平均服务时长分析-日视图', name: 'T9405' }
          },
          {
            path: externalLinkBaseUrl + '/d/etG8UygWk',
            name: 'T9406',
            meta: { title: '分行客户平均服务时长分析-月视图', name: 'T9406' }
          },
          {
            path: externalLinkBaseUrl + '/d/hpyT3sRWk',
            name: 'T9407',
            meta: { title: '柜员客户平均服务时长分析-年视图', name: 'T9407' }
          },
          {
            path: externalLinkBaseUrl + '/d/qcz1gURZz',
            name: 'T9408',
            meta: { title: '柜员客户平均服务时长分析-日视图', name: 'T9408' }
          },
          {
            path: externalLinkBaseUrl + '/d/NxTY6ygWk',
            name: 'T9409',
            meta: { title: '柜员客户平均服务时长分析-月视图', name: 'T9409' }
          },
          {
            path: externalLinkBaseUrl + '/d/DxiI3sgWz',
            name: 'T9410',
            meta: { title: '网点客户平均服务时长分析-年视图', name: 'T9410' }
          },
          {
            path: externalLinkBaseUrl + '/d/IgTU_yRZk',
            name: 'T9411',
            meta: { title: '网点客户平均服务时长分析-日视图', name: 'T9411' }
          },
          {
            path: externalLinkBaseUrl + '/d/cBz3CsgZz',
            name: 'T9412',
            meta: { title: '网点客户平均服务时长分析-月视图', name: 'T9412' }
          }
        ]
      },
      {
        path: '/csFlowAnalysis',
        // component: Layout,
        redirect: 'noredirect',
        alwaysShow: true,
        meta: { title: '客户流量分析', requireAuth: true },
        children: [
          {
            path: externalLinkBaseUrl + '/d/hdq1xfgWz',
            name: 'T9501',
            meta: { title: '分行客户流量分析-年视图', name: 'T9501' }
          },
          {
            path: externalLinkBaseUrl + '/d/9S93EpRWk',
            name: 'T9502',
            meta: { title: '分行客户流量分析-日视图', name: 'T9502' }
          },
          {
            path: externalLinkBaseUrl + '/d/2tJWhTgZk',
            name: 'T9503',
            meta: { title: '分行客户流量分析-月视图', name: 'T9503' }
          },
          {
            path: externalLinkBaseUrl + '/d/0E-aLfRZz',
            name: 'T9504',
            meta: { title: '总行客户流量分析-年视图', name: 'T9504' }
          },
          {
            path: externalLinkBaseUrl + '/d/aYWiapgZz',
            name: 'T9505',
            meta: { title: '总行客户流量分析-日视图', name: 'T9505' }
          },
          {
            path: externalLinkBaseUrl + '/d/OsGVmxgWk',
            name: 'T9506',
            meta: { title: '总行客户流量分析-月视图', name: 'T9506' }
          },
          {
            path: externalLinkBaseUrl + '/d/VWMWN-gWz',
            name: 'T9507',
            meta: { title: '柜员客户流量分析-年视图', name: 'T9507' }
          },
          {
            path: externalLinkBaseUrl + '/d/90RefogZk',
            name: 'T9508',
            meta: { title: '柜员客户流量分析-日视图', name: 'T9508' }
          },
          {
            path: externalLinkBaseUrl + '/d/2Xm6zaRZk',
            name: 'T9509',
            meta: { title: '柜员客户流量分析-月视图', name: 'T9509' }
          },
          {
            path: externalLinkBaseUrl + '/d/IzC61fRZk',
            name: 'T9510',
            meta: { title: '网点客户流量分析-年视图', name: 'T9510' }
          },
          {
            path: externalLinkBaseUrl + '/d/1BZzTTRWz',
            name: 'T9511',
            meta: { title: '网点客户流量分析-日视图', name: 'T9511' }
          },
          {
            path: externalLinkBaseUrl + '/d/vq6VAbgZk',
            name: 'T9512',
            meta: { title: '网点客户流量分析-月视图', name: 'T9512' }
          }
        ]
      },
      {
        path: '/authAnalysis',
        // component: Layout,
        redirect: 'noredirect',
        alwaysShow: true,
        meta: { title: '授权统计分析', requireAuth: true },
        children: [
          {
            path: externalLinkBaseUrl + '/d/Yn3r7JzZk',
            name: 'T9601',
            meta: { title: '授权中心统计-年视图', name: 'T9601' }
          },
          {
            path: externalLinkBaseUrl + '/d/eW21fakZk',
            name: 'T9602',
            meta: { title: '授权中心统计-日视图', name: 'T9602' }
          },
          {
            path: externalLinkBaseUrl + '/d/QdPAaazWz',
            name: 'T9603',
            meta: { title: '授权中心统计-月视图', name: 'T9603' }
          }
        ]
      }
    ]
  },
  {
    path: 'warning',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    meta: { title: '预警信息', icon: 'warn', requireAuth: true }
  },
  {
    path: '/examSystem',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    meta: { title: '考培系统', icon: 'example', requireAuth: true },
    children: [
      {
        path: 'T7001',
        name: 'T7001',
        component: () => import('@/views/examSystem/T7001/T7001'),
        meta: { title: '业务知识题库查询维护', name: 'T7001' }
      },
      {
        path: 'T70011',
        name: 'T70011',
        hidden: true,
        component: () => import('@/views/examSystem/T7001/T70011'),
        meta: { title: '业务知识题库新增', requireAuth: true }
      },
      {
        path: 'T70012',
        name: 'T70012',
        hidden: true,
        component: () => import('@/views/examSystem/T7001/T70012'),
        meta: { title: '业务知识题目修改', requireAuth: true }
      },
      {
        path: 'T70013',
        name: 'T70013',
        hidden: true,
        component: () => import('@/views/examSystem/T7001/T70013'),
        meta: { title: '业务知识题目删除', requireAuth: true }
      },
      {
        path: 'T7005',
        name: 'T7005',
        component: () => import('@/views/examSystem/T7005/T7005'),
        meta: { title: '知识试题策略设置', name: 'T7005' }
      },
      {
        path: 'T7006',
        name: 'T7006',
        component: () => import('@/views/examSystem/T7006/T7006'),
        meta: { title: '考试开场设置', name: 'T7006' }
      },
      {
        path: 'T700601',
        name: 'T700601',
        hidden: true,
        component: () => import('@/views/examSystem/T7006/T700601'),
        meta: { title: '考试开场设置', requireAuth: true }
      },
      {
        path: 'T700602',
        name: 'T700602',
        hidden: true,
        component: () => import('@/views/examSystem/T7006/T700602'),
        meta: { title: '考试时间设置', requireAuth: true }
      },
      {
        path: 'T7007',
        name: 'T7007',
        component: () => import('@/views/examSystem/T7007/T7007'),
        meta: { title: '业务知识考试', name: 'T7007' }
      },
      {
        path: 'T7008',
        name: 'T7008',
        component: () => import('@/views/examSystem/T7008/T7008'),
        meta: { title: '考试成绩查询', name: 'T7001' }
      },
      {
        path: 'T70081',
        name: 'T70081',
        hidden: true,
        component: () => import('@/views/examSystem/T7008/T70081'),
        meta: { title: '交易操作详情', requireAuth: true }
      },
      {
        path: 'T70082',
        name: 'T70082',
        hidden: true,
        component: () => import('@/views/examSystem/T7008/T70082'),
        meta: { title: '交易操作详情', requireAuth: true }
      },
      {
        path: 'T70083',
        name: 'T70083',
        hidden: true,
        component: () => import('@/views/examSystem/T7008/T70083'),
        meta: { title: '交易操作考试对比', requireAuth: true }
      },
      {
        path: 'T7009',
        name: 'T7009',
        component: () => import('@/views/examSystem/T7009/T7009'),
        meta: { title: '考试封场处理', name: 'T7009' }
      },
      {
        path: 'T70091',
        name: 'T70091',
        hidden: true,
        component: () => import('@/views/examSystem/T7009/T70091'),
        meta: { title: '考试封场处理详情', requireAuth: true }
      },
      {
        path: 'T7010',
        name: 'T7010',
        component: () => import('@/views/examSystem/T7010/T7010'),
        meta: { title: '考试场次信息查询', name: 'T7010' }
      },
      {
        path: 'T70101',
        name: 'T70101',
        hidden: true,
        component: () => import('@/views/examSystem/T7010/T70101'),
        meta: { title: '考场详情', requireAuth: true }
      },
      {
        path: 'T7011',
        name: 'T7011',
        component: () => import('@/views/examSystem/T7011/T7011'),
        meta: { title: '机打凭条题库录入', name: 'T7011' }
      },
      {
        path: 'T70111',
        name: 'T70111',
        hidden: true,
        component: () => import('@/views/examSystem/T7011/T70111'),
        meta: { title: '机打凭条题库录入', requireAuth: true }
      },
      {
        path: 'T7012',
        name: 'T7012',
        component: () => import('@/views/examSystem/T7012/T7012'),
        meta: { title: '机打凭条题库维护', name: 'T7012' }
      },
      {
        path: 'T7013',
        name: 'T7013',
        component: () => import('@/views/examSystem/T7013/T7013'),
        meta: { title: '文字题库录入', name: 'T7013' }
      },
      {
        path: 'T7014',
        name: 'T7014',
        component: () => import('@/views/examSystem/T7014/T7014'),
        meta: { title: '文字录入题库查询维护', name: 'T7014' }
      },
      {
        path: 'T7029',
        name: 'T7029',
        component: () => import('@/views/examSystem/T7029/T7029'),
        meta: { title: '知识试题策略查询', name: 'T7029' }
      },
      {
        path: 'T70291',
        name: 'T70291',
        hidden: true,
        component: () => import('@/views/examSystem/T7029/T70291'),
        meta: { title: '知识试题策略查询详情', requireAuth: true }
      },
      {
        path: 'T702911',
        name: 'T702911',
        hidden: true,
        component: () => import('@/views/examSystem/T7029/T702911'),
        meta: { title: '知识试题策略查询详情', requireAuth: true }
      },
      {
        path: 'T702912',
        name: 'T702912',
        hidden: true,
        component: () => import('@/views/examSystem/T7029/T702912'),
        meta: { title: '知识试题策略查询详情', requireAuth: true }
      },
      {
        path: 'T702913',
        name: 'T702913',
        hidden: true,
        component: () => import('@/views/examSystem/T7029/T702913'),
        meta: { title: '知识试题策略查询详情', requireAuth: true }
      },
      {
        path: 'T7030',
        name: 'T7030',
        component: () => import('@/views/examSystem/T7030/T7030'),
        meta: { title: '业务知识上传', name: 'T7030' }
      },
      {
        path: 'T7031',
        name: 'T7031',
        component: () => import('@/views/examSystem/T7031/T7031'),
        meta: { title: '业务知识练习', name: 'T7031' }
      },
      {
        path: 'T703101',
        name: 'T703101',
        hidden: true,
        component: () => import('@/views/examSystem/T7031/T703101'),
        meta: { title: '业务练习', requireAuth: true }
      },
      {
        path: 'T703102',
        name: 'T703102',
        hidden: true,
        component: () => import('@/views/examSystem/T7031/T703102'),
        meta: { title: '业务练习', requireAuth: true }
      },
      {
        path: 'T703103',
        name: 'T703103',
        hidden: true,
        component: () => import('@/views/examSystem/T7031/T703103'),
        meta: { title: '业务练习', requireAuth: true }
      },
      {
        path: 'T7032',
        name: 'T7032',
        component: () => import('@/views/examSystem/T7032/T7032'),
        meta: { title: '业务知识模拟考试', name: 'T7032' }
      },
      {
        path: 'T703201',
        name: 'T703201',
        hidden: true,
        component: () => import('@/views/examSystem/T7032/T703201'),
        meta: { title: '业务知识模拟考试', requireAuth: true }
      },
      {
        path: 'T7035',
        name: 'T7035',
        component: () => import('@/views/examSystem/T7035/T7035'),
        meta: { title: '指定试题', name: 'T7035' }
      }
    ]
  },
  {
    path: '运营实时监控',
    redirect: 'noredirect',
    meta: { title: '运营实时监控', icon: 'example', requireAuth: true },
    children: [
      {
        path: externalLinkBaseUrl + '/d/OFtK-Qrmm/jian-kong-da-ping',
        name: 'T9000',
        meta: { title: '运营实时监控-总行', icon: 'link', name: 'T9000' }
      },
      {
        path: externalLinkBaseUrl + '/d/BBUhD-eik/fen-xing-yun-ying-shi-shi-jian-kong',
        name: 'T9001',
        meta: { title: '运营实时监控-分行', icon: 'link', name: 'T9001' }
      },
      {
        path: externalLinkBaseUrl + '/d/-CKlmJkWk/wang-dian-yun-ying-shi-shi-jian-kong',
        name: 'T9002',
        meta: { title: '运营实时监控-网点', icon: 'link', name: 'T9002' }
      },
      {
        path: externalLinkBaseUrl + '/d/4XeH5ssik/pai-dui-tian-dan-quan-xing-shi-tu',
        name: 'T9003',
        meta: { title: '排队填单全行视图', icon: 'link', name: 'T9003' }
      },
      {
        path: externalLinkBaseUrl + '/d/dsdWambiz/pai-dui-tian-dan-wang-dian-shi-tu',
        name: 'T9004',
        meta: { title: '排队填单网点视图', icon: 'link', name: 'T9004' }
      }
    ]
  },
  {
    path: '/test',
    component: Layout,
    redirect: 'noRedirect',
    name: 'excel',
    meta: {
      title: '测试机构管理',
      icon: 'example'
    },
    children: [
      {
        path: 'J0001',
        name: 'J0001',
        component: () => import('@/views/test/J0001/J0001'),
        meta: { title: '测试一号' }
      },
      {
        path: 'J0002',
        name: 'J0002',
        component: () => import('@/views/test/J0002/J0002'),
        meta: { title: '测试二号' }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
