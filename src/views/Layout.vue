<template>
  <el-container>
    <el-aside style="width: auto">
      <Aside></Aside>
    </el-aside>
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-main>
        <Tag></Tag>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import Aside from '@/components/layout/Aside.vue'
import Header from '@/components/layout/Header.vue'
import Tag from '@/components/layout/Tag.vue'

export default {
  data() {
    return {}
  },
  components: {
    Aside,
    Header,
    Tag,
  },
}
</script>
<style lang="scss" scoped>
.el-container {
  width: 100%;
  height: 100%;
}
section {
  text-align: left;
  padding: 0;
}
.el-header {
  height: 50px !important;
  padding: 0;
}
.el-main {
  padding: 4px 8px;
}
</style>
