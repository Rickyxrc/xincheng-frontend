<template>
  <n-loading-bar-provider>
    <n-button>Default</n-button>
  </n-loading-bar-provider>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import { useLoadingBar } from "naive-ui";
import { NButton } from "naive-ui";

export default {
  name: "HomeView",
  components: {
    NButton,
  },
  setup() {
    const loadingBar = useLoadingBar();
    return {
      loading() {
        loadingBar.start();
      },
    };
  },
};
</script>
