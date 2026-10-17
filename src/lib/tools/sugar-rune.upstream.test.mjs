import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {poolProbability,describeState,binomialTail,binomial,atLeastOne,fixedPlan,adaptivePlan,adaptiveChance,discountedCost} from '../../../public/tools/replica/sugar-rune-math.mjs';
import { it, expect } from 'vitest';
it('preserves all upstream independent sugar-rune checks', () => {
const data=JSON.parse(readFileSync(new URL('../../../public/data/tools/sugar-runes.json',import.meta.url),'utf8'));
let checks=0;
const check=(condition,message)=>{assert.ok(condition,message);checks++;};
const near=(a,b,tolerance=1e-10)=>check(Math.abs(a-b)<=tolerance*Math.max(1,Math.abs(b)),`${a} != ${b}`);
const emptySlots=()=>Array.from({length:8},()=>({outcomeId:'',locked:false}));
const base=()=>({grade:10,slots:emptySlots(),target:{rarity:'SSR',effectIds:[],minimumValue:null},goal:1,budget:10000,attempts:100,manualCost:null});
check(data.outcomes.length===160,'160 actual outcomes');check(data.effects.length===14,'14 actual effects');
const pool=poolProbability(data,base().target);check(pool.totalWeight===13050,'denominator');check(pool.matchingWeight===140,'SSR numerator');near(pool.probability,140/13050);
const attack=poolProbability(data,{rarity:'SSR',effectIds:[1085150075],minimumValue:7});check(attack.matchingWeight===1,'top attack exact threshold');near(attack.probability,1/13050);check(attack.outcomes[0].rawValue==='700','original BasisPoint preserved');
const expectedSlots=[1,1,2,2,3,3,4,4,6,6,8];for(let grade=0;grade<=10;grade++)check(describeState(data,grade,emptySlots(),base().target).active===expectedSlots[grade],'unlock thresholds');
for(let locked=0;locked<=7;locked++){const options=base();options.slots=emptySlots().map((slot,i)=>i<locked?{outcomeId:String(data.outcomes[0].id),locked:true}:slot);options.goal=locked+1;const plan=fixedPlan(data,options);check(plan.perCraft===[20,40,80,120,180,240,300,400][locked],'lock cost curve');near(plan.oneCraft,1-Math.pow(1-pool.probability,8-locked));}
const fixture={effects:[{id:'good'},{id:'bad'}],outcomes:[{id:'good',effectId:'good',rarity:'SSR',value:1,weight:1},{id:'bad',effectId:'bad',rarity:'C',value:1,weight:1}],slots:Array.from({length:8},(_,i)=>({order:i,requiredGrade:i<2?0:10})),costs:data.costs};
const opt={...base(),grade:0,target:{rarity:'SSR',effectIds:['good'],minimumValue:null},goal:2,budget:200,attempts:3};
const fixed=fixedPlan(fixture,opt),keep=adaptivePlan(fixture,opt);near(fixed.oneCraft,.25);near(fixed.expectedAttempts,4);near(fixed.expectedCost,80);near(keep.expectedAttempts,8/3);near(keep.expectedCost,80);near(keep.attemptChance,49/64);
function exhaustiveCompletion(n,p,needed,attempts){if(needed===0)return 1;if(attempts===0)return 0;let result=0;for(let mask=0;mask<2**n;mask++){const successes=mask.toString(2).replace(/0/g,'').length;const probability=Math.pow(p,successes)*Math.pow(1-p,n-successes);result+=probability*(successes>=needed?1:exhaustiveCompletion(n-successes,p,needed-successes,attempts-1));}return result;}
for(let n=1;n<=4;n++)for(let k=1;k<=n;k++)for(const p of [.1,.25,.5,.8,1])for(let attempts=0;attempts<=3;attempts++)near(adaptiveChance(n,p,k,attempts),exhaustiveCompletion(n,p,k,attempts),1e-11);
function exactBudget(n,p,goal,budget,costs,initialLocks=0){const cache=new Map();function walk(retained,remaining){if(retained>=goal)return 1;const cost=costs[initialLocks+retained];if(remaining<cost)return 0;const key=retained+':'+remaining;if(cache.has(key))return cache.get(key);const m=n-retained;let probability=0;for(let mask=0;mask<2**m;mask++){const got=mask.toString(2).replace(/0/g,'').length;const weight=Math.pow(p,got)*Math.pow(1-p,m-got);probability+=weight*walk(Math.min(goal,retained+got),remaining-cost);}cache.set(key,probability);return probability;}return walk(0,budget);}
for(const n of [1,2,3])for(let goal=1;goal<=n;goal++)for(const p of [.25,.5,.8])for(const budget of [0,19,20,40,100,200,400]){const model={...fixture,slots:Array.from({length:8},(_,i)=>({order:i,requiredGrade:i<n?0:10})),outcomes:[{...fixture.outcomes[0],weight:p},{...fixture.outcomes[1],weight:1-p}]};const plan=adaptivePlan(model,{...opt,goal,budget});const exact=exactBudget(n,p,goal,budget,[20,40,80,120,180,240,300,400]);check(plan.budgetChanceLower<=exact+1e-10&&plan.budgetChanceUpper>=exact-1e-10,'adaptive budget bounds include exact budget oracle');}
for(const p of [0,.00007662835,.01,.5,.99,1])for(let n=0;n<=8;n++)for(let k=0;k<=8;k++){const sum=k===0?1:binomial(n,p).slice(k).reduce((a,b)=>a+b,0);near(binomialTail(n,p,k),sum);}
const filled=base();filled.slots=emptySlots().map(()=>({outcomeId:String(data.outcomes[0].id),locked:true}));filled.goal=8;check(fixedPlan(data,filled).complete,'all locked target complete');check(adaptivePlan(data,filled).expectedCost===0,'no craft when already complete');
const badLocks=base();badLocks.slots=emptySlots().map(()=>({outcomeId:String(data.outcomes.find(r=>r.rarity==='C').id),locked:true}));check(Boolean(fixedPlan(data,badLocks).error),'all slots locked but do not match');
const missing=base();missing.target={rarity:'SSR',effectIds:['1085150075'],minimumValue:100};check(!fixedPlan(data,missing).possible,'impossible threshold');check(!adaptivePlan(data,missing).possible,'impossible adaptive threshold');
const one=base();one.grade=0;one.manualCost=18;check(fixedPlan(data,one).perCraft===18,'manual account cost');check(fixedPlan(data,one).affordable===555,'budget floor with manual cost');
assert.throws(()=>adaptivePlan(data,one),/unsupported/i);checks++;assert.throws(()=>poolProbability(data,{rarity:'SSR',effectIds:data.effects.slice(0,4).map(r=>String(r.id))}),/up to/i);checks++;
assert.throws(()=>poolProbability(data,{rarity:'SSR',effectIds:[],minimumValue:1}),/exactly one/i);checks++;
assert.throws(()=>fixedPlan(data,{...base(),attempts:5001}),/count/i);checks++;assert.throws(()=>fixedPlan(data,{...base(),budget:-1}),/budget/i);checks++;assert.throws(()=>fixedPlan(data,{...base(),manualCost:1.5}),/cost/i);checks++;
near(atLeastOne(.000001,1000000),-Math.expm1(1000000*Math.log1p(-.000001)));check(adaptiveChance(8,.01,8,1000000000000)>.999999,'large horizon stable');
// Closed-form net cost oracle, separately exercises all eight native lock tiers.
for(const amount of [20,40,80,120,180,240,300,400])for(const discount of [0,1,5,10,15,33,57,69,99,100,105]){
 const net=Math.max(0,Math.ceil(amount*(100-discount)/100));
 check(discountedCost(amount,discount)===net,'native discount matches ceil of net rational cost');
}
const inactive=base();inactive.grade=0;inactive.slots[7]={outcomeId:String(data.outcomes[0].id),locked:true};
const inactiveState=describeState(data,0,inactive.slots,inactive.target);
check(inactiveState.locked===1&&inactiveState.activeLocked===0&&inactiveState.inactiveLocked===1,'inactive locks still billed');
check(inactiveState.unlocked===1&&inactiveState.lockedMatches===0,'inactive effect excluded from active target');
check(inactiveState.totals.length===0,'inactive effects do not apply');
check(fixedPlan(data,inactive).perCraft===40,'inactive lock uses40 rather than20');
inactive.discountPercent=15;check(fixedPlan(data,inactive).perCraft===34,'effective summed discount');
check(adaptivePlan(data,inactive).stages[0].cost===34,'adaptive curve applies same summed discount');
near(fixedPlan(data,inactive).oneCraft,140/13050);
const discountedFixture={...opt,discountPercent:15};near(adaptivePlan(fixture,discountedFixture).expectedCost,68);
const free={...base(),discountPercent:100};check(fixedPlan(data,free).perCraft===0,'nonnegative fee clamp');
check(fixedPlan(data,free).expectedCost===0,'free fixed model');check(adaptivePlan(data,free).expectedCost===0,'free adaptive model');
check(fixedPlan(data,free).budgetChance===1,'zero fee theoretical unlimited-budget limit');
assert.throws(()=>fixedPlan(data,{...base(),discountPercent:1.5}),/discount/i);checks++;
const report={date:'2026-10-14',passed:true,checks,oracles:['actual source weight, rarity, threshold and lock cost','bitmask enumeration of independent multi-slot draws','exact budget-state enumeration encloses adaptive bounds','closed-form two-slot example: adaptive attempts=8/3, crystals=80','already complete, impossible target, all locked, manual cost, invalid input, large horizon'],ssrSingleSlotProbability:pool.probability,topAttackSingleSlotProbability:attack.probability};

expect(checks).toBe(969);
});
