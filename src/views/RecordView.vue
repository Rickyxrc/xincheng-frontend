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
          R{{ rid }}&nbsp;-&nbsp;记录查看<el-button
            type="primary"
            @click="flush"
            link
            >点我刷新</el-button
          ></template
        >
      </el-page-header>
    </el-card>
    <el-card v-loading="loading">
      提交用户<br />
      <user-light
        :name="user.name"
        :col="user.col"
        :tag="user.tag"
      ></user-light>
    </el-card>
    <el-card v-loading="loading">
      评测结果
      <el-space
        :fill="true"
        direction="vertical"
        alignment="start"
        :size="16"
        style="width: 100%"
      >
        <template v-for="(i, ind) in reslist" :key="ind">
          <div class="stat" :class="i">
            <div>#{{ ind }}</div>
          </div>
        </template>
      </el-space>
    </el-card>
    <el-card v-loading="loading">
      源代码
      <div>
        <pre
          v-highlight
        ><code class="language-cpp" style="font-family:Consolas;border-radius: 4px;">{{code}}</code></pre>
      </div>
    </el-card>
  </el-space>
  <el-result
    icon="error"
    title="访问被拒绝"
    sub-title="您可能没有权限"
    v-else-if="stat == 403"
  >
    <template #extra>
      <el-button type="primary" @click="$router.go(-1)">Back</el-button>
    </template>
  </el-result>
  <el-result
    icon="error"
    title="找不到资源"
    sub-title="记录不存在"
    v-else-if="stat == 404"
  >
    <template #extra>
      <el-button type="primary" @click="$router.go(-1)">Back</el-button>
    </template>
  </el-result>
</template>

<style scoped>
.stat {
  width: 100%;
  height: 4rem;
  border-radius: 3px;
}
.stat > :nth-child(1) {
  color: white;
}
.stat > :nth-child(2) {
  display: none;
  font-size: 2rem;
}
.A {
  background: #67c23a;
}
.A::after {
  padding-left: 2rem;
  color: #fff;
  content: "AC:您的代码通过";
}
.W {
  background: #f56c6c;
}
.W::after {
  padding-left: 2rem;
  color: #fff;
  content: "WA:代码输出答案错误";
}
.C {
  background: #e6a23c;
}
.C::after {
  padding-left: 2rem;
  color: #fff;
  content: "CE:编译时出现错误";
}
.T::after {
  padding-left: 2rem;
  color: #fff;
  content: "TLE:运行时间超限";
}
.M::after {
  padding-left: 2rem;
  color: #fff;
  content: "MLE:运行空间超限";
}
.U::after {
  padding-left: 2rem;
  color: #fff;
  content: "UKE:评测机出现故障";
}
.R::after {
  padding-left: 2rem;
  color: #fff;
  content: "RE:运行时出错";
}
.T,
.M,
.U,
.J {
  background: #337ecc;
}
.R {
  background: #ad0ee2;
}
.J::after {
  padding-left: 2rem;
  color: #fff;
  content: "评测中";
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import router from "../router/index";
import post from "axios";
import store from "../store";
import { ElNotification } from "element-plus";
import UserLight from "../components/UserLight.vue";

export default defineComponent({
  components: { UserLight },
  props: {
    rid: {
      type: String,
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
        "http://api.oj.xjcw.com/records/get",
        {
          params: {
            session: store.state.session,
            rid: this.$props.rid,
          },
        }
      )
        .then((data: any) => {
          this.loading = false;
          // console.log(data.data);
          this.code = data.data.code;
          this.reslist = data.data.judgeinfo.split("");
          this.user.name = data.data.username;
          this.user.col = data.data.usercol;
        })
        .catch((err) => {
          console.error(err);
          this.stat = err.response.status;
        });
    },
    flush() {
      this.getRecord();
    },
  },
  data() {
    return {
      loading: false,
      stat: 200,
      tmp: this.getRecord(),
      hasPermission: true,
      code: "",
      reslist: [],
      user: {
        col: 0,
        name: "",
        tag: "",
      },
    };
  },
});
</script>
