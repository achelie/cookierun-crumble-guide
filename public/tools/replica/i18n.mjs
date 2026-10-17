// Rendered tool strings only. Values, storage schemas and math modules are untouched.
export function createToolI18n({locale='en',t=value=>String(value)}={}){
 const prefix={en:'','zh-Hant':'/zh-tw',ja:'/ja',ko:'/ko',th:'/th'}[locale]||'';
 const escape=value=>String(value).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
 const decode=value=>value.replace(/&quot;/g,'"').replace(/&#39;|&apos;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
 const path=value=>{if(!value.startsWith('/')||value.startsWith('//'))return value;const plain=value.replace(/^\/(?:zh-tw|ja|ko|th)(?=\/|$)/,'');return /^\/(?:cookies|pets|tools|guides|teams|tier-list|codes)(?:\/|$)/.test(plain)?prefix+plain:value;};
 const text=value=>t(String(value??''));
 const fragment=value=>{const original=decode(value),translated=text(original);return translated===original?value:escape(translated);};
 const html=value=>String(value??'').replace(/(^|>)([^<>]+)(?=<|$)/g,(_,before,part)=>before+fragment(part)).replace(/((?:alt|title|placeholder|aria-label)=")([^"]*)(")/g,(_,before,part,after)=>before+fragment(part)+after).replace(/(href=")([^"#]+)(")/g,(_,before,value,after)=>before+path(value)+after);
 const dataPath=value=>String(value).replace(/^\/data\/tools\/en\/(sugar-runes|stellar-link|plate-enhancement|site-data)\.json$/, '/data/tools/'+locale+'/$1.json');
 return {text,html,path,dataPath};
}
