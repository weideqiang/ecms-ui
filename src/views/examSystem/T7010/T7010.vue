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
          <el-col :span="10">
            <el-form-item label="起始日期：" prop="begindate">
              <el-date-picker
                id="begindate"
                v-model="ruleForm.begindate"
                :picker-options="pickerOptions1"
                type="date"
                placeholder="选择日期"
                style="width: 58%;"
                editable
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyyMMdd"/>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="结束日期：" prop="enddate">
              <el-date-picker
                id="enddate"
                v-model="ruleForm.enddate"
                :picker-options="pickerOptions1"
                type="date"
                placeholder="选择日期"
                style="width: 58%;"
                editable
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyyMMdd"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="考试场次：" prop="examid">
              <el-input
                v-model="ruleForm.examid"
                style="width: 58%;"
                type="examid"
                placeholder="考试场次"
                clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="题型：" prop="tiXing" style="width: 87%;">
              <el-select v-model="ruleForm.examtype" style="width: 70%;" placeholder="请选择" clearable>
                <el-option v-for="item in examtypes" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="开场教师：" prop="tlrno">
              <el-input
                v-model="ruleForm.tlrno"
                style="width: 58%;"
                type="tlrno"
                placeholder="开场教师"
                clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="10" offset="4">
            <el-button size="small" type="primary" @click="chaXun">查询</el-button>
            <el-button class="btn701001" size="small" type="primary" @click="tuiChu">退出</el-button>
          </el-col>
          <el-col>
            <el-dialog v-if="DiaLog70101Visible" :visible.sync="DiaLog70101Visible" width="55%" title="考试封场处理详情">
              <DiaLog70101 :fromfather7010="valueFromFather" @sendmsgExit="getMsgExit"/>
            </el-dialog>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
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
import DiaLog70101 from './T70101'
export default {
  name: 'T7010',
  components: {
    DiaLog70101
  },
  data() {
    return {
      DiaLog70101Visible: false,
      valueFromFather: [],
      examTypes: this.$combo.examTypes,
      STATUS: this.$combo.changCiZhuangTai,
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
        examid: '',
        begindate: '',
        enddate: '',
        examtype: '',
        tlrno: ''
      },
      rules: {
        examid: [
          { required: false, message: '请选择考试场次', trigger: 'change' }
        ],
        begindate: [
          { required: false, message: '请输入起始号码', trigger: 'blur' }
        ],
        enddate: [
          { required: false, message: '请输入结束号码', trigger: 'blur' }
        ],
        examtypes: [
          { required: false, message: '请选择考试类型', trigger: 'change' }
        ],
        tlrno: [
          { required: false, message: '请输入开场教师', trigger: 'change' }
        ]
      },
      examtypes: this.$combo.kaoShiLeiXing,
      pickerOptions1: {
        disabledDate(time) {
          // return time.getTime() > Date.now()
        }, shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            console.log('date----------------->' + date)
            picker.$emit('pick', date)
          }
        }]
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
        hasSelect: false, // 有无选中功能
        hasOperation: false, // 有无操作功能
        fanYeif: false, // 是否关闭翻页
        noneInline: 'Inline' // 是否单选
        // hasShowNum: true // 是否显示序号
      }
      if (this.device === 'mobile') { // 移动端
        this.$set(table, 'hasExpand', true) // 有无展开行功能
        this.$set(table, 'hasShowNum', false) // 是否显示序号
        const tr = [
          { id: '1', label: '考试场次', prop: 'ID' },
          { id: '2', label: '考试类型', prop: 'EXAMTYPE' },
          { id: '3', label: '考试日期', prop: 'ACCDATE' },
          { id: '4', label: '开场教师', prop: 'MODTLRNO' },
          { id: '5', label: '所属分行', prop: 'ZONENO' },
          { id: '6', label: '场次状态', prop: 'STATUS' }
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
          { id: '1', label: '考试场次', prop: 'ID' },
          { id: '2', label: '考试类型', prop: 'EXAMTYPE' },
          { id: '3', label: '考试日期', prop: 'ACCDATE' },
          { id: '4', label: '开场教师', prop: 'MODTLRNO' },
          { id: '5', label: '所属分行', prop: 'ZONENO' },
          { id: '6', label: '场次状态', prop: 'STATUS' }
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
        this.$set(table, 'myHeight', '500px')
      }
      return table
    }
  },
  mounted: function() {
    const params = this.$route.params.Intent
    if (params === 'T70101') {
      this.tiJiao()
    }
  },
  methods: {
    getMsgExit(data) {
      if (data === 'Exit70101') {
        this.DiaLog70101Visible = false
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
      this.valueFromFather = this.multipleSelection
      this.DiaLog70101Visible = true
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
      const params = { 'begindate': this.ruleForm.begindate, 'enddate': this.ruleForm.enddate,
        'examid': this.ruleForm.examid, 'tlrno': this.ruleForm.tlrno, 'examtype': this.ruleForm.examtype }
      console.log('params:' + JSON.stringify(params))
      this.$http(this.$examSystemMngApi.getPlanInfo, params) // 此处调用自己的Api接口方法
        .then(
          res => {
            const resdata = res.data.data
            console.log('TrxMessage:' + resdata.TrxMessage)
            console.log('TrxCode:' + resdata.TrxCode)
            if (resdata.TrxCode === '000000') {
              if (resdata.TrxMessage === 'SUCCESS') {
                this.pagesizes = resdata.PageInfo.list.length
                const list = resdata.PageInfo.list
                for (let i = 0; i < list.length; i++) {
                  this.$set(list[i], 'EXAMTYPE', this.selectLable(list[i].EXAMTYPE, this.examTypes))
                  this.$set(list[i], 'STATUS', this.selectLable(list[i].STATUS, this.STATUS))
                }
                this.tableData = list
              } else {
                this.tableData = []
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
  .rowClass7010 {
    border-top: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
    border-left: 1px solid #e3e3e3;
    border-right: 1px solid #e3e3e3;
    width: 70%;
    margin-left: 100px;
  }
  .rowClass7010Button {
    width: 70%;
    margin-left: 100px;
  }
  .btn701001 {
    margin-left: 30px;
  }
</style>
