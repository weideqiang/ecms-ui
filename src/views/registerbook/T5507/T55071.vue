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
  name: 'T55071',
  data() {
    return {
      tableData: [], // 用户信息
      currentPage: 1, // 初始页
      pagesize: 10, // 每页显示条数
      pagesizes: this.$route.params.totalNum, // this.$route.params.map.total, // 总条数
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
        hasOperation: false // 有无操作功能
        // hasShowNum: true // 是否显示序号
        // data: [] // 表格内容数据
      }
      if (this.device === 'mobile') { // 移动端
        this.$set(table, 'hasExpand', true) // 有无展开行功能
        this.$set(table, 'hasShowNum', false) // 是否显示序号
        const tr = [
          { id: '1', label: '印章（物品）名称', prop: 'STAMPNAME' },
          { id: '2', label: '印章（物品）编号', prop: 'STAMPNUMBER' },
          { id: '3', label: '领用日', prop: 'COLLARDAY' },
          { id: '4', label: '领用交出人1', prop: 'COLLARJJR' },
          { id: '5', label: '领用交出人2', prop: 'COLLARJJR2' },
          { id: '6', label: '领用接收人1', prop: 'COOLARJSR' },
          { id: '7', label: '领用接收人2', prop: 'COOLARJSR2' },
          { id: '8', label: '领用监交人', prop: 'COOLARJJR1' },
          { id: '9', label: '启用日', prop: 'ENABLEDATE' },
          { id: '10', label: '启用交出人1', prop: 'ENABLEJJR' },
          { id: '11', label: '启用交出人2', prop: 'ENABLEJJR2' },
          { id: '12', label: '启用接收人1', prop: 'ENABLEJSR' },
          { id: '13', label: '启用接收人2', prop: 'ENABLEJSR2' },
          { id: '14', label: '启用监交人', prop: 'ENABLEJJR1' },
          { id: '15', label: '停用日', prop: 'STOPDAY' },
          { id: '16', label: '停用交出人1', prop: 'STOPJJR' },
          { id: '17', label: '停用交出人2', prop: 'STOPJJR2' },
          { id: '18', label: '停用接收人1', prop: 'STOPJSR' },
          { id: '19', label: '停用接收人2', prop: 'STOPJSR2' },
          { id: '20', label: '停用监交人', prop: 'STOPJJR1' },
          { id: '21', label: '上缴日', prop: 'TURNDATE' },
          { id: '22', label: '上缴交出人1', prop: 'TURNJJR' },
          { id: '23', label: '上缴交出人2', prop: 'TURNJJR2' },
          { id: '24', label: '上缴接收人1', prop: 'TURNJSR' },
          { id: '25', label: '上缴接收人2', prop: 'TURNJSR2' },
          { id: '26', label: '上缴监交人', prop: 'TURNJJR1' },
          { id: '27', label: '销毁日', prop: 'DESTRUCTIONDATE' },
          { id: '28', label: '销毁交出人1', prop: 'DESJJR' },
          { id: '29', label: '销毁交出人2', prop: 'DESJJR2' },
          { id: '30', label: '销毁接收人1', prop: 'DESJSR' },
          { id: '31', label: '销毁接收人2', prop: 'DESJSR2' },
          { id: '32', label: '销毁监交人', prop: 'DESJJR1' },
          { id: '33', label: '上缴部门', prop: 'ASSDEPARTMENT' },
          { id: '34', label: '交接日期', prop: 'HANDOVERDATE' },
          { id: '35', label: '交接时间', prop: 'HANDOVERTIME' },
          { id: '36', label: '交接记录', prop: 'HANDOVERRECORD' },
          { id: '37', label: '交出人1', prop: 'HANDOVER' },
          { id: '38', label: '交出人2', prop: 'HANDOVER2' },
          { id: '39', label: '接收人1', prop: 'SENDEE' },
          { id: '40', label: '接收人2', prop: 'SENDEE2' },
          { id: '41', label: '监交人', prop: 'SUPERVISOR' },
          { id: '42', label: '机构号', prop: 'BRNO' },
          { id: '43', label: '机构名称', prop: 'BRNAME' },
          { id: '44', label: '柜员号', prop: 'TELLERNO' },
          { id: '45', label: '柜员名称', prop: 'TELLERNAME' },
          { id: '46', label: '流水号', prop: 'MAINSERIALNO' },
          { id: '47', label: '说明', prop: '  ILLUSTRATE' }
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
          { id: '1', label: '印章（物品）名称', prop: 'STAMPNAME' },
          { id: '2', label: '印章（物品）编号', prop: 'STAMPNUMBER' },
          { id: '3', label: '领用日', prop: 'COLLARDAY' },
          { id: '4', label: '领用交出人1', prop: 'COLLARJJR' },
          { id: '5', label: '领用交出人2', prop: 'COLLARJJR2' },
          { id: '6', label: '领用接收人1', prop: 'COOLARJSR' },
          { id: '7', label: '领用接收人2', prop: 'COOLARJSR2' },
          { id: '8', label: '领用监交人', prop: 'COOLARJJR1' },
          { id: '9', label: '启用日', prop: 'ENABLEDATE' },
          { id: '10', label: '启用交出人1', prop: 'ENABLEJJR' },
          { id: '11', label: '启用交出人2', prop: 'ENABLEJJR2' },
          { id: '12', label: '启用接收人1', prop: 'ENABLEJSR' },
          { id: '13', label: '启用接收人2', prop: 'ENABLEJSR2' },
          { id: '14', label: '启用监交人', prop: 'ENABLEJJR1' },
          { id: '15', label: '停用日', prop: 'STOPDAY' },
          { id: '16', label: '停用交出人1', prop: 'STOPJJR' },
          { id: '17', label: '停用交出人2', prop: 'STOPJJR2' },
          { id: '18', label: '停用接收人1', prop: 'STOPJSR' },
          { id: '19', label: '停用接收人2', prop: 'STOPJSR2' },
          { id: '20', label: '停用监交人', prop: 'STOPJJR1' },
          { id: '21', label: '上缴日', prop: 'TURNDATE' },
          { id: '22', label: '上缴交出人1', prop: 'TURNJJR' },
          { id: '23', label: '上缴交出人2', prop: 'TURNJJR2' },
          { id: '24', label: '上缴接收人1', prop: 'TURNJSR' },
          { id: '25', label: '上缴接收人2', prop: 'TURNJSR2' },
          { id: '26', label: '上缴监交人', prop: 'TURNJJR1' },
          { id: '27', label: '销毁日', prop: 'DESTRUCTIONDATE' },
          { id: '28', label: '销毁交出人1', prop: 'DESJJR' },
          { id: '29', label: '销毁交出人2', prop: 'DESJJR2' },
          { id: '30', label: '销毁接收人1', prop: 'DESJSR' },
          { id: '31', label: '销毁接收人2', prop: 'DESJSR2' },
          { id: '32', label: '销毁监交人', prop: 'DESJJR1' },
          { id: '33', label: '上缴部门', prop: 'ASSDEPARTMENT' },
          { id: '34', label: '交接日期', prop: 'HANDOVERDATE' },
          { id: '35', label: '交接时间', prop: 'HANDOVERTIME' },
          { id: '36', label: '交接记录', prop: 'HANDOVERRECORD' },
          { id: '37', label: '交出人1', prop: 'HANDOVER' },
          { id: '38', label: '交出人2', prop: 'HANDOVER2' },
          { id: '39', label: '接收人1', prop: 'SENDEE' },
          { id: '40', label: '接收人2', prop: 'SENDEE2' },
          { id: '41', label: '监交人', prop: 'SUPERVISOR' },
          { id: '42', label: '机构号', prop: 'BRNO' },
          { id: '43', label: '机构名称', prop: 'BRNAME' },
          { id: '44', label: '柜员号', prop: 'TELLERNO' },
          { id: '45', label: '柜员名称', prop: 'TELLERNAME' },
          { id: '46', label: '流水号', prop: 'MAINSERIALNO' },
          { id: '47', label: '说明', prop: '  ILLUSTRATE' }
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
      this.tableData = this.$route.params.map.list
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
        const tHeader = ['印章（物品）名称', '印章（物品）编号', '领用日', '领用交出人1', '领用交出人2', '领用接收人1', '领用接收人2', '领用监交人', '启用日', '启用交出人1', '启用交出人2', '启用接收人1', '启用接收人2', '启用监交人', '停用日', '停用交出人1', '停用交出人2', '停用接收人1', '停用接收人2', '停用监交人', '上缴日', '上缴交出人1', '上缴交出人2', '上缴接收人1',
          '上缴接收人2', '上缴监交人', '销毁日', '销毁交出人1', '销毁交出人2', '销毁接收人1', '销毁接收人2', '销毁监交人', '上缴部门', '交接日期', '交接时间', '交接记录', '交出人1', '交出人2', '接收人1', '接收人2', '监交人', '机构号', '机构名称', '柜员号', '柜员名称', '流水号', '说明']// 表头
        // 表头对应字段名，要和下面数据key对应
        const filterVal = ['STAMPNAME', 'STAMPNUMBER', 'COLLARDAY', 'COLLARJJR', 'COLLARJJR2', 'COOLARJSR', 'COOLARJSR2', 'COOLARJJR1', 'ENABLEDATE', 'ENABLEJJR', 'ENABLEJJR2', 'ENABLEJSR', 'ENABLEJSR2', 'ENABLEJJR1', 'STOPDAY', 'STOPJJR', 'STOPJJR2', 'STOPJSR', 'STOPJSR2', 'STOPJJR1', 'TURNDATE', 'TURNJJR', 'TURNJJR2', 'TURNJSR',
          'TURNJSR2', 'TURNJJR1', 'DESTRUCTIONDATE', 'DESJJR', 'DESJJR2', 'DESJSR', 'DESJSR2', 'DESJJR1', 'ASSDEPARTMENT', 'HANDOVERDATE', 'HANDOVERTIME', 'HANDOVERRECORD', 'HANDOVER', 'HANDOVER2', 'SENDEE', 'SENDEE2', 'SUPERVISOR', 'BRNO', 'BRNAME', 'TELLERNO', 'TELLERNAME', 'MAINSERIALNO', 'ILLUSTRATE']
        const list = this.tableData // 数据来源
        const data = this.formatJson(filterVal, list) // 数据格式化
        var index1 = '重要印章（秘钥、卡、具）保管使用登记簿'// 导出时文件名
        exportJsonToExcel(tHeader, data, index1) // 导出文件
      })
    },
    // 数据格式化
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    queryTDataByPageSizeAndNum(pageNum, pageSize) {
      console.log('T5507 getXRPISSTAMPKEEPINGREGISTER2 :' + pageNum + '|' + pageSize)
      const params1 = { STARTDATE: this.$route.params.STARTDATE,
        ENDDATE: this.$route.params.ENDDATE,
        STAMPNAME: this.$route.params.STAMPNAME,
        STAMPNUMBER: this.$route.params.STAMPNUMBER,
        BRNO: this.$route.params.BRNO,
        BRANCHLEVEL: this.$route.params.BRANCHLEVEL,
        TELLERNO: this.$route.params.TELLERNO,
        FLAG: this.$route.params.FLAG, 'currentPage': pageNum, 'pageSize': pageSize }
      const url1 = this.$reportMngApi.getXRPISSTAMPKEEPINGREGISTER2
      this.$http(url1, params1).then( // 通讯后台修改数据库中信息
        res1 => {
          const _data1 = res1.data
          // 赋值
          if (_data1.code === 'SUCCESS') {
            if (_data1.data.TrxCode === '000000') {
              this.tableData = _data1.data.PageInfo.list
            } else {
              if (_data1.data.TrxCode === 'T5507_01') {
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
