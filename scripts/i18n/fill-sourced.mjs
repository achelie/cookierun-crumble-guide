// Supplement exact official matches after new UI strings are inventoried.
// No substring replacement: game prose must match one source entry in full.
import fs from 'node:fs/promises';
const read=async path=>JSON.parse(await fs.readFile(path,'utf8'));
const inventory=await read('src/i18n/source/messages.json');
const zh=await read('src/i18n/source/zh-Hant.json');
const normalize=value=>value.normalize('NFKC').replace(/\s+/g,' ').trim();
const reverse=new Map(Object.entries(zh.glossary).map(([key,value])=>[normalize(value),key]));
const known=new Set(['ItemList','OPTGROUP','Organization','PropertyValue','Question','Thing','WebApplication','WebSite','USD','UTC','PvE','PvP','en-US','en_US','light dark','{0}T00:00:00Z']);
const placeholders=value=>JSON.stringify((value.match(/\{[^{}]+\}/g)||[]).sort());
for(const locale of process.argv.slice(2).length?process.argv.slice(2):['zh-Hant','ja','ko','th']){
 const file=`src/i18n/messages/${locale}.json`;
 const pack=await read(file),source=await read(`src/i18n/source/${locale}.json`);
 let added=0;
 for(const text of inventory){
  if(pack.messages[text])continue;
  const key=reverse.get(normalize(text));
  const value=source.glossary[text]??(key?source.glossary[key]:undefined);
  if(value&&placeholders(text)===placeholders(value)){
   pack.messages[text]=value;pack.origins[text]=source.origins[text]??'official-source-cross-language';added++;continue;
  }
  const technical=known.has(text)||/^[a-z]+(?:[A-Z][a-zA-Z]*|\.[a-zA-Z]+)+$/.test(text)||/^P(?:\{\d+\})+$/.test(text)||/^[a-z0-9_{} -]+$/.test(text)&&['__','--','page-shell','is-filled','skeleton-','team-share','text-button','rarity-'].some(value=>text.includes(value))||text==='controls.rarityBadges.';
  if(technical){pack.messages[text]=text;pack.origins[text]='preserved-technical-identifier';added++;continue;}
  if(locale==='th'){
   const stage=text.match(/^Clear Stage ([\d,]+)$/),promotion=text.match(/^Reach ([\d,]+) total Cookie Promotions$/);
   const label=stage?`ผ่านด่าน ${stage[1]}`:promotion?`เลื่อนขั้นคุกกี้รวม ${promotion[1]} ครั้ง`:undefined;
   if(label){pack.messages[text]=label;pack.origins[text]='native-reviewed-pattern';added++;}
  }
 }
 await fs.writeFile(file,JSON.stringify(pack,null,2)+'\n');
 console.log(`${locale}: ${added} sourced/preserved entries added; ${inventory.filter(key=>!pack.messages[key]).length} missing`);
}
