<template>
  <el-alert
    title="Welcome!"
    type="success"
    description="欢迎来到新成Online Judge System!" />
  <br>
  <el-alert
    title="很抱歉，刚刚错误推送，造成服务中断，仓库存储内容错位"
    type="error"
    description="如果遇到bug请马上反馈 rickyxrc@outlook.com" />
  <br>
  <el-alert
    title="我们刚刚进行了一次更新"
    type="success"
    description="upd 2022/7/16 修正未登录错误进入主页的问题，感谢 @perssonbrown" />
  <br>
  <el-button type="danger" plain @click="open">真的 不要点我</el-button>
  <el-button type="success" plain @click="open">CLICK ME!</el-button>
  <User />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElNotification,ElMessage,ElMessageBox } from 'element-plus';

export default defineComponent({
  methods: {
    errR(){
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
    },
    open(){
      window.onbeforeunload = this.errR;
      ElMessageBox.alert("点击OK以登录", "请稍后", {
        confirmButtonText: "OK",
      })
        .then(this.errR)
        .catch(this.errR);
    },
      },
    })
</script>