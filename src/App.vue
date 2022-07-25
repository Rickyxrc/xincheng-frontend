<template>
  <keep-alive>
    <div class="common-layout" v-if="show">
      <template v-if="!api_valid()">
        <login-view @transfer="flush"></login-view>
      </template>
      <el-container v-else>
        <!-- <div class="cl"> -->
          <change-link @flush="flush" />
        <!-- </div> -->
        <el-header>
          <top-bar
            class="top"
            @logout="clearcookie"
            @expend="openlbar"
            style="height: 8vh"
          ></top-bar>
        </el-header>
        <el-container>
          <portable-bar
            class="hidden-md-and-up"
            v-model:open="drawer"
            @close="closelbar"
          ></portable-bar>
          <el-aside class="hidden-md-and-down" style="width: 20vw">
            <menu-bar></menu-bar>
          </el-aside>
          <el-main style="max-height: 92vh; overflow: hidden; padding-top: 0">
            <el-scrollbar>
              <router-view
                style="overflow-x: hidden; margin-top: 1rem"
              ></router-view>
            </el-scrollbar>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </keep-alive>
</template>

<style>
@import url("https://fonts.googleapis.com/css?family=Noto+Serif+SC|PT+Serif|Fira+Code");
* {
  font-family: "Fira Code", "PT Serif", "Noto Serif SC", Helvetica, sans-serif;
}
.top .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}

body {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>


<script lang="ts" setup>
store.commit("setSession", localStorage.getItem("session"));
store.commit("setUser", JSON.parse(localStorage.getItem("user") as string));
</script>

<script lang="ts">
import { defineComponent } from "vue";
import MenuBar from "./components/MenuBar.vue";
import TopBar from "./components/TopBar.vue";
import LoginView from "./views/LoginView.vue";
import store from "./store";
import PortableBar from "./components/PortableBar.vue";
import router from "./router";
import { ElNotification } from "element-plus";

export default defineComponent({
  data: () => {
    return {
      href: window.location.href,
      show: true,
      drawer: false,
      linkOpened: false,
    };
  },

  components: {
    MenuBar,
    TopBar,
    LoginView,
    PortableBar,
  },
  methods: {
    gohref() {
      // window.location.href = this.href;
      // router.go(this.href);
      router.push(this.href);
    },
    api_valid() {
      let session = store.state.session;
      // let cookie = this.$cookies.get('api_key');
      if (
        session == null ||
        session == "" ||
        session == undefined ||
        session == "undefined"
      )
        return false;
      else return true;
    },
    flush() {
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    clearcookie() {
      store.commit("setSession");
      store.commit("setUser");
      this.flush();
    },
    openlbar() {
      this.drawer = true;
    },
    closelbar() {
      this.drawer = false;
    },
    expend() {
      console.log("OPEN");
      this.linkOpened = true;
      // this.$refs.changeHref.focus();
    },
  },
});
</script>
