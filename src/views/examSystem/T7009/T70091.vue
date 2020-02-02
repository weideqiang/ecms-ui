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
          <el-col :span="11">
            <el-form-item label="考试单位：" prop="ZONENO">
              <el-select :disabled="true" v-model="ruleForm.ZONENO" style="width: 62%;" placeholder="请选择" clearable>
                <el-option v-for="item in ZONENOs" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="13">
            <el-form-item label="开场教师：" prop="MODTLRNO">
              <el-input
                :disabled="true"
                v-model="ruleForm.MODTLRNO"
                style="width: 62%;"
                type="MODTLRNO"
                placeholder="开场教师"
                clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="考试类型：" prop="EXAMTYPE">
              <el-select :disabled="true" v-model="ruleForm.EXAMTYPE" style="width: 62%;" placeholder="请选择" clearable>
                <el-option v-for="item in EXAMTYPEs" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="13">
            <el-form-item label="场次ID：" prop="ID">
              <el-input
                :disabled="true"
                v-model="ruleForm.ID"
                style="width: 62%;"
                type="ID"
                placeholder="场次ID"
                clearable/>
            </el-form-item>
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
        :disabled-pagination="disabledPagination"
        @row-click="rowClick"
        @handleCurrentChange="handleCurrentChange"
        @handleSelectionChange="handleSelectionChange"
        @onRowdbClick="onRowdbClick"
        @handleSizeChange="handleSizeChange"/>
    </el-row>
    <br>
    <el-row>
      <el-col :span="16" align="right">
        <el-button class="btn7009101" size="small" type="primary" @click="fengChangChuLi">封场处理</el-button>
        <el-button size="small" type="primary" @click="zuoFeiChuLi">作废处理</el-button>
      </el-col>
      <el-col :span="8" align="right">
        <el-button class="btn7009101" size="small" type="primary" @click="daoChu">成绩导出</el-button>
        <el-button size="small" type="primary" @click="fanHui">退出</el-button>
      </el-col>
    </el-row>
    <br>
    <el-row>
      <el-form
        ref="form1"
        :model="ruleForm1"
        :rules="rules1"
        class="demo-form-inline"
        label-width="100px"
        size="small">
        <br>
        <el-row>
          <el-col :span="10">
            <el-form-item label="考试日期：" prop="ACCDATE">
              <el-input
                v-model="ruleForm1.ACCDATE"
                type="ACCDATE"
                placeholder="考试日期"
                clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="13">
            <el-form-item label="作废原因：" prop="NOTE">
              <el-input
                v-model="ruleForm1.NOTE"
                type="NOTE"
                placeholder="作废原因"
                clearable/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
  </el-main>
</template>

<script>
export default {
  name: 'T70091',
  props: {
    fromfather7009: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      ValueFromFather7009: [],
      tableData: [], // 用户信息
      currentPage: 1, // 初始页
      pagesize: 10, // 每页显示条数
      pagesizes: 0, // 总条数
      expandKeys: [],
      id: 'userNo',
      val: [],
      identTypeDemo: '1',
      disabledPagination: true,
      visible: false,
      ruleForm: {
        ZONENO: '',
        MODTLRNO: '',
        EXAMTYPE: '',
        ID: ''
      },
      rules: {
        ZONENO: [
          { required: false, message: '请选择考试场次', trigger: 'change' }
        ],
        MODTLRNO: [
          { required: false, message: '请输入起始号码', trigger: 'blur' }
        ],
        EXAMTYPE: [
          { required: false, message: '请输入结束号码', trigger: 'blur' }
        ],
        ID: [
          { required: false, message: '请选择考试类型', trigger: 'change' }
        ]
      },
      ruleForm1: {
        ACCDATE: '',
        NOTE: ''
      },
      rules1: {
        ACCDATE: [
          { required: false, message: '请选择考试场次', trigger: 'change' }
        ],
        NOTE: [
          { required: false, message: '请输入起始号码', trigger: 'blur' }
        ]
      },
      ZONENOs: this.$combo.zoneInfos,
      EXAMTYPEs: this.$combo.examTypes,
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
        fanYeif: true, // 是否关闭翻页
        myHeight: 400, // 组件高度
        noneInline: 'Inline' // 是否单选
        // hasShowNum: true // 是否显示序号
      }
      if (this.device === 'mobile') { // 移动端
        this.$set(table, 'hasExpand', true) // 有无展开行功能
        this.$set(table, 'hasShowNum', false) // 是否显示序号
        const tr = [
          { id: '1', label: '学员ID', prop: 'TLRNO' },
          { id: '2', label: '学员姓名', prop: 'TLRNAME' },
          { id: '3', label: '所属机构', prop: 'BRNO' },
          { id: '4', label: '考试用时', prop: 'TIME' },
          { id: '5', label: '考试成绩', prop: 'SCORE' },
          { id: '6', label: '总分', prop: 'TOTALSCORE' },
          { id: '7', label: '百分制分数', prop: 'SCORE1' }
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
          { id: '1', label: '学员ID', prop: 'TLRNO' },
          { id: '2', label: '学员姓名', prop: 'TLRNAME' },
          { id: '3', label: '所属机构', prop: 'BRNO' },
          { id: '4', label: '考试用时', prop: 'TIME' },
          { id: '5', label: '考试成绩', prop: 'SCORE' },
          { id: '6', label: '总分', prop: 'TOTALSCORE' },
          { id: '7', label: '百分制分数', prop: 'SCORE1' }
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
  created() {
    this.$route.params.map = this.fromfather7009
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
    console.log('map' + JSON.stringify(this.$route.params.map))
    const params = this.$route.params.map
    if (params) {
      console.log('params:' + params)
      this.ruleForm.ID = params.ID
      this.ruleForm.MODTLRNO = params.MODTLRNO
      this.ruleForm.EXAMTYPE = params.EXAMTYPE
      this.ruleForm.ZONENO = params.ZONENO
      this.ruleForm1.ACCDATE = params.ACCDATE
    }
  },
  methods: {
    handleSelectionChange(val) { // 选中表格数据1
      this.val = val
      this.multipleSelection = val
    },
    onRowdbClick: function(row) { // 表格双击事件
    },
    fengChangChuLi() {
      const params = {
        'EXAMID': this.ruleForm.ID
      }
      this.$http(this.$examSystemMngApi.getTestPersionInfo, params) // 此处调用自己的Api接口方法
        .then(
          res => {
            const resdata = res.data.data.data
            console.log('TrxMessage:' + resdata.TrxMessage)
            console.log('TrxCode:' + resdata.TrxCode)
            if (resdata.TrxCode === '000000') {
              if (resdata.TrxMessage === 'SUCCESS') {
                var numQuestionTitles = ''
                for (let i = 0; i < resdata.PageInfo.list.length; i++) {
                  numQuestionTitles = numQuestionTitles + resdata.PageInfo.list[i].TLRNO + '-' + resdata.PageInfo.list[i].TLRNAME + ' '
                }
                this.$confirm('目前尚有以下学员未提交试卷: ' + numQuestionTitles + '是否继续进行封场处理', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  const params = {
                    'EXAMID': this.ruleForm.ID
                  }
                  this.$http(this.$examSystemMngApi.submitPlanInfo, params) // 此处调用自己的Api接口方法
                    .then(
                      res => {
                        const resdata = res.data.data.data
                        console.log('TrxMessage:' + resdata.TrxMessage)
                        console.log('TrxCode:' + resdata.TrxCode)
                        if (resdata.TrxCode === '000000') {
                          if (resdata.TrxMessage === 'SUCCESS') {
                            this.tableData = resdata.PageInfo.list
                            this.$message({
                              showClose: true,
                              message: '封场成功!',
                              type: 'success'
                            })
                            this.$emit('sendmsgExit', 'Exit70091')
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
                }
                )
              } else {
                console.log('错误信息5')
                this.$message({
                  showClose: true,
                  message: '错误信息 : ' + resdata.data.TrxMessage,
                  type: 'warning'
                })
              }
            } else {
              this.tableData = []
              console.log('错误信息6')
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
    zuoFeiChuLi() {
      if (this.ruleForm1.NOTE === '') {
        this.$message({
          showClose: true,
          message: '请填写作废原因',
          type: 'warning'
        })
      } else {
        this.$http(this.$examSystemMngApi.getMaxCharQuestionId, '') // 此处调用自己的Api接口方法
          .then(
            res => {
              const resdata = res.data.data.data
              if (resdata.TrxCode === '000000') {
                if (resdata.TrxMessage === 'SUCCESS') {
                  console.log('rxID:' + resdata.TrxID)
                  this.maxCharQuestionId = resdata.TrxID
                  const params = { 'EXAMID': this.ruleForm.ID, 'NOTE': this.ruleForm1.NOTE }
                  this.$http(this.$examSystemMngApi.cancelPlan, params) // 此处调用自己的Api接口方法
                    .then(
                      res => {
                        const resdata1 = res.data.data
                        if (resdata1.code === 'SUCCESS') {
                          console.log('resdata1.data.TrxCode:' + resdata1.data.TrxCode)
                          if (resdata1.data.TrxCode === '000000') {
                            this.$message({
                              showClose: true,
                              message: '场次作废成功',
                              type: 'success'
                            })
                            this.$emit('sendmsgExit', 'Exit70091')
                          } else {
                            this.$message({
                              showClose: true,
                              message: '错误信息 : ' + resdata1.data.TrxMessage,
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
      }
    },
    fanHui() {
      this.$emit('sendmsgExit', 'Exit70091')
    },
    daoChu() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.totals == null || this.totals === 0) {
            console.log('===========' + this.totals)
            this.$message({
              showClose: true,
              message: '沒有成绩数据',
              type: 'warning'
            })
            return
          }
          const params = { 'EXAMID': this.ruleForm.ID, 'EXAMTYPE': this.ruleForm.EXAMTYPE, 'ACCDATE': this.ruleForm1.ACCDATE }
          this.$http(this.$examSystemMngApi.submitPlanInfoDownLoadExl, params)// 此处调用自己的Api接口方法
            .then(
              res => {
                console.log(res.data)
                this.download(res.data)
                console.log('导出成功')
              }).catch(error => {
              console.log(error)
            })
        }
      })
    },
    download(data) {
      if (!data) {
        return
      }
      const url = window.URL.createObjectURL(new Blob([data]))
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', 'excel.xls')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
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
  .rowClass70091 {
    border-top: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
    border-left: 1px solid #e3e3e3;
    border-right: 1px solid #e3e3e3;
    width: 70%;
    margin-left: 100px;
  }
  .btn7009101 {
    margin-right: 25px;
  }
</style>
