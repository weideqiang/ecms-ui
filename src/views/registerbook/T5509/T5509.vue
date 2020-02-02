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
            <el-form-item label="操作方式：" prop="operationType">
              <el-select v-model="ruleForm.operationType" style="width: 80%;" placeholder="请选择" clearable>
                <el-option v-for="item in operationTypes" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="查询日期：" prop="JCDate">
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
            <el-form-item label="起始时间：" prop="QSSJDate">
              <el-date-picker
                id="QSSJDate"
                :disabled="disabledQSSJDate"
                v-model="ruleForm.QSSJDate"
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
            <el-form-item label="柜员号：" style="width: 80%;" prop="GYH">
              <el-input :disabled="disabledGYH" v-model="ruleForm.GYH" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="现金管理：" prop="XHGL">
            <el-input v-model="ruleForm.XHGL" clearable/>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="印章管理：" prop="YZGL">
            <el-input v-model="ruleForm.YZGL" clearable/>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="重要机具管理：" prop="ZYJJGL">
            <el-input v-model="ruleForm.ZYJJGL" clearable/>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="重要物品：" prop="ZYWP">
            <el-input
              v-model="ruleForm.ZYWP"
              class="info-queryUnit"
              type="textarea"
              placeholder="重要物品"
              clearable/>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="被检查人1：" prop="bJCR1">
              <el-input :disabled="disabledbJCR1" v-model="ruleForm.bJCR1" style="width: 80%;" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="被检查人1密码：" prop="bJCR1MM">
              <el-input
                :disabled="true"
                v-model="ruleForm.bJCR1MM"
                type="password"
                class=""
                style="width: 80%;"
                placeholder="请输入被检查人1密码"
                clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="被检查人2：" prop="BJCR2">
              <el-input v-model="ruleForm.BJCR2" style="width: 80%;" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="被检查人2密码：" prop="BJCR2MM">
              <el-input
                :disabled="true"
                v-model="ruleForm.BJCR2MM"
                type="password"
                class=""
                style="width: 80%;"
                placeholder="请输入被检查人2密码"
                clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="检查人1：" prop="JianCR1">
              <el-input v-model="ruleForm.JianCR1" style="width: 80%;" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="检查人1密码：" prop="JianCR1MM">
              <el-input
                :disabled="true"
                v-model="ruleForm.JianCR1MM"
                type="password"
                class=""
                style="width: 80%;"
                placeholder="请输入检查人1密码"
                clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="检查人2：" prop="JianCR2">
              <el-input v-model="ruleForm.JianCR2" style="width: 80%;" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="检查人2密码：" prop="JianCR2MM">
              <el-input
                :disabled="true"
                v-model="ruleForm.JianCR2MM"
                type="password"
                class=""
                style="width: 80%;"
                placeholder="请输入检查人2密码"
                clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="处理意见：" prop="CLYJ">
            <el-input
              v-model="ruleForm.CLYJ"
              class="info-queryUnit"
              type="textarea"
              placeholder="处理意见"
              clearable/>
          </el-form-item>
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
  name: 'T5509',
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
      this.ruleForm.JCDate = '' // 检查日期
      this.ruleForm.QSSJDate = '' // 起始时间
      this.ruleForm.startDate = '' // 起始日期
      this.ruleForm.endDate = '' // 终止日期
      this.ruleForm.institutionCode = '' // 机构代码
      this.ruleForm.GYH = '' // 柜员号
      this.ruleForm.XHGL = '' // 现金管理
      this.ruleForm.YZGL = '' // 印章管理
      this.ruleForm.ZYJJGL = '' // 重要机具管理
      this.ruleForm.ZYWP = '' // 重要物品
      this.ruleForm.bJCR1 = '' // 被检查人1
      this.ruleForm.bJCR1MM = '' // 被检查人1密码
      this.ruleForm.BJCR2 = '' // 被检查人2
      this.ruleForm.BJCR2MM = '' // 被检查人2密码
      this.ruleForm.JianCR1 = '' // 检查人1
      this.ruleForm.JianCR1MM = '' // 检查人1密码
      this.ruleForm.JianCR2 = '' // 检查人2
      this.ruleForm.JianCR2MM = '' // 检查人2密码
      this.ruleForm.CLYJ = '' // 处理意见
      this.ruleForm.explain = '' // 说明
      if (value === '0') {
        this.returnregister = '查询'
        this.ruleForm.endDate = this.CurrentSystemDate
        // this.ruleForm.institutionCode = this.CurrentBranchNo
        this.HighShootdisabled = true
        this.disabledJCDate = true
        this.disabledQSSJDate = true
        this.disabledstartDate = false
        this.disabledendDate = false
        this.disabledbJCR1 = false
        // this.disabledinstitutionCode = true
        this.disabledGYH = true
        this.rules.startDate[0].required = true
        this.rules.endDate[0].required = true
        this.rules.JCDate[0].required = false
        this.rules.QSSJDate[0].required = false
        this.rules.JianCR1[0].required = false
        this.rules.CLYJ[0].required = false
        this.rules.bJCR1[0].required = false
      } else {
        // this.returnregister = '登记'
        // const myDate = new Date()
        // const mytime = myDate.getHours() + ':' + myDate.getMinutes() + ':' + myDate.getSeconds()
        // this.ruleForm.JCDate = this.CurrentSystemDate
        // this.ruleForm.QSSJDate = mytime
        // this.HighShootdisabled = false
        // this.disabledJCDate = false
        // this.disabledQSSJDate = false
        // this.disabledstartDate = true
        // this.disabledendDate = true
        // this.disabledbJCR1 = true
        // // this.disabledinstitutionCode = true
        // this.disabledGYH = true
        // this.rules.startDate[0].required = false
        // this.rules.endDate[0].required = false
        // this.rules.JCDate[0].required = true
        // this.rules.QSSJDate[0].required = true
        // this.rules.JianCR1[0].required = true
        // this.rules.CLYJ[0].required = true
        // this.rules.bJCR1[0].required = false
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
      disabledJCDate: true,
      disabledQSSJDate: true,
      disabledendDate: false,
      disabledbJCR1: false,
      disabledinstitutionCode: false,
      disabledGYH: false,
      institutionCodes: {},
      ruleForm: {
        operationType: '',
        JCDate: '', // 检查日期
        QSSJDate: '', // 起始时间
        startDate: '', // 起始日期
        endDate: '', // 起始日期
        institutionCode: '', // 机构代码
        GYH: '', // 柜员号
        XHGL: '', // 现金管理
        YZGL: '', // 印章管理
        ZYJJGL: '', // 重要机具管理
        ZYWP: '', // 重要物品
        bJCR1: '', // 被检查人1
        bJCR1MM: '', // 被检查人1密码
        BJCR2: '', // 被检查人2
        BJCR2MM: '', // 被检查人2密码
        JianCR1: '', // 检查人1
        JianCR1MM: '', // 检查人1密码
        JianCR2: '', // 检查人2
        JianCR2MM: '', // 检查人2密码
        CLYJ: '', // 处理意见
        explain: '' // 说明
      },
      rules: {
        operationType: [
          { required: true, message: '请选择操作类型', trigger: 'change' },
          { trigger: 'change', validator: validateOperationType }
        ],
        JCDate: [
          { required: false, message: '请选择检查日期', trigger: 'blur' }
        ],
        QSSJDate: [
          { required: false, message: '请选择起始时间', trigger: 'blur' }
        ],
        startDate: [
          { required: true, message: '请选择起始日期', trigger: 'blur' }
        ],
        endDate: [
          { required: true, message: '请选择终止日期', trigger: 'blur' }
        ],
        institutionCode: [
          { required: true, message: '请输入机构代码', trigger: 'blur' }
        ],
        GYH: [
          { required: false, message: '请输入柜员号', trigger: 'blur' }
        ],
        XHGL: [
          { required: false, message: '请输入现金管理', trigger: 'blur' }
        ],
        YZGL: [
          { required: false, message: '请输入印章管理', trigger: 'blur' }
        ],
        ZYJJGL: [
          { required: false, message: '请输入重要机具管理', trigger: 'blur' }
        ],
        ZYWP: [
          { required: false, message: '请输入重要物品', trigger: 'blur' }
        ],
        bJCR1: [
          { required: true, message: '请输入被检查人1', trigger: 'blur' }
        ],
        bJCR1MM: [
          { required: false, message: '请输入被检查人1密码', trigger: 'blur' }
        ],
        BJCR2: [
          { required: false, message: '请输入被检查人2', trigger: 'blur' }
        ],
        BJCR2MM: [
          { required: false, message: '请输入被检查人2密码', trigger: 'blur' }
        ],
        JianCR1: [
          { required: true, message: '请输入检查人1', trigger: 'blur' }
        ],
        JianCR1MM: [
          { required: false, message: '请输入检查人1密码', trigger: 'blur' }
        ],
        JianCR2: [
          { required: false, message: '请输入检查人2', trigger: 'blur' }
        ],
        JianCR2MM: [
          { required: false, message: '请输入检查人2密码', trigger: 'blur' }
        ],
        CLYJ: [
          { required: true, message: '请输入处理意见', trigger: 'blur' }
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
        console.log('ENDDATE' + this.ruleForm.endDate)
        const params = { 'STARTDATE': this.ruleForm.startDate,
          'ENDDATE': this.ruleForm.endDate,
          'BRNO': this.ruleForm.institutionCode,
          'BRANCHLEVEL': '',
          'TELLERNO': this.ruleForm.GYH,
          'CASHMANAGEMENT': this.ruleForm.XHGL,
          'SEALMANEGEMENT': this.ruleForm.YZGL,
          'IMPLEMENTMANAGEMENT': this.ruleForm.ZYJJGL,
          'INSPECTED': this.ruleForm.bJCR1,
          'RUMMAGER': this.ruleForm.JianCR1,
          'PERSONINCHARGE': this.ruleForm.JianCR2,
          'pageNum': '1', 'pageSize': '10' }
        this.$http(this.$reportMngApi.getXRPISCHECKREGISTER, params).then( // 此处调用自己的Api接口方法
          res => {
            const resdata = res.data.data
            console.log(res.data)
            if (resdata.TrxCode === '000000') {
              // 赋值
              this.totals = resdata.PageInfo.total
              this.tableData = resdata.PageInfo.list
              console.log('-------------------')
              this.$router.push({
                path: this.redirect || '/T55091',
                name: 'T55091',
                params: {
                  map: resdata.PageInfo,
                  totalNum: resdata.TotalNum,
                  STARTDATE: this.ruleForm.startDate,
                  ENDDATE: this.ruleForm.endDate,
                  BRNO: this.ruleForm.institutionCode,
                  BRANCHLEVEL: '',
                  TELLERNO: this.ruleForm.GYH,
                  CASHMANAGEMENT: this.ruleForm.XHGL,
                  SEALMANEGEMENT: this.ruleForm.YZGL,
                  IMPLEMENTMANAGEMENT: this.ruleForm.ZYJJGL,
                  INSPECTED: this.ruleForm.bJCR1,
                  RUMMAGER: this.ruleForm.JianCR1,
                  PERSONINCHARGE: this.ruleForm.JianCR2
                }
              })
            } else if (resdata.TrxCode === 'T5509') {
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
        // const params = { 'CHECKDATE': this.ruleForm.JCDate, 'CHECKSTARTTIME': this.ruleForm.QSSJDate, 'CHECKENDTIME': '',
        //   'CASHMANAGEMENT': this.ruleForm.XHGL, 'SEALMANEGEMENT': this.ruleForm.YZGL, 'IMPLEMENTMANAGEMENT': this.ruleForm.ZYJJGL, 'IMPORTANTITEMS': this.ruleForm.ZYWP,
        //   'INSPECTED': this.ruleForm.bJCR1 + '#' + this.ruleForm.BJCR2, 'RUMMAGER': this.ruleForm.JianCR1, 'HANDLINGSUGGESTION': this.ruleForm.CLYJ, 'PERSONINCHARGE': this.ruleForm.JianCR2,
        //   'BRNO': this.CurrentBranchNo, 'BRNAME': this.CurrentBranchName, 'TELLERNO': this.CurrentUserNo, 'TELLERNAME': this.CurrentUserName,
        //   'SIGNINFO0': '', 'SIGNINFO1': '', 'SIGNINFO2': '', 'SIGNINFO3': '',
        //   'MAINSERIALNO': '', 'ILLUSTRATE': this.ruleForm.explain }
        // this.$http(this.$reportMngApi.insertXRPISCHECKREGISTER1, params).then( // 此处调用自己的Api接口方法
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
        //     } else if (resdata.TrxCode === 'T5509') {
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
