<template>
  <el-main>
    <el-row>
      <el-dialog
        :modal-append-to-body="false"
        :title="userEquipment+'班次信息'"
        :visible.sync="dialogFormVisible"
        @close="closeDialog">
        <el-form
          ref="ruleForm"
          :inline="true"
          :model="ruleForm"
          :rules="rules"
          auto-complete="on"
          class="demo-ruleForm"
          label-width="100px">
          <el-form-item label="班次名称：" prop="className_1">
            <el-input :disabled="disabledInputClassName" v-model="ruleForm.className_1"/>
          </el-form-item>
          <el-form-item label="时间段：" prop="time_1">
            <el-time-picker
              v-model="ruleForm.time_1"
              arrow-control
              disabled
              end-placeholder="结束时间"
              is-range
              start-placeholder="开始时间"
              value-format="HH:mm:ss"/>
          </el-form-item>
          <el-form-item label="班次状态：" prop="status_1">
            <el-select v-model="ruleForm.status_1" disabled placeholder="请选择">
              <el-option v-for="item in statuss" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
          <el-form-item label="颜色：" prop="color_1">
            <!--<el-input v-model="ruleForm.color"></el-input>-->
            <el-color-picker v-model="ruleForm.color_1" size="medium"/>
          </el-form-item>
          <el-form-item label="对公/对私：" prop="CGFlag_1">
            <el-select v-model="ruleForm.CGFlag_1" disabled placeholder="请选择">
              <el-option v-for="item in CGFlags" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="medium" type="primary" @click="submitForm('ruleForm')">提 交</el-button>
        </div>
      </el-dialog>
    </el-row>
  </el-main>
</template>

<script>
export default {
  name: 'T20051',
  data() {
    return {
      userEquipment: '', // 弹框标题
      dialogFormVisible: false, // 默认隐藏弹框
      disabledInputClassName: false,
      ruleForm: { // 弹框表单
        className_1: '',
        time_1: '',
        status_1: '',
        color_1: '',
        CGFlag_1: ''
      },
      rules: { // 表单校验
        className_1: [
          { required: true, message: '请输入班次名称', trigger: 'blur' },
          { min: 0, max: 400, message: '长度在  0 到 400 个字符', trigger: 'blur' }
        ],

        status_1: [
          { required: true, message: '请选择班次状态', trigger: 'change' }
        ],
        time_1: [
          { required: true, message: '请输入时间段', trigger: 'blur' }
        ],
        color_1: [
          { required: true, message: '请选择颜色', trigger: 'change' }
        ],
        CGFlag_1: [
          { required: true, message: '请选择对公对私班次', trigger: 'change' }
        ]
      },
      statuss: this.$combo.statuss, // 用户类别状态下拉列表
      CGFlags: this.$combo.CGFlags // 用户类别状态下拉列表
    }
  },
  mounted: function() {
    console.log('params : ' + this.$route.params.map)
    const params = this.$route.params
    if (params) {
      if (params.userEquipment === '新增') {
        this.dialogFormVisible = true // 默认隐藏弹框
        // 禁用用户状态
        this.disabledInputClassName = false
      }
      if (params.userEquipment === '修改') {
        // 禁用用户状态
        this.disabledInputClassName = true
        const map = this.$route.params.map
        const classInfo = {
          'className_1': map.className,
          'time_1': map.time,
          'status_1': map.status,
          'color_1': map.color,
          'CGFlag_1': map.CGFlag
        }
        this.ruleForm = classInfo
        this.dialogFormVisible = true // 默认隐藏弹框
      }
      this.userEquipment = params.userEquipment
    }
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          console.log('JSON.stringify(this.ruleForm) => ' + JSON.stringify(this.ruleForm))
          const ruleForm = this.ruleForm
          const classInfo = {
            'className': ruleForm.className_1,
            'time': ruleForm.time_1,
            'status': ruleForm.status_1,
            'color': ruleForm.color_1,
            'CGFlag': ruleForm.CGFlag_1
          }
          const params = { 'classInfo': JSON.stringify(classInfo) }
          let url = ''
          if (this.$route.params.userEquipment === '修改') {
            url = this.$workForceMngApi.updateClassInfo
          } else {
            url = this.$workForceMngApi.addClassInfo
          }
          this.$http(url, params).then( // 通讯后台修改数据库中用户信息
            res => {
              console.log('res => ' + res)
              const _data = res.data
              // 赋值
              if (_data.code === 'SUCCESS') {
                if (_data.data.TrxCode === '000000') {
                  console.log('message => ' + _data.data)
                  this.$message({
                    type: 'success',
                    message: '修改成功'
                  })
                  // this.tableData = res.data;
                  this.$router.push('/T2005')
                  // this.$emit('close', 'I am child.vue')
                } else {
                  this.$message.error(_data.data.TrxMessage)
                }
              } else {
                this.$message.error('错误信息 ：' + _data.message)
              }
            })
        }
      })
    },
    closeDialog() {
      // this.$refs['ruleForm'].resetFields()
      this.$router.push('/T2005')
    }
  }
}
</script>

<style scoped>

</style>
<style>
  @import "../../../styles/public.css";

  .el-dialog__body {
    text-align: left;
  }

  .el-icon-arrow-down:before {
    content: '';
  }

  .el-color-picker--medium .el-color-picker__trigger {
    height: 35px;
    width: 204.39px;
    border: 1px solid rgba(80, 179, 249, 0.6);
    color: #8adaff;
  }

  .el-date-editor .el-range-input {
    background: transparent;
  }

  .el-color-picker__color {
    border: none;
  }

  .el-date-editor .el-range-input {
    color: #46dbe6;
  }

  .el-range-editor.is-disabled input {
    background-color: transparent;
  }
</style>
