<template>
  <el-main>
    <el-row>
      <el-form
        ref="form"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        size="small">
        <el-row type="flex" justify="space-between">
          <br>
          <el-col :span="8">
            <el-form-item label="考试成绩：" prop="kaoShiChengJi">
              <el-input
                :disabled="true"
                v-model="ruleForm.kaoShiChengJi"
                style="width: 92%;"
                type="kaoShiChengJi"
                placeholder="考试成绩"
                clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-button size="small" type="info" disabled>双击表格查看答案对比</el-button>
          </el-col>
          <el-col :span="8">
            <el-button size="small" type="primary" @click="tuiChu">退出</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
    <br>
    <el-row>
      <tl-table
        :table="dataTable"
        :data="tableData"
        :pagesizes="pagesizes"
        :expand-keys="expandKeys"
        :id="id"
        @row-click="rowClick"
        @handleCurrentChange="handleCurrentChange"
        @handleSelectionChange="handleSelectionChange"
        @onRowdbClick="onRowdbClick"
        @handleSizeChange="handleSizeChange"/>
    </el-row>
  </el-main>
</template>

<script>
export default {
  name: 'T70082',
  props: {
    fromfather7008: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      ValueFromFather7008: [],
      BRNO: '',
      tableData: [], // 用户信息
      currentPage: 1, // 初始页
      pagesize: 10, // 每页显示条数
      pagesizes: 0, // 总条数
      expandKeys: [],
      id: 'userNo',
      val: [],
      identTypeDemo: '1',
      ID: '',
      TLRNO: '',
      ruleForm: {
        kaoShiChengJi: ''
      },
      rules: {
        kaoShiChengJi: [
          { required: false, message: '请选择考试成绩', trigger: 'change' }
        ]
      },
      TYPEs: this.$combo.tiXing,
      CurrentBranchNo: '', // 机构号
      CurrentSystemDate: '', // 当前系统日期
      CurrentUserNo: '' // 柜员号
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
        hasSelect: true, // 有无选中功能
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
          { id: '1', label: '业务类型', prop: 'BUSITYPE' },
          { id: '2', label: '题目', prop: 'TITLE' },
          { id: '3', label: '选项A', prop: 'OPTIONA' },
          { id: '4', label: '选项B', prop: 'OPTIONB' },
          { id: '5', label: '选项C', prop: 'OPTIONC' },
          { id: '6', label: '选项D', prop: 'OPTIOND' },
          { id: '7', label: '选项E', prop: 'OPTIONE' },
          { id: '8', label: '答案', prop: 'ANSWER' },
          { id: '9', label: '难度', prop: 'LVL' },
          { id: '10', label: '备注', prop: 'NOTE' }
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
          { id: '1', label: '业务类型', prop: 'BUSITYPE' },
          { id: '2', label: '题目', prop: 'TITLE' },
          { id: '3', label: '选项A', prop: 'OPTIONA' },
          { id: '4', label: '选项B', prop: 'OPTIONB' },
          { id: '5', label: '选项C', prop: 'OPTIONC' },
          { id: '6', label: '选项D', prop: 'OPTIOND' },
          { id: '7', label: '选项E', prop: 'OPTIONE' },
          { id: '8', label: '答案', prop: 'ANSWER' },
          { id: '9', label: '难度', prop: 'LVL' },
          { id: '10', label: '备注', prop: 'NOTE' }
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
    }
  },
  mounted: function() {
    this.$http(this.$systemPublicApi.getSystemPublicInfo)
      .then(
        res => {
          this.CurrentBranchNo = res.data.CurrentBranchNo // 机构号
          this.CurrentSystemDate = res.data.CurrentSystemDate // 当前系统日期
          this.CurrentUserNo = res.data.CurrentUserNo // 柜员号
        })
    // console.log('map' + JSON.stringify(this.$route.params.map))
    console.log('map' + this.$route.params.map)
    if (this.$route.params.map) {
      this.BRNO = this.$route.params.map.BRNO
      this.TLRNO = this.$route.params.map.TLRNO
      this.ID = this.$route.params.map.ID
      const params = { 'BRNO': this.BRNO, 'TLRNO': this.TLRNO, 'ID': this.ID }
      this.$http(this.$examSystemMngApi.getTlrTestScoreTotalScore, params) // 此处调用自己的Api接口方法
        .then(
          res => {
            const resdata = res.data.data
            console.log('TrxMessage:' + resdata.TrxMessage)
            console.log('TrxCode:' + resdata.TrxCode)
            if (resdata.TrxCode === '000000') {
              if (resdata.TrxMessage === 'SUCCESS') {
                this.ruleForm.kaoShiChengJi = resdata.PageInfo.list[0].SCORE
                this.query()
              } else {
                console.log('错误信息1')
                this.$message({
                  showClose: true,
                  message: '错误信息 : ' + resdata.data.TrxMessage,
                  type: 'warning'
                })
              }
            } else {
              console.log('错误信息2')
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
    }
  },
  created() {
    this.ValueFromFather7008 = this.fromfather7008
  },
  methods: {
    handleSelectionChange(val) { // 选中表格数据1
      this.val = val
      this.multipleSelection = val
    },
    onRowdbClick: function(row) { // 表格双击事件
      this.$router.push({
        path: this.redirect || '/T70083',
        name: 'T70083',
        params: {
          map: this.multipleSelection
        }
      })
    },
    tiJiao: function() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.pageNum = 1
          console.log('pageNum: ' + this.pageNum) // 点击第几页
          this.query()
        }
      })
    },
    query() {
      const params = { 'BRNO': this.BRNO, 'TLRNO': this.TLRNO, 'ID': this.ID }
      this.$http(this.$examSystemMngApi.getTradeScoreInfo, params) // 此处调用自己的Api接口方法
        .then(
          res => {
            const resdata = res.data.data
            console.log('TrxMessage:' + resdata.TrxMessage)
            console.log('TrxCode:' + resdata.TrxCode)
            if (resdata.TrxCode === '000000') {
              if (resdata.TrxMessage === 'SUCCESS') {
                this.pagesizes = resdata.PageInfo.list.length
                this.tableData = resdata.PageInfo.list
              } else {
                console.log('错误信息3')
                this.$message({
                  showClose: true,
                  message: '错误信息 : ' + resdata.data.TrxMessage,
                  type: 'warning'
                })
              }
            } else {
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
    tuiChu() {
      this.$emit('sendmsgExit', 'Exit70082')
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

<style scoped>
  @import "../../../styles/public.css";
  .rowClass70082 {
    border-top: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
    border-left: 1px solid #e3e3e3;
    border-right: 1px solid #e3e3e3;
    width: 70%;
    margin-left: 100px;
  }
  .rowClass70082Button {
    width: 70%;
    margin-left: 100px;
  }
</style>
