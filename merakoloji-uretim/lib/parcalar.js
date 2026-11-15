/* Banknot Gravürü ek parçalar (Bölüm 1'den) */
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
function notebookB1(x,y,s,n,writeK,glowAll=0){ // n madde; son madde writeK ile yazılır
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

