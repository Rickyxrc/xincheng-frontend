<template>
  <el-space
    :fill="true"
    direction="vertical"
    alignment="start"
    :size="16"
    style="width: 100%"
  >
    <el-card shadow="hover" v-loading="loading">
      <el-page-header title="返回" @back="back">
        <template #content> XC{{ pid }}&nbsp;-&nbsp;提交答案 </template>
      </el-page-header>
    </el-card>
    <el-button @click="submit" type="primary">提交答案</el-button>
    <el-input
      v-model="code"
      :rows="60"
      type="textarea"
      placeholder="代码粘贴到这里"
    />
  </el-space>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import router from "../router/index";
import post from "axios";
import store from "../store";
import { ElNotification } from "element-plus";

export default defineComponent({
  props: {
    pid: {
      type: String,
      required: true,
    },
  },
  methods: {
    back() {
      router.go(-1);
    },
    submit() {
      this.loading = true;
      post(
        "https://service-13vsbdxc-1306888085.gz.apigw.tencentcs.com/records/submit",
        {
          params: {
            session: store.state.session,
            pid: this.$props.pid,
            code: this.code 
          },
        }
      )
        .then((data: any) => {
          this.loading = false;
          ElNotification.success({
            title: "成功",
            message: "提交成功",
          });
          router.push('/records/' + data.data.data.rid);
        })
        .catch(() => {
          ElNotification.error({
            title: "网络错误",
            message: "网络错误，请再试一次",
          });
        });
    },
  },
  data() {
    return {
      loading: false,
      permission: store.state.permission,
      code: "",
    };
  },
});
</script>
