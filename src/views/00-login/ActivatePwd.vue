<template>
  <el-dialog :modal-append-to-body="false" :visible.sync="dialogFormVisible" center title="密码激活" @close="closeDialog">
    <el-form ref="form" :model="form" :rules="pwdRules" :inline="true" class="demo-form-inline" label-width="85px">
      <el-form-item label="用户号:" prop="userNo">
        <el-input v-model="form.userNo" auto-complete="on" disabled name="userNo" type="text"/>
      </el-form-item>
      <!--<el-form-item label="原密码:" prop="oldPwd">-->
      <!--<el-col :lg="6" :md="6" :sm="24" :span="5" :xl="6" :xs="24">-->
      <!--<el-input auto-complete="on" name="oldPwd" type="password" v-model="form.oldPwd"/>-->
      <!--</el-col>-->
      <!--</el-form-item>-->
      <el-form-item label="新密码:" prop="newPwd">
        <el-input :type="pwdType" v-model="form.newPwd" auto-complete="on" name="newPwd"/>
        <span class="show-pwd" @click="showPwd"/>
      </el-form-item>
      <el-form-item label="确认密码:" prop="newPwd2">
        <el-input :type="pwdType" v-model="form.newPwd2" auto-complete="on" name="newPwd2"/>
        <span class="show-pwd" @click="showPwd"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="medium" type="primary" @click="onSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'ActivatePwd',
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
      dialogFormVisible: false,
      form: {
        userNo: '',
        oldPwd: '',
        newPwd: '',
        newPwd2: ''
      },
      pwdType: 'password',
      pwdRules: {
        oldPwd: [{ required: true, trigger: 'blur', validator: validatePass }],
        newPwd: [{ required: true, trigger: 'blur', validator: validatePass }, {
          validator: validateNewPwd1,
          trigger: 'blur'
        }],
        newPwd2: [{ required: true, trigger: 'blur', validator: validatePass }, {
          validator: validateNewPwd2,
          trigger: 'blur'
        }]
      }
    }
  },
  mounted: function() {
    console.log('params : ' + this.$route.params)
    const params = this.$route.params
    if (params) {
      this.dialogFormVisible = true // 显示弹框
      const map = this.$route.params.map
      // 展示表单数据
      this.form.userNo = map
    }
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
      this.$refs.form.validate(valid => {
        if (valid) {
          // let oldPassword = this.$md5((this.form.userNo + this.form.oldPwd))
          const newPassword = this.$md5((this.form.userNo + this.form.newPwd))
          const userPwdMap = { 'userNo': this.form.userNo, 'newPwd': newPassword }
          console.log('userPwdMap =》' + userPwdMap)
          const params = { 'userPwd': JSON.stringify(userPwdMap) }
          this.$http(this.$userMngApi.updatePwd, params).then(res => {
            console.log(res.data)
            const _data = res.data
            // 赋值
            if (_data.code === 'SUCCESS') {
              if (_data.data.TrxCode === '000000') {
                this.dialogFormVisible = false
                this.$router.push({ path: this.redirect || '/login' })
                this.$message({
                  type: 'success',
                  message: '密码激活成功!'
                })
              } else {
                this.$message.error('错误信息 ： ' + _data.data.TrxMessage)
              }
            } else {
              this.$message.error('错误信息 ： ' + _data.message)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    closeDialog() {
      this.$router.push({ path: this.redirect || '/login' })
    }
  }
}
</script>

<style scoped>

</style>
<style>
  @import "../../styles/public.css";
</style>
