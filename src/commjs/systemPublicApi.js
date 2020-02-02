const serviceModule11 = {
  getSystemPublicInfo: {
    url: '/systemPublic/getSystemPublicInfo',
    method: 'post'
  },
  getBranchLevel: {
    url: '/systemPublic/getBranchLevel',
    method: 'post'
  },
  getUserPwd: {
    url: '/systemPublic/getUserPwd',
    method: 'post'
  },
  minuteAddMinute: {
    url: '/systemPublic/minuteAddMinute',
    method: 'post'
  }
}
const systemPublicApi = { ...serviceModule11 }
export default systemPublicApi
