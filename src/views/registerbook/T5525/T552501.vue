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
            <el-form-item label="开户许可证号码：" prop="KhCertNo" @keyup.enter.native="focusDown">
              <el-input
                ref="KHCertNo"
                :disabled="disabledKhCertNo"
                v-model="ruleForm.KhCertNo"
                clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="领取人证件类型：" prop="receiverIdType">
              <el-select ref="ReceiverIdType" :disabled="disabledReceiverIdType" v-model="ruleForm.receiverIdType" placeholder="请选择" style="width: 80%;" clearable>
                <el-option v-for="item in bQueryNames" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="领取人证件号码：" prop="receiverIdNo">
              <el-input ref="ReceiverIdNo" :disabled="disabledReceiverIdNo" v-model="ruleForm.receiverIdNo" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="领取人姓名：" prop="receiverName">
              <el-input ref="ReceiverName" :disabled="disabledReceiverName" v-model="ruleForm.receiverName" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <hr>
      <br>
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
import { DateTime } from '../../../commjs/common'
export default {
  name: 'T552501',
  components: { DateTime },
  data() {
    return {
      ruleForm: { // 弹框表单
        acctName: '', // 存款人名称
        acctNo: '', // 存款人账号
        KhCertNo: '', // 开户许可证号码
        receiverIdType: '', // 领取人证件类型
        receiverIdNo: '', // 领取人证件号码
        receiverName: '' // 领取人
      },
      disabledAcctNo: true, // 控制存款人账号是否禁用
      disabledAcctName: true, // 控制存款人名称是否禁用
      disabledKhCertNo: true, // 控制开户许可证号码是否禁用
      disabledReceiverIdType: false, // 控制领取人证件类型是否禁用
      disabledReceiverIdNo: false, // 控制领取人证件号码是否禁用
      disabledReceiverName: false, // 控制领取人是否禁用
      rules: { // 表单校验
        acctNo: [
          { required: false, message: '请输入存款人账号', trigger: 'blur' },
          { min: 0, max: 200, message: '长度在 0 到 32 个字符', trigger: 'blur' }
        ],
        acctName: [
          { required: false, message: '请输入存款人名称', trigger: 'blur' },
          { min: 0, max: 200, message: '长度在 0 到 200 个字符', trigger: 'blur' }
        ],
        KhCertNo: [
          { required: false, message: '请输入开户许可证号码', trigger: 'blur' },
          { min: 0, max: 128, message: '长度在 0 到 128 个字符', trigger: 'blur' }
        ],
        receiverIdType: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        receiverIdNo: [
          { required: true, message: '请输入领取人证件号码', trigger: 'blur' },
          { min: 0, max: 18, message: '长度在 0 到 32 个字符', trigger: 'blur' }
        ],
        receiverName: [
          { required: true, message: '请输入领取人', trigger: 'blur' },
          { min: 0, max: 128, message: '长度在 0 到 128 个字符', trigger: 'blur' }
        ]
      },
      CurrentUserNo: '', // 初始化-当前柜员号
      CurrentUserName: '', // 初始化-当前柜员名称
      CurrentBranchNo: '', // 初始化-当前机构号
      CurrentBranchName: '', // 初始化-当前机构名称
      CurrentZoneNo: '', // 初始化-当前地区号
      CurrentSystemDate: '', // 初始化-当前系统日期
      CurrentSystemTime: '', // 当前系统时间
      tabType: 0,
      activeName2: 'first',
      serialNo: '',
      khFlag: '',
      phoneNo: '',
      subBtn: '提 交',
      exitBtn: '退 出',
      bQueryNames: this.$combo.bQueryNames,
      tradeTypes5522: this.$combo.tradeTypes5522
    }
  },
  mounted: function() {
    const params = this.$route.params
    if (params) {
      console.log('params552301 : ' + JSON.stringify(this.$route.params.__confirmData))
      this.ruleForm.acctNo = this.$route.params.__confirmData.row.NOTE30
      this.ruleForm.acctName = this.$route.params.__confirmData.row.CUSTOMERNAME
      this.ruleForm.KhCertNo = this.$route.params.__confirmData.row.NOTE31
      this.serialNo = this.$route.params.__confirmData.row.MAINSERIALNO
      this.phoneNo = this.$route.params.__confirmData.row.PHONENUMBER
      console.log(this.$refs)
      this.$refs.ReceiverIdType.focus()
    }
    if (this.CurrentUserNo === '') { // 进行初始化操作
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
            console.log('tradeINit-end--' + this.CurrentUserNo)
          })
    }
  },
  methods: {
    handleClick(tab, e) {
      this.tabType = tab.index
      // var _val = tab.index
      // console.log(tab, event)
    },
    pickerOptions1() {
    },
    submitForm() {
      const map = {
        'receivename': this.ruleForm.receiverName, 'receiveidtype': this.ruleForm.receiverIdType,
        'receiveidno': this.ruleForm.receiverIdNo,
        'gwauditstatus': '12', 'djbauditstatus': '9',
        'mainserialno': this.serialNo
      }
      const params1 = { 'ruleForm': JSON.stringify(map) }
      const url1 = this.$registerBookApi.updateCUSTOMERCREATION_RECEIVE
      this.$http(url1, params1).then( // 通讯后台登记入库
        res1 => {
          const _data1 = res1.data
          // 赋值
          if (_data1.code === 'SUCCESS') {
            if (_data1.data.TrxCode === '000000') {
              // this.messageSuccess('报送资料成功!   流水号' + _data1.data._MAINLSH_)

              const mapInfo = {
                'tradeCode': '5525',
                'packetName': 'sms_0101',
                'toServiceCode': 'sms.0101',
                'businessCode': '003001',
                'transactionCode': '94007',
                'systemId': '',
                'deputyBusinessMode': '',
                'businessManNo': '',
                'subBusinessManNo': '',
                'terminalId': '',
                'mobilePhone': '',
                'mobileType': '',
                'businessType': '',
                'count': '1',
                'phoneNo': this.phoneNo,
                'accNo': '',
                'sendDate': this.CurrentSystemDate,
                'sendTime': new DateTime().getTime(),
                'businTp': '0',
                'message': this.CurrentSystemDate.substring(0, 4) + '年' + this.CurrentSystemDate.substring(4, 6) + '月' +
                  this.CurrentSystemDate.substring(6, 8) + '日' + new DateTime().getTime().substring(0, 2) + '时' +
                  new DateTime().getTime().substring(2, 4) + '分' +
                  '您的开户许可证已领取，领取人:' + this.ruleForm.receiverName
              }
              const params = { 'inputMap': JSON.stringify(mapInfo) }
              this.$http(this.$hostExchangeApi.exchangeZJYWSOAP, params) // 此处调用自己的Api接口方法
                .then(
                  res => {
                    const errCode = res.data.errorCode
                    // const errMsg = res.data.errorMsg
                    if (errCode === '0000') {
                      this.messageSuccess('领取开户许可证成功! 流水号' + _data1.data._MAINLSH_ + '短信已发送成功！')
                      return
                    } else {
                      this.messageError('领取开户许可证成功! 流水号' + _data1.data._MAINLSH_ + '短信发送失败!')
                      return
                    }
                  })
                .catch(error => {
                  console.log('*******' + error)
                })
            } else {
              if (_data1.data.TrxCode === 'T5525_001') {
                this.messageWarning('报送资料登记失败')
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
