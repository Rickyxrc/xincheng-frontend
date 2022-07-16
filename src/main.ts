import { createApp } from "vue";
import VueCookies from 'vue-cookies'
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
    .use(VueCookies)
    .use(ElementPlus)
    .use(store)
    .use(router)
    .mount("#app");