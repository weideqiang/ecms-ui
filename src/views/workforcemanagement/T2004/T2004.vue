<template>
  <el-main>
    <el-row :gutter="20">
      <el-form
        ref="inputForm"
        :inline="true"
        :model="inputForm"
        :rules="inputRules"
        class="demo-form-inline"
        label-width="100px"
        label-position="left"
        size="small">
        <el-col :span="8">
          <el-form-item label-width="150px" label="起始月份：" prop="sltMonth" >
            <el-date-picker
              id="sltMonth"
              v-model="inputForm.sltMonth"
              type="month"
              placeholder="选择月份"
              editable
              value-format="yyyyMM"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label-width="150px" label="结束月份：" prop="endDate">
            <el-date-picker
              id="endDate"
              v-model="inputForm.endDate"
              type="month"
              placeholder="选择月份"
              editable
              value-format="yyyyMM"/>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <el-row>
      <el-form :inline="true" class="ecms-trx-button">
        <el-form-item>
          <el-button type="primary" size="medium" @click="submitForm">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" @click="driveExcl">导出</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <br>
    <el-row>
      <el-col :span="23">
        <span class="ecms-trx-result-title">
          <img src="../../../assets/trx_tablelogo.png" width="42" height="42" style="vertical-align:middle">系统排班表
        </span>
      </el-col>
      <el-col :span="1">
        <span class="ecms-trx-result-fullScreen">
          <img id="trx_fullScreen" src="../../../assets/trx_fullScreen.png" width="30" height="30" style="vertical-align:middle" @click="fullScreen()">
        </span>
      </el-col>
      <el-table id="content" ref="multipleTable" :data="tableData" height="500" border>
        <el-table-column prop="xm" label="姓名">
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-input v-model="scope.row.xm" class="edit-input" placeholder="姓名"/>
            </template>
            <span v-else>{{ scope.row.xm }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="xx" label="休息">
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-input v-model="scope.row.xx" class="edit-input" placeholder="休息"/>
            </template>
            <span v-else>{{ scope.row.xx }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="xj" label="休假">
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-input v-model="scope.row.xj" class="edit-input" placeholder="休假"/>
            </template>
            <span v-else>{{ scope.row.xj }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="zb" label="早班">
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-input v-model="scope.row.zb" class="edit-input" placeholder="早班"/>
            </template>
            <span v-else>{{ scope.row.zb }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="zhb" label="中班">
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-input v-model="scope.row.zhb" class="edit-input" placeholder="中班"/>
            </template>
            <span v-else>{{ scope.row.zhb }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="wb" label="晚班">
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-input v-model="scope.row.wb" class="edit-input" placeholder="晚班"/>
            </template>
            <span v-else>{{ scope.row.wb }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="wbzzz" label="晚班至扎账">
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-input v-model="scope.row.wbzzz" class="edit-input" placeholder="晚班至扎账"/>
            </template>
            <span v-else>{{ scope.row.wbzzz }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="bb" label="白班">
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-input v-model="scope.row.bb" class="edit-input" placeholder="白班"/>
            </template>
            <span v-else>{{ scope.row.bb }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="bbzzz" label="白班至扎账">
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-input v-model="scope.row.bbzzz" class="edit-input" placeholder="白班至扎账"/>
            </template>
            <span v-else>{{ scope.row.bbzzz }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="wbC" label="晚班">
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-input v-model="scope.row.wbC" class="edit-input" placeholder="晚班"/>
            </template>
            <span v-else>{{ scope.row.wbC }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </el-main>
</template>

<script>
import screenfull from 'screenfull'
export default {
  name: 'T2004',
  data() {
    return {
      currentPage: 1, // 初始页
      pagesize: 10, //    每页的数据
      tableData: [],
      pagesizes: 0,
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      inputRules: {
        sltMonth: [
          { required: true, message: '请输入月份', trigger: 'blur' },
          { min: 0, max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur' }
        ],
        endDate: [
          { required: true, message: '请输入月份', trigger: 'blur' },
          { min: 0, max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur' }
        ]
      },
      inputForm: { // 弹框表单
        sltMonth: '',
        endDate: ''
      }
    }
  },
  methods: {
    submitForm() { // 查询
      this.$refs.inputForm.validate(valid => {
        if (valid) {
          const params = { 'pageNum': this.pageNum, 'pageSize': this.pagesize, 'sltMonth': this.inputForm.sltMonth, 'endDate': this.inputForm.endDate }
          this.$http(this.$workForceMngApi.queryStatistics, params).then(
            res => {
              const resdata = res.data.data
              console.log('resdata' + resdata.data.list)
              if (resdata.code === 'SUCCESS') {
                if (resdata.data.TrxCode === '000000') {
                  // this.pagesizes = resdata.data.pageInfo.total
                  this.tableData = resdata.data.list
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
      this.submitForm()
    },
    handleCurrentChange: function(currentPage) {
      this.pageNum = currentPage
      console.log(this.currentPage) // 点击第几页
      this.submitForm()
    },
    fullScreen() { // 需要安装依赖:npm i --save screenfull
      if (!screenfull.enabled) {
        this.$message({
          message: 'you browser can not work',
          type: 'warning'
        })
        return false
      }
      const mainTable = document.querySelector('#content')
      screenfull.toggle(mainTable)
    },
    driveExcl() {
      this.$refs.inputForm.validate(valid => {
        if (valid) {
          const params = { 'month': this.inputForm.sltMonth, 'endDate': this.inputForm.endDate }
          this.$http(this.$workForceMngApi.queryStatisticsForExcl, params)
            .then(
              res => {
                console.log(res.data)
                this.download(res.data)
                this.$message({
                  showClose: true,
                  message: '导出成功',
                  type: 'warning'
                })
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
      link.setAttribute('download', this.inputForm.sltMonth + '.xls')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    }
  }
}

</script>

<style scoped>

</style>
<style>
  @import "../../../styles/public.css";
</style>
