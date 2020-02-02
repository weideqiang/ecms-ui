<template>
  <div>
    <el-main>
      <el-row>
        <el-form
          ref="inputForm"
          :model="inputForm"
          :rules="inputRules"
          label-width="100px"
          size="small">
          <el-row>
            <el-col :span="6" class="colClass700601">
              <el-form-item label="学员ID：" prop="userId">
                <el-input ref="UserId" v-model="inputForm.userId" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="6" class="colClass700601">
              <el-form-item label="学员姓名：" prop="userName">
                <el-input v-model="inputForm.userName" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="6" class="colClass700601">
              <el-form-item label="所属分行：" prop="zoneInfo">
                <el-select ref="zoneInfo" v-model="inputForm.zoneInfo" placeholder="请选择" style="width: 100%;" clearable>
                  <el-option v-for="item in zoneInfos" :key="item.value" :label="item.label" :value="item.value"/>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="所属机构：" prop="branchInfo">
                <el-select ref="branchInfo" v-model="inputForm.branchInfo" filterable placeholder="请选择" style="width: 100%;">
                  <el-option v-for="item in branchList" :key="item.value" :label="item.label" :value="item.value"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="考试类型：" prop="examType">
                <el-select ref="examType" v-model="inputForm.examType" placeholder="请选择" style="width: 100%;" clearable>
                  <el-option v-for="item in examTypes" :key="item.value" :label="item.label" :value="item.value"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6" align="right">
              <el-button class="btnClass700601" size="small" type="primary" @click="query()">查询</el-button>
              <el-button size="small" type="primary" @click="Exit()">退出</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-row>
      <br>
      <el-row>
        <el-col :span="20" :offset="2">
          <el-transfer
            v-model="value1"
            :data="data1"
            :format="{
              noChecked: '${total}',
              hasChecked: '${checked}/${total}'
            }"
            :titles="['未分配学员信息', '已分配学员信息']"
            style="text-align: left; display: inline-block;"
            @change="handleChange"
          />
        </el-col>
      </el-row>
      <br>
      <el-row>
        <el-col :span="2" :offset="2" align="right">
          <input-excel @getResult="getMyExcelData"/>
        </el-col>
        <el-col :span="8" align="left">
          <el-form
            ref="ruleFormDr"
            :model="ruleFormDr"
            label-width="8px"
            size="small">
            <el-form-item>
              <el-input :disabled="true" v-model="ruleFormDr.drPath" placeholder="**适用于未注册学员使用**" clearable/>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6" align="right">
          <el-button size="small" type="primary" @click="nextStep()">下一步</el-button>
        </el-col>
      </el-row>
    </el-main>
  </div>
</template>

<script>
import inputExcel from './TinputExcel'
export default {
  name: 'T7006',
  components: {
    inputExcel
  },
  data() {
    const validateZoneNo = (rule, value, callback) => {
      if (value !== '') {
        // 地区号查询返回机构列表
        this.branchList = []
        const zoneNo = { 'zoneNo': this.inputForm.zoneInfo }
        const url = this.$examSystemMngApi.getBranchInfoListByZoneNo
        this.$http(url, zoneNo).then( // 通讯后台修改数据库中信息
          res => {
            const _data = res.data
            if (_data.data.TrxCode === '000000') {
              const pageInfo = _data.data.PageInfo.list
              for (let i = 0; i < pageInfo.length; i++) {
                const branchList1 = [{
                  value: pageInfo[i].BRNO,
                  label: pageInfo[i].BRNO + '-' + pageInfo[i].BRSNAME
                }]
                this.branchList.push(...branchList1)
              }
            } else {
              this.messageError('错误信息 ： ' + _data.data.TrxMessage)
              return
            }
          })
      } else {
        if (this.ruleForm.operationType !== '0') {
          this.messageError('所属分行不能为空!')
          return
        } else {
          callback()
        }
      }
    }
    return {
      value1: [], // 已分配学员信息
      data1: [], // 未分配学员信息
      branchList: [],
      planSeqId: '', // 考试场次
      inputForm: {
        userId: '', // 学员ID
        userName: '', // 学员姓名
        zoneInfo: '', // 地区信息
        branchInfo: '', // 机构信息
        examType: '' // 考试类型
      },
      ruleFormDr: {
        drPath: '' // 文件导入路径
      },
      inputRules: {
        roleNo: [
          { required: true, message: '请输入学员ID', trigger: 'blur' },
          { min: 0, max: 10, message: '长度在 0 到 6 个字符', trigger: 'blur' }
        ],
        roleName: [
          { required: false, message: '请输入学员姓名', trigger: 'blur' },
          { min: 0, max: 400, message: '长度在  0 到 32 个字符', trigger: 'blur' }
        ],
        zoneInfo: [
          { required: true, message: '请选择所属分行', trigger: 'change' },
          { trigger: 'change', validator: validateZoneNo }
        ],
        examType: [
          { required: true, message: '请选择考试类型', trigger: 'change' }
        ]
      },
      roleTypeOption: [],
      zoneInfos: this.$combo.zoneInfos,
      examTypes: this.$combo.examTypes
    }
  },
  mounted: function() {
    this.inputForm.examType = '01'
    const zoneNo = { 'zoneNo': this.inputForm.zoneInfo }
    const url = this.$examSystemMngApi.createPlanSeq
    this.$http(url, zoneNo).then( // 通讯后台修改数据库中信息
      res => {
        const _data = res.data
        if (_data.code === 'SUCCESS') {
          if (_data.data.TrxCode === '000000') {
            this.planSeqId = _data.data.ID
          } else {
            this.messageError('错误信息 ： ' + _data.data.TrxMessage)
            return
          }
        } else {
          this.$message.error('错误信息 ： ' + _data.message)
        }
      })
  },
  methods: {
    nextStep() {
      if (this.value1.length === 0) {
        this.$message.error('请添加考试人员后点击下一步!')
        return
      } else {
        const YfpData = []
        for (let i = 0; i < this.value1.length; i++) {
          YfpData.push({
            ZONENO: this.data1[this.value1[i]].zoneno,
            BRNO: this.data1[this.value1[i]].brno,
            TLRNO: this.data1[this.value1[i]].label.split('-')[0],
            TLRNAME: this.data1[this.value1[i]].label.split('-')[1]
          })
        }
        this.$router.push({
          path: this.redirect || '/T700601',
          name: 'T700601',
          params: {
            planSeqId: this.planSeqId,
            YfpData: YfpData,
            KsType: this.inputForm.examType
          }
        })
      }
    },
    getMyExcelData(data, name1) {
      // 处理你的数据
      this.data = data
      this.name = name1
      console.log(data)
      this.$message.success('导入成功')
    },
    Exit() { // 交易退出返回首页
      this.$router.push({
        path: this.redirect || '/dashboard'
      })
    },
    query: function() { // 查询
      if (this.inputForm.userId === '' && this.inputForm.userName === '' && this.inputForm.branchInfo === '') {
        this.$message.error('所属机构、学员ID、学员姓名不能同时为空!')
        this.$refs['UserId'].focus()
        return
      }
      let map = ''
      let url = ''
      let flag = ''
      if (this.inputForm.branchInfo !== '') {
        map = { 'branchno': this.inputForm.branchInfo }
        url = this.$examSystemMngApi.getBranchUserInfoByBranch
        flag = '0' // 通过机构号查
      } else {
        map = { 'tlrno': this.inputForm.userId, 'tlrname': this.inputForm.userName }
        url = this.$examSystemMngApi.getBranchUserInfoByBranch
        flag = '1' // 通过柜员号查
      }
      const params = { 'ruleForm': JSON.stringify(map) }
      this.$http(url, params).then( // 通讯后台查询数据库中用户信息
        res => {
          const _data = res.data
          if (_data.code === 'SUCCESS') {
            if (_data.data.TrxCode === '000000') {
              console.log('res => ', res)
              const data = []
              const pageInfo = _data.data.PageInfo.list
              for (let i = 0; i < pageInfo.length; i++) {
                if (flag === '0') {
                  data.push({
                    key: i,
                    label: pageInfo[i].TLRNO + '-' + pageInfo[i].TLRNAME,
                    zoneno: this.inputForm.zoneInfo,
                    brno: this.inputForm.branchInfo
                  })
                } else {
                  data.push({
                    key: i,
                    label: pageInfo[i].TLRNO + '-' + pageInfo[i].TLRNAME,
                    zoneno: pageInfo[i].ZONENO,
                    brno: pageInfo[i].BRNO
                  })
                }
              }
              this.data1 = data
            } else {
              this.$message.error('错误信息 ： ' + _data.data.TrxMessage)
            }
          } else {
            this.$message.error('错误信息 ： ' + _data.message)
          }
        }
      )
    },
    handleChange(value, direction, movedKeys) { // 维护角色下挂交易
      console.log(value, direction, movedKeys)
      if (direction === 'left') { // 删除角色下挂交易
      } else { // 增加角色下挂交易
      }
    }
  }
}
</script>
<style>
  @import "../../../styles/public.css";
  .rowClass70060101 {
    border-top: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
    border-left: 1px solid #e3e3e3;
    border-right: 1px solid #e3e3e3;
    width: 80%;
    margin-left: 100px;
  }
  .colClass700601{
    margin-top: 10px;
  }
  .btnClass700601{
    margin-right: 30px;
  }
</style>
