<template>
  <el-card style="margin-bottom: 20px" v-loading="loading">
    <el-page-header :content="'编辑题目 ' + problem.title" @back="back" />
  </el-card>
  <el-col :span="24">
    <v-md-editor v-model="problem.html" height="400px"></v-md-editor>
    <el-button type="primary" @click="submit" setle="margin-top:1rem;">提交</el-button>
    <!-- <el-card>
        <el-row>
            <el-col :span="12">
                <el-input
                    autosize
                    v-model="problem.html"        
                    type="textarea"
                    placeholder="请输入题目正文"
                />
            </el-col>
            <el-col :span="12">
                <el-container
                    style="display:block;padding-left:2rem;"
                    :span="12"
                    v-html="render()"
                />
            </el-col>
            <el-col><el-button type="primary" @click="submit">提交</el-button></el-col>
        </el-row>
      </el-card> -->
  </el-col>
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
    back() {
      router.go(-1);
    },
    getProblem() {
      post(
        "https://service-c31wcqnb-1306888085.cd.apigw.tencentcs.com/problems/get",
        {
          params: {
            pid: this.$props.pid,
            session: store.state.session,
          },
        }
      ).then((data: any) => {
        // console.log(data.data.data.content);
        // return data.data;
        this.problem.title = data.data.data.title;
        this.problem.html = data.data.data.content;
        this.loading = false;
      });
    },
    render() {
      return marked(this.problem.html);
    },
    submit() {
      post(
        "https://service-c31wcqnb-1306888085.cd.apigw.tencentcs.com/problems/edit",
        {
          params: {
            pid: this.$props.pid,
            content: this.problem.html,
            session: store.state.session,
          },
        }
      )
        .then((data: any) => {
          // console.log(data.data.data.content);
          // return data.data;
          this.loading = false;
          if (data.data.success) {
            ElNotification.success({
              title: "Success",
              message: "题目保存成功",
            });
          }
          else {
            ElNotification.error({
            title: "Network error",
            message: "网络错误，请再试一次",
          });
          }
        })
        .catch((err) => {
          console.log(err);
          ElNotification.error({
            title: "Network error",
            message: "网络错误，请再试一次",
          });
        });
    },
  },
  data() {
    return {
      loading: true,
      preview: "edit",
      problem: {
        title: "",
        score: 0,
        html: "",
      },
      tmp: this.getProblem(),
    };
  },
});
</script>
