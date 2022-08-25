import s from "path";
import n from "fs";
import { createRequire as v } from "node:module";
const z = v(import.meta.url), w = (m = { folderPath: null, outPath: null, zipName: null }) => {
  let { folderPath: i, outPath: r, zipName: e } = m;
  if (!i || !r)
    throw new Error("config.folderPath and config.outPath is required.");
  i = s.resolve(i), r = s.resolve(r), e = e || i.split("/").pop() + ".zip";
  const d = () => {
    const y = z("jszip"), p = new y(), a = function(o, t, c = "") {
      const S = n.readdirSync(t);
      c += t.split("/").pop() + "/", S.forEach((u) => {
        const l = s.join(t, "/", u);
        n.statSync(l).isDirectory() ? a(o, l, c) : o.file(c + u, n.readFileSync(l));
      });
    }, f = (o = e) => {
      const t = s.join(r, "/" + o);
      n.existsSync(t) && n.unlinkSync(t);
    }, h = function() {
      a(p, i), p.generateAsync({
        type: "nodebuffer",
        compression: "DEFLATE",
        compressionOptions: {
          level: 9
        }
      }).then((o) => {
        f(e), n.writeFileSync(s.join(r, "/", e), o);
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
  w as viteZip
};
