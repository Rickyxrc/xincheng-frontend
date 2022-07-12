<template>
  <keep-alive>
    <div class="common-layout" v-if="show">
      <template v-if="!$cookies.get('api_key')">
        <login-view @transfer="setcookie"></login-view>
      </template>
      <el-container v-else>
        <el-header>
          <top-bar @logout="clearcookie"></top-bar>
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
    getcookie() {
      return this.$cookies.get('api_key')
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