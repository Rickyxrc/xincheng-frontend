<template>
  <div class="cl">
    <el-button @click="expend" type="primary" :icon="Link" circle />
    <el-drawer
      v-model="linkOpened"
      title="更改地址"
      direction="btt"
      id="changeHref"
    >
      <p>在这里改的好处是不用刷新页面,前进/后退直接浏览器里的地址栏</p>
      <el-row>
        <el-col :span="20">
          <el-input
            v-model:model-value="href"
            @keydown.enter="gohref"
            ref="inputHref"
            :autofocus="true"
          ></el-input>
        </el-col>
        <el-col :span="4">
          <el-button @click="gohref" type="primary">更改地址</el-button>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<style scoped>
.cl {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 16384;
}
</style>

<script lang="ts" setup>
import { Link } from "@element-plus/icons-vue";
</script>

<script lang="ts">
import { defineComponent } from "vue";
import router from "../router";
import { ElNotification } from "element-plus";

export default defineComponent({
  mounted() {
    var _this = this;
    document.onkeydown = function (e) {
      // @ts-ignore
      let key = window.event.keyCode;
      if (key == 81 && e.ctrlKey) {
        // @ts-ignore
        window.event.preventDefault(); //关闭浏览器快捷键
        _this.expend();
      }
      if (key == 116 || (key == 82 && e.ctrlKey)) {
        // @ts-ignore
        window.event.preventDefault(); //关闭浏览器快捷键
        _this.$emit("flush");
        ElNotification.success("刷新成功");
      }
    };
  },
  data() {
    return {
      href: window.location.pathname,
      linkOpened: false,
    };
  },
  methods: {
    expend() {
      this.linkOpened = true;
      this.href = window.location.pathname;
      // @ts-ignore
      // this.$refs.inputHref.focus();
      //   this.$emit("expend");
    },
    gohref() {
      router.push(this.href);
      this.linkOpened = false;
      this.$emit("flush");
      //   router.push(this)
    },
  },
});
</script>
