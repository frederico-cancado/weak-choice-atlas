const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function renderGraph(host,{ids,relations,label,selected,onNode,onEdge}){
 // Fixed family-independent ranks keep the map stable between selections.
 const rank={ac:0,wo:0,zorn:0,tychonoff:0,pp:1,dc:1,bpi:1,ultrafilter_lemma:1,dual_csb:2,oep:2,propositional_compactness:2,tychonoff_hausdorff:2,hahn_banach:3,op:3,wpp:3,dc_reals:3,baire_complete_metric:3,ac_wo_index:4,ac_finite_fibers:4,ac_omega:5,ac_omega_countable:6,ac_omega_finite:7,cuf:7,free_ultrafilter_omega:3,fb:1,nds_sets:3,finite_antichains:3,df_finite:5,svc_plus_seed:2,svc_seed:3,svc:4,kwp:5};
 const groups=new Map();for(const id of ids){const row=rank[id]??4;if(!groups.has(row))groups.set(row,[]);groups.get(row).push(id)}
 const rows=[...groups.keys()].sort((a,b)=>a-b),maxCols=Math.max(1,...[...groups.values()].map(g=>g.length));
 const W=Math.max(720,maxCols*245+40),H=Math.max(520,rows.length*105+60),positions=new Map();
 rows.forEach((row,ri)=>groups.get(row).forEach((id,i)=>positions.set(id,{x:W*(i+1)/(groups.get(row).length+1),y:70+ri*(H-140)/Math.max(1,rows.length-1)})));
 const markers=['implication','nonimplication','equivalence'].map((kind,i)=>`<marker id="arrow-${kind}" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 1 1 L 10 6 L 1 11" fill="none" stroke="${['var(--blue)','var(--orange)','var(--purple)'][i]}" stroke-width="2.2"/></marker>`).join('');
 function curve(a,b,offset=0){
  if(Math.abs(a.y-b.y)<20){const sx=a.x+(a.x<b.x?87:-87),ex=b.x+(a.x<b.x?-87:87),bend=offset||-68;return `M${sx},${a.y} C${sx},${a.y+bend} ${ex},${b.y+bend} ${ex},${b.y}`}
  const down=b.y>a.y,sy=a.y+(down?28:-28),ey=b.y+(down?-31:31),mid=(sy+ey)/2;
  return `M${a.x+offset*.22},${sy} C${a.x+offset},${mid} ${b.x+offset},${mid} ${b.x+offset*.22},${ey}`;
 }
 // Countermodel arrows use separate outer lanes and opposite sides for reciprocal directions.
 const separationLanes={left:0,right:0};
 function separationCurve(a,b,direction){
  if(Math.abs(a.y-b.y)<20)return curve(a,b,direction*85);
  if(Math.abs(a.y-b.y)<140)return curve(a,b,direction*92);
  const left=a.x===b.x?direction<0:a.x<b.x,side=left?'left':'right',i=separationLanes[side]++;
  const lane=left?20+(i%6)*17:W-20-(i%6)*17,dir=b.y<a.y?-1:1;
  const sx=a.x+(left?-15:15),ex=b.x+(left?-23:23),sy=a.y+dir*29,ey=b.y-dir*31;
  return `M${sx},${sy} C${sx},${sy+dir*12} ${lane},${sy+dir*12} ${lane},${sy+dir*32} L${lane},${ey-dir*32} C${lane},${ey-dir*12} ${ex},${ey-dir*12} ${ex},${ey}`;
 }
 const edgePath=(r,d)=>`<g class="graph-edge ${r.kind==='nonimplication'?'countermodel-edge':''}" role="button" tabindex="0" data-edge="${esc(r.id)}" aria-label="${esc(r.antecedents.map(label).join(' and '))} ${r.kind==='nonimplication'?'does not imply':r.kind==='equivalence'?'is equivalent to':'implies'} ${esc(label(r.consequent))}. Open evidence."><path class="edge-halo" d="${d}"/><path class="edge-line ${r.kind}" d="${d}" marker-end="url(#arrow-${r.kind})" ${r.kind==='equivalence'?`marker-start="url(#arrow-equivalence)"`:''}/><path class="edge-hit" d="${d}"/><title>${esc(r.antecedents.map(label).join(' ∧ '))} ${r.kind==='nonimplication'?'↛':r.kind==='equivalence'?'⇔':'⇒'} ${esc(label(r.consequent))} — click for evidence</title></g>`;
 let paths='',joints='';
 // Paint non-implications last so their dashed strokes stay visible at crossings.
 const visibleRelations=relations.filter(r=>positions.has(r.consequent)&&r.antecedents.every(id=>positions.has(id)));
 for(const r of [...visibleRelations].sort((a,b)=>(a.kind==='nonimplication')-(b.kind==='nonimplication'))){
  if(r.antecedents.length===1){
   const a=positions.get(r.antecedents[0]),b=positions.get(r.consequent),direction=r.antecedents[0]<r.consequent?-1:1;
   const reverse=visibleRelations.some(e=>e.antecedents.length===1&&e.antecedents[0]===r.consequent&&e.consequent===r.antecedents[0]);
   const parallel=visibleRelations.some(e=>e.id!==r.id&&e.antecedents.length===1&&e.antecedents[0]===r.antecedents[0]&&e.consequent===r.consequent);
   paths+=edgePath(r,r.kind==='nonimplication'?separationCurve(a,b,direction):curve(a,b,reverse||parallel?-direction*42:0));
  }else{
   const as=r.antecedents.map(id=>positions.get(id)),b=positions.get(r.consequent),joint={x:W-40,y:Math.max(40,as.reduce((s,p)=>s+p.y,0)/as.length)};
   for(const a of as)joints+=`<path class="graph-joint-line" d="M${a.x},${a.y} L${joint.x},${joint.y}" fill="none" stroke-width="1.5"/>`;
   paths+=edgePath(r,curve(joint,b));joints+=`<g class="graph-joint"><rect x="${joint.x-23}" y="${joint.y-14}" width="46" height="28" rx="7"/><text x="${joint.x}" y="${joint.y+5}" text-anchor="middle" font-size="12">AND</text></g>`;
  }
 }
 const nodes=ids.map(id=>{const p=positions.get(id),text=label(id),chunks=text.length>22?text.split(/\s+/).reduce((a,w)=>{if(!a.length||a[a.length-1].length+w.length>22)a.push(w);else a[a.length-1]+=' '+w;return a},[]):[text];return `<g class="graph-node ${id===selected?'selected':''}" role="button" tabindex="0" data-node="${esc(id)}" aria-label="Open ${esc(text)}"><rect x="${p.x-90}" y="${p.y-27}" width="180" height="54" rx="8"/>${chunks.slice(0,2).map((s,i)=>`<text x="${p.x}" y="${p.y+(chunks.length===1?6:-3+i*19)}" text-anchor="middle">${esc(s)}</text>`).join('')}<title>${esc(text)}</title></g>`}).join('');
 host.innerHTML=`<svg viewBox="0 0 ${W} ${H}" aria-label="Interactive graph of choice principles. Solid arrows are implications; dashed arrows marked ↛ are non-implications witnessed by models." role="group"><defs>${markers}</defs><g class="viewport">${joints}<g class="graph-edges">${paths}</g><g class="graph-badges"></g>${nodes}</g></svg>`;
 const svg=host.querySelector('svg'),badgeLayer=host.querySelector('.graph-badges'),badges=[];
 // An explicit symbol makes the relation identifiable without relying on color or dashes.
 for(const edge of host.querySelectorAll('.countermodel-edge')){
  const path=edge.querySelector('.edge-line'),length=path.getTotalLength();
  const candidates=[.5,.4,.6,.3,.7,.22,.78].map(f=>path.getPointAtLength(length*f));
  const score=p=>[...positions.values()].reduce((s,n)=>s+(Math.abs(p.x-n.x)<119&&Math.abs(p.y-n.y)<49?100:0),0)+badges.reduce((s,n)=>s+(Math.abs(p.x-n.x)<54&&Math.abs(p.y-n.y)<38?25:0),0);
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
 svg.addEventListener('pointermove',e=>{if(!drag)return;const scale=box.w/svg.getBoundingClientRect().width;box.x=drag.bx-(e.clientX-drag.x)*scale;box.y=drag.by-(e.clientY-drag.y)*scale;moved=true;apply()});
 svg.addEventListener('pointerup',()=>{drag=null});svg.addEventListener('pointercancel',()=>{drag=null});
 const highlight=id=>{svg.classList.toggle('edge-emphasis',!!id);host.querySelectorAll('[data-edge]').forEach(el=>el.classList.toggle('emphasized',el.dataset.edge===id))};
 const bind=(selector,callback,key)=>host.querySelectorAll(selector).forEach(el=>{el.addEventListener('click',()=>{if(!moved)callback(el.dataset[key]);moved=false});el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();callback(el.dataset[key])}})});
 bind('[data-node]',onNode,'node');bind('[data-edge]',onEdge,'edge');
 host.querySelectorAll('[data-edge]').forEach(el=>{el.addEventListener('pointerenter',()=>highlight(el.dataset.edge));el.addEventListener('pointerleave',()=>highlight(null));el.addEventListener('focus',()=>highlight(el.dataset.edge));el.addEventListener('blur',()=>highlight(null))});
 return {zoomIn:()=>zoom(.8),zoomOut:()=>zoom(1.25),reset:()=>{box={x:0,y:0,w:W,h:H};apply()}};
}
