<template>
  <el-main>
    <div class="demo-form-div">
      <template v-if="true">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          class="demo-form-inline"
          label-width="100px">
          <el-form-item label="机构号：" prop="branchNo_1">
            <el-input :disabled="disabledInputBranchNo" v-model="ruleForm.branchNo_1" clearable/>
          </el-form-item>
          <el-form-item label="用户号：" prop="userNo_1">
            <el-input :disabled="disabledInputUserNo" v-model="ruleForm.userNo_1" clearable/>
          </el-form-item>
          <el-form-item label="用户名称：" prop="userName_1">
            <el-input v-model="ruleForm.userName_1" clearable/>
          </el-form-item>
          <el-form-item label="证件类型：" prop="identType_1">
            <el-select v-model="ruleForm.identType_1" placeholder="请选择" clearable>
              <el-option v-for="item in identTypes" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码：" prop="identNo_1">
            <el-input v-model="ruleForm.identNo_1" clearable/>
          </el-form-item>
          <el-form-item label="性别：" prop="gender_1">
            <el-select v-model="ruleForm.gender_1" placeholder="请选择" clearable>
              <el-option v-for="item in genders" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
          <el-form-item label="登录方式：" prop="loginType_1">
            <el-select v-model="ruleForm.loginType_1" placeholder="请选择" clearable>
              <el-option v-for="item in loginTypes" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
          <el-form-item label="联系电话：" prop="tel_1">
            <el-input v-model="ruleForm.tel_1" clearable/>
          </el-form-item>
          <el-form-item label="电子邮箱：" prop="email_1">
            <el-input v-model="ruleForm.email_1" clearable/>
          </el-form-item>

          <el-form-item label="用户状态：" prop="userStatus_1">
            <el-select :disabled="disabledSelectUserStatus" v-model="ruleForm.userStatus_1" placeholder="请选择" clearable>
              <el-option v-for="item in statuss" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="dialog-footer">
          <el-button size="medium" type="primary" @click="submitForm('ruleForm')">提 交</el-button>
        </div>
      </template>
      <template v-else>
        <el-dialog
          :modal-append-to-body="false"
          :title="userEquipment+'用户信息'"
          :visible.sync="dialogFormVisible"
          center
          @close="closeDialog">
          <el-form
            ref="ruleForm"
            :inline="true"
            :model="ruleForm"
            :rules="rules"
            class="demo-form-inline"
            label-width="100px">
            <el-form-item label="用户号：" prop="userNo_1">
              <el-input :disabled="disabledInputUserNo" v-model="ruleForm.userNo_1" clearable/>
            </el-form-item>
            <el-form-item label="用户名称：" prop="userName_1">
              <el-input v-model="ruleForm.userName_1" clearable/>
            </el-form-item>
            <el-form-item label="证件类型：" prop="identType_1">
              <el-select v-model="ruleForm.identType_1" placeholder="请选择" clearable>
                <el-option v-for="item in identTypes" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
            <el-form-item label="证件号码：" prop="identNo_1">
              <el-input v-model="ruleForm.identNo_1" clearable/>
            </el-form-item>
            <el-form-item label="性别：" prop="gender_1">
              <el-select v-model="ruleForm.gender_1" placeholder="请选择" clearable>
                <el-option v-for="item in genders" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
            <el-form-item label="登录方式：" prop="loginType_1">
              <el-select v-model="ruleForm.loginType_1" placeholder="请选择" clearable>
                <el-option v-for="item in loginTypes" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
            <el-form-item label="联系电话：" prop="tel_1">
              <el-input v-model="ruleForm.tel_1" clearable/>
            </el-form-item>
            <el-form-item label="电子邮箱：" prop="email_1">
              <el-input v-model="ruleForm.email_1" clearable/>
            </el-form-item>

            <el-form-item label="用户状态：" prop="userStatus_1">
              <el-select :disabled="disabledSelectUserStatus" v-model="ruleForm.userStatus_1" placeholder="请选择" clearable>
                <el-option v-for="item in statuss" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button size="medium" type="primary" @click="submitForm('ruleForm')">提 交</el-button>
          </div>
        </el-dialog>
      </template>
    </div>
  </el-main>
</template>

<script>
export default {
  name: 'T10011',
  data() {
    return {
      userEquipment: '', // 弹框标题
      dialogFormVisible: false, // 默认隐藏弹框
      ruleForm: { // 弹框表单
        branchNo_1: '',
        userNo_1: '',
        userName_1: '',
        gender_1: '',
        identType_1: '',
        identNo_1: '',
        tel_1: '',
        email_1: '',
        roleNo_1: '',
        userStatus_1: '',
        loginType_1: ''
      },
      disabledInputBranchNo: false, // 控制用户号是否禁用
      disabledInputUserNo: false, // 控制用户号是否禁用
      disabledSelectUserStatus: false, // 控制登录状态是否禁用
      rules: { // 表单校验
        branchNo_1: [
          { required: true, message: '请输入机构号', trigger: 'blur' },
          { min: 0, max: 6, message: '长度在 0 到 6 个字符', trigger: 'blur' }
        ],
        userNo_1: [
          { required: true, message: '请输入用户号', trigger: 'blur' },
          { min: 0, max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur' }
        ],
        userName_1: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 0, max: 200, message: '长度在 0 到 200 个字符', trigger: 'blur' }
        ],
        identType_1: [
          { required: true, message: '请选择证件类型', trigger: 'change' }
        ],
        identNo_1: [
          { required: true, message: '请输入证件号码', trigger: 'blur' },
          { min: 0, max: 35, message: '长度在 0 到 35 个字符', trigger: 'blur' }
        ],
        roleNo_1: [
          { required: true, message: '请选择用户类别', trigger: 'change' }
        ],
        userStatus_1: [
          { required: true, message: '请选择用户状态', trigger: 'change' }
        ],
        loginType_1: [
          { required: true, message: '请选择登录方式', trigger: 'change' }
        ],
        tel_1: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          { min: 0, max: 11, message: '长度在 0 到 11 个字符', trigger: 'blur' }
        ],
        email_1: [
          { required: true, message: '请输入电子邮箱', trigger: 'blur' },
          { min: 0, max: 200, message: '长度在 0 到 200 个字符', trigger: 'blur' }
        ]
      },
      identTypes: this.$combo.identType,
      genders: this.$combo.gender,
      loginTypes: this.$combo.loginTypes,
      statuss: this.$combo.userStatus
    }
  },
  computed: {
    userTypes() { // 初始化下拉框动态数据
      const obj = []
      this.roleSlt(obj) // 查询用户类别下拉框数据
      return obj
    },
    device() {
      return this.$store.state.app.device
    }
  },
  mounted: function() {
    console.log('params : ' + this.$route.params)
    const params = this.$route.params
    if (params) {
      if (params.userEquipment === '新增') {
        this.dialogFormVisible = true // 显示弹框
        this.ruleForm = {}
        // 禁用用户状态
        this.disabledInputBranchNo = false
        this.disabledInputUserNo = false
        // 用户状态默认为初始状态
        this.ruleForm.userStatus_1 = '0'
        // 登录方式默认为密码登录
        this.ruleForm.loginType_1 = '0'
        // 证件类型默认为身份证
        this.ruleForm.identType_1 = '0'
        // 启用用户号
        this.disabledSelectUserStatus = true
      }
      if (params.userEquipment === '修改') {
        // 记录数据
        this.dialogFormVisible = true // 显示弹框
        // 编辑弹框标题
        this.userEquipment = params.userEquipment
        // 禁用用户状态
        this.disabledInputBranchNo = true
        this.disabledInputUserNo = true
        // 启用用户号
        this.disabledSelectUserStatus = true
        const map = this.$route.params.map
        const ruleForm = {
          'branchNo_1': map.branchNo,
          'userNo_1': map.userNo,
          'userName_1': map.userName,
          'gender_1': map.gender,
          'identType_1': map.identType,
          'identNo_1': map.identNo,
          'tel_1': map.tel,
          'email_1': map.email,
          'roleNo_1': map.roleNo,
          'userStatus_1': map.userStatus,
          'loginType_1': map.loginType
        }
        // 展示表单数据
        this.ruleForm = ruleForm
      }
    }
  },
  methods: {
    submitForm() { // 提交
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const userEquipment = this.$route.params.userEquipment
          const ruleForm = {
            'branchNo': this.ruleForm.branchNo_1,
            'userNo': this.ruleForm.userNo_1,
            'userName': this.ruleForm.userName_1,
            'gender': this.ruleForm.gender_1,
            'identType': this.ruleForm.identType_1,
            'identNo': this.ruleForm.identNo_1,
            'tel': this.ruleForm.tel_1,
            'email': this.ruleForm.email_1,
            'roleNo': this.ruleForm.roleNo_1,
            'userStatus': this.ruleForm.userStatus_1,
            'loginType': this.ruleForm.loginType_1
          }
          const params = { 'ruleForm': JSON.stringify(ruleForm) }
          let url = ''
          if (userEquipment === '修改') {
            url = this.$userMngApi.updateUserBaseInfo
          } else {
            url = this.$userMngApi.addUserBaseInfo
          }
          this.$http(url, params).then( // 通讯后台修改数据库中用户信息
            res => {
              const _data = res.data
              // 赋值
              if (_data.code === 'SUCCESS') {
                if (_data.data.TrxCode === '000000') {
                  this.$message({
                    type: 'success',
                    message: userEquipment + '成功!'
                  })
                  // this.tableData = res.data;
                  this.$router.push({ path: this.redirect || '/user/T1001' })
                  this.dialogFormVisible = false // 显示弹框
                } else {
                  this.$message.error('错误信息 ： ' + _data.data.TrxMessage)
                }
              } else {
                this.$message.error('错误信息 ： ' + _data.message)
              }
            })
        } else {
          this.$message.error(this.userEquipment + '失败')
          return false
        }
      })
    },
    roleSlt(obj) {
      const inputForm = { 'roleStatus': '0' }
      const params = { 'inputForm': JSON.stringify(inputForm), 'pageNum': 1, 'pageSize': 100 }
      this.$http(this.$userMngApi.getRoleBaseInfo, params).then( // 通讯后台查询数据库中用户信息
        res => {
          console.log('res => ', res)
          console.log(res.data)
          const _data = res.data
          if (_data.code === 'SUCCESS') {
            if (_data.data.TrxCode === '000000') {
              console.log(_data.data)
              // 赋值
              _data.data.PageInfo.list.forEach((item, index) => { // 关键的是将后台返回的数据进行遍历，并封装好
                obj.push({
                  value: item.roleNo, // id必须品啊
                  label: item.roleName // name必须品啊
                })
              })
            } else {
              this.$message.error('错误信息 ： ' + _data.data.TrxMessage)
            }
          } else {
            this.$message.error('错误信息 ： ' + _data.message)
          }
        }
      )
    },
    closeDialog() {
      this.$router.push({ path: this.redirect || '/user/T1001' })
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
</style>
