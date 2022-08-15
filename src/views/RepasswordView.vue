<template>
  <el-space
    :fill="true"
    direction="vertical"
    alignment="start"
    :size="16"
    style="width: 100%"
  >
    <el-alert
      title="注意"
      type="warning"
      description="请注意，更改密码会登出当前所有已登录账号！如果忘记更改密码，请即时联系管理员:admin@oj.rickyxrc.top,并提供恰当的身份证明。"
    />
    <el-form label-width="6rem">
      <el-form-item label="用户名">
        <el-input v-model="Username" readonly />
      </el-form-item>
      <el-form-item label="原密码">
        <el-input
          v-model="RawPassword"
          type="password"
          placeholder="Please input password"
          show-password
        />
      </el-form-item>
      <el-form-item label="新密码">
        <el-input
          v-model="FirstPassword"
          type="password"
          placeholder="Please input password"
          show-password
        />
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input
          v-model="ConfirmPassword"
          type="password"
          placeholder="Please input password"
          show-password
        />
      </el-form-item>
      <el-form-item>
        <el-button type="warning" style="width: 100%" @click="submit()"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </el-space>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "../store";
import axios from "axios";
import { ElNotification } from "element-plus";

export default defineComponent({
  data() {
    return {
      Username: store.state.username,
      RawPassword: "",
      FirstPassword: "",
      ConfirmPassword: "",
    };
  },
  methods: {
    submit() {
      if (this.RawPassword != "" && this.FirstPassword === this.ConfirmPassword)
        axios({
          url: "http://api.oj.xjcw.com/users/repasswd",
          method: "post",
          params: {
            username: store.state.username,
            password: this.RawPassword,
            newPassword: this.FirstPassword,
          },
        })
          .then((data) => {
            ElNotification.success({
              title: "成功",
              message: "密码已经更改",
            });
            this.$emit("logout");
          })
          .catch(() => {
            ElNotification.error({
              title: "错误",
              message: "出现了一些问题，请稍后再试。",
            });
          });
      else
        ElNotification.error({
          title: "错误",
          message: "表单填写不正确",
        });
    },
  },
});
</script>
