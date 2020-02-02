<template>
  <el-main>
    <div>
      <el-form
        ref="form"
        :model="ruleForm"
        :rules="rules"
        class="demo-form-inline"
        label-width="100px"
        size="small">
        <hr>
        <br>
        <el-row>
          <el-col :span="8">
            <el-form-item label="操作类型：" prop="operationType">
              <el-select v-model="ruleForm.operationType" style="width: 80%;" placeholder="请选择" clearable>
                <el-option v-for="item in operationTypes" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="操作方式：" prop="operationWay">
              <el-select v-model="ruleForm.operationWay" style="width: 80%;" placeholder="请选择" clearable>
                <el-option v-for="item in operationWays" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="客户类型：" prop="clientType">
              <el-select v-model="ruleForm.clientType" style="width: 80%;" placeholder="请选择" clearable>
                <el-option v-for="item in clientTypes" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="分行：" prop="bankBranch">
              <el-select :disabled="true" v-model="ruleForm.bankBranch" style="width: 80%;" placeholder="请选择" clearable>
                <el-option v-for="item in bankBranchs" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="机构代码：" prop="institutionCode">
              <el-input :disabled="false" v-model="ruleForm.institutionCode" style="width: 80%;" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="柜员号：" style="width: 80%;" prop="BranchCode" >
              <el-input
                :disabled="disabledBranchCode"
                v-model="ruleForm.BranchCode"
                placeholder="柜员号"
                clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <hr>
        <br>
        <el-row>
          <el-col :span="8">
            <el-form-item label="起始日期：" prop="startDate" >
              <el-date-picker
                id="startDate"
                :disabled="disabledstartDate"
                v-model="ruleForm.startDate"
                :picker-options="pickerOptions1"
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
                :picker-options="pickerOptions1"
                type="date"
                placeholder="选择日期"
                editable
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyyMMdd"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="查询单位：" prop="queryUnit">
            <el-input
              v-model="ruleForm.queryUnit"
              type="textarea"
              placeholder="请输入单位"
              clearable/>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="查询人姓名1：" style="width: 80%;" prop="queryName1" >
              <el-input
                v-model="ruleForm.queryName1"
                placeholder="请输入查询人姓名"
                clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件号码1：" style="width: 80%;" prop="idNumber1" >
              <el-input
                v-model="ruleForm.idNumber1"
                placeholder="请输入证件号码"
                clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="查询人姓名2：" style="width: 80%;" prop="queryName2" >
              <el-input
                v-model="ruleForm.queryName2"
                placeholder="请输入查询人姓名"
                clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件号码2：" style="width: 80%;" prop="idNumber2" >
              <el-input
                v-model="ruleForm.idNumber2"
                placeholder="请输入证件号码"
                clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="法律文书名称：" prop="nameOfLegalInstrument" >
            <el-input
              v-model="ruleForm.nameOfLegalInstrument"
              type="textarea"
              placeholder="法律文书名称"
              clearable/>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="文号：" prop="referenceNumber">
            <el-input
              v-model="ruleForm.referenceNumber"
              type="textarea"
              placeholder="文号"
              clearable/>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="被查询人名称：" prop="byTheQuery" >
            <el-input
              v-model="ruleForm.byTheQuery"
              type="textarea"
              placeholder="被查询人名称"
              clearable/>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="被查询人证件类型：" prop="bQueryName" >
              <el-select v-model="ruleForm.bQueryName" placeholder="请选择" clearable>
                <el-option v-for="item in bQueryNames" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件号码：" style="width: 80%;" prop="bQueryIdNumber" >
              <el-input
                v-model="ruleForm.bQueryIdNumber"
                placeholder="请输入证件号码"
                clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="凭证类型：" prop="certificateType" >
              <el-select v-model="ruleForm.certificateType" placeholder="请选择" clearable>
                <el-option v-for="item in certificateTypes" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="被查询人账号：" style="width: 80%;" prop="bQuerycertificateNumber" >
              <el-input
                v-model="ruleForm.bQuerycertificateNumber"
                placeholder="请输入被查询人账号"
                clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="查询结果：" prop="searchResult">
            <el-input
              :disabled="disabledsearchResult"
              v-model="ruleForm.searchResult"
              type="textarea"
              placeholder="查询结果"
              clearable/>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="说明：" prop="explain">
            <el-input
              v-model="ruleForm.explain"
              type="textarea"
              placeholder="说明"
              clearable/>
          </el-form-item>
        </el-row>
      </el-form>
      <div class="dialog-footer" style="width: 92%;" align="right">
        <el-row>
          <el-col :span="8">
            <el-button size="medium" type="primary" @click="registerClick">{{ returnregister }}</el-button>
          </el-col>
          <el-col :span="8">
            <el-button size="medium" type="primary" @click="exitTrade()">退出</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </el-main>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'T5502',
  data() {
    const validateOperationType = (rule, value, callback) => {
      // const params = { 'BRANCHNO': '', 'BRANCHNAME': '' }
      // this.$http(this.$reportMngApi.getxrEFBRANCH, params).then( // 此处调用自己的Api接口方法
      //   res => {
      //     const resdata = res.data.data
      //     if (resdata.TrxMessage === 'SUCCESS') {
      //       if (resdata.TrxCode === '000000') {
      //         // 赋值
      //         const myList = resdata.PageInfo.list
      //         var i = 0
      //         var map = [{ // 对公对私标志下拉列表
      //           value: '0',
      //           label: '客户'
      //         }]
      //         for (i = 0; i < myList.length; i++) {
      //           var aa = {}
      //           aa.value = resdata.PageInfo.list[i].branchno
      //           aa.label = resdata.PageInfo.list[i].branchname
      //           map.push(aa)
      //         }
      //         // this.institutionCodes = map
      //       } else {
      //         this.$message({
      //           showClose: true,
      //           message: '错误信息 : ' + resdata.data.TrxMessage,
      //           type: 'warning'
      //         })
      //       }
      //     } else {
      //       this.$message({
      //         showClose: true,
      //         message: '错误信息 : ' + res.data.message,
      //         type: 'warning'
      //       })
      //     }
      //   }
      // )
      this.ruleForm.operationWay = ''
      this.ruleForm.clientType = ''
      this.ruleForm.bankBranch = ''
      this.ruleForm.institutionCode = ''
      this.ruleForm.BranchCode = ''
      this.ruleForm.startDate = ''
      this.ruleForm.endDate = ''
      this.ruleForm.queryUnit = ''
      this.ruleForm.queryName1 = ''
      this.ruleForm.idNumber1 = ''
      this.ruleForm.queryName2 = ''
      this.ruleForm.idNumber2 = ''
      this.ruleForm.nameOfLegalInstrument = ''
      this.ruleForm.referenceNumber = ''
      this.ruleForm.byTheQuery = ''
      this.ruleForm.bQueryName = ''
      this.ruleForm.bQueryIdNumber = ''
      this.ruleForm.certificateType = ''
      this.ruleForm.bQuerycertificateNumber = ''
      this.ruleForm.searchResult = ''
      this.ruleForm.explain = ''
      // 操作类型
      if (value === '0') {
        this.returnregister = '查询'
        this.rules.startDate[0].required = true
        this.rules.endDate[0].required = true
        this.rules.queryUnit[0].required = false
        this.rules.nameOfLegalInstrument[0].required = false
        this.rules.referenceNumber[0].required = false
        this.rules.byTheQuery[0].required = false
        this.rules.bQueryName[0].required = false
        this.rules.clientType[0].required = false
        this.disabledstartDate = false
        this.disabledendDate = false
        this.disabledsearchResult = true
        this.HighShootdisabled = true
        this.disabledBranchCode = false
        callback()
      } else {
        // this.returnregister = '登记'
        // this.rules.startDate[0].required = false
        // this.rules.endDate[0].required = false
        // this.rules.queryUnit[0].required = true
        // this.rules.nameOfLegalInstrument[0].required = true
        // this.rules.referenceNumber[0].required = false
        // this.rules.byTheQuery[0].required = false
        // this.rules.bQueryName[0].required = false
        // this.rules.clientType[0].required = true
        // this.disabledstartDate = true
        // this.disabledendDate = true
        // this.disabledsearchResult = false
        // this.HighShootdisabled = false
        // this.disabledBranchCode = true
        callback(new Error('功能开发中'))
      }
    }
    const validateoperationWay = (rule, value, callback) => {
      // 操作方式
      if (this.ruleForm.operationType !== '0') {
        if (value === '3') {
          callback(new Error('请重新选择操作方式'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    const validatorstartDate = (rule, value, callback) => {
      if (this.ruleForm.endDate) {
        if (this.ruleForm.startDate * 1 > this.ruleForm.endDate * 1) {
          this.ruleForm.startDate = ''
          callback(new Error('起始日期不能大于终止日期'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    const validatorendDate = (rule, value, callback) => {
      if (this.ruleForm.startDate) {
        if (this.ruleForm.startDate * 1 > this.ruleForm.endDate * 1) {
          this.ruleForm.endDate = ''
          callback(new Error('结束日期不能小于起始日期'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    const validatorqueryName1 = (rule, value, callback) => {
      if (value) {
        this.rules.idNumber1[0].required = true
        callback()
      } else {
        this.rules.idNumber1[0].required = false
        callback()
      }
    }
    const validatorqueryName2 = (rule, value, callback) => {
      if (this.ruleForm.startDate) {
        if (value) {
          this.rules.idNumber2[0].required = true
          callback()
        } else {
          this.rules.idNumber2[0].required = false
          callback(new Error('查询人信息不能同时为空，请重新输入！'))
        }
      } else {
        if (value) {
          this.rules.idNumber2[0].required = true
          callback()
        } else {
          this.rules.idNumber2[0].required = false
          callback()
        }
      }
    }
    const validatorbQueryName = (rule, value, callback) => {
      if (value) {
        this.rules.bQueryIdNumber[0].required = true
        callback()
      } else {
        this.rules.bQueryIdNumber[0].required = false
        callback()
      }
    }
    const validatorbQuerycertificateNumber = (rule, value, callback) => {
      if (value.trim() !== '') {
        // 校验账号格式
        var reg = /^[0-9a-zA-Z-]+$/
        console.log(value.search(reg))
        if (value.search(reg) === -1) {
          callback(new Error('账号格式错误，只能输入数字、-、字母！'))
          return
        }
        callback()
      } else {
        callback()
      }
    }
    return {
      returnregister: '登记',
      CurrentBranchNo: '',
      disabledstartDate: false,
      disabledendDate: false,
      disabledsearchResult: true,
      HighShootdisabled: false,
      disabledBranchCode: false,
      institutionCodes: {},
      ruleForm: {
        operationType: '',
        operationWay: '',
        clientType: '',
        bankBranch: '',
        institutionCode: '',
        BranchCode: '',
        startDate: '',
        endDate: '',
        queryUnit: '',
        queryName1: '',
        idNumber1: '',
        queryName2: '',
        idNumber2: '',
        nameOfLegalInstrument: '',
        referenceNumber: '',
        byTheQuery: '',
        bQueryName: '',
        bQueryIdNumber: '',
        certificateType: '',
        bQuerycertificateNumber: '',
        searchResult: '',
        explain: ''
      },
      rules: {
        operationType: [
          { required: true, message: '请选择操作类型', trigger: 'change' },
          { trigger: 'change', validator: validateOperationType }
        ],
        operationWay: [
          { required: true, message: '请选择操作方式', trugger: 'change' },
          { trigger: 'change', validator: validateoperationWay }
        ],
        clientType: [
          { required: false, message: '请选择客户类型', trugger: 'change' }
        ],
        bankBranch: [
          { required: false, message: '请选择分行', trugger: 'change' }
        ],
        institutionCode: [
          { required: true, message: '请选择机构代码', trugger: 'change' }
        ],
        BranchCode: [
          { required: false, message: '请选择支行代码', turgger: 'change' }
        ],
        startDate: [
          { required: true, message: '请选择起始日期', trugger: 'blur' },
          { trigger: 'blur', validator: validatorstartDate }
        ],
        endDate: [
          { required: true, message: '请选择结束日期', turgger: 'blur' },
          { trigger: 'blur', validator: validatorendDate }
        ],
        queryUnit: [
          { required: false, message: '请输入查询单位', turgger: 'blur' }
        ],
        nameOfLegalInstrument: [
          { required: false, message: '请输入法律文书名称', turgger: 'blur' }
        ],
        referenceNumber: [
          { required: false, message: '请输入文号', turgger: 'blur' }
        ],
        byTheQuery: [
          { required: false, message: '请输入被查询人名称', turgger: 'blur' }
        ],
        bQueryName: [
          { required: false, message: '请输入被查询人证件类型', turgger: 'change' },
          { trigger: 'change', validator: validatorbQueryName }
        ],
        bQueryIdNumber: [
          { required: false, message: '请输入被查询人证件号码', turgger: 'blur' },
          { min: 0, max: 35, message: '长度在 0 到 35 个字符', trigger: 'blur' }
        ],
        queryName1: [
          { required: false, message: '请输入被查询人名称', turgger: 'blur' },
          { trigger: 'blur', validator: validatorqueryName1 }
        ],
        idNumber1: [
          { required: false, message: '请输入证件号码1', turgger: 'blur' },
          { min: 0, max: 35, message: '长度在 0 到 35 个字符', trigger: 'blur' }
        ],
        queryName2: [
          { required: false, message: '请输入被查询人名称', turgger: 'blur' },
          { trigger: 'blur', validator: validatorqueryName2 }
        ],
        idNumber2: [
          { required: false, message: '请输入证件号码2', turgger: 'blur' },
          { min: 0, max: 35, message: '长度在 0 到 35 个字符', trigger: 'blur' }
        ],
        bQuerycertificateNumber: [
          { required: false, message: '请输入被查询人账号', turgger: 'blur' },
          { min: 0, max: 32, message: '长度在 0 到 32 个字符', trigger: 'blur' },
          { trigger: 'blur', validator: validatorbQuerycertificateNumber }
        ]
      },
      pickerOptions1: {
        disabledDate(time) {
          // return time.getTime() > Date.now()
        }, shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            console.log('date----------------->' + date)
            picker.$emit('pick', date)
          }
        }]
      },
      operationTypes: this.$combo.operationType1,
      operationWays: this.$combo.operationWays,
      clientTypes: this.$combo.clientTypes,
      bQueryNames: this.$combo.bQueryNames,
      certificateTypes: this.$combo.certificateTypes,
      bankBranchs: this.$combo.clientTypes
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
    this.$http(this.$systemPublicApi.getSystemPublicInfo)
      .then(
        res => {
          this.CurrentBranchNo = res.data.CurrentBranchNo
        })
  },
  methods: { // 事件
    exitTrade() { // 交易退出返回首页
      this.$router.push({
        path: this.redirect || '/dashboard'
      })
    },
    registerClick: function() { // 查询
      // this.$refs.form.validate(valid => {
      //   if (valid) {
      this.query()
      // }
      // })
    },
    query: function() {
      if (this.returnregister === '查询') {
        if (this.ruleForm.operationWay === '3') {
          console.log('3--------->' + this.ruleForm.institutionCode)
          const params = { 'STARTDATE': this.ruleForm.startDate, 'ENDDATE': this.ruleForm.endDate, 'BRNO': this.ruleForm.institutionCode, 'BRANCHLEVEL': '', 'TELLERNO': this.ruleForm.BranchCode,
            'SELECTTYPE': '', 'EMPLOYER': this.ruleForm.queryUnit, 'LAWNAME': this.ruleForm.nameOfLegalInstrument, 'LAWNO': this.ruleForm.referenceNumber,
            'NAME3': this.ruleForm.byTheQuery, 'IDTYPE3': this.ruleForm.bQueryName, 'IDNO3': this.ruleForm.bQueryIdNumber, 'ACCTYPE': this.ruleForm.certificateType,
            'ACCNO': this.ruleForm.bQuerycertificateNumber, 'CUSTMTYPE': this.ruleForm.clientType, 'pageNum': '1', 'pageSize': '10' }
          this.$http(this.$reportMngApi.getXRPISDEPOSITREGISTER, params).then( // 此处调用自己的Api接口方法
            res => {
              const resdata = res.data.data
              console.log(res.data)
              console.log(resdata)
              console.log(resdata.PageInfo)
              if (resdata.TrxCode === '000000') {
                // 赋值
                this.totals = resdata.PageInfo.total
                this.tableData = resdata.PageInfo.list
                console.log('-------------------')
                this.$router.push({
                  path: this.redirect || '/T55021',
                  name: 'T55021',
                  params: {
                    map: resdata.PageInfo,
                    totalNum: resdata.TotalNum,
                    STARTDATE: this.ruleForm.startDate,
                    ENDDATE: this.ruleForm.endDate,
                    BRNO: this.ruleForm.institutionCode,
                    BRANCHLEVEL: '',
                    TELLERNO: this.ruleForm.BranchCode,
                    SELECTTYPE: this.ruleForm.operationType,
                    EMPLOYER: this.ruleForm.queryUnit,
                    LAWNAME: this.ruleForm.nameOfLegalInstrument,
                    LAWNO: this.ruleForm.referenceNumber,
                    NAME3: this.ruleForm.byTheQuery,
                    IDTYPE3: this.ruleForm.bQueryName,
                    IDNO3: this.ruleForm.bQueryIdNumber,
                    ACCTYPE: this.ruleForm.certificateType,
                    ACCNO: this.ruleForm.bQuerycertificateNumber,
                    CUSTMTYPE: this.ruleForm.clientType
                  }
                })
              } else {
                this.$message({
                  showClose: true,
                  message: '错误信息 : ' + resdata.TrxMessage,
                  type: 'warning'
                })
              }
            }
          )
        } else {
          console.log('X--------->' + this.ruleForm.institutionCode)
          const params = { 'STARTDATE': this.ruleForm.startDate, 'ENDDATE': this.ruleForm.endDate, 'BRNO': this.ruleForm.institutionCode, 'BRANCHLEVEL': '', 'TELLERNO': this.ruleForm.BranchCode,
            'SELECTTYPE': this.ruleForm.operationType, 'EMPLOYER': this.ruleForm.queryUnit, 'LAWNAME': this.ruleForm.nameOfLegalInstrument, 'LAWNO': this.ruleForm.referenceNumber,
            'NAME3': this.ruleForm.byTheQuery, 'IDTYPE3': this.ruleForm.bQueryName, 'IDNO3': this.ruleForm.bQueryIdNumber, 'ACCTYPE': this.ruleForm.certificateType,
            'ACCNO': this.ruleForm.bQuerycertificateNumber, 'CUSTMTYPE': this.ruleForm.clientType, 'pageNum': '1', 'pageSize': '10' }
          this.$http(this.$reportMngApi.getXRPISDEPOSITREGISTER, params).then( // 此处调用自己的Api接口方法
            res => {
              const resdata = res.data.data
              console.log(res.data)
              console.log(resdata)
              console.log(resdata.TrxCode)
              if (resdata.TrxCode === '000000') {
                // 赋值
                this.totals = resdata.PageInfo.total
                this.tableData = resdata.PageInfo.list
                console.log('-------------------')
                this.$router.push({
                  path: this.redirect || '/T55021',
                  name: 'T55021',
                  params: {
                    map: resdata.PageInfo,
                    totalNum: resdata.TotalNum,
                    STARTDATE: this.ruleForm.startDate,
                    ENDDATE: this.ruleForm.endDate,
                    BRNO: this.ruleForm.institutionCode,
                    BRANCHLEVEL: '',
                    TELLERNO: this.ruleForm.BranchCode,
                    SELECTTYPE: this.ruleForm.operationType,
                    EMPLOYER: this.ruleForm.queryUnit,
                    LAWNAME: this.ruleForm.nameOfLegalInstrument,
                    LAWNO: this.ruleForm.referenceNumber,
                    NAME3: this.ruleForm.byTheQuery,
                    IDTYPE3: this.ruleForm.bQueryName,
                    IDNO3: this.ruleForm.bQueryIdNumber,
                    ACCTYPE: this.ruleForm.certificateType,
                    ACCNO: this.ruleForm.bQuerycertificateNumber,
                    CUSTMTYPE: this.ruleForm.clientType
                  }
                })
              } else {
                this.$message({
                  showClose: true,
                  message: '错误信息 : ' + resdata.TrxMessage,
                  type: 'warning'
                })
              }
            }
          )
        }
      } else if (this.returnregister === '登记') {
        this.$message.error('功能开发中')
        return
      //   const myDate = new Date()
      //   const mytime = myDate.getHours() + ':' + myDate.getMinutes() + ':' + myDate.getSeconds()
      //   const params = { 'TRADEDATE': myDate, 'TRADETIME': mytime, 'SELECTTYPE': this.ruleForm.operationWay, 'EMPLOYER': this.ruleForm.queryUnit, 'NAME1': this.ruleForm.queryName1,
      //     'IDNO1': this.ruleForm.idNumber1, 'NAME2': this.ruleForm.queryName2, 'IDNO2': this.ruleForm.idNumber2, 'LAWNAME': this.ruleForm.nameOfLegalInstrument, 'LAWNO': this.ruleForm.referenceNumber,
      //     'NAME3': this.ruleForm.byTheQuery, 'IDTYPE3': this.ruleForm.bQueryName, 'IDNO3': this.ruleForm.bQueryIdNumber, 'ACCTYPE': this.ruleForm.certificateType, 'ACCNO': this.ruleForm.bQuerycertificateNumber,
      //     'AUTOGRAPH': '', 'BRNO': '', 'BRNAME': '', 'TELLERNO': '', 'TELLERNAME': '',
      //     'CAUSE': this.ruleForm.searchResult, 'ILLUSTRATE': this.ruleForm.explain, 'OPERATION': '2', 'CUSTMTYPE': this.ruleForm.clientType,
      //     'BEIYONG1': '', 'BEIYONG2': '', 'BEIYONG3': '', 'BEIYONG4': '', 'BEIYONG5': '' }
      //   this.$http(this.$reportMngApi.insertXRPISDEPOSITREGISTER, params).then( // 此处调用自己的Api接口方法
      //     res => {
      //       const resdata = res.data.data
      //       console.log(res.data)
      //       if (resdata.TrxCode === '000000') {
      //         // 赋值
      //         this.$message({
      //           showClose: true,
      //           message: resdata.TrxMessage,
      //           type: 'warning'
      //         })
      //       } else if (resdata.TrxCode === 'T5502') {
      //         this.$message({
      //           showClose: true,
      //           message: '错误信息 : ' + resdata.TrxMessage,
      //           type: 'warning'
      //         })
      //       }
      //     }
      //   )
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
