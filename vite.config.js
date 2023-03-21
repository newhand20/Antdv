import { defineConfig } from "vite";
import { resolve, dirname } from "path";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath } from 'node:url'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import {viteMockServe} from "vite-plugin-mock"
// const IS_PRODUCTION = process.env.NODE_ENV === "production";

export default defineConfig({
  lintOnSave:false,

  transpileDependencies: true,
  // vite2.x
css: {
  preprocessorOptions: {
    less: {
      lessOptions: {
        modifyVars: {
          'primary-color': '#1DA57A',
          'link-color': '#1DA57A',
          'border-radius-base': '2px',
        },
      },
      javascriptEnabled: true,
    }
  },
},
  plugins: [
    vue(),
    VueI18nPlugin({
      include: resolve(dirname(fileURLToPath(import.meta.url)), './src/locale/**'),
    }),
  ],
  server: {
    host: true,
    port: 5173,
  },
  resolve: {
    // 设置路径别名
    alias: {
      "@": resolve(__dirname, "./src"),
      "*": resolve("")
    }
  },
  server: {
    hmr:{
      overlay:false
    },
    proxyTable:{

    },
    proxy: {
      '/api': {
        changeOrigin: true,
        target: "http://127.0.0.1:3000",
        // bypass: function(req, res) {
        //   if (req.headers.accept.indexOf('html') !== -1) {
        //     console.log("Skipping proxy for browser request.");
        //     return "/index.html";
        //   } else if(process.env.MOCK !== "none") {
        //     const name = req.url
        //       .split('/api/')[1]
        //       .split('/')
        //       .join('_')
        //       .split('?')[0]
        //     const mock = require(`./mock/${name}`);
        //     const result = mock(req.method);
        //     console.log("req.method",req.method)
        //     delete require.cache[require.resolve(`./mock/${name}`)];
        //     return res.send(result);
        //   }
        //   return null;
        // }
      }
    },
  },
  // base: IS_PRODUCTION ? "/chat-system" : "./",
  // define: {
  //   "process.env": {}
  // },
  // build: {
  //   outDir: resolve(__dirname, "dist")
  // }
});