window.kapak=function(v){const Y=v=='y';let o=DEFS;
 const baslik=(x,y,a,b,fa,fb,anc='middle')=>`<text x="${x}" y="${y}" text-anchor="${anc}" font-family="Inter Display" font-weight="900" font-size="${fa}" fill="${B}" stroke="${P}" stroke-width="12" paint-order="stroke">${a}</text><text x="${x}" y="${y+fb*1.05}" text-anchor="${anc}" font-family="Inter Display" font-weight="900" font-size="${fb}" fill="${G}" stroke="${P}" stroke-width="12" paint-order="stroke">${b}</text>`;
 const etk=(x,y,s,eski,yeni)=>`<g transform="translate(${x},${y}) rotate(-8) scale(${s})"><path d="M -200 -90 h 340 l 80 90 l -80 90 h -340 z" fill="#FFF8E7" stroke="${INK}" stroke-width="8"/><circle cx="150" cy="0" r="18" fill="${P}" stroke="${INK}" stroke-width="6"/><text x="-40" y="-14" text-anchor="middle" font-family="Inter Display" font-weight="900" font-size="60" fill="${GRI}">${eski}</text><line x1="-150" y1="-34" x2="70" y2="-34" stroke="${RD}" stroke-width="10"/><text x="-40" y="66" text-anchor="middle" font-family="Inter Display" font-weight="900" font-size="74" fill="${RD}">${yeni}</text></g>`;
 if(Y){o+=BG+`<rect x="0" y="0" width="1920" height="1080" fill="${P}" opacity=".3"/>`;
  o+=baslik(80,250,'ÖNCE ZAM,','SONRA İNDİRİM?',150,128,'start');
  o+=etk(560,700,1.25,'1.000 ₺','2.000 ₺');
  o+=damga(560,920,'%50 İNDİRİM = 1.000 ₺',1,4,G2,52);
  o+=ALISVERISCI(1540,1020,1.55,POZ.basielinde)+`<text x="1720" y="700" font-family="Bitstream Charter" font-weight="bold" font-size="220" fill="${B}" stroke="${INK}" stroke-width="5">?</text>`;
  o+=damga(1450,200,'ARTIK YASAK!',1,6,RD,84);
  o+=BORDER+`<rect width="1920" height="1080" fill="url(#vig)"/>`}
 else{o+=`<rect width="1080" height="1920" fill="${P}"/>`+ros(540,380,300,70,220,6,G,.08)+ros(540,1600,300,70,220,6,B,.07);
  o+=`<text x="540" y="240" text-anchor="middle" font-family="Inter" font-weight="800" font-size="34" letter-spacing="12" fill="${AU}">MERAKOLOJİ</text>`;
  o+=baslik(540,420,'ÖNCE ZAM,','SONRA İNDİRİM?',130,104);
  o+=etk(520,820,1.2,'1.000 ₺','2.000 ₺');
  o+=damga(540,1040,'%50 = 1.000 ₺',1,4,G2,60);
  o+=ALISVERISCI(540,1600,1.15,POZ.basielinde)+`<text x="700" y="1260" font-family="Bitstream Charter" font-weight="bold" font-size="170" fill="${B}" stroke="${INK}" stroke-width="5">?</text>`;
  o+=damga(540,1720,'ARTIK YASAK!',1,-4,RD,80);
  o+=`<rect x="20" y="20" width="1040" height="1880" fill="none" stroke="${G}" stroke-width="6"/>`}
 return o};
