"""Shorts / Reels / Instagram özel için dikey kurgu planları ve ses miksi.
Parça türleri: ('src', s0, s1)  -> uzun videonun s0..s1 aralığı (görüntü + ses miksi)
               ('yeni', a0, a1, gorsel_t0, tutma, metin) -> short2-ek-cumleler.mp3'ten a0..a1 sesi; görüntü gorsel_t0'dan akar (tutma'da donar)"""
import json, sys, numpy as np, subprocess, wave
V=json.load(open('bolum1_veri.json')); LW=V['LW']
def w(l,i): return LW[l][i]
PLAN={
 'short1':{'ust':'Devlet neden herkese<br>1 milyon basmıyor?','parca':[('src',0.0,8.7),('src',31.5,62.4)]},
 'short2':{'ust':'Parayı yakmak, odun<br>almaktan ucuzdu','parca':[
    ('yeni',0.0,4.45,w(22,7)-0.6,None,'Bir zamanlar bir ülkede, parayı yakmak odun almaktan daha ucuzdu.'),
    ('src',w(19,0)-0.25,w(20,0)-0.3),('src',w(20,0)-0.3,w(20,-1)+0.6),('src',w(23,0)-0.25,w(23,-1)+0.7),
    ('yeni',4.6,6.75,w(17,11)-0.4,w(17,11)+1.2,'1923, Almanya.'),
    ('yeni',6.75,12.12,w(29,0)-0.1,w(29,0)+1.6,'Peki bir ülke nasıl bu hale gelir? Cevabı tek kelime: matbaa.')]},
 'short3':{'ust':"Türkiye'de herkes<br>milyonerdi",'parca':[('src',14.3,22.75),('src',170.0,196.6)]},
 'instagram':{'ust':'Devlet neden sınırsız<br>para basamıyor?','parca':[
    ('src',0.0,w(19,0)-0.25),('src',w(20,0)-0.3,w(23,0)-0.25),('src',167.9,w(27,12)-0.15),('src',w(27,19)-0.15,w(33,0)-0.3),('src',225.6,230.1)]},
}
SON=2.2   # "Tamamı kanalda" kartı (Instagram'da yok)
SR=48000
SP='/tmp/claude-0/-home-user-lexis-hukuk/ddfe0a26-5f62-5832-82ca-52fc14b1a58b/scratchpad/'
def oku(f):
    raw=subprocess.run(['ffmpeg','-v','error','-i',f,'-f','s16le','-ac','1','-ar',str(SR),'-'],capture_output=True).stdout
    return np.frombuffer(raw,np.int16).astype(np.float64)/32768
if __name__=='__main__':
    voc=np.load(SP+'stem_voc.npy').astype(np.float64); mus=np.load(SP+'stem_mus.npy').astype(np.float64); sfx=np.load(SP+'stem_sfx.npy').astype(np.float64)
    ek=oku('../ses/short2-ek-cumleler.mp3')
    for ad,p in PLAN.items():
        son = 0 if ad=='instagram' else SON
        V2=[];M2=[];S2=[];zam=[];t=0.0
        for q in p['parca']:
            if q[0]=='src':
                _,s0,s1=q;a,b=int(s0*SR),int(s1*SR)
                V2.append(voc[a:b]);M2.append(mus[a:b]);S2.append(sfx[a:b])
                zam.append({'tur':'src','t0':t,'t1':t+s1-s0,'s0':s0});t+=s1-s0
            else:
                _,a0,a1,g0,tut,metin=q;a,b=int(a0*SR),int(a1*SR);n=b-a
                seg=ek[a:b]; seg=np.pad(seg,(0,n-len(seg))); V2.append(seg*0.43)   # stem ölçeğine uydur (kaynak ses ~2.3x)
                ma=int(g0*SR); M2.append(np.pad(mus[ma:ma+n],(0,max(0,n-len(mus[ma:ma+n]))))); S2.append(np.zeros(n))
                zam.append({'tur':'yeni','t0':t,'t1':t+(a1-a0),'g0':g0,'tut':tut,'metin':metin});t+=a1-a0
        def birles(L):
            out=L[0].copy()
            for x in L[1:]:
                f=int(0.03*SR); x=x.copy(); out[-f:]*=np.linspace(1,0,f); x[:f]*=np.linspace(0,1,f); out=np.concatenate([out,x])
            return out
        vv,mm,ss=birles(V2),birles(M2),birles(S2)
        if son: 
            k=int(son*SR); vv=np.concatenate([vv,np.zeros(k)]); ss=np.concatenate([ss,np.zeros(k)])
            hz=lambda m:440*2**((m-69)/12); tt=np.arange(k)/SR
            mm=np.concatenate([mm,sum(g*np.sin(2*np.pi*hz(m)*tt) for m,g in [(50,.4),(57,.3),(62,.3),(66,.25)])*np.exp(-tt/0.9)*np.minimum(1,tt/0.02)])
        envv=np.convolve(np.abs(vv),np.ones(int(.15*SR))/int(.15*SR),'same'); duck=1-0.55*np.clip(envv/0.05,0,1)
        mix=vv*2.3+mm*0.15*duck+ss*0.4
        fo=int(0.3*SR); mix[-fo:]*=np.linspace(1,0,fo); mix/=np.abs(mix).max()/0.89
        with wave.open(f'{ad}_mix.wav','wb') as wv:
            wv.setnchannels(1);wv.setsampwidth(2);wv.setframerate(SR);wv.writeframes((mix*32767).astype(np.int16).tobytes())
        p['sure']=t+son; p['zam']=zam; p['son']=son
        print(ad, round(t+son,2),'sn')
    open('dikey_plan.js','w').write('window.PLANLAR='+json.dumps(PLAN,ensure_ascii=False)+';')
