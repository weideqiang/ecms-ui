<template>
  <el-main class="background">
    <el-row>
      <el-form
        :inline="true"
        :model="inputForm"
        ref="form"
        :rules="inputRules"
        class="ecms-trx-search"
        label-position="left">
        <el-form-item label="开始月份:" prop="beginDate">
          <el-date-picker
            id="accdate"
            v-model="inputForm.beginDate"
            editable
            format="yyyy 年 MM 月"
            align="right"
            type="month"
            placeholder="选择月份"
            value-format="yyyyMM"/>
        </el-form-item>
        <el-form-item label="结束月份:" prop="endDate">
          <el-date-picker
            id="accdate"
            v-model="inputForm.endDate"
            editable
            format="yyyy 年 MM 月"
            align="right"
            type="month"
            placeholder="选择月份"
            value-format="yyyyMM"/>
        </el-form-item>
        <el-form-item label="交易代码:">
          <el-input id="trxno" v-model="inputForm.trxno" placeholder="请输入交易代码" maxlength="8" @input.capture="changeCode"/>
        </el-form-item>
      </el-form>
    </el-row>

    <el-row>
      <div class="grid-content">
        <el-form :inline="true" class="ecms-trx-button">
          <el-form-item>
            <el-button type="primary" size="medium" @click="query">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-row>
    <!--为echarts准备一个具备大小的容器dom-->
    <div ref="myEchart" style="height: 500px;"/>
  </el-main>
</template>

<script>
export default {
  name: 'T0007',
  props: ['plan_table'],
  data() {
    return {
      chart: null,
      inputForm: {
        beginDate: '',
        endDate: '',
        trxno: ''
      },
      inputRules: {
        beginDate: [
          { required: true, message: '请选择开始月份', trigger: 'blur' }
        ],
        endDate: [
          { required: true, message: '请选择结束月份', trigger: 'blur' }
        ]
      },
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
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
          text: '全行交易平均时间(月度变化)'
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
          data: ['全行交易平均时间']
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
          name: '全行交易平均时间(月度变化)',
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
    changeCode() {
      this.$nextTick(() => {
        if (this.inputForm.trxno !== null && this.inputForm.trxno.match('[\u4e00-\u9fa5]')) {
          this.$message({
            showClose: true,
            message: '禁止输入中文',
            type: 'warning'
          })
          this.inputForm.trxno = ''
        }
      })
    },
    initChart() {
      console.log(this.option.xAxis.data.length)
      // this.$refs.form.validate(
      //   valid => {
      //     if (valid) {
      const params = { 'beginDate': this.inputForm.beginDate, 'endDate': this.inputForm.endDate, 'trxno': this.inputForm.trxno }
      this.$http(this.$reportMngApi.getAllBankTrxMonthAvgTimeTB, params).then(// 通讯后台查询数据库中用户信息
        res => {
          this.option.xAxis.data = []
          this.option.series[0].data = []
          console.log(res)
          const table = res.data.data.data.PageInfo.list
          console.log('table : ' + JSON.stringify(table))
          if (table.length < 1) {
            this.$message({
              showClose: true,
              message: '未查询到数据',
              type: 'warning'
            })
            return
          }
          const avgtimes = []
          for (var i = 0; i < table.length; i++) {
            this.option.xAxis.data.push(table[i].name)
            // 全行平均交易时间
            this.option.series[0].data.push(table[i].avgtime)
            avgtimes.push(table[i].avgtime)
          }
          console.log('this.option.xAxis.data => ' + this.option.xAxis.data)
          // Y轴最大值的设置：向上取整并家200
          const maxAvgtime = Math.max.apply(Math, avgtimes)
          console.log('maxAvgtime => ' + maxAvgtime)
          this.option.yAxis[0].max = Math.ceil(maxAvgtime) + 200
          this.chart = this.$echarts.init(this.$refs.myEchart)
          // 把配置和数据放这里
          window.addEventListener('resize', this.chart.resize)
          this.chart.setOption(this.option, true)
        }
      )
    },
    // 调用
    query() {
      this.$nextTick(function() {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.initChart()
          }
        })
      })
    }
  }
}
</script>

<style scoped>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

  .cell-edit-color {
    color: #2db7f5;
    font-weight: bold;
  }

  .cell-edit-input .el-input, .el-input__inner {
    width: 100px;
  }

  .cell-icon {
    cursor: pointer;
    color: #fff;
  }

  .input-class {
    width: 160px;
  }

  .el-row {
    margin-bottom: 20px;
  }

  .grid-content {
    min-height: 20px;
  }
</style>
<style>
  @import "../../../styles/public.css";
</style>
