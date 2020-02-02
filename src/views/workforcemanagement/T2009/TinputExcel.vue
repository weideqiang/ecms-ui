<template>
  <span>
    <input class="input-file" type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" @change="exportData">
    <el-button type="primary" @click="btnClick" >Excel导入</el-button>
  </span>
</template>

<script>
/* eslint-disable vue/require-default-prop */
import XLSX from 'xlsx' // 安装依赖npm install xlsx
export default {
  name: 'TinputExcel',
  props: {
    type: String,
    default: '选择excel文件'
  },
  methods: {
    btnClick() {
      document.querySelector('.input-file').click()
    },
    exportData(event) {
      if (!event.currentTarget.files.length) {
        return
      }
      const that = this
      // 拿取文件对象
      var f = event.currentTarget.files[0]
      var name1 = event.currentTarget.files[0].name
      console.log('name1-->' + name1)
      if (f === null) {
        that.$alert('文件为空,请选择文件进行导入')
        return
      } else {
        if (f.name.indexOf('xls') === -1 && f.name.indexOf('xlsx') === -1) {
          that.$alert('文件格式不正确,请选择xls或xlsx格式Excel文件！')
          return
        }
      }
      // 用FileReader来读取
      var reader = new FileReader()
      // 重写FileReader上的readAsBinaryString方法
      FileReader.prototype.readAsBinaryString = function(f) {
        var binary = ''
        var workbook // 读取完成的数据
        var outdata // 你需要的数据
        var reader = new FileReader()
        reader.onload = function(e) {
          // 读取成Uint8Array，再转换为Unicode编码（Unicode占两个字节）
          var bytes = new Uint8Array(reader.result)
          var length = bytes.byteLength
          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i])
          }
          // 接下来就是xlsx了，具体可看api
          workbook = XLSX.read(binary, {
            type: 'binary'
          })
          console.log(workbook)
          outdata = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])
          // 自定义方法向父组件传递数据
          that.$emit('getResult', outdata, name1)
        }
        reader.readAsArrayBuffer(f)
      }
      reader.readAsBinaryString(f)
    }
  }
}
</script>

<style scoped>
  .input-file {
    display: none;
  }
</style>
