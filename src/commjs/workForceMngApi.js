const serviceModule = {
  addTellerNoInfo: { // 增加
    url: '/workforcemng/addTellerNoInfo',
    method: 'post'
  },
  queryTellerInfo: { // 查询
    url: '/workforcemng/queryTellerInfo',
    method: 'post'
  },
  queryTellerInfoExlrevampVerIft: { // 排班人员设置导出
    url: '/workforcemng/queryTellerInfoExlrevampVerIft',
    method: 'post',
    responseType: 'blob'
  },
  queryTellerInfoVerIft: { // 修改排班人员
    url: '/workforcemng/queryTellerInfoVerIft',
    method: 'post'
  },
  updateTellerInfo: { // 修改
    url: '/workforcemng/updateTellerInfo',
    method: 'post'
  },
  queryStatistics: {
    url: '/workforcemng/queryStatistics',
    method: 'post'
  },
  deleteTellerInfo: { // 删除
    url: '/workforcemng/deleteTellerInfo',
    method: 'post'
  },
  queryStatisticsForFullCalendar: { // 日历
    url: '/workforcemng/queryStatisticsForFullCalendar',
    method: 'post'
  },
  queryStatisticsForExcl: { // 统计导出
    url: '/workforcemng/queryStatisticsForExcl',
    method: 'post',
    responseType: 'blob'
  },
  queryClassInfo: { // 查询班次信息
    url: '/workforcemng/queryClassInfo',
    method: 'post'
  },
  addClassInfo: { // 增加班次信息
    url: '/workforcemng/addClassInfo',
    method: 'post'
  },
  updateClassInfo: { // 修改班次信息
    url: '/workforcemng/updateClassInfo',
    method: 'post'
  },
  deleteClassInfo: { // 删除班次信息
    url: '/workforcemng/deleteClassInfo',
    method: 'post'
  },
  revampVerIft: { // 校验班次信息
    url: '/workforcemng/revampVerIft',
    method: 'post'
  }
}

const workForceMngApi = { ...serviceModule }

export default workForceMngApi
