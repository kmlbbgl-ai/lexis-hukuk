const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});p.on('pageerror',e=>console.log('HATA',e.message));
await p.goto('file://'+process.cwd()+'/karakter.html');for(const v of [1,2,3]){await p.evaluate(v=>window.ciz(v),v);await p.screenshot({path:`/home/user/lexis-hukuk/merakoloji-senaryolar/karakter/secenek-${v}.jpg`,type:'jpeg',quality:92});}await b.close();})();
