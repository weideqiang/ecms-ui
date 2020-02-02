<template>
  <el-main>
    <el-row>
      <el-form
        ref="form"
        :inline="true"
        :model="inputForm"
        :rules="inputRules"
        class="ecms-trx-search"
        label-width="100px"
        label-position="left" >
        <el-row>
          <el-col :span="6">
            <el-form-item label="年份:" prop="inputFormY">
              <el-date-picker
                id="inputFormY"
                v-model="inputForm.inputFormY"
                :picker-options="pickerOptions1"
                class="input-class"
                editable
                style="width: 85%;"
                format="yyyy 年"
                align="right"
                type="year"
                placeholder="选择年份"
                value-format="yyyy"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="月份:" prop="inputFormM">
              <el-select v-model="inputForm.inputFormM" clearable placeholder="请选择" @change="getWeekByDay">
                <el-option v-for="item in option" :label="item.lable" :value="item.value" :key="item.value" style="width: 85%;"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label-width="150px" label="对私对公标志:" prop="privateAndPublicSigns">
              <el-select v-model="inputForm.privateAndPublicSigns" clearable placeholder="请选择" >
                <el-option v-for="item in option1" :label="item.lable" :value="item.value" :key="item.value" style="width: 85%;"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
    <el-row>
      <el-form :inline="true" class="ecms-trx-button">
        <el-form-item>
          <!--<el-button type="primary" size="medium" >查询</el-button>-->
          <el-button type="primary" size="medium" @click="inquire" >查询</el-button>
          <el-button type="primary" size="medium" @click="empty" >清空</el-button>
          <el-button type="primary" size="medium" @click="schedulingDetailsInsert" >排班</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row class="ecms-trx-result">
      <el-col :span="1">
        <span class="ecms-trx-result-fullScreen">
          <img id="trx_fullScreen" src="../../../assets/trx_fullScreen.png" width="30" height="30" style="vertical-align:middle" @click="fullScreen()">
        </span>
      </el-col>
      <el-table
        id="content"
        ref="multipleTable"
        :data="tableData"
        :cell-style="tableRowStyle"
        border
        tooltip-effect="dark"
        height="400"
        @selection-change="handleSelectionChange">
        <el-table-column :label="username1" prop="one">
          <template slot-scope="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="username2" prop="2">
          <template slot-scope="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="username3" prop="3">
          <template slot-scope="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="username4" prop="4">
          <template slot-scope="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="username5" prop="5">
          <template slot-scope="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="username6" prop="6">
          <template slot-scope="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="username7" prop="7">
          <template slot-scope="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="username8" prop="8">
          <template slot-scope="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="username9" prop="9">
          <template slot-scope="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="username10" prop="10">
          <template slot-scope="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="username11" prop="11">
          <template slot-scope="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="username12" prop="12">
          <template slot-scope="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="username13" prop="13">
          <template slot-scope="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="username14" prop="14">
          <template slot-scope="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="username15" prop="15">
          <template slot-scope="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="username16" prop="16">
          <template slot-scope="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="username17" prop="17">
          <template slot-scope="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="username18" prop="18">
          <template slot-scope="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="username19" prop="19">
          <template slot-scope="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="username20" prop="20">
          <template slot-scope="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="username21" prop="21">
          <template slot-scope="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="username22" prop="22">
          <template slot-scope="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="username23" prop="23">
          <template slot-scope="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="username24" prop="24">
          <template slot-scope="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="username25" prop="25">
          <template slot-scope="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="username26" prop="26">
          <template slot-scope="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="username27" prop="27">
          <template slot-scope="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="username28" prop="28">
          <template slot-scope="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="show" :label="username29" prop="29">
          <template slot-scope="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="shows" :label="username30" prop="30">
          <template slot-scope="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="showss" :label="username31" prop="31">
          <template slot-scope="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="pageNum"
        :page-size="pageSize"
        :page-sizes="[5, 10, 20, 40, 80, 160, 320]"
        :total="totals"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"/>
    </el-row>
    <el-button id="xx" :style="styleG_DUTY_0" style="color:#000000" type="primary" @click="inquire" >休息</el-button>
    <el-button id="zaob" :style="styleG_DUTY_1" style="color:#000000" type="primary" @click="inquire" >早班</el-button>
    <el-button id="zhongb" :style="styleG_DUTY_2" style="color:#000000" type="primary" @click="inquire" >中班</el-button>
    <el-button id="wanbs" :style="styleG_DUTY_3" style="color:#000000" type="primary" @click="inquire" >晚班(私)</el-button>
    <el-button id="wanbzzz" :style="styleG_DUTY_4" style="color:#000000" type="primary" @click="inquire" >晚班至扎账</el-button>
    <el-button id="baib" :style="styleC_DUTY_0" style="color:#000000" type="primary" @click="inquire" >白班</el-button>
    <el-button id="baibzzz" :style="styleC_DUTY_1" style="color:#000000" type="primary" @click="inquire" >白班至扎账</el-button>
    <el-button id="xiuj" :style="styleXJ" style="color:#000000" type="primary" @click="inquire" >休假</el-button>
    <el-button id="wanbg" :style="styleWB" style="color:#000000" type="primary" @click="inquire" >晚班(公)</el-button>
    <el-dialog :modal-append-to-body="false" :title="pbjdTitle" :visible.sync="dialogFormVisible" center @close="closeDialog">
      <el-steps :active="active" finish-status="success">
        <el-step title="步骤 1" description="同步上月授权信息"/>
        <el-step title="步骤 2" description="预估下月授权信息"/>
        <el-step title="步骤 3" description="排班-个人"/>
      </el-steps>
    </el-dialog>
    <el-dialog :modal-append-to-body="false" :title="pbjdTitle" :visible.sync="dialogFormVisible1" center @close="closeDialog">
      <el-steps :active="active1" finish-status="success">
        <el-step title="步骤 1" description="同步上月授权信息"/>
        <el-step title="步骤 2" description="预估下月授权信息"/>
        <el-step title="步骤 3" description="排班-对公"/>
      </el-steps>
    </el-dialog>
    <el-dialog :modal-append-to-body="false" :title="pbjdTitle" :visible.sync="dialogFormVisible2" center @close="closeDialog">
      <el-steps :active="active2" finish-status="success">
        <el-step title="步骤 1" description="同步上月授权信息"/>
        <el-step title="步骤 2" description="预估下月授权信息"/>
        <el-step title="步骤 3" description="排班-个人"/>
        <el-step title="步骤 4" description="排班-对公"/>
      </el-steps>
    </el-dialog>
    <el-dialog :modal-append-to-body="false" :title="pbjdTitle" :visible.sync="dialogFormVisible3" center @close="closeDialog">
      <el-steps :active="active3" finish-status="success">
        <el-step title="步骤 1" description="删除原有数据"/>
        <el-step title="步骤 2" description="预估下月授权信息"/>
        <el-step title="步骤 3" description="排班-个人"/>
      </el-steps>
    </el-dialog>
    <el-dialog :modal-append-to-body="false" :title="pbjdTitle" :visible.sync="dialogFormVisible4" center @close="closeDialog">
      <el-steps :active="active4" finish-status="success">
        <el-step title="步骤 1" description="删除原有数据"/>
        <el-step title="步骤 2" description="预估下月授权信息"/>
        <el-step title="步骤 3" description="排班-对公"/>
      </el-steps>
    </el-dialog>
    <el-dialog :modal-append-to-body="false" :title="pbjdTitle" :visible.sync="dialogFormVisible5" center @close="closeDialog">
      <el-steps :active="active5" finish-status="success">
        <el-step title="步骤 1" description="删除原有数据"/>
        <el-step title="步骤 2" description="预估下月授权信息"/>
        <el-step title="步骤 3" description="排班-个人"/>
        <el-step title="步骤 4" description="排班-对公"/>
      </el-steps>
    </el-dialog>
  </el-main>
</template>

<script>
import screenfull from 'screenfull'
export default {
  name: 'T2001',
  data() {
    return {
      disabledactive: true,
      active: 0,
      active1: 0,
      active2: 0,
      active3: 0,
      active4: 0,
      active5: 0,
      pbjdTitle: '排班进度',
      BZ3: '',
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
        { value: 'C-对公', label: '02' },
        { value: '全部', label: '03' }
      ],
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() < Date.now()
        }
      },
      inputRules: { // 表单校验
        inputFormY: [
          { required: true, message: '请输入年份', trigger: 'blur' }
        ],
        inputFormM: [
          { required: true, message: '请输入月份', trigger: 'blur' }
        ],
        privateAndPublicSigns: [
          { required: true, message: '请输入对私对公标志', trigger: 'blur' }
        ]
      },
      username1: '1',
      username2: '2',
      username3: '3',
      username4: '4',
      username5: '5',
      username6: '6',
      username7: '7',
      username8: '8',
      username9: '9',
      username10: '10',
      username11: '11',
      username12: '12',
      username13: '13',
      username14: '14',
      username15: '15',
      username16: '16',
      username17: '17',
      username18: '18',
      username19: '19',
      username20: '20',
      username21: '21',
      username22: '22',
      username23: '23',
      username24: '24',
      username25: '25',
      username26: '26',
      username27: '27',
      username28: '28',
      username29: '29',
      username30: '30',
      username31: '31',
      day1: '',
      day2: '',
      day3: '',
      day4: '',
      day5: '',
      day6: '',
      day7: '',
      day8: '',
      day9: '',
      day10: '',
      day11: '',
      day12: '',
      day13: '',
      day14: '',
      day15: '',
      day16: '',
      day17: '',
      day18: '',
      day19: '',
      day20: '',
      day21: '',
      day22: '',
      day23: '',
      day24: '',
      day25: '',
      day26: '',
      day27: '',
      day28: '',
      day29: '',
      day30: '',
      day31: '',
      styleG_DUTY_0: '', // 休息字体颜色
      styleG_DUTY_1: '', // 白班1字体颜色
      styleG_DUTY_2: '', // 白班2字体颜色
      styleG_DUTY_3: '', // 白班3字体颜色
      styleG_DUTY_4: '', // 白班3_夜班1字体颜色
      styleC_DUTY_0: '', // 白班字体颜色
      styleC_DUTY_1: '', // 夜班字体颜色
      styleXJ: '', // 休假字体颜色
      styleWB: '', // 晚班C字体颜色
      strM: '', // 月的数字形式
      inputForm: {
        inputFormY: '',
        inputFormM: '',
        privateAndPublicSigns: ''
      },
      strYM: '', // 年月的数字形式
      intM: '', // 月份的数字形式
      tableData: [], // 用户信息
      totals: 0,
      pageNum: 1, // 初始页
      pageSize: 10, //    每页的数据
      result: 0,
      tableName: '',
      GCType: '',
      show: true,
      dialogFormVisible: false, // 默认隐藏弹框
      dialogFormVisible1: false, // 默认隐藏弹框
      dialogFormVisible2: false, // 默认隐藏弹框
      dialogFormVisible3: false, // 默认隐藏弹框
      dialogFormVisible4: false, // 默认隐藏弹框
      dialogFormVisible5: false, // 默认隐藏弹框
      shows: true,
      showss: true,
      val: [],
      status: [{ // 用户状态下拉列表
        value: '0',
        label: '初始'
      }, {
        value: '1',
        label: '登录'
      }, {
        value: '2',
        label: '签退'
      }, {
        value: '3',
        label: '密码挂失'
      }]
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
  mounted: function() {
    this.$http(this.$reportMngApi.styleClass, '') // 此处调用自己的Api接口方法进行列表染色
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
              this.styleXJ = resdata.data.PageInfo.list[7].color // 休假字体颜色
              this.styleWB = resdata.data.PageInfo.list[8].color // 休假字体颜色
            }
          }
          console.log('styleG_DUTY_0' + this.styleG_DUTY_0)
        },
        error => {
          console.log(error)
        }
      )
  },
  methods: {
    // 修改table tr行的背景色
    tableRowStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
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
        } else if (this.tableData[rowIndex].day1 === '休假') {
          return this.styleXJ
        } else if (this.tableData[rowIndex].day1 === '晚班C') {
          return this.styleWB
        }
      } else if (columnIndex === 1) {
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
        } else if (this.tableData[rowIndex].day2 === '休假') {
          return this.styleXJ
        } else if (this.tableData[rowIndex].day2 === '晚班C') {
          return this.styleWB
        }
      } else if (columnIndex === 2) {
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
        } else if (this.tableData[rowIndex].day3 === '休假') {
          return this.styleXJ
        } else if (this.tableData[rowIndex].day3 === '晚班C') {
          return this.styleWB
        }
      } else if (columnIndex === 3) {
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
        } else if (this.tableData[rowIndex].day4 === '休假') {
          return this.styleXJ
        } else if (this.tableData[rowIndex].day4 === '晚班C') {
          return this.styleWB
        }
      } else if (columnIndex === 4) {
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
        } else if (this.tableData[rowIndex].day5 === '休假') {
          return this.styleXJ
        } else if (this.tableData[rowIndex].day5 === '晚班C') {
          return this.styleWB
        }
      } else if (columnIndex === 5) {
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
        } else if (this.tableData[rowIndex].day6 === '休假') {
          return this.styleXJ
        } else if (this.tableData[rowIndex].day6 === '晚班C') {
          return this.styleWB
        }
      } else if (columnIndex === 6) {
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
        } else if (this.tableData[rowIndex].day7 === '休假') {
          return this.styleXJ
        } else if (this.tableData[rowIndex].day7 === '晚班C') {
          return this.styleWB
        }
      } else if (columnIndex === 7) {
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
        } else if (this.tableData[rowIndex].day8 === '休假') {
          return this.styleXJ
        } else if (this.tableData[rowIndex].day8 === '晚班C') {
          return this.styleWB
        }
      } else if (columnIndex === 8) {
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
        } else if (this.tableData[rowIndex].day9 === '休假') {
          return this.styleXJ
        } else if (this.tableData[rowIndex].day9 === '晚班C') {
          return this.styleWB
        }
      } else if (columnIndex === 9) {
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
        } else if (this.tableData[rowIndex].day10 === '休假') {
          return this.styleXJ
        } else if (this.tableData[rowIndex].day10 === '晚班C') {
          return this.styleWB
        }
      } else if (columnIndex === 10) {
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
        } else if (this.tableData[rowIndex].day11 === '休假') {
          return this.styleXJ
        } else if (this.tableData[rowIndex].day11 === '晚班C') {
          return this.styleWB
        }
      } else if (columnIndex === 11) {
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
        } else if (this.tableData[rowIndex].day12 === '休假') {
          return this.styleXJ
        } else if (this.tableData[rowIndex].day12 === '晚班C') {
          return this.styleWB
        }
      } else if (columnIndex === 12) {
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
        } else if (this.tableData[rowIndex].day13 === '休假') {
          return this.styleXJ
        } else if (this.tableData[rowIndex].day13 === '晚班C') {
          return this.styleWB
        }
      } else if (columnIndex === 13) {
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
        } else if (this.tableData[rowIndex].day14 === '休假') {
          return this.styleXJ
        } else if (this.tableData[rowIndex].day14 === '晚班C') {
          return this.styleWB
        }
      } else if (columnIndex === 14) {
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
        } else if (this.tableData[rowIndex].day15 === '休假') {
          return this.styleXJ
        } else if (this.tableData[rowIndex].day15 === '晚班C') {
          return this.styleWB
        }
      } else if (columnIndex === 15) {
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
        } else if (this.tableData[rowIndex].day16 === '休假') {
          return this.styleXJ
        } else if (this.tableData[rowIndex].day16 === '晚班C') {
          return this.styleWB
        }
      } else if (columnIndex === 16) {
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
        } else if (this.tableData[rowIndex].day17 === '休假') {
          return this.styleXJ
        } else if (this.tableData[rowIndex].day17 === '晚班C') {
          return this.styleWB
        }
      } else if (columnIndex === 17) {
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
        } else if (this.tableData[rowIndex].day18 === '休假') {
          return this.styleXJ
        } else if (this.tableData[rowIndex].day18 === '晚班C') {
          return this.styleWB
        }
      } else if (columnIndex === 18) {
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
        } else if (this.tableData[rowIndex].day19 === '休假') {
          return this.styleXJ
        } else if (this.tableData[rowIndex].day19 === '晚班C') {
          return this.styleWB
        }
      } else if (columnIndex === 19) {
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
        } else if (this.tableData[rowIndex].day20 === '休假') {
          return this.styleXJ
        } else if (this.tableData[rowIndex].day20 === '晚班C') {
          return this.styleWB
        }
      } else if (columnIndex === 20) {
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
        } else if (this.tableData[rowIndex].day21 === '休假') {
          return this.styleXJ
        } else if (this.tableData[rowIndex].day21 === '晚班C') {
          return this.styleWB
        }
      } else if (columnIndex === 21) {
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
        } else if (this.tableData[rowIndex].day22 === '休假') {
          return this.styleXJ
        } else if (this.tableData[rowIndex].day22 === '晚班C') {
          return this.styleWB
        }
      } else if (columnIndex === 22) {
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
        } else if (this.tableData[rowIndex].day23 === '休假') {
          return this.styleXJ
        } else if (this.tableData[rowIndex].day23 === '晚班C') {
          return this.styleWB
        }
      } else if (columnIndex === 23) {
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
        } else if (this.tableData[rowIndex].day24 === '休假') {
          return this.styleXJ
        } else if (this.tableData[rowIndex].day24 === '晚班C') {
          return this.styleWB
        }
      } else if (columnIndex === 24) {
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
        } else if (this.tableData[rowIndex].day25 === '休假') {
          return this.styleXJ
        } else if (this.tableData[rowIndex].day25 === '晚班C') {
          return this.styleWB
        }
      } else if (columnIndex === 25) {
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
        } else if (this.tableData[rowIndex].day26 === '休假') {
          return this.styleXJ
        } else if (this.tableData[rowIndex].day26 === '晚班C') {
          return this.styleWB
        }
      } else if (columnIndex === 26) {
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
        } else if (this.tableData[rowIndex].day27 === '休假') {
          return this.styleXJ
        } else if (this.tableData[rowIndex].day27 === '晚班C') {
          return this.styleWB
        }
      } else if (columnIndex === 27) {
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
        } else if (this.tableData[rowIndex].day28 === '休假') {
          return this.styleXJ
        } else if (this.tableData[rowIndex].day28 === '晚班C') {
          return this.styleWB
        }
      } else if (columnIndex === 28) {
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
        } else if (this.tableData[rowIndex].day29 === '休假') {
          return this.styleXJ
        } else if (this.tableData[rowIndex].day29 === '晚班C') {
          return this.styleWB
        }
      } else if (columnIndex === 29) {
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
        } else if (this.tableData[rowIndex].day30 === '休假') {
          return this.styleXJ
        } else if (this.tableData[rowIndex].day30 === '晚班C') {
          return this.styleWB
        }
      } else if (columnIndex === 30) {
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
        } else if (this.tableData[rowIndex].day31 === '休假') {
          return this.styleXJ
        } else if (this.tableData[rowIndex].day31 === '晚班C') {
          return this.styleWB
        }
      }
    },
    getWeekByDay() {
      var mY = this.inputForm.inputFormY
      var mM = this.inputForm.inputFormM.slice(0, 2)
      var dayValue = [
        mY + '-' + mM + '-' + '01',
        mY + '-' + mM + '-' + '02',
        mY + '-' + mM + '-' + '03',
        mY + '-' + mM + '-' + '04',
        mY + '-' + mM + '-' + '05',
        mY + '-' + mM + '-' + '06',
        mY + '-' + mM + '-' + '07',
        mY + '-' + mM + '-' + '08',
        mY + '-' + mM + '-' + '09',
        mY + '-' + mM + '-' + '10',
        mY + '-' + mM + '-' + '11',
        mY + '-' + mM + '-' + '12',
        mY + '-' + mM + '-' + '13',
        mY + '-' + mM + '-' + '14',
        mY + '-' + mM + '-' + '15',
        mY + '-' + mM + '-' + '16',
        mY + '-' + mM + '-' + '17',
        mY + '-' + mM + '-' + '18',
        mY + '-' + mM + '-' + '19',
        mY + '-' + mM + '-' + '20',
        mY + '-' + mM + '-' + '21',
        mY + '-' + mM + '-' + '22',
        mY + '-' + mM + '-' + '23',
        mY + '-' + mM + '-' + '24',
        mY + '-' + mM + '-' + '25',
        mY + '-' + mM + '-' + '26',
        mY + '-' + mM + '-' + '27',
        mY + '-' + mM + '-' + '28',
        mY + '-' + mM + '-' + '29',
        mY + '-' + mM + '-' + '30',
        mY + '-' + mM + '-' + '31'
      ]
      // var today = ('(日)', '(一)', '(二)', '(三)', '(四)', '(五)', '(六)') // 创建星期数组
      var today = [' (日)', ' (一)', ' (二)', ' (三)', ' (四)', ' (五)', ' (六)'] // 创\建星期数组
      var DATE1 = new Date(Date.parse(dayValue[0].replace(/-/g, '/')))
      var DATE2 = new Date(Date.parse(dayValue[1].replace(/-/g, '/')))
      var DATE3 = new Date(Date.parse(dayValue[2].replace(/-/g, '/')))
      var DATE4 = new Date(Date.parse(dayValue[3].replace(/-/g, '/')))
      var DATE5 = new Date(Date.parse(dayValue[4].replace(/-/g, '/')))
      var DATE6 = new Date(Date.parse(dayValue[5].replace(/-/g, '/')))
      var DATE7 = new Date(Date.parse(dayValue[6].replace(/-/g, '/')))
      var DATE8 = new Date(Date.parse(dayValue[7].replace(/-/g, '/')))
      var DATE9 = new Date(Date.parse(dayValue[8].replace(/-/g, '/')))
      var DATE10 = new Date(Date.parse(dayValue[9].replace(/-/g, '/')))
      var DATE11 = new Date(Date.parse(dayValue[10].replace(/-/g, '/')))
      var DATE12 = new Date(Date.parse(dayValue[11].replace(/-/g, '/')))
      var DATE13 = new Date(Date.parse(dayValue[12].replace(/-/g, '/')))
      var DATE14 = new Date(Date.parse(dayValue[13].replace(/-/g, '/')))
      var DATE15 = new Date(Date.parse(dayValue[14].replace(/-/g, '/')))
      var DATE16 = new Date(Date.parse(dayValue[15].replace(/-/g, '/')))
      var DATE17 = new Date(Date.parse(dayValue[16].replace(/-/g, '/')))
      var DATE18 = new Date(Date.parse(dayValue[17].replace(/-/g, '/')))
      var DATE19 = new Date(Date.parse(dayValue[18].replace(/-/g, '/')))
      var DATE20 = new Date(Date.parse(dayValue[19].replace(/-/g, '/')))
      var DATE21 = new Date(Date.parse(dayValue[20].replace(/-/g, '/')))
      var DATE22 = new Date(Date.parse(dayValue[21].replace(/-/g, '/')))
      var DATE23 = new Date(Date.parse(dayValue[22].replace(/-/g, '/')))
      var DATE24 = new Date(Date.parse(dayValue[23].replace(/-/g, '/')))
      var DATE25 = new Date(Date.parse(dayValue[24].replace(/-/g, '/')))
      var DATE26 = new Date(Date.parse(dayValue[25].replace(/-/g, '/')))
      var DATE27 = new Date(Date.parse(dayValue[26].replace(/-/g, '/')))
      var DATE28 = new Date(Date.parse(dayValue[27].replace(/-/g, '/')))
      console.log('today[DATE1.getDay()]---->' + DATE1.getDay())
      console.log('today[DATE2.getDay()]---->' + DATE2.getDay())
      console.log('today[DATE3.getDay()]---->' + DATE3.getDay())
      this.day1 = today[DATE1.getDay()]
      this.day2 = today[DATE2.getDay()]
      this.day3 = today[DATE3.getDay()]
      this.day4 = today[DATE4.getDay()]
      this.day5 = today[DATE5.getDay()]
      this.day6 = today[DATE6.getDay()]
      this.day7 = today[DATE7.getDay()]
      this.day8 = today[DATE8.getDay()]
      this.day9 = today[DATE9.getDay()]
      this.day10 = today[DATE10.getDay()]
      this.day11 = today[DATE11.getDay()]
      this.day12 = today[DATE12.getDay()]
      this.day13 = today[DATE13.getDay()]
      this.day14 = today[DATE14.getDay()]
      this.day15 = today[DATE15.getDay()]
      this.day16 = today[DATE16.getDay()]
      this.day17 = today[DATE17.getDay()]
      this.day18 = today[DATE18.getDay()]
      this.day19 = today[DATE19.getDay()]
      this.day20 = today[DATE20.getDay()]
      this.day21 = today[DATE21.getDay()]
      this.day22 = today[DATE22.getDay()]
      this.day23 = today[DATE23.getDay()]
      this.day24 = today[DATE24.getDay()]
      this.day25 = today[DATE25.getDay()]
      this.day26 = today[DATE26.getDay()]
      this.day27 = today[DATE27.getDay()]
      this.day28 = today[DATE28.getDay()]
      this.username1 = '1' + this.day1
      this.username2 = '2' + this.day2
      this.username3 = '3' + this.day3
      this.username4 = '4' + this.day4
      this.username5 = '5' + this.day5
      this.username6 = '6' + this.day6
      this.username7 = '7' + this.day7
      this.username8 = '8' + this.day8
      this.username9 = '9' + this.day9
      this.username10 = '10' + this.day10
      this.username11 = '11' + this.day11
      this.username12 = '12' + this.day12
      this.username13 = '13' + this.day13
      this.username14 = '14' + this.day14
      this.username15 = '15' + this.day15
      this.username16 = '16' + this.day16
      this.username17 = '17' + this.day17
      this.username18 = '18' + this.day18
      this.username19 = '19' + this.day19
      this.username20 = '20' + this.day20
      this.username21 = '21' + this.day21
      this.username22 = '22' + this.day22
      this.username23 = '23' + this.day23
      this.username24 = '24' + this.day24
      this.username25 = '25' + this.day25
      this.username26 = '26' + this.day26
      this.username27 = '27' + this.day27
      this.username28 = '28' + this.day28
      if (this.inputForm.inputFormM === '02月') {
        if ((this.inputForm.inputFormY % 4 === 0 && this.inputForm.inputFormY % 100 !== 0) || this.inputForm.inputFormY % 400 === 0) {
          this.show = false
          this.shows = false
          this.showss = false
        } else {
          this.show = true
          this.shows = false
          this.showss = false
          var DATE2902 = new Date(Date.parse(dayValue[28].replace(/-/g, '/')))
          this.day29 = today[DATE2902.getDay()]
          this.username29 = '29' + this.day29
        }
      } else {
        if (this.inputForm.inputFormM === '04月' || this.inputForm.inputFormM === '06月' || this.inputForm.inputFormM === '09月' || this.inputForm.inputFormM === '11月') {
          this.show = true
          this.shows = true
          this.showss = false
          var DATE2904 = new Date(Date.parse(dayValue[28].replace(/-/g, '/')))
          var DATE3004 = new Date(Date.parse(dayValue[29].replace(/-/g, '/')))
          this.day29 = today[DATE2904.getDay()]
          this.day30 = today[DATE3004.getDay()]
          this.username29 = '29' + this.day29
          this.username30 = '30' + this.day30
        } else {
          this.show = true
          this.shows = true
          this.showss = true
          var DATE29 = new Date(Date.parse(dayValue[28].replace(/-/g, '/')))
          var DATE30 = new Date(Date.parse(dayValue[29].replace(/-/g, '/')))
          var DATE31 = new Date(Date.parse(dayValue[30].replace(/-/g, '/')))
          this.day29 = today[DATE29.getDay()]
          this.day30 = today[DATE30.getDay()]
          this.day31 = today[DATE31.getDay()]
          this.username29 = '29' + this.day29
          this.username30 = '30' + this.day30
          this.username31 = '31' + this.day31
        }
      }
      console.log('day1---->' + this.day2)
    },
    inquire: function() { // 查询
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.inputForm.inputFormM === '02月') {
            if ((this.inputForm.inputFormY % 4 === 0 && this.inputForm.inputFormY % 100 !== 0) || this.inputForm.inputFormY % 400 === 0) {
              this.show = false
              this.shows = false
              this.showss = false
            } else {
              this.show = true
              this.shows = false
              this.showss = false
            }
          } else {
            if (this.inputForm.inputFormM === '04月' || this.inputForm.inputFormM === '06月' || this.inputForm.inputFormM === '09月' || this.inputForm.inputFormM === '11月') {
              this.show = true
              this.shows = true
              this.showss = false
            } else {
              this.show = true
              this.shows = true
              this.showss = true
            }
          }
          this.pageNum = 1
          console.log('pageNum: ' + this.pageNum) // 点击第几页
          this.query()
        }
      })
    },
    empty: function() { // 清空
      this.tableData = []
    },
    schedulingDetailsInsert: function() { // 排班
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.inputForm.privateAndPublicSigns !== '全部') {
            this.GCType = this.inputForm.privateAndPublicSigns.slice(0, 1)
            this.strM = this.inputForm.inputFormM.slice(0, 2)
            this.strYM = this.inputForm.inputFormY + this.strM
          } else {
            this.GCType = ''
          }
          const map = {
            'month': this.strYM,
            'cgFlag': this.GCType
          }
          const params = { 'ruleForm': JSON.stringify(map) }
          const url = this.$pbAuthInfoApi.delete_pb_infoByDate
          this.$http(url, params).then( // 通讯后台修改数据库中信息
            res => {
              const _data = res.data
              // 赋值
              if (_data.code === 'SUCCESS') {
                if (_data.data.TrxCode === '000000') {
                  this.tableData = []
                  console.log('删除成功！！！！！！！！')
                  this.strM = this.inputForm.inputFormM.slice(0, 2)
                  if (this.strM !== '01') {
                    if (parseInt(this.strM) - 1 < 10) {
                      this.intM = '0' + (parseInt(this.strM) - 1)
                    }
                  } else {
                    this.intM = 12
                  }
                  this.strYM = this.inputForm.inputFormY + this.intM
                  console.log(this.strYM)
                  const map1 = {
                    'month': this.strYM
                  }
                  const params1 = { 'ruleForm': JSON.stringify(map1) }
                  const url1 = this.$pbAuthInfoApi.selectpb_auth_history_month_avgBymonth
                  this.$http(url1, params1).then( // 通讯后台修改数据库中信息
                    res => {
                      const _data = res.data
                      // 赋值
                      if (_data.code === 'SUCCESS') {
                        if (_data.data.TrxCode === '000000') {
                          if (res.data.data.PageInfo.total > 0) {
                            console.log('查询1有数据！！！！！！！！')
                            this.strM = this.inputForm.inputFormM.slice(0, 2)
                            this.strYM = this.inputForm.inputFormY + this.strM
                            const map2 = {
                              'month': this.strYM
                            }
                            const params2 = { 'ruleForm': JSON.stringify(map2) }
                            const url2 = this.$pbAuthInfoApi.selectpb_auth_predicted_month_avgBymonth
                            this.$http(url2, params2).then( // 通讯后台修改数据库中信息
                              res => {
                                const _data = res.data
                                // console.log('@@@@@提交返回 ：' + JSON.stringify(res.data))
                                // 赋值
                                if (_data.code === 'SUCCESS') {
                                  if (_data.data.TrxCode === '000000') {
                                    if (res.data.data.PageInfo.total > 0) {
                                      console.log('查询2有数据！！！！！！！！')
                                      this.active = 2
                                      this.active1 = 2
                                      this.active2 = 2
                                      this.active3 = 2
                                      this.active4 = 2
                                      this.active5 = 2
                                      if (this.inputForm.privateAndPublicSigns === 'G-对私') {
                                        this.dialogFormVisible3 = true
                                        this.PbStartingG()
                                      } else if (this.inputForm.privateAndPublicSigns === 'C-对公') {
                                        this.dialogFormVisible4 = true
                                        this.PbStartingC()
                                      } else if (this.inputForm.privateAndPublicSigns === '全部') {
                                        this.dialogFormVisible5 = true
                                        this.PbStartingG()
                                      }
                                    } else {
                                      console.log('查询无数据！！！！！！！！')
                                      if (this.inputForm.privateAndPublicSigns === 'G-对私') {
                                        console.log('G-对私')
                                        this.dialogFormVisible3 = true
                                      } else if (this.inputForm.privateAndPublicSigns === 'C-对公') {
                                        console.log('G-对公')
                                        this.dialogFormVisible4 = true
                                      } else if (this.inputForm.privateAndPublicSigns === '全部') {
                                        console.log('全部')
                                        this.dialogFormVisible5 = true
                                      }
                                      this.jumpToST()
                                    }
                                    //
                                  } else {
                                    console.log('1查询无数据！！！！！！！！')
                                    if (this.inputForm.privateAndPublicSigns === 'G-对私') {
                                      console.log('G-对私')
                                      this.dialogFormVisible3 = true
                                    } else if (this.inputForm.privateAndPublicSigns === 'C-对公') {
                                      console.log('G-对公')
                                      this.dialogFormVisible4 = true
                                    } else if (this.inputForm.privateAndPublicSigns === '全部') {
                                      console.log('全部')
                                      this.dialogFormVisible5 = true
                                    }
                                    this.jumpToST()
                                  }
                                } else {
                                  console.log('2查询无数据！！！！！！！！')
                                  if (this.inputForm.privateAndPublicSigns === 'G-对私') {
                                    console.log('G-对私')
                                    this.dialogFormVisible3 = true
                                  } else if (this.inputForm.privateAndPublicSigns === 'C-对公') {
                                    console.log('G-对公')
                                    this.dialogFormVisible4 = true
                                  } else if (this.inputForm.privateAndPublicSigns === '全部') {
                                    console.log('全部')
                                    this.dialogFormVisible5 = true
                                  }
                                  this.jumpToST()
                                }
                              })
                          } else {
                            console.log('就走这里')
                            if (this.inputForm.privateAndPublicSigns === 'G-对私') {
                              console.log('G-对私')
                              this.dialogFormVisible = true
                              this.getCurrentMonthData()
                            } else if (this.inputForm.privateAndPublicSigns === 'C-对公') {
                              console.log('G-对公')
                              this.dialogFormVisible1 = true
                              this.getCurrentMonthData()
                            } else if (this.inputForm.privateAndPublicSigns === '全部') {
                              console.log('全部')
                              this.dialogFormVisible2 = true
                              this.getCurrentMonthData()
                            }
                          }
                        } else {
                          console.log('就走这里')
                          if (this.inputForm.privateAndPublicSigns === 'G-对私') {
                            console.log('G-对私')
                            this.dialogFormVisible = true
                            this.getCurrentMonthData()
                          } else if (this.inputForm.privateAndPublicSigns === 'C-对公') {
                            console.log('G-对公')
                            this.dialogFormVisible1 = true
                            this.getCurrentMonthData()
                          } else if (this.inputForm.privateAndPublicSigns === '全部') {
                            console.log('全部')
                            this.dialogFormVisible2 = true
                            this.getCurrentMonthData()
                          }
                        }
                      } else {
                        console.log('就走这里0')
                        if (this.inputForm.privateAndPublicSigns === 'G-对私') {
                          console.log('G-对私')
                          this.dialogFormVisible = true
                          this.getCurrentMonthData()
                        } else if (this.inputForm.privateAndPublicSigns === 'C-对公') {
                          console.log('G-对公')
                          this.dialogFormVisible1 = true
                          this.getCurrentMonthData()
                        } else if (this.inputForm.privateAndPublicSigns === '全部') {
                          console.log('全部')
                          this.dialogFormVisible2 = true
                          this.getCurrentMonthData()
                        }
                      }
                    })
                } else {
                  console.log('就走这里1')
                  if (this.inputForm.privateAndPublicSigns === 'G-对私') {
                    console.log('G-对私')
                    this.dialogFormVisible = true
                    this.getCurrentMonthData()
                  } else if (this.inputForm.privateAndPublicSigns === 'C-对公') {
                    console.log('G-对公')
                    this.dialogFormVisible1 = true
                    this.getCurrentMonthData()
                  } else if (this.inputForm.privateAndPublicSigns === '全部') {
                    console.log('全部')
                    this.dialogFormVisible2 = true
                    this.getCurrentMonthData()
                  }
                }
              } else {
                console.log('就走这里2')
                if (this.inputForm.privateAndPublicSigns === 'G-对私') {
                  console.log('G-对私')
                  this.dialogFormVisible = true
                  this.getCurrentMonthData()
                } else if (this.inputForm.privateAndPublicSigns === 'C-对公') {
                  console.log('G-对公')
                  this.dialogFormVisible1 = true
                  this.getCurrentMonthData()
                } else if (this.inputForm.privateAndPublicSigns === '全部') {
                  console.log('全部')
                  this.dialogFormVisible2 = true
                  this.getCurrentMonthData()
                }
              }
            })
        }
      })
      this.active = 0
      this.active1 = 0
      this.active2 = 0
      this.active3 = 0
      this.active4 = 0
      this.active5 = 0
    //   this.strM = this.inputForm.inputFormM.slice(0, 2)
    //   this.strYM = this.inputForm.inputFormY + this.strM
    //   this.GCType = this.inputForm.privateAndPublicSigns.slice(0, 1)
    //
    //   const params = { 'pageNum': this.pageNum, 'pageSize': this.pageSize, 'accdate': this.strYM, 'GCType': this.GCType }
    //   this.$http(this.$reportMngApi.queryschedulingDetailsInfo, params) // 此处调用自己的Api接口方法
    //     .then(
    //       res => {
    //         const resdata = res.data.data
    //         console.log(resdata.data)
    //         console.log(resdata.data.PageInfo.total)
    //         if (resdata.data.PageInfo.total > 0) {
    //           this.$message({
    //             showClose: true,
    //             message: '已存在排班数据!',
    //             type: 'warning'
    //           })
    //         } else {
    //           this.strM = this.inputForm.inputFormM.slice(0, 2)
    //           this.strYM = this.inputForm.inputFormY + this.strM
    //           console.log('strYM----------------->' + this.strYM)
    //           const params = { 'pageNum': this.pageNum, 'pageSize': this.pageSize, 'accdate': this.strYM, 'GCType': this.GCType }
    //           this.$http(this.$reportMngApi.schedulingDetailsInsert, params) // 此处调用自己的Api接口方法
    //             .then(
    //               res => {
    //                 const resdata = res.data.data
    //                 console.log(res.data)
    //                 console.log(resdata)
    //                 if (resdata.code === 'SUCCESS') {
    //                   if (resdata.data.TrxCode === '000000') {
    //                     this.$message({
    //                       showClose: true,
    //                       message: '排班成功!',
    //                       type: 'warning'
    //                     })
    //                   } else {
    //                     this.$message({
    //                       showClose: true,
    //                       message: '错误信息 : ' + resdata.data.TrxMessage,
    //                       type: 'warning'
    //                     })
    //                   }
    //                 } else {
    //                   this.$message({
    //                     showClose: true,
    //                     message: '错误信息 : ' + resdata.data.message,
    //                     type: 'warning'
    //                   })
    //                 }
    //               },
    //               error => {
    //                 console.log(error)
    //               }
    //             )
    //         }
    //       }
    //     )
    },
    getCurrentMonthData() { // 同步上月授权信息
      this.strM = this.inputForm.inputFormM.slice(0, 2)
      if (this.strM !== '01') {
        if (parseInt(this.strM) - 1 < 10) {
          this.intM = '0' + (parseInt(this.strM) - 1)
        }
      } else {
        this.intM = 12
      }
      this.strYM = this.inputForm.inputFormY + this.intM
      console.log(this.strYM)
      const map = {
        'month': this.strYM
      }
      const params = { 'ruleForm': JSON.stringify(map) }
      const url = this.$pbAuthInfoApi.getPbAuthYwNumInfo
      this.$http(url, params).then( // 通讯后台修改数据库中信息
        res => {
          const _data = res.data
          // console.log('@@@@@提交返回 ：' + JSON.stringify(res.data))
          // 赋值
          if (_data.code === 'SUCCESS') {
            if (_data.data.TrxCode === '000000') {
              this.active = 1
              this.active1 = 1
              this.active2 = 1
              this.jumpToST()
              //
            } else {
              this.$message.error('错误信息 ： ' + _data.data.TrxMessage)
            }
          } else {
            this.$message.error('错误信息 ： ' + _data.message)
          }
        })
    },
    jumpToST() { // 预估下月授权信息
      this.strM = this.inputForm.inputFormM.slice(0, 2)
      if (this.strM !== '01') {
        if (parseInt(this.strM) - 1 < 10) {
          this.intM = '0' + (parseInt(this.strM) - 1)
        }
      } else {
        this.intM = 12
      }
      console.log(this.intM)
      const map = {
        'currentMonth': this.strM,
        'lastMonth': this.intM
      }
      const params = { 'ruleForm': JSON.stringify(map) }
      const url = this.$pbAuthInfoApi.NextMothAuthYwInfoMaking
      this.$http(url, params).then( // 通讯后台修改数据库中信息
        res => {
          const _data = res.data
          // console.log('@@@@@提交返回 ：' + JSON.stringify(res.data))
          // 赋值
          if (_data.code === 'SUCCESS') {
            if (_data.data.TrxCode === '000000') {
              console.log('预估下月授权信息成功！！！！！！！！！！')
              if (this.inputForm.privateAndPublicSigns === 'G-对私' || this.inputForm.privateAndPublicSigns === '全部') {
                this.PbStartingG()
                this.active = 2
                this.active1 = 2
                this.active2 = 2
                this.active3 = 2
                this.active4 = 2
                this.active5 = 2
              } else if (this.inputForm.privateAndPublicSigns === 'C-对公') {
                this.PbStartingC()
                this.active = 2
                this.active1 = 2
                this.active2 = 2
                this.active3 = 2
                this.active4 = 2
                this.active5 = 2
              }
              //
            } else {
              console.log('预估下月授权信息失败1！！！！！！！！！！')
              this.$message.error('错误信息 ： ' + _data.data.TrxMessage)
            }
          } else {
            console.log('预估下月授权信息失败2！！！！！！！！！！')
            this.$message.error('错误信息 ： ' + _data.message)
          }
        })
    },
    PbStartingG() { // 排班-个人
      console.log('插入个人数据')
      const map = {
        'year': this.inputForm.inputFormY,
        'month': this.strM = this.inputForm.inputFormM.slice(0, 2),
        'cgFlag': 'G'
      }
      console.log('year---------->' + map.year)
      console.log('month---------->' + map.month)
      console.log('cgFlag---------->' + map.cgFlag)
      const params = { 'ruleForm': JSON.stringify(map) }
      const url = this.$pbAuthInfoApi.pb_starting_GandC
      this.$http(url, params).then( // 通讯后台修改数据库中信息
        res => {
          const _data = res.data
          // console.log('@@@@@提交返回 ：' + JSON.stringify(res.data))
          // 赋值
          if (_data.code === 'SUCCESS') {
            if (_data.data.TrxCode === '000000') {
              console.log('插入个人数据成功')
              if (this.inputForm.privateAndPublicSigns === '全部') {
                this.PbStartingC()
              } else {
                this.active = 3
                this.active1 = 3
                this.active2 = 3
                this.active3 = 3
                this.active4 = 3
                this.active5 = 3
                this.query()
              }
              //
            } else {
              this.$message.error('错误信息 ： ' + _data.data.TrxMessage)
            }
          } else {
            this.$message.error('错误信息 ： ' + _data.message)
          }
        })
    },
    PbStartingC() { // 排班-对公
      console.log('插入对公数据')
      const map = {
        'year': this.inputForm.inputFormY,
        'month': this.strM = this.inputForm.inputFormM.slice(0, 2),
        'cgFlag': 'C'
      }
      console.log('year---------->' + map.year)
      console.log('month---------->' + map.month)
      const params = { 'ruleForm': JSON.stringify(map) }
      const url = this.$pbAuthInfoApi.pb_starting_GandC
      this.$http(url, params).then( // 通讯后台修改数据库中信息
        res => {
          const _data = res.data
          // console.log('@@@@@提交返回 ：' + JSON.stringify(res.data))
          // 赋值
          if (_data.code === 'SUCCESS') {
            if (_data.data.TrxCode === '000000') {
              console.log('插入个人数据成功')
              this.active = 3
              this.active1 = 3
              this.active2 = 4
              this.active3 = 3
              this.active4 = 3
              this.active5 = 4
              this.query()
              //
            } else {
              this.$message.error('错误信息 ： ' + _data.data.TrxMessage)
            }
          } else {
            this.$message.error('错误信息 ： ' + _data.message)
          }
        })
    },
    query: function() { // 查询
      this.strM = this.inputForm.inputFormM.slice(0, 2)
      this.strYM = this.inputForm.inputFormY + this.strM
      console.log('strYM----------------->' + this.strYM)
      if (this.inputForm.privateAndPublicSigns === '全部') {
        this.GCType = ''
      } else {
        this.GCType = this.inputForm.privateAndPublicSigns.slice(0, 1)
      }
      console.log('GCType----------------->' + this.GCType)
      const params = { 'pageNum': this.pageNum, 'pageSize': this.pageSize, 'accdate': this.strYM, 'GCType': this.GCType }
      this.$http(this.$reportMngApi.queryschedulingDetailsInfo, params) // 此处调用自己的Api接口方法
        .then(
          res => {
            const resdata = res.data.data
            console.log(resdata.data)
            console.log(resdata.data.PageInfo.list)
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
                          this.styleXJ = resdata.data.PageInfo.list[7].color // 休假字体颜色
                          this.styleWB = resdata.data.PageInfo.list[8].color // 休假字体颜色
                        }
                      }
                    },
                    error => {
                      console.log(error)
                    }
                  )
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
    fullScreen() { // 需要安装依赖:npm i --save screenfull
      if (!screenfull.enabled) {
        this.$message({
          message: 'you browser can not work',
          type: 'warning'
        })
        return false
      }
      const mainTable = document.querySelector('#content')
      screenfull.toggle(mainTable)
    },
    handleSelectionChange(val) { // 选中表格数据
      this.val = val
      console.log(this.val)
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
      this.$router.push('/work/T2001')
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
