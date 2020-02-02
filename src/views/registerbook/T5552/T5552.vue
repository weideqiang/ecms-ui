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
                :disabled="disabledEndDate"
                v-model="ruleForm.endDate"
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
            <el-form-item label="机构代码：" style="width: 85%;" prop="BranchCode">
              <el-input :disabled="disabledBranchCode" v-model="ruleForm.BranchCode" placeholder="请输入机构代码" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="柜员号：" style="width: 85%;" prop="tellerNo">
              <el-input :disabled="disabledTellerNo" v-model="ruleForm.tellerNo" placeholder="请输入柜员号" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <hr>
        <br>
        <el-row>
          <el-col :span="8">
            <el-form-item label="入库时间：" style="width: 85%;" prop="RKSJ">
              <el-input ref="rKSJ" v-model="ruleForm.RKSJ" placeholder="请输入入库时间" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="姓名：" style="width: 85%;" prop="operaterName">
              <el-input v-model="ruleForm.operaterName" placeholder="请输入姓名" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="人数：" style="width: 85%;" prop="peopelNum">
              <el-input :disabled="disabledPeopelNum" v-model="ruleForm.peopelNum" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="事由：" prop="SY">
            <el-input v-model="ruleForm.SY" placeholder="请输入事由" clearable/>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="库管员1：" style="width: 85%;" prop="KGY1">
              <el-input v-model="ruleForm.KGY1" placeholder="请输入库管员1" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="库管员1密码：" style="width: 85%;" prop="KGY1MM">
              <el-input :disabled="true" v-model="ruleForm.KGY1MM" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="库管员2：" style="width: 85%;" prop="KGY2">
              <el-input v-model="ruleForm.KGY2" placeholder="请输入库库管员2" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="库管员2密码：" style="width: 85%;" prop="KGY2MM">
              <el-input :disabled="true" v-model="ruleForm.KGY2MM" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="批准人：" style="width: 85%;" prop="PZR">
              <el-input v-model="ruleForm.PZR" placeholder="请输入批准人" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="批准人密码：" style="width: 85%;" prop="PZRMM">
              <el-input :disabled="true" v-model="ruleForm.PZRMM" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="出库时间：" style="width: 85%;" prop="CKSJ">
              <el-input v-model="ruleForm.CKSJ" placeholder="请输入出库时间" clearable/>
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
  name: 'T5552',
  components: { DateTime },
  data() {
    const validOperationType = (rule, value, callback) => {
      this.ruleForm.startDate = ''
      this.ruleForm.endDate = ''
      this.ruleForm.BranchCode = ''
      this.ruleForm.tellerNo = ''
      this.ruleForm.RKSJ = ''
      this.ruleForm.operaterName = ''
      this.ruleForm.peopelNum = ''
      this.ruleForm.SY = ''
      this.ruleForm.KGY1 = ''
      this.ruleForm.KGY1MM = ''
      this.ruleForm.KGY2 = ''
      this.ruleForm.KGY2MM = ''
      this.ruleForm.PZR = ''
      this.ruleForm.PZRMM = ''
      this.ruleForm.CKSJ = ''
      this.ruleForm.explain = ''
      if (this.ruleForm.operationType === '0') { // 查询
        this.rules.startDate[0].required = true
        this.rules.endDate[0].required = true
        this.rules.BranchCode[0].required = false
        this.rules.tellerNo[0].required = false
        this.rules.RKSJ[0].required = false
        this.rules.operaterName[0].required = false
        this.rules.peopelNum[0].required = false
        this.rules.SY[0].required = false
        this.rules.KGY1[0].required = false
        this.rules.KGY1MM[0].required = false
        this.rules.KGY2[0].required = false
        this.rules.KGY2MM[0].required = false
        this.rules.PZR[0].required = false
        this.rules.PZRMM[0].required = false
        this.rules.CKSJ[0].required = false
        this.rules.explain[0].required = false
        this.disabledPeopelNum = true
        this.$refs['StartDate'].focus()
      } else { // 登记
        // this.rules.startDate[0].required = false
        // this.rules.endDate[0].required = false
        // this.rules.BranchCode[0].required = false
        // this.rules.tellerNo[0].required = false
        // this.ruleForm.endDate = ''
        // this.ruleForm.startDate = ''
        // this.disabledStartDate = true
        // this.disabledEndDate = true
        // this.disabledBranchCode = true
        // this.disabledTellerNo = true
        // this.rules.RKSJ[0].required = true
        // this.rules.operaterName[0].required = true
        // this.rules.peopelNum[0].required = true
        // this.rules.SY[0].required = true
        // this.rules.KGY1[0].required = true
        // this.rules.KGY1MM[0].required = false
        // this.rules.KGY2[0].required = true
        // this.rules.KGY2MM[0].required = false
        // this.rules.PZR[0].required = true
        // this.rules.PZRMM[0].required = false
        // this.rules.CKSJ[0].required = true
        // this.rules.explain[0].required = true
        // this.disabledPeopelNum = false
        // this.$refs['rKSJ'].focus()
        callback(new Error('功能开发中'))
      }
    }
    return {
      disabledStartDate: false, // 起始日期
      disabledEndDate: false, // 结束日期
      disabledBranchCode: false, // 机构代码
      disabledTellerNo: false, // 柜员号
      disabledPeopelNum: true, // 人数
      CurrentUserNo: '', // 初始化-当前柜员号
      CurrentUserName: '', // 初始化-当前柜员名称
      CurrentBranchNo: '', // 初始化-当前机构号
      CurrentBranchName: '', // 初始化-当前机构名称
      CurrentZoneNo: '', // 初始化-当前地区号
      CurrentSystemDate: '', // 初始化-当前系统日期
      CurrentSystemTime: '', // 当前系统时间
      tradeTypes5550: this.$combo.tradeTypes5550, // 操作类型
      ruleForm: {
        operationType: '', // 操作类型
        startDate: '', // 起始日期
        endDate: '', // 结束日期
        BranchCode: '', // 机构代码
        tellerNo: '', // 柜员号
        RKSJ: '', // 入库时间
        operaterName: '', // 姓名
        peopelNum: '', // 人数
        SY: '', // 事由
        KGY1: '', // 库管员1
        KGY1MM: '', // 库管员1密码
        KGY2: '', // 库管员2
        KGY2MM: '', // 库管员2密码
        PZR: '', // 批准人
        PZRMM: '', // 批准人密码
        CKSJ: '', // 出库时间
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
        RKSJ: [
          { required: false, message: '请输入入库时间', trigger: 'blur' },
          { min: 6, max: 6, message: '长度必须6个字符', trigger: 'blur' }
        ],
        operaterName: [
          { required: false, message: '请输入姓名', trigger: 'blur' }
        ],
        peopelNum: [
          { required: false, message: '请输入人数', trigger: 'blur' }
        ],
        SY: [
          { required: false, message: '请输入事由', trigger: 'blur' }
        ],
        KGY1: [
          { required: false, message: '请输入库管员1', trigger: 'blur' }
        ],
        KGY1MM: [
          { required: false, message: '请输入库管员1密码', trigger: 'change' }
        ],
        KGY2: [
          { required: false, message: '请输入库管员2', trigger: 'blur' }
        ],
        KGY2MM: [
          { required: false, message: '请输入库管员2密码', trigger: 'blur' }
        ],
        PZR: [
          { required: false, message: '请输入批准人', trigger: 'blur' }
        ],
        ZJType: [
          { required: false, message: '请选择证件类型', trigger: 'blur' }
        ],
        PZRMM: [
          { required: false, message: '请输入批准人密码', trigger: 'blur' }
        ],
        CKSJ: [
          { required: false, message: '请输入出库时间', trigger: 'blur' }
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
        //   'REGISTERDATE': this.CurrentSystemDate,
        //   'REGISTERTIME': new DateTime().getTime(),
        //   'STOCKINTIME': this.ruleForm.RKSJ,
        //   'STOCKOUTTIME': this.ruleForm.CKSJ,
        //   'NAMES': this.ruleForm.operaterName,
        //   'NUMBERS': this.ruleForm.peopelNum,
        //   'PARTICULAR': this.ruleForm.SY,
        //   'STOREKEEPER1': this.ruleForm.KGY1,
        //   'STOREKEEPER2': this.ruleForm.KGY2,
        //   'APPROVER': this.ruleForm.PZR,
        //   'BRNO': this.CurrentBranchNo,
        //   'BRNAME': this.CurrentBranchName,
        //   'TELLERNO': this.CurrentUserNo,
        //   'TELLERNAME': this.CurrentUserName,
        //   'BEIYONG1': this.ruleForm.explain,
        //   'BEIYONG2': '',
        //   'BEIYONG3': '',
        //   'BEIYONG4': '',
        //   'BEIYONG5': '',
        //   'WFLAG': '0'
        // }
        // const params1 = { 'ruleForm': JSON.stringify(map) }
        // const url1 = this.$registerBookApi.insertXR_PIS_ENTRYEXIT_REGISTER
        // this.$http(url1, params1).then( // 通讯后台修改数据库中信息
        //   res => {
        //     const _data = res.data
        //     // 赋值
        //     if (_data.code === 'SUCCESS') {
        //       if (_data.data.TrxCode === '000000') {
        //         console.log('---insertXR_PIS_ENTRYEXIT_REGISTER---' + JSON.stringify(res.data))
        //         this.messageSuccess('登记成功!   流水号' + _data.data._MAINLSH_)
        //         return
        //       } else {
        //         if (_data.data.TrxCode === 'T5552_002') {
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
              'tellerno': this.ruleForm.tellerNo,
              'stockintime': this.ruleForm.RKSJ,
              'stockouttime': this.ruleForm.CKSJ,
              'names': this.ruleForm.operaterName,
              'numbers': this.ruleForm.peopelNum,
              'particular': this.ruleForm.SY,
              'storekeeper1': this.ruleForm.KGY1,
              'storekeeper2': this.ruleForm.KGY2,
              'approver': this.ruleForm.PZR
            }
            const params1 = { 'ruleForm': JSON.stringify(map), 'pageNum': '1', 'pageSize': '10' }
            const url1 = this.$registerBookApi.getXR_PIS_ENTRYEXIT_REGISTER
            this.$http(url1, params1).then( // 通讯后台修改数据库中信息
              res => {
                const _data = res.data
                // 赋值
                if (_data.code === 'SUCCESS') {
                  if (_data.data.TrxCode === '000000') {
                    console.log('---getXR_PIS_ENTRYEXIT_REGISTER---' + JSON.stringify(res.data))
                    this.tableData = res.data
                    this.$router.push({
                      path: this.redirect || '/T555201',
                      name: 'T555201',
                      params: {
                        map: _data.data.PageInfo,
                        totalNum: _data.data.PageInfo.total
                      }
                    })
                  } else {
                    if (_data.data.TrxCode === 'T5552_001') {
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
