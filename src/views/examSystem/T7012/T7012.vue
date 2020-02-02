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
            <el-form-item label="凭条编号：" prop="ID">
              <el-select v-model="ruleForm.ID" style="width: 80%;" placeholder="请选择" clearable>
                <el-option v-for="item in IDs" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-button class="btn701201" size="small" type="primary" @click="chaXun">查询</el-button>
            <el-button class="btn701201" size="small" type="primary" @click="baoCun">保存</el-button>
            <el-button class="btn701201" size="small" type="primary" @click="tuiChu">退出</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
    <el-row>
      <vxe-table
        ref="DuxTable"
        :data="tableData"
        :edit-rules="validRules"
        :edit-config="{trigger: 'click', mode: 'cell'}"
        size="mini"
        align="center"
        height="600"
        resizable
        border
        highlight-hover-row
        highlight-current-row
        highlight-hover-column
        highlight-current-column>
        <vxe-table-column :edit-render="{name: 'input', autoselect: true}" field="INPUTDATA" title="（金额）录入题目" width="auto" />
      </vxe-table>
    </el-row>
  </el-main>
</template>

<script>
export default {
  name: 'T7012',
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
      validRules: {
        INPUTDATA: [
          // { type: 'number', message: '必须为数字值' }
        ]
      },
      ruleForm: {
        ID: '' // 凭条编号
      },
      rules: {
        ID: [
          { required: true, message: '请输入凭条编号', trigger: 'change' }
        ]
      },
      CurrentBranchNo: '', // 机构号
      CurrentSystemDate: '', // 当前系统日期
      CurrentUserNo: '', // 柜员号
      IDs: []
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
        hasOperation: true, // 有无操作功能
        noneInline: 'Inline' // 是否单选
        // hasShowNum: true // 是否显示序号
      }
      if (this.device === 'mobile') { // 移动端
        this.$set(table, 'hasExpand', true) // 有无展开行功能
        this.$set(table, 'hasShowNum', false) // 是否显示序号
        const tr = [
          { id: '1', label: '（金额）录入题目', prop: 'INPUTDATA' }
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
          { id: '1', label: '（金额）录入题目', prop: 'INPUTDATA' }
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
    this.$http(this.$examSystemMngApi.getNumQuestionTitle, '') // 此处调用自己的Api接口方法
      .then(
        res => {
          const resdata = res.data.data.data
          console.log('TrxMessage:' + resdata.TrxMessage)
          console.log('TrxCode:' + resdata.TrxCode)
          if (resdata.TrxCode === '000000') {
            if (resdata.TrxMessage === 'SUCCESS') {
              for (let i = 0; i < resdata.PageInfo.total; i++) {
                var map = {
                  value: resdata.PageInfo.list[i].ID,
                  label: resdata.PageInfo.list[i].TITLE
                }
                this.IDs.push(map)
              }
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
    handleSelectionChange(val) { // 选中表格数据1
      this.val = val
      this.multipleSelection = val
    },
    chaXun() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.query()
        }
      })
    },
    onRowdbClick: function(row) { // 表格双击事件
      // this.$router.push({
      //   path: this.redirect || '/T70291',
      //   name: 'T70291',
      //   params: {
      //     map: this.multipleSelection
      //   }
      // })
    },
    query() {
      const params = { 'ID': this.ruleForm.ID }
      this.$http(this.$examSystemMngApi.getNumQuestion, params) // 此处调用自己的Api接口方法
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
    qingKong() {
      this.ruleForm1.CONTENT = ''
      this.ruleForm1.CHARNUMBER = ''
    },
    baoCun() {
      const multData = this.tableData // 获取选中数据
      if (!multData || multData.length !== 1) {
        this.$message({
          showClose: true,
          message: '请选择数据',
          type: 'warning'
        })
      }
      for (let i = 0; i < multData.length; i++) {
        var DATALIST = multData[i]
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
        console.log('DATALIST:' + JSON.stringify(DATALIST))
        const params = { 'DATALIST': JSON.stringify(DATALIST), 'BRNO': this.CurrentBranchNo, 'TLRNO': this.CurrentUserNo, 'TIMESTAMP': this.CurrentSystemDate + time }
        console.log('params:' + JSON.stringify(params))
        this.$http(this.$examSystemMngApi.updateNumQuestion, params) // 此处调用自己的Api接口方法
          .then(
            res => {
              const resdata = res.data.data
              if (resdata.code === 'SUCCESS') {
                if (resdata.data.TrxCode === '000000') {
                  this.$message({
                    showClose: true,
                    message: '题库维护成功',
                    type: 'success'
                  })
                  this.$router.push({
                    path: this.redirect || '/dashboard'
                  })
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
      console.log('onRowClick', this.multipleSelection)
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
  .rowClass7012 {
    border-top: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
    border-left: 1px solid #e3e3e3;
    border-right: 1px solid #e3e3e3;
    width: 70%;
    margin-left: 100px;
  }
  .rowClass7012Button {
    width: 70%;
    margin-left: 100px;
  }
  .btn701201 {
    margin-left: 20px;
  }
</style>
