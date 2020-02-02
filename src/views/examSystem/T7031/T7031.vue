<template>
  <el-main>
    <div>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        size="small">
        <el-row type="flex" class="rowClass703101">
          <el-col :span="15" :offset="4">
            <el-form-item label="题目类型：" prop="tiXing">
              <el-select v-model="ruleForm.tiXing" style="width: 80%;" placeholder="请选择" clearable>
                <el-option v-for="item in tiXings" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15" :offset="4">
            <el-form-item label="业务类型：" prop="yeWuLeiXing">
              <el-select v-model="ruleForm.yeWuLeiXing" style="width: 80%;" placeholder="请选择" clearable>
                <el-option v-for="item in yeWuLeiXings" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15" :offset="4">
            <el-form-item label="难易程度：" prop="nanDu">
              <el-select v-model="ruleForm.nanDu" style="width: 80%;" placeholder="请选择" clearable>
                <el-option v-for="item in nanDus" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15" :offset="4">
            <el-form-item label="题目数量：" prop="TmSl" style="width: 83%;">
              <el-input v-model="ruleForm.TmSl" placeholder="请输入数量" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-row>
      <el-col :span="16" align="right">
        <el-button class="btn703101" size="small" type="primary" @click="submitForm()">{{ '下一步' }}</el-button>
        <el-button size="small" type="primary" @click="exitTrade()">{{ '退出' }}</el-button>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
export default {
  name: 'T7031',
  data: function() {
    return {
      ruleForm: {
        TmSl: '', // 题目数量
        tiXing: '', // 题型
        nanDu: '', // 难度
        yeWuLeiXing: '' // 业务类型
      },
      rules: { // 表单校验
        tiXing: [
          { required: true, message: '请选择题型', trigger: 'change' }
        ],
        nanDu: [
          { required: true, message: '请选择难度', trigger: 'change' }
        ],
        yeWuLeiXing: [
          { required: true, message: '请选择业务类型', trigger: 'change' }
        ],
        TmSl: [
          { required: true, message: '请输入题目数量', trigger: 'change' },
          { type: 'number',
            validator: (rule, value, callback) => {
              if (/^[1-9]\d*$/.test(value) === false) {
                callback(new Error('请输入一个整数'))
              } else {
                callback()
              }
            }, trigger: 'change'
          }

        ]
      },
      CurrentUserNo: '', // 初始化-当前柜员号
      CurrentUserName: '', // 初始化-当前柜员名称
      CurrentBranchNo: '', // 初始化-当前机构号
      CurrentBranchName: '', // 初始化-当前机构名称
      CurrentZoneNo: '', // 初始化-当前地区号
      CurrentSystemDate: '', // 初始化-当前系统日期
      CurrentSystemTime: '', // 当前系统时间
      tiXings: this.$combo.tiXing,
      nanDus: this.$combo.nanDu,
      yeWuLeiXings: this.$combo.yeWuLeiXing
    }
  },
  mounted() {
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
            if (this.ruleForm.tiXing === '01') { // 单选
              this.$router.push({
                path: this.redirect || '/T703101',
                name: 'T703101',
                params: {
                  questionByRandomAlgm: pageInfo,
                  TYPE: this.ruleForm.tiXing
                }
              })
            } else if (this.ruleForm.tiXing === '02') { // 多选
              this.$router.push({
                path: this.redirect || '/T703102',
                name: 'T703102',
                params: {
                  questionByRandomAlgm: pageInfo,
                  TYPE: this.ruleForm.tiXing
                }
              })
            } else if (this.ruleForm.tiXing === '03') { // 判断
              this.$router.push({
                path: this.redirect || '/T703103',
                name: 'T703103',
                params: {
                  questionByRandomAlgm: pageInfo,
                  TYPE: this.ruleForm.tiXing
                }
              })
            }
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
  .divClass703101 {
    border-top: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
    border-left: 1px solid #e3e3e3;
    border-right: 1px solid #e3e3e3;
    width: 50%;
    margin-left: 8.5%;
    margin-top: 10px;
  }
  .rowClass703101{
    margin-top: 10px;
  }
  .rowClass703102{
    width: 63%;
    margin-top: 5px;
  }
  .btn703101 {
    margin-right: 25px;
  }
</style>
