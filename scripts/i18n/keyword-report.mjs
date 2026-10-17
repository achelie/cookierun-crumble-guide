// Build an audit trail from observed Trends tables, never inferred search volumes.
import fs from 'node:fs/promises';
import {loadTypeScript} from './load-source.mjs';
const {createTranslator}=loadTypeScript('src/i18n/translate.ts');
const {seoPages,siteUrl}=loadTypeScript('src/lib/seo.ts');
const {guides}=loadTypeScript('src/data/guides.ts');
const {localizedPath}=loadTypeScript('src/i18n/config.ts');
const folder='docs/seo/';
const raw=JSON.parse(await fs.readFile(folder+'trends-observations-2026-10-17.json','utf8'));
const regions={TW:{locale:'zh-Hant',brand:'薑餅人放置大戰爭'},JP:{locale:'ja',brand:'クッキーラン クランブル'},KR:{locale:'ko',brand:'쿠키런 크럼블',officialAlias:'쿠키런 키우기'},TH:{locale:'th',brand:'CookieRun Crumble'}};
const evidence=[];
for(const region of Object.keys(regions))for(const period of ['12m','90d']){
 const observation=[...raw.observations].reverse().find(row=>row.region===region&&row.period===period&&(row.tables?.[1]?.length>20||row.nonzeroDays));
 if(!observation){evidence.push({id:region+'-'+period,region,period,status:'pending-export'});continue;}
 const average=observation.tables?.[0]??observation.average;
 const rows=observation.tables?.[1]?.slice(1)??observation.recent;
 const terms=average[0].slice(1);
 const sourceUrl=observation.url??`https://trends.google.com/trends/explore?date=today%203-m&geo=${region}&q=${encodeURIComponent(terms.join(','))}`;
 evidence.push({id:region+'-'+period,region,period,searchType:'Google Web Search',category:'All categories',status:'observed',capture:observation.tables?'full-chart-table':'visible-summary-and-recent-rows',terms,averages:average[1].slice(1).map(Number),nonzeroSamples:observation.nonzeroDays??terms.map((_,index)=>rows.filter(row=>Number(row[index+1])>0).length),sourceUrl,rows,related:observation.related??[]});
}
await fs.writeFile(folder+'keyword-evidence.json',JSON.stringify({date:'2026-10-17',unit:'relative index within each comparison chart; never monthly search volume',evidence},null,2)+'\n');
const quote=value=>'"'+String(value??'').replaceAll('"','""')+'"';
const csv=[['region','period','query','date_label','relative_index','source_url','capture']];
for(const item of evidence)for(const row of item.rows??[])item.terms.forEach((term,index)=>csv.push([item.region,item.period,term,row[0],row[index+1],item.sourceUrl,item.capture]));
await fs.writeFile(folder+'trends-observed-data.csv','\uFEFF'+csv.map(row=>row.map(quote).join(',')).join('\n')+'\n');
const mappings=[];
for(const [region,config]of Object.entries(regions)){
 const pack=JSON.parse(await fs.readFile('src/i18n/messages/'+config.locale+'.json','utf8'));const t=createTranslator(pack.messages,config.locale);
 for(const page of Object.values(seoPages)){
  const verified=region==='TW'&&['/','/cookies/','/codes/'].includes(page.path);
  const primaryQuery=verified?config.brand+({'/':'攻略','/cookies/':'角色','/codes/':'序號'}[page.path]):t(page.h1);
  mappings.push({region,locale:config.locale,target:siteUrl+localizedPath(page.path,config.locale),primaryIntent:page.path==='/'?'game overview and starting points':page.path,primaryQuery,queryStatus:verified?'verified-related-query':'auxiliary-long-tail-not-verified',verifiedBrand:config.brand,officialAlias:config.officialAlias??null,brandEvidence:[region+'-12m',region+'-90d'],queryEvidence:verified?['TW-90d']:[],notes:verified?'Observed as a rising related query; not an absolute volume estimate.':'Brand has local interest. Exact longer query has insufficient evidence and remains auxiliary.'});
 }
 for(const guide of guides)mappings.push({region,locale:config.locale,target:siteUrl+localizedPath(`/guides/${guide.slug}/`,config.locale),primaryIntent:guide.slug,primaryQuery:t(guide.title),queryStatus:'auxiliary-long-tail-not-verified',verifiedBrand:config.brand,brandEvidence:[region+'-12m',region+'-90d'],queryEvidence:[],notes:'A distinct guide intent; exact long-tail demand has not been established.'});
}
await fs.writeFile(folder+'page-keyword-map.json',JSON.stringify({date:'2026-10-17',mappings},null,2)+'\n');
await fs.writeFile(folder+'page-keyword-map.csv','\uFEFF'+[['region','locale','target','primary_intent','query','status','brand_evidence','exact_query_evidence'],...mappings.map(row=>[row.region,row.locale,row.target,row.primaryIntent,row.primaryQuery,row.queryStatus,row.brandEvidence.join(';'),row.queryEvidence.join(';')])].map(row=>row.map(quote).join(',')).join('\n')+'\n');
console.log(`Saved ${evidence.filter(row=>row.status==='observed').length}/8 Trends comparisons and ${mappings.length} localized intent mappings.`);
