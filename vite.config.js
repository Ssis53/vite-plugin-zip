/*
 * @Author: xiangfu.wu
 * @Date: 2022-08-18 16:31:25
 * @Description: 🚀
 * @FilePath: /vite-plugin-zip-file/vite.config.js
 */


import { defineConfig } from 'vite'
import path from 'path';
import { fileURLToPath } from 'url';
// import { viteZip } from './src/utils/vite-plugin-zip-flie';
// import { viteZip } from './lib/index.mjs';
import { viteZip } from 'vite-plugin-zip-file';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export default defineConfig({
  publicDir: false,
  plugins: [
    viteZip({
      folderPath: path.resolve(__dirname, 'dist'),
      outPath: path.resolve(__dirname)
    })
  ],
  server: {
    port: '4321'
  }
})


