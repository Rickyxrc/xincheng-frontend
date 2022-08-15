<template>
  <keep-alive>
    <div class="common-layout" v-if="show">
      <template v-if="!api_valid()">
        <login-view @transfer="flush"></login-view>
      </template>
      <el-container v-else>
        <change-link @flush="flush" />
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
          <el-aside class="hidden-sm-and-down" style="width: 20vw">
            <menu-bar></menu-bar>
          </el-aside>
          <el-main style="max-height: 92vh; overflow: hidden; padding-top: 0">
            <el-scrollbar>
              <router-view
                style="overflow-x: hidden; margin-top: 1rem"
                @logout="clearcookie()"
              ></router-view>
            </el-scrollbar>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </keep-alive>
</template>

<style>
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
  margin: 0;
}
@keyframes anblurin {
  0% {
    transform: translateY(20px);
    filter: blur(7px);
  }
  100% {
    transform: none;
    filter: none;
  }
}
.el-card,
.el-alert,
.el-input,
.el-table,
.el-form-item,
.el-button,
.el-textarea,
.el-pagination {
  animation: anblurin 0.65s;
}
</style>

<script lang="ts" setup>
</script>

<script lang="ts">
import { defineComponent } from "vue";
import MenuBar from "./components/MenuBar.vue";
import TopBar from "./components/TopBar.vue";
import LoginView from "./views/LoginView.vue";
import store from "./store";
import PortableBar from "./components/PortableBar.vue";
import router from "./router";

export default defineComponent({
  data: () => {
    return {
      href: window.location.href,
      show: true,
      drawer: false,
      linkOpened: false,
      flushing: false,
    };
  },
  created(){
    //@ts-ignore
    store.commit("setSession", localStorage.getItem("session"));
    //@ts-ignore
    store.commit("setUser", JSON.parse(localStorage.getItem("user")));
    //@ts-ignore
    //console.log('js',JSON.parse(localStorage.getItem("user")));
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
      //console.log('debug',store.state.session);
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
      if (this.flushing)
        return;
      this.flushing = true;
      setTimeout(() => {
        this.show = false;
        this.$nextTick(() => {
          this.show = true;
          this.flushing = false;
        });
      }, 500);
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
      //console.log("OPEN");
      this.linkOpened = true;
      // this.$refs.changeHref.focus();
    },
  },
  mounted() {
    document.dispatchEvent(new Event("render-event"));
  },
});
</script>
