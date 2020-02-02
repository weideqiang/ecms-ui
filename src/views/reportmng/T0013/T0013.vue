<template>
  <el-main class="background">
    <!--<img src="../../../assets/login.jpg" width="100%" height="100%" />-->
    <el-row>
      <el-form
        ref="form"
        :inline="true"
        :model="inputForm"
        :rules="inputRules"
        class="ecms-trx-search"
        label-width="100px"
        label-position="left" >
        <el-form-item label="机构代码：" prop="brno">
          <el-input id="brno" v-model="inputForm.brno" placeholder="请输入机构代码" maxlength="6" @input.capture="changeCode"/>
        </el-form-item>
        <el-form-item label="选择日期：" prop="accdate">
          <el-date-picker
            id="accdate"
            v-model="inputForm.accdate"
            :picker-options="pickerOptions1"
            type="date"
            placeholder="选择日期"
            editable
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyyMMdd"/>
        </el-form-item>
        <el-form-item label="交易代码:" prop="trxno">
          <el-input id="trxno" v-model="inputForm.trxno" placeholder="请输入交易代码" maxlength="4" @input.capture="changeCode"/>
        </el-form-item>
      </el-form>
    </el-row >
    <el-row>
      <el-form :inline="true" class="ecms-trx-button">
        <el-form-item>
          <el-button id="login" type="primary" size="medium" @click="inquire" >查询</el-button>
          <el-button id="derive" size="medium" type="primary" @click="derive">导出</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        style="width: 100%"
        tooltip-effect="dark"
        height="300"
        @selection-change="handleSelectionChange">
        <el-table-column label="柜员代码" prop="tlrno">
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-input v-model="scope.row.tlrno" class="edit-input" placeholder="柜员代码"/>
            </template>
            <span>{{ scope.row.tlrno }}</span>
          </template>
        </el-table-column>
        <el-table-column label="场景代码" prop="trxno">
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-input v-model="scope.row.trxno" class="edit-input" placeholder="场景代码"/>
            </template>
            <span>{{ scope.row.trxno }}</span>
          </template>
        </el-table-column>
        <el-table-column label="场景名称" prop="trxname">
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-input v-model="scope.row.trxname" class="edit-input" placeholder="场景名称"/>
            </template>
            <span>{{ scope.row.trxname }}</span>
          </template>
        </el-table-column>
        <el-table-column label="柜员交易平均时长(秒)" prop="avgtime1">
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-input v-model="scope.row.avgtime1" class="edit-input" placeholder="柜员交易平均时长(秒)"/>
            </template>
            <span>{{ scope.row.avgtime1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="全行交易平均时长(秒)" prop="avgtime2">
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-input v-model="scope.row.avgtime2" class="edit-input" placeholder="全行交易平均时长(秒)"/>
            </template>
            <span>{{ scope.row.avgtime2 }}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="pageNum"
        :page-size="pageSize"
        :page-sizes="[5, 10, 20, 40]"
        :total="totals"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"/>
    </el-row>
  </el-main>
</template>

<script>
export default {
  name: 'T0013',
  data() {
    return {
      inputForm: {
        brno: '',
        accdate: '',
        trxno: ''
      },
      inputRules: { // 表单校验
        brno: [
          { required: true, message: '请输入机构代码', trigger: 'blur' }
        ],
        accdate: [
          { required: true, message: '请选择日期', trigger: 'blur' }
        ],
        trxno: [
          // {required: true, message: '请输入交易代码', trigger: 'blur'}
        ]
      },
      pickerOptions1: {
        shortcuts: [{
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
            picker.$emit('pick', date)
          }
        }]
      },
      tableData: [],
      totals: 0,
      pageNum: 1, // 初始页
      pageSize: 10 //    每页的数据
    }
  },
  methods: {
    inquire: function() { // 查询
      this.pageNum = 1
      console.log('pageNum: ' + this.pageNum) // 点击第几页
      this.login()
    },
    login: function() {
      this.$refs.form.validate(
        valid => {
          if (valid) {
            console.log('this.pageSize : ' + this.pageSize)
            const params = { 'pageNum': this.pageNum, 'pageSize': this.pageSize, 'brno': this.inputForm.brno, 'accdate': this.inputForm.accdate, 'trxno': this.inputForm.trxno }
            this.$http(this.$reportMngApi.getTableData, params).then( // 此处调用自己的Api接口方法
              res => {
                const resdata = res.data.data
                console.log(res.data)
                if (resdata.code === 'SUCCESS') {
                  if (resdata.data.TrxCode === '000000') {
                    // 赋值
                    this.totals = resdata.data.PageInfo.total
                    this.tableData = resdata.data.PageInfo.list
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
              }
            )
          }
        }
      )
    }, // 初始页pageNum、初始每页数据数pageSize和数据data
    handleSizeChange: function(size) {
      this.pageSize = size
      console.log(this.pageSize) // 每页下拉显示数据
      this.login()
    },
    handleCurrentChange: function(pageNum) { // 翻页
      this.pageNum = pageNum
      console.log(this.pageNum) // 点击第几页
      this.login()
    },
    handleSelectionChange(val) { // 选中表格数据
      this.val = val
      this.multipleSelection = val
    },
    changeCode() {
      this.$nextTick(() => {
        if (this.inputForm.trxno !== null && this.inputForm.trxno.match('[\u4e00-\u9fa5]')) {
          this.$message({
            showClose: true,
            message: '禁止输入中文',
            type: 'warning'
          })
          this.inputForm.trxno = ''
        }
        if (this.inputForm.brno !== null && this.inputForm.brno.match('[\u4e00-\u9fa5]')) {
          this.$message({
            showClose: true,
            message: '禁止输入中文',
            type: 'warning'
          })
          this.inputForm.brno = ''
        }
      })
    },
    // 下载文件
    derive: function() {
      if (this.totals === 0) {
        this.$message({
          showClose: true,
          message: '查询数据为空',
          type: 'warning'
        })
        return
      }
      const params = { 'brno': this.inputForm.brno, 'accdate': this.inputForm.accdate, 'trxno': this.inputForm.trxno, 'sltMonth': '', 'dealNumber': 'T0013' }
      this.$http(this.$reportMngApi.driveTableDataExl, params) // 此处调用自己的Api接口方法
        .then(
          res => {
            this.download(res.data)
            console.log('导出成功')
          })
        .catch(error => {
          console.log(error)
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
      link.setAttribute('download', this.inputForm.accdate + '柜员交易平均时间日报表' + '.xlsx')
      console.log('link============>' + link)
      document.body.appendChild(link)
      link.click()
    }
  }
}
</script>

<style>
  .el-row {
    margin-bottom: 20px;
  }
  .grid-content {
    min-height: 20px;
  }
</style>
<style>
  @import "../../../styles/public.css";
</style>
