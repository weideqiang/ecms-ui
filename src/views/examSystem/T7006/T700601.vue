<template>
  <div>
    <el-main>
      <el-row class="divClass700601">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          align="middle">
          <el-form-item>
            <el-radio-group v-model="ruleForm.resource" size="medium" align="left" @change="selectChange">
              <el-row>
                <el-radio :disabled="disabledresource1" v-model="ruleForm.resource1" label="随机试题，每位考生获得的试卷及题目随机生成。" class="el_radio700601" />
              </el-row>
              <el-row align="left">
                <el-radio :disabled="disabledresource2" v-model="ruleForm.resource2" label="统一试题，每位考生获得相同的试卷。" class="el_radio700602"/>
              </el-row>
              <el-row align="left">
                <el-radio :disabled="disabledresource3" v-model="ruleForm.resource3" label="指定试题，教师指定统一的试卷。" class="el_radio700603"/>
              </el-row>
              <el-row align="left">
                <el-radio :disabled="disabledresource4" v-model="ruleForm.resource4" label="试卷上传，教师通过试卷模板上传考试题目。" class="el_radio700604"/>
              </el-row>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </el-row>
      <br>
      <el-row class="divClass700601">
        <el-form
          ref="inputForm1"
          :model="inputForm1"
          :rules="inputRules"
          align="middle"
          label-width="100px">
          <el-row>
            <el-col :span="18">
              <el-form-item label="策略出处：" prop="ClResource">
                <el-select ref="ClResource" :disabled="disabledClResource" v-model="inputForm1.ClResource" filterable placeholder="请选择" style="width: 100%;" size="small">
                  <el-option v-for="item in ClResourceList" ref="clResource" :key="item.value" :label="item.label" :value="item.value"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-button v-if="ZdSt" class="btn70060101" size="small" type="primary" @click="ZdSt7035()">指定试题</el-button>
              <el-dialog v-if="DiaLog7035Visible" :visible.sync="DiaLog7035Visible" title="指定试题" width="80%">
                <DiaLog7035 :fromfather7006="valueFromFather" @sendmsgExit="getMsgExit" @sendmsgList="getMsgList" @sendmsgScore="getMsgScore"/>
              </el-dialog>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item label="策略：" prop="Cl">
                <el-select ref="Cl" :disabled="disabledCl" v-model="inputForm1.Cl" filterable placeholder="请选择" style="width: 100%;" size="small">
                  <el-option v-for="item in ClList" ref="cl" :key="item.value" :label="item.label" :value="item.value" class="el-input760102"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-button v-if="SjSc" class="btn70060101" size="small" type="primary" @click="uploadFile()">试卷上传</el-button>
              <el-dialog v-if="DiaLog7030Visible" :visible.sync="DiaLog7030Visible" title="业务知识上传" width="65%">
                <DiaLog7030 :fromfather7006="valueFromFather" @sendmsgExit="getMsgExit" @sendmsgList="getMsgList" @sendmsgScore="getMsgScore"/>
              </el-dialog>
            </el-col>
          </el-row>
        </el-form>
      </el-row>
      <br>
      <el-row>
        <el-col :span="15" align="right">
          <el-button size="small" type="primary" @click="nextStep()">下一步</el-button>
        </el-col>
        <el-col :span="4" align="middle">
          <el-button size="small" type="primary" @click="Exit()">退出</el-button>
        </el-col>
      </el-row>
    </el-main>
  </div>
</template>

<script>
import DiaLog7030 from '../T7030/T7030'
import DiaLog7035 from '../T7035/T7035'
export default {
  name: 'T700601',
  components: {
    DiaLog7030,
    DiaLog7035
  },
  data() {
    const validateClResource = (rule, value, callback) => {
      if (value !== '') {
        // 策略下拉列表加载
        this.ClList = []
        if (this.examType === '01') {
          const map = { 'ClResource': this.inputForm1.ClResource }
          const params = { 'ruleForm': JSON.stringify(map) }
          const url = this.$examSystemMngApi.getSelectManagerFromZoneno
          this.$http(url, params).then( // 通讯后台修改数据库中信息
            res => {
              const _data = res.data
              if (_data.data.TrxCode === '000000') {
                const pageInfo = _data.data.PageInfo.list
                for (let i = 0; i < pageInfo.length; i++) {
                  const CLList1 = [{
                    value: pageInfo[i].ID,
                    label: pageInfo[i].ID + '-' + pageInfo[i].TITLE
                  }]
                  this.ClList.push(...CLList1)
                }
              } else {
                this.messageError('错误信息 ： ' + _data.data.TrxMessage)
                return
              }
            })
        } else if (this.examType === '04') {
          const map = { 'ClResource': this.inputForm1.ClResource }
          const params = { 'ruleForm': JSON.stringify(map) }
          const url = this.$examSystemMngApi.getTradeSelectFromZoneno
          this.$http(url, params).then( // 通讯后台修改数据库中信息
            res => {
              const _data = res.data
              if (_data.data.TrxCode === '000000') {
                const pageInfo = _data.data.PageInfo.list
                for (let i = 0; i < pageInfo.length; i++) {
                  const CLList1 = [{
                    value: pageInfo[i].ID,
                    label: pageInfo[i].ID + '-' + pageInfo[i].CASEDESC
                  }]
                  this.ClList.push(...CLList1)
                }
              } else {
                this.messageError('错误信息 ： ' + _data.data.TrxMessage)
                return
              }
            })
        }
      } else {
        this.messageError('请选择策略出处!')
        this.$refs['ClResource'].focus()
        callback()
      }
    }
    const validateCl = (rule, value, callback) => {
      if (value !== '') {
        // 策略下拉列表加载
        this.ClList = []
        if (this.examType === '01') {
          const map = { 'Cl': this.inputForm1.Cl }
          const params = { 'ruleForm': JSON.stringify(map) }
          const url = this.$examSystemMngApi.getSelectManagerInfo
          this.$http(url, params).then( // 通讯后台修改数据库中信息
            res => {
              const _data = res.data
              if (_data.data.TrxCode === '000000') {
                const pageInfo = _data.data.PageInfo.list
                const lstMap = []
                const scoreMap = new Map() // 题目分值

                for (let i = 0; i < pageInfo.length; i++) {
                  const type = pageInfo[i].TYPE // 题目类型 01-单选 02-复选 03-判断 04-问答
                  const busitype = pageInfo[i].BUSITYPE // 业务类型
                  const basicnum = pageInfo[i].BASICNUM // 基础题数量
                  const MODERATENUM = pageInfo[i].MODERATENUM // 适中题目数量
                  const HARDNUM = pageInfo[i].HARDNUM // 困难题目数量
                  const HARDESTNUM = pageInfo[i].HARDESTNUM // 极难题目数量
                  const SCORE = pageInfo[i].SCORE // 题目分值
                  scoreMap.set(type, SCORE)
                  this.TOTALSCORE = pageInfo[i].TOTAL
                  if (basicnum !== '0') {
                    const record1 = []
                    record1.push({
                      LINAGE: basicnum,
                      TYPE: type, // 题目类型(可为空)
                      BUSITYPE: busitype, // 业务类型(可为空)
                      LVL: '1' // 题目难度(可为空)
                    })
                    lstMap.push(...record1)
                  }
                  if (MODERATENUM !== '0') {
                    const record2 = []
                    record2.push({
                      LINAGE: MODERATENUM,
                      TYPE: type, // 题目类型(可为空)
                      BUSITYPE: busitype, // 业务类型(可为空)
                      LVL: '2' // 题目难度(可为空)
                    })
                    lstMap.push(...record2)
                  }
                  if (HARDNUM !== '0') {
                    const record3 = []
                    record3.push({
                      LINAGE: HARDNUM,
                      TYPE: type, // 题目类型(可为空)
                      BUSITYPE: busitype, // 业务类型(可为空)
                      LVL: '3' // 题目难度(可为空)
                    })
                    lstMap.push(...record3)
                  }
                  if (HARDESTNUM !== '0') {
                    const record4 = []
                    record4.push({
                      LINAGE: HARDESTNUM,
                      TYPE: type, // 题目类型(可为空)
                      BUSITYPE: busitype, // 业务类型(可为空)
                      LVL: '4' // 题目难度(可为空)
                    })
                    lstMap.push(...record4)
                  }
                }
                if (lstMap.length === 0) {
                  this.messageError('通过该策略不能选择任何数据')
                  return
                }
                // const planTestInfoListMap = []
                // 判定是否随机试题
                if (this.suiJStSelected) { // 随机试题，每个考生的试题都是随机生成
                  console.log('PersionList: ' + JSON.stringify(this.PersionList))
                  for (let i = 0; i < this.PersionList.length; i++) {
                    const zoneno = this.PersionList[i].ZONENO
                    const brno = this.PersionList[i].BRNO
                    const tlrno = this.PersionList[i].TLRNO
                    const tlrname = this.PersionList[i].TLRNAME
                    const params = { 'ruleForm': JSON.stringify(lstMap) }
                    const url = this.$examSystemMngApi.getQuestionByRandomAlgm
                    this.$http(url, params).then( // 通讯后台修改数据库中信息
                      res => {
                        const _data = res.data
                        if (_data.data.TrxCode === '000000') {
                          const pageInfo = _data.data.PageInfo
                          for (let j = 0; j < pageInfo.length; j++) {
                            const id = pageInfo[j].ID // 题目ID
                            const answer = pageInfo[j].ANSWER // 题目答案
                            const type = pageInfo[j].TYPE // 题目类型
                            const map2 = []
                            map2.push({
                              EXAMID: this.planSeqId,
                              ZONENO: zoneno,
                              BRNO: brno,
                              TLRNO: tlrno,
                              TLRNAME: tlrname,
                              ID: id,
                              EXAMANSWER: answer,
                              SCORE: scoreMap.get(type)
                            })
                            this.planTestInfoListMap.push(...map2)
                          }
                        } else {
                          this.messageError('错误信息 ： ' + _data.data.TrxMessage)
                          return
                        }
                      })
                  }
                } else if (this.tongYStSelected) { // 统一试题
                  for (let i = 0; i < this.PersionList.length; i++) {
                    const zoneno = this.PersionList[i].ZONENO
                    const brno = this.PersionList[i].BRNO
                    const tlrno = this.PersionList[i].TLRNO
                    const tlrname = this.PersionList[i].TLRNAME
                    const params = { 'ruleForm': JSON.stringify(lstMap) }
                    const url = this.$examSystemMngApi.getQuestionByRandomAlgm
                    this.$http(url, params).then( // 通讯后台修改数据库中信息
                      res => {
                        const _data = res.data
                        console.log('getQuestionByRandomAlgm:' + JSON.stringify(_data))
                        if (_data.data.TrxCode === '000000') {
                          const pageInfo = _data.data.PageInfo
                          for (let j = 0; j < pageInfo.length; j++) {
                            const id = pageInfo[j].ID // 题目ID
                            const answer = pageInfo[j].ANSWER // 题目答案
                            const type = pageInfo[j].TYPE // 题目类型
                            const map2 = []
                            map2.push({
                              EXAMID: this.planSeqId,
                              ZONENO: zoneno,
                              BRNO: brno,
                              TLRNO: tlrno,
                              TLRNAME: tlrname,
                              ID: id,
                              EXAMANSWER: answer,
                              SCORE: scoreMap.get(type)
                            })
                            this.planTestInfoListMap.push(...map2)
                          }
                        } else {
                          this.messageError('错误信息 ： ' + _data.data.TrxMessage)
                          return
                        }
                      })
                  }
                }
              } else {
                this.messageError('错误信息11 ： ' + _data.data.TrxMessage)
                return
              }
            })
        } else if (this.examType === '04') {
          const map = { 'Cl': this.inputForm1.Cl }
          const params = { 'ruleForm': JSON.stringify(map) }
          console.log('getSelectManagerInfo params' + JSON.stringify(params))
          const url = this.$examSystemMngApi.getTradeSelectManagerInfo
          this.$http(url, params).then( // 通讯后台修改数据库中信息
            res => {
              const _data = res.data
              if (_data.data.TrxCode === '000000') {
                const pageInfo = _data.data.PageInfo.list
                const lstMap = []
                const scoreMap = new Map() // 题目分值
                for (let i = 0; i < pageInfo.length; i++) {
                  scoreMap.set(pageInfo[i].TRXNO, pageInfo[i].SCORE)
                  const record = []
                  record.push({
                    TRXNO: pageInfo[i].TRXNO,
                    COUNT: pageInfo[i].NUM
                  })
                  this.TOTALSCORE = pageInfo[i].TOTALSCORE // 总分值
                  lstMap.push(...record)
                }
                console.log('scoreMap04: ' + JSON.stringify(scoreMap))
                console.log('lstMap04: ' + JSON.stringify(lstMap))
                if (lstMap.length === 0) {
                  this.messageError('通过该策略不能选择任何数据')
                  return
                }
                // 判定是否随机试题
                if (this.suiJStSelected) { // 随机试题，每个考生的试题都是随机生成
                  console.log('PersionList: ' + JSON.stringify(this.PersionList))
                  for (let i = 0; i < this.PersionList.length; i++) {
                    const zoneno = this.PersionList[i].ZONENO
                    const brno = this.PersionList[i].BRNO
                    const tlrno = this.PersionList[i].TLRNO
                    const tlrname = this.PersionList[i].TLRNAME
                    const params = { 'ruleForm': JSON.stringify(lstMap) }
                    const url = this.$examSystemMngApi.getTradeQuestionByRandomAlgm
                    this.$http(url, params).then( // 通讯后台修改数据库中信息
                      res => {
                        const _data = res.data
                        console.log('getTradeQuestionByRandomAlgm:' + JSON.stringify(_data))
                        if (_data.data.TrxCode === '000000') {
                          const pageInfo = _data.data.PageInfo
                          for (let j = 0; j < pageInfo.length; j++) {
                            const id = pageInfo[j].ID // 题目ID
                            const answer = pageInfo[j].JSONDATA // 题目答案
                            const trxno = pageInfo[j].TRXNO // 题目答案
                            const map2 = []
                            map2.push({
                              EXAMID: this.planSeqId,
                              ZONENO: zoneno,
                              BRNO: brno,
                              TLRNO: tlrno,
                              TLRNAME: tlrname,
                              ID: id,
                              EXAMANSWER: answer,
                              SCORE: scoreMap.get(trxno)
                            })
                            this.planTestInfoListMap.push(...map2)
                          }
                          console.log('this.planTestInfoListMap353:' + JSON.stringify(this.planTestInfoListMap))
                        } else {
                          this.messageError('错误信息3 ： ' + _data.data.TrxMessage)
                          return
                        }
                      })
                  }
                } else if (this.tongYStSelected) { // 统一试题
                  for (let i = 0; i < this.PersionList.length; i++) {
                    const zoneno = this.PersionList[i].ZONENO
                    const brno = this.PersionList[i].BRNO
                    const tlrno = this.PersionList[i].TLRNO
                    const tlrname = this.PersionList[i].TLRNAME
                    const params = { 'ruleForm': JSON.stringify(lstMap) }
                    const url = this.$examSystemMngApi.getTradeQuestionByRandomAlgm
                    this.$http(url, params).then( // 通讯后台修改数据库中信息
                      res => {
                        const _data = res.data
                        console.log('getQuestionByRandomAlgm:' + JSON.stringify(_data))
                        if (_data.data.TrxCode === '000000') {
                          const pageInfo = _data.data.PageInfo
                          for (let j = 0; j < pageInfo.length; j++) {
                            const id = pageInfo[j].ID // 题目ID
                            const answer = pageInfo[j].JSONDATA // 题目答案
                            const trxno = pageInfo[j].TRXNO // 题目答案
                            // const type = pageInfo[j].TYPE // 题目类型
                            const map2 = []
                            map2.push({
                              EXAMID: this.planSeqId,
                              ZONENO: zoneno,
                              BRNO: brno,
                              TLRNO: tlrno,
                              TLRNAME: tlrname,
                              ID: id,
                              EXAMANSWER: answer,
                              SCORE: scoreMap.get(trxno)
                            })
                            this.planTestInfoListMap.push(...map2)
                          }
                          console.log('this.planTestInfoListMap392:' + JSON.stringify(this.planTestInfoListMap))
                        } else {
                          this.messageError('错误信息2 ： ' + _data.data.TrxMessage)
                          return
                        }
                      })
                  }
                }
              } else {
                this.messageError('错误信息1 ： ' + _data.data.TrxMessage)
                return
              }
            })
        }
      } else {
        this.messageError('请选择策略!')
        this.$refs['cl'].focus()
        callback()
      }
    }
    return {
      planSeqId: '',
      ZdSt: true,
      SjSc: true,
      ClList: [],
      ClResourceList: [],
      valueFromFather: [], // 父页面给子页面传值
      DiaLog7030Visible: false,
      DiaLog7035Visible: false,
      planTestInfoListMap: [],
      disabledresource1: false,
      disabledresource2: false,
      disabledresource3: false,
      disabledresource4: false,
      suiJStSelected: false,
      tongYStSelected: false,
      zhiDStSelected: false,
      siJScStSelected: false,
      disabledClResource: false,
      disabledCl: false,
      examType: '',
      TOTALSCORE: '',
      PersionList: [],
      ruleForm: {
        resource: '',
        resource1: '',
        resource2: '',
        resource3: '',
        resource4: ''
      },
      inputForm1: {
        ClResource: '', // 策略出处
        Cl: '' // 策略
      },
      inputRules: {
        ClResource: [
          { required: true, message: '请选择策略出处', trigger: 'change' },
          { trigger: 'change', validator: validateClResource }
        ],
        Cl: [
          { required: true, message: '请选择策略', trigger: 'blur' },
          { trigger: 'change', validator: validateCl }
        ]
      }
    }
  },
  mounted: function() {
    this.ZdSt = false
    this.SjSc = false
    const params = this.$route.params
    if (params) {
      this.planSeqId = this.$route.params.planSeqId
      this.examType = this.$route.params.KsType
      this.PersionList = this.$route.params.YfpData
      if (this.examType === '01') {
        this.disabledresource1 = false
        this.disabledresource2 = false
        this.disabledresource3 = false
        this.disabledresource4 = false
      } else if (this.examType === '04') {
        this.disabledresource1 = false
        this.disabledresource2 = false
        this.disabledresource3 = true
        this.disabledresource4 = true
      }
    }
  },
  methods: {
    getMsgExit(data) {
      if (data === 'Exit7030') {
        this.DiaLog7030Visible = false
      } else if (data === 'Exit7035') {
        this.DiaLog7035Visible = false
      }
    },
    getMsgList(data) {
      console.log('getMsgListSize:' + data.length)
      this.planTestInfoListMap = data
    },
    getMsgScore(data) {
      console.log('getMsgScore:' + data)
      this.TOTALSCORE = data
    },
    uploadFile() { // 试卷上传
      if (this.PersionList !== null) {
        this.DiaLog7030Visible = true
        this.valueFromFather = []
        this.valueFromFather.push({
          fatherTradeNo: 'T700601',
          PLANSEQ: this.planSeqId,
          persionList: this.PersionList
        })
        console.log('700601: ' + JSON.stringify(this.valueFromFather))
      } else {
        this.messageError('学员信息为空!')
        return
      }
    },
    ZdSt7035() { // 指定试题
      if (this.PersionList !== null) {
        this.DiaLog7035Visible = true
        this.valueFromFather = []
        this.valueFromFather.push({
          fatherTradeNo: 'T700601',
          PLANSEQ: this.planSeqId,
          persionList: this.PersionList
        })
        console.log('700601: ' + JSON.stringify(this.valueFromFather))
      } else {
        this.messageError('学员信息为空!')
        return
      }
    },
    Exit() { // 交易退出返回首页
      this.$router.push({
        path: this.redirect || '/dashboard'
      })
    },
    nextStep() { // 下一步
      let type = ''
      if (this.suiJStSelected) {
        type = '01'
      }
      if (this.tongYStSelected) {
        type = '02'
      }
      if (this.zhiDStSelected) {
        type = '03'
      }
      if (this.siJScStSelected) {
        type = '04'
      }
      if (this.TOTALSCORE === '') {
        this.messageError('总分数为空!')
        return
      }
      if (this.PlanTestInfoListMap !== null) {
        this.$router.push({
          path: this.redirect || '/T700602',
          name: 'T700602',
          params: {
            ZONENO: this.inputForm1.ClResource, // 策略出处
            SELECTID: this.inputForm1.Cl, // 策略
            TYPE: type,
            PlanTestInfoListMap: this.planTestInfoListMap,
            PersionList: this.PersionList,
            PLANSEQ: this.planSeqId,
            TESTTYPE: this.examType,
            TOTALSCORE: this.TOTALSCORE
          }
        })
      } else {
        this.messageError('试题为空!')
        return
      }
    },
    selectChange: function(val) {
      console.log('@@@@:' + val.indexOf('随机试题'))
      console.log('####:' + this.examType)
      if (val.indexOf('随机试题') === 0) {
        this.suiJStSelected = true
        this.disabledClResource = false
        this.disabledCl = false
      } else {
        this.suiJStSelected = false
      }
      if (val.indexOf('统一试题') === 0) {
        this.tongYStSelected = true
        this.disabledClResource = false
        this.disabledCl = false
      } else {
        this.tongYStSelected = false
      }
      if (val.indexOf('指定试题') === 0) {
        this.zhiDStSelected = true
        this.disabledClResource = true
        this.disabledCl = true
      } else {
        this.zhiDStSelected = false
      }
      if (val.indexOf('试卷上传') === 0) {
        this.siJScStSelected = true
        this.disabledClResource = true
        this.disabledCl = true
      } else {
        this.siJScStSelected = false
      }
      if (this.examType === '01') {
        if (val.indexOf('随机试题') === 0 || val.indexOf('统一试题') === 0) {
          // this.ZdSt = true
          // this.SjSc = true
          this.inputForm1.ClResource = ''
          this.inputForm1.Cl = ''
          this.inputRules.ClResource[0].required = true
          this.inputRules.Cl[0].required = true
          // 策略出处-地区号查询
          this.ClResourceList = []
          // const zoneNo = { 'zoneNo': this.inputForm.zoneInfo }
          const url = this.$examSystemMngApi.getSelectManagerZoneno
          this.$http(url).then( // 通讯后台修改数据库中信息
            res => {
              const _data = res.data
              if (_data.data.data.TrxCode === '000000') {
                const pageInfo = _data.data.data.PageInfo.list
                for (let i = 0; i < pageInfo.length; i++) {
                  const zoneList = [{
                    value: pageInfo[i].ZONENO,
                    label: pageInfo[i].ZONENO + '-' + pageInfo[i].ZONENAME
                  }]
                  this.ClResourceList.push(...zoneList)
                }
              } else {
                this.messageError('错误信息 ： ' + _data.data.TrxMessage)
                return
              }
            })
        } else {
          this.inputForm1.ClResource = ''
          this.inputForm1.Cl = ''
          this.inputRules.ClResource[0].required = false
          this.inputRules.Cl[0].required = false
          if (val.indexOf('指定试题') === 0) {
            this.ZdSt = true
            this.SjSc = false
          } else if (val.indexOf('试卷上传') === 0) {
            this.ZdSt = false
            this.SjSc = true
          }
        }
      } else if (this.examType === '04') {
        if (val.indexOf('随机试题') === 0 || val.indexOf('统一试题') === 0) {
          this.inputForm1.ClResource = ''
          this.inputForm1.Cl = ''
          this.inputRules.ClResource[0].required = true
          this.inputRules.Cl[0].required = true
          // 策略出处-地区号查询
          this.ClResourceList = []
          // const zoneNo = { 'zoneNo': this.inputForm.zoneInfo }
          const url = this.$examSystemMngApi.getTradeSelectZoneno
          this.$http(url).then( // 通讯后台修改数据库中信息
            res => {
              const _data = res.data
              if (_data.data.TrxCode === '000000') {
                const pageInfo = _data.data.PageInfo.list
                for (let i = 0; i < pageInfo.length; i++) {
                  const zoneList = [{
                    value: pageInfo[i].ZONENO,
                    label: pageInfo[i].ZONENO + '-' + pageInfo[i].ZONENAME
                  }]
                  this.ClResourceList.push(...zoneList)
                }
              } else {
                this.messageError('错误信息 ： ' + _data.data.TrxMessage)
                return
              }
            })
        } else {
          this.inputForm1.ClResource = ''
          this.inputForm1.Cl = ''
          this.inputRules.ClResource[0].required = false
          this.inputRules.Cl[0].required = false
        }
      }
    }
  }
}
</script>

<style>
  .el_radio700601 {
    line-height: 2;
    font-size: 13px;
  }
  .el_radio700602 {
    line-height: 2;
    font-size: 13px;
  }
  .el_radio700603 {
    line-height: 2;
    font-size: 13px;
  }
  .el_radio700604 {
    line-height: 2;
    font-size: 13px;
  }
  .divClass700601 {
    border-top: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
    border-left: 1px solid #e3e3e3;
    border-right: 1px solid #e3e3e3;
    width:70%;
    margin-left: 100px;
  }
  .btn70060101 {
    margin-top: 2px;
  }
</style>
