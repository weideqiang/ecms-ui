<!--region 封装的分页 table-->
<template>
  <div>
    <template :table="table">
      <el-table
        v-loading="table.loading"
        id="iTable"
        ref="mutipleTable"
        :data="data"
        :border="table.border"
        :show-summary="table.hasShowSummary"
        :summary-method="table.getSummaries"
        :expand-row-keys="expandKeys ? expandKeys : []"
        :row-key="id"
        :height="table.myHeight"
        align="center"
        style="width: 100%;"
        tooltip-effect="dark"
        @row-click="rowClick"
        @cell-dblclick="rowdbClick"
        @selection-change="handleSelectionChange">
        <el-table-column v-if="table.hasSelect && table.noneInline === 'Inline'" type="selection" width="55"/>
        <el-table-column v-if="table.hasSelect && table.noneInline === 'none'" label="选择" width="50" align="center">
          <template slot-scope="scope">
            <el-radio v-model="radio" :label="scope.$index" class="input_checkbox">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column v-if="table.hasExpand" key="expand" type="expand" class="cell-table-expand" width="1">
          <template v-if="table.noneInline" slot-scope="props">
            <el-form class="demo-table-expand" label-position="left">
              <el-form-item v-for="item in table.expands" :key="item.id" :label="item.label">
                <span>{{ props.row[item.prop] }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column v-if="table.hasShowNum" label="序号" type="index" width="50"/>
        <template v-for="item in table.tr">
          <el-table-column
            v-if="item.show !== false && item.show === 'template'"
            :class-name="item.className ? item.className : ''"
            :key="item.id"
            :label="item.label"
            :min-width="item.minWidth ? item.minWidth : ''"
            :width="item.width ? item.width : ''">
            <template slot-scope="scope">
              <template v-if="item.moduleType === 'color'">
                <el-color-picker :name="item.prop" :obj="scope" disabled/>
              </template>
              <template v-else-if="item.moduleType === 'image'">
                <img :src="item.prop" style="width: 100px; height: 100px">
              </template>
            </template>
          </el-table-column>
          <el-table-column
            v-else-if="item.show !== false && item.show !== 'template'"
            :class-name="item.className ? item.className : ''"
            :key="item.id"
            :label="item.label"
            :min-width="item.minWidth ? item.minWidth : ''"
            :prop="item.prop"
            :width="item.width ? item.width : ''"/>
        </template>
        <el-table-column
          v-if="table.hasOperation"
          :class-name="table.operation.className"
          :label="table.operation.label"
          :min-width="table.operation.minWidth ? table.operation.minWidth : ''"
          :width="table.operation.width ? table.operation.width : ''"
          column-key="operation" >
          <template slot-scope="scope">
            <el-button
              v-for="item in table.operation.data"
              :class="item.classname ? item.classname : ''"
              :key="item.id"
              :size="item.size"
              :icon="item.icon"
              type="primary"
              @click="handleOperation(scope.$index, scope.row, item.id)">
              {{ item.label }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <br v-if="!table.fanYeif">
      <template v-if="device==='mobile'">
        <el-pagination
          :total="pagesizes"
          layout="prev, pager, next"
          small
          @current-change="handleCurrentChange"/>
      </template>
      <template v-else>
        <el-pagination
          v-if="!table.fanYeif"
          :current-page="currentPage"
          :page-size="pagesize"
          :page-sizes="[5, 10, 20, 40]"
          :total="pagesizes"
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"/>
      </template>
    </template>
  </div>
</template>
<!--endregion-->
<script>
export default {
  props: {
    table: {
      type: Object,
      default() {
        return {
          hasMergeRowOrColumn: false, // 是否合并单元格
          loading: true, // 加载中动画
          hasShowSummary: false, // 是否显示表位合计行
          border: false, // 是否带有纵向边框，默认为false
          hasSelect: false, // 有无选中功能
          hasOperation: false, // 有无操作功能
          hasExpand: false, // 有无展开行功能
          hasShowNum: false, // 是否显示序号
          fanYeif: false, // 是否关闭翻页
          myHeight: 100, // 组件高度
          noneInline: 'Inline', // 是否单选 none:单选；Inline:多选
          tr: [], // 表头数据 —— className:列的class名
          // data: [], // 表格数据 —— 如需添加行class，处理数据时则需要传入class名， class需为数组
          operation: {}, // 操作功能
          expands: [] // 展开行数据
          // getSummaries(param) { // 自定义表位合计行数据
          //   // *** 此函数传入param参数
          //   console.log(param)
          //   // *** 最后返回一个数组，合计行会显示数组中的内容
          //   return []
          // }
        }
      }
    },
    data: { // 表格数据 —— 如需添加行class，处理数据时则需要传入class名， class需为数组
      type: Array,
      default() {}
    },
    currentPage: { // 表格每页显示条数
      type: Number,
      default() {}
    },
    pagesize: { // 表格初始页数
      type: Number,
      default() {}
    },
    pagesizes: { // 表格数据总条数
      type: Number,
      default() {}
    },
    expandKeys: { // 表格展开行Key值数组
      type: Array,
      default() {}
    },
    id: { // 表格展开行Key值，唯一
      type: String,
      default() {}
    },
    disabledPagination: { // 表格翻页是否禁用
      type: Boolean,
      default() {}
    }
  },
  // 数据
  data() {
    return {
      radio: ''
    }
  },
  computed: {
    device() {
      console.log('disabled====>>' + this.$store.state.app.device)
      return this.$store.state.app.device
    }
  },
  mounted() {
    console.log('' + this.table.fanYeif)
  },
  methods: {
    // 多行选中
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.$emit('handleSelectionChange', val)
      console.log('onRowClick', val)
    },
    // 显示 表格操作弹窗
    showActionTableDialog() {
      console.log(4444)
      this.$emit('handelAction')
    },
    // 表格操作按钮事件
    handleOperation(a, b, id) {
      const data = this.table.operation.data
      console.log(data)
      for (let i = 0; i < data.length; i++) {
        if (id === data[i].id) {
          console.log(data[i].Fun)
          this.$emit(data[i].Fun, a, b)
        }
      }
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      console.log(this.pagesize) // 每页下拉显示数据
      console.log(this.data)
      console.log(this.pagesizes)
      this.$emit('handleSizeChange', size)
    },
    handleCurrentChange: function(currentPage) { // 翻页
      console.log(this.currentPage) // 点击第几页
      this.$emit('handleCurrentChange', currentPage)
    },
    // 点击某一行时触发的函数
    // *** 按下左键然后移动鼠标到其它列放开左键，会有报错 -- 优化：添加点击行参数，
    rowClick(Row, Event, Column) {
      if (!Column || Column.type === 'selection' || Column.columnKey === 'operation' || Column.type === 'expand') {
        return
      }
      const data = { row: Row, event: Event, column: Column }
      this.$emit('onRowClick', data)
      // 赋值给radio
      this.multipleSelection = Row
      this.$emit('handleSelectionChange', Row)
    },
    // 双击某一行时触发的函数
    // *** 按下左键然后移动鼠标到其它列放开左键，会有报错 -- 优化：添加点击行参数，
    rowdbClick(Row, Event, Column) {
      if (!Column || Column.type === 'selection' || Column.columnKey === 'operation' || Column.type === 'expand') {
        return
      }
      const data = { row: Row, event: Event, column: Column }
      this.$emit('onRowdbClick', data)
    },
    // 行类名的回调函数
    // 在表格数据中添加class字段即为表格行类名，配合css可对表格行中的自定义标签进行样式优化
    rowClassName(rowdata) {
      const data = this.table.data
      let className = data[rowdata.rowIndex].class ? data[rowdata.rowIndex].class : ''
      if (className.length === 0) {
        return
      }
      className = className.join(' ')
      return className
    }
  }
}
</script>
<style scoped>
</style>
<style>
  .el-table td, .el-table th.is-leaf {
    text-align: -webkit-center;
  }
  /*操作按钮字体大小和内容与按钮距离*/
  .el-button--mini, .el-button--mini.is-round {
    padding: 4px 3px;
    font-size: 10px;
  }
  /*操作按钮字体与图标间距*/
  .el-button [class*=el-icon-]+span {
    margin-left: 1px;
  }
  /*操作按钮之间间距*/
  .el-button+.el-button {
    margin-left: 5px;
  }
  /*表格列与列之间的间距*/
  .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
    padding-left: 5px;
  }
  /*隐藏展开行箭头*/
  .el-table__expand-icon {
    visibility: hidden;
  }
  .cell-table-expand {
    text-align: left;
  }
  /*调整展开行中表单内容位置*/
  .el-table__expanded-cell[class*=cell] {
    padding: 20px 33px;
    text-align: left;
  }
  .el-form--label-left .el-form-item__label {
    width: auto;
  }
  .el-table__header .el-table-column--selection .cell {
    display: none;
  }
  .input_checkbox {
    margin:2px 2px 0 20px; float:left; vertical-align:middle;
  }
</style>
