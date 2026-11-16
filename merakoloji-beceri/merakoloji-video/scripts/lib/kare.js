// node kare.js sahne.html "#v=yt" W H çıktı_klasörü t1 t2 ...   (test kareleri)
const {chromium}=require('playwright');
(async()=>{const [f,hash,W,H,dir,...ts]=process.argv.slice(2);const b=await chromium.launch();const p=await b.newPage({viewport:{width:+W,height:+H}});
p.on('pageerror',e=>console.log('HATA',e.message));p.on('console',m=>{if(m.type()=='error')console.log('KONSOL',m.text())});
await p.goto('file://'+require('path').resolve(f)+hash);await p.waitForTimeout(150);
for(const t of ts){await p.evaluate(t=>window.draw(+t),t);await p.screenshot({path:`${dir}/k_${t}.jpg`,type:'jpeg',quality:80});}
await b.close();})();
