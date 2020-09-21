<template>
  <div id="tag">
    <el-tag
      :key="tag.name"
      v-for="tag in tags"
      :closable="tag.name !== currentTag.name"
      :disable-transitions="false"
      effect="dark"
      :type="tag.name === currentTag.name ? 'success' : 'info'"
      @close="handleClose(tag)"
    >
      {{ tag.name }}
    </el-tag>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      currentTag: {
        path: '/label2',
        name: '标签二',
      },
    }
  },
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
  },
  computed: {
    ...mapGetters(['tags']),
  },
}
</script>
<style lang="scss" scoped>
.el-tag {
  margin-right: 8px;
  cursor: pointer;
}
.el-tag--dark.el-tag--info {
  color: #495060;
  border: 1px solid #d8dce5;
  background-color: #fff;
}
</style>
