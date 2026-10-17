// Reuse reviewed guide headings and FAQ prose in navigation and JSON-LD.
import fs from 'node:fs/promises';
import { loadTypeScript } from './load-source.mjs';
const {guides}=loadTypeScript('src/data/guides.ts');
const locale=process.argv[2];if(!['zh-Hant','ja','ko','th'].includes(locale))throw new Error('Pass a supported locale');
const file=`src/i18n/messages/${locale}.json`;
const pack=JSON.parse(await fs.readFile(file,'utf8'));
let added=0;
const add=(source,target,slug)=>{
 source=source.replace(/\s+/g,' ').trim();target=target.replace(/\s+/g,' ').trim();
 if(source&&target&&!pack.messages[source]){pack.messages[source]=target;pack.origins[source]='reviewed-guide:'+slug;added++;}
};
const faqs=text=>text.split(/^### /m).slice(1).map(block=>({question:block.split(/\r?\n/)[0].trim(),answer:block.split(/\r?\n\s*\r?\n/)[1]?.trim()}));
for(const guide of guides){
 const source=await fs.readFile(`src/content/guides/${guide.slug}.mdx`,'utf8');
 const target=await fs.readFile(`src/content/guides/${locale}/${guide.slug}.mdx`,'utf8').catch(()=>undefined);if(!target)continue;
 const sourceSections=[...source.matchAll(/<GuideSection id="([^"]+)" title="([^"]+)"/g)];
 const targetSections=[...target.matchAll(/<GuideSection id="([^"]+)" title="([^"]+)"/g)];
 for(const section of sourceSections){const match=targetSections.find(value=>value[1]===section[1]);if(match)add(section[2],match[2],guide.slug);}
 const sourceFaq=faqs(source),targetFaq=faqs(target);
 if(sourceFaq.length!==targetFaq.length)throw new Error(`${locale}/${guide.slug}: FAQ correspondence changed`);
 for(const faq of guide.faq){
  const index=sourceFaq.findIndex(item=>item.question===faq.question),translated=targetFaq[index];
  if(index>=0&&translated){add(faq.question,translated.question,guide.slug);if(sourceFaq[index].answer===faq.answer&&translated.answer)add(faq.answer,translated.answer,guide.slug);}
 }
}
await fs.writeFile(file,JSON.stringify(pack,null,2)+'\n');console.log(`${locale}: ${added} reviewed guide messages added`);
