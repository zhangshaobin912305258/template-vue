<template>
  <div id="aside">
    <h3 v-if="!sideBar">我是侧边导航栏</h3>
    <h3 v-if="sideBar">导航</h3>
    <el-menu
      default-active="1-1"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      style="margin:0; padding:0"
      :collapse="sideBar"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item index="1-1" @click="clickMenu('1-1')">选项1</el-menu-item>
        <el-menu-item index="1-2" @click="clickMenu('1-2')">选项2</el-menu-item>
        <el-menu-item index="1-3" @click="clickMenu('1-3')">选项3</el-menu-item>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <!--<el-menu-item index="3" disabled>
                <i class="el-icon-document"></i>
                <span slot="title">导航三</span>
            </el-menu-item>-->
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
      <sub-menu v-for="menu in routes" :key="menu.name" :menu="menu">
      </sub-menu>
    </el-menu>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import SubMenu from './Menu'
export default {
  methods: {
    clickMenu(menu) {
      let routeInfo = {
        path: menu,
        name: menu,
        label: menu,
        parent: null,
        children: [],
      }
      this.$store.dispatch('tag/addTag', routeInfo)
    },
  },
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
