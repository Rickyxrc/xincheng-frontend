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

<style>
@import url("https://fonts.googleapis.com/css?family=Noto+Sans+SC|Josefin+Sans");
body {
  font-family: "Josefin Sans", "Noto Sans SC", Helvetica, sans-serif;
}
</style>

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
