<template>
  <el-empty description="你在期待什么？">
    <el-button type="primary" @click="goback()">返回</el-button>
  </el-empty>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import router from "../router/index";

export default defineComponent({
  methods: {
    goback() {
      router.go(-1);
    },
  },
});
</script>
