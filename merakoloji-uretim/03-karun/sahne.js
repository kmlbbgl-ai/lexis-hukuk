/* Karun'un Hazinesi — Ekonomi Serisi Bölüm 2, Banknot Gravürü, çöp adam */
const T=(l,i)=>{const a=LW[l];if(!a)return 9999;const v=a[i<0?a.length+i:i];return v==null?9999:v};
const S=(t,a,b)=>t>=a-0.4&&t<b+0.5, F=(t,a,b)=>fadeIO(t,a-0.4,b+0.5,0.4);
const RD='#C0392B',GRI=PAL.gri,SU='#6FA8C7';
function damga(x,y,txt,k,r=-10,col=RD,fs=64,w=null){if(k<=0)return '';const s=cl(k);w=w||txt.length*fs*0.62+60;
 return `<g transform="translate(${x},${y}) rotate(${r}) scale(${1+1.3*(1-out3(s))})" opacity="${s*.95}"><rect x="${-w/2}" y="${-fs*0.85}" width="${w}" height="${fs*1.5}" rx="12" fill="#FFF8E7" fill-opacity=".85" stroke="${col}" stroke-width="8"/><text y="${fs*0.32}" text-anchor="middle" font-family="Inter Display" font-weight="900" font-size="${fs}" fill="${col}">${txt}</text></g>`}
function balon(x,y,txt,k,fs=40,w=null,kuy=1){if(k<=0)return '';w=w||txt.length*fs*0.55+80;
 return `<g transform="translate(${x},${y}) scale(${back(cl(k))})"><rect x="${-w/2}" y="-60" width="${w}" height="110" rx="26" fill="#fff" stroke="${INK}" stroke-width="5"/><path d="M ${-30*kuy} 48 l ${-20*kuy} 50 l ${50*kuy} -50" fill="#fff" stroke="${INK}" stroke-width="5"/><rect x="${-36*kuy-(kuy<0?-6:6)}" y="40" width="60" height="14" fill="#fff"/><text y="12" text-anchor="middle" font-family="Bitstream Charter" font-style="italic" font-weight="bold" font-size="${fs}" fill="${G}">${txt}</text></g>`}
function etiket(x,y,txt,k,fs=40,col=G){if(k<=0)return '';const w=txt.length*fs*0.66+60;return `<g transform="translate(${x},${y}) scale(${back(cl(k))})"><rect x="${-w/2}" y="${-fs*0.8}" width="${w}" height="${fs*1.45}" rx="10" fill="${col}" stroke="${INK}" stroke-width="4"/><text y="${fs*0.3}" text-anchor="middle" font-family="Inter" font-weight="800" font-size="${fs}" letter-spacing="2" fill="${P}">${txt}</text></g>`}
// --- çizimler ---
function harita(x,y,s,rot=0,k=1){return `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})"><path d="M -260 -170 l 90 20 l 90 -20 l 90 20 l 90 -20 l 0 340 l -90 20 l -90 -20 l -90 20 l -90 -20 z" fill="#F3E3B5" stroke="${INK}" stroke-width="6"/><path d="M -170 -150 v 340 M -80 -170 v 340 M 10 -150 v 340 M 100 -170 v 340" stroke="#d9c48f" stroke-width="3"/><path d="M -210 110 q 60 -120 140 -40 t 150 -60 q 40 -30 90 -90" fill="none" stroke="${RD}" stroke-width="7" stroke-dasharray="${20*k} 18"/><path d="M 150 -120 l 40 40 M 190 -120 l -40 40" stroke="${RD}" stroke-width="12" stroke-linecap="round"/><path d="M -230 -120 q 20 -30 50 0 q 30 30 60 0" fill="none" stroke="${SU}" stroke-width="6"/></g>`}
function muze(x,y,s,label,k=1){if(k<=0)return '';return `<g transform="translate(${x},${y}) scale(${s*back(cl(k))})"><path d="M -280 -260 L 0 -390 L 280 -260 Z" fill="${P}" stroke="${INK}" stroke-width="7"/><rect x="-290" y="-262" width="580" height="34" fill="${AU}" stroke="${INK}" stroke-width="6"/>${[-220,-110,0,110,220].map(c=>`<rect x="${c-26}" y="-228" width="52" height="200" fill="#FFF8E7" stroke="${INK}" stroke-width="5"/><line x1="${c-10}" y1="-220" x2="${c-10}" y2="-36" stroke="#d6c69c" stroke-width="4"/><line x1="${c+10}" y1="-220" x2="${c+10}" y2="-36" stroke="#d6c69c" stroke-width="4"/>`).join('')}<rect x="-320" y="-30" width="640" height="34" fill="${G}" stroke="${INK}" stroke-width="6"/><rect x="-350" y="4" width="700" height="30" fill="${G2}" stroke="${INK}" stroke-width="6"/><text y="-415" text-anchor="middle" font-family="Inter" font-weight="900" font-size="38" letter-spacing="6" fill="${G}">${label}</text></g>`}
function inek(x,y,s,yarim=0,flip=1){const kesik=yarim>0;return `<g transform="translate(${x},${y}) scale(${s*flip},${s})"><g>${kesik?`<clipPath id="ik"><rect x="-10" y="-200" width="200" height="300"/></clipPath>`:''}<g ${kesik?'clip-path="url(#ik)"':''}><rect x="-110" y="-150" width="230" height="110" rx="45" fill="#fff" stroke="${INK}" stroke-width="6"/><ellipse cx="-40" cy="-110" rx="30" ry="22" fill="${INK}"/><ellipse cx="60" cy="-80" rx="24" ry="20" fill="${INK}"/>${[-85,-45,65,100].map(l=>`<rect x="${l-8}" y="-50" width="16" height="50" fill="#fff" stroke="${INK}" stroke-width="5"/>`).join('')}<ellipse cx="150" cy="-150" rx="44" ry="34" fill="#fff" stroke="${INK}" stroke-width="6"/><ellipse cx="172" cy="-138" rx="24" ry="16" fill="#F2A7B8" stroke="${INK}" stroke-width="4"/><path d="M 120 -182 l -14 -26 M 168 -182 l 10 -26" stroke="${INK}" stroke-width="6" stroke-linecap="round"/></g>${kesik?`<path d="M -10 -160 v 170" stroke="${RD}" stroke-width="6" stroke-dasharray="14 10"/>`:''}</g></g>`}
function sikke(x,y,s,o={}){const col=o.col||AU,r=o.rot||0;const sx=Math.cos(o.spin||0);return `<g transform="translate(${x},${y}) rotate(${r}) scale(${s*sx},${s})"><path d="M -110 -10 q -10 -90 70 -110 q 90 -10 140 60 q 30 90 -40 150 q -100 50 -160 -30 z" fill="${col}" stroke="${INK}" stroke-width="7"/><path d="M -80 -10 q -6 -60 50 -80 q 70 -6 100 44 q 20 66 -30 104 q -70 36 -114 -20 z" fill="none" stroke="${INK}" stroke-width="2.5" stroke-dasharray="4 6"/>${o.txt?`<text y="22" text-anchor="middle" font-family="Bitstream Charter" font-weight="bold" font-size="56" fill="${INK}">${o.txt}</text>`:aslan()}</g>`}
function aslan(){return `<g transform="translate(-6,4)"><path d="M -40 -6 q -20 -50 30 -60 q 50 0 50 40 q 30 10 30 40 q -20 30 -50 20 q -30 30 -60 0 q -30 -10 -20 -40 z" fill="#E7B53C" stroke="${INK}" stroke-width="5"/>${[...Array(9)].map((_,i)=>{const a=-2.6+i*0.48;return `<path d="M ${-10+Math.cos(a)*44} ${-14+Math.sin(a)*44} l ${Math.cos(a)*22} ${Math.sin(a)*22}" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`}).join('')}<circle cx="4" cy="-26" r="6" fill="${INK}"/><path d="M 20 20 q 22 10 40 0" stroke="${INK}" stroke-width="5" fill="none"/></g>`}
function nehir(y,h,col,t,parilti=0,etk=''){let o=`<path d="M 0 ${y} ${[...Array(9)].map((_,i)=>`Q ${i*240+120} ${y+Math.sin(t*1.4+i)*18-24} ${i*240+240} ${y}`).join(' ')} V ${y+h} H 0 Z" fill="${col}" stroke="${INK}" stroke-width="5"/>`;
 for(let i=0;i<14;i++){const xx=((i*150+t*90)%2040)-60,yy=y+30+(i%4)*h/5;o+=`<path d="M ${xx} ${yy} q 20 -10 40 0 q 20 10 40 0" fill="none" stroke="#fff" stroke-width="4" opacity=".55"/>`}
 if(parilti>0)for(let i=0;i<40;i++){const xx=((i*61+t*70)%2000)-40,yy=y+20+rnd(i)*(h-40),f=0.5+0.5*Math.sin(t*6+i);o+=`<path d="M ${xx} ${yy-12} l 4 8 l 10 4 l -10 4 l -4 8 l -4 -8 l -10 -4 l 10 -4 z" fill="${AU}" opacity="${parilti*f}"/>`}
 if(etk)o+=`<text x="1760" y="${y+h/2+14}" text-anchor="end" font-family="Inter" font-weight="900" font-size="40" letter-spacing="6" fill="${P}" opacity=".9">${etk}</text>`;return o}
function tapinak(x,y,s){return `<g transform="translate(${x},${y}) scale(${s})"><path d="M -230 -330 L 0 -430 L 230 -330 Z" fill="#E9DDBF" stroke="${INK}" stroke-width="7"/>${[-170,-60,60,170].map(c=>`<rect x="${c-22}" y="-330" width="44" height="300" fill="#F6EED8" stroke="${INK}" stroke-width="5"/>`).join('')}<rect x="-260" y="-36" width="520" height="40" fill="#d9cba5" stroke="${INK}" stroke-width="6"/><text y="-360" text-anchor="middle" font-family="Inter" font-weight="900" font-size="30" letter-spacing="6" fill="${G}">DELFİ</text></g>`}
function duman(x,y,t,op=1){let o='';for(let i=0;i<6;i++){const k=((t*0.4+i/6)%1);o+=`<circle cx="${x+Math.sin(i*2+t)*30}" cy="${y-k*260}" r="${40+k*60}" fill="#F7F1E1" stroke="#b9b2a0" stroke-width="3" opacity="${op*(1-k)*.8}"/>`}return o}
function tumulus(x,y,s,kazi=0){return `<g transform="translate(${x},${y}) scale(${s})"><path d="M -420 0 Q 0 -330 420 0 Z" fill="#9C8452" stroke="${INK}" stroke-width="7"/><path d="M -300 -40 q 60 -30 120 -10 M 100 -120 q 60 -10 110 30" stroke="#7d6a40" stroke-width="5" fill="none"/>${kazi>0?`<path d="M -70 -150 q 70 ${60*kazi} 140 0 z" fill="#3a2b17" stroke="${INK}" stroke-width="5"/>`:''}</g>`}
function gemi(x,y,s,yuk=''){return `<g transform="translate(${x},${y}) scale(${s})"><path d="M -200 -40 h 400 l -60 80 h -280 z" fill="#6B4A2B" stroke="${INK}" stroke-width="6"/><rect x="-6" y="-260" width="12" height="220" fill="${INK}"/><path d="M 10 -250 q 120 90 0 190 z" fill="#FFF8E7" stroke="${INK}" stroke-width="5"/>${yuk}</g>`}
function sandik(x,y,s,acik=0){return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-110" y="-70" width="220" height="110" rx="10" fill="#8A5A2B" stroke="${INK}" stroke-width="6"/><rect x="-20" y="-60" width="40" height="40" fill="${AU}" stroke="${INK}" stroke-width="4"/><g transform="translate(0,-70) rotate(${-acik*35} -110 0)"><path d="M -110 0 q 0 -70 110 -70 q 110 0 110 70 z" fill="#A06A35" stroke="${INK}" stroke-width="6"/></g>${acik>0?`<g opacity="${acik}">${[...Array(7)].map((_,i)=>`<circle cx="${-80+i*27}" cy="${-80-Math.sin(i)*20}" r="18" fill="${AU}" stroke="${INK}" stroke-width="3"/>`).join('')}</g>`:''}</g>`}
function denizati(x,y,s,sahte=0){const c=sahte?'#b9b39a':AU,c2=sahte?'#a39d84':'#E7B53C';return `<g transform="translate(${x},${y}) scale(${s})"><path d="M -20 -150 q 70 -20 70 40 q 0 40 -30 60 q 50 30 30 90 q -20 50 -60 40 q -30 -10 -10 -40 q 20 -10 10 -30 q -50 -30 -40 -90 q -40 0 -60 -30 q 40 -30 90 -40 z" fill="${c}" stroke="${INK}" stroke-width="6"/><path d="M -10 -60 q -140 -80 -160 30 q 70 -10 110 20 M -10 -40 q -100 -10 -120 70 q 60 -30 100 -10" fill="${c2}" stroke="${INK}" stroke-width="5"/><circle cx="10" cy="-120" r="8" fill="${INK}"/>${[[-60,-170],[30,-30],[-150,-10]].map(([a,b],i)=>`<circle cx="${a}" cy="${b}" r="10" fill="${sahte?'#c9c3aa':'#8CC6EE'}" stroke="${INK}" stroke-width="3"/>`).join('')}<path d="M -20 70 q 10 30 -10 50" stroke="${c2}" stroke-width="10" fill="none"/></g>`}
function kutu(x,y,s,yil){return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-130" y="-90" width="260" height="170" rx="10" fill="#C9A46B" stroke="${INK}" stroke-width="6"/><path d="M -130 -20 h 260 M 0 -90 v 170" stroke="#8a6a3a" stroke-width="10"/><circle cx="0" cy="-20" r="36" fill="${RD}" stroke="${INK}" stroke-width="5"/><text y="-8" text-anchor="middle" font-family="Inter" font-weight="900" font-size="30" fill="#FFF8E7">TR</text><text y="62" text-anchor="middle" font-family="Inter" font-weight="900" font-size="34" fill="${INK}">${yil}</text></g>`}
function tokmak(x,y,s,a){return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-90" y="20" width="180" height="30" rx="6" fill="#6B4A2B" stroke="${INK}" stroke-width="5"/><g transform="rotate(${a} 60 -40)"><rect x="-70" y="-70" width="120" height="56" rx="10" fill="#8A5A2B" stroke="${INK}" stroke-width="5"/><rect x="-14" y="-14" width="28" height="120" fill="#8A5A2B" stroke="${INK}" stroke-width="5" transform="rotate(-50 0 -40)"/></g></g>`}
function klaket(x,y,s,a){return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-150" y="-60" width="300" height="180" fill="${INK}" stroke="${INK}" stroke-width="5"/><text y="40" text-anchor="middle" font-family="Inter" font-weight="900" font-size="44" fill="#fff">SAHNE 1</text><text y="96" text-anchor="middle" font-family="Inter" font-weight="700" font-size="28" fill="#ddd">KARUN · ÇEKİM</text><g transform="rotate(${-a} -150 -60)"><rect x="-150" y="-100" width="300" height="40" fill="#fff" stroke="${INK}" stroke-width="5"/>${[0,1,2,3,4].map(i=>`<path d="M ${-140+i*60} -100 l 30 0 l -20 40 l -30 0 z" fill="${INK}"/>`).join('')}</g></g>`}
function anadolu(x,y,s,op=1){return `<g transform="translate(${x},${y}) scale(${s})" opacity="${op}"><path d="M -470 -60 q 30 -80 120 -90 q 80 -50 200 -40 q 120 -40 260 -20 q 120 -10 220 10 q 60 30 70 90 q -40 60 -120 70 q -120 40 -260 30 q -140 30 -260 0 q -110 0 -190 -20 q -60 -10 -40 -30 z" fill="#E6D7AE" stroke="${INK}" stroke-width="6"/><path d="M -200 -160 q 200 -40 400 -10" fill="none" stroke="${SU}" stroke-width="6" opacity=".6"/></g>`}
const nok=(x,y,txt,k,col=RD)=>k<=0?'':`<g opacity="${cl(k)}"><circle cx="${x}" cy="${y}" r="${14+6*Math.sin(k*6)}" fill="${col}" stroke="${INK}" stroke-width="4"/><text x="${x}" y="${y-30}" text-anchor="middle" font-family="Inter" font-weight="900" font-size="36" fill="${INK}">${txt}</text></g>`;
// --- karakterler ---
const KARUN=(x,y,s,poz,o={})=>cop(x,y,s,Object.assign({poz,head:o.gri?GRI:PAL.hardal,c:o.gri?GRI:undefined,front:(o.tacyok?'':ES.tac())+(o.ek||''),back:ES.pelerin(o.gri?'#9a9a9a':PAL.bordo)},o.ex||{}));
const MIDAS=(x,y,s,poz,ek='')=>cop(x,y,s,{poz,head:PAL.bordo,front:ES.tac2()+ek});
const KAHIN=(x,y,s,poz)=>cop(x,y,s,{poz,head:GRI,front:ES.kapuson('#6f7270')});
const KACAKCI=(x,y,s,poz,ek='')=>cop(x,y,s,{poz,head:PAL.lacivert,front:ES.sapka('#22344d')+ek});
const AVCI=(x,y,s,poz,ek='')=>cop(x,y,s,{poz,head:PAL.kiremit,front:ES.sapka()+ek});
const CIFTCI=(x,y,s,poz,ek='')=>cop(x,y,s,{poz,head:PAL.yesil,front:ek});
const FIRINCI=(x,y,s,poz,ek='')=>cop(x,y,s,{poz,head:PAL.kiremit,front:ES.onluk('#f4f4f4')+ek});
const yuru=t=>Math.floor(t*4)%2?POZ.yuru1:POZ.yuru2, kos=t=>Math.floor(t*6)%2?POZ.kos1:POZ.kos2;
const ter=(x,y)=>`<path d="M ${x} ${y} q 12 22 0 34 q -12 -12 0 -34 z" fill="#7FD1F7" stroke="${INK}" stroke-width="3"/>`;
const soru=(x,y,k)=>k<=0?'':`<text x="${x}" y="${y}" text-anchor="middle" font-family="Bitstream Charter" font-weight="bold" font-size="${110*back(cl(k))}" fill="${B}" stroke="${INK}" stroke-width="3">?</text>`;
const altinYagmur=(t,t0,n=26)=>{if(t<t0)return '';let s='';for(let i=0;i<n;i++){const k=((t-t0)*0.5+rnd(i))%1;const x=100+rnd(i+5)*1720,y=-60+k*1200;s+=`<g transform="translate(${x},${y}) rotate(${k*400+i*30}) scale(.25)"><circle r="120" fill="${AU}" stroke="${INK}" stroke-width="14"/></g>`}return s};
const kum=(x,y,w)=>`<path d="M ${x-w/2} ${y} q ${w/2} -40 ${w} 0" fill="#d9c48f" stroke="${INK}" stroke-width="4"/>`;
// ---------- sahneler ----------
function sahne(t){let o='';
 // A1 kanca: herkes haritanın peşinde
 if(S(t,0,T(1,0))){o+=`<g opacity="${F(t,0,T(1,0)-0.2)}">`;
  o+=harita(960,420,1.3,-4,cl(t/5));
  o+=banner(960,150,pop(t,T(0,9)-0.3),'KARUN HAZİNESİ');
  const x0=-200+Math.min(t,6)*120;
  o+=AVCI(x0+260,1000,.8,kos(t),ES.harita(-120,-120))+AVCI(x0+60,1000,.8,kos(t+.1),ES.buyutec())+KACAKCI(x0-140,1000,.8,kos(t+.2),ES.fener());
  o+=`</g>`}
 // A2 gerçek mi?
 if(S(t,T(1,0),T(3,0))){o+=`<g opacity="${F(t,T(1,0),T(3,0)-0.2)}">`;
  const evet=t>T(2,1);
  o+=KARUN(560,950,1.2,evet?POZ.zipla:POZ.dur)+soru(560,330,(t-T(1,5))/0.4*(evet?0:1));
  o+=soru(1400,380,(t-T(1,9))/0.4*(t<T(2,0)?1:0));
  o+=damga(1350,330,'EVET!',(t-T(2,1))/0.3,-8,G2,96);
  o+=muze(1380,900,.85,'MÜZE',(t-T(2,7))/0.5);
  if(t>T(2,8))o+=sandik(1380,840,.6,cl((t-T(2,9))/0.6));
  o+=`</g>`}
 // A3 yaşadıkları
 if(S(t,T(3,0),T(4,0))){o+=`<g opacity="${F(t,T(3,0),T(4,0)-0.2)}">`;
  const ik=[[T(3,5),'KAÇAKÇILAR',KACAKCI(0,150,.6,POZ.dur,ES.fener()+ES.kurek())],[T(3,6),'NEW YORK',`<g transform="translate(0,40) scale(.55)">${muze(0,120,.7,'',1)}</g>`],[T(3,10),'SAHTE BROŞ',denizati(0,30,.75,1)],[T(3,14),'KOVALAMACA',KACAKCI(-50,150,.5,kos(t),ES.fener())+cop(70,150,.5,{poz:kos(t+.1),head:PAL.lacivert,front:ES.polis()})]];
  ik.forEach(([a,lb,ic],i)=>{const k=pop(t,a);if(k<=0)return;const x=330+i*420;o+=`<g transform="translate(${x},470) scale(${k})"><rect x="-180" y="-230" width="360" height="400" rx="18" fill="#FFF8E7" stroke="${G}" stroke-width="6"/>${ic}<rect x="-180" y="110" width="360" height="60" fill="${G}"/><text y="152" text-anchor="middle" font-family="Inter" font-weight="900" font-size="32" letter-spacing="3" fill="${AU}">${lb}</text></g>`});
  o+=damga(960,860,'SENARİSTLER KISKANDI',(t-T(3,19))/0.3,-4,B,60);
  o+=`</g>`}
 // B Karun = Kroisos
 if(S(t,T(4,0),T(6,0))){o+=`<g opacity="${F(t,T(4,0),T(6,0)-0.2)}">`;
  const zengin=t>T(5,0);
  if(!zengin){o+=anadolu(1270,520,1.05,cl((t-T(4,12))/0.6));o+=nok(1000,540,'SARDES',(t-T(4,16))/0.4);o+=nok(1000,540,'',0);
   if(t>T(4,13))o+=`<text x="1000" y="610" text-anchor="middle" font-family="Inter" font-weight="700" font-size="30" fill="${G}" opacity="${cl((t-T(4,13))/0.4)}">Manisa · Salihli</text>`;
   o+=etiket(1270,250,'≈ 2.500 YIL ÖNCE',(t-T(4,5))/0.4,40,B)}
  else{for(let i=0;i<12;i++){const k=pop(t,T(5,0)+i*0.12);if(k>0)o+=`<g transform="translate(${1050+(i%4)*200},${940-Math.floor(i/4)*90}) scale(${k*.45})"><circle r="120" fill="${AU}" stroke="${INK}" stroke-width="12"/></g>`}
   o+=etiket(1350,330,'DEYİM: “KARUN KADAR ZENGİN”',(t-T(5,12))/0.4,40,B)}
  o+=KARUN(480,960,1.35,zengin?POZ.omuzsilk:POZ.dur);
  o+=banner(480,190,pop(t,T(4,2)),'LİDYA KRALI KROİSOS');
  o+=`</g>`}
 // C altın nereden: soru + nehir + Midas
 if(S(t,T(6,0),T(10,0))){o+=`<g opacity="${F(t,T(6,0),T(10,0)-0.2)}">`;
  const altinSu=t>T(8,17);
  o+=`<path d="M 0 600 L 300 300 L 520 520 L 760 260 L 1060 560 L 1300 330 L 1600 560 L 1920 380 V 700 H 0 Z" fill="#cfc19a" stroke="${INK}" stroke-width="5" opacity="${cl((t-T(7,0))/0.5)}"/>`;
  if(t>T(7,0)-0.4)o+=nehir(700,250,altinSu?'#D9B44A':SU,t,t>T(7,12)?cl((t-T(7,12))/0.6):0,'PAKTOLOS · SART ÇAYI');
  if(t<T(7,0))o+=qmark(960,500,back((t-T(6,0))/0.4)*1.1);
  if(t>T(8,0)-0.3&&t<T(9,0)){const yik=t>T(8,11)&&t<T(8,17);o+=MIDAS(900,760,1.1,yik?POZ.kucakla:POZ.goster,`<g transform="translate(150,-280)">${t<T(8,11)?`<circle r="40" fill="${AU}" stroke="${INK}" stroke-width="5"/><path d="M 0 -40 q 10 -30 30 -30" stroke="${INK}" stroke-width="5" fill="none"/>`:''}</g>`);
   o+=banner(960,170,pop(t,T(8,7)),'EFSANE: KRAL MİDAS');
   if(yik)for(let i=0;i<8;i++)o+=`<circle cx="${880+Math.sin(t*9+i)*60}" cy="${640+((t*200+i*40)%150)}" r="8" fill="${AU}"/>`}
  if(t>T(9,0)-0.3){o+=damga(700,300,'EFSANE',(t-T(9,0))/0.3,-8,GRI,70);o+=damga(1250,320,'ALTIN GERÇEK ✓',(t-T(9,4))/0.3,6,G2,64)}
  o+=`</g>`}
 // D takas
 if(S(t,T(10,0),T(12,0))){o+=`<g opacity="${F(t,T(10,0),T(12,0)-0.2)}">`;
  if(t<T(11,0)){o+=sikke(960,520,1.6*back(cl((t-T(10,13))/0.5)),{spin:t*2});o+=banner(960,170,pop(t,T(10,11)),'İCAT: MADENİ PARA');
   if(t<T(10,13))o+=qmark(960,520,back((t-T(10,0))/0.4))}
  else{o+=banner(960,170,pop(t,T(11,3)),'ÖNCE: TAKAS');
   const yarim=t>T(11,16);
   o+=CIFTCI(420,960,1.0,POZ.goster)+inek(620,960,.9,yarim?1:0);
   const hayir=t>T(11,10)&&t<T(11,16);const p=hayir&&Math.floor(t*5)%2?{la:[[-60,-160],[-90,-110]],ra:[[60,-160],[90,-110]],ll:[[-40,0]],rl:[[40,0]]}:POZ.dur;
   o+=FIRINCI(1450,960,1.0,p,loaf?`<g transform="translate(-120,-180) scale(.55)">${loaf(0,0,1)}</g>`:'');
   o+=balon(1000,300,'1 inek = kaç ekmek?',(t-T(11,5))/0.3,46);
   if(hayir)o+=balon(1450,420,'İneğe ihtiyacım yok!',(t-T(11,10))/0.3,38);
   o+=damga(960,420,'YARIM İNEK?!',(t-T(11,16))/0.3,-6,RD,66)}
  o+=`</g>`}
 // E Herodot, elektrum
 if(S(t,T(12,0),T(14,0))){o+=`<g opacity="${F(t,T(12,0),T(14,0)-0.2)}">`;
  if(t<T(13,0)){o+=banner(960,170,pop(t,T(12,0)),"HERODOT'A GÖRE");
   o+=etiket(960,330,'İLK PARA: LİDYALILAR',(t-T(12,12))/0.4,44,G);
   const k=cl((t-T(12,15))/0.6);
   o+=sikke(960,640,1.2*back(k),{col:'#E3C76A',spin:Math.sin(t*1.5)*.4});
   if(t>T(12,18))o+=etiket(960,880,'ELEKTRUM = ALTIN + GÜMÜŞ',(t-T(12,18))/0.4,40,G);
   if(t>T(12,26))o+=`<circle cx="960" cy="640" r="${170+10*Math.sin(t*6)}" fill="none" stroke="${RD}" stroke-width="6" stroke-dasharray="14 10"/><text x="1210" y="560" font-family="Inter" font-weight="900" font-size="42" fill="${RD}">← ASLAN BAŞI</text>`}
  else{const deg=['%70?','%55?','%80?'];deg.forEach((d,i)=>{const k=pop(t,T(13,4)+i*0.2);if(k>0)o+=sikke(560+i*400,470,.9*k,{col:['#E3C76A','#D7CDA0','#E9B93A'][i],txt:d})});
   const kas=t>T(13,9);o+=cop(960,1000,.9,{poz:kas?{la:[[-50,-160],[-60,-100]],ra:[[70,-280],[20,-330]],ll:[[-40,0]],rl:[[40,0]]}:POZ.dur,head:PAL.yesil,front:ES.poset()});
   o+=soru(1080,650,(t-T(13,9))/0.3)}
  o+=`</g>`}
 // F saf altın, kral damgası, güven
 if(S(t,T(14,0),T(17,0))){o+=`<g opacity="${F(t,T(14,0),T(17,0)-0.2)}">`;
  if(t<T(16,0)){o+=banner(960,160,pop(t,T(14,6)),'BÜYÜK YENİLİK');
   const ay=cl((t-T(14,10))/0.8);
   o+=sikke(960-ay*320,520,1.0,{col:'#E3C76A'});
   if(ay>0)o+=sikke(960+ay*320,520,1.0,{col:'#D9DCE0'});
   if(t>T(14,12))o+=etiket(640,750,'SAF ALTIN',(t-T(14,12))/0.3,40,'#9a7a1c')+etiket(1280,750,'SAF GÜMÜŞ',(t-T(14,15))/0.3,40,GRI);
   if(t>T(15,0)-0.3){o+=damga(960,520,'KRAL DAMGASI',(t-T(15,3))/0.3,-10,B,52);
    o+=KARUN(1620,1000,.85,POZ.parmak)+balon(1300,380,'"Değerini ben garanti ediyorum."',(t-T(15,8))/0.3,38,null,-1)}}
  else{o+=etiket(960,330,'PARA = GÜVEN BELGESİ',(t-T(16,4))/0.4,52,G);
   o+=bigNote?'':'';o+=sikke(960,640,1.1*back(cl((t-T(16,9))/0.5)),{});
   o+=damga(960,860,'İLK DAMGA: MANİSA',(t-T(16,14))/0.3,-6,B,56)}
  o+=`</g>`}
 // G soy ağacı
 if(S(t,T(17,0),T(18,0))){o+=`<g opacity="${F(t,T(17,0),T(18,0)-0.2)}">`;
  const sz=[['1 ₺',T(17,1),'#D9DCE0'],['',T(17,4),'#E3C76A'],['',T(17,5),'#E3C76A'],['',T(17,6),'#E3C76A']];
  sz.forEach(([tx,a,c],i)=>{const k=pop(t,a);if(k<=0)return;const x=300+i*440;o+=sikke(x,520,.9*k,{col:c,txt:tx||null,spin:0});if(i>0)o+=`<path d="M ${x-300} 520 h 150" stroke="${INK}" stroke-width="8" marker-end="url(#ok)"/><path d="M ${x-160} 500 l 20 20 l -20 20" stroke="${INK}" stroke-width="8" fill="none"/>`;
   o+=`<text x="${x}" y="760" text-anchor="middle" font-family="Inter" font-weight="800" font-size="32" fill="${G}">${['bugün','dede','büyük dede','büyük büyük dede'][i]}</text>`});
  o+=damga(1620,300,'MANİSALI!',(t-T(17,8))/0.3,-8,B,70);
  o+=`</g>`}
 // H Delfi kehaneti
 if(S(t,T(18,0),T(22,0))){o+=`<g opacity="${F(t,T(18,0),T(22,0)-0.2)}">`;
  if(t<T(20,0)){o+=banner(960,160,pop(t,T(18,13)),'PERS SAVAŞI ÖNCESİ');
   o+=tapinak(1350,960,1.1*back(cl((t-T(18,18))/0.5)))+duman(1350,820,t,cl((t-T(18,19))/0.5));
   if(t>T(18,19))o+=KAHIN(1350,960,.9,t>T(19,0)?POZ.parmak:POZ.dur);
   o+=KARUN(520,960,1.1,t>T(18,21)?POZ.kucakla:POZ.dur);
   if(t>T(19,3)-0.2)o+=balon(1000,300,'"Halys\'i geçersen büyük bir imparatorluk yıkılacak."',(t-T(19,3))/0.35,36);
   if(t>T(19,6))o+=etiket(1000,440,'HALYS = KIZILIRMAK',(t-T(19,6))/0.3,32,SU==='x'?G:'#2E4A6B')}
  else{const gec=cl((t-T(20,2))/1.0),yik=t>T(20,10),kendi=t>T(20,11);
   o+=nehir(840,140,SU,t,0,'HALYS · KIZILIRMAK');
   const x=300+gec*850,y=830-Math.sin(gec*Math.PI)*120;
   o+=KARUN(x,gec>0&&gec<1?y:830,1.0,kendi?POZ.uzgun:t<T(20,2)?POZ.zipla:kos(t),{gri:kendi,tacyok:kendi});
   if(kendi){const k=cl((t-T(20,11))/0.6);o+=`<g transform="translate(${x+70+k*90},${830-356+k*330}) rotate(${k*140}) translate(0,356)">${ES.tac()}</g>`}
   o+=damga(960,300,yik&&!kendi?'İMPARATORLUK YIKILDI!':'KENDİ İMPARATORLUĞU!',(t-T(20,8))/0.3*(t<T(21,0)?1:0),-6,RD,58);
   if(t>T(21,0)-0.3){o+=KAHIN(1650,830,.8,POZ.omuzsilk);o+=etiket(960,300,'KEHANET: DOĞRU ✓',(t-T(21,0))/0.3,44,G2);o+=balon(1450,480,'Hangisi olduğunu söylemedim…',(t-T(21,3))/0.3,34,null,-1)}}
  o+=`</g>`}
 // I organize iş: kaçak kazı
 if(S(t,T(22,0),T(24,0))){o+=`<g opacity="${F(t,T(22,0),T(24,0)-0.2)}">`;
  o+=`<rect x="0" y="0" width="1920" height="1080" fill="#1b2a3a" opacity="${.45*cl((t-T(23,0))/0.6)}"/>`;
  o+=banner(960,150,pop(t,T(22,5)),'ORGANİZE İŞ');
  if(t>T(23,0)-0.3){o+=etiket(960,260,"1960'LAR · UŞAK",(t-T(23,0))/0.4,40,B);
   o+=`<circle cx="1650" cy="230" r="70" fill="#F3E3B5" opacity=".9"/>`;
   o+=tumulus(960,960,1.4,cl((t-T(23,8))/0.8));
   const kaz=Math.floor(t*3)%2;
   o+=KACAKCI(700,880,.85,kaz?POZ.kucakla:POZ.goster,ES.kurek())+KACAKCI(1240,880,.85,POZ.dur,ES.fener());
   for(let i=0;i<10;i++){const k=pop(t,T(23,14)+i*0.12);if(k>0)o+=`<g transform="translate(${760+i*44},${700-Math.sin(i)*30-k*40}) scale(${k*.22})"><circle r="120" fill="${i%3?AU:'#D9DCE0'}" stroke="${INK}" stroke-width="16"/></g>`}
   if(t>T(23,21)){const k=cl((t-T(23,21))/1.2);o+=gemi(800+k*1300,1010,.7,sandik(0,-60,.6,0));o+=etiket(1500,420,'YURT DIŞINA →',(t-T(23,22))/0.3,40,RD)}}
  else o+=sandik(960,620,1.2,cl((t-T(22,3))/0.6));
  o+=`</g>`}
 // J New York, dava, dönüş
 if(S(t,T(24,0),T(27,0))){o+=`<g opacity="${F(t,T(24,0),T(27,0)-0.2)}">`;
  if(t<T(25,5)){o+=skyline(.8)+nehir(820,260,'#4f86a6',t,0,'ATLANTİK');
   o+=muze(960,780,.9,'METROPOLİTAN MÜZESİ',(t-T(24,7))/0.5);
   if(t>T(24,9))o+=sandik(960,720,.6,1);
   if(t>T(25,0)-0.3){o+=balon(560,330,'Eserlerimizi geri verin!',(t-T(25,0))/0.3,40);o+=damga(1420,360,'OLMADI.',(t-T(25,4))/0.3,8,GRI,70)}}
  else if(t<T(26,0)){o+=calendar(500,520,1.0,'1987','DAVA','',0)+tokmak(1350,640,1.4,Math.max(0,Math.sin((t-T(25,13))*9))*-25*(t>T(25,13)?1:0));
   o+=etiket(1350,330,'TÜRKİYE → MÜZE: DAVA',(t-T(25,11))/0.3,40,B)}
  else{const k=cl((t-T(26,9))/1.5);o+=scaleBal(560,700,.9,Math.sin(t*2)*0.5*(1-k)+(-0.6*k),'','');
   o+=etiket(560,250,'YILLAR SÜREN DAVA',(t-T(26,0))/0.3,40,G);
   o+=nehir(860,220,'#4f86a6',t,0,'');o+=gemi(1900-k*700,940,.8,sandik(0,-60,.6,0));
   o+=damga(1350,330,'1993: EVE DÖNÜŞ ✓',(t-T(26,10))/0.3,-6,G2,60)}
  o+=`</g>`}
 // K broş
 if(S(t,T(27,0),T(30,0))){o+=`<g opacity="${F(t,T(27,0),T(30,0)-0.2)}">`;
  if(t<T(28,0)){o+=qmark(960,520,back((t-T(27,0))/0.4));}
  else if(t<T(29,0)){const sahte=t>T(28,14);
   o+=`<rect x="660" y="260" width="600" height="560" rx="20" fill="#dfeef2" fill-opacity=".5" stroke="${INK}" stroke-width="6"/><rect x="620" y="820" width="680" height="120" fill="${G}" stroke="${INK}" stroke-width="6"/>`;
   o+=denizati(960,600,1.5*back(cl((t-T(28,4))/0.5)),sahte?1:0);
   o+=etiket(960,180,'KANATLI DENİZATI BROŞU',(t-T(28,8))/0.3,40,AU==='x'?G:B);
   if(t>T(28,11)){const k=cl((t-T(28,11))/1.0);o+=KACAKCI(1500-k*300*(t<T(28,14)?1:0),960,.9,kos(t),ES.fener())}
   o+=damga(960,560,'ÇALINDI!',(t-T(28,13))/0.3*(t<T(28,14)?1:0),-8,RD,80);
   if(sahte)o+=damga(1280,380,'SAHTE!',(t-T(28,16))/0.3,10,RD,70)}
  else{o+=cop(500,980,1.0,{poz:POZ.goster,head:PAL.lacivert,front:ES.polis()+ES.buyutec()});
   if(t<T(29,13)){o+=`<path d="M 900 300 q 120 -60 260 -10 q 120 50 240 20 q 60 60 30 160 q -100 100 -220 120 q -160 30 -300 -40 q -60 -100 -10 -250 z" fill="#E6D7AE" stroke="${INK}" stroke-width="6" opacity="${cl((t-T(29,5))/0.5)}"/>`;o+=nok(1170,420,'ALMANYA',(t-T(29,7))/0.4)}
   else{const k=cl((t-T(29,17))/1.2);o+=kutu(1200+k*200,600-Math.sin(k*Math.PI)*100,1.3*back(cl((t-T(29,14))/0.4)),'2013');o+=etiket(1300,300,'MÜHÜRLÜ KUTUYLA EVE',(t-T(29,14))/0.3,40,G2)}}
  o+=`</g>`}
 // L özet + dizi
 if(S(t,T(30,0),T(31,0))){o+=`<g opacity="${F(t,T(30,0),T(31,0)-0.2)}">`;
  const li=[['Kaçakçılık',T(30,0)],['Dünya müzesi',T(30,1)],['Yıllar süren dava',T(30,4)],['Sahte kopya',T(30,8)],['Uluslararası kovalamaca',T(30,12)]];
  o+=`<rect x="200" y="160" width="860" height="760" rx="16" fill="#FFFBEF" stroke="${INK}" stroke-width="6"/><text x="630" y="250" text-anchor="middle" font-family="Inter" font-weight="900" font-size="40" letter-spacing="8" fill="${B}">SENARYO</text>`;
  li.forEach(([s,a],i)=>{if(t>a){const k=cl((t-a)/0.3);o+=`<g opacity="${k}"><text x="270" y="${370+i*120}" font-family="Inter" font-weight="900" font-size="56" fill="${G2}">✓</text><text x="350" y="${370+i*120}" font-family="Bitstream Charter" font-weight="bold" font-size="50" fill="${G}">${s}</text></g>`}});
  if(t>T(30,15)-0.3){o+=klaket(1450,520,1.3*back(cl((t-T(30,15))/0.4)),Math.max(0,25-(t-T(30,20))*120));o+=damga(1450,840,'DİZİSİ ÇEKİLMELİ',(t-T(30,20))/0.3,-6,RD,52)}
  o+=`</g>`}
 // M müze bileti
 if(S(t,T(31,0),T(33,0))){o+=`<g opacity="${F(t,T(31,0),T(33,0)-0.2)}">`;
  if(t<T(32,0)){o+=muze(960,900,1.2,'UŞAK ARKEOLOJİ MÜZESİ',(t-T(31,0))/0.5);o+=sandik(960,820,.7,cl((t-T(31,6))/0.6))}
  else{o+=`<line x1="960" y1="200" x2="960" y2="900" stroke="${G}" stroke-width="4" stroke-dasharray="14 10"/>`;
   o+=harita(480,420,.75,-6,1)+AVCI(380,980,.8,kos(t),ES.harita(-120,-120))+AVCI(600,980,.8,kos(t+.15),ES.buyutec());
   o+=etiket(480,160,'DİZİDE: HARİTAYLA',(t-T(32,1))/0.3,36,GRI);
   if(t>T(32,6)){o+=ticket(1440,420,-8,3*back(cl((t-T(32,9))/0.4)))+cop(1440,980,.95,{poz:POZ.elsalla,head:PAL.hardal,front:ES.canta()});o+=etiket(1440,160,'SEN: MÜZE BİLETİYLE',(t-T(32,6))/0.3,36,G2)}
   o+=damga(960,620,'ORGANİZE OLMANA GEREK YOK',(t-T(32,15))/0.3,-4,B,46)}
  o+=`</g>`}
 // N yorum
 if(S(t,T(33,0),V.END-4.4)){o+=`<g opacity="${F(t,T(33,0),V.END-4.6)}">`;
  o+=`<g transform="translate(960,400) scale(${pop(t,T(33,0))})"><rect x="-600" y="-160" width="1200" height="320" rx="24" fill="#fff" stroke="${INK}" stroke-width="6"/><circle cx="-490" cy="-60" r="50" fill="${PAL.altin}" stroke="${INK}" stroke-width="5"/><text x="-410" y="-50" font-family="Inter" font-weight="800" font-size="40" fill="${INK}">Yorum ekle…</text><text x="-410" y="40" font-family="Inter" font-weight="700" font-size="40" fill="${GRI}">Karun'un hazinesini bulsan ne yapardın? 👇</text></g>`;
  o+=sandik(560,940,.9,1)+cop(820,1000,.9,{poz:POZ.zipla,head:PAL.hardal,front:ES.canta()});
  if(t>T(33,9)){o+=KAHIN(1500,1000,.9,POZ.parmak)+duman(1500,880,t,.6);o+=damga(1450,640,'KÂHİNE SORMA!',(t-T(33,10))/0.3,6,RD,52)}
  o+=`</g>`}
 // O kapanış
 if(t>V.END-4.6){const k=cl((t-(V.END-4.6))/0.5);o+=`<g opacity="${k}"><rect width="1920" height="1080" fill="${P}"/>${ros(960,520,330,80,250,6,G,.1)}
  <g transform="translate(960,470) rotate(-8) scale(${1+1.3*(1-out3(cl((t-(V.END-4.2))/0.35)))})" opacity="${cl((t-(V.END-4.2))/0.15)}"><circle r="220" fill="none" stroke="${B}" stroke-width="14"/><circle r="190" fill="none" stroke="${B}" stroke-width="3"/><text y="-60" text-anchor="middle" font-family="Inter" font-weight="800" font-size="30" letter-spacing="8" fill="${B}">MERAKOLOJİ</text><text y="30" text-anchor="middle" font-family="Bitstream Charter" font-weight="bold" font-size="64" fill="${B}">Abone ol!</text><text y="100" text-anchor="middle" font-family="Inter" font-weight="800" font-size="28" letter-spacing="4" fill="${B}">🔔 kaçırma</text></g>
  <text x="960" y="840" text-anchor="middle" font-family="Inter" font-weight="700" font-size="36" fill="${G}" opacity="${cl((t-(V.END-3.2))/0.5)}">Ekonomi Serisi · Bölüm 2</text></g>`}
 return o}
function draw(t){
 let o=DEFS+BG+`<g transform="translate(960,540) scale(${1+0.01*Math.sin(t*0.5)}) translate(-960,-540)">`+sahne(t)+`</g>`;
 if(window.SAHNE_SADECE) return o;
 o+=BORDER+`<rect width="1920" height="1080" fill="url(#vig)"/>`+subtitle(t);
 if(t<0.3)o+=`<rect width="1920" height="1080" fill="#000" opacity="${1-t/0.3}"/>`;
 if(t>V.END-0.4)o+=`<rect width="1920" height="1080" fill="#000" opacity="${cl((t-V.END+0.4)/0.4)}"/>`;
 document.getElementById('s').innerHTML=o;}
window.draw=draw;
