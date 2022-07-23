// import { createApp } from "vue";
import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";

import VMdEditor from "@kangc/v-md-editor";
import "@kangc/v-md-editor/lib/style/base-editor.css";
import githubTheme from "@kangc/v-md-editor/lib/theme/github.js";
import "@kangc/v-md-editor/lib/theme/style/github.css";
import createKatexPlugin from "@kangc/v-md-editor/lib/plugins/katex/cdn";

import 'highlight.js/styles/atom-one-dark.css'
import cpp from 'highlight.js/lib/languages/cpp';
// import 'highlight.js/styles/default.min.css'

import hljs from "highlight.js";
hljs.registerLanguage("cpp", cpp);

VMdEditor.use(githubTheme, {
  Hljs: hljs,
});
VMdEditor.use(createKatexPlugin());

// import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/display.css";

const app = createApp(App);
app.directive("highlight", function (el) {
  const blocks = el.querySelectorAll("pre code");
  blocks.forEach((block: any) => {
    hljs.highlightBlock(block);
  });
});
app.use(VMdEditor).use(store).use(router).mount("#app");
