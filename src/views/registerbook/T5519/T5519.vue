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
        <br>
        <hr>
      </div>
    </div>
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
export default {
  name: 'T5519',
  data() {
    const validKHQD = (rule, value, callback) => {
    }
    return {
      ruleForm: {
        accountOpenChanel: '', // 渠道
        startDate: '', // 起始日期
        endDate: '', // 结束日期
        CKRMC: '', // 存款人名称
        ZMWJHM: '' // 证明文件号码
      },
      rules: {
        accountOpenChanel: [
          { required: true, message: '请选择开户渠道', trigger: 'change' },
          { trigger: 'change', validator: validKHQD }
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
      tableData: [], // 用户信息
      currentPage: 1, // 初始页
      pagesize: 10, // 每页显示条数
      pagesizes: 0, // this.$route.params.map.total, // 总条数
      expandKeys: [],
      id: 'userNo',
      disabledPagination: false,
      accountOpenChanels: this.$combo.accountOpenChanel,
      GWAUDITSTATUSS: this.$combo.GWYYKHSHZT, // 官网预约开户审核状态
      ACCOUNTTYPES: this.$combo.ZHXZ, // 账户性质
      VERIFYTYPES: this.$combo.SQQD, // 申请渠道
      IDTYPE: this.$combo.bQueryNames // 证件种类
    }
  },
  computed: {
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
          { id: '1', label: '渠道流水', prop: 'CHANELSERIALNO' },
          { id: '2', label: '官网预约开户审核状态', prop: 'GWAUDITSTATUS' },
          { id: '3', label: '审核不通过原因', prop: 'ABSTRACT' },
          { id: '4', label: '申请渠道', prop: 'CHANNEL' },
          { id: '5', label: '存款人名称', prop: 'CUSTOMERNAME' },
          { id: '6', label: '存款人手机号码', prop: 'PHONENUMBER' },
          { id: '7', label: '证明文件种类', prop: 'THEDOCUMENTTYPE' },
          { id: '8', label: '证明文件编号', prop: 'THEDOCUMENTSERIALNO' },
          { id: '9', label: '法定代表人姓名', prop: 'LEGALPERSON' },
          { id: '10', label: '法定代表人身份证号码', prop: 'LEGALPERSONCERTIFICATENO' },
          { id: '11', label: '账户性质', prop: 'ACCOUNTTYPE' },
          { id: '12', label: '申请日期', prop: 'APPLEDATE' },
          { id: '13', label: '审核通过日期', prop: 'AUDITINGDATE' },
          { id: '14', label: '上门核实日期', prop: 'VERIFYDATE' },
          { id: '15', label: '上门核实类别', prop: 'VERIFYTYPE' },
          { id: '16', label: '核实交出人1', prop: 'VERIFYHANDOVER1' },
          { id: '17', label: '核实交出人2', prop: 'VERIFYHANDOVER2' },
          { id: '18', label: '核实接收人', prop: 'VERIFYRECIPIENT' },
          { id: '19', label: '上门核实流水号', prop: 'VERIFYMAINSERIALNO' },
          { id: '20', label: '交接资料日期', prop: 'HANDOVERDATADATE' },
          { id: '21', label: '交接交出人', prop: 'JJZLHANDOVER1' },
          { id: '22', label: '交接接收人', prop: 'JJZLRECIPIENT' },
          { id: '23', label: '交接资料流水号', prop: 'JJZLMAINSERIALNO' },
          { id: '24', label: '报送资料日期', prop: 'SUBMITDATADATE' },
          { id: '25', label: '报送资料方式', prop: 'SUBMITDATATYPE' },
          { id: '26', label: '报送交出人', prop: 'SUBMITHANDOVER' },
          { id: '27', label: '报送交出人证件类型', prop: 'SUBMITIDTYPE1' },
          { id: '28', label: '报送交出人证件号码', prop: 'SUBMITIDNO1' },
          { id: '29', label: '报送接收人', prop: 'SUBMITRECIPIENT' },
          { id: '30', label: '报送接收人证件类型', prop: 'SUBMITIDTYPE2' },
          { id: '31', label: '报送接收人证件号码', prop: 'SUBMITIDNO2' },
          { id: '32', label: '报送人', prop: 'SUBMISSION' },
          { id: '33', label: '报送人证件类型', prop: 'SUBMITIDTYPE3' },
          { id: '34', label: '报送人证件号码', prop: 'SUBMITIDNO3' },
          { id: '35', label: '报送资料流水号', prop: 'SUBMITMAINSERIALNO' },
          { id: '36', label: '通知客户日期', prop: 'INFORMDATE' },
          { id: '37', label: '通知客户姓名', prop: 'INFORMNAME' },
          { id: '38', label: '通知客户电话', prop: 'INFORMPHONE' },
          { id: '39', label: '通知客户流水号', prop: 'INFORMMAINSERIALNO' },
          { id: '40', label: '领回开户许可证日期', prop: 'GETBACKDATE' },
          { id: '41', label: '领回方式', prop: 'GETBACKTYPE' },
          { id: '42', label: '领回交出人', prop: 'GETBACKHANDOVER' },
          { id: '43', label: '领回接收人', prop: 'GETBACKRECIPIENT' },
          { id: '44', label: '领回人', prop: 'REGENERATOR' },
          { id: '45', label: '领回开户许可证流水号', prop: 'GETBACKMAINSERIALNO' },
          { id: '46', label: '领取开户许可证日期', prop: 'RECEIVEDATE' },
          { id: '47', label: '领取人姓名', prop: 'RECEIVENAME' },
          { id: '48', label: '领取人证件类型', prop: 'RECEIVEIDTYPE' },
          { id: '49', label: '领取人证件号码', prop: 'RECEIVEIDNO' },
          { id: '50', label: '存款人名称', prop: 'CUSTOMERNAME' },
          { id: '51', label: '领取开户许可证流水号', prop: 'RECEIVEMAINSERIALNO' },
          { id: '52', label: '账号', prop: 'NOTE30' },
          { id: '53', label: '开户许可证号码', prop: 'NOTE31' },
          { id: '54', label: '开户核实日期', prop: 'NOTE32' },
          { id: '55', label: '开户许可日期', prop: 'NOTE33' },
          { id: '56', label: '主管单位组织机构代码', prop: 'RESPONSIBLEORGANIZATIONCODE' },
          { id: '57', label: '主管单位营业执照号码', prop: 'JJZLRECIPIENT' },
          { id: '58', label: '主管单位法定代表人证件号码', prop: 'RESPONSIBLEIDNO' },
          { id: '59', label: '主管单位法定代表人证件类型', prop: 'RESPONSIBLEIDTYPE' },
          { id: '60', label: '主管单位法定代表人姓名', prop: 'RESPONSIBLENAME' },
          { id: '61', label: '主管单位名称', prop: 'RESPONSIBLECOMPANYNAME' },
          { id: '62', label: '法定代表人证件类型', prop: 'LEGALPERSONCERTIFICATETYPE' },
          { id: '63', label: '注册地代码', prop: 'REGISTEREDADRRESSCODE' },
          { id: '64', label: '注册资金', prop: 'REGISTERCAPITAL' },
          { id: '65', label: '经营范围', prop: 'MANAGESCOPE' },
          { id: '66', label: '行业分类', prop: 'TRADETYPE' },
          { id: '67', label: '地址', prop: 'ADDRESS' },
          { id: '68', label: '存款类别', prop: 'DEPOSITTYPE' },
          { id: '69', label: '邮编', prop: 'ZIPCODE' },
          { id: '70', label: '税务登记号', prop: 'TAXNO' },
          { id: '71', label: '组织特殊机构代码', prop: 'ORGANIZATIONCODE' }
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
          { id: '1', label: '渠道流水', prop: 'CHANELSERIALNO' },
          { id: '2', label: '官网预约开户审核状态', prop: 'GWAUDITSTATUS' },
          { id: '3', label: '审核不通过原因', prop: 'ABSTRACT' },
          { id: '4', label: '申请渠道', prop: 'CHANNEL' },
          { id: '5', label: '存款人名称', prop: 'CUSTOMERNAME' },
          { id: '6', label: '存款人手机号码', prop: 'PHONENUMBER' },
          { id: '7', label: '证明文件种类', prop: 'THEDOCUMENTTYPE' },
          { id: '8', label: '证明文件编号', prop: 'THEDOCUMENTSERIALNO' },
          { id: '9', label: '法定代表人姓名', prop: 'LEGALPERSON' },
          { id: '10', label: '法定代表人身份证号码', prop: 'LEGALPERSONCERTIFICATENO' },
          { id: '11', label: '账户性质', prop: 'ACCOUNTTYPE' },
          { id: '12', label: '申请日期', prop: 'APPLEDATE' },
          { id: '13', label: '审核通过日期', prop: 'AUDITINGDATE' },
          { id: '14', label: '上门核实日期', prop: 'VERIFYDATE' },
          { id: '15', label: '上门核实类别', prop: 'VERIFYTYPE' },
          { id: '16', label: '核实交出人1', prop: 'VERIFYHANDOVER1' },
          { id: '17', label: '核实交出人2', prop: 'VERIFYHANDOVER2' },
          { id: '18', label: '核实接收人', prop: 'VERIFYRECIPIENT' },
          { id: '19', label: '上门核实流水号', prop: 'VERIFYMAINSERIALNO' },
          { id: '20', label: '交接资料日期', prop: 'HANDOVERDATADATE' },
          { id: '21', label: '交接交出人', prop: 'JJZLHANDOVER1' },
          { id: '22', label: '交接接收人', prop: 'JJZLRECIPIENT' },
          { id: '23', label: '交接资料流水号', prop: 'JJZLMAINSERIALNO' },
          { id: '24', label: '报送资料日期', prop: 'SUBMITDATADATE' },
          { id: '25', label: '报送资料方式', prop: 'SUBMITDATATYPE' },
          { id: '26', label: '报送交出人', prop: 'SUBMITHANDOVER' },
          { id: '27', label: '报送交出人证件类型', prop: 'SUBMITIDTYPE1' },
          { id: '28', label: '报送交出人证件号码', prop: 'SUBMITIDNO1' },
          { id: '29', label: '报送接收人', prop: 'SUBMITRECIPIENT' },
          { id: '30', label: '报送接收人证件类型', prop: 'SUBMITIDTYPE2' },
          { id: '31', label: '报送接收人证件号码', prop: 'SUBMITIDNO2' },
          { id: '32', label: '报送人', prop: 'SUBMISSION' },
          { id: '33', label: '报送人证件类型', prop: 'SUBMITIDTYPE3' },
          { id: '34', label: '报送人证件号码', prop: 'SUBMITIDNO3' },
          { id: '35', label: '报送资料流水号', prop: 'SUBMITMAINSERIALNO' },
          { id: '36', label: '通知客户日期', prop: 'INFORMDATE' },
          { id: '37', label: '通知客户姓名', prop: 'INFORMNAME' },
          { id: '38', label: '通知客户电话', prop: 'INFORMPHONE' },
          { id: '39', label: '通知客户流水号', prop: 'INFORMMAINSERIALNO' },
          { id: '40', label: '领回开户许可证日期', prop: 'GETBACKDATE' },
          { id: '41', label: '领回方式', prop: 'GETBACKTYPE' },
          { id: '42', label: '领回交出人', prop: 'GETBACKHANDOVER' },
          { id: '43', label: '领回接收人', prop: 'GETBACKRECIPIENT' },
          { id: '44', label: '领回人', prop: 'REGENERATOR' },
          { id: '45', label: '领回开户许可证流水号', prop: 'GETBACKMAINSERIALNO' },
          { id: '46', label: '领取开户许可证日期', prop: 'RECEIVEDATE' },
          { id: '47', label: '领取人姓名', prop: 'RECEIVENAME' },
          { id: '48', label: '领取人证件类型', prop: 'RECEIVEIDTYPE' },
          { id: '49', label: '领取人证件号码', prop: 'RECEIVEIDNO' },
          { id: '50', label: '存款人名称', prop: 'CUSTOMERNAME' },
          { id: '51', label: '领取开户许可证流水号', prop: 'RECEIVEMAINSERIALNO' },
          { id: '52', label: '账号', prop: 'NOTE30' },
          { id: '53', label: '开户许可证号码', prop: 'NOTE31' },
          { id: '54', label: '开户核实日期', prop: 'NOTE32' },
          { id: '55', label: '开户许可日期', prop: 'NOTE33' },
          { id: '56', label: '主管单位组织机构代码', prop: 'RESPONSIBLEORGANIZATIONCODE' },
          { id: '57', label: '主管单位营业执照号码', prop: 'JJZLRECIPIENT' },
          { id: '58', label: '主管单位法定代表人证件号码', prop: 'RESPONSIBLEIDNO' },
          { id: '59', label: '主管单位法定代表人证件类型', prop: 'RESPONSIBLEIDTYPE' },
          { id: '60', label: '主管单位法定代表人姓名', prop: 'RESPONSIBLENAME' },
          { id: '61', label: '主管单位名称', prop: 'RESPONSIBLECOMPANYNAME' },
          { id: '62', label: '法定代表人证件类型', prop: 'LEGALPERSONCERTIFICATETYPE' },
          { id: '63', label: '注册地代码', prop: 'REGISTEREDADRRESSCODE' },
          { id: '64', label: '注册资金', prop: 'REGISTERCAPITAL' },
          { id: '65', label: '经营范围', prop: 'MANAGESCOPE' },
          { id: '66', label: '行业分类', prop: 'TRADETYPE' },
          { id: '67', label: '地址', prop: 'ADDRESS' },
          { id: '68', label: '存款类别', prop: 'DEPOSITTYPE' },
          { id: '69', label: '邮编', prop: 'ZIPCODE' },
          { id: '70', label: '税务登记号', prop: 'TAXNO' },
          { id: '71', label: '组织特殊机构代码', prop: 'ORGANIZATIONCODE' }
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
    },
    ...mapGetters([
      'userInfo'
    ]),
    device() { // 获取客户端类型
      return this.$store.state.app.device
    }
  },
  mounted: function() { // 初始化或跳转返回调用

  },
  methods: {
    queryTDataByPageSizeAndNum(pageNum, pageSize) {
      console.log('T5519 queryTDataByPageSizeAndNum :' + pageNum + '|' + pageSize)
      const map = {
        'openingchannel': this.ruleForm.accountOpenChanel, 'gwauditstatus': '',
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
              const list = _data1.data.PageInfo.list
              for (let i = 0; i < list.length; i++) {
                this.$set(list[i], 'GWAUDITSTATUS', this.selectLable(list[i].GWAUDITSTATUS, this.GWAUDITSTATUSS))
                this.$set(list[i], 'ACCOUNTTYPE', this.selectLable(list[i].ACCOUNTTYPE, this.ACCOUNTTYPES))
                this.$set(list[i], 'VERIFYTYPE', this.selectLable(list[i].VERIFYTYPE, this.VERIFYTYPES))
                this.$set(list[i], 'SUBMITIDTYPE1', this.selectLable(list[i].SUBMITIDTYPE1, this.IDTYPE))
                this.$set(list[i], 'SUBMITIDTYPE2', this.selectLable(list[i].SUBMITIDTYPE2, this.IDTYPE))
                this.$set(list[i], 'SUBMITIDTYPE3', this.selectLable(list[i].SUBMITIDTYPE3, this.IDTYPE))
                this.$set(list[i], 'RECEIVEIDTYPE', this.selectLable(list[i].RECEIVEIDTYPE, this.IDTYPE))
                this.$set(list[i], 'RESPONSIBLEIDTYPE', this.selectLable(list[i].RESPONSIBLEIDTYPE, this.IDTYPE))
                this.$set(list[i], 'LEGALPERSONCERTIFICATETYPE', this.selectLable(list[i].LEGALPERSONCERTIFICATETYPE, this.IDTYPE))
              }
              this.tableData = list
            } else {
              if (_data1.data.TrxCode === 'T5501_001') {
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
    pickerOptions1() {
    },
    qyeryCustomerCreation() {
      const map = {
        'openingchannel': this.ruleForm.accountOpenChanel, 'gwauditstatus': '',
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
                const list = _data.data.PageInfo.list
                for (let i = 0; i < list.length; i++) {
                  this.$set(list[i], 'GWAUDITSTATUS', this.selectLable(list[i].GWAUDITSTATUS, this.GWAUDITSTATUSS))
                  this.$set(list[i], 'ACCOUNTTYPE', this.selectLable(list[i].ACCOUNTTYPE, this.ACCOUNTTYPES))
                  this.$set(list[i], 'VERIFYTYPE', this.selectLable(list[i].VERIFYTYPE, this.VERIFYTYPES))
                  this.$set(list[i], 'SUBMITIDTYPE1', this.selectLable(list[i].SUBMITIDTYPE1, this.IDTYPE))
                  this.$set(list[i], 'SUBMITIDTYPE2', this.selectLable(list[i].SUBMITIDTYPE2, this.IDTYPE))
                  this.$set(list[i], 'SUBMITIDTYPE3', this.selectLable(list[i].SUBMITIDTYPE3, this.IDTYPE))
                  this.$set(list[i], 'RECEIVEIDTYPE', this.selectLable(list[i].RECEIVEIDTYPE, this.IDTYPE))
                  this.$set(list[i], 'RESPONSIBLEIDTYPE', this.selectLable(list[i].RESPONSIBLEIDTYPE, this.IDTYPE))
                  this.$set(list[i], 'LEGALPERSONCERTIFICATETYPE', this.selectLable(list[i].LEGALPERSONCERTIFICATETYPE, this.IDTYPE))
                }
                this.tableData = list
              }
            } else {
              if (_data.data.TrxCode === 'T5519_001') {
                this.messageWarning('查询无记录!')
                return
              } else {
                this.messageError('错误信息 ： ' + _data.data.TrxMessage)
                return
              }
            }
          } else {
            this.messageError('错误信息 ： ' + _data.message)
            return
          }
        })
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
