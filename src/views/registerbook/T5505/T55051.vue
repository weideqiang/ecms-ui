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
  name: 'T55051',
  data() {
    return {
      tableData: [], // 用户信息
      currentPage: 1, // 初始页
      pagesize: 10, // 每页显示条数
      pagesizes: this.$route.params.totalNum, // this.$route.params.map.total, // 总条数
      expandKeys: [],
      id: 'userNo',
      disabledPagination: false,
      TRANSFERMODES: [{
        value: '0',
        label: '0-U盘'
      }, {
        value: '1',
        label: '1-单位送达'
      }],
      CARDFLAGS: [{
        value: '0',
        label: '批开卡'
      }, {
        value: '1',
        label: '1-预制卡（折）'
      }, {
        value: '2',
        label: '2-非批开业务'
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
          { id: '1', label: '登记日期', prop: 'REGISTERDATE' },
          { id: '2', label: '登记时间', prop: 'REGISTERTIME' },
          { id: '3', label: '单位名称', prop: 'UNITNAME' },
          { id: '4', label: '代工账号', prop: 'PAYROLLACC' },
          { id: '5', label: '资料名称', prop: 'INFORNAME' },
          { id: '6', label: '批次号', prop: 'BATCHNUMBER' },
          { id: '7', label: '总户数', prop: 'CUSTAMOUNT' },
          { id: '8', label: '接收时间', prop: 'RECIEVEDATE' },
          { id: '9', label: '接收人1', prop: 'RECIPIENT1' },
          { id: '10', label: '接收人2', prop: 'RECIPIENT2' },
          { id: '11', label: '接收柜员号', prop: 'TELLERNO1' },
          { id: '12', label: '接收柜员名称', prop: 'TELLERNAME1' },
          { id: '13', label: '接收流水号', prop: 'MAINSERIALN01' },
          { id: '14', label: '说明1', prop: 'ILLUSTRATE1' },
          { id: '15', label: '传送方式', prop: 'TRANSFERMODE' },
          { id: '16', label: '卡折标志', prop: 'CARDFLAG' },
          { id: '17', label: '交出时间', prop: 'HANDOVERDATE' },
          { id: '18', label: '交出存折（卡）数量', prop: 'BANKBOOKNUMBER' },
          { id: '19', label: '交出人', prop: 'HANDOVERNAME' },
          { id: '20', label: '接收人', prop: 'RECIPIENT' },
          { id: '21', label: '机构号', prop: 'BRNO' },
          { id: '22', label: '机构名称', prop: 'BRNAME' },
          { id: '23', label: '交出柜员号', prop: 'TELLERNO' },
          { id: '24', label: '交出柜员名称', prop: 'TELLERNAME' },
          { id: '25', label: '交出流水号', prop: 'MAINSERIALNO' },
          { id: '26', label: '说明2', prop: 'ILLUSTRATE' }
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
          { id: '3', label: '单位名称', prop: 'UNITNAME' },
          { id: '4', label: '代工账号', prop: 'PAYROLLACC' },
          { id: '5', label: '资料名称', prop: 'INFORNAME' },
          { id: '6', label: '批次号', prop: 'BATCHNUMBER' },
          { id: '7', label: '总户数', prop: 'CUSTAMOUNT' },
          { id: '8', label: '接收时间', prop: 'RECIEVEDATE' },
          { id: '9', label: '接收人1', prop: 'RECIPIENT1' },
          { id: '10', label: '接收人2', prop: 'RECIPIENT2' },
          { id: '11', label: '接收柜员号', prop: 'TELLERNO1' },
          { id: '12', label: '接收柜员名称', prop: 'TELLERNAME1' },
          { id: '13', label: '接收流水号', prop: 'MAINSERIALN01' },
          { id: '14', label: '说明1', prop: 'ILLUSTRATE1' },
          { id: '15', label: '传送方式', prop: 'TRANSFERMODE' },
          { id: '16', label: '卡折标志', prop: 'CARDFLAG' },
          { id: '17', label: '交出时间', prop: 'HANDOVERDATE' },
          { id: '18', label: '交出存折（卡）数量', prop: 'BANKBOOKNUMBER' },
          { id: '19', label: '交出人', prop: 'HANDOVERNAME' },
          { id: '20', label: '接收人', prop: 'RECIPIENT' },
          { id: '21', label: '机构号', prop: 'BRNO' },
          { id: '22', label: '机构名称', prop: 'BRNAME' },
          { id: '23', label: '交出柜员号', prop: 'TELLERNO' },
          { id: '24', label: '交出柜员名称', prop: 'TELLERNAME' },
          { id: '25', label: '交出流水号', prop: 'MAINSERIALNO' },
          { id: '26', label: '说明2', prop: 'ILLUSTRATE' }
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
        this.$set(list[i], 'TRANSFERMODE', this.selectLable(list[i].TRANSFERMODE, this.TRANSFERMODES))
        this.$set(list[i], 'CARDFLAG', this.selectLable(list[i].CARDFLAG, this.CARDFLAGS))
      }
      this.tableData = list
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
        const filterVal = ['REGISTERDATE', 'REGISTERTIME', 'UNITNAME', 'PAYROLLACC', 'INFORNAME', 'BATCHNUMBER', 'CUSTAMOUNT', 'RECIEVEDATE', 'RECIPIENT1', 'RECIPIENT2', 'TELLERNO1', 'TELLERNAME1', 'MAINSERIALN01', 'ILLUSTRATE1', 'TRANSFERMODE', 'CARDFLAG', 'HANDOVERDATE', 'BANKBOOKNUMBER', 'HANDOVERNAME', 'RECIPIENT', 'BRNO', 'BRNAME', 'TELLERNO', 'TELLERNAME', 'MAINSERIALNO', 'ILLUSTRATE']
        const list = this.tableData // 数据来源
        const data = this.formatJson(filterVal, list) // 数据格式化
        var index1 = '代发工资登记簿'// 导出时文件名
        exportJsonToExcel(tHeader, data, index1) // 导出文件
      })
    },
    // 数据格式化
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    queryTDataByPageSizeAndNum(pageNum, pageSize) {
      console.log('T5505 getXRPISDEPOSITREGISTER :' + pageNum + '|' + pageSize)
      const params1 = { 'STARTDATE': this.$route.params.STARTDATE,
        'ENDDATE': this.$route.params.ENDDATE,
        'BRNO': this.$route.params.BRNO,
        'BRANCHLEVEL': this.$route.params.BRANCHLEVEL,
        'TELLERNO': this.$route.params.TELLERNO,
        'UNITNAME': this.$route.params.UNITNAME,
        'PAYROLLACC': this.$route.params.PAYROLLACC,
        'INFORNAME': this.$route.params.INFORNAME,
        'BATCHNUMBER': this.$route.params.BATCHNUMBER,
        'RECIEVEDATE': this.$route.params.RECIEVEDATE,
        'RECIPIENT1': this.$route.params.RECIPIENT1,
        'RECIPIENT2': this.$route.params.RECIPIENT2,
        'TRANSFERMODE': this.$route.params.TRANSFERMODE,
        'CARDFLAG': this.$route.params.CARDFLAG,
        'BANKBOOKNUMBER': this.$route.params.BANKBOOKNUMBER,
        'HANDOVERDATE': this.$route.params.HANDOVERDATE,
        'HANDOVERNAME': this.$route.params.HANDOVERNAME,
        'RECIPIENT': this.$route.params.RECIPIENT,
        'OPERATION': this.$route.params.OPERATION,
        'currentPage': pageNum,
        'pageSize': pageSize }
      const url1 = this.$reportMngApi.getXRPISPAYROLLREGISTER
      this.$http(url1, params1).then( // 通讯后台修改数据库中信息
        res1 => {
          const _data1 = res1.data
          // 赋值
          if (_data1.code === 'SUCCESS') {
            if (_data1.data.TrxCode === '000000') {
              const list = _data1.data.PageInfo.list
              for (let i = 0; i < list.length; i++) {
                this.$set(list[i], 'TRANSFERMODE', this.selectLable(list[i].TRANSFERMODE, this.TRANSFERMODES))
                this.$set(list[i], 'CARDFLAG', this.selectLable(list[i].CARDFLAG, this.CARDFLAGS))
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
