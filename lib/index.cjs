"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const i=require("path"),n=require("fs"),z=require("node:module");var h=typeof document<"u"?document.currentScript:null;const E=z.createRequire(typeof document>"u"?require("url").pathToFileURL(__filename).href:h&&h.src||new URL("index.cjs",document.baseURI).href),o=i.sep,{cwd:v}=process,R={enabled:!0,folderPath:i.join(v(),"/dist"),outPath:i.resolve(v()),zipName:"",deleteFolder:!1,withoutMainFolder:!1},_=F=>{let g={...R,...F},{enabled:u,folderPath:s,outPath:d,zipName:r,deleteFolder:w,withoutMainFolder:b}=g;if(u=!!u,!s||!d)throw new Error("config.folderPath and config.outPath is required.");s=i.resolve(s),d=i.resolve(d),r=r||s.split(o).pop()+".zip";const j=()=>{const q=E("jszip"),p=new q,a=function(e,t,c="",l=0){const Z=n.readdirSync(t);b?l!==0&&(c+=t.split(o).pop()+o):c+=t.split(o).pop()+o,Z.forEach(S=>{const f=i.join(t,o,S);n.statSync(f).isDirectory()?a(e,f,c,l+1):e.file(c+S,n.readFileSync(f))})},y=(e=r)=>{const t=i.join(d,o+e);n.existsSync(t)&&n.unlinkSync(t)},m=e=>{n.readdirSync(e).forEach(c=>{const l=e+o+c;n.statSync(l).isDirectory()?m(l):n.unlinkSync(l)}),n.rmdirSync(e)},P=function(){a(p,s,"",0),p.generateAsync({type:"nodebuffer",compression:"DEFLATE",compressionOptions:{level:9}}).then(e=>{y(r),n.writeFileSync(i.join(d,o,r),e),w&&m(s)})};y(r),P()};return{name:"vite-plugin-zip-file",apply:"build",closeBundle(){u&&j()}}};exports.viteZip=_;
