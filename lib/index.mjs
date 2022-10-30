import r from "path";
import n from "fs";
import { createRequire as z } from "node:module";
const P = z(import.meta.url), i = r.sep, E = (d = { folderPath: null, outPath: null, zipName: null }) => {
  let { folderPath: s, outPath: p, zipName: e } = d;
  if (!s || !p)
    throw new Error("config.folderPath and config.outPath is required.");
  s = r.resolve(s), p = r.resolve(p), e = e || s.split(i).pop() + ".zip";
  const h = () => {
    const y = P("jszip"), a = new y(), f = function(o, t, c = "") {
      const v = n.readdirSync(t);
      c += t.split(i).pop() + i, v.forEach((m) => {
        const l = r.join(t, i, m);
        n.statSync(l).isDirectory() ? f(o, l, c) : o.file(c + m, n.readFileSync(l));
      });
    }, u = (o = e) => {
      const t = r.join(p, i + o);
      n.existsSync(t) && n.unlinkSync(t);
    }, S = function() {
      f(a, s), a.generateAsync({
        type: "nodebuffer",
        compression: "DEFLATE",
        compressionOptions: {
          level: 9
        }
      }).then((o) => {
        u(e), n.writeFileSync(r.join(p, i, e), o);
      });
    };
    u(e), S();
  };
  return {
    name: "vite-plugin-zip-file",
    apply: "build",
    closeBundle() {
      h();
    }
  };
};
export {
  E as viteZip
};
