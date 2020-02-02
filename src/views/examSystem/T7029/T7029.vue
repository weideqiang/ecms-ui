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
          <el-col :span="8" :offset="0">
            <el-form-item label="策略出处：" prop="ZONENO">
              <el-select v-model="ruleForm.ZONENO" placeholder="请选择" clearable style="width:90%;">
                <el-option v-for="item in ZONENOs" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="策略指定人：" prop="ceLueZhiDingRen">
              <el-input
                v-model="ruleForm.ceLueZhiDingRen"
                placeholder="策略指定人"
                clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" :offset="0">
            <el-form-item label="策略名称：" prop="ceLueMingCheng">
              <el-input
                v-model="ruleForm.ceLueMingCheng"
                style="width: 90%"
                placeholder="策略名称"
                clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="2">
            <el-button size="small" type="primary" @click="chaXun">查询</el-button>
            <el-button class="btn702901" size="small" type="primary" @click="tuiChu">退出</el-button>
          </el-col>
          <el-dialog v-if="DiaLog70291Visible" :visible.sync="DiaLog70291Visible" width="55%" title="知识试题策略详情">
            <DiaLog70291 :fromfather7029="valueFromFather" @sendmsgExit="getMsgExit"/>
          </el-dialog>
        </el-row>
      </el-form>
    </el-row>
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
        @onRowdbClick="onRowdbClick"
        @handleSelectionChange="handleSelectionChange"
        @handleView="handleView"
        @handleSizeChange="handleSizeChange"/>
    </el-row>
  </el-main>
</template>

<script>
import DiaLog70291 from './T70291'
export default {
  name: 'T7029',
  components: {
    DiaLog70291
  },
  data() {
    return {
      valueFromFather: [],
      DiaLog70291Visible: false,
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
        ZONENO: '', // 策略出处
        ceLueZhiDingRen: '', // 策略指定人
        ceLueMingCheng: '' // 策略名称
      },
      rules: {
        ZONENO: [
          { required: true, message: '请选择策略出处', trigger: 'change' }
        ],
        ceLueZhiDingRen: [
          { required: false, message: '请输入策略指定人', trigger: 'change' }
        ],
        ceLueMingCheng: [
          { required: false, message: '请输入策略名称', trigger: 'change' }
        ]
      },
      CurrentBranchNo: '', // 机构号
      CurrentSystemDate: '', // 当前系统日期
      CurrentUserNo: '', // 柜员号
      ZONENOs: [],
      guiShuDi: this.$combo.jiaoYiGuiShuDiQu
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
          { id: '1', label: '策略编号', prop: 'ID' },
          { id: '2', label: '策略名称', prop: 'TITLE' },
          { id: '3', label: '策略制定人', prop: 'MODBRNO' },
          { id: '4', label: '策略出处', prop: 'ZONENO' }
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
          { id: '1', label: '策略编号', prop: 'ID' },
          { id: '2', label: '策略名称', prop: 'TITLE' },
          { id: '3', label: '策略制定人', prop: 'MODBRNO' },
          { id: '4', label: '策略出处', prop: 'ZONENO' }
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
        this.$set(table, 'hasShowNum', true) // 是否显示序号
        this.$set(table, 'myHeight', '550px')
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
    this.$http(this.$systemPublicApi.getSystemPublicInfo)
      .then(
        res => {
          this.CurrentBranchNo = res.data.CurrentBranchNo // 机构号
          this.CurrentSystemDate = res.data.CurrentSystemDate // 当前系统日期
          this.CurrentUserNo = res.data.CurrentUserNo // 柜员号
        })
    this.$http(this.$examSystemMngApi.getSelectManagerZonenoSailing, '') // 此处调用自己的Api接口方法
      .then(
        res => {
          const resdata = res.data.data.data
          console.log('TrxMessage:' + resdata.TrxMessage)
          console.log('TrxCode:' + resdata.TrxCode)
          if (resdata.TrxCode === '000000') {
            if (resdata.TrxMessage === 'SUCCESS') {
              console.log('guiShuDi:' + JSON.stringify(resdata.PageInfo.list.length))
              console.log('guiShuDi1:' + JSON.stringify(this.guiShuDi.length))
              for (let i = 0; i < resdata.PageInfo.list.length; i++) {
                var diQu = ''
                for (let j = 0; j < this.guiShuDi.length; j++) {
                  console.log('value:' + this.guiShuDi[j].value)
                  if (this.guiShuDi[j].value === resdata.PageInfo.list[i].ZONENO) {
                    console.log('label:' + this.guiShuDi[j].label)
                    diQu = this.guiShuDi[j].label
                  }
                }
                var map = {
                  value: resdata.PageInfo.list[i].ZONENO,
                  label: diQu
                }
                this.ZONENOs.push(map)
              }
              console.log('this.ZONENOs:' + JSON.stringify(this.ZONENOs))
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
    getMsgExit(data) {
      if (data === 'Exit70291') {
        this.DiaLog70291Visible = false
      }
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
    onRowdbClick: function(row) { // 表格双击事件
      this.DiaLog70291Visible = true
      this.valueFromFather = this.multipleSelection
    },
    handleSelectionChange(val) { // 选中表格数据1
      this.val = val
      this.multipleSelection = val
    },
    chaXun() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.pageNum = 1
          console.log('pageNum: ' + this.pageNum) // 点击第几页
          this.query()
        }
      })
    },
    query() {
      const params = { 'ZONENO': this.ruleForm.ZONENO }
      this.$http(this.$examSystemMngApi.getSelectManagerFromZonenoSailing, params) // 此处调用自己的Api接口方法
        .then(
          res => {
            const resdata = res.data.data.data
            console.log('TrxMessage:' + resdata.TrxMessage)
            console.log('TrxCode:' + resdata.TrxCode)
            if (resdata.TrxCode === '000000') {
              if (resdata.TrxMessage === 'SUCCESS') {
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
  .rowClass7029 {
    border-top: 1px solid #cccccc;
    border-bottom: 1px solid #cccccc;
    border-left: 1px solid #cccccc;
    border-right: 1px solid #cccccc;
    width: 70%;
    margin-left: 100px;
  }
  .rowClass7029Button {
    width: 70%;
    margin-left: 100px;
  }
  .btn702901 {
    margin-left: 25px;
  }
</style>
