// Explicit, offline-authoring import. Normal builds never contact the source.
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import ts from 'typescript';
import { createRequire } from 'node:module';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMdx from 'remark-mdx';

const root=process.cwd();
const base=process.env.I18N_SOURCE_URL || 'http://127.0.0.1:6868';
const out=path.join(root,'src/i18n/source');
await fs.mkdir(out,{recursive:true});
const write=async(file,data)=>fs.writeFile(file,JSON.stringify(data,null,2)+'\n');
const get=async(url)=>{const r=await fetch(base+url);if(!r.ok)throw new Error(url+': '+r.status);return r.json();};
async function localizationRows(locale){const url='/api/localizations?language='+locale+'&pageSize=100&page=';const first=await get(url+1);const rows=[...first.items];for(let page=2;page<=Math.ceil(first.total/100);page+=8){const batch=await Promise.all(Array.from({length:Math.min(8,Math.ceil(first.total/100)-page+1)},(_,i)=>get(url+(page+i))));for(const result of batch)rows.push(...result.items);}return rows;}
const normalize=s=>s.replace(/\s+/g,' ').trim();
const catalog=await get('/data/i18n/en/site-data.json');
const enPack=await get('/i18n/en.json');
const locales=['zh-Hant','ja','ko','th'];
const catalogAliases={};
for(const c of [...catalog.characters,...catalog.pets])catalogAliases[c.resourceKey]={...c.names};
await write(path.join(out,'entities.json'),catalogAliases);
for(const locale of locales){
 const [pack,data,...tools]=await Promise.all([get('/i18n/'+locale+'.json'),get('/data/i18n/'+locale+'/site-data.json'),...['sugar-runes','stellar-link','plate-enhancement'].map(name=>get('/data/i18n/'+locale+'/'+name+'.json'))]);
 const glossary={};const origins={};
 const add=(from,to,authority)=>{if(typeof from==='string'&&typeof to==='string'&&from.trim()&&to.trim()){glossary[normalize(from)]=normalize(to);origins[normalize(from)]=authority;}};
 for(const [key,text]of Object.entries(enPack.messages))add(text,pack.messages[key],'source-site-ui:'+key);
 for(const entity of [...data.characters,...data.pets]){
  add(entity.names?.en,entity.name,'game-entity:'+entity.resourceKey);
  const original=[...catalog.characters,...catalog.pets].find(c=>c.resourceKey===entity.resourceKey);
  if(original){add(original.role,entity.role,'game-role');add(original.element,entity.element,'game-element');for(let i=0;i<(original.skills||[]).length;i++){add(original.skills[i].name,entity.skills?.[i]?.name,'game-skill');add(original.skills[i].description,entity.skills?.[i]?.description,'game-skill');}}
 }
 // Official source localization keys disambiguate short stat names.
 const rows=await localizationRows(locale);
 // Cache the English rows between imports within this process.
 if(!globalThis.englishRows)globalThis.englishRows=await localizationRows('en');
 const english=new Map(globalThis.englishRows.map(r=>[r.key,r.text]));
 for(const row of rows)add(english.get(row.key),row.text,'game-localization:'+row.key);
 await write(path.join(out,locale+'.json'),{locale,source:base,version:catalog.meta.version,extractedDate:catalog.meta.extractedDate,glossary,origins});
 await write(path.join(out,locale+'-tools.json'),Object.fromEntries(['sugar-runes','stellar-link','plate-enhancement'].map((name,i)=>[name,tools[i]])));
 console.log(locale+': '+Object.keys(glossary).length+' source phrases');
}

const require=createRequire(import.meta.url);const moduleCache=new Map();
function load(file){file=path.resolve(root,file);if(moduleCache.has(file))return moduleCache.get(file).exports;const m={exports:{}};moduleCache.set(file,m);const code=ts.transpileModule(require('node:fs').readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;const localRequire=id=>id.startsWith('@/')?load('src/'+id.slice(2)+'.ts'):id.startsWith('.')?load(path.join(path.dirname(file),id+'.ts')):require(id);new Function('require','module','exports',code)(localRequire,m,m.exports);return m.exports;}
const messages=new Set();
function add(s){if(typeof s!=='string')return;const v=normalize(s);if(!/[A-Za-z]/.test(v)||v.length<2||v.length>3000||/^(?:@\/|https?:|\/|[.#]|use client$|use server$)/.test(v))return;if(!/[\sA-Z]/.test(v)||/^[a-z\d_./:=-]+$/.test(v)||/^\d{4}-\d\d-\d\d/.test(v))return;messages.add(v);}
const skipKeys=new Set(['id','slug','path','href','image','category','publishedAt','updatedAt','author','icon','className','relatedGuideSlugs','cookieIds','petIds','coverCookieIds']);
function dataText(value,key=''){if(skipKeys.has(key))return;if(typeof value==='string')add(value);else if(Array.isArray(value))value.forEach(x=>dataText(x,key));else if(value&&typeof value==='object')Object.entries(value).forEach(([k,v])=>dataText(v,k));}
for(const file of ['src/data/cookies.ts','src/data/pets.ts','src/data/teams.ts','src/data/guides.ts','src/data/codes.ts','src/lib/seo.ts'])dataText(load(file));
for(const locale of locales){const file=path.join(out,locale+'.json');const snapshot=JSON.parse(await fs.readFile(file,'utf8'));for(const item of [...load('src/data/cookies.ts').cookies,...load('src/data/pets.ts').pets]){const sourceId=item.id==='chardonnay'?'cookie4011':item.id;const names=catalogAliases[sourceId];if(names?.[locale]){snapshot.glossary[item.name]=names[locale];snapshot.origins[item.name]='game-entity:'+sourceId;if(item.name.endsWith(' Cookie')){snapshot.glossary[item.name.slice(0,-7)]=names[locale];snapshot.origins[item.name.slice(0,-7)]='game-entity-short:'+sourceId;}}}const bari=snapshot.glossary['Princess Bari Cookie'];if(bari){snapshot.glossary.Bari=bari;snapshot.origins.Bari='game-entity-short:cookie0081';}await write(file,snapshot);}
async function walk(dir){const files=[];for(const entry of await fs.readdir(dir,{withFileTypes:true})){const f=path.join(dir,entry.name);if(entry.isDirectory())files.push(...await walk(f));else files.push(f);}return files;}
for(const file of (await walk(path.join(root,'src'))).filter(f=>/\.(tsx?|mjs)$/.test(f)&&!/(?:test\.|[\\/]i18n[\\/])/.test(f))){
 const tree=ts.createSourceFile(file,await fs.readFile(file,'utf8'),ts.ScriptTarget.Latest,true,file.endsWith('tsx')?ts.ScriptKind.TSX:ts.ScriptKind.TS);
 function visit(n){if(ts.isJsxText(n)||ts.isStringLiteral(n)||ts.isNoSubstitutionTemplateLiteral(n))add(n.text);else if(ts.isTemplateExpression(n)){let text=n.head.text;for(let i=0;i<n.templateSpans.length;i++)text+='{'+i+'}'+n.templateSpans[i].literal.text;add(text);}ts.forEachChild(n,visit);}visit(tree);
}
// Include dynamic HTML attributes and model validation errors, not only prose.
function addToolText(text){
 if(!/[<>]/.test(text)){add(text);return;}
 for(const match of text.matchAll(/>([^<>]+)</g))add(match[1]);
 for(const match of text.matchAll(/(?:title|aria-label|aria-description|placeholder|alt)="([^"]+)"/g))add(match[1]);
}
for(const file of (await walk(path.join(root,'public/tools/replica'))).filter(f=>/\.mjs$/.test(f)&&!f.includes('geometry'))){const tree=ts.createSourceFile(file,await fs.readFile(file,'utf8'),ts.ScriptTarget.Latest,true,ts.ScriptKind.JS);function visit(n){if(ts.isStringLiteral(n)||ts.isNoSubstitutionTemplateLiteral(n))addToolText(n.text);else if(ts.isTemplateExpression(n)){let text=n.head.text;for(let i=0;i<n.templateSpans.length;i++)text+='{'+i+'}'+n.templateSpans[i].literal.text;addToolText(text);}ts.forEachChild(n,visit);}visit(tree);}
for(const tool of ['sugar-runes','stellar-link','plate-enhancement']){const {html}=JSON.parse(await fs.readFile('src/data/tools/replica/'+tool+'.json','utf8'));for(const m of html.matchAll(/>([^<>]+)</g))add(m[1]);for(const m of html.matchAll(/(?:title|aria-label|placeholder|alt)="([^"]+)"/g))add(m[1]);}
await write(path.join(out,'messages.json'),[...messages].sort());
const parser=unified().use(remarkParse).use(remarkMdx);
const guides={};
for(const file of (await fs.readdir('src/content/guides')).filter(f=>f.endsWith('.mdx'))){const text=await fs.readFile('src/content/guides/'+file,'utf8');const ast=parser.parse(text);const segments=[];function visit(n){if(n.type==='text'&&n.value.trim())segments.push({start:n.position.start.offset,end:n.position.end.offset,text:n.value,kind:'text'});if(n.type==='mdxJsxAttribute'&&['title','description','alt','aria-label'].includes(n.name)&&typeof n.value==='string')segments.push({start:n.position.start.offset,end:n.position.end.offset,text:n.value,kind:'attribute',name:n.name});for(const child of n.children||[])visit(child);for(const attr of n.attributes||[])visit(attr);}visit(ast);guides[file.replace('.mdx','')]={text,segments,sha256:crypto.createHash('sha256').update(text).digest('hex')};}
await write(path.join(out,'guides.json'),guides);
await write(path.join(out,'manifest.json'),{source:base,version:catalog.meta.version,sourceDate:catalog.meta.extractedDate,locales,entities:Object.keys(catalogAliases).length,messages:messages.size,guides:Object.keys(guides).length,generatedAt:new Date().toISOString()});
console.log('Prepared '+messages.size+' UI messages and '+Object.keys(guides).length+' guide sources.');
