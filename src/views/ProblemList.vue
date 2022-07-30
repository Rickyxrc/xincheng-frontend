<template>
  <el-space
    :fill="true"
    direction="vertical"
    alignment="start"
    :size="16"
    style="width: 100%"
    v-if="stat == 200"
  >
    <el-input v-model="searchBoxContent" placeholder="键入以搜索题目......" />
    <el-card shadow="hover" style="margin-bottom: 20px" v-if="permission > 0">
      管理员走这边:)<br />
      <el-input
        placeholder="pid"
        v-model="newpid"
        @keydown.enter="newProblem"
      ></el-input>
      <el-button type="primary" link @click="newProblem"
        >新建/更改题目</el-button
      >
    </el-card>
    <el-table
      :data="tableData"
      :row-class-name="getClassName"
      style="width: 100%"
      v-loading="loading"
      @row-click="jump"
    >
      <el-table-column prop="pid" label="PID" width="100" />
      <el-table-column prop="title" label="标题">
        <template #default="scope">
          {{ scope.row.title }}
          &nbsp;
          <el-tag class="ml-2" type="danger" v-if="scope.row.difficulty == 1">
            渣渣题
          </el-tag>
          <el-tag
            class="ml-2"
            type="warning"
            v-else-if="scope.row.difficulty == 2"
            >简单题
          </el-tag>
          <el-tag
            class="ml-2"
            type="success"
            v-else-if="scope.row.difficulty == 3"
            >中等题
          </el-tag>
          <el-tag class="ml-2" v-else-if="scope.row.difficulty == 4"
            >口算题
          </el-tag>
          <template v-for="i in scope.row.tags" :key="i in scope.row.tags"
            >&nbsp;<el-tag>{{ i }}</el-tag>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:currentPage="pagenow"
      v-model:page-size="limit"
      layout="prev, pager, next"
      :total="count"
    />
  </el-space>
  <el-result
    icon="error"
    title="访问被拒绝"
    sub-title="登录已过期，请重新登录"
    v-else-if="stat == 403"
  >
  </el-result>
</template>

<style>
a {
  color: rgb(58, 143, 255);
  text-decoration: none;
}

a:hover {
  color: rgb(45, 115, 207);
}

.el-table .inactive {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import router from "../router";
import axios from "axios";
import store from "../store";

export default defineComponent({
  data() {
    return {
      pagenow: 1,
      limit: 10,
      permission: store.state.permission,
      loading: true,
      searchBoxContent: "",
      tableData: this.getData(),
      stat: 200,
      count: 0,
      newpid: "",
    };
  },
  methods: {
    getData() {
      this.loading = true;

      axios({
        url: "https://service-13vsbdxc-1306888085.gz.apigw.tencentcs.com/problems/list",
        method: "post",
        params: {
          page: this.pagenow || 1,
          limit: this.limit || 10,
          data: this.searchBoxContent || "",
          session: store.state.session,
        },
      })
        .then((data: any) => {
          this.loading = false;
          this.tableData = data.data.data;
          this.count = data.data.count;
          this.stat = 200;
          console.log(data);
        })
        .catch((err) => {
          this.loading = false;
          this.stat = err.response.status;
          if (err.response.status == 403) this.$emit("logout");
        });
    },
    jump(row: any) {
      router.push("/problems/XC" + row.pid);
    },
    getClassName(row: any) {
      if (this.tableData[row.rowIndex].active == 0) return "inactive";
      else return "";
    },
    newProblem() {
      router.push("/problems/XC" + this.newpid + "/edit");
    },
  },
  watch: {
    searchBoxContent() {
      this.getData();
    },
    pagenow() {
      this.getData();
    },
  },
});
</script>
