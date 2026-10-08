import assert from 'node:assert/strict';
import fs from 'node:fs';
import {visibleRelations,closure,compare} from './engine.mjs';
const data=JSON.parse(fs.readFileSync(new URL('./data.json',import.meta.url)));
const ids=new Set(data.principles.map(n=>n.id));
assert.equal(ids.size,88);
for(const r of data.relations){assert.ok([...r.antecedents,r.consequent].every(id=>ids.has(id)));assert.ok(r.proof_note);if(r.kind==='nonimplication'){assert.ok(r.consistency_assumption);assert.ok(data.models.some(m=>m.id===r.model))}}
const standard=visibleRelations(data,'ZF',false);
assert.equal(standard.length,49);
assert.ok(!standard.some(r=>r.layer==='recent'));
assert.ok(closure(['pp'],standard).known.has('ac_omega'));
assert.ok(!closure(['pp'],visibleRelations(data,'ZF',true)).known.has('nds_sets'));
assert.ok(compare(data,'op','dc').witnesses.length);
assert.ok(compare(data,'dc','ac').witnesses.length);
assert.equal(compare(data,'pp','ac').witnesses.length,0);
assert.ok(compare(data,'pp','ac','ZF',true).witnesses.length);
assert.equal(compare(data,'pp','ac','ZFA',true).witnesses.length,0);
assert.ok(compare(data,'bpi','tychonoff_hausdorff').proof);
assert.ok(compare(data,'tychonoff_hausdorff','bpi').proof);
assert.equal(compare(data,'fb','nds_sets').proof,null);
assert.ok(compare(data,'fb','nds_sets','ZF',true).proof);
// Requested separations must be explicit graph records and retain the note's attribution.
for(const id of ['nds_sets','finite_antichains']){
 assert.ok(data.relations.some(r=>r.kind==='nonimplication'&&r.antecedents.length===1&&r.antecedents[0]===id&&r.consequent==='ac'&&r.source==='FC2026'));
 const result=compare(data,id,'ac','ZF',true);
 assert.equal(result.proof,null);
 assert.ok(compare(data,'ac',id).proof);
 assert.ok(result.witnesses.some(w=>w.factEvidence.some(e=>e.principles.includes(id)&&e.source==='FC2026'&&e.status==='preliminary'&&e.source_url.includes('bd35e200'))));
 assert.equal(compare(data,id,'ac','ZF',false).witnesses.length,0);
 assert.equal(compare(data,id,'ac','ZFA',true).witnesses.length,0);
}
assert.ok(compare(data,'ac','svc').proof);
assert.ok(compare(data,'svc','kwp').proof);
assert.ok(compare(data,'pp','dc').proof);
assert.ok(compare(data,'svc','pp').witnesses.some(w=>w.targetProof.some(r=>r.id==='acwo_dc')&&w.factEvidence.some(e=>e.source==='HS25'&&e.principles.includes('dc'))));
assert.equal(compare(data,'svc','pp').proof,null);
assert.ok(compare(data,'svc','pp').witnesses.some(w=>w.model.id==='basic_cohen'&&w.factEvidence.some(e=>e.source==='KS2024')));
assert.equal(compare(data,'svc','pp','ZFA').witnesses.length,0);
assert.ok(closure(['pp','svc_seed'],standard).known.has('svc_plus_seed'));
assert.ok(!closure(['pp'],standard).known.has('svc_plus_seed'));
assert.ok(!closure(['svc_seed'],standard).known.has('svc_plus_seed'));
assert.ok(!data.relations.some(r=>r.kind==='nonimplication'&&r.antecedents.includes('nds_sets')&&r.consequent==='finite_antichains'));
// The draft's original model refutes OEP/BPI; it does not prove their negations from PP.
for(const from of ['pp','nds_sets','fb','finite_antichains'])for(const to of ['oep','bpi']){
 const relation=data.relations.find(r=>r.kind==='nonimplication'&&r.antecedents.length===1&&r.antecedents[0]===from&&r.consequent===to);
 assert.ok(relation&&relation.source==='FC2026REPORT'&&relation.layer==='recent');
 const result=compare(data,from,to,'ZF',true);assert.equal(result.proof,null);
 assert.ok(result.witnesses.some(w=>w.model.id==='openai_pp'&&w.factEvidence.some(e=>e.source==='FC2026REPORT'&&e.status==='preliminary'&&e.source_url.includes('a8ddc9aca'))));
 assert.equal(compare(data,from,to,'ZF',false).witnesses.length,0);
 assert.equal(compare(data,from,to,'ZFA',true).witnesses.length,0);
}
assert.ok(compare(data,'bpi','oep').proof);
assert.ok(compare(data,'oep','op').proof);
assert.equal(compare(data,'oep','bpi').proof,null);
// Classical Cohen reverse separations stay distinct from the recent original-model obstruction.
for(const from of ['oep','bpi'])for(const to of ['pp','nds_sets','fb']){
 const result=compare(data,from,to,'ZF',false);assert.equal(result.proof,null);
 assert.ok(result.witnesses.some(w=>w.model.id==='basic_cohen'));
 assert.ok(data.relations.some(r=>r.antecedents.length===1&&r.antecedents[0]===from&&r.consequent===to&&r.layer==='standard'));
}
assert.ok(compare(data,'oep','fb').witnesses.some(w=>w.factEvidence.some(e=>e.principles.includes('fb')&&e.proof_note.includes('cofinite'))));
const synthetic=[
 {id:'p_q',kind:'implication',antecedents:['p'],consequent:'q'},
 {id:'qr_s',kind:'implication',antecedents:['q','r'],consequent:'s'},
 {id:'q_not_t',kind:'nonimplication',antecedents:['q'],consequent:'t'},
 {id:'s_u',kind:'equivalence',antecedents:['s'],consequent:'u'}
];
assert.ok(!closure(['p'],synthetic).known.has('s'));
assert.ok(!closure(['p'],synthetic).known.has('t'));
assert.ok(closure(['p','r'],synthetic).known.has('u'));
assert.ok(closure(['u'],synthetic).known.has('s'));
// Provenance survives implication paths and facts that refute a target.
const evidenceFixture={sources:{BASE:{url:'https://example.org/base'},EXTRA:{url:'https://example.org/note'}},relations:[{id:'p_q',kind:'implication',antecedents:['p'],consequent:'q',base:'ZF',layer:'standard'}],models:[{id:'witness',base:'ZF',layer:'standard',true_ids:['p'],false_ids:[],source:'BASE',locator:'Original model',status:'source_checked',property_evidence:[{principles:['p'],source:'BASE',locator:'Specific fact'}],additional_claims:[{false_ids:['r'],source:'EXTRA',locator:'Separate corollary',status:'preliminary'}]}]};
assert.equal(compare(evidenceFixture,'q','r').witnesses.length,0);
const witness=compare(evidenceFixture,'q','r','ZF',true).witnesses[0];
assert.equal(witness.sourceProof[0].id,'p_q');
assert.ok(witness.factEvidence.some(e=>e.principles.includes('p')&&e.locator==='Specific fact'));
assert.ok(witness.factEvidence.some(e=>e.principles.includes('r')&&e.source==='EXTRA'&&e.status==='preliminary'&&e.source_url==='https://example.org/note'));
const registered=new Map();
globalThis.document={modelContext:{registerTool(tool){registered.set(tool.name,tool)}}};
globalThis.window={addEventListener(){}};
const {registerAtlasTools}=await import('./browser-tools.mjs');
registerAtlasTools(data);
const toolResult=registered.get('compare_choice_principles').execute({from:'nds_sets',to:'ac',includeResearch:true});
assert.ok(toolResult.countermodels.some(m=>m.factEvidence.some(e=>e.source==='FC2026'&&e.status==='preliminary')));
for(const theory of ['ZF','ZFA'])for(const research of [false,true])for(const a of ids)for(const b of ids){assert.equal(compare(data,a,b,theory,research).conflict,false,`Conflicting data: ${a}, ${b}, ${theory}, ${research}`)}
console.log('PASS: record integrity, inference paths, joint premises, countermodel direction, ZF/ZFA isolation, research gating, source attribution, SVC distinctions, browser-tool evidence, and all-pair consistency.');
