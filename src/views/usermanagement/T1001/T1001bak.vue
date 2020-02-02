<template>
  <el-main>
    <!--<div class="search-con search-con-top">-->
    <!--<Select v-model="searchKey" class="search-col">-->
    <!--<Option v-for="item in columns" v-if="item.key !== 'handle'" :value="item.key" :key="`search-col-${item.key}`">{{ item.title }}</Option>-->
    <!--</Select>-->
    <!--<el-select disabled placeholder="请选择" v-model="searchKey">-->
    <!--<el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in identTypes">-->
    <!--</el-option>-->
    <!--</el-select>-->
    <!--<el-input @on-change="handleClear" clearable placeholder="输入关键字搜索" class="search-input" v-model="searchValue"/>-->
    <!--<Button @click="handleSearch" class="search-btn" type="primary"><Icon type="search"/>&nbsp;&nbsp;搜索</Button>-->
    <!--</div>-->
    <el-row>
      <el-form
        ref="form"
        :inline="true"
        :model="inputForm"
        :rules="inputRules"
        class="ecms-trx-search"
        label-position="left"
        label-width="80px">
        <!--<el-form-item label="用户号:">-->
        <!--<el-input clearable v-model="inputForm.userNo"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="用户名称:">-->
        <!--<el-input clearable v-model="inputForm.userName"></el-input>-->
        <!--</el-form-item>-->
        <el-input v-model="inputForm.input3" class="input-with-select" placeholder="请输入内容">
          <el-select slot="prepend" v-model="inputForm.select" placeholder="请选择">
            <el-option label="用户号" value="userNo"/>
            <el-option label="用户名称" value="userName"/>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="inquire"/>
        </el-input>
      </el-form>
    </el-row>
    <!--<el-row>-->
    <!--<el-form :inline="true" class="ecms-trx-button">-->
    <!--<el-form-item>-->
    <!--<el-button @click="inquire" size="medium" type="primary">查询</el-button>-->
    <!--<el-button @click="addLine" size="medium" type="primary">新增</el-button>-->
    <!--<el-button @click="updateLine" size="medium" type="primary">修改</el-button>-->
    <!--<el-button @click="handleDelete" size="medium" type="primary">删除</el-button>-->
    <!--</el-form-item>-->
    <!--</el-form>-->
    <!--</el-row>-->
    <el-row class="ecms-trx-result">
      <!--<span class="ecms-trx-result-title">-->
      <!--<img height="42" src="../../../assets/trx_tablelogo.png" style="vertical-align:middle" width="42">用户信息列表-->
      <!--</span>-->
      <el-table
        ref="multipleTable"
        :data="tableData"
        max-height="400"
        border
        class="ecms-trx-resule-table"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-form class="demo-table-expand" inline label-position="left">
              <el-form-item label="证件类型">
                <el-select v-model="scope.row.identType" disabled placeholder="请选择">
                  <el-option v-for="item in identTypes" :key="item.value" :label="item.label" :value="item.value"/>
                </el-select>
              </el-form-item>
              <el-form-item label="证件号码">
                <span>{{ scope.row.identNo }}</span>
              </el-form-item>
              <el-form-item label="性别">
                <el-select v-model="scope.row.gender" disabled placeholder="请选择">
                  <el-option v-for="item in genders" :key="item.value" :label="item.label" :value="item.value"/>
                </el-select>
              </el-form-item>
              <el-form-item label="登录方式">
                <el-select v-model="scope.row.loginType" disabled placeholder="请选择">
                  <el-option v-for="item in loginTypes" :key="item.value" :label="item.label" :value="item.value"/>
                </el-select>
              </el-form-item>
              <el-form-item label="联系电话">
                <span>{{ scope.row.tel }}</span>
              </el-form-item>
              <el-form-item label="电子邮箱">
                <span>{{ scope.row.email }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="用户号" prop="userNo">
          <template slot-scope="scope">
            <span>{{ scope.row.userNo }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户名称" prop="userName">
          <template slot-scope="scope">
            <span>{{ scope.row.userName }}</span>
          </template>
        </el-table-column>
        <!--<el-table-column label="用户状态" prop="userStatus">-->
        <!--<template slot-scope="scope">-->
        <!--<el-select v-model="scope.row.userStatus" disabled placeholder="请选择">-->
        <!--<el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value"/>-->
        <!--</el-select>-->
        <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <i class="el-icon-edit" @click="handleEdit(scope.$index, scope.row)"/>
            <i class="el-icon-delete" @click="handleDelete(scope.$index, scope.row)"/>
            <!--<el-button @click="inquire" icon="el-icon-search" slot="append"></el-button>-->
            <!--<el-button-->
            <!--size="mini">编辑-->
            <!--</el-button>-->
            <!--<el-button-->
            <!--size="mini"-->
            <!--type="danger">删除-->
            <!--</el-button>-->
          </template>
        </el-table-column>
      </el-table>
      <br>
      <div v-if="device==='mobile'">
        <el-pagination
          :total="pagesizes"
          background
          small="true"
          layout="prev, pager, next"
        />
      </div>
      <div v-else>
        <el-pagination
          :current-page="currentPage"
          :page-size="pagesize"
          :page-sizes="[5, 10, 20, 40]"
          :total="pagesizes"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"/>
      </div>
    </el-row>
    <el-row>
      <router-view/>
    </el-row>
  </el-main>
</template>

<script>
export default {
  name: 'T1001',
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

      searchable: {
        type: Boolean,
        default: false
      },
      searchPlace: {
        type: String,
        default: 'top'
      },
      inputForm: {
        input3: '',
        select: '',
        userNo: '',
        userName: ''
      },
      inputRules: {
        userNo: [
          { required: false, message: '请输入用户号', trigger: 'blur' },
          { min: 0, max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur' },
          { trigger: 'blur', validator: validatePass }
        ],
        userName: [
          { required: false, message: '请输入用户名称', trigger: 'blur' },
          { min: 0, max: 10, message: '长度在 0 到 200 个字符', trigger: 'blur' }
        ]
      },
      userNo: '', // 用户号
      userName: '', // 用户名称
      tableHeight: window.innerHeight * 0.45,
      tableData: [], // 用户信息
      currentPage: 1, // 初始页
      pagesize: 10, // 每页显示条数
      pagesizes: 0, // 总条数
      val: [],
      loginTypes: this.$combo.loginTypes,
      genders: this.$combo.gender,
      identTypes: this.$combo.identType,
      status: this.$combo.userStatus
      // userTypes: [],
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
  methods: {
    inquire: function() { // 查询
      this.currentPage = 1
      console.log('currentPage: ' + this.currentPage) // 点击第几页
      this.query()
    },
    query: function() { // 查询
      // this.$refs.form.validate(valid => {
      //   if (valid) {
      console.log('select => ' + this.inputForm)
      const params = {
        'inputForm': JSON.stringify(this.inputForm),
        'pageNum': this.currentPage,
        'pageSize': this.pagesize
      }
      // let params = {'userNo': this.userNo, 'userName': this.userName}
      this.$http(this.$userMngApi.getUserBaseInfo, params).then(// 通讯后台查询数据库中用户信息
        res => {
          const resdata = res.data.data
          if (resdata.code === 'SUCCESS') {
            if (resdata.data.TrxCode === '000000') {
              // 赋值
              this.pagesizes = resdata.data.PageInfo.total
              this.tableData = resdata.data.PageInfo.list
            } else {
              this.$message.error('错误信息 ： ' + resdata.data.TrxMessage)
            }
          } else {
            this.$message.error('错误信息 ： ' + res.data.message)
          }
        }
      )
      // } else {
      //   this.$message.error('查询失败')
      //   return false
      // }
      // })
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
      this.disabledInputUserNo = false
      // 用户状态默认为初始状态
      this.ruleForm.userStatus = '0'
      // 登录方式默认为密码登录
      this.ruleForm.loginType = '0'
      // 证件类型默认为身份证
      this.ruleForm.identType = '0'
      // 启用用户号
      this.disabledSelectUserStatus = true
      this.$router.push({
        name: 'T1001_1',
        params: {
          userEquipment: '新增'
        }
      })
    },
    handleDelete() { // 删除
      const multData = this.multipleSelection
      const tableData = this.tableData
      if (!multData || multData.length === 0) {
        alert('请先选择数据再进行删除')
        return
      }
      const multDataLen = multData.length
      const tableDataLen = tableData.length
      const userNos = []
      for (let i = 0; i < multDataLen; i++) {
        for (let y = 0; y < tableDataLen; y++) {
          if (JSON.stringify(tableData[y]) === JSON.stringify(multData[i])) { // 判断是否相等，相等就删除
            const roleMap = JSON.parse(JSON.stringify(this.tableData[y]))
            userNos.push(roleMap.userNo)
          }
        }
      }
      this.$confirm('请确认是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = { 'userNos': JSON.stringify(userNos) }
        this.$http(this.$userMngApi.deleteUserBaseInfo, params).then( // 通讯后台删除数据库中用户信息
          res => {
            console.log('res => ', res)
            console.log(res.data)
            const _data = res.data.data
            // 赋值
            if (_data.code === 'SUCCESS') {
              if (_data.data.TrxCode === '000000') {
                // this.tableData = res.data;
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
          })
      })
    },
    updateLine() { // 修改
      const tableData = this.tableData // 获取表格所有数据
      const multData = this.multipleSelection // 获取选中数据
      console.log('multData : ' + JSON.stringify(this.multData))
      if (!multData || multData.length !== 1) {
        alert('请先选择一条数据再进行修改')
        return
      }
      const multDataLen = multData.length
      const tableDataLen = tableData.length
      const tables = []
      for (let i = 0; i < multDataLen; i++) {
        for (let y = 0; y < tableDataLen; y++) {
          if (JSON.stringify(tableData[y]) === JSON.stringify(multData[i])) { // 判断是否相等，相等就修改
            tables.push(this.tableData[y])
            console.log(JSON.stringify(this.tableData[y]))
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
            // 禁用用户状态
            this.disabledInputUserNo = true
            // 启用用户号
            this.disabledSelectUserStatus = false
            this.$router.push({
              name: 'T1001_1',
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
    handleClear(e) {
      if (e.target.value === '') this.insideTableData = this.value
    },
    handleSearch() {
      this.insideTableData = this.value.filter(item => item[this.searchKey].indexOf(this.searchValue) > -1)
    },
    roleSlt(obj) {
      const inputForm = { 'roleStatus': '0' }
      const params = { 'inputForm': JSON.stringify(inputForm), 'pageNum': 1, 'pageSize': 100 }
      this.$http(this.$userMngApi.getRoleBaseInfo, params).then( // 通讯后台查询数据库中用户信息
        res => {
          console.log('res => ', res)
          console.log(res.data)
          const _data = res.data.data
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
    }
  }
}
</script>

<style scoped>
</style>
<style>
  @import "../../../styles/public.css";

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .el-table__expanded-cell[class*=cell] {
    text-align: left;
  }

  .input-with-select .el-input-group__prepend {
    width: 110px;
    background-color: #fff;
  }
</style>
