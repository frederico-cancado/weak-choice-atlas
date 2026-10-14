import assert from 'node:assert/strict';
import fs from 'node:fs';
import {visibleRelations,closure,compare} from './engine.mjs';
import {classifyPrinciple,graphEligible,graphSlice} from './classification.mjs';
const data=JSON.parse(fs.readFileSync(new URL('./data.json',import.meta.url)));
const ids=new Set(data.principles.map(n=>n.id));
// Construction recipes and separating facts must remain specific to ZFA.
const atomModels=data.models.filter(m=>m.base==='ZFA');
assert.equal(atomModels.length,5);
for(const m of atomModels){
 const c=m.permutation_construction;
 for(const field of ['atoms','group','normal_filter','supports','convention','locator'])assert.ok(c[field],`${m.id}: ${field}`);
 assert.ok(data.sources[c.source]);assert.ok(c.source_url);
 assert.ok(c.normal_filter.includes('Fix_G(E)'));
}
for(const [a,b,m] of [['mc','rpp','second_fraenkel'],['no_amorphous','rpp','second_fraenkel'],['bpi','df_finite','ordered_mostowski'],['ac_lo_index','nds_sets','countable_support_fraenkel'],['ac_2','rpp','cyclic_triples']]){
 assert.ok(compare(data,a,b,'ZFA').witnesses.some(w=>w.model.id===m));
 assert.ok(!compare(data,a,b,'ZF').witnesses.some(w=>w.model.id===m));
}
assert.ok(compare(data,'ac_lo_index','ac','ZFA').witnesses.some(w=>w.model.id==='countable_support_fraenkel'));
assert.equal(compare(data,'ac_lo_index','ac','ZFA').proof,null);
assert.ok(data.permutation_models_guide.text.includes('does not automatically'));
assert.equal(ids.size,data.principles.length);
assert.ok(ids.size>=95);
for(const r of data.relations){assert.ok([...r.antecedents,r.consequent].every(id=>ids.has(id)));assert.ok(r.proof_note);if(r.kind==='nonimplication'){assert.ok(r.consistency_assumption);assert.ok(data.models.some(m=>m.id===r.model))}}
const standard=visibleRelations(data,'ZF',false);
assert.ok(standard.length>=59);
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

const node=id=>data.principles.find(n=>n.id===id);
for(const id of ['ac','wo','zorn','mc','cardinal_trichotomy','cardinal_square','hausdorff_maximal','tukey_finite_character','nonempty_products','surjection_section','vector_basis','maximal_ideal','tychonoff']){
 assert.equal(classifyPrinciple(data,node(id)).group,'equivalent',id);
 assert.equal(graphEligible(data,node(id)),false,id);
 if(id!=='ac')assert.notEqual(compare(data,id,'ac').proof,null,id);
}
for(const removed of ['csb','ordinal_trichotomy','finite_index_choice','finite_hall'])assert.ok(!ids.has(removed));
assert.ok(!data.principles.some(n=>/ZF_theorem|theorem of ZF/.test(n.status)));
assert.equal(classifyPrinciple(data,node('ac_finite_fibers')).group,'weaker');
assert.equal(classifyPrinciple(data,node('op')).group,'weaker');
assert.equal(classifyPrinciple(data,node('oep')).group,'weaker');
assert.equal(classifyPrinciple(data,node('pp')).group,'weaker');
assert.equal(classifyPrinciple(data,node('pp')).layer,'recent');
assert.equal(classifyPrinciple(data,node('pp'),'ZF',false).group,'unresolved');
assert.notEqual(classifyPrinciple(data,node('mc'),'ZFA').group,'equivalent');
assert.equal(compare(data,'mc','ac','ZFA',false).proof,null);
assert.equal(compare(data,'vector_basis','ac','ZFA',false).proof,null);
assert.notEqual(compare(data,'vector_basis','ac','ZFA',true).proof,null);
const map=graphSlice(data,[...ids],visibleRelations(data,'ZF',true));
assert.ok(!map.ids.includes('ac')&&!map.ids.includes('zorn')&&!map.ids.includes('tychonoff'));
assert.ok(!map.ids.includes('finite_index_choice'),'Unselected candidates stay out of the graph.');
assert.ok(map.edges.every(r=>[...r.antecedents,r.consequent].every(id=>map.ids.includes(id))));
const opEdges=map.edges.filter(r=>r.kind==='nonimplication'&&r.antecedents.length===1&&r.antecedents[0]==='op'&&r.consequent==='oep');
assert.equal(opEdges.length,1);assert.equal(opEdges[0].source,'MATHIAS1974');
assert.ok(data.relations.some(r=>r.id==='op_not_oep'&&r.source==='FC2026REPORT'));
const separations=graphSlice(data,[...ids],visibleRelations(data,'ZF',true),'ZF','nonimplication');
assert.ok(separations.edges.length>0&&separations.edges.every(r=>r.kind==='nonimplication'));
assert.ok(node('tychonoff').hypotheses.some(h=>h.includes('No Hausdorff')));
assert.ok(node('tychonoff_hausdorff').notes.includes('BPI also gives a nonempty product'));
assert.ok(node('maximal_ideal').definition.includes('proper ideal I'));
assert.ok(node('svc_seed').definition.includes('nonempty S'));
console.log('PASS: AC catalogue classification, graph exclusions, separation filters, historical/preprint provenance and precise hypotheses.');

// Selection must affect presentation only; the complete catalogue is retained.
assert.deepEqual(data.graph_selection.kept_candidate_numbers,[5,6,7,10,22,24,29,30,33,34,38]);
assert.ok(data.graph_selection.hidden_candidate_ids.length>0);
for(const id of data.graph_selection.hidden_candidate_ids){assert.ok(ids.has(id));assert.equal(graphEligible(data,node(id)),false)}
for(const id of data.graph_selection.kept_candidate_ids){assert.ok(ids.has(id));assert.notEqual(node(id).graph_visibility,'hidden');if(id!=='ac_lo_index')assert.equal(graphEligible(data,node(id)),true)}
assert.equal(graphEligible(data,node('ac_lo_index')),false);
for(const [a,b] of [['ac_2','graph_coloring_compactness_2'],['bpi','graph_coloring_compactness']]){
 assert.ok(compare(data,a,b).proof);assert.ok(compare(data,b,a).proof);
}
for(const [a,b] of [['ac_omega','cuc'],['dc','cuc'],['cuc','ac_omega_countable'],['bpi','infinite_hall_finite_fibers'],['infinite_hall_finite_fibers','ac_finite_fibers'],['bpi','algebraic_closure'],['bpi','unique_algebraic_closure'],['nds_sets','no_amorphous'],['op','no_amorphous'],['free_ultrafilter_omega','some_free_ultrafilter'],['ac_n','ac_omega_n']])assert.ok(compare(data,a,b).proof,`${a} implies ${b}`);
for(const target of ['df_finite','nds_sets','some_free_ultrafilter']){
 const r=compare(data,'no_amorphous',target);assert.equal(r.proof,null);assert.ok(r.witnesses.length,`No amorphous does not imply ${target}`);
 assert.ok(data.relations.some(e=>e.kind==='nonimplication'&&e.antecedents[0]==='no_amorphous'&&e.consequent===target));
}
assert.equal(compare(data,'ac_n','ac_2').proof,null,'Unspecified fixed n must not silently specialize to 2.');
assert.equal(compare(data,'ac_2','bpi').proof,null,'Two-color compactness does not get the n≥3 equivalence.');
assert.ok(node('infinite_hall_finite_fibers').notes.includes('partial choice'));
console.log('PASS: selected graph scope, two-color versus finite-color compactness, Hall and CUC links, and no-amorphous countermodel directions.');

const {relationshipProfile,assessDirection}=await import('./profiles.mjs');
const csbProfile=relationshipProfile(data,'dual_csb','ZF',false);
assert.equal(csbProfile.total,ids.size-1);
assert.ok(csbProfile.groups.incoming.some(e=>e.id==='pp'));
assert.ok(csbProfile.groups.outgoing.some(e=>e.id==='wpp'));
assert.ok(csbProfile.groups.outgoing.some(e=>e.id==='dc'),'Transitive consequences appear.');
assert.ok(csbProfile.groups.unsettled.some(e=>e.id==='pp'),'The unrecorded reverse remains visible alongside the known direction.');
assert.ok(csbProfile.entries.some(e=>e.id==='ac_kappa'),'Graph-hidden definitions remain in the relationship profile.');
assert.equal(assessDirection(data,'dual_csb','pp').status,'unrecorded');
assert.equal(assessDirection(data,'dual_csb','ac','ZF',true).status,'refuted');
assert.equal(assessDirection(data,'dual_csb','ac','ZF',false).status,'unrecorded');
assert.equal(assessDirection(data,'dual_csb','ac','ZFA',true).status,'unrecorded');
assert.ok(relationshipProfile(data,'dual_csb','ZF',true).groups.incomparable.some(e=>e.id==='bpi'));
assert.ok(!relationshipProfile(data,'dual_csb','ZF',false).groups.incomparable.some(e=>e.id==='bpi'));
const svcProfile=relationshipProfile(data,'svc_wellorderable_seed');
assert.ok(svcProfile.groups.equivalent.some(e=>e.id==='ac'));
assert.equal(assessDirection(data,'svc_seed','ac').status,'unrecorded','A general fixed seed is not silently well-orderable.');
const fixture={principles:[{id:'a'},{id:'b'},{id:'c'}],relations:[{id:'joint',kind:'implication',antecedents:['a','b'],consequent:'c',base:'ZF',layer:'standard'}],models:[]};
assert.equal(relationshipProfile(fixture,'a').entries.find(e=>e.id==='c').forward.status,'unrecorded','A profile cannot drop a joint hypothesis.');
console.log('PASS: complete relationship profiles, transitive evidence, unanswered reverse directions, hidden catalogue entries, and research/theory isolation.');

for(const id of ['maximal_antichain','kuratowski_maximal','linear_orders_well_orderable','svc_wellorderable_seed']){
 assert.equal(classifyPrinciple(data,node(id),'ZF').group,'equivalent');assert.equal(graphEligible(data,node(id),'ZF'),false);
 assert.ok(compare(data,id,'ac','ZF').proof);assert.ok(compare(data,'ac',id,'ZF').proof);
}
for(const id of ['maximal_antichain','linear_orders_well_orderable'])assert.equal(compare(data,id,'ac','ZFA').proof,null);
assert.ok(compare(data,'kuratowski_maximal','ac','ZFA').proof);
for(const theory of ['ZF','ZFA'])assert.ok(!relationshipProfile(data,'dual_csb',theory).entries.some(e=>['csb','finite_index_choice','ordinal_trichotomy','finite_hall'].includes(e.id)));
assert.ok(graphSlice(data,[...ids],visibleRelations(data,'ZF',true)).edges.every(r=>r.antecedents.length>0),'Theorem facts are not drawn as edges from missing graph nodes.');
assert.equal(new Set(data.relations.map(r=>r.id)).size,data.relations.length);
assert.ok(node('maximal_antichain').hypotheses.some(h=>h.includes('neither a≤b')));
assert.ok(node('zorn').history_evidence.length);
console.log('PASS: historical order principles, atom-sensitive reversals, and unconditional theorem consequences.');

const maximalProfile=relationshipProfile(data,'maximal_antichain');
for(const n of data.principles.filter(n=>n.id!=='maximal_antichain'&&classifyPrinciple(data,n,'ZF',false).group==='equivalent'))assert.ok(maximalProfile.groups.equivalent.some(e=>e.id===n.id),`All AC equivalents connect: ${n.id}`);
console.log('PASS: every classified AC equivalent connects through explicit proof records.');

// Ramsey consequences must not collapse RPP to stronger choice principles.
for(const from of ['pp','nds_sets','ac_omega','df_finite'])assert.notEqual(compare(data,from,'rpp').proof,null,from);
assert.notEqual(compare(data,'rpp','ac_omega_finite').proof,null);
for(const to of ['ac','ac_omega','df_finite','pp','bpi','nds_sets','op','ac_2']){
 const result=compare(data,'rpp',to);assert.equal(result.proof,null);assert.ok(result.witnesses.length,to);
}
assert.ok(compare(data,'bpi','rpp').witnesses.some(w=>w.model.id==='basic_cohen'));
assert.ok(compare(data,'ac_omega','nds_sets').witnesses.some(w=>w.model.id==='tachtsis_bpi_cc_nds'));
assert.ok(compare(data,'ac_wo_index','nds_sets').witnesses.some(w=>w.model.id==='howard_tachtsis_nds'));
assert.ok(compare(data,'rpp','no_amorphous','ZFA').witnesses.some(w=>w.model.id==='basic_fraenkel'));
assert.ok(!compare(data,'rpp','no_amorphous','ZF').witnesses.some(w=>w.model.id==='basic_fraenkel'));
assert.ok(data.models.find(m=>m.id==='solovay').assumptions.includes('inaccessible'));
for(const m of data.models){
 assert.ok([...m.true_ids,...m.false_ids].every(id=>ids.has(id)),m.id);
 assert.ok(!m.true_ids.some(id=>m.false_ids.includes(id)),m.id);
 for(const e of m.property_evidence||[])assert.ok(data.sources[e.source],e.source);
}
console.log('PASS: RPP strength, classical separating models, explicit transfer boundaries and model-fact references.');

// Exact-size finite choice must not be mistaken for choice up to a size bound.
assert.ok(!ids.has('dc_reals'));
for(const theory of ['ZF','ZFA']){
 assert.ok(compare(data,'ac_2','ac_4',theory).proof);
 assert.ok(compare(data,'ac_4','ac_2',theory).proof);
 for(const [a,b] of [['ac_2','ac_3'],['ac_3','ac_2'],['ac_4','ac_3'],['ac_3','ac_4']]){
  const result=compare(data,a,b,theory);assert.equal(result.proof,null);assert.ok(result.witnesses.length);
 }
}
console.log('PASS: DC on reals removed; exact-size choice equivalence, adjacent countermodels and ZF/ZFA evidence.');

// New choice statements and mathematical category organization.
for(const [a,b] of [['ac_omega','sequential_continuity_metric'],['sequential_continuity_metric','ac_omega']])assert.notEqual(compare(data,a,b,'ZF').proof,null);
for(const theory of ['ZF','ZFA']){
 for(const [a,b] of [['dc','noetherian_acc_fg'],['noetherian_acc_fg','infinite_weakly_dedekind_infinite'],['df_finite','infinite_weakly_dedekind_infinite'],['infinite_weakly_dedekind_infinite','no_amorphous']])assert.notEqual(compare(data,a,b,theory).proof,null,a+' implies '+b);
}
for(const [a,b] of [['bpi','noetherian_acc_fg'],['noetherian_acc_fg','bpi'],['infinite_weakly_dedekind_infinite','ac_omega_finite'],['algebraic_closure','noetherian_acc_fg'],['unique_algebraic_closure','noetherian_acc_fg']]){const r=compare(data,a,b);assert.equal(r.proof,null);assert.ok(r.witnesses.length,a+' does not imply '+b)}
assert.equal(compare(data,'noetherian_acc_fg','dc').proof,null);
assert.equal(compare(data,'algebraic_closure','unique_algebraic_closure').proof,null);
assert.equal(node('rpp').category,'combinatorics');
for(const id of ['df_finite','no_amorphous','infinite_weakly_dedekind_infinite'])assert.equal(node(id).category,'finitude');
for(const n of data.principles.filter(n=>n.category.startsWith('cardinal')))assert.equal(n.category,'cardinal_structure');
for(const id of ['ac','dc','ac_omega','ac_n','ac_2','ac_3','ac_4','mc'])assert.equal(node(id).category,'choice');
assert.ok(data.category_notes.choice.details.some(d=>d.text.includes('Mostowski–Gauntt–Truss')));
const {groupProfileEntries,equivalenceClasses}=await import('./profiles.mjs');
const grouped=groupProfileEntries(data,relationshipProfile(data,'ac_omega').groups.incoming);
const acClass=grouped.find(g=>g.id==='ac');assert.ok(acClass.members.some(e=>e.id==='zorn'));
assert.equal(grouped.filter(g=>g.members.some(e=>e.id==='wo')).length,1);
assert.equal(equivalenceClasses(data).byId.get('ultrafilter_lemma').id,'bpi');
assert.equal(equivalenceClasses(data,'ZFA').byId.get('mc').id,'mc','MC must not be grouped with AC over ZFA');
console.log('PASS: new metric continuity and Noetherian bounds, separating models, categories, removed theorems and theory-aware equivalence groups.');

// The algebraic-closure preprint is research-gated; its pure model is never transferred implicitly.
const algebraicSource=data.sources.FC2026ALG;
const algebraicModel=data.models.find(m=>m.id==='free_group_boolean_algebraic');
assert.ok(algebraicSource&&algebraicModel);
assert.deepEqual(algebraicSource.authors,['Frederico Cançado']);
assert.equal(algebraicSource.title,'Algebraic closures: existence without uniqueness');
assert.equal(algebraicModel.base,'ZF');
assert.equal(algebraicModel.layer,'recent');
assert.equal(algebraicModel.status,'preliminary');
assert.equal(algebraicModel.assumptions,'Con(ZFC)');
assert.equal(algebraicModel.permutation_construction,undefined,'The new model is a direct pure-ZF forcing construction, not an atom model.');
assert.deepEqual(new Set(algebraicModel.true_ids),new Set(['dc','algebraic_closure']));
assert.deepEqual(new Set(algebraicModel.false_ids),new Set(['unique_algebraic_closure','ac_finite_fibers','ac_2','bpi']));
for(const id of [...algebraicModel.true_ids,...algebraicModel.false_ids])assert.ok(algebraicModel.property_evidence.some(e=>e.principles.includes(id)&&e.source==='FC2026ALG'&&e.status==='preliminary'&&e.locator&&e.proof_note),`Exact preliminary model evidence: ${id}`);
for(const target of ['unique_algebraic_closure','bpi','ac_finite_fibers','ac_2']){
 const record=data.relations.find(r=>r.kind==='nonimplication'&&r.antecedents.length===1&&r.antecedents[0]==='algebraic_closure'&&r.consequent===target&&r.source==='FC2026ALG');
 assert.ok(record);assert.equal(record.layer,'recent');assert.equal(record.status,'preliminary');assert.deepEqual(record.valid_bases,['ZF']);
 const result=compare(data,'algebraic_closure',target,'ZF',true);
 assert.equal(result.proof,null);
 assert.ok(result.witnesses.some(w=>w.model.id===algebraicModel.id&&w.factEvidence.every(e=>e.source==='FC2026ALG'&&e.status==='preliminary')));
 for(const [theory,research] of [['ZF',false],['ZFA',true],['ZFA',false]])assert.ok(!compare(data,'algebraic_closure',target,theory,research).witnesses.some(w=>w.model.id===algebraicModel.id),'Pure-ZF preliminary witness leaked across a filter.');
}
for(const theory of ['ZF','ZFA']){
 const recent=visibleRelations(data,theory,true);
 const joint=closure(['algebraic_closure','unique_algebraic_closure'],recent);
 assert.ok(joint.known.has('ac_finite_fibers'));
 assert.ok(joint.known.has('finite_group_projection'));
 assert.ok(joint.known.has('finite_torsor_compactness'));
 for(const seed of ['algebraic_closure','unique_algebraic_closure']){
  const alone=closure([seed],recent);
  assert.ok(!alone.known.has('ac_finite_fibers'),`${seed} must not silently lose a joint hypothesis.`);
  assert.ok(!alone.known.has('finite_group_projection'));
 }
 for(const [from,to] of [['finite_group_projection','finite_torsor_compactness'],['finite_torsor_compactness','finite_group_projection'],['finite_torsor_compactness','unique_algebraic_closure'],['finite_torsor_compactness','ac_finite_fibers'],['bpi','finite_torsor_compactness']]){
  assert.ok(compare(data,from,to,theory,true).proof,`${from} => ${to} in ${theory}`);
  assert.equal(compare(data,from,to,theory,false).proof,null,'A new preprint proof became a standard arrow.');
 }
 assert.equal(compare(data,'finite_group_projection','algebraic_closure',theory,true).proof,null,'P => E is not proved.');
 assert.equal(compare(data,'finite_torsor_compactness','bpi',theory,true).proof,null,'T => BPI is not proved.');
}
assert.equal(compare(data,'unique_algebraic_closure','algebraic_closure','ZF',true).proof,null);
assert.equal(compare(data,'unique_algebraic_closure','algebraic_closure','ZF',true).witnesses.length,0,'The reverse pure-ZF separation is not supplied by this article.');
assert.ok(node('algebraic_closure').notes.includes('historical'));
assert.ok(node('unique_algebraic_closure').notes.includes('remains unresolved here over pure ZF'));
assert.ok(node('finite_group_projection').definition.includes('every canonical projection'));
assert.ok(node('finite_torsor_compactness').definition.includes('f_ji(gx)=π_ji(g)f_ji(x)'));
// Every displayed preprint citation must resolve to the same published artifact.
const algebraicRecords=[algebraicModel,...algebraicModel.property_evidence,...data.relations.filter(r=>r.source==='FC2026ALG')];
for(const record of algebraicRecords)assert.equal(record.source_url,algebraicSource.url);
assert.match(algebraicSource.url,/^https:\/\/github\.com\/frederico-cancado\/AC-zoo-results\/blob\/[a-f0-9]{40}\/articles\/2026-10-14-algebraic-closures\/algebraic_closures\.pdf$/);
assert.ok(algebraicSource.version.includes('pinned commit'),'An immutable publication citation must identify its pinned version.');
assert.ok(algebraicSource.version.startsWith('2026-10-14.1'));
assert.ok(algebraicSource.review.includes('internal AI-assisted mathematical audits'));
assert.ok(!algebraicRecords.some(record=>record.source_url.includes('/blob/main/')),'Publication evidence must use immutable commit citations.');
console.log('PASS: algebraic-closure preliminary provenance, pure-ZF witness isolation, joint E/U premises, exact P/T definitions, unproved converses, and citation consistency.');
