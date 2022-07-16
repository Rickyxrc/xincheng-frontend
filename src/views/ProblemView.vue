<template>
  <el-card style="margin-bottom:20px;" v-loading="loading">
    <el-page-header :content="problem.title" @back="back" />
  </el-card>
  <el-row :gutter="20" v-loading="loading">
    <el-col :span="18">
      <el-card>
        <el-container v-html="problem.html">
        </el-container>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card>
        <el-form>
          <el-form-item label="题目名称"><span>{{ problem.title }}</span></el-form-item>
          <el-form-item label="分数">{{ problem.score }}</el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import router from "../router/index";
import { marked } from 'marked';
import post from "axios";

export default defineComponent({
  props: ["pid"],
  methods: {
    back() {
      router.go(-1);
    },
    getProblem() {
      post('https://service-c31wcqnb-1306888085.cd.apigw.tencentcs.com/problems/get', {
        params: {
          pid: this.$props.pid,
          session: document.cookie.split('=')[1]
        },
      })
        .then((data: any) => {
          console.log(data.data.data.context);
          // return data.data;
          this.problem.title = data.data.data.title;
          this.problem.html = marked(data.data.data.context);
          this.loading = false;
        });
    },
  },
  data() {
    return {
      loading:true,
      problem: {
        title: '',
        score: 0,
        html: ''
      },
      tmp: this.getProblem(),
    };
  },
});
</script>
