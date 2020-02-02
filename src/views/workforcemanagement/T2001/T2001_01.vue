<template>
  <el-main>
    <el-row>
      <div>
        <full-calendar
          :events="monthData"
          first-day="1"
          lang="zh"
          style="width: 100%"
          @changeMonth="changeMonth"
          @eventClick="eventClick"
          @dayClick="dayClick"
          @moreClick="moreClick"/>
      </div>
    </el-row>
    <el-table
      ref="multipleTable"
      :data="tableData"
      :cell-style="tableRowStyle"
      border
      tooltip-effect="dark"
      height="300"
      @selection-change="handleSelectionChange" >
      <!--<el-table-column type="selection" width="55">-->
      <!--</el-table-column>-->
      <el-table-column fixed prop="username" label="姓名" >
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="one" label="排班" >
        <template slot-scope="scope">
          <template v-if="myDate == 1">
            <span>{{ scope.row.username }}</span>
          </template>
          <template v-if="myDate == 2">
            <span>{{ scope.row.username }}</span>
          </template>
          <template v-if="myDate == 3">
            <span>{{ scope.row.username }}</span>
          </template>
          <template v-if="myDate == 4">
            <span>{{ scope.row.username }}</span>
          </template>
          <template v-if="myDate == 5">
            <span>{{ scope.row.username }}</span>
          </template>
          <template v-if="myDate == 6">
            <span>{{ scope.row.username }}</span>
          </template>
          <template v-if="myDate == 7">
            <span>{{ scope.row.username }}</span>
          </template>
          <template v-if="myDate == 8">
            <span>{{ scope.row.username }}</span>
          </template>
          <template v-if="myDate == 9">
            <span>{{ scope.row.username }}</span>
          </template>
          <template v-if="myDate == 10">
            <span>{{ scope.row.username }}</span>
          </template>
          <template v-if="myDate == 11">
            <span>{{ scope.row.username }}</span>
          </template>
          <template v-if="myDate == 12">
            <span>{{ scope.row.username }}</span>
          </template>
          <template v-if="myDate == 13">
            <span>{{ scope.row.username }}</span>
          </template>
          <template v-if="myDate == 14">
            <span>{{ scope.row.username }}</span>
          </template>
          <template v-if="myDate == 15">
            <span>{{ scope.row.username }}</span>
          </template>
          <template v-if="myDate == 16">
            <span>{{ scope.row.username }}</span>
          </template>
          <template v-if="myDate == 17">
            <span>{{ scope.row.username }}</span>
          </template>
          <template v-if="myDate == 18">
            <span>{{ scope.row.username }}</span>
          </template>
          <template v-if="myDate == 19">
            <span>{{ scope.row.username }}</span>
          </template>
          <template v-if="myDate == 20">
            <span>{{ scope.row.username }}</span>
          </template>
          <template v-if="myDate == 21">
            <span>{{ scope.row.username }}</span>
          </template>
          <template v-if="myDate == 22">
            <span>{{ scope.row.username }}</span>
          </template>
          <template v-if="myDate == 23">
            <span>{{ scope.row.username }}</span>
          </template>
          <template v-if="myDate == 24">
            <span>{{ scope.row.username }}</span>
          </template>
          <template v-if="myDate == 25">
            <span>{{ scope.row.username }}</span>
          </template>
          <template v-if="myDate == 26">
            <span>{{ scope.row.username }}</span>
          </template>
          <template v-if="myDate == 27">
            <span>{{ scope.row.username }}</span>
          </template>
          <template v-if="myDate == 28">
            <span>{{ scope.row.username }}</span>
          </template>
          <template v-if="myDate == 29">
            <span>{{ scope.row.username }}</span>
          </template>
          <template v-if="myDate == 30">
            <span>{{ scope.row.username }}</span>
          </template>
          <template v-if="myDate == 31">
            <span>{{ scope.row.username }}</span>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="pageNum"
      :page-size="pageSize"
      :page-sizes="[5, 10, 20, 40]"
      :total="totals"
      layout="total, sizes, prev, pager, next, jumper"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"/>
  </el-main>
</template>

<script>
export default {
  name: 'T2001001',
  components: {
    'full-calendar': require('vue-fullcalendar')
  },
  data() {
    return {
      option: [
        { value: '01月', label: '01' },
        { value: '02月', label: '02' },
        { value: '03月', label: '03' },
        { value: '04月', label: '04' },
        { value: '05月', label: '05' },
        { value: '06月', label: '06' },
        { value: '07月', label: '07' },
        { value: '08月', label: '08' },
        { value: '09月', label: '09' },
        { value: '10月', label: '10' },
        { value: '11月', label: '11' },
        { value: '12月', label: '12' }
      ],
      option1: [
        { value: 'G-对私', label: '01' },
        { value: 'C-对公', label: '02' }
      ],
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() < Date.now()
        }
      },
      model1: '',
      monthData: [],
      styleG_DUTY_0: '', // 休息字体颜色
      styleG_DUTY_1: '', // 白班1字体颜色
      styleG_DUTY_2: '', // 白班2字体颜色
      styleG_DUTY_3: '', // 白班3字体颜色
      styleG_DUTY_4: '', // 白班3_夜班1字体颜色
      styleC_DUTY_0: '', // 白班字体颜色
      styleC_DUTY_1: '', // 夜班字体颜色
      strM: '', // 月的数字形式
      strYM: '', // 年月的数字形式
      tableData: [], // 用户信息
      totals: 0,
      pageNum: 1, // 初始页
      pageSize: 10, //    每页的数据
      result: 0,
      tableName: '',
      GCType: '',
      myMonth: '',
      myDate: ''
      // userTypes: [],
    }
  },
  computed: {
    userTypes() { // 初始化下拉框动态数据
      const obj = []
      this.roleSlt(obj) // 查询用户类别下拉框数据
      return obj
    }
  },
  methods: {
    tableRowStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        if (this.myDate - 1 === 0) {
          if (this.tableData[rowIndex].day1 === '休息') {
            return this.styleG_DUTY_0
          } else if (this.tableData[rowIndex].day1 === '早班') {
            return this.styleG_DUTY_1
          } else if (this.tableData[rowIndex].day1 === '中班') {
            return this.styleG_DUTY_2
          } else if (this.tableData[rowIndex].day1 === '晚班') {
            return this.styleG_DUTY_3
          } else if (this.tableData[rowIndex].day1 === '晚班至扎账') {
            return this.styleG_DUTY_4
          } else if (this.tableData[rowIndex].day1 === '白班') {
            return this.styleC_DUTY_0
          } else if (this.tableData[rowIndex].day1 === '白班至扎账') {
            return this.styleC_DUTY_1
          }
        } else if (this.myDate - 1 === 1) {
          if (this.tableData[rowIndex].day2 === '休息') {
            return this.styleG_DUTY_0
          } else if (this.tableData[rowIndex].day2 === '早班') {
            return this.styleG_DUTY_1
          } else if (this.tableData[rowIndex].day2 === '中班') {
            return this.styleG_DUTY_2
          } else if (this.tableData[rowIndex].day2 === '晚班') {
            return this.styleG_DUTY_3
          } else if (this.tableData[rowIndex].day2 === '晚班至扎账') {
            return this.styleG_DUTY_4
          } else if (this.tableData[rowIndex].day2 === '白班') {
            return this.styleC_DUTY_0
          } else if (this.tableData[rowIndex].day2 === '白班至扎账') {
            return this.styleC_DUTY_1
          }
        } else if (this.myDate - 1 === 2) {
          if (this.tableData[rowIndex].day3 === '休息') {
            return this.styleG_DUTY_0
          } else if (this.tableData[rowIndex].day3 === '早班') {
            return this.styleG_DUTY_1
          } else if (this.tableData[rowIndex].day3 === '中班') {
            return this.styleG_DUTY_2
          } else if (this.tableData[rowIndex].day3 === '晚班') {
            return this.styleG_DUTY_3
          } else if (this.tableData[rowIndex].day3 === '晚班至扎账') {
            return this.styleG_DUTY_4
          } else if (this.tableData[rowIndex].day3 === '白班') {
            return this.styleC_DUTY_0
          } else if (this.tableData[rowIndex].day3 === '白班至扎账') {
            return this.styleC_DUTY_1
          }
        } else if (this.myDate - 1 === 3) {
          if (this.tableData[rowIndex].day4 === '休息') {
            return this.styleG_DUTY_0
          } else if (this.tableData[rowIndex].day4 === '早班') {
            return this.styleG_DUTY_1
          } else if (this.tableData[rowIndex].day4 === '中班') {
            return this.styleG_DUTY_2
          } else if (this.tableData[rowIndex].day4 === '晚班') {
            return this.styleG_DUTY_3
          } else if (this.tableData[rowIndex].day4 === '晚班至扎账') {
            return this.styleG_DUTY_4
          } else if (this.tableData[rowIndex].day4 === '白班') {
            return this.styleC_DUTY_0
          } else if (this.tableData[rowIndex].day4 === '白班至扎账') {
            return this.styleC_DUTY_1
          }
        } else if (this.myDate - 1 === 4) {
          if (this.tableData[rowIndex].day5 === '休息') {
            return this.styleG_DUTY_0
          } else if (this.tableData[rowIndex].day5 === '早班') {
            return this.styleG_DUTY_1
          } else if (this.tableData[rowIndex].day5 === '中班') {
            return this.styleG_DUTY_2
          } else if (this.tableData[rowIndex].day5 === '晚班') {
            return this.styleG_DUTY_3
          } else if (this.tableData[rowIndex].day5 === '晚班至扎账') {
            return this.styleG_DUTY_4
          } else if (this.tableData[rowIndex].day5 === '白班') {
            return this.styleC_DUTY_0
          } else if (this.tableData[rowIndex].day5 === '白班至扎账') {
            return this.styleC_DUTY_1
          }
        } else if (this.myDate - 1 === 5) {
          if (this.tableData[rowIndex].day6 === '休息') {
            return this.styleG_DUTY_0
          } else if (this.tableData[rowIndex].day6 === '早班') {
            return this.styleG_DUTY_1
          } else if (this.tableData[rowIndex].day6 === '中班') {
            return this.styleG_DUTY_2
          } else if (this.tableData[rowIndex].day6 === '晚班') {
            return this.styleG_DUTY_3
          } else if (this.tableData[rowIndex].day6 === '晚班至扎账') {
            return this.styleG_DUTY_4
          } else if (this.tableData[rowIndex].day6 === '白班') {
            return this.styleC_DUTY_0
          } else if (this.tableData[rowIndex].day6 === '白班至扎账') {
            return this.styleC_DUTY_1
          }
        } else if (this.myDate - 1 === 6) {
          if (this.tableData[rowIndex].day7 === '休息') {
            return this.styleG_DUTY_0
          } else if (this.tableData[rowIndex].day7 === '早班') {
            return this.styleG_DUTY_1
          } else if (this.tableData[rowIndex].day7 === '中班') {
            return this.styleG_DUTY_2
          } else if (this.tableData[rowIndex].day7 === '晚班') {
            return this.styleG_DUTY_3
          } else if (this.tableData[rowIndex].day7 === '晚班至扎账') {
            return this.styleG_DUTY_4
          } else if (this.tableData[rowIndex].day7 === '白班') {
            return this.styleC_DUTY_0
          } else if (this.tableData[rowIndex].day7 === '白班至扎账') {
            return this.styleC_DUTY_1
          }
        } else if (this.myDate - 1 === 7) {
          if (this.tableData[rowIndex].day8 === '休息') {
            return this.styleG_DUTY_0
          } else if (this.tableData[rowIndex].day8 === '早班') {
            return this.styleG_DUTY_1
          } else if (this.tableData[rowIndex].day8 === '中班') {
            return this.styleG_DUTY_2
          } else if (this.tableData[rowIndex].day8 === '晚班') {
            return this.styleG_DUTY_3
          } else if (this.tableData[rowIndex].day8 === '晚班至扎账') {
            return this.styleG_DUTY_4
          } else if (this.tableData[rowIndex].day8 === '白班') {
            return this.styleC_DUTY_0
          } else if (this.tableData[rowIndex].day8 === '白班至扎账') {
            return this.styleC_DUTY_1
          }
        } else if (this.myDate - 1 === 8) {
          if (this.tableData[rowIndex].day9 === '休息') {
            return this.styleG_DUTY_0
          } else if (this.tableData[rowIndex].day9 === '早班') {
            return this.styleG_DUTY_1
          } else if (this.tableData[rowIndex].day9 === '中班') {
            return this.styleG_DUTY_2
          } else if (this.tableData[rowIndex].day9 === '晚班') {
            return this.styleG_DUTY_3
          } else if (this.tableData[rowIndex].day9 === '晚班至扎账') {
            return this.styleG_DUTY_4
          } else if (this.tableData[rowIndex].day9 === '白班') {
            return this.styleC_DUTY_0
          } else if (this.tableData[rowIndex].day9 === '白班至扎账') {
            return this.styleC_DUTY_1
          }
        } else if (this.myDate - 1 === 9) {
          if (this.tableData[rowIndex].day10 === '休息') {
            return this.styleG_DUTY_0
          } else if (this.tableData[rowIndex].day10 === '早班') {
            return this.styleG_DUTY_1
          } else if (this.tableData[rowIndex].day10 === '中班') {
            return this.styleG_DUTY_2
          } else if (this.tableData[rowIndex].day10 === '晚班') {
            return this.styleG_DUTY_3
          } else if (this.tableData[rowIndex].day10 === '晚班至扎账') {
            return this.styleG_DUTY_4
          } else if (this.tableData[rowIndex].day10 === '白班') {
            return this.styleC_DUTY_0
          } else if (this.tableData[rowIndex].day10 === '白班至扎账') {
            return this.styleC_DUTY_1
          }
        } else if (this.myDate - 1 === 10) {
          if (this.tableData[rowIndex].day11 === '休息') {
            return this.styleG_DUTY_0
          } else if (this.tableData[rowIndex].day11 === '早班') {
            return this.styleG_DUTY_1
          } else if (this.tableData[rowIndex].day11 === '中班') {
            return this.styleG_DUTY_2
          } else if (this.tableData[rowIndex].day11 === '晚班') {
            return this.styleG_DUTY_3
          } else if (this.tableData[rowIndex].day11 === '晚班至扎账') {
            return this.styleG_DUTY_4
          } else if (this.tableData[rowIndex].day11 === '白班') {
            return this.styleC_DUTY_0
          } else if (this.tableData[rowIndex].day11 === '白班至扎账') {
            return this.styleC_DUTY_1
          }
        } else if (this.myDate - 1 === 11) {
          if (this.tableData[rowIndex].day12 === '休息') {
            return this.styleG_DUTY_0
          } else if (this.tableData[rowIndex].day12 === '早班') {
            return this.styleG_DUTY_1
          } else if (this.tableData[rowIndex].day12 === '中班') {
            return this.styleG_DUTY_2
          } else if (this.tableData[rowIndex].day12 === '晚班') {
            return this.styleG_DUTY_3
          } else if (this.tableData[rowIndex].day12 === '晚班至扎账') {
            return this.styleG_DUTY_4
          } else if (this.tableData[rowIndex].day12 === '白班') {
            return this.styleC_DUTY_0
          } else if (this.tableData[rowIndex].day12 === '白班至扎账') {
            return this.styleC_DUTY_1
          }
        } else if (this.myDate - 1 === 12) {
          if (this.tableData[rowIndex].day13 === '休息') {
            return this.styleG_DUTY_0
          } else if (this.tableData[rowIndex].day13 === '早班') {
            return this.styleG_DUTY_1
          } else if (this.tableData[rowIndex].day13 === '中班') {
            return this.styleG_DUTY_2
          } else if (this.tableData[rowIndex].day13 === '晚班') {
            return this.styleG_DUTY_3
          } else if (this.tableData[rowIndex].day13 === '晚班至扎账') {
            return this.styleG_DUTY_4
          } else if (this.tableData[rowIndex].day13 === '白班') {
            return this.styleC_DUTY_0
          } else if (this.tableData[rowIndex].day13 === '白班至扎账') {
            return this.styleC_DUTY_1
          }
        } else if (this.myDate - 1 === 13) {
          if (this.tableData[rowIndex].day14 === '休息') {
            return this.styleG_DUTY_0
          } else if (this.tableData[rowIndex].day14 === '早班') {
            return this.styleG_DUTY_1
          } else if (this.tableData[rowIndex].day14 === '中班') {
            return this.styleG_DUTY_2
          } else if (this.tableData[rowIndex].day14 === '晚班') {
            return this.styleG_DUTY_3
          } else if (this.tableData[rowIndex].day14 === '晚班至扎账') {
            return this.styleG_DUTY_4
          } else if (this.tableData[rowIndex].day14 === '白班') {
            return this.styleC_DUTY_0
          } else if (this.tableData[rowIndex].day14 === '白班至扎账') {
            return this.styleC_DUTY_1
          }
        } else if (this.myDate - 1 === 14) {
          if (this.tableData[rowIndex].day15 === '休息') {
            return this.styleG_DUTY_0
          } else if (this.tableData[rowIndex].day15 === '早班') {
            return this.styleG_DUTY_1
          } else if (this.tableData[rowIndex].day15 === '中班') {
            return this.styleG_DUTY_2
          } else if (this.tableData[rowIndex].day15 === '晚班') {
            return this.styleG_DUTY_3
          } else if (this.tableData[rowIndex].day15 === '晚班至扎账') {
            return this.styleG_DUTY_4
          } else if (this.tableData[rowIndex].day15 === '白班') {
            return this.styleC_DUTY_0
          } else if (this.tableData[rowIndex].day15 === '白班至扎账') {
            return this.styleC_DUTY_1
          }
        } else if (this.myDate - 1 === 15) {
          if (this.tableData[rowIndex].day16 === '休息') {
            return this.styleG_DUTY_0
          } else if (this.tableData[rowIndex].day16 === '早班') {
            return this.styleG_DUTY_1
          } else if (this.tableData[rowIndex].day16 === '中班') {
            return this.styleG_DUTY_2
          } else if (this.tableData[rowIndex].day16 === '晚班') {
            return this.styleG_DUTY_3
          } else if (this.tableData[rowIndex].day16 === '晚班至扎账') {
            return this.styleG_DUTY_4
          } else if (this.tableData[rowIndex].day16 === '白班') {
            return this.styleC_DUTY_0
          } else if (this.tableData[rowIndex].day16 === '白班至扎账') {
            return this.styleC_DUTY_1
          }
        } else if (this.myDate - 1 === 16) {
          if (this.tableData[rowIndex].day17 === '休息') {
            return this.styleG_DUTY_0
          } else if (this.tableData[rowIndex].day17 === '早班') {
            return this.styleG_DUTY_1
          } else if (this.tableData[rowIndex].day17 === '中班') {
            return this.styleG_DUTY_2
          } else if (this.tableData[rowIndex].day17 === '晚班') {
            return this.styleG_DUTY_3
          } else if (this.tableData[rowIndex].day17 === '晚班至扎账') {
            return this.styleG_DUTY_4
          } else if (this.tableData[rowIndex].day17 === '白班') {
            return this.styleC_DUTY_0
          } else if (this.tableData[rowIndex].day17 === '白班至扎账') {
            return this.styleC_DUTY_1
          }
        } else if (this.myDate - 1 === 17) {
          if (this.tableData[rowIndex].day18 === '休息') {
            return this.styleG_DUTY_0
          } else if (this.tableData[rowIndex].day18 === '早班') {
            return this.styleG_DUTY_1
          } else if (this.tableData[rowIndex].day18 === '中班') {
            return this.styleG_DUTY_2
          } else if (this.tableData[rowIndex].day18 === '晚班') {
            return this.styleG_DUTY_3
          } else if (this.tableData[rowIndex].day18 === '晚班至扎账') {
            return this.styleG_DUTY_4
          } else if (this.tableData[rowIndex].day18 === '白班') {
            return this.styleC_DUTY_0
          } else if (this.tableData[rowIndex].day18 === '白班至扎账') {
            return this.styleC_DUTY_1
          }
        } else if (this.myDate - 1 === 18) {
          if (this.tableData[rowIndex].day19 === '休息') {
            return this.styleG_DUTY_0
          } else if (this.tableData[rowIndex].day19 === '早班') {
            return this.styleG_DUTY_1
          } else if (this.tableData[rowIndex].day19 === '中班') {
            return this.styleG_DUTY_2
          } else if (this.tableData[rowIndex].day19 === '晚班') {
            return this.styleG_DUTY_3
          } else if (this.tableData[rowIndex].day19 === '晚班至扎账') {
            return this.styleG_DUTY_4
          } else if (this.tableData[rowIndex].day19 === '白班') {
            return this.styleC_DUTY_0
          } else if (this.tableData[rowIndex].day19 === '白班至扎账') {
            return this.styleC_DUTY_1
          }
        } else if (this.myDate - 1 === 19) {
          if (this.tableData[rowIndex].day20 === '休息') {
            return this.styleG_DUTY_0
          } else if (this.tableData[rowIndex].day20 === '早班') {
            return this.styleG_DUTY_1
          } else if (this.tableData[rowIndex].day20 === '中班') {
            return this.styleG_DUTY_2
          } else if (this.tableData[rowIndex].day20 === '晚班') {
            return this.styleG_DUTY_3
          } else if (this.tableData[rowIndex].day20 === '晚班至扎账') {
            return this.styleG_DUTY_4
          } else if (this.tableData[rowIndex].day20 === '白班') {
            return this.styleC_DUTY_0
          } else if (this.tableData[rowIndex].day20 === '白班至扎账') {
            return this.styleC_DUTY_1
          }
        } else if (this.myDate - 1 === 20) {
          if (this.tableData[rowIndex].day21 === '休息') {
            return this.styleG_DUTY_0
          } else if (this.tableData[rowIndex].day21 === '早班') {
            return this.styleG_DUTY_1
          } else if (this.tableData[rowIndex].day21 === '中班') {
            return this.styleG_DUTY_2
          } else if (this.tableData[rowIndex].day21 === '晚班') {
            return this.styleG_DUTY_3
          } else if (this.tableData[rowIndex].day21 === '晚班至扎账') {
            return this.styleG_DUTY_4
          } else if (this.tableData[rowIndex].day21 === '白班') {
            return this.styleC_DUTY_0
          } else if (this.tableData[rowIndex].day21 === '白班至扎账') {
            return this.styleC_DUTY_1
          }
        } else if (this.myDate - 1 === 21) {
          if (this.tableData[rowIndex].day22 === '休息') {
            return this.styleG_DUTY_0
          } else if (this.tableData[rowIndex].day22 === '早班') {
            return this.styleG_DUTY_1
          } else if (this.tableData[rowIndex].day22 === '中班') {
            return this.styleG_DUTY_2
          } else if (this.tableData[rowIndex].day22 === '晚班') {
            return this.styleG_DUTY_3
          } else if (this.tableData[rowIndex].day22 === '晚班至扎账') {
            return this.styleG_DUTY_4
          } else if (this.tableData[rowIndex].day22 === '白班') {
            return this.styleC_DUTY_0
          } else if (this.tableData[rowIndex].day22 === '白班至扎账') {
            return this.styleC_DUTY_1
          }
        } else if (this.myDate - 1 === 22) {
          if (this.tableData[rowIndex].day23 === '休息') {
            return this.styleG_DUTY_0
          } else if (this.tableData[rowIndex].day23 === '早班') {
            return this.styleG_DUTY_1
          } else if (this.tableData[rowIndex].day23 === '中班') {
            return this.styleG_DUTY_2
          } else if (this.tableData[rowIndex].day23 === '晚班') {
            return this.styleG_DUTY_3
          } else if (this.tableData[rowIndex].day23 === '晚班至扎账') {
            return this.styleG_DUTY_4
          } else if (this.tableData[rowIndex].day23 === '白班') {
            return this.styleC_DUTY_0
          } else if (this.tableData[rowIndex].day23 === '白班至扎账') {
            return this.styleC_DUTY_1
          }
        } else if (this.myDate - 1 === 23) {
          if (this.tableData[rowIndex].day24 === '休息') {
            return this.styleG_DUTY_0
          } else if (this.tableData[rowIndex].day24 === '早班') {
            return this.styleG_DUTY_1
          } else if (this.tableData[rowIndex].day24 === '中班') {
            return this.styleG_DUTY_2
          } else if (this.tableData[rowIndex].day24 === '晚班') {
            return this.styleG_DUTY_3
          } else if (this.tableData[rowIndex].day24 === '晚班至扎账') {
            return this.styleG_DUTY_4
          } else if (this.tableData[rowIndex].day24 === '白班') {
            return this.styleC_DUTY_0
          } else if (this.tableData[rowIndex].day24 === '白班至扎账') {
            return this.styleC_DUTY_1
          }
        } else if (this.myDate - 1 === 24) {
          if (this.tableData[rowIndex].day25 === '休息') {
            return this.styleG_DUTY_0
          } else if (this.tableData[rowIndex].day25 === '早班') {
            return this.styleG_DUTY_1
          } else if (this.tableData[rowIndex].day25 === '中班') {
            return this.styleG_DUTY_2
          } else if (this.tableData[rowIndex].day25 === '晚班') {
            return this.styleG_DUTY_3
          } else if (this.tableData[rowIndex].day25 === '晚班至扎账') {
            return this.styleG_DUTY_4
          } else if (this.tableData[rowIndex].day25 === '白班') {
            return this.styleC_DUTY_0
          } else if (this.tableData[rowIndex].day25 === '白班至扎账') {
            return this.styleC_DUTY_1
          }
        } else if (this.myDate - 1 === 25) {
          if (this.tableData[rowIndex].day26 === '休息') {
            return this.styleG_DUTY_0
          } else if (this.tableData[rowIndex].day26 === '早班') {
            return this.styleG_DUTY_1
          } else if (this.tableData[rowIndex].day26 === '中班') {
            return this.styleG_DUTY_2
          } else if (this.tableData[rowIndex].day26 === '晚班') {
            return this.styleG_DUTY_3
          } else if (this.tableData[rowIndex].day26 === '晚班至扎账') {
            return this.styleG_DUTY_4
          } else if (this.tableData[rowIndex].day26 === '白班') {
            return this.styleC_DUTY_0
          } else if (this.tableData[rowIndex].day26 === '白班至扎账') {
            return this.styleC_DUTY_1
          }
        } else if (this.myDate - 1 === 26) {
          if (this.tableData[rowIndex].day27 === '休息') {
            return this.styleG_DUTY_0
          } else if (this.tableData[rowIndex].day27 === '早班') {
            return this.styleG_DUTY_1
          } else if (this.tableData[rowIndex].day27 === '中班') {
            return this.styleG_DUTY_2
          } else if (this.tableData[rowIndex].day27 === '晚班') {
            return this.styleG_DUTY_3
          } else if (this.tableData[rowIndex].day27 === '晚班至扎账') {
            return this.styleG_DUTY_4
          } else if (this.tableData[rowIndex].day27 === '白班') {
            return this.styleC_DUTY_0
          } else if (this.tableData[rowIndex].day27 === '白班至扎账') {
            return this.styleC_DUTY_1
          }
        } else if (this.myDate - 1 === 27) {
          if (this.tableData[rowIndex].day28 === '休息') {
            return this.styleG_DUTY_0
          } else if (this.tableData[rowIndex].day28 === '早班') {
            return this.styleG_DUTY_1
          } else if (this.tableData[rowIndex].day28 === '中班') {
            return this.styleG_DUTY_2
          } else if (this.tableData[rowIndex].day28 === '晚班') {
            return this.styleG_DUTY_3
          } else if (this.tableData[rowIndex].day28 === '晚班至扎账') {
            return this.styleG_DUTY_4
          } else if (this.tableData[rowIndex].day28 === '白班') {
            return this.styleC_DUTY_0
          } else if (this.tableData[rowIndex].day28 === '白班至扎账') {
            return this.styleC_DUTY_1
          }
        } else if (this.myDate - 1 === 28) {
          if (this.tableData[rowIndex].day29 === '休息') {
            return this.styleG_DUTY_0
          } else if (this.tableData[rowIndex].day29 === '早班') {
            return this.styleG_DUTY_1
          } else if (this.tableData[rowIndex].day29 === '中班') {
            return this.styleG_DUTY_2
          } else if (this.tableData[rowIndex].day29 === '晚班') {
            return this.styleG_DUTY_3
          } else if (this.tableData[rowIndex].day29 === '晚班至扎账') {
            return this.styleG_DUTY_4
          } else if (this.tableData[rowIndex].day29 === '白班') {
            return this.styleC_DUTY_0
          } else if (this.tableData[rowIndex].day29 === '白班至扎账') {
            return this.styleC_DUTY_1
          }
        } else if (this.myDate - 1 === 29) {
          if (this.tableData[rowIndex].day30 === '休息') {
            return this.styleG_DUTY_0
          } else if (this.tableData[rowIndex].day30 === '早班') {
            return this.styleG_DUTY_1
          } else if (this.tableData[rowIndex].day30 === '中班') {
            return this.styleG_DUTY_2
          } else if (this.tableData[rowIndex].day30 === '晚班') {
            return this.styleG_DUTY_3
          } else if (this.tableData[rowIndex].day30 === '晚班至扎账') {
            return this.styleG_DUTY_4
          } else if (this.tableData[rowIndex].day30 === '白班') {
            return this.styleC_DUTY_0
          } else if (this.tableData[rowIndex].day30 === '白班至扎账') {
            return this.styleC_DUTY_1
          }
        } else if (this.myDate - 1 === 30) {
          if (this.tableData[rowIndex].day31 === '休息') {
            return this.styleG_DUTY_0
          } else if (this.tableData[rowIndex].day31 === '早班') {
            return this.styleG_DUTY_1
          } else if (this.tableData[rowIndex].day31 === '中班') {
            return this.styleG_DUTY_2
          } else if (this.tableData[rowIndex].day31 === '晚班') {
            return this.styleG_DUTY_3
          } else if (this.tableData[rowIndex].day31 === '晚班至扎账') {
            return this.styleG_DUTY_4
          } else if (this.tableData[rowIndex].day31 === '白班') {
            return this.styleC_DUTY_0
          } else if (this.tableData[rowIndex].day31 === '白班至扎账') {
            return this.styleC_DUTY_1
          }
        }
      }
    },
    changeMonth(start, end, current) {
      this.month = current
    },
    eventClick(event, jsEvent, pos) {
      console.log('eventClick', event, jsEvent, pos)
    },
    dayClick(day, jsEvent) {
      var dateMonth
      // var dateDate
      if ((day.getMonth() + 1) < 10) {
        dateMonth = '0' + (day.getMonth() + 1)
      } else {
        dateMonth = day.getMonth() + 1
      }
      if (day.getDate() < 10) {
        // dateDate = '0' + day.getDate()
      } else {
        // dateDate = day.getDate()
      }
      this.myMonth = day.getFullYear() + dateMonth
      console.log('myMonth', this.myMonth)
      this.myDate = day.getDate()
      console.log('myDate', this.myDate)
      this.query()
    },
    moreClick(day, events, jsEvent) {
      console.log('moreCLick', day, events, jsEvent)
    },
    inquire: function() { // 查询
      this.query()
    },
    empty: function() { // 清空
      this.tableData = []
    },
    query: function() { // 查询
      const params = { 'pageNum': this.pageNum, 'pageSize': this.pageSize, 'accdate': this.myMonth, 'GCType': '' }
      this.$http(this.$reportMngApi.queryschedulingDetailsInfo, params) // 此处调用自己的Api接口方法
        .then(
          res => {
            const resdata = res.data.data
            console.log(resdata.data)
            if (resdata.data.PageInfo.total <= 0) {
              this.$message({
                showClose: true,
                message: '请先进行排班!',
                type: 'warning'
              })
            }
            if (resdata.code === 'SUCCESS') {
              if (resdata.data.TrxCode === '000000') {
                // 赋值
                this.totals = resdata.data.PageInfo.total
                this.tableData = resdata.data.PageInfo.list
                this.$http(this.$reportMngApi.styleClass, params) // 此处调用自己的Api接口方法进行列表染色
                  .then(
                    res => {
                      const resdata = res.data.data
                      console.log(res.data)
                      console.log(resdata)
                      if (resdata.code === 'SUCCESS') {
                        if (resdata.data.TrxCode === '000000') {
                          this.styleG_DUTY_0 = resdata.data.PageInfo.list[0].color // 休息字体颜色
                          this.styleG_DUTY_1 = resdata.data.PageInfo.list[1].color // 白班1字体颜色
                          this.styleG_DUTY_2 = resdata.data.PageInfo.list[2].color // 白班2字体颜色
                          this.styleG_DUTY_3 = resdata.data.PageInfo.list[3].color // 白班3字体颜色
                          this.styleG_DUTY_4 = resdata.data.PageInfo.list[4].color // 白班3_夜班1字体颜色
                          this.styleC_DUTY_0 = resdata.data.PageInfo.list[5].color // 白班字体颜色
                          this.styleC_DUTY_1 = resdata.data.PageInfo.list[6].color // 夜班字体颜色
                        }
                      }
                    },
                    error => {
                      console.log(error)
                    }
                  )
                console.log('mydata => ' + this.myDate)
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
          },
          error => {
            console.log(error)
          }
        )
    },
    handleSizeChange: function(size) {
      this.pageSize = size
      console.log(this.pageSize) // 每页下拉显示数据
      this.query()
    },
    handleCurrentChange: function(pageNum) { // 翻页
      this.pageNum = pageNum
      console.log(this.pageNum) // 点击第几页
      this.query()
    },
    handleSelectionChange(val) { // 选中表格数据
      this.val = val
      this.multipleSelection = val
    },
    roleSlt(obj) {
      const inputForm = { 'roleStatus': '0' }
      const params = { 'inputForm': JSON.stringify(inputForm), 'pageNum': 1, 'pageSize': 100 }
      this.$http(this.$userMngApi.getRoleBaseInfo, params).then( // 通讯后台查询数据库中用户信息
        res => {
          console.log('res => ', res)
          console.log(res.data)
          const _data = res.data.data
          if (_data.code === 'SUCCESS') {
            if (_data.data.TrxCode === '000000') {
              console.log(_data.data)
              // 赋值
              _data.data.PageInfo.list.forEach((item, index) => { // 关键的是将后台返回的数据进行遍历，并封装好
                obj.push({
                  value: item.roleNo, // id必须品啊
                  label: item.roleName // name必须品啊
                })
              })
            } else {
              this.$message({
                showClose: true,
                message: '错误信息 ： ' + _data.data.TrxMessage,
                type: 'warning'
              })
            }
          } else {
            this.$message({
              showClose: true,
              message: '错误信息 ： ' + _data.message,
              type: 'warning'
            })
          }
        }
      )
    },
    closeDialog() {
      this.$refs['ruleForm'].resetFields()
      this.query()
    }
  },
  filterHandler(value, row, column) {
    const property = column['property']
    return row[property] === value
  }
}
</script>

<style scoped>
</style>
<style>
  @import "../../../styles/public.css";
</style>
