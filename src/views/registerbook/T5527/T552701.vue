<template>
  <el-main>
    <div>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        class="demo-form-inline"
        label-width="100px"
        size="small">
        <hr>
        <br>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="ruleForm.signDateLabelName" style="width: 80%;" prop="signDate">
              <el-input :disabled="true" v-model="ruleForm.signDate" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="ruleForm.signTimeLabelName" style="width: 80%;" prop="signTime">
              <el-input :disabled="true" v-model="ruleForm.signTime" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="ruleForm.tellerNoLabel" style="width: 80%;" prop="tellerNo">
              <el-input :disabled="true" v-model="ruleForm.tellerNo" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="ruleForm.tellerNoNameLabel" style="width: 80%;" prop="tellerNoName">
              <el-input :disabled="true" v-model="ruleForm.tellerNoName" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="ruleForm.branchNoLabel" style="width: 80%;" prop="branchNo">
              <el-input :disabled="true" v-model="ruleForm.branchNo" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="ruleForm.branchNameLabel" style="width: 80%;" prop="branchName">
              <el-input :disabled="true" v-model="ruleForm.branchName" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <hr>
        <el-row>
          <el-col :span="8">
            <el-form-item label="授权员" style="width: 80%;" prop="authNo">
              <el-input ref="AuthNo" :disabled="false" v-model="ruleForm.authNo" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="密码" style="width: 80%;" prop="authPwd">
              <el-input ref="AuthPwd" :disabled="false" v-model="ruleForm.authPwd" type="password" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="dialog-footer" style="width: 92%;" align="right">
        <el-row>
          <el-col :span="8">
            <el-button size="medium" type="primary" @click="exitTrade()">{{ '退出' }}</el-button>
          </el-col>
          <el-col :span="8">
            <el-button size="medium" type="primary" @click="submitForm()">{{ '提交' }}</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </el-main>
</template>

<script>
import { mapGetters } from 'vuex'
import { DateTime } from '../../../commjs/common'
export default {
  name: 'T552701',
  components: { DateTime },
  data() {
    const validateAuthNo = (rule, value, callback) => {
      if (value !== '006416' && this.ruleForm.authNo !== '') { // 暂时屏蔽006416
        if (this.ruleForm.authNo === this.CurrentUserNo) {
          callback(new Error('授权人不能为当前操作柜员!'))
          this.$refs.AuthNo.focus()
          this.$refs.AuthNo.clear()
        }
      }
    }
    const validateAuthPwd = (rule, value, callback) => {
      if (value !== '' && this.ruleForm.authPwd !== '') {
        if (this.ruleForm.authNo === this.CurrentUserNo) {
          const password = this.$md5((this.ruleForm.authNo + this.ruleForm.authPwd))
          const params = { 'userNo': this.ruleForm.authNo, 'password': password }
          this.$http(this.$userMngApi.doLogin, params).then(
            res => {
              const _data = res.data.data
              if (_data.TrxCode !== '000000') {
                this.$message.error('错误信息 ： ' + _data.TrxMessage)
                this.$refs.AuthPwd.focus()
                this.$refs.AuthPwd.clear()
                return
              }
            },
            error => {
              console.log(error)
            })
        }
      }
    }
    return {
      ruleForm: {
        signDateLabelName: '日期',
        signDate: '', // 签到日期
        signTimeLabelName: '时间',
        signTime: '', // 签到时间
        operationType: '', // 操作类型
        tellerNoName: '', // 柜员姓名
        tellerNoNameLabel: '柜员姓名',
        tellerNo: '', // 柜员号
        tellerNoLabel: '柜员号',
        branchNo: '', // 机构号
        branchNoLabel: '机构号',
        branchName: '', // 机构名称
        branchNameLabel: '机构名称',
        authNo: '',
        authPwd: ''
      },
      rules: {
        authNo: [
          { required: true, message: '请输入用户号', trigger: 'blur' },
          { min: 1, max: 10, message: '用户号不能超过10位', trigger: 'blur' },
          { trigger: 'blur', validator: validateAuthNo }
        ],
        authPwd: [{ required: false, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 6, message: '密码只能为6位', trigger: 'blur' },
          { trigger: 'blur', validator: validateAuthPwd }]
      },
      operationTypeFlag: '', // 交易类别
      CurrentUserNo: '', // 初始化-当前柜员号
      CurrentUserName: '', // 初始化-当前柜员名称
      CurrentBranchNo: '', // 初始化-当前机构号
      CurrentBranchName: '', // 初始化-当前机构名称
      CurrentZoneNo: '', // 初始化-当前地区号
      CurrentSystemDate: '', // 初始化-当前系统日期
      CurrentSystemTime: '', // 当前系统时间
      operationTypes5527: this.$combo.tradeTypes5527
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    device() { // 获取客户端类型
      return this.$store.state.app.device
    }
  },
  mounted: function() { // 初始化或跳转返回调用
    if (this.CurrentSystemDate === '') { // 进行初始化操作
      this.$http(this.$systemPublicApi.getSystemPublicInfo)
        .then(
          res => {
            console.log('tradeINit--start--' + JSON.stringify(res.data))
            this.CurrentUserNo = res.data.CurrentUserNo
            this.CurrentUserName = res.data.CurrentUserName
            this.CurrentBranchNo = res.data.CurrentBranchNo
            this.CurrentBranchName = res.data.CurrentBranchName
            this.CurrentZoneNo = res.data.CurrentZoneNo
            this.CurrentSystemDate = res.data.CurrentSystemDate
            const params = this.$route.params
            if (params) {
              this.operationTypeFlag = this.$route.params.__CPFlag__
              console.log('--552701operationTypeFlag---' + this.operationTypeFlag)
              this.ruleForm.signDate = this.CurrentSystemDate
              this.ruleForm.signTime = new DateTime().getTimeWithSep()
              this.ruleForm.tellerNo = this.CurrentUserNo
              this.ruleForm.tellerNoName = this.CurrentUserName
              this.ruleForm.branchNo = this.CurrentBranchNo
              this.ruleForm.branchName = this.CurrentBranchName
              if (this.operationTypeFlag === '0') { // 签到
                this.ruleForm.signDateLabelName = '签到日期'
                this.ruleForm.signTimeLabelName = '签到时间'
                this.ruleForm.tellerNoLabel = '签到柜员号'
                this.ruleForm.tellerNoNameLabel = '签到柜员姓名'
                this.ruleForm.branchNoLabel = '签到机构号'
                this.ruleForm.branchNameLabel = '签到机构名称'
              } else {
                this.ruleForm.signDateLabelName = '签退日期'
                this.ruleForm.signTimeLabelName = '签退时间'
                this.ruleForm.tellerNoLabel = '签退柜员号'
                this.ruleForm.tellerNoNameLabel = '签退柜员姓名'
                this.ruleForm.branchNoLabel = '签退机构号'
                this.ruleForm.branchNameLabel = '签退机构名称'
              }
            }
          })
    }
  },
  methods: {
    exitTrade() { // 交易退出返回首页
      this.$router.push({
        path: this.redirect || '/dashboard'
      })
    },
    submitForm() { // 提交
      if (this.operationTypeFlag === '0') { // 签到
        const map = {
          'tradedate': this.CurrentSystemDate,
          'checkintime': new DateTime().getTime(),
          'checkouttime': '',
          'inbranchno': this.CurrentBranchNo,
          'inbranchname': this.CurrentBranchName,
          'outbranchno': '',
          'userno': this.CurrentUserNo,
          'username': this.CurrentUserName,
          'data1': '',
          'data2': '',
          'data3': '',
          'inphoto': 'in',
          'outphoto': '',
          'imageid': ''
        }
        const params = { 'ruleForm': JSON.stringify(map) }
        const url = this.$registerBookApi.insertXR_USER_WORKNOTE
        this.$http(url, params).then( // 通讯后台修改数据库中信息
          res => {
            const _data = res.data
            console.log('T552701--insertXR_USER_WORKNOTE---' + JSON.stringify(res.data))
            // 赋值
            if (_data.code === 'SUCCESS') {
              if (_data.data.TrxCode === '000000') {
                this.messageSuccess('签到成功!   流水号' + _data.data._MAINLSH_)
                return
              } else {
                if (_data.data.TrxCode === 'T5527_001') {
                  this.messageError('签到失败，请重试!')
                  return
                } else {
                  this.messageError('错误信息 ： ' + _data.data.TrxMessage)
                  return
                }
              }
            } else {
              this.messageError('错误信息 ： ' + _data.message)
              return
            }
          })
      } else { // 签退
        const map = {
          'tradedate': this.CurrentSystemDate,
          'checkouttime': new DateTime().getTime(),
          'outbranchno': this.CurrentBranchNo,
          'outbranchname': this.CurrentBranchName,
          'userno': this.CurrentUserNo,
          'username': this.CurrentUserName
        }
        const params = { 'ruleForm': JSON.stringify(map) }
        const url = this.$registerBookApi.updateXR_USER_WORKNOTE
        this.$http(url, params).then( // 通讯后台修改数据库中信息
          res => {
            const _data = res.data
            console.log('T552701--updateXR_USER_WORKNOTE---' + JSON.stringify(res.data))
            // 赋值
            if (_data.code === 'SUCCESS') {
              if (_data.data.TrxCode === '000000') {
                this.messageSuccess('签退成功!   流水号' + _data.data._MAINLSH_)
                return
              } else {
                if (_data.data.TrxCode === 'T5527_001') {
                  this.messageError('签退失败，请重试!')
                  return
                } else {
                  this.messageError('错误信息 ： ' + _data.data.TrxMessage)
                  return
                }
              }
            } else {
              this.messageError('错误信息 ： ' + _data.message)
              return
            }
          })
      }
    }
  }
}
</script>

<style scoped>
  .ecms-trx-button{
    text-align: center;
  }
</style>
