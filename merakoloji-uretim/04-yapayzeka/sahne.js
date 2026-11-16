/* Yapay Zekâ Sesini Taklit Ederse — Gece Grafiği, çöp adam (tema: gece) */
const T=(l,i)=>{const a=LW[l];if(!a)return 9999;const v=a[i<0?a.length+i:i];return v==null?9999:v};
const S=(t,a,b)=>t>=a-0.4&&t<b+0.5, F=(t,a,b)=>fadeIO(t,a-0.4,b+0.5,0.4);
const CY='#5CE1E6',AM='#FFC857',RG='#FF5A5F',WH='#EAF0F7',KU='#1A2B44',KU2='#24395A',YE='#7BE38F',GRI=PAL.gri;
const GT=`<defs><filter id="glow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>`;
const KISI=(x,y,s,poz,o={})=>cop(x,y,s,Object.assign({poz,tema:'gece'},o));
const ANNE=(x,y,s,poz,ek='')=>KISI(x,y,s,poz,{head:PAL.kiremit,front:ES.topuz()+ek});
const OGUL=(x,y,s,poz,ek='')=>KISI(x,y,s,poz,{head:PAL.lacivert,front:ek});
const TEYZE=(x,y,s,poz,ek='')=>KISI(x,y,s,poz,{head:PAL.bordo,front:ES.topuz(PAL.bordo)+ES.gozluk()+ek});
const DOLANDIRICI=(x,y,s,poz,ek='')=>KISI(x,y,s,poz,{head:'#3a3f45',front:ES.kapuson()+ek});
const CALISAN=(x,y,s,poz,ek='')=>KISI(x,y,s,poz,{head:PAL.hardal,front:ES.kravat()+ek});
const yazi=(x,y,txt,fs,col=WH,o='')=>`<text x="${x}" y="${y}" text-anchor="middle" font-family="Inter" font-weight="800" font-size="${fs}" fill="${col}" ${o}>${txt}</text>`;
function damga(x,y,txt,k,r=-10,col=RG,fs=64,w=null){if(k<=0)return '';const s=cl(k);w=w||txt.length*fs*0.62+60;
 return `<g transform="translate(${x},${y}) rotate(${r}) scale(${1+1.3*(1-out3(s))})" opacity="${s}"><rect x="${-w/2}" y="${-fs*0.85}" width="${w}" height="${fs*1.5}" rx="12" fill="#0D1B2A" fill-opacity=".85" stroke="${col}" stroke-width="8"/><text y="${fs*0.32}" text-anchor="middle" font-family="Inter Display" font-weight="900" font-size="${fs}" fill="${col}">${txt}</text></g>`}
function etiket(x,y,txt,k,fs=40,col=CY){if(k<=0)return '';const w=txt.length*fs*0.6+50;return `<g transform="translate(${x},${y}) scale(${back(cl(k))})"><rect x="${-w/2}" y="${-fs*0.8}" width="${w}" height="${fs*1.45}" rx="${fs*0.72}" fill="${KU}" stroke="${col}" stroke-width="4" filter="url(#glow)"/><text y="${fs*0.3}" text-anchor="middle" font-family="Inter" font-weight="800" font-size="${fs}" letter-spacing="2" fill="${col}">${txt}</text></g>`}
function balon(x,y,txt,k,fs=40,w=null,kuy=1,col=WH){if(k<=0)return '';w=w||txt.length*fs*0.55+80;
 return `<g transform="translate(${x},${y}) scale(${back(cl(k))})"><path d="M ${-30*kuy} 46 l ${-20*kuy} 46 l ${50*kuy} -46" fill="${KU2}" stroke="${col}" stroke-width="4"/><rect x="${-w/2}" y="-60" width="${w}" height="110" rx="26" fill="${KU2}" stroke="${col}" stroke-width="4"/><text y="12" text-anchor="middle" font-family="Bitstream Charter" font-style="italic" font-weight="bold" font-size="${fs}" fill="${col}">${txt}</text></g>`}
function dalga(x,y,w,h,t,col=CY,k=1,n=60){let d='';for(let i=0;i<=n;i++){const xx=x-w/2+i*w/n,e=Math.sin(i/n*Math.PI);const a=h*e*k*(0.35+0.65*Math.abs(Math.sin(i*1.7+t*9))*Math.abs(Math.sin(i*0.31+t*3)));d+=`M ${xx} ${y-a} V ${y+a} `}
 return `<path d="${d}" stroke="${col}" stroke-width="${Math.max(3,w/n*0.55)}" stroke-linecap="round" filter="url(#glow)"/>`}
function telefon(x,y,s,ic='',r=0,col=CY){return `<g transform="translate(${x},${y}) rotate(${r}) scale(${s})"><rect x="-90" y="-170" width="180" height="340" rx="26" fill="#0b1522" stroke="${col}" stroke-width="6" filter="url(#glow)"/><rect x="-74" y="-140" width="148" height="270" rx="10" fill="${KU}"/>${ic}</g>`}
function kart(x,y,w,h,k,ic,col=CY){if(k<=0)return '';return `<g transform="translate(${x},${y}) scale(${back(cl(k))})"><rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="20" fill="${KU}" stroke="${col}" stroke-width="5" filter="url(#glow)"/>${ic}</g>`}
function kumsaati(x,y,s,k){return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-130" y="-220" width="260" height="24" rx="8" fill="${AM}"/><rect x="-130" y="196" width="260" height="24" rx="8" fill="${AM}"/><path d="M -100 -196 h 200 q 0 120 -90 196 q 90 76 90 196 h -200 q 0 -120 90 -196 q -90 -76 -90 -196 z" fill="none" stroke="${CY}" stroke-width="6" filter="url(#glow)"/><path d="M ${-80*(1-k)} ${-170+170*k} h ${160*(1-k)} l ${-80*(1-k)} ${80*(1-k)} z" fill="${CY}" opacity=".6"/><path d="M -80 190 q 80 ${-140*k} 160 0 z" fill="${CY}" opacity=".6"/></g>`}
function tokmak(x,y,s,a){return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-90" y="20" width="180" height="30" rx="6" fill="#8A5A2B" stroke="${AM}" stroke-width="4"/><g transform="rotate(${a} 60 -40)"><rect x="-70" y="-70" width="120" height="56" rx="10" fill="#A06A35" stroke="${AM}" stroke-width="4"/><rect x="-14" y="-14" width="28" height="120" fill="#A06A35" stroke="${AM}" stroke-width="4" transform="rotate(-50 0 -40)"/></g></g>`}
function kilit(x,y,s,ac){return `<g transform="translate(${x},${y}) scale(${s})"><path d="M -60 -40 v -50 a 60 60 0 0 1 120 0 v ${-10-ac*40}" transform="translate(0,${-ac*30})" fill="none" stroke="${CY}" stroke-width="16" filter="url(#glow)"/><rect x="-100" y="-40" width="200" height="160" rx="20" fill="${KU2}" stroke="${CY}" stroke-width="6"/><circle cy="30" r="18" fill="${CY}"/></g>`}
function patates(x,y,s,r=0){return `<g transform="translate(${x},${y}) rotate(${r}) scale(${s})"><path d="M -70 -20 q -10 -50 50 -55 q 60 -10 90 30 q 20 50 -20 75 q -60 30 -100 0 q -30 -20 -20 -50 z" fill="#C8955A" stroke="#6b4a2b" stroke-width="6"/><circle cx="-20" cy="-20" r="5" fill="#6b4a2b"/><circle cx="30" cy="10" r="5" fill="#6b4a2b"/><circle cx="-30" cy="25" r="4" fill="#6b4a2b"/></g>`}
const zzz=(x,y,t)=>[0,1,2].map(i=>{const k=((t*0.6+i/3)%1);return `<text x="${x+k*60}" y="${y-k*120}" font-family="Inter" font-weight="900" font-size="${30+k*30}" fill="${CY}" opacity="${1-k}">Z</text>`}).join('');
const ter=(x,y)=>`<path d="M ${x} ${y} q 12 22 0 34 q -12 -12 0 -34 z" fill="#7FD1F7" stroke="#0b1522" stroke-width="3"/>`;
const soru=(x,y,k,col=AM)=>k<=0?'':`<text x="${x}" y="${y}" text-anchor="middle" font-family="Bitstream Charter" font-weight="bold" font-size="${110*back(cl(k))}" fill="${col}">?</text>`;
const titre=t=>Math.sin(t*70)*5;
// ---------- sahneler ----------
function sahne(t){let o=GT;
 // A gece 3
 if(S(t,0,T(4,0))){o+=`<g opacity="${F(t,0,T(4,0)-0.2)}">`;
  const yan=t>T(3,0)-0.2;
  if(!yan){
   o+=`<rect x="1240" y="120" width="300" height="230" fill="#0b1522" stroke="${KU2}" stroke-width="10"/><circle cx="1440" cy="190" r="40" fill="#FFF3C4" opacity=".85"/><line x1="1390" y1="120" x2="1390" y2="350" stroke="${KU2}" stroke-width="8"/>`;
   o+=`<rect x="1260" y="760" width="420" height="200" rx="10" fill="#3a2a1d" stroke="#0b1522" stroke-width="6"/>`+yazi(1470,470,'03:12',90,RG,'filter="url(#glow)" font-family="Inter Display"');
   const cal=t<T(1,0)-0.3;
   if(cal)o+=telefon(1470+titre(t),640,.6,yazi(0,-30,'OĞLUM',30,WH)+yazi(0,30,'📞',50),0,cal?AM:CY);
   o+=ANNE(600,960,1.2,t<T(1,0)?POZ.dur:POZ.telefon,t<T(1,0)?'':telefon(40,-300,.28,'',0,RG));
   if(t>T(1,0)-0.2&&t<T(2,0))o+=dalga(1000,420,620,120,t,RG,cl((t-T(1,0)+0.2)/0.3));
   if(t>T(1,0))o+=balon(1060,250,'“Anne… kaza yaptım!”',(t-T(1,0))/0.3,46,null,1,RG);
   if(t>T(1,3))o+=ter(660,620);
   if(t>T(2,0)){[['SES',T(2,0)],['NEFES',T(2,2)],['“ANNE”',T(2,5)]].forEach(([s,a],i)=>{o+=etiket(1180+i*0,380+i*130,s+' ✓',(t-a)/0.3,46,YE)})}
  }else{
   o+=`<line x1="960" y1="120" x2="960" y2="900" stroke="${KU2}" stroke-width="10"/>`;
   o+=ANNE(500,960,1.0,POZ.telefon,telefon(40,-300,.28,'',0,RG))+ter(560,640);
   o+=`<rect x="1150" y="760" width="560" height="120" rx="20" fill="${KU2}" stroke="${CY}" stroke-width="4"/><rect x="1150" y="700" width="140" height="70" rx="20" fill="${WH}"/>`;
   o+=`<g transform="translate(1230,740) rotate(-90)">${OGUL(0,0,.8,POZ.dur)}</g>`+zzz(1300,600,t);
   o+=`<path d="M 1300 730 h 400 v 60 h -400 z" fill="${PAL.lacivert}" stroke="${CY}" stroke-width="4"/>`;
   o+=damga(1430,400,'HORLUYOR',(t-T(3,4))/0.3,-8,AM,56)}
  o+=`</g>`}
 // B yapay zekâ çağı
 if(S(t,T(4,0),T(5,0))){o+=`<g opacity="${F(t,T(4,0),T(5,0)-0.2)}">`;
  o+=dalga(960,440,1300,200,t,CY,cl((t-T(4,0))/0.5));
  o+=etiket(960,180,'YAPAY ZEKÂ ÇAĞINA HOŞ GELDİN',(t-T(4,2))/0.4,50,CY);
  if(t>T(4,12))[0,1,2].forEach(i=>{o+=kart(560+i*400,800,240,200,(t-T(4,13)-i*0.15)/0.3,yazi(0,-10,'🛡️',70)+yazi(0,70,`${i+1}. ADIM`,34,AM),AM)});
  o+=`</g>`}
 // C ne kadar kayıt
 if(S(t,T(5,0),T(9,0))){o+=`<g opacity="${F(t,T(5,0),T(9,0)-0.2)}">`;
  if(t<T(7,0)){const k=cl((t-T(5,0))/(T(7,0)-T(5,0)));o+=kumsaati(560,520,1.2,k)+dalga(560,520,160,30,t,CY,1,12);
   [['SAATLER?',T(5,9)],['GÜNLER?',T(5,11)]].forEach(([s,a],i)=>{if(t>a){o+=yazi(1300,360+i*140,s,80,WH,`opacity="${cl((t-a)/0.3)}"`);if(t>T(5,13))o+=`<line x1="1100" y1="${335+i*140}" x2="${1100+400*cl((t-T(5,13)-i*0.15)/0.3)}" y2="${335+i*140}" stroke="${RG}" stroke-width="12"/>`}});
   if(t>T(6,0)-0.3){o+=`<g transform="translate(1300,720) scale(${back(cl((t-T(6,7))/0.4))})"><rect x="-230" y="-100" width="460" height="200" rx="24" fill="#0b1522" stroke="${AM}" stroke-width="6" filter="url(#glow)"/>`+yazi(0,48,'15 SN',130,AM,'font-family="Inter Display"')+`</g>`;
    o+=etiket(1300,900,'Bazı sistemler: birkaç saniye',(t-T(6,14))/0.3,34,CY)}}
  else if(t<T(8,0)){[['🎂','Doğum günü',T(7,0)],['💃','Düğün',T(7,3)],['😂','Story',T(7,5)]].forEach(([e,s,a],i)=>{o+=kart(480+i*480,480,360,420,(t-a)/0.3,yazi(0,-20,e,150)+yazi(0,140,s,44,WH)+dalga(0,80,240,24,t+i,CY,1,24))});
   o+=damga(960,850,'HEPSİ YETERLİ',(t-T(7,8))/0.3,-4,RG,56)}
  else{o+=TEYZE(520,960,1.15,POZ.telefon,telefon(40,-300,.28,'',0,YE));
   o+=`<g transform="translate(1250,430) scale(${back(cl((t-T(8,2))/0.4))})"><rect x="-380" y="-60" width="760" height="120" rx="60" fill="#1f5c3b" stroke="${YE}" stroke-width="5" filter="url(#glow)"/>`+yazi(-310,22,'▶',56,YE)+dalga(10,0,440,40,t,YE,1,40)+yazi(300,18,'4:00',40,WH)+`</g>`;
   if(t>T(8,6))o+=etiket(1250,600,'Aile grubu: 37 sesli mesaj',(t-T(8,6))/0.3,34,YE);
   if(t>T(8,12)){const k=cl((t-T(8,12))/0.6);o+=DOLANDIRICI(1900-k*350,980,1.0,POZ.goster,`<g transform="translate(170,-300)">${yazi(0,0,'💰',70)}</g>`);o+=damga(1200,800,'HAZİNE!',(t-T(8,16))/0.3,-8,AM,64)}}
  o+=`</g>`}
 // D Hong Kong
 if(S(t,T(9,0),T(13,0))){o+=`<g opacity="${F(t,T(9,0),T(13,0)-0.2)}">`;
  if(t<T(10,11)){o+=`<g opacity=".8">${[...Array(18)].map((_,i)=>[...Array(32)].map((_,j)=>{const x=60+j*56,y=180+i*42;const kara=Math.sin(j*0.37)+Math.cos(i*0.5+j*0.12)>0.5;return kara?`<circle cx="${x}" cy="${y}" r="10" fill="#36557f"/>`:''}).join('')).join('')}</g>`;
   if(t>T(10,4))o+=`<circle cx="1480" cy="520" r="${20+12*Math.sin(t*8)}" fill="${AM}" filter="url(#glow)"/>`+etiket(1480,440,'HONG KONG · 2024',(t-T(10,4))/0.3,40,AM);
   o+=etiket(700,180,'DEV MÜHENDİSLİK ŞİRKETİ',(t-T(10,6))/0.3,36,CY)}
  else{const W=330,H=220;const kut=[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1]];
   o+=`<rect x="380" y="200" width="1160" height="580" rx="20" fill="#0b1522" stroke="${CY}" stroke-width="6" filter="url(#glow)"/>`;
   kut.forEach(([c,r],i)=>{const x=590+c*370,y=360+r*260;const sen=i==4;const k=pop(t,T(10,12)+i*0.12);if(k<=0)return;
    o+=`<g transform="translate(${x},${y}) scale(${k})"><rect x="${-W/2+10}" y="${-H/2+10}" width="${W-20}" height="${H-20}" rx="10" fill="${sen?'#1f3a2a':KU2}"/>`+(sen?OGUL(0,90,.42,POZ.dur,''):CALISAN(0,90,.42,POZ.dur))+`<text x="${-W/2+24}" y="${H/2-22}" font-family="Inter" font-weight="700" font-size="22" fill="${WH}">${sen?'Sen':['Finans Dir.','Ahmet','Elif','Can','','Zeynep'][i]}</text></g>`;
    if(!sen&&t>T(11,0))o+=damga(x,y,'SAHTE',(t-T(11,9)-i*0.2)/0.3,-12,RG,50)});
   if(t>T(12,0)){const k=cl((t-T(12,4))/1.4);for(let i=0;i<14;i++){const p=(k+rnd(i)*0.3)%1;o+=`<g transform="translate(${960+p*900},${700-p*500+rnd(i+3)*200}) rotate(${p*300})"><rect x="-40" y="-20" width="80" height="40" rx="4" fill="#3c8a5a" stroke="${YE}" stroke-width="3"/>${yazi(0,10,'$',28,WH)}</g>`}
    o+=damga(960,900,'≈ 25 MİLYON $',(t-T(12,5))/0.3,-4,AM,64)}}
  o+=`</g>`}
 // E ABD davası
 if(S(t,T(13,0),T(15,0))){o+=`<g opacity="${F(t,T(13,0),T(15,0)-0.2)}">`;
  if(t<T(14,0)){const vur=t>T(13,12)?Math.max(0,Math.sin((t-T(13,12))*9))*-25:0;
   o+=tokmak(480,640,1.6,vur)+etiket(480,300,'ABD · KASIM 2026',(t-T(13,6))/0.3,46,AM)+etiket(480,420,'3 KİŞİYE DAVA',(t-T(13,9))/0.3,40,CY);
   if(t>T(13,14)){o+=etiket(1350,200,'İDDİAYA GÖRE',(t-T(13,14))/0.3,40,WH);
    o+=CALISAN(1150,760,.8,POZ.dur)+KISI(1550,760,.8,POZ.dur,{head:PAL.bordo,front:ES.kravat()+`<rect x="60" y="-190" width="80" height="60" rx="6" fill="#6B4A2B" stroke="#0b1522" stroke-width="4"/>`});
    o+=yazi(1150,830,'Yönetici',34,WH)+yazi(1550,830,'Avukat',34,WH);
    if(t>T(13,23))for(const x of [1150,1550])o+=`<g opacity="${cl((t-T(13,23))/0.4)}"><circle cx="${x}" cy="${760-0.8*300}" r="52" fill="none" stroke="${RG}" stroke-width="6" stroke-dasharray="10 8"/>${dalga(x,760-0.8*300-80,140,24,t,RG,1,14)}</g>`;
    o+=damga(1350,920,'≈ 129 MİLYON $',(t-T(13,31))/0.3,-4,AM,60)}}
  else{[['🧮','Muhasebe',T(14,1)],['⚖️','Avukat',T(14,2)],['🛡️','Güvenlik',T(14,3)]].forEach(([e,s,a],i)=>{o+=kart(480+i*480,480,340,380,(t-a)/0.3,yazi(0,0,e,130)+yazi(0,130,s,42,WH))});
   o+=damga(960,850,'YİNE DE KANDILAR',(t-T(14,7))/0.3,-4,RG,56)}
  o+=`</g>`}
 // F Türkiye
 if(S(t,T(15,0),T(18,0))){o+=`<g opacity="${F(t,T(15,0),T(18,0)-0.2)}">`;
  if(t<T(17,0)){o+=`<path d="M 290 520 q 40 -110 170 -120 q 110 -70 280 -55 q 170 -55 360 -30 q 170 -15 300 15 q 85 40 100 125 q -55 85 -170 100 q -170 55 -360 40 q -200 40 -360 0 q -160 0 -270 -30 q -80 -15 -50 -45 z" fill="${KU}" stroke="${CY}" stroke-width="5" filter="url(#glow)"/>`;
   [[520,470],[860,420],[1180,520],[1450,450],[700,600]].forEach(([x,y],i)=>{const on=Math.sin(t*5+i*1.7)>0;o+=`<circle cx="${x}" cy="${y}" r="${on?22:12}" fill="${AM}" opacity="${on?1:.4}" filter="url(#glow)"/>`});
   o+=etiket(960,180,'EMNİYET UYARIYOR',(t-T(15,2))/0.3,44,AM);
   [['“Çocuğun kaza yaptı”',T(16,2),480,780],['“Ben savcıyım…”',T(16,5),960,860],['“Kuzenim, acil para lazım”',T(16,9),1440,780]].forEach(([s,a,x,y])=>{o+=balon(x,y,s,(t-a)/0.3,38,null,1,AM)})}
  else{o+=dalga(560,480,560,120,t,CY,1,40)+dalga(1360,480,560,120,t+0.02,RG,1,40)+yazi(560,700,'GERÇEK',50,CY)+yazi(1360,700,'TAKLİT',50,RG)+yazi(960,500,'=',140,WH);
   o+=damga(960,860,'AYNI SES!',(t-T(17,7))/0.3,-4,AM,64)}
  o+=`</g>`}
 // G 3 silah
 if(S(t,T(18,0),T(23,0))){o+=`<g opacity="${F(t,T(18,0),T(23,0)-0.2)}">`;
  o+=etiket(960,160,'DOLANDIRICININ 3 SİLAHI',(t-T(18,0))/0.3,46,RG);
  const bir=cl((t-T(22,0))/0.8);const al=t>T(22,11);
  [['⏰','ACELE',T(19,0)],['🤫','GİZLİLİK',T(20,0)],['💸','PARA',T(21,0)]].forEach(([e,s,a],i)=>{const x=480+i*480+(960-(480+i*480))*bir*0.22;o+=kart(x,520,340,400,(t-a)/0.3,yazi(0,10,e,150)+yazi(0,140,s,50,i==2?AM:WH),al?RG:CY)});
  if(al){const f=Math.floor(t*5)%2;o+=`<circle cx="960" cy="520" r="${420}" fill="${RG}" opacity="${f?.18:.05}"/>`;o+=damga(960,880,'ALARM!',(t-T(22,11))/0.25,-4,RG,90)}
  if(t>T(19,2)&&t<T(20,0))o+=yazi(480,820,'“Hemen, şimdi!”',40,AM);
  if(t>T(20,2)&&t<T(21,0))o+=yazi(960,820,'“Kimseye söyleme!”',40,AM);
  if(t>T(21,7)&&t<T(22,0))o+=yazi(1440,820,'IBAN · kripto · hediye kartı',34,AM);
  o+=`</g>`}
 // H korunma
 if(S(t,T(23,0),T(29,0))){o+=`<g opacity="${F(t,T(23,0),T(29,0)-0.2)}">`;
  const bas=(n,s,a)=>etiket(960,150,`${n}. ${s}`,(t-a)/0.3,48,YE);
  if(t<T(24,1)){o+=kilit(960,560,1.6,cl((t-T(23,3))/0.4));o+=etiket(960,180,'KORUNMANIN 3 YOLU',(t-T(23,0))/0.3,48,YE)}
  else if(t<T(26,0)){o+=bas(1,'AİLE PAROLASI',T(24,1));
   o+=`<ellipse cx="960" cy="820" rx="420" ry="60" fill="#3a2a1d" stroke="${AM}" stroke-width="4"/>`;
   o+=ANNE(640,900,.85,POZ.kucakla)+OGUL(960,900,.85,POZ.kucakla)+KISI(1280,900,.85,POZ.kucakla,{head:PAL.yesil,front:ES.takke()});
   if(t>T(24,12)&&t<T(25,0))o+=balon(960,330,'Önce parolayı söyle!',(t-T(24,12))/0.3,44,null,1,YE);
   if(t>T(25,5)){o+=balon(960,330,'“Pazartesi patates”',(t-T(25,5))/0.3,54,null,1,AM)+patates(1300,300,.8*back(cl((t-T(25,6))/0.4)),-10)}
   if(t>T(25,8))o+=DOLANDIRICI(1700,980,.8,POZ.omuzsilk)+soru(1700,560,(t-T(25,8))/0.3)}
  else if(t<T(27,0)){o+=bas(2,'KAPAT VE KENDİN ARA',T(26,0));
   const ikinci=t>T(26,5);
   o+=telefon(700,580,1.2,ikinci?yazi(0,-80,'Rehber',30,CY)+['Annem','Oğlum ✓','Teyzem'].map((s,i)=>`<rect x="-64" y="${-50+i*60}" width="128" height="48" rx="8" fill="${i==1?'#1f5c3b':KU2}"/>`+yazi(0,-16+i*60,s,24,WH)).join(''):yazi(0,10,'📵',90),0,ikinci?YE:RG);
   if(t>T(26,11))o+=dalga(1250,560,500,100,t,YE,cl((t-T(26,11))/0.3),36);
   o+=damga(1250,820,'GERÇEKSE AÇAR ✓',(t-T(26,15))/0.3,-4,YE,50)}
  else if(t<T(28,0)){o+=bas(3,'GİZLİ SORU SOR',T(27,0));
   o+=balon(960,330,'“İlk köpeğimizin adı neydi?”',(t-T(27,6))/0.3,50,null,1,AM);
   o+=`<g transform="translate(960,640) scale(${back(cl((t-T(27,7))/0.4))})"><path d="M -150 40 q -10 -80 60 -90 h 120 l 40 -60 q 30 -10 40 20 l 0 60 q 60 10 50 60 l -20 10 v 90 h -40 v -70 h -150 v 70 h -40 z" fill="${KU2}" stroke="${CY}" stroke-width="6" filter="url(#glow)"/></g>`;
   if(t>T(27,11)){o+=etiket(560,900,'SES: kopyalanır',(t-T(27,11))/0.3,40,RG);o+=etiket(1360,900,'ANILAR: kopyalanamaz ✓',(t-T(27,15))/0.3,40,YE)}}
  else{o+=`<g transform="translate(960,420) scale(${back(cl((t-T(28,0))/0.4))})"><rect x="-640" y="-170" width="1280" height="340" rx="24" fill="${KU}" stroke="${AM}" stroke-width="6" filter="url(#glow)"/>`+yazi(0,-70,'🚓 Polis · ⚖️ Savcı · 🪖 Asker',50,WH)+yazi(0,40,'telefonda PARA İSTEMEZ',72,AM,'font-family="Inter Display"')+`</g>`;
   [['155','POLİS İMDAT',T(28,16)],['156','JANDARMA',T(28,23)]].forEach(([n,s,a],i)=>{o+=kart(640+i*640,820,440,200,(t-a)/0.3,yazi(0,10,'☎ '+n,80,YE,'font-family="Inter Display"')+yazi(0,70,s,34,WH),YE)})}
  o+=`</g>`}
 // I itiraf
 if(S(t,T(29,0),T(32,0))){o+=`<g opacity="${F(t,T(29,0),T(32,0)-0.2)}">`;
  const it=t>T(31,0);o+=dalga(960,it?300:420,1400,it?120:190,t,t>T(30,9)?AM:CY,1,70);
  o+=etiket(960,160,'Bir itirafım var…',(t-T(29,0))/0.3,44,WH);
  if(t>T(30,4))o+=`<g transform="translate(960,${it?520:700}) scale(${back(cl((t-T(30,9))/0.4))})"><rect x="-480" y="-80" width="960" height="160" rx="80" fill="${KU}" stroke="${AM}" stroke-width="6" filter="url(#glow)"/>`+yazi(0,26,'BU SES: YAPAY ZEKÂ 🤖',70,AM,'font-family="Inter Display"')+`</g>`;
  if(t>T(31,0)){o+=KISI(420,1000,.75,POZ.kalkan,{head:PAL.hardal});o+=damga(1150,740,'PARA İSTEMİYORUZ',(t-T(31,3))/0.3,-6,YE,58);o+=etiket(1150,920,'Sadece abonelik · o da bedava',(t-T(31,6))/0.3,38,AM)}
  o+=`</g>`}
 // J aile grubu
 if(S(t,T(32,0),T(33,0))){o+=`<g opacity="${F(t,T(32,0),T(33,0)-0.2)}">`;
  o+=telefon(700,560,1.9,yazi(0,-110,'👨‍👩‍👧 Aile',22,WH)+[0,1,2,3].map(i=>`<rect x="${i%2?-30:-66}" y="${-80+i*50}" width="96" height="36" rx="18" fill="${i%2?'#1f5c3b':KU2}"/>`+yazi(i%2?18:-18,-56+i*50,'▶ ∿∿∿',16,YE)).join(''),0,YE);
  o+=TEYZE(1350,980,1.0,POZ.goster)+etiket(1350,300,'Herkesin sesi orada!',(t-T(32,5))/0.3,44,AM);
  o+=`</g>`}
 // K yorum + patates
 if(S(t,T(33,0),V.END-4.4)){o+=`<g opacity="${F(t,T(33,0),V.END-4.6)}">`;
  let yz='Yorum ekle…',col=GRI;
  if(t>T(33,3)&&t<T(33,10)){yz='Bizim parolamız: Pazar'.slice(0,Math.floor(cl((t-T(33,3))/1.6)*22));col=WH}
  if(t>T(34,4)){yz='Merakoloji'.slice(0,Math.floor(cl((t-T(34,5))/0.8)*10));col=YE;if(t>T(34,10))yz='Merakoloji'.slice(0,Math.max(0,10-Math.floor((t-T(34,10))*14)))}
  o+=`<g transform="translate(960,380) scale(${pop(t,T(33,0))})"><rect x="-600" y="-130" width="1200" height="260" rx="24" fill="${KU}" stroke="${CY}" stroke-width="5" filter="url(#glow)"/><circle cx="-490" cy="0" r="50" fill="${PAL.hardal}"/>${`<text x="-410" y="18" font-family="Inter" font-weight="800" font-size="52" fill="${col}">${yz}${Math.floor(t*3)%2?'|':''}</text>`}</g>`;
  if(t>T(33,10)&&t<T(34,0))o+=damga(960,640,'SAKIN YAZMA! 🤫',(t-T(33,10))/0.3,-6,RG,64);
  const kas=t>T(34,7)&&t<T(34,13);
  o+=KISI(1500,1000,.9,kas?{la:[[-50,-160],[-60,-100]],ra:[[70,-280],[20,-330]],ll:[[-40,0]],rl:[[40,0]]}:t>T(34,13)?POZ.zipla:POZ.dur,{head:PAL.hardal});
  if(kas)o+=soru(1600,560,(t-T(34,7))/0.3);
  if(t>T(34,12)){const k=cl((t-T(34,12))/0.6);o+=patates(660,380-260*(1-out3(k)),1.0,(1-k)*200)}
  o+=`</g>`}
 // L kapanış
 if(t>V.END-4.6){const k=cl((t-(V.END-4.6))/0.5);o+=`<g opacity="${k}">${GECE_BG}${dalga(960,520,1500,60,t,KU2,1,70)}
  <g transform="translate(960,470) rotate(-8) scale(${1+1.3*(1-out3(cl((t-(V.END-4.2))/0.35)))})" opacity="${cl((t-(V.END-4.2))/0.15)}"><circle r="220" fill="#0D1B2A" stroke="${AM}" stroke-width="14" filter="url(#glow)"/><circle r="190" fill="none" stroke="${AM}" stroke-width="3"/><text y="-60" text-anchor="middle" font-family="Inter" font-weight="800" font-size="30" letter-spacing="8" fill="${AM}">MERAKOLOJİ</text><text y="30" text-anchor="middle" font-family="Bitstream Charter" font-weight="bold" font-size="64" fill="${AM}">Abone ol!</text><text y="100" text-anchor="middle" font-family="Inter" font-weight="800" font-size="28" letter-spacing="4" fill="${AM}">🔔 o da bedava</text></g>
  <text x="960" y="840" text-anchor="middle" font-family="Inter" font-weight="700" font-size="36" fill="${CY}" opacity="${cl((t-(V.END-3.2))/0.5)}">Parolanı kimseyle paylaşma 🥔</text></g>`}
 return o}
function draw(t){
 let o=DEFS+GECE_BG+`<g transform="translate(960,540) scale(${1+0.01*Math.sin(t*0.5)}) translate(-960,-540)">`+sahne(t)+`</g>`;
 if(window.SAHNE_SADECE) return o;
 o+=`<rect x="28" y="28" width="1864" height="1024" rx="10" fill="none" stroke="${KU2}" stroke-width="4"/>`+subtitle(t);
 if(t<0.3)o+=`<rect width="1920" height="1080" fill="#000" opacity="${1-t/0.3}"/>`;
 if(t>V.END-0.4)o+=`<rect width="1920" height="1080" fill="#000" opacity="${cl((t-V.END+0.4)/0.4)}"/>`;
 document.getElementById('s').innerHTML=o;}
window.draw=draw;
