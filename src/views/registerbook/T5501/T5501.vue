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
        <el-form-item label="客户账号：" prop="acctNo" @keyup.enter.native="focusDown">
          <el-input
            ref="accNo"
            :disabled="disabledAcctNo"
            v-model="ruleForm.acctNo"
            style="width: 40%;"
            clearable/>
        </el-form-item>
        <el-form-item label="客户名称：" prop="acctName">
          <el-input ref="accName" :disabled="disabledAcctName" v-model="ruleForm.acctName" clearable/>
        </el-form-item>
        <el-form-item label="登记信息：" prop="doctype">
          <el-input
            ref="Doctype"
            :disabled="disabledDoctype"
            v-model="ruleForm.doctype"
            type="textarea"
            placeholder="请输入内容"
            clearable/>
        </el-form-item>
        <el-form-item label="备注：" prop="cause">
          <el-input :disabled="disabledCause" v-model="ruleForm.cause" clearable/>
        </el-form-item>
        <hr>
        <br>
        <el-row>
          <el-col :span="8">
            <el-form-item label="操作类型：" prop="operationType">
              <el-select ref="OperationType" v-model="ruleForm.operationType" placeholder="请选择" style="width: 80%;" clearable>
                <el-option v-for="item in operationTypes" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="操作单位：" prop="operationUnit">
              <el-select :disabled="disabledOperationUnit" v-model="ruleForm.operationUnit" placeholder="请选择" style="width: 80%;" clearable>
                <el-option v-for="item in operationUnits" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="起始日期：" prop="startDate" style="width: 88%;">
              <el-date-picker
                :disabled="disabledStartDate"
                v-model="ruleForm.startDate"
                :picker-options="pickerOptions"
                align="right"
                type="date"
                placeholder="选择日期"
                value-format="yyyyMMdd"
                clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="结束日期：" prop="endDate" style="width: 88%;">
              <el-date-picker
                :disabled="disabledEndDate"
                v-model="ruleForm.endDate"
                :picker-options="pickerOptions"
                align="right"
                type="date"
                placeholder="选择日期"
                value-format="yyyyMMdd"
                clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="机构代码：" prop="brNo" style="width: 85%;">
              <el-input :disabled="disabledBrNo" v-model="ruleForm.brNo" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="用户号：" prop="tellerno" style="width: 85%;">
              <el-input :disabled="disabledUserNo" v-model="ruleForm.tellerno" clearable/>
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
            <el-button size="medium" type="primary" @click="submitForm('registerForm')">{{ subBtn }}</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </el-main>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'T5501',
  data() {
    const validateOperationType = (rule, value, callback) => { // 操作类型选择事件
      // 设置表单组件为非必输状态
      this.rules.operationUnit[0].required = false
      this.rules.acctNo[0].required = false
      this.rules.acctName[0].required = false
      this.rules.doctype[0].required = false
      this.rules.cause[0].required = false
      this.rules.startDate[0].required = false
      this.rules.endDate[0].required = false
      this.rules.brNo[0].required = false
      this.rules.tellerno[0].required = false
      // 设置组件为非禁用状态
      this.disabledOperationUnit = false
      this.disabledStartDate = false
      this.disabledEndDate = false
      this.disabledBrNo = false
      this.disabledUserNo = false
      this.ruleForm.operationUnit = '' // 设置操作单位为空
      this.ruleForm.brno = ''
      this.subBtn = '提 交'
      if (value === '0') { // 操作类型选择查询
        this.rules.startDate[0].required = true
        this.rules.endDate[0].required = true
        this.disabledBrNo = true
        this.subBtn = '查 询'
      } else if (value === '1') { // 操作类型选择领取
        callback(new Error('功能开发中'))
        // this.rules.acctNo[0].required = true
        // this.ruleForm.operationUnit = '0'
        // this.disabledOperationUnit = true
        // this.disabledStartDate = true
        // this.disabledEndDate = true
        // this.disabledBrNo = true
        // this.disabledUserNo = true
      } else if (value === '2') { // 操作类型选择登记
        callback(new Error('功能开发中'))
        // this.rules.acctNo[0].required = true
        // this.ruleForm.operationUnit = '1'
        // this.disabledOperationUnit = true
        // this.disabledStartDate = true
        // this.disabledEndDate = true
        // this.disabledBrNo = true
        // this.disabledUserNo = true
      }
      // callback()
    }
    // const validateAcctNo = (rule, value, callback) => {
    //   if (value !== '') {
    //     // 校验账号格式
    //     var reg = /^[0-9a-zA-Z-]+$/
    //     if (value.search(reg) === -1) {
    //       this.$message({
    //         showClose: true,
    //         message: '账号格式错误，只能输入数字、-、字母！',
    //         type: 'error'
    //       })
    //       return
    //     } else {
    //       if (value.indexOf('-') !== -1) {
    //         const accountNo = value.split('-')[1]
    //         if (accountNo.length >= 2) {
    //           const mapInfo = {
    //             'tradeCode': '5501',
    //             'mainAccountNo': value,
    //             'subAccountReferenceNo': accountNo,
    //             'toServiceCode': 'fcr.047',
    //             'fcrPacketName': 'XfaceGroupDepositSubAccountInquiryWrapperSR'
    //           }
    //           const params = { 'inputMap': JSON.stringify(mapInfo) }
    //           this.$http(this.$hostExchangeApi.exchangeFCR, params) // 此处调用自己的Api接口方法
    //             .then(
    //               res => {
    //                 const errCode = res.data.errorCode
    //                 const errMsg = res.data.errorMsg
    //                 if (errCode === '0000') {
    //                   return
    //                 } else {
    //                   callback(new Error('集团子户查询失败！\n错误码:' + errCode + '\n错误信息:' + errMsg))
    //                 }
    //               })
    //             .catch(error => {
    //               console.log('======' + error)
    //             })
    //           return
    //         }
    //         return
    //       } else {
    //         // 获取老账号-新老帐号转换-直接查询oracle
    //         console.log('-----------新旧帐号查询开始-----------')
    //         const mapOld = { 'oldAccno': value }
    //         const paramsOld = { 'oldAccno': JSON.stringify(mapOld) }
    //         this.$http(this.$accountManageApi.oldToNew, paramsOld)
    //           .then(
    //             res => {
    //               const errCodeOld = res.data.ErrCode
    //               // const errMsgOld = res.data.ErrMsg
    //               if (errCodeOld === '0000') {
    //                 this.newAccno = res.data.newAccno
    //               } else {
    //                 this.newAccno = value
    //               }
    //               console.log('开始账户信息查询 ---新账号 ：' + this.newAccno)
    //               const mapInfo = {
    //                 'tradeCode': '5501',
    //                 'account': this.newAccno,
    //                 'toServiceCode': 'fcr.091',
    //                 'fcrPacketName': 'XfaceAccountBasicInformationInquiryWrapperSR'
    //               }
    //               const params = { 'inputMap': JSON.stringify(mapInfo) }
    //               this.$http(this.$hostExchangeApi.exchangeFCR, params) // 此处调用自己的Api接口方法
    //                 .then(
    //                   res => {
    //                     const errCode = res.data.errorCode
    //                     const errMsg = res.data.errorMsg
    //                     if (errCode === '0000') {
    //                       const accountName = res.data.Envelope.Body.processRequestResponse.processRequestReturn.accountFullName.var
    //                       this.ruleForm.acctName = accountName
    //                       this.disabledAcctName = false
    //                       validateAcctName()
    //                     } else {
    //                       callback(new Error('账户基本信息查询失败！\n 错误码:' + errCode + ' \n错误信息:' + errMsg))
    //                     }
    //                   })
    //                 .catch(error => {
    //                   console.log('*******' + error)
    //                 })
    //             })
    //           .catch(error => {
    //             console.log('^^^^^' + error)
    //           })
    //       }
    //     }
    //     // callback()
    //   }
    // }
    const validateAcctName = (rule, value, callback) => {
      console.log('validateAcctName start-------')
      if (value !== '') {
        // 通过客户账号，客户名称，登记类型查询登记记录并跳转登记记录页面
        const map = { 'acctNo': this.ruleForm.acctNo, 'acctName': this.ruleForm.acctName, 'operation': '2' }
        const params = { 'ruleForm': JSON.stringify(map), 'pageNum': '1', 'pageSize': '10' }
        const url = this.$registerBookApi.getCustdocRegister
        this.$http(url, params).then( // 通讯后台修改数据库中信息
          res => {
            const _data = res.data
            // 赋值
            if (_data.code === 'SUCCESS') {
              if (_data.data.TrxCode === '000000') {
                this.tableData = res.data
                console.log('页面跳转TotalNum :' + JSON.stringify(_data.data.TotalNum) + '|' + JSON.stringify(res.data))
                const pageInfo = _data.data.PageInfo.list
                for (let i = 0; i < pageInfo.length; i++) {
                  if (pageInfo[i].OPERATION === '0') {
                    pageInfo[i].OPERATION = '0-查询'
                  } else if (pageInfo[i].OPERATION === '1') {
                    pageInfo[i].OPERATION = '1-领取'
                  } else if (pageInfo[i].OPERATION === '2') {
                    pageInfo[i].OPERATION = '2-登记'
                  }
                }
                this.$router.push({
                  path: this.redirect || '/T55012',
                  name: 'T55012',
                  params: {
                    map: _data.data.PageInfo,
                    totalNum: _data.data.TotalNum,
                    acctNo: this.ruleForm.acctNo,
                    acctName: this.ruleForm.acctName
                  }
                })
              } else {
                if (_data.data.TrxCode === 'T5501_001') {
                  this.operationTypes = this.$combo.operationType1
                  this.messageWarning('没有登记记录，请做查询、登记操作!')
                  // this.$refs.accNo.clear()
                  // this.$refs.accName.clear()
                  this.$refs.Doctype.focus()
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
      } else {
        if (this.ruleForm.operationType !== '0') {
          this.messageError('客户名称不能为空!')
          return
        } else {
          callback()
        }
      }
    }
    return {
      ruleForm: { // 弹框表单
        operationType: '', // 操作类型
        operationUnit: '', // 操作单位
        acctNo: '', // 客户账号
        acctName: '', // 客户名称
        doctype: '', // 登记信息
        cause: '', // 备注
        startDate: '', // 起始日期
        endDate: '', // 结束日期
        brNo: '', // 机构号
        tellerno: '', // 柜员号
        unitname: '', // 收付款单位名称及开户行
        illustrate: '', // 说明
        receiveDate: '',
        receiveTime: ''
      },
      disabledOperationUnit: false, // 控制操作单位是否禁用
      disabledAcctNo: false, // 控制客户账号是否禁用
      disabledAcctName: false, // 控制客户名称是否禁用
      disabledDoctype: false, // 控制登记信息是否禁用
      disabledCause: false, // 控制备注是否禁用
      disabledStartDate: true, // 控制起始日期是否禁用
      disabledEndDate: true, // 控制结束日期是否禁用
      disabledBrNo: false, // 控制机构号是否禁用
      disabledUserNo: false, // 控制用户号是否禁用
      rules: { // 表单校验
        operationType: [
          { required: true, message: '请选择操作类型', trigger: 'change' },
          { trigger: 'change', validator: validateOperationType }
        ],
        operationUnit: [
          { required: true, message: '请选择操作单位', trigger: 'blur' },
          { min: 0, max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur' }
        ],
        acctNo: [
          { required: false, message: '请输入客户账号', trigger: 'blur' },
          { min: 0, max: 200, message: '长度在 0 到 32 个字符', trigger: 'blur' }
        ],
        acctName: [
          { required: false, message: '请输入客户名称', trigger: 'blur' },
          { trigger: 'blur', validator: validateAcctName }
        ],
        doctype: [
          { required: false, message: '请输入证件号码', trigger: 'blur' },
          { min: 0, max: 35, message: '长度在 0 到 35 个字符', trigger: 'blur' }
        ],
        cause: [
          { required: false, message: '请选择用户类别', trigger: 'change' }
        ],
        startDate: [
          { required: false, message: '请选择起始日期', trigger: 'change' }
        ],
        endDate: [
          { required: false, message: '请选择结束日期', trigger: 'change' }
        ],
        brNo: [
          { required: false, message: '请输入联系电话', trigger: 'blur' },
          { min: 0, max: 11, message: '长度在 0 到 11 个字符', trigger: 'blur' }
        ],
        tellerno: [
          { required: false, message: '请输入电子邮箱', trigger: 'blur' },
          { min: 0, max: 200, message: '长度在 0 到 200 个字符', trigger: 'blur' }
        ]
      },
      pickerOptions: '',
      newAccno: '',
      subBtn: '提 交',
      exitBtn: '退 出',
      operationTypes: this.$combo.operationType,
      operationUnits: this.$combo.operationUnit
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
    const params = this.$route.params
    console.log('回调函数' + JSON.stringify(params.__tzType) + '|' + params.__OPERATION)
    if (JSON.stringify(params).length > 2) {
      if (params.__tzType === '0') {
        const map = params.__map.row
        this.ruleForm.acctNo = map.CUSTACC
        this.ruleForm.acctName = map.CUSTNAME
        this.ruleForm.operationType = ''
        this.ruleForm.startDate = ''
        this.ruleForm.endDate = ''
        this.ruleForm.brno = ''
        this.ruleForm.tellerno = ''
        this.operationTypes = this.$combo.operationType
        this.rules.operationType[0].required = true
        const operation = params.__OPERATION
        if (operation === '1') {
          this.ruleForm.operationType = '2'
          this.rules.operationUnit[0].required = true
          this.disabledBrNo = true
          this.disabledUserNo = true
          this.disabledStartDate = true
          this.disabledEndDate = true
          this.ruleForm.doctype = map.DOCTYPE
          this.ruleForm.cause = map.CAUSE
          this.ruleForm.unitname = map.UNITNAME
          this.ruleForm.illustrate = map.ILLUSTRATE
          this.$set(this.ruleForm, 'receiveDate', this.ruleForm.receiveDate == null ? '' : this.ruleForm.receiveDate)
          this.$set(this.ruleForm, 'receiveTime', this.ruleForm.receiveTime == null ? '' : this.ruleForm.receiveTime)
          this.$set(this.ruleForm, 'tellerNo1', map.TELLERNO1 == null ? '' : map.TELLERNO1)
          this.$set(this.ruleForm, 'tellername1', map.TELLERNAME1 == null ? '' : map.TELLERNAME1)
          this.$set(this.ruleForm, 'mainserialno1', map.MAINSERIALNO1 == null ? '' : map.MAINSERIALNO1)
          this.$set(this.ruleForm, 'tbackDate', map.TBACKDATE == null ? '' : map.TBACKDATE)
          this.$set(this.ruleForm, 'tbackTime', map.TBACKTIME == null ? '' : map.TBACKTIME)
          this.$set(this.ruleForm, 'tellerNo2', map.TELLERNO2 == null ? '' : map.TELLERNO2)
          this.$set(this.ruleForm, 'tellername2', map.TELLERNAME2 == null ? '' : map.TELLERNAME2)
          this.$set(this.ruleForm, 'mainserialno2', map.MAINSERIALNO2 == null ? '' : map.MAINSERIALNO2)
          this.$set(this.ruleForm, 'doctype', this.ruleForm.doctype == null ? '' : this.ruleForm.doctype)
          this.$set(this.ruleForm, 'cause', this.ruleForm.cause == null ? '' : this.ruleForm.cause)
          this.$set(this.ruleForm, 'userNo', map.TELLERNO1 == null ? '' : map.TELLERNO1)
          this.$set(this.ruleForm, 'illustrate', this.ruleForm.illustrate == null ? '' : this.ruleForm.illustrate)
        } else if (operation === '2') {
          this.ruleForm.operationType = '1'
          this.ruleForm.doctype = map.DOCTYPE
          this.ruleForm.cause = map.CAUSE
          this.ruleForm.unitname = map.UNITNAME
          this.ruleForm.illustrate = map.ILLUSTRATE
          this.$set(this.ruleForm, 'receiveDate', this.ruleForm.receiveDate == null ? '' : this.ruleForm.receiveDate)
          this.$set(this.ruleForm, 'receiveTime', this.ruleForm.receiveTime == null ? '' : this.ruleForm.receiveTime)
          this.$set(this.ruleForm, 'tellerNo1', '')
          this.$set(this.ruleForm, 'tellername1', '')
          this.$set(this.ruleForm, 'mainserialno1', '')
          this.$set(this.ruleForm, 'tbackDate', map.TBACKDATE == null ? '' : map.TBACKDATE)
          this.$set(this.ruleForm, 'tbackTime', map.TBACKTIME == null ? '' : map.TBACKTIME)
          this.$set(this.ruleForm, 'tellerNo2', map.TELLERNO2 == null ? '' : map.TELLERNO2)
          this.$set(this.ruleForm, 'tellername2', map.TELLERNAME2 == null ? '' : map.TELLERNAME2)
          this.$set(this.ruleForm, 'mainserialno2', map.MAINSERIALNO2 == null ? '' : map.MAINSERIALNO2)
          this.$set(this.ruleForm, 'doctype', this.ruleForm.doctype == null ? '' : this.ruleForm.doctype)
          this.$set(this.ruleForm, 'cause', this.ruleForm.cause == null ? '' : this.ruleForm.cause)
          this.$set(this.ruleForm, 'userNo', map.TELLERNO1 == null ? '' : map.TELLERNO1)
          this.$set(this.ruleForm, 'illustrate', this.ruleForm.illustrate == null ? '' : this.ruleForm.illustrate)
          this.$refs.OperationType.focus()
        }
      } else if (params.__tzType === '1') {
        this.messageError('没有获取到对应的登记的记录，默认做查询操作！')
        this.operationTypes = this.$combo.operationType1
        this.rules.operationType[0].required = true
        this.ruleForm.operationType = '1'
        this.$refs.OperationType.focus()
        return
      }
    }
  },
  methods: {
    exitTrade() { // 交易退出返回首页
      this.$router.push({
        path: this.redirect || '/dashboard'
      })
    },
    focusDown() { // 设置回车键光标跳转-暂时其它组件先不加
      this.$refs.Doctype.focus()
    },
    submitForm() { // 提交
      console.log('------------提交开始---------operationType ：------' + this.ruleForm.operationType)
      // this.$refs.ruleForm.validate 把所有validate再执行一遍，没必要，删掉
      this.$set(this.ruleForm, 'userNo', this.userInfo.userNo)
      this.$set(this.ruleForm, 'userName', this.userInfo.userName)
      const operationType = this.ruleForm.operationType
      let params = ''
      let url = ''
      let type = ''
      if (operationType === '0') {
        params = { 'ruleForm': JSON.stringify(this.ruleForm), 'currentPage': '1', 'pageSize': '10' }
        url = this.$registerBookApi.getCustdocRegister
        type = '查询'
      } else if (operationType === '1') {
        this.$message.error('功能开发中')
        return
        // this.$set(this.ruleForm, 'operation', '1')
        // this.$set(this.ruleForm, 'operation1', '2')
        // params = { 'ruleForm': JSON.stringify(this.ruleForm) }
        // url = this.$registerBookApi.updateCustdocRegister
        // type = '领取'
      } else if (operationType === '2') {
        this.$message.error('功能开发中')
        return
        // params = { 'ruleForm': JSON.stringify(this.ruleForm) }
        // url = this.$registerBookApi.addCustdocRegister
        // type = '登记'
      }
      this.$http(url, params).then( // 通讯后台修改数据库中信息
        res => {
          const _data = res.data
          console.log('@@@@@提交返回 ：' + JSON.stringify(res.data))
          // 赋值
          if (_data.code === 'SUCCESS') {
            if (_data.data.TrxCode === '000000') {
              if (operationType !== '0') {
                if (operationType === '2') {
                  this.messageSuccess('登记成功!   流水号' + _data.data._MAINLSH_)
                  return
                } else {
                  this.messageSuccess(type + '成功!')
                  return
                }
              } else { // 只有查询后跳转
                this.tableData = res.data
                this.$router.push({
                  path: this.redirect || '/T55011',
                  name: 'T55011',
                  params: {
                    map: _data.data.PageInfo,
                    totalNum: _data.data.TotalNum
                  }
                })
              }
            } else {
              this.$message.error('错误信息 ： ' + _data.data.TrxMessage)
            }
          } else {
            this.$message.error('错误信息 ： ' + _data.message)
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
