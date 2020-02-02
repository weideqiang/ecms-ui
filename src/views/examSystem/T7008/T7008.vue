<template>
  <el-main>
    <el-form
      ref="form"
      :model="ruleForm"
      :rules="rules"
      class="demo-form-inline"
      label-width="100px"
      align="left"
      size="small">
      <br>
      <el-row>
        <!--el-col :span="16" :offset="0">
          <tl-input :input="input7008" @inquire="inquire7008"/>
        </el-col-->
        <el-col :span="6">
          <el-form-item label="考试场次：" prop="kaoShiChangCi">
            <el-input
              v-model="ruleForm.kaoShiChangCi"
              type="kaoShiChangCi"
              placeholder="考试场次"
              clearable/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="学员编号：" prop="xueYuanBianHao">
            <el-input
              v-model="ruleForm.xueYuanBianHao"
              type="xueYuanBianHao"
              placeholder="学员编号"
              clearable/>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="1">
          <el-button size="small" type="primary" @click="chaXun">查询</el-button>
          <el-button class="btn70081" size="small" type="primary" @click="tuiChu">退出</el-button>
          <el-button :style="{ display: visibleUpdate }" size="small" @click="handleEdit">详情</el-button>
          <el-dialog v-if="DiaLog70081Visible" :visible.sync="DiaLog70081Visible" width="55%" title="考试详细信息">
            <DiaLog70081 :fromfather7008="valueFromFather" @sendmsgExit="getMsgExit"/>
          </el-dialog>
          <el-dialog v-if="DiaLog70082Visible" :visible.sync="DiaLog70082Visible" width="55%" title="考试详细信息">
            <DiaLog70082 :fromfather7008="valueFromFather" @sendmsgExit="getMsgExit"/>
          </el-dialog>
        </el-col>
      </el-row>
    </el-form>
    <br>
    <el-row :span="16">
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
        @handleEdit="handleEdit"
        @handleSizeChange="handleSizeChange"/>
    </el-row>
  </el-main>
</template>

<script>
import DiaLog70081 from './T70081'
import DiaLog70082 from './T70082'
export default {
  name: 'T7008',
  components: {
    DiaLog70081,
    DiaLog70082
  },
  data() {
    return {
      valueFromFather: [],
      visibleUpdate: 'none', // 隐藏
      DiaLog70081Visible: false,
      DiaLog70082Visible: false,
      disabledXiangQing: true,
      tableData: [], // 用户信息
      currentPage: 1, // 初始页
      pagesize: 10, // 每页显示条数
      pagesizes: 0, // 总条数
      expandKeys: [],
      id: 'userNo',
      val: [],
      identTypeDemo: '1',
      disabledPagination: false,
      multipleSelection: [],
      examTypes: this.$combo.examTypes,
      ruleForm: {
        kaoShiChangCi: '',
        xueYuanBianHao: ''
      },
      rules: {
        kaoShiChangCi: [
          { required: false, message: '请输入考试场次', trigger: 'blur' }
        ],
        xueYuanBianHao: [
          { required: false, message: '请输入学员编号', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    input7008() {
      const input1 = {}
      this.$set(input1, 'tableHeader', this.tableHeader7008) // 表格行数据
      return input1
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
        hasOperation: true, // 有无操作功能
        fanYeif: false, // 是否关闭翻页
        myHeight: 500, // 组件高度
        noneInline: 'none', // 是否单选
        hasShowNum: true // 是否显示序号
      }
      if (this.device === 'mobile') { // 移动端
        this.$set(table, 'hasExpand', true) // 有无展开行功能
        this.$set(table, 'hasShowNum', false) // 是否显示序号
        const tr = [
          { id: '1', label: '考试场次', prop: 'ID' },
          { id: '2', label: '考试类型', prop: 'EXAMTYPE' },
          { id: '3', label: '考试机构', prop: 'BRNO' },
          { id: '4', label: '学员编号', prop: 'TLRNO' },
          { id: '5', label: '学员名称', prop: 'TLRNAME' },
          { id: '6', label: '考试成绩', prop: 'SCORE' }
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
          width: '40', // 操作列的宽度
          className: '', // 操作列的class名
          data: [ // 操作列数据
            {
              label: '', // 按钮文字
              Fun: 'handleView', // 点击按钮后触发的父组件事件
              size: 'mini', // 按钮大小
              icon: 'el-icon-view', // 按钮样式
              id: '1' // 按钮循环组件的key值
            }
          ]
        }
        this.$set(table, 'tr', tr) // 表格行数据
        this.$set(table, 'expands', expands) // 展开行数据
        this.$set(table, 'operation', operation) // 操作功能
      } else {
        const tr = [
          { id: '1', label: '考试场次', prop: 'ID' },
          { id: '2', label: '考试类型', prop: 'EXAMTYPE' },
          { id: '3', label: '考试机构', prop: 'BRNO' },
          { id: '4', label: '学员编号', prop: 'TLRNO' },
          { id: '5', label: '学员名称', prop: 'TLRNAME' },
          { id: '6', label: '考试成绩', prop: 'SCORE' }
        ]
        const operation = { // 操作功能
          label: '操作', // 操作列的行首文字
          width: '80', // 操作列的宽度
          className: '', // 操作列的class名
          data: [ // 操作列数据
            {
              label: '详情', // 按钮文字
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
        console.log('tr---------> ' + tr[2].prop)
        this.$set(table, 'tr', tr) // 表格行数据
        this.$set(table, 'operation', operation) // 操作功能
        this.$set(table, 'hasExpand', true) // 有无展开行功能
        this.$set(table, 'expands', []) // 展开行数据
        this.$set(table, 'hasShowNum', true) // 是否显示序号
      }
      return table
    },
    tableHeader7008: function() {
      const key = [
        {
          value: 'kaoShiChangCi',
          label: '考试场次',
          moduleType: 'input'
        },
        {
          value: 'xueYuanBianHao',
          label: '学员编号',
          moduleType: 'input'
        }
      ]
      const key1 = [
        {
          value: 'kaoShiChangCi',
          label: '考试场次',
          moduleType: 'input'
        },
        {
          value: 'xueYuanBianHao',
          label: '学员编号',
          moduleType: 'input'
        }]
      if (this.device === 'mobile') {
        return key1
      } else {
        return key
      }
    }
  },
  methods: {
    getMsgExit(data) {
      if (data === 'Exit70081') {
        this.DiaLog70081Visible = false
      } else if (data === 'Exit70082') {
        this.DiaLog70082Visible = false
      }
    },
    handleSelectionChange(val) { // 选中表格数据1
      this.val = val
      this.multipleSelection = val
      console.log('multipleSelection:' + this.multipleSelection)
    },
    handleEdit: function(index, rows) { // 选中表格数据
      this.multipleSelection = this.tableData[index]
      this.xiangQing()
    },
    onRowdbClick: function(row) { // 表格双击事件
      // this.$router.push({
      //   path: this.redirect || '/T70083',
      //   name: 'T70083',
      //   params: {
      //     map: this.multipleSelection
      //   }
      // })
    },
    chaXun() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.pageNum = 1
          console.log('pageNum: ' + this.pageNum) // 点击第几页
          this.inquire7008()
        }
      })
    },
    inquire7008: function(inputForm) { // 查询
      this.currentPage = 1
      this.inputForm = inputForm
      this.query()
    },
    query() {
      const params = {
        'examid': this.ruleForm.kaoShiChangCi,
        'tlrno': this.ruleForm.xueYuanBianHao
      }
      this.$http(this.$examSystemMngApi.getTlrTestScoreSailing, params) // 此处调用自己的Api接口方法
        .then(
          res => {
            const resdata = res.data.data
            console.log(JSON.stringify(resdata))
            if (resdata.TrxMessage === 'SUCCESS') {
              if (resdata.TrxCode === '000000') {
                // 赋值
                this.pagesizes = resdata.PageInfo.list.length
                const list = resdata.PageInfo.list
                for (let i = 0; i < list.length; i++) {
                  this.$set(list[i], 'EXAMTYPE', this.selectLable(list[i].EXAMTYPE, this.examTypes))
                }
                this.tableData = list
                this.disabledXiangQing = false
              } else {
                this.$message({
                  showClose: true,
                  message: '错误信息 : ' + resdata.TrxMessage,
                  type: 'warning'
                })
                this.pagesizes = 0
                this.tableData = []
              }
            } else {
              if (resdata.TrxCode === 'T7008') {
                this.$message({
                  showClose: true,
                  message: '错误信息 : ' + resdata.TrxMessage,
                  type: 'warning'
                })
                this.pagesizes = 0
                this.tableData = []
              }
            }
          },
          error => {
            console.log(error)
          }
        )
    },
    selectLable: function(key, list) {
      for (let i = 0; i < list.length; i++) {
        const value = list[i].value
        if (key === value) {
          return list[i].label
        }
      }
    },
    xiangQing() {
      if (this.multipleSelection.length <= 0) {
        this.$message({
          showClose: true,
          message: '请选择数据',
          type: 'warning'
        })
      } else {
        this.valueFromFather = this.multipleSelection
        console.log('7008@@@:' + JSON.stringify(this.multipleSelection))
        if (this.multipleSelection.EXAMTYPE === '业务知识') {
          this.DiaLog70081Visible = true
        } else if (this.multipleSelection.EXAMTYPE === '交易操作') {
          this.DiaLog70082Visible = true
        }
      }
    },
    tuiChu() {
      this.$router.push({
        path: this.redirect || '/dashboard'
      })
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pagesize = size
      console.log(this.pagesize) // 每页下拉显示数据
      console.log('pagesize: ' + this.pagesize) // 每页下拉显示数据
      this.query()
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
<style>
  @import "../../../styles/public.css";
</style>
<style scoped>
  .rowClass7008 {
    border-top: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
    border-left: 1px solid #e3e3e3;
    border-right: 1px solid #e3e3e3;
    width: 70%;
    margin-left: 100px;
  }
  .input-with-select .el-input-group__prepend {
    width: 20%;
    background-color: #fff;
  }
  .rowClass7008Button {
    width: 70%;
    margin-left: 100px;
  }
  .btn70081 {
    margin-left: 20px;
  }
</style>
