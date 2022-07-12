<template>
  <el-card style="margin-bottom:20px;">
    <el-page-header :content="problem.name" @back="back" />
  </el-card>
  <el-row :gutter="20">
    <el-col :span="18">
      <el-card>
        <el-container v-html="problem.html">
        </el-container>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card>
        <el-form>
          <el-form-item label="题目名称"
            ><span>{{ problem.name }}</span></el-form-item
          >
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

export default defineComponent({
  props: ["pid"],
  data: () => {
    return {
      problem: {
        name: "题目名称",
        html: marked.parse("# 描述信息"),
        score: 100
      },
    };
  },
  methods: {
    back() {
      router.go(-1);
    },
  },
});
</script>
