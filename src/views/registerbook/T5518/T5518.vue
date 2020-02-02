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
            <el-form-item label="操作类型：" prop="operationType">
              <el-select v-model="ruleForm.operationType" placeholder="请选择" style="width: 80%;" clearable>
                <el-option v-for="item in operationTypes" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="核查标识：" prop="HCBSType">
              <el-select :disabled="true" v-model="ruleForm.HCBSType" placeholder="请选择" style="width: 80%;" clearable>
                <el-option v-for="item in HCBSType" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="起始日期：" prop="startDate">
              <el-date-picker
                id="startDate"
                :disabled="disabledstartDate"
                v-model="ruleForm.startDate"
                :picker-options="pickerOptions1"
                class="info-startDate"
                type="date"
                style="width: 80%;"
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
                :disabled="disabledendDate"
                v-model="ruleForm.endDate"
                :picker-options="pickerOptions1"
                class="info-startDate"
                type="date"
                style="width: 80%;"
                placeholder="选择日期"
                editable
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyyMMdd"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="机构代码：" prop="institutionCode">
              <el-select :disabled="true" v-model="ruleForm.institutionCode" placeholder="请选择" style="width: 80%;" clearable>
                <el-option v-for="item in institutionCodes" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="柜员号：" prop="tellerno">
              <el-input :disabled="disabledtellerno" v-model="ruleForm.tellerno" style="width: 80%;" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <hr>
        <br>
        <el-row>
          <el-col :span="8">
            <el-form-item label="业务受理日期：" prop="YWSLDate">
              <el-date-picker
                id="startDate"
                :disabled="disabledYWSLDate"
                v-model="ruleForm.YWSLDate"
                :picker-options="pickerOptions1"
                class="info-startDate"
                type="date"
                style="width: 80%;"
                placeholder="选择日期"
                editable
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyyMMdd"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="交易码：" prop="JYM">
              <el-input v-model="ruleForm.JYM" style="width: 80%;" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业务种类：" prop="YWZLType">
              <el-select v-model="ruleForm.YWZLType" placeholder="请选择" style="width: 80%;" clearable>
                <el-option v-for="item in YWZLTypes" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="证件类型：" prop="ZJType">
              <el-select v-model="ruleForm.ZJType" placeholder="请选择" style="width: 80%;" clearable>
                <el-option v-for="item in ZJTypes" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件号码：" prop="ZJCode">
              <el-input v-model="ruleForm.ZJCode" style="width: 80%;" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="账号/卡号：" prop="bQuerycertificateNumber" >
              <el-input
                v-model="ruleForm.bQuerycertificateNumber"
                style="width: 80%;"
                placeholder="请输入账/卡号"
                clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="客户名称：" prop="KHName" >
          <el-input
            v-model="ruleForm.KHName"
            placeholder="请输入客户名称"
            clearable/>
        </el-form-item>
        <el-form-item label="通讯地址：" prop="TXDZ" >
          <el-input
            v-model="ruleForm.TXDZ"
            placeholder="请输入通讯地址"
            clearable/>
        </el-form-item>
        <el-row>
          <el-col :span="8">
            <el-form-item label="联系电话：" prop="LXDH" >
              <el-input
                v-model="ruleForm.LXDH"
                style="width: 80%;"
                placeholder="请输入联系电话"
                clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="辅助证件类型：" prop="FZZZLX">
              <el-input v-model="ruleForm.FZZZLX" style="width: 80%;" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="辅助证件号码：" prop="FZZZHM">
              <el-input v-model="ruleForm.FZZZHM" style="width: 80%;" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="核查结果：" prop="HCJGType">
          <el-select v-model="ruleForm.HCJGType" placeholder="请选择" style="width: 80%;" clearable>
            <el-option v-for="item in HCJGTypes" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item label="脸部识别结果：" prop="LBSBJGType">
          <el-select v-model="ruleForm.LBSBJGType" placeholder="请选择" style="width: 80%;" clearable>
            <el-option v-for="item in LBSBJGTypes" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-row>
          <el-col :span="8">
            <el-form-item label="是否停办业务：" prop="SFTBYWType">
              <el-select v-model="ruleForm.SFTBYWType" placeholder="请选择" style="width: 80%;" clearable>
                <el-option v-for="item in SFTBYWTypes" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="事后核实结果：" prop="SHHSJGType">
              <el-select v-model="ruleForm.SHHSJGType" placeholder="请选择" style="width: 80%;" clearable>
                <el-option v-for="item in SHHSJGTypes" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业务处理结果：" prop="YWCLJGType">
              <el-select v-model="ruleForm.YWCLJGType" placeholder="请选择" style="width: 80%;" clearable>
                <el-option v-for="item in YWCLJGTypes" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="说明：" prop="explain">
            <el-input
              v-model="ruleForm.explain"
              class="info-queryUnit"
              type="textarea"
              placeholder="说明"
              clearable/>
          </el-form-item>
        </el-row>
      </el-form>
      <el-row>
        <el-form :inline="true" class="ecms-trx-button">
          <el-form-item>
            <el-button size="medium" type="primary" @click="registerClick">{{ returnregister }}</el-button>
            <el-button :disabled="HighShootdisabled" size="medium" type="primary" >高拍</el-button>
            <el-button size="medium" type="primary" >退出</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
  </el-main>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'T5518',
  data() {
    const validateOperationType = (rule, value, callback) => {
      this.ruleForm.startDate = '' // 起始日期
      this.ruleForm.endDate = '' // 结束日期
      this.ruleForm.HCBSType = '' // 核查标识
      this.ruleForm.institutionCode = '' // 机构代码
      this.ruleForm.tellerno = '' // 柜员号
      this.ruleForm.YWSLDate = '' // 业务受理日期
      this.ruleForm.JYM = '' // 交易码
      this.ruleForm.vYWZLType = '' // 业务种类
      this.ruleForm.ZJType = '' // 证件类型
      this.ruleForm.ZJCode = '' // 证件号码
      this.ruleForm.bQuerycertificateNumber = '' // 账号/卡号
      this.ruleForm.KHName = '' // 客户名称
      this.ruleForm.TXDZ = '' // 通讯地址
      this.ruleForm.LXDH = '' // 联系电话
      this.ruleForm.FZZZLX = '' // 辅助证件类型
      this.ruleForm.FZZZHM = '' // 辅助证件号码
      this.ruleForm.HCJGType = '' // 核查结果
      this.ruleForm.LBSBJGType = '' // 脸部识别结果
      this.ruleForm.SFTBYWType = '' // 是否停办业务
      this.ruleForm.SHHSJGType = '' // 事后核实结果
      this.ruleForm.YWCLJGType = '' // 业务处理结果
      this.ruleForm.explain = '' // 说明
      if (value === '0') {
        this.disabledstartDate = false
        this.disabledendDate = false
        this.disabledtellerno = false // 柜员号
        this.disabledYWSLDate = false // 业务受理日期
        this.rules.JYM[0].required = false
        this.rules.startDate[0].required = true
        this.rules.endDate[0].required = true
        this.rules.YWSLDate[0].required = false
        this.rules.YWZLType[0].required = false
        this.rules.ZJType[0].required = false
        this.rules.ZJCode[0].required = false
        this.rules.KHName[0].required = false
        this.rules.HCJGType[0].required = false
        this.rules.SFTBYWType[0].required = false
      } else if (value === '1') {
        this.disabledstartDate = true
        this.disabledendDate = true
        this.disabledtellerno = true // 柜员号
        this.disabledYWSLDate = true // 业务受理日期
        this.rules.JYM[0].required = true
        this.rules.startDate[0].required = false
        this.rules.endDate[0].required = false
        this.rules.YWSLDate[0].required = false
        this.rules.YWZLType[0].required = true
        this.rules.ZJType[0].required = true
        this.rules.ZJCode[0].required = true
        this.rules.KHName[0].required = true
        this.rules.HCJGType[0].required = true
        this.rules.SFTBYWType[0].required = true
      } else if (value === '2') {
        this.disabledstartDate = true
        this.disabledendDate = true
        this.disabledtellerno = true // 柜员号
        this.disabledYWSLDate = false // 业务受理日期
        this.rules.JYM[0].required = false
        this.rules.startDate[0].required = false
        this.rules.endDate[0].required = false
        this.rules.YWSLDate[0].required = true
        this.rules.YWZLType[0].required = false
        this.rules.ZJType[0].required = true
        this.rules.ZJCode[0].required = true
        this.rules.KHName[0].required = false
        this.rules.HCJGType[0].required = false
        this.rules.SFTBYWType[0].required = false
      }
    }
    return {
      returnregister: '登记',
      disabledstartDate: false,
      disabledendDate: false,
      HighShootdisabled: false,
      disabledtellerno: false, // 柜员号
      disabledYWSLDate: false, // 业务受理日期
      ruleForm: {
        operationType: '',
        startDate: '', // 起始日期
        endDate: '', // 结束日期
        HCBSType: '', // 核查标识
        institutionCode: '', // 机构代码
        tellerno: '', // 柜员号
        YWSLDate: '', // 业务受理日期
        JYM: '', // 交易码
        YWZLType: '', // 业务种类
        ZJType: '', // 证件类型
        ZJCode: '', // 证件号码
        bQuerycertificateNumber: '', // 账号/卡号
        KHName: '', // 客户名称
        TXDZ: '', // 通讯地址
        LXDH: '', // 联系电话
        FZZZLX: '', // 辅助证件类型
        FZZZHM: '', // 辅助证件号码
        HCJGType: '', // 核查结果
        LBSBJGType: '', // 脸部识别结果
        SFTBYWType: '', // 是否停办业务
        SHHSJGType: '', // 事后核实结果
        YWCLJGType: '', // 业务处理结果
        explain: '' // 说明
      },
      rules: {
        operationType: [
          { required: true, message: '请选择操作类型', trigger: 'change' },
          { trigger: 'change', validator: validateOperationType }
        ],
        startDate: [
          { required: false, message: '请选择起始日期', trigger: 'blur' }
        ],
        endDate: [
          { required: false, message: '请选择结束日期', trigger: 'blur' }
        ],
        HCBSType: [
          { required: false, message: '请选择核查标识', trigger: 'change' }
        ],
        institutionCode: [
          { required: false, message: '请选择机构代码', trigger: 'change' }
        ],
        tellerno: [
          { required: false, message: '请输入柜员号', trigger: 'blur' }
        ],
        YWSLDate: [
          { required: false, message: '请选择业务受理日期', trigger: 'blur' }
        ],
        JYM: [
          { required: false, message: '请输入交易码', trigger: 'blur' }
        ],
        YWZLType: [
          { required: false, message: '请选择业务种类', trigger: 'change' }
        ],
        ZJType: [
          { required: false, message: '请选择证件类型', trigger: 'change' }
        ],
        ZJCode: [
          { required: false, message: '请输入证件号码', trigger: 'blur' }
        ],
        bQuerycertificateNumber: [
          { required: false, message: '请输入账号/卡号', trigger: 'blur' }
        ],
        KHName: [
          { required: false, message: '请输入客户名称', trigger: 'blur' }
        ],
        TXDZ: [
          { required: false, message: '请输入通讯地址', trigger: 'blur' }
        ],
        LXDH: [
          { required: false, message: '请输入联系电话', trigger: 'blur' }
        ],
        FZZZLX: [
          { required: false, message: '请输入辅助证件类型', trigger: 'blur' }
        ],
        FZZZHM: [
          { required: false, message: '请输入辅助证件号码', trigger: 'blur' }
        ],
        HCJGType: [
          { required: false, message: '请选择核查结果', trigger: 'change' }
        ],
        LBSBJGType: [
          { required: false, message: '请选择脸部识别结果', trigger: 'change' }
        ],
        SFTBYWType: [
          { required: false, message: '请选择是否停办业务', trigger: 'change' }
        ],
        SHHSJGType: [
          { required: false, message: '请选择事后核实结果', trigger: 'change' }
        ],
        YWCLJGType: [
          { required: false, message: '请选择业务处理结果', trigger: 'change' }
        ],
        explain: [
          { required: false, message: '请选择说明', trigger: 'blur' }
        ]
      },
      operationTypes: this.$combo.operationType2
    }
  },
  computed: {
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
  }
}
</script>

<style scoped>
  .ecms-trx-button{
    text-align: center;
  }
</style>
