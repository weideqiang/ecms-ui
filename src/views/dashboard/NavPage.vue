<template>
  <div class="navpage-container">
    <el-row class="navpage-header">
      <el-row>
        <el-col :xs="8" :sm="8" :lg="8">
          <img v-if="userGender === '1'" src="@/assets/nvtouxiang48.png" style="width: 80px; height: 80px; margin: 40px 20px;border-radius: 50%;">
          <img v-else src="@/assets/nantouxiang48.png" style="width: 80px; height: 80px; margin: 40px 20px;border-radius: 50%;">
        </el-col>
        <el-col :xs="16" :sm="16" :lg="16">
          <p style="color: white;margin-top: 60px; font-size: 18px">{{ userName }}</p>
          <p style="color: #B0C8EE;margin-top: -5px">{{ userNo }}</p>
        </el-col>
      </el-row>
      <el-row >
        <el-col :xs="12" :sm="12" :lg="12">
          <p style="text-align:left; color: white; padding-left:30px;margin-top: -30px">我的工作视图</p>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="12">
          <p style="text-align:right; color: #B6C1EF; padding-right: 30px; margin-top: -30px">{{ curDate }}</p>
        </el-col>
      </el-row>
    </el-row>
    <el-row :gutter="32" style="margin: 16px 16px 0px 16px">
      <el-col :xs="6" :sm="6" :lg="6">
        <img src="@/assets/kao32.png" style="width: 64px; height: 64px;">
      </el-col>
      <el-col :xs="6" :sm="6" :lg="6">
        <img src="@/assets/yunyingguanli32.png" style="width: 64px; height: 64px;" @click="goToStatistics">
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'NavPage',
  data() {
    return {
      userNo: this.$store.getters.userInfo.userNo,
      userName: this.$store.getters.userInfo.userName,
      userGender: this.$store.getters.userInfo.gender,
      curDate: new Date().toLocaleDateString()
    }
  },
  methods: {
    goToStatistics: function() {
      this.$router.push('/perStatistics')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navpage-container {
    /*padding: 0 16px 0 16px;*/
    background-color: #FFF;
    position: relative;
    .navpage-header {
      height: 200px;
      background-color: #4990DB;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
    }
  }

</style>
