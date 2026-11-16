window.kapak=function(v){const Y=v=='y';let o=DEFS;
 const parla=(x,y,r)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="url(#glowR)" opacity=".9"/>`;
 const yigin=(x,y,s)=>`<g transform="translate(${x},${y}) scale(${s})">${[...Array(16)].map((_,i)=>`<g transform="translate(${-180+(i%6)*72+(Math.floor(i/6)%2)*36},${-Math.floor(i/6)*44})"><ellipse rx="44" ry="20" fill="${AU}" stroke="${INK}" stroke-width="5"/></g>`).join('')}</g>`;
 if(Y){o+=BG;
  o+=`<text x="80" y="230" font-family="Inter Display" font-weight="900" font-size="150" fill="${B}" stroke="${P}" stroke-width="12" paint-order="stroke">KARUN'UN</text><text x="80" y="390" font-family="Inter Display" font-weight="900" font-size="150" fill="${G}" stroke="${P}" stroke-width="12" paint-order="stroke">HAZİNESİ</text>`;
  o+=`<rect x="80" y="450" width="760" height="120" rx="16" fill="${INK}"/><text x="460" y="533" text-anchor="middle" font-family="Inter Display" font-weight="900" font-size="74" fill="#FFD23F">ŞU AN NEREDE?</text>`;
  o+=parla(1400,700,420)+sandik(1400,860,2.2,1)+yigin(1400,1010,1.1);
  o+=KARUN(1700,1000,1.25,POZ.omuzsilk);
  o+=denizati(1150,420,.9,0);
  o+=damga(560,800,'GERÇEK!',1,-8,G2,96);
  o+=`<g transform="translate(460,960)"><rect x="-380" y="-46" width="760" height="92" rx="10" fill="${B}"/><text y="16" text-anchor="middle" font-family="Inter" font-weight="800" font-size="40" letter-spacing="6" fill="${P}">EKONOMİ SERİSİ · BÖLÜM 2</text></g>`;
  o+=BORDER+`<rect width="1920" height="1080" fill="url(#vig)"/>`}
 else{o+=`<rect width="1080" height="1920" fill="${P}"/>`+ros(540,380,300,70,220,6,G,.08)+ros(540,1600,300,70,220,6,B,.07);
  o+=`<text x="540" y="240" text-anchor="middle" font-family="Inter" font-weight="800" font-size="34" letter-spacing="12" fill="${AU}">MERAKOLOJİ</text>`;
  o+=`<text x="540" y="420" text-anchor="middle" font-family="Inter Display" font-weight="900" font-size="140" fill="${B}" stroke="${P}" stroke-width="12" paint-order="stroke">KARUN'UN</text><text x="540" y="560" text-anchor="middle" font-family="Inter Display" font-weight="900" font-size="140" fill="${G}" stroke="${P}" stroke-width="12" paint-order="stroke">HAZİNESİ</text>`;
  o+=`<rect x="160" y="610" width="760" height="120" rx="16" fill="${INK}"/><text x="540" y="693" text-anchor="middle" font-family="Inter Display" font-weight="900" font-size="74" fill="#FFD23F">ŞU AN NEREDE?</text>`;
  o+=parla(540,1150,420)+sandik(540,1260,2.0,1)+yigin(540,1400,1.0);
  o+=KARUN(860,1640,1.05,POZ.omuzsilk)+denizati(230,1000,.75,0);
  o+=damga(540,1730,'GERÇEK!',1,-6,G2,90);
  o+=`<rect x="20" y="20" width="1040" height="1880" fill="none" stroke="${G}" stroke-width="6"/>`}
 return o};
