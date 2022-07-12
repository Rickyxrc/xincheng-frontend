<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect">
    <el-menu-item>新成OJ</el-menu-item>
    <div class="flex-grow" />
    <el-popover
      placement="left"
      trigger="hover"
      content="content">
      <template #reference>
        <el-avatar :src="src" />
      </template>
      <template #default>
        <div
          class="demo-rich-conent"
          style="display: flex; gap: 16px; flex-direction: column">
          <el-avatar shape="square" :src="src" />
          <div>
            <p
              class="demo-rich-content__name"
              style="margin: 0; font-weight: 500">
              Rickyxrc
            </p>
            <p
              class="demo-rich-content__mention"
              style="margin: 0; font-size: 14px; color: var(--el-color-info)">
              @新成OJ
            </p>
          </div>

          <p class="demo-rich-content__desc" style="margin: 0">
            <el-button type="primary" plain @click="logout()">登出</el-button>
          </p>
        </div>
      </template>
    </el-popover>

  </el-menu>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TopBar', methods: {
    logout() {
      this.$emit('logout');
    },
  }
})
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>