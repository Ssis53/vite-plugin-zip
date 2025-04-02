import l from "path";
import t from "fs";
import { createRequire as b } from "node:module";
const k = b(import.meta.url), r = l.sep, { cwd: v } = process, q = {
  enabled: !0,
  folderPath: l.join(v(), "/dist"),
  outPath: l.resolve(v()),
  zipName: "",
  deleteFolder: !1,
  withoutMainFolder: !1
};
let a = {};
const J = (z) => {
  let w = {
    ...q,
    ...z
  }, { enabled: d, folderPath: c, outPath: p, zipName: s, deleteFolder: F, withoutMainFolder: P } = w;
  if (d = !!d, !c || !p)
    throw new Error("config.folderPath and config.outPath is required.");
  c = l.resolve(c), p = l.resolve(p), s = s || c.split(r).pop() + ".zip";
  const j = () => {
    const n = k("jszip"), y = new n(), m = function(e, o, i = "", f = 0) {
      const Z = t.readdirSync(o);
      P ? f !== 0 && (i += o.split(r).pop() + r) : i += o.split(r).pop() + r, Z.forEach((h) => {
        const u = l.join(o, r, h);
        t.statSync(u).isDirectory() ? m(e, u, i, f + 1) : e.file(i + h, t.readFileSync(u));
      });
    }, g = (e = s) => {
      const o = l.join(p, r + e);
      t.existsSync(o) && t.unlinkSync(o);
    }, S = (e) => {
      t.readdirSync(e).forEach((i) => {
        const f = e + r + i;
        t.statSync(f).isDirectory() ? S(f) : t.unlinkSync(f);
      }), t.rmdirSync(e);
    }, E = async () => new Promise((e, o) => {
      m(y, c, "", 0), y.generateAsync({
        type: "nodebuffer",
        // 压缩类型
        compression: "DEFLATE",
        // 压缩算法
        compressionOptions: {
          // 压缩级别
          level: 9
        }
      }).then((i) => {
        g(s), t.writeFileSync(l.join(p, r, s), i), F && S(c), e(s);
      }).catch((i) => {
        o(i);
      });
    });
    return g(s), E();
  };
  return {
    name: "vite-plugin-zip-file",
    apply: "build",
    enforce: "post",
    configResolved(n) {
      a = n.logger;
    },
    async closeBundle() {
      try {
        if (!d)
          return;
        const n = await j();
        a.info(`
✨ [vite-plugin-zip-file] - zip floder successfully: ${n} 
`);
      } catch (n) {
        a.error(typeof n == "string" ? n : JSON.stringify(n)), a.error(`
❌ [vite-plugin-zip-file] - zip floder failed. 
`);
      }
    }
  };
};
export {
  J as viteZip
};
