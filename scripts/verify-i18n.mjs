// Offline release gate. Never fetch the reference site or a translation API.
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import { compile } from '@mdx-js/mdx';
import {parse} from 'acorn';
import { loadTypeScript } from './i18n/load-source.mjs';
import {englishResidue} from './i18n/rendered-text.mjs';

const partial=process.argv.includes('--allow-incomplete');
const read=async file=>JSON.parse(await fs.readFile(file,'utf8'));
const locales=['zh-Hant','ja','ko','th'];
const sourceMessages=await read('src/i18n/source/messages.json');
const {guides}=loadTypeScript('src/data/guides.ts');
const {cookies}=loadTypeScript('src/data/cookies.ts');
const {pets}=loadTypeScript('src/data/pets.ts');
const entities=await read('src/i18n/source/entities.json');
const errors=[];
const check=(condition,message)=>{if(!condition)errors.push(message);};
const modelMessages=new Set();
for(const file of (await fs.readdir('public/tools/replica')).filter(name=>name.endsWith('math.mjs'))){
 const ast=parse(await fs.readFile('public/tools/replica/'+file,'utf8'),{ecmaVersion:'latest',sourceType:'module'});
 function visit(node){
  let text;
  if(node.type==='Literal'&&typeof node.value==='string')text=node.value;
  if(node.type==='TemplateLiteral')text=node.quasis.map((part,i)=>part.value.cooked+(i<node.expressions.length?'{'+i+'}':'')).join('');
  if(text&&/[A-Za-z]+ .*/.test(text))modelMessages.add(text);
  for(const value of Object.values(node))if(Array.isArray(value))value.forEach(child=>{if(child?.type)visit(child);});else if(value?.type)visit(value);
 }
 visit(ast);
}
const fields=new Set(['name','label','title','description','descriptionEn','text','notes','effectText','templateEn','labelEn','nameEn','en','cookiePath']);
function mechanics(value,key=''){
 if(fields.has(key))return undefined;
 if(Array.isArray(value))return value.map(item=>mechanics(item,key));
 if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).filter(([name])=>!fields.has(name)).map(([name,item])=>[name,mechanics(item,name)]));
 return value;
}
function attributes(text,name){return [...text.matchAll(new RegExp('\\b'+name+'=(?:"([^"]*)"|\\{(\\[[^\\]]*\\])\\})','g'))].map(match=>match[1]??match[2]);}
function counts(text){const map=new Map();for(const value of text.match(/\d+(?:[.,]\d+)*/g)||[])map.set(value,(map.get(value)||0)+1);return map;}
for(const entity of [...cookies,...pets]){
 const key=entity.id==='chardonnay'?'cookie4011':entity.id;
 check(Boolean(entities[key]),`Missing entity resourceKey: ${entity.id}`);
}
for(const locale of locales){
 const pack=await read('src/i18n/messages/'+locale+'.json');
 const missing=sourceMessages.filter(key=>!pack.messages[key]);
 check(missing.length===0,`${locale}: ${missing.length} missing messages (first: ${missing[0]})`);
 for(const message of modelMessages)check(Boolean(pack.messages[message])&&!englishResidue(pack.messages[message]).length,`${locale}: untranslated calculator validation message: ${message}`);
 for(const key of sourceMessages){
  const target=pack.messages[key];if(!target)continue;
  check(!/\[NUM_\d+\]|TRANSLATE_ME|TODO_TRANSLATION/.test(target),`${locale}: translation placeholder in ${key.slice(0,60)}`);
  const englishParagraph=target.length>60&&(target.match(/[A-Za-z]{3,}/g)||[]).length>=6&&!/[\u3000-\u9fff\uac00-\ud7af\u0e00-\u0e7f]/.test(target)&&!/^M\d/.test(target);
  check(!englishParagraph,`${locale}: English prose remains in ${key.slice(0,70)}`);
  check(JSON.stringify((key.match(/\{\d+\}/g)||[]).sort())===JSON.stringify((target.match(/\{\d+\}/g)||[]).sort()),`${locale}: changed template tokens in ${key.slice(0,70)}`);
 }
 let completed=0;
 for(const guide of guides){
  const targetPath=`src/content/guides/${locale}/${guide.slug}.mdx`;
  const target=await fs.readFile(targetPath,'utf8').catch(()=>undefined);
  if(!target){check(false,`${locale}: missing guide ${guide.slug}`);continue;}
  const source=await fs.readFile(`src/content/guides/${guide.slug}.mdx`,'utf8');
  try{await compile(target);}catch(error){check(false,`${locale}/${guide.slug}: ${error.message}`);continue;}
  for(const attribute of ['id','cookieIds','petIds'])check(JSON.stringify(attributes(source,attribute))===JSON.stringify(attributes(target,attribute)),`${locale}/${guide.slug}: changed ${attribute}`);
  check(target.includes('/tier-list/')&&target.includes('/teams/'),`${locale}/${guide.slug}: required internal links missing`);
  const sourceNumbers=counts(source),targetNumbers=counts(target);
  for(const [number,count]of sourceNumbers)check((targetNumbers.get(number)||0)>=count,`${locale}/${guide.slug}: lost numeric value ${number}`);
  check(!/\[NUM_\d+\]|TODO_TRANSLATION|TRANSLATE_ME/.test(target),`${locale}/${guide.slug}: unfinished placeholder`);
  completed++;
 }
 for(const name of ['sugar-runes','stellar-link','plate-enhancement','site-data']){
  try{assert.deepEqual(mechanics(await read(`public/data/tools/${locale}/${name}.json`)),mechanics(await read(`public/data/tools/en/${name}.json`)));}catch{check(false,`${locale}: changed IDs, numeric inputs or rules in ${name}`);}
 }
 console.log(`${locale}: ${sourceMessages.length-missing.length}/${sourceMessages.length} messages, ${completed}/${guides.length} guides`);
}
const {alternateLanguages,locales:allLocales,localizedPath}=loadTypeScript('src/i18n/config.ts');
const {seoPages,siteUrl}=loadTypeScript('src/lib/seo.ts');
for(const path of [...Object.values(seoPages).map(page=>page.path),...guides.map(guide=>`/guides/${guide.slug}/`)]){
 const expected=alternateLanguages(path,siteUrl);
 for(const locale of allLocales)assert.deepEqual(alternateLanguages(localizedPath(path,locale),siteUrl),expected);
}
if(errors.length){console.error(errors.slice(0,35).join('\n'));if(errors.length>35)console.error(`... ${errors.length-35} further errors`);if(!partial)process.exitCode=1;}
else console.log(`Offline localization gate passed: ${cookies.length} Cookies, ${pets.length} Pets, ${guides.length*locales.length} translated guides.`);
