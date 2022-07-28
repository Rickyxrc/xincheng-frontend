<template>
  <el-row style="overflow: hidden">
    <el-space
      :fill="true"
      direction="vertical"
      alignment="start"
      :size="16"
      style="width: 100%"
    >
      <el-col :span="24">
        <el-alert
          title="Welcome!"
          type="success"
          description="欢迎来到新成Online Judge System!"
        />
      </el-col>
      <el-col :span="24">
        <el-alert title="tips" type="warning">
          <template #default>
            <div>
              新成OJ采用单页面应用形式，请尽量不要刷新页面(你要刷我们拦不住),下面那个链接可以快速改地址,按下ctrl+q也可以哦.
            </div>
            <div>善用快捷键，不用刷新页面。</div>
          </template>
        </el-alert>
      </el-col>
      <el-col :span="24">
        <el-alert
          title="我们刚刚进行了一次更新"
          type="success"
          description="upd 2022/7/28 新🍊OJ上线啦！."
        />
      </el-col>
      <el-col :span="12">
        <user-full></user-full>
      </el-col>
    </el-space>
  </el-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UserFull from "../components/UserFull.vue";

export default defineComponent({
  components: { UserFull },
  methods: {},
});
</script>