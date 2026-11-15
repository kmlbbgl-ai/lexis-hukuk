// Test kareleri: node kare.js sahne.html t1 t2 ... -> kare_<t>.png (ölçek 0.5 kontrol sayfası)
const {chromium}=require('playwright');
(async()=>{const [f,...ts]=process.argv.slice(2);const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});
p.on('pageerror',e=>console.log('HATA',e.message));
await p.goto('file://'+process.cwd()+'/'+f);
for(const t of ts){await p.evaluate(t=>window.draw(+t),t);await p.screenshot({path:`/tmp/claude-0/-home-user-lexis-hukuk/ddfe0a26-5f62-5832-82ca-52fc14b1a58b/scratchpad/kare_${t}.png`});}
await b.close();})();
