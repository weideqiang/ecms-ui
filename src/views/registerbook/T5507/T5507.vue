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
            <el-form-item label="印章（物品）名称：" prop="YZMC">
              <el-input v-model="ruleForm.YZMC" style="width: 80%;" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="印章（物品）编号：" prop="YZBH">
              <el-input v-model="ruleForm.YZBH" style="width: 80%;" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="领用日：" prop="LYDate">
              <el-date-picker
                id="LYDate"
                v-model="ruleForm.LYDate"
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
            <el-form-item label="启用日：" prop="QYDate">
              <el-date-picker
                id="QYDate"
                v-model="ruleForm.QYDate"
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
            <el-form-item label="停用日：" prop="TYDate">
              <el-date-picker
                id="TYDate"
                v-model="ruleForm.TYDate"
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
            <el-form-item label="上缴日：" prop="SJDate">
              <el-date-picker
                id="SJDate"
                v-model="ruleForm.SJDate"
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
            <el-form-item label="销毁日：" prop="XHDate">
              <el-date-picker
                id="XHDate"
                v-model="ruleForm.XHDate"
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
            <el-form-item label="上缴部门：" prop="SJBM">
              <el-input v-model="ruleForm.SJBM" style="width: 80%;" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="交接日期：" prop="JJDate">
              <el-date-picker
                id="XHDate"
                :disabled="disabledJJDate"
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
                :disabled="disabledJJSJ"
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
        <el-form-item label="交接内容：" prop="JJNR">
          <el-input :disabled="disabledJJNR" v-model="ruleForm.JJNR" clearable/>
        </el-form-item>
        <el-row>
          <el-col :span="8">
            <el-form-item label="交出人1：" prop="JCR1">
              <el-input :disabled="disabledJCR1" v-model="ruleForm.JCR1" style="width: 80%;" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="交出人1密码：" prop="JCR1MM">
              <el-input
                :disabled="true"
                v-model="ruleForm.JCR1MM"
                type="password"
                class=""
                style="width: 80%;"
                placeholder="请输入交出人1密码"
                clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="交出人2：" prop="JCR2">
              <el-input v-model="ruleForm.JCR2" style="width: 80%;" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="交出人2密码：" prop="JCR2MM">
              <el-input
                :disabled="true"
                v-model="ruleForm.JCR2MM"
                type="password"
                class=""
                style="width: 80%;"
                placeholder="请输入交出人2密码"
                clearable/>
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
                :disabled="true"
                v-model="ruleForm.JSR1MM"
                type="password"
                class=""
                style="width: 80%;"
                placeholder="请输入接收人1密码"
                clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="接收人2：" prop="JSR2">
              <el-input v-model="ruleForm.JSR2" style="width: 80%;" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="接收人2密码：" prop="JSR2MM">
              <el-input
                :disabled="true"
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
            <el-form-item label="监交人：" prop="JJR">
              <el-input :disabled="disabledJJR" v-model="ruleForm.JJR" style="width: 80%;" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="监交人密码：" prop="JJRMM">
              <el-input
                :disabled="true"
                v-model="ruleForm.JJRMM"
                type="password"
                class=""
                style="width: 80%;"
                placeholder="请输入监交人密码"
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
  name: 'T5507',
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
      this.ruleForm.institutionCode = ''
      this.ruleForm.GYH = ''
      this.ruleForm.YZMC = ''
      this.ruleForm.YZBH = ''
      this.ruleForm.LYDate = ''
      this.ruleForm.QYDate = ''
      this.ruleForm.TYDate = ''
      this.ruleForm.SJDate = ''
      this.ruleForm.XHDate = ''
      this.ruleForm.SJBM = ''
      this.ruleForm.JJDate = ''
      this.ruleForm.JJSJ = ''
      this.ruleForm.JJNR = ''
      this.ruleForm.JCR1 = ''
      this.ruleForm.JCR1MM = ''
      this.ruleForm.JCR2 = ''
      this.ruleForm.JCR2MM = ''
      this.ruleForm.JSR1 = ''
      this.ruleForm.JSR1MM = ''
      this.ruleForm.JSR2 = ''
      this.ruleForm.JSR2MM = ''
      this.ruleForm.JJR = ''
      this.ruleForm.JJRMM = ''
      this.ruleForm.explain = ''
      if (value === '0') {
        this.returnregister = '查询'
        // this.ruleForm.institutionCode = this.CurrentBranchNo
        this.disabledstartDate = false
        this.disabledendDate = false
        this.disabledJJDate = true
        this.disabledJJSJ = true
        this.disabledJJNR = true
        // this.disabledinstitutionCode = true
        this.disabledGYH = false
        this.rules.startDate[0].required = true
        this.rules.endDate[0].required = true
        this.rules.YZMC[0].required = false
        this.rules.YZBH[0].required = false
        this.rules.LYDate[0].required = false
        this.rules.QYDate[0].required = false
        this.rules.SJBM[0].required = false
        this.rules.JJNR[0].required = false
        this.rules.JCR1[0].required = false
        this.rules.JSR1[0].required = false
        this.rules.JJR[0].required = false
        this.rules.JCR1[0].required = false
        this.rules.JSR1[0].required = false
        this.rules.JJR[0].required = false
      } else {
        // if (value === '1') {
        //   this.ruleForm.LYDate = this.CurrentSystemDate
        // } else if (value === '2') {
        //   this.ruleForm.QYDate = this.CurrentSystemDate
        // } else if (value === '3') {
        //   this.ruleForm.TYDate = this.CurrentSystemDate
        // } else if (value === '4') {
        //   this.ruleForm.SJDate = this.CurrentSystemDate
        // } else if (value === '5') {
        //   this.ruleForm.XHDate = this.CurrentSystemDate
        // } else if (value === '6') {
        //   const myDate = new Date()
        //   const mytime = myDate.getHours() + ':' + myDate.getMinutes() + ':' + myDate.getSeconds()
        //   this.ruleForm.JJDate = this.CurrentSystemDate
        //   this.ruleForm.JJSJ = mytime
        // }
        // this.returnregister = '登记'
        // this.disabledstartDate = true
        // this.disabledendDate = true
        // this.disabledJJDate = true
        // this.disabledJJSJ = true
        // this.disabledJJNR = false
        // this.disabledGYH = true
        // // this.disabledinstitutionCode = true
        // this.rules.startDate[0].required = false
        // this.rules.endDate[0].required = false
        // this.rules.YZMC[0].required = true
        // this.rules.YZBH[0].required = false
        // this.rules.LYDate[0].required = false
        // this.rules.QYDate[0].required = false
        // this.rules.SJBM[0].required = false
        // this.rules.JJNR[0].required = true
        // this.rules.JCR1[0].required = false
        // this.rules.JSR1[0].required = false
        // this.rules.JJR[0].required = false
        // this.rules.JCR1[0].required = true
        // this.rules.JSR1[0].required = true
        // this.rules.JJR[0].required = true
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
      disabledstartDate: true,
      disabledJJDate: false,
      disabledJJSJ: false,
      disabledJJNR: false,
      disabledJCR1: false,
      disabledJSR1: false,
      disabledJJR: false,
      disabledinstitutionCode: false,
      disabledendDate: true,
      disabledGYH: false,
      institutionCodes: {},
      ruleForm: {
        operationType: '',
        startDate: '', // 起始日期
        endDate: '', // 结束日期
        institutionCode: '', // 机构代码
        GYH: '', // 柜员号
        YZMC: '', // 印章（物品）名称
        YZBH: '', // 印章（物品）编号
        LYDate: '', // 领用日
        QYDate: '', // 启用日
        TYDate: '', // 停用日
        SJDate: '', // 上缴日
        XHDate: '', // 销毁日
        SJBM: '', // 上缴部门
        JJDate: '', // 交接日期
        JJSJ: '', // 交接时间
        JJNR: '', // 交接内容
        JCR1: '', // 交出人1
        JCR1MM: '', // 交出人1密码
        JCR2: '', // 交出人2
        JCR2MM: '', // 交出人2密码
        JSR1: '', // 接收人1
        JSR1MM: '', // 接收人1密码
        JSR2: '', // 接收人2
        JSR2MM: '', // 接收人2密码
        JJR: '', // 监交人
        JJRMM: '', // 监交人密码
        explain: '' // 说明
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
        YZMC: [
          { required: true, message: '请输入印章（物品）名称', trigger: 'blur' }
        ],
        YZBH: [
          { required: true, message: '请输入印章（物品）编号', trigger: 'blur' }
        ],
        LYDate: [
          { required: true, message: '请选择领用日', trigger: 'blur' }
        ],
        QYDate: [
          { required: true, message: '请选择启用日', trigger: 'blur' }
        ],
        TYDate: [
          { required: false, message: '请选择停用日', trigger: 'blur' }
        ],
        SJDate: [
          { required: false, message: '请选择上缴日', trigger: 'blur' }
        ],
        XHDate: [
          { required: false, message: '请选择销毁日', trigger: 'blur' }
        ],
        SJBM: [
          { required: true, message: '请选择上缴部门', trigger: 'blur' }
        ],
        JJDate: [
          { required: false, message: '请选择交接日期', trigger: 'blur' }
        ],
        JJSJ: [
          { required: false, message: '请输入交接时间', trigger: 'blur' }
        ],
        JJNR: [
          { required: true, message: '请输入交接内容', trigger: 'blur' }
        ],
        JCR1: [
          { required: true, message: '请输入交出人1', trigger: 'blur' }
        ],
        JCR1MM: [
          { required: false, message: '请输入交出人1密码', trigger: 'blur' }
        ],
        JCR2: [
          { required: false, message: '请输入交出人2', trigger: 'blur' }
        ],
        JCR2MM: [
          { required: false, message: '请输入交出人2密码', trigger: 'blur' }
        ],
        JSR1: [
          { required: true, message: '请输入接收人1', trigger: 'blur' }
        ],
        JSR1MM: [
          { required: false, message: '请输入接收人1密码', trigger: 'blur' }
        ],
        JSR2: [
          { required: false, message: '请输入接收人2', trigger: 'blur' }
        ],
        JSR2MM: [
          { required: false, message: '请输入接收人2密码', trigger: 'blur' }
        ],
        JJR: [
          { required: true, message: '请输入监交人', trigger: 'blur' }
        ],
        JJRMM: [
          { required: false, message: '请输入监交人密码', trigger: 'blur' }
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
      operationTypes: this.$combo.operationType3
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
          'STAMPNAME': this.ruleForm.YZMC,
          'STAMPNUMBER': this.ruleForm.YZBH,
          'BRNO': this.ruleForm.institutionCode,
          'BRANCHLEVEL': '',
          'TELLERNO': this.ruleForm.GYH,
          'FLAG': '', 'pageNum': '1', 'pageSize': '10' }
        this.$http(this.$reportMngApi.getXRPISSTAMPKEEPINGREGISTER2, params).then( // 此处调用自己的Api接口方法
          res => {
            const resdata = res.data.data
            console.log(res.data)
            if (resdata.TrxCode === '000000') {
              // 赋值
              this.totals = resdata.PageInfo.total
              this.tableData = resdata.PageInfo.list
              console.log('-------------------')
              this.$router.push({
                path: this.redirect || '/T55071',
                name: 'T55071',
                params: {
                  map: resdata.PageInfo,
                  totalNum: resdata.TotalNum,
                  STARTDATE: this.ruleForm.startDate,
                  ENDDATE: this.ruleForm.endDate,
                  STAMPNAME: this.ruleForm.YZMC,
                  STAMPNUMBER: this.ruleForm.YZBH,
                  BRNO: this.ruleForm.institutionCode,
                  BRANCHLEVEL: '',
                  TELLERNO: this.ruleForm.GYH,
                  FLAG: ''
                }
              })
            } else if (resdata.TrxCode === 'T5507') {
              this.$message({
                showClose: true,
                message: '错误信息 : ' + resdata.TrxMessage,
                type: 'warning'
              })
            }
          }
        )
      } else if (this.returnregister === '交接') {
        this.$message.error('功能开发中')
        return
        // const params = { 'STAMPNAME': this.ruleForm.YZMC,
        //   'STAMPNUMBER': this.ruleForm.YZBH,
        //   'HANDOVERDATE': this.ruleForm.JJDate,
        //   'HANDOVERTIME': this.ruleForm.JJSJ,
        //   'HANDOVERRECORD': this.ruleForm.JJNR,
        //   'HANDOVER': this.ruleForm.JCR1,
        //   'SENDEE': this.ruleForm.JSR1,
        //   'SUPERVISOR': this.ruleForm.JJR,
        //   'BRNO': this.CurrentBranchNo,
        //   'BRNAME': this.CurrentBranchName,
        //   'TELLERNO': this.CurrentUserNo,
        //   'TELLERNAME': this.CurrentUserName,
        //   'SIGNINFO': '',
        //   'MAINSERIALNO': '',
        //   'ILLUSTRATE': this.ruleForm.explain,
        //   'HANDOVERFLAG': '1',
        //   'CZTYPE': '',
        //   'SIGNINFO1': '',
        //   'SIGNINFO2': '',
        //   'HANDOVER2': this.ruleForm.JCR2,
        //   'SENDEE2': this.ruleForm.JSR2,
        //   'Type': '6'
        // }
        // this.$http(this.$reportMngApi.insertXRPISSTAMPHANDOVERREGISTER3, params).then( // 此处调用自己的Api接口方法
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
        //     } else if (resdata.TrxCode === 'T5507') {
        //       this.$message({
        //         showClose: true,
        //         message: '错误信息 : ' + resdata.TrxMessage,
        //         type: 'warning'
        //       })
        //     }
        //   }
        // )
      } else {
        this.$message.error('功能开发中')
        return
        // const params = { 'STAMPNAME': this.ruleForm.YZMC,
        //   'STAMPNUMBER': this.ruleForm.YZBH,
        //   'HANDOVERDATE': '',
        //   'HANDOVERTIME': '',
        //   'HANDOVERRECORD': this.ruleForm.JJNR,
        //   'HANDOVER': this.ruleForm.JCR1,
        //   'SENDEE': this.ruleForm.JSR1,
        //   'SUPERVISOR': this.ruleForm.JJR,
        //   'BRNO': this.CurrentBranchNo,
        //   'BRNAME': this.CurrentBranchName,
        //   'TELLERNO': this.CurrentUserNo,
        //   'TELLERNAME': this.CurrentUserName,
        //   'SIGNINFO': '',
        //   'MAINSERIALNO': '',
        //   'ILLUSTRATE': this.ruleForm.explain,
        //   'HANDOVERFLAG': '2',
        //   'CZTYPE': this.ruleForm.operationType,
        //   'SIGNINFO1': '',
        //   'SIGNINFO2': '',
        //   'HANDOVER2': this.ruleForm.JCR2,
        //   'SENDEE2': this.ruleForm.JSR2,
        //   'Type': '5'
        // }
        // this.$http(this.$reportMngApi.insertXRPISSTAMPHANDOVERREGISTER3, params).then( // 此处调用自己的Api接口方法
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
        //     } else if (resdata.TrxCode === 'T5507') {
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
