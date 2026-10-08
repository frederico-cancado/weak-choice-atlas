import {compare} from './engine.mjs?v=20261008-5';
const proofCitation=p=>({id:p.id,proof:p.proof_note,source_id:p.source,source:p.source_url,locator:p.locator,review:p.status});
export function registerAtlasTools(data){
 const context=document.modelContext;if(!context?.registerTool)return;
 const lifecycle=new AbortController();window.addEventListener('pagehide',()=>lifecycle.abort(),{once:true});
 const ids=new Set(data.principles.map(n=>n.id));
 const tools=[{
  name:'search_choice_principles',title:'Search choice principles',
  description:'Read matching statements and their source references from the atlas. Does not modify the page or data.',
  inputSchema:{type:'object',properties:{query:{type:'string'}},required:['query'],additionalProperties:false},
  annotations:{readOnlyHint:true,untrustedContentHint:true},
  execute(input){if(!input||typeof input.query!=='string')throw Error('query must be a string');const q=input.query.toLowerCase();return data.principles.filter(n=>JSON.stringify([n.id,n.name,n.aliases,n.definition]).toLowerCase().includes(q)).slice(0,20).map(n=>({id:n.id,name:n.name,definition:n.definition,sources:n.definition_evidence}))}
 },{
  name:'compare_choice_principles',title:'Compare choice principles',
  description:'Read recorded implication paths and separating models in the chosen theory. No result recorded is not a claim of openness. Recent research is excluded unless explicitly requested.',
  inputSchema:{type:'object',properties:{from:{type:'string'},to:{type:'string'},theory:{type:'string',enum:['ZF','ZFA']},includeResearch:{type:'boolean'}},required:['from','to'],additionalProperties:false},
  annotations:{readOnlyHint:true,untrustedContentHint:true},
  execute(input){if(!input||!ids.has(input.from)||!ids.has(input.to))throw Error('Use principle IDs returned by search_choice_principles');if(input.theory&&!['ZF','ZFA'].includes(input.theory))throw Error('theory must be ZF or ZFA');if(input.includeResearch!==undefined&&typeof input.includeResearch!=='boolean')throw Error('includeResearch must be boolean');const r=compare(data,input.from,input.to,input.theory||'ZF',input.includeResearch||false);return {conflict:r.conflict,implication:r.proof===null?null:r.proof.map(proofCitation),countermodels:r.witnesses.map(w=>({id:w.model.id,name:w.model.name,assumptions:w.model.assumptions,source:w.model.source_url,status:w.model.status,factEvidence:w.factEvidence,sourceProof:w.sourceProof.map(proofCitation),targetProof:w.targetProof.map(proofCitation)})),note:'Only entered evidence is queried; source checked is not independent proof certification.'}}
 }];
 for(const tool of tools){try{Promise.resolve(context.registerTool(tool,{signal:lifecycle.signal})).catch(()=>{})}catch{ /* Unsupported browser implementations do not affect the atlas. */ }}
}
