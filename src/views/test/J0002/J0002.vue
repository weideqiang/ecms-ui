<template>
  <div>
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
      jsonData: {
        'list': [{
          'type': 'input',
          'icon': 'icon-input',
          'options': {
            'width': '100%',
            'defaultValue': '',
            'required': false,
            'dataType': 'string',
            'pattern': '',
            'placeholder': '',
            'customClass': '',
            'disabled': false,
            'labelWidth': 100,
            'isLabelWidth': false,
            'hidden': false,
            'dataBind': true,
            'showPassword': false,
            'remoteFunc': 'func_1579585975810',
            'remoteOption': 'option_1579585975810'
          },
          'name': '单行文本',
          'key': '1579585975810',
          'model': 'input_1579585975810',
          'rules': [{ 'type': 'string', 'message': '单行文本格式不正确' }]
        }, {
          'type': 'tabs',
          'icon': 'icon-tabs',
          'tabs': [{
            'label': 'Tab 1',
            'name': 'tab_1',
            'list': [{
              'type': 'textarea',
              'icon': 'icon-diy-com-textarea',
              'options': {
                'width': '100%',
                'defaultValue': '',
                'required': false,
                'disabled': false,
                'pattern': '',
                'placeholder': '',
                'customClass': '',
                'labelWidth': 100,
                'isLabelWidth': false,
                'hidden': false,
                'dataBind': true,
                'remoteFunc': 'func_1579586203778',
                'remoteOption': 'option_1579586203778'
              },
              'name': '多行文本',
              'key': '1579586203778',
              'model': 'textarea_1579586203778',
              'rules': []
            }]
          }],
          'options': {
            'type': '',
            'tabPosition': 'top',
            'customClass': '',
            'hidden': false,
            'remoteFunc': 'func_1579586199311',
            'remoteOption': 'option_1579586199311'
          },
          'name': '标签页',
          'key': '1579586199311',
          'model': 'tabs_1579586199311',
          'rules': []
        }], 'config': { 'labelWidth': 100, 'labelPosition': 'right', 'size': 'small', 'customClass': '' }
      },
      editData: {},
      remoteFuncs: {},
      dynamicData: {}
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
