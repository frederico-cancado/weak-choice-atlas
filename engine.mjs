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
 const truthEvidence=new Map(),falseEvidence=new Map();
 const evidence=(record,id)=>{
  const source=record.source??model.source;
  return {principles:[id],source,source_url:record.source_url??(source===model.source?model.source_url:undefined),locator:record.locator??model.locator,status:record.status??model.status,...(record.proof_note?{proof_note:record.proof_note}:{})};
 };
 const baseEvidence=id=>{
  const specific=(model.property_evidence||[]).find(record=>record.principles.includes(id)&&(research||record.layer!=='recent'));
  return evidence(specific||model,id);
 };
 for(const id of model.true_ids||[])truthEvidence.set(id,baseEvidence(id));
 for(const id of model.false_ids||[])falseEvidence.set(id,baseEvidence(id));
 if(research)for(const claim of model.additional_claims||[]){
  for(const id of claim.true_ids||[])if(!truthEvidence.has(id))truthEvidence.set(id,evidence(claim,id));
  for(const id of claim.false_ids||[])if(!falseEvidence.has(id))falseEvidence.set(id,evidence(claim,id));
 }
 return {truths:[...truthEvidence.keys()],falses:[...falseEvidence.keys()],truthEvidence,falseEvidence};
}
function witnessFactEvidence(from,refuted,facts,modelClosure,data){
 const leaves=new Set(),visited=new Set();
 const visit=id=>{
  if(visited.has(id))return;visited.add(id);
  const reason=modelClosure.reasons.get(id);
  if(reason)reason.premises.forEach(visit);else leaves.add(id);
 };
 visit(from);
 const records=[...leaves].map(id=>facts.truthEvidence.get(id));
 records.push(facts.falseEvidence.get(refuted));
 const grouped=new Map();
 for(const record of records){
  if(!record)continue;
  const source_url=record.source_url??data.sources?.[record.source]?.url;
  const key=JSON.stringify([record.source,source_url,record.locator,record.status,record.proof_note]);
  const existing=grouped.get(key);
  if(existing)existing.principles=[...new Set([...existing.principles,...record.principles])];
  else grouped.set(key,{...record,principles:[...record.principles],source_url});
 }
 return [...grouped.values()];
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
  if(modelClosure.known.has(from)&&refuted)witnesses.push({model,refuted,sourceProof:proofRecords(from,modelClosure),targetProof:proofRecords(refuted,targetConsequences),factEvidence:witnessFactEvidence(from,refuted,facts,modelClosure,data)});
 }
 return {proof,witnesses,conflict:proof!==null&&witnesses.length>0};
}
