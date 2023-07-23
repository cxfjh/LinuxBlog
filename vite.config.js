// 本地模式
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  base: './',
  parallel: true,
  plugins: [
    legacy({ targets: ['defaults', 'not IE 11', 'android >= 8'] }),
    vue(),
  ],
  build: {
    target: 'es2015',
    outDir: 'LinuxBlog',
    assetsDir: 'assets',
    assetsInlineLimit: 4096,
    cssCodeSplit: false,
    inlineDynamicImports: false,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    codeSplit: false,
  }
})


// // 联网模式
// import { defineConfig } from 'vite';
// import vue from '@vitejs/plugin-vue';
// import legacy from '@vitejs/plugin-legacy';

// export default defineConfig({
//   base: './',
//   parallel: true,
//   plugins: [
//     legacy({ targets: ['defaults', 'not IE 11', 'android >= 8', 'ios >= 10'] }),
//     vue(),
//   ],
//   build: {
//     target: 'es2015',
//     outDir: 'LinuxBlog',
//     cssCodeSplit: false,
//     inlineDynamicImports: false,
//     terserOptions: {
//       compress: {
//         drop_console: true,
//         drop_debugger: true
//       }
//     },
//     codeSplit: false
//   }
// })

