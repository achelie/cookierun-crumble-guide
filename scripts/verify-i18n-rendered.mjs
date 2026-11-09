import fs from 'node:fs/promises';
import path from 'node:path';
import {englishResidue,renderedText} from './i18n/rendered-text.mjs';
async function files(dir){const all=[];for(const e of await fs.readdir(dir,{withFileTypes:true})){const file=path.join(dir,e.name);if(e.isDirectory())all.push(...await files(file));else if(e.name==='index.html')all.push(file);}return all;}
const report={date:'2026-10-17',pages:0,strings:0,runtimeStates:0,issues:[]};
// These terms are present in the localized game text for the listed Cookies.
const gameTerms = new Map([
 ['/cookies/skater-cookie/', /(?<![A-Za-z])YO(?![A-Za-z])/g],
 ['/cookies/angel-cookie/', /(?<=\d)cm(?![A-Za-z])/g],
 ['/cookies/rockstar-cookie/', /Let's Rock 'n' roll/g],
 ['/cookies/cream-puff-cookie/', /Jellious Extremus/g],
 ['/cookies/popcorn-cookie/', /Ready！Action！/g],
 ['/cookies/dr-bones-cookie/', /(?<![A-Za-z])(?:AED|CPR)(?![A-Za-z])/g],
 ['/cookies/jax-cookie/', /(?<![A-Za-z])(?:Maxxing|MAX)(?![A-Za-z])/g],
 ['/cookies/readyberry-cookie/', /(?<![A-Za-z])PS-2(?=HP比率|[^A-Za-z0-9]|$)/g],
 ['/cookies/tea-knight-cookie/', /(?<![A-Za-z])BOSS(?![A-Za-z])/g],
]);
const add=(route,kind,text)=>{
 report.strings++;
 const terms=gameTerms.get(route.replace(/^\/(?:zh-tw|ja|ko|th)(?=\/)/,''));
 const words=englishResidue(terms?text.replace(terms,''):text);
 if(words.length)report.issues.push({route,kind,text,untranslatedWords:words});
};
for(const prefix of ['zh-tw','ja','ko','th'])for(const file of await files('out/'+prefix)){
 const route='/'+path.relative('out',path.dirname(file)).replaceAll('\\','/')+'/';
 for(const {kind,text}of renderedText(await fs.readFile(file,'utf8')))add(route,kind,text);
 report.pages++;
}
const at=process.argv.indexOf('--runtime');
if(at>=0){
 for(const row of JSON.parse(await fs.readFile(process.argv[at+1],'utf8'))){
  for(const text of row.texts)add(row.path,'runtime.text',text);
  for(const text of row.attributes)add(row.path,'runtime.attribute',text);
  report.runtimeStates++;
 }
}
await fs.mkdir('output/i18n',{recursive:true});
await fs.writeFile('output/i18n/rendered-coverage-report.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({...report,issues:report.issues.slice(0,20)},null,2));
if(report.issues.length)process.exitCode=1;
