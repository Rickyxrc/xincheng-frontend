<template>
  <el-space
    fill="true"
    direction="vertical"
    alignment="start"
    :size="16"
    style="width: 100%"
  >
    <el-input v-model="searchBoxContent" placeholder="键入以搜索题目......" />
    <el-card shadow="hover" style="margin-bottom: 20px" v-if="permission > 0">
      新建题目
      <!-- <router-link :to="'/problems/XC'+(pid)+'/edit'" style="text-decoration: none;"><el-button type="primary" link>编辑</el-button></router-link> -->
    </el-card>
    <el-table
      :data="tableData"
      :row-class-name="getClassName"
      style="width: 100%"
      v-loading="loading"
      @row-click="jump"
    >
      <el-table-column prop="pid" label="PID"/>
      <el-table-column prop="score" label="分数">
        <template #default="scope">
          <span
            class="ml-2"
            v-if="scope.row.score <= 20"
            style="color: var(--el-color-danger-light-3)"
            >{{ scope.row.score }}</span
          >
          <span
            class="ml-2"
            v-else-if="scope.row.score < 100"
            style="color: var(--el-color-warning-light-3)"
            >{{ scope.row.score }}</span
          >
          <span
            class="ml-2"
            v-else-if="scope.row.score == 100"
            style="color: var(--el-color-success-light-3)"
            >{{ scope.row.score }}</span
          >
        </template>
      </el-table-column>
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
    :total="1075"
  />
  </el-space>
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
import { ElNotification } from "element-plus";
import { defineComponent } from "vue";
import router from "../router";
import post from "axios";
import store from "../store";

export default defineComponent({
  data() {
    return {
      pagenow:1,
      limit:10,
      permission: store.state.permission,
      loading: true,
      searchBoxContent: "",
      tableData: this.getData(),
    };
  },
  methods: {
    getData() {
      this.loading = true;
      post(
        "https://service-13vsbdxc-1306888085.gz.apigw.tencentcs.com/problems/list",
        {
          params: {
            page: this.pagenow || 1,
            limit: this.limit || 10,
            data: this.searchBoxContent || "",
            session: store.state.session,
          },
        }
      )
        .then((data: any) => {
          this.loading = false;
          this.tableData = data.data.data;
        })
        .catch(() => {
          ElNotification.error({
            title: "网络错误",
            message: "网络错误，请再试一次",
            showClose: false,
          });
        });
    },
    jump(row: any) {
      router.push("/problems/XC" + row.pid);
    },
    getClassName(row: any) {
      if (this.tableData[row.rowIndex].active == 0) return "inactive";
      else return "";
    },
  },
  watch: {
    searchBoxContent() {
      this.getData();
    },
    pagenow() {
      this.getData();
    }
  },
});
</script>
