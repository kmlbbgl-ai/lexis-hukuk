window.kapak=function(v){const Y=v=='y';let o=DEFS+GT;
 const tel=(x,y,s)=>telefon(x,y,s,yazi(0,-60,'03:12',40,RG)+yazi(0,10,'OĞLUM',34,WH)+yazi(0,80,'📞',60),0,RG);
 if(Y){o+=GECE_BG;
  o+=`<text x="80" y="220" font-family="Inter Display" font-weight="900" font-size="130" fill="${WH}">“ANNE, KAZA</text><text x="80" y="360" font-family="Inter Display" font-weight="900" font-size="130" fill="${WH}">YAPTIM!”</text>`;
  o+=dalga(560,560,960,130,1.3,RG,1,60);
  o+=`<g transform="translate(560,820) rotate(-5)"><rect x="-470" y="-90" width="940" height="180" rx="20" fill="#0D1B2A" stroke="${AM}" stroke-width="10" filter="url(#glow)"/><text y="38" text-anchor="middle" font-family="Inter Display" font-weight="900" font-size="104" fill="${AM}">O SES SAHTE!</text></g>`;
  o+=tel(1340,560,1.6)+ANNE(1700,1010,1.3,POZ.telefon,telefon(40,-300,.28,'',0,RG))+ter(1760,620);
  o+=etiket(1500,130,'YAPAY ZEKÂ 🤖',1,52,CY);
  o+=`<rect x="28" y="28" width="1864" height="1024" rx="10" fill="none" stroke="${KU2}" stroke-width="4"/>`}
 else{o+=`<rect width="1080" height="1920" fill="#0D1B2A"/>`+ros(540,380,300,70,220,6,CY,.06)+ros(540,1600,300,70,220,6,AM,.05);
  o+=`<text x="540" y="240" text-anchor="middle" font-family="Inter" font-weight="800" font-size="34" letter-spacing="12" fill="${AM}">MERAKOLOJİ</text>`;
  o+=`<text x="540" y="420" text-anchor="middle" font-family="Inter Display" font-weight="900" font-size="112" fill="${WH}">“ANNE, KAZA</text><text x="540" y="545" text-anchor="middle" font-family="Inter Display" font-weight="900" font-size="112" fill="${WH}">YAPTIM!”</text>`;
  o+=dalga(540,700,900,110,1.3,RG,1,56);
  o+=tel(330,1150,1.5)+ANNE(760,1520,1.15,POZ.telefon,telefon(40,-300,.28,'',0,RG))+ter(820,1150);
  o+=`<g transform="translate(540,1700) rotate(-5)"><rect x="-430" y="-85" width="860" height="170" rx="20" fill="#0D1B2A" stroke="${AM}" stroke-width="10" filter="url(#glow)"/><text y="36" text-anchor="middle" font-family="Inter Display" font-weight="900" font-size="96" fill="${AM}">O SES SAHTE!</text></g>`;
  o+=etiket(540,850,'YAPAY ZEKÂ 🤖',1,48,CY);
  o+=`<rect x="20" y="20" width="1040" height="1880" fill="none" stroke="${KU2}" stroke-width="6"/>`}
 return o};
