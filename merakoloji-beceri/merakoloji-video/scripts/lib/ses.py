"""Ortak ses kütüphanesi: kodla müzik + efekt + anlatım kurgusu + miks."""
import numpy as np, wave, subprocess
SR=48000
class Mix:
    def __init__(s,dur):
        s.N=int(dur*SR)+SR; s.mus=np.zeros(s.N); s.sfx=np.zeros(s.N); s.voc=np.zeros(s.N); s.dur=dur
        s.rng=np.random.default_rng(7)
    def at(s,t): return int(t*SR)
    def add(s,buf,t,x,g=1.0):
        i=s.at(t)
        if i<0: x=x[-i:]; i=0
        j=min(s.N,i+len(x));
        if j>i: buf[i:j]+=g*x[:j-i]
    # --- sentez ---
    def env(s,n,a=0.005,d=None):
        t=np.arange(n)/SR; e=np.minimum(1,t/a); return e*(np.exp(-t/d) if d else 1)
    def tone(s,f,dur,d=0.4,harm=(1,.5,.25),a=0.004):
        n=int(dur*SR); t=np.arange(n)/SR
        return sum(h*np.sin(2*np.pi*f*(k+1)*t) for k,h in enumerate(harm))*s.env(n,a,d)
    def noise(s,dur): return s.rng.standard_normal(int(dur*SR))
    def lp(s,x,a):
        # tek kutuplu alçak geçiren (vektörel yaklaşım: üstel filtre)
        from scipy_free import lfilter1
        return lfilter1(x,a)
    def hz(s,m): return 440*2**((m-69)/12)
    # --- efektler ---
    def click(s,g=1): return s.noise(0.015)*s.env(int(0.015*SR),0.0005,0.004)*g
    def thump(s,f=55,d=0.25,g=1):
        n=int(0.6*SR); t=np.arange(n)/SR
        x=np.sin(2*np.pi*(f+60*np.exp(-t*30))*t)*np.exp(-t/d)
        return (x+s.lp(s.noise(0.6),0.2)*np.exp(-t/0.04)*0.8)*g
    def whoosh(s,dur=0.6,g=1):
        x=s.noise(dur); e=np.sin(np.linspace(0,np.pi,len(x)))**2; return s.lp(x,0.08)*e*g*3
    def kut(s,t,g=1.0): s.add(s.sfx,t,s.thump(48,0.3,g)); s.add(s.sfx,t,s.click(0.8*g))
    def pop(s,t,g=0.12,f=900): s.add(s.sfx,t,s.tone(f,0.12,d=0.04),g)
    def ding(s,t,m=84,g=0.12): s.add(s.sfx,t,s.tone(s.hz(m),0.6,d=0.2,harm=(1,.3)),g)
    def tick(s,t,g=0.12,f=1500): s.add(s.sfx,t,s.tone(f,0.06,d=0.015,harm=(1,)),g)
    def swish(s,t,dur=0.5,g=0.25): s.add(s.sfx,t,s.whoosh(dur,g))
    def chalk(s,t,dur=0.8,g=0.07):   # tebeşir gıcırtısı
        x=s.noise(dur); hp=x-s.lp(x,0.25); n=len(x); tt=np.arange(n)/SR
        am=0.5+0.5*np.abs(np.sin(2*np.pi*7*tt+np.sin(2*np.pi*3*tt)))
        s.add(s.sfx,t,hp*am*np.minimum(1,tt/0.03)*np.minimum(1,(tt[-1]-tt)/0.05)*g)
    def bell(s,t,dur=1.4,g=0.10):     # okul zili
        n=int(dur*SR); tt=np.arange(n)/SR
        x=(np.sin(2*np.pi*1180*tt)+.6*np.sin(2*np.pi*2360*tt)+.3*np.sin(2*np.pi*3020*tt))*(0.6+0.4*np.sign(np.sin(2*np.pi*22*tt)))
        s.add(s.sfx,t,x*np.minimum(1,tt/0.01)*np.minimum(1,(tt[-1]-tt)/0.2)*g)
    def applause(s,t,dur=2.0,g=0.18):
        n=int(dur*SR); tt=np.arange(n)/SR; x=np.zeros(n)
        for k in range(int(dur*40)):
            i=int(s.rng.random()*n); c=s.click(1.0); x[i:i+len(c)]+=c[:max(0,min(len(c),n-i))]
        s.add(s.sfx,t,x*np.sin(np.pi*tt/tt[-1])*g)
    def clatter(s,t,k=8,g=0.08):
        for q in range(k): s.ding(t+q*0.09+s.rng.random()*0.05,88+int(s.rng.integers(0,10)),g)
    def melt(s,t):
        n=int(1.2*SR); tt=np.arange(n)/SR; s.add(s.sfx,t,np.sin(2*np.pi*(700-400*tt)*tt)*np.exp(-tt/0.6)*0.08)
    def buzz(s,t,dur=1.0,g=0.05):   # telefon titreşimi
        n=int(dur*SR); tt=np.arange(n)/SR
        x=np.sign(np.sin(2*np.pi*180*tt))*(np.sin(2*np.pi*4*tt)>0); s.add(s.sfx,t,s.lp(x,0.2)*g)
    def ring(s,t,dur=1.6,g=0.08):   # telefon zili
        n=int(dur*SR); tt=np.arange(n)/SR
        x=(np.sin(2*np.pi*440*tt)+np.sin(2*np.pi*480*tt))*((tt%0.5)<0.35)
        s.add(s.sfx,t,x*g)
    def glitch(s,t,dur=0.4,g=0.15):
        n=int(dur*SR); x=s.noise(dur)*(s.rng.random(n)>0.7); s.add(s.sfx,t,x*g)
    def drone(s,t,dur,g=0.16,f=36.7):
        n=int(dur*SR); tt=np.arange(n)/SR
        x=(np.sin(2*np.pi*f*tt)+.5*np.sin(2*np.pi*f*1.5*tt)+.25*np.sin(2*np.pi*f*2*tt))*(0.6+0.4*np.sin(2*np.pi*0.1*tt))
        s.add(s.mus,t,x*np.minimum(1,tt/1.5)*np.minimum(1,(tt[-1]-tt)/1.0)*g)
    # --- müzik ---
    def pattern(s,t0,t1,motif,bassl,bpm,g=0.11,gb=0.14,d=0.12,harm=(1,.6,.3,.15),shift=0,step=2):
        st=60/bpm/step; t=t0; i=0
        while t<t1:
            m=motif[i%len(motif)]
            if m is not None: s.add(s.mus,t,s.tone(s.hz(m+shift),0.5,d=d,harm=harm),g)
            if i%2==0 and bassl: s.add(s.mus,t,s.tone(s.hz(bassl[(i//4)%len(bassl)]+shift),0.9,d=0.35,harm=(1,.5,.2)),gb)
            t+=st; i+=1
    def musicbox(s,t0,t1,motif,step=0.3,g=0.12,bass=None):
        t=t0;i=0
        while t<t1:
            s.add(s.mus,t,s.tone(s.hz(motif[i%len(motif)]),1.0,d=0.45,harm=(1,.2,.06)),g)
            if bass and i%4==0: s.add(s.mus,t,s.tone(s.hz(bass[(i//4)%len(bass)]),1.6,d=0.9,harm=(1,.3)),g*0.8)
            t+=step;i+=1
    def chord(s,t,notes,dur=2.5,g=.12):
        for m in notes: s.add(s.mus,t,s.tone(s.hz(m),dur,d=dur/2,harm=(1,.4,.2),a=0.02),g)
    # --- anlatım ---
    def voice(s,mp3,seg):
        raw=subprocess.run(['ffmpeg','-v','error','-i',mp3,'-f','s16le','-ac','1','-ar',str(SR),'-'],capture_output=True).stdout
        v=np.frombuffer(raw,np.int16).astype(np.float64)/32768
        for a,b,o in seg:
            x=v[int(a*SR):int(b*SR)].copy(); f=int(0.01*SR); x[:f]*=np.linspace(0,1,f); x[-f:]*=np.linspace(1,0,f); s.add(s.voc,o,x)
    def verb(s,x):
        y=x.copy()
        for d,g in [(0.031,.35),(0.047,.28),(0.071,.22),(0.113,.16),(0.167,.1)]:
            k=int(d*SR); y[k:]+=g*x[:-k]
        return y
    def save(s,path,stems=None):
        mus=s.verb(s.mus); sfx=s.verb(s.sfx)*0.9+s.sfx*0.1
        vr=np.sqrt((s.voc**2).mean()+1e-12); vg=10**(-20/20)/max(vr,1e-9)*0.32  # anlatımı ~-20 dB'e yaklaştır
        env=np.convolve(np.abs(s.voc),np.ones(int(.15*SR))/int(.15*SR),'same'); duck=1-0.55*np.clip(env/0.05,0,1)
        mr=np.sqrt((mus**2).mean()+1e-12); mg=10**(-36/20)/max(mr,1e-9)
        sr=np.sqrt((sfx**2).mean()+1e-12); sg=min(0.45,10**(-33/20)/max(sr,1e-9))
        if stems: np.save(stems+'_voc.npy',(s.voc*vg).astype(np.float32)); np.save(stems+'_mus.npy',(mus*mg).astype(np.float32)); np.save(stems+'_sfx.npy',(sfx*sg).astype(np.float32))
        mix=s.voc*vg*2.3*0+s.voc*vg+mus*mg*duck+sfx*sg
        mix=mix[:int(s.dur*SR)]; fo=int(0.4*SR); mix[-fo:]*=np.linspace(1,0,fo)
        mix/=max(1e-9,np.abs(mix).max())/0.89
        with wave.open(path,'wb') as w: w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((mix*32767).astype(np.int16).tobytes())
