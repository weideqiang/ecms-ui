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
            <el-form-item label="操作方式：" prop="operationType">
              <el-select v-model="ruleForm.operationType" style="width: 80%;" placeholder="请选择" clearable>
                <el-option v-for="item in operationTypes" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="起始日期：" prop="startDate">
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
          <el-col :span="8">
            <el-form-item label="机构代码：" prop="institutionCode">
              <el-input :disabled="false" v-model="ruleForm.institutionCode" style="width: 80%;" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="柜员号：" prop="BranchCode" >
              <el-input
                v-model="ruleForm.BranchCode"
                placeholder="请输入柜员号"
                clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <hr>
        <br>
        <el-row>
          <el-form-item label="凭证信息：" prop="queryPzxx" >
            <el-input
              v-model="ruleForm.queryPzxx"
              placeholder="请输入凭证信息"
              clearable/>
          </el-form-item>
        </el-row>
        <hr>
        <br>
        <el-row>
          <el-form-item label="账号：" prop="Number" >
            <el-input
              v-model="ruleForm.Number"
              :disabled="disabledNumber"
              placeholder="请输入账号"
              clearable/>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="户名：" prop="Name" >
            <el-input
              v-model="ruleForm.Name"
              placeholder="请输入户名"
              clearable/>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="领用人：" style="width: 85%;" prop="LYR" >
              <el-input
                v-model="ruleForm.LYR"
                :disabled="disabledLYR"
                placeholder="请输入领用人"
                clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="领用人密码：" style="width: 85%;" prop="LYRMM" >
              <el-input
                v-model="ruleForm.LYRMM"
                type="password"
                placeholder="请输入领用人密码"
                clearable/>
            </el-form-item>
          </el-col>
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
  name: 'T5503',
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
      this.ruleForm.startDate = ''
      this.ruleForm.endDate = ''
      this.ruleForm.institutionCode = ''
      this.ruleForm.BranchCode = ''
      this.ruleForm.queryPzxx = ''
      this.ruleForm.queryPzStartCode = ''
      this.ruleForm.queryPzEndCode = ''
      this.ruleForm.queryPzlrsl = ''
      this.ruleForm.queryPzscsl = ''
      this.ruleForm.Number = ''
      this.ruleForm.Name = ''
      this.ruleForm.LYR = ''
      this.ruleForm.LYRMM = ''
      // 操作类型
      if (value === '0') {
        this.returnregister = '查询'
        this.disabledstartDate = false
        this.disabledendDate = false
        this.rules.startDate[0].required = true
        this.rules.endDate[0].required = true
        this.rules.queryPzxx[0].required = false
        this.rules.queryPzStartCode[0].required = false
        this.disabledqueryPzStartCode = true
        this.disabledqueryPzEndCode = true
        this.disabledqueryPzlrsl = true
        this.disabledqueryPzscsl = true
        this.rules.Number[0].required = false
        this.rules.LYR[0].required = false
        this.HighShootdisabled = true
      } else {
        // this.returnregister = '登记'
        // this.rules.startDate[0].required = false
        // this.rules.endDate[0].required = false
        // this.disabledstartDate = true
        // this.disabledendDate = true
        // this.rules.queryPzxx[0].required = true
        // this.rules.queryPzStartCode[0].required = false
        // this.disabledqueryPzStartCode = false
        // this.disabledqueryPzEndCode = false
        // this.disabledqueryPzlrsl = false
        // this.disabledqueryPzscsl = false
        // this.rules.Number[0].required = true
        // this.rules.LYR[0].required = true
        // this.HighShootdisabled = false
        callback(new Error('功能开发中'))
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
    const validatorqueryPzscsl = (rule, value, callback) => {}
    const validatorLYR = (rule, value, callback) => {}
    const validatorNumber = (rule, value, callback) => {
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
      returnregister: '查询',
      CurrentBranchNo: '', // 网点号
      CurrentBranchName: '', // 机构名称
      CurrentUserNo: '', // 柜员号
      CurrentUserName: '', // 柜员姓名
      disabledstartDate: false,
      disabledendDate: false,
      disabledinstitutionCode: false,
      disabledqueryPzStartCode: false,
      disabledqueryPzEndCode: false,
      disabledqueryPzlrsl: false,
      disabledqueryPzscsl: false,
      disabledNumber: false,
      disabledLYR: false,
      HighShootdisabled: true,
      institutionCodes: {},
      ruleForm: {
        operationType: '',
        startDate: '',
        endDate: '',
        institutionCode: '',
        BranchCode: '',
        queryPzxx: '',
        queryPzStartCode: '',
        queryPzEndCode: '',
        queryPzlrsl: '',
        queryPzscsl: '',
        Number: '',
        Name: '',
        LYR: '',
        LYRMM: ''
      },
      rules: {
        operationType: [
          { required: true, message: '请选择操作类型', trigger: 'change' },
          { trigger: 'change', validator: validateOperationType }
        ],
        startDate: [
          { required: true, message: '请选择起始日期', trigger: 'blur' },
          { trigger: 'blur', validator: validatorstartDate }
        ],
        endDate: [
          { required: true, message: '请选择结束日期', trigger: 'blur' },
          { trigger: 'blur', validator: validatorendDate }
        ],
        institutionCode: [
          { required: true, message: '请选择机构代码', trigger: 'change' }
        ],
        queryPzxx: [
          { required: false, message: '请输入凭证信息', trigger: 'blur' }
        ],
        queryPzStartCode: [
          { required: false, message: '请输入凭证起始号码', trigger: 'blur' }
        ],
        queryPzEndCode: [
          { required: false, message: '请输入凭证结束号码', trigger: 'blur' }
        ],
        queryPzlrsl: [
          { required: false, message: '请输入领入数量', trigger: 'blur' }
        ],
        queryPzscsl: [
          { required: false, message: '请输入售出数量', trigger: 'blur' },
          { trigger: 'blur', validator: validatorqueryPzscsl }
        ],
        Number: [
          { required: false, message: '请输入账号', trigger: 'blur' },
          { min: 0, max: 32, message: '长度在 0 到 32 个字符', trigger: 'blur' },
          { trigger: 'blur', validator: validatorNumber }
        ],
        LYR: [
          { required: false, message: '请输入领用人', trigger: 'blur' },
          { trigger: 'blur', validator: validatorLYR }
        ],
        explain: [
          { required: true, message: '请输入说明', trigger: 'blur' }
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
      operationTypes: this.$combo.operationType1
      // BranchCodes:
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
    const myDate = new Date()
    this.ruleForm.endDate = myDate
    this.$http(this.$systemPublicApi.getSystemPublicInfo)
      .then(
        res => {
          this.CurrentBranchNo = res.data.CurrentBranchNo // 网点号
          this.CurrentBranchName = res.data.CurrentBranchName // 机构名称
          this.CurrentUserNo = res.data.CurrentUserNo // 柜员号
          this.CurrentUserName = res.data.CurrentUserName // 柜员姓名
        })
  },
  methods: {
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
        const params = { 'STARTDATE': this.ruleForm.startDate, 'ENDDATE': this.ruleForm.endDate, 'BRNO': this.ruleForm.institutionCode, 'BRANCHLEVEL': '', 'TELLERNO': this.ruleForm.BranchCode,
          'CERTTYPE': this.ruleForm.queryPzxx, 'CERTSTARTNUMBER': '', 'CERTENDNUMBER': '', 'SHOWINNUMBER': '',
          'SALENUMBER': '', 'UNITNAME': this.ruleForm.Name, 'UNITACC': this.ruleForm.Number, 'COLLARMAN': this.ruleForm.LYR, 'pageNum': '1', 'pageSize': '10' }
        this.$http(this.$reportMngApi.getXRPISCERTSALEREGISTER, params).then( // 此处调用自己的Api接口方法
          res => {
            const resdata = res.data.data
            console.log(res.data)
            if (resdata.TrxCode === '000000') {
              // 赋值
              this.totals = resdata.PageInfo.total
              this.tableData = resdata.PageInfo.list
              console.log('-------------------')
              this.$router.push({
                path: this.redirect || '/T55031',
                name: 'T55031',
                params: {
                  map: resdata.PageInfo,
                  totalNum: resdata.TotalNum,
                  STARTDATE: this.ruleForm.startDate,
                  ENDDATE: this.ruleForm.endDate,
                  BRNO: this.ruleForm.institutionCode,
                  BRANCHLEVEL: '',
                  TELLERNO: this.ruleForm.BranchCode,
                  CERTTYPE: this.ruleForm.queryPzxx,
                  CERTSTARTNUMBER: '',
                  CERTENDNUMBER: '',
                  SHOWINNUMBER: '',
                  SALENUMBER: '',
                  UNITNAME: this.ruleForm.Name,
                  UNITACC: this.ruleForm.Number,
                  COLLARMAN: this.ruleForm.LYR
                }
              })
            } else if (resdata.TrxCode === 'T5503') {
              this.$message({
                showClose: true,
                message: '错误信息 : ' + resdata.TrxMessage,
                type: 'warning'
              })
            }
          }
        )
      } else if (this.returnregister === '登记') {
        this.$message.error('功能开发中')
        return
        // const myDate = new Date()
        // const mytime = myDate.getHours() + ':' + myDate.getMinutes() + ':' + myDate.getSeconds()
        // const params = { 'SALEDATE': myDate, 'SALETIME': mytime, 'CERTTYPE': this.ruleForm.queryPzxx, 'CERTSTARTNUMBER': this.ruleForm.queryPzStartCode, 'CERTENDNUMBER': this.ruleForm.queryPzEndCode, 'SHOWINNUMBER': this.ruleForm.queryPzlrsl,
        //   'SALENUMBER': this.ruleForm.queryPzscsl, 'UNITNAME': this.ruleForm.Name, 'UNITACC': this.ruleForm.Number, 'COLLARMAN': this.ruleForm.LYR, 'BRNO': this.CurrentBranchNo,
        //   'BRNAME': this.CurrentBranchName, 'TELLERNO': this.CurrentUserNo, 'TELLERNAME': this.CurrentUserName, 'SIGNINFO': '', 'MAINSERIALNO': '',
        //   'ILLUSTRATE': this.ruleForm.explain }
        // this.$http(this.$reportMngApi.insertXRPISCERTSALEREGISTER, params).then( // 此处调用自己的Api接口方法
        //   res => {
        //     const resdata = res.data.data
        //     console.log(res.data)
        //     if (resdata.TrxCode === '000000') {
        //       this.$message({
        //         showClose: true,
        //         message: resdata.TrxMessage,
        //         type: 'warning'
        //       })
        //       // 赋值
        //     } else if (resdata.TrxCode === 'T5503') {
        //       this.$message({
        //         showClose: true,
        //         message: '错误信息 : ' + resdata.TrxMessage,
        //         type: 'warning'
        //       })
        //     }
        //   }
        // )
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
