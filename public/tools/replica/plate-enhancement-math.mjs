// Imported from REA; edit the importer and English map, then re-import.
// Rates and transitions follow the verified loaded game client; forecasts remain probability models.
export const OUTCOMES=['greatSuccess','success','maintain','decline','destroy'];
const bounded=(n,lo,hi)=>Number.isInteger(n)&&n>=lo&&n<=hi;
export function normalizeState(raw,data){
 const state={version:2,plate:data.plates[0].key,grades:Object.fromEntries(data.plates.map(p=>[p.key,0])),target:10,protectDecline:true,mitigateDestroy:false,repair:true,attempts:100,oven:9,baseMain:null,baseSub:null};
 if(![1,2].includes(raw?.version))return state;
 if(data.plates.some(p=>p.key===raw.plate))state.plate=raw.plate;
 for(const p of data.plates)if(bounded(raw.grades?.[p.key],0,data.maxGrade))state.grades[p.key]=raw.grades[p.key];
 for(const [key,lo,hi]of [['target',0,data.maxGrade],['attempts',0,1e6],['oven',1,1000]])if(bounded(raw[key],lo,hi))state[key]=raw[key];
 for(const key of ['protectDecline','mitigateDestroy','repair'])if(typeof raw[key]==='boolean')state[key]=raw[key];
 for(const key of ['baseMain','baseSub'])if(Number.isFinite(raw[key])&&raw[key]>=0&&raw[key]<=1e12)state[key]=raw[key];
 return state;
}
export function adjustedRates(data,grade,strategy={}){
 const row=data.rates.find(r=>r.grade===grade);if(!row)return null;
 const rates=Object.fromEntries(OUTCOMES.map(k=>[k,row[k]/data.basisPointScale]));
 // Only enable redistribution if the native method has been verified.
 if(data.rules.blockDecline.redistribution==='maintain'&&strategy.protectDecline){rates.maintain+=rates.decline;rates.decline=0;}
 if(data.rules.mitigateDestroy.redistribution==='maintain'&&strategy.mitigateDestroy){const removed=rates.destroy*(1-data.rules.mitigateDestroy.destroyRateMultiplier);rates.destroy-=removed;rates.maintain+=removed;}
 return rates;
}
export function transition(data,grade,outcome,strategy={}){
 if(outcome==='destroy'&&strategy.repair)return grade;
 const delta=outcome==='destroy'?data.rules.destroyDestination.nativeDelta:data.rules.successfulDelta[outcome];
 if(!Number.isInteger(delta))throw new Error("Verified enhancement outcome rules are unavailable. Reload the page.");
 return Math.max(0,Math.min(data.maxGrade,grade+delta));
}
export function attemptCost(data,grade,strategy={}){
 const row=data.costs.find(r=>r.grade===grade);if(!row)return {steel:0,syrup:0,recovery:0,refund:0};
 return {steel:row.upgrade.amount,syrup:(strategy.protectDecline?row.declineProtect?.amount||0:0)+(strategy.mitigateDestroy?row.destroyProtect?.amount||0:0),recovery:strategy.repair?row.recovery?.amount||0:0,refund:row.refundPercent};
}
export function modelReady(data,strategy,maxGrade=data.maxGrade){
 if(maxGrade>data.rules.declineStartGrade&&strategy.protectDecline&&data.rules.blockDecline.redistribution!=='maintain')return "Protection rules are unavailable. Reload the page.";
 if(maxGrade>data.rules.destroyStartGrade&&strategy.mitigateDestroy&&data.rules.mitigateDestroy.redistribution!=='maintain')return "Protection rules are unavailable. Reload the page.";
 if(maxGrade>data.rules.destroyStartGrade&&!strategy.repair&&data.rules.destroyDestination.status!=='native-verified')return "Break rules are unavailable. Reload the page.";
 return '';
}
function solve(a,b){
 const n=b.length,m=a.map((r,i)=>[...r,b[i]]);
 for(let k=0;k<n;k++){
  let pivot=k;for(let i=k+1;i<n;i++)if(Math.abs(m[i][k])>Math.abs(m[pivot][k]))pivot=i;
  if(Math.abs(m[pivot][k])<1e-14)throw new Error("Expected values are too large for a reliable result. Use the finite-attempt forecast.");
  [m[k],m[pivot]]=[m[pivot],m[k]];
  for(let i=k+1;i<n;i++){const f=m[i][k]/m[k][k];for(let j=k;j<=n;j++)m[i][j]-=f*m[k][j];}
 }
 const result=Array(n).fill(0);
 for(let i=n-1;i>=0;i--)result[i]=(m[i][n]-m[i].slice(i+1,n).reduce((s,x,j)=>s+x*result[j+i+1],0))/m[i][i];
 if(result.some(x=>!Number.isFinite(x)||x<-.001))throw new Error("Expected values are too large for a reliable result. Use the finite-attempt forecast.");
 const residual=Math.max(...a.map((r,i)=>Math.abs(r.reduce((s,x,j)=>s+x*result[j],0)-b[i])));
 if(residual>1e-5*Math.max(1,...b.map(Math.abs)))throw new Error("Expected values are too large for a reliable result. Use the finite-attempt forecast.");
 return result;
}
export function expectedPlan(data,current,target,strategy){
 if(!bounded(current,0,data.maxGrade)||!bounded(target,0,data.maxGrade))throw new Error("Grade must be within the configured range.");
 if(current>=target)return {attempts:0,steel:0,syrup:0,repairs:0};
 const notReady=modelReady(data,strategy,target);if(notReady)throw new Error(notReady);
 const a=Array.from({length:target},(_,g)=>Array.from({length:target},(_,j)=>+(g===j))),rewards={attempts:[],steel:[],syrup:[],repairs:[]};
 for(let g=0;g<target;g++){
  const rates=adjustedRates(data,g,strategy),cost=attemptCost(data,g,strategy);
  for(const key of OUTCOMES)if(rates[key]){const next=transition(data,g,key,strategy);if(next<target)a[g][next]-=rates[key];}
  rewards.attempts.push(1);rewards.steel.push(cost.steel);rewards.syrup.push(cost.syrup+rates.destroy*cost.recovery);rewards.repairs.push(strategy.repair?rates.destroy:0);
 }
 return Object.fromEntries(Object.entries(rewards).map(([key,b])=>[key,solve(a,b)[current]]));
}
function multiply(a,b){const n=a.length,out=Array.from({length:n},()=>Array(n).fill(0));for(let i=0;i<n;i++)for(let k=0;k<n;k++)if(a[i][k])for(let j=0;j<n;j++)out[i][j]+=a[i][k]*b[k][j];return out;}
function vectorMultiply(v,m){return m[0].map((_,j)=>v.reduce((s,x,i)=>s+x*m[i][j],0));}
export function finitePlan(data,current,target,strategy,attempts){
 if(!bounded(attempts,0,1e6))throw new Error("Attempt count must be an integer from 0–1,000,000.");
 if(!bounded(current,0,data.maxGrade)||!bounded(target,0,data.maxGrade))throw new Error("Grade must be within the configured range.");
 if(current>=target)return {probability:1,attempts:0,steel:0,syrup:0};
 const notReady=modelReady(data,strategy,target);if(notReady)throw new Error(notReady);
 const n=target+4,hit=target,tries=target+1,steel=target+2,syrup=target+3;
 let m=Array.from({length:n},()=>Array(n).fill(0));
 for(let g=0;g<target;g++){
  const rates=adjustedRates(data,g,strategy),cost=attemptCost(data,g,strategy);
  for(const key of OUTCOMES)if(rates[key])m[g][Math.min(target,transition(data,g,key,strategy))]+=rates[key];
  m[g][tries]=1;m[g][steel]=cost.steel;m[g][syrup]=cost.syrup+rates.destroy*cost.recovery;
 }
 for(let i=target;i<n;i++)m[i][i]=1;
 let v=Array(n).fill(0);v[current]=1;let power=attempts;
 while(power){if(power%2)v=vectorMultiply(v,m);power=Math.floor(power/2);if(power)m=multiply(m,m);}
 return {probability:Math.min(1,Math.max(0,v[hit])),attempts:v[tries],steel:v[steel],syrup:v[syrup]};
}
