// node dikey_kare.js ad bas_kare son_kare klasor   |  node dikey_kare.js ad test t1 t2...
const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const [ad,a,...r]=process.argv.slice(2);const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
p.on('pageerror',e=>console.log('HATA',e.message));await p.goto('file://'+process.cwd()+'/dikey.html');
const SP='/tmp/claude-0/-home-user-lexis-hukuk/ddfe0a26-5f62-5832-82ca-52fc14b1a58b/scratchpad/';
if(a==='test'){for(const t of r){await p.evaluate(([ad,t])=>window.dikey(ad,+t),[ad,t]);await p.screenshot({path:`${SP}d_${ad}_${t}.png`});}}
else{const [bb,dir]=r;fs.mkdirSync(dir,{recursive:true});for(let i=+a;i<+bb;i++){await p.evaluate(([ad,t])=>window.dikey(ad,t),[ad,i/30]);await p.screenshot({path:`${dir}/${String(i).padStart(5,'0')}.jpg`,type:'jpeg',quality:92});}}
await b.close();})();
