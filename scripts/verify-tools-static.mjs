import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'out');
const read = file => JSON.parse(fs.readFileSync(file, 'utf8'));
const report = { routes: [], assets: 0, downloads: 0, tables: {}, directoryTools: 0 };
const assets = new Set();
function present(url) {
  const local = new URL(url, 'https://www.cookieruncrumbles.com');
  if (local.origin !== 'https://www.cookieruncrumbles.com') return;
  let file = path.join(output, decodeURIComponent(local.pathname));
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  assert.ok(fs.existsSync(file), `Missing static target: ${url}`);
}
for (const slug of ['sugar-runes', 'stellar-link', 'plate-enhancement']) {
  const html = fs.readFileSync(path.join(output, 'tools', slug, 'index.html'), 'utf8');
  assert.ok(html.includes(`rel="canonical" href="https://www.cookieruncrumbles.com/tools/${slug}/"`));
  assert.ok(html.includes('"@type":"WebApplication"'));
  assert.ok(!html.includes('localhost:3000'));
  assert.ok(fs.readFileSync(path.join(output, 'sitemap.xml'), 'utf8').includes(`/tools/${slug}/`));
  for (const [, url] of html.matchAll(/(?:src|href)="([^"#]+)"/g)) if (url.startsWith('/')) present(url.replaceAll('&amp;', '&'));
  report.routes.push(`/tools/${slug}/`);
}
function checkImages(value) {
  if (Array.isArray(value)) { value.forEach(checkImages); return; }
  if (!value || typeof value !== 'object') return;
  for (const [key, item] of Object.entries(value)) {
    if (['src', 'image', 'head', 'icon', 'url', 'portrait'].includes(key) && typeof item === 'string' && item.startsWith('/images/')) { present(item); assets.add(item); }
    else checkImages(item);
  }
}
for (const file of fs.readdirSync(path.join(root, 'src/data/tools'))) if (file.endsWith('.json')) checkImages(read(path.join(root, 'src/data/tools', file)));
for (const file of fs.readdirSync(path.join(output, 'data/tools/en'))) checkImages(read(path.join(output, 'data/tools/en', file)));
for (const asset of read(path.join(output, 'data/tools/asset-integrity.json'))) {
  present(asset.url);
  const bytes = fs.readFileSync(path.join(output, asset.url));
  assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'), asset.sha256, 'Original asset changed: ' + asset.url);
}
for (const tool of ['sugar-runes', 'stellar-link', 'plate-enhancement']) {
  const template = read(path.join(root, 'src/data/tools/replica', tool + '.json')).html;
  assert.ok(!/[\u3400-\u9fff]/.test(template), 'Untranslated template');
  assert.ok(!template.includes('id="rule-verification"'));
  assert.ok(!template.includes('id="original-tables"'));
  assert.ok(!template.includes('href="#table-'));
  const runtime = fs.readFileSync(path.join(output, 'tools/replica', tool + '.mjs'), 'utf8');
  for (const [, url] of runtime.matchAll(/(?:["'`])(\/(?:images|data)\/[^"'`\s<>]+)/g)) if (!url.includes('${')) present(url);
  assert.ok(/export function mount\(root,localization=\{\}\)/.test(runtime));
  assert.ok(runtime.includes('controller.abort()'));
}
for (const file of fs.readdirSync(path.join(output, 'data/tools/tables'))) {
  const full = path.join(output, 'data/tools/tables', file);
  assert.ok(fs.statSync(full).size > 0);
  report.downloads++;
  if (file.endsWith('.json')) { const rows = read(full); assert.ok(Array.isArray(rows) && rows.length > 0); report.tables[file] = rows.length; }
}
for (const file of fs.readdirSync(path.join(output, 'data/tools/verification'))) { present('/data/tools/verification/' + file); report.downloads++; }
for (const file of ['sugar-runes', 'stellar-link', 'plate-enhancement']) {
  const raw = fs.readFileSync(path.join(output, 'data/tools', file + '.json'), 'utf8');
  assert.ok(!/\/(media|thumb)\//.test(raw), 'Unresolved local-service image URL');
  report.downloads++;
}
const directory = fs.readFileSync(path.join(output, 'tools/index.html'), 'utf8');
assert.ok(directory.includes('"numberOfItems":5'));
report.directoryTools = 5;
report.assets = assets.size;
fs.mkdirSync(path.join(root, 'output'), { recursive: true });
fs.writeFileSync(path.join(root, 'output/tools-static-report.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
