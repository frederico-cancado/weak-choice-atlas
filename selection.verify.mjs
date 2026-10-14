import assert from 'node:assert/strict';
import fs from 'node:fs';
import {GRAPH_PRESETS,normalizeSelection,selectGraph,reduceImplications,focusRoles} from './selection.mjs';
import {visibleRelations,closure} from './engine.mjs';

const data=JSON.parse(fs.readFileSync(new URL('./data.json',import.meta.url)));
const ids=new Set(data.principles.map(n=>n.id));
const byId=new Map(data.principles.map(n=>[n.id,n]));
const select=(options={})=>selectGraph(data,visibleRelations(data,options.theory||'ZF',!!options.research),options);

assert.ok(!data.principles.some(n=>/^dc_real/.test(n.id)),'DC on the reals was removed from the catalogue.');
assert.deepEqual(normalizeSelection(['ac_2','missing','ac_2','dc'],data),['ac_2','dc']);
for(const [view,preset] of Object.entries(GRAPH_PRESETS)){
 for(const id of preset.ids)assert.ok(ids.has(id),`${view}: unknown preset node ${id}`);
 for(const theory of ['ZF','ZFA']){
  const graph=select({view,theory});
  assert.ok(graph.ids.length>=8,`${view} should provide a substantial ${theory} starting graph.`);
  assert.ok(graph.edges.every(r=>[...r.antecedents,r.consequent].every(id=>graph.ids.includes(id))));
 }
}
for(const id of ['ac','mc','ac_omega','ac_wo_index','ac_2','ac_n','ac_finite_fibers'])assert.ok(select({view:'choice'}).ids.includes(id),`Types of choice includes ${id}.`);
assert.ok(!select({view:'choice',depth:1}).ids.includes('wo'),'Including MC in the choice preset does not enable other AC equivalents.');
assert.ok(!select({view:'custom',customIds:['mc']}).ids.includes('mc'),'Custom selections preserve the explicit AC-equivalent setting.');
assert.ok(select({view:'dependent'}).ids.includes('sequential_continuity_metric'));
assert.ok(select({view:'algebra'}).ids.includes('noetherian_acc_fg'));
assert.ok(select({view:'infinitude'}).ids.includes('infinite_weakly_dedekind_infinite'));

// Selecting a node changes the detail panel, not an exact topic selection.
assert.deepEqual(select({view:'choice',node:'pp'}).ids,select({view:'choice',node:'bpi'}).ids);
assert.deepEqual(select({view:'custom',customIds:['pp','ac_2'],node:'pp'}).ids,['pp','ac_2']);
assert.deepEqual(select({view:'custom',customIds:[],includeAC:true}).ids,[],'Clear selection stays empty.');
const hiddenEntry=data.principles.find(n=>n.graph_visibility==='hidden'&&n.ac_classification?.kind==='weaker');
if(hiddenEntry){assert.ok(select({view:'custom',customIds:[hiddenEntry.id]}).ids.includes(hiddenEntry.id),'A hidden entry can be chosen explicitly.');assert.ok(!select({view:'all'}).ids.includes(hiddenEntry.id),'Default all view still respects hidden entries.');}
assert.deepEqual(select({view:'custom',customIds:['ac','wo'],includeAC:true,includeEquivalents:false}).ids,['ac']);
assert.deepEqual(select({view:'custom',customIds:['ac','wo'],includeAC:false,includeEquivalents:true}).ids,['wo'],'AC has its own independent visibility control.');
assert.deepEqual(select({view:'custom',customIds:['ac','wo'],includeAC:true,includeEquivalents:true}).ids,['ac','wo']);

// Evidence filters may change arrows, but must not silently prune chosen nodes.
const exact={view:'custom',customIds:['pp','oep','op','bpi','rpp','ac_2']};
for(const theory of ['ZF','ZFA'])for(const research of [false,true])for(const edgeKind of ['all','implication','nonimplication']){
 const graph=select({...exact,theory,research,edgeKind});
 assert.deepEqual(graph.ids,exact.customIds);
 if(edgeKind==='implication')assert.ok(graph.edges.every(r=>r.kind!=='nonimplication'));
 if(edgeKind==='nonimplication')assert.ok(graph.edges.every(r=>r.kind==='nonimplication'));
}

const fixture={
 principles:['ac','p','q','r','s','isolated'].map(id=>({id,status:'',ac_classification:{kind:'weaker',valid_bases:['ZF','ZFA']}})),
 models:[],
 relations:[
  {id:'p_q',kind:'implication',antecedents:['p'],consequent:'q',base:'ZF',layer:'standard'},
  {id:'q_not_r',kind:'nonimplication',antecedents:['q'],consequent:'r',base:'ZF',layer:'standard'},
  {id:'r_s',kind:'implication',antecedents:['r'],consequent:'s',base:'ZF',layer:'standard'},
  {id:'pq_s',kind:'implication',antecedents:['p','q'],consequent:'s',base:'ZF',layer:'standard'},
  {id:'ac_p',kind:'implication',antecedents:['ac'],consequent:'p',base:'ZF',layer:'standard'}
 ]
};
const f=options=>selectGraph(fixture,fixture.relations,options);
assert.deepEqual(f({view:'custom',customIds:['p','isolated']}).ids,['p','isolated']);
assert.deepEqual(f({view:'custom',customIds:['p','isolated']}).isolated,['p','isolated']);
assert.ok(!f({view:'custom',customIds:['p','s']}).edges.some(e=>e.id==='pq_s'),'All joint hypotheses must be displayed.');
assert.ok(f({view:'custom',customIds:['p','q','s']}).edges.some(e=>e.id==='pq_s'));
const expanded=f({view:'custom',customIds:['p'],includeAC:false,depth:2});
assert.ok(expanded.ids.includes('r'),'Connection expansion can reveal endpoints of nonimplications.');
assert.ok(!expanded.edges.some(e=>e.antecedents.length===1&&e.antecedents[0]==='p'&&e.consequent==='r'),'Expansion must never fabricate a chained nonimplication.');
assert.ok(f({view:'neighbors',node:'ac',depth:1,includeAC:true}).ids.includes('p'),'AC can be the explicitly requested center.');
assert.deepEqual(new Set(f({view:'neighbors',node:'p',depth:0,includeAC:false}).ids),new Set(['p','q','s','ac']),'Focused neighborhoods retain all direct endpoints and joint premises even at depth zero.');

const relation=(id,from,to,kind='implication')=>({id,kind,antecedents:Array.isArray(from)?from:[from],consequent:to,base:'ZF',layer:'standard'});
const triangle=[relation('a_b','a','b'),relation('b_c','b','c'),relation('a_c','a','c')];
assert.deepEqual(reduceImplications(triangle).map(r=>r.id),['a_b','b_c'],'Remove a shortcut only when a displayed path replaces it.');
assert.ok(reduceImplications([triangle[2]]).some(r=>r.id==='a_c'),'A hidden intermediate cannot justify hiding the only visible arrow.');
const jointReduction=[relation('a_b','a','b'),relation('bc_d',['b','c'],'d'),relation('a_d','a','d')];
assert.ok(reduceImplications(jointReduction).some(r=>r.id==='a_d'),'One satisfied joint premise cannot replace an implication.');
assert.ok(!reduceImplications([...jointReduction,relation('a_c','a','c')]).some(r=>r.id==='a_d'),'All proved joint premises may replace an implication.');
const cycle=[relation('a_e','a','e','equivalence'),relation('e_b','e','b'),relation('b_c','b','c'),relation('a_c','a','c'),relation('c_a','c','a')];
const reducedCycle=reduceImplications(cycle);
for(const id of ['a','e','b','c'])assert.deepEqual(closure([id],reducedCycle).known,closure([id],cycle).known,'Reduction preserves reachability through equivalences and cycles.');
const notEdges=[relation('p_q_not','p','q','nonimplication'),relation('q_p_not','q','p','nonimplication')];
assert.equal(reduceImplications(notEdges).length,2,'Both countermodel directions must remain.');

const focusFixture={
 principles:['ac','center','eq','above','below','incomparable','uncertain','joint','joint_other',...Array.from({length:30},(_,i)=>`neighbor_${i}`)].map(id=>({id,status:'',graph_visibility:id==='eq'||id==='joint_other'?'hidden':undefined,ac_classification:{kind:id==='eq'?'equivalent':'weaker',valid_bases:['ZF']}})),
 models:[],relations:[relation('center_eq','center','eq','equivalence'),relation('above_center','above','center'),relation('center_below','center','below'),relation('center_not_i','center','incomparable','nonimplication'),relation('i_not_center','incomparable','center','nonimplication'),relation('center_not_u','center','uncertain','nonimplication'),relation('joint_center',['joint','joint_other'],'center'),relation('ac_center','ac','center'),...Array.from({length:30},(_,i)=>relation(`eq_neighbor_${i}`,'eq',`neighbor_${i}`))]
};
const neighborhood=selectGraph(focusFixture,focusFixture.relations,{view:'neighbors',node:'center',depth:0,includeAC:false,includeEquivalents:false,edgeKind:'implication',focusArrows:true});
assert.equal(neighborhood.ids.length,focusFixture.principles.length,'Complete neighborhoods have no cap and include neighbors of equivalent formulations.');
assert.ok(neighborhood.edges.some(r=>r.id==='center_not_i')&&neighborhood.edges.some(r=>r.id==='i_not_center'),'Focus keeps both nonimplication directions despite topic arrow filters.');
assert.equal(neighborhood.focusRoles.above,'stronger');assert.equal(neighborhood.focusRoles.below,'weaker');assert.equal(neighborhood.focusRoles.eq,'equivalent');assert.equal(neighborhood.focusRoles.incomparable,'incomparable');assert.equal(neighborhood.focusRoles.uncertain,'unknown');assert.equal(neighborhood.focusRoles.joint,'unknown','A joint premise alone is not classified as stronger.');
const witnessed={models:[{id:'m1',base:'ZF',true_ids:['p'],false_ids:['q']},{id:'m2',base:'ZF',true_ids:['q'],false_ids:['p']}]};
assert.equal(focusRoles(witnessed,['p','q'],[],'p').q,'incomparable','Two-sided model evidence can establish incomparability.');
assert.equal(focusRoles({models:[witnessed.models[0]]},['p','q'],[],'p').q,'unknown','A one-sided separation is not incomparability.');

console.log('PASS: presets and custom selections, complete focused neighborhoods, all countermodel directions, sound transitive reduction, joint premises, equivalence cycles, and evidence-based comparison roles.');
