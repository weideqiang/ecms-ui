<template>
  <el-main>
    <div>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        label-width="100px"
        size="small">
        <el-row type="flex" justify="start" class="divClass700701">
          <el-col :offset="4" class="colClass700701">
            <el-button :disabled="preQuestion" size="medium" type="primary" @click="preClick()">上一题</el-button>
          </el-col>
          <el-col class="colClass700701">
            <el-button :disabled="nextQuestion" v-model="ruleForm.nextQuestion" size="medium" type="primary" @click="nextClick()">下一题</el-button>
          </el-col>
          <el-col class="colClass700701">
            <el-button size="medium" type="danger" plain @click="outerVisible = true">提前结束考试</el-button>
            <el-dialog :visible.sync="outerVisible" width="25%" title="确认交卷？">
              <el-dialog
                :visible.sync="innerVisible"
                :title= "examScore"
                width="25%"
                append-to-body>
                <span slot="footer" class="dialog-footer">
                  <el-button size="small" type="primary" @click="exitTrade1()">确 定</el-button>
                </span>
              </el-dialog>
              <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="outerVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="exitTrade()">确 定</el-button>
              </span>
            </el-dialog>
          </el-col>
          <el-col class="colClass700701">
            <el-button size="medium" type="danger"> {{ Jscontent }} </el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-row type="flex">
      <el-col :span="20">
        <div class="divClass700702">
          <el-tabs ref="tabs" v-model="activeName" type="border-card" @tab-click="handleClick">
            <el-tab-pane label="单选" name="singleSelect"/>
            <el-tab-pane label="多选" name="lotSelect"/>
            <el-tab-pane label="判断" name="judging"/>
          </el-tabs>
          <div v-if="tabType == 0">
            <el-row>
              <el-col :span="17" :offset="1" class="colClass70070201">
                <el-form
                  ref="ruleFormDx"
                  :model="ruleFormDx"
                  label-width="100px"
                  size="small">
                  <el-form-item label="单选:">
                    <el-input v-model="ruleFormDx.TmNr" :disabled="true" type="textarea" clearable/>
                  </el-form-item>
                  <el-form-item>
                    <el-radio-group v-model="radioOption" size="medium" align="left" @change="DxSelectChange">
                      <el-row>
                        <el-radio :label="OptionA" class="el_radio700701" />
                      </el-row>
                      <el-row align="left">
                        <el-radio :label="OptionB" class="el_radio700701"/>
                      </el-row>
                      <el-row align="left">
                        <el-radio :label="OptionC" class="el_radio700701"/>
                      </el-row>
                      <el-row align="left">
                        <el-radio :label="OptionD" class="el_radio700701"/>
                      </el-row>
                      <el-row align="left">
                        <el-radio :label="OptionE" class="el_radio700701"/>
                      </el-row>
                    </el-radio-group>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
          </div>
          <div v-if="tabType == 1">
            <el-row>
              <el-col :span="17" :offset="1" class="colClass70070201">
                <el-form
                  ref="ruleFormDux"
                  :model="ruleFormDux"
                  label-width="100px"
                  size="small">
                  <el-form-item label="多选:">
                    <el-input v-model="ruleFormDux.TmNr" :disabled="true" type="textarea" clearable/>
                  </el-form-item>
                  <el-form-item>
                    <el-checkbox-group v-model="radioOption" size="medium" align="left" @change="DuxselectChange">
                      <el-row>
                        <el-checkbox :label="OptionA" class="el-checkbox703102" />
                      </el-row>
                      <el-row align="left">
                        <el-checkbox :label="OptionB" class="el-checkbox703102"/>
                      </el-row>
                      <el-row align="left">
                        <el-checkbox :label="OptionC" class="el-checkbox703102"/>
                      </el-row>
                      <el-row align="left">
                        <el-checkbox :label="OptionD" class="el-checkbox703102"/>
                      </el-row>
                      <el-row align="left">
                        <el-checkbox :label="OptionE" class="el-checkbox703102"/>
                      </el-row>
                    </el-checkbox-group>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
          </div>
          <div v-if="tabType == 2">
            <el-row>
              <el-col :span="17" :offset="1" class="colClass70070201">
                <el-form
                  ref="ruleFormPd"
                  :model="ruleFormPd"
                  label-width="100px"
                  size="small">
                  <el-form-item label="判断:">
                    <el-input v-model="ruleFormPd.TmNr" :disabled="true" type="textarea" clearable/>
                  </el-form-item>
                  <el-form-item>
                    <el-radio-group v-model="radioOption" size="medium" align="left" @change="PdselectChange">
                      <el-row>
                        <el-radio :label="OptionA" class="el_radio700701" />
                      </el-row>
                      <el-row align="left">
                        <el-radio :label="OptionB" class="el_radio700701"/>
                      </el-row>
                    </el-radio-group>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="divClass700703">
          <vxe-table
            key="AnswerTable"
            ref="AnswerTable"
            :data="AnswertableData"
            height="500"
            size="mini"
            align="center"
            resizable
            border
            highlight-hover-row
            highlight-current-row
            highlight-hover-column
            highlight-current-column>
            <vxe-table-column v-if="false" field="an_ID" title="题目ID" width="auto"/>
            <vxe-table-column v-if="true" :formatter="formatterBusitype" field="an_TYPE" title="题目类型" width="auto"/>
            <vxe-table-column v-if="false" field="an_BUSITYPE" title="业务类型" width="auto"/>
            <vxe-table-column v-if="true" field="an_EXAMANSWER" title="已作答案" width="auto"/>
            <vxe-table-column v-if="false" field="an_ANSWER" title="题目答案" width="auto"/>
            <vxe-table-column v-if="false" field="an_SCORE" title="题目分值" width="auto"/>
          </vxe-table>
        </div>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
import { DateTime } from '../../../commjs/common'
function updateAnswertableData(that, type, OriginalTableData, questionList, updateData) {
  console.log('updateAnswertableData index:' + that.currRow)
  if (type === '01') {
    OriginalTableData[that.currRow].an_EXAMANSWER = updateData
    OriginalTableData[that.currRow].an_EXAMANSWER = updateData
  }
  if (type === '02') {
    const index = that.DxQuestionList.length + that.currRow
    OriginalTableData[index].an_EXAMANSWER = updateData
  }
  if (type === '03') {
    const index = that.DxQuestionList.length + that.DuxQuestionList.length + that.currRow
    OriginalTableData[index].an_EXAMANSWER = updateData
  }
  return OriginalTableData
}
function formateSeconds(secondTime, that) {
  if (secondTime >= 60) {
    that.min = parseInt(secondTime / 60)
    that.secondTime = parseInt(secondTime % 60)
    if (that.min >= 60) {
      that.h = parseInt(that.min / 60)
      that.min = parseInt(that.min % 60)
    }
  }
  console.log('time：' + that.h + ':' + that.min + ':' + that.secondTime)
}
function setDisplayDx(that, ListMap, index, selecedAnswer, Initflag) {
  if (Initflag === 1 || Initflag === 2) {
    if (selecedAnswer === '') {
      that.messageError('请先选择答案！')
      if (Initflag === 1) { // 上一页
        that.currRow = that.currRow + 1
      } else { // 下一页
        that.currRow = that.currRow - 1
      }
      return
    }
  }
  that.radioOption = ''
  const Map0 = ListMap[index]
  that.ruleFormDx.TmNr = Map0.TITLE
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
  that.CurSelectedAnswer = ''
}
function setDisplayDux(that, ListMap, index, selecedAnswer, Initflag) {
  if (Initflag === 1 || Initflag === 2) {
    if (selecedAnswer.length === 0) {
      that.messageError('请先选择答案！')
      if (Initflag === 1) { // 上一页
        that.currRow = that.currRow - 1
      } else { // 下一页
        that.currRow = that.currRow + 1
      }
      return
    }
  }
  index = that.currRow
  that.radioOption = []
  const Map0 = ListMap[index]
  that.ruleFormDux.TmNr = Map0.TITLE
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
  that.CurSelectedAnswer = ''
}
function setDisplayPd(that, ListMap, index, selecedAnswer, Initflag) {
  if (that.tabType === '2') {
    that.OptionA = '正确'
    that.OptionB = '错误'
  }
  if (Initflag === 1 || Initflag === 2) {
    if (selecedAnswer === '') {
      that.messageError('请先选择答案！')
      if (Initflag === 1) { // 上一页
        that.currRow = that.currRow + 1
      } else { // 下一页
        that.currRow = that.currRow - 1
      }
      return
    }
  }
  that.radioOption = ''
  const Map0 = ListMap[index]
  that.ruleFormPd.TmNr = Map0.TITLE
  that.CurAnswer = Map0.ANSWER
  if (index === 0) {
    that.nextQuestion = false
    that.preQuestion = true
  } else if (index === ListMap.length - 1) {
    that.nextQuestion = true
    that.preQuestion = false
  }
  that.CurSelectedAnswer = ''
}
// function generateLstMap(listMap, that) {
//   const lstMap = []
//   const scoreMap0 = new Map()
//   for (let i = 0; i < listMap.length; i++) {
//     const type = listMap[i].TYPE // 题目类型 01-单选 02-复选 03-判断 04-问答
//     const busitype = listMap[i].BUSITYPE // 业务类型
//     const basicnum = listMap[i].BASICNUM // 基础题数量
//     const MODERATENUM = listMap[i].MODERATENUM // 适中题目数量
//     const HARDNUM = listMap[i].HARDNUM // 困难题目数量
//     const HARDESTNUM = listMap[i].HARDESTNUM // 极难题目数量
//     const SCORE = listMap[i].SCORE // 题目分值
//     scoreMap0.set(type, SCORE)
//     if (basicnum !== '0') {
//       const record1 = []
//       record1.push({
//         LINAGE: basicnum,
//         TYPE: type, // 题目类型(可为空)
//         BUSITYPE: busitype, // 业务类型(可为空)
//         LVL: '1' // 题目难度(可为空)
//       })
//       lstMap.push(...record1)
//     }
//     if (MODERATENUM !== '0') {
//       const record2 = []
//       record2.push({
//         LINAGE: MODERATENUM,
//         TYPE: type, // 题目类型(可为空)
//         BUSITYPE: busitype, // 业务类型(可为空)
//         LVL: '2' // 题目难度(可为空)
//       })
//       lstMap.push(...record2)
//     }
//     if (HARDNUM !== '0') {
//       const record3 = []
//       record3.push({
//         LINAGE: HARDNUM,
//         TYPE: type, // 题目类型(可为空)
//         BUSITYPE: busitype, // 业务类型(可为空)
//         LVL: '3' // 题目难度(可为空)
//       })
//       lstMap.push(...record3)
//     }
//     if (HARDESTNUM !== '0') {
//       const record4 = []
//       record4.push({
//         LINAGE: HARDESTNUM,
//         TYPE: type, // 题目类型(可为空)
//         BUSITYPE: busitype, // 业务类型(可为空)
//         LVL: '4' // 题目难度(可为空)
//       })
//       lstMap.push(...record4)
//     }
//   }
//   that.scoreMap = scoreMap0
//   console.log('scoreMap0 :' + JSON.stringify(scoreMap0))
//   return lstMap
// }
export default {
  name: 'T7007',
  data: function() {
    return {
      CurrentUserNo: '', // 初始化-当前柜员号
      CurrentUserName: '', // 初始化-当前柜员名称
      CurrentBranchNo: '', // 初始化-当前机构号
      CurrentBranchName: '', // 初始化-当前机构名称
      CurrentZoneNo: '', // 初始化-当前地区号
      CurrentSystemDate: '', // 初始化-当前系统日期
      CurrentSystemTime: '', // 当前系统时间
      examScore: '',
      outerVisible: false,
      innerVisible: false,
      Jscontent: '考试剩余时间(0)',
      totalTime: 60,
      h: 0,
      min: 0,
      secondTime: 0,
      activeName: 'singleSelect',
      tabType: 0,
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
      AnswertableData: [],
      totalScore: '',
      TestTime: '',
      listMap1: [],
      DxQuestionList: [],
      DuxQuestionList: [],
      PdQuestionList: [],
      questionByRandomAlgm: [],
      scoreMap: [],
      ruleForm: {
        nextQuestion: ''
      },
      ruleFormDx: {
        TmNr: '' // 题目内容
      },
      ruleFormDux: {
        TmNr: '' // 题目内容
      },
      ruleFormPd: {
        TmNr: '' // 题目内容
      },
      rules: { // 表单校验
      },
      BusiTypeList: [
        {
          label: '单选',
          value: '01'
        },
        {
          label: '多选',
          value: '02'
        },
        {
          label: '判断',
          value: '03'
        }
      ]
    }
  },
  mounted: function() {
    if (this.tabType === 2) {
      this.OptionA = '正确'
      this.OptionB = '错误'
    }
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
            const time = new DateTime().getTime()
            const map = { 'brno': this.CurrentBranchNo, 'tlrno': this.CurrentUserNo,
              'accdate': this.CurrentSystemDate, 'time': time,
              'examtype': '01' }
            const params = { 'ruleForm': JSON.stringify(map) }
            const url = this.$examSystemMngApi.getPlanInfoByAccDate
            this.$http(url, params).then( // 通讯后台修改数据库中信息
              res => {
                const _data = res.data
                console.log('getPlanInfoByAccDate :' + JSON.stringify(_data))
                const planInfo = _data.data.PageInfo
                if (_data.data.TrxCode === '000000') {
                  if (planInfo !== null && planInfo.length > 0) {
                    const examid = planInfo[0].ID
                    const map = { 'brno': this.CurrentBranchNo, 'tlrno': this.CurrentUserNo,
                      'examid': examid }
                    const params = { 'ruleForm': JSON.stringify(map) }
                    const url = this.$examSystemMngApi.getTlrTestScore
                    this.$http(url, params).then( // 通讯后台修改数据库中信息
                      res => {
                        const _data = res.data
                        console.log('getTlrTestScore :' + JSON.stringify(_data))
                        if (_data.data.TrxCode === '000000') {
                          const Score = _data.data.score
                          if (Score !== '' && Score !== null) {
                            this.messageError('已经完成该场次考试，不能重复考试!')
                            this.$router.push({
                              path: this.redirect || '/dashboard'
                            })
                          }
                          const effectivetime = planInfo[0].EFFECTIVETIME // 考试时长
                          const totalscore = planInfo[0].TOTALSCORE // 总分数
                          console.log('考试时长 :' + effectivetime + '总分数：' + totalscore)
                          this.TestTime = effectivetime
                          this.totalScore = totalscore
                          const map = { 'examtype': '01', 'tlrno': this.CurrentUserNo,
                            'examid': examid }
                          const params = { 'ruleForm': JSON.stringify(map) }
                          const url = this.$examSystemMngApi.getTlrPlanInfo
                          this.$http(url, params).then( // 通讯后台修改数据库中信息
                            res => {
                              const _data = res.data
                              console.log('getTlrPlanInfo :' + JSON.stringify(_data))
                              if (_data.data.TrxCode === '000000') {
                                const pageInfo = _data.data.PageInfo
                                for (let j = 0; j < pageInfo.length; j++) {
                                  // 考题表格信息加载
                                  this.AnswertableData.push({
                                    an_ID: pageInfo[j].ID,
                                    an_TYPE: pageInfo[j].TYPE,
                                    an_BUSITYPE: pageInfo[j].BUSITYPE,
                                    an_EXAMANSWER: '',
                                    an_ANSWER: pageInfo[j].ANSWER,
                                    an_SCORE: pageInfo[j].SCORE
                                  })
                                  // 考题分装
                                  const Type = pageInfo[j].TYPE // 题目类型1
                                  if (Type === '01') { // 单选
                                    const record1 = []
                                    record1.push({
                                      ID: pageInfo[j].ID,
                                      BUSITYPE: pageInfo[j].BUSITYPE,
                                      TITLE: pageInfo[j].TITLE,
                                      OPTIONA: pageInfo[j].OPTIONA,
                                      OPTIONB: pageInfo[j].OPTIONB,
                                      OPTIONC: pageInfo[j].OPTIONC,
                                      OPTIOND: pageInfo[j].OPTIOND,
                                      OPTIONE: pageInfo[j].OPTIONE,
                                      ANSWER: pageInfo[j].ANSWER,
                                      NOTE: pageInfo[j].NOTE
                                    })
                                    this.DxQuestionList.push(...record1)
                                  }
                                  if (Type === '02') { // 多选
                                    const record2 = []
                                    record2.push({
                                      ID: pageInfo[j].ID,
                                      BUSITYPE: pageInfo[j].BUSITYPE,
                                      TITLE: pageInfo[j].TITLE,
                                      OPTIONA: pageInfo[j].OPTIONA,
                                      OPTIONB: pageInfo[j].OPTIONB,
                                      OPTIONC: pageInfo[j].OPTIONC,
                                      OPTIOND: pageInfo[j].OPTIOND,
                                      OPTIONE: pageInfo[j].OPTIONE,
                                      ANSWER: pageInfo[j].ANSWER,
                                      NOTE: pageInfo[j].NOTE
                                    })
                                    this.DuxQuestionList.push(...record2)
                                  }
                                  if (Type === '03') { // 判断
                                    const record3 = []
                                    record3.push({
                                      ID: pageInfo[j].ID,
                                      BUSITYPE: pageInfo[j].BUSITYPE,
                                      TITLE: pageInfo[j].TITLE,
                                      ANSWER: pageInfo[j].ANSWER,
                                      NOTE: pageInfo[j].NOTE
                                    })
                                    this.PdQuestionList.push(...record3)
                                  }
                                }
                                if (this.DxQuestionList !== null && this.DxQuestionList.length > 0) {
                                  this.activeName = 'singleSelect'
                                  this.tabType = '0'
                                  setDisplayDx(this, this.DxQuestionList, 0, 0)
                                } else {
                                  if (this.DuxQuestionList !== null && this.DuxQuestionList.length > 0) {
                                    this.activeName = 'lotSelect'
                                    this.tabType = '1'
                                    setDisplayDux(this, this.DuxQuestionList, 0, 0)
                                  } else {
                                    this.activeName = 'judging'
                                    this.tabType = '2'
                                    setDisplayPd(this, this.PdQuestionList, 0, 0)
                                  }
                                }
                                this.countDown()
                              } else {
                                this.messageError('错误信息1 ： ' + _data.data.TrxMessage)
                                return
                              }
                            })
                        } else {
                          this.messageError('错误信息2 ： ' + _data.data.TrxMessage)
                          return
                        }
                      })
                  }
                } else {
                  this.messageError('错误信息3 ： ' + _data.data.TrxMessage)
                  return
                }
              })
          })
    }
    // this.hideTabs()
  },
  methods: {
    countDown() {
      formateSeconds(parseInt(this.TestTime) * 60, this)
      const clock = window.setInterval(() => {
        if (this.secondTime > 0) {
          this.secondTime--
        }
        this.Jscontent = '考试剩余时间(' + this.h + ':' + this.min + ':' + this.secondTime + ')'
        if (this.secondTime <= 0) { // 当倒计时小于0时清除定时器
          if (this.min > 0) {
            this.min--
            this.secondTime = 60
          } else {
            if (this.h > 0) {
              this.h--
              this.min = 59
              this.secondTime = 60
            } else {
              window.clearInterval(clock)
              this.Jscontent = '考试剩余时间(0)'
              this.exitTrade2()
            }
          }
        }
      }, 1000)
    },
    formatterBusitype({ cellValue }) {
      const item = this.BusiTypeList.find(item => item.value === cellValue)
      return item ? item.label : ''
    },
    handleClick(tab, e) {
      this.currRow = 0
      this.tabType = tab.index
      var _val = tab.index
      console.log(_val)
      if (_val === '0') {
        this.tabType = '0'
        this.activeName = 'singleSelect'
        setDisplayDx(this, this.DxQuestionList, 0, 0)
      } else if (_val === '1') {
        this.tabType = '1'
        this.activeName = 'lotSelect'
        setDisplayDux(this, this.DuxQuestionList, 0, 0)
      } else { // 判断
        this.tabType = '2'
        this.activeName = 'judging'
        setDisplayPd(this, this.PdQuestionList, 0, 0)
      }
    },
    hideTabs() {
      this.$refs.tabs.$children[0].$el.style.display = 'none'
    },
    DxSelectChange: function(val) {
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
      updateAnswertableData(this, '01', this.AnswertableData, this.DxQuestionList, this.CurSelectedAnswer)
    },
    DuxselectChange: function(val) {
      this.CurSelectedAnswer = val
      const selecedAnswer = val
      const answer = []
      for (let i = 0; i < selecedAnswer.length; i++) {
        if (selecedAnswer[i] === this.OptionA) {
          answer.push('A')
        }
        if (selecedAnswer[i] === this.OptionB) {
          answer.push('B')
        }
        if (selecedAnswer[i] === this.OptionC) {
          answer.push('C')
        }
        if (selecedAnswer[i] === this.OptionD) {
          answer.push('D')
        }
        if (selecedAnswer[i] === this.OptionE) {
          answer.push('E')
        }
      }
      updateAnswertableData(this, '02', this.AnswertableData, this.DxQuestionList, answer)
    },
    PdselectChange: function(val) {
      if (val.indexOf(this.OptionA) === 0) {
        this.CurSelectedAnswer = '正确'
      }
      if (val.indexOf(this.OptionB) === 0) {
        this.CurSelectedAnswer = '错误'
      }
      updateAnswertableData(this, '03', this.AnswertableData, this.DxQuestionList, this.CurSelectedAnswer)
    },
    preClick() { // 上一题
      this.currRow = this.currRow - 1
      if (this.tabType === '0') { // 单选
        setDisplayDx(this, this.DxQuestionList, this.currRow, this.CurSelectedAnswer, 1)
      } else if (this.tabType === '1') { // 多选
        setDisplayDux(this, this.DuxQuestionList, this.currRow, this.CurSelectedAnswer, 1)
      } else {
        setDisplayPd(this, this.PdQuestionList, this.currRow, this.CurSelectedAnswer, 1)
      }
    },
    nextClick() { // 下一题
      this.currRow = this.currRow + 1
      if (this.tabType === '0') { // 单选
        setDisplayDx(this, this.DxQuestionList, this.currRow, this.CurSelectedAnswer, 2)
      } else if (this.tabType === '1') { // 多选
        setDisplayDux(this, this.DuxQuestionList, this.currRow, this.CurSelectedAnswer, 2)
      } else {
        setDisplayPd(this, this.PdQuestionList, this.currRow, this.CurSelectedAnswer, 2)
      }
    },
    exitTrade() { // 计算考试分值
      console.log('Over: 计算分值' + JSON.stringify(this.AnswertableData))
      let totlescore1 = 0
      for (let i = 0; i < this.AnswertableData.length; i++) {
        const answer = this.AnswertableData[i].an_ANSWER
        const score = this.AnswertableData[i].an_SCORE
        const examanswer = this.AnswertableData[i].an_EXAMANSWER
        if (answer === examanswer) {
          totlescore1 = totlescore1 + parseInt(score)
        }
      }
      this.innerVisible = true
      const num = parseInt(totlescore1) / parseInt(this.totalScore) * 100
      console.log('Over: 计算分值结果' + '考题总分数：' + this.totalScore + ',实际得分：' + totlescore1)
      this.examScore = '实际考分折合百分制为:' + num.toFixed(2)
    },
    exitTrade2() { // 时间到
      let totlescore1 = 0
      for (let i = 0; i < this.AnswertableData.length; i++) {
        const answer = this.AnswertableData[i].an_ANSWER
        const score = this.AnswertableData[i].an_SCORE
        const examanswer = this.AnswertableData[i].an_EXAMANSWER
        if (answer === examanswer) {
          totlescore1 = totlescore1 + parseInt(score)
        }
      }
      this.innerVisible = true
      const num = parseInt(totlescore1) / parseInt(this.totalScore) * 100
      console.log('Over: 计算分值结果' + '考题总分数：' + this.totalScore + ',实际得分：' + totlescore1)
      this.$alert('考试时间已到，已自动交卷！' + ' 实际考分折合百分制为:' + num.toFixed(2))
      this.exitTrade1()
    },
    exitTrade1() { // 计算考试分值
      this.$router.push({
        path: this.redirect || '/dashboard'
      })
    }
  }
}
</script>

<style>
  .divClass700701 {
    border-top: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
    border-left: 1px solid #e3e3e3;
    border-right: 1px solid #e3e3e3;
    width: 90%;
    margin-left: 100px;
  }
  .divClass700702 {
    border-top: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
    border-left: 1px solid #e3e3e3;
    border-right: 1px solid #e3e3e3;
    width: 90%;
    height: 600px;
    margin-left: 100px;
    margin-top:10px;
  }
  .divClass700703 {
    border-top: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
    border-left: 1px solid #e3e3e3;
    border-right: 1px solid #e3e3e3;
    width: 90%;
    height: 600px;
    margin-left: 7px;
    margin-top:10px;
  }
  .colClass700701{
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .colClass70070201{
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .el-tabs--border-card>.el-tabs__content {
    padding: 0px;
  }
  .el_radio700701 {
    line-height: 2;
    font-size: 13px;
  }
</style>
