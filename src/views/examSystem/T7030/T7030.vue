<template>
  <el-main>
    <div>
      <el-row>
        <el-col :span="20" :offset="2">
          <el-form
            ref="ruleForm3"
            :model="ruleForm3"
            :rules="rules3"
            class="demo-form-inline"
            label-width="100px"
            size="small">
            <div>
              <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
                <el-tab-pane label="单选题" name="singleSelect"/>
                <el-tab-pane label="多选题" name="lotSelect"/>
                <el-tab-pane label="判断题" name="judging"/>
              </el-tabs>
              <div v-if="tabType == 1">
                <el-row>
                  <el-col width="40%">
                    <vxe-table
                      key="DuxTable"
                      ref="DuxTable"
                      :data="tableDataDuX"
                      height="300"
                      size="mini"
                      align="center"
                      resizable
                      border
                      highlight-hover-row
                      highlight-current-row
                      highlight-hover-column
                      highlight-current-column>
                      <vxe-table-column field="dux_Type" title="业务类型" width="auto" sortable/>
                      <vxe-table-column field="dux_TmNr" title="题目内容" width="auto" />
                      <vxe-table-column field="dux_XxA" title="选项A" width="auto" />
                      <vxe-table-column field="dux_XxB" title="选项B" width="auto" />
                      <vxe-table-column field="dux_XxC" title="选项C" width="auto" />
                      <vxe-table-column field="dux_XxD" title="选项D" width="auto" />
                      <vxe-table-column field="dux_XxE" title="选项E" width="auto" />
                      <vxe-table-column field="dux_TmDan" title="题目答案" width="auto" />
                      <vxe-table-column field="dux_TmNd" title="难度" width="auto" />
                      <vxe-table-column field="dux_Bz" title="备注" width="auto" />
                    </vxe-table>
                  </el-col>
                </el-row>
              </div>
              <div v-if="tabType == 0">
                <el-row>
                  <el-col width="40%">
                    <vxe-table
                      key="DxTable"
                      ref="DxTable"
                      :data="tableDataDX"
                      height="300"
                      size="mini"
                      align="center"
                      resizable
                      border
                      highlight-hover-row
                      highlight-current-row
                      highlight-hover-column
                      highlight-current-column>
                      <vxe-table-column field="dx_Type" title="业务类型" width="auto" sortable/>
                      <vxe-table-column field="dx_TmNr" title="题目内容" width="auto" />
                      <vxe-table-column field="dx_XxA" title="选项A" width="auto" />
                      <vxe-table-column field="dx_XxB" title="选项B" width="auto" />
                      <vxe-table-column field="dx_XxC" title="选项C" width="auto" />
                      <vxe-table-column field="dx_XxD" title="选项D" width="auto" />
                      <vxe-table-column field="dx_XxE" title="选项E" width="auto" />
                      <vxe-table-column field="dx_TmDan" title="题目答案" width="auto" />
                      <vxe-table-column field="dx_TmNd" title="难度" width="auto" />
                      <vxe-table-column field="dx_Bz" title="备注" width="auto" />
                    </vxe-table>
                  </el-col>
                </el-row>
              </div>
              <div v-if="tabType == 2">
                <el-row>
                  <el-col width="40%">
                    <vxe-table
                      key="PdTable"
                      ref="PdTable"
                      :data="tableDataPd"
                      height="300"
                      size="mini"
                      align="center"
                      resizable
                      border
                      highlight-hover-row
                      highlight-current-row
                      highlight-hover-column
                      highlight-current-column>
                      <vxe-table-column field="Pdx_Type" title="业务类型" width="auto" sortable/>
                      <vxe-table-column field="Pdx_TmNr" title="题目内容" width="auto" />
                      <vxe-table-column field="Pdx_TmDan" title="题目答案" width="auto" />
                      <vxe-table-column field="Pdx_TmNd" title="难度" width="auto" />
                      <vxe-table-column field="Pdx_Bz" title="备注" width="auto" />
                    </vxe-table>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-form>
        </el-col>
      </el-row>
      <br>
      <el-row type="flex" justify="space-between" class="divClass703001">
        <el-col :span="12" :offset="2" class="colClass703001">
          <el-form
            ref="ruleForm2"
            :model="ruleForm2"
            :rules="rules2"
            size="small">
            <el-form-item>
              <el-input :disabled="true" v-model="ruleForm2.dRPathName" clearable/>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="3" class="colClass703002">
          <input-excel v-if="DrButton" @getResult="getMyExcelData"/>
        </el-col>
        <el-col :span="10" class="colClass703003">
          <el-button v-if="startDrButton" size="small" type="primary" @click="startDr()">{{ '开始导入' }}</el-button>
          <el-button v-if="cancelDrButton" size="small" type="primary" @click="canCelDr()">{{ '删除' }}</el-button>
        </el-col>
      </el-row>
    </div>
    <br>
    <div class="divClass703002">
      <el-form
        ref="ruleForm1"
        :model="ruleForm1"
        :rules="rules1"
        label-width="100px"
        size="small">
        <el-row type="flex" justify="start" class="rowClass703001">
          <el-col :span="7">
            <el-form-item label="单选题目：" prop="dXTm">
              <el-input :disabled="true" v-model="ruleForm1.dXTm" clearable>
              <span slot="suffix">道</span></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="多选题目：">
              <el-input :disabled="true" v-model="ruleForm1.duXTm" clearable>
              <span slot="suffix">道</span></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="判断题目：">
              <el-input :disabled="true" v-model="ruleForm1.PdTm" clearable>
              <span slot="suffix">道</span></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="start">
          <el-col :span="7">
            <el-form-item label="单选分值：" prop="dxFZ">
              <el-input v-model="ruleForm1.dxFZ" clearable>
              <span slot="suffix">分</span></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="多选分值：" prop="duoXFz">
              <el-input v-model="ruleForm1.duoXFz" clearable>
              <span slot="suffix">分</span></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="判断分值：" prop="pdFz">
              <el-input v-model="ruleForm1.pdFz" clearable>
              <span slot="suffix">分</span></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="start">
          <el-col :span="7">
            <el-form-item label="总分数：">
              <el-input :disabled="true" v-model="ruleForm1.Zfs" clearable>
              <span slot="suffix">分</span></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <br>
    <el-row>
      <el-col :span="22" align="right">
        <el-button :disabled="disabledBc" size="small" type="primary" @click="submitForm()">{{ '保存' }}</el-button>
        <el-button size="small" type="primary" @click="exitTrade()">{{ '退出' }}</el-button>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
import inputExcel from './TinputExcel'
export default {
  name: 'T7030',
  components: {
    inputExcel
  },
  props: {
    fromfather7006: {
      type: Array,
      default: null
    }
  },
  data: function() {
    const validateDx_fz = (rule, value, callback) => {
      if (value !== '') {
        const DxHjFz = parseInt(this.ruleForm1.dXTm) * parseInt(this.ruleForm1.dxFZ)
        const DuxHjFz = parseInt(this.ruleForm1.duXTm) * parseInt(this.ruleForm1.duoXFz)
        const PdHjFz = parseInt(this.ruleForm1.PdTm) * parseInt(this.ruleForm1.pdFz)
        this.ruleForm1.Zfs = parseInt(DxHjFz) + parseInt(DuxHjFz) + parseInt(PdHjFz)
        return
      } else {
        callback()
      }
    }
    const validateDux_fz = (rule, value, callback) => {
      if (value !== '') {
        const DxHjFz = parseInt(this.ruleForm1.dXTm) * parseInt(this.ruleForm1.dxFZ)
        const DuxHjFz = parseInt(this.ruleForm1.duXTm) * parseInt(this.ruleForm1.duoXFz)
        const PdHjFz = parseInt(this.ruleForm1.PdTm) * parseInt(this.ruleForm1.pdFz)
        this.ruleForm1.Zfs = parseInt(DxHjFz) + parseInt(DuxHjFz) + parseInt(PdHjFz)
        return
      } else {
        callback()
      }
    }
    const validatePd_fz = (rule, value, callback) => {
      if (value !== '') {
        const DxHjFz = parseInt(this.ruleForm1.dXTm) * parseInt(this.ruleForm1.dxFZ)
        const DuxHjFz = parseInt(this.ruleForm1.duXTm) * parseInt(this.ruleForm1.duoXFz)
        const PdHjFz = parseInt(this.ruleForm1.PdTm) * parseInt(this.ruleForm1.pdFz)
        this.ruleForm1.Zfs = parseInt(DxHjFz) + parseInt(DuxHjFz) + parseInt(PdHjFz)
        return
      } else {
        callback()
      }
    }
    return {
      disabledBc: false,
      PLANSEQ: '',
      activeName: 'singleSelect',
      tabType: 0,
      DrButton: true,
      startDrButton: false,
      cancelDrButton: false,
      tableDataDX: [], // 单选表格
      tableDataDuX: [], // 多选表格
      tableDataPd: [], // 判断表格
      dRExcelDate: [],
      persionList: [],
      planTestInfoListMap: [],
      ruleForm1: { // 弹框表单
        dXTm: '', // 单选题目
        duXTm: '', // 多选题目
        PdTm: '', // 判断题目
        dxFZ: '', // 单选分值
        duoXFz: '', // 多选分值
        pdFz: '', // 判断分值
        Zfs: '' // 总分数
      },
      rules1: { // 表单校验
        dxFZ: [
          { required: true, message: '请输入单选分值', trigger: 'blur' },
          { trigger: 'blur', validator: validateDx_fz }
        ],
        duoXFz: [
          { required: true, message: '请输入多选分值', trigger: 'blur' },
          { trigger: 'blur', validator: validateDux_fz }
        ],
        pdFz: [
          { required: true, message: '请输入判断分值', trigger: 'blur' },
          { trigger: 'blur', validator: validatePd_fz }
        ]
      },
      ruleForm2: { // 弹框表单
        dRPathName: '' // 导入路径名称
      },
      rules2: { // 表单校验
      },
      ruleForm3: { // 弹框表单
      },
      rules3: { // 表单校验
      },
      ValueFromFather7006: [],
      CurrentUserNo: '', // 初始化-当前柜员号
      CurrentUserName: '', // 初始化-当前柜员名称
      CurrentBranchNo: '', // 初始化-当前机构号
      CurrentBranchName: '', // 初始化-当前机构名称
      CurrentZoneNo: '', // 初始化-当前地区号
      CurrentSystemDate: '', // 初始化-当前系统日期
      CurrentSystemTime: '', // 当前系统时间
      validRules: {},
      orgOptions: {}
    }
  },
  mounted() {
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
            console.log('tradeINit-end--' + this.CurrentUserNo)
          })
    }
    this.ruleForm1.dxFZ = 0
    this.ruleForm1.duoXFz = 0
    this.ruleForm1.pdFz = 0
  },
  created() {
    this.ValueFromFather7006 = this.fromfather7006
    console.log('7030Created:' + JSON.stringify(this.ValueFromFather7006))
    this.persionList = this.ValueFromFather7006[0].persionList
    this.PLANSEQ = this.ValueFromFather7006[0].PLANSEQ
  },
  methods: {
    handleClick(tab, e) {
      const list = this.dRExcelDate
      this.tabType = tab.index
      var _val = tab.index
      console.log(_val)
      console.log('list：' + JSON.stringify(list))
      if (_val === '0') { // 单选
        this.tabType = '0'
        this.activeName = 'singleSelect'
        this.tableDataDuX = []
        this.tableDataPd = []
        for (let i = 0; i < list.length; i++) {
          const TmType = list[i].题目类型.split('-')[0] // 题目类型
          if (TmType === '01') { // 单选
            this.tableDataDX.push({
              dx_Type: list[i].题目类型,
              dx_TmNr: list[i].题目,
              dx_XxA: list[i].选项A,
              dx_XxB: list[i].选项B,
              dx_XxC: list[i].选项C,
              dx_XxD: list[i].选项D,
              dx_XxE: list[i].选项E,
              dx_TmDan: list[i].答案,
              dx_TmNd: list[i].难度,
              dx_Bz: list[i].备注
            })
          }
        }
      } else if (_val === '1') { // 多选
        this.tabType = '1'
        this.activeName = 'lotSelect'
        this.tableDataDX = []
        this.tableDataPd = []
        for (let i = 0; i < list.length; i++) {
          const TmType = list[i].题目类型.split('-')[0] // 题目类型
          if (TmType === '02') { // 多选
            this.tableDataDuX.push({
              dux_Type: list[i].题目类型,
              dux_TmNr: list[i].题目,
              dux_XxA: list[i].选项A,
              dux_XxB: list[i].选项B,
              dux_XxC: list[i].选项C,
              dux_XxD: list[i].选项D,
              dux_XxE: list[i].选项E,
              dux_TmDan: list[i].答案,
              dux_TmNd: list[i].难度,
              dux_Bz: list[i].备注
            })
          }
        }
      } else { // 判断
        this.tabType = '2'
        this.activeName = 'judging'
        this.tableDataDX = []
        this.tableDataDuX = []
        for (let i = 0; i < list.length; i++) {
          const TmType = list[i].题目类型.split('-')[0] // 题目类型
          if (TmType === '03') { // 判断
            this.tableDataPd.push({
              Pdx_Type: list[i].题目类型,
              Pdx_TmNr: list[i].题目,
              Pdx_TmDan: list[i].答案,
              Pdx_TmNd: list[i].难度,
              Pdx_Bz: list[i].备注
            })
          }
        }
      }
    },
    exitTrade() { // 交易退出返回首页
      this.$emit('sendmsgExit', 'Exit7030')
    },
    getMyExcelData(data, name1) {
      // 处理你的数据
      this.data = data
      this.name = name1
      this.ruleForm2.dRPathName = name1
      this.dRExcelDate = data
      this.DrButton = false
      this.startDrButton = true
      this.cancelDrButton = true
    },
    startDr() {
      // startDrFunction(this.dRExcelDate, this.tabType, this)
      const list = this.dRExcelDate
      const listDuX = []
      const listPd = []
      for (let i = 0; i < list.length; i++) {
        const TmType = list[i].题目类型.split('-')[0] // 题目类型
        if (TmType === '01') { // 单选
          this.tableDataDX.push({
            dx_Type: list[i].题目类型,
            dx_TmNr: list[i].题目,
            dx_XxA: list[i].选项A,
            dx_XxB: list[i].选项B,
            dx_XxC: list[i].选项C,
            dx_XxD: list[i].选项D,
            dx_XxE: list[i].选项E,
            dx_TmDan: list[i].答案,
            dx_TmNd: list[i].难度,
            dx_Bz: list[i].备注
          })
        } else if (TmType === '02') { // 多选
          listDuX.push({
            dux_Type: list[i].题目类型,
            dux_TmNr: list[i].题目,
            dux_XxA: list[i].选项A,
            dux_XxB: list[i].选项B,
            dux_XxC: list[i].选项C,
            dux_XxD: list[i].选项D,
            dux_XxE: list[i].选项E,
            dux_TmDan: list[i].答案,
            dux_TmNd: list[i].难度,
            dux_Bz: list[i].备注
          })
        } else if (TmType === '03') { // 判断
          listPd.push({
            Pdx_Type: list[i].题目类型,
            Pdx_TmNr: list[i].题目,
            Pdx_TmDan: list[i].答案,
            Pdx_TmNd: list[i].难度,
            Pdx_Bz: list[i].备注
          })
        }
      }
      this.ruleForm1.dXTm = this.tableDataDX.length
      this.ruleForm1.duXTm = listDuX.length
      this.ruleForm1.PdTm = listPd.length
      this.ruleForm2.dRPathName = this.ruleForm2.dRPathName + ' 导入成功。'
      this.startDrButton = false
      this.cancelDrButton = false
    },
    canCelDr() { // 取消导入
      this.ruleForm2.dRPathName = ''
      this.dRExcelDate = []
      this.DrButton = true
      this.startDrButton = false
      this.cancelDrButton = false
    },
    submitForm() { // 保存
      this.disabledBc = true
      const result = this.dRExcelDate
      if (result !== null && result.length > 0) {
        const map = { 'result': result }
        const params = { 'ruleForm': JSON.stringify(map) }
        const url = this.$examSystemMngApi.insertEFS_EXAM_BUSIQUESTION
        this.$http(url, params).then( // 通讯后台修改数据库中信息
          res => {
            const _data = res.data
            if (_data.code === 'SUCCESS') {
              if (_data.data.TrxCode === '000000') {
                const returnListMap = _data.data.returnListMap
                const planTestInfoListMap = []
                for (let i = 0; i < this.persionList.length; i++) {
                  const zoneno = this.persionList[i].ZONENO
                  const brno = this.persionList[i].BRNO
                  const tlrno = this.persionList[i].TLRNO
                  const tlrname = this.persionList[i].TLRNAME
                  for (let j = 0; j < returnListMap.length; j++) {
                    const record1 = []
                    let SCORE = ''
                    if (returnListMap[j].题目类型 === '01-单选') { // 单选
                      SCORE = this.ruleForm1.dxFZ
                    } else if (returnListMap[j].题目类型 === '02-多选') { // 多选
                      SCORE = this.ruleForm1.duoXFz
                    } else if (returnListMap[j].题目类型 === '03-判断') { // 判断
                      SCORE = this.ruleForm1.pdFz
                    }
                    record1.push({
                      EXAMID: this.PLANSEQ,
                      ZONENO: zoneno,
                      BRNO: brno,
                      TLRNO: tlrno,
                      TLRNAME: tlrname,
                      ID: returnListMap[j].id,
                      EXAMANSWER: returnListMap[j].answer,
                      SCORE: SCORE
                    })
                    planTestInfoListMap.push(...record1)
                  }
                }
                console.log('_planTestInfoListMap_7030:' + JSON.stringify(planTestInfoListMap))
                // this.messageSuccess('业务知识题库登记成功!')
                this.$emit('sendmsgList', planTestInfoListMap)
                this.$emit('sendmsgScore', this.ruleForm1.Zfs + '')
                this.exitTrade()
              } else {
                this.messageError('错误信息 ： ' + _data.data.TrxMessage)
                return
              }
            } else {
              this.$message.error('错误信息 ： ' + _data.message)
            }
          })
      } else {
        this.alert('导入数据为空！')
        return
      }
    }
  }
}
</script>

<style >
.el-tabs--border-card>.el-tabs__content {
  padding: 0px;
}
.divClass703001 {
  border-top: 1px ridge    #e3e3e3;
  border-bottom: 1px ridge   #e3e3e3;
  border-left: 1px ridge   #e3e3e3;
  border-right: 1px ridge    #e3e3e3;
  width: 83%;
  margin-left: 8.5%;
}
.divClass703002 {
  border-top: 1px solid #e3e3e3;
  border-bottom: 1px solid #e3e3e3;
  border-left: 1px solid #e3e3e3;
  border-right: 1px solid #e3e3e3;
  width: 83%;
  margin-left: 8.5%;
}
.colClass703001{
 margin-top: 10px;
}
.colClass703002{
  margin-top: 10px;
  margin-left: 3px;
}
.colClass703003{
  margin-top: 10px;
}
.rowClass703001{
  margin-top: 10px;
}
</style>
