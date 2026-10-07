// Only compatible implications participate in closure. Countermodels are separate.
export function visibleRelations(data, theory='ZF', research=false) {
 return data.relations.filter(r=>(r.valid_bases||[r.base]).includes(theory)&&(research||r.layer!=='recent'));
}
export function rulesFor(relations){
 return relations.filter(r=>r.kind!=='nonimplication').flatMap(r=>{
  const rules=[{premises:r.antecedents,target:r.consequent,record:r}];
  if(r.kind==='equivalence'&&r.antecedents.length===1)rules.push({premises:[r.consequent],target:r.antecedents[0],record:r});
  return rules;
 });
}
export function closure(seed, relations){
 const known=new Set(seed), reasons=new Map();let changed=true;
 const rules=rulesFor(relations);
 while(changed){changed=false;for(const r of rules){if(!known.has(r.target)&&r.premises.every(p=>known.has(p))){known.add(r.target);reasons.set(r.target,r);changed=true}}}
 return {known,reasons};
}
export function proofRecords(target, closureResult){
 const records=[],seen=new Set();
 const visit=id=>{const reason=closureResult.reasons.get(id);if(!reason||seen.has(reason.record.id))return;reason.premises.forEach(visit);seen.add(reason.record.id);records.push(reason.record)};
 visit(target);return records;
}
export function modelFacts(model,research=false){
 const truths=[...model.true_ids],falses=[...model.false_ids];
 if(research)for(const claim of model.additional_claims||[]){truths.push(...(claim.true_ids||[]));falses.push(...(claim.false_ids||[]))}
 return {truths,falses};
}
export function compare(data,from,to,theory='ZF',research=false){
 const relations=visibleRelations(data,theory,research);
 const result=closure([from],relations);
 const proof=result.known.has(to)?proofRecords(to,result):null;
 const targetConsequences=closure([to],relations);
 const witnesses=[];
 for(const model of data.models.filter(m=>m.base===theory&&(research||m.layer!=='recent'))){
  const facts=modelFacts(model,research);const modelClosure=closure(facts.truths,relations);
  const refuted=facts.falses.find(id=>targetConsequences.known.has(id));
  if(modelClosure.known.has(from)&&refuted)witnesses.push({model,refuted,sourceProof:proofRecords(from,modelClosure),targetProof:proofRecords(refuted,targetConsequences)});
 }
 return {proof,witnesses,conflict:proof!==null&&witnesses.length>0};
}
