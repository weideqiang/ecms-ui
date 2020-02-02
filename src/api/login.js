import http from '@/commjs/httpAxios'
import userMngApi from '@/commjs/userMngApi.js'

export function login(params) {
  // return request({
  //   url: '/doLogin',
  //   method: 'post',
  //   data: {
  //     username,
  //     password
  //   }
  // })
  return http(userMngApi.doLogin, params)
}

export function getInfo() {
  return http(userMngApi.getUserTrxGp)
}

export function logout() {
  return http(userMngApi.loginOut)
}
