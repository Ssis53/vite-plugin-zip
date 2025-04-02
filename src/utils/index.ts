/*
 * @Author: xiangfu.wu
 * @Date: 2022-08-18 15:30:35
 * @Description: 🚀
 * @FilePath: /vite-plugin-zip-file/src/utils/index.ts
 */
import path from 'path';
import fs from 'fs';
import { createRequire } from 'node:module'
import { Logger, PluginOption } from 'vite';


const requireds = createRequire(import.meta.url);
const pathSep = path.sep;
const { cwd } = process;
interface ViteZipConfig {
  enabled?: boolean,
  folderPath: string,
  outPath: string,
  zipName?: string,
  deleteFolder?: boolean,
  withoutMainFolder?: boolean,
}

const defaultConfig: ViteZipConfig = {
  enabled: true,
  folderPath: path.join(cwd(), '/dist'),
  outPath: path.resolve(cwd()),
  zipName: '',
  deleteFolder: false,
  withoutMainFolder: false,
}

let logger = {} as Logger;

export const viteZip = (customConfig: ViteZipConfig): PluginOption => {
  let config: ViteZipConfig = {
    ...defaultConfig,
    ...customConfig
  }
  let { enabled, folderPath, outPath, zipName, deleteFolder, withoutMainFolder }: ViteZipConfig = config;
  enabled = Boolean(enabled);
  if (!folderPath || !outPath) {
    throw new Error('config.folderPath and config.outPath is required.');
  }
  folderPath = path.resolve(folderPath);
  outPath = path.resolve(outPath);
  zipName = zipName ? zipName : folderPath.split(pathSep).pop() + '.zip';
  const makeZip = () => {
    const JSZip = requireds('jszip');
    const zip = new JSZip();

    const readDir = function (zip: any, dirPath: string, fileDir = '', depth = 0) {
      // 读取组件下的根文件目录
      const files = fs.readdirSync(dirPath);
      if (withoutMainFolder) {
        if (depth !== 0) {
          fileDir += dirPath.split(pathSep).pop() + pathSep;
        }
      } else {
        fileDir += dirPath.split(pathSep).pop() + pathSep;
      }
      files.forEach(fileName => {
        const fillPath = path.join(dirPath, pathSep, fileName)
        const file = fs.statSync(fillPath);
        // 如果是文件夹的话需要递归遍历下面的子文件
        if (file.isDirectory()) {
          readDir(zip, fillPath, fileDir, depth + 1);
        } else {
          // 读取每个文件为buffer存到zip中，带上文件夹，保证压缩后文件目录不变
          zip.file(fileDir + fileName, fs.readFileSync(fillPath))
        }
      });
    };

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

    const doZip = async () => {
      return new Promise((resolve, reject) => {
        readDir(zip, folderPath, '', 0);
        zip.generateAsync({
          type: "nodebuffer", // 压缩类型
          compression: "DEFLATE", // 压缩算法
          compressionOptions: { // 压缩级别
            level: 9
          }
        }).then((content: any) => {
          removeZip(zipName)
          fs.writeFileSync(path.join(outPath, pathSep, zipName), content);
          // delete original folder
          if (deleteFolder) {
            removeFolder(folderPath);
          }
          resolve(zipName);
        }).catch((err: any) => {
          reject(err);
        });
      });
    }

    // run
    removeZip(zipName)
    return doZip()
  };

  return {
    name: 'vite-plugin-zip-file',
    apply: 'build',
    enforce: 'post',
    configResolved(config) {
      logger = config.logger;
    },
    async closeBundle() {
      try {
        if (!enabled) {
          return;
        }
        // TODO: delay to ensure the plugin is executed last.
      
        const zipFileName = await makeZip();
        logger.info(`\n✨ [vite-plugin-zip-file] - zip floder successfully: ${zipFileName} \n`);
      } catch (error) {
        logger.error(typeof error === 'string' ? error : JSON.stringify(error));
        logger.error(`\n❌ [vite-plugin-zip-file] - zip floder failed. \n`);
      }
    }

  }
}
