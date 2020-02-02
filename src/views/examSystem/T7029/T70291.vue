<template>
  <el-main>
    <el-tabs v-model="activeName" :tab-position="tabPosition" type="border-card" @tab-click="handleClick">
      <el-tab-pane :key="'One'" label="单选" name="One">
        <child1 v-if="isChildUpdate1" :fromfather70291="valueFromFather" @sendmsgExit="getMsgExit"/>
      </el-tab-pane>
      <el-tab-pane :key="'Two'" label="多选" name="Two">
        <child2 v-if="isChildUpdate2" :fromfather70291="valueFromFather" @sendmsgExit="getMsgExit"/>
      </el-tab-pane>
      <el-tab-pane :key="'Three'" label="判断" name="Three">
        <child3 v-if="isChildUpdate3" :fromfather70291="valueFromFather" @sendmsgExit="getMsgExit"/>
      </el-tab-pane>
    </el-tabs>
  </el-main>
</template>

<script>
import tabZujianChild1 from './T702911'
import tabZujianChild2 from './T702912'
import tabZujianChild3 from './T702913'
export default {
  name: 'T70291',
  components: {
    child1: tabZujianChild1,
    child2: tabZujianChild2,
    child3: tabZujianChild3
  },
  props: {
    fromfather7029: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      ValueFromFather7029: [],
      tabPosition: 'top',
      activeName: 'One',
      isChildUpdate1: true,
      isChildUpdate2: false,
      isChildUpdate3: false,
      valueFromFather: [],
      recordDx: [],
      recordDuox: [],
      recordPanD: [],
      BUSITYPES: this.$combo.yeWuLeiXing
    }
  },
  computed: {
  },
  created() {
    this.ValueFromFather7029 = this.fromfather7029
  },
  mounted: function() {
    const ID = this.ValueFromFather7029.ID
    const map = { 'Cl': ID }
    const params = { 'ruleForm': JSON.stringify(map) }
    const url = this.$examSystemMngApi.getSelectManagerInfo
    this.$http(url, params).then( // 通讯后台修改数据库中信息
      res => {
        const _data = res.data
        if (_data.data.TrxCode === '000000') {
          const pageInfo = _data.data.PageInfo.list
          console.log('70291@@:' + JSON.stringify(pageInfo))
          for (let i = 0; i < pageInfo.length; i++) {
            const type = pageInfo[i].TYPE // 题目类型 01-单选 02-复选 03-判断 04-问答
            const busitype = pageInfo[i].BUSITYPE // 业务类型
            const basicnum = pageInfo[i].BASICNUM // 基础题数量
            const MODERATENUM = pageInfo[i].MODERATENUM // 适中题目数量
            const HARDNUM = pageInfo[i].HARDNUM // 困难题目数量
            const HARDESTNUM = pageInfo[i].HARDESTNUM // 极难题目数量
            const SCORE = pageInfo[i].SCORE // 题目分值
            const totalScore = pageInfo[i].TOTAL
            const totalQuestions = parseInt(basicnum) + parseInt(MODERATENUM) + parseInt(HARDNUM) + parseInt(HARDESTNUM)
            if (type === '01') { // 单选
              this.recordDx.push({
                BUSITYPE: this.selectLable(busitype, this.BUSITYPES),
                BASICNUM: basicnum,
                MODERATENUM: MODERATENUM,
                HARDNUM: HARDNUM,
                HARDESTNUM: HARDESTNUM,
                SCORE: SCORE,
                TOTAL: totalScore,
                TOTALQUESTIONS: totalQuestions
              })
            } else if (type === '02') { // 多选
              this.recordDuox.push({
                BUSITYPE: this.selectLable(busitype, this.BUSITYPES),
                BASICNUM: basicnum,
                MODERATENUM: MODERATENUM,
                HARDNUM: HARDNUM,
                HARDESTNUM: HARDESTNUM,
                SCORE: SCORE,
                TOTAL: totalScore,
                TOTALQUESTIONS: totalQuestions
              })
            } else if (type === '03') {
              this.recordPanD.push({
                BUSITYPE: this.selectLable(busitype, this.BUSITYPES),
                BASICNUM: basicnum,
                MODERATENUM: MODERATENUM,
                HARDNUM: HARDNUM,
                HARDESTNUM: HARDESTNUM,
                SCORE: SCORE,
                TOTAL: totalScore,
                TOTALQUESTIONS: totalQuestions
              })
            }
          }
        } else {
          this.messageError('错误信息11 ： ' + _data.data.TrxMessage)
          return
        }
      })
  },
  methods: {
    selectLable: function(key, list) {
      for (let i = 0; i < list.length; i++) {
        const value = list[i].value
        if (key === value) {
          return list[i].label
        }
      }
    },
    getMsgExit(data) {
      if (data === 'Exit70291') {
        this.$emit('sendmsgExit', 'Exit70291')
      }
    },
    handleClick(tab) {
      if (tab.name === 'One') {
        this.isChildUpdate1 = true
        this.isChildUpdate2 = false
        this.isChildUpdate3 = false
        this.valueFromFather = this.recordDx
      } else if (tab.name === 'Two') {
        this.isChildUpdate1 = false
        this.isChildUpdate2 = true
        this.isChildUpdate3 = false
        this.valueFromFather = this.recordDuox
      } else if (tab.name === 'Three') {
        this.isChildUpdate1 = false
        this.isChildUpdate2 = false
        this.isChildUpdate3 = true
        this.valueFromFather = this.recordPanD
      }
      console.log('70291handleClick:' + JSON.stringify(this.recordDx))
    }
  }
}
</script>

<style scoped>
  @import "../../../styles/public.css";
</style>
