<template>
  <el-space
    :fill="true"
    direction="vertical"
    alignment="start"
    :size="16"
    style="width: 100%"
    v-if="stat == 200"
  >
    <el-table
      :data="tableData"
      style="width: 100%"
      v-loading="loading"
      @row-click="jump"
    >
      <el-table-column label="评测编号">
        <template #default="scope">
          {{ scope.row.rid }}
        </template>
      </el-table-column>
      <el-table-column label="用户">
        <template #default="scope">
          <user-light
            :name="scope.row.username"
            :col="scope.row.usercol"
            :tag="scope.row.usertag"
          />
        </template>
      </el-table-column>
      <el-table-column label="题目编号">
        <template #default="scope">
          {{ "XC" + scope.row.problem }}
        </template>
      </el-table-column>
      <el-table-column label="评测得分">
        <template #default="scope">
          <div v-if="scope.row.judgeinfo == 'J'">请稍等，正在评测</div>
          <div v-else>{{ getscore(scope.row.judgeinfo) }}</div>
        </template>
      </el-table-column>
      <el-table-column label="详细状态">
        <template #default="scope">
          <div v-if="scope.row.judgeinfo=='J'">评测中</div>
          <div v-else-if="scope.row.judgeinfo=='C'">编译错误</div>
          <div v-else>{{ scope.row.judgeinfo }}</div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:currentPage="pagenow"
      v-model:page-size="limit"
      layout="prev, pager, next"
      :total="total"
    />
  </el-space>
  <el-result
    icon="error"
    title="访问被拒绝"
    sub-title="登录已过期，请重新登录"
    v-else-if="stat == 403"
  >
    <template #extra>
      <el-button type="primary">Back</el-button>
    </template>
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
import { ElNotification } from "element-plus";
import { defineComponent } from "vue";
import router from "../router";
import post from "axios";
import store from "../store";

export default defineComponent({
  data() {
    return {
      pagenow: 1,
      limit: 10,
      permission: store.state.permission,
      loading: true,
      tableData: this.getData(),
      stat: 200,
      total: 0,
    };
  },
  methods: {
    getData() {
      this.loading = true;
      post(
        "https://service-13vsbdxc-1306888085.gz.apigw.tencentcs.com/records/list",
        {
          params: {
            page: this.pagenow || 1,
            limit: this.limit || 10,
            session: store.state.session,
          },
        }
      )
        .then((data: any) => {
          this.loading = false;
          this.tableData = data.data.data;
          this.stat = 200;
        })
        .catch((err) => {
          this.loading = false;
          this.stat = err.response.status;
          if (err.response.status == 403) this.$emit("logout");
        });
      post(
        "https://service-13vsbdxc-1306888085.gz.apigw.tencentcs.com/records/sum",
        {
          params: {
            session: store.state.session,
          },
        }
      )
        .then((data: any) => {
          this.loading = false;
          this.total = data.data.data.len;
          console.log("tot", data.data.data.len);
          this.stat = 200;
        })
        .catch((err) => {
          this.loading = false;
          this.stat = err.response.status;
          if (err.response.status == 403) this.$emit("logout");
        });
    },
    jump(row: any) {
      router.push("/records/" + row.rid);
    },
    getscore(scorestr: any) {
      var a = 0;
      for (var i = 0; i < scorestr.length; i++) if (scorestr[i] == "A") a++;
      return 100 * ((a * 1.0) / scorestr.length);
    },
  },
  watch: {
    pagenow() {
      this.getData();
    },
  },
});
</script>
