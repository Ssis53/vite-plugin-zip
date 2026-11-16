import e from "path";
import t from "fs";
// src/utils/index.ts
var n = e.sep, r = "/", { cwd: i } = process, a = {
	enabled: !0,
	folderPath: e.join(i(), "/dist"),
	outPath: e.resolve(i()),
	zipName: "",
	deleteFolder: !1,
	withoutMainFolder: !1
}, o = {}, s = (i) => {
	let { enabled: s, folderPath: c, outPath: l, zipName: u, deleteFolder: d, withoutMainFolder: f } = {
		...a,
		...i
	};
	if (s = !!s, !c || !l) throw Error("config.folderPath and config.outPath is required.");
	c = e.resolve(c), l = e.resolve(l), u ||= c.split(n).pop() + ".zip";
	let p = async () => {
		let i = await import("jszip"), a = new (i.default ?? i)(), o = function(i, a, s = "", c = 0) {
			let l = t.readdirSync(a);
			f ? c !== 0 && (s += e.basename(a) + r) : s += e.basename(a) + r, l.forEach((r) => {
				let l = e.join(a, n, r);
				t.statSync(l).isDirectory() ? o(i, l, s, c + 1) : i.file(s + r, t.readFileSync(l));
			});
		}, s = (r = u) => {
			let i = e.join(l, n + r);
			t.existsSync(i) && t.unlinkSync(i);
		}, p = (e) => {
			t.readdirSync(e).forEach((r) => {
				let i = e + n + r;
				t.statSync(i).isDirectory() ? p(i) : t.unlinkSync(i);
			}), t.rmdirSync(e);
		};
		return s(u), (async () => new Promise((r, i) => {
			o(a, c, "", 0), a.generateAsync({
				type: "nodebuffer",
				compression: "DEFLATE",
				compressionOptions: { level: 9 }
			}).then((i) => {
				s(u), t.writeFileSync(e.join(l, n, u), i), d && p(c), r(u);
			}).catch((e) => {
				i(e);
			});
		}))();
	};
	return {
		name: "vite-plugin-zip-file",
		apply: "build",
		enforce: "post",
		configResolved(e) {
			o = e.logger;
		},
		async closeBundle() {
			try {
				if (!s) return;
				let e = await p();
				o.info(`\n✨ [vite-plugin-zip-file] - zip floder successfully: ${e} \n`);
			} catch (e) {
				o.error(typeof e == "string" ? e : JSON.stringify(e)), o.error("\n❌ [vite-plugin-zip-file] - zip floder failed. \n");
			}
		}
	};
};
export { s as viteZip };
