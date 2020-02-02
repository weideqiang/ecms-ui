<template>
  <div class="index-container">
    <el-row class="index-header">
      <el-col :xs="21" :sm="21" :md="21" :lg="21" :xl="21">
        <div class="header-logo" @click="toggleCollapse()">
          <img src="../../assets/IndexLogo.png" width="160" height="48" style="vertical-align:middle">&nbsp;&nbsp;&nbsp;智能运营管理平台
        </div>
      </el-col>
      <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
        <div class="header-right">
          <el-dropdown trigger="click">
            <span>
              <img
                src="../../assets/userlogo.png"
                width="20"
                height="24"
                style="vertical-align:middle"
                class="el-icon-arrow-down el-icon--right">
              {{ userNo }}-{{ username }}
            </span>
            <el-dropdown-menu slot="dropdown" class="header-dropdown">
              <!--<el-dropdown-item><span @click="handlePassword">修改密码</span></el-dropdown-item>-->
              <el-dropdown-item><span @click="loginOut">退出登录</span></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col class="index-aside">
        <el-scrollbar wrap-class="scrollbar-wrapper">
          <el-menu
            :unique-opened="true"
            :collapse="isCollapse"
            default-active="1"
            background-color="transparent"
            text-color="#8adaff"
            active-text-color="#fff"
            collapse-transition="true"
            @select="handleSelect">
            <el-submenu v-for="(item,index) in trxData" :key="index+1" :index="index">
              <template slot="title">
                <i class="el-icon-menu"/>
                <span>{{ item[0].catalogueName }}</span>
              </template>
              <el-menu-item v-for="(td) in item" :key="td.trxNo" :index="td.trxNo">{{ td.trxName }}</el-menu-item>
            </el-submenu>
            <el-menu-item index="iframeComponent">
              <a style="text-decoration:none;color:#8adaff" target="_blank" href="http://10.50.55.183:3000/d/OFtK-Qrmm/jian-kong-da-ping">
                <i class="el-icon-document"/>
                <span slot="title">数据统计分析</span>
              </a>
            </el-menu-item>
          </el-menu>
        </el-scrollbar>
      </el-col>
      <el-col>
        <div class="index-main">
          <router-view/>
        </div>
      </el-col>
    </el-row>
    <!--<el-row>-->
    <!--<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24"><div class="grid-content bg-purple-light"></div></el-col>-->
    <!--</el-row>-->
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      collapseBtnClick: false,
      isCollapse: false,
      username: '',
      userNo: '',
      trxData: ''
    }
  },
  created: function() {
    /* 获取当前用户信息 */
    this.getCurUser()
    /* 获取当前用户权限信息 */
    this.getUserTrxGp()
    // this.setUserTrxListToStore()
  },
  methods: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    handleSelect(key, keyPath) {
      console.log('key:' + key + ',keypath:' + keyPath)
      if (key !== 'iframeComponent') {
        this.$router.push('/' + key)
      }
    },
    loginOut: function() {
      this.$http(this.$userMngApi.loginOut)
        .then(res => {
          console.log(res.data)
          localStorage.clear()
          this.$router.push('/')
        },
        error => {
          console.log(error)
        })
    },
    handlePassword: function() {
      console.log('22222222')
    },
    getCurUser: function() {
      this.$http(this.$userMngApi.getCurUser)
        .then(res => {
          this.username = res.data.userName
          this.userNo = res.data.userNo
        },
        error => {
          console.log(error)
        })
    },
    getUserTrxGp: function() {
      this.$http(this.$userMngApi.getUserTrxGp)
        .then(res => {
          this.trxData = res.data
          // let trxList = []
          // for (let i in this.trxData) {
          //   for (let j in this.trxData[i]) {
          //     trxList.push(this.trxData[i][j].trxNo)
          //   }
          // }

          // this.$store.dispatch('setUserTrxList', trxList)
        },
        error => {
          console.log(error)
        })
    },
    setUserTrxListToStore: function() {
      const trxList = []
      for (const i in this.trxData) {
        for (const j in this.trxData[i]) {
          trxList.push(this.trxData[i][j].trxNo)
        }
      }
      this.$store.dispatch('setUserTrxList', trxList)
    }
  }
}
</script>

<style scoped>
  .index-container {
    margin: 0px;
    padding: 0px;
    position: fixed;
    height: 100%;
    width: 100%;
    background-repeat: no-repeat;
    background-image: url('../../assets/IndexBg.png');
    background-size: 100% 100%;
  }

  .index-header {
    background: rgba(51, 117, 178, 0.15);
    color: #8adaff;
    text-align: left;
    line-height: 54px;
    min-height: 54px;
    font-size: 18px;
    font-weight: bold;
    letter-spacing: 2px;
  }

  .header-logo {
    margin-left: 30px;
  }

  .header-dropdown{
    background: rgba(8,29,65,0.5);
    border: 1px solid #3377b1;
  }

  .el-dropdown,
  .el-dropdown-menu__item{
    color: #8adaff;
  }

  .index-aside {
    margin: 20px auto auto 20px;
    max-width: 240px;
    height: 650px;
    border-radius: 0px;
    padding: 10px 35px 15px;
    background: rgba(8, 26, 71, 0.05);
    border: 1px solid #3377b1;
    box-shadow: 0 0 10px #387db7 inset;
  }
  .index-aside .el-menu {
    max-width: 230px;
    color: #8adaff;
    /*margin-left: -30px;*/
    padding-left: -30px;
    background-color: rgba(255, 255, 255, 0);
    text-align: left;
  }

  .el-menu-item:hover {
    outline: 0 !important;
    color: #409EFF !important;
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background: #409EFF !important;
  }

  .el-submenu__title:focus,
  .el-submenu__title:hover{
    background-color: rgba(27,65,110,0.5) !important;
  }

  .index-main {
    margin: 20px -45px auto 15px;
    padding-left: 50px;
    border-radius: 0px;
    min-height: 650px;
    background: rgba(8, 26, 71, 0.05);
    border: 1px solid #3377b1;
    box-shadow: 0 0 10px #387db7 inset;
  }

</style>
