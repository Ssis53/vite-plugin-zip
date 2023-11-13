import t from "path";
import o from "fs";
import { createRequire as z } from "node:module";
const E = z(import.meta.url), r = t.sep, { cwd: h } = process, Z = {
  enabled: !0,
  folderPath: t.join(h(), "/dist"),
  outPath: t.resolve(h()),
  zipName: "",
  deleteFolder: !1
}, A = (v) => {
  let g = {
    ...Z,
    ...v
  }, { enabled: f, folderPath: s, outPath: c, zipName: n, deleteFolder: F } = g;
  if (f = Boolean(f), !s || !c)
    throw new Error("config.folderPath and config.outPath is required.");
  s = t.resolve(s), c = t.resolve(c), n = n || s.split(r).pop() + ".zip";
  const P = () => {
    const j = E("jszip"), d = new j(), u = function(e, i, l = "") {
      const p = o.readdirSync(i);
      l += i.split(r).pop() + r, p.forEach((S) => {
        const a = t.join(i, r, S);
        o.statSync(a).isDirectory() ? u(e, a, l) : e.file(l + S, o.readFileSync(a));
      });
    }, m = (e = n) => {
      const i = t.join(c, r + e);
      o.existsSync(i) && o.unlinkSync(i);
    }, y = (e) => {
      o.readdirSync(e).forEach((l) => {
        const p = e + r + l;
        o.statSync(p).isDirectory() ? y(p) : o.unlinkSync(p);
      }), o.rmdirSync(e);
    }, w = function() {
      u(d, s), d.generateAsync({
        type: "nodebuffer",
        // 压缩类型
        compression: "DEFLATE",
        // 压缩算法
        compressionOptions: {
          // 压缩级别
          level: 9
        }
      }).then((e) => {
        m(n), o.writeFileSync(t.join(c, r, n), e), F && y(s);
      });
    };
    m(n), w();
  };
  return {
    name: "vite-plugin-zip-file",
    apply: "build",
    closeBundle() {
      f && P();
    }
  };
};
export {
  A as viteZip
};
