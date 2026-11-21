import json,subprocess,os,time,sys
from PIL import Image
c=json.load(open('cands.json')); os.makedirs('raw',exist_ok=True)
for i,x in enumerate(c):
    f=f'raw/{i:03d}.jpg'
    if os.path.exists(f): continue
    for k in range(4):
        r=subprocess.run(['curl','-s','-m','60','-A','VakitApp/0.1 (https://github.com/kmlbbgl-ai)','-o',f,x['thumb']])
        try: Image.open(f).verify(); break
        except Exception: time.sleep(20)
    print(i,flush=True); time.sleep(2)
# temas sayfası
ims=sorted(os.listdir('raw')); cols=8; W=200
for p in range(0,len(ims),48):
    sheet=Image.new('RGB',(cols*W,6*(W+20)),'white')
    from PIL import ImageDraw; d=ImageDraw.Draw(sheet)
    for j,f in enumerate(ims[p:p+48]):
        try: im=Image.open('raw/'+f).convert('RGB'); im.thumbnail((W,W))
        except Exception: continue
        x,y=(j%cols)*W,(j//cols)*(W+20); sheet.paste(im,(x,y)); d.text((x+4,y+W+2),f[:3],fill='black')
    sheet.save(f'sheet{p//48}.jpg',quality=80)
print('BITTI')
