<template>
  <el-main>
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
          <el-col :span="8">
            <el-form-item label="题目编号：" prop="ID" >
              <el-input
                :disabled="true"
                v-model="ruleForm.ID"
                size="mini"
                placeholder="题目编号"
                clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="题型：" prop="TYPE">
              <el-select :disabled="true" v-model="ruleForm.TYPE" placeholder="请选择" size="mini" clearable>
                <el-option v-for="item in TYPEs" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="题目：" prop="TITLE" >
            <el-input
              v-model="ruleForm.TITLE"
              rows="4"
              size="mini"
              style="width: 90%"
              type="textarea"
              placeholder="题目"
              clearable/>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="14">
            <el-form-item label="选项A：" prop="OPTIONA" >
              <el-input
                :disabled="disabledOPTIONA"
                v-model="ruleForm.OPTIONA"
                placeholder="选项A"
                size="mini"
                rows="1"
                type="textarea"
                clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="14">
            <el-form-item label="选项B：" prop="OPTIONB" >
              <el-input
                :disabled="disabledOPTIONB"
                v-model="ruleForm.OPTIONB"
                placeholder="选项B"
                size="mini"
                rows="1"
                type="textarea"
                clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="14">
            <el-form-item label="选项C：" prop="OPTIONC" >
              <el-input
                :disabled="disabledOPTIONC"
                v-model="ruleForm.OPTIONC"
                placeholder="选项C"
                size="mini"
                rows="1"
                type="textarea"
                clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="14">
            <el-form-item label="选项D：" prop="OPTIOND" >
              <el-input
                :disabled="disabledOPTIOND"
                v-model="ruleForm.OPTIOND"
                placeholder="选项D"
                size="mini"
                rows="1"
                type="textarea"
                clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="14">
            <el-form-item label="选项E：" prop="OPTIONE" >
              <el-input
                :disabled="disabledOPTIONE"
                v-model="ruleForm.OPTIONE"
                placeholder="选项E"
                size="mini"
                rows="1"
                type="textarea"
                clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="14">
            <el-form-item v-if="ruleForm.TYPE === '01' || ruleForm.TYPE === '03'" label="答案 ：" prop="daAn">
              <el-select v-model="ruleForm.danXuanDaAn" placeholder="请选择" size="mini" clearable>
                <el-option v-for="item in danXuanDaAns" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-form-item v-if="ruleForm.TYPE === '02'" label="答案 ：" prop="daAn">
            <el-checkbox-group v-model="ruleForm.selectCities">
              <el-checkbox v-for="city in radio1" :label="city" :key="city">{{ city }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="备注：" prop="explain">
            <el-input
              v-model="ruleForm.explain"
              size="mini"
              type="textarea"
              style="width: 90%"
              placeholder="备注"
              clearable/>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="类型：" prop="BUSITYPE">
              <el-select v-model="ruleForm.BUSITYPE" placeholder="请选择" size="mini" clearable>
                <el-option v-for="item in BUSITYPEs" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="难度：" prop="LVL">
              <el-select v-model="ruleForm.LVL" placeholder="请选择" size="mini" clearable>
                <el-option v-for="item in LVLs" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
    <br>
    <el-row class="rowClass70012Button" type="flex">
      <el-col :span="20" align="right">
        <el-button type="small" size="primary" @click="tiJiao" >提交</el-button>
      </el-col>
      <el-col :span="8" align="right">
        <el-button type="small" size="primary" @click="tuiChu" >退出</el-button>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
export default {
  name: 'T70012',
  props: {
    fromfather7001: {
      type: Array,
      default: null
    }
  },
  data() {
    const cityOptions = ['A', 'B', 'C', 'D', 'E']
    const validateTYPE = (rule, value, callback) => {
      // 操作方式
      if (value === '01') {
        this.disabledOPTIONA = false
        this.disabledOPTIONB = false
        this.disabledOPTIONC = false
        this.disabledOPTIOND = false
        this.disabledOPTIONE = true
        this.rules.TITLE[0].required = true
        this.rules.OPTIONA[0].required = true
        this.rules.OPTIONB[0].required = true
        this.rules.OPTIONC[0].required = true
        this.rules.OPTIOND[0].required = true
        this.rules.OPTIONE[0].required = false
        this.rules.explain[0].required = false
        this.rules.BUSITYPE[0].required = true
        this.rules.LVL[0].required = true
        this.rules.danXuanDaAn[0].required = true
        this.rules.selectCities[0].required = false
        this.danXuanDaAns = this.$combo.danXuanDaAn
        callback()
      } else if (value === '02') {
        this.disabledOPTIONA = false
        this.disabledOPTIONB = false
        this.disabledOPTIONC = false
        this.disabledOPTIOND = false
        this.disabledOPTIONE = true
        this.rules.TITLE[0].required = true
        this.rules.OPTIONA[0].required = true
        this.rules.OPTIONB[0].required = true
        this.rules.OPTIONC[0].required = true
        this.rules.OPTIOND[0].required = true
        this.rules.OPTIONE[0].required = false
        this.rules.explain[0].required = false
        this.rules.BUSITYPE[0].required = true
        this.rules.LVL[0].required = true
        this.rules.danXuanDaAn[0].required = false
        this.rules.selectCities[0].required = true
        callback()
      } else if (value === '03') {
        this.disabledOPTIONA = true
        this.disabledOPTIONB = true
        this.disabledOPTIONC = true
        this.disabledOPTIOND = true
        this.disabledOPTIONE = true
        this.rules.TITLE[0].required = true
        this.rules.OPTIONA[0].required = false
        this.rules.OPTIONB[0].required = false
        this.rules.OPTIONC[0].required = false
        this.rules.OPTIOND[0].required = false
        this.rules.OPTIONE[0].required = false
        this.rules.explain[0].required = false
        this.rules.BUSITYPE[0].required = true
        this.rules.LVL[0].required = true
        this.rules.danXuanDaAn[0].required = true
        this.rules.selectCities[0].required = false
        this.danXuanDaAns = this.$combo.panDuanDaAn
        callback()
      } else {
        callback()
      }
    }
    return {
      ValueFromFather7001: [],
      disabledOPTIONA: false,
      disabledOPTIONB: false,
      disabledOPTIONC: false,
      disabledOPTIOND: false,
      disabledOPTIONE: true,
      ruleForm: {
        ID: '',
        TYPE: '01',
        TITLE: '',
        OPTIONA: '',
        OPTIONB: '',
        OPTIONC: '',
        OPTIOND: '',
        OPTIONE: '',
        ANSWER: '',
        explain: '',
        BUSITYPE: '',
        danXuanDaAn: '',
        selectCities: [],
        LVL: ''
      },
      CurrentBranchNo: '', // 机构号
      CurrentSystemDate: '', // 当前系统日期
      CurrentUserNo: '', // 柜员号
      radio1: cityOptions,
      rules: {
        ID: [
          { required: false, message: '请选择题目编号', trigger: 'change' }
        ],
        TYPE: [
          { required: true, message: '请选择题型', trigger: 'change' },
          { trigger: 'change', validator: validateTYPE }
        ],
        TITLE: [
          { required: true, message: '请选择题目', trigger: 'change' }
        ],
        OPTIONA: [
          { required: true, message: '请选择选项A', trigger: 'change' }
        ],
        OPTIONB: [
          { required: true, message: '请选择选项B', trigger: 'change' }
        ],
        OPTIONC: [
          { required: true, message: '请选择选项C', trigger: 'change' }
        ],
        OPTIOND: [
          { required: true, message: '请选择选项D', trigger: 'change' }
        ],
        OPTIONE: [
          { required: false, message: '请选择选项E', trigger: 'change' }
        ],
        explain: [
          { required: true, message: '请输入备注', trigger: 'blur' }
        ],
        BUSITYPE: [
          { required: true, message: '请选择类型', trigger: 'change' }
        ],
        LVL: [
          { required: true, message: '请选择难度', trigger: 'change' }
        ],
        danXuanDaAn: [
          { required: true, message: '请选择答案', trigger: 'change' }
        ],
        selectCities: [
          { required: false, message: '请选择答案', trigger: 'change' }
        ]
      },
      TYPEs: this.$combo.tiXing,
      BUSITYPEs: this.$combo.yeWuLeiXing,
      LVLs: this.$combo.nanDu,
      danXuanDaAns: this.$combo.danXuanDaAn
    }
  },
  computed: {
  },
  created() {
    this.ValueFromFather7001 = this.fromfather7001
  },
  mounted: function() {
    const myDate = new Date()
    this.ruleForm.endDate = myDate
    this.$http(this.$systemPublicApi.getSystemPublicInfo)
      .then(
        res => {
          this.CurrentBranchNo = res.data.CurrentBranchNo // 机构号
          this.CurrentSystemDate = res.data.CurrentSystemDate // 当前系统日期
          this.CurrentUserNo = res.data.CurrentUserNo // 柜员号
        })
    console.log('map' + JSON.stringify(this.$route.params.map))
    const params = this.ValueFromFather7001
    if (params) {
      console.log('params:' + params)
      this.ruleForm.ID = params.ID
      this.ruleForm.TYPE = params.TYPE
      this.ruleForm.TITLE = params.TITLE
      this.ruleForm.BUSITYPE = params.BUSITYPE
      this.ruleForm.LVL = params.LVL
      this.ruleForm.OPTIONA = params.OPTIONA
      this.ruleForm.OPTIONB = params.OPTIONB
      this.ruleForm.OPTIONC = params.OPTIONC
      this.ruleForm.OPTIOND = params.OPTIOND
      this.ruleForm.OPTIONE = params.OPTIONE
      if (this.ruleForm.TYPE === '01' || this.ruleForm.TYPE === '03') {
        this.ruleForm.danXuanDaAn = params.ANSWER
      } else if (this.ruleForm.TYPE === '02') {
        var iA = ''
        var iB = ''
        var iC = ''
        var iD = ''
        var iE = ''
        for (let i = 0; i < params.ANSWER.length; i++) {
          if (params.ANSWER[i] === 'A') {
            iA = 'A'
          }
          if (params.ANSWER[i] === 'B') {
            iB = 'B'
          }
          if (params.ANSWER[i] === 'C') {
            iC = 'C'
          }
          if (params.ANSWER[i] === 'D') {
            iD = 'D'
          }
          if (params.ANSWER[i] === 'E') {
            iE = 'E'
          }
        }
        this.ruleForm.selectCities = [iA, iB, iC, iD, iE]
      }
      console.log('selectCities:' + this.ruleForm.selectCities)
      this.ruleForm.explain = params.NOTE
    }
  },
  methods: {
    tiJiao() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.pageNum = 1
          console.log('pageNum: ' + this.pageNum) // 点击第几页
          this.query()
        }
      })
    },
    query() {
      console.log('多选答案：' + this.ruleForm.danXuanDaAn)
      var danXuanDuoXuan = ''
      var iA = ''
      var iB = ''
      var iC = ''
      var iD = ''
      var iE = ''
      if (this.ruleForm.OPTIONA !== '' && this.ruleForm.OPTIONA !== undefined) {
        iA = this.ruleForm.OPTIONA
      } if (this.ruleForm.OPTIONB !== '' && this.ruleForm.OPTIONB !== undefined) {
        iB = this.ruleForm.OPTIONB
      } if (this.ruleForm.OPTIONC !== '' && this.ruleForm.OPTIONC !== undefined) {
        iC = this.ruleForm.OPTIONC
      } if (this.ruleForm.OPTIOND !== '' && this.ruleForm.OPTIOND !== undefined) {
        iD = this.ruleForm.OPTIOND
      } if (this.ruleForm.OPTIONE !== '' && this.ruleForm.OPTIONE !== undefined) {
        iE = this.ruleForm.OPTIONE
      }
      if (this.ruleForm.TYPE === '01' || this.ruleForm.TYPE === '03') {
        danXuanDuoXuan = this.ruleForm.danXuanDaAn
      } else {
        for (let i = 0; i < this.ruleForm.selectCities.length; i++) {
          danXuanDuoXuan = danXuanDuoXuan + this.ruleForm.selectCities[i] + ''
        }
      }
      console.log('danXuanDuoXuan:' + danXuanDuoXuan)
      console.log('iA:' + iA + '; iB:' + iB + '; iC:' + iC + '; iD:' + iD + '; iE:' + iE)
      var myDate = new Date()
      var H = myDate.getHours()
      if (H < 10) {
        H = '0' + myDate.getHours().toString()
      } else {
        H = myDate.getHours().toString()
      }
      var m = myDate.getMinutes().toString()
      if (m < 10) {
        m = '0' + myDate.getMinutes().toString()
      } else {
        m = myDate.getMinutes().toString()
      }
      var s = myDate.getSeconds().toString()
      if (s < 10) {
        s = '0' + myDate.getSeconds().toString()
      } else {
        s = myDate.getSeconds().toString()
      }
      var time = H + m + s
      const map = {
        'ID': this.ruleForm.ID, // 根据题目类型，获取该类型最大id
        'TYPE': this.ruleForm.TYPE,
        'TITLE': this.ruleForm.TITLE,
        'BUSITYPE': this.ruleForm.BUSITYPE,
        'LVL': this.ruleForm.LVL,
        'OPTIONA': iA,
        'OPTIONB': iB,
        'OPTIONC': iC,
        'OPTIOND': iD,
        'OPTIONE': iE,
        'ANSWER': danXuanDuoXuan,
        'NOTE': this.ruleForm.explain,
        'STATUS': '1',
        'MODBRNO': this.CurrentBranchNo, // 机构代码
        'MODTLRNO': this.CurrentUserNo, // 用户号
        'TIMESTAMP': this.CurrentSystemDate + time // 后台日期加当前日期
      }
      const consMap = {
        'ID': this.ruleForm.ID // 根据题目类型，获取该类型最大id
      }
      console.log('map:' + JSON.stringify(map))
      const params = { 'ruleForm': JSON.stringify(map), 'consMap': JSON.stringify(consMap), 'ControllerID': 'T7010' }
      console.log('params:' + params)
      this.$http(this.$examSystemMngApi.commonUpdateMethod, params) // 此处调用自己的Api接口方法
        .then(
          res => {
            const resdata = res.data.data
            if (resdata.code === 'SUCCESS') {
              if (resdata.data.TrxCode === '000000') {
                this.$message({
                  showClose: true,
                  message: '业务知识题库修改成功!',
                  type: 'success'
                })
                this.tuiChu()
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
          },
          error => {
            console.log(error)
          }
        )
    },
    tuiChu() {
      console.log('----------70012退出-----------')
      this.$emit('sendmsgExit', 'Exit70012')
    }
  }
}
</script>

<style scoped>
  @import "../../../styles/public.css";
  .rowClass70012 {
    border-top: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
    border-left: 1px solid #e3e3e3;
    border-right: 1px solid #e3e3e3;
    width: 70%;
    margin-left: 100px;
  }
  .rowClass70012Button {
    width: 70%;
    margin-left: 100px;
  }
</style>
