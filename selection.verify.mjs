import assert from 'node:assert/strict';
import fs from 'node:fs';
import {GRAPH_PRESETS,normalizeSelection,selectGraph} from './selection.mjs';
import {visibleRelations} from './engine.mjs';

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
for(const id of ['ac','ac_omega','ac_wo_index','ac_2','ac_n','ac_finite_fibers'])assert.ok(select({view:'choice'}).ids.includes(id),`Types of choice includes ${id}.`);

// Selecting a node changes the detail panel, not an exact topic selection.
assert.deepEqual(select({view:'choice',node:'pp'}).ids,select({view:'choice',node:'bpi'}).ids);
assert.deepEqual(select({view:'custom',customIds:['pp','ac_2'],node:'pp'}).ids,['pp','ac_2']);
assert.deepEqual(select({view:'custom',customIds:[],includeAC:true}).ids,[],'Clear selection stays empty.');
assert.ok(select({view:'custom',customIds:['finite_index_choice']}).ids.includes('finite_index_choice'),'A previously omitted entry can be chosen explicitly.');
assert.equal(byId.get('finite_index_choice').graph_visibility,'hidden');
assert.ok(!select({view:'all'}).ids.includes('finite_index_choice'),'Default all view still respects omitted entries.');
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
assert.deepEqual(f({view:'neighbors',node:'p',depth:0,includeAC:false}).ids,['p'],'An explicit zero expansion is respected even in the neighborhood view.');

console.log('PASS: substantial presets, exact custom selections, optional AC and equivalents, omitted entries, edge filters, joint premises and safe connection expansion.');
