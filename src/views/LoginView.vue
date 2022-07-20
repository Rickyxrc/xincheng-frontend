<template>
  <div class="fullscreen">
    <el-col :span="6" :offset="9" style="margin-top: 12vh">
      <el-card class="box-card blurin">
        <template #header>
          <div class="card-header">
            <el-form :model="userinfo" v-loading="loading">
              <el-form-item label="登录到新成OJ"> </el-form-item>
              <el-form-item label="用户">
                <el-input v-model="userinfo.username" placeholder="用户名或邮箱" />
              </el-form-item>
              <el-form-item label="密码">
                <el-input type="password" v-model="userinfo.password" placeholder="密码" show-password />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="getSession()">登录</el-button>
              </el-form-item>
            </el-form>
          </div>
        </template>
      </el-card>
    </el-col>
  </div>
</template>

<style scoped>
.fullscreen {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(limegreen, transparent),
    linear-gradient(90deg, skyblue, transparent),
    linear-gradient(-90deg, coral, transparent);

  background-blend-mode: screen;
  overflow: hidden;
}

@keyframes blurin {
  0% {
    filter: blur(40px);
    transform: translateY(20px);
    opacity: 0;
  }

  100% {}
}

.blurin {
  animation: blurin 1s;
}
</style>

<script lang="ts">
import { ElNotification } from "element-plus";
import { defineComponent } from "vue";
import post from "axios";
import store from "../store";

export default defineComponent({
  data: () => {
    return {
      loading: false,
      userinfo: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    getSession() {
      this.loading = true;
      post("https://service-c31wcqnb-1306888085.cd.apigw.tencentcs.com/users/login", {
        params: {
          username: this.userinfo.username,
          password: this.userinfo.password,
        },
      })
        .then((data: any) => {
          this.loading = false;
          store.commit("setSession", data.data.session);
          if (data.data.success != true)
            ElNotification.error({
              title: "登录失败",
              message: "用户不存在或密码错误",
            });
          else {
            post("https://service-c31wcqnb-1306888085.cd.apigw.tencentcs.com/users/getsession", {
              params: {
                session: data.data.session,
              }
            })
              .then((data: any) => {
                if (data.data.success == true) {
                  console.log(data.data.data.permission);
                  store.commit("setUser", data.data.data);
                  this.$emit("transfer");
                  ElNotification.success({
                    title: "登录成功",
                    message: "欢迎来到新成OJ!",
                  });
                  // this.username = data.data.data.username;
                  // this.mail = data.data.data.mail;
                  // this.permission = data.data.data.permission;
                  // this.tag = data.data.data.tag;
                  // this.color = data.data.data.color;
                }
                else
                  throw "ERR";
              });
          }
        })
        .catch((err: any) => {
          this.loading = false;
          ElNotification.error({
            title: "登录失败",
            message: "网络错误，请稍后再试",
          });
        });
    },
  },
});
</script>