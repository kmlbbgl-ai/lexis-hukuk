// Diyanet yıllık takviminden her ilçe için en uygun enlem/boylamı ve ortak mevsimsel düzeltmeyi bulur.
const fs=require('fs'),vm=require('vm');const W='/home/user/lexis-hukuk/vakit/www/';
const ctx={};vm.createContext(ctx);vm.runInContext(fs.readFileSync(W+'lib/adhan.umd.min.js','utf8')+';this.A=adhan;',ctx);const A=ctx.A;
const Y=JSON.parse(fs.readFileSync(process.argv[2]));const I=JSON.parse(fs.readFileSync(W+'data/ilce.json'));
const P=['fajr','sunrise','dhuhr','asr','maghrib','isha'];
const norm=s=>s.toLocaleUpperCase('tr').replace(/İ/g,'I').replace(/Ş/g,'S').replace(/Ğ/g,'G').replace(/Ü/g,'U').replace(/Ö/g,'O').replace(/Ç/g,'C').replace(/Â/g,'A').replace(/[^A-Z]/g,'');
const ilK=Object.fromEntries(Object.keys(I).map(k=>[norm(k),k]));
const feat=a=>[1,Math.cos(a),Math.sin(a),Math.cos(2*a),Math.sin(2*a),Math.cos(3*a),Math.sin(3*a)];
const DAYS=[];for(let i=0;i<365;i+=7)DAYS.push(i);
const base=A.CalculationMethod.Turkey();base.madhab=A.Madhab.Shafi;base.rounding=A.Rounding.None;
const raw=(lat,lng,r)=>{const pt=new A.PrayerTimes(new A.Coordinates(lat,lng),new Date(Date.UTC(r[0],r[1]-1,r[2],9)),base);return P.map(x=>(pt[x].getTime()/1000+3*3600)%86400);};
const ang=r=>2*Math.PI*((Date.UTC(r[0],r[1]-1,r[2])-Date.UTC(r[0],0,1))/864e5)/365.25;
const tgt=r=>r.slice(3,9).map(s=>{const [h,m]=s.split(':').map(Number);return h*3600+m*60+30;});
// başlangıç koordinatı
const locs=[];
for(const [key,v] of Object.entries(Y)){const [il,ad]=key.split('|');const ik=ilK[norm(il)];if(!ik||!v.rows.length)continue;
  const L=I[ik];let c=null;const d=L.d.find(x=>norm(x[0])===norm(ad));if(d)c=[d[1],d[2]];else if(norm(ad)===norm(il)||/MERKEZ/.test(norm(ad)))c=L.c;else c=L.c;
  const rows=DAYS.map(i=>v.rows[i]).filter(Boolean);locs.push({key,il:ik,ad,c0:c,rows,T:rows.map(tgt),F:rows.map(r=>feat(ang(r)))});}
let FIX=JSON.parse(fs.readFileSync('fit12.json')).FIX; const SH=+(process.argv[4]||0),NS=+(process.argv[5]||1),MODE=process.argv[6]||'fit';
const cost=(L,lat,lng)=>{let s=0;L.rows.forEach((r,j)=>{const t=raw(lat,lng,r);P.forEach((x,i)=>{const c=FIX[x].reduce((a,q,k)=>a+q*L.F[j][k],0);const e=t[i]+c-L.T[j][i];s+=e*e;});});return s;};
function fitLoc(L){let [la,ln]=L.c;for(const st of [0.1,0.02,0.005]){let best=[cost(L,la,ln),la,ln];for(let a=-5;a<=5;a++)for(let b=-5;b<=5;b++){const v=cost(L,la+a*st,ln+b*st);if(v<best[0])best=[v,la+a*st,ln+b*st];}[ ,la,ln]=best;}L.c=[+la.toFixed(4),+ln.toFixed(4)];}
function solve(Aa,b){const n=Aa[0].length;const M=Array.from({length:n},(_,i)=>Array.from({length:n+1},(_,j)=>j<n?Aa.reduce((s,r)=>s+r[i]*r[j],0):Aa.reduce((s,r,k)=>s+r[i]*b[k],0)));for(let i=0;i<n;i++){let p=i;for(let k=i+1;k<n;k++)if(Math.abs(M[k][i])>Math.abs(M[p][i]))p=k;[M[i],M[p]]=[M[p],M[i]];for(let k=0;k<n;k++)if(k!==i){const f=M[k][i]/M[i][i];for(let j=i;j<=n;j++)M[k][j]-=f*M[i][j];}}return M.map((r,i)=>r[n]/r[i]);}
function refitFix(){P.forEach((x,i)=>{const X=[],b=[];for(const L of locs)L.rows.forEach((r,j)=>{const t=raw(L.c[0],L.c[1],r);X.push(L.F[j]);b.push(L.T[j][i]-t[i]);});FIX[x]=solve(X,b).map(v=>+v.toFixed(1));});}
function score(){const c=P.map(()=>[0,0,0]);for(const L of locs)L.rows.forEach((r,j)=>{const t=raw(L.c[0],L.c[1],r);P.forEach((x,i)=>{const k=FIX[x].reduce((a,q,m)=>a+q*L.F[j][m],0);const d=(Math.floor((t[i]+k)/60)*60-(L.T[j][i]-30))/60;c[i][d===0?0:Math.abs(d)===1?1:2]++;});});const N=c[0].reduce((a,b)=>a+b,0);return P.map((x,i)=>x+' tam '+(100*c[i][0]/N).toFixed(1)+'% ±1 '+(100*(c[i][0]+c[i][1])/N).toFixed(1)+'%').join(' | ');}
for(const L of locs)L.c=L.c0.slice();
if(MODE==='fit'){const mine=locs.filter((_,k)=>k%NS===SH);mine.forEach(fitLoc);fs.writeFileSync(process.argv[3],JSON.stringify(mine.map(L=>({key:L.key,c:L.c}))));process.exit(0);}
// combine: shard sonuçlarını yükle, düzeltmeyi yeniden hesapla
const got=Object.fromEntries(process.argv.slice(7).flatMap(f=>JSON.parse(fs.readFileSync(f))).map(x=>[x.key,x.c]));for(const L of locs)if(got[L.key])L.c=got[L.key];
console.log('yer',locs.length);refitFix();console.log('sonuç:',score());
const moved=locs.map(L=>({key:L.key,il:L.il,ad:L.ad,c0:L.c0,c:L.c,km:Math.round(Math.hypot((L.c[0]-L.c0[0])*111,(L.c[1]-L.c0[1])*88))}));
fs.writeFileSync(process.argv[3],JSON.stringify({FIX,locs:moved}));
moved.sort((a,b)=>b.km-a.km).slice(0,20).forEach(m=>console.log(m.key,m.km+' km'));
