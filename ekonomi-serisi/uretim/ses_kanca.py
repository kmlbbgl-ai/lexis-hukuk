"""Kanca bölümü: kodla üretilen müzik + ses efektleri + anlatım kurgusu -> kanca_mix.wav"""
import numpy as np, wave, subprocess, sys
from kurgu import SEG, END
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
# müziği anlatım altında kıs (ducking)
envv = np.convolve(np.abs(voc), np.ones(at(0.15)) / at(0.15), 'same')
duck = 1 - 0.55 * np.clip(envv / 0.05, 0, 1)
mix = voc * 2.3 + mus * 0.15 * duck + sfx * 0.4   # anlatım ~-20 dB, müzik ~16 dB altında
mix = mix[:at(END)]
fo = at(0.4); mix[-fo:] *= np.linspace(1, 0, fo)
mix /= max(1e-9, np.abs(mix).max()) / 0.89
with wave.open('kanca_mix.wav', 'wb') as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((mix * 32767).astype(np.int16).tobytes())
print('ok', len(mix) / SR, 's')
