import assert from 'node:assert/strict';
import fs from 'node:fs';
import {graphGeometry} from './graph.mjs';
const data=JSON.parse(fs.readFileSync(new URL('./data.json',import.meta.url)));
function samplePath(d){
 const tokens=d.match(/[MLQ]|-?\d+(?:\.\d+)?/g),out=[];let i=0,p;
 const point=()=>({x:Number(tokens[i++]),y:Number(tokens[i++])});
 while(i<tokens.length){const command=tokens[i++];if(command==='M'){p=point();out.push(p)}else if(command==='L'){const q=point(),a=p;for(let n=1;n<=24;n++){const t=n/24;out.push({x:a.x+(q.x-a.x)*t,y:a.y+(q.y-a.y)*t})}p=q}else if(command==='Q'){const b=point(),c=point(),a=p;for(let n=1;n<=24;n++){const t=n/24;out.push({x:(1-t)**2*a.x+2*(1-t)*t*b.x+t*t*c.x,y:(1-t)**2*a.y+2*(1-t)*t*b.y+t*t*c.y})}p=c}else assert.fail(`Unexpected path command ${command}`)}
 return out;
}
function checkGeometry(g){
 for(const route of g.routes)for(const d of [route.d,...route.arms])for(const p of samplePath(d)){
  assert.ok(p.x>=0&&p.x<=g.W&&p.y>=0&&p.y<=g.H,`${route.relation.id}: connector outside graph`);
  for(const [id,n] of g.positions)assert.ok(!(Math.abs(p.x-n.x)<90&&Math.abs(p.y-n.y)<27),`${route.relation.id}: connector crosses ${id}`);
 }
 for(const a of g.positions.values())for(const b of g.positions.values())if(a!==b)assert.ok(Math.abs(a.x-b.x)>=180||Math.abs(a.y-b.y)>=54,'Overlapping node cards');
}
const edge=(id,a,b,kind='nonimplication')=>({id,antecedents:[a],consequent:b,kind});
const reciprocal=graphGeometry(['a','b'],[edge('a_b','a','b'),edge('b_a','b','a'),edge('a_b_second','a','b','implication')]);
assert.equal(new Set(reciprocal.routes.map(r=>r.d)).size,3,'Parallel arrows need separate routes');checkGeometry(reciprocal);
// A card between two endpoints must be avoided, and the detour must be local.
const intervening=graphGeometry(['a','b','c'],[edge('a_c','a','c')]);checkGeometry(intervening);
assert.ok(intervening.routes[0].points.every(p=>p.x>24&&p.x<intervening.W-24&&p.y>24&&p.y<intervening.H-24),'A simple arrow must not use the outside boundary');
const long=graphGeometry(['ac','dc','dual_csb','op','ac_wo_index','ac_omega','ac_omega_countable','ac_omega_finite','ac_omega_n'],[edge('long','ac','ac_omega_n')]);checkGeometry(long);
assert.ok(long.routes[0].points.every(p=>Math.abs(p.x-long.W/2)<150),'A vertical long arrow should use a nearby corridor');
const joint=graphGeometry(['pp','svc_seed','svc_plus_seed'],[{id:'joint',antecedents:['pp','svc_seed'],consequent:'svc_plus_seed',kind:'implication'}]);checkGeometry(joint);assert.equal(joint.joints.length,1);assert.equal(joint.routes[0].arms.length,2);
for(const count of [20,40,60,data.principles.length]){
 const ids=data.principles.slice(0,count).map(n=>n.id),g=graphGeometry(ids,data.relations);checkGeometry(g);
 assert.ok(g.W<=1592,'Large graphs should wrap rows, not create an unbounded horizontal strip');
 assert.equal(g.routes.length,data.relations.filter(r=>r.antecedents.length&&ids.includes(r.consequent)&&r.antecedents.every(a=>ids.includes(a))).length);
 assert.deepEqual(graphGeometry([...ids].reverse(),[...data.relations].reverse()),g,'Layout and routes should not depend on input ordering');
}
console.log('PASS: contained routes, card clearance, local detours, parallel directions, joint premises, deterministic layout, and large graph bounds.');
