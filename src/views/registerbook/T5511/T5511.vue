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
            <el-form-item label="开户渠道：" prop="operationType">
              <el-select v-model="ruleForm.operationType" placeholder="请选择" style="width: 80%;" clearable>
                <el-option v-for="item in operationTypes" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="起始日期：" prop="startDate">
              <el-date-picker
                id="startDate"
                :disabled="false"
                v-model="ruleForm.startDate"
                :picker-options="pickerOptions1"
                class="info-startDate"
                type="date"
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
                :disabled="false"
                v-model="ruleForm.endDate"
                :picker-options="pickerOptions1"
                class="info-startDate"
                type="date"
                placeholder="选择日期"
                editable
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyyMMdd"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="存款人名称：" style="width: 85%;" prop="CKRMC">
              <el-input v-model="ruleForm.CKRMC" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证明文件号码：" style="width: 85%;" prop="ZMWJHM">
              <el-input v-model="ruleForm.ZMWJHM" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row>
        <el-form :inline="true" class="ecms-trx-button">
          <el-form-item>
            <el-button size="medium" type="primary" @click="registerClick">查询</el-button>
            <el-button size="medium" type="primary" >退出</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      border
      style="width: 100%"
      tooltip-effect="dark"
      height="300"
      @selection-change="handleSelectionChange">
      <el-table-column label="渠道流水" prop="MAINSERIALNO">
        <template slot-scope="scope">
          <template v-if="scope.row.MAINSERIALNO">
            <el-input v-model="scope.row.MAINSERIALNO" class="edit-input" placeholder="渠道流水"/>
          </template>
          <span>{{ scope.row.MAINSERIALNO }}</span>
        </template>
      </el-table-column>
      <el-table-column label="官网预约开户审核状态" prop="GWAUDITSTATUS">
        <template slot-scope="scope">
          <template v-if="scope.row.GWAUDITSTATUS">
            <el-input v-model="scope.row.GWAUDITSTATUS" class="edit-input" placeholder="官网预约开户审核状态"/>
          </template>
          <span>{{ scope.row.GWAUDITSTATUS }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核不通过原因" prop="ABSTRACT">
        <template slot-scope="scope">
          <template v-if="scope.row.ABSTRACT">
            <el-input v-model="scope.row.ABSTRACT" class="edit-input" placeholder="审核不通过原因"/>
          </template>
          <span>{{ scope.row.ABSTRACT }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请渠道" prop="CHANNEL">
        <template slot-scope="scope">
          <template v-if="scope.row.CHANNEL">
            <el-input v-model="scope.row.CHANNEL" class="edit-input" placeholder="申请渠道"/>
          </template>
          <span>{{ scope.row.CHANNEL }}</span>
        </template>
      </el-table-column>
      <el-table-column label="存款人名称" prop="CUSTOMERNAME">
        <template slot-scope="scope">
          <template v-if="scope.row.CUSTOMERNAME">
            <el-input v-model="scope.row.CUSTOMERNAME" class="edit-input" placeholder="存款人名称"/>
          </template>
          <span>{{ scope.row.CUSTOMERNAME }}</span>
        </template>
      </el-table-column>
      <el-table-column label="存款人手机号码" prop="PHONENUMBER">
        <template slot-scope="scope">
          <template v-if="scope.row.PHONENUMBER">
            <el-input v-model="scope.row.PHONENUMBER" class="edit-input" placeholder="存款人手机号码"/>
          </template>
          <span>{{ scope.row.PHONENUMBER }}</span>
        </template>
      </el-table-column>
      <el-table-column label="证明文件种类" prop="THEDOCUMENTTYPE">
        <template slot-scope="scope">
          <template v-if="scope.row.THEDOCUMENTTYPE">
            <el-input v-model="scope.row.THEDOCUMENTTYPE" class="edit-input" placeholder="证明文件种类"/>
          </template>
          <span>{{ scope.row.THEDOCUMENTTYPE }}</span>
        </template>
      </el-table-column>
      <el-table-column label="证明文件编号" prop="THEDOCUMENTSERIALNO">
        <template slot-scope="scope">
          <template v-if="scope.row.THEDOCUMENTSERIALNO">
            <el-input v-model="scope.row.THEDOCUMENTSERIALNO" class="edit-input" placeholder="证明文件编号"/>
          </template>
          <span>{{ scope.row.THEDOCUMENTSERIALNO }}</span>
        </template>
      </el-table-column>
      <el-table-column label="法定代表人姓名" prop="LEGALPERSON">
        <template slot-scope="scope">
          <template v-if="scope.row.LEGALPERSON">
            <el-input v-model="scope.row.LEGALPERSON" class="edit-input" placeholder="法定代表人姓名"/>
          </template>
          <span>{{ scope.row.LEGALPERSON }}</span>
        </template>
      </el-table-column>
      <el-table-column label="法定代表人身份证号码" prop="LEGALPERSONCERTIFICATENO">
        <template slot-scope="scope">
          <template v-if="scope.row.LEGALPERSONCERTIFICATENO">
            <el-input v-model="scope.row.LEGALPERSONCERTIFICATENO" class="edit-input" placeholder="法定代表人身份证号码"/>
          </template>
          <span>{{ scope.row.LEGALPERSONCERTIFICATENO }}</span>
        </template>
      </el-table-column>
      <el-table-column label="账户性质" prop="ACCOUNTTYPE">
        <template slot-scope="scope">
          <template v-if="scope.row.ACCOUNTTYPE">
            <el-input v-model="scope.row.ACCOUNTTYPE" class="edit-input" placeholder="账户性质"/>
          </template>
          <span>{{ scope.row.ACCOUNTTYPE }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请日期" prop="APPLEDATE">
        <template slot-scope="scope">
          <template v-if="scope.row.APPLEDATE">
            <el-input v-model="scope.row.APPLEDATE" class="edit-input" placeholder="申请日期"/>
          </template>
          <span>{{ scope.row.APPLEDATE }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核通过日期" prop="AUDITINGDATE">
        <template slot-scope="scope">
          <template v-if="scope.row.AUDITINGDATE">
            <el-input v-model="scope.row.AUDITINGDATE" class="edit-input" placeholder="审核通过日期"/>
          </template>
          <span>{{ scope.row.AUDITINGDATE }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上门核实日期" prop="VERIFYDATE">
        <template slot-scope="scope">
          <template v-if="scope.row.VERIFYDATE">
            <el-input v-model="scope.row.VERIFYDATE" class="edit-input" placeholder="上门核实日期"/>
          </template>
          <span>{{ scope.row.VERIFYDATE }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上门核实类别" prop="VERIFYTYPE">
        <template slot-scope="scope">
          <template v-if="scope.row.VERIFYTYPE">
            <el-input v-model="scope.row.VERIFYTYPE" class="edit-input" placeholder="上门核实类别"/>
          </template>
          <span>{{ scope.row.VERIFYTYPE }}</span>
        </template>
      </el-table-column>
      <el-table-column label="核实交出人1" prop="VERIFYHANDOVER1">
        <template slot-scope="scope">
          <template v-if="scope.row.VERIFYHANDOVER1">
            <el-input v-model="scope.row.VERIFYHANDOVER1" class="edit-input" placeholder="核实交出人1"/>
          </template>
          <span>{{ scope.row.VERIFYHANDOVER1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="核实交出人2" prop="VERIFYHANDOVER2">
        <template slot-scope="scope">
          <template v-if="scope.row.VERIFYHANDOVER2">
            <el-input v-model="scope.row.VERIFYHANDOVER2" class="edit-input" placeholder="核实交出人2"/>
          </template>
          <span>{{ scope.row.VERIFYHANDOVER2 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="核实接收人" prop="VERIFYRECIPIENT">
        <template slot-scope="scope">
          <template v-if="scope.row.VERIFYRECIPIENT">
            <el-input v-model="scope.row.VERIFYRECIPIENT" class="edit-input" placeholder="核实接收人"/>
          </template>
          <span>{{ scope.row.VERIFYRECIPIENT }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上门核实流水号" prop="VERIFYMAINSERIALNO">
        <template slot-scope="scope">
          <template v-if="scope.row.VERIFYMAINSERIALNO">
            <el-input v-model="scope.row.VERIFYMAINSERIALNO" class="edit-input" placeholder="上门核实流水号"/>
          </template>
          <span>{{ scope.row.VERIFYMAINSERIALNO }}</span>
        </template>
      </el-table-column>
      <el-table-column label="交接资料日期" prop="HANDOVERDATADATE">
        <template slot-scope="scope">
          <template v-if="scope.row.HANDOVERDATADATE">
            <el-input v-model="scope.row.HANDOVERDATADATE" class="edit-input" placeholder="交接资料日期"/>
          </template>
          <span>{{ scope.row.HANDOVERDATADATE }}</span>
        </template>
      </el-table-column>
      <el-table-column label="交接交出人" prop="JJZLHANDOVER1">
        <template slot-scope="scope">
          <template v-if="scope.row.JJZLHANDOVER1">
            <el-input v-model="scope.row.JJZLHANDOVER1" class="edit-input" placeholder="交接交出人"/>
          </template>
          <span>{{ scope.row.JJZLHANDOVER1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="交接接收人" prop="JJZLRECIPIENT">
        <template slot-scope="scope">
          <template v-if="scope.row.JJZLRECIPIENT">
            <el-input v-model="scope.row.JJZLRECIPIENT" class="edit-input" placeholder="交接接收人"/>
          </template>
          <span>{{ scope.row.JJZLRECIPIENT }}</span>
        </template>
      </el-table-column>
      <el-table-column label="交接资料流水号" prop="JJZLMAINSERIALNO">
        <template slot-scope="scope">
          <template v-if="scope.row.JJZLMAINSERIALNO">
            <el-input v-model="scope.row.JJZLMAINSERIALNO" class="edit-input" placeholder="交接资料流水号"/>
          </template>
          <span>{{ scope.row.JJZLMAINSERIALNO }}</span>
        </template>
      </el-table-column>
      <el-table-column label="报送资料日期" prop="SUBMITDATADATE">
        <template slot-scope="scope">
          <template v-if="scope.row.SUBMITDATADATE">
            <el-input v-model="scope.row.SUBMITDATADATE" class="edit-input" placeholder="报送资料日期"/>
          </template>
          <span>{{ scope.row.SUBMITDATADATE }}</span>
        </template>
      </el-table-column>
      <el-table-column label="报送资料方式" prop="SUBMITDATATYPE">
        <template slot-scope="scope">
          <template v-if="scope.row.SUBMITDATATYPE">
            <el-input v-model="scope.row.SUBMITDATATYPE" class="edit-input" placeholder="报送资料方式"/>
          </template>
          <span>{{ scope.row.SUBMITDATATYPE }}</span>
        </template>
      </el-table-column>
      <el-table-column label="报送交出人" prop="SUBMITHANDOVER">
        <template slot-scope="scope">
          <template v-if="scope.row.SUBMITHANDOVER">
            <el-input v-model="scope.row.SUBMITHANDOVER" class="edit-input" placeholder="报送交出人"/>
          </template>
          <span>{{ scope.row.CUSTOMERNAME }}</span>
        </template>
      </el-table-column>
      <el-table-column label="报送交出人证件类型" prop="SUBMITIDTYPE1">
        <template slot-scope="scope">
          <template v-if="scope.row.SUBMITIDTYPE1">
            <el-input v-model="scope.row.SUBMITIDTYPE1" class="edit-input" placeholder="报送交出人证件类型"/>
          </template>
          <span>{{ scope.row.SUBMITIDTYPE1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="报送交出人证件号码" prop="SUBMITIDNO1">
        <template slot-scope="scope">
          <template v-if="scope.row.SUBMITIDNO1">
            <el-input v-model="scope.row.SUBMITIDNO1" class="edit-input" placeholder="报送交出人证件号码"/>
          </template>
          <span>{{ scope.row.SUBMITIDNO1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="报送接收人" prop="SUBMITRECIPIENT">
        <template slot-scope="scope">
          <template v-if="scope.row.SUBMITRECIPIENT">
            <el-input v-model="scope.row.SUBMITRECIPIENT" class="edit-input" placeholder="报送接收人"/>
          </template>
          <span>{{ scope.row.SUBMITRECIPIENT }}</span>
        </template>
      </el-table-column>
      <el-table-column label="报送接收人证件类型" prop="SUBMITIDTYPE2">
        <template slot-scope="scope">
          <template v-if="scope.row.SUBMITIDTYPE2">
            <el-input v-model="scope.row.SUBMITIDTYPE2" class="edit-input" placeholder="报送接收人证件类型"/>
          </template>
          <span>{{ scope.row.SUBMITIDTYPE2 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="报送接收人证件号码" prop="SUBMITIDNO2">
        <template slot-scope="scope">
          <template v-if="scope.row.SUBMITIDNO2">
            <el-input v-model="scope.row.SUBMITIDNO2" class="edit-input" placeholder="报送接收人证件号码"/>
          </template>
          <span>{{ scope.row.SUBMITIDNO2 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="报送人" prop="SUBMISSION">
        <template slot-scope="scope">
          <template v-if="scope.row.SUBMISSION">
            <el-input v-model="scope.row.SUBMISSION" class="edit-input" placeholder="报送人"/>
          </template>
          <span>{{ scope.row.SUBMISSION }}</span>
        </template>
      </el-table-column>
      <el-table-column label="报送人证件类型" prop="SUBMITIDTYPE3">
        <template slot-scope="scope">
          <template v-if="scope.row.SUBMITIDTYPE3">
            <el-input v-model="scope.row.SUBMITIDTYPE3" class="edit-input" placeholder="报送人证件类型"/>
          </template>
          <span>{{ scope.row.SUBMITIDTYPE3 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="报送人证件号码" prop="SUBMITIDNO3">
        <template slot-scope="scope">
          <template v-if="scope.row.SUBMITIDNO3">
            <el-input v-model="scope.row.SUBMITIDNO3" class="edit-input" placeholder="报送人证件号码"/>
          </template>
          <span>{{ scope.row.SUBMITIDNO3 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="报送资料流水号" prop="SUBMITMAINSERIALNO">
        <template slot-scope="scope">
          <template v-if="scope.row.SUBMITMAINSERIALNO">
            <el-input v-model="scope.row.SUBMITMAINSERIALNO" class="edit-input" placeholder="报送资料流水号"/>
          </template>
          <span>{{ scope.row.SUBMITMAINSERIALNO }}</span>
        </template>
      </el-table-column>
      <el-table-column label="通知客户日期" prop="INFORMDATE">
        <template slot-scope="scope">
          <template v-if="scope.row.INFORMDATE">
            <el-input v-model="scope.row.INFORMDATE" class="edit-input" placeholder="通知客户日期"/>
          </template>
          <span>{{ scope.row.INFORMDATE }}</span>
        </template>
      </el-table-column>
      <el-table-column label="通知客户姓名" prop="INFORMNAME">
        <template slot-scope="scope">
          <template v-if="scope.row.INFORMNAME">
            <el-input v-model="scope.row.INFORMNAME" class="edit-input" placeholder="通知客户姓名"/>
          </template>
          <span>{{ scope.row.INFORMNAME }}</span>
        </template>
      </el-table-column>
      <el-table-column label="通知客户电话" prop="INFORMPHONE">
        <template slot-scope="scope">
          <template v-if="scope.row.INFORMPHONE">
            <el-input v-model="scope.row.INFORMPHONE" class="edit-input" placeholder="通知客户电话"/>
          </template>
          <span>{{ scope.row.INFORMPHONE }}</span>
        </template>
      </el-table-column>
      <el-table-column label="通知客户流水号" prop="INFORMMAINSERIALNO">
        <template slot-scope="scope">
          <template v-if="scope.row.INFORMMAINSERIALNO">
            <el-input v-model="scope.row.INFORMMAINSERIALNO" class="edit-input" placeholder="通知客户流水号"/>
          </template>
          <span>{{ scope.row.INFORMMAINSERIALNO }}</span>
        </template>
      </el-table-column>
      <el-table-column label="领回开户许可证日期" prop="GETBACKDATE">
        <template slot-scope="scope">
          <template v-if="scope.row.GETBACKDATE">
            <el-input v-model="scope.row.GETBACKDATE" class="edit-input" placeholder="领回开户许可证日期"/>
          </template>
          <span>{{ scope.row.GETBACKDATE }}</span>
        </template>
      </el-table-column>
      <el-table-column label="领回方式" prop="GETBACKTYPE">
        <template slot-scope="scope">
          <template v-if="scope.row.GETBACKTYPE">
            <el-input v-model="scope.row.GETBACKTYPE" class="edit-input" placeholder="领回方式"/>
          </template>
          <span>{{ scope.row.GETBACKTYPE }}</span>
        </template>
      </el-table-column>
      <el-table-column label="领回交出人" prop="GETBACKHANDOVER">
        <template slot-scope="scope">
          <template v-if="scope.row.GETBACKHANDOVER">
            <el-input v-model="scope.row.GETBACKHANDOVER" class="edit-input" placeholder="领回交出人"/>
          </template>
          <span>{{ scope.row.GETBACKHANDOVER }}</span>
        </template>
      </el-table-column>
      <el-table-column label="领回接收人" prop="GETBACKRECIPIENT">
        <template slot-scope="scope">
          <template v-if="scope.row.GETBACKRECIPIENT">
            <el-input v-model="scope.row.GETBACKRECIPIENT" class="edit-input" placeholder="领回接收人"/>
          </template>
          <span>{{ scope.row.GETBACKRECIPIENT }}</span>
        </template>
      </el-table-column>
      <el-table-column label="领回人" prop="REGENERATOR">
        <template slot-scope="scope">
          <template v-if="scope.row.REGENERATOR">
            <el-input v-model="scope.row.REGENERATOR" class="edit-input" placeholder="领回人"/>
          </template>
          <span>{{ scope.row.REGENERATOR }}</span>
        </template>
      </el-table-column>
      <el-table-column label="领回开户许可证流水号" prop="GETBACKMAINSERIALNO">
        <template slot-scope="scope">
          <template v-if="scope.row.GETBACKMAINSERIALNO">
            <el-input v-model="scope.row.GETBACKMAINSERIALNO" class="edit-input" placeholder="领回开户许可证流水号"/>
          </template>
          <span>{{ scope.row.GETBACKMAINSERIALNO }}</span>
        </template>
      </el-table-column>
      <el-table-column label="领取开户许可证日期" prop="RECEIVEDATE">
        <template slot-scope="scope">
          <template v-if="scope.row.RECEIVEDATE">
            <el-input v-model="scope.row.RECEIVEDATE" class="edit-input" placeholder="领取开户许可证日期"/>
          </template>
          <span>{{ scope.row.RECEIVEDATE }}</span>
        </template>
      </el-table-column>
      <el-table-column label="领取人姓名" prop="RECEIVENAME">
        <template slot-scope="scope">
          <template v-if="scope.row.RECEIVENAME">
            <el-input v-model="scope.row.RECEIVENAME" class="edit-input" placeholder="领取人姓名"/>
          </template>
          <span>{{ scope.row.RECEIVENAME }}</span>
        </template>
      </el-table-column>
      <el-table-column label="领取人证件类型" prop="RECEIVEIDTYPE">
        <template slot-scope="scope">
          <template v-if="scope.row.RECEIVEIDTYPE">
            <el-input v-model="scope.row.RECEIVEIDTYPE" class="edit-input" placeholder="领取人证件类型"/>
          </template>
          <span>{{ scope.row.RECEIVEIDTYPE }}</span>
        </template>
      </el-table-column>
      <el-table-column label="领取人证件号码" prop="RECEIVEIDNO">
        <template slot-scope="scope">
          <template v-if="scope.row.RECEIVEIDNO">
            <el-input v-model="scope.row.RECEIVEIDNO" class="edit-input" placeholder="领取人证件号码"/>
          </template>
          <span>{{ scope.row.RECEIVEIDNO }}</span>
        </template>
      </el-table-column>
      <el-table-column label="存款人名称" prop="CUSTOMERNAME">
        <template slot-scope="scope">
          <template v-if="scope.row.CUSTOMERNAME">
            <el-input v-model="scope.row.CUSTOMERNAME" class="edit-input" placeholder="存款人名称"/>
          </template>
          <span>{{ scope.row.CUSTOMERNAME }}</span>
        </template>
      </el-table-column>
      <el-table-column label="领取开户许可证流水号" prop="RECEIVEMAINSERIALNO">
        <template slot-scope="scope">
          <template v-if="scope.row.RECEIVEMAINSERIALNO">
            <el-input v-model="scope.row.RECEIVEMAINSERIALNO" class="edit-input" placeholder="领取开户许可证流水号"/>
          </template>
          <span>{{ scope.row.RECEIVEMAINSERIALNO }}</span>
        </template>
      </el-table-column>
      <el-table-column label="账号" prop="NOTE30">
        <template slot-scope="scope">
          <template v-if="scope.row.NOTE30">
            <el-input v-model="scope.row.NOTE30" class="edit-input" placeholder="账号"/>
          </template>
          <span>{{ scope.row.NOTE30 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开户许可证号码" prop="NOTE31">
        <template slot-scope="scope">
          <template v-if="scope.row.NOTE31">
            <el-input v-model="scope.row.NOTE31" class="edit-input" placeholder="开户许可证号码"/>
          </template>
          <span>{{ scope.row.NOTE31 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开户核实日期" prop="NOTE32">
        <template slot-scope="scope">
          <template v-if="scope.row.NOTE32">
            <el-input v-model="scope.row.NOTE32" class="edit-input" placeholder="开户核实日期"/>
          </template>
          <span>{{ scope.row.NOTE32 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开户许可日期" prop="NOTE33">
        <template slot-scope="scope">
          <template v-if="scope.row.NOTE33">
            <el-input v-model="scope.row.NOTE33" class="edit-input" placeholder="开户许可日期"/>
          </template>
          <span>{{ scope.row.NOTE33 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="主管单位组织机构代码" prop="RESPONSIBLEORGANIZATIONCODE">
        <template slot-scope="scope">
          <template v-if="scope.row.RESPONSIBLEORGANIZATIONCODE">
            <el-input v-model="scope.row.RESPONSIBLEORGANIZATIONCODE" class="edit-input" placeholder="主管单位组织机构代码"/>
          </template>
          <span>{{ scope.row.RESPONSIBLEORGANIZATIONCODE }}</span>
        </template>
      </el-table-column>
      <el-table-column label="主管单位营业执照号码" prop="JJZLRECIPIENT">
        <template slot-scope="scope">
          <template v-if="scope.row.JJZLRECIPIENT">
            <el-input v-model="scope.row.JJZLRECIPIENT" class="edit-input" placeholder="主管单位营业执照号码"/>
          </template>
          <span>{{ scope.row.JJZLRECIPIENT }}</span>
        </template>
      </el-table-column>
      <el-table-column label="主管单位法定代表人证件号码" prop="RESPONSIBLEIDNO">
        <template slot-scope="scope">
          <template v-if="scope.row.RESPONSIBLEIDNO">
            <el-input v-model="scope.row.RESPONSIBLEIDNO" class="edit-input" placeholder="主管单位法定代表人证件号码"/>
          </template>
          <span>{{ scope.row.RESPONSIBLEIDNO }}</span>
        </template>
      </el-table-column>
      <el-table-column label="主管单位法定代表人证件类型" prop="RESPONSIBLEIDTYPE">
        <template slot-scope="scope">
          <template v-if="scope.row.RESPONSIBLEIDTYPE">
            <el-input v-model="scope.row.RESPONSIBLEIDTYPE" class="edit-input" placeholder="主管单位法定代表人证件类型"/>
          </template>
          <span>{{ scope.row.RESPONSIBLEIDTYPE }}</span>
        </template>
      </el-table-column>
      <el-table-column label="主管单位法定代表人姓名" prop="RESPONSIBLENAME">
        <template slot-scope="scope">
          <template v-if="scope.row.RESPONSIBLENAME">
            <el-input v-model="scope.row.RESPONSIBLENAME" class="edit-input" placeholder="主管单位法定代表人姓名"/>
          </template>
          <span>{{ scope.row.RESPONSIBLENAME }}</span>
        </template>
      </el-table-column>
      <el-table-column label="主管单位名称" prop="RESPONSIBLECOMPANYNAME">
        <template slot-scope="scope">
          <template v-if="scope.row.RESPONSIBLECOMPANYNAME">
            <el-input v-model="scope.row.RESPONSIBLECOMPANYNAME" class="edit-input" placeholder="主管单位名称"/>
          </template>
          <span>{{ scope.row.RESPONSIBLECOMPANYNAME }}</span>
        </template>
      </el-table-column>
      <el-table-column label="法定代表人证件类型" prop="LEGALPERSONCERTIFICATETYPE">
        <template slot-scope="scope">
          <template v-if="scope.row.LEGALPERSONCERTIFICATETYPE">
            <el-input v-model="scope.row.LEGALPERSONCERTIFICATETYPE" class="edit-input" placeholder="法定代表人证件类型"/>
          </template>
          <span>{{ scope.row.LEGALPERSONCERTIFICATETYPE }}</span>
        </template>
      </el-table-column>
      <el-table-column label="注册地代码" prop="REGISTEREDADRRESSCODE">
        <template slot-scope="scope">
          <template v-if="scope.row.REGISTEREDADRRESSCODE">
            <el-input v-model="scope.row.REGISTEREDADRRESSCODE" class="edit-input" placeholder="注册地代码"/>
          </template>
          <span>{{ scope.row.REGISTEREDADRRESSCODE }}</span>
        </template>
      </el-table-column>
      <el-table-column label="注册资金" prop="REGISTERCAPITAL">
        <template slot-scope="scope">
          <template v-if="scope.row.REGISTERCAPITAL">
            <el-input v-model="scope.row.REGISTERCAPITAL" class="edit-input" placeholder="注册资金"/>
          </template>
          <span>{{ scope.row.REGISTERCAPITAL }}</span>
        </template>
      </el-table-column>
      <el-table-column label="经营范围" prop="MANAGESCOPE">
        <template slot-scope="scope">
          <template v-if="scope.row.MANAGESCOPE">
            <el-input v-model="scope.row.MANAGESCOPE" class="edit-input" placeholder="经营范围"/>
          </template>
          <span>{{ scope.row.MANAGESCOPE }}</span>
        </template>
      </el-table-column>
      <el-table-column label="行业分类" prop="TRADETYPE">
        <template slot-scope="scope">
          <template v-if="scope.row.TRADETYPE">
            <el-input v-model="scope.row.TRADETYPE" class="edit-input" placeholder="行业分类"/>
          </template>
          <span>{{ scope.row.TRADETYPE }}</span>
        </template>
      </el-table-column>
      <el-table-column label="地址" prop="ADDRESS">
        <template slot-scope="scope">
          <template v-if="scope.row.ADDRESS">
            <el-input v-model="scope.row.ADDRESS" class="edit-input" placeholder="地址"/>
          </template>
          <span>{{ scope.row.ADDRESS }}</span>
        </template>
      </el-table-column>
      <el-table-column label="存款类别" prop="DEPOSITTYPE">
        <template slot-scope="scope">
          <template v-if="scope.row.DEPOSITTYPE">
            <el-input v-model="scope.row.DEPOSITTYPE" class="edit-input" placeholder="存款类别"/>
          </template>
          <span>{{ scope.row.DEPOSITTYPE }}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮编" prop="ZIPCODE">
        <template slot-scope="scope">
          <template v-if="scope.row.ZIPCODE">
            <el-input v-model="scope.row.ZIPCODE" class="edit-input" placeholder="邮编"/>
          </template>
          <span>{{ scope.row.ZIPCODE }}</span>
        </template>
      </el-table-column>
      <el-table-column label="税务登记号" prop="TAXNO">
        <template slot-scope="scope">
          <template v-if="scope.row.TAXNO">
            <el-input v-model="scope.row.TAXNO" class="edit-input" placeholder="税务登记号"/>
          </template>
          <span>{{ scope.row.TAXNO }}</span>
        </template>
      </el-table-column>
      <el-table-column label="组织特殊机构代码" prop="ORGANIZATIONCODE">
        <template slot-scope="scope">
          <template v-if="scope.row.ORGANIZATIONCODE">
            <el-input v-model="scope.row.ORGANIZATIONCODE" class="edit-input" placeholder="组织特殊机构代码"/>
          </template>
          <span>{{ scope.row.ORGANIZATIONCODE }}</span>
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
import { mapGetters } from 'vuex'
export default {
  name: 'T5511',
  data() {
    const validSixNum = (rule, value, callback) => {
    }
    return {
      ruleForm: {
        operationType: '',
        startDate: '', // 起始日期
        endDate: '', // 结束日期
        CKRMC: '', // 存款人名称
        ZMWJHM: '' // 证明文件号码
      },
      rules: {
        operationType: [
          { required: true, message: '请选择操作类型', trigger: 'change' },
          { trigger: 'change', validator: validSixNum }
        ],
        startDate: [
          { required: true, message: '请选择起始日期', trigger: 'blur' }
        ],
        endDate: [
          { required: true, message: '请选择结束日期', trigger: 'blur' }
        ],
        CKRMC: [
          { required: true, message: '请输入存款人名称', trigger: 'blur' }
        ],
        ZMWJHM: [
          { required: true, message: '请输入证明文件号码', trigger: 'blur' }
        ]
      },
      tableData: [],
      totals: 0,
      pageNum: 1, // 初始页
      pageSize: 10 //    每页的数据
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
  },
  methods: {
  }
}
</script>

<style scoped>
  .ecms-trx-button{
    text-align: center;
  }
</style>
