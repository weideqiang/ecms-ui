<template>
  <el-main>
    <el-row >
      <el-form
        ref="form"
        :inline="true"
        :model="inputForm"
        :rules="inputRules"
        class="ecms-trx-search"
        label-position="left">
        <el-form-item label="选择日期:" prop="accdate">
          <el-date-picker
            id="accdate"
            v-model="inputForm.accdate"
            class="input-class"
            editable
            format="yyyy 年 MM 月 dd 日"
            placeholder="选择日期"
            type="date"
            value-format="yyyyMMdd">>
          </el-date-picker>
        </el-form-item>
        <el-form-item label="交易代码:">
          <el-input id="name" v-model="inputForm.trxno" placeholder="请输入交易代码" maxlength="8" @input.capture="changeCode"/>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-form :inline="true" class="ecms-trx-button">
        <el-form-item>
          <el-button type="primary" size="medium" @click="login">查询</el-button>
          <el-button type="primary" size="medium" @click="deriveExcel">导出</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row >
      <el-table
        ref="multipleTable"
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        border
        style="width: 100%"
        tooltip-effect="dark"
        height="350"
        @selection-change="handleSelectionChange">
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
            <span v-else>{{ scope.row.trxname }}</span>
          </template>
        </el-table-column>
        <el-table-column label="平均时长(秒)" prop="avgtime1">
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-input v-model="scope.row.avgtime1" class="edit-input" placeholder="平均时长(秒)"/>
            </template>
            <span v-else>{{ scope.row.avgtime1 }}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="currentPage"
        :page-size="pagesize"
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
  name: 'T0003Vue',
  data() {
    return {
      inputForm: {
        trxno: '',
        accdate: ''
      },
      inputRules: {
        accdate: [
          { required: true, message: '请选择日期', trigger: 'blur' }
        ]
      },
      totals: 0,
      currentPage: 1, // 初始页
      pagesize: 10, // 每页的数据
      tableData: [],

      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      }
    }
  },
  methods: {
    login: function() { // 查询
      this.$refs.form.validate(valid => {
        if (valid) {
          const params = { 'pageNum': this.pageNum, 'pageSize': this.pagesize, 'accdate': this.inputForm.accdate, 'trxno': this.inputForm.trxno }
          this.$http(this.$reportMngApi.getAllBankTrxAvgTime, params).then(
            res => {
              const resdata = res.data.data
              console.log(res.data)
              if (resdata.code === 'SUCCESS') {
                if (resdata.data.TrxCode === '000000') {
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
                  message: resdata.message,
                  type: 'warning'
                })
              }
            }
          )
        }
      })
    },
    handleSelectionChange(val) { // 选中表格数据
      this.val = val
      this.multipleSelection = val
      console.log('val : ' + val)
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pagesize = size
      console.log(this.pagesize) // 每页下拉显示数据
      this.login()
    },
    handleCurrentChange: function(currentPage) {
      this.pageNum = currentPage
      console.log(this.currentPage) // 点击第几页
      this.login()
    },
    handleUserList() {
      this.$http.get('http://localhost:3000/userList').then(res => { // 这是从本地请求的数据接口
        this.userList = res.body
      })
    },
    deriveExcel() {
      if (this.totals == null || this.totals === 0) {
        console.log('===========' + this.totals)
        this.$message({
          showClose: true,
          message: '请进行查询!',
          type: 'warning'
        })
        return
      }
      const params = { 'brno': this.brno, 'accdate': this.inputForm.accdate, 'trxno': this.inputForm.trxno, 'tradeCode': 'T0003' }
      this.$http(this.$reportMngApi.downLoadExl, params)// 此处调用自己的Api接口方法
        .then(
          res => {
            console.log(res.data)
            this.download(res.data)
            console.log('导出成功')
          }).catch(error => {
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
      link.setAttribute('download', 'excel.xls')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
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
      })
    }
  }
}
</script>

<style scoped>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

  .cell-edit-color {
    color: #2db7f5;
    font-weight: bold;
  }

  .cell-edit-input .el-input, .el-input__inner {
    width: 100px;
  }

  .cell-icon {
    cursor: pointer;
    color: #fff;
  }

  .input-class {
    width: 200px;
  }

  .el-row {
    margin-bottom: 20px;

  }

</style>
<style>
  @import "../../../styles/public.css";
</style>
