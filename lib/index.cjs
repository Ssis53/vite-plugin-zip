"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const g=require("path"),j=require("fs"),q=require("node:module"),m=e=>e&&typeof e=="object"&&"default"in e?e:{default:e},u=m(g),i=m(j),b=q.createRequire(typeof document>"u"?new(require("url")).URL("file:"+__filename).href:document.currentScript&&document.currentScript.src||new URL("index.cjs",document.baseURI).href),l=u.default.sep,w=(e={folderPath:null,outPath:null,zipName:null})=>{let{folderPath:r,outPath:s,zipName:t}=e;if(!r||!s)throw new Error("config.folderPath and config.outPath is required.");r=u.default.resolve(r),s=u.default.resolve(s),t=t||r.split(l).pop()+".zip";const y=()=>{const S=b("jszip"),f=new S,d=function(n,o,c=""){const v=i.default.readdirSync(o);c+=o.split(l).pop()+l,v.forEach(h=>{const a=u.default.join(o,l,h);i.default.statSync(a).isDirectory()?d(n,a,c):n.file(c+h,i.default.readFileSync(a))})},p=(n=t)=>{const o=u.default.join(s,l+n);i.default.existsSync(o)&&i.default.unlinkSync(o)},_=function(){d(f,r),f.generateAsync({type:"nodebuffer",compression:"DEFLATE",compressionOptions:{level:9}}).then(n=>{p(t),i.default.writeFileSync(u.default.join(s,l,t),n)})};p(t),_()};return{name:"vite-plugin-zip-file",apply:"build",closeBundle(){y()}}};exports.viteZip=w;