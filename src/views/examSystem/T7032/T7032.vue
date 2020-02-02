<template>
  <div>
    <el-main>
      <el-row>
        <el-col>
          单选
        </el-col>
        <el-col>
          多选
        </el-col>
      </el-row>
      <el-row>
        <el-col width="40%">
          <vxe-table
            ref="DxTable"
            :data="tableDataDX"
            :edit-rules="validRules"
            :edit-config="{trigger: 'click', mode: 'cell'}"
            size="mini"
            align="center"
            resizable
            border
            highlight-hover-row
            highlight-current-row
            highlight-hover-column
            highlight-current-column
            @edit-actived="editActivedEventDX"
            @edit-closed="editClosedEventDX">
            <vxe-table-column v-if="false" field="dx_TypeNo" title="类型编号" width="auto" sortable/>
            <vxe-table-column field="dx_Type" title="类型" width="auto" sortable/>
            <vxe-table-column :edit-render="{name: 'input', autoselect: true}" field="dx_Jc" title="基础" width="auto" />
            <vxe-table-column :edit-render="{name: 'input', autoselect: true}" field="dx_Sz" title="适中" width="auto" />
            <vxe-table-column :edit-render="{name: 'input', autoselect: true}" field="dx_Kn" title="困难" width="auto" />
            <vxe-table-column :edit-render="{name: 'input', autoselect: true}" field="dx_Jn" title="极难" width="auto" />
          </vxe-table>
        </el-col>
        <el-col width="40%">
          <vxe-table
            ref="DuxTable"
            :data="tableDataDuX"
            :edit-rules="validRules"
            :edit-config="{trigger: 'click', mode: 'cell'}"
            size="mini"
            align="center"
            resizable
            border
            highlight-hover-row
            highlight-current-row
            highlight-hover-column
            highlight-current-column
            @edit-closed="editClosedEventDuX">
            <vxe-table-column v-if="false" field="dux_TypeNo" title="类型编号" width="auto" sortable/>
            <vxe-table-column field="dux_Type" title="类型" width="auto" sortable/>
            <vxe-table-column :edit-render="{name: 'input', autoselect: true}" field="dux_Jc" title="基础" width="auto" />
            <vxe-table-column :edit-render="{name: 'input', autoselect: true}" field="dux_Sz" title="适中" width="auto" />
            <vxe-table-column :edit-render="{name: 'input', autoselect: true}" field="dux_Kn" title="困难" width="auto" />
            <vxe-table-column :edit-render="{name: 'input', autoselect: true}" field="dux_Jn" title="极难" width="auto" />
          </vxe-table>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form
            ref="ruleFormDx"
            :model="ruleFormDx"
            :rules="inputRulesDx"
            label-width="80px"
            size="small">
            <el-row>
              <el-col :span="8">
                <el-form-item label="合计(题)：">
                  <el-input :disabled="true" v-model="ruleFormDx.dx_hj" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="分值：" prop="dx_fz">
                  <el-input v-model="ruleFormDx.dx_fz" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合计(分)：">
                  <el-input :disabled="true" v-model="ruleFormDx.dx_hjFz" clearable/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
        <el-col>
          <el-form
            ref="ruleFormDux"
            :model="ruleFormDux"
            :rules="inputRulesDux"
            label-width="80px"
            size="small">
            <el-row>
              <el-col :span="8">
                <el-form-item label="合计(题)：" prop="dux_hj">
                  <el-input :disabled="true" v-model="ruleFormDux.dux_hj" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="分值：" prop="dux_fz">
                  <el-input v-model="ruleFormDux.dux_fz" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合计(分)：" prop="dux_hjFz">
                  <el-input :disabled="true" v-model="ruleFormDux.dux_hjFz" clearable/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          判断
        </el-col>
      </el-row>
      <el-row>
        <el-col width="40%">
          <vxe-table
            ref="PdTable"
            :data="tableDataPd"
            :edit-rules="validRules"
            :edit-config="{trigger: 'click', mode: 'cell'}"
            size="mini"
            align="center"
            resizable
            border
            highlight-hover-row
            highlight-current-row
            highlight-hover-column
            highlight-current-column
            @edit-closed="editClosedEventPd">
            <vxe-table-column v-if="false" field="Pd_TypeNo" title="类型编号" width="auto" sortable/>
            <vxe-table-column field="Pd_Type" title="类型" width="auto" sortable/>
            <vxe-table-column :edit-render="{name: 'input', autoselect: true}" field="Pd_Jc" title="基础" width="auto" />
            <vxe-table-column :edit-render="{name: 'input', autoselect: true}" field="Pd_Sz" title="适中" width="auto" />
            <vxe-table-column :edit-render="{name: 'input', autoselect: true}" field="Pd_Kn" title="困难" width="auto" />
            <vxe-table-column :edit-render="{name: 'input', autoselect: true}" field="Pd_Jn" title="极难" width="auto" />
          </vxe-table>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form
            ref="ruleFormPd"
            :model="ruleFormPd"
            :rules="inputRulesPd"
            label-width="80px"
            size="small">
            <el-row>
              <el-col :span="8">
                <el-form-item label="合计(题)：" prop="Pd_hj">
                  <el-input :disabled="true" v-model="ruleFormPd.Pd_hj" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="分值：" prop="Pd_fz">
                  <el-input v-model="ruleFormPd.Pd_fz" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合计(分)：" prop="Pd_hjFz">
                  <el-input :disabled="true" v-model="ruleFormPd.Pd_hjFz" clearable/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
      <el-row>
        <el-form
          ref="ruleFormCL"
          :model="ruleFormHZ"
          :rules="inputRulesHZ"
          label-width="100px"
          size="small">
          <el-col :span="5">
            <el-form-item label="总分：" >
              <el-input :disabled="true" v-model="ruleFormHZ.Hz_Zf" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="考试时长：" prop="KsSc">
              <el-input v-model="ruleFormHZ.KsSc" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-button size="small" type="primary" @click="submitForm()">下一步</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-button size="small" type="primary" @click="exitTrade()">退出</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </el-main>
  </div>
</template>

<script>
export default {
  name: 'T7032',
  data: function() {
    const validateDx_fz = (rule, value, callback) => {
      if (value !== '') {
        this.ruleFormDx.dx_hjFz = parseInt(this.ruleFormDx.dx_fz) * parseInt(this.ruleFormDx.dx_hj)
        this.ruleFormHZ.Hz_Zf = parseInt(this.ruleFormDx.dx_hjFz) + parseInt(this.ruleFormDux.dux_hjFz) +
          parseInt(this.ruleFormPd.Pd_hjFz)
        return
      } else {
        callback()
      }
    }
    const validateDux_fz = (rule, value, callback) => {
      if (value !== '') {
        this.ruleFormDux.dux_hjFz = parseInt(this.ruleFormDux.dux_fz) * parseInt(this.ruleFormDux.dux_hj)
        this.ruleFormHZ.Hz_Zf = parseInt(this.ruleFormDx.dx_hjFz) + parseInt(this.ruleFormDux.dux_hjFz) +
          parseInt(this.ruleFormPd.Pd_hjFz)
        return
      } else {
        callback()
      }
    }
    const validatePd_fz = (rule, value, callback) => {
      if (value !== '') {
        this.ruleFormPd.Pd_hjFz = parseInt(this.ruleFormPd.Pd_fz) * parseInt(this.ruleFormPd.Pd_hj)
        this.ruleFormHZ.Hz_Zf = parseInt(this.ruleFormDx.dx_hjFz) + parseInt(this.ruleFormDux.dux_hjFz) +
          parseInt(this.ruleFormPd.Pd_hjFz)
        return
      } else {
        callback()
      }
    }
    return {
      CurrentUserNo: '', // 初始化-当前柜员号
      CurrentUserName: '', // 初始化-当前柜员名称
      CurrentBranchNo: '', // 初始化-当前机构号
      CurrentBranchName: '', // 初始化-当前机构名称
      CurrentZoneNo: '', // 初始化-当前地区号
      CurrentSystemDate: '', // 初始化-当前系统日期
      CurrentSystemTime: '', // 当前系统时间
      ruleFormDx: {
        dx_hj: '', // 单选_合计
        dx_fz: '', // 单选_分值
        dx_hjFz: '' // 单选_总分
      },
      ruleFormDux: {
        dux_hj: '', // 多选_合计
        dux_fz: '', // 多选_分值
        dux_hjFz: '' // 多选_总分
      },
      ruleFormPd: {
        Pd_hj: '', // 判断_合计
        Pd_fz: '', // 判断_分值
        Pd_hjFz: '' // 判断_合计分值
      },
      ruleFormHZ: {
        Hz_Zf: '', // 总分
        KsSc: '' // 考试时长
      },
      inputRulesDx: {
        dx_fz: [
          { required: true, message: '请输入数值', trigger: 'blur' },
          { trigger: 'blur', validator: validateDx_fz }
        ]
      },
      inputRulesDux: {
        dux_fz: [
          { required: true, message: '请输入分值', trigger: 'blur' },
          { trigger: 'blur', validator: validateDux_fz }
        ]
      },
      inputRulesPd: {
        Pd_fz: [
          { required: true, message: '请输入分值', trigger: 'blur' },
          { trigger: 'blur', validator: validatePd_fz }
        ]
      },
      inputRulesHZ: {
        KsSc: [
          { required: true, message: '请输入考试时长', trigger: 'change' },
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
      validRules: {
        dx_Jc: [
          { type: 'number', message: '必须为数字值' }
        ],
        dx_Sz: [
          { type: 'number', message: '必须为数字值' }
        ],
        dx_Kn: [
          { type: 'number', message: '必须为数字值' }
        ],
        dx_Jn: [
          { type: 'number', message: '必须为数字值' }
        ],
        dux_Jc: [
          { type: 'number', message: '必须为数字值' }
        ],
        dux_Sz: [
          { type: 'number', message: '必须为数字值' }
        ],
        dux_Kn: [
          { type: 'number', message: '必须为数字值' }
        ],
        dux_Jn: [
          { type: 'number', message: '必须为数字值' }
        ],
        Pd_Jc: [
          { type: 'number', message: '必须为数字值' }
        ],
        Pd_Sz: [
          { type: 'number', message: '必须为数字值' }
        ],
        Pd_Kn: [
          { type: 'number', message: '必须为数字值' }
        ],
        Pd_Jn: [
          { type: 'number', message: '必须为数字值' }
        ]
      },
      tableDataDX: [
        { dx_Type: '对私', dx_Jc: '0', dx_Sz: '0', dx_Kn: '0', dx_Jn: '0' },
        { dx_Type: '对公', dx_Jc: '0', dx_Sz: '0', dx_Kn: '0', dx_Jn: '0' },
        { dx_Type: '贷款', dx_Jc: '0', dx_Sz: '0', dx_Kn: '0', dx_Jn: '0' },
        { dx_Type: '规章制度', dx_Jc: '0', dx_Sz: '0', dx_Kn: '0', dx_Jn: '0' }
      ],
      tableDataDuX: [
        { dux_Type: '对私', dux_Jc: '0', dux_Sz: '0', dux_Kn: '0', dux_Jn: '0' },
        { dux_Type: '对公', dux_Jc: '0', dux_Sz: '0', dux_Kn: '0', dux_Jn: '0' },
        { dux_Type: '贷款', dux_Jc: '0', dux_Sz: '0', dux_Kn: '0', dux_Jn: '0' },
        { dux_Type: '规章制度', dux_Jc: '0', dux_Sz: '0', dux_Kn: '0', dux_Jn: '0' }
      ],
      tableDataPd: [
        { Pd_Type: '对私', Pd_Jc: '0', Pd_Sz: '0', Pd_Kn: '0', Pd_Jn: '0' },
        { Pd_Type: '对公', Pd_Jc: '0', Pd_Sz: '0', Pd_Kn: '0', Pd_Jn: '0' },
        { Pd_Type: '贷款', Pd_Jc: '0', Pd_Sz: '0', Pd_Kn: '0', Pd_Jn: '0' },
        { Pd_Type: '规章制度', Pd_Jc: '0', Pd_Sz: '0', Pd_Kn: '0', Pd_Jn: '0' }
      ]
    }
  },
  mounted: function() { // 初始化或跳转返回调用
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
          })
    }
    this.ruleFormDx.dx_hj = 0
    this.ruleFormDx.dx_fz = 0
    this.ruleFormDx.dx_hjFz = 0
    this.ruleFormDux.dux_hj = 0
    this.ruleFormDux.dux_fz = 0
    this.ruleFormDux.dux_hjFz = 0
    this.ruleFormPd.Pd_hj = 0
    this.ruleFormPd.Pd_fz = 0
    this.ruleFormPd.Pd_hjFz = 0
  },
  methods: {
    submitForm() {
      // validata提交后续添加
      let DataRecords_DX = ''
      let DataRecords_DuX = ''
      let DataRecords_PD = ''
      const lstMap = []
      if (this.ruleFormDx.dx_hjFz !== '0') {
        DataRecords_DX = this.$refs.DxTable.getTableData().fullData
        for (let i = 0; i < DataRecords_DX.length; i++) {
          const record1 = []
          record1.push({
            TYPE: '01',
            BUSITYPE: DataRecords_DX[i].dx_Type,
            BASICNUM: DataRecords_DX[i].dx_Jc,
            MODERATENUM: DataRecords_DX[i].dx_Sz,
            HARDNUM: DataRecords_DX[i].dx_Kn,
            HARDESTNUM: DataRecords_DX[i].dx_Jn,
            SCORE: this.ruleFormDx.dx_fz
          })
          lstMap.push(...record1)
        }
      }
      if (this.ruleFormDux.dux_hjFz !== '0') {
        DataRecords_DuX = this.$refs.DuxTable.getTableData().fullData
        for (let i = 0; i < DataRecords_DuX.length; i++) {
          const record1 = []
          record1.push({
            TYPE: '02',
            BUSITYPE: DataRecords_DuX[i].dux_Type,
            BASICNUM: DataRecords_DuX[i].dux_Jc,
            MODERATENUM: DataRecords_DuX[i].dux_Sz,
            HARDNUM: DataRecords_DuX[i].dux_Kn,
            HARDESTNUM: DataRecords_DuX[i].dux_Jn,
            SCORE: this.ruleFormDux.dux_fz
          })
          lstMap.push(...record1)
        }
      }
      if (this.ruleFormPd.Pd_hjFz !== '0') {
        DataRecords_PD = this.$refs.PdTable.getTableData().fullData
        for (let i = 0; i < DataRecords_PD.length; i++) {
          const record1 = []
          record1.push({
            TYPE: '03',
            BUSITYPE: DataRecords_PD[i].Pd_Type,
            BASICNUM: DataRecords_PD[i].Pd_Jc,
            MODERATENUM: DataRecords_PD[i].Pd_Sz,
            HARDNUM: DataRecords_PD[i].Pd_Kn,
            HARDESTNUM: DataRecords_PD[i].Pd_Jn,
            SCORE: this.ruleFormPd.Pd_fz
          })
          lstMap.push(...record1)
        }
      }
      if (lstMap === null || lstMap.length === 0) {
        this.messageError('请设置模拟考试业务范围')
        return
      } else {
        this.$router.push({
          path: this.redirect || '/T703201',
          name: 'T703201',
          params: {
            listMap1: lstMap,
            totalScore: this.ruleFormHZ.Hz_Zf,
            TestTime: this.ruleFormHZ.KsSc
          }
        })
      }
    },
    exitTrade() { // 交易退出返回首页
      this.$router.push({
        path: this.redirect || '/dashboard'
      })
    },
    editActivedEventDX({ row, column }, event) {
    },
    editClosedEventDX({ row, column }, event) {
      // console.log(`关闭 ${column.title} 列编辑1`)
      const DataRecords = this.$refs.DxTable.getTableData().fullData
      let totalNum = 0
      for (let i = 0; i < DataRecords.length; i++) {
        if (DataRecords[i].dx_Jc !== '0') {
          totalNum = totalNum + parseInt(DataRecords[i].dx_Jc)
        }
        if (DataRecords[i].dx_Sz !== '0') {
          totalNum = totalNum + parseInt(DataRecords[i].dx_Sz)
        }
        if (DataRecords[i].dx_Kn !== '0') {
          totalNum = totalNum + parseInt(DataRecords[i].dx_Kn)
        }
        if (DataRecords[i].dx_Jn !== '0') {
          totalNum = totalNum + parseInt(DataRecords[i].dx_Jn)
        }
      }
      this.ruleFormDx.dx_hj = totalNum
    },
    editClosedEventDuX({ row, column }, event) {
      const DataRecords = this.$refs.DuxTable.getTableData().fullData
      let totalNum = 0
      for (let i = 0; i < DataRecords.length; i++) {
        if (DataRecords[i].dux_Jc !== '0') {
          totalNum = totalNum + parseInt(DataRecords[i].dux_Jc)
        }
        if (DataRecords[i].dux_Sz !== '0') {
          totalNum = totalNum + parseInt(DataRecords[i].dux_Sz)
        }
        if (DataRecords[i].dux_Kn !== '0') {
          totalNum = totalNum + parseInt(DataRecords[i].dux_Kn)
        }
        if (DataRecords[i].dux_Jn !== '0') {
          totalNum = totalNum + parseInt(DataRecords[i].dux_Jn)
        }
      }
      this.ruleFormDux.dux_hj = totalNum
    },
    editClosedEventPd({ row, column }, event) {
      const DataRecords = this.$refs.PdTable.getTableData().fullData
      let totalNum = 0
      for (let i = 0; i < DataRecords.length; i++) {
        if (DataRecords[i].Pd_Jc !== '0') {
          totalNum = totalNum + parseInt(DataRecords[i].Pd_Jc)
        }
        if (DataRecords[i].Pd_Sz !== '0') {
          totalNum = totalNum + parseInt(DataRecords[i].Pd_Sz)
        }
        if (DataRecords[i].Pd_Kn !== '0') {
          totalNum = totalNum + parseInt(DataRecords[i].Pd_Kn)
        }
        if (DataRecords[i].Pd_Jn !== '0') {
          totalNum = totalNum + parseInt(DataRecords[i].Pd_Jn)
        }
      }
      this.ruleFormPd.Pd_hj = totalNum
    }
  }
}
</script>

<style scoped>
  @import "../../../styles/public.css";
  .el-col-24 {
    width: 45%;
  }
</style>
