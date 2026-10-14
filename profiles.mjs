import {compare,closure,visibleRelations} from './engine.mjs?v=20261014-4';
import {classifyPrinciple} from './classification.mjs?v=20261014-4';

// A complete catalogue comparison uses the same proofs and single-model
// witnesses as the graph. An unanswered direction is not an open-problem claim.
export function assessDirection(data,from,to,theory='ZF',research=false){
 const result=compare(data,from,to,theory,research);
 let status=result.conflict?'conflict':result.proof!==null?'proved':result.witnesses.length?'refuted':'unrecorded';
 let classificationFallback=null;
 if(status==='unrecorded'&&(from==='ac'||to==='ac')){
  const node=data.principles.find(n=>n.id===(from==='ac'?to:from));
  if(node){
   const c=classifyPrinciple(data,node,theory,research);
   if(c.group==='equivalent'||to==='ac'&&c.group==='weaker'){
    status=c.group==='equivalent'?'proved':'refuted';classificationFallback=c;
   }
  }
 }
 return {...result,status,classificationFallback};
}
export const PROFILE_GROUPS=[
 {id:'equivalent',title:'Equivalent',description:'Implications in both directions are recorded.'},
 {id:'incoming',title:'Implied by',description:'These principles imply the selected axiom. Check each entry for the reverse direction.'},
 {id:'outgoing',title:'Implies',description:'The selected axiom implies these principles. Check each entry for the reverse direction.'},
 {id:'incomparable',title:'Incomparable',description:'Countermodels refute both directions, possibly in different models.'},
 {id:'unsettled',title:'Unknown / not recorded',description:'At least one direction lacks an answer in this atlas. This does not mean the mathematical question is open.'},
 {id:'conflict',title:'Needs review',description:'Conflicting evidence is not presented as a mathematical conclusion.'}
];

// Use proofs in the active theory/evidence layer, never matching labels or
// common consequences, to identify equivalent formulations.
const classCache=new WeakMap();
const representativeOrder=['ac','bpi','dc','ac_omega','ac_finite_fibers','ac_2','pp','op','oep'];
export function equivalenceClasses(data,theory='ZF',research=false){
 let cache=classCache.get(data);if(!cache){cache=new Map();classCache.set(data,cache)}
 const key=`${theory}:${research}`;if(cache.has(key))return cache.get(key);
 const relations=visibleRelations(data,theory,research);
 const reach=new Map(data.principles.map(n=>[n.id,closure([n.id],relations).known]));
 const remaining=new Set(reach.keys()),classes=[];
 const rank=id=>{const i=representativeOrder.indexOf(id);return i<0?representativeOrder.length:i};
 for(const id of remaining){
  const members=[...remaining].filter(other=>reach.get(id).has(other)&&reach.get(other).has(id));
  members.sort((a,b)=>rank(a)-rank(b)||data.principles.findIndex(n=>n.id===a)-data.principles.findIndex(n=>n.id===b));
  members.forEach(other=>remaining.delete(other));classes.push({id:members[0],members});
 }
 const byId=new Map(classes.flatMap(c=>c.members.map(id=>[id,c])));
 const result={classes,byId};cache.set(key,result);return result;
}
export function groupProfileEntries(data,entries,theory='ZF',research=false){
 const {byId}=equivalenceClasses(data,theory,research),groups=new Map();
 for(const entry of entries){
  const cls=byId.get(entry.id)||{id:entry.id,members:[entry.id]};
  if(!groups.has(cls.id))groups.set(cls.id,{id:cls.id,members:[]});
  groups.get(cls.id).members.push(entry);
 }
 return [...groups.values()].map(group=>{
  const cls=byId.get(group.id),order=cls?.members||[group.id];
  group.members.sort((a,b)=>order.indexOf(a.id)-order.indexOf(b.id));
  return {...group,representative:group.members[0],id:group.members[0].id};
 });
}
export function relationshipProfile(data,id,theory='ZF',research=false){
 const entries=data.principles.filter(n=>n.id!==id).map(n=>{
  const forward=assessDirection(data,id,n.id,theory,research);
  const reverse=assessDirection(data,n.id,id,theory,research);
  const f=forward.status,r=reverse.status;
  const category=f==='conflict'||r==='conflict'?'conflict':f==='proved'&&r==='proved'?'equivalent':r==='proved'?'incoming':f==='proved'?'outgoing':f==='refuted'&&r==='refuted'?'incomparable':'unsettled';
  return {id:n.id,name:n.name,category,forward,reverse};
 });
 const groups=Object.fromEntries(PROFILE_GROUPS.map(g=>[g.id,entries.filter(e=>g.id==='unsettled'?e.category!=='conflict'&&(e.forward.status==='unrecorded'||e.reverse.status==='unrecorded'):e.category===g.id)]));
 return {id,theory,research,total:entries.length,entries,groups};
}
