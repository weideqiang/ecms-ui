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
        <el-form-item label="角色编号：" prop="roleNo_1">
          <el-input :disabled="disabledInputUserNo" v-model="ruleForm.roleNo_1" clearable/>
        </el-form-item>
        <el-form-item label="角色名称：" prop="roleName_1">
          <el-input v-model="ruleForm.roleName_1" clearable/>
        </el-form-item>
        <el-form-item label="角色状态：" prop="roleStatus_1">
          <el-select v-model="ruleForm.roleStatus_1" placeholder="请选择" clearable>
            <el-option v-for="item in roleStatuss" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item label="角色描述：" prop="roleDesc_1">
          <el-input v-model="ruleForm.roleDesc_1" clearable/>
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
        roleNo_1: '',
        roleName_1: '',
        roleStatus_1: '',
        roleDesc_1: ''
      },
      disabledInputUserNo: false, // 控制用户号是否禁用
      disabledSelectUserStatus: false, // 控制登录状态是否禁用
      rules: { // 表单校验
        roleNo_1: [
          { required: true, message: '请输入角色编号', trigger: 'blur' },
          { min: 0, max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur' }
        ],
        roleName_1: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 0, max: 400, message: '长度在  0 到 400 个字符', trigger: 'blur' }
        ],

        roleStatus_1: [
          { required: true, message: '请选择角色状态', trigger: 'change' }
        ],
        roleDesc_1: [
          { required: false, message: '请输入角色描述', trigger: 'blur' },
          { min: 0, max: 400, message: '长度在 0 到 400 个字符', trigger: 'blur' }
        ]
      },
      roleStatuss: this.$combo.statuss
    }
  },
  mounted: function() {
    console.log('params : ' + this.$route.params.map)
    const params = this.$route.params
    this.userEquipment = params.userEquipment
    if (params) {
      if (params.userEquipment === '新增') {
        // 禁用用户状态
        this.disabledInputUserNo = false
        // 用户状态默认为启用状态
        this.ruleForm.roleStatus_1 = '1'
        // 启用用户号
        this.disabledSelectUserStatus = true
        this.dialogFormVisible = true // 默认隐藏弹框
      }
      if (params.userEquipment === '修改') {
        // 禁用用户状态
        this.disabledInputUserNo = true
        // 启用用户号
        this.disabledSelectUserStatus = false
        // 界面赋值
        const map = this.$route.params.map
        const ruleForm = { 'roleNo_1': map.roleNo, 'roleName_1': map.roleName, 'roleStatus_1': map.roleStatus, 'roleDesc_1': map.roleDesc }
        this.ruleForm = ruleForm
        this.dialogFormVisible = true // 默认隐藏弹框
      }
    }
  },
  methods: {
    exitTrade() { // 交易退出返回首页
      this.$router.push({
        path: this.redirect || '/dashboard'
      })
    },
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const ruleForm = { 'roleNo': this.ruleForm.roleNo_1, 'roleName': this.ruleForm.roleName_1, 'roleStatus': this.ruleForm.roleStatus_1, 'roleDesc': this.ruleForm.roleDesc_1 }
          const params = { 'ruleForm': JSON.stringify(ruleForm) }
          let url = ''
          if (this.$route.params.userEquipment === '修改') {
            url = this.$userMngApi.updateRoleBaseInfo
          } else {
            url = this.$userMngApi.addRoleBaseInfo
          }
          this.$http(url, params).then( // 通讯后台修改数据库中用户信息
            res => {
              console.log(res.data)
              const _data = res.data
              // 赋值
              if (_data.code === 'SUCCESS') {
                if (_data.data.TrxCode === '000000') {
                  console.log('message => ' + _data.data)
                  this.messageSuccess(this.$route.params.userEquipment + '成功!')
                  return
                  // this.$router.push({ path: this.redirect || '/user/T1002' })
                } else {
                  this.$message.error('错误信息 ： ' + _data.data.TrxMessage)
                }
              } else {
                this.$message.error('错误信息 ： ' + _data.message)
              }
            })
        }
      })
    },
    closeDialog() {
      this.$router.push({ path: this.redirect || '/user/T1002' })
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
