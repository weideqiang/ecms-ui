<template>
  <div>
    <hr>
    <br>
    <fm-generate-form
      ref="generateForm"
      :data="jsonData"
      :remote="remoteFuncs"
      :value="editData"
      :remote-option="dynamicData"
    />
    <el-button type="primary" @click="handleSubmit">Submit</el-button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      jsonData: { 'list': [{ 'type': 'select', 'icon': 'icon-select', 'options': { 'defaultValue': '非重空凭证申请', 'multiple': false, 'disabled': false, 'clearable': false, 'placeholder': '', 'required': true, 'showLabel': false, 'width': '50%', 'options': [{ 'value': '非重空凭证申请' }, { 'value': '业务需求申请' }, { 'value': '数据提取申请' }, { 'value': '新增/更新印章申请' }, { 'value': '档案调阅申请' }, { 'value': '通用事物申请' }], 'remote': false, 'remoteType': 'option', 'remoteOption': 'option_1579399796963', 'filterable': false, 'remoteOptions': [], 'props': { 'value': 'value', 'label': 'label' }, 'remoteFunc': 'func_1579399796963', 'customClass': '', 'labelWidth': 200, 'isLabelWidth': false, 'hidden': false, 'dataBind': true }, 'name': '事务类别', 'key': '1579399796963', 'model': 'affairs-type', 'rules': [{ 'required': true, 'message': '事务类别必须填写' }] }, { 'type': 'input', 'icon': 'icon-input', 'options': { 'width': '50%', 'defaultValue': '', 'required': true, 'dataType': 'string', 'pattern': '', 'placeholder': '', 'customClass': '', 'disabled': false, 'labelWidth': 100, 'isLabelWidth': false, 'hidden': false, 'dataBind': true, 'showPassword': false, 'remoteFunc': 'func_1579400059214', 'remoteOption': 'option_1579400059214' }, 'name': '申请单位', 'key': '1579400059214', 'model': 'branch-no', 'rules': [{ 'type': 'string', 'message': '申请单位格式不正确' }, { 'required': true, 'message': '申请单位必须填写' }] }, { 'type': 'date', 'icon': 'icon-date', 'options': { 'defaultValue': '', 'readonly': false, 'disabled': false, 'editable': true, 'clearable': true, 'placeholder': '', 'startPlaceholder': '', 'endPlaceholder': '', 'type': 'date', 'format': 'yyyyMMdd', 'timestamp': false, 'required': true, 'width': '50%', 'customClass': '', 'labelWidth': 100, 'isLabelWidth': false, 'hidden': false, 'dataBind': true, 'remoteFunc': 'func_1579400356487', 'remoteOption': 'option_1579400356487' }, 'name': '申请日期', 'key': '1579400356487', 'model': 'date', 'rules': [{ 'required': true, 'message': '申请日期必须填写' }] }, { 'type': 'input', 'icon': 'icon-input', 'options': { 'width': '50%', 'defaultValue': '', 'required': true, 'dataType': 'string', 'pattern': '', 'placeholder': '', 'customClass': '', 'disabled': false, 'labelWidth': 100, 'isLabelWidth': false, 'hidden': false, 'dataBind': true, 'showPassword': false, 'remoteFunc': 'func_1579400498055', 'remoteOption': 'option_1579400498055' }, 'name': '申请人', 'key': '1579400498055', 'model': 'user-name', 'rules': [{ 'type': 'string', 'message': '申请人格式不正确' }, { 'required': true, 'message': '申请人必须填写' }] }, { 'type': 'input', 'icon': 'icon-input', 'options': { 'width': '50%', 'defaultValue': '', 'required': false, 'dataType': 'string', 'pattern': '', 'placeholder': '', 'customClass': '', 'disabled': false, 'labelWidth': 100, 'isLabelWidth': false, 'hidden': false, 'dataBind': true, 'showPassword': false, 'remoteFunc': 'func_1579400549600', 'remoteOption': 'option_1579400549600' }, 'name': '联系电话', 'key': '1579400549600', 'model': 'tel-phone', 'rules': [{ 'type': 'string', 'message': '联系电话格式不正确' }] }], 'config': { 'labelWidth': 100, 'labelPosition': 'right', 'size': 'small', 'customClass': '' }},
      editData: {},
      remoteFuncs: {

      },
      dynamicData: {

      }
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.generateForm.getData().then(data => {
        // Data verification succeeded
        alert(JSON.stringify(data))
      }).catch(e => {
        // Data verification failed
      })
    }
  }
}
</script>
