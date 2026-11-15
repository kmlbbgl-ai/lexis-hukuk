// node render.js sahne.html "#v=yt" W H baş_kare son_kare klasör
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
(async()=>{const [f,hash,W,H,a,b,dir]=process.argv.slice(2);fs.mkdirSync(dir,{recursive:true});
const br=await chromium.launch();const p=await br.newPage({viewport:{width:+W,height:+H}});
p.on('pageerror',e=>console.log('HATA',e.message));await p.goto('file://'+path.resolve(f)+hash);await p.waitForTimeout(150);
for(let i=+a;i<+b;i++){await p.evaluate(t=>window.draw(t),i/30);await p.screenshot({path:`${dir}/${String(i).padStart(5,'0')}.jpg`,type:'jpeg',quality:90});}
await br.close();})();
