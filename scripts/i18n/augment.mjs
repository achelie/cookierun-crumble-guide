// Append JSX sentence templates without invalidating prior authoring batches.
import fs from 'node:fs/promises';
import path from 'node:path';
import ts from 'typescript';
import { loadTypeScript } from './load-source.mjs';
const file='src/i18n/source/messages.json';const messages=JSON.parse(await fs.readFile(file,'utf8'));const known=new Set(messages);const extra=new Set();
const normalize=value=>value.replace(/\s+/g,' ').trim();
const add=value=>{value=normalize(value);if(value&&/[a-zA-Z]/.test(value)&&value.length<3000&&!known.has(value))extra.add(value);};
async function walk(dir){const out=[];for(const e of await fs.readdir(dir,{withFileTypes:true})){const f=path.join(dir,e.name);if(e.isDirectory())out.push(...await walk(f));else if(/\.tsx?$/.test(f)&&!f.includes('.test.'))out.push(f);}return out;}
for(const name of [...await walk('src/components'),...await walk('src/app')].filter(f=>!f.includes('[locale]'))){const ast=ts.createSourceFile(name,await fs.readFile(name,'utf8'),ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);function visit(n){if(ts.isJsxText(n))add(n.text);if(ts.isJsxElement(n)){let index=0;const text=n.children.map(child=>ts.isJsxText(child)?child.text:'{'+index+++'}').join('');if(/[A-Za-z]{2}/.test(text.replace(/\{\d+\}/g,'')))add(text);}ts.forEachChild(n,visit);}visit(ast);}
for(const value of extra)messages.push(value);
const skip=new Set(['id','slug','path','href','image','category','publishedAt','updatedAt','icon','className','relatedGuideSlugs','cookieIds','petIds','coverCookieIds']);
function collect(value,key=''){if(skip.has(key))return;if(typeof value==='string'&&/[A-Z\s]/.test(value)&&!value.startsWith('/'))add(value);else if(Array.isArray(value))value.forEach(v=>collect(v,key));else if(value&&typeof value==='object')Object.entries(value).forEach(([k,v])=>collect(v,k));}
for(const name of ['src/data/guides.ts','src/lib/seo.ts'])collect(loadTypeScript(name));
for(const value of extra)if(!messages.includes(value))messages.push(value);
await fs.writeFile(file,JSON.stringify(messages,null,2)+'\n');console.log('Appended '+extra.size+' JSX messages; total '+messages.length);
