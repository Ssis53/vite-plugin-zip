import { PluginOption } from 'vite';
interface ViteZipConfig {
    enabled?: boolean;
    folderPath: string;
    outPath: string;
    zipName?: string;
    deleteFolder?: boolean;
    withoutMainFolder?: boolean;
}
export declare const viteZip: (customConfig: ViteZipConfig) => PluginOption;
export {};
