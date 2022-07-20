import { createApp } from "vue";
import VueCookies from 'vue-cookies'
import App from "./App.vue";
import router from "./router";
import store from "./store";

import VMdPreview from '@kangc/v-md-editor/lib/preview';
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import createKatexPlugin from '@kangc/v-md-editor/lib/plugins/katex/cdn';

import Prism from 'prismjs';

VueMarkdownEditor.use(githubTheme, {
    Prism,
});  
VueMarkdownEditor.use(createKatexPlugin());
VMdPreview.use(githubTheme, {
    Prism,
});  
VMdPreview.use(createKatexPlugin());

import ElementPlus from 'element-plus';
import 'Element-plus/dist/index.css';
import 'element-plus/theme-chalk/display.css'

const app = createApp(App)
    .use(VueCookies)
    .use(ElementPlus)
    .use(VueMarkdownEditor)
    .use(VMdPreview)
    .use(store)
    .use(router)
    .mount("#app");