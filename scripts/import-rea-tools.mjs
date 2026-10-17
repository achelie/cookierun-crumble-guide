// One-time, offline import. Normal builds use the checked-in snapshots only.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { importReplicas } from './import-tool-replicas.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.resolve(process.argv[2] || 'E:/code/sy/rea/output/cookieruncrumble/local-site');
const upstream = path.dirname(source);
const input = path.join(source, 'public');
const dataDir = path.join(root, 'src/data/tools');
const output = path.join(root, 'public/data/tools');
const images = path.join(root, 'public/images/tools');
for (const dir of [dataDir, output, images]) fs.mkdirSync(dir, { recursive: true });
const read = file => JSON.parse(fs.readFileSync(file, 'utf8'));
const write = (file, value) => fs.writeFileSync(file, JSON.stringify(value, null, 2) + '\n');
const sha = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const assetMap = new Map();
const integrity = new Map();
let indexedAssets;
const files = [];
function copyAsset(asset) {
  if (!asset?.file || !asset?.url?.startsWith('/media/')) return null;
  const original = path.resolve(upstream, asset.file);
  if (!original.startsWith(upstream + path.sep)) throw new Error('Asset outside source');
  const filename = path.basename(original);
  fs.copyFileSync(original, path.join(images, filename));
  const url = '/images/tools/' + filename;
  integrity.set(url, { url, source: asset.file, sha256: sha(original) });
  assetMap.set(asset.url, url);
  assetMap.set(asset.url.replace('/media/', '/thumb/'), url);
  return { src: url, width: asset.width, height: asset.height, name: asset.name };
}
function compactAssets(value) {
  if (Array.isArray(value)) return value.map(compactAssets);
  if (!value || typeof value !== 'object') return value;
  const asset = copyAsset(value);
  if (asset) return asset;
  return Object.fromEntries(Object.entries(value).filter(([key]) => !['layoutEvidence', 'source', 'sources', 'prefabReferences', 'uiReferences'].includes(key)).map(([key, v]) => [key, compactAssets(v)]));
}
for (const name of ['sugar-rune', 'stellar-link', 'plate-enhancement']) {
  const raw = read(path.join(input, 'data', name + '-ui-assets.json'));
  const ui = compactAssets(raw);
  if (name === 'stellar-link') ui.nodesLayout = raw.layoutEvidence.nodes.map(node => node.normalizedPlateXY);
  write(path.join(dataDir, name + '-ui.json'), ui);
}
const catalog = read(path.join(input, 'data/site-data.json')).characters;
function rewrite(value) {
  if (typeof value === 'string') {
    if (/^\/(media|thumb)\/image/.test(value) && !assetMap.has(value)) {
      indexedAssets ??= new Map(read(path.join(upstream, 'database/asset-index.json')).assets.map(a => [a.asset_id, a]));
      const id = decodeURIComponent(value.split('/')[2]);
      const asset = indexedAssets.get(id);
      if (!asset) throw new Error('Missing referenced image: ' + id);
      const canonical = '/media/' + encodeURIComponent(id);
      const copied = copyAsset({ ...asset, name: asset.display_name, url: canonical });
      assetMap.set(value, copied.src);
    }
    return assetMap.get(value) || value.replaceAll('/data/verification/', '/data/tools/verification/').replaceAll('/downloads/data/', '/data/tools/tables/');
  }
  if (Array.isArray(value)) return value.map(rewrite);
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, v]) => [key, rewrite(v)]));
  return value;
}
for (const name of ['sugar-runes', 'stellar-link', 'plate-enhancement']) {
  const original = path.join(input, 'data', name + '.json');
  const raw = read(original);
  const version = raw.sourceVersion || raw.meta?.snapshot?.version;
  if (version !== '1.5.002') throw new Error('Review the calculator rules before importing a different game version: ' + version);
  write(path.join(output, name + '.json'), rewrite(raw));
  files.push({ file: name + '.json', sha256: sha(original) });
}
fs.mkdirSync(path.join(output, 'tables'), { recursive: true });
for (const name of ['SugarRunePiecePools', 'SugarRuneRerollCosts', 'SugarRuneSlots', 'LinkBonuss', 'LinkSuffleCosts', 'ConstellationUnlocks', 'PlateUpgradeCosts', 'PlateEnhanceGrades', 'PlateUpgradeResults']) {
  for (const ext of ['json', 'csv']) fs.copyFileSync(path.join(upstream, 'database/decoded', name + '.' + ext), path.join(output, 'tables', name + '.' + ext));
}
fs.mkdirSync(path.join(output, 'verification'), { recursive: true });
for (const name of fs.readdirSync(path.join(input, 'data/verification'))) {
  const file = path.join(input, 'data/verification', name);
  if (!fs.statSync(file).isFile()) continue;
  if (name.endsWith('.json')) write(path.join(output, 'verification', name), rewrite(read(file)));
  else fs.copyFileSync(file, path.join(output, 'verification', name));
}
importReplicas({ root, source, rewrite, write, sha, integrity });
write(path.join(output, 'asset-integrity.json'), [...integrity.values()].sort((a, b) => a.url.localeCompare(b.url)));
write(path.join(output, 'import-manifest.json'), { gameVersion: '1.5.002', snapshotDate: '2026-10-14', importedAt: '2026-10-16', sourceFiles: files, characterCount: catalog.length, imageCount: fs.readdirSync(images).length, tables: 9 });
console.log('Imported tool snapshots, 77 characters, 9 tables and referenced evidence.');
