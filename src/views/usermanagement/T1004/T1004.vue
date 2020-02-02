<template>
  <div class="app-container">
    <el-form ref="form" :model="userForm" :rules="userRules" auto-complete="on" label-width="85px" class="ecms-trx-search" label-position="left">
      <el-form-item label="用户号:" prop="userNo">
        <el-col :lg="6" :md="6" :sm="24" :span="5" :xl="6" :xs="24">
          <el-input v-model="userForm.userNo" auto-complete="on" name="userNo" type="text" clearable/>
        </el-col>
      </el-form-item>
      <el-form-item label="用户名称:" prop="userName">
        <el-col :lg="6" :md="6" :sm="24" :span="5" :xl="6" :xs="24">
          <el-input v-model="userForm.userName" auto-complete="on" disabled name="userName" type="text" clearable/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :lg="6" :md="6" :sm="24" :span="5" :xl="6" :xs="24">
          <el-button type="primary" @click="onSubmit">确认</el-button>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'T1004',
  data() {
    const validateUserNo = (rule, value, callback) => {
      if (value.length > 10 && value.length > 0) {
        callback(new Error('用户号不能超过10位'))
        this.userForm.userName = ''
      } else {
        callback()
      }
    }
    const validateUserNo1 = (rule, value, callback) => {
      if (!value) {
        callback(new Error('用户号不能为空'))
        return
      }
      if (this.userForm.userNo === this.userNo) {
        callback(new Error('用户不能给本人强制签退'))
        return
      }
      const inputForm = { 'userNo': value }
      console.log('inputForm : ' + JSON.stringify(inputForm))
      const params = { 'inputForm': JSON.stringify(this.userForm) }
      this.$http(this.$userMngApi.getUserBaseInfo, params).then(// 通讯后台查询数据库中用户信息
        res => {
          console.log(res)
          const resdata = res.data
          if (resdata.code === 'SUCCESS') {
            if (resdata.data.TrxCode === '000000') {
              // 赋值
              const data = JSON.parse(JSON.stringify(resdata.data.PageInfo.list))
              // 赋值
              console.log('data => ', data)
              if (data !== '' && data.length !== 0) {
                console.log(data[0].userName)
                // 赋值
                this.userForm.userName = data[0].userName
                callback()
              }
            } else {
              this.$message.error('错误信息 : ' + resdata.data.TrxMessage)
            }
          } else {
            this.$message.error('错误信息 : ' + res.data.message)
          }
        }
      )
    }
    return {
      userNo: '',
      userForm: {
        userNo: '',
        userName: ''
      },
      userRules: {
        userNo: [{ required: true, trigger: 'blur', validator: validateUserNo },
          { validator: validateUserNo1, trigger: 'blur' }]
      }
    }
  },
  created: function() {
    this.$http(this.$userMngApi.getCurUser).then(
      res => {
        this.username = res.data.userName
        this.userNo = res.data.userNo
      },
      error => {
        console.log(error)
      }
    )
  },
  methods: {
    onSubmit: function() { // 提交
      this.$refs.form.validate(valid => {
        if (valid) {
          if (!this.userForm.userNo) {
            this.$message.error('用户号不能为空')
            return
          }
          if (this.userForm.userNo === this.userNo) {
            this.$message.error('用户不能给本人强制签退')
            return
          }
          const user = { 'userNo': this.userForm.userNo }
          const params = { 'user': JSON.stringify(user) }
          console.log('user : ' + JSON.stringify(params))
          this.$http(this.$userMngApi.updateUserStatus, params).then( // 通讯后台查询数据库中用户信息
            res => {
              const resdata = res.data
              if (resdata.code === 'SUCCESS') {
                if (resdata.data.TrxCode === '000000') {
                  // 赋值
                  this.$message({
                    type: 'success',
                    message: '强制签退成功!'
                  })
                } else {
                  this.$message.error('错误信息 : ' + resdata.data.TrxMessage)
                }
              } else {
                this.$message.error('错误信息 : ' + res.data.message)
              }
            })
        } else {
          // this.$message('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
<style>
  @import "../../../styles/public.css";
</style>
