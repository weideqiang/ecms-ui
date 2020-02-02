<template>
  <el-main>
    <el-row>
      <el-form
        :inline="true"
        ref="form"
        :model="inputForm"
        :rules="inputRules"
        class="ecms-trx-search"
        label-position="left">
        <el-form-item label="开始日期:" prop="beginDate">
          <el-date-picker
            id="beginDate"
            v-model="inputForm.beginDate"
            editable
            format="yyyy 年 MM 月 dd 日"
            align="right"
            type="date"
            placeholder="选择日期"
            value-format="yyyyMMdd"/>
        </el-form-item>
        <el-form-item label="结束日期:" prop="endDate">
          <el-date-picker
            id="endDate"
            v-model="inputForm.endDate"
            editable
            format="yyyy 年 MM 月 dd 日"
            align="right"
            type="date"
            placeholder="选择日期"
            value-format="yyyyMMdd"/>
        </el-form-item>
        <br>
        <el-form-item label="机构代码:" prop="brno">
          <el-input id="name" v-model="inputForm.brno" placeholder="请输入机构代码" maxlength="7" @input.capture="changeCode"/>
        </el-form-item>
        <el-form-item label="交易代码:" prop="trxno">
          <el-input id="trxno" v-model="inputForm.trxno" placeholder="请输入交易代码" maxlength="4" @input.capture="changeCode"/>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <div class="grid-content">
        <el-form :inline="true" class="ecms-trx-button">
          <el-form-item>
            <el-button type="primary" size="medium" @click="initChart">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-row>
    <el-row>
      <div ref="myEchart" style="min-height: 400px;"/>
    </el-row>
  </el-main>

</template>
<script>
export default {
  props: ['plan_table'],
  data() {
    return {
      inputForm: {
        beginDate: '',
        endDate: '',
        trxno: '',
        brno: ''
      },
      inputRules: {
        beginDate: [
          { required: true, message: '请选择开始日期', trigger: 'blur' }
        ],
        endDate: [
          { required: true, message: '请选择结束日期', trigger: 'blur' }
        ],
        brno: [
          { required: true, message: '请输入机构代码', trigger: 'blur' }
        ]
      },
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      chart: null,
      option: {
        title: {
          x: '150', // 水平安放位置，默认为左对齐，可选为：
          // 'center' ¦ 'left' ¦ 'right'
          // ¦ {number}（x坐标，单位px）
          y: 'top',
          // textAlign: null
          backgroundColor: 'rgba(0,0,0,0)',
          borderColor: '#ccc', // 标题边框颜色
          borderWidth: 0, // 标题边框线宽，单位px，默认为0（无边框）
          padding: 5, // 标题内边距，单位px，默认各方向内边距为5，
          itemGap: 10, // 主副标题纵向间隔，单位px，默认为10，
          textStyle: {
            fontSize: 18,
            fontWeight: 'bolder',
            color: '#ff6666' // 主标题文字颜色
          },
          text: '指定机构交易平均时间日变化（柜员级别）'
        },
        color: ['#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed',
          '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0'],
        tooltip: { trigger: 'axis' },
        // 图例--折线提示提示
        legend: {
          x: 'center',
          y: '30',
          borderColor: '#6699FF', // 边框颜色
          textStyle: {
            color: '#1e90ff' // 图例文字颜色
          },
          data: ['指定机构交易平均时间日变化（柜员级别）']
        },
        // 右上角的工具箱
        toolbox: {
          x: '80%',
          y: 'top',
          show: true,
          feature: {
            mark: { show: true },
            // 是否可以保存图片
            saveAsImage: { show: true },
            // dataView : '数据视图',
            dataView: { show: true }
          }
        },
        calculable: true,
        xAxis: {
          data: [],
          axisLabel: { // 坐标轴刻度标签的相关设置。
            interval: 0,
            rotate: '45'
          }
        },
        yAxis: [
          {
            type: 'value',
            name: '单位：（秒）',
            min: '0',
            max: '',
            splitNumber: 20
          }
        ],
        series: [{
          type: 'line',
          name: '全行交易平均时间',
          data: []
        }, {
          type: 'line',
          name: '指定机构平均时间',
          data: []
        }
        ]
      }
    }
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const params = { 'beginDate': this.inputForm.beginDate, 'endDate': this.inputForm.endDate, 'trxno': this.inputForm.trxno, 'brno': this.inputForm.brno }
          this.$http(this.$reportMngApi.queryBrnoTrxAvgTimeTlr, params).then(// 通讯后台查询数据库中用户信息
            res => {
              console.log(res)
              this.option.xAxis.data = []
              this.option.series[0].data = []
              this.option.series[1].data = []
              const table = res.data.data.data.PageInfo.list
              if (table.length < 1) {
                this.$message({
                  showClose: true,
                  message: '未查询到数据',
                  type: 'warning'
                })
                return
              }
              console.log('table : ' + JSON.stringify(table))
              const avgtimes = []
              const avgtimes1 = []
              for (var i = 0; i < table.length; i++) {
                this.option.xAxis.data.push(table[i].name)
                // 全行平均交易时间
                this.option.series[0].data.push(table[i].avgtime)
                avgtimes.push(table[i].avgtime)
                this.option.series[1].data.push(table[i].avgtime1)
                avgtimes1.push(table[i].avgtime1)
              }
              console.log('this.option.xAxis.data => ' + this.option.xAxis.data)
              // Y轴最大值的设置：向上取整并加200
              let maxAvgtime = Math.max.apply(Math, avgtimes)
              const maxAvgtime1 = Math.max.apply(Math, avgtimes1)
              if (maxAvgtime < maxAvgtime1) {
                maxAvgtime = maxAvgtime1
              }
              console.log('maxAvgtime => ' + maxAvgtime)
              this.option.yAxis[0].max = Math.ceil(maxAvgtime) + 200
              this.chart = this.$echarts.init(this.$refs.myEchart)
              window.addEventListener('resize', this.chart.resize)
              // 把配置和数据放这里
              this.chart.setOption(this.option)
            }
          )
        }
      })
    }
  }
}
</script>
<style>
  @import "../../../styles/public.css";
</style>
