import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";
import vitePluginImp from 'vite-plugin-imp'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // 配置按需加载
    vitePluginImp({
      libList: [
        {
          libName: "antd",
          style: (name) => `antd/es/${name}/style`,
        },
      ],
    }),
    // 兼容传统浏览器
    legacy({
      targets: ["defaults", "not IE 9"],
    }),
  ],
  css: {
    preprocessorOptions: {
      // 配置支持less
      less: {
        javascriptEnabled: true,
        // modifyVars: {
        //   '@primary-color': '#4377FE',//设置antd主题色
        // },
      },
    }
  },
});
