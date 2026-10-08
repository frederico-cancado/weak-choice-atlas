import {compare} from './engine.mjs?v=20261008-4';

export const AC_GROUPS=[
 {id:'equivalent',title:'Equivalent to AC',description:'Equivalent formulations, collected here instead of repeated in the graph.'},
 {id:'weaker',title:'Known not equivalent to AC',description:'Principles that can hold without AC. Preprint-dependent results and theorems of ZF are labelled separately.'},
 {id:'unresolved',title:'Unresolved / to verify',description:'Documented open questions, parameter-dependent families, and entries whose AC status has not yet been verified in this atlas.'}
];

export function classifyPrinciple(data,node,theory='ZF',includeResearch=true){
 const meta=node.ac_classification;
 if(node.id==='ac')return {group:'equivalent',label:'AC itself',note:'The reference axiom.'};
 if(meta&&(meta.valid_bases||[meta.base||'ZF']).includes(theory)&&(includeResearch||meta.layer!=='recent')){
  const group={equivalent:'equivalent',weaker:'weaker',open:'unresolved',parameter_dependent:'unresolved'}[meta.kind];
  if(group)return {...meta,group,label:meta.kind==='open'?'Documented open question':meta.kind==='parameter_dependent'?'Depends on parameters':meta.label||(meta.kind==='equivalent'?'Equivalent to AC':'Does not imply AC')};
 }
 const result=compare(data,node.id,'ac',theory,includeResearch);
 if(result.proof!==null)return {group:'equivalent',label:'Equivalent to AC',proof:result.proof,note:'See the recorded equivalence or implication path to AC.'};
 if(theory==='ZF'&&(/AC_equivalent|equivalent to AC/.test(node.status)))return {group:'equivalent',label:'Equivalent to AC',note:node.notes||'See the definition references for this formulation.',references:node.definition_evidence};
 if(theory==='ZF'&&/ZF_theorem|theorem of ZF/.test(node.status))return {group:'weaker',label:'Theorem of ZF',note:'Provable without any choice axiom; consequently does not imply AC, assuming Con(ZF).',references:node.definition_evidence};
 if(result.witnesses.length){
  const standard=includeResearch?compare(data,node.id,'ac',theory,false):result;
  const recent=standard.witnesses.length===0;
  return {group:'weaker',label:recent?'Does not imply AC · research':'Does not imply AC',layer:recent?'recent':'standard',witnesses:recent?result.witnesses:standard.witnesses,note:recent?'Supported by the cited recent construction or preprint. The source review status is retained.':'A recorded countermodel satisfies this principle while AC fails.'};
 }
 const parameterized=/parameterized/.test(node.node_kind||'')||Object.keys(node.parameters||{}).length>0;
 return {group:'unresolved',label:parameterized?'Depends on parameters / to verify':'Not yet classified',note:parameterized?'Fix the displayed parameters before comparing this family with AC. No uniform classification is asserted.':'The atlas has not yet recorded enough evidence to classify this statement. This is not a claim that the mathematical question is open.'};
}

export function graphEligible(data,node,theory='ZF'){
 return node.graph_visibility!=='hidden'&&classifyPrinciple(data,node,theory,true).group!=='equivalent';
}

export function graphSlice(data,ids,relations,theory='ZF',kind='all'){
 const eligible=ids.filter(id=>{const node=data.principles.find(n=>n.id===id);return node&&graphEligible(data,node,theory)});
 const logical=new Map();
 for(const r of relations.filter(r=>r.antecedents.length>0&&eligible.includes(r.consequent)&&r.antecedents.every(id=>eligible.includes(id)))){
  if(kind==='nonimplication'&&r.kind!=='nonimplication')continue;
  if(kind==='implication'&&r.kind==='nonimplication')continue;
  const key=JSON.stringify([r.kind,[...r.antecedents].sort(),r.consequent]);
  const old=logical.get(key);if(!old||(old.layer==='recent'&&r.layer!=='recent'))logical.set(key,r);
 }
 return {ids:eligible,edges:[...logical.values()]};
}
