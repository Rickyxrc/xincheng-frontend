<template>
  <el-row style="overflow: hidden">
    <el-space
      :fill="true"
      direction="vertical"
      alignment="start"
      :size="16"
      style="width: 100%"
    >
      <el-col :span="24">
        <el-alert
          title="Welcome!"
          type="success"
          description="欢迎来到新成Online Judge System!"
        />
      </el-col>
      <el-col :span="24">
        <el-alert
          title="tips"
          type="warning"
          description="新成OJ采用单页面应用形式，请尽量不要刷新页面(你要刷我们拦不住)"
        />
      </el-col>
      <el-col :span="24">
        <el-alert
          title="我们刚刚进行了一次更新"
          type="success"
          description="upd 2022/7/23 支持提交题目."
        />
      </el-col>
      <!-- <el-col :span="6">
        <el-button type="danger" plain @click="open">真的 不要点我</el-button>
        <el-button type="success" plain @click="open">CLICK Me!</el-button>
      </el-col> -->
      <el-col :span="12">
        <user-full></user-full>
      </el-col>
    </el-space>
  </el-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ElNotification, ElMessage, ElMessageBox } from "element-plus";
import UserFull from "../components/UserFull.vue";

export default defineComponent({
  components: { UserFull },
  methods: {
    errR() {
      for (var i = 0; i < 20; i++) {
        setTimeout(() => {
          ElNotification.error({
            title: "Network error",
            message: "Request error: HTTPS/1.2 TLS/1.2 Handshake Failed",
            
          });
          ElNotification.error({
            title: "Network error",
            message: "Request error: HTTPS/1.2 TLS/1.2 Handshake Failed",
            
            position: "bottom-right",
          });
          ElNotification.error({
            title: "Network error",
            message: "Request error: HTTPS/1.2 TLS/1.2 Handshake Failed",
            
            position: "bottom-left",
          });
          ElNotification.error({
            title: "Network error",
            message: "Request error: HTTPS/1.2 TLS/1.2 Handshake Failed",
            
            position: "top-left",
          });
          ElMessage.error({
            message: "Request error: HTTPS/1.2 TLS/1.2 Handshake Failed",
          });
          ElMessage.warning({
            message: "Request error: HTTPS/1.2 TLS/1.2 418 I'm a teapot",
          });
        }, i * 20);
      }
    },
    open() {
      window.onbeforeunload = this.errR;
      ElMessageBox.alert("点击OK以登录", "请稍后", {
        confirmButtonText: "OK",
      })
        .then(this.errR)
        .catch(this.errR);
    },
  },
});
</script>
