<template>
  <el-main>
    <div>
      <el-row type="flex" justify="start" class="rowClass70310101">
        <el-col :offset="4" class="colClass703101">
          <el-button :disabled="preQuestion" size="medium" type="primary" @click="preClick()">上一题</el-button>
        </el-col>
        <el-col class="colClass703101">
          <el-button :disabled="nextQuestion" v-model="ruleForm.nextQuestion" size="medium" type="primary" @click="nextClick()">下一题</el-button>
        </el-col>
        <el-col class="colClass703101">
          <el-button size="medium" type="danger" plain @click="exitTrade">退出练习</el-button>
        </el-col>
      </el-row>
      <el-row class="rowClass70310101" >
        <el-col :span="17" :offset="1" class="colClass703102">
          <el-form
            ref="ruleForm"
            :model="ruleForm"
            label-width="100px"
            size="small">
            <el-form-item label="单选:">
              <el-input v-model="ruleForm.TmNr" :disabled="true" clearable/>
            </el-form-item>
            <el-form-item>
              <el-radio-group v-model="radioOption" size="medium" align="left" @change="selectChange">
                <el-row>
                  <el-radio :label="OptionA" class="el_radio703101" />
                </el-row>
                <el-row align="left">
                  <el-radio :label="OptionB" class="el_radio703101"/>
                </el-row>
                <el-row align="left">
                  <el-radio :label="OptionC" class="el_radio703101"/>
                </el-row>
                <el-row align="left">
                  <el-radio :label="OptionD" class="el_radio703101"/>
                </el-row>
                <el-row align="left">
                  <el-radio :label="OptionE" class="el_radio703101"/>
                </el-row>
              </el-radio-group>
            </el-form-item>
            <el-row>
              <el-col :span="3" :offset="4">
                <el-button size="small" type="primary" @click="showAanswer()">答案查看</el-button>
              </el-col>
              <el-col :span="10">
                <el-form
                  ref="ruleForm1"
                  :model="ruleForm1"
                  label-width="4px"
                  size="small">
                  <el-form-item>
                    <el-input v-if="showAnswer" v-model="ruleForm.Answer" :disabled="true" clearable/>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </el-main>
</template>

<script>
function setDisplay(that, ListMap, index, selecedAnswer, Initflag) {
  that.showAnswer = false
  if (Initflag === 1 || Initflag === 2) {
    if (selecedAnswer === '') {
      that.messageError('请先选择答案！')
      return
    } else {
      if (selecedAnswer !== that.CurAnswer) {
        that.messageError('选择答案错误！')
        if (Initflag === 1) { // 上一页
          that.currRow = that.currRow + 1
        } else { // 下一页
          that.currRow = that.currRow - 1
        }
        return
      }
    }
  }
  that.radioOption = ''
  const Map0 = ListMap[index]
  that.ruleForm.TmNr = Map0.TITLE
  that.CurAnswer = Map0.ANSWER
  if (Map0.OPTIONA !== '') {
    that.OptionA = Map0.OPTIONA
  }
  if (Map0.OPTIONB !== '') {
    that.OptionB = Map0.OPTIONB
  }
  if (Map0.OPTIONC !== '') {
    that.OptionC = Map0.OPTIONC
  }
  if (Map0.OPTIOND !== '') {
    that.OptionD = Map0.OPTIOND
  }
  if (Map0.OPTIONE !== '') {
    that.OptionE = Map0.OPTIONE
  }
  if (index === 0) {
    that.nextQuestion = false
    that.preQuestion = true
  } else if (index === ListMap.length - 1) {
    that.nextQuestion = true
    that.preQuestion = false
  }
}
export default {
  name: 'T703101',
  data: function() {
    return {
      preQuestion: true,
      nextQuestion: true,
      showAnswer: false,
      OptionA: 'A',
      OptionB: 'B',
      OptionC: 'C',
      OptionD: 'D',
      OptionE: 'E',
      currRow: 0, // 当前页
      CurAnswer: '', // 当前问题答案
      CurSelectedAnswer: '', // 当前问题选择答案
      radioOption: '',
      ruleForm: {
        TmNr: '', // 题目内容
        Answer: '' // 答案
      },
      rules: { // 表单校验
      },
      ruleForm1: {
        Answer: '' // 题目答案
      }
    }
  },
  mounted: function() {
    const params = this.$route.params
    if (params) {
      this.questionByRandomAlgm = this.$route.params.questionByRandomAlgm
      console.log('703101Mounted11: ' + JSON.stringify(this.questionByRandomAlgm))
      setDisplay(this, this.questionByRandomAlgm, 0, 0)
    }
  },
  methods: {
    selectChange: function(val) {
      if (val.indexOf(this.OptionA) === 0) {
        this.CurSelectedAnswer = 'A'
      }
      if (val.indexOf(this.OptionB) === 0) {
        this.CurSelectedAnswer = 'B'
      }
      if (val.indexOf(this.OptionC) === 0) {
        this.CurSelectedAnswer = 'C'
      }
      if (val.indexOf(this.OptionD) === 0) {
        this.CurSelectedAnswer = 'D'
      }
      if (val.indexOf(this.OptionE) === 0) {
        this.CurSelectedAnswer = 'E'
      }
    },
    showAanswer() { // 显示答案
      this.showAnswer = true
      this.ruleForm.Answer = this.CurAnswer
    },
    preClick() { // 上一题
      this.currRow = this.currRow - 1
      setDisplay(this, this.questionByRandomAlgm, this.currRow, this.CurSelectedAnswer, 1)
    },
    nextClick() { // 下一题
      this.currRow = this.currRow + 1
      setDisplay(this, this.questionByRandomAlgm, this.currRow, this.CurSelectedAnswer, 2)
    },
    exitTrade() { // 交易退出返回首页
      this.$router.push({
        path: this.redirect || '/dashboard'
      })
    },
    submitForm() { // 保存
      const lstMap = []
      const record = []
      record.push({
        LINAGE: this.ruleForm.TmSl,
        TYPE: this.ruleForm.tiXing, // 题目类型(可为空)
        BUSITYPE: this.ruleForm.yeWuLeiXing, // 业务类型(可为空)
        LVL: this.ruleForm.nanDu // 题目难度(可为空)
      })
      lstMap.push(...record)
      const params = { 'ruleForm': JSON.stringify(lstMap) }
      const url = this.$examSystemMngApi.getQuestionByRandomAlgm
      this.$http(url, params).then( // 通讯后台修改数据库中信息
        res => {
          const _data = res.data
          if (_data.data.TrxCode === '000000') {
            const pageInfo = _data.data.PageInfo
            this.$router.push({
              path: this.redirect || '/T703101',
              name: 'T703101',
              params: {
                questionByRandomAlgm: pageInfo,
                TYPE: this.ruleForm.tiXing
              }
            })
          } else {
            this.messageError('错误信息 ： ' + _data.data.TrxMessage)
            return
          }
        })
    }
  }
}
</script>

<style>
  .rowClass70310101 {
    border-top: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
    border-left: 1px solid #e3e3e3;
    border-right: 1px solid #e3e3e3;
    width: 80%;
    margin-left: 100px;
  }
  .colClass703101{
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .el_radio703101 {
    line-height: 2;
    font-size: 13px;
  }
  .colClass703102{
    margin-top: 10px;
  }
</style>
