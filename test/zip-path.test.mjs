import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import JSZip from 'jszip';
import { viteZip } from '../lib/index.mjs';

const BACKSLASH = String.fromCharCode(92);
const silentLogger = { info() {}, warn() {}, error() {}, hasWarned: false };

function createFixture() {
  const base = fs.mkdtempSync(path.join(os.tmpdir(), 'vite-plugin-zip-'));
  const dist = path.join(base, 'dist');
  const files = {
    'index.html': '<html></html>',
    'assets/js/app.js': 'console.log(1)',
    'assets/js/my file.js': 'console.log(2)',
    'assets/css/app.css': 'body{}',
    '中文目录/文件.txt': '你好',
  };

  for (const [name, content] of Object.entries(files)) {
    const file = path.join(dist, name);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, content);
  }

  return { base, dist };
}

async function buildZip(options) {
  const { base, dist } = createFixture();
  try {
    const plugin = viteZip({ folderPath: dist, outPath: base, ...options });
    plugin.configResolved({ logger: silentLogger });
    await plugin.closeBundle();

    const zipFile = path.join(base, 'dist.zip');
    assert.ok(fs.existsSync(zipFile), `zip not found: ${zipFile}`);

    const zip = await JSZip.loadAsync(fs.readFileSync(zipFile));
    return Object.keys(zip.files);
  } finally {
    fs.rmSync(base, { recursive: true, force: true });
  }
}

function assertPortableEntryNames(keys) {
  for (const key of keys) {
    assert.ok(!key.includes(BACKSLASH), `entry contains backslash: ${JSON.stringify(key)}`);
    assert.ok(!key.startsWith('/'), `entry is absolute: ${JSON.stringify(key)}`);
    assert.ok(!/^[A-Za-z]:/.test(key), `entry contains drive letter: ${JSON.stringify(key)}`);
  }
}

test('zip entry names use forward slashes with the main folder', async () => {
  const keys = await buildZip({});
  assertPortableEntryNames(keys);
  assert.ok(keys.includes('dist/index.html'));
  assert.ok(keys.includes('dist/assets/js/app.js'));
  assert.ok(keys.includes('dist/assets/js/my file.js'));
  assert.ok(keys.includes('dist/中文目录/文件.txt'));
});

test('zip entry names use forward slashes without the main folder', async () => {
  const keys = await buildZip({ withoutMainFolder: true });
  assertPortableEntryNames(keys);
  assert.ok(keys.includes('index.html'));
  assert.ok(keys.includes('assets/js/app.js'));
  assert.ok(keys.includes('assets/js/my file.js'));
  assert.ok(keys.includes('中文目录/文件.txt'));
  assert.ok(!keys.some((key) => key === 'dist/' || key.startsWith('dist/')));
});
