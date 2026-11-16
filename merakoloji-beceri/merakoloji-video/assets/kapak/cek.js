// node cek.js <sahne.html> <kapak.js> <çıktı_öneki> y|d ...
const {chromium}=require('playwright');const path=require('path');
(async()=>{const [h,k,out,...vs]=process.argv.slice(2);const b=await chromium.launch();
for(const v of vs){const W=v=='y'?1920:1080,H=v=='y'?1080:1920;const p=await b.newPage({viewport:{width:W,height:H}});
p.on('pageerror',e=>console.log('HATA',e.message));await p.goto('file://'+path.resolve(h));await p.waitForTimeout(150);
await p.addScriptTag({path:path.resolve(k)});await p.evaluate(([v,W,H])=>{const s=document.getElementById('s');s.setAttribute('width',W);s.setAttribute('height',H);s.innerHTML=window.kapak(v)},[v,W,H]);
await p.waitForTimeout(100);await p.screenshot({path:`${out}-${v=='y'?'16x9':'9x16'}.png`});await p.close()}
await b.close()})();
