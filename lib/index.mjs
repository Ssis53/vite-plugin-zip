import s from "path";
import n from "fs";
import { createRequire as v } from "node:module";
const z = v(import.meta.url), w = (m = { folderPath: null, outPath: null, zipName: null }) => {
  let { folderPath: i, outPath: r, zipName: e } = m;
  if (!i || !r)
    throw new Error("config.folderPath and config.outPath is required.");
  i = s.resolve(i), r = s.resolve(r), e = e || i.split("/").pop() + ".zip";
  const d = () => {
    const y = z("jszip"), p = new y(), f = function(o, t, l = "") {
      const S = n.readdirSync(t);
      l += t.split("/").pop() + "/", S.forEach((u) => {
        const c = s.join(t, "/", u);
        n.statSync(c).isDirectory() ? f(o, c, l) : o.file(l + u, n.readFileSync(c));
      });
    }, a = (o = e) => {
      const t = s.join(r, "/" + o);
      n.existsSync(t) && n.unlinkSync(t);
    }, h = function() {
      f(p, i), p.generateAsync({
        type: "nodebuffer",
        compression: "DEFLATE",
        compressionOptions: {
          level: 9
        }
      }).then((o) => {
        a(e), n.writeFileSync(s.join(r, "/", e), o);
      });
    };
    a(e), h();
  };
  return {
    name: "vite-plugin-zip-file",
    apply: "build",
    closeBundle() {
      d();
    }
  };
};
export {
  w as viteZip
};
