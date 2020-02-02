const serviceModule = {
  // 客户单证领取、收回登记簿
  getCustdocRegister: { // 查询
    url: '/registerBook/getCustdocRegister',
    method: 'post'
  },
  addCustdocRegister: { // 登记
    url: '/registerBook/addCustdocRegister',
    method: 'post'
  },
  updateCustdocRegister: { // 领取
    url: '/registerBook/updateCustdocRegister',
    method: 'post'
  },
  getCustomCreation: { // 企业开户资料交接登记查询
    url: '/registerBook/getCustomCreation',
    method: 'post'
  },
  addCUSTOMERCREATION: { // 上门核实或面签登记
    url: '/registerBook/addCUSTOMERCREATION',
    method: 'post'
  },
  updateCUSTOMERCREATION: { // 上门核实或面签更新
    url: '/registerBook/updateCUSTOMERCREATION',
    method: 'post'
  },
  updateCUSTOMERCREATION_SUBMITDATA: { // 企业预约开户报送资料
    url: '/registerBook/updateCUSTOMERCREATION_SUBMITDATA',
    method: 'post'
  },
  updateCUSTOMERCREATION_INFORM: { // 通知客户登记
    url: '/registerBook/updateCUSTOMERCREATION_INFORM',
    method: 'post'
  },
  updateCUSTOMERCREATION_GETBACK: { // 领回开户许可证登记
    url: '/registerBook/updateCUSTOMERCREATION_GETBACK',
    method: 'post'
  },
  updateCUSTOMERCREATION_RECEIVE: { // 领回开户许可证登记
    url: '/registerBook/updateCUSTOMERCREATION_RECEIVE',
    method: 'post'
  },
  getDataXR_USER_WORKNOTE: { // 委派会计经理工作登记簿-签到查询
    url: '/registerBook/getDataXR_USER_WORKNOTE',
    method: 'post'
  },
  insertXR_USER_WORKNOTE: { // 委派会计经理工作登记簿-签到登记
    url: '/registerBook/insertXR_USER_WORKNOTE',
    method: 'post'
  },
  updateXR_USER_WORKNOTE: { // 委派会计经理工作登记簿-签退更新
    url: '/registerBook/updateXR_USER_WORKNOTE',
    method: 'post'
  },
  getXR_PIS_SIGNINFO_REGISTER: { // 签约信息登记簿-查询
    url: '/registerBook/getXR_PIS_SIGNINFO_REGISTER',
    method: 'post'
  },
  getXR_AUDIT_PAYVERIFICATION: { // 大额付款查证登记簿-查询
    url: '/registerBook/getXR_AUDIT_PAYVERIFICATION',
    method: 'post'
  },
  getXR_AUDIT_BIGAMOUNT: { // 大额存取款登记簿-查询
    url: '/registerBook/getXR_AUDIT_BIGAMOUNT',
    method: 'post'
  },
  getXR_PIS_ENTRYEXIT_REGISTER: { // 出入库房人员登记簿-查询
    url: '/registerBook/getXR_PIS_ENTRYEXIT_REGISTER',
    method: 'post'
  },
  getXR_PIS_ACCOUNTANTFILE_REGISTER: { // 会计档案登记簿-查询
    url: '/registerBook/getXR_PIS_ACCOUNTANTFILE_REGISTER',
    method: 'post'
  },
  getXR_PIS_DAYOVER_REGISTER: { // 封包交接登记簿-查询
    url: '/registerBook/getXR_PIS_DAYOVER_REGISTER',
    method: 'post'
  },
  getXR_PIS_HMTACCOUNT_REGISTER: { // 港澳台居民开销户登记簿-账户查询
    url: '/registerBook/getXR_PIS_HMTACCOUNT_REGISTER',
    method: 'post'
  },
  insertXR_PIS_SIGNINFO_REGISTER1: { // 签约信息登记簿-签约/解约
    url: '/registerBook/insertXR_PIS_SIGNINFO_REGISTER1',
    method: 'post'
  },
  insertXR_AUDIT_PAYVERIFICATION: { // 大额付款联系查证登记簿-登记
    url: '/registerBook/insertXR_AUDIT_PAYVERIFICATION',
    method: 'post'
  },
  insertXR_AUDIT_BIGAMOUNT: { // 大额存取款登记簿-登记
    url: '/registerBook/insertXR_AUDIT_BIGAMOUNT',
    method: 'post'
  },
  insertXR_PIS_ENTRYEXIT_REGISTER: { // 出入库房人员登记簿-登记
    url: '/registerBook/insertXR_PIS_ENTRYEXIT_REGISTER',
    method: 'post'
  },
  insertXR_PIS_ACCOUNTANTFILE_REGISTER: { // 会计档案登记簿-登记
    url: '/registerBook/insertXR_PIS_ACCOUNTANTFILE_REGISTER',
    method: 'post'
  },
  insertXR_PIS_DAYOVER_REGISTER: { // 封包交接登记簿-登记
    url: '/registerBook/insertXR_PIS_DAYOVER_REGISTER',
    method: 'post'
  },
  getRESIDEPERMIT01: {
    url: '/registerBook/getRESIDEPERMIT01',
    method: 'post'
  }
}

const registerBookApi = { ...serviceModule }

export default registerBookApi
