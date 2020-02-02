<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="pwdRules" auto-complete="on" label-width="85px">
      <el-form-item prop="oldPwd" label="原密码:">
        <el-col :span="5" :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
          <el-input v-model="form.oldPwd" name="oldPwd" type="text" auto-complete="on"/>
        </el-col>
      </el-form-item>
      <el-form-item prop="newPwd" label="新密码:">
        <el-col :span="5" :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
          <el-input v-model="form.newPwd" :type="pwdType" name="newPwd" auto-complete="on"/>
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-col>
      </el-form-item>
      <el-form-item prop="newPwd2" label="确认密码:">
        <el-col :span="5" :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
          <el-input v-model="form.newPwd2" :type="pwdType" name="newPwd2" auto-complete="on"/>
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认</el-button>
        <!--<el-button @click="onCancel">取消</el-button>-->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'ResetPwd',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value.length !== 6) {
        callback(new Error('密码只能为6位'))
      } else {
        callback()
      }
    }
    const validateNewPwd1 = (rule, value, callback) => {
      if (value === this.form.oldPwd) {
        callback(new Error('新密码不能与旧密码相同'))
      } else {
        callback()
      }
    }
    const validateNewPwd2 = (rule, value, callback) => {
      if (value !== this.form.newPwd) {
        callback(new Error('两次密码输入不同'))
      } else {
        callback()
      }
    }
    return {
      form: {
        userNo: '',
        oldPwd: '',
        newPwd: '',
        newPwd2: ''
      },
      pwdType: 'password',
      pwdRules: {
        oldPwd: [{ required: true, trigger: 'blur', validator: validatePass }],
        newPwd: [{ required: true, trigger: 'blur', validator: validatePass }, { validator: validateNewPwd1, trigger: 'blur' }],
        newPwd2: [{ required: true, trigger: 'blur', validator: validatePass }, { validator: validateNewPwd2, trigger: 'blur' }]

      }
    }
  },
  created: function() {
    this.$http(this.$userMngApi.getCurUser).then(
      res => {
        this.userNo = res.data.userNo
      },
      error => {
        console.log(error)
      }
    )
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    onSubmit() {
      console.log('res.data.userName => ' + this.userNo)
      this.$refs.form.validate(valid => {
        if (valid) {
          const oldPassword = this.$md5((this.userNo + this.form.oldPwd))
          const newPassword = this.$md5((this.userNo + this.form.newPwd))
          const userPwdMap = { 'userNo': this.userNo, 'oldPwd': oldPassword, 'newPwd': newPassword }
          console.log('userPwdMap =》' + userPwdMap)
          const params = { 'userPwd': JSON.stringify(userPwdMap) }
          this.$http(this.$userMngApi.updatePwd, params).then(res => {
            console.log(res.data)
            const _data = res.data
            // 赋值
            if (_data.code === 'SUCCESS') {
              if (_data.data.TrxCode === '000000') {
                this.$message({
                  type: 'success',
                  message: ' 修改密码成功!'
                })
              } else {
                this.$message.error('错误信息 ：' + _data.data.TrxMessage)
              }
            } else {
              this.$message.error('错误信息 ：' + _data.message)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  $dark_gray:#889aa4;
  .show-pwd {
    position: absolute;
    left: 22%;
    top: 0px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  @media screen and (max-width: 980px) {
    .show-pwd {
      left: 85%;
    }
  }
</style>
