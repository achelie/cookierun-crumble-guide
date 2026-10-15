import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
import {geometry,bestOutline,freshConstellation,resizeStars,moveStar,validate,costPlan,unlockedStars,linearBonus,nativeBonus,planBonus,normalizeState,estimatedGameArea} from '../../../public/tools/replica/stellar-link-math.mjs';
import { it, expect } from 'vitest';
it('preserves all upstream independent stellar-link checks', () => {
const data=JSON.parse(readFileSync(new URL('../../../public/data/tools/stellar-link.json',import.meta.url),'utf8'));
let checks=0;
function near(actual,expected){assert.ok(Math.abs(actual-expected)<1e-7,`${actual} != ${expected}`);checks++;}
function eq(actual,expected){assert.deepEqual(actual,expected);checks++;}
function rejects(action){assert.throws(action);checks++;}
near(geometry([0,4,8]).area,100*Math.sqrt(3)/4);
near(geometry([0,3,6,9]).area,200/3);
near(geometry([0,2,4,6,8,10]).area,50*Math.sqrt(3));
near(geometry(Array.from({length:12},(_,i)=>i)).area,100);
near(geometry([0,6,3,9]).area,100/3);
near(geometry([0,6,3,9]).envelope,200/3);
// An independent triangle oracle sums circular gap sines rather than coordinate determinants.
for(let a=0;a<10;a++)for(let b=a+1;b<11;b++)for(let c=b+1;c<12;c++){
 const oracle=100*(Math.sin((b-a)*Math.PI/6)+Math.sin((c-b)*Math.PI/6)+Math.sin((12+a-c)*Math.PI/6))/6;
 near(geometry([a,b,c]).area,oracle);
}
for(const n of [3,4,5,6,9,12]){
 const p=resizeStars(freshConstellation(),n),best=bestOutline(p);
 eq(new Set(best.positions).size,n);eq(geometry(best.positions).crossings,0);
 if(n===3)near(best.area,100*Math.sqrt(3)/4);
 if(n===4)near(best.area,200/3);
 if(n===6)near(best.area,50*Math.sqrt(3));
 if(n===12)near(best.area,100);
 for(let lockedIndex=0;lockedIndex<n;lockedIndex++){
  p.locked.fill(false);p.locked[lockedIndex]=true;
  const lockedBest=bestOutline(p);eq(lockedBest.positions[lockedIndex],p.positions[lockedIndex]);
  eq(geometry(lockedBest.positions).crossings,0);
 }
}
eq(bestOutline({...resizeStars(freshConstellation(),4),positions:[0,6,3,9],locked:[true,true,true,true]}),null);
for(let locked=0;locked<=6;locked++){
 const p=resizeStars(freshConstellation(),12);p.locked=p.locked.map((_,i)=>i<locked);p.budget=1000;p.attempts=20;
 const c=costPlan(data,p),amount=[10,10,30,60,100,150,220][locked];eq(c.cost,amount);eq(c.plannedCost,amount*20);eq(c.affordable,Math.floor(1000/amount));
}
let p=freshConstellation();p.locked[0]=true;
rejects(()=>moveStar(p,0,2));rejects(()=>moveStar(p,1,0));
p.locked[0]=false;eq(moveStar(p,0,4).positions,[4,0,8]);
p=resizeStars(p,5);p.locked[4]=true;rejects(()=>resizeStars(p,3));
rejects(()=>validate({...freshConstellation(),budget:-1}));rejects(()=>validate({...freshConstellation(),budget:1.1}));
rejects(()=>validate({...freshConstellation(),positions:[0,0,8]}));rejects(()=>validate({...freshConstellation(),actualArea:25.5,useActual:true}));
const allLocked={...freshConstellation(),locked:[true,true,true]};eq(costPlan(data,allLocked).affordable,0);eq(costPlan(data,allLocked).plannedCost,0);
near(linearBonus(data.constellations[0],50),10);eq(linearBonus(data.constellations[0],null),null);
eq(unlockedStars(data,{stageClear:0,cookieUpgrades:1190}).filter(x=>x.accessible).length,1);
const r55=unlockedStars(data,{stageClear:390,cookieUpgrades:55});eq(r55[0].stars,12);eq(r55[1].stars,12);eq(r55[2].stars,0);
eq(unlockedStars(data,{stageClear:390,cookieUpgrades:60})[2].stars,3);
eq(unlockedStars(data,{stageClear:390,cookieUpgrades:1190}).filter(x=>x.complete).length,10);
const invalid=normalizeState({version:1,order:99,plans:[{positions:[0,0,0]}]},data);eq(invalid.order,1);eq(invalid.plans[0].positions,[0,4,8]);
// Cross-language source-bound vectors include binary64 floor edge cases.
const vectors=JSON.parse(readFileSync(new URL('../../../public/data/tools/verification/stellar-bonus-native-vectors.json',import.meta.url),'utf8'));
for(const v of vectors)near(nativeBonus(data.constellations[v.constellationOrder-1],v.areaPercent),v.bonusPercent);
near(nativeBonus(data.constellations[0],57),11.39);near(nativeBonus(data.constellations[9],57),113.98);
near(nativeBonus(data.constellations[0],69),13.79);eq(nativeBonus(data.constellations[0],null),null);
rejects(()=>nativeBonus(data.constellations[0],57.5));rejects(()=>nativeBonus(data.constellations[0],-1));
eq(freshConstellation().useActual,true);eq(planBonus(data.constellations[0],freshConstellation()),null);
const old=normalizeState({version:1,plans:[{...freshConstellation(),useActual:false,actualArea:57}]},data);
eq(old.version,2);eq(old.plans[0].useActual,true);near(planBonus(data.constellations[0],old.plans[0]),11.39);
const reference=normalizeState({version:2,plans:[{...freshConstellation(),useActual:false}]},data);
eq(reference.plans[0].useActual,false);near(planBonus(data.constellations[0],reference.plans[0]),8.6);
// Independent screenshot extraction uses clockwise clock-face rank lists.
// The third layout is visible at00:32 in Jozhua's August8 original gameplay.
// Its winding0 and winding2 faces distinguish bounded-face union from evenodd/nonzero.
const layouts=[[12,1,2,3,5,4,6,8,7,9,10,11],[2,1,12,11,5,6,10,7,8,9,4,3],[11,8,4,2,9,10,1,3,6,7,12,5]];
const expected=[93.46158590977893,61.16454968463012,71.13248654051871];
for(let j=0;j<layouts.length;j++){
 const points=Array.from({length:12},(_,i)=>layouts[j].indexOf(i+1));
 near(geometry(points).area,expected[j]);
 // Reflection/reversal invariance tests the graph's half-edge face selection.
 near(geometry(points.map(i=>(12-i)%12)).area,expected[j]);
 near(geometry([...points].reverse()).area,expected[j]);
}
const pending=[2,1,7,null,6,null,null,5,4,null,null,3];
near(geometry(Array.from({length:7},(_,i)=>pending.indexOf(i+1))).area,81.1004233964073);
// Independent original UI pairs: three screenshots, historical video, current installed game.
const areaCases=[
 {positions:layouts[0].map((_,i)=>layouts[0].indexOf(i+1)),area:93,order:1,bonus:18.6},
 {positions:layouts[1].map((_,i)=>layouts[1].indexOf(i+1)),area:61,order:6,bonus:48.8},
 {positions:Array.from({length:7},(_,i)=>pending.indexOf(i+1)),area:81,order:7,bonus:81},
 {positions:layouts[2].map((_,i)=>layouts[2].indexOf(i+1)),area:71,order:1,bonus:14.2},
 {positions:[2,0,9,10,11,8,4],area:68,order:1,bonus:13.6}
];
for(const sample of areaCases){
 eq(estimatedGameArea(sample.positions),sample.area);
 eq(estimatedGameArea([...sample.positions].reverse()),sample.area);
 const plan={...resizeStars(freshConstellation(),sample.positions.length),positions:sample.positions,useActual:false};
 near(planBonus(data.constellations[sample.order-1],plan),sample.bonus);
}
near(geometry(areaCases[4].positions).area,68.89957660359269);
eq(Math.round(geometry(areaCases[4].positions).area),69); // disagrees with observed68
eq(estimatedGameArea(Array.from({length:12},(_,i)=>i)),100);
eq(estimatedGameArea(Array.from({length:12},(_,i)=>11-i)),100);
for(let a=0;a<12;a++)for(let b=0;b<12;b++)if(a!==b)for(let c=0;c<12;c++)if(c!==a&&c!==b){
 const g=geometry([a,b,c]);assert.ok(g.area>=0&&g.area<=g.envelope+1e-7);checks++;
}
const report={status:'passed',checks,scope:'Verified client bonus formula and costs; five original-UI area pairs support floor prediction, including one current discriminating layout; server numeric/degenerate boundaries remain unknown'};

expect(checks).toBe(2734);
});
