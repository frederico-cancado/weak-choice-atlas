import assert from 'node:assert/strict';
import fs from 'node:fs';
import {visibleRelations,closure,compare} from './engine.mjs';
const data=JSON.parse(fs.readFileSync(new URL('./data.json',import.meta.url)));
const ids=new Set(data.principles.map(n=>n.id));
assert.equal(ids.size,88);
for(const r of data.relations){assert.ok([...r.antecedents,r.consequent].every(id=>ids.has(id)));assert.ok(r.proof_note);if(r.kind==='nonimplication'){assert.ok(r.consistency_assumption);assert.ok(data.models.some(m=>m.id===r.model))}}
const standard=visibleRelations(data,'ZF',false);
assert.equal(standard.length,31);
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
for(const theory of ['ZF','ZFA'])for(const research of [false,true])for(const a of ids)for(const b of ids){assert.equal(compare(data,a,b,theory,research).conflict,false,`Conflicting data: ${a}, ${b}, ${theory}, ${research}`)}
console.log('PASS: record integrity, inference paths, joint premises, countermodel direction, ZF/ZFA isolation, research gating, and all-pair consistency.');
