import assert from 'node:assert/strict';
import fs from 'node:fs';
import {OUTCOMES,normalizeState,adjustedRates,transition,attemptCost,expectedPlan,finitePlan} from '../../../public/tools/replica/plate-enhancement-math.mjs';
import { it, expect } from 'vitest';
it('preserves all upstream independent plate-enhancement checks', () => {
const data=JSON.parse(fs.readFileSync(new URL('../../../public/data/tools/plate-enhancement.json',import.meta.url),'utf8'));
let checks=0;const near=(actual,expected,tol=1e-9)=>{checks++;assert.ok(Math.abs(actual-expected)<=tol*Math.max(1,Math.abs(expected)),`${actual} != ${expected}`);};
const test=(condition)=>{checks++;assert.ok(condition);};
const base={protectDecline:false,mitigateDestroy:false,repair:true};
// Independent iterative probability/reward oracle (no matrix powers or linear solver).
function oracle(current,target,n,strategy){
 const probabilities=Array(target+1).fill(0);probabilities[Math.min(target,current)]=1;
 const result={attempts:0,steel:0,syrup:0};
 for(let step=0;step<n;step++){
  const next=Array(target+1).fill(0);next[target]=probabilities[target];
  for(let g=0;g<target;g++)if(probabilities[g]){
   const row=data.rates[g],cost=data.costs[g],p=probabilities[g];
   result.attempts+=p;result.steel+=p*cost.upgrade.amount;
   result.syrup+=p*((strategy.protectDecline?cost.declineProtect?.amount||0:0)+(strategy.mitigateDestroy?cost.destroyProtect?.amount||0:0));
   const rates=[row.greatSuccess,row.success,row.maintain,row.decline,row.destroy].map(x=>x/10000);
   if(strategy.protectDecline){rates[2]+=rates[3];rates[3]=0;}
   if(strategy.mitigateDestroy){rates[2]+=rates[4]/2;rates[4]/=2;}
   if(strategy.repair)result.syrup+=p*rates[4]*(cost.recovery?.amount||0);
   const destinations=[Math.min(25,g+2),g+1,g,Math.max(0,g-1),strategy.repair?g:Math.max(0,g-2)];
   for(let k=0;k<5;k++)if(rates[k])next[Math.min(target,destinations[k])]+=p*rates[k];
  }
  for(let g=0;g<=target;g++)probabilities[g]=next[g];
 }
 return {...result,probability:probabilities[target]};
}
test(data.plates.length===12);test(data.rates.length===25);test(data.costs.length===25);
for(const p of data.plates){test(p.grades.length===26);near(p.grades[25].mainPercent,315);near(p.grades[25].subPercent,280);}
for(const row of data.rates){near(OUTCOMES.reduce((s,k)=>s+row[k],0),10000);for(const protectDecline of [false,true])for(const mitigateDestroy of [false,true]){const rates=adjustedRates(data,row.grade,{...base,protectDecline,mitigateDestroy});near(Object.values(rates).reduce((a,b)=>a+b,0),1);near(rates.greatSuccess,row.greatSuccess/10000);near(rates.success,row.success/10000);}}
for(const strategy of [base,{...base,protectDecline:true},{...base,protectDecline:true,mitigateDestroy:true},{...base,repair:false},{...base,repair:false,mitigateDestroy:true},{...base,repair:false,protectDecline:true,mitigateDestroy:true}]){
 for(const [g,target]of [[0,2],[0,10],[10,15],[15,20],[19,25],[24,25]])for(const n of [0,1,2,7,100,1000]){
  const fast=finitePlan(data,g,target,strategy,n),slow=oracle(g,target,n,strategy);
  for(const key of ['probability','attempts','steel','syrup'])near(fast[key],slow[key],1e-8);
 }
}
// Analytic cases: low-grade retries and protected last-grade geometric trials.
near(expectedPlan(data,0,1,base).attempts,1);near(expectedPlan(data,0,1,base).steel,1);
near(expectedPlan(data,0,2,base).attempts,1+.9/.95);
near(expectedPlan(data,0,2,base).steel,1+1.8/.95);
near(expectedPlan(data,9,10,base).attempts,1/.315);
const protectedPlan={...base,protectDecline:true};
near(expectedPlan(data,10,11,protectedPlan).attempts,1/.26);
near(expectedPlan(data,24,25,protectedPlan).attempts,1/.021);
near(expectedPlan(data,24,25,protectedPlan).steel,31/.021);
near(expectedPlan(data,24,25,protectedPlan).syrup,17/.021);
near(finitePlan(data,24,25,protectedPlan,100).probability,1-.979**100);
near(expectedPlan(data,24,25,{...protectedPlan,mitigateDestroy:true}).syrup,16/.021);
for(const g of [0,10,15,24])for(const target of [g,Math.min(25,g+1)]){
 const long=finitePlan(data,g,target,protectedPlan,1000000),expected=expectedPlan(data,g,target,protectedPlan);
 near(long.probability,1,1e-8);for(const k of ['attempts','steel','syrup'])near(long[k],expected[k],1e-8);
}
near(transition(data,24,'greatSuccess',base),25);near(transition(data,15,'destroy',{...base,repair:false}),13);near(transition(data,24,'destroy',{...base,repair:false,breakModel:'config'}),22);near(transition(data,24,'destroy',base),24);
test(attemptCost(data,0,{...base,protectDecline:true,mitigateDestroy:true}).syrup===0);
test(attemptCost(data,25,base).steel===0);
test(normalizeState({version:1,grades:{sword:-1},target:100,attempts:1.5},data).grades.sword===0);
test(normalizeState({version:1,grades:{sword:25},target:25,repair:false,breakModel:'config'},data).grades.sword===25);
near(expectedPlan(data,10,15,{...protectedPlan,assumeMaintain:false}).attempts,expectedPlan(data,10,15,protectedPlan).attempts);
assert.throws(()=>finitePlan(data,0,10,base,-1));checks++;
near(expectedPlan(data,0,10,{...protectedPlan,assumeMaintain:false}).syrup,0);
// Failed/capped goals stop immediately and never spend material.
for(const [current,target]of [[25,25],[20,10],[0,0]]){const p=finitePlan(data,current,target,base,100);near(p.probability,1);near(p.attempts,0);near(p.steel,0);near(p.syrup,0);}
// Native SetContent branches: protection changes only maintain/decline/destroy.
for(const [strategy,fixture] of [[base,[.005,.12,.585,.24,.05]],[{...base,protectDecline:true},[.005,.12,.825,0,.05]],[{...base,mitigateDestroy:true},[.005,.12,.61,.24,.025]],[{...base,protectDecline:true,mitigateDestroy:true},[.005,.12,.85,0,.025]]]){
 const rates=adjustedRates(data,15,strategy);OUTCOMES.forEach((key,i)=>near(rates[key],fixture[i]));
}
// Previous saved/query plans cannot reintroduce the discarded +10 or probability assumption.
const migrated=normalizeState({version:1,plate:'food',grades:{food:24},target:25,repair:false,breakModel:'config',assumeMaintain:false,protectDecline:true,mitigateDestroy:true},data);
test(migrated.version===2);test(migrated.grades.food===24);test(migrated.target===25);test(!('breakModel' in migrated));test(!('assumeMaintain' in migrated));
near(transition(data,24,'destroy',migrated),22);near(adjustedRates(data,24,migrated).decline,0);near(adjustedRates(data,24,migrated).destroy,.075);
// Frozen manual readings from all 25 current-game detail previews, independent of builder output.
const previewEvidence=JSON.parse(fs.readFileSync(new URL('../../../public/data/tools/verification/plate-current-ui-preview-verification.json',import.meta.url),'utf8'));
for(const sample of previewEvidence.gradePreviews){
 const rates=adjustedRates(data,sample.grade,base),cost=attemptCost(data,sample.grade,base);
 for(const key of OUTCOMES)near(rates[key],sample.unprotectedRatesPercent[key]/100);
 near(cost.steel,sample.levelUpChocosteel);near(cost.refund,sample.configuredRefundPercentVisible);
 if(sample.repairFeeVisible)near(cost.recovery,sample.repairMetalSyrup);
}
const transactions=JSON.parse(fs.readFileSync(new URL('../../../public/data/tools/verification/plate-current-transactions-verification.json',import.meta.url),'utf8'));
for(const sample of transactions.transactions){
 near(transition(data,sample.fromGrade,sample.outcome,{...base,repair:false}),sample.toGrade);
 near(attemptCost(data,sample.fromGrade,base).steel,sample.displayedCosts.chocosteel);
 near(sample.beforeBalances.chocosteel-sample.displayedCosts.chocosteel+sample.observedOrBalanceConsistentRefundChocosteel,sample.settledBalances.chocosteel);
}
test(data.rules.greatSuccessRefund.integerRounding==='unknown');
test(data.rules.greatSuccessRefund.netCostSupported===false);
const observedRefund=data.rules.greatSuccessRefund.currentObservation;
near(observedRefund.steelCost,1);near(observedRefund.steelRefund,1);near(observedRefund.netSteelCost,0);
// A single free +0 Super must not turn a gross forecast into a zero-cost prediction.
near(expectedPlan(data,0,1,base).steel,1);
const report={checks,status:'passed',oracles:['independent iterative probability/reward distribution','analytic geometric retry cases','million-attempt convergence to infinite expectation','native SetContent probability fixtures','legacy plan migration','185 manually read current UI numeric fields','four actual low-grade transitions and material balance equations'],sourceVersion:data.sourceVersion,verifiedClientRules:['result deltas and0..25clamp','downgrade probability moves to maintain','half break probability moves to maintain'],modelLimits:['independent random attempts with fixed configured probabilities','gross materials exclude refunds','four low-grade attempts and one Super refund observed; actual high-grade protection, break and repair remain unobserved']};

expect(checks).toBe(1525);
});
