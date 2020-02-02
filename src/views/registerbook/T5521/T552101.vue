<template>
  <el-main>
    <div class="demo-form-div">
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
            <el-form-item label="账号：" prop="acctNo" @keyup.enter.native="focusDown">
              <el-input
                ref="accNo"
                :disabled="disabledAcctNo"
                v-model="ruleForm.acctNo"
                clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="存款人名称：" prop="acctName">
              <el-input ref="accName" :disabled="disabledAcctName" v-model="ruleForm.acctName" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="交出人：" prop="senders">
              <el-input ref="Senders" :disabled="disabledsenders" v-model="ruleForm.senders" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="接收人：" prop="receivers" >
              <el-input :disabled="disabledreceivers" v-model="ruleForm.receivers" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <br>
      </el-form>
      <div class="dialog-footer" style="width: 92%;" align="right">
        <el-row>
          <el-col :span="8">
            <el-button size="medium" type="primary" @click="exitTrade()">{{ exitBtn }}</el-button>
          </el-col>
          <el-col :span="8">
            <el-button size="medium" type="primary" @click="submitForm()">{{ subBtn }}</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </el-main>
</template>

<script>
export default {
  name: 'T552101',
  data() {
    return {
      ruleForm: { // 弹框表单
        acctNo: '', // 帐号
        acctName: '', // 存款人名称
        senders: '', // 交出人
        receivers: ''// 接收人
      },
      disabledAcctNo: true, // 控制账号是否禁用
      disabledAcctName: true, // 控制存款人名称是否禁用
      disabledsenders: false, // 控制交出人1是否禁用
      disabledreceivers: false, // 控制接收人是否禁用
      rules: { // 表单校验
        acctNo: [
          { required: false, message: '请输入客户账号', trigger: 'blur' },
          { min: 0, max: 200, message: '长度在 0 到 32 个字符', trigger: 'blur' }
        ],
        acctName: [
          { required: false, message: '请输入存款人名称', trigger: 'blur' },
          { min: 0, max: 200, message: '长度在 0 到 200 个字符', trigger: 'blur' }
        ],
        senders: [
          { required: true, message: '请输入交出人', trigger: 'blur' },
          { min: 0, max: 128, message: '长度在 0 到 128 个字符', trigger: 'blur' }
        ],
        receivers: [
          { required: true, message: '请输入接收人', trigger: 'blur' },
          { min: 0, max: 128, message: '长度在 0 到 128 个字符', trigger: 'blur' }
        ]
      },
      serialNo: '',
      khFlag: '',
      subBtn: '提 交',
      exitBtn: '退 出'
    }
  },
  mounted: function() {
    const params = this.$route.params
    if (params) {
      console.log('params552101 : ' + JSON.stringify(this.$route.params.__confirmData))
      this.ruleForm.acctNo = this.$route.params.__confirmData.row.NOTE30
      this.ruleForm.acctName = this.$route.params.__confirmData.row.CUSTOMERNAME
      this.serialNo = this.$route.params.__confirmData.row.MAINSERIALNO
      this.$refs.Senders.focus()
    }
  },
  methods: {
    submitForm() {
      const map = {
        'jjzlhandover1': this.ruleForm.senders, 'jjzlrecipient': this.ruleForm.receivers,
        'gwauditstatus': '6', 'mainserialno': this.serialNo
      }
      const params1 = { 'ruleForm': JSON.stringify(map) }
      const url1 = this.$registerBookApi.updateCUSTOMERCREATION
      this.$http(url1, params1).then( // 通讯后台登记入库
        res1 => {
          const _data1 = res1.data
          // 赋值
          if (_data1.code === 'SUCCESS') {
            if (_data1.data.TrxCode === '000000') {
              this.messageSuccess('交接资料成功!   流水号' + _data1.data._MAINLSH_)
              return
            } else {
              if (_data1.data.TrxCode === 'T5521_001') {
                this.messageWarning('交接资料登记失败')
                return
              } else {
                this.messageError('错误信息 ： ' + _data1.data.TrxMessage)
                return
              }
            }
          } else {
            this.messageError('错误信息 ： ' + _data1.message)
            return
          }
        })
    },
    pickerOptions() {
    },
    exitTrade() { // 交易退出返回首页
      this.$router.push({
        path: this.redirect || '/dashboard'
      })
    }
  }
}
</script>

<style scoped>
</style>
