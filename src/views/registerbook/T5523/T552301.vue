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
          <el-col :span="8">
            <el-form-item label="开户许可日期：" prop="KhCertDate">
              <el-date-picker
                id="KhCertDate"
                :disabled="disabledKhCertDate"
                v-model="ruleForm.KhCertDate"
                :picker-options="pickerOptions1"
                class="info-startDate"
                type="date"
                placeholder="选择日期"
                editable
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyyMMdd"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="通知客户姓名：" prop="noticeCustName">
              <el-input ref="NoticeCustName" :disabled="disabledNoticeCustName" v-model="ruleForm.noticeCustName" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="通知电话：" prop="noticePhoneNo" @keyup.enter.native="focusDown">
              <el-input
                ref="accNo"
                :disabled="disabledNoticePhoneNo"
                v-model="ruleForm.noticePhoneNo"
                clearable/>
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
  name: 'T552201',
  components: { DateTime },
  data() {
    return {
      ruleForm: { // 弹框表单
        acctName: '', // 存款人名称
        acctNo: '', // 存款人账号
        KhCertNo: '', // 开户许可证号码
        KhCertDate: '', // 开户许可证日期
        noticeCustName: '', // 通知客户姓名
        noticePhoneNo: '' // 通知电话
      },
      disabledAcctNo: true, // 控制存款人账号是否禁用
      disabledAcctName: true, // 控制存款人名称是否禁用
      disabledKhCertNo: true, // 控制开户许可证号码是否禁用
      disabledKhCertDate: true, // 控制开户许可证日期是否禁用
      disabledNoticePhoneNo: false, // 控制通知电话是否禁用
      disabledNoticeCustName: false, // 控制通知客户姓名是否禁用
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
        KhCertDate: [
          { required: false, message: '请输入开户许可证日期', trigger: 'blur' },
          { min: 0, max: 200, message: '长度在 0 到 32 个字符', trigger: 'blur' }
        ],
        noticeCustName: [
          { required: true, message: '请输入通知客户姓名', trigger: 'blur' },
          { min: 0, max: 128, message: '长度在 0 到 32 个字符', trigger: 'blur' }
        ],
        noticePhoneNo: [
          { required: true, message: '请输入通知电话', trigger: 'blur' },
          { min: 0, max: 12, message: '长度在 0 到 128 个字符', trigger: 'blur' }
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
      this.ruleForm.KhCertDate = this.$route.params.__confirmData.row.NOTE32
      this.serialNo = this.$route.params.__confirmData.row.MAINSERIALNO
      this.phoneNo = this.$route.params.__confirmData.row.PHONENUMBER
      console.log(this.$refs)
      this.$refs.NoticeCustName.focus()
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
        'informname': this.ruleForm.noticeCustName, 'informphone': this.ruleForm.noticePhoneNo,
        'gwauditstatus': '9', 'djbauditstatus': '7',
        'mainserialno': this.serialNo
      }
      const params1 = { 'ruleForm': JSON.stringify(map) }
      const url1 = this.$registerBookApi.updateCUSTOMERCREATION_INFORM
      this.$http(url1, params1).then( // 通讯后台登记入库
        res1 => {
          const _data1 = res1.data
          // 赋值
          if (_data1.code === 'SUCCESS') {
            if (_data1.data.TrxCode === '000000') {
              // this.messageSuccess('报送资料成功!   流水号' + _data1.data._MAINLSH_)

              const mapInfo = {
                'tradeCode': '5523',
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
                'phoneNo': this.ruleForm.noticePhoneNo,
                'accNo': '',
                'sendDate': this.CurrentSystemDate,
                'sendTime': new DateTime().getTime(),
                'businTp': '0',
                'message': this.CurrentSystemDate.substring(0, 4) + '年' + this.CurrentSystemDate.substring(4, 6) + '月' +
                  this.CurrentSystemDate.substring(6, 8) + '日' + new DateTime().getTime().substring(0, 2) + '时' +
                  new DateTime().getTime().substring(2, 4) + '分' +
                  '人民银行已核准您的开户，开户许可证号码为' + this.ruleForm.KhCertNo +
              '开户许可日期' + this.ruleForm.KhCertDate.substring(0, 4) + '年' + this.ruleForm.KhCertDate.substring(4, 6) + '月' +
                  this.ruleForm.KhCertDate.substring(6) + '日' +
              ',您可于' + this.CurrentSystemDate.substring(0, 4) + '年' + this.CurrentSystemDate.substring(4, 6) + '月' +
                  this.CurrentSystemDate.substring(6) + '日（三个工作日）发生付款业务，请携带身份证件到' + this.CurrentBranchName + '网点领取您的开户许可证。'
              }
              const params = { 'inputMap': JSON.stringify(mapInfo) }
              this.$http(this.$hostExchangeApi.exchangeZJYWSOAP, params) // 此处调用自己的Api接口方法
                .then(
                  res => {
                    const errCode = res.data.errorCode
                    // const errMsg = res.data.errorMsg
                    if (errCode === '0000') {
                      this.messageSuccess('报送资料成功! 流水号' + _data1.data._MAINLSH_ + '短信已发送成功！')
                      return
                    } else {
                      this.messageError('报送资料成功! 流水号' + _data1.data._MAINLSH_ + '短信发送失败!')
                      return
                    }
                  })
                .catch(error => {
                  console.log('*******' + error)
                })
            } else {
              if (_data1.data.TrxCode === 'T5523_001') {
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
