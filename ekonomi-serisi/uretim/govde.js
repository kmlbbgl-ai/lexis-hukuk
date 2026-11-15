/* Bölüm 1 gövde sahneleri (31.4 sn – son). Zamanlar LW[satır][kelime] (çıktı saniyesi) üzerinden. */
const w=(l,i)=>LW[l][i<0?LW[l].length+i:i];
const pop=(t,a,d=.35)=>back((t-a)/d);
const fadeIO=(t,a,b,f=.4)=>cl((t-a)/f)*cl((b-t)/f);

/* ---------- ek çizim parçaları ---------- */
function loaf(x,y,s=1,hl=0){return `<g transform="translate(${x},${y}) scale(${s})">
  ${hl>0?`<ellipse rx="60" ry="34" fill="${AU}" opacity="${hl*.5}"/>`:''}
  <ellipse rx="46" ry="22" fill="#D49A52" stroke="#5a3a17" stroke-width="4"/>
  ${[-20,0,20].map(dx=>`<path d="M ${dx-8} 8 L ${dx+8} -10" stroke="#7a4f22" stroke-width="4" stroke-linecap="round"/>`).join('')}</g>`}
function plaque(x,y,label,val,s=1,hl=0){return `<g transform="translate(${x},${y}) scale(${s})">
  <rect x="-150" y="-62" width="300" height="124" rx="10" fill="#FFF8E7" stroke="${G}" stroke-width="5"/>
  <rect x="-140" y="-52" width="280" height="104" rx="6" fill="none" stroke="${AU}" stroke-width="2" stroke-dasharray="3 5"/>
  ${hl>0?`<rect x="-150" y="-62" width="300" height="124" rx="10" fill="${AU}" opacity="${hl*.35}"/>`:''}
  <text y="-16" text-anchor="middle" font-family="Inter" font-weight="800" font-size="24" letter-spacing="6" fill="${B}">${label}</text>
  <text y="38" text-anchor="middle" font-family="Bitstream Charter" font-weight="bold" font-size="54" fill="${G}">${val}</text></g>`}
function priceTag(x,y,s,val,strike=0,stampVal=null,stampK=0,col=G){return `<g transform="translate(${x},${y}) scale(${s})">
  <line x1="0" y1="-120" x2="0" y2="-48" stroke="#5a3a17" stroke-width="3"/>
  <path d="M -80 -48 h 160 v 96 h -160 z" fill="#FFF8E7" stroke="${col}" stroke-width="4"/><circle cx="0" cy="-34" r="6" fill="${col}"/>
  <text y="28" text-anchor="middle" font-family="Bitstream Charter" font-weight="bold" font-size="50" fill="${col}">${val}</text>
  ${strike>0?`<line x1="-62" y1="30" x2="${-62+124*strike}" y2="${30-36*strike}" stroke="${B}" stroke-width="7"/>`:''}
  ${stampVal&&stampK>0?`<g transform="translate(40,-70) rotate(-14) scale(${1+1.3*(1-out3(stampK))})" opacity="${cl(stampK*3)*.95}"><circle r="70" fill="#FFF8E7" fill-opacity=".85" stroke="${B}" stroke-width="7"/><circle r="56" fill="none" stroke="${B}" stroke-width="2"/><text y="18" text-anchor="middle" font-family="Bitstream Charter" font-weight="bold" font-size="${stampVal.length>4?36:52}" fill="${B}">${stampVal}</text></g>`:''}</g>`}
function bakery(x,y,s,t){const sm=[0,1,2].map(i=>{const k=((t*0.35+i/3)%1);return `<circle cx="${130+k*40}" cy="${-330-k*160}" r="${16+k*30}" fill="#fff" stroke="${INK}" stroke-width="3" opacity="${(1-k)*.8}"/>`}).join('');
  return `<g transform="translate(${x},${y}) scale(${s})">${sm}
  <rect x="110" y="-330" width="50" height="90" fill="#9a6a45" stroke="${INK}" stroke-width="5"/>
  <path d="M -230 -200 L 0 -330 L 230 -200 Z" fill="${B}" stroke="${INK}" stroke-width="6"/><path d="M -230 -200 L 0 -330 L 230 -200 Z" fill="url(#hatch)" opacity=".2"/>
  <rect x="-200" y="-200" width="400" height="300" fill="#EBDDBB" stroke="${INK}" stroke-width="6"/>
  <rect x="-120" y="-180" width="240" height="56" rx="6" fill="${G}" stroke="${INK}" stroke-width="4"/>
  <text y="-140" text-anchor="middle" font-family="Bitstream Charter" font-weight="bold" font-size="40" fill="${P}" letter-spacing="6">FIRIN</text>
  <path d="M -60 100 v -130 a 60 60 0 0 1 120 0 v 130 z" fill="#6B4A2B" stroke="${INK}" stroke-width="5"/>
  <rect x="-180" y="-100" width="100" height="90" fill="#FFE9A8" stroke="${INK}" stroke-width="5"/><rect x="80" y="-100" width="100" height="90" fill="#FFE9A8" stroke="${INK}" stroke-width="5"/></g>`}
function island(t){
  let s=`<rect x="0" y="770" width="1920" height="310" fill="#cfe0d4"/>`;
  for(let r=0;r<6;r++){const y=790+r*24;let d=`M 0 ${y}`;for(let x=0;x<=1920;x+=40)d+=` Q ${x+20} ${y+(r%2?6:-6)+Math.sin(t*1.5+x*.01+r)*4} ${x+40} ${y}`;s+=`<path d="${d}" fill="none" stroke="${G}" stroke-width="2" opacity=".35"/>`}
  s+=`<ellipse cx="960" cy="800" rx="820" ry="70" fill="#E3C98F" stroke="${INK}" stroke-width="5"/><ellipse cx="960" cy="800" rx="820" ry="70" fill="url(#hatchL)"/>`;
  s+=`<g transform="translate(260,730)"><rect x="-8" y="-200" width="16" height="200" fill="#8A5A3B" stroke="${INK}" stroke-width="4"/>${[-60,-20,20,60].map(a=>`<path d="M 0 -200 q ${a} -50 ${a*2} -10" fill="none" stroke="${G}" stroke-width="16" stroke-linecap="round"/>`).join('')}</g>`;
  return s}
function seats(x,y,n,hl){let s=`<g transform="translate(${x},${y})">`;for(let i=0;i<n;i++){const xx=(i-(n-1)/2)*92;
  s+=`<g transform="translate(${xx},0)"><rect x="-38" y="-80" width="76" height="70" rx="10" fill="${B}" stroke="${INK}" stroke-width="4"/><rect x="-42" y="-14" width="84" height="26" rx="6" fill="#a8434e" stroke="${INK}" stroke-width="4"/><rect x="-36" y="12" width="8" height="30" fill="${INK}"/><rect x="28" y="12" width="8" height="30" fill="${INK}"/></g>`}
  return s+`</g>`}
function ticket(x,y,r,s){return `<g transform="translate(${x},${y}) rotate(${r}) scale(${s})"><path d="M -60 -30 h 120 v 18 a 12 12 0 0 0 0 24 v 18 h -120 v -18 a 12 12 0 0 0 0 -24 z" fill="#FFE9A8" stroke="${INK}" stroke-width="4"/><line x1="25" y1="-28" x2="25" y2="28" stroke="${INK}" stroke-width="2" stroke-dasharray="4 4"/><text x="-18" y="9" text-anchor="middle" font-family="Inter" font-weight="900" font-size="22" fill="${B}">BİLET</text></g>`}
function notebook(x,y,s,n,writeK,glowAll=0){ // n madde; son madde writeK ile yazılır
  let o=`<g transform="translate(${x},${y}) scale(${s})">
  <rect x="-420" y="-290" width="840" height="580" rx="16" fill="#3f2a1c" stroke="${INK}" stroke-width="6"/>
  <rect x="-400" y="-270" width="800" height="540" rx="8" fill="#FFFBEF" stroke="${INK}" stroke-width="4"/>
  ${[...Array(9)].map((_,i)=>`<line x1="-380" y1="${-170+i*52}" x2="380" y2="${-170+i*52}" stroke="#9cc3d5" stroke-width="2"/>`).join('')}
  <line x1="-300" y1="-270" x2="-300" y2="270" stroke="#e08a8a" stroke-width="3"/>
  ${[...Array(8)].map((_,i)=>`<circle cx="${-350+i*100}" cy="-290" r="14" fill="none" stroke="#888" stroke-width="6"/>`).join('')}
  <text x="40" y="-200" text-anchor="middle" font-family="Inter" font-weight="900" font-size="34" letter-spacing="8" fill="${B}">CEVAP DEFTERİ</text>
  <defs><clipPath id="wr${n}"><rect x="-390" y="${-150+(n-1)*104}" width="${780*writeK}" height="100"/></clipPath></defs>`;
  for(let i=0;i<n;i++){const yy=-100+i*104, last=i==n-1;
    o+=`<g ${last&&writeK<1?`clip-path="url(#wr${n})"`:''}>${glowAll>0?`<rect x="-300" y="${yy-50}" width="680" height="70" rx="8" fill="${AU}" opacity="${glowAll*.3}"/>`:''}
    <text x="-340" y="${yy}" text-anchor="middle" font-family="Bitstream Charter" font-weight="bold" font-size="44" fill="${B}">${i+1}.</text>
    <text x="-280" y="${yy}" font-family="Bitstream Charter" font-style="italic" font-weight="bold" font-size="${V.DEFTER[i].length>36?33:37}" fill="${G}">${V.DEFTER[i]}</text></g>`}
  if(writeK>0&&writeK<1){const yy=-110+(n-1)*104;o+=`<g transform="translate(${-280+660*writeK},${yy})"><path d="M 0 0 l 60 -90 l 18 12 l -60 90 z" fill="${AU}" stroke="${INK}" stroke-width="3"/><path d="M 0 0 l -6 22 l 22 -10 z" fill="${INK}"/></g>`}
  return o+`</g>`}
function stove(x,y,s,t,fire){const f=[0,1,2,3,4].map(i=>{const h=60+fire*60+Math.sin(t*9+i*2)*18;return `<path d="M ${-60+i*30} 30 q -15 ${-h*.5} ${15} ${-h} q 15 ${h*.5} 15 ${h} z" fill="${i%2?'#F5A623':'#E4572E'}" opacity=".9"/>`}).join('');
  return `<g transform="translate(${x},${y}) scale(${s})">
  <rect x="-30" y="-430" width="60" height="230" fill="#555" stroke="${INK}" stroke-width="5"/>
  <rect x="-150" y="-200" width="300" height="260" rx="20" fill="#3b3b3b" stroke="${INK}" stroke-width="6"/>
  <rect x="-100" y="-130" width="200" height="140" rx="10" fill="#1d1d1d" stroke="${INK}" stroke-width="5"/>
  <g transform="translate(0,0)">${f}</g>
  <circle r="${150+fire*40}" cy="-60" fill="url(#glowR)" opacity="${.4+fire*.4}"/>
  <rect x="-130" y="60" width="30" height="50" fill="${INK}"/><rect x="100" y="60" width="30" height="50" fill="${INK}"/></g>`}
function bundle(x,y,r,s){return `<g transform="translate(${x},${y}) rotate(${r}) scale(${s})">${note(0,-16,0,.5)}${note(0,0,0,.5)}${note(0,16,0,.5)}<rect x="-14" y="-50" width="28" height="100" fill="${B}" stroke="${INK}" stroke-width="3"/></g>`}
function clock(x,y,s,t,label){const a=t*120;return `<g transform="translate(${x},${y}) scale(${s})"><circle r="110" fill="#FFF8E7" stroke="${INK}" stroke-width="7"/>
  ${[...Array(12)].map((_,i)=>`<line x1="0" y1="-92" x2="0" y2="-78" stroke="${INK}" stroke-width="5" transform="rotate(${i*30})"/>`).join('')}
  <line x1="0" y1="0" x2="0" y2="-62" stroke="${INK}" stroke-width="8" stroke-linecap="round" transform="rotate(${a/12})"/>
  <line x1="0" y1="0" x2="0" y2="-88" stroke="${B}" stroke-width="5" stroke-linecap="round" transform="rotate(${a})"/><circle r="9" fill="${INK}"/>
  ${label?`<text y="160" text-anchor="middle" font-family="Inter" font-weight="900" font-size="34" letter-spacing="4" fill="${B}">${label}</text>`:''}</g>`}
function wheelbarrow(x,y,s,t){return `<g transform="translate(${x},${y}) scale(${s})">
  ${[...Array(9)].map((_,i)=>bundle(-120+(i%3)*80,-130-Math.floor(i/3)*40,(i*17)%20-10,.8)).join('')}
  <path d="M -200 -60 h 280 l -40 90 h -200 z" fill="#8A5A3B" stroke="${INK}" stroke-width="6"/>
  <g transform="translate(-10,70) rotate(${t*300})"><circle r="40" fill="#555" stroke="${INK}" stroke-width="6"/><line x1="-36" y1="0" x2="36" y2="0" stroke="${INK}" stroke-width="5"/><line x1="0" y1="-36" x2="0" y2="36" stroke="${INK}" stroke-width="5"/></g>
  <line x1="80" y1="-40" x2="240" y2="-100" stroke="#5a3a17" stroke-width="12" stroke-linecap="round"/></g>`}
function cup(x,y,s,t,price){return `<g transform="translate(${x},${y}) scale(${s})">
  ${[0,1].map(i=>`<path d="M ${-20+i*30} -90 q -15 -30 0 -60 q 15 -30 0 -60" fill="none" stroke="#999" stroke-width="5" opacity="${.5+.3*Math.sin(t*3+i)}" transform="translate(0,${-((t*20)%20)})"/>`).join('')}
  <ellipse cx="0" cy="40" rx="120" ry="22" fill="#fff" stroke="${INK}" stroke-width="5"/>
  <path d="M -80 -70 h 160 l -14 110 h -132 z" fill="#fff" stroke="${INK}" stroke-width="6"/><path d="M 80 -40 q 60 0 40 50 q -15 20 -46 10" fill="none" stroke="${INK}" stroke-width="10"/>
  <ellipse cx="0" cy="-70" rx="80" ry="14" fill="#6b3e1f" stroke="${INK}" stroke-width="5"/>
  ${price?priceTag(0,-230,.9,price):''}</g>`}
function kite(x,y,s,t){return `<g transform="translate(${x},${y}) rotate(${Math.sin(t*2)*10}) scale(${s})">
  <path d="M 0 -110 L 80 0 L 0 120 L -80 0 Z" fill="${NOTE}" stroke="${G}" stroke-width="5"/><path d="M 0 -110 L 80 0 L 0 120 L -80 0 Z" fill="url(#hatchL)"/>
  <line x1="0" y1="-110" x2="0" y2="120" stroke="${G}" stroke-width="3"/><line x1="-80" y1="0" x2="80" y2="0" stroke="${G}" stroke-width="3"/>
  <text x="30" y="-12" font-family="Bitstream Charter" font-weight="bold" font-size="30" fill="${G}">100</text>
  <path d="M 0 120 ${[...Array(6)].map((_,i)=>`q ${i%2?20:-20} 20 0 40`).join(' ')}" fill="none" stroke="${INK}" stroke-width="3"/></g>`}
function calendar(x,y,s,day,month,year,flip){return `<g transform="translate(${x},${y}) scale(${s})">
  <rect x="-170" y="-200" width="340" height="400" rx="14" fill="#fff" stroke="${INK}" stroke-width="6"/>
  <rect x="-170" y="-200" width="340" height="100" rx="14" fill="${B}" stroke="${INK}" stroke-width="6"/>
  <text y="-135" text-anchor="middle" font-family="Inter" font-weight="900" font-size="40" letter-spacing="6" fill="${P}">${month}</text>
  <g transform="scale(1,${Math.abs(Math.cos(flip*Math.PI))})"><text y="70" text-anchor="middle" font-family="Bitstream Charter" font-weight="bold" font-size="170" fill="${G}">${day}</text></g>
  <text y="170" text-anchor="middle" font-family="Inter" font-weight="800" font-size="40" fill="${INK}">${year}</text></g>`}
function coin(x,y,s,txt){return `<g transform="translate(${x},${y}) scale(${s})"><circle r="120" fill="${AU}" stroke="${INK}" stroke-width="7"/><circle r="98" fill="none" stroke="${INK}" stroke-width="3" stroke-dasharray="4 6"/>
  <text y="22" text-anchor="middle" font-family="Bitstream Charter" font-weight="bold" font-size="60" fill="${INK}">${txt}</text></g>`}
function scaleBal(x,y,s,tilt,l1,l2){const a=tilt*14;return `<g transform="translate(${x},${y}) scale(${s})">
  <rect x="-10" y="-200" width="20" height="260" fill="${G}" stroke="${INK}" stroke-width="4"/><path d="M -80 70 h 160 l -30 -30 h -100 z" fill="${G}" stroke="${INK}" stroke-width="4"/>
  <g transform="translate(0,-200) rotate(${a})"><rect x="-260" y="-8" width="520" height="16" fill="${G}" stroke="${INK}" stroke-width="4"/>
  ${[[-240,l1],[240,l2]].map(([px,l])=>`<g transform="translate(${px},0) rotate(${-a})"><line x1="-60" y1="100" x2="0" y2="0" stroke="${INK}" stroke-width="3"/><line x1="60" y1="100" x2="0" y2="0" stroke="${INK}" stroke-width="3"/><path d="M -90 100 h 180 q -10 40 -90 40 q -80 0 -90 -40 z" fill="${AU}" stroke="${INK}" stroke-width="4"/><text y="190" text-anchor="middle" font-family="Inter" font-weight="900" font-size="34" letter-spacing="3" fill="${B}">${l}</text></g>`).join('')}</g>
  <circle cy="-200" r="14" fill="${AU}" stroke="${INK}" stroke-width="4"/></g>`}
function bank(x,y,s,t){return `<g transform="translate(${x},${y}) scale(${s})">
  <circle cy="-120" r="${360+Math.sin(t*2)*15}" fill="url(#glowR)" opacity=".5"/>
  <path d="M -300 -220 L 0 -380 L 300 -220 Z" fill="${G}" stroke="${INK}" stroke-width="6"/>
  <rect x="-280" y="-220" width="560" height="40" fill="${G2}" stroke="${INK}" stroke-width="5"/>
  <text y="-250" text-anchor="middle" font-family="Bitstream Charter" font-weight="bold" font-size="56" fill="${P}" letter-spacing="10">BANKA</text>
  ${[-210,-105,0,105,210].map(px=>`<rect x="${px-22}" y="-180" width="44" height="240" fill="#EBDDBB" stroke="${INK}" stroke-width="5"/>`).join('')}
  <rect x="-300" y="60" width="600" height="40" fill="${G2}" stroke="${INK}" stroke-width="5"/></g>`}
function shop(x,y,s,price,k){return `<g transform="translate(${x},${y}) scale(${s})">
  <rect x="-260" y="-260" width="520" height="360" fill="#EBDDBB" stroke="${INK}" stroke-width="6"/>
  <path d="M -290 -260 h 580 v 60 ${[...Array(8)].map(()=>'q -36 40 -72.5 0').join(' ')} z" fill="${B}" stroke="${INK}" stroke-width="5"/>
  <rect x="-200" y="-150" width="400" height="120" rx="8" fill="${INK}"/>
  <text y="-104" text-anchor="middle" font-family="Inter" font-weight="800" font-size="28" fill="#ddd">EKMEK</text>
  <g transform="translate(0,-55) scale(${1+.25*(1-cl(k))})"><text text-anchor="middle" font-family="Bitstream Charter" font-weight="bold" font-size="54" fill="#FFD23F">${price}</text></g>
  <rect x="-260" y="20" width="520" height="80" fill="#8A5A3B" stroke="${INK}" stroke-width="6"/></g>`}
function skyline(op){return `<g opacity="${op}">${[...Array(14)].map((_,i)=>{const x=60+i*135,h=180+((i*73)%5)*40;return `<rect x="${x}" y="${560-h}" width="120" height="${h}" fill="#d8cdb0" stroke="${G}" stroke-width="3"/><path d="M ${x} ${560-h} l 60 -50 l 60 50" fill="#c9bb98" stroke="${G}" stroke-width="3"/>${[...Array(3)].map((_,j)=>`<rect x="${x+20+j*30}" y="${600-h}" width="18" height="26" fill="${G}" opacity=".35"/>`).join('')}`}).join('')}</g>`}
function pageTurn(t,a){const k=cl((t-a)/0.7);if(k<=0||k>=1)return '';const x=1920*(1-ease(k))*1.2-200;
  return `<path d="M ${x} 0 L ${x+300} 0 L ${x+120} 1080 L ${x-180} 1080 Z" fill="${P}" stroke="${G}" stroke-width="4" opacity=".98"/><path d="M ${x+300} 0 L 2200 0 L 2200 1080 L ${x+120} 1080 Z" fill="${P}"/>`}

/* ---------- sahneler ---------- */
function adaSahne(t,mode){ // mode 1: bölüm başı, 2: cevap bölümü (20 ekmek)
  let o='';
  if(mode==1){
    const A=31.4,Z=60.2;
    o+=`<g opacity="${cl((t-A)/0.5)*cl((Z-t)/0.6)}">`+island(t);
    const nLoaf=10, gone=cl((t-w(10,0))/0.6);
    o+=bakery(1420,640,0.95,t);
    o+=`<rect x="1170" y="690" width="500" height="18" fill="#6B4A2B" stroke="${INK}" stroke-width="4"/>`;
    const hl=fadeIO(t,w(8,6),w(8,9)+0.8);
    for(let i=0;i<nLoaf;i++){if(i<4&&gone>=1)continue;const lx=1210+(i%5)*96,ly=665-Math.floor(i/5)*34;o+=loaf(lx,ly,.8,hl)}
    // piyonlar
    const run=ease((t-w(8,1))/1.4);
    for(let i=0;i<4;i++){const bx=420+i*150, tx=680+i*125;const x=bx+(tx-bx)*run;
      const jump=(t>w(7,9)&&t<w(7,9)+1.6)?Math.abs(Math.sin((t-w(7,9))*9+i))*40:0;
      const hasL=gone>0;
      o+=pawn(x,790-jump,0.42,i%2?G2:'#3C7A5E');
      const nNotes=t>w(7,7)+0.4+i*0.1?2:1;
      for(let j=0;j<nNotes;j++)o+=note(x-10+j*18,790-jump-195-j*14,-8+j*10,.28);
      if(hasL)o+=loaf(x+40,790-jump-60,.6*gone);
    }
    // matbaa ve uçan paralar
    if(t>w(7,2)-0.3){const k=out3((t-w(7,2)+0.3)/0.5);o+=press(330,300-(1-k)*500,0.33,t);
      for(let i=0;i<4;i++){const p=cl((t-w(7,6)-i*0.15)/0.8);if(p>0&&p<1){const x0=420,y0=330,x1=420+i*150,y1=590;o+=note(x0+(x1-x0)*p,y0+(y1-y0)*p-Math.sin(p*Math.PI)*120,p*360,.3)}}}
    // konfeti
    if(t>w(7,9)&&t<w(7,9)+2){for(let i=0;i<24;i++){const k=(t-w(7,9))/2;o+=`<rect x="${300+rnd(i)*900}" y="${200+k*600*(0.5+rnd(i+3))}" width="14" height="8" fill="${[AU,B,G2][i%3]}" transform="rotate(${k*700*rnd(i+7)} ${300+rnd(i)*900} ${200+k*600})"/>`}}
    // göstergeler
    const para=t>w(7,7)+0.8?'20 ₺':'10 ₺';
    o+=plaque(760,150,'PARA',para,pop(t,w(6,10)),fadeIO(t,w(7,7)+0.8,w(7,7)+2.2));
    o+=plaque(1160,150,'EKMEK','10 adet',pop(t,w(6,6)),hl);
    // fiyat etiketi
    o+=priceTag(1660,470,0.8,'1 ₺',cl((t-w(9,3))/0.3),'2 ₺',cl((t-w(9,5))/0.4));
    // formül
    if(t>w(10,0)) o+=`<g opacity="${fadeIO(t,w(10,0),w(11,0))}"><rect x="560" y="245" width="800" height="90" rx="12" fill="#FFF8E7" stroke="${G}" stroke-width="4"/><text x="960" y="306" text-anchor="middle" font-family="Bitstream Charter" font-weight="bold" font-size="48" fill="${G}">20 ₺ ÷ 10 ekmek = <tspan fill="${B}">2 ₺</tspan></text></g>`;
    if(t>w(10,11)) o+=`<g transform="translate(960,420) rotate(-6) scale(${pop(t,w(10,11))})" opacity="${fadeIO(t,w(10,11),w(11,0)+0.2,.2)}"><rect x="-330" y="-50" width="660" height="100" fill="none" stroke="${B}" stroke-width="7"/><text y="22" text-anchor="middle" font-family="Inter" font-weight="900" font-size="54" letter-spacing="6" fill="${B}">KİMSE ZENGİNLEŞMEDİ</text></g>`;
    o+=`</g>`;
    // bilet - koltuk benzetmesi
    const B0=w(11,0)-0.2;
    if(t>B0){const op=cl((t-B0)/0.5)*cl((63.0-t)/0.5);
      o+=`<g opacity="${op}"><rect width="1920" height="1080" fill="${P}"/>`+ros(960,420,300,70,220,6,B,.08);
      o+=`<path d="M 300 120 q 660 -80 1320 0 v 60 q -660 -60 -1320 0 z" fill="${B}" stroke="${INK}" stroke-width="5"/>`;
      o+=seats(960,800,10,0);
      const many=cl((t-w(11,6))/1.0);
      const nT=10+Math.round(10*many);
      for(let i=0;i<nT;i++){const k=pop(t,w(11,3)+i*0.05);o+=ticket(420+(i%10)*120+(i>=10?60:0),360+(i>=10?110:0)+Math.sin(t*3+i)*8,(rnd(i)-.5)*20,.85*k)}
      o+=plaque(500,640,'BİLET',String(nT),.8)+plaque(1420,640,'KOLTUK','10',.8,fadeIO(t,w(11,8),w(11,10)+1));
      o+=`</g>`;}
  } else {
    const A=w(30,3)-0.3;
    o+=`<g opacity="${cl((t-A)/0.5)*cl((w(32,0)-0.2-t)/0.5)}">`+island(t)+bakery(1420,640,0.95,t);
    o+=`<rect x="1150" y="690" width="540" height="18" fill="#6B4A2B" stroke="${INK}" stroke-width="4"/>`;
    const n=10+Math.round(10*cl((t-w(30,5))/1.2));
    for(let i=0;i<n;i++){const lx=1190+(i%10)*52,ly=668-Math.floor(i/10)*30;o+=loaf(lx,ly,.55)}
    for(let i=0;i<4;i++){const x=480+i*150;o+=pawn(x,790,0.42,i%2?G2:'#3C7A5E');o+=note(x-10,595,-8,.28)+note(x+8,581,2,.28)}
    o+=plaque(760,150,'PARA','20 ₺',1)+plaque(1160,150,'EKMEK',n+' adet',1);
    o+=priceTag(1660,470,0.8,'1 ₺',0,null,0,G);
    if(t>w(31,6)) o+=`<g transform="translate(1720,330) scale(${pop(t,w(31,6))})"><circle r="44" fill="${G2}" stroke="${INK}" stroke-width="4"/><path d="M -20 0 l 14 16 l 26 -30" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round"/></g>`;
    if(t>w(31,4)&&t<w(31,9)) o+=`<g opacity="${fadeIO(t,w(31,4),w(31,9))}">`+scaleBal(760,500,.7,0,'EKMEK','PARA')+`</g>`;
    if(t>w(31,9)){const k=cl((t-w(31,9))/0.4), melt=cl((t-w(31,17))/1.0);
      o+=`<g opacity="${fadeIO(t,w(31,9),w(32,0))}"><rect x="660" y="230" width="600" height="420" rx="20" fill="#FFF8E7" stroke="${G}" stroke-width="5"/>
      <text x="960" y="300" text-anchor="middle" font-family="Inter" font-weight="900" font-size="30" letter-spacing="5" fill="${B}">ÜRETİLMEDEN BASILAN PARA</text>
      <g transform="translate(960,${450+melt*60}) scale(${k},${k*(1-melt*.85)})">${note(0,0,0,1.3)}</g>
      ${melt>0?[...Array(5)].map((_,i)=>`<path d="M ${880+i*40} ${520+melt*40} q 8 ${30*melt} 0 ${50*melt}" stroke="${NOTE}" stroke-width="12" stroke-linecap="round" fill="none"/>`).join(''):''}</g>`;}
    o+=`</g>`;
  }
  return o}

function kuyrukSahne(t){
  const A=64.3,Z=90.9; if(t<A-0.1||t>Z+0.6) return '';
  let o=`<g opacity="${cl((t-A)/0.5)*cl((Z+0.5-t)/0.5)}">`;
  o+=`<rect x="0" y="830" width="1920" height="250" fill="#E3D6B2"/><line x1="0" y1="830" x2="1920" y2="830" stroke="${G}" stroke-width="4"/>`;
  o+=press(230,520,0.42,t)+bakery(1690,830,0.62,t);
  // fiyat
  const steps=[[w(13,11),'1 ₺'],[w(14,1),'1,2 ₺'],[w(14,2),'1,4 ₺'],[w(14,3),'1,6 ₺'],[w(14,4),'1,8 ₺']];
  let pv='1 ₺';for(const [ts,v] of steps) if(t>=ts) pv=v;
  o+=priceTag(1380,330,1.15,pv,0,'2 ₺',cl((t-w(15,9))/0.4));
  // kuyruk
  const n=6;
  for(let i=0;i<n;i++){
    let x=520+i*160,y=830;
    if(i==0){const r=ease((t-w(13,4))/1.3);x=x+(1500-x)*r;y=y-Math.sin(r*Math.PI)*60;}
    const lbl=i==0?['İLK',AU]:i==4?['MAAŞLI',G2]:i==5?['EMEKLİ',G2]:null;
    const lk=i==0?pop(t,w(13,1)):i==4?pop(t,w(15,5)):i==5?pop(t,w(15,7)):0;
    const extra=lbl&&lk>0?`<g transform="scale(${lk})"><rect x="-100" y="-148" width="200" height="44" rx="8" fill="${lbl[1]}" stroke="${INK}" stroke-width="4"/><text y="-116" text-anchor="middle" font-family="Inter" font-weight="900" font-size="28" fill="${P}">${lbl[0]}</text></g>`:'';
    o+=pawn(x,y,0.56,i%2?G2:'#3C7A5E',extra);
    if(i==5&&t>w(15,7)) o+=`<line x1="${x+50}" y1="${y}" x2="${x+38}" y2="${y-120}" stroke="#6B4A2B" stroke-width="7" stroke-linecap="round"/><path d="M ${x+38} ${y-120} q 4 -22 24 -18" fill="none" stroke="#6B4A2B" stroke-width="7" stroke-linecap="round"/>`;
    if(i==0&&t>w(13,12)) o+=loaf(x+60,y-80,.8*pop(t,w(13,12)))+`<g transform="translate(${x},${y-320}) scale(${pop(t,w(13,12))})"><circle r="30" fill="${G2}" stroke="${INK}" stroke-width="4"/><path d="M -14 0 l 10 12 l 18 -22" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"/></g>`;
  }
  // para akışı
  if(t>w(13,0)-0.3&&t<w(13,4)){const p=cl((t-w(13,0)+0.3)/0.7);o+=note(330+(520-330)*p,520+(560-520)*p-Math.sin(p*Math.PI)*80,0,.45)}
  const hand=[[w(14,0),680],[w(14,1),840],[w(14,2),1000],[w(15,1),1160],[w(15,9)-0.6,1320]];
  for(let k=0;k<hand.length-1;k++){const [a,x0]=hand[k],[b,x1]=hand[k+1];if(t>=a&&t<b){const p=ease((t-a)/(b-a));o+=note(x0+(x1-x0)*p,560-Math.sin(p*Math.PI)*70,p*180,.45)}}
  if(t>=w(15,9)-0.6){const melt=cl((t-w(16,6))/1.4);o+=`<g transform="translate(1320,${560+melt*40}) scale(1,${1-melt*.85})">${note(0,0,0,.45)}</g>`;
    if(melt>0)o+=[0,1,2].map(i=>`<path d="M ${1300+i*20} ${580+melt*30} q 4 ${20*melt} 0 ${34*melt}" stroke="${NOTE}" stroke-width="8" stroke-linecap="round" fill="none"/>`).join('');}
  // fatura
  if(t>w(16,2)-0.2&&t<w(16,5)+0.4){const k=pop(t,w(16,2)-0.2);o+=`<g transform="translate(1000,330) rotate(-4) scale(${k})" opacity="${fadeIO(t,w(16,2)-0.2,w(16,5)+0.4)}"><rect x="-150" y="-120" width="300" height="240" fill="#fff" stroke="${INK}" stroke-width="5"/><text y="-70" text-anchor="middle" font-family="Inter" font-weight="900" font-size="40" letter-spacing="6" fill="${G}">FATURA</text>${[0,1,2,3].map(i=>`<line x1="-110" y1="${-20+i*30}" x2="110" y2="${-20+i*30}" stroke="#bbb" stroke-width="5"/>`).join('')}
    ${t>w(16,3)?`<g opacity="${cl((t-w(16,3))/0.2)}"><line x1="-170" y1="-140" x2="170" y2="140" stroke="${B}" stroke-width="16"/><line x1="170" y1="-140" x2="-170" y2="140" stroke="${B}" stroke-width="16"/></g>`:''}</g>`}
  if(t>w(16,10)){const s=cl((t-w(16,10))/0.4);o+=`<g transform="translate(960,330) rotate(-8) scale(${1+1.2*(1-out3(s))})" opacity="${s*.85}"><rect x="-400" y="-70" width="800" height="140" rx="10" fill="none" stroke="${B}" stroke-width="9" stroke-dasharray="26 12"/><text y="26" text-anchor="middle" font-family="Inter" font-weight="900" font-size="74" letter-spacing="8" fill="${B}" opacity=".85">GÖRÜNMEZ VERGİ</text></g>`}
  if(t<w(13,0)) o+=`<g opacity="${fadeIO(t,w(12,0),w(13,0))}"><text x="960" y="250" text-anchor="middle" font-family="Bitstream Charter" font-weight="bold" font-size="62" fill="${G}">Yeni para herkese <tspan fill="${B}">aynı anda</tspan> ulaşmaz</text></g>`;
  return o+`</g>`}

function almanyaSahne(t){
  const A=93.1,Z=123.8; if(t<A-0.1||t>Z+0.6) return '';
  let o=`<g opacity="${cl((t-A)/0.4)*cl((Z+0.5-t)/0.5)}">`;
  o+=skyline(.9)+`<rect x="0" y="560" width="1920" height="520" fill="#E8DCBC"/><line x1="0" y1="560" x2="1920" y2="560" stroke="${G}" stroke-width="4"/>`;
  if(t>w(17,11)-0.3) o+=`<g opacity="${fadeIO(t,w(17,11)-0.3,w(18,0)+1.2)}">`+banner(960,200,pop(t,w(17,11)-0.3),'ALMANYA · 1923')+`</g>`;
  if(t<w(17,11)-0.3) o+=`<g opacity="${fadeIO(t,A+0.3,w(17,11)-0.3)}"><text x="960" y="720" text-anchor="middle" font-family="Bitstream Charter" font-weight="bold" font-size="66" fill="${G}">Herkes zam <tspan fill="${B}">beklerse</tspan> ne olur?</text></g>`;
  // dükkân
  const S0=w(18,0)-0.3,S1=w(19,0)-0.2;
  if(t>S0&&t<S1+0.5){
    const prices=[[S0,'1.000 M'],[w(18,10)+0.2,'2.000 M'],[w(18,15),'5.000 M']];let pr='1.000 M',pk=1;for(const [a,v] of prices) if(t>=a){pr=v;pk=cl((t-a)/0.3)}
    o+=`<g opacity="${fadeIO(t,S0,S1+0.5)}">`+shop(1250,780,1.2,pr,pk);
    for(let i=0;i<4;i++){const r=ease((t-w(18,7)-i*0.25)/1.6);const x=120+i*150+r*560;o+=pawn(x,900,0.5,i%2?G2:'#3C7A5E',`<rect x="60" y="-150" width="70" height="80" rx="8" fill="#C98B4E" stroke="${INK}" stroke-width="4"/>`)}
    o+=pawn(1650,900,0.5,B,`<rect x="-60" y="-150" width="120" height="110" rx="10" fill="#fff" stroke="${INK}" stroke-width="4"/>`);
    if(t>w(18,10)){const k=cl((t-w(18,10))/0.5);o+=`<g transform="translate(330,330)" opacity="${k}"><circle r="160" fill="none" stroke="${B}" stroke-width="6" stroke-dasharray="20 14" transform="rotate(${t*60})"/>
      ${['ZAM BEKLENTİSİ','HEMEN HARCA','FİYAT ARTAR'].map((s,i)=>{const a=-Math.PI/2+i*2*Math.PI/3;return `<g transform="translate(${Math.cos(a)*160},${Math.sin(a)*160})"><rect x="-120" y="-24" width="240" height="48" rx="24" fill="#FFF8E7" stroke="${INK}" stroke-width="3"/><text y="9" text-anchor="middle" font-family="Inter" font-weight="900" font-size="22" fill="${G}">${s}</text></g>`}).join('')}</g>`}
    o+=`</g>`;}
  // kafe
  const K0=w(19,0)-0.2,K1=w(20,0)-0.2;
  if(t>K0&&t<K1+0.5){
    o+=`<g opacity="${fadeIO(t,K0,K1+0.5)}"><rect x="460" y="720" width="1000" height="30" fill="#6B4A2B" stroke="${INK}" stroke-width="4"/><rect x="940" y="750" width="40" height="170" fill="#6B4A2B" stroke="${INK}" stroke-width="4"/>`;
    const tick=t<w(19,7)?0:Math.floor((t-w(19,7))/0.45);const v=5000+Math.min(tick,8)*1500;
    o+=cup(760,660,1.25,t,(v.toLocaleString('tr-TR'))+' M');
    if(t>w(19,10)) o+=`<g opacity="${cl((t-w(19,10))/0.3)}">`+cup(1180,660,1.25,t,'18.000 M')+`</g>`;
    if(t>w(19,4)) o+=`<g opacity="${fadeIO(t,w(19,4),K1)}"><rect x="1430" y="250" width="330" height="56" rx="28" fill="#FFF8E7" stroke="${B}" stroke-width="3"/><text x="1595" y="287" text-anchor="middle" font-family="Inter" font-style="italic" font-weight="700" font-size="26" fill="${B}">anlatılanlara göre</text></g>`;
    o+=`</g>`;}
  // maaş + el arabası
  const M0=w(20,0)-0.2;
  if(t>M0){
    o+=`<g opacity="${cl((t-M0)/0.4)}">`+clock(560,420,1.05,t,'GÜNDE 2 KEZ MAAŞ');
    for(let i=0;i<2;i++){const k=pop(t,w(20,2)+i*0.3);o+=`<g transform="translate(${830+i*150},400) rotate(${i?8:-6}) scale(${k})"><rect x="-55" y="-38" width="110" height="76" fill="#F4E4C1" stroke="${INK}" stroke-width="4"/><path d="M -55 -38 l 55 40 l 55 -40" fill="none" stroke="${INK}" stroke-width="4"/><text y="28" text-anchor="middle" font-family="Inter" font-weight="900" font-size="18" fill="${B}">MAAŞ</text></g>`}
    const r=(t-w(20,5))/(w(20,-1)+0.8-w(20,5)), x=-300+cl(r)*1700+Math.max(0,r-1)*900;
    if(t>w(20,5)-0.2) o+=wheelbarrow(x,850,1.1,t)+pawn(x+360,900,.5,G2);
    o+=`</g>`;}
  o+=pageTurn(t,A-0.6);
  return o+`</g>`}

function guvenSahne(t){
  const A=125.6,Z=168.2; if(t<A-0.1||t>Z+0.6) return '';
  let o=`<g opacity="${cl((t-A)/0.4)*cl((Z+0.5-t)/0.5)}">`;
  // kırılan mühür
  if(t<w(22,0)){const br=cl((t-w(21,6))/0.8);
    o+=`<g opacity="${fadeIO(t,A,w(22,0))}">`;
    if(br<=0) o+=seal(960,470,1.9,4,B,.6+.3*Math.sin(t*6));
    else o+=`<g transform="translate(${-br*120},${br*br*300}) rotate(${-br*25} 960 470)"><g clip-path="url(#halfL)">${seal(960,470,1.9,4,B,0)}</g></g><g transform="translate(${br*120},${br*br*300}) rotate(${br*25} 960 470)"><g clip-path="url(#halfR)">${seal(960,470,1.9,4,B,0)}</g></g>`;
    o+=`<text x="960" y="200" text-anchor="middle" font-family="Bitstream Charter" font-weight="bold" font-size="62" fill="${B}" opacity="${pop(t,w(21,1))}">En tehlikeli aşama</text></g>`;}
  // soba
  const S0=w(22,0)-0.2,S1=w(23,0)-0.2;
  if(t>S0&&t<S1+0.5){
    const throwK=cl((t-w(22,9))/0.9), fire=cl((t-w(22,9)-0.8)/0.5);
    o+=`<g opacity="${fadeIO(t,S0,S1+0.5)}"><rect x="0" y="820" width="1920" height="260" fill="#cdb98f"/>`+stove(560,760,1,t,fire);
    o+=pawn(1000,880,.45,G2);
    if(throwK<1) o+=bundle(1000-throwK*440,640-Math.sin(throwK*Math.PI)*220+throwK*80,throwK*300,1);
    o+=`<rect x="1240" y="250" width="330" height="56" rx="28" fill="#FFF8E7" stroke="${B}" stroke-width="3" opacity="${fadeIO(t,w(22,2),S1)}"/><text x="1405" y="287" text-anchor="middle" font-family="Inter" font-style="italic" font-weight="700" font-size="26" fill="${B}" opacity="${fadeIO(t,w(22,2),S1)}">anlatılanlara göre</text>`;
    if(t>w(22,14)) o+=`<g opacity="${cl((t-w(22,14))/0.4)}">`+scaleBal(1400,640,.62,-cl((t-w(22,14))/0.8),'ODUN','PARA')+`<text x="1400" y="330" text-anchor="middle" font-family="Inter" font-weight="900" font-size="36" fill="${B}">PARA, ODUNDAN UCUZ</text></g>`;
    o+=`</g>`;}
  // uçurtma + fotoğraf
  const U0=w(23,0)-0.2,U1=w(24,0)-0.2;
  if(t>U0&&t<U1+0.5){const ph=cl((t-w(23,7))/0.5);
    o+=`<g opacity="${fadeIO(t,U0,U1+0.5)}"><g transform="translate(960,520) scale(${1-ph*.18}) translate(-960,-520)">`;
    o+=`<rect x="300" y="130" width="1320" height="760" fill="#fff" stroke="${INK}" stroke-width="6"/><rect x="330" y="160" width="1260" height="700" fill="#dfe9ec"/><rect x="330" y="160" width="1260" height="700" fill="#d9c49a" opacity="${ph*.6}"/>`;
    o+=`<rect x="330" y="720" width="1260" height="140" fill="#cdb98f"/>`;
    const kx=[[760,360],[1200,300]];
    kx.forEach(([x,y],i)=>{const kx2=x+Math.sin(t*1.3+i)*30,ky=y+Math.cos(t*1.7+i)*20;o+=`<path d="M ${kx2} ${ky+120} Q ${kx2-80} ${ky+300} ${x-180+i*60} 760" fill="none" stroke="${INK}" stroke-width="2"/>`+kite(kx2,ky,.8*pop(t,w(23,2)+i*0.2),t+i)+pawn(x-180+i*60,800,.3,i?'#3C7A5E':G2)});
    o+=(ph>0?`<text x="960" y="920" text-anchor="middle" font-family="Bitstream Charter" font-style="italic" font-size="40" fill="${G}" opacity="${ph}">Almanya, 1922–23</text>`:'')+`</g></g>`;}
  // Macaristan
  const H0=w(24,0)-0.3,H1=w(25,0)-0.2;
  if(t>H0&&t<H1+0.5){
    o+=`<g opacity="${fadeIO(t,H0,H1+0.5)}">`+banner(960,150,pop(t,H0),'MACARİSTAN · 1946');
    const dbl=t<w(24,11)?0:Math.min(5,Math.floor((t-w(24,11))/0.4)+1);
    if(t<w(24,16)) o+=`<g opacity="${fadeIO(t,H0,w(24,16))}">`+clock(620,520,1,t*3,'HER 15 SAATTE')+priceTag(1300,560,2.0,String(Math.pow(2,dbl)),0,null,0,B)+`<text x="1300" y="720" text-anchor="middle" font-family="Inter" font-weight="900" font-size="40" fill="${B}">× 2</text></g>`;
    if(t>w(24,16)-0.2){const z=Math.min(20,Math.floor(cl((t-w(24,18))/(w(24,22)+0.5-w(24,18)))*20));
      const str='1'+'0'.repeat(z), wd=Math.max(1100,str.length*62+200), shift=Math.max(0,wd-1700);
      o+=`<g transform="translate(${960-shift/2},520)" opacity="${cl((t-w(24,16)+0.2)/0.4)}"><rect x="${-wd/2}" y="-180" width="${wd}" height="360" rx="12" fill="#E3D9B8" stroke="${G}" stroke-width="6"/><rect x="${-wd/2+24}" y="-156" width="${wd-48}" height="312" rx="6" fill="none" stroke="${B}" stroke-width="3"/>
      <text y="44" text-anchor="middle" font-family="JetBrains Mono" font-weight="800" font-size="96" fill="${B}">${str}</text>
      <text y="130" text-anchor="middle" font-family="Inter" font-weight="800" font-size="30" letter-spacing="8" fill="${G}">PENGŐ</text></g>
      <text x="960" y="820" text-anchor="middle" font-family="Inter" font-weight="900" font-size="44" fill="${G}" opacity="${cl((t-w(24,19))/0.3)}">${z} SIFIR</text>`;}
    o+=`</g>`;}
  // Zimbabve
  const Zi0=w(25,0)-0.3,Zi1=w(26,0)-0.2;
  if(t>Zi0&&t<Zi1+0.5){const fr=ease((t-w(25,9))/0.8);
    o+=`<g opacity="${fadeIO(t,Zi0,Zi1+0.5)}">`+banner(960,150,pop(t,Zi0),'ZİMBABVE · 2008');
    if(fr>0) o+=`<rect x="${960-560}" y="${520-260}" width="1120" height="520" fill="#7a4f22" stroke="${INK}" stroke-width="8" opacity="${fr}"/><rect x="${960-520}" y="${520-220}" width="1040" height="440" fill="#f5efe0" opacity="${fr}"/>`;
    o+=`<g transform="translate(960,520) scale(${(0.9-0.15*fr)*pop(t,w(25,2))})"><rect x="-520" y="-200" width="1040" height="400" rx="12" fill="#cfe3c8" stroke="${G}" stroke-width="6"/><rect x="-494" y="-174" width="988" height="348" rx="6" fill="none" stroke="${G}" stroke-width="2" stroke-dasharray="3 5"/>
      <text y="-60" text-anchor="middle" font-family="Inter" font-weight="800" font-size="30" letter-spacing="8" fill="${G}">ZİMBABVE DOLARI</text>
      <text y="50" text-anchor="middle" font-family="Bitstream Charter" font-weight="bold" font-size="92" fill="${B}">100.000.000.000.000</text>
      <text y="120" text-anchor="middle" font-family="Inter" font-weight="800" font-size="30" letter-spacing="6" fill="${G}">YÜZ TRİLYON</text></g>`;
    if(t>w(25,10)) o+=`<g transform="translate(1380,820) rotate(-6) scale(${pop(t,w(25,10))})"><rect x="-160" y="-40" width="320" height="80" fill="#FFF8E7" stroke="${INK}" stroke-width="4"/><text y="14" text-anchor="middle" font-family="Inter" font-weight="900" font-size="36" letter-spacing="4" fill="${B}">KOLEKSİYON</text></g>`;
    if(t>w(25,17)) o+=`<g transform="translate(560,820) rotate(5) scale(${pop(t,w(25,17))})"><rect x="-130" y="-40" width="260" height="80" fill="${AU}" stroke="${INK}" stroke-width="4"/><text y="14" text-anchor="middle" font-family="Inter" font-weight="900" font-size="38" letter-spacing="4" fill="${INK}">HATIRA</text></g>`;
    o+=`</g>`;}
  // sıfırlar düşer
  const G0=w(26,0)-0.2;
  if(t>G0){const fall=cl((t-w(26,4))/1.6);
    o+=`<g opacity="${cl((t-G0)/0.4)}"><g transform="translate(960,470)"><rect x="-560" y="-220" width="1120" height="440" rx="12" fill="#E3D9B8" stroke="${G}" stroke-width="6"/><rect x="-530" y="-190" width="1060" height="380" rx="6" fill="none" stroke="${B}" stroke-width="3"/>
      <text x="-380" y="40" font-family="Bitstream Charter" font-weight="bold" font-size="110" fill="${B}">1</text>
      ${[...Array(9)].map((_,i)=>{const d=cl(fall*1.6-i*0.07),x=-300+i*78,y=40+d*d*700;return `<text x="${x}" y="${y}" transform="rotate(${d*(rnd(i)-.5)*200} ${x+30} ${y-40})" font-family="Bitstream Charter" font-weight="bold" font-size="110" fill="${B}" opacity="${1-cl((d-.7)/.3)}">0</text>`}).join('')}</g>
      ${t>w(26,8)?`<text x="960" y="820" text-anchor="middle" font-family="Bitstream Charter" font-weight="bold" font-size="60" fill="${G}" opacity="${cl((t-w(26,8))/0.4)}">Güven yoksa, sıfırın değeri yok.</text>`:''}</g>`;}
  return o+`</g>`}

function turkiyeSahne(t){
  const A=170.0,Z=w(29,0)-0.1; if(t<A-0.1||t>Z+0.6) return '';
  let o=`<g opacity="${cl((t-A)/0.4)*cl((Z+0.5-t)/0.5)}">`;
  const T1=w(28,0)-0.2;
  if(t<T1+0.4){
    o+=`<g opacity="${cl((T1+0.4-t)/0.4)}">`+banner(960,150,pop(t,w(27,0)),"TÜRKİYE · 1990'LAR");
    if(t<w(27,6)) o+=`<g opacity="${fadeIO(t,A+0.2,w(27,6)-0.1)}">`+['1.000.000','5.000.000','10.000.000'].map((v,i)=>`<g transform="translate(${960+(i-1)*90},${560+Math.abs(i-1)*20}) rotate(${(i-1)*14}) scale(${pop(t,w(27,0)+i*0.25)*0.95})"><rect x="-260" y="-130" width="520" height="260" rx="10" fill="${['#E3D9B8','#d8e4cf','#e8d3c9'][i]}" stroke="${G}" stroke-width="5"/><rect x="-240" y="-110" width="480" height="220" rx="6" fill="none" stroke="${B}" stroke-width="2"/><text y="22" text-anchor="middle" font-family="Bitstream Charter" font-weight="bold" font-size="64" fill="${B}">${v}</text><text y="80" text-anchor="middle" font-family="Inter" font-weight="800" font-size="22" letter-spacing="6" fill="${G}">TÜRK LİRASI</text></g>`).join('')+`</g>`;
    if(t>w(27,6)-0.2) o+=`<g opacity="${fadeIO(t,w(27,6)-0.2,w(27,22)-0.3)}"><g transform="translate(560,500) scale(${pop(t,w(27,6)-0.2)})"><circle r="120" fill="none" stroke="#B5762F" stroke-width="70"/><circle r="120" fill="none" stroke="#7a4f22" stroke-width="4" stroke-dasharray="6 12"/></g>${plaque(560,760,'SİMİT','binler',.85)}</g>`;
    if(t>w(27,8)-0.2) o+=`<g opacity="${fadeIO(t,w(27,8)-0.2,w(27,22)-0.3)}"><g transform="translate(1360,500) scale(${pop(t,w(27,8)-0.2)})"><path d="M -160 40 v -90 q 0 -40 40 -40 h 40 q 20 60 100 70 q 100 10 140 60 v 40 z" fill="#5a3a17" stroke="${INK}" stroke-width="6"/><rect x="-170" y="40" width="340" height="30" rx="10" fill="${INK}"/></g>${plaque(1360,760,'AYAKKABI','milyonlar',.85)}</g>`;
    if(t>w(27,12)-0.2&&t<w(27,22)) o+=`<g opacity="${fadeIO(t,w(27,12)-0.2,w(27,22))}"><rect x="660" y="640" width="600" height="200" fill="#8A5A3B" stroke="${INK}" stroke-width="6"/><text x="960" y="760" text-anchor="middle" font-family="Bitstream Charter" font-weight="bold" font-size="56" fill="${P}">BAKKAL</text>
      ${pawn(820,640,.4,G2)}<g transform="translate(1180,330) scale(${pop(t,w(27,14))})"><path d="M -230 -80 h 460 v 140 h -330 l -60 50 l 10 -50 h -80 z" fill="#fff" stroke="${INK}" stroke-width="5"/><text y="12" text-anchor="middle" font-family="Bitstream Charter" font-style="italic" font-weight="bold" font-size="46" fill="${G}">“Bir milyon versene!”</text></g></g>`;
    if(t>w(27,22)-0.3) o+=bigNote(960,1300-760*out3((t-w(27,22)+0.3)/0.7),.85,1,t);
    o+=`</g>`;}
  // 2005
  if(t>T1){
    const fl=cl((t-w(28,2))/0.6);
    o+=`<g opacity="${cl((t-T1)/0.4)}">`;
    if(t<w(28,13)) o+=calendar(960,480,1.2,fl<.5?'31':'1',fl<.5?'ARALIK':'OCAK',fl<.5?'2004':'2005',fl);
    // sıfırlar uçar
    if(t>w(28,10)-0.6&&t<w(28,13)+0.3){const z=cl((t-w(28,10)+0.2)/1.0);
      o+=`<g opacity="${fadeIO(t,w(28,10)-0.6,w(28,13)+0.3)}"><rect width="1920" height="1080" fill="${P}"/><g transform="translate(960,500)"><rect x="-600" y="-180" width="1200" height="360" rx="12" fill="#E3D9B8" stroke="${G}" stroke-width="6"/>
      <text x="-460" y="50" font-family="Bitstream Charter" font-weight="bold" font-size="140" fill="${B}">20</text>
      ${'.000.000'.split('').map((c,i)=>{const d=cl(z*1.8-i*0.1);const xs=[-290,-255,-180,-105,-30,5,80,155];return `<text x="${xs[i]}" y="${50-d*600}" font-family="Bitstream Charter" font-weight="bold" font-size="140" fill="${B}" opacity="${1-d}">${c}</text>`}).join('')}
      <text x="-270" y="50" font-family="Inter" font-weight="900" font-size="110" fill="${G}" opacity="${cl((z-.7)/.3)}">YTL</text></g></g>`;}
    // uyuyan milyoner
    if(t>w(28,13)-0.2&&t<w(28,23)+0.2){const day=cl((t-w(28,17))/0.8);
      o+=`<g opacity="${fadeIO(t,w(28,13)-0.2,w(28,23)+0.2)}"><rect width="1920" height="1080" fill="${day>0?`rgb(${Math.round(40+202*day)},${Math.round(50+182*day)},${Math.round(80+127*day)})`:'#283250'}" opacity=".95"/>
      <circle cx="${1500}" cy="${250+day*500}" r="70" fill="#f4f1d0" opacity="${1-day}"/><circle cx="${400}" cy="${780-day*500}" r="90" fill="#FFD23F" opacity="${day}"/>
      <rect x="560" y="640" width="800" height="120" rx="20" fill="#8A5A3B" stroke="${INK}" stroke-width="6"/><rect x="600" y="590" width="700" height="70" rx="30" fill="#f0e6cf" stroke="${INK}" stroke-width="5"/>
      <g transform="translate(780,${650-day*40}) rotate(${-80+day*80} 0 0)">${pawn(0,0,.62,G2,`<g><rect x="-110" y="-140" width="220" height="44" fill="${day>.5?'#ccc':AU}" stroke="${INK}" stroke-width="4" transform="rotate(-12)"/><text x="0" y="-110" text-anchor="middle" font-family="Inter" font-weight="900" font-size="28" fill="${INK}" transform="rotate(-12)">${day>.5?'20 YTL':'MİLYONER'}</text></g>`)}</g>
      ${day<.3?`<text x="900" y="480" font-family="Bitstream Charter" font-weight="bold" font-size="60" fill="#fff" opacity="${.8*(1-day*3)}">z z z</text>`:''}</g>`;}
    if(t>w(28,23)-0.3) o+=`<g opacity="${cl((t-w(28,23)+0.3)/0.3)}"><rect width="1920" height="1080" fill="${P}"/>${ros(960,520,330,80,250,6,G,.1)}</g>`+(t>w(28,28)?`<g transform="translate(960,500) scale(${1+1.4*(1-out3(cl((t-w(28,28))/0.35)))})" opacity="${cl((t-w(28,28))/0.12)}">`+coin(0,0,1.6,'KURUŞ')+`</g>`:'');
    o+=`</g>`;}
  return o+`</g>`}

function cevapSahne(t){
  const A=w(29,0)-0.3; if(t<A) return '';
  let o='';
  // soru
  if(t<w(30,3)+0.3){o+=`<g opacity="${fadeIO(t,A,w(30,3)+0.3)}">`+press(960,520,.8,t,t>w(30,0)?1:0.1)+qmark(1420,330,pop(t,w(29,0)))+(t>w(30,0)?`<g transform="translate(560,300) rotate(-10) scale(${pop(t,w(30,0))})"><rect x="-130" y="-55" width="260" height="110" fill="none" stroke="${G2}" stroke-width="8"/><text y="24" text-anchor="middle" font-family="Inter" font-weight="900" font-size="64" fill="${G2}">BASAR</text></g>`:'')+`</g>`}
  o+=adaSahne(t,2);
  // defter tam
  const D0=w(32,0)-0.2,D1=w(33,0)-0.2;
  if(t>D0&&t<D1+0.5){o+=`<g opacity="${fadeIO(t,D0,D1+0.5)}"><rect width="1920" height="1080" fill="${P}" opacity=".96"/>`;
    if(t<w(32,5)-0.1) o+=notebook(960,500,1.25,4,1,.5+.5*Math.sin(t*4));
    else {const s=cl((t-w(32,10))/0.4);o+=`<g transform="translate(960,470) scale(${0.95})">${bigNote(0,0,1,1,t)}</g>`+(t>w(32,10)?`<g transform="translate(960,470) rotate(-10) scale(${1+1.4*(1-out3(s))})" opacity="${s}"><rect x="-430" y="-80" width="860" height="160" rx="12" fill="#FFF8E7" fill-opacity=".9" stroke="${G2}" stroke-width="10"/><text y="32" text-anchor="middle" font-family="Inter" font-weight="900" font-size="86" letter-spacing="8" fill="${G2}">GÜVEN BELGESİ</text></g>`:'')}
    o+=`</g>`;}
  // sonraki bölüm
  const N0=w(33,0)-0.2;
  if(t>N0&&t<V.END){o+=`<g opacity="${cl((t-N0)/0.4)*cl((225.9-t)/0.4)}">`;
    if(t<w(33,8)-0.2) o+=press(960,540,.85,t)+qmark(1450,330,pop(t,w(33,4)));
    else o+=bank(960,760,1.05,t)+(t>w(33,8)?banner(960,140,pop(t,w(33,8)),'SONRAKİ BÖLÜM'):'')+(t>w(33,14)?qmark(1500,420,pop(t,w(33,14))):'');
    o+=`</g>`;}
  // kapanış
  if(t>225.6){const k=cl((t-225.6)/0.5);o+=`<g opacity="${k}"><rect width="1920" height="1080" fill="${P}"/>${ros(960,520,330,80,250,6,G,.1)}
    <g transform="translate(960,470) rotate(-8) scale(${1+1.3*(1-out3(cl((t-226.0)/0.35)))})" opacity="${cl((t-226.0)/0.15)}"><circle r="220" fill="none" stroke="${B}" stroke-width="14"/><circle r="190" fill="none" stroke="${B}" stroke-width="3"/>
    <text y="-60" text-anchor="middle" font-family="Inter" font-weight="800" font-size="30" letter-spacing="8" fill="${B}">EKONOMİ SERİSİ</text>
    <text y="40" text-anchor="middle" font-family="Bitstream Charter" font-weight="bold" font-size="70" fill="${B}">Merakoloji</text>
    <text y="110" text-anchor="middle" font-family="Inter" font-weight="800" font-size="30" letter-spacing="8" fill="${B}">BÖLÜM 1</text></g>
    <text x="960" y="840" text-anchor="middle" font-family="Inter" font-weight="700" font-size="34" fill="${G}" opacity="${cl((t-227)/0.5)}">Merak ettiğin konuyu yorumlara yaz</text></g>`}
  return o}

/* ---------- cevap defteri (duraklamalar + köşe) ---------- */
function defterKatman(t){
  let o='';
  V.GAPS.forEach(([a,b],i)=>{
    if(t>a-0.3&&t<b+0.5){const k=cl((t-a+0.3)/0.35), out=cl((t-b)/0.5);
      o+=`<rect width="1920" height="1080" fill="${P}" opacity="${.85*k*(1-out)}"/>`;
      const s=1.05*(1-out)+0.0*out;
      o+=`<g opacity="${1-out}">`+notebook(960,500,1.22*s*pop(t,a-0.3),i+1,cl((t-a)/1.1))+`</g>`;}
  });
  return o}

/* ---------- ana çizim ---------- */
function draw(t){
  let o=DEFS+`<defs><clipPath id="halfL"><rect x="0" y="0" width="960" height="1080"/></clipPath><clipPath id="halfR"><rect x="960" y="0" width="960" height="1080"/></clipPath></defs>`+BG;
  const cam=1+0.012*Math.sin(t*0.6);
  o+=`<g transform="translate(960,540) scale(${cam}) translate(-960,-540)">`;
  if(t<32.0) o+=kancaSahne(t);
  if(t>31.0&&t<64.5) o+=adaSahne(t,1);
  o+=kuyrukSahne(t)+almanyaSahne(t)+guvenSahne(t)+turkiyeSahne(t)+cevapSahne(t);
  o+=`</g>`+defterKatman(t);
  if(window.SAHNE_SADECE) return o;
  o+=BORDER+`<rect width="1920" height="1080" fill="url(#vig)"/>`;
  o+=subtitle(t);
  if(t<0.4) o+=`<rect width="1920" height="1080" fill="#000" opacity="${1-t/0.4}"/>`;
  if(t>V.END-0.5) o+=`<rect width="1920" height="1080" fill="#000" opacity="${cl((t-V.END+0.5)/0.5)}"/>`;
  document.getElementById('s').innerHTML=o;
}
window.draw=draw;
