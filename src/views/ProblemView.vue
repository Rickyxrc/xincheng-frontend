<template>
  <el-space
    fill="true"
    direction="vertical"
    alignment="start"
    :size="16"
    style="width: 100%"
  >
    <el-card v-loading="loading">
      <el-page-header :content="problem.title" @back="back" />
    </el-card>

    <el-card v-if="permission > 0">
      “权力越大，责任越大。”<br />
      <router-link
        :to="'/problems/XC' + pid + '/edit'"
        style="text-decoration: none"
        ><el-button type="primary" link>编辑</el-button></router-link
      >
    </el-card>
    <el-row :gutter="20">
      <el-col :span="18" v-loading="loading">
        <el-card>
          <v-md-editor :model-value="problem.html" mode="preview"></v-md-editor>
          <!-- <v-md-preview :text="problem.html"></v-md-preview> -->
          <!-- <el-container v-html="problem.html" style="display:block;"> -->
          <!-- </el-container> -->
        </el-card>
      </el-col>
      <el-col :span="6" v-loading="loading">
        <el-card>
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
      ).then((data: any) => {
        this.problem.title = data.data.data.title;
        this.problem.html = data.data.data.content;
        this.loading = false;
      });
    },
  },
  data() {
    return {
      loading: true,
      permission: store.state.permission,
      problem: {
        title: "",
        score: 0,
        html: "",
      },
      tmp: this.getProblem(),
    };
  },
  setup() {
  },
});
</script>
