<template>
  <div class="fullscreen">
    <el-row justify="center">
      <el-col :span="6" :md="8" :sm="12" style="margin-top: 12vh">
        <el-card shadow="hover" class="box-card blurin">
          <template #header>
            <div class="card-header">
              <el-form :model="userinfo" v-loading="loading">
                <el-form-item label="登录到新成OJ"> </el-form-item>
                <el-form-item label="用户">
                  <el-input
                    v-model="userinfo.username"
                    placeholder="用户名或邮箱"
                  />
                </el-form-item>
                <el-form-item label="密码" @keyup.enter="getSession()">
                  <el-input
                    type="password"
                    v-model="userinfo.password"
                    placeholder="密码"
                    show-password
                  />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="getSession()"
                    >登录</el-button
                  >
                </el-form-item>
              </el-form>
            </div>
          </template>
        </el-card>
      </el-col></el-row
    >
    <div
      class="box-card blurin xc-box"
      style="margin-top: 5vh; font-size: 0.75rem"
    >
      <div style="text-align: center">“新成OJ，筑梦远航！”</div>
      <div style="text-align: center">——Rickyxrc</div>
    </div>
  </div>
</template>

<style scoped>
.fullscreen {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(#3bb7f5, #0369e6);
  /* background: linear-gradient(limegreen, transparent),
    linear-gradient(90deg, skyblue, transparent),
    linear-gradient(-90deg, coral, transparent); */
  transition: 0.5s;
  background-blend-mode: screen;
  overflow: hidden;
}

.xc-box {
  position: fixed;
  bottom: 6rem;
  width: 100vw;
  opacity: 0.75;
  background: #ffffffdd;
  padding: 0.6rem;
  backdrop-filter: blur(5px);
}

@keyframes blurin {
  0% {
    filter: blur(40px);
    transform: translateY(20px);
    opacity: 0;
  }

  100% {
  }
}

.blurin {
  animation: blurin 1s;
}
</style>

<script lang="ts">
import { ElNotification } from "element-plus";
import { defineComponent } from "vue";
import axios from "axios";
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
      axios({
        url: "http://api.oj.xjcw.com/users/login",
        method: "post",
        params: {
          username: this.userinfo.username,
          password: this.userinfo.password,
        },
      })
        .then((data: any) => {
          this.loading = false;
          store.commit("setSession", data.data.session);
          axios({
            url: "http://api.oj.xjcw.com/users/info",
            method: "post",
            params: {
              session: data.data.session,
            },
          }).then((data: any) => {
            store.commit("setUser", data.data);
            this.$emit("transfer");
            setTimeout(()=>{
              this.$emit("transfer");
            },100)
            ElNotification.success({
              title: "登录成功",
              message: "欢迎来到新成OJ!",
            });
          });
        })
        .catch((err: any) => {
          this.loading = false;
          if (err.response.status == 403)
            ElNotification.error({
              title: "登录失败",
              message: "用户名或密码错误",
            });
          else {
            //console.log(err);
            ElNotification.error({
              title: "登录失败",
              message: "网络错误，请稍后再试",
            });
          }
        });
    },
  },
});
</script>
