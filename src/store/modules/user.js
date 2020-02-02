// import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
// import { Message } from 'element-ui'

const user = {
  state: {
    token: getToken(),
    userInfo: {},
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      setToken(userInfo)
      commit('SET_TOKEN', userInfo)
    },

    // 获取用户信息
    GetInfo({ commit }, trxList) {
      commit('SET_ROLES', trxList)
    },

    // 登出
    LogOut({ commit, state }) {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      // return new Promise((resolve, reject) => {
      //   logout(state.token).then(() => {
      //     commit('SET_TOKEN', '')
      //     commit('SET_ROLES', [])
      //     removeToken()
      //     resolve()
      //   }).catch(error => {
      //     reject(error)
      //   })
      // })
    },

    // 设置用户信息
    SetUserInfo({ commit }, userInfo) {
      commit('SET_USERINFO', userInfo)
    },
    // 前端 登出
    FedLogOut({ commit }) {
      commit('SET_TOKEN', '')
      removeToken()
    }
  }
}

export default user
