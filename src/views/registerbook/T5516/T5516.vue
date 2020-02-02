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
      <el-table-column label="账号" prop="NOTE30">
        <template slot-scope="scope">
          <template v-if="scope.row.NOTE30">
            <el-input v-model="scope.row.NOTE30" class="edit-input" placeholder="账号"/>
          </template>
          <span>{{ scope.row.NOTE30 }}</span>
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
      <el-table-column label="开户许可证到期日" prop="NOTE33">
        <template slot-scope="scope">
          <template v-if="scope.row.NOTE33">
            <el-input v-model="scope.row.NOTE33" class="edit-input" placeholder="开户许可证到期日"/>
          </template>
          <span>{{ scope.row.NOTE33 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="流水号" prop="MAINSERIALNO">
        <template slot-scope="scope">
          <template v-if="scope.row.MAINSERIALNO">
            <el-input v-model="scope.row.MAINSERIALNO" class="edit-input" placeholder="流水号"/>
          </template>
          <span>{{ scope.row.MAINSERIALNO }}</span>
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
  name: 'T5516',
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
