import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {loadTypeScript} from './i18n/load-source.mjs';
const {locales,localeConfig,localizedPath,alternateLanguages}=loadTypeScript('src/i18n/config.ts');
const {seoPages,siteUrl}=loadTypeScript('src/lib/seo.ts');
const {guides}=loadTypeScript('src/data/guides.ts');
const paths=[...Object.values(seoPages).map(page=>page.path),...guides.map(guide=>`/guides/${guide.slug}/`)];
const adFree=new Set(['/about/','/contact/','/privacy/','/disclaimer/','/guides/','/tools/']);
const attribute=(tag,name)=>tag.match(new RegExp('(?:^|\\s)'+name+'="([^"]*)"'))?.[1];
const report={pages:0,guidePages:0,locales:locales.length,canonical:0,alternateLinks:0,schemas:0,adBoundaries:0,internalLinks:0};
const sitemap=await fs.readFile('out/sitemap.xml','utf8');
const entries=[...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(match=>match[1]);
assert.equal(entries.length,paths.length*locales.length,'Unexpected sitemap page count');
for(const locale of locales)for(const route of paths){
 const localized=localizedPath(route,locale),canonical=siteUrl+localized;
 const html=await fs.readFile(path.join('out',localized,'index.html'),'utf8');
 assert.ok(html.includes(`<html lang="${locale}"`),`${localized}: incorrect html lang`);
 const links=[...html.matchAll(/<link\b[^>]*>/g)].map(match=>match[0]);
 const canonicals=links.filter(tag=>attribute(tag,'rel')==='canonical');
 assert.equal(canonicals.length,1,`${localized}: canonical count`);
 assert.equal(attribute(canonicals[0],'href'),canonical,`${localized}: canonical URL`);report.canonical++;
 const alternates=Object.fromEntries(links.filter(tag=>attribute(tag,'rel')==='alternate'&&attribute(tag,'hrefLang')).map(tag=>[attribute(tag,'hrefLang'),attribute(tag,'href')]));
 assert.deepEqual(alternates,alternateLanguages(route,siteUrl),`${localized}: hreflang correspondence`);report.alternateLinks+=Object.keys(alternates).length;
 const entry=entries.find(value=>value.includes(`<loc>${canonical}</loc>`));assert.ok(entry,`${localized}: sitemap missing`);
 for(const [language,url]of Object.entries(alternates))assert.ok(entry.includes(`hreflang="${language}" href="${url}"`),`${localized}: sitemap alternate ${language}`);
 const title=html.match(/<title>([\s\S]*?)<\/title>/)?.[1];assert.ok(title,`${localized}: title missing`);
 if(locale!=='en')assert.ok(/[^\u0000-\u007f]/.test(title),`${localized}: title still English`);
 const schemas=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(match=>JSON.parse(match[1]));
 assert.ok(schemas.length,`${localized}: structured data missing`);report.schemas+=schemas.length;
 function checkSchema(value,key=''){
  if(Array.isArray(value))value.forEach(item=>checkSchema(item,key));else if(value&&typeof value==='object')Object.entries(value).forEach(([name,item])=>checkSchema(item,name));
  else if(key==='inLanguage')assert.equal(value,locale,`${localized}: schema language`);
 }
 schemas.forEach(value=>checkSchema(value));
 assert.equal(html.includes('pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'),!adFree.has(route),`${localized}: ad boundary`);report.adBoundaries++;
 assert.ok(!/<(?:meta|link)\b[^>]*localhost/i.test(html),`${localized}: local metadata URL`);
 assert.ok(!html.includes('127.0.0.1:6868'),`${localized}: runtime reference-site dependency`);
 const content=html.replace(/<nav class="language-switcher"[\s\S]*?<\/nav>/g,'');
 for(const match of content.matchAll(/<a\b[^>]*href="(\/[^"#]*)"/g)){
  const href=match[1].replaceAll('&amp;','&');
  assert.equal(localizedPath(href,locale),href,`${localized}: link leaves current language: ${href}`);report.internalLinks++;
 }
 if(route.startsWith('/guides/')&&route!=='/guides/'){
  assert.ok(content.includes(`href="${localizedPath('/tier-list/',locale)}"`),`${localized}: tier link missing`);
  assert.ok(content.includes(`href="${localizedPath('/teams/',locale)}"`),`${localized}: team link missing`);report.guidePages++;
 }
 report.pages++;
}
await fs.mkdir('output/i18n',{recursive:true});await fs.writeFile('output/i18n/static-report.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
