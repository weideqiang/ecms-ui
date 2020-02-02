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
            <el-form-item label="柜员号：" style="width: 80%;" prop="tellerNo">
              <el-input :disabled="true" v-model="ruleForm.tellerNo" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="柜员姓名：" style="width: 80%;" prop="tellerNoName">
              <el-input :disabled="true" v-model="ruleForm.tellerNoName" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="操作类型：" prop="operationType">
          <el-select v-model="ruleForm.operationType" placeholder="请选择" clearable>
            <el-option v-for="item in operationTypes5527" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>
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
export default {
  name: 'T5527',
  data() {
    return {
      ruleForm: {
        operationType: '', // 操作类型
        tellerNoName: '', // 柜员姓名
        tellerNo: '' // 柜员号
      },
      rules: {
        operationType: [
          { required: true, message: '请选择操作类型', trigger: 'change' }
        ]
      },
      CurrentUserNo: '', // 初始化-当前柜员号
      CurrentUserName: '', // 初始化-当前柜员名称
      CurrentBranchNo: '', // 初始化-当前机构号
      CurrentBranchName: '', // 初始化-当前机构名称
      CurrentZoneNo: '', // 初始化-当前地区号
      CurrentSystemDate: '', // 初始化-当前系统日期
      CurrentSystemTime: '', // 当前系统时间
      operationTypes5527: this.$combo.tradeTypes5527
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
            this.ruleForm.tellerNo = this.CurrentUserNo
            this.ruleForm.tellerNoName = this.CurrentUserName
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
      if (this.ruleForm.operationType === '0') { // 签到
        this.$message.error('功能开发中')
        return
        // const map = { 'startDate': this.CurrentSystemDate, 'endDate': this.CurrentSystemDate, 'userNo': this.CurrentUserNo }
        // const params = { 'ruleForm': JSON.stringify(map) }
        // const url = this.$registerBookApi.getDataXR_USER_WORKNOTE
        // this.$http(url, params).then( // 通讯后台修改数据库中信息
        //   res => {
        //     const _data = res.data
        //     console.log('T5527--getDataXR_USER_WORKNOTE---' + JSON.stringify(res.data))
        //     // 赋值
        //     if (_data.code === 'SUCCESS') {
        //       if (_data.data.TrxCode === '000000') {
        //         // this.tableData = res.data
        //         this.messageWarning('当日已签到!')
        //         return
        //       } else {
        //         if (_data.data.TrxCode === 'T5527_001') {
        //           this.$router.push({
        //             path: this.redirect || '/T552701',
        //             name: 'T552701',
        //             params: {
        //               __CPFlag__: this.ruleForm.operationType
        //             }
        //           })
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
      } else if (this.ruleForm.operationType === '1') { // 签退
        this.$message.error('功能开发中')
        return
        // const map = { 'startDate': this.CurrentSystemDate, 'endDate': this.CurrentSystemDate, 'userNo': this.CurrentUserNo }
        // const params = { 'ruleForm': JSON.stringify(map) }
        // const url = this.$registerBookApi.getDataXR_USER_WORKNOTE
        // this.$http(url, params).then( // 通讯后台修改数据库中信息
        //   res => {
        //     const _data = res.data
        //     console.log('T5527--getDataXR_USER_WORKNOTE---' + JSON.stringify(res.data))
        //     // 赋值
        //     if (_data.code === 'SUCCESS') {
        //       if (_data.data.TrxCode === '000000') {
        //         this.$router.push({ // 已签到，可以签退
        //           path: this.redirect || '/T552701',
        //           name: 'T552701',
        //           params: {
        //             __CPFlag__: this.ruleForm.operationType
        //           }
        //         })
        //       } else {
        //         if (_data.data.TrxCode === 'T5527_001') {
        //           this.messageWarning('当日未签到,不允许签退')
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
