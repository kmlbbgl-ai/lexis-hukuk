const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});p.on('pageerror',e=>console.log('HATA',e.message));
await p.goto('file://'+process.cwd()+'/ig_kapak.html');
for(const ad of ['instagram','short1','short2','short3']){await p.evaluate(ad=>window.kapak(ad),ad);await p.screenshot({path:`../cikti/instagram-kapak-${ad}.jpg`,type:'jpeg',quality:92});}
await b.close();})();
