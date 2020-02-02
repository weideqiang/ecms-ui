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
            <el-form-item label="操作类型：" prop="operationType">
              <el-select v-model="ruleForm.operationType" style="width: 80%;" placeholder="请选择" clearable>
                <el-option v-for="item in operationTypes" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="操作单位：" prop="CZDWType">
              <el-select :disabled="disabledCZDWType" v-model="ruleForm.CZDWType" placeholder="请选择" style="width: 80%;" clearable>
                <el-option v-for="item in CZDWTypes" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="来源：" prop="LYType">
              <el-select v-model="ruleForm.LYType" placeholder="请选择" style="width: 80%;" clearable>
                <el-option v-for="item in LYTypes" :key="item.value" :label="item.label" :value="item.value"/>
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
                class="info-startDate"
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
            <el-form-item label="机构代码：" prop="institutionCode">
              <el-input :disabled="false" v-model="ruleForm.institutionCode" style="width: 80%;" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="柜员号：" style="width: 85%;" prop="GYH">
              <el-input :disabled="disabledGYH" v-model="ruleForm.GYH" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <hr>
        <br>
        <el-row>
          <el-col :span="8">
            <el-form-item label="ATM机编号：" style="width: 85%;" prop="ATMJBH">
              <el-input :disabled="disabledATMJBH" v-model="ruleForm.ATMJBH" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="凭证类型：" prop="certificateType" >
              <el-select v-model="ruleForm.certificateType" placeholder="请选择" style="width: 80%;" clearable>
                <el-option v-for="item in certificateTypes" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="账/卡号：" style="width: 85%;" prop="ZKH" >
              <el-input
                v-model="ruleForm.ZKH"
                placeholder="请输入账/卡号"
                clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="客户名称：" prop="KHMC">
          <el-input :disabled="disabledKHMC" v-model="ruleForm.KHMC" clearable/>
        </el-form-item>
        <el-row>
          <el-col :span="8">
            <el-form-item label="金额：" style="width: 85%;" prop="JE">
              <el-input :disabled="disabledJE" v-model="ruleForm.JE" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="差错原因：" style="width: 85%;" prop="CCYY">
              <el-input :disabled="disabledCCYY" v-model="ruleForm.CCYY" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="处理情况：" style="width: 85%;" prop="CLQK">
              <el-input :disabled="disabledCLQK" v-model="ruleForm.CLQK" clearable/>
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
  name: 'T5506',
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
      //         this.institutionCodes = map
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
      this.ruleForm.CZDWType = ''
      this.ruleForm.LYType = ''
      this.ruleForm.institutionCode = ''
      this.ruleForm.GYH = ''
      this.ruleForm.ATMJBH = ''
      this.ruleForm.certificateType = ''
      this.ruleForm.ZKH = ''
      this.ruleForm.KHMC = ''
      this.ruleForm.JE = ''
      this.ruleForm.CCYY = ''
      this.ruleForm.CLQK = ''
      this.ruleForm.explain = ''
      if (value === '0') {
        this.returnregister = '查询'
        // this.ruleForm.institutionCode = this.CurrentBranchNo
        this.disabledCZDWType = true
        this.disabledATMJBH = true
        this.disabledstartDate = false
        this.disabledendDate = false
        this.disabledGYH = false
        this.rules.ZKH[0].required = false
        this.rules.CZDWType[0].required = false
        this.rules.LYType[0].required = false
        this.rules.startDate[0].required = true
        this.rules.endDate[0].required = true
        this.rules.KHMC[0].required = false
        this.rules.JE[0].required = false
        this.rules.CCYY[0].required = false
        this.rules.CLQK[0].required = false
      } else {
        // this.returnregister = '登记'
        // this.disabledCZDWType = false
        // this.disabledstartDate = true
        // this.disabledendDate = true
        // this.disabledGYH = true
        // this.rules.CZDWType[0].required = true
        // this.rules.startDate[0].required = false
        // this.rules.endDate[0].required = false
        // this.rules.ZKH[0].required = true
        // this.rules.KHMC[0].required = true
        // this.rules.JE[0].required = true
        // this.rules.CCYY[0].required = true
        // this.rules.CLQK[0].required = true
        callback(new Error('功能开发中'))
      }
    }
    return {
      returnregister: '登记',
      CurrentBranchNo: '', // 网点号
      CurrentBranchName: '', // 机构名称
      CurrentUserNo: '', // 柜员号
      CurrentUserName: '', // 柜员姓名
      CurrentSystemDate: '', // 当前系统日期
      HighShootdisabled: false,
      disabledstartDate: false,
      disabledendDate: false,
      disabledGYH: false,
      disabledATMJBH: false,
      disabledKHMC: false,
      disabledJE: false,
      disabledCCYY: false,
      disabledCLQK: false,
      disabledCZDWType: false,
      institutionCodes: {},
      ruleForm: {
        startDate: '', // 起始日期
        endDate: '', // 结束日期
        operationType: '', // 操作类型
        CZDWType: '', // 操作单位
        LYType: '', // 来源
        institutionCode: '', // 机构代码
        GYH: '', // 柜员号
        ATMJBH: '', // ATM机编号
        certificateType: '', // 凭证类型
        ZKH: '', // 账/卡号
        KHMC: '', // 客户名称
        JE: '', // 金额
        CCYY: '', // 差错原因
        CLQK: '', // 处理情况
        explain: '' // 说明
      },
      rules: {
        operationType: [
          { required: true, message: '请选择操作类型', trigger: 'change' },
          { trigger: 'change', validator: validateOperationType }
        ],
        CZDWType: [
          { required: true, message: '请选择操作单位', trigger: 'change' }
        ],
        startDate: [
          { required: false, message: '请选择起始日期', trigger: 'blur' }
        ],
        endDate: [
          { required: false, message: '请选择结束日期', trigger: 'blur' }
        ],
        LYType: [
          { required: true, message: '请选择来源', trigger: 'change' }
        ],
        institutionCode: [
          { required: true, message: '请选择机构代码', trigger: 'change' }
        ],
        GYH: [
          { required: false, message: '请输入柜员号', trigger: 'blur' }
        ],
        ATMJBH: [
          { required: false, message: '请输入ATM机编号', trigger: 'blur' }
        ],
        certificateType: [
          { required: false, message: '请输入凭证类型', trigger: 'change' }
        ],
        ZKH: [
          { required: true, message: '请输入账/卡号', trigger: 'blur' }
        ],
        KHMC: [
          { required: true, message: '请输入客户名称', trigger: 'blur' }
        ],
        JE: [
          { required: true, message: '请输入金额', trigger: 'blur' }
        ],
        CCYY: [
          { required: true, message: '请输入差错原因', trigger: 'blur' }
        ],
        CLQK: [
          { required: true, message: '请输入处理情况', trigger: 'blur' }
        ],
        explain: [
          { required: false, message: '请输入说明', trugger: 'blur' }
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
      CZDWTypes: this.$combo.CZDWTypes1,
      LYTypes: this.$combo.LYTypes1,
      certificateTypes: this.$combo.certificateTypes
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
          this.CurrentBranchNo = res.data.CurrentBranchNo // 网点号
          this.CurrentBranchName = res.data.CurrentBranchName // 机构名称
          this.CurrentUserNo = res.data.CurrentUserNo // 柜员号
          this.CurrentUserName = res.data.CurrentUserName // 柜员姓名
          this.CurrentSystemDate = res.data.CurrentSystemDate // 当前系统日期
        })
    this.ruleForm.endDate = this.CurrentSystemDate
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
        const params = {
          'STARTDATE': this.ruleForm.startDate, 'ENDDATE': this.ruleForm.endDate, 'LAIYUAN': this.ruleForm.LYType,
          'BRNO': this.ruleForm.institutionCode, 'BRANCHLEVEL': '', 'TELLERNO': this.ruleForm.GYH,
          'CUSTNAME': this.ruleForm.KHMC, 'ACCOUNTNUMBER': this.ruleForm.ZKH, 'MONEY': this.ruleForm.JE,
          'ERRORCAUSE': this.ruleForm.CCYY, 'DEALSITUATION': this.ruleForm.CLQK, 'ATMNUMBER': this.ruleForm.ATMJBH,
          'pageNum': '1', 'pageSize': '10' }
        this.$http(this.$reportMngApi.getXRPISCUSTACCMONEYREGISTER, params).then( // 此处调用自己的Api接口方法
          res => {
            const resdata = res.data.data
            console.log(res.data)
            if (resdata.TrxCode === '000000') {
              // 赋值
              this.totals = resdata.PageInfo.total
              this.tableData = resdata.PageInfo.list
              console.log('-------------------')
              this.$router.push({
                path: this.redirect || '/T55061',
                name: 'T55061',
                params: {
                  map: resdata.PageInfo,
                  totalNum: resdata.TotalNum,
                  STARTDATE: this.ruleForm.startDate,
                  ENDDATE: this.ruleForm.endDate,
                  LAIYUAN: this.ruleForm.LYType,
                  BRNO: this.ruleForm.institutionCode,
                  BRANCHLEVEL: '',
                  TELLERNO: this.ruleForm.GYH,
                  CUSTNAME: this.ruleForm.KHMC,
                  ACCOUNTNUMBER: this.ruleForm.ZKH,
                  MONEY: this.ruleForm.JE,
                  ERRORCAUSE: this.ruleForm.CCYY,
                  DEALSITUATION: this.ruleForm.CLQK,
                  ATMNUMBER: this.ruleForm.ATMJBH
                }
              })
            } else if (resdata.TrxCode === 'T5506') {
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
        // const params = { 'LAIYUAN': this.ruleForm.LYType, 'CUSTNAME': this.ruleForm.KHMC,
        //   'ACCOUNTNUMBER': this.ruleForm.ZKH, 'MONEY': this.ruleForm.JE, 'ERRORCAUSE': this.ruleForm.CCYY, 'DEALSITUATION': this.ruleForm.CLQK,
        //   'BRNO': this.CurrentBranchNo, 'BRNAME': this.CurrentBranchName, 'TELLERNO': this.CurrentUserNo, 'TELLERNAME': this.CurrentUserName,
        //   'SIGNINFO': '', 'MAINSERIALNO': '', 'ILLUSTRATE': this.ruleForm.explain, 'ATMNUMBER': this.ruleForm.ATMJBH }
        // this.$http(this.$reportMngApi.insertXRPISCUSTACCMONEYREGISTER, params).then( // 此处调用自己的Api接口方法
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
        //     } else if (resdata.TrxCode === 'T5506') {
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
