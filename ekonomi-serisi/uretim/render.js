// node render.js sahne.html sure_sn cikti_klasoru [fps]
const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const [f,dur,dir,fps0]=process.argv.slice(2);const fps=+(fps0||30);fs.mkdirSync(dir,{recursive:true});
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});
p.on('pageerror',e=>console.log('HATA',e.message));await p.goto('file://'+process.cwd()+'/'+f);
const n=Math.round(+dur*fps);for(let i=0;i<n;i++){await p.evaluate(t=>window.draw(t),i/fps);
await p.screenshot({path:`${dir}/${String(i).padStart(5,'0')}.jpg`,type:'jpeg',quality:92});}
await b.close();console.log('kare',n);})();
