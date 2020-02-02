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
            <el-form-item label="起始日期：" prop="startDate">
              <el-date-picker
                id="startDate"
                ref="StartDate"
                v-model="ruleForm.startDate"
                type="date"
                placeholder="选择日期"
                editable
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyyMMdd"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="截止日期：" prop="endDate">
              <el-date-picker
                id="endDate"
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
            <el-form-item label="查询类型：" prop="operationType">
              <el-select v-model="ruleForm.operationType" style="width: 80%;" placeholder="请选择" clearable>
                <el-option v-for="item in operationTypes5555" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="机构代码：" style="width: 85%;" prop="BranchCode">
              <el-input :disabled="disabledBranchCode" v-model="ruleForm.BranchCode" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="币种：" prop="BZType">
              <el-select ref="BZType" :disabled="disabledBZType" v-model="ruleForm.BZType" style="width: 80%;" placeholder="请选择" clearable>
                <el-option v-for="item in BZTypes5555" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="类型：" prop="LXType">
              <el-select :disabled="disabledLXType" v-model="ruleForm.LXType" style="width: 80%;" placeholder="请选择" clearable>
                <el-option v-for="item in LXTypes5555" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="科目：" style="width: 85%;" prop="KM">
              <el-input :disabled="disabledKM" v-model="ruleForm.KM" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
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
      </el-form>
    </div>
  </el-main>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'T5555',
  data() {
    const validoperationType = (rule, value, callback) => {
      if (this.ruleForm.operationType === '1') { // 1-开客户
        this.disabledBZType = true
        this.disabledLXType = true
        this.disabledKM = true
      } else { // 2-开销户
        this.disabledBZType = false
        this.disabledLXType = false
        this.disabledKM = false
        this.$refs['BZType'].focus()
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
      disabledBZType: false,
      disabledLXType: false,
      disabledKM: false,
      disabledBranchCode: false,
      operationTypes5555: this.$combo.operationTypes5555, // 查询类型
      LXTypes5555: this.$combo.LXTypes5555, // 类型
      BZTypes5555: this.$combo.BZTypes5550, // 币种
      ruleForm: {
        startDate: '', // 起始日期
        endDate: '', // 截至日期
        operationType: '', // 查询类型
        BranchCode: '', // 机构代码
        BZType: '', // 币种
        LXType: '', // 类型
        KM: '' // 科目

      },
      rules: {
        operationType: [
          { required: true, message: '请选择查询类型', trigger: 'change' },
          { trigger: 'change', validator: validoperationType }
        ],
        LXType: [
          { required: false, message: '请选择类型', trigger: 'change' }
        ],
        startDate: [
          { required: true, message: '请选择起始日期', trigger: 'blur' }
        ],
        endDate: [
          { required: true, message: '请选择截止日期', trigger: 'blur' }
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
            this.ruleForm.endDate = this.CurrentSystemDate
            this.ruleForm.BranchCode = this.CurrentBranchNo + '-' + this.CurrentBranchName
          })
      this.rules.startDate[0].required = true
      this.rules.endDate[0].required = true
      this.disabledBZType = true
      this.disabledLXType = true
      this.disabledKM = true
      this.disabledBranchCode = true
      this.$refs['StartDate'].focus()
    }
  },
  methods: {
    exitTrade() { // 交易退出返回首页
      this.$router.push({
        path: this.redirect || '/dashboard'
      })
    },
    submitForm() { // 提交
      if (this.ruleForm.operationType === '1') { // 查询类型 1-开客户
        const map = {
          'CheckcustId': '',
          'startDate': this.ruleForm.startDate,
          'endDate': this.ruleForm.endDate,
          'brno': this.CurrentBranchNo
        }
        const params1 = { 'ruleForm': JSON.stringify(map), 'pageNum': '1', 'pageSize': '10' }
        const url1 = this.$registerBookApi.getRESIDEPERMIT01
        this.$http(url1, params1).then( // 通讯后台修改数据库中信息
          res => {
            const _data = res.data
            // 赋值
            if (_data.code === 'SUCCESS') {
              if (_data.data.TrxCode === '000000') {
                console.log('---getRESIDEPERMIT01---' + JSON.stringify(res.data))
                this.tableData = res.data
                this.$router.push({
                  path: this.redirect || '/T555501',
                  name: 'T555501',
                  params: {
                    map: _data.data.PageInfo,
                    totalNum: _data.data.PageInfo.total
                  }
                })
              } else {
                if (_data.data.TrxCode === 'T5555_001') {
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
      } else { // 查询类型 2-开销户
        const map = {
          'startdate': this.ruleForm.startDate,
          'enddate': this.ruleForm.endDate,
          'brno': this.CurrentBranchNo,
          'BZ': this.ruleForm.BZType,
          'CUSTTYPE': '',
          'ACCTYPE': this.ruleForm.KM,
          'STATUS': this.ruleForm.LXType
        }
        const params1 = { 'ruleForm': JSON.stringify(map) }
        const url1 = this.$registerBookApi.getXR_PIS_HMTACCOUNT_REGISTER
        this.$http(url1, params1).then( // 通讯后台修改数据库中信息
          res => {
            const _data = res.data
            // 赋值
            if (_data.code === 'SUCCESS') {
              if (_data.data.TrxCode === '000000') {
                console.log('---getXR_PIS_HMTACCOUNT_REGISTER---' + JSON.stringify(res.data))
                this.tableData = res.data
                this.$router.push({
                  path: this.redirect || '/T555502',
                  name: 'T555502',
                  params: {
                    map: _data.data.PageInfo,
                    totalNum: _data.data.PageInfo.total
                  }
                })
              } else {
                if (_data.data.TrxCode === 'T5555_001') {
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
