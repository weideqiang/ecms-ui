<template>
  <el-main>
    <el-row class="ecms-trx-result">
      <tl-table
        :table="dataTable"
        :data="tableData"
        :pagesizes="pagesizes"
        :expand-keys="expandKeys"
        :id="id"
        :disabled-pagination="disabledPagination"
        @handleCurrentChange="handleCurrentChange"
        @handleDel="handleDel"
        @handleEdit="handleEdit"
        @handleSelectionChange="handleSelectionChange"
        @handleView="handleView"
        @onRowdbClick="onRowdbClick"
        @handleSizeChange="handleSizeChange"/>
    </el-row>
  </el-main>
</template>

<script>
export default {
  name: 'T1001',
  data() {
    return {
      tableData: [], // 用户信息
      currentPage: 1, // 初始页
      pagesize: 10, // 每页显示条数
      pagesizes: 0, // 总条数
      expandKeys: [],
      id: 'userNo',
      disabledPagination: false
    }
  },
  computed: {
    dataTable() {
      const table = {
        currentPage: 1, // 初始页
        pagesize: 10, // 每页显示条数
        pagesizes: 0, // 总条数
        hasMergeRowOrColumn: false, // 是否合并单元格
        loading: false, // 加载中动画
        hasShowSummary: false, // 是否显示表位合计行
        border: false, // 是否带有纵向边框，默认为false
        hasSelect: false, // 有无选中功能
        hasOperation: true // 有无操作功能
        // hasShowNum: true // 是否显示序号
        // data: [] // 表格内容数据
      }
      if (this.device === 'mobile') {
        this.$set(table, 'hasExpand', true) // 有无展开行功能
        this.$set(table, 'hasShowNum', false) // 是否显示序号
        const tr = [
          { id: '1', label: '日期', prop: 'TBACKDATE' },
          { id: '2', label: '时间', prop: 'TBACKTIME' },
          { id: '3', label: '客户账号', prop: 'CUTSNAME' },
          { id: '4', label: '登记信息', prop: 'DOCTYPE' },
          { id: '5', label: '备注', prop: 'CAUSE' },
          { id: '6', label: '柜员号（登记时）', prop: 'TELLERNO2' },
          { id: '7', label: '登记流水号', prop: 'MAINSERIALNO2', width: '50' },
          { id: '8', label: '领取日期', prop: 'RECEIVEDATE' },
          { id: '9', label: '领取时间', prop: 'RECEIVETIME', width: '103' },
          { id: '10', label: '柜员号（领取时）', prop: 'TELLERNO1', width: '105' },
          { id: '11', label: '领取流水号', prop: 'MAINSERIALNO1', width: '105' },
          { id: '12', label: '机构号', prop: 'BRNO', width: '105' },
          { id: '13', label: '机构名称', prop: 'BRNAME', width: '105' },
          {
            id: '14',
            label: '客户签名（领取时）',
            prop: 'imgSrc1',
            width: '105',
            show: 'template',
            moduleType: 'image'
          }
        ]
        const expands = [
          {
            label: '机构号：',
            prop: 'branchNo'
          }, {
            label: '证件类型：',
            prop: 'identTypeLabel'
          }, {
            label: '证件号码：',
            prop: 'identNo'
          }, {
            label: '性别：',
            prop: 'genderLabel'
          }, {
            label: '登录方式：',
            prop: 'loginTypeLabel'
          }, {
            label: '联系电话：',
            prop: 'tel'
          }, {
            label: '电子邮箱：',
            prop: 'email'
          }, {
            label: '用户状态：',
            prop: 'userStatusLabel'
          }
        ]
        const operation = { // 操作功能
          label: '操作', // 操作列的行首文字
          // width: '80', // 操作列的宽度
          className: '', // 操作列的class名
          data: [ // 操作列数据
            {
              label: '', // 按钮文字
              Fun: 'handleEdit', // 点击按钮后触发的父组件事件
              size: 'mini', // 按钮大小
              icon: 'el-icon-edit', // 按钮样式
              id: '1' // 按钮循环组件的key值
            }, {
              label: '', // 按钮文字
              Fun: 'handleDel', // 点击按钮后触发的父组件事件
              size: 'mini', // 按钮大小
              icon: 'el-icon-delete', // 按钮样式
              id: '2' // 按钮循环组件的key值
            }, {
              label: '', // 按钮文字
              Fun: 'handleView', // 点击按钮后触发的父组件事件
              size: 'mini', // 按钮大小
              icon: 'el-icon-view', // 按钮样式
              id: '3' // 按钮循环组件的key值
            }
          ]
        }
        this.$set(table, 'tr', tr) // 表格行数据
        this.$set(table, 'expands', expands) // 展开行数据
        this.$set(table, 'operation', operation) // 操作功能
      } else {
        this.$set(table, 'hasExpand', false) // 有无展开行功能
        this.$set(table, 'hasShowNum', true) // 是否显示序号
        const tr = [
          { id: '1', label: '日期', prop: 'TBACKDATE' },
          { id: '2', label: '时间', prop: 'TBACKTIME' },
          { id: '3', label: '客户账号', prop: 'CUTSNAME' },
          { id: '4', label: '登记信息', prop: 'DOCTYPE' },
          { id: '5', label: '备注', prop: 'CAUSE' },
          { id: '6', label: '柜员号（登记时）', prop: 'TELLERNO2' },
          { id: '7', label: '登记流水号', prop: 'MAINSERIALNO2', width: '50' },
          { id: '8', label: '领取日期', prop: 'RECEIVEDATE' },
          { id: '9', label: '领取时间', prop: 'RECEIVETIME', width: '103' },
          { id: '10', label: '柜员号（领取时）', prop: 'TELLERNO1', width: '105' },
          { id: '11', label: '领取流水号', prop: 'MAINSERIALNO1', width: '105' },
          { id: '12', label: '机构号', prop: 'BRNO', width: '105' },
          { id: '13', label: '机构名称', prop: 'BRNAME', width: '105' },
          {
            id: '14',
            label: '客户签名（领取时）',
            prop: 'imgSrc1',
            width: '105',
            show: 'template',
            moduleType: 'image'
          }
        ]
        // const expands = []
        const operation = { // 操作功能
          label: '操作', // 操作列的行首文字
          width: '120', // 操作列的宽度
          className: '', // 操作列的class名
          data: [ // 操作列数据
            {
              label: '编辑', // 按钮文字
              Fun: 'handleEdit', // 点击按钮后触发的父组件事件
              size: 'mini', // 按钮大小
              icon: 'el-icon-edit', // 按钮样式
              id: '1', // 按钮循环组件的key值
              method: (index, row) => {
                this.handleEdit(index, row)
              }
            }, {
              label: '删除', // 按钮文字
              Fun: 'handleDel', // 点击按钮后触发的父组件事件
              size: 'mini', // 按钮大小
              icon: 'el-icon-delete', // 按钮样式
              id: '2', // 按钮循环组件的key值
              method: (index, row) => {
                this.handleDel(index, row)
              }
            }
          ]
        }
        this.$set(table, 'tr', tr) // 表格行数据
        // this.$set(table, 'expands', []) // 展开行数据
        this.$set(table, 'operation', operation) // 操作功能
      }
      return table
    },
    device() {
      return this.$store.state.app.device
    }
  },
  mounted: function() {
    console.log(this.$route.params)
    const params = this.$route.params
    if (params) {
      this.tableData = this.$route.params.map.list
      console.log(this.tableData)
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
    inquire: function(inputForm) { // 查询
      this.currentPage = 1
      console.log('table : ' + JSON.stringify(this.dataTable))
      this.query(inputForm)
    },
    query: function(inputForm) { // 查询
      this.disabledPagination = false
      // this.$refs.form.validate(valid => {
      //   if (valid) {
      console.log('select => ' + this.inputForm)
      const params = {
        'inputForm': JSON.stringify(inputForm),
        'pageNum': this.currentPage,
        'pageSize': this.pagesize
      }
      // let params = {'userNo': this.userNo, 'userName': this.userName}
      this.$http(this.$userMngApi.getUserBaseInfo, params).then(// 通讯后台查询数据库中用户信息
        res => {
          const resdata = res.data
          if (resdata.code === 'SUCCESS') {
            if (resdata.data.TrxCode === '000000') {
              // 赋值
              this.pagesizes = resdata.data.PageInfo.total
              const list = resdata.data.PageInfo.list
              for (let i = 0; i < list.length; i++) {
                this.$set(list[i], 'identTypeLabel', this.selectLable(list[i].identType, this.identTypes))
                this.$set(list[i], 'genderLabel', this.selectLable(list[i].gender, this.genders))
                this.$set(list[i], 'loginTypeLabel', this.selectLable(list[i].loginType, this.loginTypes))
                this.$set(list[i], 'userStatusLabel', this.selectLable(list[i].userStatus, this.status))
              }
              console.log(list)
              this.tableData = list
            } else {
              this.tableData = []
              this.$message.error('错误信息 ： ' + resdata.data.TrxMessage)
            }
          } else {
            this.tableData = []
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
    handleView: function(row, expandedRows) { // 选中表格数据
      console.log('row => ' + JSON.stringify(row))
      console.log('expandedRows => ' + JSON.stringify(expandedRows))
      console.log('expands => ' + this.expandKeys)
      if (this.expandKeys.indexOf(expandedRows.userNo) < 0) {
        this.expandKeys = []
        this.expandKeys.push(expandedRows.userNo)
      } else {
        this.expandKeys = []
      }
    },
    onRowdbClick: function(row, expandedRows) { // 选中表格数据
      console.log('row => ' + JSON.stringify(row))
      console.log('expandedRows => ' + JSON.stringify(expandedRows))
      console.log('expands => ' + this.expandKeys)
      if (this.expandKeys.indexOf(expandedRows.userNo) < 0) {
        this.expandKeys = []
        this.expandKeys.push(expandedRows.userNo)
      } else {
        this.expandKeys = []
      }
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
    handleDel(index, rows) { // 删除
      const userNos = []
      const roleMap = JSON.parse(JSON.stringify(this.tableData[index]))
      console.log('roleMap => ' + JSON.stringify(roleMap))
      userNos.push(roleMap.userNo)
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
    handleEdit(index, rows) { // 修改
      this.$router.push({
        path: this.redirect || '/T10011',
        name: 'T10011',
        params: {
          userEquipment: '修改',
          map: this.tableData[index]
        }
      })
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
    }
  }
}
</script>

<style scoped>
</style>
<style>
  @import "../../../styles/public.css";

  /*.demo-table-expand {*/
  /*font-size: 0;*/
  /*}*/

  /*.demo-table-expand label {*/
  /*width: 80px;*/
  /*color: #99a9bf;*/
  /*}*/

  /*.demo-table-expand .el-form-item {*/
  /*margin-right: 0;*/
  /*margin-bottom: 0;*/
  /*}*/

  /*.el-table__expanded-cell[class*=cell] {*/
  /*text-align: left;*/
  /*}*/

  .input-with-select .el-input-group__prepend {
    width: 20%;
    background-color: #fff;
  }
  /*.el-button--mini, .el-button--mini.is-round {*/
  /*padding: 4px 3px;*/
  /*font-size: 10px;*/
  /*}*/
  /*.el-table__expanded-cell[class*=cell] {*/
  /*}*/

  /*.el-table__expand-icon {*/
  /*visibility: hidden;*/
  /*}*/
  /*.el-button+.el-button {*/
  /*margin-left: 5px;*/
  /*}*/
  /*.el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {*/
  /*padding-left: 5px;*/
  /*}*/
</style>
