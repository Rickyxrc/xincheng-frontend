<template>
  <el-menu :collapse="false" :router="true">
    <el-menu-item index="/">
      <el-icon>
        <icon-home />
      </el-icon>
      <template #title>主页</template>
    </el-menu-item>
    <el-menu-item index="/problems/list">
      <el-icon>
        <icon-list />
      </el-icon>
      <template #title>题目列表</template>
    </el-menu-item>
    <el-menu-item index="/records/list">
      <el-icon>
        <icon-list />
      </el-icon>
      <template #title>评测记录</template>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import {
  HomeFilled as IconHome,
  Expand as IconList,
} from "@element-plus/icons-vue";
</script>

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
