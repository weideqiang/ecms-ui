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
        <el-form-item label="机构代码：" prop="brno">
          <el-input id="brno" v-model="inputForm.brno" placeholder="请输入机构代码" maxlength="6" @input.capture="changeCode"/>
        </el-form-item>
        <el-form-item label="柜员代码:" prop="userno">
          <el-input id="userno" v-model="inputForm.userno" placeholder="请输入柜员代码" maxlength="6" @input.capture="changeCode"/>
        </el-form-item>
        <el-form-item label="交易类别:" prop="privateAndPublicSigns">
          <el-select v-model="inputForm.privateAndPublicSigns" clearable placeholder="请选择" >
            <el-option v-for="item in option" :label="item.lable" :value="item.value" :key="item.value"/>
          </el-select>
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
        <el-table-column label="机构号" prop="branchno">
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-input v-model="scope.row.branchno" class="edit-input" placeholder="机构号"/>
            </template>
            <span>{{ scope.row.branchno }}</span>
          </template>
        </el-table-column>
        <el-table-column label="流水号" prop="mainserialno">
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-input v-model="scope.row.mainserialno" class="edit-input" placeholder="流水号"/>
            </template>
            <span>{{ scope.row.mainserialno }}</span>
          </template>
        </el-table-column>
        <el-table-column label="交易时间" prop="tradetime">
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-input v-model="scope.row.tradetime" class="edit-input" placeholder="交易时间"/>
            </template>
            <span>{{ scope.row.tradetime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="交易名称" prop="tradename">
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-input v-model="scope.row.tradename" class="edit-input" placeholder="交易名称"/>
            </template>
            <span>{{ scope.row.tradename }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作类别" prop="businesstype">
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-input v-model="scope.row.businesstype" class="edit-input" placeholder="操作类别"/>
            </template>
            <span>{{ scope.row.businesstype }}</span>
          </template>
        </el-table-column>
        <el-table-column label="交易账号/科目号" prop="tradeaccno">
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-input v-model="scope.row.tradeaccno" class="edit-input" placeholder="交易账号/科目号"/>
            </template>
            <span>{{ scope.row.tradeaccno }}</span>
          </template>
        </el-table-column>
        <el-table-column label="凭证类型" prop="vouchertype">
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-input v-model="scope.row.vouchertype" class="edit-input" placeholder="凭证类型"/>
            </template>
            <span>{{ scope.row.vouchertype }}</span>
          </template>
        </el-table-column>
        <el-table-column label="凭证号码" prop="vouchernumber">
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-input v-model="scope.row.vouchernumber" class="edit-input" placeholder="凭证号码"/>
            </template>
            <span>{{ scope.row.vouchernumber }}</span>
          </template>
        </el-table-column>
        <el-table-column label="交易金额" prop="tradeamount">
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-input v-model="scope.row.tradeamount" class="edit-input" placeholder="交易金额"/>
            </template>
            <span>{{ scope.row.tradeamount }}</span>
          </template>
        </el-table-column>
        <el-table-column label="币种" prop="currencytype">
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-input v-model="scope.row.currencytype" class="edit-input" placeholder="币种"/>
            </template>
            <span>{{ scope.row.currencytype }}</span>
          </template>
        </el-table-column>
        <el-table-column label="交易类型" prop="catrflag">
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-input v-model="scope.row.catrflag" class="edit-input" placeholder="交易类型"/>
            </template>
            <span v-if="scope.row.catrflag == 0">现金</span>
            <span v-if="scope.row.catrflag == 1">转账</span>
            <span v-if="scope.row.catrflag == 2">其他</span>
          </template>
        </el-table-column>
        <el-table-column label="交易柜员" prop="userno">
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-input v-model="scope.row.userno" class="edit-input" placeholder="交易柜员"/>
            </template>
            <span>{{ scope.row.userno }}</span>
          </template>
        </el-table-column>
        <el-table-column label="审批员" prop="authuserno1">
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-input v-model="scope.row.authuserno1" class="edit-input" placeholder="审批员"/>
            </template>
            <span>{{ scope.row.authuserno1 }}</span>
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
  name: 'T0016',
  data() {
    return {
      inputForm: {
        brno: '',
        accdate: '',
        userno: '',
        privateAndPublicSigns: ''
      },
      option: [
        { value: '全部', label: '' },
        { value: '现金', label: '00' },
        { value: '转账', label: '01' },
        { value: '其他', label: '02' }
      ],
      inputRules: { // 表单校验
        brno: [
          // { required: true, message: '请输入机构代码', trigger: 'blur' }
        ],
        accdate: [
          { required: true, message: '请选择日期', trigger: 'blur' }
        ],
        userno: [
          // {required: true, message: '请输入交易代码', trigger: 'blur'}
        ],
        privateAndPublicSigns: [
          // {required: true, message: '请输入交易代码', trigger: 'blur'}
        ]
      },
      pps: '',
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
            if (this.inputForm.privateAndPublicSigns === '全部') {
              this.pps = ''
            } else if (this.inputForm.privateAndPublicSigns === '现金') {
              this.pps = '0'
            } else if (this.inputForm.privateAndPublicSigns === '转账') {
              this.pps = '1'
            } else if (this.inputForm.privateAndPublicSigns === '其他') {
              this.pps = '2'
            }
            const params = { 'pageNum': this.pageNum, 'pageSize': this.pageSize, 'accdate': this.inputForm.accdate, 'brno': this.inputForm.brno, 'userno': this.inputForm.userno, 'privateAndPublicSigns': this.pps }
            this.$http(this.$reportMngApi.getBusinessListingTableData, params).then( // 此处调用自己的Api接口方法
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
        if (this.inputForm.userno !== null && this.inputForm.userno.match('[\u4e00-\u9fa5]')) {
          this.$message({
            showClose: true,
            message: '禁止输入中文',
            type: 'warning'
          })
          this.inputForm.userno = ''
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
      if (this.inputForm.privateAndPublicSigns === '全部') {
        this.pps = ''
      } else if (this.inputForm.privateAndPublicSigns === '现金') {
        this.pps = '0'
      } else if (this.inputForm.privateAndPublicSigns === '转账') {
        this.pps = '1'
      } else if (this.inputForm.privateAndPublicSigns === '其他') {
        this.pps = '2'
      }
      const params = { 'accdate': this.inputForm.accdate, 'brno': this.inputForm.brno, 'userno': this.inputForm.userno, 'privateAndPublicSigns': this.pps }
      this.$http(this.$reportMngApi.BusinessListingTableDataExl, params) // 此处调用自己的Api接口方法
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
      link.setAttribute('download', this.inputForm.accdate + '业务清单报表' + '.xlsx')
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
