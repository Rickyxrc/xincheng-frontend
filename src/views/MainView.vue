<template>
  <el-alert
    title="Welcome!"
    type="success"
    description="欢迎来到新成Online Judge System!"
  />
  <el-button type="danger" plain @click="open">真的 不要点我</el-button>
  <el-button type="success" plain @click="open">CLICK ME!</el-button>
</template>

<script lang="ts" setup>
import { ElNotification, ElMessage, ElMessageBox } from "element-plus";

const errR = () => {
  for (var i = 0; i < 20; i++) {
    setTimeout(() => {
      ElNotification.error({
        title: "Network Error",
        message: "Request Error: HTTPS/1.2 TLS/1.2 Handshake Failed",
        showClose: false,
        duration: 0,
      });
      ElNotification.error({
        title: "Network Error",
        message: "Request Error: HTTPS/1.2 TLS/1.2 Handshake Failed",
        showClose: false,
        duration: 0,
        position: "bottom-right",
      });
      ElNotification.error({
        title: "Network Error",
        message: "Request Error: HTTPS/1.2 TLS/1.2 Handshake Failed",
        showClose: false,
        duration: 0,
        position: "bottom-left",
      });
      ElNotification.error({
        title: "Network Error",
        message: "Request Error: HTTPS/1.2 TLS/1.2 Handshake Failed",
        showClose: false,
        duration: 0,
        position: "top-left",
      });
      ElMessage.error({
        message: "Request Error: HTTPS/1.2 TLS/1.2 Handshake Failed",
        duration: 0,
      });
      ElMessage.warning({
        message: "Request Error: HTTPS/1.2 TLS/1.2 418 I'm a teapot",
        duration: 0,
      });
    }, i * 20);
  }
};

const open = () => {
  window.onbeforeunload = errR;
  ElMessageBox.alert("点击OK以登录", "请稍后", {
    confirmButtonText: "OK",
  })
    .then(errR)
    .catch(errR);
};
</script>
