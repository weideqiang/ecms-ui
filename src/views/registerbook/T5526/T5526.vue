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
              <el-select v-model="ruleForm.operationType" placeholder="请选择" style="width: 80%;" clearable>
                <el-option v-for="item in operationTypes" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="核查标识：" prop="HCBSType">
              <el-select :disabled="true" v-model="ruleForm.HCBSType" placeholder="请选择" style="width: 80%;" clearable>
                <el-option v-for="item in HCBSTypes" :key="item.value" :label="item.label" :value="item.value"/>
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
            <el-form-item label="柜员号：" prop="tellerno">
              <el-input :disabled="disabledtellerno" v-model="ruleForm.tellerno" style="width: 80%;" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <hr>
        <br>
        <el-row>
          <el-col :span="8">
            <el-form-item label="业务受理日期：" prop="YWSLDate">
              <el-date-picker
                id="startDate"
                :disabled="disabledYWSLDate"
                v-model="ruleForm.YWSLDate"
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
            <el-form-item label="业务受理时间：" prop="YWSLTime">
              <el-date-picker
                id="startDate"
                :disabled="disabledYWSLTime"
                v-model="ruleForm.YWSLTime"
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
            <el-form-item label="交易码：" prop="JYM">
              <el-input v-model="ruleForm.JYM" style="width: 80%;" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业务种类：" prop="YWZLType">
              <el-select v-model="ruleForm.YWZLType" placeholder="请选择" style="width: 80%;" clearable>
                <el-option v-for="item in YWZLTypes" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="证件类型：" prop="ZJType">
              <el-select v-model="ruleForm.ZJType" placeholder="请选择" style="width: 80%;" clearable>
                <el-option v-for="item in ZJTypes" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件号码：" prop="ZJCode">
              <el-input v-model="ruleForm.ZJCode" style="width: 80%;" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="账号/卡号：" prop="bQuerycertificateNumber" >
              <el-input
                v-model="ruleForm.bQuerycertificateNumber"
                style="width: 80%;"
                placeholder="请输入账/卡号"
                clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="客户名称：" prop="KHName" >
          <el-input
            v-model="ruleForm.KHName"
            placeholder="请输入客户名称"
            clearable/>
        </el-form-item>
        <el-form-item label="通讯地址：" prop="TXDZ" >
          <el-input
            v-model="ruleForm.TXDZ"
            placeholder="请输入通讯地址"
            clearable/>
        </el-form-item>
        <el-row>
          <el-col :span="8">
            <el-form-item label="联系电话：" prop="LXDH" >
              <el-input
                v-model="ruleForm.LXDH"
                style="width: 80%;"
                placeholder="请输入联系电话"
                clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="辅助证件类型：" prop="FZZZLX">
              <el-input v-model="ruleForm.FZZZLX" style="width: 80%;" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="辅助证件号码：" prop="FZZZHM">
              <el-input v-model="ruleForm.FZZZHM" style="width: 80%;" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="核查结果：" prop="HCJGType">
          <el-select v-model="ruleForm.HCJGType" placeholder="请选择" style="width: 80%;" clearable>
            <el-option v-for="item in HCJGTypes" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item label="脸部识别结果：" prop="LBSBJGType">
          <el-select v-model="ruleForm.LBSBJGType" placeholder="请选择" style="width: 80%;" clearable>
            <el-option v-for="item in LBSBJGTypes" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-row>
          <el-col :span="8">
            <el-form-item label="是否停办业务：" prop="SFTBYWType">
              <el-select v-model="ruleForm.SFTBYWType" placeholder="请选择" style="width: 80%;" clearable>
                <el-option v-for="item in SFTBYWTypes" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="事后核实结果：" prop="SHHSJGType">
              <el-select v-model="ruleForm.SHHSJGType" placeholder="请选择" style="width: 80%;" clearable>
                <el-option v-for="item in SHHSJGTypes" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业务处理结果：" prop="YWCLJGType">
              <el-select v-model="ruleForm.YWCLJGType" placeholder="请选择" style="width: 80%;" clearable>
                <el-option v-for="item in YWCLJGTypes" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
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
  name: 'T5526',
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
      this.ruleForm.HCBSType = '' // 核查标识
      this.ruleForm.institutionCode = '' // 机构代码
      this.ruleForm.tellerno = '' // 柜员号
      this.ruleForm.YWSLDate = '' // 业务受理日期
      this.ruleForm.YWSLTime = '' // 业务受理时间
      this.ruleForm.JYM = '' // 交易码
      this.ruleForm.vYWZLType = '' // 业务种类
      this.ruleForm.ZJType = '' // 证件类型
      this.ruleForm.ZJCode = '' // 证件号码
      this.ruleForm.bQuerycertificateNumber = '' // 账号/卡号
      this.ruleForm.KHName = '' // 客户名称
      this.ruleForm.TXDZ = '' // 通讯地址
      this.ruleForm.LXDH = '' // 联系电话
      this.ruleForm.FZZZLX = '' // 辅助证件类型
      this.ruleForm.FZZZHM = '' // 辅助证件号码
      this.ruleForm.HCJGType = '' // 核查结果
      this.ruleForm.LBSBJGType = '' // 脸部识别结果
      this.ruleForm.SFTBYWType = '' // 是否停办业务
      this.ruleForm.SHHSJGType = '' // 事后核实结果
      this.ruleForm.YWCLJGType = '' // 业务处理结果
      this.ruleForm.explain = '' // 说明
      if (value === '0') {
        this.returnregister = '查询'
        // this.ruleForm.institutionCode = this.CurrentBranchNo
        this.HighShootdisabled = true
        this.disabledstartDate = false
        this.disabledendDate = false
        this.disabledtellerno = false // 柜员号
        this.disabledYWSLDate = false // 业务受理日期
        this.disabledYWSLTime = false // 业务受理时间
        this.rules.JYM[0].required = false
        this.rules.startDate[0].required = true
        this.rules.endDate[0].required = true
        this.rules.YWSLDate[0].required = false
        this.rules.YWSLTime[0].required = false
        this.rules.YWZLType[0].required = false
        this.rules.ZJType[0].required = false
        this.rules.ZJCode[0].required = false
        this.rules.KHName[0].required = false
        this.rules.HCJGType[0].required = false
        this.rules.SFTBYWType[0].required = false
      } else if (value === '1') {
        // this.returnregister = '登记'
        // this.ruleForm.YWSLDate = this.CurrentSystemDate
        // const myDate = new Date()
        // const mytime = myDate.getHours() + ':' + myDate.getMinutes() + ':' + myDate.getSeconds()
        // this.ruleForm.YWSLTime = mytime
        // this.HighShootdisabled = false
        // this.disabledstartDate = true
        // this.disabledendDate = true
        // this.disabledtellerno = true // 柜员号
        // this.disabledYWSLDate = true // 业务受理日期
        // this.disabledYWSLTime = true // 业务受理时间
        // this.rules.JYM[0].required = true
        // this.rules.startDate[0].required = false
        // this.rules.endDate[0].required = false
        // this.rules.YWSLDate[0].required = false
        // this.rules.YWSLTime[0].required = false
        // this.rules.YWZLType[0].required = true
        // this.rules.ZJType[0].required = true
        // this.rules.ZJCode[0].required = true
        // this.rules.KHName[0].required = true
        // this.rules.HCJGType[0].required = true
        // this.rules.SFTBYWType[0].required = true
        callback(new Error('功能开发中'))
      } else if (value === '2') {
        // this.returnregister = '维护'
        // this.HighShootdisabled = false
        // this.disabledstartDate = true
        // this.disabledendDate = true
        // this.disabledtellerno = true // 柜员号
        // this.disabledYWSLDate = false // 业务受理日期
        // this.rules.JYM[0].required = false
        // this.rules.startDate[0].required = false
        // this.rules.endDate[0].required = false
        // this.rules.YWSLDate[0].required = true
        // this.rules.YWZLType[0].required = false
        // this.rules.ZJType[0].required = true
        // this.rules.ZJCode[0].required = true
        // this.rules.KHName[0].required = false
        // this.rules.HCJGType[0].required = false
        // this.rules.SFTBYWType[0].required = false
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
      disabledstartDate: false,
      disabledendDate: false,
      HighShootdisabled: false,
      disabledtellerno: false, // 柜员号
      disabledYWSLDate: false, // 业务受理日期
      disabledYWSLTime: false, // 业务受理时间
      institutionCodes: {},
      ruleForm: {
        operationType: '',
        startDate: '', // 起始日期
        endDate: '', // 结束日期
        HCBSType: '', // 核查标识
        institutionCode: '', // 机构代码
        tellerno: '', // 柜员号
        YWSLDate: '', // 业务受理日期
        YWSLTime: '', // 业务受理时间
        JYM: '', // 交易码
        YWZLType: '', // 业务种类
        ZJType: '', // 证件类型
        ZJCode: '', // 证件号码
        bQuerycertificateNumber: '', // 账号/卡号
        KHName: '', // 客户名称
        TXDZ: '', // 通讯地址
        LXDH: '', // 联系电话
        FZZZLX: '', // 辅助证件类型
        FZZZHM: '', // 辅助证件号码
        HCJGType: '', // 核查结果
        LBSBJGType: '', // 脸部识别结果
        SFTBYWType: '', // 是否停办业务
        SHHSJGType: '', // 事后核实结果
        YWCLJGType: '', // 业务处理结果
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
        HCBSType: [
          { required: false, message: '请选择核查标识', trigger: 'change' }
        ],
        institutionCode: [
          { required: true, message: '请选择机构代码', trigger: 'change' }
        ],
        tellerno: [
          { required: false, message: '请输入柜员号', trigger: 'blur' }
        ],
        YWSLDate: [
          { required: false, message: '请选择业务受理日期', trigger: 'blur' }
        ],
        YWSLTime: [
          { required: false, message: '请选择业务受理时间', trigger: 'blur' }
        ],
        JYM: [
          { required: false, message: '请输入交易码', trigger: 'blur' }
        ],
        YWZLType: [
          { required: false, message: '请选择业务种类', trigger: 'change' }
        ],
        ZJType: [
          { required: false, message: '请选择证件类型', trigger: 'change' }
        ],
        ZJCode: [
          { required: false, message: '请输入证件号码', trigger: 'blur' }
        ],
        bQuerycertificateNumber: [
          { required: false, message: '请输入账号/卡号', trigger: 'blur' }
        ],
        KHName: [
          { required: false, message: '请输入客户名称', trigger: 'blur' }
        ],
        TXDZ: [
          { required: false, message: '请输入通讯地址', trigger: 'blur' }
        ],
        LXDH: [
          { required: false, message: '请输入联系电话', trigger: 'blur' }
        ],
        FZZZLX: [
          { required: false, message: '请输入辅助证件类型', trigger: 'blur' }
        ],
        FZZZHM: [
          { required: false, message: '请输入辅助证件号码', trigger: 'blur' }
        ],
        HCJGType: [
          { required: false, message: '请选择核查结果', trigger: 'change' }
        ],
        LBSBJGType: [
          { required: false, message: '请选择脸部识别结果', trigger: 'change' }
        ],
        SFTBYWType: [
          { required: false, message: '请选择是否停办业务', trigger: 'change' }
        ],
        SHHSJGType: [
          { required: false, message: '请选择事后核实结果', trigger: 'change' }
        ],
        YWCLJGType: [
          { required: false, message: '请选择业务处理结果', trigger: 'change' }
        ],
        explain: [
          { required: false, message: '请选择说明', trigger: 'blur' }
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

      HCBSTypes: this.$combo.HCBSTypes, // 核查标识
      YWZLTypes: this.$combo.YWZLTypes, // 业务种类
      ZJTypes: this.$combo.DocumentType, // 证件类型
      HCJGTypes: this.$combo.HCJGTypes, // 核查结果
      LBSBJGTypes: this.$combo.LBSBJGTypes, // 脸部识别结果
      SFTBYWTypes: this.$combo.SFTBYWTypes, // 是否停办业务
      SHHSJGTypes: this.$combo.SHHSJGTypes, // 事后核实结果
      YWCLJGTypes: this.$combo.YWCLJGTypes // 业务处理结果
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
          'TELLERNO': this.ruleForm.tellerno,
          'ACCEPTEDDATE': this.ruleForm.YWSLDate,
          'ACCEPTEDTIME': '',
          'TRADECODE': this.ruleForm.JYM,
          'SERVICETYPE': this.ruleForm.YWZLType,
          'ACCNUMBER': this.ruleForm.bQuerycertificateNumber,
          'UNITNAME': this.ruleForm.KHName,
          'IDNO': this.ruleForm.ZJCode,
          'ADDRESS': this.ruleForm.TXDZ,
          'TELNUMBER': this.ruleForm.LXDH,
          'BEIYONG1': this.ruleForm.FZZZLX,
          'BEIYONG2': this.ruleForm.FZZZHM,
          'CHECKRESULT': this.ruleForm.HCJGType,
          'FACECHECK': this.ruleForm.LBSBJGType,
          'CLOSEDSERVICE': this.ruleForm.SFTBYWType,
          'AFTERCHECKRESULT': this.ruleForm.SHHSJGType,
          'PROCESSRESULT': this.ruleForm.YWCLJGType,
          'BUSINESSTYPE': this.ruleForm.JYM,
          'CHECKFLAG': this.ruleForm.HCBSType, 'pageNum': '1', 'pageSize': '10' }
        this.$http(this.$reportMngApi.getXRPISNETWORKCHECKREGISTER2, params).then( // 此处调用自己的Api接口方法
          res => {
            const resdata = res.data.data
            console.log(res.data)
            if (resdata.TrxCode === '000000') {
              // 赋值
              this.totals = resdata.PageInfo.total
              this.tableData = resdata.PageInfo.list
              console.log('-------------------')
              this.$router.push({
                path: this.redirect || '/T55261',
                name: 'T55261',
                params: {
                  map: resdata.PageInfo,
                  totalNum: resdata.TotalNum,
                  STARTDATE: this.ruleForm.startDate,
                  ENDDATE: this.ruleForm.endDate,
                  BRNO: this.ruleForm.institutionCode,
                  BRANCHLEVEL: '',
                  TELLERNO: this.ruleForm.tellerno,
                  ACCEPTEDDATE: this.ruleForm.YWSLDate,
                  ACCEPTEDTIME: '',
                  TRADECODE: this.ruleForm.JYM,
                  SERVICETYPE: this.ruleForm.YWZLType,
                  ACCNUMBER: this.ruleForm.bQuerycertificateNumber,
                  UNITNAME: this.ruleForm.KHName,
                  IDNO: this.ruleForm.ZJCode,
                  ADDRESS: this.ruleForm.TXDZ,
                  TELNUMBER: this.ruleForm.LXDH,
                  BEIYONG1: this.ruleForm.FZZZLX,
                  BEIYONG2: this.ruleForm.FZZZHM,
                  CHECKRESULT: this.ruleForm.HCJGType,
                  FACECHECK: this.ruleForm.LBSBJGType,
                  CLOSEDSERVICE: this.ruleForm.SFTBYWType,
                  AFTERCHECKRESULT: this.ruleForm.SHHSJGType,
                  PROCESSRESULT: this.ruleForm.YWCLJGType,
                  BUSINESSTYPE: this.ruleForm.JYM,
                  CHECKFLAG: this.ruleForm.HCBSType
                }
              })
            } else if (resdata.TrxCode === 'T5526') {
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
        // const params = { 'MAINTAINDATE': '', 'MAINTAINTIME': '', 'ACCEPTEDDATE': this.ruleForm.YWSLDate,
        //   'ACCEPTEDTIME': this.ruleForm.YWSLTime, 'TRADECODE': this.ruleForm.JYM, 'SERVICETYPE': this.ruleForm.YWZLType, 'ACCNUMBER': this.ruleForm.bQuerycertificateNumber,
        //   'UNITNAME': this.ruleForm.KHName, 'IDNO': this.ruleForm.ZJCode, 'ADDRESS': this.ruleForm.TXDZ, 'TELNUMBER': this.ruleForm.LXDH,
        //   'CHECKRESULT': this.ruleForm.HCJGType, 'FACECHECK': this.ruleForm.LBSBJGType, 'CLOSEDSERVICE': this.ruleForm.SFTBYWType, 'AFTERCHECKRESULT': this.ruleForm.SHHSJGType,
        //   'PROCESSRESULT': this.ruleForm.YWCLJGType, 'BRNO': this.CurrentBranchNo, 'BRNAME': this.CurrentBranchName, 'TELLERNO': this.CurrentUserNo, 'TELLERNAME': this.CurrentUserName,
        //   'MAINSERIALNO': '', 'MAINSERIALNO1': '', 'ILLUSTRATE': this.ruleForm.explain,
        //   'OPERATION': '2', 'BEIYONG1': this.ruleForm.FZZZLX, 'BEIYONG2': this.ruleForm.FZZZHM, 'BEIYONG3': '',
        //   'BEIYONG4': '', 'BEIYONG5': '', 'BUSINESSTYPE': this.ruleForm.JYM, 'IDTYPE': this.ruleForm.ZJType,
        //   'BEIZHU1': '', 'BEIZHU2': '', 'BEIZHU3': '', 'BEIZHU4': '',
        //   'BEIZHU5': '', 'BEIZHU6': '', 'BEIZHU7': '', 'BEIZHU8': '',
        //   'BEIZHU9': '', 'BEIZHU10': '', 'mainLsh': 'dj' }
        // this.$http(this.$reportMngApi.insertXRPISNETWORKCHECKREGISTER3, params).then( // 此处调用自己的Api接口方法
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
        //     } else if (resdata.TrxCode === 'T5526') {
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
        // const params = { 'MAINTAINDATE': this.ruleForm.YWSLDate, 'MAINTAINTIME': this.ruleForm.YWSLTime, 'ACCEPTEDDATE': this.CurrentSystemDate,
        //   'ACCEPTEDTIME': '', 'TRADECODE': this.ruleForm.JYM, 'SERVICETYPE': this.ruleForm.YWZLType, 'ACCNUMBER': this.ruleForm.bQuerycertificateNumber,
        //   'UNITNAME': this.ruleForm.KHName, 'IDNO': this.ruleForm.ZJCode, 'ADDRESS': this.ruleForm.TXDZ, 'TELNUMBER': this.ruleForm.LXDH,
        //   'CHECKRESULT': this.ruleForm.HCJGType, 'FACECHECK': this.ruleForm.LBSBJGType, 'CLOSEDSERVICE': this.ruleForm.SFTBYWType, 'AFTERCHECKRESULT': this.ruleForm.SHHSJGType,
        //   'PROCESSRESULT': this.ruleForm.YWCLJGType, 'BRNO': this.CurrentBranchNo, 'BRNAME': this.CurrentBranchName, 'TELLERNO': this.CurrentUserNo, 'TELLERNAME': this.CurrentUserName,
        //   'MAINSERIALNO': '', 'MAINSERIALNO1': '', 'ILLUSTRATE': this.ruleForm.explain,
        //   'OPERATION': '2', 'BEIYONG1': this.ruleForm.FZZZLX, 'BEIYONG2': this.ruleForm.FZZZHM, 'BEIYONG3': '',
        //   'BEIYONG4': '', 'BEIYONG5': '', 'BUSINESSTYPE': this.ruleForm.JYM, 'IDTYPE': this.ruleForm.ZJType,
        //   'BEIZHU1': '', 'BEIZHU2': '', 'BEIZHU3': '', 'BEIZHU4': '',
        //   'BEIZHU5': '', 'BEIZHU6': '', 'BEIZHU7': '', 'BEIZHU8': '',
        //   'BEIZHU9': '', 'BEIZHU10': '', 'mainLsh': '' }
        // this.$http(this.$reportMngApi.insertXRPISNETWORKCHECKREGISTER3, params).then( // 此处调用自己的Api接口方法
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
        //     } else if (resdata.TrxCode === 'T5526') {
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
