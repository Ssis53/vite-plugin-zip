import i from "path";
import o from "fs";
import { createRequire as Z } from "node:module";
const b = Z(import.meta.url), t = i.sep, { cwd: h } = process, k = {
  enabled: !0,
  folderPath: i.join(h(), "/dist"),
  outPath: i.resolve(h()),
  zipName: "",
  deleteFolder: !1,
  withoutMainFolder: !1
}, M = (v) => {
  let F = {
    ...k,
    ...v
  }, { enabled: f, folderPath: r, outPath: p, zipName: s, deleteFolder: w, withoutMainFolder: g } = F;
  if (f = !!f, !r || !p)
    throw new Error("config.folderPath and config.outPath is required.");
  r = i.resolve(r), p = i.resolve(p), s = s || r.split(t).pop() + ".zip";
  const j = () => {
    const z = b("jszip"), d = new z(), u = function(e, n, c = "", l = 0) {
      const P = o.readdirSync(n);
      g ? l !== 0 && (c += n.split(t).pop() + t) : c += n.split(t).pop() + t, P.forEach((S) => {
        const a = i.join(n, t, S);
        o.statSync(a).isDirectory() ? u(e, a, c, l + 1) : e.file(c + S, o.readFileSync(a));
      });
    }, m = (e = s) => {
      const n = i.join(p, t + e);
      o.existsSync(n) && o.unlinkSync(n);
    }, y = (e) => {
      o.readdirSync(e).forEach((c) => {
        const l = e + t + c;
        o.statSync(l).isDirectory() ? y(l) : o.unlinkSync(l);
      }), o.rmdirSync(e);
    }, E = function() {
      u(d, r, "", 0), d.generateAsync({
        type: "nodebuffer",
        // 压缩类型
        compression: "DEFLATE",
        // 压缩算法
        compressionOptions: {
          // 压缩级别
          level: 9
        }
      }).then((e) => {
        m(s), o.writeFileSync(i.join(p, t, s), e), w && y(r);
      });
    };
    m(s), E();
  };
  return {
    name: "vite-plugin-zip-file",
    apply: "build",
    closeBundle() {
      f && j();
    }
  };
};
export {
  M as viteZip
};
