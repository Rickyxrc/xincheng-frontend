<template>
  <div class="judge-cont">
    <span v-for="(i, ind) in RecordData" :key="ind" :class="i" class="judgeres">
    </span>
  </div>
</template>

<style scoped>
.judge-cont {
  display: flex;
}
.judgeres {
  display: flex;
  width: 1.2rem;
  height: 1.2rem;
  margin-left: 0.1rem;
}
.A {
  background: #95d475;
}
.W {
  background: #f56c6c;
}
.T,
.M,
.U,
.J {
  background: #337ecc;
}
.R {
  background: #ad0ee2;
}
.C {
  background: #e6a23c;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    RecordData: String,
  },
  setup() {},
});
</script>
