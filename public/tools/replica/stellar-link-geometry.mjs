// Imported from REA; edit the importer and English map, then re-import.
// The loaded client fills each bounded face of its planar line graph once.
// This double-precision reference does not reproduce server percent rounding.
const EPS=1e-9;
const cross=(a,b)=>a.x*b.y-a.y*b.x;
const delta=(a,b)=>({x:b.x-a.x,y:b.y-a.y});
export function filledRegions(points){
 if(points.length<3)return {area:0,faces:[],nodes:[]};
 const edges=points.map((a,i)=>({a,b:points[(i+1)%points.length],cuts:[{t:0,p:a},{t:1,p:points[(i+1)%points.length]}]}));
 for(let i=0;i<edges.length;i++)for(let j=i+1;j<edges.length;j++){
  const a=edges[i],b=edges[j],r=delta(a.a,a.b),s=delta(b.a,b.b),den=cross(r,s);
  if(Math.abs(den)<EPS)continue;
  const q=delta(a.a,b.a),t=cross(q,s)/den,u=cross(q,r)/den;
  if(t<=EPS||t>=1-EPS||u<=EPS||u>=1-EPS)continue;
  const p={x:a.a.x+t*r.x,y:a.a.y+t*r.y};a.cuts.push({t,p});b.cuts.push({t:u,p});
 }
 const nodes=[],neighbors=[],segments=new Set();
 const node=p=>{let id=nodes.findIndex(q=>Math.hypot(q.x-p.x,q.y-p.y)<EPS);if(id<0){id=nodes.length;nodes.push(p);neighbors.push(new Set());}return id;};
 for(const edge of edges){edge.cuts.sort((a,b)=>a.t-b.t);for(let i=1;i<edge.cuts.length;i++){
  const a=node(edge.cuts[i-1].p),b=node(edge.cuts[i].p);if(a===b)continue;
  const key=a<b?a+':'+b:b+':'+a;if(segments.has(key))continue;segments.add(key);neighbors[a].add(b);neighbors[b].add(a);
 }}
 const around=neighbors.map((list,i)=>[...list].sort((a,b)=>Math.atan2(nodes[a].y-nodes[i].y,nodes[a].x-nodes[i].x)-Math.atan2(nodes[b].y-nodes[i].y,nodes[b].x-nodes[i].x)));
 const visited=new Set(),faces=[];let area=0;
 for(let origin=0;origin<nodes.length;origin++)for(const next of around[origin]){
  if(visited.has(origin+':'+next))continue;
  const path=[];let a=origin,b=next,closed=false;
  for(let guard=0;guard<=segments.size*2;guard++){
   const key=a+':'+b;if(visited.has(key))break;visited.add(key);path.push(nodes[a]);
   const list=around[b],incoming=list.indexOf(a),c=list[(incoming-1+list.length)%list.length];a=b;b=c;
   if(a===origin&&b===next){closed=true;break;}
  }
  if(!closed||path.length<3)continue;
  const signed=path.reduce((sum,p,i)=>sum+cross(p,path[(i+1)%path.length]),0)/2;
  if(signed>EPS){faces.push(path);area+=signed;}
 }
 return {area,faces,nodes};
}
