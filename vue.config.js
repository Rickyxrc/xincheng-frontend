const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  devServer: {
    allowedHosts: [".localhost", ".gitpod.io"],
  },
  transpileDependencies: true,
});
