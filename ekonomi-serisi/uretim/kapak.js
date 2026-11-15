const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});p.on('pageerror',e=>console.log('HATA',e.message));
await p.goto('file://'+process.cwd()+'/kapak.html');for(const v of [1,2]){await p.evaluate(v=>window.kapak(v),v);await p.screenshot({path:`../cikti/kapak-${v}-buyuk.png`});}await b.close();})();
