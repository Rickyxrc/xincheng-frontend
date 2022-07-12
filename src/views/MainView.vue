<template>
  <el-alert
    title="Welcome!"
    type="success"
    description="欢迎来到新成Online Judge System!"
  />
  <br>
  <el-alert
    title="我们刚刚进行了一次更新"
    type="success"
    description="upd 2022/7/10 对用户界面进行了优化"
  />
  <br>
  <el-button type="danger" plain @click="open">真的 不要点我</el-button>
  <el-button type="success" plain @click="open">CLICK ME!</el-button>
  <el-card>
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
      });
      ElNotification.error({
        title: "Network Error",
        message: "Request Error: HTTPS/1.2 TLS/1.2 Handshake Failed",
        showClose: false,
        position: "bottom-right",
      });
      ElNotification.error({
        title: "Network Error",
        message: "Request Error: HTTPS/1.2 TLS/1.2 Handshake Failed",
        showClose: false,
        position: "bottom-left",
      });
      ElNotification.error({
        title: "Network Error",
        message: "Request Error: HTTPS/1.2 TLS/1.2 Handshake Failed",
        showClose: false,
        position: "top-left",
      });
      ElMessage.error({
        message: "Request Error: HTTPS/1.2 TLS/1.2 Handshake Failed",
      });
      ElMessage.warning({
        message: "Request Error: HTTPS/1.2 TLS/1.2 418 I'm a teapot",
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
