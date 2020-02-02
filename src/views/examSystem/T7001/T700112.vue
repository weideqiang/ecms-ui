<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <main>
    <br>
    <el-row>
      <el-form
        ref="form"
        :model="ruleForm"
        :rules="rules"
        class="demo-form-inline"
        label-width="100px"
        size="small">
        <el-row>
          <br>
          <el-col :span="10">
            <el-form-item label="题目类型：" prop="TYPE">
              <el-select v-model="ruleForm.TYPE" size="mini" placeholder="请选择" clearable>
                <el-option v-for="item in TYPEs" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              注意：题干相同的视为重题不能导入
              <br>
              难度(1-基础,2-适中,3-困难,4-极难)
              <br>
              业务类型(01-对私,02-对公,03-贷款,05-规章制度)
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
    <br>
    <el-row type="flex" justify="end">
      <el-col :span="6">
        <el-button type="small" size="primary" @click="$refs.DuxTable.removeSelecteds()">删除选中</el-button>
        <el-button class="Button700112" type="small" size="primary" @click="insertEvent(-1)">插入一行</el-button>
      </el-col>
      <el-col :span="6">
        <el-button class="Button700113" type="small" size="primary" @click="tiJiao" >批量提交</el-button>
        <el-button class="Button700113" type="small" size="primary" @click="tuiChu" >退出</el-button>
      </el-col>
    </el-row>
    <br>
    <el-row>
      <vxe-table
        ref="DuxTable"
        :data="tableData"
        :edit-rules="validRules"
        :edit-config="{trigger: 'click', mode: 'cell'}"
        show-overflow
        size="mini"
        align="center"
        height="400"
        resizable
        border
        highlight-hover-row
        highlight-current-row
        highlight-hover-column
        highlight-current-column>
        <vxe-table-column type="selection" width="60"/>
        <vxe-table-column field="TYPE" title="题目类型" width="auto" sortable/>
        <vxe-table-column :edit-render="{name: 'input', autoselect: true}" field="BUSITYPE" title="业务类型" width="auto" />
        <vxe-table-column :edit-render="{name: 'input', autoselect: true}" field="TITLE" title="题目" width="auto" />
        <vxe-table-column :edit-render="{name: 'input', autoselect: true}" field="OPTIONA" title="选项A" width="auto" />
        <vxe-table-column :edit-render="{name: 'input', autoselect: true}" field="OPTIONB" title="选项B" width="auto" />
        <vxe-table-column :edit-render="{name: 'input', autoselect: true}" field="OPTIONC" title="选项C" width="auto" />
        <vxe-table-column :edit-render="{name: 'input', autoselect: true}" field="OPTIOND" title="选项D" width="auto" />
        <vxe-table-column :edit-render="{name: 'input', autoselect: true}" field="OPTIONE" title="选项E" width="auto" />
        <vxe-table-column :edit-render="{name: 'input', autoselect: true}" field="ANSWER" title="答案" width="auto" />
        <vxe-table-column :edit-render="{name: 'input', autoselect: true}" field="LVL" title="难度" width="auto" />
        <vxe-table-column :edit-render="{name: 'input', autoselect: true}" field="NOTE" title="备注" width="auto" />
      </vxe-table>
    </el-row>
    <br>
  </main>
</template>

<script>
export default {
  name: 'T700112',
  data() {
    return {
      tableData: [], // 用户信息
      validRules: {
        LVL: [
          { type: 'number', message: '必须为数字值' }
        ],
        BUSITYPE: [
          { type: 'number', message: '必须为数字值' }
        ]
      },
      currentPage: 1, // 初始页
      pagesize: 10, // 每页显示条数
      pagesizes: 0, // 总条数
      expandKeys: [],
      id: 'userNo',
      val: [],
      identTypeDemo: '1',
      disabledPagination: true,
      ruleForm: {
        TYPE: ''
      },
      rules: {
        TYPE: [
          { required: true, message: '请选择题目类型', trigger: 'change' }
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
  mounted() {
    const myDate = new Date()
    this.ruleForm.endDate = myDate
    this.$http(this.$systemPublicApi.getSystemPublicInfo)
      .then(
        res => {
          this.CurrentBranchNo = res.data.CurrentBranchNo // 机构号
          this.CurrentSystemDate = res.data.CurrentSystemDate // 当前系统日期
          this.CurrentUserNo = res.data.CurrentUserNo // 柜员号
        })
  },
  methods: {
    insertEvent(row) {
      if (this.ruleForm.TYPE === undefined || this.ruleForm.TYPE === '') {
        this.$message({
          showClose: true,
          message: '题目类型',
          type: 'warning'
        })
      } else {
        const record = {
          TYPE: this.ruleForm.TYPE
        }
        this.$refs.DuxTable.insertAt(record, row)
          .then(({ row }) => this.$refs.DuxTable.setActiveCell(row, 'TYPE'))
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
      const removeRecords = this.$refs.DuxTable.getSelectRecords()
      console.log('removeRecords:' + removeRecords)
      var ruleList = removeRecords
      console.log('ruleList: ' + ruleList)
      if (ruleList === null || ruleList === undefined || ruleList.length === 0) {
        this.$message({
          showClose: true,
          message: '请选择数据',
          type: 'warning'
        })
      }
      var listjson = []
      for (let i = 0; i < ruleList.length; i++) {
        var myDate = new Date()
        var H = myDate.getHours()
        if (H < 10) {
          H = '0' + myDate.getHours().toString()
        } else {
          H = myDate.getHours().toString()
        }
        var m = myDate.getMinutes().toString()
        if (m < 10) {
          m = '0' + myDate.getMinutes().toString()
        } else {
          m = myDate.getMinutes().toString()
        }
        var s = myDate.getSeconds().toString()
        if (s < 10) {
          s = '0' + myDate.getSeconds().toString()
        } else {
          s = myDate.getSeconds().toString()
        }
        var time = H + m + s
        const map = {
          'TYPE': ruleList[i].TYPE, // 题目类型
          'BUSITYPE': ruleList[i].BUSITYPE, // 业务类型
          'TITLE': ruleList[i].TITLE,
          'OPTIONA': ruleList[i].OPTIONA,
          'OPTIONB': ruleList[i].OPTIONB,
          'OPTIONC': ruleList[i].OPTIONC,
          'OPTIOND': ruleList[i].OPTIOND,
          'OPTIONE': ruleList[i].OPTIONE,
          'LVL': ruleList[i].LVL,
          'ANSWER': ruleList[i].ANSWER,
          'NOTE': ruleList[i].NOTE,
          'STATUS': '1',
          'MODBRNO': this.CurrentBranchNo, // 机构代码
          'MODTLRNO': this.CurrentUserNo, // 用户号
          'TIMESTAMP': this.CurrentSystemDate + time // 后台日期加当前日期
        }
        listjson.push(map)
      }
      console.log('map:' + JSON.stringify(listjson))
      const params = { 'ruleForm': JSON.stringify(listjson), 'ControllerID': 'T700112' }
      this.$http(this.$examSystemMngApi.commonInsertMethodList, params) // 此处调用自己的Api接口方法
        .then(
          res => {
            const resdata = res.data.data
            if (resdata.code === 'SUCCESS') {
              if (resdata.data.TrxCode === '000000') {
                this.$emit('sendmsgExit', 'Exit700111')
                console.log('录入成功')
              } else {
                this.$message({
                  showClose: true,
                  message: '错误信息 : ' + resdata.data.TrxMessage,
                  type: 'warning'
                })
              }
            } else {
              this.$message({
                showClose: true,
                message: '错误信息 : ' + res.data.message,
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
      this.$emit('sendmsgExit', 'Exit700111')
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
  .rowClass700112 {
    border-top: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
    border-left: 1px solid #e3e3e3;
    border-right: 1px solid #e3e3e3;
    width: 70%;
    margin-left: 100px;
  }
  .rowClass700112Button {
    width: 70%;
    margin-left: 100px;
  }
  .Button700112 {
    margin-left: 8px;
  }
  .Button700113{
    margin-left: 10px;
  }
</style>
