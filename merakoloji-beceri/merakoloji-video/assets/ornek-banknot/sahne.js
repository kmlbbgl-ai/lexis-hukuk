/* Kasım İndirimleri — uzun video, Banknot Gravürü, çöp adam */
const T=(l,i)=>{const a=LW[l];if(!a)return 9999;const v=a[i<0?a.length+i:i];return v==null?9999:v};
const S=(t,a,b)=>t>=a-0.4&&t<b+0.5, F=(t,a,b)=>fadeIO(t,a-0.4,b+0.5,0.4);
const RD='#C0392B',GRI=PAL.gri;
// yardımcı çizimler
function ayakkabi(x,y,s,r=0){return `<g transform="translate(${x},${y}) rotate(${r}) scale(${s})"><path d="M -80 20 v -50 q 0 -24 24 -24 h 26 q 14 34 64 40 q 52 6 70 34 v 20 z" fill="#5a3a17" stroke="${INK}" stroke-width="6"/><rect x="-86" y="20" width="190" height="16" rx="6" fill="${INK}"/><path d="M -40 -40 l 30 10 M -30 -26 l 30 10" stroke="#C49A6C" stroke-width="4"/></g>`}
function damga(x,y,txt,k,r=-10,col=RD,fs=64,w=null){if(k<=0)return '';const s=cl(k);w=w||txt.length*fs*0.62+60;
 return `<g transform="translate(${x},${y}) rotate(${r}) scale(${1+1.3*(1-out3(s))})" opacity="${s*.95}"><rect x="${-w/2}" y="${-fs*0.85}" width="${w}" height="${fs*1.5}" rx="12" fill="#FFF8E7" fill-opacity=".85" stroke="${col}" stroke-width="8"/><text y="${fs*0.32}" text-anchor="middle" font-family="Inter Display" font-weight="900" font-size="${fs}" fill="${col}">${txt}</text></g>`}
function takvim(x,y,s,gun,ay,flip=0){return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-110" y="-130" width="220" height="260" rx="12" fill="#fff" stroke="${INK}" stroke-width="5"/><rect x="-110" y="-130" width="220" height="70" rx="12" fill="${B}" stroke="${INK}" stroke-width="5"/><text y="-82" text-anchor="middle" font-family="Inter" font-weight="900" font-size="34" letter-spacing="4" fill="${P}">${ay}</text><g transform="scale(1,${Math.abs(Math.cos(flip*Math.PI))})"><text y="60" text-anchor="middle" font-family="Bitstream Charter" font-weight="bold" font-size="120" fill="${G}">${gun}</text></g></g>`}
function ekran(x,y,w,h,ic){return `<g transform="translate(${x},${y})"><rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="18" fill="#1d2b3a" stroke="${INK}" stroke-width="6"/><rect x="${-w/2+16}" y="${-h/2+16}" width="${w-32}" height="${h-32}" rx="10" fill="#FFF8E7"/>${ic}</g>`}
function laptop(x,y,s,ic){return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-200" y="-150" width="400" height="250" rx="14" fill="#1d2b3a" stroke="${INK}" stroke-width="6"/><rect x="-184" y="-134" width="368" height="218" rx="6" fill="#FFF8E7"/><path d="M -250 100 h 500 l -30 30 h -440 z" fill="#8A8F8C" stroke="${INK}" stroke-width="6"/>${ic}</g>`}
function cark(x,y,s,rot){const cols=[G2,B,AU,'#2E4A6B',G2,B,AU,'#2E4A6B',G2,B];let o=`<g transform="translate(${x},${y}) scale(${s})"><g transform="rotate(${rot})">`;
 for(let i=0;i<10;i++){const a0=i*36*Math.PI/180,a1=(i+1)*36*Math.PI/180;o+=`<path d="M 0 0 L ${Math.cos(a0)*200} ${Math.sin(a0)*200} A 200 200 0 0 1 ${Math.cos(a1)*200} ${Math.sin(a1)*200} Z" fill="${cols[i]}" stroke="${INK}" stroke-width="4"/><text x="${Math.cos((a0+a1)/2)*140}" y="${Math.sin((a0+a1)/2)*140+12}" text-anchor="middle" font-family="Inter" font-weight="900" font-size="34" fill="#fff" transform="rotate(${(i+.5)*36+90} ${Math.cos((a0+a1)/2)*140} ${Math.sin((a0+a1)/2)*140})">${[10,65,0,30,100,10,65,45,5,90][i]}</text>`}
 return o+`</g><circle r="26" fill="${AU}" stroke="${INK}" stroke-width="5"/><path d="M -22 -230 h 44 l -22 44 z" fill="${RD}" stroke="${INK}" stroke-width="4"/><rect x="-14" y="200" width="28" height="140" fill="#6B4A2B" stroke="${INK}" stroke-width="4"/></g>`}
function araba(x,y,s,c){return `<g transform="translate(${x},${y}) scale(${s})"><path d="M -110 -20 v -40 l 40 -40 h 110 l 40 40 h 30 v 40 z" fill="${c}" stroke="${INK}" stroke-width="5"/><rect x="-60" y="-90" width="50" height="34" fill="#dfeef2" stroke="${INK}" stroke-width="4"/><rect x="0" y="-90" width="50" height="34" fill="#dfeef2" stroke="${INK}" stroke-width="4"/><circle cx="-60" cy="-14" r="22" fill="${INK}"/><circle cx="70" cy="-14" r="22" fill="${INK}"/></g>`}
function baslik(x,y,no,txt,k){if(k<=0)return '';return `<g transform="translate(${x},${y}) scale(${back(k)})"><rect x="-430" y="-70" width="860" height="140" rx="16" fill="${G}" stroke="${INK}" stroke-width="6"/><text y="-12" text-anchor="middle" font-family="Inter" font-weight="800" font-size="30" letter-spacing="8" fill="${AU}">${no}. TAKTİK</text><text y="48" text-anchor="middle" font-family="Bitstream Charter" font-weight="bold" font-size="56" fill="${P}">${txt}</text></g>`}
const ALISVERISCI=(x,y,s,poz,ek='',o={})=>cop(x,y,s,Object.assign({poz,head:PAL.altin,front:ES.poset()+ek},o));
const POLIS=(x,y,s,poz)=>cop(x,y,s,{poz,front:ES.polis()+ES.duduk()});
const TUCCAR=(x,y,s,poz,ek='')=>cop(x,y,s,{poz,front:ES.onluk()+ek});
const PSIKOLOG=(x,y,s,poz)=>cop(x,y,s,{poz,front:ES.onluk('#f4f4f4')+ES.gozluk()});
const yuru=t=>Math.floor(t*4)%2?POZ.yuru1:POZ.yuru2, kos=t=>Math.floor(t*6)%2?POZ.kos1:POZ.kos2;
const ter=(x,y)=>`<path d="M ${x} ${y} q 12 22 0 34 q -12 -12 0 -34 z" fill="#7FD1F7" stroke="${INK}" stroke-width="3"/>`;
const konfeti=(t,t0,x0,w,n=30)=>{if(t<t0||t>t0+2.2)return '';const k=(t-t0)/2.2;let s='';for(let i=0;i<n;i++){const x=x0+rnd(i)*w,y=150+k*700*(0.5+rnd(i+3));s+=`<rect x="${x}" y="${y}" width="16" height="9" fill="${[AU,B,G2][i%3]}" transform="rotate(${k*720*rnd(i+7)} ${x} ${y})"/>`}return s};
// ---------- sahneler ----------
function sahne(t){let o='';
 // A kanca
 if(S(t,0,T(3,0))){o+=`<g opacity="${F(t,0,T(3,0)-0.2)}">`;
  o+=`<rect x="560" y="250" width="800" height="560" rx="14" fill="#FFF8E7" fill-opacity=".6" stroke="${G}" stroke-width="6"/><path d="M 540 250 h 840 v 70 q -52 40 -105 0 q -52 40 -105 0 q -52 40 -105 0 q -52 40 -105 0 q -52 40 -105 0 q -52 40 -105 0 q -52 40 -105 0 q -52 40 -105 0 z" fill="${B}" stroke="${INK}" stroke-width="5"/>`;
  o+=`<rect x="830" y="640" width="260" height="70" fill="#8A5A3B" stroke="${INK}" stroke-width="5"/>`;
  const zip=t>T(2,3)&&t<T(3,0)?Math.abs(Math.sin((t-T(2,3))*8))*40:0;
  const elde=t>T(2,3);
  if(!elde)o+=ayakkabi(960,610,1.2);
  const fl=cl((t-T(1,0)+0.2)/0.5);
  o+=takvim(1560,520,1,fl<.5?'31':'1',fl<.5?'EKİM':'KASIM',fl);
  const fiyat=t<T(1,3)?'1.000 ₺':t<T(2,1)?'2.000 ₺':'1.000 ₺';
  o+=priceTag(1180,470,1.1,fiyat,t>T(2,1)?0:0,null,0,t>T(2,1)?G2:G);
  o+=damga(960,380,'EFSANE İNDİRİM %50!',(t-T(1,9))/0.35,-8,RD,58);
  if(t>T(2,1))o+=damga(1180,600,'= 1.000 ₺',(t-T(2,3))/0.35,6,G2,44);
  o+=ALISVERISCI(330+(elde?0:0),920-zip,1.15,elde?POZ.zipla:POZ.goster,elde?ayakkabi(0,-420,.9,-10):'');
  o+=konfeti(t,T(2,3),150,600);
  o+=`</g>`}
 // B yasal mı?
 if(S(t,T(3,0),T(4,0))){o+=`<g opacity="${F(t,T(3,0),T(4,0)-0.2)}">`;
  o+=qmark(960,330,back((t-T(3,0))/0.4)*1.2);
  o+=damga(960,560,'ARTIK DEĞİL!',(t-T(3,7))/0.3,-6,G2,80);
  if(t>T(3,9)){o+=shop(560,900,0.9,'?',1)+cop(1100,960,1.0,{poz:POZ.goster,head:PAL.altin,front:ES.buyutec(-140,-230)})}
  for(let i=0;i<4;i++){const k=pop(t,T(3,19)+i*0.2);if(k>0)o+=seal(1300+i*150,800,k*.62,i+1,i==3?B:G)}
  o+=`</g>`}
 // C Black Friday
 if(S(t,T(4,0),T(7,0))){o+=`<g opacity="${F(t,T(4,0),T(7,0)-0.2)}">`;
  o+=skyline(.85)+`<rect x="0" y="560" width="1920" height="520" fill="#E8DCBC"/><line x1="0" y1="560" x2="1920" y2="560" stroke="${G}" stroke-width="4"/>`;
  o+=banner(960,200,pop(t,T(4,3)),'KARA CUMA');
  if(t>T(5,7)-0.3)o+=`<g opacity="${fadeIO(t,T(5,7)-0.3,T(6,0))}">`+banner(960,320,pop(t,T(5,7)-0.3)*0.8,"PHILADELPHIA · 1960")+`</g>`;
  if(t<T(6,0)+0.3){
   for(let i=0;i<7;i++){const x=150+i*250+Math.sin(t*2+i)*6;o+=araba(x,820,1.0,[B,'#2E4A6B',AU,G2,'#B5562E','#8A8F8C',B][i])}
   for(let i=0;i<6;i++){const x=((t*60+i*330)%2100)-100;o+=ALISVERISCI(x,1010,.55,yuru(t+i*.3))}
   const p=Math.floor(t*3)%2;o+=POLIS(960,700,.9,p?POZ.elsalla:{la:[[-70,-290],[-100,-350]],ra:[[50,-160],[60,-100]],ll:[[-40,0]],rl:[[40,0]]});
   if(t>T(5,22))o+=ter(1010,370);
   o+=damga(1460,420,'KARA GÜN!',(t-T(5,31))/0.3,-8,INK,64);
  } else {
   const uc=cl((t-T(6,9))/1.2);
   for(let i=0;i<3;i++)o+=TUCCAR(700+i*260,960,1.0,t>T(6,9)?POZ.omuzsilk:{la:[[-60,-250],[-50,-330]],ra:[[60,-250],[50,-330]],ll:[[-40,0]],rl:[[40,0]]});
   o+=`<g transform="translate(${960+uc*900},${520-uc*500}) rotate(${uc*40})"><rect x="-330" y="-60" width="660" height="120" fill="#FFF8E7" stroke="${INK}" stroke-width="6"/><text y="22" text-anchor="middle" font-family="Inter Display" font-weight="900" font-size="64" fill="${B}">BIG FRIDAY</text></g>`;
   if(t>T(6,10))o+=`<text x="960" y="400" text-anchor="middle" font-family="Bitstream Charter" font-style="italic" font-weight="bold" font-size="56" fill="${G}" opacity="${cl((t-T(6,10))/0.4)}">Marka işi zor… 😅</text>`;
  }
  o+=`</g>`}
 // D Taktik 1 çapa
 if(S(t,T(7,0),T(12,0))){o+=`<g opacity="${F(t,T(7,0),T(12,0)-0.2)}">`;
  if(t<T(8,0)) o+=baslik(960,500,1,'ÇAPA',(t-T(7,0))/0.4);
  else if(t<T(9,0)){
   o+=priceTag(760,560,1.6,'4.000 ₺',cl((t-T(8,1))/0.4),null,0,G);
   if(t>T(8,10)){const d=out3((t-T(8,10))/0.6);o+=`<g transform="translate(760,${260+d*280})"><line x1="0" y1="-300" x2="0" y2="-40" stroke="${INK}" stroke-width="6" stroke-dasharray="10 8"/><path d="M 0 -40 v 120 M -50 40 q 50 70 100 0 M -30 -10 h 60" fill="none" stroke="${INK}" stroke-width="14" stroke-linecap="round"/><circle cy="-50" r="16" fill="none" stroke="${INK}" stroke-width="10"/></g>`}
   if(t>T(8,18))o+=priceTag(1180,560,1.6,'1.999 ₺',0,null,0,G2);
   o+=cop(1550,960,1.0,{poz:t>T(8,25)?POZ.zipla:POZ.goster,head:PAL.altin,front:ES.poset()});
   o+=damga(1200,340,'KELEPİR!',(t-T(8,25))/0.3,8,G2,60);
  } else if(t<T(11,9)){
   o+=banner(960,150*(t<T(9,24)?1:0)+(t<T(9,24)?0:-200),pop(t,T(9,0)),'1974 · ÇAPA DENEYİ');
   const sp=t<T(9,17)?0:t<T(10,0)?(1-Math.pow(1-cl((t-T(9,17))/(T(10,0)-T(9,17))),3))*1440+36*0:1440;
   o+=cark(960,580,.9,sp+(t>T(10,8)?36:0)*0);
   o+=PSIKOLOG(560,960,.85,t>T(9,15)&&t<T(10,0)?POZ.goster:POZ.dur)+PSIKOLOG(1360,960,.85,POZ.dur);
   if(t>T(9,24))o+=`<g transform="translate(960,265) scale(${pop(t,T(9,24))})"><rect x="-520" y="-50" width="1040" height="90" rx="14" fill="#FFF8E7" stroke="${G}" stroke-width="4"/><text y="12" text-anchor="middle" font-family="Bitstream Charter" font-weight="bold" font-size="40" fill="${G}">"BM'deki ülkelerin yüzde kaçı Afrikalı?"</text></g>`;
   if(t>T(10,0)){o+=`<g opacity="${cl((t-T(10,0))/0.4)}"><rect x="160" y="300" width="420" height="300" rx="16" fill="#FFF8E7" stroke="${G}" stroke-width="5"/><text x="370" y="380" text-anchor="middle" font-family="Inter" font-weight="800" font-size="34" fill="${G}">Çark: 10</text><text x="370" y="510" text-anchor="middle" font-family="Inter Display" font-weight="900" font-size="110" fill="${G2}">%25</text></g>`}
   if(t>T(10,8)){o+=`<g opacity="${cl((t-T(10,8))/0.4)}"><rect x="1340" y="300" width="420" height="300" rx="16" fill="#FFF8E7" stroke="${B}" stroke-width="5"/><text x="1550" y="380" text-anchor="middle" font-family="Inter" font-weight="800" font-size="34" fill="${B}">Çark: 65</text><text x="1550" y="510" text-anchor="middle" font-family="Inter Display" font-weight="900" font-size="110" fill="${B}">%45</text></g>`}
  } else {
   o+=cark(600,520,.8,0)+`<text x="960" y="560" text-anchor="middle" font-family="Inter Display" font-weight="900" font-size="120" fill="${G}">=</text>`+priceTag(1320,560,1.6,'4.000 ₺',1,null,0,G);
  }
  o+=`</g>`}
 // E Taktik 2 acele
 if(S(t,T(12,0),T(16,0))){o+=`<g opacity="${F(t,T(12,0),T(16,0)-0.2)}">`;
  if(t<T(13,0)) o+=baslik(960,500,2,'ACELE ETTİRMEK',(t-T(12,0))/0.4);
  else{
   const reset=t>T(15,5);const kalan=reset&&t<T(15,5)+0.4?599:Math.max(0,599-Math.floor((t-(reset?T(15,5):T(13,0)))*7));
   const mm=String(Math.floor(kalan/60)).padStart(2,'0'),ss=String(kalan%60).padStart(2,'0');
   o+=ekran(1240,460,760,520,`<text y="20" text-anchor="middle" font-family="JetBrains Mono" font-weight="800" font-size="170" fill="${RD}">${mm}:${ss}</text>`+(t>T(13,4)?`<rect x="-300" y="80" width="600" height="70" rx="10" fill="${RD}"/><text y="128" text-anchor="middle" font-family="Inter" font-weight="900" font-size="40" fill="#fff">STOKTA SON 2 ÜRÜN!</text>`:'')+(t>T(13,8)?`<text y="-130" text-anchor="middle" font-family="Inter" font-weight="800" font-size="34" fill="${G}">👀 Şu an 37 kişi bakıyor</text>`:''));
   if(reset)o+=`<g transform="translate(1240,460) rotate(${(t-T(15,5))*400})" opacity="${fadeIO(t,T(15,5),T(15,5)+1.2,.2)}"><path d="M 0 -300 a 300 300 0 1 1 -260 150" fill="none" stroke="${AU}" stroke-width="16"/><path d="M -290 120 l 30 60 l 40 -60 z" fill="${AU}"/></g>`;
   const titre=t>T(13,4)&&t<T(15,0)?Math.sin(t*50)*5:0;
   o+=ALISVERISCI(420+titre,980,1.15,t<T(15,8)?POZ.basielinde:POZ.omuzsilk);
   if(t>T(13,4)&&t<T(15,0))o+=ter(500,520)+ter(330,560);
   if(t>T(14,9)&&t<T(15,0))o+=`<g opacity="${fadeIO(t,T(14,9),T(15,0))*0.8}"><ellipse cx="560" cy="330" rx="230" ry="80" fill="#fff" stroke="${INK}" stroke-width="4" stroke-dasharray="10 8"/><text x="560" y="345" text-anchor="middle" font-family="Bitstream Charter" font-style="italic" font-size="38" fill="${GRI}">İhtiyacım var mı?…</text></g>`;
  }
  o+=`</g>`}
 // F Taktik 3 kargo
 if(S(t,T(16,0),T(19,0))){o+=`<g opacity="${F(t,T(16,0),T(19,0)-0.2)}">`;
  if(t<T(17,0)) o+=baslik(960,500,3,'ÜCRETSİZ KARGO EŞİĞİ',(t-T(16,0))/0.4);
  else{
   const dolu=t>T(18,10)+0.6;
   o+=ekran(1180,460,860,520,`<text y="-150" text-anchor="middle" font-family="Inter" font-weight="900" font-size="40" fill="${G}">🛒 SEPETİM</text><rect x="-320" y="-60" width="640" height="50" rx="25" fill="#ddd" stroke="${INK}" stroke-width="3"/><rect x="-320" y="-60" width="${dolu?640:560}" height="50" rx="25" fill="${dolu?G2:AU}"/>`+(dolu?`<text y="70" text-anchor="middle" font-family="Inter" font-weight="900" font-size="42" fill="${G2}">✓ Kargo bedava!</text>`:`<text y="70" text-anchor="middle" font-family="Inter" font-weight="800" font-size="38" fill="${B}">Ücretsiz kargo için 47 ₺ daha ekleyin!</text>`));
   const fk=cl((t-T(18,10))/0.7);
   if(fk>0&&fk<1)o+=`<g transform="translate(${420+fk*760},${640-Math.sin(fk*Math.PI)*300})"><rect x="-60" y="-50" width="120" height="100" rx="10" fill="${B}" stroke="${INK}" stroke-width="5"/><text y="14" text-anchor="middle" font-family="Inter" font-weight="900" font-size="34" fill="#fff">300₺</text></g>`;
   o+=ALISVERISCI(380,980,1.1,t>T(18,10)&&t<T(18,16)?POZ.zipla:POZ.goster);
   if(t>T(18,16))o+=`<g transform="translate(1180,860) scale(${pop(t,T(18,16))})"><rect x="-330" y="-60" width="660" height="120" rx="14" fill="${G}" stroke="${INK}" stroke-width="5"/><text y="22" text-anchor="middle" font-family="Inter Display" font-weight="900" font-size="58" fill="${P}">47 ₺ &lt; 300 ₺ 🤦</text></g>`+ter(450,520);
  }
  o+=`</g>`}
 // G Taktik 4 + kural
 if(S(t,T(19,0),T(23,0))){o+=`<g opacity="${F(t,T(19,0),T(23,0)-0.2)}">`;
  if(t<T(20,0)){o+=baslik(960,330,4,'ÖNCE ZAM, SONRA İNDİRİM',(t-T(19,0))/0.4);
   if(t>T(19,3)){const st=t<T(19,7)?'1.000 ₺':t<T(19,8)?'2.000 ₺':'%50!';o+=ayakkabi(760,800,1.3)+priceTag(1160,760,1.3,st,0,null,0,st=='%50!'?RD:G)}}
  else if(t<T(21,0)){
   o+=`<g transform="translate(260,${380+(t<T(20,0)+0.3?-60*(1-cl((t-T(20,0))/0.3)):0)}) rotate(-30)"><rect x="-90" y="-36" width="180" height="72" rx="10" fill="#6B4A2B" stroke="${INK}" stroke-width="5"/><rect x="-10" y="30" width="20" height="160" fill="#8A5A3B" stroke="${INK}" stroke-width="4"/></g>`;
   o+=banner(960,180,pop(t,T(20,7)),'1 AĞUSTOS 2026');
   const fy=[1300,1250,1000,1350,1400,1200,1300,1450,1500,1600];
   for(let i=0;i<10;i++){const k=pop(t,T(20,17)+i*0.12);if(k<=0)continue;const x=430+i*120,low=fy[i]==1000,hl=t>T(20,28)&&low;
    o+=`<g transform="translate(${x},560) scale(${k})"><rect x="-52" y="-80" width="104" height="160" rx="10" fill="${hl?'#d9f2df':'#FFF8E7'}" stroke="${hl?G2:INK}" stroke-width="${hl?7:4}"/><text y="-40" text-anchor="middle" font-family="Inter" font-weight="800" font-size="24" fill="${G}">${i+1}. gün</text><text y="30" text-anchor="middle" font-family="Bitstream Charter" font-weight="bold" font-size="34" fill="${hl?G2:INK}">${fy[i].toLocaleString('tr-TR')}</text></g>`}
   if(t>T(20,28))o+=`<g transform="translate(960,820) scale(${pop(t,T(20,28))})"><rect x="-560" y="-60" width="1120" height="120" rx="14" fill="${G}" stroke="${INK}" stroke-width="5"/><text y="20" text-anchor="middle" font-family="Inter Display" font-weight="900" font-size="48" fill="${P}">ESKİ FİYAT = SON 10 GÜNÜN EN DÜŞÜĞÜ</text></g>`;
  } else if(t<T(22,0)){
   o+=ayakkabi(700,660,1.4)+priceTag(1180,560,1.6,'2.000 ₺',0,null,0,G);
   if(t>T(21,12)){const k=cl((t-T(21,12))/0.3);o+=`<g opacity="${k}"><line x1="1030" y1="440" x2="1330" y2="720" stroke="${RD}" stroke-width="20"/><line x1="1330" y1="440" x2="1030" y2="720" stroke="${RD}" stroke-width="20"/></g>`+damga(1180,860,'YAZILAMAZ!',k,-6,RD,56)}
   o+=`<text x="700" y="360" text-anchor="middle" font-family="Inter" font-weight="800" font-size="40" fill="${G}" opacity="${cl((t-T(21,2))/0.3)}">10 gün önce: 1.000 ₺</text>`;
  } else {
   o+=`<g transform="translate(960,330) scale(${pop(t,T(22,4))})"><rect x="-460" y="-90" width="920" height="180" rx="18" fill="#FFF8E7" stroke="${RD}" stroke-width="8"/><text y="-18" text-anchor="middle" font-family="Inter" font-weight="800" font-size="36" letter-spacing="6" fill="${RD}">ALDATICI REKLAMA</text><text y="58" text-anchor="middle" font-family="Inter Display" font-weight="900" font-size="72" fill="${RD}">39,9 MİLYON ₺ CEZA</text></g>`;
   if(t>T(22,13))o+=laptop(960,780,1.2,`<text y="-20" text-anchor="middle" font-family="Inter" font-weight="900" font-size="40" fill="${G}">tüketici.gov.tr</text><rect x="-130" y="20" width="260" height="56" rx="12" fill="${G2}"/><text y="58" text-anchor="middle" font-family="Inter" font-weight="900" font-size="28" fill="#fff">ŞİKÂYET ET</text>`);
   o+=cop(380,1000,.95,{poz:POZ.goster,head:PAL.altin,front:ES.poset()});
  }
  o+=`</g>`}
 // H haklar
 if(S(t,T(23,0),T(26,0))){o+=`<g opacity="${F(t,T(23,0),T(26,0)-0.2)}">`;
  const kart=(x,bas,ic,col,k,flip)=>k<=0?'':`<g transform="translate(${x},540) scale(${back(k)*Math.abs(Math.cos(flip*Math.PI))},${back(k)})"><rect x="-330" y="-340" width="660" height="680" rx="24" fill="#FFF8E7" stroke="${col}" stroke-width="8"/><rect x="-330" y="-340" width="660" height="120" rx="24" fill="${col}"/><text y="-262" text-anchor="middle" font-family="Inter Display" font-weight="900" font-size="58" fill="#fff">${bas}</text>${ic}</g>`;
  o+=kart(520,'İNTERNET',laptop(0,-30,.8,`<text y="-10" text-anchor="middle" font-family="Inter" font-weight="900" font-size="34" fill="${G2}">%50 İNDİRİM</text>`)+(t>T(24,9)?`<text y="200" text-anchor="middle" font-family="Inter Display" font-weight="900" font-size="64" fill="${G2}">14 GÜN CAYMA ✓</text><text y="262" text-anchor="middle" font-family="Inter" font-weight="700" font-size="30" fill="${G}">indirimli de olsa</text>`:''),G2,(t-T(23,0))/0.4,0);
  const fl=cl((t-T(25,0))/0.5);
  o+=kart(1400,fl<.5?'MAĞAZA':'MAĞAZA',fl<.5?`<text y="30" text-anchor="middle" font-size="160">🏬</text>`:`<text y="-40" text-anchor="middle" font-family="Inter" font-weight="900" font-size="44" fill="${B}">Sağlam ürün iadesi</text><text y="30" text-anchor="middle" font-family="Inter Display" font-weight="900" font-size="54" fill="${B}">= MAĞAZANIN</text><text y="100" text-anchor="middle" font-family="Inter Display" font-weight="900" font-size="54" fill="${B}">İYİ NİYETİ</text>`+(t>T(25,16)?`<text y="220" text-anchor="middle" font-family="Inter Display" font-weight="900" font-size="46" fill="${G2}">Bozuksa: hakkın saklı ✓</text>`:''),B,(t-T(23,0)-0.2)/0.4,fl);
  o+=`</g>`}
 // I altın kurallar
 if(S(t,T(26,0),T(31,0))){o+=`<g opacity="${F(t,T(26,0),T(31,0)-0.2)}">`;
  o+=`<rect x="300" y="160" width="900" height="700" rx="16" fill="#3f2a1c" stroke="${INK}" stroke-width="6"/><rect x="320" y="180" width="860" height="660" rx="8" fill="#FFFBEF" stroke="${INK}" stroke-width="4"/>${[...Array(9)].map((_,i)=>`<line x1="340" y1="${330+i*60}" x2="1160" y2="${330+i*60}" stroke="#9cc3d5" stroke-width="2"/>`).join('')}<line x1="420" y1="180" x2="420" y2="840" stroke="#e08a8a" stroke-width="3"/><text x="750" y="260" text-anchor="middle" font-family="Inter" font-weight="900" font-size="40" letter-spacing="8" fill="${B}">3 ALTIN KURAL</text>`;
  [['Fiyatı indirimden önce not al.',T(27,0)],['"Son 2 ürün"de derin nefes al.',T(28,0)],['Sepeti bir gece beklet.',T(29,0)]].forEach(([s,a],i)=>{if(t>a){const k=cl((t-a)/0.9);o+=`<defs><clipPath id="ak${i}"><rect x="360" y="${330+i*140}" width="${800*k}" height="120"/></clipPath></defs><g clip-path="url(#ak${i})"><text x="380" y="${420+i*140}" font-family="Bitstream Charter" font-weight="bold" font-size="56" fill="${B}">${i+1}.</text><text x="450" y="${420+i*140}" font-family="Bitstream Charter" font-style="italic" font-weight="bold" font-size="46" fill="${G}">${s}</text></g>`}});
  const bos=t>T(30,8);
  o+=cop(1550,980,1.05,{poz:bos?POZ.zipla:POZ.dur,head:PAL.altin,front:`<path d="M 70 -150 h 120 l -20 90 h -80 z" fill="#C98B4E" stroke="${INK}" stroke-width="5"/><path d="M 80 -150 q 50 -60 100 0" fill="none" stroke="${INK}" stroke-width="5"/>`});
  o+=damga(1500,420,'%100 İNDİRİM',(t-T(30,10))/0.3,-8,G2,58);
  o+=`</g>`}
 // J yorum
 if(S(t,T(31,0),V.END-4.4)){o+=`<g opacity="${F(t,T(31,0),V.END-4.6)}">`;
  o+=`<g transform="translate(960,460) scale(${pop(t,T(31,0))})"><rect x="-560" y="-160" width="1120" height="320" rx="24" fill="#fff" stroke="${INK}" stroke-width="6"/><circle cx="-450" cy="-60" r="50" fill="${PAL.altin}" stroke="${INK}" stroke-width="5"/><text x="-370" y="-50" font-family="Inter" font-weight="800" font-size="40" fill="${INK}">Yorum ekle…</text><text x="-370" y="40" font-family="Inter" font-weight="700" font-size="40" fill="${GRI}">"Son 2 ürün" yazısıyla kaç kez telaşlandın? 👇</text></g>`;
  o+=ALISVERISCI(1550,1000,1,POZ.omuzsilk,'',{})+ter(1590,620);
  o+=`</g>`}
 // K kapanış
 if(t>V.END-4.6){const k=cl((t-(V.END-4.6))/0.5);o+=`<g opacity="${k}"><rect width="1920" height="1080" fill="${P}"/>${ros(960,520,330,80,250,6,G,.1)}
  <g transform="translate(960,470) rotate(-8) scale(${1+1.3*(1-out3(cl((t-(V.END-4.2))/0.35)))})" opacity="${cl((t-(V.END-4.2))/0.15)}"><circle r="220" fill="none" stroke="${B}" stroke-width="14"/><circle r="190" fill="none" stroke="${B}" stroke-width="3"/><text y="-60" text-anchor="middle" font-family="Inter" font-weight="800" font-size="30" letter-spacing="8" fill="${B}">MERAKOLOJİ</text><text y="30" text-anchor="middle" font-family="Bitstream Charter" font-weight="bold" font-size="64" fill="${B}">Abone ol!</text><text y="100" text-anchor="middle" font-family="Inter" font-weight="800" font-size="28" letter-spacing="4" fill="${B}">🔔 kaçırma</text></g>
  <text x="960" y="840" text-anchor="middle" font-family="Inter" font-weight="700" font-size="36" fill="${G}" opacity="${cl((t-(V.END-3.2))/0.5)}">Bir sonraki merak: yorumlara yaz 👇</text></g>`}
 return o}
function draw(t){
 let o=DEFS+BG+`<g transform="translate(960,540) scale(${1+0.01*Math.sin(t*0.5)}) translate(-960,-540)">`+sahne(t)+`</g>`;
 if(window.SAHNE_SADECE) return o;
 o+=BORDER+`<rect width="1920" height="1080" fill="url(#vig)"/>`+subtitle(t);
 if(t<0.3)o+=`<rect width="1920" height="1080" fill="#000" opacity="${1-t/0.3}"/>`;
 if(t>V.END-0.4)o+=`<rect width="1920" height="1080" fill="#000" opacity="${cl((t-V.END+0.4)/0.4)}"/>`;
 document.getElementById('s').innerHTML=o;}
window.draw=draw;
