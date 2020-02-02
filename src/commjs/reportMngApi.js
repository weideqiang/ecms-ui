const serviceModule = {
  getAllBankTrxAvgTime: { // 全行交易平均时间（日报表）
    url: '/reportmng/getAllBankTrxAvgTime',
    method: 'post'
  },
  getAllBankTrxMonthAvgTime: { // 全行交易平均时间（月报表）
    url: '/reportmng/getAllBankTrxMonthAvgTime',
    method: 'post'
  },
  getBrnoTrxAvgTime: { // 指定机构交易平均时间日报表
    url: '/reportmng/getBrnoTrxAvgTime',
    method: 'post'
  },
  getBrnoTrxMonthAvgTime: { // 指定机构交易平均时间月报表
    url: '/reportmng/getBrnoTrxMonthAvgTime',
    method: 'post'
  },
  getTrlTrxAvgMongthTime: { // 柜员交易平均时间月报表
    url: '/reportmng/getTrlTrxAvgMongthTime',
    method: 'post'
  },
  getTlrWorkTime: { // 网点柜员饱和度日报表
    url: '/reportmng/getTlrWorkTime',
    method: 'post'
  },
  getTableData: { // 机构代码、交易日期、交易代码、查询表数据
    url: '/reportmng/getTableData',
    method: 'post'
  },
  driveTableDataExl: { // 机构代码、交易日期、交易代码、查询表数据
    url: '/reportmng/driveTableDataExl',
    method: 'post',
    responseType: 'blob'
  },
  getAllbankTrxAvgTime: { // 机构代码、交易日期、交易代码、查询折线图信息
    url: '/reportmng/getAllbankTrxAvgTime',
    method: 'post'
  },
  downLoadExl: { // 机构代码、交易日期、交易代码、查询表数据
    url: '/reportmng/downLoadExl',
    method: 'post',
    responseType: 'blob'
  },
  getAllBankTrxMonthAvgTimeTB: { // 机构代码、交易月份、查询折线图信息
    url: '/reportmng/getAllBankTrxMonthAvgTimeTB',
    method: 'post'
  },
  queryBrnoTrxAvgTimeTlr: { // 机构代码、交易日期、交易代码、查询折线图信息
    url: '/reportmng/queryBrnoTrxAvgTimeTlr',
    method: 'post'
  },
  queryBrnoTrxAvgTimedb: { // 机构代码、交易月份、查询折线图信息
    url: '/reportmng/queryBrnoTrxAvgTimedb',
    method: 'post'
  },
  queryBrnoTrxMonthAvgTimedb: { // 机构代码、交易日期、交易代码、查询折线图信息
    url: '/reportmng/queryBrnoTrxMonthAvgTimedb',
    method: 'post'
  },
  addTellerNoInfo: { // 机构代码、交易日期、交易代码、查询折线图信息
    url: '/workforcemng/addTellerNoInfo',
    method: 'post'
  },
  queryTellerInfo: { // 机构代码、交易日期、交易代码、查询折线图信息
    url: '/workforcemng/queryTellerInfo',
    method: 'post'
  },
  schedulingDetailsInsert: { // 通过月份增加排班信息
    url: '/workforcemng/schedulingDetailsInsert',
    method: 'post'
  },
  queryschedulingDetailsInfo: { // 通过月份查询排班信息
    url: '/workforcemng/queryschedulingDetailsInfo',
    method: 'post'
  },
  styleClass: { // 进行排班列表染色
    url: '/workforcemng/styleClass',
    method: 'post'
  },
  queryschedulingDetailsExl: {
    url: '/workforcemng/queryschedulingDetailsExl',
    method: 'post',
    responseType: 'blob'
  },
  queryschedulingDetailsExlrevampVerIft: {
    url: '/workforcemng/queryschedulingDetailsExlrevampVerIft',
    method: 'post',
    responseType: 'blob'
  },
  getBusinessListingTableData: { // 业务清单报表
    url: '/reportmng/getBusinessListingTableData',
    method: 'post'
  },
  BusinessListingTableDataExl: { // 业务清单报表导出
    url: '/reportmng/BusinessListingTableDataExl',
    method: 'post',
    responseType: 'blob'
  },
  getXRPISDEPOSITREGISTER: { // 存款查询登记簿
    url: '/registerBook/getXRPISDEPOSITREGISTER',
    method: 'post'
  },
  insertXRPISDEPOSITREGISTER: { // 存款查询登记簿登记
    url: '/registerBook/insertXRPISDEPOSITREGISTER',
    method: 'post'
  },
  getXRPISCERTSALEREGISTER: { // 重要空白凭证出售登记簿查询
    url: '/registerBook/getXRPISCERTSALEREGISTER',
    method: 'post'
  },
  insertXRPISCERTSALEREGISTER: { // 重要空白凭证出售登记簿
    url: '/registerBook/insertXRPISCERTSALEREGISTER',
    method: 'post'
  },
  getXRPISHANDOVERREGISTER1: { // 交接登记簿查询
    url: '/registerBook/getXRPISHANDOVERREGISTER1',
    method: 'post'
  },
  insertXRPISHANDOVERREGISTER1: { // 交接登记簿登记
    url: '/registerBook/insertXRPISHANDOVERREGISTER1',
    method: 'post'
  },
  getXRPISPAYROLLREGISTER: { // 代发工资登记簿查询
    url: '/registerBook/getXRPISPAYROLLREGISTER',
    method: 'post'
  },
  getXRPISCUSTACCMONEYREGISTER: { // 客户存取款差错登记簿查询
    url: '/registerBook/getXRPISCUSTACCMONEYREGISTER',
    method: 'post'
  },
  getXRPISSTAMPKEEPINGREGISTER2: { // 重要印章（秘钥、卡、具）保管使用登记簿查询
    url: '/registerBook/getXRPISSTAMPKEEPINGREGISTER2',
    method: 'post'
  },
  getXRPISBILLHANDOVERREGISTER: { // 票据交接登记簿查询
    url: '/registerBook/getXRPISBILLHANDOVERREGISTER',
    method: 'post'
  },
  getXRPISCHECKREGISTER: { // 检查登记簿查询
    url: '/registerBook/getXRPISCHECKREGISTER',
    method: 'post'
  },
  getXRPISCOUNTERFEITREGISTER: { // 假币收缴代保管登记簿查询
    url: '/registerBook/getXRPISCOUNTERFEITREGISTER',
    method: 'post'
  },
  getXRPISNETWORKCHECKREGISTER2: { // 联网核查身份信息登记簿查询
    url: '/registerBook/getXRPISNETWORKCHECKREGISTER2',
    method: 'post'
  },
  insertXRPISPAYROLLREGISTER: {
    url: '/registerBook/insertXRPISPAYROLLREGISTER',
    method: 'post'
  },
  insertXRPISCUSTACCMONEYREGISTER: {
    url: '/registerBook/insertXRPISCUSTACCMONEYREGISTER',
    method: 'post'
  },
  insertXRPISBILLHANDOVERREGISTER: {
    url: '/registerBook/insertXRPISBILLHANDOVERREGISTER',
    method: 'post'
  },
  insertXRPISCHECKREGISTER1: {
    url: '/registerBook/insertXRPISCHECKREGISTER1',
    method: 'post'
  },
  insertXRPISNETWORKCHECKREGISTER3: {
    url: '/registerBook/insertXRPISNETWORKCHECKREGISTER3',
    method: 'post'
  },
  insertXRPISSTAMPHANDOVERREGISTER3: {
    url: '/registerBook/insertXRPISSTAMPHANDOVERREGISTER3',
    method: 'post'
  },
  insertXRPISCOUNTERFEITREGISTER: {
    url: '/registerBook/insertXRPISCOUNTERFEITREGISTER',
    method: 'post'
  },
  getxrEFBRANCH: {
    url: '/registerBook/getxrEFBRANCH',
    method: 'post'
  },
  getxrEFBRANCH1: {
    url: '/registerBook/getxrEFBRANCH',
    method: 'post'
  }
}
const reportMngApi = { ...serviceModule }

export default reportMngApi
