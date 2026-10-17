// No network: emit localized tool snapshots and fill exact sourced terminology.
import fs from 'node:fs/promises';
import { loadTypeScript } from './load-source.mjs';
const {createTranslator}=loadTypeScript('src/i18n/translate.ts');
const fields=new Set(['name','label','title','description','descriptionEn','text','notes','effectText','templateEn','labelEn','nameEn','en','cookiePath']);
const sourceMessages=JSON.parse(await fs.readFile('src/i18n/source/messages.json','utf8'));
const supplemental=new Set();
function collect(value,key=''){
 if(typeof value==='string'&&fields.has(key)&&/[a-zA-Z]/.test(value)&&value.length<3000&&!value.startsWith('/'))supplemental.add(value.replace(/\s+/g,' ').trim());
 else if(Array.isArray(value))value.forEach(v=>collect(v,key));else if(value&&typeof value==='object')Object.entries(value).forEach(([k,v])=>collect(v,k));
}
const data={};for(const file of await fs.readdir('public/data/tools/en')){if(!file.endsWith('.json')||file.endsWith('-ui-assets.json'))continue;data[file]=JSON.parse(await fs.readFile('public/data/tools/en/'+file,'utf8'));collect(data[file]);}
// Append, preserving previous batch contexts and their resumable caches.
for(const key of supplemental)if(!sourceMessages.includes(key))sourceMessages.push(key);
await fs.writeFile('src/i18n/source/messages.json',JSON.stringify(sourceMessages,null,2)+'\n');
for(const locale of ['zh-Hant','ja','ko','th']){
 const file='src/i18n/messages/'+locale+'.json';const pack=JSON.parse(await fs.readFile(file,'utf8'));const source=JSON.parse(await fs.readFile('src/i18n/source/'+locale+'.json','utf8'));
 for(const key of supplemental)if(!(key in pack.messages)&&source.glossary[key]){pack.messages[key]=source.glossary[key];pack.origins[key]=source.origins[key];}
 for(const path of ['src/i18n/overrides/'+locale+'.json']){
  try{const overrides=JSON.parse(await fs.readFile(path,'utf8'));for(const [key,value]of Object.entries(overrides)){if(pack.messages[key]!==value)pack.origins[key]='native-reviewed';pack.messages[key]=value;}}catch(error){if(error.code!=='ENOENT')throw error;}
 }
 const gameNames={'zh-Hant':'薑餅人放置大戰爭',ja:'クッキーラン：クランブル',ko:'쿠키런 크럼블'};
 for(const [key,value]of Object.entries(pack.messages)){
  let edited=gameNames[locale]?value.replace(/CookieRun:?\s+Crumble/g,gameNames[locale]):value;
  if(locale==='ja')edited=edited.replaceAll('クラムブル','クランブル');
  if(locale==='zh-Hant')edited=edited.replaceAll('兌換碼','兌換序號');
  if(edited!==value){pack.messages[key]=edited;pack.origins[key]='native-search-editorial';}
 }
 if(locale==='zh-Hant'){
  pack.messages['CookieRun: Crumble Codes']='薑餅人放置大戰爭序號';
  pack.messages['CookieRun: Crumble Cookies List']='薑餅人放置大戰爭角色圖鑑';
  // Taiwanese guide prose and anchors use the local game title as well.
  const directory='src/content/guides/'+locale;
  for(const name of await fs.readdir(directory))if(name.endsWith('.mdx')){
   const path=directory+'/'+name,original=await fs.readFile(path,'utf8');
   const edited=original.replace(/CookieRun[:：]?\s*Crumble/g,gameNames[locale]);
   if(edited!==original)await fs.writeFile(path,edited);
  }
 }
 await fs.writeFile(file,JSON.stringify(pack,null,2)+'\n');
 const t=createTranslator(pack.messages,locale);
 function localize(value,key=''){
  if(typeof value==='string'&&fields.has(key))return key==='cookiePath'?'/cookies/':t(value);
  if(Array.isArray(value))return value.map(v=>localize(v,key));
  if(value&&typeof value==='object'){
   const result=Object.fromEntries(Object.entries(value).map(([k,v])=>[k,localize(v,k)]));
   // Equipment "Shield" is a noun; the same English stat key means shield HP.
   if(key==='plates'&&value.key==='shield')result.name=t('Equipment Shield');
   return result;
  }
  return value;
 }
 await fs.mkdir('public/data/tools/'+locale,{recursive:true});
 for(const [name,value]of Object.entries(data))await fs.writeFile('public/data/tools/'+locale+'/'+name,JSON.stringify(localize(value))+'\n');
 console.log(locale+': localized '+Object.keys(data).length+' tool snapshots');
}
