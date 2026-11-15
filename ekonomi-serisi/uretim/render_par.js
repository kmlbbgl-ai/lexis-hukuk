// node render_par.js sahne.html baş_kare son_kare klasör
const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const [f,a,b,dir]=process.argv.slice(2);fs.mkdirSync(dir,{recursive:true});
const br=await chromium.launch();const p=await br.newPage({viewport:{width:1920,height:1080}});
p.on('pageerror',e=>console.log('HATA',e.message));await p.goto('file://'+process.cwd()+'/'+f);
for(let i=+a;i<+b;i++){await p.evaluate(t=>window.draw(t),i/30);await p.screenshot({path:`${dir}/${String(i).padStart(5,'0')}.jpg`,type:'jpeg',quality:92});}
await br.close();})();
