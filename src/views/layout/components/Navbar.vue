<template>
  <div class="navbar">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <breadcrumb v-if="device!=='mobile'"/>
    <div class="avatar-container">
      <span>当前用户:{{ userInfo.userNo }}-{{ userInfo.userName }}</span>&nbsp;
      <img src="@/assets/exit32.png" style="vertical-align:middle" class="user-avatar" @click="logout">
    </div>
    <!--<el-dropdown class="avatar-container" trigger="click">-->
    <!--<div class="avatar-wrapper">-->
    <!--<img src="@/assets/userlogo.png" width="20" height="24" style="vertical-align:middle" class="user-avatar">-->
    <!--<i class="el-icon-caret-bottom"/>-->
    <!--</div>-->
    <!--<el-dropdown-menu slot="dropdown" class="user-dropdown">-->
    <!--&lt;!&ndash;<router-link class="inlineBlock" to="/example/resetPwd">&ndash;&gt;-->
    <!--&lt;!&ndash;<el-dropdown-item>&ndash;&gt;-->
    <!--&lt;!&ndash;修改密码&ndash;&gt;-->
    <!--&lt;!&ndash;</el-dropdown-item>&ndash;&gt;-->
    <!--&lt;!&ndash;</router-link>&ndash;&gt;-->
    <!--<el-dropdown-item>-->
    <!--<span style="display:block;" @click="logout">退出登录</span>-->
    <!--</el-dropdown-item>-->
    <!--</el-dropdown-menu>-->
    <!--</el-dropdown>-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'userInfo'
    ]),
    device() {
      return this.$store.state.app.device
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$http(this.$userMngApi.loginOut).then(res => {
        this.$store.dispatch('LogOut')
        this.$router.push('/login')
        // location.reload()
      },
      error => {
        console.log(error)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .user-avatar {
      width: 24px;
      height: 24px;
      border-radius: 10px;
      line-height: 20px;
      cursor:pointer;
    }
  }
}
</style>

