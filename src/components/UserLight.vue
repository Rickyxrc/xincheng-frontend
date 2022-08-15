<template>
  <span :class="getClass()">{{ name }}</span
  >&nbsp;
  <el-tag :type="getClass()">{{ tag || "用户" }}</el-tag>
</template>

<style>
.primary {
  color: #409eff;
}
.success {
  color: #67c23a;
}
.warning {
  color: #e6a23c;
}
.danger {
  color: #f56c6c;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    name: String,
    col: Number,
    tag: String,
  },
  methods: {
    getClass() {
      //console.log(this.$props.col);
      if (this.$props.col == 0) return "primary";
      if (this.$props.col == 1) return "success";
      if (this.$props.col == 2) return "warning";
      if (this.$props.col == 3) return "danger";
    },
  },
});
</script>
