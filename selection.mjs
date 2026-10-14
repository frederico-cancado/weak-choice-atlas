import {graphSlice,classifyPrinciple} from './classification.mjs?v=20261013-1';

// Presets are explicit starting sets. Expansion is opt-in and never chains ↛.
export const GRAPH_PRESETS={
 choice:{title:'Types of choice',ids:['ac','ac_wo_index','dc','ac_omega','ac_countable_fibers','ac_finite_fibers','ac_n','ac_2','ac_3','ac_4','ac_omega_countable','ac_omega_finite','ac_omega_n','cuc','cuf','df_finite','bpi']},
 overview:{title:'The wider choice landscape',ids:['ac','pp','dual_csb','wpp','ac_wo_index','dc','ac_omega','ac_countable_fibers','ac_finite_fibers','ac_2','ac_omega_finite','bpi','oep','op','rpp','nds_sets','df_finite','no_amorphous','free_ultrafilter_omega']},
 partition:{title:'PP, CSB* & weak partition',ids:['pp','dual_csb','wpp','ac_wo_index','dc','ac_omega','ac_omega_finite','bpi','oep','op','rpp','df_finite']},
 ramsey:{title:'Ramsey & weak choice',ids:['pp','dc','ac_omega','nds_sets','df_finite','rpp','ac_omega_finite','bpi','op','ac_2','ac_3','ac_4','no_amorphous']},
 cardinal:{title:'Partition & cardinal ordering',ids:['pp','dual_csb','wpp','ac_wo_index','dc','ac_omega','nds_sets','df_finite','fb','finite_antichains','bpi','rpp','no_amorphous']},
 coding:{title:'Small violations & their context',ids:['pp','svc_plus_seed','svc_seed','svc','kwp','ac_wo_index','dc','ac_omega','bpi','dual_csb','wpp']},
 dependent:{title:'Countable & dependent choice',ids:['dc','ac_wo_index','ac_omega','cuc','ac_omega_countable','ac_omega_finite','ac_omega_n','cuf','baire_complete_metric','df_finite','no_amorphous','rpp','ac_finite_fibers','ac_2']},
 compactness:{title:'Compactness, filters & orders',ids:['bpi','ultrafilter_lemma','oep','op','hahn_banach','propositional_compactness','tychonoff_hausdorff','ac_finite_fibers','ac_2','infinite_hall_finite_fibers','some_free_ultrafilter','free_ultrafilter_omega']},
 orders:{title:'Order extension & choice',ids:['bpi','oep','op','pp','fb','nds_sets','finite_antichains','ac_finite_fibers','ac_2','ac_wo_index','dc','no_amorphous']},
 models:{title:'Separating principles',ids:['dc','op','oep','ac_finite_fibers','bpi','pp','rpp','nds_sets','df_finite','no_amorphous','ac_2','ac_3','ac_omega_finite','free_ultrafilter_omega']},
 finitechoice:{title:'Finite choice, Hall & colourings',ids:['bpi','graph_coloring_compactness','infinite_hall_finite_fibers','ac_countable_fibers','ac_finite_fibers','ac_n','ac_2','ac_3','ac_4','graph_coloring_compactness_2','ac_omega_finite','ac_omega_n','rpp','ac_omega']},
 infinitude:{title:'Infinite sets & ultrafilters',ids:['dc','ac_omega','nds_sets','df_finite','no_amorphous','op','ultrafilter_lemma','free_ultrafilter_omega','some_free_ultrafilter','rpp','ac_omega_finite','bpi']},
 algebra:{title:'Algebraic closures & choice',ids:['bpi','algebraic_closure','unique_algebraic_closure','ac_finite_fibers','ac_2','ac_countable_fibers','oep','op','ultrafilter_lemma','propositional_compactness']}
};
export const GRAPH_VIEWS=[...Object.entries(GRAPH_PRESETS).map(([id,p])=>[id,p.title]),['neighbors','Around the selected principle'],['all','All default graph axioms'],['custom','My chosen axioms']];

export function normalizeSelection(ids,data){const known=new Set(data.principles.map(n=>n.id));return [...new Set(ids)].filter(id=>known.has(id));}
export function selectGraph(data,relations,{view='choice',node='pp',theory='ZF',customIds=[],includeAC=true,includeEquivalents=false,depth=0,edgeKind='all',focusArrows=false}={}){
 const nodeMap=new Map(data.principles.map(n=>[n.id,n]));
 const allowed=id=>{
  const n=nodeMap.get(id);if(!n)return false;
  if(id==='ac')return includeAC;
  return includeEquivalents||classifyPrinciple(data,n,theory,true).group!=='equivalent';
 };
 let ids;
 if(view==='custom')ids=normalizeSelection(customIds,data).filter(allowed);
 else if(view==='all')ids=data.principles.filter(n=>n.graph_visibility!=='hidden'&&allowed(n.id)).map(n=>n.id);
 else if(view==='neighbors')ids=[node].filter(allowed);
 else ids=(GRAPH_PRESETS[view]||GRAPH_PRESETS.choice).ids.filter(allowed);
 if(includeAC&&view!=='custom'&&!ids.includes('ac'))ids.unshift('ac');
 const steps=depth;
 for(let step=0;step<steps;step++){
  const seeds=new Set(ids);const extra=new Set();
  for(const r of relations){
   if(!r.antecedents.length)continue;
   const members=[...r.antecedents,r.consequent];
   if(members.some(id=>seeds.has(id)&&(id!=='ac'||view==='neighbors'&&node==='ac')))for(const id of members){
    if(allowed(id)&&nodeMap.get(id).graph_visibility!=='hidden')extra.add(id);
   }
  }
  ids=[...new Set([...ids,...extra])];
 }
 const slice=graphSlice(data,ids,relations,theory,edgeKind,{includeAC,includeEquivalents,includeHidden:true});
 if(focusArrows)slice.edges=slice.edges.filter(r=>r.antecedents.includes(node)||r.consequent===node);
 const connected=new Set(slice.edges.flatMap(r=>[...r.antecedents,r.consequent]));
 return {...slice,isolated:slice.ids.filter(id=>!connected.has(id)),title:view==='neighbors'?`Around ${node}`:view==='custom'?'My chosen axioms':view==='all'?'All default graph axioms':(GRAPH_PRESETS[view]||GRAPH_PRESETS.choice).title};
}
