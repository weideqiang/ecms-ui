<template>
  <el-main>
    <template :input="input">
      <el-row>
        <el-form
          ref="form"
          :model="inputForm"
          :rules="inputRules"
          inline
          stripe="true"
          class="ecms-trx-search"
          label-position="left"
          label-width="80px">
          <el-form-item label="" prop="value" style="width: 30%; max-width: 120px">
            <el-select v-model="inputForm.value" placeholder="请选择" clearable >
              <el-option
                v-for="item in input.tableHeader"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-form-item>
          <template v-if="moduleType === 'select'">
            <el-form-item label="" prop="lable" style="width: 50%">
              <el-select v-model="inputForm.lable" placeholder="请选择" clearable >
                <el-option
                  v-for="item in selects"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
            </el-form-item>
          </template>
          <template v-else-if="moduleType === 'date'">
            <el-date-picker
              id="inputFormY"
              v-model="inputForm.lable"
              :picker-options="inputForm.pickerOptions"
              :format="inputForm.format"
              :type="inputForm.type"
              :placeholder="inputForm.placeholder"
              :value-format="inputForm.valueFormat"
              editable
              align="right"
              style="width: 50%"/>
          </template>
          <template v-else>
            <el-input v-model="inputForm.lable" class="input-with-select" placeholder="请输入内容" clearable style="width: 50%"/>
          </template>
          <el-button icon="el-icon-circle-plus-outline" @click="showInput"/>
          <el-button icon="el-icon-search" @click="inquire"/>
        </el-form>
      </el-row>
      <el-tag
        v-for="tag in dynamicTags"
        :disable-transitions="false"
        :key="tag.name"
        closable
        @close="handleClose(tag)">
        {{ tag.name }}
      </el-tag>
    </template>
  </el-main>
</template>
<script>
export default {
  props: {
    input: {
      type: Object,
      default() {
        return {
          tableHeader: [], // 表头数据 —— className:列的class名
          dynamicTags: [] // 展开行数据
        }
      }
    }
  },
  data() {
    const validateChange = (rule, value, callback) => {
      console.log('value : ' + JSON.stringify(value))
      console.log('value : ' + JSON.stringify(this.input))
      const list = this.input.tableHeader
      for (let i = 0; i < list.length; i++) {
        if (value === list[i].value) {
          this.moduleType = list[i].moduleType
          console.log('list : ' + list[i].moduleType)
          if (this.moduleType === 'date') {
            this.inputForm.pickerOptions = list[i].pickerOptions
            this.inputForm.format = list[i].format
            this.inputForm.type = list[i].type
            this.inputForm.placeholder = list[i].placeholder
            this.inputForm.valueFormat = list[i].valueFormat
          }

          this.selects = list[i].list
          this.inputForm.lable = ''
        }
      }
      if (!value || value.length === 0) {
        callback()
      } else if (value.length > 10) {
        callback(new Error('用户号不能超过10位'))
      } else {
        callback()
      }
    }
    return {
      moduleType: '',
      selects: [],
      inputForm: {
        value: '',
        lable: '',
        pickerOptions: '',
        format: '',
        type: '',
        placeholder: '',
        valueFormat: ''
      },
      inputRules: {
        value: [
          { required: true, trigger: 'change', validator: validateChange }
        ],
        lable: [
          { required: false, message: '请输入用户名称', trigger: 'blur' },
          { min: 0, max: 10, message: '长度在 0 到 200 个字符', trigger: 'blur' }
        ]
      },
      dynamicTags: [],
      inputVisible: false,
      inputValue: ''
    }
  },
  computed: {
    userTypes() { // 初始化下拉框动态数据
      const obj = []
      this.roleSlt(obj) // 查询用户类别下拉框数据
      return obj
    },
    tableHeader: function() {
      const key = [{
        prop: 'branchNo',
        label: '机构号'
      }, {
        prop: 'userNo',
        label: '用户号'
      }, {
        prop: 'userName',
        label: '用户名称'
      }, {
        prop: 'userStatusLabel',
        label: '用户状态'
      }, {
        prop: 'identTypeLabel',
        label: '证件类型'
      }, {
        prop: 'identNo',
        label: '证件号码'
      }, {
        prop: 'genderLabel',
        label: '性别'
      }, {
        prop: 'loginTypeLabel',
        label: '登录方式'
      }, {
        prop: 'tel',
        label: '联系电话'
      }, {
        prop: 'email',
        label: '电子邮箱'
      }]
      const key1 = [{
        prop: 'userNo',
        label: '用户号'
      }, {
        prop: 'userName',
        label: '用户名称'
      }]
      if (this.device === 'mobile') {
        return key1
      } else {
        return key
      }
    },
    device() {
      return this.$store.state.app.device
    }
  },
  methods: {
    selectLable: function(key, list) {
      for (let i = 0; i < list.length; i++) {
        const value = list[i].value
        if (key === value) {
          return list[i].label
        }
      }
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    showInput: function() {
      if (this.inputForm.value !== '' && this.inputForm.lable !== '') {
        console.log('this.selects : ' + JSON.stringify(this.dynamicTags))
        for (let i = 0; i < this.dynamicTags.length; i++) {
          const value = this.dynamicTags[i].value
          if (this.inputForm.value === value) {
            this.$message.error('已有该查询条件')
            return
          }
        }
        const name = this.selects
          ? this.selectLable(this.inputForm.value, this.input.tableHeader) + ':' + this.selectLable(this.inputForm.lable, this.selects)
          : this.selectLable(this.inputForm.value, this.input.tableHeader) + ':' + this.inputForm.lable
        if (this.moduleType === 'select') {
          this.selectLable(this.inputForm.value, this.input.tableHeader) + ':' + this.selectLable(this.inputForm.lable, this.selects)
        } else {
          this.selectLable(this.inputForm.value, this.input.tableHeader) + ':' + this.inputForm.lable
        }
        const a = { name: name, type: '', value: this.inputForm.value, lable: this.inputForm.lable }
        console.log('this.name : ' + JSON.stringify(name))
        this.dynamicTags.push(a)
        console.log('dynamicTags : ' + JSON.stringify(this.dynamicTags))
      }
      console.log('value : ' + JSON.stringify(this.inputForm.value))
    },
    inquire: function() { // 查询
      this.currentPage = 1
      console.log('currentPage: ' + this.currentPage) // 点击第几页
      console.log('dynamicTags: ' + JSON.stringify(this.dynamicTags)) // 点击第几页
      if (this.dynamicTags === [] || this.dynamicTags.length === 0) {
        const inputFprm = []
        inputFprm.push(this.inputForm)
        this.$emit('inquire', inputFprm)
      } else {
        this.$emit('inquire', this.dynamicTags)
      }
    }
  }
}
</script>
<style>
  /*!** 搜索域 搜索框 **!*/
  /*.ecms-trx-search .el-input__inner{*/
    /*height: 35px;*/
    /*line-height: 35px;*/
  /*}*/
  .el-form--inline .el-form-item {
    margin-right: 1px;
  }
  .el-form-item {
    margin-bottom: 5px;
  }
  .el-form--inline .el-form-item__content {
    width: 100%;
  }
  .el-select {
    width: inherit;
  }
  .el-input__inner {
    padding: 0 9px;
  }
  .el-tag {
    margin-right: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
