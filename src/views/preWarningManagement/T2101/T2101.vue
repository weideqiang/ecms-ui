<template>
  <el-main>
    <tl-input
      :input="input"
      @inquire="inquire"/>
    <br>
    <el-row class="ecms-trx-result">
      <tl-table
        :table="dataTable"
        :data="tableData"
        :current-page="currentPage"
        :pagesizes="pagesizes"
        :expand-keys="expandKeys"
        :id="id"
        :disabled-pagination="disabledPagination"
        @handleCurrentChange="handleCurrentChange"
        @handleEdit="handleEdit"
        @handleSelectionChange="handleSelectionChange"
        @handleView="handleView"
        @handleSizeChange="handleSizeChange"/>
    </el-row>
  </el-main>
</template>

<script>
export default {
  name: 'T2101',
  data() {
    return {
      searchable: {
        type: Boolean,
        default: false
      },
      searchPlace: {
        type: String,
        default: 'top'
      },
      inputForm: {},
      inputRules: {},
      tableData: [], // 用户信息
      currentPage: 1, // 初始页
      pagesize: 10, // 每页显示条数
      pagesizes: 0, // 总条数
      expandKeys: [],
      id: 'userNo',
      val: [],
      identTypeDemo: '1',
      disabledPagination: true
      // userTypes: [],
    }
  },
  computed: {
    input() {
      const input = {}
      this.$set(input, 'tableHeader', this.tableHeader) // 表格行数据
      return input
    },
    dataTable() {
      const table = {
        currentPage: 1, // 初始页
        pagesize: 10, // 每页显示条数
        date: this.pagesizes, // 总条数
        hasMergeRowOrColumn: false, // 是否合并单元格
        loading: false, // 加载中动画
        hasShowSummary: false, // 是否显示表位合计行
        border: false, // 是否带有纵向边框，默认为false
        hasSelect: false, // 有无选中功能
        hasOperation: true // 有无操作功能
        // hasShowNum: true // 是否显示序号
      }
      console.log('pagesizes--->' + table.date)
      if (this.device === 'mobile') {
        this.$set(table, 'hasExpand', true) // 有无展开行功能
        this.$set(table, 'hasShowNum', false) // 是否显示序号
        const tr = [
          { id: '1', label: '交易日期', prop: 'WORKDATE' },
          { id: '2', label: '交易时间', prop: 'TRADETIME' },
          { id: '3', label: '预警类型', prop: 'YJ_TYPE' },
          { id: '4', label: '机构号', prop: 'BRNO' },
          { id: '5', label: '柜员号', prop: 'TELLERNO' },
          { id: '6', label: '流水号', prop: 'MAINSERIALNO' },
          { id: '7', label: '交易代码', prop: 'TRADENO' },
          { id: '8', label: '交易名称', prop: 'TRADENAME' },
          { id: '9', label: '凭证类型', prop: 'ACCTYPE' },
          { id: '10', label: '金额', prop: 'AMOUNT' },
          { id: '11', label: '账户属性', prop: 'ACCATTRIBUTE' },
          { id: '12', label: '产品代码', prop: 'PRODUCT' },
          { id: '13', label: '存期', prop: 'TERM' },
          { id: '14', label: '客户证件类型', prop: 'IDTYPE' },
          { id: '15', label: '客户证件类型(辅助)', prop: 'CUST_IDTYPE_FZ' },
          { id: '16', label: '客户证件号码', prop: 'IDNO' },
          { id: '17', label: '客户证件号码(辅助)', prop: 'CUST_IDNO_FZ' },
          { id: '18', label: '客户核查结果', prop: 'CUST_CHECK_RESULT' },
          { id: '19', label: '客户类型', prop: 'CUSTTYPE' },
          { id: '20', label: '客户号', prop: 'CUSTNO' },
          { id: '21', label: '客户姓名', prop: 'CUSTNAME' },
          { id: '22', label: '代理人姓名', prop: 'AGTNAME' },
          { id: '23', label: '代理人证件类型', prop: 'AGTIDTYPE' },
          { id: '24', label: '代理人证件类型(辅助)', prop: 'AGENT_IDTYPE_FZ' },
          { id: '25', label: '代理人证件号码', prop: 'AGENT_IDNO' },
          { id: '26', label: '代理人证件号码(辅助)', prop: 'AGENT_IDNO_FZ' },
          { id: '27', label: '代理人核查结果', prop: 'AGENT_CHECK_RESULT' },
          { id: '28', label: '代理人民族', prop: 'AGENT_NATION' },
          { id: '29', label: '代理人地址', prop: 'AGTADRESS' },
          { id: '30', label: '交易状态', prop: 'TRADESTATUS' },
          { id: '31', label: '授权员', prop: 'AUTHTELLER' },
          { id: '32', label: '本地复核员', prop: 'CHECKNO' },
          { id: '33', label: '预警状态', prop: 'STATUS' }
        ]
        const expands = [
          {
            label: '预警类型：',
            prop: 'YJ_TYPE'
          }, {
            label: '预警状态：',
            prop: 'YJ_STATUS'
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
          { id: '1', label: '交易日期', prop: 'WORKDATE' },
          { id: '2', label: '交易时间', prop: 'TRADETIME' },
          { id: '3', label: '预警类型', prop: 'YJ_TYPE' },
          { id: '4', label: '机构号', prop: 'BRNO' },
          { id: '5', label: '柜员号', prop: 'TELLERNO' },
          { id: '6', label: '流水号', prop: 'MAINSERIALNO' },
          { id: '7', label: '交易代码', prop: 'TRADENO' },
          { id: '8', label: '交易名称', prop: 'TRADENAME' },
          { id: '9', label: '凭证类型', prop: 'ACCTYPE' },
          { id: '10', label: '金额', prop: 'AMOUNT' },
          { id: '11', label: '账户属性', prop: 'ACCATTRIBUTE' },
          { id: '12', label: '产品代码', prop: 'PRODUCT' },
          { id: '13', label: '存期', prop: 'TERM' },
          { id: '14', label: '客户证件类型', prop: 'IDTYPE' },
          { id: '15', label: '客户证件类型(辅助)', prop: 'CUST_IDTYPE_FZ' },
          { id: '16', label: '客户证件号码', prop: 'IDNO' },
          { id: '17', label: '客户证件号码(辅助)', prop: 'CUST_IDNO_FZ' },
          { id: '18', label: '客户核查结果', prop: 'CUST_CHECK_RESULT' },
          { id: '19', label: '客户类型', prop: 'CUSTTYPE' },
          { id: '20', label: '客户号', prop: 'CUSTNO' },
          { id: '21', label: '客户姓名', prop: 'CUSTNAME' },
          { id: '22', label: '代理人姓名', prop: 'AGTNAME' },
          { id: '23', label: '代理人证件类型', prop: 'AGTIDTYPE' },
          { id: '24', label: '代理人证件类型(辅助)', prop: 'AGENT_IDTYPE_FZ' },
          { id: '25', label: '代理人证件号码', prop: 'AGENT_IDNO' },
          { id: '26', label: '代理人证件号码(辅助)', prop: 'AGENT_IDNO_FZ' },
          { id: '27', label: '代理人核查结果', prop: 'AGENT_CHECK_RESULT' },
          { id: '28', label: '代理人国籍', prop: 'AGENT_NATION' },
          { id: '29', label: '代理人地址', prop: 'AGTADRESS' },
          { id: '30', label: '交易状态', prop: 'TRADESTATUS' },
          { id: '31', label: '授权员', prop: 'AUTHTELLER' },
          { id: '32', label: '本地复核员', prop: 'CHECKNO' },
          { id: '33', label: '预警状态', prop: 'STATUS' }
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
            }
          ]
        }
        this.$set(table, 'tr', tr) // 表格行数据
        // this.$set(table, 'expands', []) // 展开行数据
        this.$set(table, 'operation', operation) // 操作功能
      }
      return table
    },
    tableHeader: function() {
      const key = [
        {
          value: 'YJ_TYPE',
          label: '预警类型',
          moduleType: 'select',
          list: this.$combo.YJ_TYPE
        }, {
          value: 'YJ_STATUS',
          label: '预警状态',
          moduleType: 'select',
          list: this.$combo.YJ_STATUS
        }]
      const key1 = [{
        value: 'YJ_TYPE',
        label: '预警类型',
        moduleType: 'select',
        list: this.$combo.YJ_TYPE
      }, {
        value: 'YJ_STATUS',
        label: '预警状态',
        moduleType: 'select',
        list: this.$combo.YJ_STATUS
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
    inquire: function(inputForm) { // 查询
      this.currentPage = 1
      // console.log('table : ' + JSON.stringify(this.dataTable))
      this.inputForm = inputForm
      this.quanbu()
    },
    quanbu: function() { // 查询全部条数
      const inputForm = this.inputForm
      const params = {
        'inputForm': JSON.stringify(inputForm)
      }
      this.$http(this.$warningMngApi.getWarnTrxData01, params).then(// 通讯后台查询数据库中用户信息
        res => {
          const resdata = res.data
          if (resdata.code === 'SUCCESS') {
            if (resdata.data.TrxCode === '000000') {
              // 赋值
              console.log('res--->' + resdata.data.PageInfo)
              this.pagesizes = resdata.data.PageInfo.total
              console.log('pagesizes--->' + this.pagesizes)
            }
          }
        }
      )
      console.log('----------1-----------')
      this.query()
    },
    query: function() { // 查询
      this.disabledPagination = false
      // this.$refs.form.validate(valid => {
      //   if (valid) {
      const inputForm = this.inputForm
      const params = {
        'inputForm': JSON.stringify(inputForm),
        'pageNum': this.currentPage,
        'pageSize': this.pagesize
      }
      console.log('----------2-----------')
      // let params = {'userNo': this.userNo, 'userName': this.userName}
      this.$http(this.$warningMngApi.getWarnTrxData, params).then(// 通讯后台查询数据库中用户信息
        res => {
          console.log('----------3-----------')
          const resdata = res.data
          if (resdata.code === 'SUCCESS') {
            if (resdata.data.TrxCode === '000000') {
              // 赋值
              console.log('res--->' + resdata.data.PageInfo)
              const list = resdata.data.PageInfo.list
              for (let i = 0; i < list.length; i++) {
                if (list[i].YJ_TYPE === 'YDKH') {
                  list[i].YJ_TYPE = '异地开户'
                } else if (list[i].YJ_TYPE === 'AGENT') {
                  list[i].YJ_TYPE = '柜员代办'
                }
                if (list[i].STATUS === '0') {
                  list[i].STATUS = '差错'
                } else if (list[i].STATUS === '1') {
                  list[i].STATUS = '正常'
                } else if (list[i].STATUS === '2') {
                  list[i].STATUS = '下发'
                } else if (list[i].STATUS === '3') {
                  list[i].STATUS = '结束'
                }
                if (list[i].AGENT_CHECK_RESULT === '00') {
                  list[i].AGENT_CHECK_RESULT = '通过'
                }
                if (list[i].CUST_CHECK_RESULT === '00') {
                  list[i].CUST_CHECK_RESULT = '通过'
                }
                if (list[i].TRADESTATUS === '0') {
                  list[i].TRADESTATUS = '成功'
                }
              }
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
    handleEdit(index, rows) { // 修改
      this.$router.push({
        path: this.redirect || '/T210101',
        name: 'T210101',
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
