<template>
  <div class="login-container">
    <div class="login-page">
      <h2 class="title" style="margin-bottom: 20px">数字化运营管理平台</h2>
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        label-position="left"
        label-width="65px"
        status-icon>
        <!--<img height="48" src="../../assets/LoginLogo.png" style="vertical-align:middle" width="200">-->
        <el-form-item prop="username" label="用户号">
          <el-input
            :disabled="disabledUserNo"
            v-model="loginForm.username"
            autofocus
            auto-complete="off"
            placeholder="请输入用户号"
            type="text"/>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input ref="passWord" :disabled="disabledUserPwd" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码" type="password"/>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" class="login-button" type="primary" @click="login()">登录</el-button>
        </el-form-item>
      <!--<el-form-item>-->
      <!--<el-button class="logout-button" @click="logout()">退出</el-button>-->
      <!--</el-form-item>-->
      </el-form>
    </div>
    <el-row>
      <router-view/>
    </el-row>
  </div>
</template>

<script>
const Base64 = require('js-base64').Base64
export default {
  name: 'Login',
  directives: {
    focus: {
      // 指令的定义
      inserted: function(el, { value }) {
        if (value) {
          el.focus()
        }
      }
    }
  },
  data() {
    const validateUserNo = (rule, value, callback) => {
      const inputForm = { 'userNo': value }
      // const params = { 'inputForm': JSON.stringify(inputForm) }
      console.log(this.$userMngApi.getUserInfo)
      this.$http(this.$userMngApi.getUserInfo, inputForm).then(// 通讯后台查询数据库中用户信息
        res => {
          const resData = res.data
          if (resData.data.TrxCode !== '000000') {
            callback(new Error(resData.data.TrxMessage))
          }
          const userInfo = resData.data.TrxData
          this.$store.dispatch('SetUserInfo', userInfo)
          callback()
        }
      )
    }
    return {
      CurrentUserPwd: '', // 柜员密码
      base64EncodeUrlParams: '', // 加密url参数
      disabledUserNo: false,
      disabledUserPwd: false,
      hrefUrlA: '',
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, message: '请输入用户号', trigger: 'blur' },
          { min: 1, max: 10, message: '用户号不能超过10位', trigger: 'blur' },
          { trigger: 'blur', validator: validateUserNo }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 26, message: '密码只能为6位', trigger: 'blur' }]
      },
      loading: false
      // checked: false
    }
  },
  mounted: function() {
    const url = window.location.href
    const start = url.indexOf('?')
    const end = url.indexOf('#')
    if (start !== -1 && end !== -1) {
      this.base64EncodeUrlParams = Base64.decode(window.location.href.substring(start + 1, end))
      if ((this.base64EncodeUrlParams.indexOf('userNo') !== -1)) { // 单点登录
        if (this.CurrentUserPwd === '') {
          const userNo = this.base64EncodeUrlParams.split('?')[0].split('=')[1]
          // const roleNo = base64EncodeParams.split('?')[1].split('=')[1]
          if (url.indexOf('2Fdashboard') === -1) {
            this.loginForm.username = userNo
            this.loginForm.password = ''
            this.disabledUserNo = true
            this.disabledUserPwd = false
            this.$refs.passWord.focus()
          } else {
            this.loginForm.username = userNo
            this.loginForm.password = '******'
            this.disabledUserNo = true
            this.disabledUserPwd = true
            const inputForm = { 'userno': userNo }
            this.$http(this.$systemPublicApi.getUserPwd, inputForm)
              .then(
                res => {
                  this.CurrentUserPwd = res.data.CurrentUserPwd
                  this.login()
                })
          }
        }
      }
    }
  },
  methods: {
    login: function() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          if (!this.loginForm.username) {
            this.$alert('用户号不能为空')
            return
          }
          if (!this.loginForm.password) {
            this.$alert('密码不能为空')
            return
          }
          this.loading = true
          const password = this.base64EncodeUrlParams.indexOf('userNo') === -1
            ? this.$md5((this.loginForm.username + this.loginForm.password))
            : (window.location.href.indexOf('2Fdashboard') === -1 ? this.$md5((this.loginForm.username + this.loginForm.password)) : this.CurrentUserPwd + 'EFC')
          const params = { 'userNo': this.loginForm.username, 'password': password }
          this.$http(this.$userMngApi.doLogin, params).then(
            res => {
              console.log(res.data)
              // if (res.data.code !== 'SUCCESS') {
              //   this.loading = false
              //   this.$message.error('错误信息 ： ' + res.data.message)
              //   return
              // }
              const _data = res.data.data
              if (_data.TrxCode !== '000000') {
                if (_data.TrxCode === 'Login_003') { // 密码为初始状态联动修改密码
                  this.$router.push({
                    path: this.redirect || '/ActivatePwd',
                    name: 'ActivatePwd',
                    params: {
                      map: this.loginForm.username
                    }
                  })
                  this.loading = false
                  return
                }
                this.$message.error('错误信息 ： ' + _data.TrxMessage)
                this.loading = false
                return
              }
              this.$store.dispatch('Login', this.loginForm)
              this.loading = false
              this.$router.push({ path: this.redirect || '/' })
            },
            error => {
              console.log(error)
              this.loading = false
            }
          )
        }
      })
    }
  }
}
</script>

<style scoped>
  .login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    background: url('../../assets/loginbg.jpg') no-repeat;
    background-size: 100% 100%;
  }

  .login-page {
    -webkit-border-radius: 5px;
    border-radius: 7px;
    margin: 350px 100px auto auto;
    width: 350px;
    padding: 16px 35px 15px;
    /*background: #FFF;*/
    border: 1px solid #C7CBCE;
    box-shadow: 0 0 16px #fff;
  }

  .title {
    font-weight: bold;
    letter-spacing: 2px;
    /*color: #8adaff;*/
    text-align: center;
  }

  .el-form-item {
    margin-bottom: 22px;
    margin-left: 10px;
    color: #3e6991;
  }
  @media screen and (max-width: 980px) {
    .login-container{
      height: 100%;
      width: 100%;
      background: url('../../assets/logmb.png') no-repeat;
    }
    .login-page{
      margin: 60% 2.5% auto auto;
    }
  }
</style>

<style>
  .login-button {
    width: 203px;
    border-radius: 0px !important;
    background-color: #D80C18 !important;
  }
</style>
