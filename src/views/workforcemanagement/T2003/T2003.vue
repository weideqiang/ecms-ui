<template>
  <el-main>
    <el-row>
      <el-form
        ref="form"
        :inline="true"
        :model="inputForm"
        :rules="inputRules"
        class="ecms-trx-search"
        label-width="80px"
        label-position="left">
        <el-form-item label="机构号:">
          <el-input v-model="inputForm.brno"/>
        </el-form-item>
        <el-form-item label="柜员号:">
          <el-input v-model="inputForm.userno"/>
        </el-form-item>
        <br>
        <el-form-item label="柜员类别:">
          <el-select v-model="inputForm.jobtype" placeholder="请选择">
            <el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item label="柜员名称:">
          <el-input v-model="inputForm.username"/>
        </el-form-item>
        <el-form-item label="性别:">
          <el-select v-model="inputForm.sex" style="width: 80%;" placeholder="请选择" clearable>
            <el-option v-for="item in sexs" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-button type="primary" size="medium" @click="derive" >导出</el-button>
        <a href="javascript:;" class="file">
          <input-excel @getResult="getMyExcelData"/>
        </a>
      </el-col>
      <el-col :span="12">
        <el-form :inline="true" class="ecms-trx-button">
          <el-form-item>
            <el-button type="primary" size="medium" @click="inquire">查询</el-button>
            <el-button type="primary" size="medium" @click="addLine">新增</el-button>
            <el-button type="primary" size="medium" @click="updateLine">修改</el-button>
            <el-button type="primary" size="medium" @click="handleDelete">删除</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <font color="#FF0000">(需将所有单元格格式更改为文本格式再进行修改)</font>
    <el-row class="ecms-trx-result">
      <span class="ecms-trx-result-title">
        <img src="../../../assets/trx_tablelogo.png" width="42" height="42" style="vertical-align:middle">用户信息列表
      </span>
      <el-table
        ref="multipleTable"
        :data="tableData"
        class="ecms-trx-resule-table"
        border
        tooltip-effect="dark"
        height="530"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"/>
        <el-table-column prop="brno" label="机构号">
          <template slot-scope="scope">
            <span>{{ scope.row.brno }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="机构名称">
          <template slot-scope="scope">
            <span>{{ scope.row.brnoname }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="tel" label="柜员号">
          <template slot-scope="scope">
            <span>{{ scope.row.userno }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="email" label="柜员名称">
          <template slot-scope="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="userStatus" label="柜员类别">
          <template slot-scope="scope">
            <el-select v-model="scope.row.jobtype" disabled placeholder="请选择">
              <el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 40]"
        :page-size="pagesize"
        :total="pagesizes"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </el-row>
    <el-row>
      <router-view/>
    </el-row>
  </el-main>
</template>

<script>
import inputExcel from './TinputExcel'
export default {
  name: 'T2003',
  components: {
    inputExcel
  },
  data() {
    const validatePass = (rule, value, callback) => {
      console.log('value : ' + value)
      if (!value || value.length === 0) {
        callback()
      } else if (value.length > 10) {
        callback(new Error('用户号不能超过10位'))
      } else {
        callback()
      }
    }
    return {
      inputForm: {
        brno: '',
        username: '',
        jobtype: '',
        userno: '',
        sex: ''
      },
      inputRules: {
        userno: [
          { required: false, message: '请输入柜员号', trigger: 'blur' },
          { min: 0, max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur' },
          { trigger: 'blur', validator: validatePass }
        ],
        username: [
          { required: false, message: '请输入柜员名称', trigger: 'blur' },
          { min: 0, max: 10, message: '长度在 0 到 200 个字符', trigger: 'blur' }
        ]
      },
      brno: '', // 机构号
      brnoname: '', // 机构名称
      userno: '',
      username: '',
      tableData: [], // 用户信息
      currentPage: 1, // 初始页
      pagesize: 5, // 每页显示条数
      pagesizes: 0, // 总条数
      val: [],
      status: [{ // 用户状态下拉列表
        value: 'C',
        label: '对公'
      }, {
        value: 'G',
        label: '对私'
      }],
      sexs: [{ // 性别
        value: '0',
        label: '男'
      }, {
        value: '1',
        label: '女'
      }]
    }
  },
  methods: {
    inquire: function() { // 查询
      this.currentPage = 1
      console.log('currentPage: ' + this.currentPage) // 点击第几页
      this.query()
    },
    getMyExcelData(data, name1) {
      // 处理你的数据
      this.data = data
      this.name = name1
      console.log(data)
      this.$message.success('导入成功')
      this.Tjiao()
    },
    Tjiao() {
      this.$refs.form.validate(valid => {
        const params = { 'VerIft': JSON.stringify(this.data) }
        console.log(params)
        this.$http(this.$workForceMngApi.queryTellerInfoVerIft, params).then( // 此处调用自己的Api接口方法
          res => {
            console.log('res => ', res)
            console.log(res.data)
            const resdata = res.data.data
            if (resdata.TrxCode === '000000') {
              this.$message({
                showClose: true,
                message: '调整成功',
                type: 'success'
              })
              this.inquire()
            } else {
              this.$message({
                showClose: true,
                message: '调整失败',
                type: 'warning'
              })
            }
          })
      })
    },
    derive: function() {
      if (this.pagesizes === 0) {
        this.$message({
          showClose: true,
          message: '请进行查询!',
          type: 'warning'
        })
        return
      }
      const params = { 'inputForm': '' }
      this.$http(this.$workForceMngApi.queryTellerInfoExlrevampVerIft, params) // 此处调用自己的Api接口方法
        .then(
          res => {
            console.log(res.data)
            this.download(res.data)
            console.log('导出成功')
          })
        .catch(error => {
          console.log(error)
        })
    },
    download(data) {
      if (!data) {
        return
      }
      const url = window.URL.createObjectURL(new Blob([data]))
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', '排班人员设置表' + '.xls')
      console.log('link============>' + link)
      document.body.appendChild(link)
      link.click()
    },
    query: function() { // 查询
      this.$refs.form.validate(valid => {
        if (valid) {
          const params = {
            'inputForm': JSON.stringify(this.inputForm),
            'pageNum': this.currentPage,
            'pageSize': this.pagesize
          }
          // let params = {'userNo': this.userNo, 'userName': this.userName}
          console.log(params)
          this.$http(this.$workForceMngApi.queryTellerInfo, params).then(// 通讯后台查询数据库中用户信息
            res => {
              const resdata = res.data.data
              console.log(resdata)
              if (resdata.code === 'SUCCESS') {
                if (resdata.data.TrxCode === '000000') {
                  // 赋值
                  this.pagesizes = resdata.data.PageInfo.total
                  this.tableData = resdata.data.PageInfo.list
                } else {
                  this.$message({
                    showClose: true,
                    message: '错误信息 : ' + resdata.data.TrxMessage,
                    type: 'warning'
                  })
                }
              } else {
                this.$message({
                  showClose: true,
                  message: '错误信息 : ' + res.data.message,
                  type: 'warning'
                })
              }
            }
          )
        } else {
          this.$message({
            showClose: true,
            message: '查询失败',
            type: 'warning'
          })
          return false
        }
      })
    },
    handleSelectionChange(val) { // 选中表格数据
      this.val = val
      this.multipleSelection = val
    },

    addLine() { // 添加行数
      // 编辑弹框标题
      this.userEquipment = '新增'
      this.dialogFormVisible = true // 显示弹框
      this.ruleForm = {}
      // 禁用用户状态
      // this.disabledInputUserNo = false
      // // 启用用户号
      // this.disabledSelectUserStatus = true
      this.$router.push({
        name: 'T200301',
        params: {
          userEquipment: '新增'
        }
      })
    },
    handleDelete() { // 删除
      const multData = this.multipleSelection
      const tableData = this.tableData
      if (!multData || multData.length !== 1) {
        this.$message({
          showClose: true,
          message: '请选择一条数据再进行删除',
          type: 'warning'
        })
        return
      }
      const multDataLen = multData.length
      const tableDataLen = tableData.length
      const userNos = []
      for (let i = 0; i < multDataLen; i++) {
        for (let y = 0; y < tableDataLen; y++) {
          if (JSON.stringify(tableData[y]) === JSON.stringify(multData[i])) { // 判断是否相等，相等就删除
            const roleMap = JSON.parse(JSON.stringify(this.tableData[y]))
            console.log('roleMap' + roleMap)
            userNos.push(roleMap.userno)
          }
        }
      }
      this.$confirm('请确认是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {
          'ruleForm': userNos[0]
        }
        this.$http(this.$workForceMngApi.deleteTellerInfo, params).then(
          res => {
            const _data = res.data.data
            if (_data.code === 'SUCCESS') {
              if (_data.data.TrxCode === '000000') {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.query()
              } else {
                this.$message.error('错误信息 ： ' + _data.data.TrxMessage)
              }
            } else {
              this.$message.error('错误信息 ： ' + _data.message)
            }
          }
        )
      })
    },
    updateLine() { // 修改
      const tableData = this.tableData // 获取表格所有数据
      const multData = this.multipleSelection // 获取选中数据
      console.log('multData : ' + JSON.stringify(this.multData))
      if (!multData || multData.length !== 1) {
        this.$message({
          showClose: true,
          message: '请选择一条数据再进行修改',
          type: 'warning'
        })
        return
      }
      const multDataLen = multData.length
      const tableDataLen = tableData.length
      const tables = []
      for (let i = 0; i < multDataLen; i++) {
        for (let y = 0; y < tableDataLen; y++) {
          if (JSON.stringify(tableData[y]) === JSON.stringify(multData[i])) { // 判断是否相等，相等就修改
            tables.push(this.tableData[y])
            console.log('T2003tabledata' + JSON.stringify(this.tableData[y]))
            this.userEquipment = '修改'
            // 记录索引
            this.listIndex = y
            this.ruleForm = this.tableData[y]
            // 记录数据
            this.dialogFormVisible = true // 显示弹框
            // 编辑弹框标题
            this.editEquipment = 'editEquipent'
            // 编辑弹框标题
            this.editEquipment = 'editEquipent'
            this.$router.push({
              name: 'T200301',
              params: {
                userEquipment: '修改',
                map: this.tableData[y]
              }
            })
            console.log(this.ruleForm)
          }
        }
      }
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pagesize = size
      console.log(this.pagesize) // 每页下拉显示数据
      this.query()
    },
    handleCurrentChange: function(currentPage) { // 翻页
      this.currentPage = currentPage
      console.log(this.currentPage) // 点击第几页
      this.query()
    },
    submitForm() { // 提交
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const userEquipment = this.userEquipment
          const params = { 'ruleForm': JSON.stringify(this.ruleForm) }
          let url = ''
          if (userEquipment === '修改') {
            url = this.$userMngApi.updateUserBaseInfo
          } else {
            url = this.$userMngApi.addUserBaseInfo
          }
          this.$http(url, params).then( // 通讯后台修改数据库中用户信息
            res => {
              const _data = res.data.data
              // 赋值
              if (_data.code === 'SUCCESS') {
                if (_data.data.TrxCode === '000000') {
                  this.$message({
                    showClose: true,
                    message: _data.data.TrxMessage,
                    type: 'warning'
                  })
                  // this.tableData = res.data;
                  this.query()
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
      this.$refs['ruleForm'].resetFields()
      this.query()
    }
  }
}
</script>

<style scoped>

</style>
<style>
  @import "../../../styles/public.css";
</style>
