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
        <el-row type="flex" justify="start">
          <el-col :span="6">
            <el-form-item label="操作类别：" prop="CzLb" >
              <el-select v-model="ruleForm.CzLb" placeholder="请选择" clearable>
                <el-option v-for="item in Czlbs" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="题型：" prop="tiXing">
              <el-select v-model="ruleForm.tiXing" placeholder="请选择" clearable>
                <el-option v-for="item in tiXings" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="难度：" prop="nanDu">
              <el-select v-model="ruleForm.nanDu" placeholder="请选择" clearable>
                <el-option v-for="item in nanDus" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button :style="{ display: visibleUpdate }" size="small">测试</el-button>
            <el-button :style="{ display: visibleUpdate }" size="small">测试1</el-button>
          </el-col>
        </el-row>
        <el-row type="flex" justify="start">
          <el-col :span="6">
            <el-form-item label="业务类型：" prop="yeWuLeiXing">
              <el-select v-model="ruleForm.yeWuLeiXing" placeholder="请选择" clearable>
                <el-option v-for="item in yeWuLeiXings" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="题目关键字：" prop="tiMuGuanJianZi">
              <el-input
                v-model="ruleForm.tiMuGuanJianZi"
                placeholder="请输入"
                clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="备注：" prop="beiZhu">
              <el-input
                v-model="ruleForm.beiZhu"
                placeholder="请输入"
                clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button class="buttonClass700102" size="small" type="primary" @click="chaXun">查询</el-button>
            <el-button class="buttonClass700103" size="small" type="primary" @click="tuiChu">退出</el-button>
            <el-button :style="{ display: visibleUpdate }" size="small" @click="handleEdit">修改</el-button>
            <el-dialog v-if="DiaLog70012Visible" :visible.sync="DiaLog70012Visible" width="55%" title="业务知识题库修改">
              <DiaLog70012 :fromfather7001="valueFromFather" @sendmsgExit="getMsgExit"/>
            </el-dialog>
            <el-button :style="{ display: visibleUpdate }" size="small" @click="handleDel">删除</el-button>
            <el-dialog v-if="DiaLog70013Visible" :visible.sync="DiaLog70013Visible" width="55%" title="业务知识题库删除">
              <DiaLog70013 :fromfather7001="valueFromFather" @sendmsgExit="getMsgExit"/>
            </el-dialog>
            <el-button :style="{ display: visibleUpdate }" size="small" @click="xinZeng">新增</el-button>
            <el-dialog v-if="DiaLog70011Visible" :visible.sync="DiaLog70011Visible" width="55%" title="业务知识题库新增">
              <DiaLog70011 :fromfather7001="valueFromFather" @sendmsgExit="getMsgExit"/>
            </el-dialog>
          </el-col>
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
        @handleSelectionChange="handleSelectionChange"
        @handleView="handleView"
        @handleDel="handleDel"
        @handleEdit="handleEdit"
        @handleSizeChange="handleSizeChange"/>
    </el-row>
  </el-main>
</template>

<script>
import DiaLog70011 from './T70011'
import DiaLog70012 from './T70012'
import DiaLog70013 from './T70013'
export default {
  name: 'T7001',
  components: {
    DiaLog70011,
    DiaLog70012,
    DiaLog70013
  },
  data() {
    const validateDx_czlb = (rule, value, callback) => {
      if (value !== '') {
        console.log('validateDx_czlb11111:' + value)
        if (value === '1') {
          this.xinZeng()
        }
      } else {
        callback()
      }
    }
    return {
      visibleUpdate: 'none', // 隐藏
      tableData: [], // 用户信息
      currentPage: 1, // 初始页
      pagesize: 10, // 每页显示条数
      pagesizes: 0, // 总条数
      expandKeys: [],
      id: 'userNo',
      val: [],
      valueFromFather: [],
      identTypeDemo: '1',
      disabledPagination: false,
      DiaLog70011Visible: false,
      DiaLog70012Visible: false,
      DiaLog70013Visible: false,
      multipleSelection: [],
      ruleForm: {
        tiXing: '',
        nanDu: '',
        yeWuLeiXing: '',
        tiMuGuanJianZi: '',
        beiZhu: '',
        CzLb: ''
      },
      rules: {
        CzLb: [
          { required: true, message: '请选择操作类别', trigger: 'change' },
          { trigger: 'change', validator: validateDx_czlb }
        ],
        tiXing: [
          { required: true, message: '请选择题型', trigger: 'change' }
        ],
        nanDu: [
          { required: false, message: '请选择难度', trigger: 'change' }
        ],
        yeWuLeiXing: [
          { required: true, message: '请选择业务类型', trigger: 'change' }
        ],
        tiMuGuanJianZi: [
          { required: false, message: '请输入题目关键字', trigger: 'blur' }
        ],
        beiZhu: [
          { required: false, message: '请输入备注', trigger: 'blur' }
        ]
      },
      tiXings: this.$combo.tiXing,
      Czlbs: this.$combo.czlb,
      nanDus: this.$combo.nanDu,
      yeWuLeiXings: this.$combo.yeWuLeiXing,
      zhuangTai: this.$combo.examSTATUS
    }
  },
  computed: {
    input() {
      console.log('111111111111111111111')
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
          { id: '1', label: '题目编号', prop: 'ID' },
          { id: '2', label: '题目类型', prop: 'TYPE' },
          { id: '3', label: '题目', prop: 'TITLE' },
          { id: '4', label: '业务类型', prop: 'BUSITYPE' },
          { id: '5', label: '题目难度', prop: 'LVL' },
          { id: '6', label: '选项A', prop: 'OPTIONA' },
          { id: '7', label: '选项B', prop: 'OPTIONB' },
          { id: '8', label: '选项C', prop: 'OPTIONC' },
          { id: '9', label: '选项D', prop: 'OPTIOND' },
          { id: '10', label: '选项E', prop: 'OPTIONE' },
          { id: '11', label: '答案', prop: 'ANSWER' },
          { id: '12', label: '题目备注', prop: 'NOTE' },
          { id: '13', label: '状态', prop: 'STATUS' }
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
          { id: '1', label: '题目编号', prop: 'ID' },
          { id: '2', label: '题目类型', prop: 'TYPE' },
          { id: '3', label: '题目', prop: 'TITLE' },
          { id: '4', label: '业务类型', prop: 'BUSITYPE' },
          { id: '5', label: '题目难度', prop: 'LVL' },
          { id: '6', label: '选项A', prop: 'OPTIONA' },
          { id: '7', label: '选项B', prop: 'OPTIONB' },
          { id: '8', label: '选项C', prop: 'OPTIONC' },
          { id: '9', label: '选项D', prop: 'OPTIOND' },
          { id: '10', label: '选项E', prop: 'OPTIONE' },
          { id: '11', label: '答案', prop: 'ANSWER' },
          { id: '12', label: '题目备注', prop: 'NOTE' },
          { id: '13', label: '状态', prop: 'STATUS' }
        ]
        const operation = { // 操作功能
          label: '操作', // 操作列的行首文字
          width: '120', // 操作列的宽度
          className: '', // 操作列的class名
          data: [ // 操作列数据
            {
              label: '修改', // 按钮文字
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
        if (tr[1].prop === '01') { tr[1] = '单选' }
        console.log('tr---------> ' + JSON.stringify(tr))
        this.$set(table, 'tr', tr) // 表格行数据
        this.$set(table, 'operation', operation) // 操作功能
        this.$set(table, 'hasExpand', true) // 有无展开行功能
        this.$set(table, 'expands', []) // 展开行数据
        this.$set(table, 'hasShowNum', true) // 是否显示序号
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
  mounted() {
    this.ruleForm.CzLb = '0'
  },
  methods: {
    getMsgExit(data) {
      if (data === 'Exit70012') {
        this.DiaLog70012Visible = false
        this.chaXun()
      } else if (data === 'Exit70013') {
        this.DiaLog70013Visible = false
        this.chaXun()
      } else if (data === 'Exit70011') {
        this.DiaLog70011Visible = false
        // this.chaXun()
      }
    },
    handleSelectionChange(val) { // 选中表格数据1
      this.val = val
      this.multipleSelection = val
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
    chaXun() {
      this.pageNum = 1
      console.log('pageNum: ' + this.pageNum) // 点击第几页
      this.query()
      //  if (this.ruleForm.CzLb === '0') {
      //   this.$refs.form.validate(valid => {
      //     if (valid) {
      //     }
      //   })
      //  }
    },
    query() {
      const params = {
        'type': this.ruleForm.tiXing,
        'busitype': this.ruleForm.yeWuLeiXing,
        'level': this.ruleForm.nanDu,
        'title': this.ruleForm.tiMuGuanJianZi,
        'note': this.ruleForm.beiZhu,
        'currentPage': this.currentPage,
        'pageSize': this.pagesize
      }
      this.$http(this.$examSystemMngApi.getQuestionInfo, params) // 此处调用自己的Api接口方法
        .then(
          res => {
            const resdata = res.data.data
            console.log(resdata.TrxMessage)
            console.log(resdata.TrxCode)
            console.log(this.pagesize)
            if (resdata.TrxMessage === 'SUCCESS') {
              if (resdata.TrxCode === '000000') {
                console.log('resdata' + JSON.stringify(resdata))
                // 赋值
                this.pagesizes = resdata.getQuestionInfoQuanBu
                const list = resdata.PageInfo.list
                for (let i = 0; i < list.length; i++) {
                  this.$set(list[i], 'TYPE', this.selectLable(list[i].TYPE, this.tiXings))
                  this.$set(list[i], 'BUSITYPE', this.selectLable(list[i].BUSITYPE, this.yeWuLeiXings))
                  this.$set(list[i], 'LVL', this.selectLable(list[i].LVL, this.nanDus))
                  this.$set(list[i], 'STATUS', this.selectLable(list[i].STATUS, this.zhuangTai))
                }
                this.tableData = list
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
              if (resdata.TrxCode === 'T7001') {
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
    xinZeng() {
      this.DiaLog70011Visible = true
      this.valueFromFather = this.ruleForm.startDate
    },
    handleEdit(index, rows) { // 修改
      this.multipleSelection = this.tableData[index]
      if (this.multipleSelection.length <= 0) {
        console.log('multipleSelection:' + this.multipleSelection + '|')
        this.$message({
          showClose: true,
          message: '请选择数据',
          type: 'warning'
        })
      } else {
        this.DiaLog70012Visible = true
        console.log('multipleSelection1:' + this.multipleSelection + '|')
        this.valueFromFather = this.multipleSelection
      }
    },
    handleDel(index, rows) { // 删除
      this.multipleSelection = this.tableData[index]
      if (this.multipleSelection.length <= 0) {
        this.$message({
          showClose: true,
          message: '请选择数据',
          type: 'warning'
        })
      } else {
        this.DiaLog70013Visible = true
        console.log('multipleSelection2:' + this.multipleSelection + '|')
        this.valueFromFather = this.multipleSelection
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
  .input-with-select .el-input-group__prepend {
    width: 20%;
    background-color: #fff;
  }
  .rowClass7001Button {
    width: 70%;
    margin-left: 100px;
  }
  .colClass700101 {
    margin-left: 100px;
  }
  .buttonClass700102 {
    margin-left: 10px;
  }
  .buttonClass700103 {
    margin-left: 20px;
  }
</style>
