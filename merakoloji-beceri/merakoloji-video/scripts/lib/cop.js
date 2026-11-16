/* Merakoloji standart karakter: ÇÖP ADAM + dolu, renkli eşyalar.
   cop(x,y,s,o): y = ayak tabanı. o = {la,ra,ll,rl: noktalar (omuz 0,-230 / kalça 0,-120'den sonra),
   head: baş dolgusu, c: çizgi rengi, front, back: ek SVG, rot, eş: [eşya adları], tema:'b'|'tahta'|'gece'} */
const PAL={yesil:'#2F6B55',hardal:'#C49A2C',bordo:'#8C2F39',lacivert:'#2E4A6B',kiremit:'#B5562E',gri:'#8A8F8C',krem:'#EBDDBB',altin:'#FFD23F'};
const TEB={beyaz:'#F4F1E6',sari:'#F2D24B',pembe:'#F2A7B8',mavi:'#8CC6EE',yesil:'#9BE3A8',turuncu:'#F5A35C'};
const _pl=(pts,w,c,f)=>`<polyline points="${pts.map(p=>p.join(',')).join(' ')}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"${f?` filter="${f}"`:''}/>`;
// hazır pozlar
const POZ={
 dur:{la:[[-50,-160],[-60,-100]],ra:[[50,-160],[60,-100]],ll:[[-40,0]],rl:[[40,0]]},
 elsalla:{la:[[-50,-160],[-60,-100]],ra:[[70,-290],[100,-350]],ll:[[-40,0]],rl:[[40,0]]},
 parmak:{la:[[-50,-160],[-60,-100]],ra:[[60,-300],[70,-390]],ll:[[-40,0]],rl:[[40,0]]},
 goster:{la:[[-50,-160],[-60,-100]],ra:[[110,-260],[180,-300]],ll:[[-40,0]],rl:[[40,0]]},
 zipla:{la:[[-70,-310],[-60,-380]],ra:[[70,-310],[60,-380]],ll:[[-50,-60],[-30,0]],rl:[[50,-70],[80,-20]]},
 basielinde:{la:[[-60,-290],[-30,-330]],ra:[[60,-290],[30,-330]],ll:[[-50,-60],[-30,0]],rl:[[50,-60],[30,0]]},
 telefon:{la:[[-50,-160],[-60,-100]],ra:[[60,-250],[40,-300]],ll:[[-40,0]],rl:[[40,0]]},
 uzgun:{la:[[-40,-150],[-50,-90]],ra:[[40,-150],[50,-90]],ll:[[-30,0]],rl:[[30,0]]},
 yuru1:{la:[[-60,-160],[-90,-110]],ra:[[60,-170],[100,-200]],ll:[[-50,-50],[-70,10]],rl:[[40,-50],[70,0]]},
 yuru2:{la:[[-60,-170],[-100,-200]],ra:[[60,-160],[90,-110]],ll:[[-40,-50],[-70,0]],rl:[[50,-50],[70,10]]},
 kos1:{la:[[-70,-180],[-110,-230]],ra:[[70,-190],[120,-150]],ll:[[-60,-60],[-110,-30]],rl:[[50,-50],[60,10]]},
 kos2:{la:[[-70,-190],[-120,-150]],ra:[[70,-180],[110,-230]],ll:[[-50,-50],[-60,10]],rl:[[60,-60],[110,-30]]},
 otur:{la:[[-50,-160],[-60,-100]],ra:[[50,-160],[60,-100]],ll:[[-60,-120],[-60,0]],rl:[[60,-120],[60,0]]},
 kucakla:{la:[[-60,-200],[-20,-170]],ra:[[60,-200],[20,-170]],ll:[[-40,0]],rl:[[40,0]]},
 omuzsilk:{la:[[-70,-240],[-100,-280]],ra:[[70,-240],[100,-280]],ll:[[-40,0]],rl:[[40,0]]},
 kalkan:{la:[[-70,-320],[-10,-370]],ra:[[70,-320],[10,-370]],ll:[[-50,-60],[-40,0]],rl:[[50,-60],[40,0]]},
};
function lerpPoz(a,b,k){const o={};for(const n of ['la','ra','ll','rl'])o[n]=a[n].map((p,i)=>[p[0]+(b[n][i][0]-p[0])*k,p[1]+(b[n][i][1]-p[1])*k]);return o}
// eşyalar (cop koordinatı, baş merkezi 0,-300)
const ES={
 takke:(c=PAL.bordo)=>`<path d="M -48 -322 q 48 -62 96 0 z" fill="${c}" stroke="${INK}" stroke-width="6"/><circle cx="0" cy="-372" r="7" fill="${c}" stroke="${INK}" stroke-width="4"/>`,
 baston:()=>`<line x1="100" y1="-110" x2="120" y2="0" stroke="#6B4A2B" stroke-width="16" stroke-linecap="round"/><path d="M 100 -110 q -6 -34 26 -40" fill="none" stroke="#6B4A2B" stroke-width="16" stroke-linecap="round"/>`,
 gozluk:()=>`<circle cx="-20" cy="-300" r="18" fill="#dfeef2" stroke="${INK}" stroke-width="7"/><circle cx="20" cy="-300" r="18" fill="#dfeef2" stroke="${INK}" stroke-width="7"/>`,
 kitap:(c=PAL.yesil)=>`<rect x="-80" y="-150" width="64" height="80" rx="6" fill="${c}" stroke="${INK}" stroke-width="5"/><line x1="-48" y1="-150" x2="-48" y2="-70" stroke="${P}" stroke-width="4"/>`,
 topuz:(c=PAL.kiremit)=>`<circle cx="0" cy="-358" r="26" fill="${c}" stroke="${INK}" stroke-width="6"/>`,
 elbise:(c=PAL.kiremit)=>`<path d="M 0 -230 l -55 115 h 110 z" fill="${c}" stroke="${INK}" stroke-width="6"/>`,
 canta:(c=PAL.hardal)=>`<rect x="62" y="-110" width="64" height="56" rx="10" fill="${c}" stroke="${INK}" stroke-width="5"/><path d="M 72 -110 q 22 -34 44 0" fill="none" stroke="${INK}" stroke-width="5"/>`,
 tac:()=>`<path d="M -46 -336 l 0 -40 l 23 20 l 23 -34 l 23 34 l 23 -20 l 0 40 z" fill="${PAL.altin}" stroke="${INK}" stroke-width="6"/><circle cx="0" cy="-352" r="6" fill="${PAL.bordo}"/>`,
 tac2:()=>`<rect x="-44" y="-372" width="88" height="30" fill="${PAL.altin}" stroke="${INK}" stroke-width="5"/>${[-32,-11,11,32].map(x=>`<circle cx="${x}" cy="-378" r="8" fill="${PAL.altin}" stroke="${INK}" stroke-width="4"/>`).join('')}`,
 pelerin:(c=PAL.bordo)=>`<path d="M -10 -236 q -90 60 -80 236 h 180 q 10 -176 -80 -236 z" fill="${c}" stroke="${INK}" stroke-width="6"/>`,
 polis:()=>`<path d="M -56 -330 h 112 l -10 -44 q -46 -18 -92 0 z" fill="${PAL.lacivert}" stroke="${INK}" stroke-width="6"/><rect x="-62" y="-336" width="124" height="14" rx="6" fill="${INK}"/><circle cx="0" cy="-356" r="9" fill="${PAL.altin}"/>`,
 duduk:()=>`<rect x="18" y="-310" width="30" height="14" rx="5" fill="#ccc" stroke="${INK}" stroke-width="3"/>`,
 onluk:(c=PAL.bordo)=>`<path d="M -34 -220 h 68 l 10 110 h -88 z" fill="${c}" stroke="${INK}" stroke-width="5"/>`,
 poset:(c=PAL.hardal)=>`<path d="M 70 -120 h 70 l 8 80 h -86 z" fill="${c}" stroke="${INK}" stroke-width="5"/><path d="M 84 -120 q 21 -30 42 0" fill="none" stroke="${INK}" stroke-width="5"/>`,
 kapuson:(c='#3a3f45')=>`<path d="M -62 -280 q 0 -90 62 -90 q 62 0 62 90 q -24 -30 -62 -30 q -38 0 -62 30 z" fill="${c}" stroke="${INK}" stroke-width="6"/>`,
 sapka:(c='#8A5A3B')=>`<path d="M -70 -322 q 70 -30 140 0 l -14 -26 q -56 -22 -112 0 z" fill="${c}" stroke="${INK}" stroke-width="5"/><path d="M -42 -348 q 42 -50 84 0 z" fill="${c}" stroke="${INK}" stroke-width="5"/>`,
 baret:()=>`<path d="M -56 -318 q 56 -90 112 0 z" fill="#F5C518" stroke="${INK}" stroke-width="6"/><rect x="-64" y="-324" width="128" height="12" rx="5" fill="#F5C518" stroke="${INK}" stroke-width="4"/>`,
 kravat:()=>`<path d="M -8 -240 h 16 l 8 70 l -16 18 l -16 -18 z" fill="${PAL.bordo}" stroke="${INK}" stroke-width="4"/>`,
 pijama:()=>`<path d="M -40 -330 q 40 -60 90 -10 l 20 50 q -20 -40 -60 -30 z" fill="#4a7fb5" stroke="${INK}" stroke-width="5"/><circle cx="72" cy="-286" r="12" fill="#fff" stroke="${INK}" stroke-width="4"/>`,
 okulcanta:(c=PAL.bordo)=>`<rect x="-80" y="-230" width="50" height="80" rx="12" fill="${c}" stroke="${INK}" stroke-width="5"/>`,
 telefon:(x=40,y=-300)=>`<rect x="${x-14}" y="${y-26}" width="28" height="52" rx="6" fill="#ddd" stroke="${INK}" stroke-width="4"/>`,
 fener:(x=110,y=-170)=>`<circle cx="${x}" cy="${y}" r="50" fill="${PAL.altin}" opacity=".25"/><rect x="${x-18}" y="${y-28}" width="36" height="52" rx="6" fill="${PAL.altin}" stroke="${INK}" stroke-width="5"/>`,
 kurek:()=>`<line x1="-90" y1="-150" x2="-60" y2="20" stroke="#6B4A2B" stroke-width="10" stroke-linecap="round"/><path d="M -76 10 h 36 l -4 40 h -28 z" fill="#888" stroke="${INK}" stroke-width="4"/>`,
 buyutec:(x=120,y=-160)=>`<g transform="translate(${x},${y}) rotate(-20)"><circle r="30" fill="#dfeef2" fill-opacity=".6" stroke="${INK}" stroke-width="7"/><line x1="22" y1="22" x2="56" y2="62" stroke="#6B4A2B" stroke-width="12" stroke-linecap="round"/></g>`,
 harita:(x=-120,y=-120)=>`<g transform="translate(${x},${y}) rotate(-8)"><rect x="-46" y="-34" width="92" height="68" fill="#F4E4C1" stroke="${INK}" stroke-width="4"/><path d="M -34 -8 q 18 18 36 0 t 28 8" fill="none" stroke="${PAL.bordo}" stroke-width="3" stroke-dasharray="6 5"/><text x="18" y="22" font-family="Inter" font-weight="900" font-size="24" fill="${PAL.bordo}">✕</text></g>`,
};
function cop(x,y,s,o){
 const t=o.tema||'b'; const w=o.w||12;
 const c=o.c||(t=='gece'?'#EAF0F7':t=='tahta'?TEB.beyaz:INK);
 const f=t=='tahta'?'url(#chalk)':'';
 const p=o.poz||POZ.dur;
 let g=`<g transform="translate(${x},${y}) rotate(${o.rot||0}) scale(${o.flip?-s:s},${s})">`+(o.back||'');
 g+=`<g${f?` filter="${f}"`:''}>`+_pl([[0,-252],[0,-120]],w,c)+_pl([[0,-230],...p.la],w,c)+_pl([[0,-230],...p.ra],w,c)+_pl([[0,-120],...p.ll],w,c)+_pl([[0,-120],...p.rl],w,c);
 const hf=o.head||(t=='gece'?'#1d2c47':t=='tahta'?'#2E4D3D':PAL.krem);
 g+=`<circle cx="0" cy="-300" r="48" fill="${hf}" stroke="${c}" stroke-width="${w}"/>`;
 if(t=='b') g+=`<path d="M -24 -322 a 30 30 0 0 1 30 -12" stroke="#fff" stroke-width="7" fill="none" opacity=".45" stroke-linecap="round"/>`;
 g+=`</g>`+(o.front||'');
 return g+`</g>`}
const CHALK_DEFS=`<filter id="chalk" x="-20%" y="-20%" width="140%" height="140%"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="4"/></filter><filter id="smudge"><feTurbulence baseFrequency="0.012" numOctaves="3"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .06 0"/></filter>`;
const TAHTA_BG=`<rect width="1920" height="1080" fill="#7a5230"/><rect x="40" y="40" width="1840" height="960" fill="#2E4D3D"/><rect x="40" y="40" width="1840" height="960" filter="url(#smudge)"/><rect x="40" y="1000" width="1840" height="40" fill="#5c3b20"/><rect x="300" y="992" width="90" height="14" rx="4" fill="#F4F1E6"/><rect x="420" y="994" width="60" height="12" rx="4" fill="#F2D24B"/>`;
const GECE_BG=(()=>{let s=`<defs><radialGradient id="gspot" cx="35%" cy="35%" r="75%"><stop offset="0" stop-color="#1A3350"/><stop offset="1" stop-color="#0D1B2A"/></radialGradient></defs><rect width="1920" height="1080" fill="url(#gspot)"/>`;for(let x=0;x<=1920;x+=60)s+=`<line x1="${x}" y1="0" x2="${x}" y2="1080" stroke="#20344D" stroke-width="1" opacity=".5"/>`;for(let y=0;y<=1080;y+=60)s+=`<line x1="0" y1="${y}" x2="1920" y2="${y}" stroke="#20344D" stroke-width="1" opacity=".5"/>`;return s})();
