import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { customEnglish } from './tool-english.mjs';

const require = createRequire(import.meta.url);
const postcss = require('postcss');
const acorn = require('acorn');
const cjk = /[\u3400-\u9fff]/;
const needsTranslation = /[\u3400-\u9fff\u3000-\u303f\uff00-\uffef]/;

function abortableListeners(code) {
  const listeners = [];
  function visit(node) {
    if (!node || typeof node !== 'object') return;
    if (node.type === 'CallExpression' && node.callee.type === 'MemberExpression' && node.callee.property.name === 'addEventListener') listeners.push(node);
    for (const value of Object.values(node)) if (Array.isArray(value)) value.forEach(visit); else if (value && typeof value === 'object') visit(value);
  }
  visit(acorn.parse(code, { ecmaVersion: 'latest', sourceType: 'module' }));
  for (const node of listeners.sort((a, b) => b.end - a.end)) {
    const third = node.arguments[2];
    if (third?.type === 'ObjectExpression' && third.properties.some(p => p.key?.name === 'signal')) continue;
    if (third) code = code.slice(0, third.start) + (third.type === 'ObjectExpression' ? '{...' : '{capture:') + code.slice(third.start, third.end) + ',signal}' + code.slice(third.end);
    else code = code.slice(0, node.end - 1) + ',{signal}' + code.slice(node.end - 1);
  }
  return code;
}

function removeRuleVerification(html) {
  const start = html.search(/<section\b[^>]*\bid="rule-verification"[^>]*>/);
  if (start < 0) return html;
  const sections = /<\/?section\b[^>]*>/g;
  sections.lastIndex = start;
  let depth = 0;
  for (let tag; (tag = sections.exec(html));) {
    depth += tag[0].startsWith('</') ? -1 : 1;
    if (depth === 0) return html.slice(0, start) + html.slice(sections.lastIndex);
  }
  throw new Error('Unclosed rule verification section');
}

// This importer alone reads REA/SQLite/Python. Published pages use static snapshots.
export function importReplicas({ root, source, rewrite, write, sha, integrity }) {
  const input = path.join(source, 'public');
  const output = path.join(root, 'public/tools/replica');
  const dataOutput = path.join(root, 'public/data/tools/en');
  const templates = path.join(root, 'src/data/tools/replica');
  for (const dir of [output, dataOutput, templates]) fs.mkdirSync(dir, { recursive: true });
  const read = name => JSON.parse(fs.readFileSync(path.join(input, 'data', name + '.json'), 'utf8'));
  const database = path.join(path.dirname(source), 'database/cookierun-crumble.sqlite');
  const rows = JSON.parse(execFileSync('python', ['-c', 'import sqlite3,json,pathlib,sys; c=sqlite3.connect(pathlib.Path(sys.argv[1]).as_uri()+"?mode=ro",uri=True); print(json.dumps(c.execute("select language,key,text from localizations where language in (\'en\',\'zh-Hant\')").fetchall()))', database], { encoding: 'utf8', maxBuffer: 16e6 }));
  const en = new Map(rows.filter(r => r[0] === 'en').map(r => [r[1], r[2]]));
  const zh = new Map(rows.filter(r => r[0] === 'zh-Hant').map(r => [r[1], r[2]]));
  const provenance = [];
  const official = new Map();
  function record(from, to, key, field) {
    if (!from || !to || from === to) return;
    official.set(from, to);
    provenance.push({ source: from, english: to, authority: key ? 'localizations.en' : field, key: key || undefined, databaseText: key ? en.get(key) : undefined });
  }
  function pair(object) {
    if (Array.isArray(object)) { object.forEach(pair); return; }
    if (!object || typeof object !== 'object') return;
    if (object.nameEn) record(object.name, en.get(object.nameKey) || object.nameEn, object.nameKey, 'nameEn');
    if (object.names?.en) record(object.name, object.names.en, null, 'names.en');
    if (object.key && object.en) record(object.zhHant, en.get(object.key) || object.en, object.key, 'officialTexts.en');
    Object.values(object).forEach(pair);
  }
  const raw = Object.fromEntries(['sugar-runes', 'stellar-link', 'plate-enhancement', 'site-data', 'sugar-rune-ui-assets', 'stellar-link-ui-assets', 'plate-enhancement-ui-assets'].map(n => [n, read(n)]));
  for (const tool of ['sugar-runes', 'stellar-link', 'plate-enhancement']) pair(raw[tool]);
  pair(raw['site-data'].characters);
  // Explicit official terminology, avoiding ambiguous matches among 20,575 rows.
  for (const [key, chinese] of zh) if (/^Enum.DisplayName.PlateUpgradeResultType\.|^Enum.DisplayName.StatBoostProviderType\.(SugarRune|StellarLink)$/.test(key)) record(chinese, en.get(key), key);
  record('星星', 'Starshards', 'UIStringList.Text.StellarLinkPage.CannotLockMore');
  const customSorted = [...customEnglish].sort((a, b) => b[0].length - a[0].length);
  const usedCustom = new Set();
  const missing = new Set();
  function translate(value, location = '') {
    if (!needsTranslation.test(value)) return value;
    if (official.has(value)) return official.get(value);
    let result = value;
    // Full custom explanations precede embedded official terms; names themselves
    // always use the authoritative fields above.
    for (const [from, to] of customSorted) if (result.includes(from)) { result = result.replaceAll(from, to); usedCustom.add(from); }
    // Substring replacements from arbitrary game sentences can change meaning
    // (e.g. a one-word label used inside an unrelated explanation). Only exact
    // matches use that fallback; custom prose is explicitly translated below.
    result = result.replaceAll('。', '. ').replaceAll('，', ', ').replaceAll('：', ': ').replaceAll('；', '; ').replaceAll('（', ' (').replaceAll('）', ') ').replaceAll('、', ', ').replaceAll('／', ' / ').replaceAll('～', '–').replaceAll('「', '“').replaceAll('」', '”');
    if (cjk.test(result)) missing.add(location + ': ' + result);
    return result;
  }
  // Only data used by the original renderers needs localization. Original raw
  // downloads retain their records, including untranslated evidence and captions.
  for (const tool of ['sugar-runes', 'stellar-link', 'plate-enhancement']) {
    const d = structuredClone(raw[tool]);
    for (const row of d.effects || []) row.name = en.get(row.nameKey) || row.nameEn;
    for (const row of d.plates || []) row.name = en.get(row.nameKey) || row.nameEn;
    for (const row of d.outcomeTypes || []) row.name = row.nameEn;
    if (tool === 'sugar-runes') d.notes = d.notes.map(v => translate(v, 'sugar.notes'));
    if (tool === 'stellar-link') for (const constellation of d.constellations) for (const gate of constellation.unlocks) {
      const requirement = d.requirements[gate.requirementKey];
      gate.description = (requirement.templateEn || requirement.labelEn).replace(/\{0(?::N0)?\}/g, new Intl.NumberFormat('en-US').format(gate.amount));
      record(raw[tool].constellations[constellation.order - 1].unlocks.find(g => g.stars === gate.stars).description, gate.description, requirement.nameKey, 'requirements.templateEn');
    }
    write(path.join(dataOutput, tool + '.json'), rewrite(d));
  }
  const characters = raw['site-data'].characters.map(c => {
    const image = key => '/images/tools/' + path.basename(c[key]);
    for (const key of ['portrait', 'head']) {
      const original = path.join(input, 'tools', c[key]);
      fs.copyFileSync(original, path.join(root, 'public', image(key)));
      integrity.set(image(key), { url: image(key), source: 'local-site/public/tools/' + c[key], sha256: sha(original) });
    }
    const roleKey = [...zh].find(([key, value]) => value === c.role && key.startsWith('Enum.DisplayName.'))?.[0];
    if (roleKey) record(c.role, en.get(roleKey), roleKey);
    return { ...c, name: c.names.en, role: en.get(roleKey) || 'Cookie', cookiePath: '/cookies/' + (c.resourceKey === 'cookie4011' ? 'chardonnay' : c.resourceKey) + '/', portrait: image('portrait'), head: image('head') };
  });
  write(path.join(dataOutput, 'site-data.json'), { characters });
  for (const name of ['sugar-rune', 'stellar-link', 'plate-enhancement']) write(path.join(dataOutput, name + '-ui-assets.json'), rewrite(raw[name + '-ui-assets']));

  const scriptNames = ['sugar-runes', 'stellar-link', 'plate-enhancement', 'sugar-rune-icons', 'sugar-rune-select', 'sugar-rune-math', 'stellar-link-math', 'stellar-link-geometry', 'plate-enhancement-math'];
  const sources = [];
  const rewritePaths = text => text.replace(/href="\/data\/(sugar-runes|stellar-link|plate-enhancement)\.json"/g, 'href="/data/tools/$1.json"').replace(/\/(?:media|thumb)\/image(?:%3A|:)[a-f0-9]+/g, url => rewrite(url)).replaceAll('/downloads/data/', '/data/tools/tables/').replaceAll('/data/verification/', '/data/tools/verification/').replace(/\/data\/(sugar-runes|stellar-link|plate-enhancement|site-data|sugar-rune-ui-assets|stellar-link-ui-assets|plate-enhancement-ui-assets)\.json/g, '/data/tools/en/$1.json');
  for (const name of scriptNames) {
    const original = path.join(input, name + '.mjs');
    let code = fs.readFileSync(original, 'utf8');
    const tokens = [...acorn.tokenizer(code, { ecmaVersion: 'latest', sourceType: 'module' })];
    for (const token of tokens.reverse()) if (['string', 'template'].includes(token.type.label) && needsTranslation.test(token.value)) {
      const result = translate(token.value, name);
      const replacement = token.type.label === 'string' ? JSON.stringify(result) : result.replaceAll('`', '\\`');
      code = code.slice(0, token.start) + replacement + code.slice(token.end);
    }
    code = rewritePaths(code).replaceAll("'zh-CN'", "'en-US'").replaceAll("'zh-Hant'", "'en-US'").replaceAll('row.zhHant', 'row.en').replaceAll('t.zhHant', 't.en');
    code = code.replace(/Starshard \$\{([^}]+)\} Constellation/g, 'Constellation ${$1}').replaceAll('IncludeConstellation ', 'Include constellation ').replaceAll('From +${g} attempt', 'Attempt from +${g}').replaceAll('${label}Amplification', '${label} Amplification').replaceAll('${esc(p.name)}Plating', '${esc(p.name)} Plating');
    if (name === 'sugar-rune-icons') {
      code = code.replace('(?:media|thumb|tools|assets)', '(?:images|media|thumb|tools|assets)').replace("export function applyUI(ui){", "export function applyUI(ui,root=document){").replaceAll('document.querySelectorAll', 'root.querySelectorAll');
      code = code.replace("'/media/image%3A'+fallbackIds[key]", "fallbackPaths[key]").replaceAll('fallbackIds[key]', 'fallbackPaths[key]');
      const match = code.match(/const fallbackIds=(\{[\s\S]*?\});/);
      const ids = Function('return ' + match[1])();
      const paths = Object.fromEntries(Object.entries(ids).map(([key, id]) => [key, rewrite('/media/image%3A' + id)]));
      code = code.replace(match[0], 'const fallbackPaths=' + JSON.stringify(paths) + ';');
    } else if (name === 'sugar-rune-select') {
      code = code.replace("listId = 'rune-icon-options'} = {}", "listId = 'rune-icon-options', root = document.body, signal} = {}");
      code = code.replace('document.body.append(shade, menu)', 'root.append(shade, menu)').replace('document.querySelectorAll(selector)', 'root.querySelectorAll(selector)');
      code = code.replace("  addEventListener('resize', position);", "  addEventListener('resize', position, {signal});").replaceAll("addEventListener('resize', position);", "addEventListener('resize', position, {signal});").replace("addEventListener('scroll', position);", "addEventListener('scroll', position, {signal});").replace('  }, true);\n  return', '  }, {capture:true, signal});\n  return');
      code = code.replace('return {sync, button:', 'return {destroy(){cancelAnimationFrame(positionFrame);close();shade.remove();menu.remove();for(const c of controls.values()){c.select.hidden=false;c.button.remove();}controls.clear();}, sync, button:');
      code = abortableListeners(code);
    } else if (['sugar-runes', 'stellar-link', 'plate-enhancement'].includes(name)) {
      const split = code.lastIndexOf('import ') >= 0 ? code.indexOf('\n', code.lastIndexOf('import ')) + 1 : 0;
      code = code.slice(0, split) + '\nexport function mount(root){\nconst controller=new AbortController(),signal=controller.signal;\nconst timers=new Set(),objectURLs=new Set();\nconst setTimeout=(callback,delay)=>{const id=globalThis.setTimeout(()=>{timers.delete(id);if(!signal.aborted)callback();},delay);timers.add(id);return id;};\n' + code.slice(split);
      code = code.replaceAll('document.querySelectorAll', 'root.querySelectorAll').replaceAll('document.querySelector', 'root.querySelector').replace('document.getElementById(id)', 'root.querySelector("#"+id)');
      code = code.replaceAll("{cache:'no-cache'}", "{cache:'no-cache',signal}").replace('fetch(url)', 'fetch(url,{signal})');
      code = code.replaceAll('applyUI(ui)', 'applyUI(ui,root)').replace('createIconSelects(optionArtwork);', 'createIconSelects(optionArtwork,{root,signal});').replace("listId:'stellar-icon-options'", "listId:'stellar-icon-options',root,signal").replace("listId:'plate-icon-options'", "listId:'plate-icon-options',root,signal");
      code = code.replace(/await navigator\.clipboard\.writeText\(([^;]+)\);/g, '$&if(signal.aborted)return;').replace(/catch\{(?=\$\()/g, 'catch{if(signal.aborted)return;').replace('function notify(message){', 'function notify(message){if(signal.aborted)return;');
      if (name === 'sugar-runes') code = code.replace('const requested=shared?.characterId', "if(params.has('plan')&&(!shared||![1,2].includes(shared.version))){shared=null;notify('Invalid shared plan. Default settings restored.');}const requested=shared?.characterId");
      if (name === 'stellar-link') code = code.replace('state=normalizeState(saved,data);', "if(query.has('plan')&&(!saved||![1,2].includes(saved.version))){saved=null;notify('Invalid shared plan. Default settings restored.');}state=normalizeState(saved,data);");
      code = code.replaceAll('src="/tools/${', 'src="${').replaceAll("src='/tools/'+", 'src=').replace("'/characters/'+character.id+'/'", 'character.cookiePath');
      // Async initialization must stop before mutating detached markup.
      code = code.replace(']);applyUI', ']);if(signal.aborted)return;applyUI').replace(']);let saved', ']);if(signal.aborted)return;let saved').replace(/\}\)\);\r?\n let raw/, '}));\n if(signal.aborted)return;\n let raw');
      code = code.replace(/\.catch\(error=>\{(\$\([^\n]+?)\}\);\s*$/, '.catch(error=>{if(!signal.aborted){$1}});');
      if (name === 'plate-enhancement') {
        code = code.replace("document.body.append(a)", 'root.append(a)').replace('const objectURL=URL.createObjectURL', 'const objectURL=URL.createObjectURL').replace("const a=document.createElement('a');a.href=objectURL", "objectURLs.add(objectURL);const a=document.createElement('a');a.href=objectURL");
        code = code.replace(/\}catch\{\}\r?\n state=normalizeState/, "}catch{$('pe-save-note').textContent='Invalid saved or shared plan. Default settings restored.';}\n if(raw&&![1,2].includes(raw.version))$('pe-save-note').textContent='Invalid saved or shared plan. Default settings restored.';\n state=normalizeState");
      }
      code += '\nreturn ()=>{controller.abort();for(const id of timers)globalThis.clearTimeout(id);for(const url of objectURLs)URL.revokeObjectURL(url);' + (name === 'sugar-runes' ? 'richSelects' : 'pickers') + '?.destroy();};\n}\n';
      // Element listeners also need teardown when React reuses the boundary
      // (including its development effect replay), not just global listeners.
      code = abortableListeners(code);
    }
    acorn.parse(code, { ecmaVersion: 'latest', sourceType: 'module' });
    fs.writeFileSync(path.join(output, name + '.mjs'), '// Imported from REA; edit the importer and English map, then re-import.\n' + code);
    sources.push({ file: name + '.mjs', sha256: sha(original) });
  }
  const cssNames = ['book', 'sugar-runes', 'sugar-runes-game', 'sugar-rune-select', 'stellar-link', 'plate-enhancement'];
  let css = '/* Source styles scoped to the tool. Original type sizes and game colors intentionally retained. */\nhtml:has(.tool-replica){scroll-padding-top:110px}\n.tool-replica :where(:not(svg,svg *)){all:revert}\n';
  for (const name of cssNames) {
    const file = path.join(input, name + '.css');
    const sheet = postcss.parse(rewritePaths(fs.readFileSync(file, 'utf8')));
    sheet.walkAtRules('charset', rule => rule.remove());
    sheet.walkRules(rule => {
      if (rule.parent.type === 'atrule' && /keyframes$/.test(rule.parent.name)) return;
      rule.selectors = rule.selectors.map(selector => selector.replace(/^(?::root|html|body)(?=$|[ .:#>])/, '.tool-replica')).map(selector => selector.startsWith('.tool-replica') ? selector : '.tool-replica ' + selector);
    });
    // Retain internal backgrounds; only the original body paper is omitted.
    sheet.walkRules(rule => { if (rule.selector === '.tool-replica') rule.walkDecls('background', decl => decl.remove()); });
    css += '\n/* ' + name + '.css */\n' + sheet.toString();
    sources.push({ file: name + '.css', sha256: sha(file) });
  }
  // English column headings have a larger intrinsic width than the source.
  // Keep the original grid and make its existing table scroller contain them.
  css += '\n.tool-replica .r-reference-grid>section,.tool-replica .st-setup>label{min-width:0}\n.tool-replica .st-overview .b-tag{white-space:normal;overflow-wrap:anywhere}\n';
  fs.writeFileSync(path.join(output, 'tools.css'), css);
  for (const tool of ['sugar-runes', 'stellar-link', 'plate-enhancement']) {
    const file = path.join(input, 'tools', tool, 'index.html');
    let html = fs.readFileSync(file, 'utf8').match(/<main\b[\s\S]*?<\/main>/)[0];
    html = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '').replace(/<link\b[^>]*>/g, '').replace('<main ', '<div ').replace('</main>', '</div>');
    // Site UI deliberately omits the two bottom reference accordions.
    html = removeRuleVerification(html);
    html = rewritePaths(translate(html, tool + '.html')).replace(/href="\/database\/\?table=([^"]+)"/g, 'href="/data/tools/tables/$1.json" download').replaceAll('href="/characters/"', 'href="/cookies/"');
    html += '<div id="book-toast" class="b-toast" role="status" hidden></div>';
    write(path.join(templates, tool + '.json'), { html });
    sources.push({ file: 'tools/' + tool + '/index.html', sha256: sha(file) });
  }
  write(path.join(root, 'public/data/tools/english-provenance.json'), { database: 'cookierun-crumble.sqlite', englishRowCount: en.size, official: provenance, custom: [...usedCustom].map(source => ({ source, english: customEnglish.get(source), authority: 'planner translation' })), sourceFiles: sources });
  // Untranslated source metadata is not rendered; fail for every UI string.
  fs.writeFileSync(path.join(root, 'output/tool-translation-missing.txt'), [...missing].join('\n\n'));
  if (missing.size) throw new Error(missing.size + ' English strings missing; see output/tool-translation-missing.txt');
  console.log('Imported original DOM, styles, runtime, and English provenance (' + en.size + ' database rows).');
}
