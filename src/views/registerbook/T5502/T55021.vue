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
  name: 'T55021',
  data() {
    return {
      tableData: [], // 用户信息
      currentPage: 1, // 初始页
      pagesize: 10, // 每页显示条数
      pagesizes: this.$route.params.totalNum, // this.$route.params.map.total, // 总条数
      expandKeys: [],
      id: 'userNo',
      disabledPagination: false,
      SELECTTYPES: [{
        value: '0',
        label: '0-客户'
      }, {
        value: '1',
        label: '1-柜员'
      }, {
        value: '2',
        label: '2-有权机构'
      }]
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
          { id: '1', label: '登记日期', prop: 'TRADEDATE' },
          { id: '2', label: '登记时间', prop: 'TRADETIME' },
          { id: '3', label: '操作类型', prop: 'SELECTTYPE' },
          { id: '4', label: '客户类型', prop: 'CUSTMTYPE' },
          { id: '5', label: '单位名称', prop: 'EMPLOYER' },
          { id: '6', label: '查询人姓名1', prop: 'NAME1' },
          { id: '7', label: '查询人姓名2', prop: 'NAME2' },
          { id: '8', label: '法律文书名称', prop: 'LAWNAME' },
          { id: '9', label: '文号', prop: 'LAWNO' },
          { id: '10', label: '被查询人名称', prop: 'NAME3' },
          { id: '11', label: '被查询人证件类型', prop: 'IDTYPE3' },
          { id: '12', label: '凭证类型', prop: 'ACCTYPE' },
          { id: '13', label: '被查询人账号', prop: 'ACCNO' },
          { id: '14', label: '查询结果', prop: 'CAUSE' },
          { id: '15', label: '机构号', prop: 'BRNO' },
          { id: '16', label: '机构名称', prop: 'BRNAME' },
          { id: '17', label: '经办柜员号', prop: 'TELLERNO' },
          { id: '18', label: '经办柜员名称', prop: 'TELLERNAME' },
          { id: '19', label: '授权柜员号', prop: 'BEIYONG1' },
          { id: '20', label: '授权柜员名称', prop: 'BEIYONG2' },
          { id: '21', label: '查询内容', prop: 'BEIYONG3' },
          { id: '22', label: '流水号', prop: 'MAINSERIALNO' },
          { id: '23', label: '说明', prop: 'ILLUSTRATE' }
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
          { id: '1', label: '登记日期', prop: 'TRADEDATE' },
          { id: '2', label: '登记时间', prop: 'TRADETIME' },
          { id: '3', label: '操作类型', prop: 'SELECTTYPE' },
          { id: '4', label: '客户类型', prop: 'CUSTMTYPE' },
          { id: '5', label: '单位名称', prop: 'EMPLOYER' },
          { id: '6', label: '查询人姓名1', prop: 'NAME1' },
          { id: '7', label: '查询人姓名2', prop: 'NAME2' },
          { id: '8', label: '法律文书名称', prop: 'LAWNAME' },
          { id: '9', label: '文号', prop: 'LAWNO' },
          { id: '10', label: '被查询人名称', prop: 'NAME3' },
          { id: '11', label: '被查询人证件类型', prop: 'IDTYPE3' },
          { id: '12', label: '凭证类型', prop: 'ACCTYPE' },
          { id: '13', label: '被查询人账号', prop: 'ACCNO' },
          { id: '14', label: '查询结果', prop: 'CAUSE' },
          { id: '15', label: '机构号', prop: 'BRNO' },
          { id: '16', label: '机构名称', prop: 'BRNAME' },
          { id: '17', label: '经办柜员号', prop: 'TELLERNO' },
          { id: '18', label: '经办柜员名称', prop: 'TELLERNAME' },
          { id: '19', label: '授权柜员号', prop: 'BEIYONG1' },
          { id: '20', label: '授权柜员名称', prop: 'BEIYONG2' },
          { id: '21', label: '查询内容', prop: 'BEIYONG3' },
          { id: '22', label: '流水号', prop: 'MAINSERIALNO' },
          { id: '23', label: '说明', prop: 'ILLUSTRATE' }
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
        if (tr[2].prop === '0') {
          tr.prop = '客户'
        }
        console.log('tr---------> ' + tr[2].prop)
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
      console.log(list)
      for (let i = 0; i < list.length; i++) {
        this.$set(list[i], 'SELECTTYPE', this.selectLable(list[i].SELECTTYPE, this.SELECTTYPES))
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
        const tHeader = ['登记日期', '登记时间', '操作类型', '客户类型', '单位名称', '查询人姓名1', '查询人姓名2', '法律文书名称', '文号',
          '被查询人名称', '被查询人证件类型', '凭证类型', '被查询人账号', '查询结果', '机构号', '机构名称', '经办柜员号', '经办柜员名称',
          '授权柜员号', '授权柜员名称', '查询内容', '流水号', '说明']// 表头
        // 表头对应字段名，要和下面数据key对应
        const filterVal = ['TRADEDATE', 'TRADETIME', 'SELECTTYPE', 'CUSTMTYPE', 'EMPLOYER', 'NAME1', 'NAME2', 'LAWNAME',
          'LAWNO', 'NAME3', 'IDTYPE3', 'ACCTYPE', 'ACCNO', 'CAUSE', 'BRNO', 'BRNAME', 'TELLERNO',
          'TELLERNAME', 'BEIYONG1', 'BEIYONG2', 'BEIYONG3', 'MAINSERIALNO', 'ILLUSTRATE']
        const list = this.tableData // 数据来源
        const data = this.formatJson(filterVal, list) // 数据格式化
        var index1 = '存款查询登记簿'// 导出时文件名
        exportJsonToExcel(tHeader, data, index1) // 导出文件
      })
    },
    // 数据格式化
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    queryTDataByPageSizeAndNum(pageNum, pageSize) {
      console.log('T5502 getXRPISDEPOSITREGISTER :' + pageNum + '|' + pageSize)
      const params1 = { 'STARTDATE': this.$route.params.STARTDATE, 'ENDDATE': this.$route.params.ENDDATE, 'BRNO': this.$route.params.BRNO, 'BRANCHLEVEL': this.$route.params.BRANCHLEVEL, 'TELLERNO': this.$route.params.TELLERNO,
        'SELECTTYPE': this.$route.params.SELECTTYPE, 'EMPLOYER': this.$route.params.EMPLOYER, 'LAWNAME': this.$route.params.LAWNAME, 'LAWNO': this.$route.params.LAWNO,
        'NAME3': this.$route.params.NAME3, 'IDTYPE3': this.$route.params.IDTYPE3, 'IDNO3': this.$route.params.IDNO3, 'ACCTYPE': this.$route.params.ACCTYPE,
        'ACCNO': this.$route.params.ACCNO, 'CUSTMTYPE': this.$route.params.CUSTMTYPE, 'currentPage': pageNum, 'pageSize': pageSize }
      const url1 = this.$reportMngApi.getXRPISDEPOSITREGISTER
      this.$http(url1, params1).then( // 通讯后台修改数据库中信息
        res1 => {
          const _data1 = res1.data
          // 赋值
          if (_data1.code === 'SUCCESS') {
            if (_data1.data.TrxCode === '000000') {
              const list = _data1.data.PageInfo.list
              for (let i = 0; i < list.length; i++) {
                this.$set(list[i], 'SELECTTYPE', this.selectLable(list[i].SELECTTYPE, this.SELECTTYPES))
              }
              this.tableData = list
            } else {
              if (_data1.data.TrxCode === 'T5502_01') {
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
