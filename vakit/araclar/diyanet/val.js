const fs=require('fs'),vm=require('vm');const W='/home/user/lexis-hukuk/vakit/www/';
const ctx={};vm.createContext(ctx);vm.runInContext(fs.readFileSync(W+'lib/adhan.umd.min.js','utf8')+';this.A=adhan;',ctx);const A=ctx.A;
const src=fs.readFileSync(W+'app.js','utf8');const FIX=eval('('+src.match(/const DIY_FIX = (\{.*?\});/)[1]+')');
const he=s=>s.replace(/&#(\d+);/g,(m,n)=>String.fromCharCode(+n));
const D=JSON.parse(fs.readFileSync(process.argv[2]));const I=JSON.parse(fs.readFileSync(W+'data/ilce.json'));
const norm=s=>he(s).toLocaleUpperCase('tr').replace(/İ/g,'I').replace(/Ş/g,'S').replace(/Ğ/g,'G').replace(/Ü/g,'U').replace(/Ö/g,'O').replace(/Ç/g,'C').replace(/Â/g,'A');
const keys=Object.fromEntries(Object.keys(I).map(k=>[norm(k),k]));const P=['fajr','sunrise','dhuhr','asr','maghrib','isha'];
const TRAIN=['İSTANBUL','ANKARA','İZMİR','VAN','EDİRNE','HATAY','TRABZON','ANTALYA','ERZURUM','SİNOP','MUĞLA','DİYARBAKIR'];
const date=new Date(2026,10,22,12);const cnt=P.map(()=>[0,0,0]);const bad=[];let n=0;
for(const [nm,v] of Object.entries(D)){if(TRAIN.includes(he(nm)))continue;const k=keys[norm(nm)];if(!k)continue;n++;
 const p=A.CalculationMethod.Turkey();p.madhab=A.Madhab.Shafi;p.rounding=A.Rounding.None;
 const pt=new A.PrayerTimes(new A.Coordinates(I[k].c[0],I[k].c[1]),date,p);
 const a=2*Math.PI*((Date.UTC(2026,10,22)-Date.UTC(2026,0,1))/864e5)/365.25;const f=[1,Math.cos(a),Math.sin(a),Math.cos(2*a),Math.sin(2*a),Math.cos(3*a),Math.sin(3*a)];
 const d=P.map((x,i)=>{const c=FIX[x].reduce((s,q,j)=>s+q*f[j],0);const t=Math.floor((pt[x].getTime()/1000+c)/60)*60;const tl=(t+3*3600)%86400;const [h,m]=v.t[i].split(':').map(Number);return (tl-(h*3600+m*60))/60;});
 d.forEach((x,i)=>{if(x===0)cnt[i][0]++;else if(Math.abs(x)===1)cnt[i][1]++;else cnt[i][2]++;});if(d.some(x=>Math.abs(x)>1))bad.push(he(nm)+' '+d.join(' '));}
console.log('test ili',n);['imsak','güneş','öğle','ikindi','akşam','yatsı'].forEach((x,i)=>console.log(x.padEnd(7),'tam',cnt[i][0],'±1',cnt[i][1],'>1',cnt[i][2]));console.log(bad.join('\n'));
