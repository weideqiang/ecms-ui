<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils/index'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHandler)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHandler)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        title: {
          text: '全行交易量占比图'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['开卡', '取款', '存款', '手机银行签约', '行内转账', '开立定期存单', '挂失', '销户', '跨行汇款', '解挂', '网银签约', '其它']
        },
        calculable: true,
        series: [
          {
            name: '交易量占比',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '38%'],
            data: [
              { value: 14, name: '开卡' },
              { value: 12, name: '取款' },
              { value: 9, name: '存款' },
              { value: 12, name: '手机银行签约' },
              { value: 10, name: '行内转账' },
              { value: 8, name: '开立定期存单' },
              { value: 6, name: '挂失' },
              { value: 5, name: '销户' },
              { value: 4, name: '跨行汇款' },
              { value: 3, name: '解挂' },
              { value: 9, name: '网银签约' },
              { value: 8, name: '其它' }
            ],
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    }
  }
}
</script>
