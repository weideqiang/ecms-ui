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
                <el-option v-for="item in operationTypes5549" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-if="showQueryType" :span="8" >
            <el-form-item label="查询类型：" prop="queryType">
              <el-select ref="QueryType" v-model="ruleForm.queryType" placeholder="请选择" style="width: 80%;" clearable>
                <el-option v-for="item in queryType5549" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="起始日期：" prop="startDate">
              <el-date-picker
                id="startDate"
                ref="StartDate"
                :disabled="disabledStartDate"
                v-model="ruleForm.startDate"
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
                ref="EndDate"
                :disabled="disabledEndDate"
                v-model="ruleForm.endDate"
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
            <el-form-item label="机构代码：" prop="branchCode">
              <el-input ref="BranchCode" v-model="ruleForm.branchCode" :disabled="disabledBranchCode" placeholder="请输入机构号" style="width: 80%;" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="柜员号：" prop="tellerNo">
              <el-input ref="TellerNo" v-model="ruleForm.tellerNo" :disabled="disabledTellerNo" placeholder="请输入柜员号" style="width: 80%;" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <hr>
        <br>
        <el-row>
          <el-col :span="8">
            <el-form-item label="签约日期：" prop="QYDate">
              <el-date-picker
                id="QYDate"
                ref="qYDate"
                :disabled="disableQYDate"
                v-model="ruleForm.QYDate"
                type="date"
                style="width: 80%;"
                placeholder="选择日期"
                editable
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyyMMdd"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="解约日期：" prop="JYDate">
              <el-date-picker
                id="JYDate"
                ref="jYDate"
                :disabled="disabledJYDate"
                v-model="ruleForm.JYDate"
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
            <el-form-item label="交易名称：" prop="tradeName">
              <el-input ref="TradeName" v-model="ruleForm.tradeName" :disabled="disabledTradeName" placeholder="请输入交易名称" style="width: 80%;" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="用户编号：" prop="YHBH">
              <el-input ref="yHBH" v-model="ruleForm.YHBH" :disabled="disabledYHBH" placeholder="请输入用户编号" style="width: 80%;" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="账/卡号：" prop="accountCardNo" >
              <el-input
                ref="accountNo"
                :disabled="disabledaccountCardNo"
                v-model="ruleForm.accountCardNo"
                style="width: 80%;"
                placeholder="请输入账/卡号"
                clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="客户名称：" prop="KHName" >
              <el-input
                ref="kHName"
                :disabled="disabledKHName"
                v-model="ruleForm.KHName"
                style="width: 80%;"
                placeholder="请输入客户名称"
                clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="证件类型：" prop="ZJType">
              <el-select ref="zJType" :disabled="disabledZJType" v-model="ruleForm.ZJType" placeholder="请选择" style="width: 80%;" clearable>
                <el-option v-for="item in ZJTypes" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件号码：" prop="ZJCode">
              <el-input ref="zJCode" v-model="ruleForm.ZJCode" :disabled="disabledZJCode" placeholder="请输入证件号码" style="width: 80%;" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="代理人姓名：" prop="DLRName" >
              <el-input
                ref="dLRName"
                :disabled="disabledDLRName"
                v-model="ruleForm.DLRName"
                style="width: 80%;"
                placeholder="请输入代理人姓名"
                clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="代理人证件类型：" prop="DLRZJType">
              <el-select ref="dLRZJType" :disabled="disabledDLRZJType" v-model="ruleForm.DLRZJType" placeholder="请选择" style="width: 80%;" clearable>
                <el-option v-for="item in DLRZJTypes" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="代理人证件号码：" prop="DLRZJCode">
              <el-input ref="dLRZJCode" v-model="ruleForm.DLRZJCode" :disabled="disabledDLRZJCode" placeholder="请输入证件号码" style="width: 80%;" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="复核员：" prop="FuHY">
              <el-input ref="fuHY" v-model="ruleForm.FuHY" :disabled="disabledFuHY" placeholder="请输入复核员号码" style="width: 80%;" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="复核员密码：" prop="FuHYMM">
              <el-input ref="fuHYMM" :disabled="true" v-model="ruleForm.FuHYMM" style="width: 80%;" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="说明：" prop="explain">
            <el-input
              ref="Explain"
              :disabled="disabledExplain"
              v-model="ruleForm.explain"
              class="info-queryUnit"
              type="textarea"
              placeholder="说明"
              clearable/>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item ref="lXDH" label="联系电话：" style="width: 80%;" prop="LXDH" >
              <el-input
                v-model="ruleForm.LXDH"
                placeholder="请输入联系电话"
                clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="推荐人1：" style="width: 80%;" prop="TJR1" >
              <el-input
                v-model="ruleForm.TJR1"
                placeholder="请输入推荐人1"
                clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="推荐人2：" style="width: 80%;" prop="TJR2" >
              <el-input
                v-model="ruleForm.TJR2"
                placeholder="请输入推荐人2"
                clearable/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="dialog-footer" style="width: 92%;" align="right">
        <el-row>
          <el-col :span="8">
            <el-button size="medium" type="primary" @click="exitTrade()">{{ '退出' }}</el-button>
          </el-col>
          <el-col :span="8">
            <el-button size="medium" type="primary" @click="submitForm()">{{ '提交' }}</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </el-main>
</template>

<script>
import { DateTime } from '../../../commjs/common'
import { mapGetters } from 'vuex'
export default {
  name: 'T5549',
  components: { DateTime },
  data() {
    const validOperationType = (rule, value, callback) => {
      this.ruleForm.tellerno = ''
      this.ruleForm.tradeName = ''
      this.ruleForm.QYDate = ''
      this.ruleForm.accountCardNo = ''
      this.ruleForm.yHBH = ''
      this.ruleForm.ZJType = ''
      this.ruleForm.DLRZJType = ''
      this.ruleForm.DLRZJCode = ''
      this.ruleForm.FuHY = ''
      this.ruleForm.DLRName = ''
      this.ruleForm.KHName = ''
      this.ruleForm.explain = ''
      if (this.ruleForm.operationType === '0') { // 查询
        this.showQueryType = true
        this.rules.branchCode[0].required = true
        this.rules.startDate[0].required = true
        this.rules.endDate[0].required = true
        this.rules.tellerno[0].required = false
        this.rules.tradeName[0].required = false
        this.rules.QYDate[0].required = false
        this.rules.JYDate[0].required = false
        this.rules.accountCardNo[0].required = false
        this.rules.YHBH[0].required = false
        this.rules.ZJType[0].required = false
        this.rules.ZJCode[0].required = false
        this.rules.DLRZJType[0].required = false
        this.rules.DLRZJCode[0].required = false
        this.rules.FuHY[0].required = false
        this.rules.DLRName[0].required = false
        this.rules.KHName[0].required = false
        this.rules.startDate[0].required = true
        this.$refs['StartDate'].focus()
      } else if (this.ruleForm.operationType === '1') { // 签约
        // this.showQueryType = false
        // this.ruleForm.QYDate = this.CurrentSystemDate
        // this.disableQYDate = true
        // this.rules.QYDate[0].required = false
        // this.rules.branchCode[0].required = false
        // this.disabledBranchCode = true
        // this.rules.tellerno[0].required = false
        // this.disabledTellerNo = true
        // this.rules.startDate[0].required = false
        // this.disabledStartDate = true
        // this.rules.endDate[0].required = false
        // this.disabledEndDate = true
        // this.ruleForm.endDate = ''
        // this.rules.tradeName[0].required = true
        // this.disabledTradeName = false
        // this.rules.JYDate[0].required = false
        // this.disabledJYDate = true
        // this.rules.accountCardNo[0].required = false
        // this.rules.YHBH[0].required = false
        // this.rules.ZJType[0].required = false
        // this.rules.ZJCode[0].required = false
        // this.rules.DLRZJType[0].required = false
        // this.rules.DLRZJCode[0].required = false
        // this.rules.FuHY[0].required = false
        // this.rules.DLRName[0].required = false
        // this.rules.KHName[0].required = false
        // this.rules.startDate[0].required = true
        // this.$refs['TradeName'].focus()
        callback(new Error('功能开发中'))
        // combo_查询类型.hide()
      } else { // 解约
        // this.showQueryType = false
        // this.ruleForm.JYDate = this.CurrentSystemDate
        // this.disableQYDate = true
        // this.rules.QYDate[0].required = false
        // this.rules.branchCode[0].required = false
        // this.disabledBranchCode = true
        // this.rules.tellerno[0].required = false
        // this.disabledTellerNo = true
        // this.rules.startDate[0].required = false
        // this.disabledStartDate = true
        // this.rules.endDate[0].required = false
        // this.disabledEndDate = true
        // this.ruleForm.endDate = ''
        // this.rules.tradeName[0].required = true
        // this.disabledTradeName = false
        // this.rules.JYDate[0].required = false
        // this.disabledJYDate = true
        //
        // this.rules.accountCardNo[0].required = false
        // this.rules.YHBH[0].required = false
        // this.rules.ZJType[0].required = false
        // this.rules.ZJCode[0].required = false
        // this.rules.DLRZJType[0].required = false
        // this.rules.DLRZJCode[0].required = false
        // this.rules.FuHY[0].required = false
        // this.rules.DLRName[0].required = false
        // this.rules.KHName[0].required = false
        // this.rules.startDate[0].required = true
        // this.$refs['TradeName'].focus()
        callback(new Error('功能开发中'))
        // combo_查询类型.hide()
      }
    }
    return {
      showQueryType: false,
      disableQYDate: false,
      disableBranchCode: false,
      disabledExplain: false,
      disabledFuHY: false,
      disabledDLRZJCode: false,
      disabledDLRZJType: false,
      disabledDLRName: false,
      disabledZJCode: false,
      disabledZJType: false,
      disabledKHName: false,
      disabledaccountCardNo: false,
      disabledTradeName: false,
      disabledJYDate: false,
      disabledTellerNo: false,
      disabledYHBH: false,
      disabledBranchCode: false,
      disabledEndDate: false,
      disabledStartDate: false,
      ruleForm: {
        operationType: '', // 操作类型
        queryType: '', // 查询类型
        startDate: '', // 起始日期
        endDate: '', // 结束日期
        HCBSType: '', // 核查标识
        branchCode: '', // 机构代码
        tellerNo: '', // 柜员号
        QYDate: '', // 签约日期
        JYDate: '', // 解约日期
        tradeName: '', // 交易名称
        YHBH: '', // 用户编号
        accountCardNo: '', // 账/卡号
        KHName: '', // 客户名称
        ZJType: '', // 证件类型
        ZJCode: '', // 证件号码
        DLRName: '', // 代理人姓名
        DLRZJType: '', // 代理人证件类型
        DLRZJCode: '', // 代理人证件号码
        FuHY: '', // 复核员
        FuHYMM: '', // 复核员密码
        explain: '', // 说明
        LXDH: '', // 联系电话
        TJR1: '', // 推荐人1
        TJR2: '' // 推荐人2
      },
      BranchLevel: '', // 机构级别
      rules: {
        operationType: [
          { required: true, message: '请选择操作类型', trigger: 'change' },
          { trigger: 'change', validator: validOperationType }
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
        branchCode: [
          { required: false, message: '请输入机构代码', trigger: 'blur' }
        ],
        tellerno: [
          { required: false, message: '请输入柜员号', trigger: 'blur' }
        ],
        QYDate: [
          { required: false, message: '请选择签约日期', trigger: 'blur' }
        ],
        JYDate: [
          { required: false, message: '请选择解约日期', trigger: 'blur' }
        ],
        tradeName: [
          { required: false, message: '请输入交易名称', trigger: 'blur' }
        ],
        YHBH: [
          { required: false, message: '请选输入用户编号', trigger: 'blur' }
        ],
        accountCardNo: [
          { required: false, message: '请输入账/卡号', trigger: 'blur' }
        ],
        KHName: [
          { required: false, message: '请输入客户名称', trigger: 'blur' }
        ],
        ZJType: [
          { required: false, message: '请选择证件类型', trigger: 'change' }
        ],
        ZJCode: [
          { required: false, message: '请输入证件号码', trigger: 'blur' }
        ],
        DLRName: [
          { required: false, message: '请输入代理人姓名', trigger: 'blur' }
        ],
        DLRZJType: [
          { required: false, message: '请输入代理人证件类型', trigger: 'blur' }
        ],
        DLRZJCode: [
          { required: false, message: '请输入代理人证件号码', trigger: 'blur' }
        ],
        FuHY: [
          { required: false, message: '请输入复核员', trigger: 'blur' }
        ],
        FuHYMM: [
          { required: false, message: '请输入复核员密码', trigger: 'blur' }
        ],
        explain: [
          { required: false, message: '请输入说明', trigger: 'blur' }
        ],
        LXDH: [
          { required: false, message: '联系电话', trigger: 'blur' }
        ],
        TJR1: [
          { required: false, message: '请输入推荐人1', trigger: 'blur' }
        ],
        TJR2: [
          { required: false, message: '请输入推荐人2', trigger: 'blur' }
        ]
      },
      CurrentUserNo: '', // 初始化-当前柜员号
      CurrentUserName: '', // 初始化-当前柜员名称
      CurrentBranchNo: '', // 初始化-当前机构号
      CurrentBranchName: '', // 初始化-当前机构名称
      CurrentZoneNo: '', // 初始化-当前地区号
      CurrentSystemDate: '', // 初始化-当前系统日期
      CurrentSystemTime: '', // 当前系统时间
      operationTypes5549: this.$combo.tradeTypes5549,
      DLRZJTypes: this.$combo.bQueryNames,
      ZJTypes: this.$combo.bQueryNames,
      queryType5549: this.$combo.queryType5549
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
    if (this.CurrentUserNo === '') { // 进行初始化操作
      this.$http(this.$systemPublicApi.getSystemPublicInfo)
        .then(
          res => {
            console.log('tradeINit--start--' + JSON.stringify(res.data))
            this.CurrentUserNo = res.data.CurrentUserNo
            this.CurrentUserName = res.data.CurrentUserName
            this.CurrentBranchNo = res.data.CurrentBranchNo
            this.CurrentBranchName = res.data.CurrentBranchName
            this.CurrentZoneNo = res.data.CurrentZoneNo
            this.CurrentSystemDate = res.data.CurrentSystemDate
          })
    }
  },
  methods: {
    exitTrade() { // 交易退出返回首页
      this.$router.push({
        path: this.redirect || '/dashboard'
      })
    },
    submitForm() { // 提交
      if (this.ruleForm.operationType !== '0') { // 签约解约操作
        this.$message.error('功能开发中')
        return
        // const map = {
        //   'REGISTERDATE': this.CurrentSystemDate,
        //   'REGISTERTIME': new DateTime().getTime(),
        //   'TRADENAME': this.ruleForm.tradeName,
        //   'SIGNDATE': this.ruleForm.QYDate,
        //   'REDATE': this.ruleForm.JYDate,
        //   'MCACCOUNT': this.ruleForm.accountCardNo,
        //   'ACCTYPE': '',
        //   'IDTYPE': this.ruleForm.ZJType,
        //   'IDNO': this.ruleForm.ZJCode,
        //   'CUSTNUMBER': this.ruleForm.YHBH,
        //   'AGENTIDTYPE': this.ruleForm.DLRZJType,
        //   'AGENTIDNO': this.ruleForm.DLRZJCode,
        //   'CHECKUSERNO': this.ruleForm.FuHY,
        //   'CHECKUSERNAME': '',
        //   'BRNO': this.CurrentBranchNo,
        //   'BRNAME': this.CurrentBranchName,
        //   'TELLERNO': this.CurrentUserNo,
        //   'TELLERNAME': this.CurrentUserName,
        //   'AUTHTELLER': '',
        //   'AUTHNAME': '',
        //   'NOTE1': '',
        //   'NOTE2': this.ruleForm.explain,
        //   'NOTE3': '',
        //   'NOTE4': '',
        //   'NOTE5': this.ruleForm.KHName,
        //   'BEIZHU1': this.ruleForm.DLRName,
        //   'BEIZHU2': this.ruleForm.LXDH,
        //   'BEIZHU3': this.ruleForm.TJR1,
        //   'BEIZHU4': this.ruleForm.TJR2,
        //   'BEIZHU5': ''
        // }
        // const params1 = { 'ruleForm': JSON.stringify(map) }
        // const url1 = this.$registerBookApi.insertXR_PIS_SIGNINFO_REGISTER1
        // this.$http(url1, params1).then( // 通讯后台修改数据库中信息
        //   res => {
        //     const _data = res.data
        //     // 赋值
        //     if (_data.code === 'SUCCESS') {
        //       if (_data.data.TrxCode === '000000') {
        //         console.log('---insertXR_PIS_SIGNINFO_REGISTER1---' + JSON.stringify(res.data))
        //         this.messageSuccess('登记成功!   流水号' + _data.data._MAINLSH_)
        //         return
        //       } else {
        //         if (_data.data.TrxCode === 'T5549_002') {
        //           this.messageWarning('登记失败!')
        //           return
        //         } else {
        //           this.messageError('错误信息 ： ' + _data.data.TrxMessage)
        //           return
        //         }
        //       }
        //     } else {
        //       this.messageError('错误信息 ： ' + _data.message)
        //       return
        //     }
        //   })
      } else { // 查询
        const params0 = { 'branchno': this.ruleForm.BranchCode === '' ? this.CurrentBranchNo : this.ruleForm.BranchCode }
        const url0 = this.$systemPublicApi.getBranchLevel
        this.$http(url0, params0).then( // 通讯后台修改数据库中信息
          res => {
            console.log('--getBranchLevel--' + JSON.stringify(res.data))
            const _data = res.data
            if (_data.ErrCode === '0000') {
              if (this.ruleForm.BranchCode === '019807' || this.ruleForm.BranchCode === '011901') {
                this.BranchLevel = '1'
              } else {
                this.BranchLevel = _data.BranchLevel
                if (this.BranchLevel === '3') {
                  if (this.ruleForm.BranchCode !== '') {
                    this.BranchLevel = '4'
                  }
                }
              }
            } else {
              if (this.ruleForm.BranchCode !== '') {
                if (this.ruleForm.BranchCode.substring(2) === '0000') {
                  this.BranchLevel = '2'
                } else if (this.ruleForm.BranchCode.substring(4) === '00') {
                  this.BranchLevel = '3'
                }
              } else {
                if (this.CurrentBranchNo === '019807' || this.CurrentBranchNo === '011901') {
                  this.BranchLevel = '1'
                } else {
                  this.BranchLevel = _data.BranchLevel
                }
                this.ruleForm.BranchCode = this.CurrentBranchNo
              }
              if (this.ruleForm.BranchCode === '') {
                this.BranchLevel = '1'
              }
            }
            const map = {
              'startdate': this.ruleForm.startDate,
              'enddate': this.ruleForm.endDate,
              'brno': this.ruleForm.BranchCode === '' ? this.CurrentBranchNo : this.ruleForm.BranchCode,
              'branchlevel': this.BranchLevel,
              'tellerno': this.ruleForm.tellerno,
              'tradename': this.ruleForm.tradeName,
              'signdate': this.ruleForm.QYDate,
              'redate': this.ruleForm.JYDate,
              'mcaccount': this.ruleForm.accountCardNo,
              'custnumber': this.ruleForm.YHBH,
              'idtype': this.ruleForm.ZJType,
              'idno': this.ruleForm.ZJCode,
              'agentidtype': this.ruleForm.DLRZJType,
              'agentidno': this.ruleForm.DLRZJCode,
              'checkuserno': this.ruleForm.FuHY,
              'flag': this.ruleForm.operationType
            }
            const params1 = { 'ruleForm': JSON.stringify(map), 'pageNum': '1', 'pageSize': '10' }
            const url1 = this.$registerBookApi.getXR_PIS_SIGNINFO_REGISTER
            this.$http(url1, params1).then( // 通讯后台修改数据库中信息
              res => {
                const _data = res.data
                // 赋值
                if (_data.code === 'SUCCESS') {
                  if (_data.data.TrxCode === '000000') {
                    console.log('---getXR_PIS_SIGNINFO_REGISTER---' + JSON.stringify(res.data))
                    this.tableData = res.data
                    this.$router.push({
                      path: this.redirect || '/T554901',
                      name: 'T554901',
                      params: {
                        map: _data.data.PageInfo,
                        totalNum: _data.data.PageInfo.total
                      }
                    })
                  } else {
                    if (_data.data.TrxCode === 'T5549_001') {
                      this.messageWarning('没有记录!')
                      return
                    } else {
                      this.messageError('错误信息 ： ' + _data.data.TrxMessage)
                      return
                    }
                  }
                } else {
                  this.messageError('错误信息 ： ' + _data.message)
                  return
                }
              })
          })
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
