<template>
  <span class="ml-2" v-if="score <= 20" style="color: #f89898">{{
    score
  }}</span>
  <span class="ml-2" v-else-if="score < 100" style="color: #eebe77">{{
    score
  }}</span>
  <span class="ml-2" v-else-if="score == 100" style="color: #95d475">{{
    score
  }}</span>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    score: Number,
  },
});
</script>
