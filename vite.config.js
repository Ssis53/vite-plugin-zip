/*
 * @Author: xiangfu.wu
 * @Date: 2022-08-18 16:31:25
 * @Description: 🚀
 * @FilePath: /vite-plugin-zip/vite.config.js
 */


import { defineConfig } from 'vite'
import path from 'path';
import { fileURLToPath } from 'url';
// import { vitePluginZip } from './src/utils/vite-plugin-zip.js';
import { vitePluginZip } from './lib/index.es.js';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export default defineConfig({
  publicDir: false,
  plugins: [
    vitePluginZip({
      folderPath: path.resolve(__dirname, 'dist'),
      outPath: path.resolve(__dirname)
    })
  ],
  server: {
    port: '4321'
  }
})


