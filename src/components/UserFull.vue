<template>
  <el-card>
    <div style="font-size: 1.2rem">用户信息</div>
    <el-avatar :src="src" />
    <user-light :name="name" :col="color" :tag="tag"></user-light>
    <!-- <div>
      用户名&nbsp;{{ name }}
      <el-tag :type="getType">{{ tag || "用户" }}</el-tag>
    </div> -->
    <div>注册邮箱&nbsp;{{ mail }}</div>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "../store";
import UserLight from "./UserLight.vue";
import md5 from "js-md5";

export default defineComponent({
  components: { UserLight },
  setup() {
    console.log("permission", store.state.permission);
    var permission = store.state.permission;
    var src='https://cravatar.cn/avatar/245467ef31b6f0addc72b039b94122a4?f=y'
    console.log("hh",store.state.mail);
    if(store.state.mail==undefined||store.state.mail=='')
      console.log('ERR');
    else
      src=encodeURI('https://cravatar.cn/avatar/'+md5(store.state.mail));
    return {
      src:src,
      name: store.state.username,
      mail: store.state.mail,
      tag: store.state.tag,
      color: store.state.color,
    };
  },
});
</script>
