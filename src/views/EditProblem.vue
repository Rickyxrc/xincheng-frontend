<template>
  <el-space
    class="hidden-sm-and-down"
    :fill="true"
    direction="vertical"
    alignment="start"
    :size="16"
    style="width: 100%"
    v-if="stat == 200 || stat == 404"
  >
    <el-card shadow="hover" v-loading="loading">
      <el-page-header :content="'编辑题目 ' + problem.title" @back="back" />
    </el-card>
    <el-alert
      title="Welcome!"
      type="success"
      description="这道题目目前还不存在，提交后自动生成题目，感谢贡献。"
      v-if="stat==404"
    />
    <el-card shadow="hover">
      <el-form :model="problem" label-width="120px">
        <el-form-item label="标题">
          <el-input v-model="problem.title" />
        </el-form-item>
        <el-form-item label="题目难度">
          <el-input v-model="problem.difficulty" />
        </el-form-item>
        <el-form-item label="激活">
          <el-switch v-model="problem.active" />
        </el-form-item>
      </el-form>
    </el-card>
    <v-md-editor v-model="problem.html"></v-md-editor>
    <el-button type="primary" @click="submit" setle="margin-top:1rem;"
      >提交</el-button
    >
    <el-button class="hidden-md-and-up" type="primary" link
      >你还非要改链接进来！？不可能！</el-button
    >
  </el-space>
  <el-result
    icon="error"
    title="访问被拒绝"
    sub-title="您可能不是管理员，或登录过期"
    v-else-if="stat == 403"
  >
    <template #extra>
      <el-button type="primary">Back</el-button>
    </template>
  </el-result>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import router from "../router/index";
import { marked } from "marked";
import post from "axios";
import { ElNotification } from "element-plus";
import store from "../store";

export default defineComponent({
  props: ["pid"],
  methods: {
    setup() {},
    back() {
      router.go(-1);
    },
    getProblem() {
      post(
        "https://service-13vsbdxc-1306888085.gz.apigw.tencentcs.com/problems/get",
        {
          params: {
            pid: this.$props.pid,
            session: store.state.session,
          },
        }
      )
        .then((data: any) => {
          // return data.data;
          this.problem.title = data.data.data.title;
          this.problem.html = data.data.data.content;
          this.problem.difficulty = data.data.data.difficulty;
          this.problem.active = Boolean(data.data.data.active);
          console.log(data.data.data);
          this.loading = false;
        })
        .catch((err: any) => {
          this.stat = err.response.status;
          if (store.state.permission < 1) this.stat = 403;
          if (this.stat == 404) this.problem.difficulty = 1;
          this.loading = false;
        });
    },
    render() {
      return marked(this.problem.html);
    },
    submit() {
      post(
        "https://service-13vsbdxc-1306888085.gz.apigw.tencentcs.com/problems/new",
        {
          params: {
            pid: this.$props.pid,
            content: this.problem.html,
            session: store.state.session,
            title: this.problem.title,
            difficulty: this.problem.difficulty,
            active: this.problem.active ? 1 : 0,
          },
        }
      )
        .then((data: any) => {
          // return data.data;
          this.loading = false;
          if (data.data.success) {
            ElNotification.success({
              title: "Success",
              message: "题目保存成功",
            });
          } else {
            ElNotification.error({
              title: "Network error",
              message: "网络错误，请再试一次",
            });
          }
        })
        .catch((err) => {
          this.stat = err.response.status;
          this.loading = false;
        });
    },
  },
  data() {
    return {
      loading: true,
      stat: 200,
      problem: {
        title: "",
        html: "",
        difficulty: -1,
        active: false,
      },
      tmp: this.getProblem(),
    };
  },
});
</script>
