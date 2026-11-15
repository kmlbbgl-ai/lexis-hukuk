/* Merakoloji · Ekonomi · Bölüm 1 — Kanca (0–31.4 sn), Banknot Gravürü tarzı */
const G='#1F4D3A',G2='#2C6A50',INK='#0f2e22',B='#8C2F39',AU='#B8902A',P='#F2E8CF',NOTE='#D7E6CF';
const cl=v=>Math.min(1,Math.max(0,v));
const ease=v=>{v=cl(v);return v<.5?2*v*v:1-Math.pow(-2*v+2,2)/2};
const out3=v=>1-Math.pow(1-cl(v),3);
const back=v=>{v=cl(v);const c=1.9;return 1+(c+1)*Math.pow(v-1,3)+c*Math.pow(v-1,2)};
const win=(t,a,b,f=.3)=>cl((t-a)/f)*cl((b-t)/f);           // a..b arası görünürlük
function rnd(i){const x=Math.sin(i*127.1+311.7)*43758.5453;return x-Math.floor(x)}

/* ---------- sabit arka plan ---------- */
const _rc={};
function ros(...A){const k=A.join(',');return _rc[k]||(_rc[k]=ros0(...A))}
function ros0(cx,cy,R,r,d,n,col,op){let s='';for(let k=0;k<n;k++){let ph=k*2*Math.PI/n,pts=[];for(let t=0;t<=Math.PI*2*7+0.01;t+=0.03){let x=(R-r)*Math.cos(t)+d*Math.cos((R-r)/r*t+ph),y=(R-r)*Math.sin(t)-d*Math.sin((R-r)/r*t+ph);pts.push((cx+x).toFixed(1)+','+(cy+y).toFixed(1))}s+=`<polyline points="${pts.join(' ')}" fill="none" stroke="${col}" stroke-width="1" opacity="${op}"/>`}return s}
const DEFS=`<defs>
<pattern id="hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><line x1="0" y1="0" x2="0" y2="8" stroke="${INK}" stroke-width="2.2"/></pattern>
<pattern id="hatchL" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(-30)"><line x1="0" y1="0" x2="0" y2="10" stroke="${G}" stroke-width="1" opacity=".35"/></pattern>
<radialGradient id="vig" cx="50%" cy="50%" r="75%"><stop offset="60%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#5a4320" stop-opacity=".3"/></radialGradient>
<radialGradient id="glowR" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="${B}" stop-opacity=".55"/><stop offset="1" stop-color="${B}" stop-opacity="0"/></radialGradient>
<clipPath id="balloonClip"><ellipse cx="0" cy="0" rx="430" ry="250"/></clipPath>
</defs>`;
const BG=`<rect width="1920" height="1080" fill="${P}"/>`+ros(220,200,170,40,130,5,G,.09)+ros(1700,880,170,40,130,5,B,.08)+ros(1700,200,120,30,90,4,G,.07)+ros(220,880,120,30,90,4,B,.07);
const BORDER=`<rect x="28" y="28" width="1864" height="1024" fill="none" stroke="${G}" stroke-width="6"/>
<rect x="44" y="44" width="1832" height="992" fill="none" stroke="${AU}" stroke-width="2" stroke-dasharray="2 6"/>`+
[[28,28],[1892,28],[28,1052],[1892,1052]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="22" fill="${P}" stroke="${G}" stroke-width="4"/><circle cx="${x}" cy="${y}" r="10" fill="${AU}"/>`).join('');

/* ---------- çizim parçaları ---------- */
function pawn(x,y,s,col=G2,extra=''){ // yüzsüz piyon; (x,y)=taban ortası
  return `<g transform="translate(${x},${y}) scale(${s})">
  <ellipse cx="0" cy="0" rx="95" ry="16" fill="${INK}" opacity=".18"/>
  <path d="M -75 -10 q 0 -150 75 -190 q 75 40 75 190 z" fill="${col}" stroke="${INK}" stroke-width="6"/>
  <path d="M -75 -10 q 0 -150 75 -190 q 75 40 75 190 z" fill="url(#hatch)" opacity=".18"/>
  <rect x="-95" y="-22" width="190" height="30" rx="15" fill="${col}" stroke="${INK}" stroke-width="6"/>
  <circle cx="0" cy="-245" r="62" fill="${col}" stroke="${INK}" stroke-width="6"/>
  <path d="M -30 -280 a 40 40 0 0 1 45 -10" fill="none" stroke="#fff" stroke-width="7" opacity=".35" stroke-linecap="round"/>
  ${extra}</g>`}
function wallet(x,y,s,open){ // open 0..1: kapak yukarı açılır
  const fl=1-2*open;
  return `<g transform="translate(${x},${y}) scale(${s})">
  ${open>0.5?`<rect x="-62" y="-34" width="124" height="20" rx="4" fill="${INK}" opacity=".8"/>`:''}
  <rect x="-70" y="-20" width="140" height="90" rx="12" fill="#6B4A2B" stroke="${INK}" stroke-width="5"/>
  <rect x="-58" y="-8" width="116" height="66" rx="6" fill="none" stroke="#C49A6C" stroke-width="2" stroke-dasharray="5 5"/>
  <g transform="translate(0,-20) scale(1,${fl})"><path d="M -70 0 h 140 v 34 q -70 22 -140 0 z" fill="#7d5733" stroke="${INK}" stroke-width="${5/Math.max(.2,Math.abs(fl))}"/></g>
  <circle cx="0" cy="${-20+28*fl}" r="7" fill="${AU}" stroke="${INK}" stroke-width="3"/></g>`}
function fly(x,y,t,s=1){const w=Math.abs(Math.sin(t*70));
  return `<g transform="translate(${x},${y}) scale(${s})">
  <ellipse cx="-9" cy="-10" rx="11" ry="${3+12*w}" fill="#fff" stroke="${INK}" stroke-width="2" opacity=".85" transform="rotate(-25 -9 -10)"/>
  <ellipse cx="9" cy="-10" rx="11" ry="${3+12*w}" fill="#fff" stroke="${INK}" stroke-width="2" opacity=".85" transform="rotate(25 9 -10)"/>
  <ellipse cx="0" cy="0" rx="10" ry="14" fill="${INK}"/><circle cx="0" cy="-14" r="7" fill="${INK}"/></g>`}
function note(x,y,rot,sc,val='100'){return `<g transform="translate(${x},${y}) rotate(${rot}) scale(${sc})">
  <rect x="-110" y="-55" width="220" height="110" rx="6" fill="${NOTE}" stroke="${G}" stroke-width="4"/>
  <rect x="-110" y="-55" width="220" height="110" rx="6" fill="url(#hatchL)"/>
  <rect x="-98" y="-43" width="196" height="86" rx="4" fill="none" stroke="${G}" stroke-width="1.5"/>
  <ellipse cx="-40" cy="0" rx="34" ry="36" fill="none" stroke="${G}" stroke-width="3"/>
  <text x="55" y="16" text-anchor="middle" font-family="Bitstream Charter" font-weight="bold" font-size="46" fill="${G}">${val}</text></g>`}
function press(x,y,s,t,spin=1){return `<g transform="translate(${x},${y}) scale(${s})">
  <rect x="-280" y="-180" width="560" height="360" rx="14" fill="${G}" stroke="${INK}" stroke-width="5"/>
  <rect x="-280" y="-180" width="560" height="360" rx="14" fill="url(#hatch)" opacity=".35"/>
  <rect x="-240" y="-130" width="300" height="120" rx="8" fill="${P}" stroke="${INK}" stroke-width="4"/>
  <text x="-90" y="-75" text-anchor="middle" font-family="Bitstream Charter" font-weight="bold" font-size="34" fill="${G}">MATBAA</text>
  <text x="-90" y="-35" text-anchor="middle" font-family="Inter" font-size="20" letter-spacing="4" fill="${B}">BASKI ADEDİ: ∞</text>
  ${[-140,40].map(cx=>`<g transform="translate(${cx},-200) rotate(${t*200*spin})"><circle r="70" fill="${G2}" stroke="${INK}" stroke-width="5"/><line x1="-60" y1="0" x2="60" y2="0" stroke="${INK}" stroke-width="5"/><circle r="18" fill="${AU}" stroke="${INK}" stroke-width="3"/></g>`).join('')}
  <rect x="-220" y="-285" width="340" height="14" fill="${INK}"/>
  <g transform="translate(190,80) rotate(${t*90*spin})">${[...Array(12)].map((_,i)=>`<rect x="-9" y="-62" width="18" height="22" fill="${AU}" stroke="${INK}" stroke-width="3" transform="rotate(${i*30})"/>`).join('')}<circle r="48" fill="${AU}" stroke="${INK}" stroke-width="4"/><circle r="14" fill="${INK}"/></g>
  <rect x="260" y="0" width="40" height="60" fill="${INK}"/>
  <rect x="-250" y="180" width="70" height="40" fill="${INK}"/><rect x="180" y="180" width="70" height="40" fill="${INK}"/></g>`}
function tag(x,y,rot,s,txt){return `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})">
  <path d="M -80 -38 h 130 l 34 38 l -34 38 h -130 z" fill="#FFF8E7" stroke="${B}" stroke-width="4"/><circle cx="60" cy="0" r="6" fill="${B}"/>
  <text x="-12" y="13" text-anchor="middle" font-family="Inter" font-weight="800" font-size="34" letter-spacing="2" fill="${B}">${txt}</text></g>`}
function seal(x,y,s,num,col,glow=0){return `<g transform="translate(${x},${y}) scale(${s})">
  ${glow>0?`<circle r="${150}" fill="url(#glowR)" opacity="${glow}"/>`:''}
  <path d="${[...Array(16)].map((_,i)=>{const a=i/16*Math.PI*2,r=i%2?78:88;return (i?'L':'M')+(Math.cos(a)*r).toFixed(1)+' '+(Math.sin(a)*r).toFixed(1)}).join(' ')} Z" fill="${col}" stroke="${INK}" stroke-width="5"/>
  <circle r="58" fill="none" stroke="${P}" stroke-width="3" opacity=".7"/>
  <text y="26" text-anchor="middle" font-family="Bitstream Charter" font-weight="bold" font-size="76" fill="${P}">${num}</text></g>`}
function bigNote(x,y,s,stampK,t){ // 20.000.000
  const sh=stampK>0&&stampK<1?Math.sin(t*90)*14*(1-stampK):0;
  return `<g transform="translate(${x+sh},${y}) scale(${s})">
  <rect x="-560" y="-270" width="1120" height="540" rx="14" fill="#E3D9B8" stroke="${G}" stroke-width="7"/>
  <rect x="-560" y="-270" width="1120" height="540" rx="14" fill="url(#hatchL)"/>
  <rect x="-530" y="-240" width="1060" height="480" rx="8" fill="none" stroke="${B}" stroke-width="3"/>
  <rect x="-515" y="-225" width="1030" height="450" rx="6" fill="none" stroke="${G}" stroke-width="1.5" stroke-dasharray="3 5"/>
  ${ros(-330,10,150,36,110,5,G,.30)}
  <ellipse cx="-330" cy="10" rx="120" ry="140" fill="${P}" stroke="${G}" stroke-width="4"/>
  <text x="-330" y="30" text-anchor="middle" font-family="Bitstream Charter" font-weight="bold" font-size="64" fill="${G}" opacity=".5">₺</text>
  <text x="170" y="-150" text-anchor="middle" font-family="Inter" font-weight="800" font-size="30" letter-spacing="10" fill="${G}">TÜRK LİRASI</text>
  <text x="170" y="175" text-anchor="middle" font-family="Bitstream Charter" font-style="italic" font-size="30" fill="${G}">yirmi milyon Türk lirası</text>
  ${stampK>0?`<g transform="translate(170,40) scale(${1+1.2*(1-out3(stampK))})" opacity="${cl(stampK*3)}"><text text-anchor="middle" y="40" font-family="Bitstream Charter" font-weight="bold" font-size="148" fill="${B}" letter-spacing="2">20.000.000</text></g>`:''}
  </g>`}
function banner(x,y,s,txt){return `<g transform="translate(${x},${y}) scale(${s})">
  <path d="M -330 -40 h 660 l -30 40 l 30 40 h -660 l 30 -40 z" fill="${B}" stroke="${INK}" stroke-width="4"/>
  <text y="14" text-anchor="middle" font-family="Inter" font-weight="800" font-size="36" letter-spacing="8" fill="${P}">${txt}</text></g>`}
function qmark(x,y,s){return `<g transform="translate(${x},${y}) scale(${s})"><text text-anchor="middle" y="90" font-family="Bitstream Charter" font-weight="bold" font-size="300" fill="${B}" stroke="${INK}" stroke-width="4">?</text></g>`}

/* ---------- altyazı ---------- */
function subtitle(t){
  const c=(window.SUB||[]).find(c=>t>=c.t0-0.05&&t<c.t1); if(!c) return '';
  const fs=46, txt=c.w.map(w=>w[0]).join(' '); const w=txt.length*fs*0.52;
  const sp=c.w.map(([s,a,b])=>`<tspan fill="${t>=a-0.03?(t<b+0.05?'#FFD23F':'#FFFFFF'):'#FFFFFF'}" ${t>=a-0.03&&t<b+0.05?'':'opacity="1"'}>${s} </tspan>`).join('');
  return `<g opacity="${cl((t-c.t0+0.05)/0.12)}"><rect x="${960-w/2-40}" y="928" width="${w+80}" height="86" rx="18" fill="rgba(10,14,20,.8)"/>
  <text x="960" y="987" text-anchor="middle" font-family="Inter" font-weight="700" font-size="${fs}">${sp}</text></g>`;
}


/* Altyazıda yazıyla okunan yılları rakamla göster */
(function(){const P=[[['bin','dokuz','yüz','yirmi','üç'],'1923'],[['bin','dokuz','yüz','kırk','altıda'],'1946’da'],[['bir','ocak','iki','bin','beşte,'],'1 Ocak 2005’te,']];
 (window.SUB||[]).forEach(c=>{for(const [pat,rep] of P){for(let i=0;i+pat.length<=c.w.length;i++){
   if(pat.every((p,j)=>c.w[i+j][0].toLocaleLowerCase('tr')===p)){c.w.splice(i,pat.length,[rep,c.w[i][1],c.w[i+pat.length-1][2]]);}}}});})();
