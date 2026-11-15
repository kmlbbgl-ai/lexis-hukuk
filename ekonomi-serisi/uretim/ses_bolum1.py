"""Bölüm 1 tam video: kodla üretilen müzik + ses efektleri + anlatım kurgusu -> bolum1_mix.wav"""
import numpy as np, wave, subprocess, sys
import json
V=json.load(open("bolum1_veri.json")); SEG=V["SEG"]; END=V["END"]; LW=V["LW"]; GAPS=V["GAPS"]
def w(l,i): return LW[l][i]
SR = 48000
N = int(END * SR) + SR
mus = np.zeros(N); sfx = np.zeros(N)
rng = np.random.default_rng(7)

def at(t): return int(t * SR)
def add(buf, t, x, g=1.0):
    i = at(t); j = min(N, i + len(x)); buf[i:j] += g * x[:j - i]
def env(n, a=0.005, d=None):
    t = np.arange(n) / SR; e = np.minimum(1, t / a)
    return e * (np.exp(-t / d) if d else 1)
def tone(f, dur, d=0.4, harm=(1, .5, .25), a=0.004):
    n = int(dur * SR); t = np.arange(n) / SR
    x = sum(h * np.sin(2 * np.pi * f * (k + 1) * t) for k, h in enumerate(harm))
    return x * env(n, a, d)
def noise(dur): return rng.standard_normal(int(dur * SR))
def lp(x, a):  # basit tek kutuplu alçak geçiren
    y = np.zeros_like(x); s = 0.0
    for i in range(len(x)): s += a * (x[i] - s); y[i] = s
    return y
def hz(m): return 440 * 2 ** ((m - 69) / 12)

# ---------- MÜZİK ----------
# 1) 0–9.25: hayal — müzik kutusu (Re majör arpej)
bpm = 100; b = 60 / bpm
dream = [62, 66, 69, 74, 73, 69, 66, 69, 62, 67, 71, 74, 71, 67, 66, 64]
t = 0.35; i = 0
while t < 9.1:
    m = dream[i % len(dream)] + 12
    add(mus, t, tone(hz(m), 1.2, d=0.5, harm=(1, .2, .08)), 0.16)
    if i % 4 == 0: add(mus, t, tone(hz(dream[i % len(dream)] - 12), 1.6, d=0.9, harm=(1, .3)), 0.10)
    t += b / 2; i += 1
# balon titremesi: yükselen gerilim 8.75–9.25
n = at(0.5); tt = np.arange(n) / SR
add(mus, 8.75, np.sin(2 * np.pi * (300 + 900 * tt) * tt) * np.linspace(0, 1, n) * 0.08)
# 2) 10.0–28.5: gizemli pizzicato (Re minör)
motif = [62, 65, 69, 65, 62, 64, 65, 60, 62, 65, 69, 72, 70, 69, 65, 64]
bass = [38, 38, 41, 41, 36, 36, 38, 38]
t = 10.0; i = 0
while t < 28.4:
    add(mus, t, tone(hz(motif[i % 16]), 0.5, d=0.12, harm=(1, .6, .3, .15)), 0.12)
    if i % 2 == 0: add(mus, t, tone(hz(bass[(i // 4) % 8]), 0.8, d=0.35, harm=(1, .5, .2)), 0.16)
    t += b / 2; i += 1
# gerilim: 26.6–28.5 alçak drone yükselir
n = at(1.95); tt = np.arange(n) / SR
dr = (np.sin(2 * np.pi * 36.7 * tt) + .5 * np.sin(2 * np.pi * 55 * tt) + .3 * np.sin(2 * np.pi * 73.4 * tt * (1 + .01 * tt)))
add(mus, 26.6, dr * (tt / tt[-1]) ** 1.5 * 0.22)
# 3) 28.55: başlık akoru
for m, g in [(38, .22), (50, .14), (57, .12), (62, .12), (65, .10), (74, .06)]:
    add(mus, 28.6, tone(hz(m), 2.8, d=1.3, harm=(1, .4, .2), a=0.02), g)

# ---------- EFEKTLER ----------
def click(g=1): return noise(0.015) * env(at(0.015), 0.0005, 0.004) * g
def thump(f=55, d=0.25, g=1):
    n = at(0.6); tt = np.arange(n) / SR
    x = np.sin(2 * np.pi * (f + 60 * np.exp(-tt * 30)) * tt) * np.exp(-tt / d)
    return (x + lp(noise(0.6), 0.2) * np.exp(-tt / 0.04) * 0.8) * g
def whoosh(dur=0.6, g=1):
    x = noise(dur); n = len(x); e = np.sin(np.linspace(0, np.pi, n)) ** 2
    return lp(x, 0.08) * e * g * 3
add(sfx, 0.18, click(0.5)); add(sfx, 0.22, lp(noise(0.25), 0.3) * env(at(0.25), 0.002, 0.06) * 0.4)   # cüzdan
n = at(2.9); tt = np.arange(n) / SR                                                                     # sinek
buzz = np.sign(np.sin(2 * np.pi * (180 + 25 * np.sin(2 * np.pi * 6 * tt)) * tt)) * (0.6 + .4 * np.sin(2 * np.pi * 11 * tt))
add(sfx, 0.4, lp(buzz, 0.25) * np.sin(np.linspace(0, np.pi, n)) * 0.05)
n = at(0.3); tt = np.arange(n) / SR                                                                     # balon şişme
add(sfx, 0.9, np.sin(2 * np.pi * (250 + 1400 * tt) * tt) * np.exp(-tt / 0.15) * 0.18)
for k in range(10): add(sfx, 2.0 + k * 0.3 + rng.random() * 0.1, tone(hz(84 + rng.integers(0, 8)), 0.4, d=0.08, harm=(1, .3)), 0.05)  # para yağmuru
for tt0 in (7.1, 7.7): add(sfx, tt0, tone(1200, 0.12, d=0.03), 0.18)                                    # etiketler
add(sfx, 9.25, lp(noise(0.25), 0.6) * env(at(0.25), 0.0005, 0.03) * 0.9)                                 # PAT!
add(sfx, 9.25, thump(90, 0.08, 0.5))
add(sfx, 14.35, whoosh(0.7, 0.35))                                                                       # banknot gelir
add(sfx, 17.62, thump(48, 0.3, 1.0)); add(sfx, 17.62, click(0.8))                                         # KÜT
for k in range(5): add(sfx, 19.0 + k * 0.12, tone(hz(72 + k * 2), 0.18, d=0.05), 0.12)                    # piyonlar
add(sfx, 20.55, tone(hz(55), 0.5, d=0.3, harm=(1, .7, .4)), 0.10); add(sfx, 21.0, tone(hz(52), 0.9, d=0.5, harm=(1, .7, .4)), 0.10)  # boş cep "vah"
add(sfx, 21.2, tone(hz(81), 0.6, d=0.25, harm=(1, .2)), 0.12)                                            # soru işareti
t = 23.2
while t < 28.3: add(sfx, t, click(0.35)); add(sfx, t + 0.12, click(0.18)); t += 0.3                      # matbaa
for k in range(4): add(sfx, 25.15 + k * 0.22, thump(70 + k * 6, 0.12, 0.45))                             # mühürler
add(sfx, 28.55, whoosh(0.6, 0.3)); add(sfx, 29.0, thump(48, 0.3, 0.9)); add(sfx, 29.0, click(0.7))        # başlık damgası


# ================= GÖVDE (31.4 sn sonrası) =================
def pattern(t0, t1, motif, bassl, bpm, g=0.12, gb=0.15, d=0.12, harm=(1,.6,.3,.15), shift=0):
    st = 60 / bpm / 2; t = t0; i = 0
    while t < t1:
        add(mus, t, tone(hz(motif[i % len(motif)] + shift), 0.5, d=d, harm=harm), g)
        if i % 2 == 0: add(mus, t, tone(hz(bassl[(i // 4) % len(bassl)] + shift), 0.9, d=0.35, harm=(1, .5, .2)), gb)
        t += st; i += 1
MAJ = [62, 66, 69, 66, 71, 69, 66, 64, 62, 66, 69, 74, 73, 71, 69, 66]
MIN = [62, 65, 69, 65, 62, 64, 65, 60, 62, 65, 69, 72, 70, 69, 65, 64]
pattern(31.6, 62.4, MAJ, [38, 43, 45, 38], 100, g=0.11)                       # ada: hafif majör
pattern(64.5, 91.2, MIN, [38, 38, 41, 36], 96, g=0.10)                        # kuyruk
pattern(93.3, 123.7, MIN, [38, 41, 36, 38], 124, g=0.10, d=0.09, shift=-2)    # Almanya: hızlı
n = at(42.0); tt = np.arange(n) / SR                                          # güven: karanlık drone
dr = (np.sin(2*np.pi*36.7*tt) + .5*np.sin(2*np.pi*55*tt) + .25*np.sin(2*np.pi*73.4*tt)) * (0.6 + 0.4*np.sin(2*np.pi*0.1*tt))
e = np.minimum(1, tt/1.5) * np.minimum(1, (tt[-1]-tt)/1.0)
add(mus, 125.8, dr * e * 0.16)
for k, m in enumerate([62, 61, 58, 57, 62, 65, 64, 57] * 4):
    add(mus, 126.0 + k * 1.3, tone(hz(m), 1.4, d=0.6, harm=(1, .3, .1)), 0.08)
t = 170.2; i = 0                                                              # Türkiye: nostaljik müzik kutusu
nost = [74, 78, 81, 78, 76, 79, 83, 79, 74, 78, 81, 86, 85, 81, 78, 76]
while t < 195.6:
    add(mus, t, tone(hz(nost[i % 16]), 1.0, d=0.45, harm=(1, .2, .06)), 0.12)
    if i % 4 == 0: add(mus, t, tone(hz([50, 55, 57, 50][(i//4) % 4]), 1.6, d=0.9, harm=(1, .3)), 0.10)
    t += 0.3; i += 1
pattern(196.2, 225.5, MAJ, [38, 43, 45, 50], 100, g=0.10)                     # cevap: çözülme
for m, g in [(38, .22), (50, .14), (57, .12), (62, .12), (66, .10), (74, .06)]:   # kapanış akoru
    add(mus, 225.9, tone(hz(m), 4.5, d=2.0, harm=(1, .4, .2), a=0.02), g)

def ding(tt0, m=84, g=0.14): add(sfx, tt0, tone(hz(m), 0.6, d=0.2, harm=(1, .3)), g)
def tick(tt0, g=0.12, f=1500): add(sfx, tt0, tone(f, 0.06, d=0.015, harm=(1,)), g)
def kut(tt0, g=1.0): add(sfx, tt0, thump(48, 0.3, g)); add(sfx, tt0, click(0.8 * g))
def steps(tt0, n, dt=0.18, g=0.25):
    for k in range(n): add(sfx, tt0 + k * dt, lp(noise(0.05), 0.3) * env(at(0.05), 0.001, 0.015), g)
def pencil(tt0, dur):
    x = noise(dur); add(sfx, tt0, (x - lp(x, 0.3)) * (0.5 + 0.5 * np.abs(np.sin(np.linspace(0, dur * 14, len(x))))) * 0.06)
def melt(tt0): n = at(1.2); tt = np.arange(n) / SR; add(sfx, tt0, np.sin(2*np.pi*(700 - 400*tt)*tt) * np.exp(-tt/0.6) * 0.08)
# ada
add(sfx, w(7,2)-0.3, whoosh(0.5, 0.3))
for k in range(4): add(sfx, w(7,6)+k*0.15, whoosh(0.25, 0.15))
for k in range(8): ding(w(7,9)+k*0.12, 84+(k*3)%12, 0.06)
steps(w(8,1), 8); ding(w(8,6), 88, 0.10)
add(sfx, w(9,3), lp(noise(0.25), 0.5) * 0.15); kut(w(9,5), 0.9)
add(sfx, w(10,0), tone(900, 0.1, d=0.03), 0.12); kut(w(10,11), 0.5)
for k in range(10): tick(w(11,3)+k*0.05, 0.06, 2200)
for k in range(10): add(sfx, w(11,6)+k*0.1, whoosh(0.15, 0.08))
# defter
for a, b in GAPS: add(sfx, a-0.3, whoosh(0.5, 0.25)); pencil(a+0.05, 1.05); ding(a+1.15, 86, 0.10)
# kuyruk
add(sfx, w(13,0)-0.3, whoosh(0.5, 0.25)); steps(w(13,4), 7); ding(w(13,12), 88, 0.12)
for k in range(1, 5): tick(w(14,k), 0.14, 1300 + k*150)
add(sfx, w(15,5), tone(1000, 0.1, d=0.03), 0.10); add(sfx, w(15,7), tone(1100, 0.1, d=0.03), 0.10)
kut(w(15,9), 0.9); add(sfx, w(16,2)-0.2, whoosh(0.3, 0.15)); add(sfx, w(16,3), lp(noise(0.3), 0.5) * 0.18)
melt(w(16,6)); kut(w(16,10), 0.8)
# Almanya
add(sfx, 92.5, whoosh(0.8, 0.35)); add(sfx, w(17,11)-0.3, tone(900, 0.12, d=0.04), 0.12)
steps(w(18,7), 10, 0.14); tick(w(18,10)+0.2, 0.18, 1200); kut(w(18,15), 0.5); add(sfx, w(18,10), whoosh(0.5, 0.15))
for k in range(9): tick(w(19,7)+k*0.45, 0.14, 1400+k*60)
ding(w(19,10), 96, 0.10)
for k in range(int((w(20,-1)+1-w(20,0))/0.5)): tick(w(20,0)+k*0.5, 0.05, 2500)
for k in range(2): add(sfx, w(20,2)+k*0.3, tone(900, 0.1, d=0.03), 0.10)
n = at(w(20,-1)+1.5-w(20,5)); tt = np.arange(n)/SR; add(sfx, w(20,5), lp(noise(len(tt)/SR), 0.05) * (0.6+0.4*np.sin(2*np.pi*7*tt)) * 0.35)
# güven
n = at(0.6); tt = np.arange(n)/SR; add(sfx, w(21,6), lp(noise(0.6), 0.6)*np.exp(-tt/0.08)*0.8 + thump(60, 0.2, 0.6))
add(sfx, w(22,9), whoosh(0.8, 0.3)); n = at(4.0); tt = np.arange(n)/SR; add(sfx, w(22,9)+0.8, lp(noise(4.0), 0.08) * np.minimum(1, tt/0.4) * np.exp(-tt/2.5) * 0.6)
add(sfx, w(22,14), tone(500, 0.4, d=0.1, harm=(1, .7, .5)), 0.10)
n = at(4.5); tt = np.arange(n)/SR; add(sfx, w(23,0), lp(noise(4.5), 0.02) * np.sin(np.pi*tt/tt[-1]) * 0.9)
add(sfx, w(23,7), click(0.6)); add(sfx, w(23,7)+0.08, click(0.4))
add(sfx, w(24,0)-0.3, tone(900, 0.12, d=0.04), 0.12)
for k in range(5): ding(w(24,11)+k*0.4, 72+k*4, 0.10)
for k in range(20): tick(w(24,18)+k*(w(24,22)+0.5-w(24,18))/20, 0.10, 1800)
add(sfx, w(25,0)-0.3, tone(900, 0.12, d=0.04), 0.12); kut(w(25,9), 0.4)
add(sfx, w(25,10), tone(1000, 0.1, d=0.03), 0.10); add(sfx, w(25,17), tone(1100, 0.1, d=0.03), 0.10)
for k in range(9): ding(w(26,4)+0.3+k*0.12, 90-k, 0.06)
# Türkiye
add(sfx, w(27,0)-0.2, tone(900, 0.12, d=0.04), 0.12)
for k in range(3): add(sfx, w(27,0)+k*0.25, whoosh(0.2, 0.1))
add(sfx, w(27,6)-0.2, tone(1000, 0.1, d=0.03), 0.10); add(sfx, w(27,8)-0.2, tone(1100, 0.1, d=0.03), 0.10)
add(sfx, w(27,14), tone(1200, 0.1, d=0.03), 0.10); add(sfx, w(27,22)-0.3, whoosh(0.7, 0.3))
add(sfx, w(28,2), whoosh(0.4, 0.2))
for k in range(8): add(sfx, w(28,10)-0.2+k*0.1, tone(hz(84+k), 0.15, d=0.04), 0.08)
for k in range(4): ding(w(28,17)+k*0.15, [79, 83, 86, 91][k], 0.08)
kut(w(28,28), 0.9); add(sfx, w(28,28)+0.05, tone(hz(96), 1.2, d=0.5, harm=(1, .5, .3)), 0.10)
# cevap
ding(w(29,0), 81, 0.12); kut(w(30,0), 0.6)
for k in range(10): add(sfx, w(30,5)+k*0.12, tone(hz(76+k), 0.1, d=0.03), 0.05)
ding(w(31,6), 88, 0.12); melt(w(31,17)); ding(w(32,0), 86, 0.12); kut(w(32,10), 0.9)
ding(w(33,4), 81, 0.10); add(sfx, w(33,8)-0.2, whoosh(0.6, 0.25)); ding(w(33,14), 76, 0.10)
add(sfx, 225.6, whoosh(0.5, 0.25)); kut(226.0, 0.9)
# basit oda yankısı
def verb(x):
    y = x.copy()
    for d, g in [(0.031, .35), (0.047, .28), (0.071, .22), (0.113, .16), (0.167, .1)]:
        k = at(d); y[k:] += g * x[:-k]
    return y
mus = verb(mus); sfx = verb(sfx) * 0.9 + sfx * 0.1

# ---------- ANLATIM KURGUSU ----------
src = sys.argv[1]
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', src, '-f', 's16le', '-ac', '1', '-ar', str(SR), '-'], capture_output=True).stdout
v = np.frombuffer(raw, np.int16).astype(np.float64) / 32768
voc = np.zeros(N)
for a, b2, o in SEG:
    seg = v[at(a):at(b2)].copy(); f = at(0.01); seg[:f] *= np.linspace(0, 1, f); seg[-f:] *= np.linspace(1, 0, f)
    add(voc, o, seg)
np.save('/tmp/claude-0/-home-user-lexis-hukuk/ddfe0a26-5f62-5832-82ca-52fc14b1a58b/scratchpad/stem_voc.npy',voc.astype(np.float32)); np.save('/tmp/claude-0/-home-user-lexis-hukuk/ddfe0a26-5f62-5832-82ca-52fc14b1a58b/scratchpad/stem_mus.npy',mus.astype(np.float32)); np.save('/tmp/claude-0/-home-user-lexis-hukuk/ddfe0a26-5f62-5832-82ca-52fc14b1a58b/scratchpad/stem_sfx.npy',sfx.astype(np.float32))
# müziği anlatım altında kıs (ducking)
envv = np.convolve(np.abs(voc), np.ones(at(0.15)) / at(0.15), 'same')
duck = 1 - 0.55 * np.clip(envv / 0.05, 0, 1)
mix = voc * 2.3 + mus * 0.15 * duck + sfx * 0.4   # anlatım ~-20 dB, müzik ~16 dB altında
mix = mix[:at(END)]
fo = at(0.4); mix[-fo:] *= np.linspace(1, 0, fo)
mix /= max(1e-9, np.abs(mix).max()) / 0.89
with wave.open('bolum1_mix.wav', 'wb') as wv:
    wv.setnchannels(1); wv.setsampwidth(2); wv.setframerate(SR)
    wv.writeframes((mix * 32767).astype(np.int16).tobytes())
print('ok', len(mix) / SR, 's')
