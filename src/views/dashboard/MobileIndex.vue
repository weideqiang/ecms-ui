<template>
  <div class="dashboard-editor-container">
    <el-row class="dashbord-header">
      <el-row>
        <el-col :xs="8" :sm="8" :lg="8">
          <img v-if="userGender === '1'" src="@/assets/nvtouxiang48.png" style="width: 80px; height: 80px; margin: 40px 20px;border-radius: 50%;">
          <img v-else src="@/assets/nantouxiang48.png" style="width: 80px; height: 80px; margin: 40px 20px;border-radius: 50%;">
        </el-col>
        <el-col :xs="16" :sm="16" :lg="16">
          <p style="color: white;margin-top: 60px; font-size: 18px">{{ userName }}</p>
          <p style="color: #B0C8EE;margin-top: -5px">{{ userNo }}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="12" :sm="12" :lg="12">
          <p style="text-align:left; color: white; padding-left:30px;margin-top: -30px">我的工作视图</p>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="12">
          <p style="text-align:right; color: #B6C1EF; padding-right: 30px; margin-top: -30px">{{ curDate }}</p>
        </el-col>
      </el-row>
    </el-row>
    <el-carousel :interval="0" height="220px" indicator-position="none" style="margin: -24px 16px 16px 16px" class="chart-wrapper">
      <el-carousel-item >
        <div>
          <ul class="chart-ul">
            <li class="chart-ul-li"><p><span class="chart-lilf">交易总笔数</span><span class="chart-lirg"> {{ trxNums }} </span></p></li>
            <li class="chart-ul-li"><p><span class="chart-lilf">网点排名</span><span class="chart-lirg"> {{ orderInWd }} </span></p></li>
            <li class="chart-ul-li"><p><span class="chart-lilf">分行排名</span><span class="chart-lirg"> {{ orderInFh }} </span></p></li>
            <li class="chart-ul-li" style="border-bottom: none"><p><span class="chart-lilf">全行排名</span><span class="chart-lirg"> {{ orderInQh }} </span></p></li>
          </ul>
        </div>
      </el-carousel-item>
      <el-carousel-item>
        <div>
          <time-line-chart :chart-data="hisTrxData"/>
        </div>
      </el-carousel-item>
    </el-carousel>
    <el-carousel :interval="0" height="220px" indicator-position="none" class="chart-wrapper">
      <el-carousel-item>
        <div>
          <ul class="chart-ul">
            <li class="chart-ul-li"><p><span class="chart-lilf">服务总人数</span><span class="chart-lirg2"> {{ serviceNums }} </span></p></li>
            <li class="chart-ul-li"><p><span class="chart-lilf">服务总时长</span><span class="chart-lirg2"> {{ serviceTimes }} </span></p></li>
            <li class="chart-ul-li"><p><span class="chart-lilf">平均服务时长</span><span class="chart-lirg2"> {{ avgServiceTimes }} </span></p></li>
            <li class="chart-ul-li" style="border-bottom: none"><p><span class="chart-lilf">评价信息</span><span class="chart-lirg2"> 10 </span></p></li>
          </ul>
        </div>
      </el-carousel-item>
      <el-carousel-item>
        <div>
          <time-line-chart :chart-data="hisServiceNums"/>
        </div>
      </el-carousel-item>
      <el-carousel-item>
        <div>
          <time-line-chart :chart-data="hisServiceTimes"/>
        </div>
      </el-carousel-item>
    </el-carousel>
    <el-row>
      <div class="chart-wrapper">
        <div style="overflow: hidden;text-align:right; padding: 10px 20px;" @click="zhuanhuan()" >
          <img src="@/assets/zhuanhuan.png">
          <span style="color: #8ADCDE">{{ chartName }}</span>
        </div>
        <div>
          <sta-line-chart v-if="isLine" :chart-data="lineChartData"/>
          <sta-pie-chart v-else :chart-data="pieChartData"/>
        </div>
      </div>
    </el-row>
    <el-row >
      <el-carousel :interval="0" height="360px" indicator-position="none" class="chart-wrapper">
        <el-carousel-item>
          <div>
            <radar-chart :chart-data="gyVsWd"/>
          </div>
        </el-carousel-item>
        <el-carousel-item>
          <div>
            <radar-chart :chart-data="gyVsFh"/>
          </div>
        </el-carousel-item>
        <el-carousel-item>
          <div>
            <radar-chart :chart-data="gyVsQh"/>
          </div>
        </el-carousel-item>
      </el-carousel>
    </el-row>
  </div>
</template>

<script>
import StaLineChart from './components/StaLineChart'
import RadarChart from './components/RadarChart'
import { mapGetters } from 'vuex'
import LineChart from './components/LineChart'
import CompareLineChart from './components/CompareLineChart'
import StaPieChart from './components/StaPieChart'
import TimeLineChart from './components/TimeLineChart'

const lineChartData = {
  title: 'Top10交易',
  yData: [],
  xData: []
}

const pieChartData = {
  title: 'Top10交易',
  yData: [],
  pieData: []
}

const hisTrxData = {
  title: '历史交易量曲线图',
  yData: [],
  xData: [],
  lineColor: '#4F8DFF'
}

const hisServiceNums = {
  title: '历史服务人次曲线图',
  yData: [],
  xData: [],
  lineColor: '#4BE691'
}

const hisServiceTimes = {
  title: '历史服务时长曲线图(min)',
  yData: [],
  xData: [],
  lineColor: '#4BE691'
}

const gyVsWd = {
  title: {
    text: '柜员 VS 网点',
    subtext: 'TOP10交易操作时长'
  },
  indicator: [],
  data01: {
    name: '柜员',
    value: []
  },
  data02: {
    name: '网点',
    value: []
  }
}

const gyVsFh = {
  title: {
    text: '柜员 VS 分行',
    subtext: 'TOP10交易操作时长'
  },
  indicator: [],
  data01: {
    name: '柜员',
    value: []
  },
  data02: {
    name: '分行',
    value: []
  }
}

const gyVsQh = {
  title: {
    text: '柜员 VS 全行',
    subtext: 'TOP10交易操作时长'
  },
  indicator: [],
  data01: {
    name: '柜员',
    value: []
  },
  data02: {
    name: '全行',
    value: []
  }
}

export default {
  name: 'Dashboard',
  components: {
    TimeLineChart,
    StaPieChart,
    CompareLineChart,
    LineChart,
    StaLineChart,
    RadarChart
  },
  data() {
    return {
      userNo: this.$store.getters.userInfo.userNo,
      userName: this.$store.getters.userInfo.userName,
      userGender: this.$store.getters.userInfo.gender,
      curDate: new Date().toLocaleDateString(),
      trxNums: 109,
      orderInWd: 3,
      orderInFh: 20,
      orderInQh: 50,
      serviceNums: 30,
      serviceTimes: '7小时36分0秒',
      avgServiceTimes: '15分2秒',
      jungeInfo: '',
      lineChartData: lineChartData,
      pieChartData: pieChartData,
      hisTrxData: hisTrxData,
      hisServiceNums: hisServiceNums,
      hisServiceTimes: hisServiceTimes,
      isLine: true,
      chartName: '饼状图',
      gyVsWd: gyVsWd,
      gyVsFh: gyVsFh,
      gyVsQh: gyVsQh
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    device() {
      return this.$store.state.app.device
    }
  },
  created: function() {
    this.getTrxNumsOrderInfo()
    this.getServiceInfo()
    this.getTop10Trx()
    this.getPeriodTrxNums()
    this.getPeriodServiceNum()
    this.getPeriodServiceTimes()
    this.getTop10TrxDuration()
  },
  methods: {
    /**
     * 获取交易量及排行
     */
    getTrxNumsOrderInfo: function() {
      const params = { 'userNo': this.userNo, 'date': '20190426' } // new Date().getDate()
      this.$http(this.$userStatisticsApi.getTrxNumsOrderInfo, params).then(
        res => {
          console.log(res.data)
          this.trxNums = res.data.trxNums
          this.orderInWd = res.data.orderInWd
          this.orderInFh = res.data.orderInFh
          this.orderInQh = res.data.orderInQh
        }
      )
    },
    /**
     * 获取历史交易量
     */
    getPeriodTrxNums: function() {
      const params = { 'userNo': this.userNo, 'days': '30' } // new Date().getDate()
      this.$http(this.$userStatisticsApi.getPeriodTrxNums, params).then(
        res => {
          console.log('历史交易量')
          console.log(res.data)
          for (var i = 0; i < res.data.length; i++) {
            this.hisTrxData.yData.push({ value: res.data[i].countvalue })
            this.hisTrxData.xData.push({ value: res.data[i].starttime })
          }
          console.log(this.hisTrxData)
        }
      )
    },
    /**
     * 获取服务人次及服务时长
     */
    getServiceInfo: function() {
      const params = { 'userNo': this.userNo, 'date': '20190426' }
      this.$http(this.$userStatisticsApi.getServiceInfo, params).then(
        res => {
          console.log(res.data)
          this.serviceNums = res.data.serviceNums
          this.serviceTimes = res.data.serviceTimes
          this.avgServiceTimes = res.data.avgServiceTimes
          this.jungeInfo = res.data.jungeInfo
        }
      )
    },
    /**
     * 获取历史服务人次
     */
    getPeriodServiceNum: function() {
      const params = { 'userNo': '100523', 'days': '30' }
      this.$http(this.$userStatisticsApi.getPeriodServiceNum, params).then(
        res => {
          console.log('历史服务人次')
          console.log(res.data)
          for (var i = 0; i < res.data.length; i++) {
            this.hisServiceNums.yData.push({ value: res.data[i].countvalue })
            this.hisServiceNums.xData.push({ value: res.data[i].starttime })
          }
        }
      )
    },
    /**
     * 获取历史服务时长
     */
    getPeriodServiceTimes: function() {
      const params = { 'userNo': '100523', 'days': '30' }
      this.$http(this.$userStatisticsApi.getPeriodServiceTimes, params).then(
        res => {
          console.log('历史服务时长')
          console.log(res.data)
          for (var i = 0; i < res.data.length; i++) {
            this.hisServiceTimes.yData.push({ value: res.data[i].totalservicetimes })
            this.hisServiceTimes.xData.push({ value: res.data[i].starttime })
          }
        }
      )
    },
    /**
     * 获取交易量前10交易
     */
    getTop10Trx: function() {
      const params = { 'userNo': '003306', 'date': '20190426' }
      this.$http(this.$userStatisticsApi.getTop10Trx, params).then(
        res => {
          console.log(res.data)
          this.lineChartData.yData = res.data.top10TrxName
          this.lineChartData.xData = res.data.top10TrxNums
          this.pieChartData.yData = res.data.top10TrxName
          for (var i = 0; i < res.data.top10TrxName.length; i++) {
            this.pieChartData.pieData.push({ value: res.data.top10TrxNums[i], name: res.data.top10TrxName[i] })
          }
        }
      )
    },
    /**
     * 获取交易量前10交易操作时长  柜员VS网点
     */
    getTop10TrxDuration: function() {
      const params = { 'userNo': '002269', 'date': '20190125' }
      this.$http(this.$userStatisticsApi.getTop10TrxDuration, params).then(
        res => {
          console.log('操作时长对比')
          console.log(res.data)
          var DuraData = res.data
          for (var i = 0; i < DuraData.top10TrxName.length; i++) {
            this.gyVsWd.indicator.push({
              text: DuraData.top10TrxName[i],
              max: DuraData.top10userDuration[i] * 1 > DuraData.top10BrDuration[i] * 1 ? (DuraData.top10userDuration[i] * 1.2) : (DuraData.top10BrDuration[i] * 1.2)
            })
            this.gyVsFh.indicator.push({
              text: DuraData.top10TrxName[i],
              max: DuraData.top10userDuration[i] * 1 > DuraData.top10FhDuration[i] * 1 ? DuraData.top10userDuration[i] * 1.2 : DuraData.top10FhDuration[i] * 1.2
            })
            this.gyVsQh.indicator.push({
              text: DuraData.top10TrxName[i],
              max: DuraData.top10userDuration[i] * 1 > DuraData.top10QhDuration[i] * 1 ? DuraData.top10userDuration[i] * 1.2 : DuraData.top10QhDuration[i] * 1.2
            })
          }
          this.gyVsWd.data01.value = DuraData.top10userDuration
          this.gyVsWd.data02.value = DuraData.top10BrDuration

          this.gyVsFh.data01.value = DuraData.top10userDuration
          this.gyVsFh.data02.value = DuraData.top10FhDuration

          this.gyVsQh.data01.value = DuraData.top10userDuration
          this.gyVsQh.data02.value = DuraData.top10QhDuration
        }
      )
    },
    zhuanhuan: function() {
      this.isLine = !this.isLine
      if (this.isLine) {
        this.chartName = '饼状图'
      } else {
        this.chartName = '柱状图'
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard-editor-container {
    /*padding: 0 16px 0 16px;*/
    background-color: #F2F2F2;
    position: relative;
    .dashbord-header{
      height:200px;
      background-color:#4990DB;
      border-top-left-radius:20px;
      border-top-right-radius:20px;
    }
    .order{
      padding: 10px 0 10px 0;
      background-color: #EDF8FE;
      font-size: 12px;
      text-align: center;
    }
    .chart-wrapper {
      width: 340px;
      margin: 0px 16px 16px 16px;
      border: solid 1px white;
      border-radius: 8px;
      background: #fff;
      box-shadow:0px 5px 2px #DCDFE7;
      .chart-ul{
        list-style:none;
        padding-left: 0px;
        .chart-ul-li{
          overflow:hidden;
          border-bottom: solid 1px #E1E1E1;
          padding-left: 20px;
          padding-right: 20px;
          .chart-lilf{
            float: left;
          }
          .chart-lirg{
            float: right;
            color: #609DF8;
            font-size: 24px;
          }
          .chart-lirg2{
            float: right;
            color: #67DCBE;
            font-size: 24px;
          }
        }
      }
    }
  }
</style>

