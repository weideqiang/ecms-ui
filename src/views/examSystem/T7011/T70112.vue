<template>
  <el-main>
    <el-row class="rowClass7011">
      <el-form
        ref="form"
        :model="ruleForm"
        :rules="rules"
        class="demo-form-inline"
        label-width="100px"
        size="small">
        <br>
        <el-row>
          <el-col :span="12">
            <el-form-item label="凭条编号：" prop="ID">
              <el-input
                v-model="ruleForm.ID"
                style="width: 80%;"
                placeholder="凭条编号"
                rows="1"
                clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="条数：" size="mini" prop="tiaoShu" >
              <el-input
                :disabled="true"
                v-model="ruleForm.tiaoShu"
                style="width: 80%;"
                placeholder="条数"
                rows="1"
                clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="第一次录入：" size="mini" prop="luRu1" >
              <el-input
                v-model="ruleForm.luRu1"
                style="width: 80%;"
                placeholder="第一次录入"
                rows="1"
                clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="第二次录入：" size="mini" prop="luRu2" >
              <el-input
                v-model="ruleForm.luRu2"
                style="width: 80%;"
                placeholder="第二次录入"
                rows="1"
                clearable/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
    <br>
    <el-row class="rowClass7011Button">
      <el-form :inline="true" class="ecms-trx-button" style="width: 100%">
        <el-form-item>
          <el-button :disabled="jianChadisabled" size="small" type="primary" @click="jianCha">检查</el-button>
          <el-button :disabled="tijiaodisabled" size="small" type="primary" @click="baoCun">提交</el-button>
          <el-button size="small" type="primary" @click="tuiChu">退出</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <br>
    <el-row class="rowClass7011">
      <vxe-table
        ref="DuxTable"
        :data="tableData"
        :rules="rules"
        :edit-rules="validRules"
        :edit-config="{trigger: 'click', mode: 'cell'}"
        size="mini"
        align="center"
        max-height="400"
        resizable
        border
        highlight-hover-row
        highlight-current-row
        highlight-hover-column
        highlight-current-column>
        <vxe-table-column :edit-render="{name: 'input', autoselect: true}" field="FIRST" title="（金额）第一次录入" width="auto" />
        <vxe-table-column :edit-render="{name: 'input', autoselect: true}" field="SECOND" title="（金额）第二次录入" width="auto" />
        <vxe-table-column field="RESULT" title="核对结果" width="auto" sortable/>
      </vxe-table>
    </el-row>
  </el-main>
</template>

<script>
export default {
  name: 'T70112',
  data() {
    const validatorluRu1 = (rule, value, callback) => {
      if (parseInt(this.luRu1first) >= parseInt(this.ruleForm.tiaoShu)) {
        callback(new Error('最大条目为100'))
      } else {
        if (value === '' || value === null) {
          this.tableData[parseInt(this.luRu1first)].FIRST = '0.00'
        } else {
          var Fixed = parseInt(value).toFixed(2)
          console.log('' + Fixed)
          this.tableData[parseInt(this.luRu1first)].FIRST = Fixed + ''
        }
        console.log('first:' + JSON.stringify(this.tableData[parseInt(this.luRu1first)]))
        this.luRu1first = parseInt(this.luRu1first) + 1
        this.ruleForm.luRu1 = ''
        if (parseInt(this.luRu1first) === parseInt(this.ruleForm.tiaoShu)) {
          callback()
        } else {
          callback()
        }
      }
    }
    const validatorluRu2 = (rule, value, callback) => {
      if (parseInt(this.luRu2second) >= parseInt(this.ruleForm.tiaoShu)) {
        callback(new Error('最大条目为' + this.ruleForm.tiaoShu))
      } else {
        if (value === '' || value === null) {
          this.tableData[parseInt(this.luRu2second)].SECOND = '0.00'
        } else {
          var Fixed = parseInt(value).toFixed(2)
          console.log('' + Fixed)
          this.tableData[parseInt(this.luRu2second)].SECOND = Fixed + ''
        }
        this.luRu2second = parseInt(this.luRu2second) + 1
        this.ruleForm.luRu2 = ''
        if (parseInt(this.luRu2second) === parseInt(this.ruleForm.tiaoShu)) {
          callback()
        } else {
          callback()
        }
      }
    }
    return {
      jianChadisabled: false,
      tijiaodisabled: true,
      tableData: [], // 用户信息
      luRu1first: '0',
      luRu2second: '0',
      currentPage: 1, // 初始页
      pagesize: 10, // 每页显示条数
      pagesizes: 0, // 总条数
      expandKeys: [],
      id: 'userNo',
      val: [],
      identTypeDemo: '1',
      disabledPagination: true,
      CurrentBranchNo: '', // 机构号
      CurrentSystemDate: '', // 当前系统日期
      CurrentUserNo: '', // 柜员号
      pd: false,
      validRules: {
        FIRST: [
          { type: 'number', message: '必须为数字值' }
        ],
        SECOND: [
          { type: 'number', message: '必须为数字值' }
        ]
      },
      ruleForm: {
        ID: '', // 凭条编号
        tiaoShu: '', // 条数
        luRu1: '', // 第一次录入
        luRu2: '' // 第二次录入
      },
      rules: {
        ID: [
          { required: true, message: '请输入凭条编号', trigger: 'blur' }
        ],
        luRu1: [
          { required: false, message: '请输入第一次录入', trigger: 'blur' },
          { trigger: 'blur', validator: validatorluRu1 }
        ],
        luRu2: [
          { required: false, message: '请输入第二次录入', trigger: 'blur' },
          { trigger: 'blur', validator: validatorluRu2 }
        ]
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
        noneInline: 'Inline' // 是否单选
        // hasShowNum: true // 是否显示序号
      }
      if (this.device === 'mobile') { // 移动端
        this.$set(table, 'hasExpand', true) // 有无展开行功能
        this.$set(table, 'hasShowNum', false) // 是否显示序号
        const tr = [
          { id: '1', label: '（金额）第一次录入', prop: 'FIRST' },
          { id: '2', label: '（金额）第二次录入', prop: 'SECOND' },
          { id: '3', label: '核对结果', prop: 'RESULT' }
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
          { id: '1', label: '（金额）第一次录入', prop: 'FIRST' },
          { id: '2', label: '（金额）第二次录入', prop: 'SECOND' },
          { id: '3', label: '核对结果', prop: 'RESULT' }
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
  deactivated() { // 使用keep-alive钩子的时候  会改变原有的生命周期并增加两个生命周期分别为deactivated切出 和 activated切入
    console.log('deactivated-----------: ', '组件切出')
    this.ruleForm.luRu1 = '' // 第一次录入
    this.ruleForm.luRu2 = '' // 第二次录入
  },
  activated() {
    console.log('deactivated-----------: ', '组件切入')
    this.$http(this.$systemPublicApi.getSystemPublicInfo)
      .then(
        res => {
          this.CurrentBranchNo = res.data.CurrentBranchNo // 机构号
          this.CurrentSystemDate = res.data.CurrentSystemDate // 当前系统日期
          this.CurrentUserNo = res.data.CurrentUserNo // 柜员号
        })
    const name = this.$route.params.name
    var td = 0
    if (name !== undefined && name === 'T70111') {
      var ii = 0
      if (parseInt(this.luRu1first) > parseInt(this.luRu2second)) {
        ii = parseInt(this.luRu1first)
      } else {
        ii = parseInt(this.luRu2second)
      }
      for (let i = 0; i < ii; i++) {
        if (this.tableData[i].RESULT === '0.00') {
          this.tableData[i].RESULT = this.$route.params.map[td].RESULT
          td = td + 1
        }
      }
      this.jianChadisabled = true
      this.tijiaodisabled = false
    } else {
      var newQuery = this.$route.query // 读取query参数
      var newMeta = this.$route.meta // 读取query参数
      console.log('newQuery: ' + newQuery)
      console.log('newMeta: ' + newMeta)
      this.ruleForm.tiaoShu = '100'
      const canTiaoShu = Number(this.ruleForm.tiaoShu)
      for (let i = 0; i < canTiaoShu; i++) {
        this.tableData.push({ FIRST: '0.00', SECOND: '0.00', RESULT: '0.00' })
      }
    }
  },
  methods: {
    handleSelectionChange(val) { // 选中表格数据1
      this.val = val
      this.multipleSelection = val
    },
    jianCha() {
      if (this.ruleForm.ID !== null) {
        this.query()
      }
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
      if (this.tableData.length !== parseInt(this.ruleForm.tiaoShu)) {
        this.$message({
          showClose: true,
          message: '条目与预设不符，请检查',
          type: 'warning'
        })
      } else {
        var checkListMap = []
        for (let i = 0; i < this.tableData.length; i++) {
          const data1 = this.tableData[i].FIRST
          const data2 = this.tableData[i].SECOND
          if (data1 !== data2) {
            var map = {
              FIRST: data1,
              SECOND: data2
            }
            checkListMap.push(map)
          } else {
            this.tableData[i].RESULT = data2
          }
        }
        if (checkListMap === null || checkListMap.size === 0) {
          this.tijiaodisabled = false
        } else {
          this.$router.push({
            path: this.redirect || '/T70111',
            name: 'T70111',
            params: {
              map: checkListMap
            }
          })
        }
      }
    },
    qingKong() {
      this.ruleForm1.CONTENT = ''
      this.ruleForm1.CHARNUMBER = ''
    },
    baoCun() {
      if (this.multipleSelection.length <= 0) {
        console.log('multipleSelection:' + this.multipleSelection + '|')
        this.$message({
          showClose: true,
          message: '请选择数据',
          type: 'warning'
        })
      } else {
        this.$http(this.$examSystemMngApi.getMaxNumQuestionId, '') // 此处调用自己的Api接口方法
          .then(
            res => {
              const resdata = res.data.data
              var list = []
              if (resdata.code === 'SUCCESS') {
                if (resdata.data.TrxCode === '000000') {
                  for (let i = 0; i < this.multipleSelection.length; i++) {
                    list.push(this.multipleSelection[i].RESULT)
                  }
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
                  const params = { 'id': resdata.PageInfo.list[0].ID, 'title': this.ruleForm.ID, 'dataList': JSON.stringify(list), 'brno': this.CurrentBranchNo, 'tlrno': this.CurrentUserNo, 'timestamp': this.CurrentSystemDate + time }
                  console.log('params:' + params)
                  this.$http(this.$examSystemMngApi.addNumQuestion, params) // 此处调用自己的Api接口方法
                    .then(
                      res => {
                        const resdata = res.data.data
                        if (resdata.code === 'SUCCESS') {
                          if (resdata.data.TrxCode === '000000') {
                            this.$message({
                              showClose: true,
                              message: '题库录入成功',
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
  .rowClass7011 {
    border-top: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
    border-left: 1px solid #e3e3e3;
    border-right: 1px solid #e3e3e3;
    width: 70%;
    margin-left: 100px;
  }
  .rowClass7011Button {
    width: 70%;
    margin-left: 100px;
  }
</style>
