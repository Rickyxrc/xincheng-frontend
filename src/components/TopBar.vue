<template>
  <el-menu class="el-menu-demo" mode="horizontal" :ellipsis="false">
    <el-menu-item>新成OJ</el-menu-item>
    <div class="flex-grow" />
    <el-popover placement="left" trigger="hover" content="content">
      <template #reference>
        <el-avatar :src="src" />
      </template>
      <template #default>
        <div
          style="display: flex; gap: 16px; flex-direction: column">
          <el-avatar shape="square" :src="src" />
          <div>
            <p style="margin: 0; font-weight: 500">
              Rickyxrc
            </p>
            <p style="margin: 0; font-size: 14px; color: var(--el-color-info)">
              @新成OJ
            </p>
          </div>

          <p style="margin: 0">
            <el-button type="primary" plain @click="logout()">登出</el-button>
          </p>
        </div>
      </template>
    </el-popover>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      src: "/head.png",
    };
  },
  name: "TopBar",
  methods: {
    logout() {
      this.$emit("logout");
    },
  },
});
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>