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
            <el-form-item label="交易类别：" prop="tradeType">
              <el-select ref="TradeType" :disabled="disabledTradeType" v-model="ruleForm.tradeType" placeholder="请选择" style="width: 80%;" clearable>
                <el-option v-for="item in tradeTypes5522" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <hr>
        <br>
        <div>
          <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
            <el-tab-pane label="直接报送" name="first"/>
            <el-tab-pane label="报送员报送" name="second"/>
          </el-tabs>
          <div v-if="tabType == 1">
            <div>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="报送人：" prop="senders" style="width: 85%;">
                    <el-input ref="Senders" :disabled="disabledSenders" v-model="ruleForm.senders" clearable/>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
          <div v-if="tabType == 0">
            <div>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="交出人证件类型：" prop="outerIdType">
                    <el-select ref="OuterIDType" :disabled="disabledOuterIdType" v-model="ruleForm.outerIdType" placeholder="请选择" style="width: 80%;" clearable>
                      <el-option v-for="item in bQueryNames" :key="item.value" :label="item.label" :value="item.value"/>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="交出人证件号码：" prop="outerIDNo" style="width: 85%;">
                    <el-input :disabled="disabledOuterIDNo" v-model="ruleForm.outerIDNo" clearable/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="交出人：" prop="outers" style="width: 85%;">
                    <el-input ref="Outers" :disabled="disabledOuters" v-model="ruleForm.outers" clearable/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="接收人证件类型：" prop="receiverIDType">
                    <el-select ref="receiverIDType" :disabled="disabledReceiverIDType" v-model="ruleForm.receiverIDType" placeholder="请选择" style="width: 80%;" clearable>
                      <el-option v-for="item in bQueryNames" :key="item.value" :label="item.label" :value="item.value"/>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="接收人证件号码：" prop="receiverIDNo" style="width: 85%;">
                    <el-input ref="receiverIDNo" :disabled="disableReceiverIDNo" v-model="ruleForm.receiverIDNo" clearable/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="接收人：" prop="receivers" style="width: 85%;">
                    <el-input :disabled="disabledReceivers" v-model="ruleForm.receivers" clearable/>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
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
    const validtradeType = (rule, value, callback) => {
      console.log(this.$refs)
      if (this.ruleForm.tradeType === '0') {
        this.tabType = '1'
        this.rules.senders[0].required = true
        // this.$refs.Senders.focus
      } else if (this.ruleForm.tradeType === '1') {
        this.rules.senders[0].required = false
        this.tabType = '0'
        // this.$refs.outerIdType.focus()
      } else {
        callback(new Error('交易类别不可为空！'))
        // this.$refs.TradeType.focus()
      }
    }
    return {
      ruleForm: { // 弹框表单
        tradeType: '', // 交易类别
        acctName: '', // 存款人名称
        acctNo: '', // 存款人账号
        senders: '', // 报送人
        outerIdType: '', // 交出人证件类型
        outerIDNo: '', // 交出人证件号码
        outers: '', // 交出人
        receiverIDType: '', // 接收人证件类型
        receiverIDNo: '', // 接收人证件号码
        receivers: '' // 接收人
      },
      disabledOuters: false, // 控制接收人是否禁用
      disabledReceivers: false, // 控制接收人是否禁用
      disabledReceiverIDType: false, // 控制接收人证件类型是否禁用
      disableReceiverIDNo: false, // 控制接收人证件号码是否禁用
      disabledTradeType: false, // 控制交易类别是否禁用
      disabledOuterIdType: false, // 控制交出认证件类型是否禁用
      disabledOuterIDNo: false, // 控制交出认证件号码是否禁用
      disabledAcctNo: true, // 控制账号是否禁用
      disabledAcctName: true, // 控制账户名称是否禁用
      disabledSenders: false, // 控制报送人是否禁用
      rules: { // 表单校验
        tradeType: [
          { required: true, message: '请选择交易类别', trigger: 'blur' },
          { min: 0, max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur' },
          { trigger: 'change', validator: validtradeType }
        ],
        acctNo: [
          { required: false, message: '请输入客户账号', trigger: 'blur' },
          { min: 0, max: 200, message: '长度在 0 到 32 个字符', trigger: 'blur' }
        ],
        acctName: [
          { required: false, message: '请输入存款人名称', trigger: 'blur' },
          { min: 0, max: 200, message: '长度在 0 到 200 个字符', trigger: 'blur' }
        ],
        senders: [
          { required: true, message: '请输入报送人', trigger: 'blur' },
          { min: 0, max: 128, message: '长度在 0 到 128 个字符', trigger: 'blur' }
        ],
        outerIDNo: [
          { required: true, message: '请输入证件号码', trigger: 'blur' },
          { min: 0, max: 200, message: '长度在 0 到 32 个字符', trigger: 'blur' }
        ],
        outerIdType: [
          { required: true, message: '请选择证件类型', trigger: 'blur' },
          { min: 0, max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur' }
        ],
        receiverIDType: [
          { required: true, message: '请选择证件类型', trigger: 'blur' },
          { min: 0, max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur' }
        ],
        receiverIDNo: [
          { required: true, message: '请输入证件号码', trigger: 'blur' },
          { min: 0, max: 200, message: '长度在 0 到 32 个字符', trigger: 'blur' }
        ],
        receivers: [
          { required: true, message: '请输入接收人', trigger: 'blur' },
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
      console.log('params552201 : ' + JSON.stringify(this.$route.params.__confirmData))
      this.ruleForm.acctNo = this.$route.params.__confirmData.row.NOTE30
      this.ruleForm.acctName = this.$route.params.__confirmData.row.CUSTOMERNAME
      this.serialNo = this.$route.params.__confirmData.row.MAINSERIALNO
      this.phoneNo = this.$route.params.__confirmData.row.PHONENUMBER
      this.ruleForm.tradeType = '0'
      this.tabType = '1'
      console.log(this.$refs)
      // this.$refs.Senders.focus()
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
    submitForm() {
      const map = {
        'submitdatatype': this.ruleForm.tradeType, 'submithandover': this.ruleForm.outers,
        'submitidtype1': this.ruleForm.outerIdType, 'submitidno1': this.ruleForm.outerIDNo,
        'submitrecipient': this.ruleForm.receivers, 'submitidtype2': this.ruleForm.receiverIDType,
        'submitidno2': this.ruleForm.receiverIDNo, 'submission': this.ruleForm.senders,
        'gwauditstatus': '7', 'djbauditstatus': '6', 'mainserialno': this.serialNo
      }
      const params1 = { 'ruleForm': JSON.stringify(map) }
      const url1 = this.$registerBookApi.updateCUSTOMERCREATION_SUBMITDATA
      this.$http(url1, params1).then( // 通讯后台登记入库
        res1 => {
          const _data1 = res1.data
          // 赋值
          if (_data1.code === 'SUCCESS') {
            if (_data1.data.TrxCode === '000000') {
              // this.messageSuccess('报送资料成功!   流水号' + _data1.data._MAINLSH_)

              const mapInfo = {
                'tradeCode': '5522',
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
                  '您的开户申请已报送至人民银行，如需查询受理进度，请凭预留手机号码登录吉林银行官方网站查询。'
              }
              const params = { 'inputMap': JSON.stringify(mapInfo) }
              this.$http(this.$hostExchangeApi.exchangeZJYWSOAP, params) // 此处调用自己的Api接口方法
                .then(
                  res => {
                    const errCode = res.data.errorCode
                    // const errMsg = res.data.errorMsg
                    if (errCode === '0000') {
                      this.messageSuccess('报送资料成功!流水号' + _data1.data._MAINLSH_ + '  短信已发送成功！')
                      return
                    } else {
                      this.messageerror('报送资料成功!流水号' + _data1.data._MAINLSH_ + '  短信已发送失败！')
                      return
                    }
                  })
                .catch(error => {
                  console.log('*******' + error)
                })
            } else {
              if (_data1.data.TrxCode === 'T5522_001') {
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
