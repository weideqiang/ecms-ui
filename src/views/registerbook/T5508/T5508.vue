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
                style="width: 80%;"
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
                style="width: 80%;"
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
            <el-form-item label="柜员号：" prop="GYH">
              <el-input :disabled="disabledGYH" v-model="ruleForm.GYH" style="width: 80%;" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="交接日期：" prop="JJDate">
              <el-date-picker
                id="XHDate"
                :disabled="true"
                v-model="ruleForm.JJDate"
                :picker-options="pickerOptions1"
                class="info-startDate"
                type="date"
                style="width: 80%;"
                placeholder="选择日期"
                editable
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyyMMdd"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="交接时间：" prop="JJSJ">
              <el-date-picker
                id="JJSJ"
                :disabled="true"
                v-model="ruleForm.JJSJ"
                class="info-startDate"
                type="datetime"
                style="width: 80%;"
                placeholder="选择时间"
                editable
                format="HH:mm:ss"
                value-format="HHmmss"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="场次：" prop="ChangC">
              <el-select :disabled="disabledChangC" v-model="ruleForm.ChangC" placeholder="请选择" style="width: 80%;" clearable>
                <el-option v-for="item in ChangCs" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="操作方式：" prop="operationWay">
              <el-select v-model="ruleForm.operationWay" placeholder="请选择" style="width: 80%;" clearable>
                <el-option v-for="item in operationWays" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="交换行号：" prop="JHHH">
              <el-input v-model="ruleForm.JHHH" style="width: 80%;" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="卡（锁）片号：" prop="KSPH">
              <el-input v-model="ruleForm.KSPH" style="width: 80%;" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="包（票据）、数量：" prop="BPJSL">
            <el-input v-model="ruleForm.BPJSL" clearable/>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="借方金额：" prop="JFJE">
              <el-input v-model="ruleForm.JFJE" style="width: 80%;" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="贷方金额：" prop="DFJE">
              <el-input v-model="ruleForm.DFJE" style="width: 80%;" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="交出人：" prop="JCR">
              <el-input v-model="ruleForm.JCR" style="width: 80%;" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="交出人密码：" prop="JCRMM">
              <el-input
                :disabled="true"
                v-model="ruleForm.JCRMM"
                type="password"
                class=""
                style="width: 80%;"
                placeholder="请输入交出人密码"
                clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="接收人：" prop="JSR">
              <el-input v-model="ruleForm.JSR" style="width: 80%;" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="接收人密码：" prop="JSRMM">
              <el-input
                :disabled="true"
                v-model="ruleForm.JSRMM"
                type="password"
                class=""
                style="width: 80%;"
                placeholder="请输入接收人密码"
                clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="包（票据）状况：" prop="BPJZK">
              <el-input v-model="ruleForm.BPJZK" style="width: 80%;" clearable/>
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
  name: 'T5508',
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
      this.ruleForm.explain = ''
      this.ruleForm.startDate = ''
      this.ruleForm.endDate = ''
      this.ruleForm.institutionCode = ''
      this.ruleForm.GYH = ''
      this.ruleForm.JJDate = ''
      this.ruleForm.JJSJ = ''
      this.ruleForm.ChangC = ''
      this.ruleForm.operationWay = ''
      this.ruleForm.JHHH = ''
      this.ruleForm.KSPH = ''
      this.ruleForm.BPJSL = ''
      this.ruleForm.JFJE = ''
      this.ruleForm.DFJE = ''
      this.ruleForm.JCR = ''
      this.ruleForm.JCRMM = ''
      this.ruleForm.JSR = ''
      this.ruleForm.JSRMM = ''
      this.ruleForm.BPJZK = ''
      if (value === '0') {
        this.returnregister = '查询'
        // this.ruleForm.institutionCode = this.CurrentBranchNo
        this.HighShootdisabled = true
        this.disabledstartDate = false
        this.disabledendDate = false
        this.disabledGYH = false
        this.disabledChangC = true
        // this.disabledinstitutionCode = true
        this.rules.JCR[0].required = false
        this.rules.JSR[0].required = false
        this.rules.BPJZK[0].required = false
        this.rules.BPJSL[0].required = false
        this.rules.ChangC[0].required = false
        this.rules.startDate[0].required = true
        this.rules.endDate[0].required = true
        this.rules.BPJSL[0].required = true
        this.rules.JCR[0].required = true
        this.rules.JSR[0].required = true
        this.rules.BPJZK[0].required = true
      } else {
        // this.ruleForm.endDate = this.CurrentSystemDate
        // const myDate = new Date()
        // const mytime = myDate.getHours() + ':' + myDate.getMinutes() + ':' + myDate.getSeconds()
        // this.ruleForm.JJDate = this.CurrentSystemDate
        // this.ruleForm.JJSJ = mytime
        // this.returnregister = '登记'
        // this.HighShootdisabled = false
        // this.disabledstartDate = true
        // this.disabledendDate = true
        // this.disabledGYH = true
        // this.disabledChangC = false
        // // this.disabledinstitutionCode = true
        // this.rules.JCR[0].required = true
        // this.rules.JSR[0].required = true
        // this.rules.BPJZK[0].required = true
        // this.rules.BPJSL[0].required = true
        // this.rules.ChangC[0].required = false
        // this.rules.startDate[0].required = false
        // this.rules.endDate[0].required = false
        // this.rules.BPJSL[0].required = false
        // this.rules.JCR[0].required = false
        // this.rules.JSR[0].required = false
        // this.rules.BPJZK[0].required = false
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
      disabledinstitutionCode: false,
      disabledGYH: false,
      disabledstartDate: false,
      disabledendDate: false,
      HighShootdisabled: false,
      disabledChangC: false,
      institutionCodes: {},
      ruleForm: {
        explain: '',
        operationType: '',
        startDate: '',
        endDate: '',
        institutionCode: '',
        GYH: '',
        JJDate: '',
        JJSJ: '',
        ChangC: '',
        operationWay: '',
        JHHH: '',
        KSPH: '',
        BPJSL: '',
        JFJE: '',
        DFJE: '',
        JCR: '',
        JCRMM: '',
        JSR: '',
        JSRMM: '',
        BPJZK: ''
      },
      rules: {
        operationType: [
          { required: true, message: '请选择操作类型', trigger: 'change' },
          { trigger: 'change', validator: validateOperationType }
        ],
        startDate: [
          { required: false, message: '请选择起始日期', trigger: 'blur' }
        ],
        endDate: [
          { required: false, message: '请选择结束日期', trigger: 'blur' }
        ],
        institutionCode: [
          { required: true, message: '请选择机构代码', trigger: 'change' }
        ],
        GYH: [
          { required: false, message: '请输入柜员号', trigger: 'blur' }
        ],
        JJDate: [
          { required: false, message: '请选择交接日期', trigger: 'blur' }
        ],
        JJSJ: [
          { required: false, message: '请选择交接时间', trigger: 'change' }
        ],
        ChangC: [
          { required: true, message: '请选择场次', trigger: 'change' }
        ],
        operationWay: [
          { required: false, message: '请选择操作方式', trigger: 'change' }
        ],
        JHHH: [
          { required: false, message: '请输入交换行号', trigger: 'blur' }
        ],
        KSPH: [
          { required: false, message: '请输入卡（锁）片号', trigger: 'blur' }
        ],
        BPJSL: [
          { required: false, message: '请输入包（票据）、数量', trigger: 'blur' }
        ],
        JFJE: [
          { required: false, message: '请输入借方金额', trigger: 'blur' }
        ],
        DFJE: [
          { required: false, message: '请输入贷方金额', trigger: 'blur' }
        ],
        JCR: [
          { required: true, message: '请输入交出人', trigger: 'blur' }
        ],
        JCRMM: [
          { required: false, message: '请输入交出人密码', trigger: 'blur' }
        ],
        JSR: [
          { required: true, message: '请输入接收人', trigger: 'blur' }
        ],
        JSRMM: [
          { required: false, message: '请输入接收人密码', trigger: 'blur' }
        ],
        BPJZK: [
          { required: true, message: '请输入包（票据）状况', trigger: 'blur' }
        ],
        explain: [
          { required: false, message: '请输入说明', trigger: 'blur' }
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
      ChangCs: this.$combo.ChangCs,
      operationWays: this.$combo.operationWays1,
      operationTypes: this.$combo.operationType1
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
        const params = { 'STARTDATE': this.ruleForm.startDate,
          'ENDDATE': this.ruleForm.endDate,
          'BRNO': this.ruleForm.institutionCode,
          'BRANCHLEVEL': '',
          'TELLERNO': this.ruleForm.GYH,
          'INTHEDAY': this.ruleForm.ChangC,
          'OPERATEWAY': this.ruleForm.operationWay,
          'BILLNUMBER': this.ruleForm.JHHH,
          'EXCHANGENUMBER': this.ruleForm.BPJSL,
          'CARDNUMBER': this.ruleForm.KSPH,
          'DEBITAMOUNT': this.ruleForm.JFJE,
          'CREDITAMOUNT': this.ruleForm.DFJE,
          'BILLSTATUS': this.ruleForm.BPJZK,
          'HANDOVER': this.ruleForm.JCR,
          'SENDEE': this.ruleForm.JSR,
          'pageNum': '1', 'pageSize': '10' }
        this.$http(this.$reportMngApi.getXRPISBILLHANDOVERREGISTER, params).then( // 此处调用自己的Api接口方法
          res => {
            const resdata = res.data.data
            console.log(res.data)
            if (resdata.TrxCode === '000000') {
              // 赋值
              this.totals = resdata.PageInfo.total
              this.tableData = resdata.PageInfo.list
              console.log('-------------------')
              this.$router.push({
                path: this.redirect || '/T55081',
                name: 'T55081',
                params: {
                  map: resdata.PageInfo,
                  totalNum: resdata.TotalNum,
                  STARTDATE: this.ruleForm.startDate,
                  ENDDATE: this.ruleForm.endDate,
                  BRNO: this.ruleForm.institutionCode,
                  BRANCHLEVEL: '',
                  TELLERNO: this.ruleForm.GYH,
                  INTHEDAY: this.ruleForm.ChangC,
                  OPERATEWAY: this.ruleForm.operationWay,
                  BILLNUMBER: this.ruleForm.JHHH,
                  EXCHANGENUMBER: this.ruleForm.BPJSL,
                  CARDNUMBER: this.ruleForm.KSPH,
                  DEBITAMOUNT: this.ruleForm.JFJE,
                  CREDITAMOUNT: this.ruleForm.DFJE,
                  BILLSTATUS: this.ruleForm.BPJZK,
                  HANDOVER: this.ruleForm.JCR,
                  SENDEE: this.ruleForm.JSR
                }
              })
            } else if (resdata.TrxCode === 'T5508') {
              this.$message({
                showClose: true,
                message: '错误信息 : ' + resdata.TrxMessage,
                type: 'warning'
              })
            }
          })
      } else if (this.returnregister === '登记') {
        this.$message.error('功能开发中')
        return
        // const params = { 'HANDOVERDATE': this.ruleForm.JJDate, 'HANDOVERTIME': this.ruleForm.JJSJ,
        //   'INTHEDAY': this.ruleForm.ChangC, 'OPERATEWAY': this.ruleForm.operationType, 'BILLNUMBER': this.ruleForm.BPJSL,
        //   'EXCHANGENUMBER': this.ruleForm.JHHH, 'CARDNUMBER': this.ruleForm.KSPH, 'DEBITAMOUNT': this.ruleForm.JFJE, 'CREDITAMOUNT': this.ruleForm.DFJE,
        //   'BILLSTATUS': this.ruleForm.BPJZK, 'HANDOVER': this.ruleForm.JCR, 'SENDEE': this.ruleForm.JSR, 'BRNO': this.CurrentBranchNo,
        //   'BRNAME': this.CurrentBranchName, 'TELLERNO': this.CurrentUserNo, 'TELLERNAME': this.CurrentUserName, 'SIGNINFO1': '',
        //   'SIGNINFO2': '', 'MAINSERIALNO': '', 'ILLUSTRATE': this.ruleForm.explain }
        // this.$http(this.$reportMngApi.insertXRPISBILLHANDOVERREGISTER, params).then( // 此处调用自己的Api接口方法
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
        //     } else if (resdata.TrxCode === 'T5508') {
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
