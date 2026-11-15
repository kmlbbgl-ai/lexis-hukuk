const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});p.on('pageerror',e=>console.log('HATA',e.message));
await p.goto('file://'+process.cwd()+'/kadro.html');for(const [v,n] of [[1,'ogretmenler-gunu'],[2,'karun']]){await p.evaluate(v=>window.ciz(v),v);await p.screenshot({path:`/home/user/lexis-hukuk/merakoloji-senaryolar/karakter/kadro-${n}.jpg`,type:'jpeg',quality:92});}await b.close();})();
