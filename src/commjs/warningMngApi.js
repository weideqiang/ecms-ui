const serviceModule11 = {
  getWarnTrxData: {
    url: '/warn/getWarnTrxData',
    method: 'post'
  },
  getWarnTrxData01: {
    url: '/warn/getWarnTrxData01',
    method: 'post'
  },
  updStatus: {
    url: '/warn/updStatus',
    method: 'post'
  }
}
const warningMngApi = { ...serviceModule11 }
export default warningMngApi
