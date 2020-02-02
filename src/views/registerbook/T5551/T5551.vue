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
            <el-form-item ref="UintSelection" label="操作类型：" prop="operationType" >
              <el-select v-model="ruleForm.operationType" style="width: 80%;" placeholder="请选择" clearable>
                <el-option v-for="item in tradeTypes5550" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="操作单位：" prop="operationUint">
              <el-select ref="OperationUint" v-model="ruleForm.operationUint" style="width: 80%;" placeholder="请选择" clearable>
                <el-option v-for="item in operationUints5551" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="起始日期：" prop="startDate">
              <el-date-picker
                id="startDate"
                :disabled="disabledStartDate"
                v-model="ruleForm.startDate"
                type="date"
                placeholder="选择日期"
                editable
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyyMMdd"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="结束日期：" prop="endDate">
              <el-date-picker
                id="endDate"
                :disabled="disabledendDate"
                v-model="ruleForm.endDate"
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
            <el-form-item label="机构代码：" prop="institutionCode">
              <el-input :disabled="disabledInstitutionCode" v-model="ruleForm.institutionCode" placeholder="请输入机构代码" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="柜员号：" style="width: 85%;" prop="tellerNo">
              <el-input :disabled="disabledTellerno" v-model="ruleForm.tellerNo" placeholder="请输入柜员号" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="存取类型：" prop="CQLXType">
              <el-select v-model="ruleForm.CQLXType" style="width: 80%;" placeholder="请选择" clearable>
                <el-option v-for="item in CQLXTypes5551" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="存期：" style="width: 85%;" prop="CQ">
              <el-input v-model="ruleForm.CQ" placeholder="请输入存期" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="币种：" prop="BZType">
              <el-select v-model="ruleForm.BZType" style="width: 80%;" placeholder="请选择" clearable>
                <el-option v-for="item in BZTypes5550" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="交易金额：" style="width: 85%;" prop="JYJE">
              <el-input v-model="ruleForm.JYJE" placeholder="请输入交易金额" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="账/卡号：" style="width: 85%;" prop="accountCardNo" >
              <el-input
                v-model="ruleForm.accountCardNo"
                placeholder="请输入账/卡号"
                clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="户名：" prop="accountName" >
            <el-input
              v-model="ruleForm.accountName"
              placeholder="请输入户名"
              clearable/>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="交易码：" style="width: 85%;" prop="tradeNo" >
              <el-input
                v-model="ruleForm.tradeNo"
                placeholder="请输入交易码"
                clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="交易名称：" style="width: 85%;" prop="tradeName" >
              <el-input
                v-model="ruleForm.tradeName"
                placeholder="请输入交易名称"
                clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="证件类型：" prop="ZJType">
              <el-select :disabled="false" v-model="ruleForm.ZJType" style="width: 80%;" placeholder="请选择" clearable>
                <el-option v-for="item in ZJTypes" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件号码：" style="width: 85%;" prop="ZJCode">
              <el-input v-model="ruleForm.ZJCode" placeholder="请输入证件号码" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="代理人证件类型：" prop="DLRZJType">
              <el-select :disabled="false" v-model="ruleForm.DLRZJType" style="width: 80%;" placeholder="请选择" clearable>
                <el-option v-for="item in ZJTypes" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="代理人证件号码：" style="width: 85%;" prop="DLRZJCode">
              <el-input v-model="ruleForm.DLRZJCode" placeholder="请输入代理人" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="代理人名称：" style="width: 85%;" prop="DLRMC" >
              <el-input
                v-model="ruleForm.DLRMC"
                placeholder="请输入代理人名称"
                clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="代理人电话：" style="width: 85%;" prop="DLRDH" >
              <el-input
                v-model="ruleForm.DLRDH"
                placeholder="请输入代理人电话"
                clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="代理人地址：" sprop="DLRDZ" >
            <el-input
              v-model="ruleForm.DLRDZ"
              placeholder="请输入代理人地址"
              clearable/>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="联网核查结果：" prop="LWHCJGType">
            <el-select :disabled="false" v-model="ruleForm.LWHCJGType" style="width: 100%;" placeholder="请选择" clearable>
              <el-option v-for="item in LWHCJGTypes" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="授权员：" style="width: 80%;" prop="SQY" >
              <el-input
                v-model="ruleForm.SQY"
                placeholder="请输入授权员"
                clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="本地授权员：" style="width: 80%;" prop="BDSQY" >
              <el-input
                v-model="ruleForm.BDSQY"
                placeholder="请输入本地授权员"
                clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="说明：" prop="explain">
            <el-input
              v-model="ruleForm.explain"
              class="info-queryUnit"
              type="textarea"
              placeholder="说明"
              clearable/>
          </el-form-item>
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
  name: 'T5551',
  components: { DateTime },
  data() {
    const validLWHCJGType = (rule, value, callback) => {
      let obj = {}
      obj = this.LWHCJGTypes.find((item) => {
        return item.id === this.value
      })
      this.LWHCJGTypesValue = obj.label
    }
    const validOperationType = (rule, value, callback) => {
      this.ruleForm.startDate = ''
      this.ruleForm.institutionCode = ''
      this.ruleForm.endDate = ''
      this.ruleForm.tellerNo = ''
      this.ruleForm.CQLXType = ''
      this.ruleForm.CQ = ''
      this.ruleForm.BZType = ''
      this.ruleForm.JYJE = ''
      this.ruleForm.accountCardNo = ''
      this.ruleForm.accountName = ''
      this.ruleForm.tradeNo = ''
      this.ruleForm.tradeName = ''
      this.ruleForm.ZJType = ''
      this.ruleForm.ZJCode = ''
      this.ruleForm.DLRZJType = ''
      this.ruleForm.DLRZJCode = ''
      this.ruleForm.DLRMC = ''
      this.ruleForm.DLRDH = ''
      this.ruleForm.DLRDZ = ''
      this.ruleForm.LWHCJGType = ''
      this.ruleForm.SQY = ''
      this.ruleForm.BDSQY = ''
      this.ruleForm.explain = ''
      if (this.ruleForm.operationType === '0') { // 查询
        this.disabledInstitutionCode = false
        this.disabledTellerno = false
        this.disabledStartDate = false
        this.disabledendDate = false
        this.rules.startDate[0].required = true
        this.rules.endDate[0].required = true
        this.rules.institutionCode[0].required = false
        this.rules.tellerNo[0].required = false
        this.rules.CQLXType[0].required = false
        this.rules.CQ[0].required = false
        this.rules.BZType[0].required = false
        this.rules.JYJE[0].required = false
        this.rules.accountCardNo[0].required = false
        this.rules.accountName[0].required = false
        this.rules.tradeNo[0].required = false
        this.rules.tradeName[0].required = false
        this.rules.ZJType[0].required = false
        this.rules.ZJCode[0].required = false
        this.rules.DLRZJType[0].required = false
        this.rules.DLRZJCode[0].required = false
        this.rules.DLRMC[0].required = false
        this.rules.DLRDH[0].required = false
        this.rules.DLRDZ[0].required = false
        this.rules.LWHCJGType[0].required = false
        this.rules.SQY[0].required = false
        this.rules.BDSQY[0].required = false
        this.rules.explain[0].required = false
        this.$refs['OperationUint'].focus()
      } else { // 登记
        // this.disabledInstitutionCode = true
        // this.disabledTellerno = true
        // this.disabledStartDate = true
        // this.disabledendDate = true
        // this.rules.startDate[0].required = false
        // this.rules.endDate[0].required = false
        // this.rules.institutionCode[0].required = false
        // this.rules.tellerNo[0].required = false
        // this.rules.CQLXType[0].required = false
        // this.rules.CQ[0].required = false
        // this.rules.BZType[0].required = true
        // this.rules.JYJE[0].required = true
        // this.rules.accountCardNo[0].required = true
        // this.rules.accountName[0].required = true
        // this.rules.tradeNo[0].required = false
        // this.rules.tradeName[0].required = false
        // this.rules.ZJType[0].required = false
        // this.rules.ZJCode[0].required = false
        // this.rules.DLRZJType[0].required = false
        // this.rules.DLRZJCode[0].required = false
        // this.rules.DLRMC[0].required = false
        // this.rules.DLRDH[0].required = false
        // this.rules.DLRDZ[0].required = false
        // this.rules.LWHCJGType[0].required = true
        // this.rules.SQY[0].required = true
        // this.rules.BDSQY[0].required = false
        // this.rules.explain[0].required = false
        // this.operationUints5551 = this.operationUints
        // this.$refs['OperationUint'].focus()
        callback(new Error('功能开发中'))
      }
    }
    return {
      operationUints: [{
        value: '1',
        label: '个人'
      }, {
        value: '2',
        label: '对公'
      }],
      catrflag: '', // 现转标志
      LWHCJGTypesValue: '', // 联网核查 -label
      disabledStartDate: false,
      disabledendDate: false,
      disabledInstitutionCode: false,
      disabledTellerno: false,
      tradeTypes5550: this.$combo.tradeTypes5550, // 操作类型
      operationUints5551: this.$combo.operationUints5551, // 操作单位
      CQLXTypes5551: this.$combo.CQLXTypes5551, // 存款类型
      BZTypes5550: this.$combo.BZTypes5550, // 币种
      ZJTypes: this.$combo.bQueryNames, // 证件类型
      LWHCJGTypes: this.$combo.LWHCJGTypes, // 代理人证件类型
      CurrentUserNo: '', // 初始化-当前柜员号
      CurrentUserName: '', // 初始化-当前柜员名称
      CurrentBranchNo: '', // 初始化-当前机构号
      CurrentBranchName: '', // 初始化-当前机构名称
      CurrentZoneNo: '', // 初始化-当前地区号
      CurrentSystemDate: '', // 初始化-当前系统日期
      CurrentSystemTime: '', // 当前系统时间
      ruleForm: {
        operationType: '', // 操作类型
        operationUint: '', // 操作单位
        startDate: '', // 起始日期
        endDate: '', // 结束日期
        institutionCode: '', // 机构代码
        tellerNo: '', // 柜员号
        CQLXType: '', // 存取类型
        CQ: '', // 存期
        BZType: '', // 币种
        JYJE: '', // 交易金额
        accountCardNo: '', // 帐卡号
        accountName: '', // 户名
        tradeNo: '', // 交易码
        tradeName: '', // 交易名称
        ZJType: '', // 证件类型
        ZJCode: '', // 证件号码
        DLRZJType: '', // 代理人证件类型
        DLRZJCode: '', // 代理人证件号码
        DLRMC: '', // 代理人名称
        DLRDH: '', // 代理人电话
        DLRDZ: '', // 代理人地址
        LWHCJGType: '', // 联网核查结果
        SQY: '', // 授权员
        BDSQY: '', // 本地授权员
        explain: '' // 说明
      },
      rules: {
        operationType: [
          { required: true, message: '请选择操作类型', trigger: 'change' },
          { trigger: 'change', validator: validOperationType }
        ],
        operationUint: [
          { required: true, message: '请选择操作单位', trigger: 'change' }
        ],
        startDate: [
          { required: false, message: '请选择起始日期', trigger: 'blur' }
        ],
        endDate: [
          { required: false, message: '请选择结束日期', trigger: 'blur' }
        ],
        institutionCode: [
          { required: false, message: '请输入机构代码', trigger: 'blur' }
        ],
        tellerNo: [
          { required: false, message: '请输入柜员号', trigger: 'blur' }
        ],
        CQLXType: [
          { required: false, message: '请选择存取类型', trigger: 'blur' }
        ],
        CQ: [
          { required: false, message: '请输入存期', trigger: 'blur' }
        ],
        BZType: [
          { required: false, message: '请选择币种', trigger: 'blur' }
        ],
        JYJE: [
          { required: false, message: '请输入交易金额', trigger: 'blur' }
        ],
        accountCardNo: [
          { required: false, message: '请输入账/卡号', trigger: 'blur' }
        ],
        accountName: [
          { required: false, message: '请输入户名', trigger: 'change' }
        ],
        JYMC: [
          { required: false, message: '请输入交易名称', trigger: 'blur' }
        ],
        tradeNo: [
          { required: false, message: '请输入交易码', trigger: 'blur' }
        ],
        tradeName: [
          { required: false, message: '请输入交易名称', trigger: 'blur' }
        ],
        ZJType: [
          { required: false, message: '请选择证件类型', trigger: 'blur' }
        ],
        ZJCode: [
          { required: false, message: '请输入证件号码', trigger: 'blur' }
        ],
        DLRZJType: [
          { required: false, message: '请选择代理人证件类型', trigger: 'blur' }
        ],
        DLRZJCode: [
          { required: false, message: '请输入代理人证件号码', trigger: 'blur' }
        ],
        DLRMC: [
          { required: false, message: '请输入代理人名称', trigger: 'blur' }
        ],
        DLRDH: [
          { required: false, message: '请输入代理人电话', trigger: 'blur' }
        ],
        DLRDZ: [
          { required: false, message: '请输入代理人地址', trigger: 'blur' }
        ],
        LWHCJGType: [
          { required: false, message: '请选择联网核查结果', trigger: 'blur' },
          { trigger: 'change', validator: validLWHCJGType }
        ],
        SQY: [
          { required: false, message: '请输入授权员', trigger: 'blur' }
        ],
        BDSQY: [
          { required: false, message: '请输入本地授权员', trigger: 'blur' }
        ],
        explain: [
          { required: false, message: '请输入说明信息', trigger: 'blur' }
        ]
      }
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
      if (this.ruleForm.CQLXType === '1' || this.ruleForm.CQLXType === '2') {
        this.catrflag = '0'
      } else if (this.ruleForm.CQLXType === '3' || this.ruleForm.CQLXType === '4') {
        this.catrflag = '1'
      }
      if (this.ruleForm.operationType !== '0') { // 登记操作
        this.$message.error('功能开发中')
        return
        // const map = {
        //   'TRADEDATE': this.CurrentSystemDate,
        //   'TRADETIME': new DateTime().getTime(),
        //   'ZONENO': this.CurrentZoneNo,
        //   'BRANCHNO': this.CurrentBranchNo,
        //   'CURRENCYTYPE': this.ruleForm.BZType,
        //   'ACCNO': this.ruleForm.accountCardNo,
        //   'AMOUNT': this.ruleForm.JYJE,
        //   'TRADECODE': this.ruleForm.tradeNo,
        //   'TRADENAME': this.ruleForm.tradeName,
        //   'CQTYPE': this.ruleForm.CQLXType,
        //   'TERM': this.ruleForm.CQ,
        //   'IDTYPE': this.ruleForm.ZJType,
        //   'IDNO': this.ruleForm.ZJCode,
        //   'DEPUTYTYPE': this.ruleForm.DLRZJType,
        //   'USERNO': this.CurrentUserNo,
        //   'ACCNAME': this.ruleForm.accountName,
        //   'DEPUTYNO': this.ruleForm.DLRZJCode,
        //   'DEPUTYNAME': this.ruleForm.DLRMC,
        //   'CHECKUSERNO': this.ruleForm.SQY,
        //   'ACCTYPE': this.ruleForm.operationUint,
        //   'DESCRIPTION': this.ruleForm.LWHCJGType + this.LWHCJGTypesValue,
        //   'CATRFLAG': this.catrflag,
        //   'NOTE1': this.ruleForm.explain,
        //   'NOTE2': '',
        //   'DEPUTYPHONENUMBER': this.ruleForm.DLRDH,
        //   'DEPUTYADDRESS': this.ruleForm.DLRDZ
        // }
        // const params1 = { 'ruleForm': JSON.stringify(map) }
        // const url1 = this.$registerBookApi.insertXR_AUDIT_BIGAMOUNT
        // this.$http(url1, params1).then( // 通讯后台修改数据库中信息
        //   res => {
        //     const _data = res.data
        //     // 赋值
        //     if (_data.code === 'SUCCESS') {
        //       if (_data.data.TrxCode === '000000') {
        //         console.log('---insertXR_AUDIT_BIGAMOUNT---' + JSON.stringify(res.data))
        //         this.messageSuccess('登记成功!   流水号' + _data.data._MAINLSH_)
        //         return
        //       } else {
        //         if (_data.data.TrxCode === 'T5549_002') {
        //           this.messageWarning('登记失败!')
        //           return
        //         } else {
        //           this.messageError('错误信息 ： ' + _data.data.TrxMessage)
        //           return
        //         }
        //       }
        //     } else {
        //       this.messageError('错误信息 ： ' + _data.message)
        //       return
        //     }
        //   })
      } else { // 查询
        const params0 = { 'branchno': this.ruleForm.institutionCode === '' ? this.CurrentBranchNo : this.ruleForm.institutionCode }
        const url0 = this.$systemPublicApi.getBranchLevel
        this.$http(url0, params0).then( // 通讯后台修改数据库中信息
          res => {
            console.log('--getBranchLevel--' + JSON.stringify(res.data))
            const _data = res.data
            if (_data.ErrCode === '0000') {
              if (this.ruleForm.institutionCode === '019807' || this.ruleForm.institutionCode === '011901') {
                this.BranchLevel = '1'
              } else {
                this.BranchLevel = _data.BranchLevel
                if (this.BranchLevel === '3') {
                  if (this.ruleForm.institutionCode !== '') {
                    this.BranchLevel = '4'
                  }
                }
              }
            } else {
              if (this.ruleForm.institutionCode !== '') {
                if (this.ruleForm.institutionCode.substring(2) === '0000') {
                  this.BranchLevel = '2'
                } else if (this.ruleForm.institutionCode.substring(4) === '00') {
                  this.BranchLevel = '3'
                }
              } else {
                if (this.CurrentBranchNo === '019807' || this.CurrentBranchNo === '011901') {
                  this.BranchLevel = '1'
                } else {
                  this.BranchLevel = _data.BranchLevel
                }
                this.ruleForm.institutionCode = this.CurrentBranchNo
              }
              if (this.ruleForm.institutionCode === '') {
                this.BranchLevel = '1'
              }
            }
            const map = {
              'startdate': this.ruleForm.startDate,
              'enddate': this.ruleForm.endDate,
              'brno': this.ruleForm.institutionCode === '' ? this.CurrentBranchNo : this.ruleForm.institutionCode,
              'branchlevel': this.BranchLevel,
              'tellerno': this.ruleForm.tellerNo,
              'currencytype': this.ruleForm.BZType,
              'accno': this.ruleForm.accountCardNo,
              'amount': this.ruleForm.JYJE,
              'tradecode': this.ruleForm.tradeNo,
              'tradename': this.ruleForm.tradeName,
              'cqtype': this.ruleForm.CQLXType,
              'term': this.ruleForm.CQ,
              'idtype': this.ruleForm.ZJType,
              'idno': this.ruleForm.ZJCode,
              'deputytype': this.ruleForm.DLRZJType,
              'accname': this.ruleForm.accountName,
              'deputyno': this.ruleForm.DLRZJCode,
              'deputyname': this.ruleForm.DLRMC,
              'checkuserno': this.ruleForm.SQY,
              'acctype': this.ruleForm.operationUint === '3' ? '' : this.ruleForm.operationUint,
              'description': this.ruleForm.LWHCJGType + this.LWHCJGTypesValue,
              'catrflag': this.catrflag
            }
            const params1 = { 'ruleForm': JSON.stringify(map), 'pageNum': '1', 'pageSize': '10' }
            const url1 = this.$registerBookApi.getXR_AUDIT_BIGAMOUNT
            this.$http(url1, params1).then( // 通讯后台修改数据库中信息
              res => {
                const _data = res.data
                // 赋值
                if (_data.code === 'SUCCESS') {
                  if (_data.data.TrxCode === '000000') {
                    console.log('---getXR_AUDIT_PAYVERIFICATION---' + JSON.stringify(res.data))
                    this.tableData = res.data
                    this.$router.push({
                      path: this.redirect || '/T555101',
                      name: 'T555101',
                      params: {
                        map: _data.data.PageInfo,
                        totalNum: _data.data.PageInfo.total
                      }
                    })
                  } else {
                    if (_data.data.TrxCode === 'T5551_001') {
                      this.messageWarning('没有记录!')
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
