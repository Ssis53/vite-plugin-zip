/*
 * @Author: xiangfu.wu
 * @Date: 2022-08-18 15:30:35
 * @Description: 🚀
 * @FilePath: /vite-plugin-zip-file/src/utils/vite-plugin-zip-flie.ts
 */
import path from 'path';
import fs from 'fs';
import { createRequire } from 'node:module'
const requireds = createRequire(import.meta.url);
const pathSep = path.sep;
const { cwd } = process;

interface PluginConfig {
	enabled?: boolean,
	folderPath: string,
	outPath: string,
	zipName: string,
	deleteFolder?: boolean,
	internalDir?: boolean
}

const defaultConfig: PluginConfig = {
	enabled: true,
	folderPath: path.join(cwd(), '/dist'),
	outPath: path.resolve(cwd()),
	zipName: '',
	deleteFolder: false,
	internalDir: true
}

export const viteZip = (customConfig: PluginConfig) => {
	let config: PluginConfig = {
			...defaultConfig,
			...customConfig
	}
	let { enabled, folderPath, outPath, zipName, deleteFolder, internalDir }: PluginConfig = config;
  enabled = Boolean(enabled);
  if (!folderPath || !outPath) {
    throw new Error('config.folderPath and config.outPath is required.');
  }
  folderPath = path.resolve(folderPath);
  outPath = path.resolve(outPath);
  zipName = zipName? zipName: folderPath.split(pathSep).pop() + '.zip';
  const makeZip = () => {
			const JSZip = requireds('jszip');
			const zip = new JSZip();

			const readDir = function (zip, dirPath, fileDir = '') {
					const files = fs.readdirSync(dirPath);

					// Update this condition
					if (internalDir) {
							fileDir += dirPath.split(pathSep).pop() + pathSep;
					}

					files.forEach(fileName => {
							const fillPath = path.join(dirPath, pathSep, fileName)
							const file = fs.statSync(fillPath);
							if (file.isDirectory()) {
									readDir(zip, fillPath, fileDir);
							} else {
									// Update this line
									zip.file(fileDir + fileName, fs.readFileSync(fillPath))
							}
					});
			}

    const removeZip = (name = zipName) => {
      const dest = path.join(outPath, pathSep + name)
      if (fs.existsSync(dest)) {
        fs.unlinkSync(dest)
      }
    }

    const removeFolder = (path: string) => {
      const files = fs.readdirSync(path);
      files.forEach((file) => {
        const curPath = path + pathSep + file;
        if (fs.statSync(curPath).isDirectory()) {
          // recurse
          removeFolder(curPath);
        } else {
          // delete file
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(path);
    }

    const doZip = function () {

      readDir(zip, folderPath);
      zip.generateAsync({
        type: "nodebuffer", // 压缩类型
        compression: "DEFLATE", // 压缩算法
        compressionOptions: { // 压缩级别
          level: 9
        }
      }).then(content => {
        removeZip(zipName)
        fs.writeFileSync(path.join(outPath, pathSep, zipName), content);
        // 删除文件夹
        if (deleteFolder) {
          removeFolder(folderPath);
        }
      });
    }

    removeZip(zipName)
    doZip()
  };
  return {
    name: 'vite-plugin-zip-file',
    apply: 'build',
    closeBundle() {
      if(!enabled) {
        return;
      }
      makeZip();
    }
  }
}
