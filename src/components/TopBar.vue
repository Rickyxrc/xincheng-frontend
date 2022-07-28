<template>
  <el-menu class="el-menu-demo" mode="horizontal" :ellipsis="false">
    <!-- <el-button :icon="Menu" circle /> -->
    <span style="display: flex; align-items: center; font-size: 1.2rem">
      <el-icon
        class="hidden-md-and-up"
        size="1.2rem"
        color="#409eff"
        @click="expend"
      >
        <menu-icon />
      </el-icon>
      <router-link to="/" style="color: #409eff; text-decoration: none">
        新成OJ
      </router-link>
    </span>
    <div class="flex-grow"></div>
    <el-popover placement="left" trigger="hover" content="content">
      <template #reference>
        <el-avatar :src="src" />
      </template>
      <template #default>
        <div style="display: flex; gap: 16px; flex-direction: column">
          <el-avatar :src="src" />
          <div>
            <p style="margin: 0; font-weight: 500">{{uname}}</p>
            <p style="margin: 0; font-size: 14px; color: var(--el-color-info)">
              @新成OJ
            </p>
          </div>
          <p style="margin: 0">
            <el-button type="primary" plain @click="logout()">登出</el-button>
            <el-button type="primary" link
              ><router-link to="/repasswd" style="text-decoration: none"
                >改密码！</router-link
              ></el-button
            >
          </p>
        </div>
      </template>
    </el-popover>
  </el-menu>
</template>

<script lang="ts" setup>
import { Menu as MenuIcon } from "@element-plus/icons-vue";
</script>

<script lang="ts">
import { defineComponent } from "vue";
import md5 from "js-md5";
import store from "../store";

export default defineComponent({
  data() {
    return {
      input: window.location.href,
      // src: "/head.png",
      src: encodeURI('https://cravatar.cn/avatar/' + md5(store.state.mail)),
      uname:store.state.username
    };
  },
  name: "TopBar",
  methods: {
    logout() {
      this.$emit("logout");
    },
    expend() {
      this.$emit("expend");
    },
  },
});
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>
