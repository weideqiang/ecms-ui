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
                <el-option v-for="item in tradeTypes5550" :key="item.value" :label="item.label" :value="item.value"/>
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
                :disabled="disabledendDate"
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
            <el-form-item label="机构代码：" prop="BranchCode">
              <el-input :disabled="disabledBranchCode" v-model="ruleForm.BranchCode" placeholder="请输入机构号" style="width: 80%;" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="柜员号：" prop="tellerNo">
              <el-input :disabled="disabledTellerNo" v-model="ruleForm.BranchCode" placeholder="请输入柜员号" style="width: 80%;" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="结算方式：" prop="JSFSType">
              <el-select ref="JSFSType" v-model="ruleForm.JSFSType" placeholder="请选择" style="width: 80%;" clearable>
                <el-option v-for="item in JSFSTypes5550" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="币种：" prop="BZType">
              <el-select v-model="ruleForm.BZType" placeholder="请选择" style="width: 80%;" clearable>
                <el-option v-for="item in BZTypes5550" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="交易金额：" prop="JYJE" >
              <el-input
                v-model="ruleForm.JYJE"
                style="width: 80%;"
                placeholder="请输入交易金额"
                clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="账/卡号：" prop="accountCardNo" >
              <el-input
                v-model="ruleForm.accountCardNo"
                style="width: 80%;"
                placeholder="请输入账/卡号"
                clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="户名：" prop="HmName" >
            <el-input
              v-model="ruleForm.HmName"
              placeholder="请输入户名"
              clearable/>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="交易码：" prop="JYCode" >
              <el-input
                v-model="ruleForm.JYCode"
                style="width: 80%;"
                placeholder="请输入交易码"
                clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="交易名称：" prop="JYMC" >
              <el-input
                v-model="ruleForm.JYMC"
                style="width: 80%;"
                placeholder="请输入交易名称"
                clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="收款人账号：" prop="SKRZH" >
              <el-input
                v-model="ruleForm.SKRZH"
                style="width: 80%;"
                placeholder="请输入收款人账号"
                clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="收款人户名：" prop="SKRName" >
            <el-input
              v-model="ruleForm.SKRName"
              placeholder="请输入收款人户名"
              clearable/>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="凭证类型：" prop="PZLXType">
              <el-select v-model="ruleForm.PZLXType" placeholder="请选择" style="width: 80%;" clearable>
                <el-option v-for="item in PZLXTypes5550" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="凭证号码：" prop="PZCode">
              <el-input v-model="ruleForm.PZCode" placeholder="请输入凭证号码" style="width: 80%;" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="查证联系人1：" prop="CZLXR1" >
              <el-input
                v-model="ruleForm.CZLXR1"
                style="width: 80%;"
                placeholder="请输入查证联系人1"
                clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="查证联系人电话1：" prop="CZLXRDH1" >
              <el-input
                v-model="ruleForm.CZLXRDH1"
                style="width: 80%;"
                placeholder="请输入查证联系人电话1"
                clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="查证联系人2：" prop="CZLXR2" >
              <el-input
                v-model="ruleForm.CZLXR2"
                style="width: 80%;"
                placeholder="请输入查证联系人2"
                clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="查证联系人电话2：" prop="CZLXRDH2" >
              <el-input
                v-model="ruleForm.CZLXRDH2"
                style="width: 80%;"
                placeholder="请输入查证联系人电话2"
                clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="查证结果：" prop="CZJG" >
            <el-input
              v-model="ruleForm.CZJG"
              placeholder="请输入查证结果"
              clearable/>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="审批员：" prop="SPY" >
              <el-input
                v-model="ruleForm.SPY"
                style="width: 80%;"
                placeholder="请输入审批员"
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
import { mapGetters } from 'vuex'
import { DateTime } from '../../../commjs/common'
export default {
  name: 'T5550',
  components: { DateTime },
  data() {
    const validOperationType = (rule, value, callback) => {
      this.ruleForm.startDate = ''
      this.ruleForm.BranchCode = ''
      this.ruleForm.endDate = ''
      this.ruleForm.JSFSType = ''
      this.ruleForm.BZType = ''
      this.ruleForm.JYJE = ''
      this.ruleForm.accountCardNo = ''
      this.ruleForm.HmName = ''
      this.ruleForm.JYCode = ''
      this.ruleForm.JYMC = ''
      this.ruleForm.SKRZH = ''
      this.ruleForm.SKRName = ''
      this.ruleForm.PZLXType = ''
      this.ruleForm.PZCode = ''
      this.ruleForm.CZLXR1 = ''
      this.ruleForm.CZLXRDH1 = ''
      this.ruleForm.CZLXR2 = ''
      this.ruleForm.CZLXRDH2 = ''
      this.ruleForm.CZJG = ''
      this.ruleForm.SPY = ''
      this.ruleForm.explain = ''
      if (this.ruleForm.operationType === '0') { // 查询
        this.rules.startDate[0].required = true
        this.rules.endDate[0].required = true
        this.rules.BranchCode[0].required = true
        this.rules.JSFSType[0].required = false
        this.rules.BZType[0].required = false
        this.rules.JYJE[0].required = false
        this.rules.accountCardNo[0].required = false
        this.rules.HmName[0].required = false
        this.rules.JYCode[0].required = false
        this.rules.JYMC[0].required = false
        this.rules.SKRZH[0].required = false
        this.rules.SKRName[0].required = false
        this.rules.PZLXType[0].required = false
        this.rules.PZCode[0].required = false
        this.rules.CZLXR1[0].required = false
        this.rules.CZLXRDH1[0].required = false
        this.rules.CZLXR2[0].required = false
        this.rules.CZLXRDH2[0].required = false
        this.rules.CZJG[0].required = false
        this.rules.SPY[0].required = false
        this.rules.explain[0].required = false
        this.$refs['StartDate'].focus()
      } else { // 登记
        // this.disabledBranchCode = true
        // this.disabledTellerNo = true
        // this.disabledStartDate = true
        // this.disabledendDate = true
        // this.ruleForm.endDate = ''
        // this.rules.startDate[0].required = false
        // this.rules.endDate[0].required = false
        // this.rules.BranchCode[0].required = false
        // this.rules.JSFSType[0].required = false
        // this.rules.BZType[0].required = true
        // this.rules.JYJE[0].required = true
        // this.rules.accountCardNo[0].required = true
        // this.rules.HmName[0].required = true
        // this.rules.JYCode[0].required = false
        // this.rules.JYMC[0].required = true
        // this.rules.SKRZH[0].required = false
        // this.rules.SKRName[0].required = false
        // this.rules.PZLXType[0].required = false
        // this.rules.PZCode[0].required = false
        // this.rules.CZLXR1[0].required = true
        // this.rules.CZLXRDH1[0].required = true
        // this.rules.CZLXR2[0].required = true
        // this.rules.CZLXRDH2[0].required = true
        // this.rules.CZJG[0].required = true
        // this.rules.SPY[0].required = true
        // this.rules.explain[0].required = false
        // this.$refs['JSFSType'].focus()
        callback(new Error('功能开发中'))
      }
    }
    return {
      CurrentUserNo: '', // 初始化-当前柜员号
      CurrentUserName: '', // 初始化-当前柜员名称
      CurrentBranchNo: '', // 初始化-当前机构号
      CurrentBranchName: '', // 初始化-当前机构名称
      CurrentZoneNo: '', // 初始化-当前地区号
      CurrentSystemDate: '', // 初始化-当前系统日期
      CurrentSystemTime: '', // 当前系统时间
      disabledendDate: false,
      disabledStartDate: false,
      disabledBranchCode: false,
      disabledTellerNo: false,
      PZLXTypes5550: this.$combo.PZLXTypes5550,
      BZTypes5550: this.$combo.BZTypes5550,
      JSFSTypes5550: this.$combo.JSFSTypes5550,
      tradeTypes5550: this.$combo.tradeTypes5550,
      ruleForm: {
        operationType: '',
        startDate: '', // 起始日期
        endDate: '', // 结束日期
        BranchCode: '', // 机构代码
        tellerNo: '', // 柜员号
        JSFSType: '', // 结算方式
        BZType: '', // 币种
        JYJE: '', // 交易金额
        accountCardNo: '', // 账/卡号
        HmName: '', // 户名
        JYCode: '', // 交易码
        JYMC: '', // 交易名称
        SKRZH: '', // 收款人账号
        SKRName: '', // 收款人户名
        PZLXType: '', // 凭证类型
        PZCode: '', // 凭证号码
        CZLXR1: '', // 查证联系人1
        CZLXRDH1: '', // 查证联系人电话1
        CZLXR2: '', // 查证联系人2
        CZLXRDH2: '', // 查证联系人电话2
        CZJG: '', // 查证结果
        SPY: '', // 审批员
        explain: '' // 说明
      },
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
        BranchCode: [
          { required: false, message: '请输入机构代码', trigger: 'blur' }
        ],
        tellerNo: [
          { required: false, message: '请输入柜员号', trigger: 'blur' }
        ],
        JSFSType: [
          { required: false, message: '请选择结算方式', trigger: 'blur' }
        ],
        BZType: [
          { required: false, message: '请选择币种', trigger: 'blur' }
        ],
        JYJE: [
          { required: false, message: '请输入交易金额', trigger: 'blur' }
        ],
        accountCardNo: [
          { required: false, message: '请输入账/卡号', trigger: 'blur' }
        ],
        HmName: [
          { required: false, message: '请输入户名', trigger: 'blur' }
        ],
        JYCode: [
          { required: false, message: '请输入交易码', trigger: 'change' }
        ],
        JYMC: [
          { required: false, message: '请输入交易名称', trigger: 'blur' }
        ],
        SKRZH: [
          { required: false, message: '请输入收款人账号', trigger: 'blur' }
        ],
        SKRName: [
          { required: false, message: '请输入收款人户名', trigger: 'blur' }
        ],
        PZLXType: [
          { required: false, message: '请选择凭证类型', trigger: 'blur' }
        ],
        PZCode: [
          { required: false, message: '请输入凭证号码', trigger: 'blur' }
        ],
        CZLXR1: [
          { required: false, message: '请输入查证联系人1', trigger: 'blur' }
        ],
        CZLXRDH1: [
          { required: false, message: '请输入查证联系人电话1', trigger: 'blur' }
        ],
        CZLXR2: [
          { required: false, message: '请输入查证联系人2', trigger: 'blur' }
        ],
        CZLXRDH2: [
          { required: false, message: '请输入查证联系人电话2', trigger: 'blur' }
        ],
        CZJG: [
          { required: false, message: '请输入查证结果', trigger: 'blur' }
        ],
        SPY: [
          { required: false, message: '请输入审批员', trigger: 'blur' }
        ],
        explain: [
          { required: false, message: '请输入说明', trigger: 'blur' }
        ]
      }
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
      if (this.ruleForm.operationType !== '0') { // 登记操作
        this.$message.error('功能开发中')
        return
        // const map = {
        //   'TRADEDATE': this.CurrentSystemDate,
        //   'TRADETIME': new DateTime().getTime(),
        //   'ZONENO': this.CurrentZoneNo,
        //   'BRANCHNO': this.CurrentBranchNo,
        //   'USERNO': this.CurrentUserNo,
        //   'FCRSERIALNO': '',
        //   'SERIALNO': '',
        //   'CURRENCYTYPE': this.ruleForm.BZType,
        //   'ACCNO': this.ruleForm.accountCardNo,
        //   'ACCNAME': this.ruleForm.HmName,
        //   'TRADECODE': this.ruleForm.JYCode,
        //   'TRADENAME': this.ruleForm.JYMC,
        //   'AMOUNT': this.ruleForm.JYJE,
        //   'PAYEEACC': this.ruleForm.SKRZH,
        //   'PAYEENAME': this.ruleForm.SKRName,
        //   'PAYTYPE': this.ruleForm.JSFSType,
        //   'INVENTORYTYPE': this.ruleForm.PZLXType,
        //   'INVENTORYCODE': this.ruleForm.PZCode,
        //   'FCHECKPERSON': this.ruleForm.CZLXR1,
        //   'FCHECKPHONE': this.ruleForm.CZLXRDH1,
        //   'SCHECKPERSON': this.ruleForm.CZLXR2,
        //   'SCHECKPHONE': this.ruleForm.CZLXRDH2,
        //   'CHECKRESULT': this.ruleForm.CZJG,
        //   'CHECKUSERNO': this.ruleForm.SPY,
        //   'NOTE1': this.ruleForm.explain,
        //   'NOTE2': ''
        // }
        // const params1 = { 'ruleForm': JSON.stringify(map) }
        // const url1 = this.$registerBookApi.insertXR_AUDIT_PAYVERIFICATION
        // this.$http(url1, params1).then( // 通讯后台修改数据库中信息
        //   res => {
        //     const _data = res.data
        //     // 赋值
        //     if (_data.code === 'SUCCESS') {
        //       if (_data.data.TrxCode === '000000') {
        //         console.log('---insertXR_AUDIT_PAYVERIFICATION---' + JSON.stringify(res.data))
        //         this.messageSuccess('登记成功!   流水号' + _data.data._MAINLSH_)
        //         return
        //       } else {
        //         if (_data.data.TrxCode === 'T5550_002') {
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
              if (this.ruleForm.branchCode === '') {
                this.BranchLevel = '1'
              }
            }
            const map = {
              'startdate': this.ruleForm.startDate,
              'enddate': this.ruleForm.endDate,
              'brno': this.ruleForm.BranchCode === '' ? this.CurrentBranchNo : this.ruleForm.BranchCode,
              'branchlevel': this.BranchLevel,
              'tellerno': this.ruleForm.tellerNo,
              'currencytype': this.ruleForm.BZType,
              'accno': this.ruleForm.accountCardNo,
              'accname': this.ruleForm.HmName,
              'tradecode': this.ruleForm.JYCode,
              'tradename': this.ruleForm.JYMC,
              'amount': this.ruleForm.JYJE,
              'payeeacc': this.ruleForm.SKRZH,
              'payeename': this.ruleForm.SKRName,
              'paytype': this.ruleForm.JSFSType,
              'inventorytype': this.ruleForm.PZLXType,
              'inventorycode': this.ruleForm.PZCode,
              'fcheckperson': this.ruleForm.CZLXR1,
              'fcheckphone': this.ruleForm.CZLXRDH1,
              'scheckperson': this.ruleForm.CZLXR2,
              'scheckphone': this.ruleForm.CZLXRDH2,
              'checkresult': this.ruleForm.CZJG,
              'checkuserno': this.ruleForm.SPY
            }
            const params1 = { 'ruleForm': JSON.stringify(map), 'pageNum': '1', 'pageSize': '10' }
            const url1 = this.$registerBookApi.getXR_AUDIT_PAYVERIFICATION
            this.$http(url1, params1).then( // 通讯后台修改数据库中信息
              res => {
                const _data = res.data
                // 赋值
                if (_data.code === 'SUCCESS') {
                  if (_data.data.TrxCode === '000000') {
                    console.log('---getXR_AUDIT_PAYVERIFICATION---' + JSON.stringify(res.data))
                    this.tableData = res.data
                    this.$router.push({
                      path: this.redirect || '/T555001',
                      name: 'T555001',
                      params: {
                        map: _data.data.PageInfo,
                        totalNum: _data.data.PageInfo.total
                      }
                    })
                  } else {
                    if (_data.data.TrxCode === 'T5550_001') {
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
