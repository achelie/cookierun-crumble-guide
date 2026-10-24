// Reviewed brands, game/stat aliases, source identifiers and file formats.
// Ordinary UI words and English entity names are deliberately not allowed.
const retainedTerms=[
 'CookieRun: Crumble Guide','CookieRun: Crumble','CookieRun Crumble','Crumble Guide',
 'Cloudflare Web Analytics','Ahrefs Web Analytics','Google AdSense','Fan Kit','User-Agent',
 'COOKIERUNCRUMBLE1ST','COOKIERUNCRUMBLENO1','cookieruncrumbles.com','Devsisters',
 'CRUMBLE','CookieRun','Crumble','English','AboutAds','Cloudflare','Ahrefs','DevPlay','Google',
 'Tier List','tier list','Guild Conquest','Extra-Stuffed Piñata','Lucky Rewards','Roguelike PvE',
 'Stellar Link','Multi-strike','CRIT DMG','Mov SPD','Skill Haste','Rapid AoE','knock-ups','knock-up',
 'PvP','PvE','AoE','AOE','AFK','F2P','ATK','DEF','HP','EXP','FAQ','TSSR','SSR','SP','SR','CRIT',
 'URL','CSV','JSON','PNG','IP','ID','EEA','KST','MID','EPIC','ETERNAL','MAGIC','RARE',
 'Power','Accuracy','Focus','Miss','Redberry','Twisted','Super','Upgrade','Break','Plating','Epic','Excellent','Magic','DOWN','UP','OK','Dr.','Free to Play','Arena','vs','referrer',
 'Cookie','www.cookieruncrumbles.com',
 'Cost=max(0,base cost−trunc(base cost×total discount/100))',
 'BasisPoint','BasisPoints','CombatPropertyCalculates','ConstellationUnlocks','LinkBonuss','LinkSuffleCosts',
 'StatBoosts','StellarLinkPage','gameBoostValues','GetNextGrade','Prefab','LDPlayer',
 'Cost','Count','Items','Rewards','UI','UI12','Lv.','max','trunc'
];
const escape=value=>value.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const retained=new RegExp('(?<![A-Za-z])(?:'+retainedTerms.sort((a,b)=>b.length-a.length).map(escape).join('|')+')(?![A-Za-z])','g');
export function englishResidue(text){
 return [...text.replace(/(?:https?:\/\/|mailto:)[^\s<>]+|[\w.+-]+@[\w.-]+\.[A-Za-z]+/g,'')
  .replace(retained,'').matchAll(/[A-Za-z]{2,}/g)].map(match=>match[0]);
}
export function decodeHtml(text){
 return text.replace(/&#(?:x([\da-f]+)|(\d+));/gi,(_,hex,decimal)=>String.fromCodePoint(parseInt(hex||decimal,hex?16:10)))
  .replace(/&quot;/g,'"').replace(/&#39;|&apos;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&').replace(/&nbsp;/g,' ');
}
export function renderedText(html){
 const rows=[];
 const clean=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>|<style\b[^>]*>[\s\S]*?<\/style>|<!--[\s\S]*?-->/gi,'');
 for(const part of clean.split(/(<[^>]+>)/g)){
  if(!part.startsWith('<')){const value=decodeHtml(part).trim();if(value)rows.push({kind:'text',text:value});continue;}
  for(const match of part.matchAll(/\b(alt|title|placeholder|aria-label|aria-description)="([^"]*)"/g))rows.push({kind:match[1],text:decodeHtml(match[2])});
  if(/^<meta\b/.test(part)&&/(?:name|property)="(?:description|og:title|og:description|og:image:alt|twitter:title|twitter:description)"/.test(part)){
   const value=part.match(/\bcontent="([^"]*)"/)?.[1];if(value)rows.push({kind:'metadata',text:decodeHtml(value)});
  }
 }
 for(const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)){
  function visit(value,key=''){
   if(Array.isArray(value))value.forEach(item=>visit(item,key));
   else if(value&&typeof value==='object')Object.entries(value).forEach(([name,item])=>visit(item,name));
   else if(typeof value==='string'&&['name','headline','description','text','keywords','featureList'].includes(key))rows.push({kind:'schema.'+key,text:value});
  }
  visit(JSON.parse(match[1]));
 }
 return rows;
}
