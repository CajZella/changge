import vue from '@vitejs/plugin-vue'
import { UserConfig, ConfigEnv, loadEnv, defineConfig } from "vite";

import path from "path";
const pathSrc = path.resolve(__dirname, "src");

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd());
  const { VITE_APP_BASE_API, VITE_APP_DEV_URL } = env;
  return {
    resolve: {
      alias: {
        "@": pathSrc,
      },
    },
    plugins: [
      vue()
    ],
    css: {
      // CSS 预处理器
      preprocessorOptions: {
        //define global scss variable
        scss: {
          javascriptEnabled: true,//开启sass
          additionalData: '@import "@/styles/variables.scss";'
        }
      }
    },
    server: {
      host: '0.0.0.0',//指定服务器应该监听哪个 IP 地址
      port: 5173,//指定服务器端口号
      strictPort: true,//端口被占用直接退出
      // https: {
      //   rejectUnauthorized: false
      // }, //启用 TLS + HTTP/2
      open: false,//在开发服务器启动时自动在浏览器中打开应用程序
      proxy: {
        //配置自定义代理规则
        [VITE_APP_BASE_API]: {
          target: VITE_APP_DEV_URL,
          changeOrigin: true,
        },
        // '/api': {
        //   target: 'http://192.168.0.144:7010',
        //   changeOrigin: true,//是否跨域
        //   rewrite: (path) => path.replace(/^\/api/, ''),
        // },
      }
    },
    // 生产环境配置
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
  }
})
