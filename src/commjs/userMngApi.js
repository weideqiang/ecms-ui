const serviceModule = {
  doLogin: { // 登录
    url: '/doLogin',
    method: 'post'
  },
  loginOut: { // 签退
    url: '/loginOut',
    method: 'post'
  },
  updatePwd: { // 修改密码
    url: '/updatePwd',
    method: 'post'
  },
  getCurUser: {
    url: '/user/curuser',
    method: 'get'
  },

  getUserBaseInfo: {
    url: '/userManage/getUserBaseInfo',
    method: 'post'
  },
  addUserBaseInfo: {
    url: '/userManage/addUserBaseInfo',
    method: 'post'
  },
  updateUserBaseInfo: {
    url: '/userManage/updateUserBaseInfo',
    method: 'post'
  },
  deleteUserBaseInfo: {
    url: '/userManage/deleteUserBaseInfo',
    method: 'post'
  },
  getRoleBaseInfo: {
    url: '/userManage/getRoleBaseInfo',
    method: 'post'
  },
  addRoleBaseInfo: {
    url: '/userManage/addRoleBaseInfo',
    method: 'post'
  },
  updateRoleBaseInfo: {
    url: '/userManage/updateRoleBaseInfo',
    method: 'post'
  },
  deleteRoleBaseInfo: {
    url: '/userManage/deleteRoleBaseInfo',
    method: 'post'
  },
  updateUserPwd: {
    url: '/userManage/updateUserPwd',
    method: 'post'
  },
  updateUserStatus: { // 强制签退
    url: '/userManage/updateUserStatus',
    method: 'post'
  },
  addTrxByRole: { // 增加角色下挂交易
    url: '/userManage/addTrxByRole',
    method: 'post'
  },
  deleteTrxByRole: { // 根据角色编号和交易码删除角色下挂交易
    url: '/userManage/deleteTrxByRole',
    method: 'post'
  },
  getTrxByRoleNo: { // 根据角色编号查询角色下挂交易
    url: '/userManage/getTrxByRoleNo',
    method: 'post'
  },
  getUserTrx: { // 获取用户交易权限
    url: '/user/getUserTrxList',
    method: 'post'
  },
  addUserRoleRelation: { // 增加柜员下挂角色
    url: '/userManage/addUserRoleRelation',
    method: 'post'
  },
  deleteUserRoleRelation: { // 根据用户号和角色编号删除下挂角色
    url: '/userManage/deleteUserRoleRelation',
    method: 'post'
  },
  getUserRoleRelation: { // 根据用户号查询下挂角色
    url: '/userManage/getUserRoleRelation',
    method: 'post'
  },
  getUserInfo: {
    url: '/user/getUserInfo',
    method: 'post'
  },
  selectEcms_roleInfo: {
    url: '/user/selectEcms_roleInfo',
    method: 'post'
  }

}
const userMngApi = { ...serviceModule }

export default userMngApi
