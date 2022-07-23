<template>
  <template v-if="hasPermission">
    <el-space
      :fill="true"
      direction="vertical"
      alignment="start"
      :size="16"
      style="width: 100%"
    >
      <el-card shadow="hover" v-loading="loading">
        <el-page-header title="返回" @back="back">
          <template #content> R{{ rid }}&nbsp;-&nbsp;记录查看 </template>
        </el-page-header>
      </el-card>
      <el-card>
        <div>
          <pre v-highlight><code class="language-cpp" style="font-family:Consolas">{{code}}</code></pre>
        </div>
      </el-card>
    </el-space>
  </template>
  <template v-else>
    <el-result icon="error" title="访问被拒绝" sub-title="您可能没有权限">
      <template #extra>
        <el-button type="primary" @click="$router.go(-1)">Back</el-button>
      </template>
    </el-result>
  </template>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import router from "../router/index";
import post from "axios";
import store from "../store";
import { ElNotification } from "element-plus";

export default defineComponent({
  props: {
    rid: {
      type: Number,
      required: true,
    },
  },
  methods: {
    back() {
      router.go(-1);
    },
    getRecord() {
      this.loading = true;
      post(
        "https://service-13vsbdxc-1306888085.gz.apigw.tencentcs.com/records/get",
        {
          params: {
            session: store.state.session,
            rid: this.$props.rid,
          },
        }
      )
        .then((data: any) => {
          this.loading = false;
          console.log(data.data.data[0]);
          this.code = data.data.data[0].code;
        })
        .catch((err) => {
          console.error(err);
          if (err.response.status == 403) {
            ElNotification.error({
              title: "拒绝访问",
              message: "权限不足",
            });
            this.hasPermission = false;
          } else
            ElNotification.error({
              title: "网络错误",
              message: "网络错误，请再试一次",
            });
        });
    },
  },
  data() {
    return {
      loading: false,
      tmp: this.getRecord(),
      hasPermission: true,
      code: "",
    };
  },
});
</script>
