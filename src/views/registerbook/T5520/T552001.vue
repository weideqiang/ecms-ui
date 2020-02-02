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
            <el-form-item label="客户预约日期：" prop="KYYYDate" style="width: 100%;">
              <el-date-picker
                :disabled="disabledKYYYDate"
                v-model="ruleForm.KYYYDate"
                :picker-options="pickerOptions"
                align="right"
                type="date"
                placeholder="选择日期"
                value-format="yyyyMMdd"
                clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="审核通过日期：" prop="SHTGDate" style="width: 100%;">
              <el-date-picker
                :disabled="disabledSHTGDate"
                v-model="ruleForm.SHTGDate"
                :picker-options="pickerOptions"
                align="right"
                type="date"
                placeholder="选择日期"
                value-format="yyyyMMdd"
                clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="存款人名称：" prop="acctName">
          <el-input ref="accName" :disabled="disabledAcctName" v-model="ruleForm.acctName" clearable/>
        </el-form-item>
        <el-form-item label="登记证书号码：" prop="certiBookNo" >
          <el-input
            ref="certiBookNo"
            :disabled="disabledcertiBookNo"
            v-model="ruleForm.certiBookNo"
            clearable/>
        </el-form-item>
        <el-row>
          <el-col :span="8">
            <el-form-item label="电话号码：" prop="phoneNo" style="width: 85%;">
              <el-input :disabled="disabledphoneNo" v-model="ruleForm.phoneNo" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item ref="tradeType" label="交易类别：" prop="tradeType">
              <el-select :disabled="disabledtradeType" v-model="ruleForm.tradeType" placeholder="请选择" style="width: 80%;" clearable>
                <el-option v-for="item in tradeTypes" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="交出人1：" prop="senders1" style="width: 85%;">
              <el-input :disabled="disabledsenders1" v-model="ruleForm.senders1" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="交出人2：" prop="senders2" style="width: 85%;">
              <el-input :disabled="disabledsenders2" v-model="ruleForm.senders2" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="接收人：" prop="receivers" style="width: 85%;">
              <el-input :disabled="disabledreceivers" v-model="ruleForm.receivers" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
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
  name: 'T552001',
  data() {
    return {
      ruleForm: { // 弹框表单
        tradeType: '', // 交易类别
        certiBookNo: '', // 证明书号码
        acctName: '', // 存款人名称
        KYYYDate: '', // 客户预约日期
        SHTGDate: '', // 审核通过日期
        phoneNo: '', // 电话号
        senders1: '', // 交出人1
        senders2: '', // 交出人2
        receivers: ''// 接收人
      },
      disabledtradeType: false, // 控制交易类别是否禁用
      disabledcertiBookNo: false, // 控制证明书号码是否禁用
      disabledAcctName: true, // 控制存款人名称是否禁用
      disabledKYYYDate: true, // 控制客户预约日期是否禁用
      disabledSHTGDate: true, // 控制审核通过日期是否禁用
      disabledphoneNo: false, // 控制电话号是否禁用
      disabledsenders1: false, // 控制交出人1是否禁用
      disabledsenders2: false, // 控制交出人2是否禁用
      disabledreceivers: false, // 控制接收人是否禁用
      rules: { // 表单校验
        tradeType: [
          { required: true, message: '请选择交易类别', trigger: 'blur' },
          { min: 0, max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur' }
        ],
        certiBookNo: [
          { required: true, message: '请输入登记证书号码', trigger: 'blur' },
          { min: 0, max: 40, message: '长度在 0 到 40 个字符', trigger: 'blur' }
        ],
        acctName: [
          { required: true, message: '请输入存款人名称', trigger: 'blur' },
          { min: 0, max: 200, message: '长度在 0 到 200 个字符', trigger: 'blur' }
        ],
        KYYYDate: [
          { required: false, message: '请选择客户预约日期', trigger: 'change' }
        ],
        SHTGDate: [
          { required: false, message: '请选审核通过日期', trigger: 'change' }
        ],
        phoneNo: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          { min: 0, max: 20, message: '长度在 0 到 20 个字符', trigger: 'blur' }
        ],
        senders1: [
          { required: true, message: '请输入交出人1', trigger: 'blur' },
          { min: 0, max: 128, message: '长度在 0 到 128 个字符', trigger: 'blur' }
        ],
        senders2: [
          { required: true, message: '请输入交出人2', trigger: 'blur' },
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
      exitBtn: '退 出',
      tradeTypes: this.$combo.tradeTypes5520
    }
  },
  mounted: function() {
    const params = this.$route.params
    if (params) {
      this.khFlag = this.$route.params.khFlag
      if (this.khFlag === '0') {
        this.ruleForm.KYYYDate = ''
        this.ruleForm.SHTGDate = ''
        this.ruleForm.acctName = ''
        this.ruleForm.certiBookNo = ''
        this.ruleForm.phoneNo = ''
        this.rules.acctName[0].required = true
        this.disabledAcctName = false
        this.rules.certiBookNo[0].required = true
        this.rules.phoneNo[0].required = true
        this.$refs.accName.focus()
      } else {
        const _map = this.$route.params.confirmData
        this.rules.acctName[0].required = false
        this.rules.certiBookNo[0].required = false
        this.rules.phoneNo[0].required = false
        this.ruleForm.KYYYDate = _map.get('客户预约日期')
        this.ruleForm.SHTGDate = _map.get('审核通过日期')
        this.ruleForm.acctName = _map.get('存款人名称')
        this.ruleForm.certiBookNo = _map.get('登记证书号码')
        this.ruleForm.phoneNo = _map.get('电话号码')
        this.serialNo = _map.get('流水号')
        this.$refs.tradeType.focus()
      }
    }
  },
  methods: {
    submitForm() {
      if (this.khFlag === '0') {
        const map = {
          'customername': this.ruleForm.acctName, 'thedocumentserialno': this.ruleForm.certiBookNo,
          'phonenumber': this.ruleForm.phoneNo, 'verifytype': this.ruleForm.tradeType,
          'verifyhandover1': this.ruleForm.senders1, 'verifyhandover2': this.ruleForm.senders2,
          'verifyrecipient': this.ruleForm.receivers, 'gwauditstatus': '5'
        }
        const params1 = { 'ruleForm': JSON.stringify(map) }
        const url1 = this.$registerBookApi.addCUSTOMERCREATION
        this.$http(url1, params1).then( // 通讯后台登记入库
          res1 => {
            const _data1 = res1.data
            // 赋值
            if (_data1.code === 'SUCCESS') {
              if (_data1.data.TrxCode === '000000') {
                this.messageSuccess('登记成功!   流水号' + _data1.data._MAINLSH_)
                return
              } else {
                if (_data1.data.TrxCode === 'T5520_001') {
                  this.messageWarning('登记信息失败')
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
      } else { // 暂未用到
      }
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
