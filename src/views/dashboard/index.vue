<template>
  <div v-if="device!=='mobile'" class="dashboard-editor-container">
    <!--<el-row>-->
    <!--<el-button type="primary" @click="photo">拍照</el-button>-->
    <!--<el-button type="primary" @click="esignnatrue">电子签名</el-button>-->
    <!--</el-row>-->
  </div>
  <div v-else>
    <nav-page/>
  </div>
</template>

<script>
import MobileIndex from './MobileIndex'
import NavPage from './NavPage'

export default {
  name: 'Dashboard',
  components: {
    MobileIndex,
    NavPage
  },
  computed: {
    device() {
      return this.$store.state.app.device
    }
  },
  methods: {
    photo() {
      this.$router.push('/Photograph')
    },
    esignnatrue() {
      this.$router.push('/ESignnature')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>

