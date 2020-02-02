<template>
  <el-main>
    <div class="demo-form-div">
      <el-row class="ecms-trx-result">
        <tl-table
          :table="dataTable"
          :data="tableData"
          :pagesizes="pagesizes"
          :expand-keys="expandKeys"
          :id="id"
          :disabled-pagination="disabledPagination"
          @handleCurrentChange="handleCurrentChange"
          @handleSelectionChange="handleSelectionChange"
          @onRowdbClick="onRowdbClick"
          @handleSizeChange="handleSizeChange"/>
      </el-row>
      <div class="dialog-footer" style="width: 100%;" align="right">
        <el-row>
          <el-col :span="8">
            <el-button size="medium" type="primary" @click="exitTrade()">{{ '退出' }}</el-button>
          </el-col>
          <el-col :span="8">
            <el-button size="medium" type="primary" @click="export2Excel">{{ '导出' }}</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </el-main>
</template>

<script>
export default {
  name: 'T555301',
  data() {
    return {
      tableData: [], // 用户信息
      currentPage: 1, // 初始页
      pagesize: 10, // 每页显示条数
      pagesizes: this.$route.params.totalNum, // this.$route.params.map.total, // 总条数
      expandKeys: [],
      id: 'userNo',
      disabledPagination: false,
      OPERATIONTYPES: this.$combo.operationTypes5553
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
        hasOperation: false // 有无操作功能
        // hasShowNum: true // 是否显示序号
        // data: [] // 表格内容数据
      }
      if (this.device === 'mobile') { // 移动端
        this.$set(table, 'hasExpand', true) // 有无展开行功能
        this.$set(table, 'hasShowNum', false) // 是否显示序号
        const tr = [
          { id: '1', label: '登记日期', prop: 'REGISTERDATE' },
          { id: '2', label: '登记时间', prop: 'REGISTERTIME' },
          { id: '3', label: '操作类型', prop: 'OPERATIONTYPE' },
          { id: '4', label: '档案种类', prop: 'ARCHIVESTYPE' },
          { id: '5', label: '保管期限', prop: 'CUSTODYPERIOD' },
          { id: '6', label: '档案入库日期', prop: 'ARCHIVESINDATE' },
          { id: '7', label: '档案名称', prop: 'ARCHIVESNAME' },
          { id: '8', label: '档案编号', prop: 'ARCHIVESNUMBER' },
          { id: '9', label: '档案数量', prop: 'NUMBERS' },
          { id: '10', label: '档案日期', prop: 'ARCHIVESDATE' },
          { id: '11', label: '保管员', prop: 'CUSTODIAN' },
          { id: '12', label: '档案入库流水号', prop: 'WAREMAINSERIALNO' },
          { id: '13', label: '入库经办柜员号', prop: 'WARETELLERNO' },
          { id: '14', label: '入库经办柜员名称', prop: 'WARETELLERNAME' },
          { id: '15', label: '入库说明', prop: 'BEIYONG1' },
          { id: '16', label: '调阅日期', prop: 'READERDATE' },
          { id: '17', label: '调阅单位', prop: 'REVIEWUNIT' },
          { id: '18', label: '调阅人', prop: 'READER' },
          { id: '19', label: '调阅人证件号码', prop: 'READERIDNO' },
          { id: '20', label: '批准人', prop: 'APPROVER' },
          { id: '21', label: '协查人', prop: 'SUPERVISER' },
          { id: '22', label: '归还日期', prop: 'RETURNDATE' },
          { id: '23', label: '档案调阅流水号', prop: 'REVIEWMAINSERIALNO' },
          { id: '24', label: '调阅经办柜员号', prop: 'REVIEWTELLERNO' },
          { id: '25', label: '调阅经办柜员名称', prop: 'REVIEWTELLERNAME' },
          { id: '26', label: '调阅说明', prop: 'BEIYONG2' },
          { id: '27', label: '销毁日期', prop: 'DESTROYDATE' },
          { id: '28', label: '销毁文号', prop: 'DESTROYNO' },
          { id: '29', label: '档案销毁流水号', prop: 'DESMAINSERIALNO' },
          { id: '30', label: '销毁经办柜员号', prop: 'DESTELLERNO' },
          { id: '31', label: '销毁经办柜员名称', prop: 'DESTELLERNAME' },
          { id: '32', label: '销毁说明', prop: 'BEIYONG3' },
          { id: '33', label: '机构号', prop: 'BRNO' },
          { id: '34', label: '机构名称', prop: 'BRNAME' },
          { id: '35', label: '维护状态', prop: 'WFLAG' }
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
        const tr = [
          { id: '1', label: '登记日期', prop: 'REGISTERDATE' },
          { id: '2', label: '登记时间', prop: 'REGISTERTIME' },
          { id: '3', label: '操作类型', prop: 'OPERATIONTYPE' },
          { id: '4', label: '档案种类', prop: 'ARCHIVESTYPE' },
          { id: '5', label: '保管期限', prop: 'CUSTODYPERIOD' },
          { id: '6', label: '档案入库日期', prop: 'ARCHIVESINDATE' },
          { id: '7', label: '档案名称', prop: 'ARCHIVESNAME' },
          { id: '8', label: '档案编号', prop: 'ARCHIVESNUMBER' },
          { id: '9', label: '档案数量', prop: 'NUMBERS' },
          { id: '10', label: '档案日期', prop: 'ARCHIVESDATE' },
          { id: '11', label: '保管员', prop: 'CUSTODIAN' },
          { id: '12', label: '档案入库流水号', prop: 'WAREMAINSERIALNO' },
          { id: '13', label: '入库经办柜员号', prop: 'WARETELLERNO' },
          { id: '14', label: '入库经办柜员名称', prop: 'WARETELLERNAME' },
          { id: '15', label: '入库说明', prop: 'BEIYONG1' },
          { id: '16', label: '调阅日期', prop: 'READERDATE' },
          { id: '17', label: '调阅单位', prop: 'REVIEWUNIT' },
          { id: '18', label: '调阅人', prop: 'READER' },
          { id: '19', label: '调阅人证件号码', prop: 'READERIDNO' },
          { id: '20', label: '批准人', prop: 'APPROVER' },
          { id: '21', label: '协查人', prop: 'SUPERVISER' },
          { id: '22', label: '归还日期', prop: 'RETURNDATE' },
          { id: '23', label: '档案调阅流水号', prop: 'REVIEWMAINSERIALNO' },
          { id: '24', label: '调阅经办柜员号', prop: 'REVIEWTELLERNO' },
          { id: '25', label: '调阅经办柜员名称', prop: 'REVIEWTELLERNAME' },
          { id: '26', label: '调阅说明', prop: 'BEIYONG2' },
          { id: '27', label: '销毁日期', prop: 'DESTROYDATE' },
          { id: '28', label: '销毁文号', prop: 'DESTROYNO' },
          { id: '29', label: '档案销毁流水号', prop: 'DESMAINSERIALNO' },
          { id: '30', label: '销毁经办柜员号', prop: 'DESTELLERNO' },
          { id: '31', label: '销毁经办柜员名称', prop: 'DESTELLERNAME' },
          { id: '32', label: '销毁说明', prop: 'BEIYONG3' },
          { id: '33', label: '机构号', prop: 'BRNO' },
          { id: '34', label: '机构名称', prop: 'BRNAME' },
          { id: '35', label: '维护状态', prop: 'WFLAG' }
        ]
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
        this.$set(table, 'operation', operation) // 操作功能
        this.$set(table, 'hasExpand', true) // 有无展开行功能
        this.$set(table, 'expands', []) // 展开行数据
        this.$set(table, 'hasShowNum', false) // 是否显示序号
      }
      return table
    },
    device() {
      return this.$store.state.app.device
    }
  },
  mounted: function() {
    const params = this.$route.params
    if (params) {
      const list = this.$route.params.map.list
      for (let i = 0; i < list.length; i++) {
        this.$set(list[i], 'OPERATIONTYPE', this.selectLable(list[i].OPERATIONTYPE, this.OPERATIONTYPES))
      }
      this.tableData = list
      console.log(this.tableData)
    }
  },
  methods: {
    exitTrade() { // 交易退出返回首页
      this.$router.push({
        path: this.redirect || '/dashboard'
      })
    },
    export2Excel() { // 需要安装依赖 npm install -S file-saver xlsx以及npm install -D script-loader
      require.ensure([], () => {
        const { exportJsonToExcel } = require('../../../utils/Export2Excel')
        const tHeader = ['登记日期', '登记时间', '操作类型', '档案种类', '保管期限', '档案入库日期', '档案名称', '档案编号', '档案数量',
          '档案日期', '保管员', '档案入库流水号', '入库经办柜员号', '入库经办柜员名称', '入库说明', '调阅日期', '调阅单位', '调阅人',
          '调阅人证件号码', '批准人', '协查人', '归还日期', '档案调阅流水号', '调阅经办柜员号', '调阅经办柜员名称', '调阅说明', '销毁日期',
          '销毁文号', '档案销毁流水号', '销毁经办柜员号', '销毁经办柜员名称', '销毁说明', '机构号', '机构名称', '维护状态']// 表头
        // 表头对应字段名，要和下面数据key对应
        const filterVal = ['REGISTERDATE', 'REGISTERTIME', 'OPERATIONTYPE', 'ARCHIVESTYPE', 'CUSTODYPERIOD',
          'ARCHIVESINDATE', 'ARCHIVESNAME', 'ARCHIVESNUMBER', 'NUMBERS', 'ARCHIVESDATE', 'CUSTODIAN', 'WAREMAINSERIALNO',
          'WARETELLERNO', 'WARETELLERNAME', 'BEIYONG1', 'READERDATE', 'REVIEWUNIT', 'READER', 'READERIDNO', 'APPROVER',
          'SUPERVISER', 'RETURNDATE', 'REVIEWMAINSERIALNO', 'REVIEWTELLERNO', 'REVIEWTELLERNAME', 'BEIYONG2',
          'DESTROYDATE', 'DESTROYNO', 'DESMAINSERIALNO', 'DESTELLERNO', 'DESTELLERNAME', 'BEIYONG3', 'BRNO', 'BRNAME',
          'WFLAG'
        ]
        const list = this.tableData // 数据来源
        const data = this.formatJson(filterVal, list) // 数据格式化
        var index1 = '会计档案登记簿'// 导出时文件名
        exportJsonToExcel(tHeader, data, index1) // 导出文件
      })
    },
    // 数据格式化
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    queryTDataByPageSizeAndNum(pageNum, pageSize) {
      console.log('T5503 queryTDataByPageSizeAndNum :' + pageNum + '|' + pageSize)
      const map = {
        'acctNo': this.$route.params.acctNo,
        'acctName': this.$route.params.acctName, 'operation': '2'
      }
      const params1 = { 'ruleForm': JSON.stringify(map), 'currentPage': pageNum, 'pageSize': pageSize }
      const url1 = this.$registerBookApi.getCustdocRegister
      this.$http(url1, params1).then( // 通讯后台修改数据库中信息
        res1 => {
          const _data1 = res1.data
          // 赋值
          if (_data1.code === 'SUCCESS') {
            if (_data1.data.TrxCode === '000000') {
              const pageInfo = _data1.data.PageInfo.list
              for (let i = 0; i < pageInfo.length; i++) {
                if (pageInfo[i].OPERATION === '0') {
                  pageInfo[i].OPERATION = '0-查询'
                } else if (pageInfo[i].OPERATION === '1') {
                  pageInfo[i].OPERATION = '1-领取'
                } else if (pageInfo[i].OPERATION === '2') {
                  pageInfo[i].OPERATION = '2-登记'
                }
              }
              this.tableData = _data1.data.PageInfo.list
            } else {
              if (_data1.data.TrxCode === 'T5501_001') {
                this.messageWarning('已无登记记录,请返回')
                return
              } else {
                this.messageError('错误信息 ： ' + _data1.data.TrxMessage)
                return
              }
            }
          } else {
            this.messageError('错误信息 ： ' + _data1.message)
            return
          }
        })
    },
    selectLable: function(key, list) {
      for (let i = 0; i < list.length; i++) {
        const value = list[i].value
        if (key === value) {
          return list[i].label
        }
      }
    },
    handleSelectionChange(val) { // 选中表格数据1
      this.val = val
      this.multipleSelection = val
    },
    onRowdbClick: function(row) { // 表格双击事件
      // 影响查询，暂不支持
      /*
      this.$router.push({
        path: this.redirect || '/T5501',
        name: 'T5501',
        params: {
          __map: row,
        }
      })
      */
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pagesize = size // 每页下拉显示数据
      this.queryTDataByPageSizeAndNum(this.currentPage, this.pagesize)
    },
    handleCurrentChange: function(currentPage) { // 翻页
      this.currentPage = currentPage // 点击第几页
      this.queryTDataByPageSizeAndNum(this.currentPage, this.pagesize)
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
