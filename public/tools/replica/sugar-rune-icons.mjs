// Imported from REA; edit the importer and English map, then re-import.
const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fallbackPaths={"runes.C":"/images/tools/ImgRuneC__d0d7b0b20a7d.png","runes.U":"/images/tools/ImgRuneU__d3e53b260743.png","runes.R":"/images/tools/ImgRuneR__e61e0996cf9e.png","runes.SR":"/images/tools/ImgRuneSR__5ddc9ebee725.png","runes.SSR":"/images/tools/ImgRuneSSR__b14a1c8aa8f8.png","runes.default":"/images/tools/ImgRuneDefault__4e98c50ced96.png","slot":"/images/tools/ImgRuneSlot__e23ce417ff4b.png","backdrop":"/images/tools/ImgRuneBack__d6d1fcff95b7.png","currency":"/images/tools/icon_rune_crystal__82470d697724.png","sectionIcon":"/images/tools/icon_contentsunlock_sugarrune__83c8269639db.png"};
function entry(ui,key){return key.split('.').reduce((value,part)=>value?.[part],ui);}
export function assetPath(ui,key){const item=entry(ui,key);const path=typeof item==='string'?item:item?.url;if(typeof path==='string'&&/^\/(?:images|media|thumb|tools|assets)\//.test(path))return path;return fallbackPaths[key]?fallbackPaths[key]:'';}
const paths={
 lock:'M7 10V7a5 5 0 0 1 10 0v3M5 10h14v11H5zm7 5v3',
 unlock:'M17 10V7a5 5 0 0 0-10 0M5 10h14v11H5zm7 5v3',
 'controls.settings':'M10 3h4l1 3 3 1 3 3v4l-3 3-3 1-1 3h-4l-1-3-3-1-3-3v-4l3-3 3-1zm2 6a3 3 0 1 0 0 6 3 3 0 0 0 0-6',
 'controls.reset':'M19 8a8 8 0 1 0 1 8M19 3v5h-5',
 'controls.rotateLeft':'M15 4 7 12l8 8',
 'controls.rotateRight':'M9 4l8 8-8 8',
 attack:'M4 20 20 4l-6 1 5 5M3 14l7 7M5 16l-2 5 5-2',
 defense:'M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6zm0 4v10',
 health:'M12 20 4 12a5 5 0 0 1 8-6 5 5 0 0 1 8 6z',
 critical:'M13 2 5 13h6l-1 9 9-13h-6z',
 criticalDamage:'M12 2l2 6 7-2-4 6 5 4-7 1-2 5-3-5-7-1 5-5-2-5 6 2z',
 criticalResist:'M12 3 4 6v7l8 8 8-8V6zm-4 9 3 3 6-6',
 accuracy:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18m0 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8M12 1v5m0 12v5M1 12h5m12 0h5',
 avoidance:'M3 14c4-7 14-7 18 0M5 20 20 5M13 19h5v-5',
 amplify:'M12 2l2 7 7 3-7 2-2 8-2-8-7-2 7-3z',
 reduction:'M12 3 4 6v7l8 8 8-8V6zm-5 9h10',
 haste:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18m0 4v6l4 2',
 speed:'M3 9h8M1 13h8M4 17h6m2-13 8 5-5 3-3 8 7 1 3-7-5-2 3-3',
 focus:'M3 5h5M3 5v5m18-5h-5m5 0v5M3 19h5m-5 0v-5m18 5h-5m5 0v-5m-9-6a4 4 0 1 0 0 8 4 4 0 0 0 0-8',
 resist:'M12 3 4 6v7l8 8 8-8V6zm0 4v5m0 4v1'
};
const semanticById={'1085150075':'attack','1122482454':'defense','1884385753':'health','1195842961':'critical','1370215206':'criticalDamage','2059461381':'criticalResist','1763247570':'accuracy','1779218805':'avoidance','2001048058':'amplify','2059761495':'reduction','1944163020':'haste','1489934048':'speed','1843270749':'focus','1970827708':'resist'};
export function icon(ui,key,extraClass=''){
 const body=assetPath(ui,'lockParts.body'),shackle=assetPath(ui,'lockParts.shackle');
 if((key==='lock'||key==='unlock')&&body&&shackle)return `<span class="r-ui-icon ${extraClass}" aria-hidden="true"><span class="r-lock-composite ${key==='unlock'?'open':''}"><span class="r-lock-shackle r-sprite-mask" style="--sprite:url('${escape(shackle)}')"></span><span class="r-lock-body r-sprite-mask" style="--sprite:url('${escape(body)}')"></span></span></span>`;
 const path=assetPath(ui,key);
 if(path&&/^controls\.rotate/.test(key))return `<span class="r-ui-icon ${extraClass}" aria-hidden="true"><span class="r-rotate-icon ${key==='controls.rotateRight'?'right':''} r-sprite-mask" style="--sprite:url('${escape(path)}')"></span></span>`;
 if(path)return `<span class="r-ui-icon ${extraClass}" aria-hidden="true"><img src="${escape(path)}" alt="" decoding="async"></span>`;
 const semantic=key.startsWith('effects.')?semanticById[key.split('.')[1]]:key;
 return `<span class="r-ui-icon ${extraClass}" aria-hidden="true"><svg class="r-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="${paths[semantic]||paths.amplify}"></path></svg></span>`;
}
export function applyUI(ui,root=document){root.querySelectorAll('[data-ui-icon]').forEach(node=>{node.innerHTML=icon(ui,node.dataset.uiIcon);});root.querySelectorAll('[data-ui-image]').forEach(node=>{const path=assetPath(ui,node.dataset.uiImage);if(path){node.src=path;node.hidden=false;}else node.hidden=true;});}
export function runeImage(ui,rarity){return assetPath(ui,'runes.'+(rarity||'default'));}
export function lockImage(ui,locked){return assetPath(ui,locked?'lock':'unlock');}
export function wheelHTML(ui,data,slots,grade,selected,rotation){return data.slots.map(config=>{const current=slots[config.order];const active=grade>=config.requiredGrade;const row=data.outcomes.find(outcome=>String(outcome.id)===String(current.outcomeId));const angle=config.order*45+rotation;const radians=(angle-90)*Math.PI/180;const radius=18.84;const x=50+radius*Math.cos(radians),y=50.25+radius*Math.sin(radians);return `<button class="r-wheel-piece ${selected===config.order?'selected':''}" data-wheel-slot="${config.order}" type="button" aria-label="Select Rune slot ${config.order+1}" aria-pressed="${selected===config.order}" style="--piece-x:${x}%;--piece-y:${y}%;--piece-angle:${angle}deg"><img src="${escape(runeImage(ui,row?.rarity))}" alt="${row?escape(row.rarity+" Sugar Runes"):"Empty Rune"}">${current.locked?`<span class="r-piece-lock">${icon(ui,'lock')}</span>`:''}<span class="r-piece-number">${config.order+1}</span></button>`;}).join('');}
