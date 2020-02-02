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
            <el-form-item label="扎帐类型：" prop="ZZType">
              <el-select v-model="ruleForm.ZZType" style="width: 80%;" placeholder="请选择" clearable>
                <el-option v-for="item in ZZTypes5554" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="操作类型：" prop="operationType">
              <el-select ref="OperationType" :disabled="disabledoperationType" v-model="ruleForm.operationType" style="width: 80%;" placeholder="请选择" clearable>
                <el-option v-for="item in operationTypes5554" :key="item.value" :label="item.label" :value="item.value"/>
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
                :disabled="disabledstartDate"
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
                :disabled="disabledendDate"
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
              <el-input v-model="ruleForm.BranchCode" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="柜员号：" style="width: 85%;" prop="tellerNo">
              <el-input :disabled="disabledtellerNo" v-model="ruleForm.tellerNo" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="钱箱编号：" style="width: 85%;" prop="QXCode">
              <el-input :disabled="disabledQXCode" v-model="ruleForm.QXCode" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="复核柜员代码：" style="width: 85%;" prop="FHGYCode">
              <el-input :disabled="disabledFHGYCode" v-model="ruleForm.FHGYCode" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="现金包数：" style="width: 85%;" prop="XJBS">
              <el-input :disabled="disabledXJBS" v-model="ruleForm.XJBS" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="交接人：" style="width: 85%;" prop="xjJJRCode">
              <el-input :disabled="disabledxjJJRCode" v-model="ruleForm.xjJJRCode" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="交接人密码：" style="width: 85%;" prop="xjJJRMM">
              <el-input :disabled="true" v-model="ruleForm.xjJJRMM" type="password" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="凭证包数：" style="width: 85%;" prop="PZBS">
              <el-input :disabled="disabledPZBS" v-model="ruleForm.PZBS" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="交接人：" style="width: 85%;" prop="pzJJRCode">
              <el-input :disabled="disabledpzJJRCode" v-model="ruleForm.pzJJRCode" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="交接人密码：" style="width: 85%;" prop="pzJJRMM">
              <el-input :disabled="true" v-model="ruleForm.pzJJRMM" type="password" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="印章包数：" style="width: 85%;" prop="YZBS">
              <el-input :disabled="disabledYZBS" v-model="ruleForm.YZBS" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="交接人：" style="width: 85%;" prop="yzJJRCode">
              <el-input :disabled="disabledyzJJRCode" v-model="ruleForm.yzJJRCode" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="交接人密码：" style="width: 85%;" prop="yzJJRMM">
              <el-input :disabled="true" v-model="ruleForm.yzJJRMM" type="password" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="备注：" prop="BZ">
            <el-input
              :disabled="disabledBZ"
              v-model="ruleForm.BZ"
              class="info-queryUnit"
              type="textarea"
              placeholder="备注"
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
  name: 'T5554',
  components: { DateTime },
  data() {
    const validZZType = (rule, value, callback) => {
      this.ruleForm.BranchCode = ''
      this.ruleForm.tellerNo = ''
      this.ruleForm.QXCode = ''
      this.ruleForm.XJBS = ''
      this.ruleForm.JJRCode = ''
      this.ruleForm.JJRMM = ''
      this.ruleForm.PZBS = ''
      this.ruleForm.xzJJRCode = ''
      this.ruleForm.pzJJRCode = ''
      this.ruleForm.yzJJRCode = ''
      this.ruleForm.BZ = ''
      this.ruleForm.YZBS = ''
      if (this.ruleForm.ZZType === '0') { // 0-柜员轧帐
        this.ruleForm.operationType = '0'
        this.rules.operationType[0].required = true
        this.$refs['OperationType'].focus()
        this.disabledoperationType = false
        this.rules.BranchCode[0].required = false
        this.disabledoperationType = false
        this.disabledtellerNo = false
        this.disabledFHGYCode = false
        this.disabledQXCode = false
        this.disabledXJBS = false
        this.disabledYZBS = false
        this.disabledPZBS = false
        this.disabledxjJJRCode = false
        this.disabledpzJJRCode = false
        this.disabledyzJJRCode = false
        this.ruleForm.startDate = this.CurrentSystemDate
        this.ruleForm.endDate = this.CurrentSystemDate
      } else { // 1-网点轧帐
        this.ruleForm.operationType = '0'
        this.disabledoperationType = true
        this.rules.BranchCode[0].required = true
        this.rules.startDate[0].required = false
        this.rules.endDate[0].required = false
        this.rules.tellerNo[0].required = false
        this.rules.XJBS[0].required = false
        this.rules.YZBS[0].required = false
        this.rules.PZBS[0].required = false
        this.disabledoperationType = true
        this.disabledtellerNo = true
        this.disabledFHGYCode = true
        this.disabledQXCode = true
        this.disabledXJBS = true
        this.disabledYZBS = true
        this.disabledPZBS = true
        this.disabledxjJJRCode = true
        this.disabledpzJJRCode = true
        this.disabledyzJJRCode = true
        this.ruleForm.startDate = this.CurrentSystemDate
        this.ruleForm.endDate = this.CurrentSystemDate
        this.$refs['StartDate'].focus()
      }
    }
    const validoperationType = (rule, value, callback) => {
      this.ruleForm.BranchCode = ''
      this.ruleForm.tellerNo = ''
      this.ruleForm.QXCode = ''
      this.ruleForm.XJBS = ''
      this.ruleForm.JJRCode = ''
      this.ruleForm.JJRMM = ''
      this.ruleForm.PZBS = ''
      this.ruleForm.YZBS = ''
      this.ruleForm.xzJJRCode = ''
      this.ruleForm.pzJJRCode = ''
      this.ruleForm.yzJJRCode = ''
      this.ruleForm.BZ = ''
      if (this.ruleForm.operationType === '0') { // 0-查询
        this.rules.startDate[0].required = true
        this.rules.endDate[0].required = true
        this.rules.BranchCode[0].required = true
        this.disabledxjJJRCode = true
        this.disabledpzJJRCode = true
        this.disabledyzJJRCode = true
      } else { // 1-登记
        // this.disabledstartDate = true
        // this.disabledendDate = true
        // this.rules.startDate[0].required = false
        // this.rules.endDate[0].required = false
        // this.rules.BranchCode[0].required = true
        // this.rules.tellerNo[0].required = true
        // this.rules.XJBS[0].required = true
        // this.rules.YZBS[0].required = true
        // this.rules.PZBS[0].required = true
        // this.disabledxjJJRCode = true
        // this.disabledpzJJRCode = true
        // this.disabledyzJJRCode = true
        // this.disabledXJBS = false
        // this.disabledYZBS = false
        // this.disabledPZBS = false
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
      disabledstartDate: false,
      disabledendDate: false,
      disabledoperationType: false,
      disabledtellerNo: false,
      disabledQXCode: false,
      disabledFHGYCode: false,
      disabledXJBS: false,
      disabledxjJJRCode: false,
      disabledPZBS: false,
      disabledpzJJRCode: false,
      disabledYZBS: false,
      disabledyzJJRCode: false,
      disabledBZ: false,
      operationTypes5554: this.$combo.tradeTypes5550, // 操作类型
      ZZTypes5554: this.$combo.ZZTypes5554, // 操作类型
      ruleForm: {
        ZZType: '', // 轧帐类型
        operationType: '', // 操作类型
        startDate: '', // 起始日期
        endDate: '', // 结束日期
        BranchCode: '', // 机构代码
        tellerNo: '', // 柜员号
        QXCode: '', // 钱箱编号
        FHGYCode: '', // 复核员代码
        XJBS: '', // 现金包数
        xjJJRCode: '', // 现金交接人
        xjJJRMM: '', // 现金交接人密码
        PZBS: '', // 凭证包数
        pzJJRCode: '', // 凭证交接人
        pzJJRMM: '', // 凭证交接人密码
        YZBS: '', // 印章包数
        yzJJRCode: '', // 印章交接人
        yzJJRMM: '', // 印章交接人密码
        BZ: '' // 备注
      },
      rules: {
        operationType: [
          { required: true, message: '请选择操作类型', trigger: 'change' },
          { trigger: 'change', validator: validoperationType }
        ],
        ZZType: [
          { required: true, message: '请选择轧帐类型', trigger: 'change' },
          { trigger: 'change', validator: validZZType }
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
        XJBS: [
          { required: false, message: '请输入现金包数', trigger: 'blur' }
        ],
        PZBS: [
          { required: false, message: '请输入凭证包数', trigger: 'blur' }
        ],
        YZBS: [
          { required: false, message: '请输入印章包数', trigger: 'blur' }
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
        //   'OVERDATE': this.ruleForm.startDate,
        //   'OVERTIME': new DateTime().getTime(),
        //   'HANDDATE': this.CurrentSystemDate,
        //   'HANDTIME': new DateTime().getTime(),
        //   'BRNO': this.ruleForm.BranchCode,
        //   'BRNAME': this.ruleForm.BranchCode,
        //   'TELLERNO': this.ruleForm.tellerNo,
        //   'TELLERNAME': this.ruleForm.tellerNo,
        //   'USERNO': this.CurrentUserNo,
        //   'CASHBOXNO': this.ruleForm.QXCode,
        //   'CASHNUM': this.ruleForm.XJBS,
        //   'STAMPNUM': this.ruleForm.YZBS,
        //   'VOUCHERNUM': this.ruleForm.PZBS,
        //   'AUTHTELLER': this.ruleForm.FHGYCode,
        //   'CASHPEOPLE': '',
        //   'STAMPPEOPLE': '',
        //   'VOUCHERPEOPLE': '',
        //   'STATE': '0',
        //   'NOTE1': this.ruleForm.BZ,
        //   'NOTE2': '0',
        //   'NOTE3': '',
        //   'NOTE4': ''
        // }
        // const params1 = { 'ruleForm': JSON.stringify(map) }
        // const url1 = this.$registerBookApi.insertXR_PIS_DAYOVER_REGISTER
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
              'overdate': this.ruleForm.startDate,
              'enddate': this.ruleForm.endDate,
              'brno': this.ruleForm.BranchCode === '' ? this.CurrentBranchNo : this.ruleForm.BranchCode,
              'branchlevel': this.BranchLevel,
              'tellerno': this.ruleForm.tellerNo,
              'cashboxno': this.ruleForm.QXCode,
              'authteller': this.ruleForm.FHGYCode,
              'state': this.ruleForm.ZZType
            }
            const params1 = { 'ruleForm': JSON.stringify(map), 'pageNum': '1', 'pageSize': '10' }
            const url1 = this.$registerBookApi.getXR_PIS_DAYOVER_REGISTER
            this.$http(url1, params1).then( // 通讯后台修改数据库中信息
              res => {
                const _data = res.data
                // 赋值
                if (_data.code === 'SUCCESS') {
                  if (_data.data.TrxCode === '000000') {
                    console.log('---getXR_PIS_DAYOVER_REGISTER---' + JSON.stringify(res.data))
                    this.tableData = res.data
                    this.$router.push({
                      path: this.redirect || '/T555401',
                      name: 'T555401',
                      params: {
                        map: _data.data.PageInfo,
                        totalNum: _data.data.PageInfo.total
                      }
                    })
                  } else {
                    if (_data.data.TrxCode === 'T5554_001') {
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
