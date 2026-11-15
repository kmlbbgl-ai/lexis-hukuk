/* Kanca sahnesi (0–31.4 sn) */
function kancaSahne(t){
  let o="";
/* A) 0–9.75: piyon, cüzdan, sinek, düşünce balonu */
  if(t<14.6){
    const aOut=t>11.8?out3((t-11.8)/0.9):0;           // piyon kenara kayar
    const px=560-260*aOut, ps=1-0.25*aOut;
    const hop=(t>10&&t<10.5)?Math.sin((t-10)/0.5*Math.PI)*30:0;
    const sigh=t<1.2?Math.sin(t/1.2*Math.PI)*8:0;
    o+=pawn(px,880-hop+sigh,ps);
    o+=wallet(px+150*ps,700-hop,ps,out3((t-0.15)/0.35));
    // sinek
    if(t>0.35&&t<3.4){const k=(t-0.35);o+=fly(px+150*ps+Math.sin(k*5)*60+k*90,640-k*70+Math.cos(k*7)*25,t,1.2);}
    // balon
    const bIn=out3((t-0.9)/0.7), pop=t>=9.25;
    if(bIn>0&&!pop){
      const tr=t>8.75?Math.sin(t*95)*6*cl((t-8.75)/0.4):0;
      const bx=1180+tr,by=380, bs=0.3+0.7*back((t-0.9)/0.7);
      o+=[[0.25,760,640,22],[0.5,830,560,34]].map(([d,x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r*cl((t-0.9-d*0.3)/0.3)}" fill="#FFFDF5" stroke="${INK}" stroke-width="5"/>`).join('');
      o+=`<g transform="translate(${bx},${by}) scale(${bs})">
      <ellipse rx="440" ry="260" fill="#FFFDF5" stroke="${INK}" stroke-width="6"/>
      <g clip-path="url(#balloonClip)">
        ${press(-230,40,0.42,t)}
        ${(()=>{let s='';if(t>1.95){for(let i=0;i<14;i++){const sp=0.35+rnd(i)*0.35,ph=rnd(i+9);const yy=((t-1.95)*sp+ph)%1;s+=note(-360+rnd(i+3)*720,-300+yy*560,(rnd(i+5)-.5)*80+t*40*(rnd(i)-.5),0.38)}}return s})()}
        ${t>2.7?`<g transform="translate(170,${200-40*out3((t-2.7)/0.5)})">${[...Array(7)].map((_,i)=>note(-150+i*50,30-Math.abs(i-3)*12,(i-3)*12,0.5)).join('')}
          ${pawn(0,-10+Math.sin(t*6)*8,0.42,G2,`<g transform="rotate(${Math.sin(t*8)*20})"><line x1="-60" y1="-150" x2="-140" y2="-260" stroke="${INK}" stroke-width="14" stroke-linecap="round"/></g><g transform="rotate(${-Math.sin(t*8)*20})"><line x1="60" y1="-150" x2="140" y2="-260" stroke="${INK}" stroke-width="14" stroke-linecap="round"/></g>`)}</g>`:''}
      </g>
      <ellipse rx="440" ry="260" fill="none" stroke="${INK}" stroke-width="6"/></g>`;
      // ucuz etiketleri
      if(t>7.1){const k=back((t-7.1)/0.35);o+=`<g transform="translate(700,170) scale(${k})"><rect x="-55" y="-40" width="110" height="80" fill="#fff" stroke="${INK}" stroke-width="4"/><rect x="-45" y="-50" width="110" height="80" fill="#fff" stroke="${INK}" stroke-width="4"/><text x="10" y="0" text-anchor="middle" font-family="Inter" font-weight="700" font-size="22" fill="${G}">KÂĞIT</text></g>`+tag(700,270,-8,k*0.8,'UCUZ');}
      if(t>7.7){const k=back((t-7.7)/0.35);o+=`<g transform="translate(1660,170) scale(${k})"><path d="M -40 40 v -50 q 0 -20 20 -25 v -25 h 40 v 25 q 20 5 20 25 v 50 z" fill="${INK}" stroke="${INK}" stroke-width="4"/><rect x="-25" y="-5" width="50" height="30" fill="${P}"/><text y="17" text-anchor="middle" font-family="Inter" font-weight="800" font-size="14" fill="${G}">MÜREKKEP</text></g>`+tag(1660,270,8,k*0.8,'UCUZ');}
    }
    // PAT!
    if(pop&&t<10.6){const k=(t-9.25)/1.35;
      o+=[...Array(16)].map((_,i)=>{const a=i/16*Math.PI*2,r=60+out3(k)*420;return `<path d="M ${1180+Math.cos(a)*r} ${380+Math.sin(a)*r*0.6} q 20 -20 40 0" fill="none" stroke="${INK}" stroke-width="6" opacity="${1-k}"/>`}).join('');
      o+=`<g transform="translate(1180,400) scale(${back(k*3)}) rotate(-8)" opacity="${1-cl((k-0.6)/0.4)}"><text text-anchor="middle" font-family="Bitstream Charter" font-weight="bold" font-size="170" fill="${B}" stroke="${INK}" stroke-width="5">PAT!</text></g>`;
    }
    // 1990'lar şeridi
    if(t>11.6&&t<14.6) o+=`<g opacity="${win(t,11.6,14.5)}">`+banner(1180,420,out3((t-11.6)/0.4),"TÜRKİYE · 1990'LAR")+`</g>`;
  }

  /* B) 14.4–20.5: büyük banknot, damga, milyonerler */
  if(t>14.3&&t<23.2){
    const up=out3((t-14.4)/0.7), shrink=out3((t-18.9)/0.6), leave=cl((t-22.6)/0.5);
    const y=1300-760*up-170*shrink-900*leave, s=1-0.42*shrink;
    o+=bigNote(960,y,s,cl((t-17.62)/0.45),t);
    if(t>18.95){
      for(let i=0;i<5;i++){const k=back((t-19.0-i*0.12)/0.35);if(k<=0)continue;
        const x=480+i*240, emp=t>20.5;
        const pockets=emp?`<g opacity="${cl((t-20.5-i*0.08)/0.2)}"><path d="M -80 -90 q -40 10 -30 50 q 30 0 30 -40" fill="#fff" stroke="${INK}" stroke-width="5"/><path d="M 80 -90 q 40 10 30 50 q -30 0 -30 -40" fill="#fff" stroke="${INK}" stroke-width="5"/></g>`:'';
        const sash=`<g opacity="${1-cl((t-20.5)/0.3)}"><rect x="-92" y="-140" width="184" height="40" fill="${AU}" stroke="${INK}" stroke-width="4" transform="rotate(-12)"/><text x="0" y="-110" text-anchor="middle" font-family="Inter" font-weight="900" font-size="26" fill="${INK}" transform="rotate(-12)">MİLYONER</text></g>`;
        o+=`<g opacity="${1-leave}">`+pawn(x,860+(1-k)*300,0.55,i%2?G2:'#3C7A5E',sash+pockets)+`</g>`;
      }
    }
    if(t>21.2&&t<23.0) o+=`<g opacity="${win(t,21.2,22.9,.2)}">`+qmark(1480,300,back((t-21.2)/0.4))+`</g>`;
  }

  /* C) 23.1–28.6: matbaa + 4 mühür */
  if(t>22.9&&t<28.9){
    const k=out3((t-23.0)/0.6), lv=cl((t-28.4)/0.4);
    o+=`<g opacity="${1-lv}">`+press(960,310+(1-k)*500,0.72,t,1)+`</g>`;
    for(let i=0;i<4;i++){const a=25.15+i*0.22, kk=back((t-a)/0.35); if(kk<=0)continue;
      const danger=i==3?cl((t-26.6)/0.4):0, shake=i==3&&t>27.65?Math.sin(t*70)*7:0;
      o+=`<g opacity="${1-lv}">`+seal(540+i*280+shake,745,kk*(0.85+0.3*danger),i+1,danger>0?B:G,danger)+`</g>`;
      if(i==3&&t>27.7) o+=`<path d="M ${1380-30} ${695} l 18 30 l -12 20 l 22 34" fill="none" stroke="${INK}" stroke-width="4" opacity="${(1-lv)*cl((t-27.7)/0.2)}"/>`;
    }
  }

  /* D) 28.6–31.4: başlık kartı */
  if(t>28.5){
    const k=out3((t-28.55)/0.5);
    o+=`<g opacity="${k}"><rect width="1920" height="1080" fill="${P}"/>${ros(960,560,330,80,250,6,G,.10)}
    <text x="960" y="330" text-anchor="middle" font-family="Inter" font-weight="700" font-size="28" letter-spacing="10" fill="${AU}">MERAKOLOJİ · EKONOMİ SERİSİ</text>
    <text x="960" y="480" text-anchor="middle" font-family="Bitstream Charter" font-weight="bold" font-size="96" fill="${G}">Devlet neden sınırsız</text>
    <text x="960" y="600" text-anchor="middle" font-family="Bitstream Charter" font-weight="bold" font-size="96" fill="${B}">para basamıyor?</text>
    <line x1="${960-380*out3((t-28.8)/0.6)}" y1="650" x2="${960+380*out3((t-28.8)/0.6)}" y2="650" stroke="${AU}" stroke-width="4"/></g>`;
    if(t>29.0){const s=cl((t-29.0)/0.3);o+=`<g transform="translate(1440,780) rotate(-12) scale(${1+1.2*(1-out3(s))})" opacity="${s*0.92}"><circle r="100" fill="none" stroke="${B}" stroke-width="9"/><circle r="82" fill="none" stroke="${B}" stroke-width="2"/><text y="-28" text-anchor="middle" font-family="Inter" font-weight="800" font-size="20" letter-spacing="4" fill="${B}">BÖLÜM</text><text y="48" text-anchor="middle" font-family="Bitstream Charter" font-weight="bold" font-size="92" fill="${B}">1</text></g>`;}
  }
  return o;
}
