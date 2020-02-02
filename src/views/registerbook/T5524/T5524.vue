<template>
  <el-main>
    <div>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        class="demo-form-inline"
        label-width="100px"
        size="small">
        <hr>
        <br>
        <el-row>
          <el-col :span="8">
            <el-form-item label="开户渠道：" prop="accountOpenChanel">
              <el-select v-model="ruleForm.accountOpenChanel" placeholder="请选择" style="width: 80%;" clearable>
                <el-option v-for="item in accountOpenChanels" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="起始日期：" prop="startDate">
              <el-date-picker
                id="startDate"
                :disabled="false"
                v-model="ruleForm.startDate"
                :picker-options="pickerOptions1"
                class="info-startDate"
                type="date"
                placeholder="选择日期"
                editable
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyyMMdd"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="结束日期：" prop="endDate">
              <el-date-picker
                id="endDate"
                :disabled="false"
                v-model="ruleForm.endDate"
                :picker-options="pickerOptions1"
                class="info-startDate"
                type="date"
                placeholder="选择日期"
                editable
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyyMMdd"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="存款人名称：" style="width: 85%;" prop="CKRMC">
              <el-input v-model="ruleForm.CKRMC" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证明文件号码：" style="width: 85%;" prop="ZMWJHM">
              <el-input v-model="ruleForm.ZMWJHM" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="dialog-footer" style="width: 92%;" align="right">
        <el-row>
          <el-col :span="8">
            <el-button size="medium" type="primary" @click="exitTrade()">{{ '退出' }}</el-button>
          </el-col>
          <el-col :span="8">
            <el-button size="medium" type="primary" @click="qyeryCustomerCreation()">{{ '查询' }}</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <br>
    <el-row class="ecms-trx-result">
      <tl-table
        :table="dataTable"
        :data="tableData"
        :pagesizes="pagesizes"
        :expand-keys="expandKeys"
        :id="id"
        :disabled-pagination="disabledPagination"
        @handleCurrentChange="handleCurrentChange"
        @handleSelectionChange="handleSelectionChange"
        @onRowdbClick="onRowdbClick"
        @handleSizeChange="handleSizeChange"/>
    </el-row>
  </el-main>
</template>

<script>
import { mapGetters } from 'vuex'
import { DateTime } from '../../../commjs/common'
export default {
  name: 'T5524',
  components: { DateTime },
  data() {
    const validSixNum = (rule, value, callback) => {
    }
    return {
      ruleForm: {
        accountOpenChanel: '',
        startDate: '', // 起始日期
        endDate: '', // 结束日期
        CKRMC: '', // 存款人名称
        ZMWJHM: '' // 证明文件号码
      },
      rules: {
        accountOpenChanel: [
          { required: true, message: '请选择操作类型', trigger: 'change' },
          { trigger: 'change', validator: validSixNum }
        ],
        startDate: [
          { required: false, message: '请选择起始日期', trigger: 'blur' }
        ],
        endDate: [
          { required: false, message: '请选择结束日期', trigger: 'blur' }
        ],
        CKRMC: [
          { required: false, message: '请输入存款人名称', trigger: 'blur' }
        ],
        ZMWJHM: [
          { required: false, message: '请输入证明文件号码', trigger: 'blur' }
        ]
      },
      CurrentUserNo: '', // 初始化-当前柜员号
      CurrentUserName: '', // 初始化-当前柜员名称
      CurrentBranchNo: '', // 初始化-当前机构号
      CurrentBranchName: '', // 初始化-当前机构名称
      CurrentZoneNo: '', // 初始化-当前地区号
      CurrentSystemDate: '', // 初始化-当前系统日期
      CurrentSystemTime: '', // 当前系统时间
      mesage: '',
      tableData: [], // 用户信息
      currentPage: 1, // 初始页
      pagesize: 10, // 每页显示条数
      pagesizes: 0, // this.$route.params.map.total, // 总条数
      expandKeys: [],
      id: 'userNo',
      disabledPagination: false,
      accountOpenChanels: this.$combo.accountOpenChanel
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    device() { // 获取客户端类型
      return this.$store.state.app.device
    },
    dataTable() {
      const table = {
        currentPage: 1, // 初始页
        pagesize: 10, // 每页显示条数
        pagesizes: 0, // 总条数
        hasMergeRowOrColumn: false, // 是否合并单元格
        loading: false, // 加载中动画
        hasShowSummary: false, // 是否显示表位合计行
        border: false, // 是否带有纵向边框，默认为false
        hasSelect: false, // 有无选中功能
        hasOperation: false // 有无操作功能
        // hasShowNum: true // 是否显示序号
        // data: [] // 表格内容数据
      }
      if (this.device === 'mobile') { // 移动端
        this.$set(table, 'hasExpand', true) // 有无展开行功能
        this.$set(table, 'hasShowNum', false) // 是否显示序号
        const tr = [
          { id: '1', label: '账号', prop: 'NOTE30' },
          { id: '2', label: '存款人名称', prop: 'CUSTOMERNAME' },
          { id: '3', label: '存款人手机号码', prop: 'PHONENUMBER' },
          { id: '4', label: '开户许可证号码', prop: 'NOTE31' },
          { id: '5', label: '开户核实日期', prop: 'NOTE32' },
          { id: '6', label: '开户许可证到期日', prop: 'NOTE33' }
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
          { id: '1', label: '账号', prop: 'NOTE30' },
          { id: '2', label: '存款人名称', prop: 'CUSTOMERNAME' },
          { id: '3', label: '存款人手机号码', prop: 'PHONENUMBER' },
          { id: '4', label: '开户许可证号码', prop: 'NOTE31' },
          { id: '5', label: '开户核实日期', prop: 'NOTE32' },
          { id: '6', label: '开户许可证到期日', prop: 'NOTE33' }
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
  mounted: function() { // 初始化或跳转返回调用
    if (this.CurrentUserNo === '') { // 进行初始化操作
      this.$http(this.$systemPublicApi.getSystemPublicInfo)
        .then(
          res => {
            console.log('tradeINit--start--' + JSON.stringify(res.data))
            this.CurrentUserNo = res.data.CurrentUserNo
            this.CurrentUserName = res.data.CurrentUserName
            this.CurrentBranchNo = res.data.CurrentBranchNo
            this.CurrentBranchName = res.data.CurrentBranchName
            this.CurrentZoneNo = res.data.CurrentZoneNo
            this.CurrentSystemDate = res.data.CurrentSystemDate
            console.log('tradeINit-end--' + this.CurrentUserNo)
          })
    }
  },
  methods: {
    queryTDataByPageSizeAndNum(pageNum, pageSize) {
      console.log('T5524 queryTDataByPageSizeAndNum :' + pageNum + '|' + pageSize)
      const map = {
        'openingchannel': this.ruleForm.accountOpenChanel, 'gwauditstatus': '9',
        'customername': this.ruleForm.CKRMC, 'thedocumentserialno': this.ruleForm.ZMWJHM,
        'BeginDate': this.ruleForm.startDate, 'EndDate': this.ruleForm.endDate
      }
      const params1 = { 'ruleForm': JSON.stringify(map), 'currentPage': pageNum, 'pageSize': pageSize }
      const url1 = this.$registerBookApi.getCustomCreation
      this.$http(url1, params1).then( // 通讯后台修改数据库中信息
        res1 => {
          const _data1 = res1.data
          // 赋值
          if (_data1.code === 'SUCCESS') {
            if (_data1.data.TrxCode === '000000') {
              this.tableData = _data1.data.PageInfo.list
            } else {
              if (_data1.data.TrxCode === 'T5519_001') {
                this.messageWarning('已无记录,请返回')
                return
              } else {
                this.messageError('错误信息 ： ' + _data1.data.TrxMessage)
                return
              }
            }
          } else {
            this.messageError('错误信息 ： ' + _data1.message)
            return
          }
        })
    },
    qyeryCustomerCreation() {
      if (this.ruleForm.startDate === '' && this.ruleForm.endDate === '' && this.ruleForm.CKRMC === '' && this.ruleForm.ZMWJHM === '') {
        this.messageError('查询条件不能全部为空')
        return
      }
      const map = {
        'openingchannel': this.ruleForm.accountOpenChanel, 'gwauditstatus': '9',
        'customername': this.ruleForm.CKRMC, 'thedocumentserialno': this.ruleForm.ZMWJHM,
        'BeginDate': this.ruleForm.startDate, 'EndDate': this.ruleForm.endDate
      }
      const params = { 'ruleForm': JSON.stringify(map), 'pageNum': '1', 'pageSize': '10' }
      console.log('qyeryCustomerCreation requestParams :' + JSON.stringify(params))
      const url = this.$registerBookApi.getCustomCreation
      this.$http(url, params).then( // 通讯后台修改数据库中信息
        res => {
          const _data = res.data
          // 赋值
          if (_data.code === 'SUCCESS') {
            if (_data.data.TrxCode === '000000') {
              console.log(_data.data.TotalNum)
              if (_data.data.TotalNum === 0) {
                this.messageWarning('查询无记录!')
              } else {
                console.log('通讯返回TotalNum :' + JSON.stringify(_data.data.TotalNum) + '|' + JSON.stringify(res.data))
                this.pagesizes = _data.data.TotalNum
                this.tableData = _data.data.PageInfo.list
              }
            } else {
              if (_data.data.TrxCode === 'T5519_001') {
                this.messageWarning('查询无记录!')
              } else {
                this.messageError('错误信息 ： ' + _data.data.TrxMessage)
              }
            }
          } else {
            this.messageError('错误信息 ： ' + _data.message)
          }
        })
    },
    pickerOptions1() {
    },
    exitTrade() { // 交易退出返回首页
      this.$router.push({
        path: this.redirect || '/dashboard'
      })
    },
    selectLable: function(key, list) {
      for (let i = 0; i < list.length; i++) {
        const value = list[i].value
        if (key === value) {
          return list[i].label
        }
      }
    },
    handleSelectionChange(val) { // 选中表格数据1
      this.val = val
      this.multipleSelection = val
    },
    onRowdbClick: function(row) { // 表格双击事件
      // const pageInfo = row.row.OPERATION
      this.$router.push({
        path: this.redirect || '/T552401',
        name: 'T552401',
        params: {
          __confirmData: row
        }
      })
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pagesize = size // 每页下拉显示数据
      this.queryTDataByPageSizeAndNum(this.currentPage, this.pagesize)
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
  .ecms-trx-button{
    text-align: center;
  }
</style>
