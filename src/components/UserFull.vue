<template>
  <el-card>
    <div style="font-size: 1.2rem">用户信息</div>
    <el-avatar shape="square" :src="src" />
    <user-light :name="name" :col="color" :tag="tag"></user-light>
    <!-- <div>
      用户名&nbsp;{{ name }}
      <el-tag :type="getType">{{ tag || "用户" }}</el-tag>
    </div> -->
    <div>注册邮箱&nbsp;{{ mail }}</div>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "../store";
import UserLight from "./UserLight.vue";

export default defineComponent({
  components: { UserLight },
  setup() {
    console.log("permission", store.state.permission);
    var permission = store.state.permission;
    return {
      src: "/head.png",
      name: store.state.username,
      mail: store.state.mail,
      tag: store.state.tag,
      color: store.state.color,
    };
  },
});
</script>
