// node dikey_render.js video_klasörü ver baş son klasör  | test: ... ver test t1 t2..
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
(async()=>{const [d,ver,a,...r]=process.argv.slice(2);const br=await chromium.launch();const p=await br.newPage({viewport:{width:1080,height:1920}});
p.on('pageerror',e=>console.log('HATA',e.message));await p.goto('file://'+path.resolve(__dirname,'dikey.html')+'#d='+d);await p.waitForTimeout(200);
if(a==='test'){const SP=r[0];for(const t of r.slice(1)){await p.evaluate(([v,t])=>window.dikey(v,+t),[ver,t]);await p.screenshot({path:`${SP}/d_${ver}_${t}.jpg`,type:'jpeg',quality:80});}}
else{const [b,dir]=r;fs.mkdirSync(dir,{recursive:true});for(let i=+a;i<+b;i++){await p.evaluate(([v,t])=>window.dikey(v,t),[ver,i/30]);await p.screenshot({path:`${dir}/${String(i).padStart(5,'0')}.jpg`,type:'jpeg',quality:90});}}
await br.close();})();
