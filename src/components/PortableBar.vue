<template>
  <el-drawer
    v-model="$props.open"
    title="目录"
    direction="ltr"
    :lock-scroll="true"
    size="100vw"
  >
    <menu-bar @click="close"></menu-bar>
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MenuBar from "./MenuBar.vue";

export default defineComponent({
  components: { MenuBar },
  props: {
    open: Boolean,
  },
  setup() {},
  methods: {
    close() {
      this.$emit("close");
    },
  },
});
</script>

<!-- <script lang="ts" setup>
// import { ref } from 'vue'
// import { ElMessageBox } from 'element-plus'

// const drawer = ref(true)
// const drawer2 = ref(false)
// const direction = ref('ltr')
// const radio1 = ref('Option 1')
</script> -->
