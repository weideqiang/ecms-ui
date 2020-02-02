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
        <el-form-item label="用户号:" prop="userNo">
          <el-input v-model="inputForm.userNo" clearable/>
        </el-form-item>
        <el-form-item label="用户名称:" prop="userName">
          <el-input v-model="inputForm.userName" disabled clearable/>
        </el-form-item>
        <el-form-item>
          <el-button size="medium" type="primary" @click="query">查询</el-button>
        </el-form-item>
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
        :titles="['未分配用户类别信息', '已分配用户类别信息']"
        v-model="value4"
        filterable
        style="text-align: left; display: inline-block"
        @change="handleChange">
        <span slot-scope="{ option }">{{ option.key }} - {{ option.label }}</span>
      </el-transfer>
    </div>
  </el-main>
</template>

<script>
export default {
  data() {
    const validateUserNo = (rule, value, callback) => { // 校验角色是否存在
      const inputForm = { 'userNo': this.inputForm.userNo }
      const params = { 'inputForm': JSON.stringify(inputForm), 'pageNum': 1, 'pageSize': 100 }
      this.$http(this.$userMngApi.getUserBaseInfo, params).then( // 通讯后台查询数据库中用户信息
        res => {
          console.log('res => ', res)
          const _data = res.data
          if (_data.code === 'SUCCESS') {
            if (_data.data.TrxCode === '000000') {
              if (_data.data.PageInfo.list === '' || _data.data.PageInfo.list.length === 0) {
                this.inputForm.userName = ''
                callback(new Error('无该用户类别信息'))
              } else {
                this.inputForm.userName = _data.data.PageInfo.list[0].userName
                callback()
              }
              // 赋值
            } else {
              this.inputForm.userName = ''
              // this.$alert('错误信息 ： ' + _data.data.TrxMessage)
              callback(new Error(_data.data.TrxMessage))
            }
          } else {
            this.inputForm.userName = ''
            this.$message.error('错误信息 ： ' + _data.message)
          }
        }
      )
    }
    return {
      inputForm: {
        userNo: '',
        userName: ''
      },
      inputRules: {
        userNo: [
          { required: true, message: '请输入用户号', trigger: 'blur' },
          { min: 0, max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur' },
          { validator: validateUserNo, trigger: 'blur' }
        ],
        userName: [
          { required: false, message: '请输入用户类别名称', trigger: 'blur' },
          { min: 0, max: 400, message: '长度在  0 到 400 个字符', trigger: 'blur' }
        ]
      },
      data1: [],
      value4: []
    }
  },
  methods: {
    query: function() { // 查询
      this.$refs.form.validate(valid => { // 表单校验
        if (valid) {
          const params = { 'inputForm': JSON.stringify(this.inputForm) }
          this.$http(this.$userMngApi.getUserRoleRelation, params).then( // 通讯后台查询数据库中用户信息
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
                      key: trxAll[i].roleNo,
                      label: trxAll[i].roleName
                    })
                  }
                  this.data1 = trxAllData // 加载所有交易信息
                  const roleTrx = JSON.parse(JSON.stringify(list[1])) // 角色下挂交易信息
                  const roleTrxData = []
                  for (let i = 0; i < roleTrx.length; i++) {
                    roleTrxData.push(roleTrx[i].roleNo) // 获取交易下挂信息交易码
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
        const deleteTrxs = { 'userNo': this.inputForm.userNo, 'roleNo': movedKeys }
        const params = { 'deleteTrxs': JSON.stringify(deleteTrxs) }
        this.$http(this.$userMngApi.deleteUserRoleRelation, params).then( // 通讯后台查询数据库中用户信息
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
        const addTrxs = { 'userNo': this.inputForm.userNo, 'roleNo': movedKeys }
        const params = { 'addTrxs': JSON.stringify(addTrxs) }
        this.$http(this.$userMngApi.addUserRoleRelation, params).then( // 通讯后台查询数据库中用户信息
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

<style>
</style>
<style>
  @import "../../../styles/public.css";
</style>
