<template>
  <el-main>
    <el-row>
      <vxe-table
        ref="DuxTable"
        :data="tableData"
        :edit-rules="validRules"
        :edit-config="{trigger: 'click', mode: 'cell'}"
        size="mini"
        align="center"
        height="400"
        resizable
        border
        highlight-hover-row
        highlight-current-row
        highlight-hover-column
        highlight-current-column>
        <vxe-table-column field="FIRST" title="（金额）第一次录入" width="auto" sortable/>
        <vxe-table-column field="SECOND" title="（金额）第二次录入" width="auto" sortable/>
        <vxe-table-column :edit-render="{name: 'input', autoselect: true}" field="RESULT" title="核对结果" width="auto" />
      </vxe-table>
    </el-row>
    <br>
    <el-row align="right">
      <el-button size="small" type="primary" @click="tiJiao">提交</el-button>
      <el-button size="small" type="primary" @click="tuiChu">退出</el-button>
    </el-row>
  </el-main>
</template>

<script>
export default {
  name: 'T70111',
  props: {
    fromfather70111: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      tableData: [],
      validRules: {
        RESULT: [
          { type: 'number', message: '必须为数字值' }
        ]
      }
    }
  },
  mounted: function() {
    this.ValueFromFather70111 = this.fromfather70111
    console.log('70111Created1:' + JSON.stringify(this.ValueFromFather70111))
    const listData = this.ValueFromFather70111[0].map
    for (let i = 0; i < listData.length; i++) {
      if (listData[i].FIRST.indexOf('.') !== 1) {
        listData[i].FIRST = listData[i].FIRST + '.00'
      }
    }
    this.tableData = listData
  },
  created() {
  },
  methods: {
    tiJiao() {
      this.$emit('sendmsgList', this.tableData)
      this.tuiChu()
    },
    tuiChu() {
      this.$emit('sendmsgExit', 'ExitT70111')
    }
  }
}
</script>

<style scoped>
  @import "../../../styles/public.css";
  .rowClass70111 {
    border-top: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
    border-left: 1px solid #e3e3e3;
    border-right: 1px solid #e3e3e3;
    width: 70%;
    margin-left: 100px;
  }
  .rowClass70111Button {
    width: 70%;
    margin-left: 100px;
  }
</style>
