<template>
  <div :class="{'has-logo':showLogo}">
    <logo :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="$route.path"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
        unique-opened
      >
        <sidebar-item v-for="route in permission_routers" :key="route.path" :item="route" :base-path="route.path"/>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import variables from '@/styles/variables.scss'
import SidebarItem from './SidebarItem'

export default {
  components: { Logo, SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    // routes() {
    //   return this.$router.options.routes
    // },
    showLogo() {
      // return this.$store.state.settings.sidebarLogo
      return true
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
