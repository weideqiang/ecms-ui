<template>
  <el-main>
    <el-row>
      <el-form
        ref="form"
        :inline="true"
        :model="inputForm"
        :rules="inputRules"
        class="ecms-trx-search"
        label-position="left">
        <el-form-item label="选择月份:" prop="sltMonth">
          <el-date-picker
            id="sltMonth"
            v-model="inputForm.sltMonth"
            editable
            class="input-class"
            type="month"
            placeholder="选择月份"
            format="yyyy 年 MM 月"
            value-format="yyyyMM" />
        </el-form-item>
        <el-form-item label="交易代码:">
          <el-input id="name" v-model="inputForm.trxno" placeholder="请输入交易代码" maxlength="8" @input.capture="changeCode" />
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
    <el-row>
      <el-table
        ref="multipleTable"
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        tooltip-effect="dark"
        style="width: 100%"
        height="350"
        @selection-change="handleSelectionChange">
        <el-table-column prop="trxno" label="场景代码">
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-input v-model="scope.row.trxno" class="edit-input" placeholder="场景代码"/>
            </template>
            <span v-else>{{ scope.row.trxno }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="trxname" label="场景名称">
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-input v-model="scope.row.trxname" class="edit-input" placeholder="场景名称"/>
            </template>
            <span v-else>{{ scope.row.trxname }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="avgtime1" label="平均时长(秒)">
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
        :page-sizes="[5, 10, 20, 40]"
        :page-size="pagesize"
        :total="totals"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </el-row>
  </el-main>
</template>

<script>
export default {
  name: 'T0004Vue',
  data() {
    return {
      inputForm: {
        trxno: '',
        sltMonth: ''
      },
      inputRules: {
        sltMonth: [
          { required: true, message: '请选择月份', trigger: 'blur' }
        ]
      },
      totals: 0,
      currentPage: 1, // 初始页
      pagesize: 10, //    每页的数据
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
          const params = { 'pageNum': this.pageNum, 'pageSize': this.pagesize, 'sltMonth': this.inputForm.sltMonth, 'trxno': this.inputForm.trxno }
          this.$http(this.$reportMngApi.getAllBankTrxMonthAvgTime, params).then(
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
            })
        }
      })
    },
    handleSelectionChange(val) { // 选中表格数据
      this.val = val
      this.multipleSelection = val
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
      const params = { 'brno': this.brno, 'accdate': this.inputForm.sltMonth, 'trxno': this.inputForm.trxno, 'tradeCode': 'T0004' }
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
    } }
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
