<template>
  <el-main>
    <el-row>
      <el-form
        ref="form"
        :model="ruleForm"
        :rules="rules"
        class="demo-form-inline"
        label-width="100px"
        size="small">
        <br>
        <el-row>
          <el-form
            ref="form"
            :model="ruleForm1"
            :rules="rules1"
            class="demo-form-inline"
            label-width="100px"
            size="small">
            <el-row>
              <tl-table
                :table="dataTable"
                :data="tableData"
                :current-page="currentPage"
                :pagesizes="pagesizes"
                :expand-keys="expandKeys"
                :id="id"
                :disabled-pagination="disabledPagination"
                @handleCurrentChange="handleCurrentChange"
                @handleSelectionChange="handleSelectionChange"
                @handleView="handleView"
                @handleSizeChange="handleSizeChange"/>
              <br>
            </el-row>
          </el-form>
        </el-row>
      </el-form>
    </el-row>
    <br>
    <el-row>
      <el-form
        ref="form"
        :model="ruleForm"
        :rules="rules"
        class="demo-form-inline"
        label-width="100px"
        size="small">
        <br>
        <el-row>
          <el-col :span="10">
            <el-form-item label="合计：" prop="heJiTi">
              <el-input
                v-model="ruleForm.heJiTi"
                :disabled="true"
                style="width: 80%;"
                size="mini"
                type="heJiTi"
                placeholder="合计"
                clearable/> 题
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="分值" prop="fenZhi">
              <el-input
                v-model="ruleForm.fenZhi"
                size="mini"
                clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="合计" prop="heJiFen">
              <el-input
                v-model="ruleForm.heJiFen"
                :disabled="true"
                style="width: 65%"
                size="mini"
                clearable/> 分
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
    <br>
    <el-row class="rowClass70292danXuan">
      <el-form :inline="true" class="ecms-trx-button" style="width: 100%">
        <el-form-item>
          <el-button type="small" size="primary" @click="tuiChu" >退出</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <br>
  </el-main>
</template>

<script>
export default {
  name: 'T702912',
  props: {
    fromfather70291: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      tableData: [], // 用户信息
      currentPage: 1, // 初始页
      pagesize: 10, // 每页显示条数
      pagesizes: 0, // 总条数
      expandKeys: [],
      id: 'userNo',
      val: [],
      identTypeDemo: '1',
      disabledPagination: true,
      ruleForm: {
        heJiTi: '',
        fenZhi: '',
        heJiFen: ''
      },
      rules: {
      },
      ruleForm1: {
      },
      rules1: {
      }
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
        noneInline: 'none' // 是否单选
        // hasShowNum: true // 是否显示序号
      }
      if (this.device === 'mobile') { // 移动端
        this.$set(table, 'hasExpand', true) // 有无展开行功能
        this.$set(table, 'hasShowNum', false) // 是否显示序号
        const tr = [
          { id: '1', label: '类型', prop: '类型' },
          { id: '2', label: '基础', prop: '基础' },
          { id: '3', label: '适中', prop: '适中' },
          { id: '4', label: '困难', prop: '困难' },
          { id: '5', label: '极难', prop: '极难' }
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
          { id: '1', label: '类型', prop: 'BUSITYPE' },
          { id: '2', label: '基础', prop: 'BASICNUM' },
          { id: '3', label: '适中', prop: 'MODERATENUM' },
          { id: '4', label: '困难', prop: 'HARDNUM' },
          { id: '5', label: '极难', prop: 'HARDESTNUM' }
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
    tableHeader: function() {
      const key = [
        {
          value: 'TYPE',
          label: '题目类型',
          moduleType: 'select',
          list: this.$combo.tiXing
        }, {
          value: 'BUSITYPE',
          label: '业务类型',
          moduleType: 'select',
          list: this.$combo.yeWuLeiXing
        }, {
          value: 'LVL',
          label: '题目难度',
          moduleType: 'select',
          list: this.$combo.nanDu
        }, {
          value: 'STATUS',
          label: '状态',
          moduleType: 'select',
          list: this.$combo.examSTATUS
        }]
      const key1 = [{
        value: 'TYPE',
        label: '题目类型',
        moduleType: 'select',
        list: this.$combo.tiXing
      }, {
        value: 'BUSITYPE',
        label: '业务类型',
        moduleType: 'select',
        list: this.$combo.yeWuLeiXing
      }, {
        value: 'LVL',
        label: '题目难度',
        moduleType: 'select',
        list: this.$combo.nanDu
      }, {
        value: 'STATUS',
        label: '状态',
        moduleType: 'select',
        list: this.$combo.examSTATUS
      }]
      if (this.device === 'mobile') {
        return key1
      } else {
        return key
      }
    }
  },
  mounted: function() {
    const myDate = new Date()
    this.ruleForm.endDate = myDate
    this.$http(this.$systemPublicApi.getSystemPublicInfo)
      .then(
        res => {
          this.CurrentBranchNo = res.data.CurrentBranchNo // 机构号
          this.CurrentSystemDate = res.data.CurrentSystemDate // 当前系统日期
          this.CurrentUserNo = res.data.CurrentUserNo // 柜员号
        })
    this.tableData = this.fromfather70291
    this.ruleForm.heJiTi = this.fromfather70291[0].TOTALQUESTIONS
    this.ruleForm.fenZhi = this.fromfather70291[0].SCORE
    this.ruleForm.heJiFen = this.fromfather70291[0].TOTAL
  },
  methods: {
    tuiChu() {
      this.$emit('sendmsgExit', 'Exit70291')
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
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pagesize = size
      console.log(this.pagesize) // 每页下拉显示数据
      console.log('pagesize: ' + this.pagesize) // 每页下拉显示数据
      this.query()
    },
    onRowdbClick: function(row) { // 表格双击事件
      this.$router.push({
        path: this.redirect || '/T70291',
        name: 'T70291',
        params: {
          map: this.multipleSelection
        }
      })
    },
    handleSelectionChange(val) { // 选中表格数据1
      this.val = val
      this.multipleSelection = val
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
  @import "../../../styles/public.css";
  .rowClass70292danXuan {
    width: 70%;
    margin-left: 100px;
  }
  .rowClass70292 {
    border-top: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
    border-left: 1px solid #e3e3e3;
    border-right: 1px solid #e3e3e3;
    width: 70%;
    margin-left: 100px;
  }
</style>

