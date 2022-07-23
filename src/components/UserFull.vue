<template>
  <el-card>
    <div style="font-size: 1.2rem">用户信息</div>
    <el-avatar shape="square" :src="src" />
    <div>
      用户名&nbsp;{{ name }}
      <el-tag :type="getType">{{ tag || "用户" }}</el-tag>
    </div>
    <div>注册邮箱&nbsp;{{ mail }}</div>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "../store";

export default defineComponent({
  setup() {
    console.log("permission", store.state.permission);
    var permission = store.state.permission;
    var gett = "";
    if (permission == 0) gett = "primary";
    if (permission == 1) gett = "success";
    if (permission == 2) gett = "warning";
    var permission = store.state.permission;
    return {
      src: "/head.png",
      name: store.state.username,
      mail: store.state.mail,
      tag: store.state.tag,
      getType: gett,
    };
  },
});
</script>
