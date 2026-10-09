import {compare} from './engine.mjs?v=20261008-7';
import {classifyPrinciple} from './classification.mjs?v=20261008-7';

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
