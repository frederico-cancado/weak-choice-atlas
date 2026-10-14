const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const rank={ac:0,wo:0,zorn:0,tychonoff:0,pp:1,dc:5,bpi:1,ultrafilter_lemma:1,dual_csb:2,oep:2,propositional_compactness:2,tychonoff_hausdorff:2,hahn_banach:3,op:3,wpp:3,baire_complete_metric:3,ac_wo_index:4,ac_finite_fibers:5,ac_omega:6,ac_omega_countable:7,ac_omega_finite:8,cuf:8,free_ultrafilter_omega:3,rpp:7,fb:1,nds_sets:3,finite_antichains:3,df_finite:7,svc_plus_seed:2,svc_seed:3,svc:4,kwp:5,ac_countable_fibers:4,graph_coloring_compactness:2,infinite_hall_finite_fibers:3,ac_n:6,ac_2:6,ac_3:6,ac_4:6,graph_coloring_compactness_2:7,ac_omega_n:9,cuc:7,no_amorphous:9,some_free_ultrafilter:10,algebraic_closure:3,unique_algebraic_closure:3};
const round=n=>Math.round(n*10)/10;
const key=p=>`${round(p.x)},${round(p.y)}`;
const same=(a,b)=>a.x===b.x&&a.y===b.y;
const distance=(a,b)=>Math.abs(a.x-b.x)+Math.abs(a.y-b.y);
const inside=(p,n,px=108,py=45)=>Math.abs(p.x-n.x)<px-.01&&Math.abs(p.y-n.y)<py-.01;
function simplify(points){const result=[];for(const p of points){if(result.length&&same(result.at(-1),p))continue;while(result.length>1){const a=result.at(-2),b=result.at(-1);if(!((a.x===b.x&&b.x===p.x)||(a.y===b.y&&b.y===p.y)))break;result.pop()}result.push(p)}return result}
// Rounded local corridors replace the old page-edge detours. The control points
// remain inside the graph, with an 18-unit clearance around every card.
export function roundedPath(points,radius=22){
 if(!points.length)return '';let d=`M${round(points[0].x)},${round(points[0].y)}`;
 for(let i=1;i<points.length-1;i++){const a=points[i-1],b=points[i],c=points[i+1],ab=distance(a,b),bc=distance(b,c),r=Math.min(radius,ab/2,bc/2);if(!ab||!bc)continue;const pre={x:b.x+(a.x-b.x)*r/ab,y:b.y+(a.y-b.y)*r/ab},post={x:b.x+(c.x-b.x)*r/bc,y:b.y+(c.y-b.y)*r/bc};d+=` L${round(pre.x)},${round(pre.y)} Q${round(b.x)},${round(b.y)} ${round(post.x)},${round(post.y)}`}
 const p=points.at(-1);return d+` L${round(p.x)},${round(p.y)}`;
}
class Heap{constructor(){this.a=[]}push(value){const a=this.a;a.push(value);let i=a.length-1;while(i){const j=(i-1)>>1;if(a[j].f<=value.f)break;a[i]=a[j];i=j}a[i]=value}pop(){const a=this.a,first=a[0],last=a.pop();if(a.length){let i=0;while(i*2+1<a.length){let j=i*2+1;if(j+1<a.length&&a[j+1].f<a[j].f)j++;if(a[j].f>=last.f)break;a[i]=a[j];i=j}a[i]=last}return first}get length(){return this.a.length}}
export function graphGeometry(ids,relations){
 const groups=new Map();for(const id of [...new Set(ids)]){const row=rank[id]??4;if(!groups.has(row))groups.set(row,[]);groups.get(row).push(id)}
 const layers=[];for(const r of [...groups.keys()].sort((a,b)=>a-b)){const entries=groups.get(r).sort();for(let i=0;i<entries.length;i+=6)layers.push(entries.slice(i,i+6))}
 const cols=Math.max(1,...layers.map(row=>row.length)),W=Math.max(720,cols*252+80),H=Math.max(520,layers.length*148+40),positions=new Map();
 layers.forEach((row,ri)=>row.forEach((id,i)=>positions.set(id,{x:round(W/2+(i-(row.length-1)/2)*252),y:round(layers.length===1?H/2:70+ri*(H-140)/(layers.length-1))})));
 const visible=relations.filter(r=>positions.has(r.consequent)&&r.antecedents.length&&r.antecedents.every(id=>positions.has(id)));
 const bundles=new Map();for(const r of visible){if(r.antecedents.length!==1)continue;const k=[r.antecedents[0],r.consequent].sort().join('|');if(!bundles.has(k))bundles.set(k,[]);bundles.get(k).push(r)}
 for(const bundle of bundles.values())bundle.sort((a,b)=>a.id.localeCompare(b.id));
 const tasks=visible.map(r=>{let shift=0;if(r.antecedents.length===1){const bundle=bundles.get([r.antecedents[0],r.consequent].sort().join('|'));shift=bundle.length>1?(bundle.indexOf(r)/(bundle.length-1)-.5)*40:0}return {r,shift}});
 const nodes=[...positions.values()],xs=new Set([24,W-24]),ys=new Set([24,H-24]);
 for(const p of nodes){for(const dx of [-126,-108,-20,0,20,108,126])xs.add(round(p.x+dx));for(const dy of [-64,-45,-10,0,10,45,64])ys.add(round(p.y+dy))}
 const port=(a,b,shift=0)=>{const vertical=Math.abs(b.y-a.y)>54;if(vertical){const sign=b.y>a.y?1:-1;return {anchor:{x:round(a.x+shift),y:round(a.y+sign*31)},outer:{x:round(a.x+shift),y:round(a.y+sign*45)}}}const sign=b.x>=a.x?1:-1;return {anchor:{x:round(a.x+sign*94),y:round(a.y+shift/2)},outer:{x:round(a.x+sign*108),y:round(a.y+shift/2)}}};
 for(const t of tasks)if(t.r.antecedents.length===1){const a=positions.get(t.r.antecedents[0]),b=positions.get(t.r.consequent);t.start=port(a,b,t.shift);t.end=port(b,a,t.shift);for(const p of [t.start.outer,t.end.outer]){xs.add(p.x);ys.add(p.y)}}
 const X=[...xs].filter(x=>x>=24&&x<=W-24).sort((a,b)=>a-b),Y=[...ys].filter(y=>y>=24&&y<=H-24).sort((a,b)=>a-b),NX=X.length,points=[],pointIndex=new Map(),neighbors=[];
 for(let yi=0;yi<Y.length;yi++)for(let xi=0;xi<NX;xi++){const p={x:X[xi],y:Y[yi]},i=yi*NX+xi;points.push(p);if(!nodes.some(n=>inside(p,n)))pointIndex.set(key(p),i);neighbors.push([])}
 for(let i=0;i<points.length;i++){const p=points[i];if(!pointIndex.has(key(p)))continue;for(const j of [i%NX<NX-1?i+1:-1,i+NX<points.length?i+NX:-1]){if(j<0)continue;const q=points[j];if(!pointIndex.has(key(q)))continue;const mid={x:(p.x+q.x)/2,y:(p.y+q.y)/2};if(nodes.some(n=>inside(mid,n)))continue;const len=distance(p,q),axis=p.x===q.x?1:0;neighbors[i].push({to:j,len,axis});neighbors[j].push({to:i,len,axis})}}
 const usage=new Map(),occupancy=new Map();const segmentKey=(a,b)=>a<b?`${a}:${b}`:`${b}:${a}`;
 function route(start,end){
  const si=pointIndex.get(key(start)),ei=pointIndex.get(key(end));if(si===undefined||ei===undefined)throw new Error('A graph connector is inside a node.');
  const costs=new Map(),parent=new Map(),queue=new Heap(),first=si*3+2;costs.set(first,0);queue.push({state:first,f:distance(start,end),g:0});let last;
  while(queue.length){const current=queue.pop(),state=current.state;if(current.g!==costs.get(state))continue;const i=Math.floor(state/3),axis=state%3;if(i===ei){last=state;break}for(const e of neighbors[i]){const next=e.to*3+e.axis,use=usage.get(segmentKey(i,e.to))||0,cross=occupancy.get(e.to);const score=current.g+e.len*(1+Math.min(use,3)*.65)+(axis!==2&&axis!==e.axis?25:0)+(cross&&cross.has(1-e.axis)?8:0);if(score>=(costs.get(next)??Infinity))continue;costs.set(next,score);parent.set(next,state);queue.push({state:next,g:score,f:score+distance(points[e.to],end)})}}
  if(last===undefined)throw new Error('No unobstructed graph connector was found.');
  const indices=[];for(let s=last;s!==undefined;s=parent.get(s))indices.push(Math.floor(s/3));indices.reverse();for(let i=1;i<indices.length;i++){const a=indices[i-1],b=indices[i],k=segmentKey(a,b);usage.set(k,(usage.get(k)||0)+1);for(const j of [a,b]){if(!occupancy.has(j))occupancy.set(j,new Set());occupancy.get(j).add(points[a].x===points[b].x?1:0)}}
  return simplify(indices.map(i=>points[i]));
 }
 const routed=[];const joints=[];
 // Short connectors get first choice of their direct gap; long arrows then find
 // unused local corridors rather than accumulating in shared outside lanes.
 tasks.sort((a,b)=>{const length=t=>distance(positions.get(t.r.antecedents[0]),positions.get(t.r.consequent));return length(a)-length(b)||a.r.id.localeCompare(b.r.id)});
 for(const t of tasks){const {r}=t;if(r.antecedents.length===1){const ps=simplify([t.start.anchor,...route(t.start.outer,t.end.outer),t.end.anchor]);routed.push({relation:r,points:ps,d:roundedPath(ps),arms:[]})}else{
  const as=r.antecedents.map(id=>positions.get(id)),b=positions.get(r.consequent),desired={x:(as.reduce((s,p)=>s+p.x,0)/as.length+b.x)/2,y:(as.reduce((s,p)=>s+p.y,0)/as.length+b.y)/2};
  const candidates=[...pointIndex.values()].filter(i=>!nodes.some(n=>inside(points[i],n,126,66))&&!joints.some(n=>inside(points[i],n,70,45)));const ji=candidates.reduce((best,i)=>distance(points[i],desired)<distance(points[best],desired)?i:best,candidates[0]);if(ji===undefined)throw new Error('No room for a joint premise.');const joint=points[ji];joints.push({...joint,relation:r});
  const nearest=p=>points[[...pointIndex.values()].reduce((best,i)=>distance(points[i],p)<distance(points[best],p)?i:best,pointIndex.values().next().value)];
  const arms=as.map(a=>{const ap=port(a,joint);return roundedPath(simplify([ap.anchor,...route(nearest(ap.outer),joint)]))});const bp=port(b,joint),ps=simplify([...route(joint,nearest(bp.outer)),bp.anchor]);routed.push({relation:r,points:ps,d:roundedPath(ps),arms});
 }}
 return {W,H,positions,routes:routed,joints};
}
export function renderGraph(host,{ids,relations,label,selected,onNode,onEdge}){
 const {W,H,positions,routes,joints:jointPositions}=graphGeometry(ids,relations);
 const markers=['implication','nonimplication','equivalence'].map((kind,i)=>`<marker id="arrow-${kind}" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 1 1 L 10 6 L 1 11" fill="none" stroke="${['var(--blue)','var(--orange)','var(--purple)'][i]}" stroke-width="2.2"/></marker>`).join('');
 const edgePath=({relation:r,d,arms})=>`<g class="graph-edge ${r.kind==='nonimplication'?'countermodel-edge':''}" role="button" tabindex="0" data-edge="${esc(r.id)}" aria-label="${esc(r.antecedents.map(label).join(' and '))} ${r.kind==='nonimplication'?'does not imply':r.kind==='equivalence'?'is equivalent to':'implies'} ${esc(label(r.consequent))}. Open evidence.">${arms.map(arm=>`<path class="edge-halo" d="${arm}"/><path class="graph-joint-line" d="${arm}" fill="none" stroke-width="1.5"/><path class="edge-hit" d="${arm}"/>`).join('')}<path class="edge-halo" d="${d}"/><path class="edge-line ${r.kind}" d="${d}" marker-end="url(#arrow-${r.kind})" ${r.kind==='equivalence'?`marker-start="url(#arrow-equivalence)"`:''}/><path class="edge-hit" d="${d}"/><title>${esc(r.antecedents.map(label).join(' ∧ '))} ${r.kind==='nonimplication'?'↛':r.kind==='equivalence'?'⇔':'⇒'} ${esc(label(r.consequent))} — click for evidence</title></g>`;
 const paths=[...routes].sort((a,b)=>(a.relation.kind==='nonimplication')-(b.relation.kind==='nonimplication')).map(edgePath).join('');
 const joints=jointPositions.map(p=>`<g class="graph-joint" data-edge="${esc(p.relation.id)}"><rect x="${p.x-23}" y="${p.y-14}" width="46" height="28" rx="7"/><text x="${p.x}" y="${p.y+5}" text-anchor="middle" font-size="12">AND</text></g>`).join('');
 const nodes=ids.map(id=>{const p=positions.get(id),text=label(id),chunks=text.length>22?text.split(/\s+/).reduce((a,w)=>{if(!a.length||a[a.length-1].length+w.length>22)a.push(w);else a[a.length-1]+=' '+w;return a},[]):[text];return `<g class="graph-node ${id===selected?'selected':''}" role="button" tabindex="0" data-node="${esc(id)}" aria-label="Open ${esc(text)}"><rect x="${p.x-90}" y="${p.y-27}" width="180" height="54" rx="8"/>${chunks.slice(0,2).map((s,i)=>`<text x="${p.x}" y="${p.y+(chunks.length===1?6:-3+i*19)}" text-anchor="middle">${esc(s)}</text>`).join('')}<title>${esc(text)}</title></g>`}).join('');
 host.innerHTML=`<svg viewBox="0 0 ${W} ${H}" aria-label="Interactive graph of choice principles. Solid arrows are implications; dashed arrows marked ↛ are non-implications witnessed by models." role="group"><defs>${markers}</defs><g class="viewport"><g class="graph-edges">${paths}</g>${joints}<g class="graph-badges"></g>${nodes}</g></svg>`;
 const svg=host.querySelector('svg'),badgeLayer=host.querySelector('.graph-badges'),badges=[];
 // An explicit symbol makes the relation identifiable without relying on color or dashes.
 for(const edge of host.querySelectorAll('.countermodel-edge')){
  const path=edge.querySelector('.edge-line'),length=path.getTotalLength();
  const candidates=[.5,.4,.6,.3,.7,.22,.78].map(f=>path.getPointAtLength(length*f));
  const score=p=>[...positions.values(),...jointPositions].reduce((s,n)=>s+(Math.abs(p.x-n.x)<119&&Math.abs(p.y-n.y)<49?100:0),0)+badges.reduce((s,n)=>s+(Math.abs(p.x-n.x)<54&&Math.abs(p.y-n.y)<38?25:0),0);
  const p=candidates.reduce((best,q)=>score(q)<score(best)?q:best,candidates[0]);badges.push(p);
  const badge=document.createElementNS('http://www.w3.org/2000/svg','g');
  badge.setAttribute('class','edge-badge');badge.setAttribute('data-edge',edge.dataset.edge);badge.setAttribute('aria-hidden','true');badge.setAttribute('transform',`translate(${p.x} ${p.y})`);
  badge.innerHTML=`<title>${esc(edge.querySelector('title').textContent)}</title>`+'<rect class="badge-hit" x="-28" y="-22" width="56" height="44" rx="8"/><rect class="badge-face" x="-20" y="-14" width="40" height="28" rx="7"/><text text-anchor="middle" y="6">↛</text>';
  badgeLayer.appendChild(badge);
 }
 let box={x:0,y:0,w:W,h:H},drag=null,moved=false;
 const apply=()=>svg.setAttribute('viewBox',`${box.x} ${box.y} ${box.w} ${box.h}`);
 if(host.clientWidth>0&&host.clientWidth<500){const center=positions.get(selected)||{x:W/2,y:H/2};box.w=Math.max(400,host.clientWidth*1.15);box.h=box.w*host.clientHeight/host.clientWidth;box.x=center.x-box.w/2;box.y=Math.max(0,center.y-box.h/2);apply()}
 function zoom(factor){const nw=Math.max(W*.22,Math.min(W*2.5,box.w*factor)),nh=nw*box.h/box.w;box.x+=(box.w-nw)/2;box.y+=(box.h-nh)/2;box.w=nw;box.h=nh;apply()}
 svg.addEventListener('wheel',e=>{if(!e.ctrlKey&&!e.metaKey)return;e.preventDefault();zoom(e.deltaY>0?1.13:.88)},{passive:false});
 svg.addEventListener('pointerdown',e=>{moved=false;if(e.target.closest('[data-node],[data-edge]'))return;drag={x:e.clientX,y:e.clientY,bx:box.x,by:box.y};svg.setPointerCapture(e.pointerId)});
 svg.addEventListener('pointermove',e=>{if(!drag)return;const rect=svg.getBoundingClientRect(),scale=Math.max(box.w/rect.width,box.h/rect.height);box.x=drag.bx-(e.clientX-drag.x)*scale;box.y=drag.by-(e.clientY-drag.y)*scale;moved=true;apply()});
 svg.addEventListener('pointerup',()=>{drag=null});svg.addEventListener('pointercancel',()=>{drag=null});
 const highlight=id=>{const r=routes.find(e=>e.relation.id===id)?.relation,endpoints=new Set(r?[...r.antecedents,r.consequent]:[]);svg.classList.toggle('edge-emphasis',!!id);host.querySelectorAll('[data-edge]').forEach(el=>el.classList.toggle('emphasized',el.dataset.edge===id));host.querySelectorAll('[data-node]').forEach(el=>el.classList.toggle('edge-endpoint',endpoints.has(el.dataset.node)))};
 const bind=(selector,callback,key)=>host.querySelectorAll(selector).forEach(el=>{el.addEventListener('click',()=>{if(!moved)callback(el.dataset[key]);moved=false});el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();callback(el.dataset[key])}})});
 bind('[data-node]',onNode,'node');bind('[data-edge]',onEdge,'edge');
 host.querySelectorAll('[data-edge]').forEach(el=>{el.addEventListener('pointerenter',()=>highlight(el.dataset.edge));el.addEventListener('pointerleave',()=>highlight(null));el.addEventListener('focus',()=>highlight(el.dataset.edge));el.addEventListener('blur',()=>highlight(null))});
 return {zoomIn:()=>zoom(.8),zoomOut:()=>zoom(1.25),reset:()=>{box={x:0,y:0,w:W,h:H};apply()}};
}
