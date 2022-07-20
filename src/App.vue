<template>
  <keep-alive>
    <div class="common-layout" v-if="show">
      <template v-if="!api_valid()">
        <login-view @transfer="flush"></login-view>
      </template>
      <el-container v-else>
        <el-header>
          <top-bar class="top" @logout="clearcookie" style="height:8vh;"></top-bar>
        </el-header>
        <el-container>
          <el-aside class="hidden-md-and-down">
            <menu-bar></menu-bar>
          </el-aside>
          <el-main style="max-height:92vh;overflow-y: scroll;">
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </keep-alive>
</template>

<style>
@import url("https://fonts.googleapis.com/css?family=Noto+Serif+SC|PT+Serif");
* {
  font-family: "PT Serif", "Noto Serif SC", Helvetica, sans-serif;
}
.top .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}

body{
  overflow: hidden;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import MenuBar from "./components/MenuBar.vue";
import TopBar from "./components/TopBar.vue";
import LoginView from "./views/LoginView.vue";
import store from "./store";

export default defineComponent({
  data: () => {
    return {
      show: true,
    }
  },
  setup() {
    store.commit('setSession', localStorage.getItem('session'));
    store.commit('setUser', JSON.parse(localStorage.getItem('user') as string));
  }
  ,
  components: {
    MenuBar,
    TopBar,
    LoginView,
  },
  methods: {
    api_valid() {
      let session = store.state.session;
      console.log('session =[' + session + ']');
      // let cookie = this.$cookies.get('api_key');
      if ((session == null) || (session == '') || (session == undefined) || (session == 'undefined')) {
        console.log('invalid');
        return false;
      }
      else {
        console.log('valid');
        return true;
      }
    },
    flush() {
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      })
    },
    clearcookie() {
      store.commit('setSession');
      store.commit('setUser');
      this.flush();
    }
  }
});

</script>