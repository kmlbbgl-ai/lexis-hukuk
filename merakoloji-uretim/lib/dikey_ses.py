"""Dikey plan + ses: python3 dikey_ses.py video_klasörü mp3 stems_öneki
Klasörde dikey_plan.json: {"ust":[..],"kapanis":{...},"yt":[[s0,s1,"sahne"|"kapanis"],...],"ig":[...]}"""
import sys,json,os,numpy as np; sys.path.insert(0,os.path.dirname(__file__)); import ses
D,MP3,ST=sys.argv[1:4]; P=json.load(open(os.path.join(D,'dikey_plan.json'))); Z=json.load(open(os.path.join(D,'zamanlama.json')))
SR=ses.SR; voc=np.load(ST+'_voc.npy'); mus=np.load(ST+'_mus.npy'); sfx=np.load(ST+'_sfx.npy')
import subprocess
raw=subprocess.run(['ffmpeg','-v','error','-i',MP3,'-f','s16le','-ac','1','-ar',str(SR),'-'],capture_output=True).stdout
ham=np.frombuffer(raw,np.int16).astype(np.float64)/32768
vr=np.sqrt((voc[np.abs(voc)>1e-4]**2).mean()); hr=np.sqrt((ham[np.abs(ham)>1e-4]**2).mean()); hg=vr/hr
from kurgu_yardim import donustur_ws
out={}
for ver in ('yt','ig'):
    parts=P[ver]; t=0.0; zam=[]; V=[];M=[];S=[]
    for s0,s1,g in parts:
        a,b=int(s0*SR),int(s1*SR); n=b-a
        seg=ham[a:b]*hg; V.append(np.pad(seg,(0,n-len(seg))))
        if g=='sahne': M.append(mus[a:b]); S.append(sfx[a:b])
        else:
            m=ses.Mix(s1-s0+0.1); m.chord(0.0,[48,55,60,64,67,72],dur=s1-s0+0.1,g=.11); m.kut(P['kapanis'].get('dz',1.2),0.8)
            mm=m.verb(m.mus)[:n]; mg=10**(-36/20)/max(np.sqrt((mm**2).mean()),1e-9); M.append(mm*mg); S.append(m.verb(m.sfx)[:n]*0.25)
        sub=[]
        if g=='kapanis':
            ws=[[w['w'].replace('"',''),round(w['t0']-s0+t,3),round(w['t1']-s0+t,3)] for w in Z['words'] if s0-0.02<=w['t0']<s1]
            sub=[{'t0':ws[0][1],'t1':t+(s1-s0),'w':donustur_ws(ws)}] if ws else []
        zam.append({'gorsel':g,'t0':t,'t1':t+(s1-s0),'s0':s0,'sub':sub}); t+=s1-s0
    def bir(L):
        o=L[0].copy()
        for x in L[1:]:
            f=int(0.03*SR); x=x.copy(); o[-f:]*=np.linspace(1,0,f); x[:f]*=np.linspace(0,1,f); o=np.concatenate([o,x])
        return o
    vv,mm,ss=bir(V),bir(M),bir(S); tail=int(0.5*SR); vv=np.pad(vv,(0,tail)); mm=np.pad(mm,(0,tail)); ss=np.pad(ss,(0,tail))
    env=np.convolve(np.abs(vv),np.ones(int(.15*SR))/int(.15*SR),'same'); duck=1-0.55*np.clip(env/0.05,0,1)
    mix=vv+mm*duck+ss; fo=int(0.4*SR); mix[-fo:]*=np.linspace(1,0,fo); mix/=np.abs(mix).max()/0.89
    import wave
    with wave.open(os.path.join(D,f'mix_{ver}.wav'),'wb') as w: w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((mix*32767).astype(np.int16).tobytes())
    out[ver]={'ust':P['ust'],'kapanis':P['kapanis'],'zam':zam,'sure':t+0.5}
    print(ver,round(t+0.5,2),'sn')
open(os.path.join(D,'dikey_plan.js'),'w').write('window.PLAN='+json.dumps(out,ensure_ascii=False)+';')
