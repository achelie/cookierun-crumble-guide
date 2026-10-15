// Imported from REA; edit the importer and English map, then re-import.
import {createIconSelects} from './sugar-rune-select.mjs';
import {icon,assetPath} from './sugar-rune-icons.mjs';
import {OUTCOMES,normalizeState,adjustedRates,transition,attemptCost,modelReady,expectedPlan,finitePlan} from './plate-enhancement-math.mjs';

export function mount(root){
const controller=new AbortController(),signal=controller.signal;
const timers=new Set(),objectURLs=new Set();
const setTimeout=(callback,delay)=>{const id=globalThis.setTimeout(()=>{timers.delete(id);if(!signal.aborted)callback();},delay);timers.add(id);return id;};
const $=id=>root.querySelector("#"+id),esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const number=v=>Number.isFinite(v)?new Intl.NumberFormat('en-US',{maximumFractionDigits:1,notation:Math.abs(v)>=1e9?'compact':'standard'}).format(v):'—';
const percent=v=>new Intl.NumberFormat('en-US',{maximumFractionDigits:2}).format(v*100)+'%';
const chance=v=>v>0&&v<.0001?'<0.01%':v<1&&v>.9999?'>99.99%':percent(v);
const storageKey='crumble-plate-enhancement-v1';
let data,ui,state,pickers;
const art=(url,cls='')=>`<span class="r-ui-icon ${cls}" aria-hidden="true"><img src="${esc(url)}" alt="" decoding="async"></span>`;
const ico=key=>icon(ui,key),plate=()=>data.plates.find(p=>p.key===state.plate),current=()=>state.grades[state.plate];
const strategy=()=>({protectDecline:state.protectDecline,mitigateDestroy:state.mitigateDestroy,repair:state.repair});
function persist(note){try{localStorage.setItem(storageKey,JSON.stringify(state));if(note)$('pe-save-note').textContent=note;}catch{if(signal.aborted)return;$('pe-save-note').textContent="Browser storage is unavailable. Use a plan link or export JSON.";}}
function kpi(label,value,key,sub=''){return `<div class="pe-kpi"><small>${esc(label)}</small><strong>${ico(key)}${esc(value)}</strong>${sub?`<span>${esc(sub)}</span>`:''}</div>`;}
function fillSelectors(){
 $('pe-plate').innerHTML=data.plates.map(p=>`<option value="${p.key}">${esc(p.name)} Plating</option>`).join('');
 const grades=Array.from({length:data.maxGrade+1},(_,g)=>`<option value="${g}">+${g}${g===data.maxGrade?' · MAX':''}</option>`).join('');
 $('pe-current').innerHTML=$('pe-target').innerHTML=grades;
}
function renderOption(select,option){
 let image=art(plate().icon),small='';
 if(select.id==='pe-plate'){const p=data.plates.find(p=>p.key===option.value);image=art(p.icon);small=`Oven Lv.${p.ovenLevel} · Recorded +${state.grades[p.key]}`;}
 else if(select.id==='pe-current'||select.id==='pe-target'){const g=plate().grades[+option.value];small=`Main +${number(g.mainPercent)}% · Sub +${number(g.subPercent)}%`;}
 else {image=ico(option.value==='repair'?'materials.syrup':'outcomes.destroy');small=option.value==='repair'?"Pay to repair and restore the previous grade":"Skip repair and continue from the post-Break grade";}
 return {html:`${image}<span class="r-pick-label">${esc(option.textContent)}<small>${esc(small)}</small></span>`,search:small};
}
function renderOnce(){
 const g=current(),cost=attemptCost(data,g,strategy()),row=data.costs.find(c=>c.grade===g),rates=adjustedRates(data,g,strategy());
 $('pe-head-cost').textContent=g===data.maxGrade?'MAX':cost.steel;
 $('pe-rate-grade').textContent=g===data.maxGrade?"Configured cap reached":`Attempt from +${g}`;
 $('pe-decline-cost').innerHTML=g<10?"No cost now · Applies from +10":g===25?"Cap reached":`${ico('materials.syrup')}${row.declineProtect.amount} per attempt`;
 $('pe-destroy-cost').innerHTML=g<15?"No cost now · Applies from +15":g===25?"Cap reached":`${ico('materials.syrup')}${row.destroyProtect.amount} per attempt`;
 $('pe-protect-decline').closest('label').classList.toggle('pe-inactive',g<10||g===25);
 $('pe-protect-destroy').closest('label').classList.toggle('pe-inactive',g<15||g===25);
 if(!rates){$('pe-rates').innerHTML="<div class=\"pe-max\">MAX<strong>+25</strong>Plating is at the configured cap</div>";$('pe-once-cost').innerHTML='';$('pe-once-note').textContent="Choose another Plating or inspect grade bonuses.";return;}
 const adjustedReady=!modelReady(data,{...strategy(),repair:true},g+1);
 $('pe-rates').innerHTML=data.outcomeTypes.map(outcome=>{
  let next='';try{next=`→ +${transition(data,g,outcome.key,{...strategy(),repair:false})}`;}catch{next="Please update rule data";}
  if(outcome.key==='destroy'&&state.repair)next+=` · Repair to +${g}`;
  if(outcome.key==='greatSuccess')next+=` · Configured refund rate ${number(row.refundPercent)}%`;
  if(!rates[outcome.key])next="Not possible with this grade and strategy";
  return `<div class="pe-rate pe-rate-${outcome.key}"><div>${ico('outcomes.'+outcome.key)}<span>${esc(outcome.name)}<small>${esc(next)}</small></span><strong>${percent(rates[outcome.key])}</strong></div><div class="pe-rate-track"><i style="width:${rates[outcome.key]*100}%"></i></div></div>`;
 }).join('');
 $('pe-once-cost').innerHTML=`<span>${ico('materials.steel')}<b>${cost.steel}</b> Chocosteel</span><span>${ico('materials.syrup')}<b>${cost.syrup}</b> Metal Syrup</span>${row.recovery?`<small>Repair after Break also costs ${ico('materials.syrup')}<b>${row.recovery.amount}</b>  units</small>`:''}`;
 const modeled=adjustedReady&&((state.protectDecline&&g>=10)||(state.mitigateDestroy&&g>=15));
 $('pe-once-note').textContent=modeled?"Verified client rules: avoided Downgrade/Break probability moves to No Change. Upgrade and Super probabilities stay unchanged.":"Showing original unprotected probabilities.";
 if(!adjustedReady)$('pe-once-note').textContent="Protection rules are unavailable. Reload the page.";
}
function renderGain(){
 const from=plate().grades[current()],to=plate().grades[state.target];
 const blocks=[["Main Effect",'mainPercent'],["Sub Effect",'subPercent']];
 $('pe-stage-effects').innerHTML=blocks.map(([label,key])=>`<div><small>${label} Amplification</small><strong>+${number(from[key])}%</strong></div>`).join('');
 $('pe-gain').innerHTML=blocks.map(([label,key])=>`<div><span>${label}</span><div><b>+${number(from[key])}%</b><i>→</i><strong>+${number(to[key])}%</strong></div><small>+${current()} → +${state.target} · ${to[key]-from[key]>=0?'+':''}${number(to[key]-from[key])} percentage points</small></div>`).join('');
 const values=[["Main Effect",'baseMain','mainPercent'],["Sub Effect",'baseSub','subPercent']].filter(([,key])=>state[key]!==null);
 $('pe-value-preview').innerHTML=values.map(([label,key,amplify])=>`<p class="pe-conversion">${label} <b>${number(state[key]*(1+from[amplify]/100))}</b> → <strong>${number(state[key]*(1+to[amplify]/100))}</strong></p>`).join('')||"<p class=\"pe-note\">Enter base equipment effect values to preview amplified values.</p>";
}
function renderPlans(){
 const s=strategy(),g=current(),target=state.target;
 $('pe-model-note').textContent=`Plan +${g} → +${target}. ${s.protectDecline?"Prevent Downgrade from +10; ":"No Downgrade prevention; "}${s.mitigateDestroy?"Halve Break chance from +15; ":"No Break reduction; "}${s.repair?"Pay for every Break repair. ":"Drop two grades after Break and continue. "}Enhancement rules verified against the 1.5.002 client.`;
 try{const result=expectedPlan(data,g,target,s);$('pe-expectation').innerHTML=`<div class="pe-kpis">${kpi("Expected attempts",number(result.attempts),'sectionIcon',"attempts")}${kpi("Gross Chocosteel",number(result.steel),'materials.steel',"Before refunds")}${kpi("Gross Metal Syrup",number(result.syrup),'materials.syrup',"Protection + repairs; before refunds")}${kpi("Expected repairs",number(result.repairs),'outcomes.destroy',"attempts")}</div>${g>=target?"<p class=\"pe-success-note\">Current grade has reached the target.</p>":''}`;}catch(error){$('pe-expectation').innerHTML=`<p class="pe-error">${esc(error.message)}</p>`;}
 try{const result=finitePlan(data,g,target,s,state.attempts);$('pe-attempt-plan').innerHTML=`<div class="pe-chance"><div><small>${number(state.attempts)} attempts to reach +${target}</small><strong>${esc(chance(result.probability))}</strong></div><div class="pe-chance-track"><i style="width:${result.probability*100}%"></i></div></div><div class="pe-kpis pe-finite-kpis">${kpi("Average attempts used",number(result.attempts),'sectionIcon',"Stop at target")}${kpi("Average gross Chocosteel",number(result.steel),'materials.steel',"Before refunds")}${kpi("Average gross Metal Syrup",number(result.syrup),'materials.syrup',"Protection + repairs; before refunds")}</div>`;}catch(error){$('pe-attempt-plan').innerHTML=`<p class="pe-error">${esc(error.message)}</p>`;}
}
function renderInventory(){
 $('pe-inventory').innerHTML=data.plates.map(p=>`<button class="pe-inventory-slot ${state.plate===p.key?'selected':''} ${state.oven<p.ovenLevel?'pe-locked':''}" type="button" data-pe-plate="${p.key}" aria-label="${esc(p.name)} Plating, current +${state.grades[p.key]}" aria-pressed="${state.plate===p.key}"><img src="${p.icon}" alt=""><b>+${state.grades[p.key]}</b><span>${esc(p.name)}</span><small>${state.oven<p.ovenLevel?"Oven Lv."+p.ovenLevel+" Unlock":"Unlocked"}</small></button>`).join('');
}
function renderTable(){
 $('pe-grade-table').innerHTML="<table class=\"pe-table\"><thead><tr><th>Current grade</th><th>Main AMP</th><th>Sub AMP</th><th>Chocosteel / attempt</th>"+data.outcomeTypes.map(o=>`<th>${ico('outcomes.'+o.key)}${esc(o.name)}</th>`).join('')+"<th>Protection / repair Syrup</th><th>Configured refund rate</th></tr></thead><tbody>"+plate().grades.map(row=>{
  const cost=data.costs.find(c=>c.grade===row.grade),rates=adjustedRates(data,row.grade,{});
  return `<tr class="${row.grade===current()?'pe-current-row':''} ${row.grade===state.target?'pe-target-row':''}"><th>+${row.grade}${row.grade===current()?" · Current":''}${row.grade===state.target?" · Target":''}</th><td>+${number(row.mainPercent)}%</td><td>+${number(row.subPercent)}%</td><td>${cost?ico('materials.steel')+cost.upgrade.amount:'MAX'}</td>${OUTCOMES.map(k=>`<td>${rates?percent(rates[k]):'—'}</td>`).join('')}<td>${cost?[cost.declineProtect?.amount||0,cost.destroyProtect?.amount||0,cost.recovery?.amount||0].join(' / '):'—'}</td><td>${cost?number(cost.refundPercent)+'%':'—'}</td></tr>`;
 }).join('')+"</tbody></table><p class=\"pe-note\">Probabilities are unprotected. Syrup columns: Prevent Downgrade / Reduce Break Chance / post-Break repair. Refund rates are configured values; eligible materials and integer amounts remain uncertain.</p>";
}
function renderEvidence(){
 const strip=text=>String(text).replace(/<\/?(?:color|size|b|i)[^>]*>/g,'');
 const deep=data.provenance.refundDeepNativeEvidence;
 const deepNote=deep?`<p class="pe-note">Additional extraction 2026-10-16: indexed all ${deep.coverage.recoveredAssembliesIndexed}recovered assemblies; scanned ${deep.coverage.nonemptyMethodIntervals.toLocaleString('en-US')}nonempty method intervals. Verified refund-rate reads/writes store configuration and display percentages; the full integer refund formula was not recovered. Indexed intervals cover about 35.44% of the code section; unbound intervals, indirect calls and pointer aliases remain unexcluded. <a href="${esc(deep.download)}" download>Additional extraction and coverage ↓</a></p>`:'';
 const sample=data.rules.greatSuccessRefund.currentObservation;
 $('pe-refund-example').innerHTML=sample?`<div class="pe-refund-observation"><b>${ico('outcomes.greatSuccess')}Recorded Super refund observation</b><p>Armor Plating +0 → +2 · No protection</p><div class="pe-refund-metrics"><span>Paid ${ico('materials.steel')}<strong>${sample.steelCost}</strong></span><span>Refund ${ico('materials.steel')}<strong>${sample.steelRefund}</strong></span><span>Net cost ${ico('materials.steel')}<strong>${sample.netSteelCost}</strong></span></div><small>One recorded observation, not a rule applied to every grade. All material estimates exclude refunds.</small><a href="/data/tools/verification/current-plating-super0-refund.png" target="_blank" rel="noopener">View in-game result ↗</a></div>`:'';
 $('pe-evidence').innerHTML=`<p class="pe-note">Version ${esc(data.sourceVersion)}. On 2026-10-15, Plating was inspected in LDPlayer 9: unprotected probabilities, enhancement costs, Super refund rates and visible repair fees for +0–+24 gave 185 values, all matching configuration. High-grade screens are detail previews, not actual high-grade enhancement outcomes.</p><p class="pe-note">Protection is verified in the loaded same-version client and supported by in-game help: Prevent Downgrade makes its probability zero; Reduce Break Chance halves Break probability. The avoided probability moves to No Change, leaving Upgrade and Super unchanged. High-grade protection toggles have not been exercised live. Downgrade starts at +10 and Break at +15; refer to the grade probability table.</p><p class="pe-note">Game information and help show Break reduces two grades, matching verified GetNextGrade logic. Paying for repair restores the pre-attempt grade without refunding that attempt's materials. Results stay within 0–25; a Super at +24 reaches +25. No live Break or repair transaction was performed in this round.</p><p class="pe-note">Four low-grade enhancements used free check-in materials: three Upgrades and one Super. Armor +0 → +2 cost 1 Chocosteel and refunded 1; balance 2 → 2. The +0 configuration/preview refund rate is 10%. Flooring or rounding 0.1 gives 0 and does not match this sample. Ceiling and a minimum refund of 1 both remain possible, so no universal grade formula is established. No protection materials were paid, so their refund eligibility is undetermined.</p><p class="pe-note">This round received 5 free Chocosteel, paid 4, refunded 1, spent 3 net and retained 2. No Metal Syrup, Crystals or Medals were used. Budgets retain gross investment without uncertain refunds. Four outcomes do not establish independence, pity or empirical frequencies. Forecasts use a fixed strategy, fixed configuration and independent draws, stopping at the target.</p><p class="pe-note"><a href="/data/tools/verification/plate-current-ui-preview-verification.json" download>25-grade UI probability and cost check ↓</a> · <a href="/data/tools/verification/plate-current-transactions-verification.json" download>4 transactions and refund evidence ↓</a> · <a href="/data/tools/verification/current-plating-grade15.png" target="_blank" rel="noopener">Original +15 preview ↗</a> · <a href="/data/tools/verification/current-plating-protection-help.png" target="_blank" rel="noopener">Protection and repair help ↗</a> · <a href="/data/tools/verification/current-plating-break-delta.png" target="_blank" rel="noopener">Break −2 grade information ↗</a></p><p class="pe-note">The traced normal enhancement refund chain receives integer quantities from server Rewards and groups them by material ID for display. These 15 methods contain no refund-rate or rounding calculation. Client configuration readers and indirect calls are not fully covered, so related logic elsewhere cannot be ruled out. The full eligible-material scope and server algorithm remain unknown.<a href="/data/tools/verification/plate-refund-boundary-analysis.json" download>Native refund boundary analysis ↓</a> · <a href="/data/tools/verification/plate-refund-wide-analysis.json" download>Expanded analysis ↓</a> · <a href="/data/tools/verification/plate-refund-primary-footage-analysis.json" download>August refund observations (earlier version)↓</a></p>`+deepNote+data.officialTexts.filter(t=>t.key.startsWith('ContentsGuide.Description.')).map(t=>`<div class="pe-guide-text">${esc(strip(t.en))}</div>`).join('');
}

function render(){
 const p=plate(),g=current();
 $('pe-plate').value=state.plate;$('pe-current').value=g;$('pe-target').value=state.target;
 $('pe-recovery-mode').value=state.repair?'repair':'accept';
 for(const [id,key]of [['pe-protect-decline','protectDecline'],['pe-protect-destroy','mitigateDestroy'],['pe-repair','repair']])$(id).checked=state[key];
 $('pe-forge-name').textContent=p.name+" Plating";$('pe-unlock').textContent=`Oven Lv.${p.ovenLevel} Unlock`;$('pe-plate-art').src=p.icon;$('pe-grade-badge').textContent='+'+g;
 $('pe-plate-preview')?.classList.toggle('max',g===25);
 renderOnce();renderGain();renderPlans();renderInventory();renderTable();pickers?.sync();
}
function validateNumber(input,lo,hi,integer=true){const value=input.value.trim()===''?null:Number(input.value);if(value===null||!Number.isFinite(value)||value<lo||value>hi||(integer&&!Number.isInteger(value))){input.setCustomValidity(`Enter ${lo}–${number(hi)} ${integer?"integer":"number"}. `);input.reportValidity();return null;}input.setCustomValidity('');return value;}
async function load(){
 [data,ui]=await Promise.all(['/data/tools/en/plate-enhancement.json','/data/tools/en/plate-enhancement-ui-assets.json'].map(async url=>{const r=await fetch(url,{signal});if(!r.ok)throw new Error("Could not load tool data");return r.json();}));
 if(signal.aborted)return;
 let raw;try{raw=JSON.parse(new URLSearchParams(location.search).get('plan')||localStorage.getItem(storageKey)||'null');}catch{$('pe-save-note').textContent='Invalid saved or shared plan. Default settings restored.';}
 if(raw&&![1,2].includes(raw.version))$('pe-save-note').textContent='Invalid saved or shared plan. Default settings restored.';
 state=normalizeState(raw,data);fillSelectors();
 if(raw?.version===1)$('pe-save-note').textContent="Old plan progress and protection settings retained; recalculated using verified game rules.";
 root.querySelectorAll('[data-pe-icon]').forEach(el=>el.innerHTML=ico(el.dataset.peIcon));
 for(const [id,key]of [['pe-anvil','anvil'],['pe-hammer','hammer'],['pe-frame','plateFrame'],['pe-oven-art','oven']]){const url=assetPath(ui,key);if(url){$(id).src=url;$(id).hidden=false;}}
 if(assetPath(ui,'background.wall'))root.querySelector('.pe-forge').style.setProperty('--pe-wall',`url('${assetPath(ui,'background.wall')}')`);
 for(const [id,key]of [['pe-attempts','attempts'],['pe-oven','oven'],['pe-base-main','baseMain'],['pe-base-sub','baseSub']])$(id).value=state[key]??'';
 pickers=createIconSelects(renderOption,{selector:'#plate-tool select',listId:'plate-icon-options',root,signal});
 $('plate-tool').addEventListener('change',event=>{
  const id=event.target.id;
  if(id==='pe-plate')state.plate=event.target.value;
  else if(id==='pe-current'){state.grades[state.plate]=+event.target.value;if(state.target<=current())state.target=Math.min(data.maxGrade,current()+1);}
  else if(id==='pe-target')state.target=+event.target.value;
  else if(id==='pe-recovery-mode')state.repair=event.target.value==='repair';
  else if(id==='pe-protect-decline')state.protectDecline=event.target.checked;
  else if(id==='pe-protect-destroy')state.mitigateDestroy=event.target.checked;
  else if(id==='pe-repair')state.repair=event.target.checked;
  else {const fields={'pe-attempts':['attempts',0,1e6,true],'pe-oven':['oven',1,1000,true],'pe-base-main':['baseMain',0,1e12,false],'pe-base-sub':['baseSub',0,1e12,false]},field=fields[id];if(!field)return;let value;if(!event.target.value&&id.startsWith('pe-base-'))value=null;else{value=validateNumber(event.target,field[1],field[2],field[3]);if(value===null)return;}state[field[0]]=value;}
  render();persist("Plating progress saved automatically.");
 },{signal});
 $('pe-inventory').addEventListener('click',event=>{const button=event.target.closest('[data-pe-plate]');if(button){state.plate=button.dataset.pePlate;render();persist();$('pe-plate-picker').focus({preventScroll:true});}},{signal});
 $('pe-save').addEventListener('click',()=>persist("Saved all 12 Plating grades and enhancement strategy."),{signal});
 $('pe-share').addEventListener('click',async()=>{const url=new URL(location.href);url.search='';url.searchParams.set('plan',JSON.stringify(state));$('pe-share-field').hidden=false;$('pe-share-url').value=url.href;try{await navigator.clipboard.writeText(url.href);if(signal.aborted)return;$('pe-save-note').textContent="Plan link copied. Open it to restore this plan.";}catch{if(signal.aborted)return;$('pe-share-url').select();$('pe-save-note').textContent="Copy the plan link above.";}},{signal});
 $('pe-export').addEventListener('click',()=>{const json=JSON.stringify({tool:'plate-enhancement',sourceVersion:data.sourceVersion,...state},null,2)+'\n';$('pe-json').value=json;$('pe-json-panel').hidden=false;$('pe-json-panel').open=true;const objectURL=URL.createObjectURL(new Blob([json],{type:'application/json'}));objectURLs.add(objectURL);const a=document.createElement('a');a.href=objectURL;a.download='crumble-plate-plan.json';root.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(objectURL),30000);$('pe-save-note').textContent="Plan JSON generated. View or copy it below.";},{signal});
 $('pe-copy-json').addEventListener('click',async()=>{try{await navigator.clipboard.writeText($('pe-json').value);if(signal.aborted)return;$('pe-save-note').textContent="Plan JSON copied.";}catch{if(signal.aborted)return;$('pe-json').select();$('pe-save-note').textContent="Plan JSON selected. Copy it manually.";}},{signal});
 render();renderEvidence();$('plate-tool').hidden=false;$('pe-loading').hidden=true;
}
load().catch(error=>{if(!signal.aborted){$('pe-loading').textContent="Loading failed: "+error.message;}});
return ()=>{controller.abort();for(const id of timers)globalThis.clearTimeout(id);for(const url of objectURLs)URL.revokeObjectURL(url);pickers?.destroy();};
}
