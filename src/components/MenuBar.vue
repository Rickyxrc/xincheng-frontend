<template>
  <el-menu :collapse="false" router="true">
    <el-menu-item index="/">
      <el-icon><icon-menu /></el-icon>
      <template #title>主页</template>
    </el-menu-item>
    <el-menu-item index="/problems/list">
      <el-icon><icon-menu /></el-icon>
      <template #title>题目列表</template>
    </el-menu-item>
    <el-menu-item index="/junior/list">
      <el-icon><icon-menu /></el-icon>
      <template #title>初赛题库</template>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const MenuBar = defineComponent({
  setup() {
    return;
  },
  name: "MenuBar",
});

export default { MenuBar };
</script>
