"""Anlatım metnini ses dosyasındaki konuşma parçalarına hizalar (kelime zamanları).
Kullanım: python3 align.py ses.mp3 metin.txt cikti.json"""
import sys, re, json, subprocess
mp3, txtf, out = sys.argv[1:4]
r = subprocess.run(['ffmpeg','-hide_banner','-i',mp3,'-af','silencedetect=noise=-35dB:d=0.25','-f','null','-'],capture_output=True,text=True).stderr
dur = float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',mp3],capture_output=True,text=True).stdout)
ss=[float(x) for x in re.findall(r'silence_start: ([\d.]+)',r)]; se=[float(x) for x in re.findall(r'silence_end: ([\d.]+)',r)]
# konuşma parçaları
chunks=[]; cur=0.0
for a,b in zip(ss,se):
    if a-cur>0.05: chunks.append([cur,a])
    cur=b
if dur-cur>0.05: chunks.append([cur,dur])
lines=[l.strip() for l in open(txtf,encoding='utf8') if l.strip()]
# ifadeler: noktalama sonrası bölünür
phr=[]
for li,l in enumerate(lines):
    for p in re.findall(r'[^,.…?!:;]+[,.…?!:;]*',l):
        p=p.strip()
        if p: phr.append((li,p))
L=[max(1,len(re.sub(r'[^\wçğıöşüâîûÇĞİÖŞÜ]','',p,flags=re.I))) for _,p in phr]
D=[b-a for a,b in chunks]
rate=sum(L)/sum(D)
n,m=len(phr),len(chunks)
INF=1e18
# dp[i][j]: ilk i ifade, ilk j parça. Bir parça >=1 ifade alır ya da bir ifade birden çok parçaya yayılır.
import functools
pre=[0]
for x in L: pre.append(pre[-1]+x)
dpre=[0]
for x in D: dpre.append(dpre[-1]+x)
dp=[[INF]*(m+1) for _ in range(n+1)]; bk=[[None]*(m+1) for _ in range(n+1)]
dp[0][0]=0
for i in range(1,n+1):
    for j in range(1,m+1):
        best=INF;arg=None
        for k in range(max(0,i-6),i):      # parça j, ifadeler k..i
            for q in range(max(0,j-3),j):  # veya parçalar q..j
                if (i-k>1 and j-q>1): continue
                if dp[k][q]>=INF: continue
                c=((dpre[j]-dpre[q])*rate-(pre[i]-pre[k]))**2/(pre[i]-pre[k]+5)
                if dp[k][q]+c<best: best=dp[k][q]+c; arg=(k,q)
        dp[i][j]=best; bk[i][j]=arg
# geri izle
segs=[]; i,j=n,m
while i>0:
    k,q=bk[i][j]; segs.append((k,i,q,j)); i,j=k,q
segs.reverse()
words=[]
for k,i,q,j in segs:
    t0=chunks[q][0]; t1=chunks[j-1][1]
    ws=[]
    for pi in range(k,i):
        li,p=phr[pi]
        for w in p.split(): ws.append((li,w))
    wl=[max(1,len(re.sub(r'[^\w]','',w)))+1 for _,w in ws]; tot=sum(wl); acc=0
    for (li,w),x in zip(ws,wl):
        a=t0+(t1-t0)*acc/tot; acc+=x; b=t0+(t1-t0)*acc/tot
        words.append({'w':w,'line':li,'t0':round(a,3),'t1':round(b,3)})
lt=[]
for li,l in enumerate(lines):
    ww=[w for w in words if w['line']==li]
    lt.append({'i':li,'text':l,'t0':ww[0]['t0'],'t1':ww[-1]['t1']})
json.dump({'duration':dur,'rate':rate,'lines':lt,'words':words},open(out,'w'),ensure_ascii=False,indent=1)
for x in lt: print(f"{x['t0']:7.2f}-{x['t1']:7.2f}  {x['text'][:70]}")
