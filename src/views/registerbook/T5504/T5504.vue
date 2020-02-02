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
            <el-form-item label="支行代码：" prop="BranchCode">
              <el-select :disabled="true" v-model="ruleForm.BranchCode" style="width: 80%;" placeholder="请选择" clearable>
                <el-option v-for="item in BranchCodes" :key="item.value" :label="item.label" :value="item.value"/>
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
            <el-form-item label="柜员号：" prop="tellerno">
              <el-input :disabled="disabledUserNo" v-model="ruleForm.tellerno" style="width: 80%;" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="岗位：" prop="GW">
              <el-input :disabled="disabledGW" v-model="ruleForm.GW" style="width: 80%;" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="移交人：" prop="YJR">
              <el-input :disabled="disabledYJR" v-model="ruleForm.YJR" style="width: 80%;" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="接交人1：" prop="JJR1">
              <el-input :disabled="disabledJJR1" v-model="ruleForm.JJR1" style="width: 80%;" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="接交人1密码：" style="width: 85%;" prop="JJR1MM">
              <el-input
                :disabled="disabledJJR1MM"
                v-model="ruleForm.JJR1MM"
                type="password"
                class=""
                placeholder="请输入接交人1密码"
                clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="接交人2：" prop="JJR2">
              <el-input :disabled="disabledJJR2" v-model="ruleForm.JJR2" style="width: 80%;" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="接交人2密码：" style="width: 85%;" prop="JJR2MM">
              <el-input
                :disabled="disabledJJR2MM"
                v-model="ruleForm.JJR2MM"
                type="password"
                class=""
                placeholder="请输入接交人2密码"
                clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="监交人：" style="width: 85%;" prop="JJR">
              <el-input :disabled="disabledJJR" v-model="ruleForm.JJR" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="监交人密码：" style="width: 85%;" prop="JJRMM">
              <el-input
                :disabled="disabledJJRMM"
                v-model="ruleForm.JJRMM"
                type="password"
                class=""
                placeholder="请输入监交人密码"
                clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="交接内容：" prop="JJNR">
            <el-input
              v-model="ruleForm.JJNR"
              class="info-queryUnit"
              type="textarea"
              placeholder="交接内容"
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
  name: 'T5504',
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
      this.ruleForm.BranchCode = '' // 支行代码
      this.ruleForm.startDate = '' // 起始日期
      this.ruleForm.endDate = '' // 结束日期
      this.ruleForm.institutionCode = '' // 机构代码
      this.ruleForm.tellerno = '' // 柜员号
      this.ruleForm.GW = '' // 岗位
      this.ruleForm.YJR = '' // 移交人
      this.ruleForm.JJR1 = '' // 接交人1
      this.ruleForm.JJR1MM = '' // 接交人1密码
      this.ruleForm.JJR2 = '' // 接交人2
      this.ruleForm.JJR2MM = '' // 接交人2密码
      this.ruleForm.JJR = '' // 监交人
      this.ruleForm.JJRMM = '' // 监交人密码
      this.ruleForm.JJNR = '' // 交接内容
      this.ruleForm.explain = '' // 说明
      if (value === '0') {
        this.returnregister = '查询'
        // this.ruleForm.institutionCode = this.CurrentBranchNo
        this.HighShootdisabled = true
        this.disabledstartDate = false
        this.disabledendDate = false
        this.disabledYJR = false
        // this.disabledinstitutionCode = true
        this.disabledUserNo = false
        this.rules.startDate[0].required = true
        this.rules.endDate[0].required = true
        this.rules.JJR1[0].required = false
        this.rules.JJR[0].required = false
        this.rules.JJNR[0].required = false
        this.rules.GW[0].required = false
      } else {
        // this.returnregister = '登记'
        // this.ruleForm.YJR = this.CurrentUserNo
        // this.HighShootdisabled = false
        // this.disabledstartDate = true
        // this.disabledYJR = true
        // this.disabledendDate = true
        // this.disabledUserNo = true
        // this.rules.startDate[0].required = false
        // this.rules.endDate[0].required = false
        // this.rules.JJR1[0].required = true
        // this.rules.JJR[0].required = true
        // this.rules.JJNR[0].required = true
        // this.rules.GW[0].required = true
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
      disabledstartDate: true,
      disabledendDate: true,
      disabledGW: false,
      disabledYJR: true,
      disabledJJR1: false,
      disabledJJR2: false,
      disabledJJR: false,
      disabledJJR1MM: true,
      disabledJJR2MM: true,
      disabledUserNo: false,
      disabledinstitutionCode: false,
      disabledJJRMM: true,
      HighShootdisabled: false,
      institutionCodes: {},
      ruleForm: {
        operationType: '', // 操作类型
        BranchCode: '', // 支行代码
        startDate: '', // 起始日期
        endDate: '', // 结束日期
        institutionCode: '', // 机构代码
        tellerno: '', // 柜员号
        GW: '', // 岗位
        YJR: '', // 移交人
        JJR1: '', // 接交人1
        JJR1MM: '', // 接交人1密码
        JJR2: '', // 接交人2
        JJR2MM: '', // 接交人2密码
        JJR: '', // 监交人
        JJRMM: '', // 监交人密码
        JJNR: '', // 交接内容
        explain: '' // 说明
      },
      rules: {
        operationType: [
          { required: true, message: '请选择操作类型', trigger: 'change' },
          { trigger: 'change', validator: validateOperationType }
        ],
        BranchCode: [
          { required: false, message: '请选择支行代码', trigger: 'change' }
        ],
        startDate: [
          { required: false, message: '请选择起始日期', trugger: 'blur' },
          { trigger: 'blur', validator: validatorstartDate }
        ],
        endDate: [
          { required: false, message: '请选择结束日期', turgger: 'blur' },
          { trigger: 'blur', validator: validatorendDate }
        ],
        institutionCode: [
          { required: true, message: '请选择机构代码', trugger: 'change' }
        ],
        tellerno: [
          { required: false, message: '请输入柜员号', trugger: 'blur' }
        ],
        GW: [
          { required: false, message: '请输入岗位', trugger: 'blur' }
        ],
        YJR: [
          { required: false, message: '请输入移交人', trugger: 'blur' }
        ],
        JJR1: [
          { required: true, message: '请输入接交人1', trugger: 'blur' }
        ],
        JJR1MM: [
          { required: false, message: '请输入接交人1密码', trugger: 'blur' }
        ],
        JJR2: [
          { required: false, message: '请输入接交人2', trugger: 'blur' }
        ],
        JJR2MM: [
          { required: false, message: '请输入接交人2密码', trugger: 'blur' }
        ],
        JJR: [
          { required: true, message: '请输入监交人', trugger: 'blur' }
        ],
        JJRMM: [
          { required: false, message: '请输入监交人密码', trugger: 'blur' }
        ],
        JJNR: [
          { required: true, message: '请输入交接内容', trugger: 'blur' }
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
      BranchCodes: {}
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
      console.log(this.returnregister)
      if (this.returnregister === '查询') {
        const params = { 'STARTDATE': this.ruleForm.startDate, 'ENDDATE': this.ruleForm.endDate, 'BRNO': this.ruleForm.institutionCode, 'BRANCHLEVEL': '', 'TELLERNO': this.ruleForm.BranchCode,
          'POST': this.ruleForm.GW, 'HANDOVERMAN': this.ruleForm.YJR, 'MAKEPEOPLE': this.ruleForm.JJR1, 'SUPERVISOR': this.ruleForm.JJR,
          'HANDOVERCONTENT': this.ruleForm.JJNR }
        this.$http(this.$reportMngApi.getXRPISHANDOVERREGISTER1, params).then( // 此处调用自己的Api接口方法
          res => {
            const resdata = res.data.data
            console.log(res.data)
            if (resdata.TrxCode === '000000') {
              // 赋值
              this.totals = resdata.PageInfo.total
              this.tableData = resdata.PageInfo.list
              console.log('-------------------')
              this.$router.push({
                path: this.redirect || '/T55041',
                name: 'T55041',
                params: {
                  map: resdata.PageInfo,
                  totalNum: resdata.TotalNum,
                  STARTDATE: this.ruleForm.startDate,
                  ENDDATE: this.ruleForm.endDate,
                  BRNO: this.ruleForm.institutionCode,
                  BRANCHLEVEL: '',
                  TELLERNO: this.ruleForm.BranchCode,
                  POST: this.ruleForm.GW,
                  HANDOVERMAN: this.ruleForm.YJR,
                  MAKEPEOPLE: this.ruleForm.JJR1,
                  SUPERVISOR: this.ruleForm.JJR,
                  HANDOVERCONTENT: this.ruleForm.JJNR
                }
              })
            } else if (resdata.TrxCode === 'T5504') {
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
        // const params = { 'HANDOVERDATE': myDate, 'HANDOVERTIME': mytime, 'POST': this.ruleForm.GW, 'HANDOVERMAN': this.ruleForm.YJR, 'MAKEPEOPLE': this.ruleForm.JJR1, 'MAKEPEOPLE2': this.ruleForm.JJR2,
        //   'SUPERVISOR': this.ruleForm.JJR, 'HANDOVERCONTENT': this.ruleForm.JJNR, 'BRNO': this.CurrentBranchNo,
        //   'BRNAME': this.CurrentBranchName, 'TELLERNO': this.CurrentUserNo, 'TELLERNAME': this.CurrentUserName,
        //   'AUTOGRAPH01': '', 'AUTOGRAPH02': '', 'AUTOGRAPH1': '', 'MAINSERIALNO': '',
        //   'ILLUSTRATE': this.ruleForm.explain, 'WFLAG': '' }
        // this.$http(this.$reportMngApi.insertXRPISHANDOVERREGISTER1, params).then( // 此处调用自己的Api接口方法
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
        //     } else if (resdata.TrxCode === 'T5504') {
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
