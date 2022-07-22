import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// import importToCDN from "vite-plugin-cdn-import";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // importToCDN({
    //   modules: [
    //     {
    //       name: "vue",
    //       var: "Vue",
    //       path: `https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.37/vue.runtime.global.prod.js`,
    //     },
    //     {
    //       name: "element-plus",
    //       var: "ElementPlus",
    //       path: `https://cdnjs.cloudflare.com/ajax/libs/element-plus/2.2.9/index.full.min.js`
    //     },
    //     {
    //       name: "vuex",
    //       var: "createStore",
    //       path: `https://cdnjs.cloudflare.com/ajax/libs/vuex/4.0.2/vuex.global.min.js`
    //     },
    //     {
    //       name: "highlight.js",
    //       var: "hljs",
    //       path: ``
    //     }
    //   ],
    // }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
