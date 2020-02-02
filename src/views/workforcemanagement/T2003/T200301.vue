<template>
  <el-dialog :modal-append-to-body="false" :title="userEquipment+'用户信息'" :visible.sync="dialogFormVisible" center @close="closeDialog">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" :inline="true" class="demo-ruleForm" label-width="100px">
      <el-form-item label="机构号：" prop="brno">
        <el-input v-model="ruleForm.brno" maxlength="6"/>
      </el-form-item>
      <el-form-item label="机构名称：" prop="brnoname">
        <el-input v-model="ruleForm.brnoname"/>
      </el-form-item>
      <el-form-item label="柜员类别：" prop="jobtype">
        <el-select v-model="ruleForm.jobtype" placeholder="请选择">
          <el-option label="对公" value="C"/>
          <el-option label="对私" value="G"/>
        </el-select>
      </el-form-item>
      <el-form-item label="柜员号：" prop="userno">
        <el-input :disabled="disabledSelecttellerNoStatus" v-model="ruleForm.userno" maxlength="6" />
      </el-form-item>
      <el-form-item label="柜员名称：" prop="username" >
        <el-input v-model="ruleForm.username" :disabled="disabledSelecttellerNameStatus"/>
      </el-form-item>
      <el-form-item label="性别:" prop="sex">
        <el-select v-model="ruleForm.sex" style="width: 80%;" placeholder="请选择" clearable>
          <el-option v-for="item in sexs" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm('ruleForm')">提 交</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'T200301',
  data() {
    return {
      userEquipment: '', // 弹框标题
      dialogFormVisible: false, // 默认隐藏弹框
      ruleForm: { // 弹框表单
        brno: '',
        userno: '',
        jobtype: '',
        username: '',
        brnoname: '',
        sex: ''
      },
      disabledSelecttellerNoStatus: false, // 控制用户号是否禁用
      disabledSelecttellerNameStatus: false, // 控制用户名是否禁用
      rules: { // 表单校验
        userno: [
          { required: true, message: '请输入柜员号', trigger: 'blur' },
          { min: 0, max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入柜员名称', trigger: 'blur' },
          { min: 0, max: 200, message: '长度在 0 到 200 个字符', trigger: 'blur' }
        ],
        brno: [
          { required: true, message: '请输入机构号', trigger: 'blur' },
          { min: 0, max: 200, message: '长度在 0 到 8 个字符', trigger: 'blur' }
        ],
        jobtype: [
          { required: true, message: '请选择岗位类型', trigger: 'blur' }

        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'chang' }

        ]
      },
      sexs: [{ // 性别
        value: '0',
        label: '男'
      }, {
        value: '1',
        label: '女'
      }]
    }
  },
  mounted: function() {
    console.log('params : ' + this.$route.params)
    const params = this.$route.params
    if (params) {
      if (params.userEquipment === '新增') {
        this.dialogFormVisible = true // 显示弹框
        this.ruleForm = {}
      }
      if (params.userEquipment === '修改') {
        // 记录数据
        this.dialogFormVisible = true // 显示弹框
        // 编辑弹框标题
        this.editEquipment = 'editEquipent'
        // 编辑弹框标题
        this.editEquipment = 'editEquipent'
        this.disabledSelecttellerNoStatus = true
        this.disabledSelecttellerNameStatus = true
        // 展示表单数据
        this.ruleForm = this.$route.params.map
      }
    }
  },
  methods: {
    submitForm() { // 提交
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const userEquipment = this.$route.params.userEquipment
          const params = { 'ruleForm': JSON.stringify(this.ruleForm) }
          let url = ''
          if (userEquipment === '修改') {
            url = this.$workForceMngApi.updateTellerInfo
          } else {
            url = this.$workForceMngApi.addTellerNoInfo
          }
          this.$http(url, params).then( // 通讯后台修改数据库中用户信息
            res => {
              const _data = res.data.data
              // 赋值
              if (_data.code === 'SUCCESS') {
                if (_data.data.TrxCode === '000000') {
                  this.$message({
                    showClose: true,
                    message: '增加成功',
                    type: 'success'
                  })
                  // this.tableData = res.data;
                  this.$router.push('/work/T2003')
                  this.dialogFormVisible = false // 显示弹框
                } else {
                  this.$message({
                    showClose: true,
                    message: '错误信息 ： ' + _data.data.TrxMessage,
                    type: 'warning'
                  })
                }
              } else {
                this.$message({
                  showClose: true,
                  message: '错误信息 ： ' + _data.message,
                  type: 'warning'
                })
              }
            })
        } else {
          this.$message({
            showClose: true,
            message: this.userEquipment + '失败',
            type: 'warning'
          })
          return false
        }
      })
    },
    closeDialog() {
      this.$router.push('/work/T2003')
    }
  }
}
</script>

<style scoped>

</style>
