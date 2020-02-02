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
        <el-col :span="13">
          <el-row class="rowClass70081">
            <el-form
              ref="form1"
              :model="ruleForm1"
              :rules="rules1"
              class="demo-form-inline"
              label-width="100px"
              size="small">
              <br>
              <el-row>
                <el-form-item label="题目：" prop="tiMu">
                  <el-input
                    :disabled="true"
                    v-model="ruleForm1.tiMu"
                    style="width: 90%;"
                    type="tiMu"
                    placeholder="题目"
                    clearable/>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item v-if="setType === '01'" :label="ruleForm1.radio" prop="radio1">
                  <div>
                    <el-radio-group v-model="ruleForm1.radio1">
                      <el-radio label="A" border>A</el-radio><br>
                      <el-radio label="B" border>B</el-radio><br>
                      <el-radio label="C" border>C</el-radio><br>
                      <el-radio label="D" border>D</el-radio><br>
                      <el-radio label="E" border>E</el-radio><br>
                    </el-radio-group>
                  </div>
                </el-form-item>
                <el-form-item v-if="setType === '02'" :label="ruleForm1.radio" prop="checkBox">
                  <template>
                    <div>
                      <el-checkbox-group v-model="ruleForm1.selectCities">
                        <el-checkbox v-model="ruleForm1.checkBoxA" label="A" border/><br>
                        <el-checkbox v-model="ruleForm1.checkBoxB" label="B" border/><br>
                        <el-checkbox v-model="ruleForm1.checkBoxC" label="C" border/><br>
                        <el-checkbox v-model="ruleForm1.checkBoxD" label="D" border/><br>
                        <el-checkbox v-model="ruleForm1.checkBoxE" label="E" border/><br>
                      </el-checkbox-group>
                    </div>
                  </template>
                </el-form-item>
                <el-form-item v-if="setType === '03'" :label="ruleForm1.radio" prop="radio2">
                  <div>
                    <el-radio-group v-model="ruleForm1.radio2">
                      <el-radio label="正确" border>正确</el-radio><br>
                      <el-radio label="错误" border>错误</el-radio><br>
                    </el-radio-group>
                  </div>
                </el-form-item>
                <el-form-item v-if="setType === '04'" :label="ruleForm1.radio" prop="input1">
                  <div>
                    <el-input
                      v-model="ruleForm1.input1"
                      style="width: 90%;"
                      type="input1"
                      placeholder="问答"
                      clearable/>
                  </div>
                </el-form-item>
              </el-row>
            </el-form>
          </el-row>
        </el-col>
        <el-col :span="11">
          <el-row class="rowClass70081X">
            <tl-table
              :table="dataTable"
              :data="tableData"
              :current-page="currentPage"
              :pagesizes="pagesizes"
              :expand-keys="expandKeys"
              :id="id"
              style="width: 90%;"
              @handleCurrentChange="handleCurrentChange"
              @handleSelectionChange="handleSelectionChange"
              @onRowdbClick="onRowdbClick"
              @handleSizeChange="handleSizeChange"/>
          </el-row>
          <br>
          <el-row>
            <el-form
              ref="form3"
              :model="ruleForm3"
              :rules="rules3"
              class="demo-form-inline"
              label-width="100px"
              size="small">
              <el-col :span="18">
                <el-form-item label="考试总成绩：" prop="kaoShiChengJi">
                  <el-input
                    :disabled="true"
                    v-model="ruleForm3.kaoShiChengJi"
                    style="width: 100%;"
                    type="kaoShiChengJi"
                    placeholder="考试总成绩"
                    clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-button class="btn700801" size="small" type="primary" @click="tuiChu">退出</el-button>
              </el-col>
            </el-form>
          </el-row>
        </el-col>
      </el-form>
    </el-row>
  </el-main>
</template>

<script>
export default {
  name: 'T70082',
  props: {
    fromfather7008: {
      type: Object,
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
      setType: '04',
      ruleForm: {
      },
      rules: {
      },
      ruleForm1: {
        tiMu: '',
        radio: '',
        radio1: '',
        checkBoxA: '',
        checkBoxB: '',
        checkBoxC: '',
        checkBoxD: '',
        checkBoxE: '',
        radio2: '',
        input1: '',
        selectCities: []
      },
      rules1: {
        tiMu: [
          { required: false, message: '请输入题目', trigger: 'blur' }
        ]
      },
      ruleForm2: {
      },
      rules2: {
      },
      ruleForm3: {
        kaoShiChengJi: ''
      },
      rules3: {
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
          // { id: '1', label: '题目ID', prop: 'ID' },
          { id: '2', label: '题目类型', prop: 'TYPE' },
          // { id: '3', label: '业务类型', prop: 'BUSITYPE' },
          { id: '4', label: '已作答案', prop: 'EXAMANSWER' },
          { id: '5', label: '题目答案', prop: 'ANSWER' },
          { id: '6', label: '题目分值', prop: 'SCORE' }
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
          // { id: '1', label: '题目ID', prop: 'ID' },
          { id: '2', label: '题目类型', prop: 'TYPE' },
          // { id: '3', label: '业务类型', prop: 'BUSITYPE' },
          { id: '4', label: '已作答案', prop: 'EXAMANSWER' },
          { id: '5', label: '题目答案', prop: 'ANSWER' },
          { id: '6', label: '题目分值', prop: 'SCORE' }
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
        this.$set(table, 'myHeight', '520px')
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
    console.log('map7008012' + JSON.stringify(this.fromfather7008))
    console.log('map7008013' + this.fromfather7008.ID)
    if (this.fromfather7008.ID !== '') {
      this.BRNO = this.$route.params.map.BRNO
      this.TLRNO = this.$route.params.map.TLRNO
      this.ID = this.$route.params.map.ID
      const params = { 'BRNO': this.BRNO, 'TLRNO': this.TLRNO, 'ID': this.ID }
      console.log('map7008011111' + JSON.stringify(params))
      this.$http(this.$examSystemMngApi.getTlrTestScoreTotalScore, params) // 此处调用自己的Api接口方法
        .then(
          res => {
            const resdata = res.data.data
            console.log('TrxMessage:' + resdata.TrxMessage)
            console.log('TrxCode:' + resdata.TrxCode)
            if (resdata.TrxCode === '000000') {
              if (resdata.TrxMessage === 'SUCCESS') {
                this.ruleForm3.kaoShiChengJi = resdata.PageInfo.list[0].SCORE
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
    this.$route.params.map = this.fromfather7008
  },
  methods: {
    handleSelectionChange(val) { // 选中表格数据1
      this.val = val
      this.multipleSelection = val
      console.log(this.multipleSelection)
      this.setMyDisplay(this.multipleSelection, '1')
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
      this.$http(this.$examSystemMngApi.getTlrTestDetail, params) // 此处调用自己的Api接口方法
        .then(
          res => {
            const resdata = res.data.data
            if (resdata.TrxCode === '000000') {
              if (resdata.TrxMessage === 'SUCCESS') {
                this.pagesizes = resdata.PageInfo.list.length
                const list = resdata.PageInfo.list
                for (let i = 0; i < list.length; i++) {
                  this.$set(list[i], 'TYPE', this.selectLable(list[i].TYPE, this.TYPEs))
                }
                this.tableData = list
                // const id = resdata.PageInfo.list[0].ID
                this.setMyDisplay(this.tableData[0], '1')
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
    selectLable: function(key, list) {
      for (let i = 0; i < list.length; i++) {
        const value = list[i].value
        if (key === value) {
          return list[i].label
        }
      }
    },
    setMyType(type) {
      if (type === '01' || type === '单选') {
        this.setType = '01'
        this.ruleForm1.radio = '单选：'
      } else if (type === '02' || type === '多选') {
        this.setType = '02'
        this.ruleForm1.radio = '多选：'
      } else if (type === '03' || type === '判断') {
        this.setType = '03'
        this.ruleForm1.radio = '判断：'
      } else if (type === '04' || type === '问答') {
        this.setType = '04'
        this.ruleForm1.radio = '问答：'
      }
    },
    setMyDisplay(muList, oneS) {
      var type = ''
      var title = ''
      var EXAMANSWER = ''
      if (oneS === '0') {
        type = muList[0].TYPE
        title = muList[0].TITLE
        EXAMANSWER = muList[0].EXAMANSWER
        console.log('muList[0]:' + JSON.stringify(muList[0]))
      } else if (oneS === '1') {
        type = muList.TYPE
        title = muList.TITLE
        EXAMANSWER = muList.EXAMANSWER
      }
      this.ruleForm1.tiMu = title
      this.setMyType(type)
      if (type === '01' || type === '单选') {
        if (EXAMANSWER != null && EXAMANSWER.length > 0 && EXAMANSWER === 'A') {
          this.ruleForm1.radio1 = 'A'
        }
        if (EXAMANSWER != null && EXAMANSWER.length > 0 && EXAMANSWER === 'B') {
          this.ruleForm1.radio1 = 'B'
        }
        if (EXAMANSWER != null && EXAMANSWER.length > 0 && EXAMANSWER === 'C') {
          this.ruleForm1.radio1 = 'C'
        }
        if (EXAMANSWER != null && EXAMANSWER.length > 0 && EXAMANSWER === 'D') {
          this.ruleForm1.radio1 = 'D'
        }
        if (EXAMANSWER != null && EXAMANSWER.length > 0 && EXAMANSWER === 'E') {
          this.ruleForm1.radio1 = 'E'
        }
      } else if (type === '02' || type === '多选') {
        this.ruleForm1.selectCities = []
        var strs = EXAMANSWER.split(';')
        for (let i = 0; i < strs.length; i++) {
          this.ruleForm1.selectCities[i] = strs[i]
        }
      } else if (type === '03' || type === '判断') {
        if (EXAMANSWER != null && EXAMANSWER.length > 0 && EXAMANSWER === '正确') {
          this.ruleForm1.radio2 = '正确'
        } else if (EXAMANSWER != null && EXAMANSWER.length > 0 && EXAMANSWER === '错误') {
          this.ruleForm1.radio2 = '错误'
        }
      } else if (type === '04' || type === '问答') {
        if (EXAMANSWER != null && EXAMANSWER.length > 0 && EXAMANSWER === '正确') {
          this.ruleForm1.radio2 = '正确'
        } else if (EXAMANSWER != null && EXAMANSWER.length > 0 && EXAMANSWER === '错误') {
          this.ruleForm1.radio2 = '错误'
        }
      }
    },
    tuiChu() {
      this.$emit('sendmsgExit', 'Exit70081')
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

<style scoped>
  @import "../../../styles/public.css";
  .rowClass70081 {
    border-top: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
    border-left: 1px solid #e3e3e3;
    border-right: 1px solid #e3e3e3;
    width: 100%;
    height: 565px;
    margin-left: 1px;
  }
  .rowClass70081X {
    border-top: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
    border-left: 1px solid #e3e3e3;
    border-right: 1px solid #e3e3e3;
    width: 100%;
    margin-left: 1px;
    height:515px;
  }
  .rowClass70081Button {
    width: 70%;
    margin-left: 100px;
  }
  .btn700801 {
    margin-left: 20px;
  }
</style>
