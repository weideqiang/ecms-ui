<template>
  <el-main>
    <div class="demo-form-div">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        class="demo-form-inline"
        label-width="100px"
        size="small">
        <div>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="业务量浮动-按月" name="monthRateChange"/>
            <el-tab-pane label="业务量浮动-按日" name="dayRateChange"/>
          </el-tabs>
          <div v-if="tabType == 1">
            <div>
              <el-row>
                <el-col :span="7">
                  <el-form-item label="业务类型：" prop="DtradeType">
                    <el-select ref="DtradeType" v-model="ruleForm.DtradeType" placeholder="请选择" style="width: 80%;" clearable>
                      <el-option v-for="item in tradeType2007" :key="item.value" :label="item.label" :value="item.value"/>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="浮动方式：" prop="DfloatType">
                    <el-select ref="DfloatType" v-model="ruleForm.DfloatType" placeholder="请选择" style="width: 80%;" clearable>
                      <el-option v-for="item in DfloatType2007" :key="item.value" :label="item.label" :value="item.value"/>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="浮动方向：" prop="DfloatDirection">
                    <el-select ref="DfloatDirection" v-model="ruleForm.DfloatDirection" placeholder="请选择" style="width: 80%;" clearable>
                      <el-option v-for="item in floatDirection2007" :key="item.value" :label="item.label" :value="item.value"/>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="7">
                  <el-form-item label="日期：" prop="sqDate">
                    <el-date-picker
                      id="sqDate"
                      v-model="ruleForm.sqDate"
                      class="info-startDate"
                      type="date"
                      placeholder="选择日期"
                      editable
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyyMMdd"/>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="浮动比率：" prop="dayRate" >
                    <el-input ref="dayRate" :disabled="disableddayRate" v-model="ruleForm.dayRate" placeholder="请输入浮动比率(<1)" clearable/>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="业务量：" prop="tradeNum">
                    <el-input ref="tradeNum" :disabled="disabledDaytradeNum" v-model="ruleForm.tradeNum" placeholder="请输入业务量" clearable/>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
          <div v-if="tabType == 0">
            <div>
              <el-row>
                <el-col :span="7">
                  <el-form-item label="业务类型：" prop="MtradeType">
                    <el-select ref="MtradeType" v-model="ruleForm.MtradeType" placeholder="请选择" style="width: 80%;" clearable>
                      <el-option v-for="item in tradeType2007" :key="item.value" :label="item.label" :value="item.value"/>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="浮动方向：" prop="MfloatDirection">
                    <el-select ref="MfloatDirection" v-model="ruleForm.MfloatDirection" placeholder="请选择" style="width: 80%;" clearable>
                      <el-option v-for="item in floatDirection2007" :key="item.value" :label="item.label" :value="item.value"/>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="7">
                  <el-form-item label="日期：" prop="sqDateM">
                    <el-date-picker
                      id="sqDateM"
                      v-model="ruleForm.sqDateM"
                      class="info-startDate"
                      type="date"
                      placeholder="选择日期"
                      editable
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyyMMdd"/>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="浮动比率：" prop="monthFloatRate" style="width: 85%;">
                    <el-input ref="monthFloatRate" v-model="ruleForm.monthFloatRate" placeholder="请输入浮动比率(<1)" clearable/>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="dialog-footer" style="width: 92%;" align="right">
            <el-row>
              <el-col :span="8">
                <el-button size="medium" type="primary" @click="exitTrade()">{{ '退出' }}</el-button>
              </el-col>
              <el-col :span="8">
                <el-button size="medium" type="primary" @click="submitForm()">{{ '提交' }}</el-button>
              </el-col>
            </el-row>
          </div>
        </div>
        <div>
          <el-tabs v-model="activeName1" @tab-click="handleClick1">
            <el-tab-pane label="班次人员数量设置-个人" name="tellerDistributionG"/>
            <el-tab-pane label="班次人员数量设置-对公" name="tellerDistributionC"/>
          </el-tabs>
          <div v-if="tabType1 == 1">
            <el-row>
              <el-col :span="7">
                <el-form-item label="白班人数：" prop="baiPersonNum" >
                  <el-input ref="baiPersonNum" :disabled="true" v-model="ruleForm.baiPersonNum" :placeholder="baiPlaceHolder" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="白班至轧帐人数：" prop="bai2EndPersonNum" >
                  <el-input ref="bai2EndPersonNum" v-model="ruleForm.bai2EndPersonNum" :placeholder="bai2EndPlaceHolder" clearable/>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div v-if="tabType1 == 0">
            <el-row>
              <el-col :span="7">
                <el-form-item label="早班人数：" prop="morningPersonNum" >
                  <el-input ref="morningPersonNum" v-model="ruleForm.morningPersonNum" :placeholder="morningPlaceHolder" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="中班人数：" prop="noonPersonNum" >
                  <el-input ref="noonPersonNum" :disabled="true" v-model="ruleForm.noonPersonNum" :placeholder="noonPlaceHolder" clearable/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="7">
                <el-form-item label="晚班人数：" prop="nightPersonNum" >
                  <el-input ref="nightPersonNum" v-model="ruleForm.nightPersonNum" :placeholder="nightPlaceHolder" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="晚班至轧帐人数：" prop="night2EndPersonNum" >
                  <el-input ref="night2EndPersonNum" v-model="ruleForm.night2EndPersonNum" :placeholder="night2EndPlaceHolder" clearable/>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div class="dialog-footer" style="width: 92%;" align="right">
            <el-row>
              <el-col :span="8">
                <el-button size="medium" type="primary" @click="exitTrade()">{{ '退出' }}</el-button>
              </el-col>
              <el-col :span="8">
                <el-button size="medium" type="primary" @click="submitForm1()">{{ '提交' }}</el-button>
              </el-col>
            </el-row>
          </div>
        </div>
        <div>
          <el-tabs v-model="activeName2" @tab-click="handleClick2">
            <el-tab-pane label="人/日均能效设置-个人" name="tellerEfficiacyG"/>
            <el-tab-pane label="人/日均能效设置-对公" name="tellerEfficiacyC"/>
          </el-tabs>
          <div v-if="tabType2 == 0">
            <el-row>
              <el-col :span="7">
                <el-form-item label="日期：" prop="date_G">
                  <el-date-picker
                    id="date_G"
                    v-model="ruleForm.date_G"
                    class="info-startDate"
                    type="month"
                    placeholder="选择日期"
                    editable
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyyMMdd"/>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="个人能效(笔)：" prop="EfficiacyNumG">
                  <el-input ref="EfficiacyNumG" v-model="ruleForm.EfficiacyNumG" placeholder="请输入日均处理笔数" clearable/>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div v-if="tabType2 == 1">
            <el-row>
              <el-col :span="7">
                <el-form-item label="日期：" prop="date_C">
                  <el-date-picker
                    id="date_C"
                    v-model="ruleForm.date_C"
                    class="info-startDate"
                    type="month"
                    placeholder="选择日期"
                    editable
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyyMMdd"/>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="对公能效(笔)：" prop="EfficiacyNumC" >
                  <el-input ref="EfficiacyNumC" v-model="ruleForm.EfficiacyNumC" placeholder="请输入日均处理笔数" clearable/>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div class="dialog-footer" style="width: 92%;" align="right">
            <el-row>
              <el-col :span="8">
                <el-button size="medium" type="primary" @click="querryTellerEfficiacy()">{{ '查询' }}</el-button>
              </el-col>
              <el-col :span="8">
                <el-button size="medium" type="primary" @click="submitForm2()">{{ '提交' }}</el-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-form>
      <hr>
      <br>
      <div v-if="false" class="dialog-footer" style="width: 92%;" align="right">
        <el-row>
          <el-col :span="4">
            <el-button size="medium" type="primary" @click="getCurrentMonthData()">{{ '同步本月数据' }}</el-button>
          </el-col>
          <el-col :span="4">
            <el-button size="medium" type="primary" @click="jumpToST()">{{ '预算次月数据' }}</el-button>
          </el-col>
          <el-col :span="5">
            <el-button size="medium" type="primary" @click="PbStartingG()">{{ '开始排班(个人)' }}</el-button>
          </el-col>
          <el-col :span="5">
            <el-button size="medium" type="primary" @click="PbStartingC()">{{ '开始排班(对公)' }}</el-button>
          </el-col>
          <el-col :span="5">
            <el-button size="medium" type="primary" @click="getHistoryInfo()">{{ '查询历史信息' }}</el-button>
          </el-col>
          <el-col :span="5">
            <el-button size="medium" type="primary" @click="PbDeleteInfo()">{{ '清除排班信息' }}</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </el-main>
</template>
<script>
const selectPbClassInfo = (This, note1, classname) => {
  const map = {
    'note1': '',
    'classname1': ''
  }
  const params = { 'ruleForm': JSON.stringify(map) }
  const url = This.$pbAuthInfoApi.selectpb_class_info
  This.$http(url, params).then( // 通讯后台修改数据库中信息
    res => {
      const _data = res.data
      if (_data.code === 'SUCCESS') {
        if (_data.data.TrxCode === '000000') {
          const pageInfo = _data.data.PageInfo.list
          for (let i = 0; i < pageInfo.length; i++) {
            if (pageInfo[i].className === '早班') {
              This.ruleForm.morningPersonNum = pageInfo[i].note1
            } else if (pageInfo[i].className === '中班') {
              This.ruleForm.noonPersonNum = pageInfo[i].note1
            } else if (pageInfo[i].className === '晚班') {
              This.ruleForm.nightPersonNum = pageInfo[i].note1
            } else if (pageInfo[i].className === '晚班至扎账') {
              This.ruleForm.night2EndPersonNum = pageInfo[i].note1
            } else if (pageInfo[i].className === '白班') {
              This.ruleForm.baiPersonNum = pageInfo[i].note1
            } else if (pageInfo[i].className === '白班至扎账') {
              This.ruleForm.bai2EndPersonNum = pageInfo[i].note1
            }
          }
        } else {
          This.$message.error('错误信息 ： ' + _data.data.TrxMessage)
          return
        }
      } else {
        This.$message.error('错误信息 ： ' + _data.message)
        return
      }
    })
}
const updatePbClassInfo = (This, note1, classname) => {
  const map = {
    'note1': note1,
    'classname1': classname
  }
  const params = { 'ruleForm': JSON.stringify(map) }
  const url = This.$pbAuthInfoApi.updatepb_pb_class_info_personNum
  This.$http(url, params).then( // 通讯后台修改数据库中信息
    res => {
      const _data = res.data
      console.log('@@@@@提交返回 ：' + JSON.stringify(res.data))
      // 赋值
      if (_data.code === 'SUCCESS') {
        if (_data.data.TrxCode === '000000') {
          This.messageSuccess('排班班次人数信息更新成功')
          return
        } else {
          This.$message.error('错误信息 ： ' + _data.data.TrxMessage)
          return
        }
      } else {
        This.$message.error('错误信息 ： ' + _data.message)
        return
      }
    })
}
export default {
  name: 'T2007',
  data() {
    const validDfloatType = (rule, value, callback) => {
      const DfloatType = this.ruleForm.DfloatType
      if (DfloatType === '0') { // 比率
        this.rules.dayRate[0].required = true
        this.rules.tradeNum[0].required = false
        this.disableddayRate = false
        this.disabledDaytradeNum = true
      } else { // 业务量
        this.ruleForm.dayRate = ''
        this.rules.dayRate[0].required = false
        this.rules.tradeNum[0].required = true
        this.disableddayRate = true
        this.disabledDaytradeNum = false
      }
    }
    return {
      ruleForm: { // 弹框表单
        DfloatType: '', // 日浮动方式
        MfloatDirection: '', // 月浮动方向
        DfloatDirection: '', // 日浮动方向
        monthFloatRate: '', // 月浮动比率
        sqDate: '', // 日期_日
        sqDateM: '', // 日期_月
        dayRate: '', // 日浮动比率
        DtradeType: '', // 日业务类型
        MtradeType: '', // 月业务类型
        tradeNum: '', // 业务量
        morningPersonNum: '', // 早班人数
        noonPersonNum: '', // 中班人数
        nightPersonNum: '', // 晚班人数
        night2EndPersonNum: '', // 晚班至轧帐人数
        baiPersonNum: '', // 白班人数
        bai2EndPersonNum: '', // 白班至轧帐人数
        EfficiacyNumG: '', // 个人日均处理笔数
        EfficiacyNumC: '', // 对公日均处理笔数
        date_G: '', // 对公月份选择
        date_C: '' // 对公月份选择
      },
      option: [
        { value: '01月', label: '01' },
        { value: '02月', label: '02' },
        { value: '03月', label: '03' },
        { value: '04月', label: '04' },
        { value: '05月', label: '05' },
        { value: '06月', label: '06' },
        { value: '07月', label: '07' },
        { value: '08月', label: '08' },
        { value: '09月', label: '09' },
        { value: '10月', label: '10' },
        { value: '11月', label: '11' },
        { value: '12月', label: '12' }
      ],
      morningPlaceHolder: '请输入早班人数（%/数量）',
      noonPlaceHolder: '请输入中班人数（%/数量）-暂不使用',
      nightPlaceHolder: '请输入晚班人数比列（%）',
      night2EndPlaceHolder: '请输入晚班至轧帐人数（%/数量）',
      baiPlaceHolder: '请输入白班人数（数量）- 暂不使用',
      bai2EndPlaceHolder: '请输入白班至轧帐人数（数量）',
      CurrentUserNo: '', // 初始化-当前柜员号
      CurrentUserName: '', // 初始化-当前柜员名称
      CurrentBranchNo: '', // 初始化-当前机构号
      CurrentBranchName: '', // 初始化-当前机构名称
      CurrentZoneNo: '', // 初始化-当前地区号
      CurrentSystemDate: '', // 初始化-当前系统日期
      CurrentSystemTime: '', // 当前系统时间
      tabType: 0,
      tabType1: 0,
      tabType2: 0,
      floatDirection2007: this.$combo.floatDirection2007,
      DfloatType2007: this.$combo.DfloatType2007,
      tradeType2007: this.$combo.tradeType2007,
      disableddayRate: true,
      disabledDaytradeNum: true,
      activeName: 'monthRateChange',
      activeName1: 'tellerDistributionG',
      activeName2: 'tellerEfficiacyG',
      submitForm1map: {},
      rules: { // 表单校验
        DtradeType: [
          { required: false, message: '请选择业务类型', trigger: 'blur' },
          { min: 0, max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur' }
        ],
        DfloatType: [
          { required: false, message: '请选择浮动方式', trigger: 'blur' },
          { trigger: 'change', validator: validDfloatType }
        ],
        DfloatDirection: [
          { required: false, message: '请选择业务方向', trigger: 'blur' }
        ],
        sqDate: [
          { required: false, message: '请输入日期', trigger: 'blur' },
          { min: 0, max: 128, message: '长度在 0 到 8 个字符', trigger: 'blur' }
        ],
        dayRate: [
          { required: false, message: '请输入浮动比率', trigger: 'blur' },
          { min: 0, max: 128, message: '长度在 0 到 10 个字符', trigger: 'blur' }
        ],
        tradeNum: [
          { required: false, message: '请输入业务量', trigger: 'blur' },
          { min: 0, max: 128, message: '长度在 0 到 128 个字符', trigger: 'blur' }
        ],
        MtradeType: [
          { required: false, message: '请选择业务类型', trigger: 'blur' }
        ],
        MfloatDirection: [
          { required: false, message: '请选择浮动方向', trigger: 'blur' }
        ],
        sqDateM: [
          { required: false, message: '请选择日期', trigger: 'blur' }
        ],
        monthFloatRate: [
          { required: false, message: '请输入浮动比率', trigger: 'blur' },
          { min: 0, max: 128, message: '长度在 0 到 128 个字符', trigger: 'blur' }
        ],
        morningPersonNum: [
          { required: false, message: '请输入早班人数', trigger: 'blur' }
        ],
        noonPersonNum: [
          { required: false, message: '请输入中班人数', trigger: 'blur' }
        ],
        nightPersonNum: [
          { required: false, message: '请输入晚班人数', trigger: 'blur' }
        ],
        night2EndPersonNum: [
          { required: false, message: '请输入晚班至轧帐人数', trigger: 'blur' }
        ],
        baiPersonNum: [
          { required: false, message: '请输入白班人数', trigger: 'blur' }
        ],
        bai2EndPersonNum: [
          { required: false, message: '请输入白班至轧帐人数', trigger: 'blur' }
        ]
      },
      orgOptions: {}
    }
  },
  mounted() {
    this.orgOptions = {}
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
    this.tabType = '0'
    this.rules.MtradeType[0].required = true
    this.rules.MfloatDirection[0].required = true
    this.rules.monthFloatRate[0].required = true

    this.tabType1 = '0'
    this.rules.morningPersonNum[0].required = true
    this.rules.night2EndPersonNum[0].required = true
    this.rules.noonPersonNum[0].required = false
    this.rules.nightPersonNum[0].required = false
    this.rules.baiPersonNum[0].required = false
    this.rules.bai2EndPersonNum[0].required = false
    selectPbClassInfo(this, '', '')

    this.tabType2 = '0'
  },
  methods: {
    handleClick(tab, e) {
      this.tabType = tab.index
      var _val = tab.index
      console.log(_val)
      if (_val === '0') { // 月
        this.tabType = '0'
        this.rules.DtradeType[0].required = false
        this.rules.DfloatType[0].required = false
        this.rules.DfloatDirection[0].required = false
        this.rules.sqDate[0].required = false
        this.rules.dayRate[0].required = false
        this.rules.tradeNum[0].required = false
        this.rules.MtradeType[0].required = true
        this.rules.MfloatDirection[0].required = true
        this.rules.sqDateM[0].required = true
        this.rules.monthFloatRate[0].required = true
      } else { // 日
        this.tabType = '1'
        this.rules.DtradeType[0].required = true
        this.rules.DfloatType[0].required = true
        this.rules.DfloatDirection[0].required = true
        this.rules.sqDate[0].required = true
        this.rules.dayRate[0].required = false
        this.rules.tradeNum[0].required = false
        this.rules.MtradeType[0].required = false
        this.rules.MfloatDirection[0].required = false
        this.rules.sqDateM[0].required = false
        this.rules.monthFloatRate[0].required = false
      }
    },
    handleClick1(tab, e) {
      this.tabType1 = tab.index
      var _val = tab.index
      console.log(_val)
      if (_val === '0') { // 个人
        this.tabType1 = '0'
        this.rules.morningPersonNum[0].required = true
        this.rules.night2EndPersonNum[0].required = true
        this.rules.noonPersonNum[0].required = false
        this.rules.nightPersonNum[0].required = false
        this.rules.baiPersonNum[0].required = false
        this.rules.bai2EndPersonNum[0].required = false
      } else { // 对公
        this.tabType1 = '1'
        this.rules.morningPersonNum[0].required = false
        this.rules.noonPersonNum[0].required = false
        this.rules.nightPersonNum[0].required = false
        this.rules.night2EndPersonNum[0].required = false
        this.rules.baiPersonNum[0].required = false
        this.rules.bai2EndPersonNum[0].required = true
      }
    },
    handleClick2(tab, e) {
      this.tabType2 = tab.index
      var _val = tab.index
      console.log(_val)
      if (_val === '0') { // 个人
        this.tabType2 = '0'
      } else { // 对公
        this.tabType2 = '1'
      }
    },
    exitTrade() { // 交易退出返回首页
      this.$router.push({
        path: this.redirect || '/dashboard'
      })
    },
    submitForm() { // 提交
      if (this.tabType === '0') { // 按月更新
        const map = {
          'rate': this.ruleForm.monthFloatRate,
          'direction': this.ruleForm.MfloatDirection,
          'cgflag': this.ruleForm.MtradeType === 'C' ? 'public' : 'private',
          'date': this.ruleForm.sqDateM
        }
        const params = { 'ruleForm': JSON.stringify(map) }
        const url = this.$pbAuthInfoApi.updatepb_auth_predicted_monthByMonth
        this.$http(url, params).then( // 通讯后台修改数据库中信息
          res => {
            const _data = res.data
            console.log('@@@@@提交返回 ：' + JSON.stringify(res.data))
            // 赋值
            if (_data.code === 'SUCCESS') {
              if (_data.data.TrxCode === '000000') {
                this.messageSuccess('排班信息更新成功！')
                return
              } else {
                this.$message.error('错误信息 ： ' + _data.data.TrxMessage)
                return
              }
            } else {
              this.$message.error('错误信息 ： ' + _data.message)
              return
            }
          })
      } else if (this.tabType === '1') { // 按日更新
        const map = {
          'rate': this.ruleForm.dayRate,
          'direction': this.ruleForm.DfloatDirection,
          'cgflag': this.ruleForm.DtradeType === 'C' ? 'public' : 'private',
          'date': this.ruleForm.sqDate,
          'folatType': this.ruleForm.DfloatType,
          'countValue': this.ruleForm.tradeNum
        }
        const params = { 'ruleForm': JSON.stringify(map) }
        const url = this.$pbAuthInfoApi.updatepb_auth_predicted_monthByDay
        this.$http(url, params).then( // 通讯后台修改数据库中信息
          res => {
            const _data = res.data
            console.log('@@@@@提交返回 ：' + JSON.stringify(res.data))
            // 赋值
            if (_data.code === 'SUCCESS') {
              if (_data.data.TrxCode === '000000') {
                this.messageSuccess('排班信息更新成功！')
                return
              } else {
                this.$message.error('错误信息 ： ' + _data.data.TrxMessage)
                return
              }
            } else {
              this.$message.error('错误信息 ： ' + _data.message)
              return
            }
          })
      }
    },
    submitForm1() { // 提交
      if (this.tabType1 === '0') { // 个人
        for (let i = 0; i < 4; i++) {
          if (i === 0) {
            if (this.ruleForm.morningPersonNum !== '') {
              updatePbClassInfo(this, this.ruleForm.morningPersonNum, '早班')
            }
          } else if (i === 1) {
            if (this.ruleForm.noonPersonNum !== '') {
              updatePbClassInfo(this, this.ruleForm.noonPersonNum, '中班')
            }
          } else if (i === 2) {
            if (this.ruleForm.nightPersonNum !== '') {
              updatePbClassInfo(this, this.ruleForm.nightPersonNum, '晚班')
            }
          } else if (i === 3) {
            if (this.ruleForm.night2EndPersonNum !== '') {
              updatePbClassInfo(this, this.ruleForm.night2EndPersonNum, '晚班至扎账')
            }
          }
        }
      } else if (this.tabType1 === '1') {
        console.log('2222222222222222222222222')
        for (let i = 0; i < 2; i++) {
          if (i === 0) {
            if (this.ruleForm.baiPersonNum !== '') {
              updatePbClassInfo(this, this.ruleForm.baiPersonNum, '白班')
            }
          } else if (i === 1) {
            if (this.ruleForm.bai2EndPersonNum !== '') {
              updatePbClassInfo(this, this.ruleForm.bai2EndPersonNum, '白班至扎账')
            }
          }
        }
      }
    },
    submitForm2() {
      const map = {
        'Efficiacy': this.tabType2 === '0' ? this.ruleForm.EfficiacyNumG : this.ruleForm.EfficiacyNumC,
        'starttime': this.tabType2 === '0' ? this.ruleForm.date_G : this.ruleForm.date_C,
        'cgflag': this.tabType2 === '0' ? 'private' : 'public'
      }
      const params = { 'ruleForm': JSON.stringify(map) }
      const url = this.$pbAuthInfoApi.updatepb_auth_predicted_monthByEfficiacy
      this.$http(url, params).then( // 通讯后台修改数据库中信息
        res => {
          const _data = res.data
          console.log('updatepb_auth_predicted_monthByEfficiacy返回 ：' + JSON.stringify(res.data))
          // 赋值
          if (_data.code === 'SUCCESS') {
            if (_data.data.TrxCode === '000000') {
              this.messageSuccess('更新柜员效能成功！')
            } else {
              this.$message.error('错误信息 ： ' + _data.data.TrxMessage)
            }
          } else {
            this.$message.error('错误信息 ： ' + _data.message)
          }
        })
    },
    getCurrentMonthData() { // 同步上月授权信息
      const map = {
        'month': '201905'
      }
      const params = { 'ruleForm': JSON.stringify(map) }
      const url = this.$pbAuthInfoApi.getPbAuthYwNumInfo
      this.$http(url, params).then( // 通讯后台修改数据库中信息
        res => {
          const _data = res.data
          console.log('@@@@@提交返回 ：' + JSON.stringify(res.data))
          // 赋值
          if (_data.code === 'SUCCESS') {
            if (_data.data.TrxCode === '000000') {
              //
            } else {
              this.$message.error('错误信息 ： ' + _data.data.TrxMessage)
            }
          } else {
            this.$message.error('错误信息 ： ' + _data.message)
          }
        })
    },
    jumpToST() { // 预估下月授权信息
      const map = {
        'currentMonth': '06',
        'lastMonth': '05'
      }
      const params = { 'ruleForm': JSON.stringify(map) }
      const url = this.$pbAuthInfoApi.NextMothAuthYwInfoMaking
      this.$http(url, params).then( // 通讯后台修改数据库中信息
        res => {
          const _data = res.data
          console.log('@@@@@提交返回 ：' + JSON.stringify(res.data))
          // 赋值
          if (_data.code === 'SUCCESS') {
            if (_data.data.TrxCode === '000000') {
              //
            } else {
              this.$message.error('错误信息 ： ' + _data.data.TrxMessage)
            }
          } else {
            this.$message.error('错误信息 ： ' + _data.message)
          }
        })
    },
    PbStartingG() { // 排班-个人
      const map = {
        'year': '2019',
        'month': '06',
        'cgFlag': 'G'
      }
      const params = { 'ruleForm': JSON.stringify(map) }
      const url = this.$pbAuthInfoApi.pb_starting_GandC
      this.$http(url, params).then( // 通讯后台修改数据库中信息
        res => {
          const _data = res.data
          console.log('@@@@@提交返回 ：' + JSON.stringify(res.data))
          // 赋值
          if (_data.code === 'SUCCESS') {
            if (_data.data.TrxCode === '000000') {
              //
            } else {
              this.$message.error('错误信息 ： ' + _data.data.TrxMessage)
            }
          } else {
            this.$message.error('错误信息 ： ' + _data.message)
          }
        })
    },
    PbStartingC() { // 排班-对公
      const map = {
        'year': '2019',
        'month': '06',
        'cgFlag': 'C'
      }
      const params = { 'ruleForm': JSON.stringify(map) }
      const url = this.$pbAuthInfoApi.pb_starting_GandC
      this.$http(url, params).then( // 通讯后台修改数据库中信息
        res => {
          const _data = res.data
          console.log('@@@@@提交返回 ：' + JSON.stringify(res.data))
          // 赋值
          if (_data.code === 'SUCCESS') {
            if (_data.data.TrxCode === '000000') {
              //
            } else {
              this.$message.error('错误信息 ： ' + _data.data.TrxMessage)
            }
          } else {
            this.$message.error('错误信息 ： ' + _data.message)
          }
        })
    },
    querryTellerEfficiacy() {
      const map = {
        'month': this.tabType2 === '0' ? this.ruleForm.date_G : this.ruleForm.date_C,
        'cgflag': this.tabType2 === '0' ? 'private' : 'public'
      }
      const params = { 'ruleForm': JSON.stringify(map) }
      const url = this.$pbAuthInfoApi.querryTellerEfficiacyPerDayBymonth
      this.$http(url, params).then( // 通讯后台修改数据库中信息
        res => {
          const _data = res.data
          console.log('selectpb_auth_predicted_month_avgBymonth返回 ：' + JSON.stringify(res.data))
          // 赋值
          if (_data.code === 'SUCCESS') {
            if (_data.data.TrxCode === '000000') {
              if (res.data.data.PageInfo.total > 0) {
                if (this.tabType2 === '0') { // 个人
                  this.ruleForm.EfficiacyNumG = res.data.data.PageInfo.list[0].note1
                } else {
                  this.ruleForm.EfficiacyNumC = res.data.data.PageInfo.list[0].note1
                }
              }
            } else {
              this.$message.error('错误信息 ： ' + _data.data.TrxMessage)
            }
          } else {
            this.$message.error('错误信息 ： ' + _data.message)
          }
        })
    },
    getHistoryInfo() { // 查询排班历史/次月业务信息
      const map = {
        'month': '201905'
      }
      const params = { 'ruleForm': JSON.stringify(map) }
      const url = this.$pbAuthInfoApi.selectpb_auth_predicted_month_avgBymonth
      this.$http(url, params).then( // 通讯后台修改数据库中信息
        res => {
          const _data = res.data
          console.log('@@@@@提交返回 ：' + JSON.stringify(res.data))
          // 赋值
          if (_data.code === 'SUCCESS') {
            if (_data.data.TrxCode === '000000') {
              if (res.data.data.PageInfo.total > 0) {
                this.messageSuccess('存在上月历史信息,直接进行jumpToST()')
              }
            } else {
              this.$message.error('错误信息 ： ' + _data.data.TrxMessage)
            }
          } else {
            this.$message.error('错误信息 ： ' + _data.message)
          }
        })
    },
    PbDeleteInfo() { // 删除排班信息(每次点击排班前调用)
      const map = {
        'month': '201906',
        'cgFlag': 'G' // C-个人  G-对公
      }
      const params = { 'ruleForm': JSON.stringify(map) }
      const url = this.$pbAuthInfoApi.delete_pb_infoByDate
      this.$http(url, params).then( // 通讯后台修改数据库中信息
        res => {
          const _data = res.data
          console.log('@@@@@提交返回 ：' + JSON.stringify(res.data))
          // 赋值
          if (_data.code === 'SUCCESS') {
            if (_data.data.TrxCode === '000000') {
              this.messageSuccess('删除成功！')
            } else {
              this.$message.error('错误信息 ： ' + _data.data.TrxMessage)
            }
          } else {
            this.$message.error('错误信息 ： ' + _data.message)
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
