<template>
  <el-main>
    <el-row>
      <el-button size="small" type="info" plain disabled>双击封场场次</el-button>
    </el-row>
    <el-row>
      <tl-table
        :table="dataTable"
        :data="tableData"
        :pagesizes="pagesizes"
        :expand-keys="expandKeys"
        :id="id"
        :disabled-pagination="disabledPagination"
        @row-click="rowClick"
        @handleCurrentChange="handleCurrentChange"
        @handleSelectionChange="handleSelectionChange"
        @onRowdbClick="onRowdbClick"
        @handleSizeChange="handleSizeChange"/>
    </el-row>
    <br>
    <el-row>
      <el-col align="right">
        <el-button size="small" type="primary" @click="tuiChu">退出</el-button>
      </el-col>
      <el-col>
        <el-dialog v-if="DiaLog70091Visible" :visible.sync="DiaLog70091Visible" width="55%" title="考试封场处理详情">
          <DiaLog70091 :fromfather7009="valueFromFather" @sendmsgExit="getMsgExit"/>
        </el-dialog>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
import DiaLog70091 from './T70091'
export default {
  name: 'T7009',
  components: {
    DiaLog70091
  },
  data() {
    return {
      DiaLog70091Visible: false,
      valueFromFather: [],
      examTypes: this.$combo.examTypes,
      STATUS: this.$combo.changCiZhuangTai,
      tableData: [], // 用户信息
      currentPage: 1, // 初始页
      pagesize: 10, // 每页显示条数
      pagesizes: 0, // 总条数
      expandKeys: [],
      id: 'userNo',
      val: [],
      identTypeDemo: '1',
      disabledPagination: true
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
        hasOperation: false, // 有无操作功能
        fanYeif: true, // 是否关闭翻页
        myHeight: 400, // 组件高度
        noneInline: 'Inline' // 是否单选
        // hasShowNum: true // 是否显示序号
      }
      if (this.device === 'mobile') { // 移动端
        this.$set(table, 'hasExpand', true) // 有无展开行功能
        this.$set(table, 'hasShowNum', false) // 是否显示序号
        const tr = [
          { id: '1', label: '场次ID', prop: 'ID' },
          { id: '2', label: '考试类型', prop: 'EXAMTYPE' },
          { id: '3', label: '分行号', prop: 'ZONENO' },
          { id: '4', label: '考试日期', prop: 'ACCDATE' },
          { id: '5', label: '开始时间', prop: 'BEGINTIME' },
          { id: '6', label: '结束时间', prop: 'ENDTIME' },
          { id: '7', label: '状态', prop: 'STATUS' }
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
          { id: '1', label: '场次ID', prop: 'ID' },
          { id: '2', label: '考试类型', prop: 'EXAMTYPE' },
          { id: '3', label: '分行号', prop: 'ZONENO' },
          { id: '4', label: '考试日期', prop: 'ACCDATE' },
          { id: '5', label: '开始时间', prop: 'BEGINTIME' },
          { id: '6', label: '结束时间', prop: 'ENDTIME' },
          { id: '7', label: '状态', prop: 'STATUS' }
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
        this.$set(table, 'myHeight', '600px')
        this.$set(table, 'tr', tr) // 表格行数据
        this.$set(table, 'operation', operation) // 操作功能
        this.$set(table, 'hasExpand', true) // 有无展开行功能
        this.$set(table, 'expands', []) // 展开行数据
        this.$set(table, 'hasShowNum', false) // 是否显示序号
      }
      return table
    }
  },
  mounted() {
    this.$http(this.$systemPublicApi.getSystemPublicInfo)
      .then(
        res => {
          this.CurrentBranchNo = res.data.CurrentBranchNo // 机构号
          this.CurrentSystemDate = res.data.CurrentSystemDate // 当前系统日期
          this.CurrentUserNo = res.data.CurrentUserNo // 柜员号
        })
    this.$http(this.$examSystemMngApi.getAllPlanInfo, '') // 此处调用自己的Api接口方法
      .then(
        res => {
          const resdata = res.data.data.data
          console.log('TrxMessage:' + resdata.TrxMessage)
          console.log('TrxCode:' + resdata.TrxCode)
          if (resdata.TrxCode === '000000') {
            if (resdata.TrxMessage === 'SUCCESS') {
              const list = resdata.PageInfo.list
              for (let i = 0; i < list.length; i++) {
                this.$set(list[i], 'EXAMTYPE', this.selectLable(list[i].EXAMTYPE, this.examTypes))
                this.$set(list[i], 'STATUS', this.selectLable(list[i].STATUS, this.STATUS))
              }
              this.tableData = list
            } else {
              console.log('错误信息3')
              this.$message({
                showClose: true,
                message: '错误信息 : ' + resdata.data.TrxMessage,
                type: 'warning'
              })
            }
          } else {
            this.tableData = []
            console.log('错误信息4')
            this.$message({
              showClose: true,
              message: '错误信息 : ' + resdata.TrxMessage,
              type: 'warning'
            })
          }
        },
        error => {
          console.log(error)
        }
      )
  },
  methods: {
    querry() {
      this.$http(this.$examSystemMngApi.getAllPlanInfo, '') // 此处调用自己的Api接口方法
        .then(
          res => {
            const resdata = res.data.data.data
            console.log('TrxMessage:' + resdata.TrxMessage)
            console.log('TrxCode:' + resdata.TrxCode)
            if (resdata.TrxCode === '000000') {
              if (resdata.TrxMessage === 'SUCCESS') {
                const list = resdata.PageInfo.list
                for (let i = 0; i < list.length; i++) {
                  this.$set(list[i], 'EXAMTYPE', this.selectLable(list[i].EXAMTYPE, this.examTypes))
                  this.$set(list[i], 'STATUS', this.selectLable(list[i].STATUS, this.STATUS))
                }
                this.tableData = list
              } else {
                console.log('错误信息3')
                this.$message({
                  showClose: true,
                  message: '错误信息 : ' + resdata.data.TrxMessage,
                  type: 'warning'
                })
              }
            } else {
              this.tableData = []
              console.log('错误信息4')
              this.$message({
                showClose: true,
                message: '错误信息 : ' + resdata.TrxMessage,
                type: 'warning'
              })
            }
          },
          error => {
            console.log(error)
          }
        )
    },
    getMsgExit(data) {
      if (data === 'Exit70091') {
        this.DiaLog70091Visible = false
        this.querry()
      }
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
      console.log('是否场状态：' + this.multipleSelection.STATUS)
      if (this.multipleSelection.STATUS !== '1' && this.multipleSelection.STATUS !== '开场') {
        this.$message({
          showClose: true,
          message: '非开场状态不能进行封场处理',
          type: 'warning'
        })
      } else {
        this.valueFromFather = this.multipleSelection
        this.DiaLog70091Visible = true
      }
    },
    tuiChu() {
      this.$router.push({
        path: this.redirect || '/dashboard'
      })
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pagesize = size // 每页下拉显示数据
      this.queryTDataByPageSizeAndNum(this.currentPage, this.pagesize)
    },
    // 点击某一行时触发的函数
    // *** 按下左键然后移动鼠标到其它列放开左键，会有报错 -- 优化：添加点击行参数，
    rowClick(Row, Event, Column) {
      if (!Column || Column.type === 'selection' || Column.columnKey === 'operation' || Column.type === 'expand') {
        return
      }
      const data = { row: Row, event: Event, column: Column }
      this.$emit('onRowClick', data)
      // 赋值给radio
      this.multipleSelection = Row
      this.$emit('handleSelectionChange', Row)
      console.log('onRowClick', Row)
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
<style>
  @import "../../../styles/public.css";
</style>
<style scoped>
  .rowClass7009 {
    border-top: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
    border-left: 1px solid #e3e3e3;
    border-right: 1px solid #e3e3e3;
    width: 70%;
    margin-left: 100px;
  }
  .rowClass7009X {
    width: 70%;
    margin-left: 100px;
  }
  .rowClass7009Button {
    width: 70%;
    margin-left: 100px;
  }
</style>
