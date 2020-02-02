<template>
  <el-main>
    <el-row>
      <el-form
        ref="form"
        :inline="true"
        :model="inputForm"
        :rules="inputRules"
        class="ecms-trx-search"
        label-position="left">
        <el-input v-model="inputForm.input3" class="input-with-select" placeholder="请输入内容">
          <el-select slot="prepend" v-model="inputForm.select" placeholder="请选择">
            <el-option
              v-for="item in tableHeader"
              :key="item.value"
              :label="item.label"
              :value="item.prop"/>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="inquire"/>
        </el-input>
        <!--<el-form-item label="用户类别编号:" prop="roleNo">-->
        <!--<el-input v-model="inputForm.roleNo" name="roleNo" type="text" clearable/>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="用户类别名称:" prop="roleName">-->
        <!--<el-input v-model="inputForm.roleName" name="roleName" type="text" clearable/>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="用户类别状态：" prop="roleStatus">-->
        <!--<el-select v-model="inputForm.roleStatus" placeholder="请选择" clearable>-->
        <!--<el-option v-for="item in roleStatuss" :key="item.value" :label="item.label" :value="item.value"/>-->
        <!--</el-select>-->
        <!--</el-form-item>-->
      </el-form>
    </el-row>
    <!--<el-row>-->
    <!--<el-form :inline="true" class="ecms-trx-button">-->
    <!--<el-form-item>-->
    <!--<el-button type="primary" size="medium" @click="inquire" >查询</el-button>-->
    <!--<el-button type="primary" size="medium" @click="addLine">新增</el-button>-->
    <!--<el-button type="primary" size="medium" @click="updateLine">修改</el-button>-->
    <!--<el-button type="primary" size="medium" @click="handleDelete">删除</el-button>-->
    <!--</el-form-item>-->
    <!--</el-form>-->
    <!--</el-row>-->
    <el-row class="ecms-trx-result">
      <!--<span class="ecms-trx-result-title">-->
      <!--<img src="../../../assets/trx_tablelogo.png" width="42" height="42" style="vertical-align:middle">用户类别信息列表-->
      <!--</span>-->
      <el-table
        ref="multipleTable"
        :data="userTypeTableData"
        :expand-row-keys="expands"
        class="ecms-trx-resule-table"
        max-height="450px"
        tooltip-effect="dark"
        row-key="roleNo"
        align="center"
        @selection-change="handleSelectionChange">
        <!--<el-table-column type="selection" width="55"/>-->
        <!--<el-table-column label="用户类别编号" prop="roleNo">-->
        <!--<template slot-scope="scope">-->
        <!--<span>{{ scope.row.roleNo }}</span>-->
        <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column label="用户类别名称" prop="roleName">-->
        <!--<template slot-scope="scope">-->
        <!--<span>{{ scope.row.roleName }}</span>-->
        <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column label="用户类别状态" prop="roleStatus">-->
        <!--<template slot-scope="scope">-->
        <!--<el-select v-model="scope.row.roleStatus" disabled placeholder="请选择">-->
        <!--<el-option v-for="item in roleStatuss" :key="item.value" :label="item.label" :value="item.value"/>-->
        <!--</el-select>-->
        <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column label="用户类别描述" prop="roleDesc">-->
        <!--<template slot-scope="scope">-->
        <!--<span>{{ scope.row.roleDesc }}</span>-->
        <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column type="expand" class="cell-table-expand" width="0">
          <template slot-scope="scope">
            <el-form class="demo-table-expand" label-position="left">
              <el-form-item label="角色状态">
                <span>{{ scope.row.roleStatusLabel }}</span>
              </el-form-item>
              <el-form-item label="角色描述">
                <span>{{ scope.row.roleDesc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column v-if="device!=='mobile'" label="序号" type="index" width="50"/>
        <el-table-column
          v-for="(item,key) in tableHeader"
          :key="key"
          :label="item.label"
          :prop="item.prop"
          :show="item.show"
          :sortable="item.sortable"
          :width="item.width"
          align="center"/>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <template v-if="device==='mobile'">
              <el-button icon="el-icon-edit" size="mini" type="primary" @click="updateLine(scope.$index, tableData)"/>
              <el-button icon="el-icon-delete" size="mini" type="danger" @click="handleDelete(scope.$index, tableData)"/>
              <el-button icon="el-icon-view" size="mini" type="danger" @click="expandChange(scope.row)"/>
            </template>
            <template v-else>
              <el-button icon="el-icon-edit" size="mini" type="primary" @click="updateLine(scope.$index, tableData)">编辑</el-button>
              <el-button icon="el-icon-delete" size="mini" type="primary" @click="handleDelete(scope.$index, tableData)">删除</el-button>
            </template>
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
  </el-main>
</template>

<script>
export default {
  name: 'T1002',
  data() {
    return {
      expands: [],
      inputForm: {
        roleNo: '',
        roleName: '',
        roleStatus: ''
      },
      inputRules: {
        roleNo: [
          { required: false, message: '请输入角色编号', trigger: 'blur' },
          { min: 0, max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur' }
        ],
        roleName: [
          { required: false, message: '请输入角色名称', trigger: 'blur' },
          { min: 0, max: 400, message: '长度在  0 到 400 个字符', trigger: 'blur' }
        ],

        roleStatus: [
          { required: false, message: '请选择角色状态', trigger: 'change' }
        ]
      },
      userTypeTableData: [], // 角色信息
      currentPage: 1, // 初始页
      pagesize: 10, // 每页显示条数
      pagesizes: 0, // 总条数
      val: [],
      roleStatuss: this.$combo.statuss,
      // userTypes: [],
      userEquipment: '' // 弹框标题
    }
  },
  computed: {
    tableHeader: function() {
      const key = [{
        prop: 'roleNo',
        label: '角色编号'
      }, {
        prop: 'roleName',
        label: '角色名称'
      }, {
        prop: 'roleStatusLabel',
        label: '角色状态'
      }, {
        prop: 'roleDesc',
        label: '角色描述'
      }]
      const key1 = [{
        prop: 'roleNo',
        label: '角色编号'
      }, {
        prop: 'roleName',
        label: '角色名称'
      }]
      if (this.device === 'mobile') {
        return key1
      } else {
        return key
      }
    },
    device() {
      return this.$store.state.app.device
    }
  },
  methods: {
    selectLable: function(key, list) {
      for (let i = 0; i < list.length; i++) {
        const value = list[i].value
        if (key === value) {
          return list[i].label
        }
      }
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
      const params = { 'inputForm': JSON.stringify(this.inputForm), 'pageNum': this.currentPage, 'pageSize': this.pagesize }
      this.$http(this.$userMngApi.getRoleBaseInfo, params).then(// 通讯后台查询数据库中用户信息
        res => {
          console.log('res => ', res)
          console.log(res.data)
          const _data = res.data
          if (_data.code === 'SUCCESS') {
            if (_data.data.TrxCode === '000000') {
              console.log(_data.data)
              // 赋值
              this.pagesizes = _data.data.PageInfo.total
              const list = _data.data.PageInfo.list
              for (let i = 0; i < list.length; i++) {
                this.$set(list[i], 'roleStatusLabel', this.selectLable(list[i].roleStatus, this.roleStatuss))
              }
              console.log('list => ' + list)
              this.userTypeTableData = list
            } else {
              this.$message.error('错误信息 ： ' + _data.data.TrxMessage)
            }
          } else {
            this.$message.error('错误信息 ： ' + _data.message)
          }
        }
      )
    },
    expandChange: function(row, expandedRows) { // 选中表格数据
      console.log('row => ' + JSON.stringify(row))
      console.log('row => ' + row.roleNo)
      if (this.expands.indexOf(row.roleNo) < 0) {
        this.expands = []
        this.expands.push(row.roleNo)
      } else {
        this.expands = []
      }
    },
    handleSelectionChange(val) { // 选中表格数据
      this.val = val
      this.multipleSelection = val
    },

    addLine() { // 添加行数
      // 编辑弹框标题
      this.userEquipment = '新增'
      this.ruleForm = {}
      this.$router.push({
        path: this.redirect || '/T10021',
        name: 'T10021',
        params: {
          userEquipment: '新增'
        }
      })
    },
    handleDelete(index, rows) { // 删除
      const tables = []
      const roleMap = JSON.parse(JSON.stringify(this.userTypeTableData[index]))
      tables.push(roleMap.roleNo)
      this.$confirm('请确认是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(JSON.stringify(tables))
        const params = { 'tableDatas': JSON.stringify(tables) }
        this.$http(this.$userMngApi.deleteRoleBaseInfo, params).then( // 通讯后台删除数据库中用户信息
          res => {
            console.log('res => ', res)
            console.log(res.data)
            const _data = res.data
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
      }).catch(action => {
        this.$message.info('已取消操作!')
      })
    },
    updateLine(index, rows) { // 修改
      this.$router.push({
        path: this.redirect || '/T10021',
        name: 'T10021',
        params: {
          userEquipment: '修改',
          map: this.userTypeTableData[index]
        }
      })
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
  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 110px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
  }

  .el-table__expanded-cell[class*=cell] {
    text-align: left;
  }

  .input-with-select .el-input-group__prepend {
    width: 135px;
    background-color: #fff;
  }
  .el-button--mini, .el-button--mini.is-round {
    padding: 4px 3px;
    font-size: 10px;
  }
  .el-table__expand-icon {
    visibility: hidden;
  }
  .el-button+.el-button {
    margin-left: 5px;
  }
  .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
    padding-left: 5px;
  }
</style>
