<template>
  <el-main>
    <el-row :gutter="20">
      <el-form
        ref="inputForm"
        :inline="true"
        :model="inputForm"
        :rules="inputRules"
        class="ecms-trx-search"
        label-width="80px"
        label-position="left">
        <el-form-item label="柜员号:" prop="userno">
          <el-input v-model="inputForm.userno"/>
        </el-form-item>
        <el-form-item label="柜员名称:">
          <el-input v-model="inputForm.username"/>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-form :inline="true" class="ecms-trx-button">
        <el-form-item>
          <el-button type="primary" size="medium" @click="queryData">查询</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row :gutter="20">
      <div>
        <full-calendar
          :events="monthData"
          class="test-fc"
          first-day="1"
          lang="zh"
          @changeMonth="changeMonth"
          @eventClick="eventClick"
          @dayClick="dayClick"
          @moreClick="moreClick"/>
      </div>
    </el-row>
  </el-main>
</template>

<script>
// import {FullCalendar} from 'vue-fullcalendar'
export default {
  name: 'T2005',
  components: {
    'full-calendar': require('vue-fullcalendar')
  },
  data() {
    return {
      month: '',
      monthData: [],
      inputForm: {
        username: '',
        userno: ''
      },
      inputRules: {
        userno: [
          { required: true, message: '请输入柜员号', trigger: 'blur' },
          { min: 0, max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    changeMonth(start, end, current) {
      this.month = current
    },
    eventClick(event, jsEvent, pos) {
      console.log('eventClick', event, jsEvent, pos)
    },
    dayClick(day, jsEvent) {
      console.log('dayClick', day, jsEvent)
    },
    moreClick(day, events, jsEvent) {
      console.log('moreCLick', day, events, jsEvent)
    },
    queryData() {
      this.$refs.inputForm.validate(valid => {
        if (valid) {
          console.log(this.month)
          const params = {
            'inputForm': JSON.stringify(this.inputForm),
            'month': this.month.replace('-', '').substring(0, 6)
          }
          this.$http(this.$workForceMngApi.queryStatisticsForFullCalendar, params).then(// 通讯后台查询数据库中用户信息
            res => {
              const resdata = res.data.data
              console.log(resdata)
              if (resdata.code === 'SUCCESS') {
                if (resdata.data.TrxCode === '000000') {
                  // 赋值
                  const ydate = resdata.data.list[0].tradedate
                  const arr = []
                  const month = ydate.substring(4, 6)
                  const year = ydate.substring(0, 4)
                  parseInt(year)
                  const isRN = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
                  console.log('isRN=' + isRN)
                  let date = year + '-' + month + '-' + 1
                  arr.push({ title: resdata.data.list[0].day1, start: date })
                  date = year + '-' + month + '-' + 2
                  arr.push({ title: resdata.data.list[0].day2, start: date })
                  date = year + '-' + month + '-' + 3
                  arr.push({ title: resdata.data.list[0].day3, start: date })
                  date = year + '-' + month + '-' + 4
                  arr.push({ title: resdata.data.list[0].day4, start: date })
                  date = year + '-' + month + '-' + 5
                  arr.push({ title: resdata.data.list[0].day5, start: date })
                  date = year + '-' + month + '-' + 6
                  arr.push({ title: resdata.data.list[0].day6, start: date })
                  date = year + '-' + month + '-' + 7
                  arr.push({ title: resdata.data.list[0].day7, start: date })
                  date = year + '-' + month + '-' + 8
                  arr.push({ title: resdata.data.list[0].day8, start: date })
                  date = year + '-' + month + '-' + 9
                  arr.push({ title: resdata.data.list[0].day9, start: date })
                  date = year + '-' + month + '-' + 10
                  arr.push({ title: resdata.data.list[0].day10, start: date })
                  date = year + '-' + month + '-' + 11
                  arr.push({ title: resdata.data.list[0].day11, start: date })
                  date = year + '-' + month + '-' + 12
                  arr.push({ title: resdata.data.list[0].day12, start: date })
                  date = year + '-' + month + '-' + 13
                  arr.push({ title: resdata.data.list[0].day13, start: date })
                  date = year + '-' + month + '-' + 14
                  arr.push({ title: resdata.data.list[0].day14, start: date })
                  date = year + '-' + month + '-' + 15
                  arr.push({ title: resdata.data.list[0].day15, start: date })
                  date = year + '-' + month + '-' + 16
                  arr.push({ title: resdata.data.list[0].day16, start: date })
                  date = year + '-' + month + '-' + 17
                  arr.push({ title: resdata.data.list[0].day17, start: date })
                  date = year + '-' + month + '-' + 18
                  arr.push({ title: resdata.data.list[0].day18, start: date })
                  date = year + '-' + month + '-' + 19
                  arr.push({ title: resdata.data.list[0].day19, start: date })
                  date = year + '-' + month + '-' + 20
                  arr.push({ title: resdata.data.list[0].day20, start: date })
                  date = year + '-' + month + '-' + 21
                  arr.push({ title: resdata.data.list[0].day21, start: date })
                  date = year + '-' + month + '-' + 22
                  arr.push({ title: resdata.data.list[0].day22, start: date })
                  date = year + '-' + month + '-' + 23
                  arr.push({ title: resdata.data.list[0].day23, start: date })
                  date = year + '-' + month + '-' + 24
                  arr.push({ title: resdata.data.list[0].day24, start: date })
                  date = year + '-' + month + '-' + 25
                  arr.push({ title: resdata.data.list[0].day25, start: date })
                  date = year + '-' + month + '-' + 26
                  arr.push({ title: resdata.data.list[0].day26, start: date })
                  date = year + '-' + month + '-' + 27
                  arr.push({ title: resdata.data.list[0].day27, start: date })
                  date = year + '-' + month + '-' + 28
                  arr.push({ title: resdata.data.list[0].day28, start: date })
                  if (month === '02' && isRN) {
                    date = year + '-' + month + '-' + 29
                    arr.push({ title: resdata.data.list[0].day29, start: date })
                  } else {
                    if (month !== '02') {
                      date = year + '-' + month + '-' + 29
                      arr.push({ title: resdata.data.list[0].day29, start: date })
                      date = year + '-' + month + '-' + 30
                      arr.push({ title: resdata.data.list[0].day30, start: date })
                      if (month === '01' || month === '03' || month === '05' || month === '07' || month === '08' || month === '10' || month === '12') {
                        date = year + '-' + month + '-' + 31
                        arr.push({ title: resdata.data.list[0].day31, start: date })
                      }
                    }
                  }
                  this.monthData = arr
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
            }
          )
        }
      })
    }
  }
}

</script>

<style scoped>
  @import "../../../styles/public.css";
  .comp-full-calendar{
    background: aliceblue;
  }
</style>
<style>
  .full-calendar-body .dates .dates-events .events-week .events-day .event-box .event-item{
    font-size: 18px;
    height: auto;
    line-height: 22px;
    /*//white-space: pre-wrap;*/
  }
</style>
