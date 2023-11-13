# vite-plugin-zip-file
[![MIT LICENSE](https://img.shields.io/badge/LICENSE-MIT-green)](./LICENSE)
 ![size](https://img.shields.io/bundlephobia/min/vite-plugin-zip-file)
[![downloads](https://img.shields.io/npm/dw/vite-plugin-zip-file)](https://www.npmjs.com/package/vite-plugin-zip-file)

Zip files at build time.

# Install

```
yarn add vite-plugin-zip-file --dev
```

or

```
npm install vite-plugin-zip-file --save-dev
```

# Options


| Params        | Types        | Rquired | Default | Desc                                                         |
| :----------- | ------------ | ------- | ------- | ------------------------------------------------------------ |
| folderPath   | String\|Path | true    | /dist   | Path to the compressed folder                                |
| outPath      | String\|Path | true    | /       | Compressed package output path                               |
| zipName      | String       | false   | dist    | Package name                                                 |
| enabled      | Boolean      | false   | true    | This parameter is used to control whether the plugin is enabled. It is usually used to determine whether to compress files according to the environment |
| deleteFolder | Boolean      | false   | false   | Whether to delete source files after compression is completed                          |


# Options(中文)


| 参数         | 类型         | 必填 | 默认值 | 说明                                                    |
| :----------- | ------------ | ---- | ------ | ------------------------------------------------------- |
| folderPath   | String\|Path | 是   | /dist  | 需要被压缩的源文件夹                                    |
| outPath      | String\|Path | 是   | /      | 压缩包输出路径                                          |
| zipName      | String       | 否   | dist   | 压缩包名称                                              |
| enabled      | Boolean      | 否   | true   | 用于控制插件是否启用， 通常用于根据环境判断是否压缩文件 |
| deleteFolder | Boolean      | 否   | false  | 压缩完成后是否删除源文件                                |









# Usage
```javascript
import { defineConfig } from 'vite';
import { viteZip } from 'vite-plugin-zip-file';
import path from 'path';
import { fileURLToPath } from 'url';
import { env } from 'node:process';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    viteZip({
      folderPath: path.resolve(__dirname, 'dist'),
      outPath: path.resolve(__dirname),
      zipName: 'Test.zip',
      enabled: env.NODE_ENV === 'production'? true: false
    })
  ]
})
```