<template>
  <el-submenu
    v-if="menu.directory && menu.children.length >= 1"
    :index="menu.name"
  >
    <template slot="title">
      <i :class="menu.icon"></i>
      <span>{{ menu.label }}</span>
    </template>
    <sub-menu v-for="item in menu.children" :key="item.name" :menu="item">
    </sub-menu>
  </el-submenu>
  <el-menu-item v-else :index="menu.name" @click="gotoRoute(menu)">
    <i :class="menu.icon"></i>
    <span slot="title">{{ menu.label }}</span>
  </el-menu-item>
</template>

<script>
import SubMenu from './Menu'
export default {
  name: 'subMenu',
  props: {
    menu: {
      type: Object,
      required: true,
    },
  },
  methods: {
    gotoRoute(menu) {
      console.log(menu)
      if (menu.jump) {
        let path = menu.path.replace('/', '-')
        this.$router.push({ name: path })
        this.$store.dispatch('tag/addTag', menu)
      }
    },
  },
  components: {
    SubMenu,
  },
}
</script>

<style lang="scss" scoped></style>
