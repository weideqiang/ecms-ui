<template>
  <div>
    <el-main>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="inputRules"
        size="small"
        label-width="100px">
        <el-row class="divClass70060201">
          <el-row type="flex" justify="start" class="divClass70060202">
            <el-col :span="10" :offset="2" class="ColClass70060201">
              <el-form-item label="考试日期：" prop="examDate">
                <el-date-picker
                  v-model="ruleForm.examDate"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyyMMdd"
                  clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="考试时间：" prop="examTime">
                <el-time-picker
                  v-model="ruleForm.examTime"
                  :picker-options="{
                    selectableRange: '00:00:00 - 23:59:59'
                  }"
                  value-format="HH:mm:ss"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10" :offset="2">
              <el-form-item label="考试时长：" prop="examTiming">
                <el-input v-model="ruleForm.examTiming" placeholder="分钟" clearable/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="15" :offset="2">
              <el-form-item label="考试说明：" prop="textArea">
                <el-input
                  v-model="ruleForm.textArea"
                  :rows="3"
                  type="textarea"
                  placeholder="请输入内容"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
        <br>
        <el-row>
          <el-col :span="19" align="right">
            <el-button class="btn70060202" size="small" type="primary" @click="finish()">完成</el-button>
            <el-button class="btn70060201" size="small" type="primary" @click="Exit()">退出</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-main>
  </div>
</template>

<script>
import { DateTime } from '../../../commjs/common'
export default {
  name: 'T700602',
  data() {
    const validateExamEndTime = (rule, value, callback) => {
      if (value !== '') {
        const params = { 'time': this.ruleForm.examTime.split(':')[0] + this.ruleForm.examTime.split(':')[1] +
            this.ruleForm.examTime.split(':')[2],
        'minute': this.ruleForm.examTiming }
        this.$http(this.$systemPublicApi.minuteAddMinute, params)
          .then(
            res => {
              this.endTime = res.data
            })
      } else {
        callback()
      }
    }
    return {
      CurrentUserNo: '', // 初始化-当前柜员号
      CurrentUserName: '', // 初始化-当前柜员名称
      CurrentBranchNo: '', // 初始化-当前机构号
      CurrentBranchName: '', // 初始化-当前机构名称
      CurrentZoneNo: '', // 初始化-当前地区号
      CurrentSystemDate: '', // 初始化-当前系统日期
      planSeqId: '',
      PlanTestInfoListMap: '',
      PersionList: '',
      PLANSEQ: '',
      TESTTYPE: '',
      SELECTID: '',
      TOTALSCORE: '',
      endTime: '',
      TYPE: '',
      ruleForm: {
        examDate: '', // 考试日期
        examTime: '', // 考试时间
        examTiming: '', // 考试时长
        textArea: '' // 文本框
      },
      inputRules: {
        examDate: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        examTime: [
          { required: true, message: '请输入时间', trigger: 'change' }
        ],
        examTiming: [
          { required: true, message: '请输入考试时长', trigger: 'change' },
          { trigger: 'blur', validator: validateExamEndTime }
        ]
      }
    }
  },
  mounted: function() {
    const params = this.$route.params
    if (params) {
      this.PlanTestInfoListMap = this.$route.params.PlanTestInfoListMap
      this.PersionList = this.$route.params.PersionList
      this.PLANSEQ = this.$route.params.PLANSEQ
      this.TESTTYPE = this.$route.params.TESTTYPE
      this.SELECTID = this.$route.params.SELECTID
      this.TOTALSCORE = this.$route.params.TOTALSCORE
      this.TYPE = this.$route.params.TYPE
      this.ZONENO = this.$route.params.ZONENO
      this.SELECTID = this.$route.params.SELECTID
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
          })
    }
  },
  methods: {
    Exit() { // 交易退出返回首页
      this.$router.push({
        path: this.redirect || '/dashboard'
      })
    },
    finish() {
      const map = { 'id': this.PLANSEQ, 'personList': this.PersionList }
      const params = { 'ruleForm': JSON.stringify(map) }
      // 插入考试人员信息表
      const url = this.$examSystemMngApi.insertPlanPersionInfo
      this.$http(url, params).then( // 通讯后台修改数据库中信息
        res => {
          const _data = res.data
          if (_data.data.TrxCode === '000000') {
            const map = { 'id': this.PLANSEQ, 'detailList': this.PlanTestInfoListMap }
            const params = { 'ruleForm': JSON.stringify(map) }
            // 插入人员试题信息表
            const url = this.$examSystemMngApi.insertPlanTestInfo
            this.$http(url, params).then( // 通讯后台修改数据库中信息
              res => {
                const _data = res.data
                if (_data.data.TrxCode === '000000') {
                  const beginTime = this.ruleForm.examTime.split(':')[0] +
                    this.ruleForm.examTime.split(':')[1] + this.ruleForm.examTime.split(':')[2]
                  const examDate = this.ruleForm.examDate
                  const note = this.ruleForm.textArea
                  const timestap = this.CurrentSystemDate + new DateTime().getTime()
                  const map = { 'id': this.PLANSEQ, 'effTime': this.ruleForm.examTiming,
                    'type': this.TESTTYPE, 'zoneno': this.ZONENO,
                    'selectid': this.SELECTID, 'begintime': beginTime,
                    'endtime': this.endTime + '', 'accdate': examDate,
                    'note': note, 'totalscore': this.TOTALSCORE + '',
                    'type1': this.TYPE, 'modbrno': this.CurrentBranchNo,
                    'modtlrno': this.CurrentUserNo, 'timestamp': timestap }
                  const params = { 'ruleForm': JSON.stringify(map) }
                  // 插入考试场次基本信息
                  const url = this.$examSystemMngApi.insertPlanInfo
                  this.$http(url, params).then( // 通讯后台修改数据库中信息
                    res => {
                      const _data = res.data
                      if (_data.data.TrxCode === '000000') {
                        this.messageSuccess('场次生成成功[' + this.PLANSEQ + ']')
                        this.$router.push({
                          path: this.redirect || '/dashboard'
                        })
                        return
                      } else {
                        this.messageError('错误信息4 ： ' + _data.data.TrxMessage)
                        return
                      }
                    })
                } else {
                  this.messageError('错误信息6 ： ' + _data.data.TrxMessage)
                  return
                }
              })
          } else {
            this.messageError('错误信息5 ： ' + _data.data.TrxMessage)
            return
          }
        })
    }
  }
}
</script>

<style>
  .divClass70060201 {
    border-top: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
    border-left: 1px solid #e3e3e3;
    border-right: 1px solid #e3e3e3;
    width: 70%;
    margin-left: 100px;
  }
  .divClass70060202{
    margin-top: 10px;
  }
  .btn70060201 {
    margin-right: 22px;
  }
  .btn70060202 {
    margin-right: 22px;
  }
</style>
