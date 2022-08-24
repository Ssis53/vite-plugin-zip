import s from "path";
import t from "fs";
import { createRequire as v } from "node:module";
const P = v(import.meta.url), w = (m = { folderPath: null, outPath: null, zipName: null }) => {
  let { folderPath: i, outPath: r, zipName: e } = m;
  if (!i || !r)
    throw new Error("config.folderPath and config.outPath is required.");
  i = s.resolve(i), r = s.resolve(r), e = e || i.split("/").pop() + ".zip";
  const d = () => {
    const y = P("jszip"), p = new y(), a = function(o, n, l = "") {
      const S = t.readdirSync(n);
      l += n.split("/").pop() + "/", S.forEach((u) => {
        const c = s.join(n, "/", u);
        t.statSync(c).isDirectory() ? a(o, c, l) : o.file(l + u, t.readFileSync(c));
      });
    }, f = (o = e) => {
      const n = s.join(r, "/" + o);
      t.existsSync(n) && t.unlinkSync(n);
    }, h = function() {
      a(p, i), p.generateAsync({
        type: "nodebuffer",
        compression: "DEFLATE",
        compressionOptions: {
          level: 9
        }
      }).then((o) => {
        f(e), t.writeFileSync(s.join(r, "/", e), o);
      });
    };
    f(e), h();
  };
  return {
    name: "vite-plugin-zip",
    apply: "build",
    closeBundle() {
      d();
    }
  };
};
export {
  w as vitePluginZip
};
