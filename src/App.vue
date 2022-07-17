<template>
  <keep-alive>
    <div class="common-layout" v-if="show">
      <template v-if="api_valid()">
        <login-view @transfer="setcookie"></login-view>
      </template>
      <el-container v-else>
        <el-header>
          <top-bar class="top" @logout="clearcookie"></top-bar>
        </el-header>
        <el-container>
          <el-aside>
            <menu-bar></menu-bar>
          </el-aside>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </keep-alive>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Noto+Serif+SC|PT+Serif");
* {
  font-family: "PT Serif", "Noto Serif SC", Helvetica, sans-serif;
}
.top .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import MenuBar from "./components/MenuBar.vue";
import TopBar from "./components/TopBar.vue";
import LoginView from "./views/LoginView.vue";

export default defineComponent({
  data: () => {
    return {
      show: true,
    }
  },
  components: {
    MenuBar,
    TopBar,
    LoginView,
  },
  methods: {
    api_valid() {
      let cookie = this.$cookies.get('api_key');
      if ((cookie != '') && (cookie != undefined) && (cookie != 'undefined'))
        return false;
      else
        return true;
    },
    setcookie(dat: any) {
      this.$cookies.set('api_key', dat);
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    clearcookie() {
      this.$cookies.remove('api_key');
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })

    }
  }
});

</script>