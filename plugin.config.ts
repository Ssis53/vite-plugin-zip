/*
 * @Author: xiangfu.wu
 * @Date: 2022-08-18 16:59:00
 * @Description: 🚀
 * @FilePath: /vite-plugin-zip-file/plugin.config.ts
 */

import { defineConfig } from 'vite'
import path from 'path';
import { fileURLToPath } from 'url';
import pkg from './package.json';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export default defineConfig({
  publicDir: false,
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/utils/index.ts'),
      name: 'index',
      fileName: (format) => format === 'cjs'? 'index.cjs': 'index.mjs',
      formats: ['cjs', 'es'],
    },
    rollupOptions: {
      external: ['node:module', 'fs', 'path', 'url', ...Object.keys(pkg.dependencies)] //忽略处理node内置依赖
    },
    outDir: "./lib"
  }
})