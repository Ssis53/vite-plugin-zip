import e from "path";
import t from "fs";
// src/utils/index.ts
var n = e.sep, { cwd: r } = process, i = {
	enabled: !0,
	folderPath: e.join(r(), "/dist"),
	outPath: e.resolve(r()),
	zipName: "",
	deleteFolder: !1,
	withoutMainFolder: !1
}, a = {}, o = (r) => {
	let { enabled: o, folderPath: s, outPath: c, zipName: l, deleteFolder: u, withoutMainFolder: d } = {
		...i,
		...r
	};
	if (o = !!o, !s || !c) throw Error("config.folderPath and config.outPath is required.");
	s = e.resolve(s), c = e.resolve(c), l ||= s.split(n).pop() + ".zip";
	let f = async () => {
		let r = await import("jszip"), i = new (r.default ?? r)(), a = function(r, i, o = "", s = 0) {
			let c = t.readdirSync(i);
			d ? s !== 0 && (o += i.split(n).pop() + n) : o += i.split(n).pop() + n, c.forEach((c) => {
				let l = e.join(i, n, c);
				t.statSync(l).isDirectory() ? a(r, l, o, s + 1) : r.file(o + c, t.readFileSync(l));
			});
		}, o = (r = l) => {
			let i = e.join(c, n + r);
			t.existsSync(i) && t.unlinkSync(i);
		}, f = (e) => {
			t.readdirSync(e).forEach((r) => {
				let i = e + n + r;
				t.statSync(i).isDirectory() ? f(i) : t.unlinkSync(i);
			}), t.rmdirSync(e);
		};
		return o(l), (async () => new Promise((r, d) => {
			a(i, s, "", 0), i.generateAsync({
				type: "nodebuffer",
				compression: "DEFLATE",
				compressionOptions: { level: 9 }
			}).then((i) => {
				o(l), t.writeFileSync(e.join(c, n, l), i), u && f(s), r(l);
			}).catch((e) => {
				d(e);
			});
		}))();
	};
	return {
		name: "vite-plugin-zip-file",
		apply: "build",
		enforce: "post",
		configResolved(e) {
			a = e.logger;
		},
		async closeBundle() {
			try {
				if (!o) return;
				let e = await f();
				a.info(`\n✨ [vite-plugin-zip-file] - zip floder successfully: ${e} \n`);
			} catch (e) {
				a.error(typeof e == "string" ? e : JSON.stringify(e)), a.error("\n❌ [vite-plugin-zip-file] - zip floder failed. \n");
			}
		}
	};
};
export { o as viteZip };
