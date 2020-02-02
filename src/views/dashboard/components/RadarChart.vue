<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils/index'

const animationDuration = 3000

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '340px'
    },
    height: {
      type: String,
      default: '340px'
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
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
    setOptions({ title, indicator, data01, data02 } = {}) {
      this.chart.setOption({
        title: {
          text: title.text,
          textStyle: {
            color: '#41464E'
          },
          subtext: title.subtext
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          left: 'right',
          top: '10',
          data: [data01.name, data02.name]
        },
        calculable: true,
        radar: [
          {
            radius: '66%',
            center: ['50%', '55%'],
            splitNumber: 8,
            splitArea: {
              areaStyle: {
                color: '#FFF',
                opacity: 1,
                shadowBlur: 45,
                shadowColor: 'rgba(0,0,0,.5)',
                shadowOffsetX: 0,
                shadowOffsetY: 15
              }
            },
            indicator: indicator,
            name: {
              textStyle: {
                color: '#7E7E7E'
              }
            }
          }
        ],
        series: [
          {
            type: 'radar',
            itemStyle: {
              normal: {
                areaStyle: {
                  type: 'default'
                }
              }
            },
            data: [
              {
                value: data01.value,
                name: data01.name,
                label: {
                  normal: {
                    show: true,
                    // formatter: function(params) {
                    //   return params.value
                    // },
                    color: '#2EC7C9'
                  }
                }
              },
              {
                value: data02.value,
                name: data02.name,
                label: {
                  normal: {
                    show: true,
                    color: '#B6A2DE'
                  }
                }
              }
            ],
            animationDuration: animationDuration
          }
        ]
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    }
  }
}
</script>
