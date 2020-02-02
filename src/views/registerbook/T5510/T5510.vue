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
            <el-form-item label="柜员号：" style="width: 85%;" prop="GYH">
              <el-input :disabled="disabledGYH" v-model="ruleForm.GYH" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="假币（票）名称：" prop="JBPMC">
              <el-select v-model="ruleForm.JBPMC" style="width: 80%;" placeholder="请选择" clearable>
                <el-option v-for="item in JBPMCs" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="持票人：" style="width: 85%;" prop="CPR">
              <el-input :disabled="disabledCPR" v-model="ruleForm.CPR" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="证件类型：" prop="ZJType">
              <el-select :disabled="disabledZJType" v-model="ruleForm.ZJType" style="width: 80%;" placeholder="请选择" clearable>
                <el-option v-for="item in ZJTypes" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件号码：" style="width: 85%;" prop="ZJCode">
              <el-input :disabled="disabledZJCode" v-model="ruleForm.ZJCode" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="冠字号码：" style="width: 85%;" prop="GZHM">
              <el-input v-model="ruleForm.GZHM" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="版别：" style="width: 85%;" prop="BanB">
              <el-input v-model="ruleForm.BanB" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="劵别：" style="width: 85%;" prop="JuanB">
              <el-input v-model="ruleForm.JuanB" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="金额：" style="width: 85%;" prop="JinE">
              <el-input v-model="ruleForm.JinE" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="凭证数量：" style="width: 85%;" prop="PingZSL">
              <el-input v-model="ruleForm.PingZSL" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="凭证号码：" style="width: 85%;" prop="PingZHM">
              <el-input v-model="ruleForm.PingZHM" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="伪造特征：" prop="WeiZTZ">
              <el-select :disabled="disabledWeiZTZ" v-model="ruleForm.WeiZTZ" style="width: 80%;" placeholder="请选择" clearable>
                <el-option v-for="item in WeiZTZs" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="库存余额：" style="width: 85%;" prop="KuCYE">
              <el-input :disabled="true" v-model="ruleForm.KuCYE" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="复核员：" style="width: 85%;" prop="FuHY">
              <el-input v-model="ruleForm.FuHY" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="复核员密码：" style="width: 85%;" prop="FuHYMM">
              <el-input :disabled="true" v-model="ruleForm.FuHYMM" clearable/>
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
  name: 'T5510',
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
      this.ruleForm.startDate = '' // 起始日期
      this.ruleForm.endDate = '' // 结束日期
      this.ruleForm.institutionCode = '' // 机构代码
      this.ruleForm.GYH = '' // 柜员号
      this.ruleForm.JBPMC = '' // 假币（票）名称
      this.ruleForm.CPR = '' // 持票人
      this.ruleForm.ZJType = '' // 证件类型
      this.ruleForm.ZJCode = '' // 证件号码
      this.ruleForm.GZHM = '' // 冠字号码
      this.ruleForm.BanB = '' // 版别
      this.ruleForm.JuanB = '' // 劵别
      this.ruleForm.JinE = '' // 金额
      this.ruleForm.PingZSL = '' // 凭证数量
      this.ruleForm.PingZHM = '' // 凭证号码
      this.ruleForm.WeiZTZ = '' // 伪造特征
      this.ruleForm.KuCYE = '' // 库存余额
      this.ruleForm.FuHY = '' // 复核员
      this.ruleForm.FuHYMM = '' // 复核员密码
      this.ruleForm.explain = '' // 说明
      if (value === '0') {
        this.returnregister = '查询'
        // this.ruleForm.institutionCode = this.CurrentBranchNo
        this.HighShootdisabled = true
        this.disabledstartDate = false
        this.disabledendDate = false
        this.disabledGYH = false
        this.disabledCPR = false
        this.disabledZJType = false
        this.disabledZJCode = false
        this.disabledWeiZTZ = false
        this.rules.startDate[0].required = true
        this.rules.endDate[0].required = true
        this.rules.JBPMC[0].required = false
        this.rules.JinE[0].required = false
        this.rules.WeiZTZ[0].required = false
        this.rules.FuHY[0].required = false
        this.rules.CPR[0].required = false
        this.rules.ZJType[0].required = false
        this.rules.ZJCode[0].required = false
      } else if (value === '1') {
        // this.returnregister = '收缴'
        // this.HighShootdisabled = false
        // this.disabledstartDate = true
        // this.disabledendDate = true
        // this.disabledGYH = true
        // this.disabledCPR = false
        // this.disabledZJType = false
        // this.disabledZJCode = false
        // this.disabledWeiZTZ = false
        // this.rules.startDate[0].required = true
        // this.rules.endDate[0].required = true
        // this.rules.JBPMC[0].required = false
        // this.rules.JinE[0].required = false
        // this.rules.WeiZTZ[0].required = false
        // this.rules.FuHY[0].required = false
        // this.rules.CPR[0].required = false
        // this.rules.ZJType[0].required = false
        // this.rules.ZJCode[0].required = false
        // this.rules.startDate[0].required = false
        // this.rules.endDate[0].required = false
        // this.rules.JBPMC[0].required = true
        // this.rules.JinE[0].required = true
        // this.rules.WeiZTZ[0].required = true
        // this.rules.FuHY[0].required = true
        callback(new Error('功能开发中'))
      } else if (value === '2') {
        // this.returnregister = '上缴'
        // this.HighShootdisabled = false
        // this.disabledstartDate = true
        // this.disabledendDate = true
        // this.disabledGYH = true
        // this.disabledCPR = true
        // this.disabledZJType = true
        // this.disabledZJCode = true
        // this.disabledWeiZTZ = true
        // this.rules.startDate[0].required = true
        // this.rules.endDate[0].required = true
        // this.rules.JBPMC[0].required = false
        // this.rules.JinE[0].required = false
        // this.rules.WeiZTZ[0].required = false
        // this.rules.FuHY[0].required = false
        // this.rules.CPR[0].required = false
        // this.rules.ZJType[0].required = false
        // this.rules.ZJCode[0].required = false
        // this.rules.startDate[0].required = false
        // this.rules.endDate[0].required = false
        // this.rules.JBPMC[0].required = true
        // this.rules.JinE[0].required = true
        // this.rules.WeiZTZ[0].required = false
        // this.rules.FuHY[0].required = true
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
      disabledCPR: false,
      disabledZJType: false,
      disabledZJCode: false,
      disabledWeiZTZ: false,
      ruleForm: {
        operationType: '',
        startDate: '', // 起始日期
        endDate: '', // 结束日期
        institutionCode: '', // 机构代码
        GYH: '', // 柜员号
        JBPMC: '', // 假币（票）名称
        CPR: '', // 持票人
        ZJType: '', // 证件类型
        ZJCode: '', // 证件号码
        GZHM: '', // 冠字号码
        BanB: '', // 版别
        JuanB: '', // 劵别
        JinE: '', // 金额
        PingZSL: '', // 凭证数量
        PingZHM: '', // 凭证号码
        WeiZTZ: '', // 伪造特征
        KuCYE: '', // 库存余额
        FuHY: '', // 复核员
        FuHYMM: '', // 复核员密码
        explain: '' // 说明
      },
      institutionCodes: {},
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
          { required: true, message: '请选择机构代码', trigger: 'blur' }
        ],
        GYH: [
          { required: false, message: '请选输入柜员号', trigger: 'blur' }
        ],
        JBPMC: [
          { required: true, message: '请选择假币（票）名称', trigger: 'change' }
        ],
        CPR: [
          { required: true, message: '请输入持票人', trigger: 'blur' }
        ],
        ZJType: [
          { required: true, message: '请选择证件类型', trigger: 'change' }
        ],
        ZJCode: [
          { required: true, message: '请输入证件号码', trigger: 'blur' }
        ],
        GZHM: [
          { required: false, message: '请输入冠字号码', trigger: 'blur' }
        ],
        BanB: [
          { required: false, message: '请输入版别', trigger: 'blur' }
        ],
        JuanB: [
          { required: false, message: '请输入劵别', trigger: 'blur' }
        ],
        JinE: [
          { required: true, message: '请输入金额', trigger: 'blur' }
        ],
        PingZSL: [
          { required: false, message: '请输入凭证数量', trigger: 'blur' }
        ],
        PingZHM: [
          { required: false, message: '请输入凭证号码', trigger: 'blur' }
        ],
        WeiZTZ: [
          { required: true, message: '请选择伪造特征', trigger: 'blur' }
        ],
        KuCYE: [
          { required: false, message: '请输入库存余额', trigger: 'blur' }
        ],
        FuHY: [
          { required: false, message: '请输入复核员', trigger: 'blur' }
        ],
        FuHYMM: [
          { required: false, message: '请输入复核员密码', trigger: 'blur' }
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
      operationTypes: this.$combo.operationType4, // 对公对私标志下拉列表
      JBPMCs: this.$combo.CounterfeitTheName, // 假币（票）名称
      ZJTypes: this.$combo.DocumentType, // 证件类型
      WeiZTZs: this.$combo.FakeCharacteristics // 伪造特征
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
          'COUNTERFEIT': this.ruleForm.JBPMC,
          'BEARER': this.ruleForm.CPR,
          'IDNO': this.ruleForm.ZJCode,
          'SERIALNUMBER': this.ruleForm.GZHM,
          'EDITION': this.ruleForm.BanB,
          'TICKET': this.ruleForm.JuanB,
          'MONEY': this.ruleForm.JinE,
          'NUMBERS': this.ruleForm.PingZSL,
          'VOUCHERNO': this.ruleForm.PingZHM,
          'FORGERYFEATURE': this.ruleForm.WeiZTZ,
          'TELLERNO1': this.ruleForm.FuHY,
          'ILLUSTRATE': this.ruleForm.explain,
          'pageNum': '1', 'pageSize': '10' }
        this.$http(this.$reportMngApi.getXRPISCOUNTERFEITREGISTER, params).then( // 此处调用自己的Api接口方法
          res => {
            const resdata = res.data.data
            console.log(res.data)
            if (resdata.TrxCode === '000000') {
              // 赋值
              this.totals = resdata.PageInfo.total
              this.tableData = resdata.PageInfo.list
              console.log('-------------------')
              this.$router.push({
                path: this.redirect || '/T55101',
                name: 'T55101',
                params: {
                  map: resdata.PageInfo,
                  totalNum: resdata.TotalNum,
                  STARTDATE: this.ruleForm.startDate,
                  ENDDATE: this.ruleForm.endDate,
                  BRNO: this.ruleForm.institutionCode,
                  BRANCHLEVEL: '',
                  TELLERNO: this.ruleForm.GYH,
                  COUNTERFEIT: this.ruleForm.JBPMC,
                  BEARER: this.ruleForm.CPR,
                  IDNO: this.ruleForm.ZJCode,
                  SERIALNUMBER: this.ruleForm.GZHM,
                  EDITION: this.ruleForm.BanB,
                  TICKET: this.ruleForm.JuanB,
                  MONEY: this.ruleForm.JinE,
                  NUMBERS: this.ruleForm.PingZSL,
                  VOUCHERNO: this.ruleForm.PingZHM,
                  FORGERYFEATURE: this.ruleForm.WeiZTZ,
                  TELLERNO1: this.ruleForm.FuHY,
                  ILLUSTRATE: this.ruleForm.explain
                }
              })
            } else if (resdata.TrxCode === 'T5510') {
              this.$message({
                showClose: true,
                message: '错误信息 : ' + resdata.TrxMessage,
                type: 'warning'
              })
            }
          }
        )
      } else if (this.returnregister === '收缴') {
        this.$message.error('功能开发中')
        return
        // const params = { 'REGISTERDATE': '',
        //   'REGISTERTIME': '',
        //   'COUNTERFEIT': this.ruleForm.JBPMC,
        //   'BEARER': this.ruleForm.CPR,
        //   'IDTYPE': this.ruleForm.ZJType,
        //   'IDNO': this.ruleForm.ZJCode,
        //   'SERIALNUMBER': this.ruleForm.GZHM,
        //   'EDITION': this.ruleForm.BanB,
        //   'TICKET': this.ruleForm.JuanB,
        //   'MONEY': this.ruleForm.JinE,
        //   'NUMBERS': this.ruleForm.PingZSL,
        //   'VOUCHERNO': this.ruleForm.PingZHM,
        //   'FORGERYFEATURE': this.ruleForm.WeiZTZ,
        //   'SJMASSEGE': '',
        //   'SJAMOUNT': '0',
        //   'TREATMENT': this.ruleForm.operationType,
        //   'BRNO': this.CurrentBranchNo,
        //   'BRNAME': this.CurrentBranchName,
        //   'TELLERNO': this.CurrentUserNo,
        //   'TELLERNAME': this.CurrentUserName,
        //   'TELLERNO1': this.ruleForm.FuHY,
        //   'TELLERNAME1': '',
        //   'MAINSERIALNO': '',
        //   'ILLUSTRATE': this.ruleForm.explain,
        //   'BEIYONG1': '',
        //   'BEIYONG2': '',
        //   'BEIYONG3': '',
        //   'BEIYONG4': '',
        //   'BEIYONG5': ''
        // }
        // this.$http(this.$reportMngApi.insertXRPISCOUNTERFEITREGISTER, params).then( // 此处调用自己的Api接口方法
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
        //     } else if (resdata.TrxCode === 'T5510') {
        //       this.$message({
        //         showClose: true,
        //         message: '错误信息 : ' + resdata.TrxMessage,
        //         type: 'warning'
        //       })
        //     }
        //   }
        // )
      } else if (this.returnregister === '上缴') {
        this.$message.error('功能开发中')
        return
        // var SJNR = this.ruleForm.JBPMC + '|' + this.ruleForm.GZHM + '|' + this.ruleForm.BanB
        // const params = { 'REGISTERDATE': '',
        //   'REGISTERTIME': '',
        //   'COUNTERFEIT': this.ruleForm.JBPMC,
        //   'BEARER': this.CurrentBranchNo,
        //   'IDTYPE': this.ruleForm.ZJType,
        //   'IDNO': this.ruleForm.ZJCode,
        //   'SERIALNUMBER': this.ruleForm.GZHM,
        //   'EDITION': this.ruleForm.BanB,
        //   'TICKET': this.ruleForm.JuanB,
        //   'MONEY': '',
        //   'NUMBERS': this.ruleForm.PingZSL,
        //   'VOUCHERNO': this.ruleForm.PingZHM,
        //   'FORGERYFEATURE': this.ruleForm.WeiZTZ,
        //   'SJMASSEGE': SJNR,
        //   'SJAMOUNT': this.ruleForm.JinE,
        //   'TREATMENT': this.ruleForm.operationType,
        //   'BRNO': this.CurrentBranchNo,
        //   'BRNAME': this.CurrentBranchName,
        //   'TELLERNO': this.CurrentUserNo,
        //   'TELLERNAME': this.CurrentUserName,
        //   'TELLERNO1': this.ruleForm.FuHY,
        //   'TELLERNAME1': '',
        //   'MAINSERIALNO': '',
        //   'ILLUSTRATE': this.ruleForm.explain,
        //   'BEIYONG1': '',
        //   'BEIYONG2': '',
        //   'BEIYONG3': '',
        //   'BEIYONG4': '',
        //   'BEIYONG5': ''
        // }
        // this.$http(this.$reportMngApi.insertXRPISCOUNTERFEITREGISTER, params).then( // 此处调用自己的Api接口方法
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
        //     } else if (resdata.TrxCode === 'T5510') {
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
