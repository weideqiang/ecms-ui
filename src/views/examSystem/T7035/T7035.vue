<template>
  <el-main>
    <div class="divClass703501">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        size="small">
        <el-row type="flex" justify="start" class="rowClass703501">
          <el-col :span="7">
            <el-form-item label="题型：" prop="tiXing">
              <el-select v-model="ruleForm.tiXing" style="width: 80%;" placeholder="请选择" clearable>
                <el-option v-for="item in tiXings" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="难度：" prop="nanDu">
              <el-select v-model="ruleForm.nanDu" style="width: 80%;" placeholder="请选择" clearable>
                <el-option v-for="item in nanDus" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="业务类型：" prop="yeWuLeiXing">
              <el-select v-model="ruleForm.yeWuLeiXing" style="width: 80%;" placeholder="请选择" clearable>
                <el-option v-for="item in yeWuLeiXings" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="start">
          <el-col :span="7">
            <el-form-item label="题目：" prop="Tm">
              <el-input v-model="ruleForm.Tm" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="关键字：" prop="Gjz">
              <el-input v-model="ruleForm.Gjz" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="备注：" prop="Bz">
              <el-input v-model="ruleForm.Bz" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="2" :offset="1">
            <el-button size="small" type="primary" @click="query()">{{ '查询' }}</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-row type="flex" justify="start" class="rowClass703501">
      <el-col :offset="2" :span="9">
        <vxe-grid
          ref="LTable"
          :data="tableDataL"
          :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
          :select-config="{reserve: true}"
          :pager-config="tablePageL"
          :columns="tableColumnL"
          height="340px"
          size="mini"
          align="center"
          resizable
          border
          highlight-hover-row
          highlight-current-row
          highlight-hover-column
          highlight-current-column
          @cell-click="cellClickEventL"
          @select-all="selectAllEventL"
          @select-change="selectChangeEventL"
          @page-change="handlePageChangeL"/>
      </el-col>
      <el-col :span="1" :offset="1" align="middle">
        <el-button class="button703501" round size="small" type="primary" icon="el-icon-arrow-right" @click="singleRight"/>
        <el-button class="button703502" round size="small" type="primary" icon="el-icon-arrow-left" @click="singleLeft"/>
        <el-button class="button703502" round size="small" type="primary" icon="el-icon-d-arrow-right" @click="allRight"/>
        <el-button class="button703502" round size="small" type="primary" icon="el-icon-d-arrow-left" @click="allLeft"/>
      </el-col>
      <el-col :offset="1" :span="9" >
        <vxe-grid
          ref="RTable"
          :data="tableDataR"
          :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
          :select-config="{reserve: true}"
          :pager-config="tablePageR"
          :columns="tableColumnR"
          height="340px"
          size="mini"
          align="center"
          resizable
          border
          highlight-hover-row
          highlight-current-row
          highlight-hover-column
          highlight-current-column
          @cell-click="cellClickEventR"
          @select-all="selectAllEventR"
          @select-change="selectChangeEventR"
          @page-change="handlePageChangeR"/>
      </el-col>
    </el-row>
    <div class="divClass703501">
      <el-form
        ref="ruleForm1"
        :model="ruleForm1"
        :rules="rules1"
        label-width="100px"
        size="small">
        <el-row type="flex" justify="start" class="rowClass703501">
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
    <el-row class="rowClass703502">
      <el-col :span="23" align="right">
        <el-button :disabled="disabledBc" size="small" type="primary" @click="submitForm()">{{ '保存' }}</el-button>
        <el-button size="small" type="primary" @click="exitTrade()">{{ '退出' }}</el-button>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
function array_diff(a, b) { // 从一个数组移除一个数组
  for (let i = 0; i < b.length; i++) {
    for (let j = 0; j < a.length; j++) {
      if (a[j].TiHao === b[i].TiHao) {
        a.splice(j, 1)
        j = j - 1
      }
    }
  }
  return a
}
export default {
  name: 'T7035',
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
      loading: false,
      tablePageL: {
        total: 0,
        currentPage: 1,
        pageSize: 1000
      },
      tablePageR: {
        total: 0,
        currentPage: 1,
        pageSize: 1000
      },
      tableColumnL: [
        { type: 'selection', width: '5' },
        { field: 'TiHao', title: '题号', width: 'auto' },
        { field: 'TiXing', title: '题型', width: 'auto' },
        { field: 'YwLeXing', title: '业务类型', width: 'auto' },
        { field: 'NanDu', title: '难度', width: 'auto' },
        { field: 'TiGan', title: '题干', width: 'auto' },
        { field: 'DaAn', title: '答案', width: 'auto' },
        { field: 'TiHao', title: '题号', width: 'auto' }
      ],
      tableColumnR: [
        { type: 'selection', width: '5' },
        { field: 'TiHao', title: '题号', width: 'auto' },
        { field: 'TiXing', title: '题型', width: 'auto' },
        { field: 'YwLeXing', title: '业务类型', width: 'auto' },
        { field: 'NanDu', title: '难度', width: 'auto' },
        { field: 'TiGan', title: '题干', width: 'auto' },
        { field: 'DaAn', title: '答案', width: 'auto' },
        { field: 'TiHao', title: '题号', width: 'auto' }
      ],
      BusiTypeList: [
        { label: '对私', value: '01' },
        { label: '对公', value: '02' },
        { label: '贷款', value: '03' },
        { label: '中间业务', value: '04' },
        { label: '规章制度', value: '05' }
      ],
      TypeList: [
        { label: '单选', value: '01' },
        { label: '复选', value: '02' },
        { label: '判断', value: '03' },
        { label: '问答', value: '04' }
      ],
      LvlList: [
        { label: '基础', value: '1' },
        { label: '适中', value: '2' },
        { label: '困难', value: '3' },
        { label: '极难', value: '4' }
      ],
      ruleForm: {
        Tm: '', // 题目
        Gjz: '', // 关键字
        Bz: '', // 备注
        tiXing: '', // 题型
        nanDu: '', // 难度
        yeWuLeiXing: '' // 业务类型
      },
      rules: { // 表单校验
        tiXing: [
          { required: true, message: '请选择题型', trigger: 'change' }
        ],
        nanDu: [
          { required: false, message: '请选择难度', trigger: 'change' }
        ],
        yeWuLeiXing: [
          { required: true, message: '请选择业务类型', trigger: 'change' }
        ]
      },
      ruleForm1: {
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
      validRules: {
      },
      ruleForm2: {
      },
      rules2: { // 表单校验
      },
      CurrentUserNo: '', // 初始化-当前柜员号
      CurrentUserName: '', // 初始化-当前柜员名称
      CurrentBranchNo: '', // 初始化-当前机构号
      CurrentBranchName: '', // 初始化-当前机构名称
      CurrentZoneNo: '', // 初始化-当前地区号
      CurrentSystemDate: '', // 初始化-当前系统日期
      CurrentSystemTime: '', // 当前系统时间
      tiXings: this.$combo.tiXing,
      nanDus: this.$combo.nanDu,
      yeWuLeiXings: this.$combo.yeWuLeiXing,
      persionList: [], // 学员信息
      PLANSEQ: '',
      tableDataL: [], // 未分配题库信息
      tableDataR: [], // 已分配题库信息
      tableLSelected_S: [], // 选中的左侧数据
      tableRSelected_S: [], // 选中的右侧数据
      tableLSelected_A: [], // 选中的左侧数据
      tableRSelected_A: [] // 选中的右侧数据
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
    console.log('7035Created:' + JSON.stringify(this.ValueFromFather7006))
    this.persionList = this.ValueFromFather7006[0].persionList
    this.PLANSEQ = this.ValueFromFather7006[0].PLANSEQ
  },
  methods: {
    singleRight() { // 右移
      this.tableDataR.push(...this.tableLSelected_S)
      this.tableDataL = array_diff(this.tableDataL, this.tableDataR)
      this.tablePageL.total = this.tablePageL.total - this.tableDataR.length
      this.tablePageR.total = this.tableDataR.length
      let totalNumDx = 0
      let totalNumDux = 0
      let totalNumPd = 0
      for (let i = 0; i < this.tableDataR.length; i++) {
        const TiXing = this.tableDataR[i].TiXing
        if (TiXing === '单选') {
          totalNumDx = totalNumDx + 1
        } else if (TiXing === '多选') {
          totalNumDux = totalNumDux + 1
        } else if (TiXing === '判断') {
          totalNumPd = totalNumPd + 1
        }
      }
      this.ruleForm1.dXTm = totalNumDx
      this.ruleForm1.duXTm = totalNumDux
      this.ruleForm1.PdTm = totalNumPd
    },
    allRight() { // 右移-全部
      if (this.tableLSelected_A.length !== this.tablePageL.total &&
        this.tableLSelected_A.length !== this.tablePageL.pageSize) {
        this.messageError('请先勾选表格全部记录！')
        return
      } else {
        this.tableDataR = []
        this.tableDataR = this.tableLSelected_A
        this.tableDataL = []
        this.tablePageL.total = 0
        this.tablePageR.total = this.tableDataR.length
        let totalNumDx = 0
        let totalNumDux = 0
        let totalNumPd = 0
        for (let i = 0; i < this.tableDataR.length; i++) {
          const TiXing = this.tableDataR[i].TiXing
          if (TiXing === '单选') {
            totalNumDx = totalNumDx + 1
          } else if (TiXing === '多选') {
            totalNumDux = totalNumDux + 1
          } else if (TiXing === '判断') {
            totalNumPd = totalNumPd + 1
          }
        }
        this.ruleForm1.dXTm = totalNumDx
        this.ruleForm1.duXTm = totalNumDux
        this.ruleForm1.PdTm = totalNumPd
      }
    },
    singleLeft() { // 左移
      this.tableDataL.push(...this.tableRSelected_S)
      this.tableDataR = array_diff(this.tableDataR, this.tableDataL)
      this.tablePageR.total = this.tablePageR.total - this.tableDataL.length
      this.tablePageL.total = this.tableDataL.length
      let totalNumDx = 0
      let totalNumDux = 0
      let totalNumPd = 0
      for (let i = 0; i < this.tableDataR.length; i++) {
        const TiXing = this.tableDataR[i].TiXing
        if (TiXing === '单选') {
          totalNumDx = totalNumDx + 1
        } else if (TiXing === '多选') {
          totalNumDux = totalNumDux + 1
        } else if (TiXing === '判断') {
          totalNumPd = totalNumPd + 1
        }
      }
      this.ruleForm1.dXTm = totalNumDx
      this.ruleForm1.duXTm = totalNumDux
      this.ruleForm1.PdTm = totalNumPd
    },
    allLeft() { // 左移-全部
      if (this.tableRSelected_A.length !== this.tablePageR.total &&
        this.tableLSelected_A.length !== this.tablePageR.pageSize) {
        this.messageError('请先勾选表格全部记录！')
        return
      } else {
        this.tableDataL = []
        this.tableDataL = this.tableRSelected_A
        this.tableDataR = []
        this.tablePageR.total = 0
        this.tablePageL.total = this.tableDataL.length
        let totalNumDx = 0
        let totalNumDux = 0
        let totalNumPd = 0
        for (let i = 0; i < this.tableDataR.length; i++) {
          const TiXing = this.tableDataR[i].TiXing
          if (TiXing === '单选') {
            totalNumDx = totalNumDx + 1
          } else if (TiXing === '多选') {
            totalNumDux = totalNumDux + 1
          } else if (TiXing === '判断') {
            totalNumPd = totalNumPd + 1
          }
        }
        this.ruleForm1.dXTm = totalNumDx
        this.ruleForm1.duXTm = totalNumDux
        this.ruleForm1.PdTm = totalNumPd
      }
    },
    cellClickEventL() {
      // console.log('L单元格点击事件')
    },
    selectAllEventL({ checked }) {
      this.tableLSelected_A = this.$refs.LTable.getSelectRecords()
    },
    selectChangeEventL({ checked, row }) {
      this.tableLSelected_S = this.$refs.LTable.getSelectRecords()
    },
    cellClickEventR() {
      console.log('R单元格点击事件')
    },
    selectAllEventR({ checked }) {
      this.tableRSelected_A = this.$refs.RTable.getSelectRecords()
    },
    selectChangeEventR({ checked, row }) {
      this.tableRSelected_S = this.$refs.RTable.getSelectRecords()
    },
    query() {
      const map = { 'type': this.ruleForm.tiXing, 'busitype': this.ruleForm.yeWuLeiXing,
        'lvl': this.ruleForm.nanDu, 'title': this.ruleForm.Gjz, 'note': this.ruleForm.Bz }
      const params = { 'ruleForm': JSON.stringify(map) }
      const url = this.$examSystemMngApi.countQuestion
      this.$http(url, params).then( // 通讯后台修改数据库中信息
        res => {
          const _data = res.data
          if (_data.code === 'SUCCESS') {
            if (_data.data.TrxCode === '000000') {
              const num = _data.data.Num
              if (num === '0') {
                this.messageError('无符合条件的记录!')
                return
              } else {
                const count = parseInt(num)
                // const perPageSum = this.tablePageL.pageSize // 每次查询条数
                const map = { 'type': this.ruleForm.tiXing, 'busitype': this.ruleForm.yeWuLeiXing,
                  'level': this.ruleForm.nanDu, 'title': this.ruleForm.Gjz, 'note': this.ruleForm.Bz }
                const params = { 'ruleForm': JSON.stringify(map), 'pageNum': this.tablePageL.currentPage, 'pageSize': this.tablePageL.pageSize }
                const url = this.$examSystemMngApi.getQuestionInfo1
                this.$http(url, params).then( // 通讯后台修改数据库中信息
                  res => {
                    const _data = res.data
                    if (_data.code === 'SUCCESS') {
                      if (_data.data.TrxCode === '000000') {
                        this.tableDataL = []
                        const list = _data.data.PageInfo
                        for (let i = 0; i < list.length; i++) {
                          this.tableDataL.push({
                            TiHao: list[i].ID,
                            TiXing: this.TypeList[parseInt(list[i].TYPE.substring(1)) - 1].label,
                            YwLeXing: this.BusiTypeList[parseInt(list[i].BUSITYPE.substring(1)) - 1].label,
                            NanDu: this.LvlList[parseInt(list[i].LVL) - 1].label,
                            TiGan: list[i].TITLE,
                            DaAn: list[i].ANSWER
                          })
                        }
                        this.tablePageL.total = count
                      } else {
                        this.messageError('错误信息 ： ' + _data.data.TrxMessage)
                        return
                      }
                    } else {
                      this.$message.error('错误信息 ： ' + _data.message)
                    }
                  })
              }
            } else {
              this.messageError('错误信息 ： ' + _data.data.TrxMessage)
              return
            }
          } else {
            this.$message.error('错误信息 ： ' + _data.message)
          }
        })
    },
    exitTrade() { // 交易退出返回首页
      this.$emit('sendmsgExit', 'Exit7035')
    },
    handlePageChangeL({ currentPage, pageSize }) {
      this.tablePageL.currentPage = currentPage
      this.tablePageL.pageSize = pageSize
      this.query()
    },
    handlePageChangeR({ currentPage, pageSize }) {
      this.tablePageL.currentPage = currentPage
      this.tablePageL.pageSize = pageSize
    },
    submitForm() { // 保存
      this.disabledBc = true
      if (this.ruleForm1.Zfs === '0' || this.ruleForm1.Zfs === '') {
        this.messageError('总分值不可为空！')
        return
      }
      if (this.tableDataR.length === 0) {
        this.messageError('请先指定试题后再保存！')
        return
      } else {
        if (this.persionList == null) {
          this.messageError('学员信息不可为空！')
          return
        } else {
          // const TOTALSCORE = this.ruleForm1.Zfs
          const planTestInfoListMap = []
          for (let i = 0; i < this.persionList.length; i++) {
            const zoneno = this.persionList[i].ZONENO
            const brno = this.persionList[i].BRNO
            const tlrno = this.persionList[i].TLRNO
            const tlrname = this.persionList[i].TLRNAME
            for (let j = 0; j < this.tableDataR.length; j++) {
              const id = this.tableDataR[j].TiHao
              const answer = this.tableDataR[j].DaAn
              const type = this.tableDataR[j].TiXing
              const record1 = []
              let SCORE = ''
              if (type === '单选') { // 单选1
                SCORE = this.ruleForm1.dxFZ
              } else if (type === '多选') { // 多选
                SCORE = this.ruleForm1.duoXFz
              } else if (type === '判断') { // 判断
                SCORE = this.ruleForm1.pdFz
              }
              record1.push({
                EXAMID: this.PLANSEQ,
                ZONENO: zoneno,
                BRNO: brno,
                TLRNO: tlrno,
                TLRNAME: tlrname,
                ID: id,
                EXAMANSWER: answer,
                SCORE: SCORE
              })
              planTestInfoListMap.push(...record1)
            }
          }
          console.log('_planTestInfoListMap_7035:' + JSON.stringify(planTestInfoListMap))
          // this.messageSuccess('保存成功！')
          this.$emit('sendmsgList', planTestInfoListMap)
          this.$emit('sendmsgScore', this.ruleForm1.Zfs + '')
          this.exitTrade()
        }
      }
    }
  }
}
</script>

<style>
  .transfer-footer {
    margin-left: 20px;
    padding: 6px 5px;
  }
  .el-transfer-panel {
    width: 400px;
  }
  .el-transfer-panel__body {
    height: 300px;
  }
  .el-transfer-panel__list{
    height: 300px;
  }
  .divClass703501 {
    border-top: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
    border-left: 1px solid #e3e3e3;
    border-right: 1px solid #e3e3e3;
    width: 88%;
    margin-left: 8.5%;
    margin-top: 10px;
  }
  .rowClass703501{
    margin-top: 10px;
  }
  .rowClass703502{
    margin-top: 5px;
  }
   .button703501{
     margin-top: 90px;
   }
  .button703502{
    margin-top: 20px;
  }
</style>
