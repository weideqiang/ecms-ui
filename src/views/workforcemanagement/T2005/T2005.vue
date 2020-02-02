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
        <el-form-item label="班次名称:" prop="className">
          <el-input v-model="inputForm.className" name="className" clearable type="text"/>
        </el-form-item>
        <el-form-item label="班次状态：" prop="status">
          <el-select v-model="inputForm.status" placeholder="请选择" clearable>
            <el-option v-for="item in statuss" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-form :inline="true" class="ecms-trx-button">
        <el-form-item>
          <el-button type="primary" size="medium" @click="inquire" >查询</el-button>
          <!--<el-button type="primary" size="medium" @click="addLine">新增</el-button>-->
          <el-button type="primary" size="medium" @click="updateLine">修改</el-button>
          <!--<el-button type="primary" size="medium" @click="handleDelete">删除</el-button>-->
          <el-button type="primary" size="medium" @click="Exit">退出</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row class="ecms-trx-result">
      <span class="ecms-trx-result-title">
        <img src="../../../assets/trx_tablelogo.png" width="42" height="42" style="vertical-align:middle">班次信息列表
      </span>
      <el-table
        ref="multipleTable"
        :data="classTableData"
        class="ecms-trx-resule-table"
        border
        tooltip-effect="dark"
        height="500"
        max-height="500"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"/>
        <el-table-column label="班次名称" prop="className">
          <template slot-scope="scope">
            <span>{{ scope.row.className }}</span>
          </template>
        </el-table-column>
        <el-table-column label="时间段" prop="time">
          <template slot-scope="scope">
            <span>{{ scope.row.time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="班次状态" prop="status">
          <template slot-scope="scope">
            <el-select v-model="scope.row.status" disabled placeholder="请选择">
              <el-option v-for="item in statuss" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="颜色" prop="color">
          <template slot-scope="scope">
            <el-color-picker v-model="scope.row.color" disabled/>
          </template>
        </el-table-column>
        <el-table-column label="对公/对私" prop="CGFlag">
          <template slot-scope="scope">
            <el-select v-model="scope.row.CGFlag" disabled placeholder="请选择">
              <el-option v-for="item in CGFlags" :key="item.value" :label="item.label" :value="item.value"/>
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
export default {
  name: 'T2005',
  data() {
    return {
      inputForm: {
        className: '',
        status: ''
      },
      inputRules: {
        className: [
          { required: false, message: '请输入用户类别名称', trigger: 'blur' },
          { min: 0, max: 400, message: '长度在  0 到 400 个字符', trigger: 'blur' }
        ],

        status: [
          { required: false, message: '请选择用户类别状态', trigger: 'change' }
        ]
      },
      classTableData: [], // 用户类别信息
      currentPage: 1, // 初始页
      pagesize: 10, // 每页显示条数
      pagesizes: 0, // 总条数
      val: [],
      statuss: this.$combo.statuss, // 用户类别状态下拉列表
      CGFlags: this.$combo.CGFlags // 用户类别状态下拉列表
      // userTypes: [],
    }
  },
  // created: function () {
  //   this.checkAuth()
  // },
  methods: {
    Exit() { // 交易退出返回首页
      this.$router.push({
        path: this.redirect || '/dashboard'
      })
    },
    inquire: function() { // 查询
      this.currentPage = 1
      console.log('currentPage: ' + this.currentPage) // 点击第几页
      this.$refs.form.validate(valid => {
        if (valid) {
          this.query()
        }
      })
    },
    query: function() { // 查询
      // let params = {'roleNo': this.inputForm.roleNo, 'roleName': this.inputForm.roleName, 'roleStatus': this.inputForm.roleStatus}
      console.log('inputForm ： ' + JSON.stringify(this.inputForm))
      const params = { 'classInfo': JSON.stringify(this.inputForm), 'pageNum': this.currentPage, 'pageSize': this.pagesize }
      this.$http(this.$workForceMngApi.queryClassInfo, params).then(// 通讯后台查询数据库中用户信息
        res => {
          console.log('res => ', res)
          console.log(res.data)
          const _data = res.data
          if (_data.code === 'SUCCESS') {
            if (_data.data.TrxCode === '000000') {
              console.log(_data.data)
              // 赋值
              this.pagesizes = _data.data.PageInfo.total
              this.classTableData = _data.data.PageInfo.list
            } else {
              this.$message.error('错误信息 ： ' + _data.data.TrxMessage)
            }
          } else {
            this.$message.error('错误信息 ： ' + _data.message)
          }
          // 赋值
          // this.userTypeTableData = res.data
          // this.pagesizes = res.data.total
          // this.userTypeTableData = res.data.list
        }
      )
    },
    handleSelectionChange(val) { // 选中表格数据
      this.val = val
      this.multipleSelection = val
    },

    addLine() { // 添加行数
      // 编辑弹框标题
      this.userEquipment = '新增'
      this.dialogFormVisible = true // 显示弹框
      this.$router.push({
        path: this.redirect || '/T20051',
        name: 'T20051',
        params: {
          userEquipment: '新增'
        }
      })
    },
    handleDelete() { // 删除
      const tableData = this.classTableData
      const multData = this.multipleSelection
      if (!multData || multData.length === 0) {
        alert('请先选择数据再进行删除')
        return
      }
      const multDataLen = multData.length
      const tableDataLen = tableData.length
      const tables = []
      for (let i = 0; i < multDataLen; i++) {
        for (let y = 0; y < tableDataLen; y++) {
          if (JSON.stringify(tableData[y]) === JSON.stringify(multData[i])) { // 判断是否相等，相等就删除
            const classMap = JSON.parse(JSON.stringify(this.classTableData[y]))
            tables.push(classMap.className)
            console.log(tables)
          }
        }
      }
      this.$confirm('请确认是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(JSON.stringify(tables))
        const params = { 'classInfo': JSON.stringify(tables) }
        this.$http(this.$workForceMngApi.deleteClassInfo, params).then( // 通讯后台删除数据库中用户信息
          res => {
            console.log('res => ', res)
            console.log(res.data)
            const _data = res.data
            // 赋值
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
          })
      })
    },
    updateLine() { // 修改
      const tableData = this.classTableData // 获取表格所有数据
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
            tables.push(this.classTableData[y])
            console.log(JSON.stringify(this.classTableData[y]))
            this.userEquipment = '修改'
            // 记录索引
            this.listIndex = y
            this.$router.push({
              path: this.redirect || '/T20051',
              name: 'T20051',
              params: {
                userEquipment: '修改',
                map: this.classTableData[y]
              }
            })
          }
        }
      }
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pagesize = size
      console.log('pagesize : ' + this.pagesize) // 每页下拉显示数据
      this.query()
    },
    handleCurrentChange: function(currentPage) { // 翻页
      this.currentPage = currentPage
      console.log('currentPage: ' + this.currentPage) // 点击第几页
      this.query()
    }
  }
}
</script>

<style scoped>

</style>
<style>
  @import "../../../styles/public.css";
  .el-color-picker__mask {
    background-color: rgba(255, 255, 255, 0);
  }
  .el-table td div {
    border: none;
  }
  .el-icon-arrow-down:before {
    content: '';
  }
  .el-input.is-disabled .el-input__inner {
    background: rgba(106,106,106,0.0);
    border: 0px solid rgba(80,179,249,0.0);
  }
</style>
