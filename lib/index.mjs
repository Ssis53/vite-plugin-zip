import e from "path";
import i from "fs";
import { createRequire as z } from "node:module";
const P = z(import.meta.url), s = e.sep, { cwd: h } = process, Z = {
  enabled: !0,
  folderPath: e.join(h(), "/dist"),
  outPath: e.resolve(h()),
  zipName: ""
}, k = (y) => {
  let S = {
    ...Z,
    ...y
  }, { enabled: p, folderPath: r, outPath: c, zipName: o } = S;
  if (p = Boolean(p), !r || !c)
    throw new Error("config.folderPath and config.outPath is required.");
  r = e.resolve(r), c = e.resolve(c), o = o || r.split(s).pop() + ".zip";
  const v = () => {
    const g = P("jszip"), f = new g(), d = function(t, n, l = "") {
      const w = i.readdirSync(n);
      l += n.split(s).pop() + s, w.forEach((m) => {
        const a = e.join(n, s, m);
        i.statSync(a).isDirectory() ? d(t, a, l) : t.file(l + m, i.readFileSync(a));
      });
    }, u = (t = o) => {
      const n = e.join(c, s + t);
      i.existsSync(n) && i.unlinkSync(n);
    }, j = function() {
      d(f, r), f.generateAsync({
        type: "nodebuffer",
        // 压缩类型
        compression: "DEFLATE",
        // 压缩算法
        compressionOptions: {
          // 压缩级别
          level: 9
        }
      }).then((t) => {
        u(o), i.writeFileSync(e.join(c, s, o), t);
      });
    };
    u(o), j();
  };
  return {
    name: "vite-plugin-zip-file",
    apply: "build",
    closeBundle() {
      p && v();
    }
  };
};
export {
  k as viteZip
};
