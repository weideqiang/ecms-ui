const serviceModule = {
  getTrxNumsOrderInfo: { // 交易量排名
    url: '/user/trxOrder',
    method: 'post'
  },
  getServiceInfo: { // 服务信息
    url: '/user/serviceInfo',
    method: 'post'
  },
  getTop10Trx: { // top10交易
    url: '/user/top10trx',
    method: 'post'
  },
  getTop10TrxDuration: { // top10交易操作时长
    url: '/user/top10trxDuration',
    method: 'post'
  },
  getPeriodTrxNums: { // 历史交易量
    url: '/user/periodTrxNums',
    method: 'post'
  },
  getPeriodServiceNum: { // 历史服务人次
    url: '/user/periodServiceNum',
    method: 'post'
  },
  getPeriodServiceTimes: { // 历史服务时间// 历史服务人次
    url: '/user/periodServiceTimes',
    method: 'post'
  }
}
const userStatisticsApi = { ...serviceModule }

export default userStatisticsApi
