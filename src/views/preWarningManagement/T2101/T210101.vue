<template>
  <el-main>
    <el-row class="demo-form-div">
      <!--<el-dialog-->
      <!--:modal-append-to-body="false"-->
      <!--:title="userEquipment+'用户信息'"-->
      <!--:visible.sync="dialogFormVisible"-->
      <!--center-->
      <!--@close="closeDialog">-->
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        class="demo-form-inline"
        label-width="120px">
        <el-form-item label="流水号：" prop="serialoNo">
          <el-input :disabled="true" v-model="ruleForm.serialoNo" clearable/>
        </el-form-item>
        <el-form-item label="交易名称：" prop="TRADENAME">
          <el-input :disabled="true" v-model="ruleForm.TRADENAME" clearable/>
        </el-form-item>
        <el-form-item label="预警类型：" prop="warningType">
          <el-input :disabled="true" v-model="ruleForm.warningType" clearable/>
        </el-form-item>
        <el-form-item label="差错类型：" prop="errorType">
          <el-select v-model="ruleForm.errorType" placeholder="请选择" clearable>
            <el-option v-for="item in YJ_STATUS" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" style="width: 100%;" align="right">
        <el-row>
          <el-col :span="8">
            <el-button size="medium" type="primary" @click="exitTrade()">退 出</el-button>
          </el-col>
          <el-col :span="8">
            <el-button size="medium" type="primary" @click="submitForm('ruleForm')">提 交</el-button>
          </el-col>
        </el-row>
      </div>
      <!--</el-dialog>-->
    </el-row>
  </el-main>
</template>

<script>
export default {
  name: 'T10021',
  data() {
    return {
      userEquipment: '', // 弹框标题
      dialogFormVisible: false, // 默认隐藏弹框
      ruleForm: { // 弹框表单
        serialoNo: '',
        TRADENAME: '',
        warningType: '',
        errorType: ''
      },
      rules: { // 表单校验
        errorType: [
          { required: true, message: '请选择差错类型', trigger: 'change' }
        ]
      },
      YJ_STATUS: this.$combo.YJ_STATUS
    }
  },
  mounted: function() {
    console.log('params210101 : ' + JSON.stringify(this.$route.params.map))
    const params = this.$route.params.map
    if (params) {
      this.ruleForm.serialoNo = params.MAINSERIALNO
      this.ruleForm.TRADENAME = params.TRADENAME
      this.ruleForm.warningType = params.YJ_TYPE
      this.ruleForm.errorType = params.STATUS
    }
  },
  methods: {
    exitTrade() { // 交易退出返回首页
      this.$router.push({
        path: this.redirect || '/warning/T2101'
      })
    },
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const params = { 'mainSerialno': this.ruleForm.serialoNo, 'newStatus': this.ruleForm.errorType }
          this.$http(this.$warningMngApi.updStatus, params).then( // 通讯后台修改数据库中用户信息
            res => {
              console.log(res.data)
              if (res.data.TrxCode === '000000') {
                this.messageSuccess('更新成功!')
                this.$router.push({
                  path: this.redirect || '/warning/T2101'
                })
                // this.$router.push({ path: this.redirect || '/user/T1002' })
              } else {
                this.$message.error('错误信息 ： ' + res.data.TrxMessage)
              }
            })
        }
      })
    },
    closeDialog() {
      this.$router.push({ path: this.redirect || '/T2101' })
    }
  }
}
</script>

<style scoped>

</style>
<style>
  @import "../../../styles/public.css";
  .dialog-footer {
    text-align: center;
  }
  .demo-form-div {
    max-width: 800px;
    background-color: #fff;
    padding: 25px 1px;
  }
  .app-main[data-v-6beed8bc] {
    background-color: rgb(240, 242, 245);
  }
  .el-input--suffix .el-input__inner {
    padding-right: 30px;
    width: 80%;
  }
  .el-select>.el-input {
    width: 100%;
  }
  .el-input--suffix .el-input__inner {
    width: 100%;
  }
  .el-select {
    width: 100%;
  }
  .el-input el-input--suffix {
    width: 70%;
  }
  .el-form-item__content {
    width: 65%;
  }
  .el-form-item__label {
    padding: 0 5px 0 0;
  }
</style>
