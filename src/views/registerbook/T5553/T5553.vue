<template>
  <el-main>
    <div>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        class="demo-form-inline"
        label-width="100px"
        size="small">
        <hr>
        <br>
        <el-row>
          <el-col :span="8">
            <el-form-item label="操作类型：" prop="operationType">
              <el-select v-model="ruleForm.operationType" style="width: 80%;" placeholder="请选择" clearable>
                <el-option v-for="item in operationTypes5553" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="起始日期：" prop="startDate">
              <el-date-picker
                id="startDate"
                ref="StartDate"
                :disabled="disabledStartDate"
                v-model="ruleForm.startDate"
                type="date"
                style="width: 80%;"
                placeholder="选择日期"
                editable
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyyMMdd"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="结束日期：" prop="endDate">
              <el-date-picker
                id="endDate"
                :disabled="disabledEndDate"
                v-model="ruleForm.endDate"
                type="date"
                style="width: 80%;"
                placeholder="选择日期"
                editable
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyyMMdd"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="机构代码：" style="width: 85%;" prop="BranchCode">
              <el-input :disabled="disabledBranchCode" v-model="ruleForm.BranchCode" placeholder="请输入机构代码" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="柜员号：" style="width: 85%;" prop="tellerNo">
              <el-input :disabled="disabledTellerNo" v-model="ruleForm.tellerNo" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <hr>
        <br>
        <el-row>
          <el-col :span="8">
            <el-form-item label="种类：" style="width: 85%;" prop="ZL">
              <el-input ref="ZL" :disabled="disabledZL" v-model="ruleForm.ZL" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="保管期限：" prop="BGQX">
              <el-select :disabled="disabledBGQX" v-model="ruleForm.BGQX" style="width: 80%;" placeholder="请选择" clearable>
                <el-option v-for="item in BGQX5553" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="档案名称：" style="width: 85%;" prop="DAMC">
              <el-input ref="DAMC" :disabled="disabledDAMC" v-model="ruleForm.DAMC" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="编号：" style="width: 85%;" prop="BH">
              <el-input :disabled="disabledBH" v-model="ruleForm.BH" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="数量：" style="width: 85%;" prop="ShuL">
              <el-input :disabled="disabledShuL" v-model="ruleForm.ShuL" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="档案日期：" prop="DARQ">
            <el-input :disabled="disabledDARQ" v-model="ruleForm.DARQ" clearable/>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="保管员：" style="width: 85%;" prop="BGY">
              <el-input :disabled="disabledBGY" v-model="ruleForm.BGY" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="保管员密码：" style="width: 85%;" prop="BGYMM">
              <el-input :disabled="true" v-model="ruleForm.BGYMM" type="password" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="说明：" prop="explain">
            <el-input
              :disabled="disabledexplain"
              v-model="ruleForm.explain"
              class="info-queryUnit"
              type="textarea"
              placeholder="说明"
              clearable/>
          </el-form-item>
        </el-row>
        <hr>
        <br>
        <el-row>
          <el-form-item label="调阅单位：" prop="DYDW">
            <el-input :disabled="disabledDYDW" v-model="ruleForm.DYDW" clearable/>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="调阅人：" style="width: 85%;" prop="DYR">
              <el-input :disabled="disabledDYR" v-model="ruleForm.DYR" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="调阅人密码：" style="width: 85%;" prop="DYRMM">
              <el-input :disabled="true" v-model="ruleForm.DYRMM" type="password" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="调阅人证件号码：" prop="DYRZJHM">
              <el-input :disabled="disabledDYRZJHM" v-model="ruleForm.DYRZJHM" style="width: 80%;" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="批准人：" style="width: 85%;" prop="PZR">
              <el-input :disabled="disabledPZR" v-model="ruleForm.PZR" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="批准人密码：" style="width: 85%;" prop="PZRMM">
              <el-input :disabled="true" v-model="ruleForm.PZRMM" type="password" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="协查人：" style="width: 85%;" prop="XCR">
              <el-input :disabled="disabledXCR" v-model="ruleForm.XCR" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="协查人密码：" style="width: 85%;" prop="XCRMM">
              <el-input :disabled="true" v-model="ruleForm.XCRMM" type="password" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="归还日期：" prop="GHDate">
              <el-date-picker
                id="GHDate"
                :disabled="disabledGHDate"
                v-model="ruleForm.GHDate"
                type="date"
                style="width: 80%;"
                placeholder="选择日期"
                editable
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyyMMdd"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="说明：" prop="explain1">
            <el-input
              :disabled="disabledexplain1"
              v-model="ruleForm.explain1"
              class="info-queryUnit"
              type="textarea"
              placeholder="说明"
              clearable/>
          </el-form-item>
        </el-row>
        <hr>
        <br>
        <el-row>
          <el-col :span="8">
            <el-form-item label="销毁日期：" prop="XHDate">
              <el-date-picker
                id="XHDate"
                :disabled="disabledXHDate"
                v-model="ruleForm.XHDate"
                type="date"
                style="width: 80%;"
                placeholder="选择日期"
                editable
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyyMMdd"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="销毁文号：" style="width: 85%;" prop="XHWH">
              <el-input :disabled="disabledXHWH" v-model="ruleForm.XHWH" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="销毁人1：" style="width: 85%;" prop="XHR1">
              <el-input :disabled="disabledXHR1" v-model="ruleForm.XHR1" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="销毁人1密码：" style="width: 85%;" prop="XHR1MM">
              <el-input :disabled="true" v-model="ruleForm.XHR1MM" type="password" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="销毁人2：" style="width: 85%;" prop="XHR2">
              <el-input :disabled="disabledXHR2" v-model="ruleForm.XHR2" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="销毁人2密码：" style="width: 85%;" prop="XHR2MM">
              <el-input :disabled="true" v-model="ruleForm.XHR2MM" type="password" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="说明：" prop="explain2">
            <el-input
              :disabled="disabledexplain2"
              v-model="ruleForm.explain2"
              class="info-queryUnit"
              type="textarea"
              placeholder="说明"
              clearable/>
          </el-form-item>
        </el-row>
      </el-form>
      <div class="dialog-footer" style="width: 92%;" align="right">
        <el-row>
          <el-col :span="8">
            <el-button size="medium" type="primary" @click="exitTrade()">{{ '退出' }}</el-button>
          </el-col>
          <el-col :span="8">
            <el-button size="medium" type="primary" @click="submitForm()">{{ '提交' }}</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </el-main>
</template>

<script>
import { mapGetters } from 'vuex'
import { DateTime } from '../../../commjs/common'
export default {
  name: 'T5553',
  components: { DateTime },
  data() {
    const validOperationType = (rule, value, callback) => {
      this.ruleForm.startDate = ''
      // this.ruleForm.endDate = ''
      this.ruleForm.BranchCode = ''
      this.ruleForm.tellerNo = ''
      this.ruleForm.ZL = ''
      this.ruleForm.BGQX = ''
      this.ruleForm.DAMC = ''
      this.ruleForm.DARQ = ''
      this.ruleForm.BGY = ''
      this.ruleForm.BGYMM = ''
      this.ruleForm.explain = ''
      this.ruleForm.DYDW = ''
      this.ruleForm.DYR = ''
      this.ruleForm.DYRMM = ''
      this.ruleForm.DYRZJHM = ''
      this.ruleForm.PZR = ''
      this.ruleForm.PZRMM = ''
      this.ruleForm.XCR = ''
      this.ruleForm.XCRMM = ''
      this.ruleForm.GHDate = ''
      this.ruleForm.explain1 = ''
      this.ruleForm.XHDate = ''
      this.ruleForm.XHWH = ''
      this.ruleForm.XHR1 = ''
      this.ruleForm.XHR1MM = ''
      this.ruleForm.XHR2 = ''
      this.ruleForm.XHR2MM = ''
      this.ruleForm.explain2 = ''
      if (this.ruleForm.operationType === '0') { // 查询
        this.rules.startDate[0].required = true
        this.rules.endDate[0].required = true
        this.rules.BranchCode[0].required = false
        this.rules.tellerNo[0].required = false
        this.rules.ZL[0].required = false
        this.rules.BGQX[0].required = false
        this.rules.DAMC[0].required = false
        this.rules.BH[0].required = false
        this.rules.ShuL[0].required = false
        this.rules.DARQ[0].required = false
        this.rules.BGY[0].required = false
        this.rules.BGYMM[0].required = false
        this.rules.explain[0].required = false
        this.disabledexplain = true
        this.rules.DYDW[0].required = false
        this.rules.DYR[0].required = false
        this.rules.DYRMM[0].required = false
        this.rules.DYRZJHM[0].required = false
        this.rules.PZR[0].required = false
        this.rules.PZRMM[0].required = false
        this.rules.XCR[0].required = false
        this.rules.XCRMM[0].required = false
        this.rules.GHDate[0].required = false
        this.rules.explain1[0].required = false
        this.rules.XHDate[0].required = false
        this.rules.XHWH[0].required = false
        this.rules.XHR1[0].required = false
        this.rules.XHR1MM[0].required = false
        this.rules.XHR2[0].required = false
        this.rules.XHR2MM[0].required = false
        this.rules.explain2[0].required = false
        this.disabledXHWH = true
        this.disabledGHDate = true
        this.disabledexplain1 = true
        this.disabledXHDate = true
        this.disabledXHR1 = true
        this.disabledXHR2 = true
        this.disabledexplain2 = true
        this.disabledexplain = true
        this.$refs['StartDate'].focus()
      } else if (this.ruleForm.operationType === '1') { // 入库
        // this.rules.startDate[0].required = false
        // this.rules.endDate[0].required = false
        // this.disabledStartDate = true
        // this.disabledEndDate = true
        // this.ruleForm.endDate = ''
        // this.rules.BranchCode[0].required = false
        // this.disabledBranchCode = true
        // this.rules.tellerNo[0].required = false
        // this.disabledTellerNo = true
        // this.rules.ZL[0].required = true
        // this.rules.BGQX[0].required = true
        // this.rules.DAMC[0].required = true
        // this.rules.BH[0].required = true
        // this.rules.ShuL[0].required = true
        // this.rules.DARQ[0].required = true
        // this.rules.BGY[0].required = true
        // this.rules.BGYMM[0].required = false
        // this.rules.explain[0].required = false
        // this.rules.DYDW[0].required = false
        // this.disabledDYDW = true
        // this.rules.DYR[0].required = false
        // this.disabledDYR = true
        // this.rules.DYRMM[0].required = false
        // this.rules.DYRZJHM[0].required = false
        // this.disabledDYRZJHM = true
        // this.rules.PZR[0].required = false
        // this.disabledPZR = true
        // this.rules.PZRMM[0].required = false
        // this.rules.XCR[0].required = false
        // this.disabledXCR = true
        // this.rules.XCRMM[0].required = false
        // this.rules.GHDate[0].required = false
        // this.disabledGHDate = true
        // this.rules.explain1[0].required = false
        // this.disabledexplain1 = true
        // this.rules.XHDate[0].required = false
        // this.disabledXHDate = true
        // this.rules.XHWH[0].required = false
        // this.disabledXHWH = true
        // this.rules.XHR1[0].required = false
        // this.disabledXHR1 = true
        // this.rules.XHR1MM[0].required = false
        // this.rules.XHR2[0].required = false
        // this.disabledXHR2 = true
        // this.rules.XHR2MM[0].required = false
        // this.rules.explain2[0].required = false
        // this.disabledexplain2 = true
        // this.disabledGHDate = true
        // this.disabledexplain1 = true
        // this.disabledXHDate = true
        // this.disabledXHR1 = true
        // this.disabledXHR2 = true
        // this.disabledexplain2 = true
        // this.$refs['ZL'].focus()
        callback(new Error('功能开发中'))
      } else if (this.ruleForm.operationType === '2') { // 调阅
        // this.rules.startDate[0].required = false
        // this.rules.endDate[0].required = false
        // this.disabledstartDate = true
        // this.disabledendDate = true
        // this.ruleForm.endDate = ''
        // this.rules.BranchCode[0].required = false
        // this.disabledBranchCode = true
        // this.rules.tellerNo[0].required = false
        // this.disabledTellerNo = true
        // this.rules.ZL[0].required = false
        // this.disabledZL = true
        // this.rules.BGQX[0].required = false
        // this.disabledBGQX = true
        // this.rules.DAMC[0].required = true
        // this.rules.BH[0].required = true
        // this.rules.ShuL[0].required = false
        // this.disabledShuL = true
        // this.rules.DARQ[0].required = false
        // this.disabledDARQ = true
        // this.rules.BGY[0].required = false
        // this.disabledBGY = true
        // this.rules.BGYMM[0].required = false
        // this.rules.explain[0].required = false
        // this.disabledexplain = true
        // this.rules.DYDW[0].required = true
        // this.disabledDYDW = false
        // this.rules.DYR[0].required = true
        // this.disabledDYR = false
        // this.rules.DYRMM[0].required = false
        // this.disabledDYRZJHM = false
        // this.rules.DYRZJHM[0].required = true
        // this.rules.PZR[0].required = true
        // this.disabledPZR = false
        // this.rules.PZRMM[0].required = false
        // this.rules.XCR[0].required = true
        // this.disabledXCR = false
        // this.rules.XCRMM[0].required = false
        // this.rules.GHDate[0].required = false
        // this.disabledGHDate = false
        // this.rules.explain1[0].required = false
        // this.disabledexplain1 = false
        // this.rules.XHDate[0].required = false
        // this.disabledXHDate = true
        // this.rules.XHWH[0].required = false
        // this.disabledXHWH = true
        // this.rules.XHR1[0].required = false
        // this.disabledXHR1 = true
        // this.rules.XHR1MM[0].required = false
        // this.rules.XHR2[0].required = false
        // this.disabledXHR2 = true
        // this.rules.XHR2MM[0].required = false
        // this.rules.explain2[0].required = false
        // this.disabledexplain2 = true
        // this.$refs['DAMC'].focus()
        callback(new Error('功能开发中'))
      } else if (this.ruleForm.operationType === '3') { // 销毁
        // this.ruleForm.ZL = ''
        // this.ruleForm.BGQX = ''
        // this.ruleForm.ShuL = ''
        // this.ruleForm.DARQ = ''
        // this.ruleForm.BGY = ''
        // this.ruleForm.DYDW = ''
        // this.ruleForm.DYR = ''
        // this.ruleForm.DYRZJHM = ''
        // this.ruleForm.PZR = ''
        // this.ruleForm.XCR = ''
        // this.ruleForm.XHRQ = ''
        // this.ruleForm.XHWH = ''
        // this.rules.startDate[0].required = false
        // this.disabledStartDate = true
        // this.rules.endDate[0].required = false
        // this.disabledEndDate = true
        // this.ruleForm.endDate = ''
        // this.rules.BranchCode[0].required = false
        // this.disabledBranchCode = true
        // this.rules.tellerNo[0].required = false
        // this.disabledTellerNo = true
        // this.rules.ZL[0].required = false
        // this.disabledZL = true
        // this.rules.BGQX[0].required = false
        // this.disabledBGQX = true
        // this.rules.DAMC[0].required = true
        // this.rules.BH[0].required = true
        // this.rules.ShuL[0].required = false
        // this.disabledShuL = true
        // this.rules.DARQ[0].required = false
        // this.disabledDARQ = true
        // this.rules.BGY[0].required = false
        // this.disabledBGY = true
        // this.rules.BGYMM[0].required = false
        // this.disabledBGYMM = true
        // this.rules.explain[0].required = false
        // this.disabledexplain = true
        // this.rules.DYDW[0].required = false
        // this.disabledDYDW = true
        // this.rules.DYR[0].required = false
        // this.disabledDYR = true
        // this.rules.DYRMM[0].required = false
        // this.rules.DYRZJHM[0].required = false
        // this.rules.PZR[0].required = false
        // this.disabledDYRZJHM = true
        // this.disabledPZR = true
        // this.rules.PZRMM[0].required = false
        // this.rules.XCR[0].required = false
        // this.disabledXCR = true
        // this.rules.XCRMM[0].required = false
        // this.rules.GHDate[0].required = false
        // this.disabledGHDate = true
        // this.rules.explain1[0].required = false
        // this.disabledexplain1 = true
        // this.rules.XHDate[0].required = true
        // this.disabledXHDate = false
        // this.rules.XHWH[0].required = true
        // this.disabledXHWH = false
        // this.rules.XHR1[0].required = true
        // this.disabledXHR1 = false
        // this.rules.XHR1MM[0].required = false
        // this.rules.XHR2[0].required = false
        // this.disabledXHR2 = false
        // this.rules.XHR2MM[0].required = false
        // this.rules.explain2[0].required = false
        // this.disabledexplain2 = false
        // this.$refs['DAMC'].focus()
        callback(new Error('功能开发中'))
      }
    }
    return {
      disabledStartDate: false, // 起始日期
      disabledEndDate: false, // 结束日期
      disabledBranchCode: false, //  机构代码
      disabledTellerNo: false, //  柜员号
      disabledZL: false, //  种类
      disabledBGQX: false, //  保管期限
      disabledDAMC: false, //  档案名称
      disabledBH: false, //  编号
      disabledShuL: false, //  数量
      disabledDARQ: false, //  档案日期
      disabledBGY: false, //  保管员
      disabledBGYMM: false, //  保管员密码
      disabledexplain: false, //  说明
      disabledDYDW: false, //  调阅单位
      disabledDYR: false, //  调阅人
      disabledDYRZJHM: false, //  调阅人证件号码
      disabledPZR: false, //  批准人
      disabledXCR: false, //  协查人
      disabledGHDate: false, //  归还日期
      disabledexplain1: false, //  说明1
      disabledXHDate: false, //  销毁日期
      disabledXHWH: false, //  销毁文号
      disabledXHR1: false, //  销毁人1
      disabledXHR2: false, //  销毁人2
      disabledexplain2: false, // 说明2
      CurrentUserNo: '', // 初始化-当前柜员号
      CurrentUserName: '', // 初始化-当前柜员名称
      CurrentBranchNo: '', // 初始化-当前机构号
      CurrentBranchName: '', // 初始化-当前机构名称
      CurrentZoneNo: '', // 初始化-当前地区号
      CurrentSystemDate: '', // 初始化-当前系统日期
      CurrentSystemTime: '', // 当前系统时间
      operationTypes5553: this.$combo.operationTypes5553, // 操作类型
      BGQX5553: this.$combo.BGQX5553, // 保管期限
      submitFormMap: '',
      ruleForm: {
        operationType: '', // 操作类型
        startDate: '', // 起始日期
        endDate: '', // 结束日期
        BranchCode: '', // 机构代码
        tellerNo: '', // 柜员号
        ZL: '', // 种类
        BGQX: '', // 保管期限
        DAMC: '', // 档案名称
        BH: '', // 编号
        ShuL: '', // 数量
        DARQ: '', // 档案日期
        BGY: '', // 保管员
        BGYMM: '', // 保管员密码
        explain: '', // 说明
        DYDW: '', // 调阅单位
        DYR: '', // 调阅人
        DYRMM: '', // 调阅人密码
        DYRZJHM: '', // 调阅人证件号码
        PZR: '', // 批准人
        PZRMM: '', // 批准人密码
        XCR: '', // 协查人
        XCRMM: '', // 协查人密码
        GHDate: '', // 归还日期
        explain1: '', // 归还日期
        XHDate: '', // 销毁日期
        XHWH: '', // 销毁文号
        XHR1: '', // 销毁人1
        XHR1MM: '', // 销毁人1密码
        XHR2: '', // 销毁人2
        XHR2MM: '', // 销毁人2密码
        explain2: '' // 说明
      },
      rules: {
        operationType: [
          { required: true, message: '请选择操作类型', trigger: 'change' },
          { trigger: 'change', validator: validOperationType }
        ],
        startDate: [
          { required: false, message: '请选择起始日期', trigger: 'blur' }
        ],
        endDate: [
          { required: false, message: '请选择结束日期', trigger: 'blur' }
        ],
        BranchCode: [
          { required: false, message: '请输入机构代码', trigger: 'blur' }
        ],
        tellerNo: [
          { required: false, message: '请输入柜员号', trigger: 'blur' }
        ],
        ZL: [
          { required: false, message: '请输入种类', trigger: 'blur' }
        ],
        BGQX: [
          { required: false, message: '请输入保管期限', trigger: 'blur' }
        ],
        DAMC: [
          { required: false, message: '请输入档案名称', trigger: 'blur' }
        ],
        BH: [
          { required: false, message: '请输入编号', trigger: 'blur' }
        ],
        ShuL: [
          { required: false, message: '请输入数量', trigger: 'blur' }
        ],
        DARQ: [
          { required: false, message: '请输入档案日期', trigger: 'change' }
        ],
        BGY: [
          { required: false, message: '请输入保管员', trigger: 'blur' }
        ],
        BGYMM: [
          { required: false, message: '请输入保管员密码', trigger: 'blur' }
        ],
        explain: [
          { required: false, message: '请输入说明', trigger: 'blur' }
        ],
        DYDW: [
          { required: false, message: '请输入调阅单位', trigger: 'blur' }
        ],
        DYR: [
          { required: false, message: '请输入调阅人', trigger: 'blur' }
        ],
        DYRMM: [
          { required: false, message: '请输入调阅人密码', trigger: 'blur' }
        ],
        DYRZJHM: [
          { required: false, message: '请输入调阅人证件号码', trigger: 'blur' }
        ],
        PZR: [
          { required: false, message: '请输入批准人', trigger: 'blur' }
        ],
        PZRMM: [
          { required: false, message: '请输入批准人密码', trigger: 'blur' }
        ],
        XCR: [
          { required: false, message: '请输入协查人', trigger: 'blur' }
        ],
        XCRMM: [
          { required: false, message: '请输入协查人密码', trigger: 'blur' }
        ],
        GHDate: [
          { required: false, message: '请输入归还日期', trigger: 'blur' }
        ],
        explain1: [
          { required: false, message: '请输入说明1', trigger: 'blur' }
        ],
        XHDate: [
          { required: false, message: '请输入销毁日期', trigger: 'blur' }
        ],
        XHWH: [
          { required: false, message: '请输入销毁文号', trigger: 'blur' }
        ],
        XHR1: [
          { required: false, message: '请输入销毁人1', trigger: 'blur' }
        ],
        XHR1MM: [
          { required: false, message: '请输入销毁人1密码', trigger: 'blur' }
        ],
        XHR2: [
          { required: false, message: '请输入销毁人2', trigger: 'blur' }
        ],
        XHR2MM: [
          { required: false, message: '请输入销毁人2密码', trigger: 'blur' }
        ],
        explain2: [
          { required: false, message: '请输入说明2', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    device() { // 获取客户端类型
      return this.$store.state.app.device
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
  },
  methods: {
    exitTrade() { // 交易退出返回首页
      this.$router.push({
        path: this.redirect || '/dashboard'
      })
    },
    submitForm() { // 提交
      if (this.ruleForm.operationType !== '0') { // 登记操作
        this.$message.error('功能开发中')
        return
        // if (this.ruleForm.operationType === '1') {
        //   this.submitFormMap = {
        //     'REGISTERDATE': this.CurrentSystemDate,
        //     'REGISTERTIME': new DateTime().getTime(),
        //     'ARCHIVESTYPE': this.ruleForm.ZL,
        //     'CUSTODYPERIOD': this.ruleForm.BGQX,
        //     'ARCHIVESINDATE': this.CurrentSystemDate,
        //     'ARCHIVESNAME': this.ruleForm.DAMC,
        //     'ARCHIVESNUMBER': this.ruleForm.BH,
        //     'NUMBERS': this.ruleForm.ShuL,
        //     'ARCHIVESDATE': this.ruleForm.DARQ,
        //     'CUSTODIAN': this.ruleForm.BGY,
        //     'WARETELLERNO': this.CurrentUserNo,
        //     'WARETELLERNAME': this.CurrentUserName,
        //     'READERDATE': '',
        //     'REVIEWUNIT': '',
        //     'READER': '',
        //     'READERIDNO': '',
        //     'APPROVER': '',
        //     'SUPERVISER': '',
        //     'RETURNDATE': '',
        //     'REVIEWMAINSERIALNO': '',
        //     'REVIEWTELLERNO': '',
        //     'REVIEWTELLERNAME': '',
        //     'DESTROYDATE': '',
        //     'DESTROYNO': '',
        //     'DESMAINSERIALNO': '',
        //     'DESTELLERNO': '',
        //     'DESTELLERNAME': '',
        //     'BRNO': this.CurrentBranchNo,
        //     'BRNAME': this.CurrentBranchName,
        //     'OPERATIONTYPE': this.ruleForm.operationType,
        //     'BEIYONG1': this.ruleForm.explain,
        //     'BEIYONG2': '',
        //     'BEIYONG3': '',
        //     'BEIYONG4': '',
        //     'BEIYONG5': '',
        //     'WFLAG': '0',
        //     'operationType': '1'
        //   }
        // } else if (this.ruleForm.operationType === '2') {
        //   this.submitFormMap = {
        //     'REGISTERDATE': this.CurrentSystemDate,
        //     'REGISTERTIME': new DateTime().getTime(),
        //     'ARCHIVESTYPE': this.ruleForm.ZL,
        //     'CUSTODYPERIOD': this.CurrentSystemDate,
        //     'ARCHIVESINDATE': this.CurrentSystemDate,
        //     'ARCHIVESNAME': this.ruleForm.DAMC,
        //     'ARCHIVESNUMBER': this.ruleForm.BH,
        //     'NUMBERS': this.ruleForm.ShuL,
        //     'ARCHIVESDATE': this.ruleForm.DARQ,
        //     'CUSTODIAN': this.ruleForm.BGY,
        //     'WARETELLERNO': this.CurrentUserNo,
        //     'WARETELLERNAME': this.CurrentUserName,
        //     'READERDATE': this.CurrentSystemDate,
        //     'REVIEWUNIT': this.ruleForm.DYDW,
        //     'READER': this.ruleForm.DYR,
        //     'READERIDNO': this.ruleForm.DYRZJHM,
        //     'APPROVER': this.ruleForm.PZR,
        //     'SUPERVISER': this.ruleForm.XCR,
        //     'RETURNDATE': this.ruleForm.GHDate,
        //     'REVIEWTELLERNO': this.CurrentUserNo,
        //     'REVIEWTELLERNAME': this.CurrentUserName,
        //     'DESTROYDATE': '',
        //     'DESTROYNO': '',
        //     'DESMAINSERIALNO': '',
        //     'DESTELLERNO': '',
        //     'DESTELLERNAME': '',
        //     'BRNO': this.CurrentBranchNo,
        //     'BRNAME': this.CurrentBranchName,
        //     'OPERATIONTYPE': this.ruleForm.operationType,
        //     'BEIYONG1': '',
        //     'BEIYONG2': this.ruleForm.explain1,
        //     'BEIYONG3': '',
        //     'BEIYONG4': '',
        //     'BEIYONG5': '',
        //     'WFLAG': '0',
        //     'operationType': '2' }
        // } else if (this.ruleForm.operationType === '3') {
        //   this.submitFormMap = {
        //     'REGISTERDATE': this.CurrentSystemDate,
        //     'REGISTERTIME': new DateTime().getTime(),
        //     'ARCHIVESTYPE': this.ruleForm.ZL,
        //     'CUSTODYPERIOD': this.ruleForm.BGQX,
        //     'ARCHIVESINDATE': this.CurrentSystemDate,
        //     'ARCHIVESNAME': this.ruleForm.DAMC,
        //     'ARCHIVESNUMBER': this.ruleForm.BH,
        //     'NUMBERS': this.ruleForm.ShuL,
        //     'ARCHIVESDATE': this.ruleForm.DARQ,
        //     'CUSTODIAN': this.ruleForm.BGY,
        //     'WARETELLERNAME': this.CurrentUserNo,
        //     'READERDATE': this.CurrentUserName,
        //     'REVIEWUNIT': this.CurrentSystemDate,
        //     'READER': this.ruleForm.DYDW,
        //     'READERIDNO': this.ruleForm.DYR,
        //     'APPROVER': this.ruleForm.DYRZJHM,
        //     'SUPERVISER': this.ruleForm.PZR,
        //     'RETURNDATE': this.ruleForm.XCR,
        //     'REVIEWMAINSERIALNO': this.ruleForm.GHDate,
        //     'REVIEWTELLERNAME': this.CurrentUserNo,
        //     'DESTROYDATE': this.ruleForm.XHDate,
        //     'DESTROYNO': this.ruleForm.XHWH,
        //     'DESTELLERNO': this.CurrentUserNo,
        //     'DESTELLERNAME': this.CurrentUserName,
        //     'BRNO': this.CurrentBranchNo,
        //     'BRNAME': this.CurrentBranchName,
        //     'OPERATIONTYPE': this.ruleForm.operationType,
        //     'BEIYONG1': '',
        //     'BEIYONG2': '',
        //     'BEIYONG3': this.ruleForm.explain2,
        //     'BEIYONG4': this.ruleForm.XHR1,
        //     'BEIYONG5': this.ruleForm.XHR2,
        //     'WFLAG': '0'
        //   }
        // }
        //
        // const params1 = { 'ruleForm': JSON.stringify(this.submitFormMap) }
        // const url1 = this.$registerBookApi.insertXR_PIS_SIGNINFO_REGISTER1
        // this.$http(url1, params1).then( // 通讯后台修改数据库中信息
        //   res => {
        //     const _data = res.data
        //     // 赋值
        //     if (_data.code === 'SUCCESS') {
        //       if (_data.data.TrxCode === '000000') {
        //         console.log('---insertXR_PIS_SIGNINFO_REGISTER1---' + JSON.stringify(res.data))
        //         this.messageSuccess('登记成功!   流水号' + _data.data._MAINLSH_)
        //         return
        //       } else {
        //         if (_data.data.TrxCode === 'T5549_002') {
        //           this.messageWarning('登记失败!')
        //           return
        //         } else {
        //           this.messageError('错误信息 ： ' + _data.data.TrxMessage)
        //           return
        //         }
        //       }
        //     } else {
        //       this.messageError('错误信息 ： ' + _data.message)
        //       return
        //     }
        //   })
      } else { // 查询
        const params0 = { 'branchno': this.ruleForm.BranchCode === '' ? this.CurrentBranchNo : this.ruleForm.BranchCode }
        const url0 = this.$systemPublicApi.getBranchLevel
        this.$http(url0, params0).then( // 通讯后台修改数据库中信息
          res => {
            console.log('--getBranchLevel--' + JSON.stringify(res.data))
            const _data = res.data
            if (_data.ErrCode === '0000') {
              if (this.ruleForm.BranchCode === '019807' || this.ruleForm.BranchCode === '011901') {
                this.BranchLevel = '1'
              } else {
                this.BranchLevel = _data.BranchLevel
                if (this.BranchLevel === '3') {
                  if (this.ruleForm.BranchCode !== '') {
                    this.BranchLevel = '4'
                  }
                }
              }
            } else {
              if (this.ruleForm.BranchCode !== '') {
                if (this.ruleForm.BranchCode.substring(2) === '0000') {
                  this.BranchLevel = '2'
                } else if (this.ruleForm.BranchCode.substring(4) === '00') {
                  this.BranchLevel = '3'
                }
              } else {
                if (this.CurrentBranchNo === '019807' || this.CurrentBranchNo === '011901') {
                  this.BranchLevel = '1'
                } else {
                  this.BranchLevel = _data.BranchLevel
                }
                this.ruleForm.BranchCode = this.CurrentBranchNo
              }
              if (this.ruleForm.BranchCode === '') {
                this.BranchLevel = '1'
              }
            }
            const map = {
              'startdate': this.ruleForm.startDate,
              'enddate': this.ruleForm.endDate,
              'brno': this.ruleForm.BranchCode === '' ? this.CurrentBranchNo : this.ruleForm.BranchCode,
              'branchlevel': this.BranchLevel,
              'tellerno': this.ruleForm.tellerNo,
              'archivestype': this.ruleForm.ZL,
              'custodyperiod': this.ruleForm.BGQX,
              'archivesname': this.ruleForm.DAMC,
              'archivesnumber': this.ruleForm.BH,
              'numbers': this.ruleForm.ShuL,
              'archivesdate': this.ruleForm.DARQ,
              'custodian': this.ruleForm.BGY,
              'reviewunit': this.ruleForm.DYDW,
              'reader': this.ruleForm.DYR,
              'readeridno': this.ruleForm.DYRZJHM,
              'approver': this.ruleForm.PZR,
              'superviser': this.ruleForm.XCR,
              'returndate': this.ruleForm.GHDate,
              'destroydate': this.ruleForm.XHDate,
              'destroyno': this.ruleForm.XHWH,
              'operationtype': '',
              'beiyong4': this.ruleForm.XHR1,
              'beiyong5': this.ruleForm.XHR2
            }
            const params1 = { 'ruleForm': JSON.stringify(map), 'pageNum': '1', 'pageSize': '10' }
            const url1 = this.$registerBookApi.getXR_PIS_ACCOUNTANTFILE_REGISTER
            this.$http(url1, params1).then( // 通讯后台修改数据库中信息
              res => {
                const _data = res.data
                // 赋值
                if (_data.code === 'SUCCESS') {
                  if (_data.data.TrxCode === '000000') {
                    console.log('---getXR_PIS_ACCOUNTANTFILE_REGISTER---' + JSON.stringify(res.data))
                    this.tableData = res.data
                    this.$router.push({
                      path: this.redirect || '/T555301',
                      name: 'T555301',
                      params: {
                        map: _data.data.PageInfo,
                        totalNum: _data.data.PageInfo.total
                      }
                    })
                  } else {
                    if (_data.data.TrxCode === 'T5553_001') {
                      this.messageWarning('没有记录!')
                      return
                    } else {
                      this.messageError('错误信息 ： ' + _data.data.TrxMessage)
                      return
                    }
                  }
                } else {
                  this.messageError('错误信息 ： ' + _data.message)
                  return
                }
              })
          })
      }
    }
  }
}
</script>

<style scoped>
  .ecms-trx-button{
    text-align: center;
  }
</style>
