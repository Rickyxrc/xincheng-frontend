<template>
  <div class="common-layout">
    <el-container>
      <el-header><top-bar></top-bar></el-header>
      <el-container>
        <el-aside><menu-bar></menu-bar></el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MenuBar from "@/components/MenuBar.vue";
import TopBar from "@/components/TopBar.vue";

export default defineComponent({
  components: {
    MenuBar,
    TopBar,
  },
});
</script>
