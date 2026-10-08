// Apply the saved theme before the stylesheet paints; storage is optional.
(() => {
 const key='weak-choice-theme';
 const system=window.matchMedia('(prefers-color-scheme: dark)');
 let preference='auto';
 try { const saved=localStorage.getItem(key); if(['auto','light','dark'].includes(saved))preference=saved; } catch {}
 function apply(){
  const theme=preference==='auto'?(system.matches?'dark':'light'):preference;
  document.documentElement.dataset.theme=theme;
  document.documentElement.style.colorScheme=theme;
  const select=document.querySelector('#theme-select');if(select)select.value=preference;
  const meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.content=theme==='dark'?'#101b2b':'#122b46';
 }
 apply();
 system.addEventListener('change',()=>{if(preference==='auto')apply()});
 document.addEventListener('DOMContentLoaded',()=>{
  apply();
  const select=document.querySelector('#theme-select');
  if(select)select.addEventListener('change',()=>{
   preference=select.value;
   try {localStorage.setItem(key,preference)} catch {}
   apply();
  });
 });
})();
