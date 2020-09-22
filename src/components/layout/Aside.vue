<template>
  <div id="aside">
    <h3 v-if="!sideBar">我是侧边导航栏</h3>
    <h3 v-if="sideBar">导航</h3>
    <el-menu
      default-active="home"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      style="margin:0; padding:0"
      :collapse="sideBar"
    >
      <sub-menu v-for="menu in routes" :key="menu.name" :menu="menu">
      </sub-menu>
    </el-menu>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import SubMenu from './Menu'
export default {
  computed: {
    ...mapGetters(['sideBar', 'routes']),
  },
  components: {
    SubMenu,
  },
}
</script>
<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
#aside {
  height: 100%;
  h3 {
    height: 40px;
    line-height: 40px;
    background-color: #545c64;
    color: #fff;
    text-align: center;
  }
  .el-menu {
    height: calc(100% - 40px);
    border-right: 0;
  }
}
// 重置element-ui的效果
.horizontal-collapse-transition {
  transition: 0.3s width ease-in-out, 0.3s padding-left ease-in-out,
    0.3s padding-right ease-in-out;
}
</style>
