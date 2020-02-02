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
                placeholder="选择日期"
                style="width: 80%;"
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
                style="width: 80%;"
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
            <el-form-item label="柜员号：" prop="tellerno">
              <el-input :disabled="disabledUserNo" v-model="ruleForm.tellerno" style="width: 80%;" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="单位名称：" prop="DWMC">
          <el-input :disabled="disabledDWMC" v-model="ruleForm.DWMC" clearable/>
        </el-form-item>
        <el-row>
          <el-col :span="8">
            <el-form-item label="代工账号：" prop="DGNumber" >
              <el-input
                v-model="ruleForm.DGNumber"
                :disabled="disabledDGNumber"
                placeholder="请输入代工账号"
                style="width: 80%;"
                clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="总户数：" prop="ZHS">
              <el-input :disabled="disabledZHS" v-model="ruleForm.ZHS" style="width: 80%;" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="资料名称：" prop="ZLMC">
          <el-input :disabled="disabledZLMC" v-model="ruleForm.ZLMC" clearable/>
        </el-form-item>
        <el-row>
          <el-col :span="8">
            <el-form-item label="批次号：" prop="PCH">
              <el-input :disabled="disabledPCH" v-model="ruleForm.PCH" style="width: 80%;" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="接收时间：" prop="JSDate">
              <el-date-picker
                id="JSDate"
                :disabled="disabledJSDate"
                v-model="ruleForm.JSDate"
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
            <el-form-item label="接收人1：" prop="JSR1">
              <el-input :disabled="disabledJSR1" v-model="ruleForm.JSR1" style="width: 80%;" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="接收人1密码：" prop="JSR1MM">
              <el-input
                :disabled="disabledJSR1MM"
                v-model="ruleForm.JSR1MM"
                type="password"
                style="width: 80%;"
                class=""
                placeholder="请输入接收人1密码"
                clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="接收人2：" prop="JSR2">
              <el-input :disabled="disabledJSR2" v-model="ruleForm.JSR2" style="width: 80%;" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="接收人2密码：" prop="JSR2MM">
              <el-input
                :disabled="disabledJSR2MM"
                v-model="ruleForm.JSR2MM"
                type="password"
                class=""
                style="width: 80%;"
                placeholder="请输入接收人2密码"
                clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="传送方式：" prop="CSFS">
              <el-select :disabled="disabledCSFS" v-model="ruleForm.CSFS" style="width: 80%;" placeholder="请选择" clearable>
                <el-option v-for="item in CSFSs" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="卡折标志：" prop="KZBZ">
              <el-select :disabled="disabledKZBZ" v-model="ruleForm.KZBZ" style="width: 80%;" placeholder="请选择" clearable>
                <el-option v-for="item in KZBZs" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="交出时间：" prop="JCDate">
              <el-date-picker
                id="JCDate"
                :disabled="disabledJCDate"
                v-model="ruleForm.JCDate"
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
            <el-form-item label="交出存折（卡）数量：" prop="JCCZSL">
              <el-input :disabled="disabledJCCZSL" v-model="ruleForm.JCCZSL" style="width: 80%;" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="交出人：" prop="JCR">
              <el-input :disabled="disabledJCR" v-model="ruleForm.JCR" style="width: 80%;" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="交出人密码：" prop="JCRMM">
              <el-input
                :disabled="disabledJCRMM"
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
              <el-input :disabled="disabledJSR" v-model="ruleForm.JSR" style="width: 80%;" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="接收人密码：" prop="JSRMM">
              <el-input
                :disabled="disabledJSRMM"
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
  name: 'T5505',
  data() {
    const validateOperationType = (rule, value, callback) => {
    //   const params = { 'BRANCHNO': '', 'BRANCHNAME': '' }
    //   this.$http(this.$reportMngApi.getxrEFBRANCH, params).then( // 此处调用自己的Api接口方法
    //     res => {
    //       const resdata = res.data.data
    //       if (resdata.TrxMessage === 'SUCCESS') {
    //         if (resdata.TrxCode === '000000') {
    //           // 赋值
    //           const myList = resdata.PageInfo.list
    //           var i = 0
    //           var map = [{ // 对公对私标志下拉列表
    //             value: '0',
    //             label: '客户'
    //           }]
    //           for (i = 0; i < myList.length; i++) {
    //             var aa = {}
    //             aa.value = resdata.PageInfo.list[i].branchno
    //             aa.label = resdata.PageInfo.list[i].branchname
    //             map.push(aa)
    //           }
    //           this.institutionCodes = map
    //         } else {
    //           this.$message({
    //             showClose: true,
    //             message: '错误信息 : ' + resdata.data.TrxMessage,
    //             type: 'warning'
    //           })
    //         }
    //       } else {
    //         this.$message({
    //           showClose: true,
    //           message: '错误信息 : ' + res.data.message,
    //           type: 'warning'
    //         })
    //       }
    //     }
    //   )
      this.ruleForm.startDate = ''
      this.ruleForm.endDate = ''
      this.ruleForm.institutionCode = ''
      this.ruleForm.tellerno = ''
      this.ruleForm.DWMC = ''
      this.ruleForm.ZHS = ''
      this.ruleForm.ZLMC = ''
      this.ruleForm.PCH = ''
      this.ruleForm.JSDate = ''
      this.ruleForm.JSR1 = ''
      this.ruleForm.JSR1MM = ''
      this.ruleForm.JSR2 = ''
      this.ruleForm.JSR2MM = ''
      this.ruleForm.DGNumber = ''
      this.ruleForm.CSFS = ''
      this.ruleForm.JCDate = ''
      this.ruleForm.JCCZSL = ''
      this.ruleForm.JCR = ''
      this.ruleForm.JCRMM = ''
      this.ruleForm.JSR = ''
      this.ruleForm.JSRMM = ''
      this.ruleForm.explain = ''
      this.ruleForm.KZBZ = ''
      if (value === '0') {
        this.returnregister = '查询'
        // this.ruleForm.institutionCode = this.CurrentBranchNo
        this.HighShootdisabled = true
        this.disabledstartDate = false
        this.disabledendDate = false
        this.disabledZHS = true
        this.disabledUserNo = false
        this.disabledJSDate = false
        this.disabledJCCZSL = false
        this.disabledJCDate = false
        this.disabledDWMC = false
        this.disabledZLMC = false
        this.disabledPCH = false
        this.disabledJSR1 = false
        this.disabledJSR2 = false
        this.disabledJCR = false
        this.disabledJSR = false
        this.disabledCSFS = false
        this.disabledKZBZ = false
        this.disabledJSDate = false
        this.rules.startDate[0].required = true
        this.rules.endDate[0].required = true
        this.rules.DWMC[0].required = false
        this.rules.DGNumber[0].required = false
        this.rules.ZLMC[0].required = false
        this.rules.PCH[0].required = false
        this.rules.JSR1[0].required = false
        this.rules.CSFS[0].required = false
        this.rules.JCR[0].required = false
        this.rules.JSR[0].required = false
      } else if (value === '1') {
        // this.returnregister = '登记'
        // this.ruleForm.JSDate = this.CurrentSystemDate
        // this.disabledstartDate = true
        // this.disabledendDate = true
        // this.disabledZHS = false
        // this.disabledUserNo = true
        // this.disabledJSDate = true
        // this.disabledJCCZSL = true
        // this.disabledJCDate = true
        // this.disabledDWMC = false
        // this.disabledZLMC = false
        // this.disabledPCH = false
        // this.disabledJSR1 = false
        // this.disabledJSR2 = false
        // this.disabledJCR = false
        // this.disabledJSR = false
        // this.disabledCSFS = false
        // this.disabledKZBZ = false
        // this.disabledJSR1MM = true
        // this.disabledJSR2MM = true
        // this.disabledJCRMM = true
        // this.disabledJSRMM = true
        // this.rules.startDate[0].required = false
        // this.rules.endDate[0].required = false
        // this.rules.DWMC[0].required = true
        // this.rules.DGNumber[0].required = true
        // this.rules.ZLMC[0].required = true
        // this.rules.PCH[0].required = true
        // this.rules.JSR1[0].required = true
        // this.rules.CSFS[0].required = true
        // this.rules.JSDate[0].required = false
        // this.rules.JCR[0].required = true
        // this.rules.JSR[0].required = true
        // this.rules.JCDate[0].required = false
        callback(new Error('功能开发中'))
      } else if (value === '2') {
        // this.returnregister = '维护'
        // this.ruleForm.JCDate = this.CurrentSystemDate
        // this.disabledstartDate = true
        // this.disabledendDate = true
        // // this.disabledinstitutionCode = true
        // this.disabledZHS = true
        // this.disabledDGNumber = false
        // this.HighShootdisabled = true
        // this.disabledUserNo = true
        // this.disabledDWMC = false
        // this.disabledZLMC = true
        // this.disabledPCH = false
        // this.disabledJSDate = false
        // this.disabledJSR1 = true
        // this.disabledJSR1MM = true
        // this.disabledJSR2 = true
        // this.disabledJSR2MM = true
        // this.disabledJCDate = true
        // this.disabledJCCZSL = true
        // this.disabledJCR = false
        // this.disabledJCRMM = true
        // this.disabledJSR = false
        // this.disabledJSRMM = true
        // this.disabledCSFS = true
        // this.disabledKZBZ = true
        // this.rules.startDate[0].required = false
        // this.rules.endDate[0].required = false
        // this.rules.DGNumber[0].required = true
        // this.rules.JSDate[0].required = true
        // this.rules.JCDate[0].required = false
        // this.rules.JCR[0].required = true
        // this.rules.JSR[0].required = true
        // this.rules.startDate[0].required = false
        // this.rules.endDate[0].required = false
        // this.rules.DWMC[0].required = true
        // this.rules.ZLMC[0].required = false
        // this.rules.PCH[0].required = true
        // this.rules.JSR1[0].required = false
        // this.rules.CSFS[0].required = false
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
    return {
      returnregister: '登记',
      CurrentBranchNo: '', // 网点号
      CurrentBranchName: '', // 机构名称
      CurrentUserNo: '', // 柜员号
      CurrentUserName: '', // 柜员姓名
      CurrentSystemDate: '', // 当前系统日期
      disabledstartDate: false,
      disabledendDate: false,
      disabledinstitutionCode: false,
      disabledZHS: true,
      disabledDGNumber: false,
      HighShootdisabled: false,
      disabledUserNo: false,
      disabledDWMC: false,
      disabledZLMC: false,
      disabledPCH: false,
      disabledJSDate: false,
      disabledJSR1: false,
      disabledJSR1MM: true,
      disabledJSR2: false,
      disabledJSR2MM: true,
      disabledJCDate: false,
      disabledJCCZSL: false,
      disabledJCR: false,
      disabledJCRMM: true,
      disabledJSR: false,
      disabledJSRMM: true,
      disabledCSFS: false,
      disabledKZBZ: false,
      institutionCodes: {},
      ruleForm: {
        operationType: '', // 操作类型
        startDate: '', // 起始日期
        endDate: '', // 结束日期
        institutionCode: '', // 机构代码
        tellerno: '', // 柜员号
        DWMC: '', // 单位名称
        ZHS: '', // 总户数
        ZLMC: '', // 资料名称
        PCH: '', // 批次号
        JSDate: '', // 接收日期
        JSR1: '', // 接收人1
        JSR1MM: '', // 接收人1密码
        JSR2: '', // 接收人2
        JSR2MM: '', // 接收人2密码
        DGNumber: '', // 代工账号
        CSFS: '', // 传送方式
        JCDate: '', // 交出时间
        JCCZSL: '', // 交出存折（卡）数量
        JCR: '', // 交出人
        JCRMM: '', // 交出人密码
        JSR: '', // 接收人
        JSRMM: '', // 接收人密码
        explain: '', // 说明
        KZBZ: '' // 卡折标志
      },
      rules: {
        operationType: [
          { required: true, message: '请选择操作类型', trigger: 'change' },
          { trigger: 'change', validator: validateOperationType }
        ],
        startDate: [
          { required: true, message: '请选择起始日期', trugger: 'blur' },
          { trigger: 'blur', validator: validatorstartDate }
        ],
        DWMC: [
          { required: false, message: '请选择单位名称', trugger: 'blur' }
        ],
        endDate: [
          { required: true, message: '请选择结束日期', turgger: 'blur' },
          { trigger: 'blur', validator: validatorendDate }
        ],
        institutionCode: [
          { required: true, message: '请选择机构代码', trugger: 'change' }
        ],
        tellerno: [
          { required: false, message: '请输入柜员号', trugger: 'blur' }
        ],
        DGNumber: [
          { required: false, message: '请输入代工账号', trugger: 'blur' }
        ],
        ZHS: [
          { required: false, message: '请输入总户数', trugger: 'blur' }
        ],
        ZLMC: [
          { required: false, message: '请输入资料名称', trugger: 'blur' }
        ],
        PCH: [
          { required: false, message: '请输入批次号', trugger: 'blur' }
        ],
        JSDate: [
          { required: false, message: '请输入接收日期', trugger: 'blur' }
        ],
        JSR1: [
          { required: false, message: '请输入接收人1', trugger: 'blur' }
        ],
        JSR1MM: [
          { required: false, message: '请输入接收人1密码', trugger: 'blur' }
        ],
        JSR2: [
          { required: false, message: '请输入接收人2', trugger: 'blur' }
        ],
        JSR2MM: [
          { required: false, message: '请输入接收人2密码', trugger: 'blur' }
        ],
        CSFS: [
          { required: false, message: '请选择传送方式', trugger: 'change' }
        ],
        KZBZ: [
          { required: false, message: '请选择卡折标志', trugger: 'change' }
        ],
        JCDate: [
          { required: false, message: '请选择交出时间', trugger: 'blur' }
        ],
        JCCZSL: [
          { required: false, message: '请输入交出存折（卡）数量', trugger: 'blur' }
        ],
        JCR: [
          { required: false, message: '请输入交出人', trugger: 'blur' }
        ],
        JCRMM: [
          { required: false, message: '请输入交出人密码', trugger: 'blur' }
        ],
        JSR: [
          { required: false, message: '请输入接收人', trugger: 'blur' }
        ],
        JSRMM: [
          { required: false, message: '请输入接收人密码', trugger: 'blur' }
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
      operationTypes: this.$combo.operationType2,
      CSFSs: this.$combo.CSFS1,
      KZBZs: this.$combo.KZBZ1
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
    // this.ruleForm.institutionCode = this.CurrentBranchNo
  },
  methods: {
    exitTrade() { // 交易退出返回首页
      this.$router.push({
        path: this.redirect || '/dashboard'
      })
    },
    registerClick: function() { // 查询
      // this.$refs.form.validate(valid => {SERIALNO
      //   if (valid) {
      this.query()
      // }
      // })
    },
    query: function() {
      if (this.returnregister === '查询') {
        const params = { 'STARTDATE': this.ruleForm.startDate, 'ENDDATE': this.ruleForm.endDate, 'BRNO': this.ruleForm.institutionCode,
          'BRANCHLEVEL': '', 'TELLERNO': this.ruleForm.tellerno, 'UNITNAME': this.ruleForm.DWMC,
          'PAYROLLACC': this.ruleForm.DGNumber, 'INFORNAME': this.ruleForm.ZLMC, 'BATCHNUMBER': this.ruleForm.PCH,
          'RECIEVEDATE': this.ruleForm.JSDate, 'RECIPIENT1': this.ruleForm.JSR1, 'RECIPIENT2': this.ruleForm.JSR2,
          'TRANSFERMODE': this.ruleForm.CSFS, 'CARDFLAG': this.ruleForm.KZBZ, 'BANKBOOKNUMBER': this.ruleForm.JCCZSL,
          'HANDOVERDATE': this.ruleForm.JCDate, 'HANDOVERNAME': this.ruleForm.JCR, 'RECIPIENT': this.ruleForm.JSR,
          'OPERATION': '', 'pageNum': '1', 'pageSize': '10' }
        this.$http(this.$reportMngApi.getXRPISPAYROLLREGISTER, params).then( // 此处调用自己的Api接口方法
          res => {
            const resdata = res.data.data
            console.log(res.data)
            if (resdata.TrxCode === '000000') {
              // 赋值
              this.totals = resdata.PageInfo.total
              this.tableData = resdata.PageInfo.list
              console.log('-------------------')
              this.$router.push({
                path: this.redirect || '/T55051',
                name: 'T55051',
                params: {
                  map: resdata.PageInfo,
                  totalNum: resdata.TotalNum,
                  STARTDATE: this.ruleForm.startDate,
                  ENDDATE: this.ruleForm.endDate,
                  BRNO: this.ruleForm.institutionCode,
                  BRANCHLEVEL: '',
                  TELLERNO: this.ruleForm.tellerno,
                  UNITNAME: this.ruleForm.DWMC,
                  PAYROLLACC: this.ruleForm.DGNumber,
                  INFORNAME: this.ruleForm.ZLMC,
                  BATCHNUMBER: this.ruleForm.PCH,
                  RECIEVEDATE: this.ruleForm.JSDate,
                  RECIPIENT1: this.ruleForm.JSR1,
                  RECIPIENT2: this.ruleForm.JSR2,
                  TRANSFERMODE: this.ruleForm.CSFS,
                  CARDFLAG: this.ruleForm.KZBZ,
                  BANKBOOKNUMBER: this.ruleForm.JCCZSL,
                  HANDOVERDATE: this.ruleForm.JCDate,
                  HANDOVERNAME: this.ruleForm.JCR,
                  RECIPIENT: this.ruleForm.JSR,
                  OPERATION: ''
                }
              })
            } else if (resdata.TrxCode === 'T5505') {
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
        // const params = { 'UNITNAME': this.ruleForm.DWMC, 'PAYROLLACC': this.ruleForm.DGNumber, 'INFORNAME': this.ruleForm.ZLMC, 'BATCHNUMBER': this.ruleForm.PCH, 'RECIEVEDATE': this.ruleForm.JSDate,
        //   'RECIPIENT1': this.ruleForm.JSR1, 'RECIPIENT2': this.ruleForm.JSR2, 'SIGNINFO1': '', 'MAINSERIALN01': '', 'TELLERNO1': this.CurrentUserNo,
        //   'TELLERNAME1': this.CurrentUserName, 'ILLUSTRATE1': this.ruleForm.explain, 'TRANSFERMODE': this.ruleForm.CSFS, 'BANKBOOKNUMBER': this.ruleForm.JCCZSL, 'HANDOVERDATE': this.ruleForm.JCDate,
        //   'HANDOVERNAME': this.ruleForm.JCR, 'RECIPIENT': this.ruleForm.JSR, 'BRNO': this.CurrentBranchNo,
        //   'BRNAME': this.CurrentBranchName, 'TELLERNO': '', 'TELLERNAME': '',
        //   'SIGNINFO2': '', 'MAINSERIALNO': '', 'ILLUSTRATE': '', 'OPERATION': '1',
        //   'CARDFLAG': '0', 'CUSTAMOUNT': this.ruleForm.ZHS }
        // this.$http(this.$reportMngApi.insertXRPISPAYROLLREGISTER, params).then( // 此处调用自己的Api接口方法
        //   res => {
        //     const resdata = res.data.data
        //     console.log(res.data)
        //     if (resdata.TrxCode === '000000') {
        //       // 赋值
        //       this.$message({
        //         showClose: true,
        //         message: resdata.TrxMessage,
        //         type: 'warning'
        //       })
        //     } else if (resdata.TrxCode === 'T5505') {
        //       this.$message({
        //         showClose: true,
        //         message: '错误信息 : ' + resdata.TrxMessage,
        //         type: 'warning'
        //       })
        //     }
        //   }
        // )
      } else if (this.returnregister === '维护') {
        this.$message.error('功能开发中')
        return
        // const params = { 'UNITNAME': this.ruleForm.DWMC, 'PAYROLLACC': this.ruleForm.DGNumber, 'INFORNAME': this.ruleForm.ZLMC, 'BATCHNUMBER': this.ruleForm.PCH, 'RECIEVEDATE': this.ruleForm.JSDate,
        //   'RECIPIENT1': this.ruleForm.JSR1, 'RECIPIENT2': this.ruleForm.JSR2, 'SIGNINFO1': '', 'MAINSERIALN01': '', 'TELLERNO1': this.CurrentUserNo,
        //   'TELLERNAME1': this.CurrentUserName, 'ILLUSTRATE1': this.ruleForm.explain, 'TRANSFERMODE': this.ruleForm.CSFS, 'BANKBOOKNUMBER': this.ruleForm.JCCZSL, 'HANDOVERDATE': this.ruleForm.JCDate,
        //   'HANDOVERNAME': this.ruleForm.JCR, 'RECIPIENT': this.ruleForm.JSR, 'BRNO': this.CurrentBranchNo,
        //   'BRNAME': this.CurrentBranchName, 'TELLERNO': this.CurrentUserNo, 'TELLERNAME': this.CurrentUserName,
        //   'SIGNINFO2': '', 'MAINSERIALNO': '', 'ILLUSTRATE': this.ruleForm.explain, 'OPERATION': '1',
        //   'CARDFLAG': this.ruleForm.KZBZ, 'CUSTAMOUNT': this.ruleForm.ZHS }
        // this.$http(this.$reportMngApi.insertXRPISPAYROLLREGISTER, params).then( // 此处调用自己的Api接口方法
        //   res => {
        //     const resdata = res.data.data
        //     console.log(res.data)
        //     if (resdata.TrxCode === '000000') {
        //       // 赋值
        //       this.$message({
        //         showClose: true,
        //         message: resdata.TrxMessage,
        //         type: 'warning'
        //       })
        //     } else if (resdata.TrxCode === 'T5505') {
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
