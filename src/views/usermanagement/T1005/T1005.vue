<template>
  <el-main>
    <el-row>
      <el-form
        ref="form"
        :inline="true"
        :model="inputForm"
        :rules="inputRules"
        class="ecms-trx-search"
        label-position="left"
        label-width="110px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="角色:" prop="inputFormR">
              <el-select v-model="inputForm.roleType" filterable clearable placeholder="请选择" >
                <el-option v-for="item in roleTypeOption" :label="item.lable" :value="item.value" :key="item.value" style="width: 85%;"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button size="medium" type="primary" @click="query">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
    <div style="text-align: left">
      <el-transfer
        :button-texts="['', '']"
        :data="data1"
        :format="{
          noChecked: '${total}',
          hasChecked: '${checked}/${total}'
        }"
        :titles="['未分配交易信息', '已分配交易信息']"
        v-model="value4"
        filterable
        style="text-align: left; display: inline-block;"
        @change="handleChange">
        <span slot-scope="{ option }">{{ option.key }} - {{ option.label }}</span>
      </el-transfer>
    </div>
  </el-main>
</template>

<script>
export default {
  data() {
    const validateRoleNo = (rule, value, callback) => { // 校验角色是否存在
      const inputForm = { 'roleStatus': '1', 'roleNo': this.inputForm.roleNo }
      const params = { 'inputForm': JSON.stringify(inputForm), 'pageNum': 1, 'pageSize': 100 }
      this.$http(this.$userMngApi.getRoleBaseInfo, params).then( // 通讯后台查询数据库中用户信息
        res => {
          console.log('res => ', res)
          const _data = res.data
          if (_data.code === 'SUCCESS') {
            if (_data.data.TrxCode === '000000') {
              if (_data.data.PageInfo.list === '' || _data.data.PageInfo.list.length === 0) {
                callback(new Error('无该用户类别信息'))
              } else {
                callback()
              }
              // 赋值
            } else {
              // this.$alert('错误信息 ： ' + _data.data.TrxMessage)
              callback(new Error(_data.data.TrxMessage))
            }
          } else {
            this.$alert('错误信息 ： ' + _data.message)
          }
        }
      )
    }
    return {
      inputForm: {
        roleType: ''
      },
      inputRules: {
        roleNo: [
          { required: true, message: '请输入用户类别编号', trigger: 'blur' },
          { min: 0, max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur' },
          { validator: validateRoleNo, trigger: 'blur' }
        ],
        roleName: [
          { required: false, message: '请输入用户类别名称', trigger: 'blur' },
          { min: 0, max: 400, message: '长度在  0 到 400 个字符', trigger: 'blur' }
        ]
      },
      data1: [],
      value4: [],
      roleTypeOption: []
    }
  },
  mounted: function() {
    // this.$set(this.roleTypeOption, 0, { value: 111, label: 10 })
    // this.$set(this.roleTypeOption, 1, { value: 112, label: 10 })
    console.log('@@@' + this.roleTypeOption.length)
    if (this.roleTypeOption.length === 0) {
      const map = {
        'roleStatus': '1'
      }
      const params = { 'ruleForm': JSON.stringify(map) }
      const url = this.$userMngApi.selectEcms_roleInfo
      this.$http(url, params).then( // 通讯后台修改数据库中信息
        res => {
          const _data = res.data
          console.log('@@@@@提交返回 ：' + JSON.stringify(res.data))
          // 赋值
          if (_data.code === 'SUCCESS') {
            if (_data.data.TrxCode === '000000') {
              const roleList = _data.data.PageInfo.list
              for (let i = 0; i < roleList.length; i++) {
                const roleNo = roleList[i].roleNo
                const roleName = roleList[i].roleName
                this.$set(this.roleTypeOption, i, { value: roleNo + '-' + roleName, label: i })
              }
            } else {
              this.$message.error('错误信息 ： ' + _data.data.TrxMessage)
            }
          } else {
            this.$message.error('错误信息 ： ' + _data.message)
          }
        })
    }
  },
  methods: {
    query: function() { // 查询
      console.log(this.inputForm.roleType)
      this.$refs.form.validate(valid => { // 表单校验
        if (valid) {
          if (!this.inputForm.roleType) {
            this.$alert('角色编号不允许为空！')
            return
          }
          const params = { 'getTrxRoles': JSON.stringify(this.inputForm) }
          this.$http(this.$userMngApi.getTrxByRoleNo, params).then( // 通讯后台查询数据库中用户信息
            res => {
              console.log('res => ', res)
              const _data = res.data
              if (_data.code === 'SUCCESS') {
                if (_data.data.TrxCode === '000000') {
                  // 获取后台查询所得list数据
                  const list = JSON.parse(JSON.stringify(_data.data.PageInfo.list))
                  const trxAll = JSON.parse(JSON.stringify(list[0])) // 所有交易代码
                  const trxAllData = []
                  for (let i = 0; i < trxAll.length; i++) {
                    trxAllData.push({
                      key: trxAll[i].trxNo,
                      label: trxAll[i].trxName
                    })
                  }
                  this.data1 = trxAllData // 加载所有交易信息
                  const roleTrx = JSON.parse(JSON.stringify(list[1])) // 角色下挂交易信息
                  const roleTrxData = []
                  for (let i = 0; i < roleTrx.length; i++) {
                    roleTrxData.push(roleTrx[i].trxNo) // 获取交易下挂信息交易码
                  }
                  this.value4 = roleTrxData // 加载角色下挂交易信息
                } else {
                  this.$message.error('错误信息 ： ' + _data.data.TrxMessage)
                }
              } else {
                this.$message.error('错误信息 ： ' + _data.message)
              }
            }
          )
        }
      })
    },
    handleChange(value, direction, movedKeys) { // 维护角色下挂交易
      console.log(value, direction, movedKeys)
      if (direction === 'left') { // 删除角色下挂交易
        const deleteTrxs = { 'roleNo': this.inputForm.roleType.split('-')[0], 'trxNo': movedKeys }
        const params = { 'deleteTrxs': JSON.stringify(deleteTrxs) }
        this.$http(this.$userMngApi.deleteTrxByRole, params).then( // 通讯后台查询数据库中用户信息
          res => {
            const resdata = res.data
            if (resdata.code === 'SUCCESS') {
              if (resdata.data.TrxCode === '000000') {
                // 赋值
                // this.$alert(resdata.data.TrxMessage)
              } else {
                this.$message.error('错误信息 : ' + resdata.data.TrxMessage)
              }
            } else {
              this.$message.error('错误信息 : ' + res.data.message)
            }
          })
      } else { // 增加角色下挂交易
        const addTrxs = { 'roleNo': this.inputForm.roleType.split('-')[0], 'trxNo': movedKeys }
        const params = { 'addTrxs': JSON.stringify(addTrxs) }
        this.$http(this.$userMngApi.addTrxByRole, params).then( // 通讯后台查询数据库中用户信息
          res => {
            const resdata = res.data
            if (resdata.code === 'SUCCESS') {
              if (resdata.data.TrxCode === '000000') {
                // this.$alert(resdata.data.TrxMessage)
              } else {
                this.$message.error('错误信息 : ' + resdata.data.TrxMessage)
              }
            } else {
              this.$message.error('错误信息 : ' + res.data.message)
            }
          })
      }
    }
  }
}
</script>

<style scoped>

</style>
<style>
  @import "../../../styles/public.css";
</style>
