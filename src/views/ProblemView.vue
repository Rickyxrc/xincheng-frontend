<template>
  <el-space
    :fill="true"
    direction="vertical"
    alignment="start"
    :size="16"
    style="width: 100%"
    v-if="stat == 200"
  >
    <el-card shadow="hover" v-loading="loading">
      <el-page-header title="返回" @back="back">
        <template #content>
          {{ problem.title }}&nbsp;&nbsp;
          <router-link
            :to="'/problems/XC' + pid + '/submit'"
            style="text-decoration: none"
          >
            <el-button class="hidden-sm-and-down" type="primary" link>
              提交答案
            </el-button>
          </router-link>
        </template>
      </el-page-header>
    </el-card>
    <el-card shadow="hover" v-if="permission > 0">
      “权力越大，责任越大。”<br />
      <router-link
        :to="'/problems/XC' + pid + '/edit'"
        style="text-decoration: none"
      >
        <el-button class="hidden-sm-and-down" type="primary" link
          >编辑</el-button
        ></router-link
      >
      <el-button class="hidden-md-and-up" type="primary" link
        >大哥，移动设备上别改题目了，我都没您敬业</el-button
      >
    </el-card>
    <el-row :gutter="16">
      <el-col :md="18" :sm="24" v-loading="loading">
        <el-card shadow="hover">
          <v-md-editor :model-value="problem.html" mode="preview"></v-md-editor>
        </el-card>
      </el-col>
      <el-col :sm="24" class="hidden-md-and-up" style="height: 16px"></el-col>
      <el-col :md="6" :sm="24" v-loading="loading">
        <el-card shadow="hover">
          <el-form>
            <el-form-item label="题目名称"
              ><span>{{ problem.title }}</span></el-form-item
            >
            <el-form-item label="分数">{{ problem.score }}</el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </el-space>
  <el-result
    icon="error"
    title="访问被拒绝"
    sub-title="您没有权限查看该题目"
    v-else-if="stat == 403"
  >
    <template #extra>
      <el-button type="primary">Back</el-button>
    </template>
  </el-result>
  <el-result
    icon="error"
    title="找不到题目"
    sub-title="不存在的题目编号"
    v-else-if="stat == 404"
  >
    <template #extra>
      <el-button type="primary">Back</el-button>
      <el-button type="primary" v-if="permission > 0"
        ><router-link
          :to="'/problems/XC' + pid + '/edit'"
          style="color: #ffffff; text-decoration: none"
          >或者，现场创建一个？</router-link
        ></el-button
      >
    </template>
  </el-result>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import router from "../router/index";
import { marked } from "marked";
import post from "axios";
import store from "../store";

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
          this.stat = 200;
          this.problem.title = data.data.title;
          this.problem.html = data.data.content;
          this.loading = false;
        })
        .catch((data: any) => {
          this.loading = false;
          this.stat = data.response.status;
          if (data.response.status == 403) this.$emit("logout");
        });
    },
  },
  data() {
    return {
      loading: true,
      permission: store.state.permission,
      stat: 200,
      problem: {
        title: "",
        score: 0,
        html: "",
      },
      tmp: this.getProblem(),
    };
  },
  setup() {},
});
</script>
