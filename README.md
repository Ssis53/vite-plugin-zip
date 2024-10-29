# vite-plugin-zip-file

[![MIT LICENSE](https://img.shields.io/badge/LICENSE-MIT-green)](./LICENSE)
 ![size](https://img.shields.io/bundlephobia/min/vite-plugin-zip-file)
[![downloads](https://img.shields.io/npm/dw/vite-plugin-zip-file)](https://www.npmjs.com/package/vite-plugin-zip-file)

Zip files at build time.

**Tips: Node.js 16+ is required.**

# Install

```
yarn add vite-plugin-zip-file --dev
```

or

```
npm install vite-plugin-zip-file --save-dev
```

# Options


| Params            | Types        | Rquired | Default | Desc                                                         |
| :---------------- | ------------ | ------- | ------- | ------------------------------------------------------------ |
| folderPath        | String\|Path | true    | /dist   | Path to the compressed folder                                |
| outPath           | String\|Path | true    | /       | Compressed package output path                               |
| zipName           | String       | false   | dist    | Package name                                                 |
| enabled           | Boolean      | false   | true    | This parameter is used to control whether the plugin is enabled. It is usually used to determine whether to compress files according to the environment |
| deleteFolder      | Boolean      | false   | false   | Whether to delete source files after compression is completed |
| withoutMainFolder | Boolean      | false   | false   | The compressed file whether removes the outermost main folder. |

<br />

# Options(中文)

<table>
  <thead>
    <tr>
      <th>参数</th>
      <th>类型</th>
      <th width="75">必填</th>
      <th width="95">默认值</th>
      <th>说明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>folderPath</td>
      <td>String|Path</td>
      <td>是</td>
      <td>/dist</td>
      <td>需要被压缩的源文件夹</td>
    </tr>
    <tr>
      <td>outPath</td>
      <td>String|Path</td>
      <td>是</td>
      <td>/</td>
      <td>压缩包输出路径</td>
    </tr>
    <tr>
      <td>zipName</td>
      <td>String</td>
      <td>否</td>
      <td>dist</td>
      <td>压缩包名称</td>
    </tr>
    <tr>
      <td>enabled</td>
      <td>Boolean</td>
      <td>否</td>
      <td>true</td>
      <td>用于控制插件是否启用， 通常用于根据环境判断是否压缩文件</td>
    </tr>
    <tr>
      <td>deleteFolder</td>
      <td>Boolean</td>
      <td>否</td>
      <td>false</td>
      <td>压缩完成后是否删除源文件</td>
    </tr>
    <tr>
      <td>withoutMainFolder</td>
      <td>Boolean</td>
      <td>否</td>
      <td>false</td>
      <td>压缩后的文件是否去掉最外层文件夹</td>
    </tr>
  </tbody>
</table>

<br />

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