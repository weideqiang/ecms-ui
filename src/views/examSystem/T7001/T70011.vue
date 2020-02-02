<template>
  <el-main>
    <el-tabs v-model="activeName" :tab-position="tabPosition" type="border-card" @tab-click="handleClick">
      <el-tab-pane :key="'One'" label="单题录入" name="One">
        <child1 v-if="isChildUpdate1" @sendmsgExit="getMsgExit" />
      </el-tab-pane>
      <el-tab-pane :key="'Two'" label="批量录入" name="Two">
        <child2 v-if="isChildUpdate2" @sendmsgExit="getMsgExit" />
      </el-tab-pane>
    </el-tabs>
  </el-main>
</template>

<script>
import tabZujianChild1 from './T700111'
import tabZujianChild2 from './T700112'
export default {
  name: 'T70011',
  components: {
    child1: tabZujianChild1,
    child2: tabZujianChild2
  },
  props: {
    fromfather7001: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      ValueFromFather7001: [],
      tabPosition: 'top',
      activeName: 'One',
      isChildUpdate1: true,
      isChildUpdate2: false
    }
  },
  created() {
    this.ValueFromFather7001 = this.fromfather7001
  },
  methods: {
    getMsgExit(data) {
      console.log('Data11111111111111111111' + data)
      if (data === 'Exit700111') {
        this.$emit('sendmsgExit', 'Exit70011')
      }
    },
    handleClick(tab) {
      if (tab.name === 'One') {
        this.isChildUpdate1 = true
        this.isChildUpdate2 = false
      } else if (tab.name === 'Two') {
        this.isChildUpdate1 = false
        this.isChildUpdate2 = true
      }
    }
  }
}
</script>

<style scoped>
  @import "../../../styles/public.css";
</style>
