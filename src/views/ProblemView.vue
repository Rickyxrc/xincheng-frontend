<template>
  <el-card style="margin-bottom:20px;" v-loading="loading">
    <el-page-header :content="problem.title" @back="back" />
  </el-card>
  <!-- {{permission}}
  <el-card style="margin-bottom:20px;" v-if="permission>0"> -->
    <!-- admin    -->
  <!-- </el-card> -->
  <el-row :gutter="20">
    <el-col :span="18" v-loading="loading">
      <el-card>
        <v-md-preview :text="problem.html"></v-md-preview>
        <!-- <el-container v-html="problem.html" style="display:block;"> -->
        <!-- </el-container> -->
      </el-card>
    </el-col>
    <el-col :span="6" v-loading="loading">
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
import store from "../store";

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
          session: store.state.session
        },
      })
        .then((data: any) => {
          this.problem.title = data.data.data.title;
          this.problem.html = marked(data.data.data.content);
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
  setup() {
    var permission = store.state.permission;
    console.log('pers',store.state.permission);
  }
});
</script>