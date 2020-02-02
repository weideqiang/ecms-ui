<template>
  <el-main class="background">
    <el-row>
      <el-form
        ref="form"
        :model="ruleForm"
        :rules="rules"
        class="demo-form-inline"
        label-width="100px"
        size="small">
        <br>
        <el-row>
          <el-col :span="16">
            <el-form-item label="场次ID：" prop="ID">
              <el-input
                :disabled="true"
                v-model="ruleForm.ID"
                style="width: 92%"
                type="ID"
                placeholder="场次ID"
                clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开场教师：" prop="MODTLRNO">
              <el-input
                :disabled="true"
                v-model="ruleForm.MODTLRNO"
                style="width: 80%;"
                type="MODTLRNO"
                placeholder="开场教师"
                clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="考试类型：" prop="EXAMTYPE">
              <el-select :disabled="true" v-model="ruleForm.EXAMTYPE" style="width: 80%;" placeholder="请选择" clearable>
                <el-option v-for="item in EXAMTYPEs" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所属分行：" prop="ZONENO">
              <el-select :disabled="true" v-model="ruleForm.ZONENO" style="width: 80%;" placeholder="请选择" clearable>
                <el-option v-for="item in ZONENOs" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="试卷类型：" prop="TYPE">
              <el-select :disabled="true" v-model="ruleForm.TYPE" style="width: 80%;" placeholder="请选择" clearable>
                <el-option v-for="item in TYPEs" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="策略ID：" prop="SELECTID">
              <el-input
                :disabled="true"
                v-model="ruleForm.SELECTID"
                style="width: 80%;"
                type="SELECTID"
                placeholder="策略ID"
                clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="考场状态：" prop="STATUS">
              <el-select :disabled="true" v-model="ruleForm.STATUS" style="width: 80%;" placeholder="请选择" clearable>
                <el-option v-for="item in STATUSs" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
    <el-row>
      <el-form
        ref="form"
        :model="ruleForm1"
        :rules="rules1"
        class="demo-form-inline"
        label-width="100px"
        size="small">
        <el-row>
          <el-col :span="10">
            <el-form-item label="考试日期：" prop="ACCDATE">
              <el-date-picker
                id="ACCDATE"
                :disabled="disabledACCDATE"
                v-model="ruleForm1.ACCDATE"
                :picker-options="pickerOptions1"
                type="date"
                placeholder="考试日期"
                editable
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyyMMdd"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="考试时间：" prop="BEGINTIME">
              <el-time-picker
                id="BEGINTIME"
                :disabled="disabledBEGINTIME"
                v-model="ruleForm1.BEGINTIME"
                :picker-options="pickerOptions1"
                placeholder="考试时间"
                editable
                format="HH 时 mm 分 ss 秒"
                value-format="HHmmss"/>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="考试时长：" prop="EFFECTIVETIME">
              <el-input
                v-model="ruleForm1.EFFECTIVETIME"
                :disabled="disabledEFFECTIVETIME"
                style="width: 70%;"
                type="EFFECTIVETIME"
                placeholder="考试时长"
                clearable/>分钟
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="场次说明：" prop="NOTE">
              <el-input
                v-model="ruleForm1.NOTE"
                :disabled="disabledNOTE"
                style="width: 94%"
                type="NOTE"
                placeholder="场次说明"
                clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="23" align="right">
            <el-button :disabled="disabledqueRen" class="btn7010101" size="small" type="primary" @click="queRen">确认</el-button>
            <el-button size="small" type="primary" @click="tuiChu">退出</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
  </el-main>
</template>

<script>
export default {
  name: 'T70101',
  props: {
    fromfather7010: {
      type: Object,
      default: null
    }
  },
  data() {
    const validateSTATUS = (rule, value, callback) => {
      if (value !== '1') {
        this.disabledACCDATE = true
        this.disabledBEGINTIME = true
        this.disabledEFFECTIVETIME = true
        this.disabledNOTE = true
        this.disabledqueRen = true
        this.rules1.ACCDATE[0].required = true
        this.rules1.BEGINTIME[0].required = false
        this.rules1.EFFECTIVETIME[0].required = false
        this.rules1.NOTE[0].required = false
        callback()
      } else {
        this.disabledACCDATE = false
        this.disabledBEGINTIME = false
        this.disabledEFFECTIVETIME = false
        this.disabledNOTE = false
        this.disabledqueRen = false
        this.rules1.ACCDATE[0].required = true
        this.rules1.BEGINTIME[0].required = true
        this.rules1.EFFECTIVETIME[0].required = true
        this.rules1.NOTE[0].required = false
        callback()
      }
    }
    return {
      ValueFromFather7010: [],
      disabledqueRen: false,
      disabledACCDATE: true,
      disabledBEGINTIME: true,
      disabledEFFECTIVETIME: true,
      disabledNOTE: true,
      ruleForm: {
        ID: '',
        MODTLRNO: '',
        ZONENO: '',
        TYPE: '',
        SELECTID: '',
        STATUS: '',
        EXAMTYPE: ''
      },
      rules: {
        ID: [
          { required: false, message: '请输入场次id', trigger: 'blur' }
        ],
        MODTLRNO: [
          { required: false, message: '请输入开场教师', trigger: 'blur' }
        ],
        ZONENO: [
          { required: false, message: '请选择所属分行', trigger: 'chang' }
        ],
        TYPE: [
          { required: false, message: '请选择试卷类型', trigger: 'chang' }
        ],
        SELECTID: [
          { required: false, message: '请输入策略ID', trigger: 'blur' }
        ],
        STATUS: [
          { required: false, message: '请选择考场状态', trigger: 'change' },
          { trigger: 'change', validator: validateSTATUS }
        ],
        EXAMTYPE: [
          { required: false, message: '请选择考试类型', trigger: 'change' }
        ]
      },
      ruleForm1: {
        ACCDATE: '',
        BEGINTIME: '',
        EFFECTIVETIME: '',
        NOTE: ''
      },
      rules1: {
        ACCDATE: [
          { required: false, message: '请输入考试日期', trigger: 'blur' }
        ],
        BEGINTIME: [
          { required: false, message: '请输入考试时间', trigger: 'blur' }
        ],
        EFFECTIVETIME: [
          { required: false, message: '请输入考试时长', trigger: 'blur' }
        ],
        NOTE: [
          { required: false, message: '请输入场次说明', trigger: 'blur' }
        ]
      },
      pickerOptions1: {
        disabledDate(time) {
          // return time.getTime() > Date.now()
        }, shortcuts: [{
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
            console.log('date----------------->' + date)
            picker.$emit('pick', date)
          }
        }]
      },
      TYPEs: this.$combo.shiJuanLeiXing,
      EXAMTYPEs: this.$combo.kaoShiLeiXing,
      ZONENOs: this.$combo.zoneInfos,
      STATUSs: this.$combo.changCiZhuangTai
    }
  },
  created() {
    this.$route.params.map = this.fromfather7010
  },
  mounted: function() {
    const params = this.$route.params.map
    if (params) {
      console.log('params:' + JSON.stringify(params))
      this.ruleForm.EXAMTYPE = params.EXAMTYPE
      this.ruleForm.MODTLRNO = params.MODTLRNO
      this.ruleForm.ID = params.ID
      this.ruleForm.ZONENO = params.ZONENO
      this.ruleForm.TYPE = params.TYPE
      this.ruleForm.STATUS = params.STATUS
      this.ruleForm1.ACCDATE = params.ACCDATE
      this.ruleForm1.BEGINTIME = params.BEGINTIME
      this.ruleForm1.EFFECTIVETIME = params.EFFECTIVETIME
      this.ruleForm1.NOTE = params.NOTE
    }
  },
  methods: {
    queRen() {
      const map = {
        'ACCDATE': this.ruleForm1.ACCDATE,
        'EFFECTIVETIME': this.ruleForm1.EFFECTIVETIME,
        'NOTE': this.ruleForm1.NOTE,
        'BEGINTIME': this.ruleForm1.BEGINTIME,
        'ENDTIME': this.addtime(this.ruleForm1.ACCDATE, this.ruleForm1.BEGINTIME, this.ruleForm1.EFFECTIVETIME)
      }
      const consMap = {
        'ID': this.ruleForm.ID
      }
      const params = { 'ruleForm': JSON.stringify(map), 'consMap': JSON.stringify(consMap) }
      console.log('params:' + JSON.stringify(params))
      this.$http(this.$examSystemMngApi.commonUpdateMethodOne, params) // 此处调用自己的Api接口方法
        .then(
          res => {
            const _data = res.data.data
            // 赋值
            if (_data.code === 'SUCCESS') {
              if (_data.data.TrxCode === '000000') {
                this.$message({
                  showClose: true,
                  message: '场次维护信息成功',
                  type: 'success'
                })
                this.$emit('sendmsgExit', 'Exit70101')
              } else {
                this.$message({
                  showClose: true,
                  message: '错误信息 ： ' + _data.data.TrxMessage,
                  type: 'warning'
                })
              }
            } else {
              this.$message({
                showClose: true,
                message: '错误信息 ： ' + _data.message,
                type: 'warning'
              })
            }
          }
        )
    },
    addtime(date, time, min) { // 将字符串分钟加入返回考试时间分钟(超过60分钟自动加1小时)
      var dateY = date.slice(0, 4) + '-' + date.slice(4, 6) + '-' + date.slice(6, 8)
      var dateM = time.slice(0, 2) + ':' + time.slice(2, 4) + ':' + time.slice(4, 6)
      var dateYM = dateY + ' ' + dateM
      dateYM = dateYM.replace(/-/g, ':').replace(' ', ':')
      dateYM = dateYM.split(':')
      var date1 = new Date(dateYM[0], (dateYM[1] - 1), dateYM[2], dateYM[3], dateYM[4], dateYM[5])
      var MinYMInt = parseInt(date1.getMinutes() + parseInt(min))
      var out = date1.setMinutes(MinYMInt)
      var date2 = new Date(out)
      var H = date2.getHours()
      if (H < 10) {
        H = '0' + date2.getHours().toString()
      } else {
        H = date2.getHours().toString()
      }
      var m = date2.getMinutes().toString()
      if (m < 10) {
        m = '0' + date2.getMinutes().toString()
      } else {
        m = date2.getMinutes().toString()
      }
      var s = date2.getSeconds().toString()
      if (s < 10) {
        s = '0' + date2.getSeconds().toString()
      } else {
        s = date2.getSeconds().toString()
      }
      var Hms = H + m + s
      console.log('Minutes2:' + Hms)
      return Hms
    },
    tuiChu() {
      this.$emit('sendmsgExit', 'Exit70101')
    }
  }
}
</script>

<style scoped>
  @import "../../../styles/public.css";
  .rowClass70101 {
    border-top: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
    border-left: 1px solid #e3e3e3;
    border-right: 1px solid #e3e3e3;
    width: 70%;
    margin-left: 100px;
  }
  .rowClass70101Button {
    width: 70%;
    margin-left: 100px;
  }
  .btn7010101 {
    margin-right: 25px;
  }
</style>
