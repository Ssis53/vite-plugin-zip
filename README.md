# vite-plugin-zip-file
Zip files at build time.

# Install

```
yarn add vite-plugin-zip-file --dev
```

or

```
npm install vite-plugin-zip-file --save-dev
```

# Optons


| Param      | Types        | Rquired | Default | Desc                           |
| :--------- | ------------ | ------- | ------- | ------------------------------ |
| folderPath | String\|Path | true    | -       | Path to the compressed folder  |
| outPath    | String\|Path | true    | -       | Compressed package output path |
| zipName    | String       | false   | dist    | Package name                   |


# Usage
```javascript
import { defineConfig } from 'vite';
import { viteZip } from 'vite-plugin-zip-file';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    viteZip({
      folderPath: path.resolve(__dirname, 'dist'),
      outPath: path.resolve(__dirname),
      zipName: 'Test.zip'
    })
  ]
})
```