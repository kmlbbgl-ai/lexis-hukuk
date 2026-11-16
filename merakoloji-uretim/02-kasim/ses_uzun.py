import sys,json; sys.path.insert(0,'../lib'); import ses, numpy as np
V=json.load(open('veri_uzun.json')); Z=json.load(open('zamanlama.json'))
src={}; [src.setdefault(w['line'],[]).append(w['t0']) for w in Z['words']]
T=lambda l,i: src[l][i]
m=ses.Mix(V['END']); m.voice('../../merakoloji-senaryolar/seslendirme/02-kasim.mp3',V['SEG'])
MAJ=[72,76,79,76,74,77,81,77,72,76,79,84,83,79,77,74]; MIN=[69,72,76,72,69,71,72,67,69,72,76,79,77,76,72,71]
m.pattern(0.3,24.0,MAJ,[48,53,55,48],116,g=.10)
m.pattern(24.2,51.6,[67,None,70,72,None,74,72,70,67,None,65,67,None,70,67,65],[43,43,46,48],104,g=.10)   # caz havası
m.pattern(51.8,89.4,MIN,[45,45,48,43],100,g=.09)
m.pattern(89.6,113.2,MIN,[45,48,43,45],144,g=.09,d=.08)
m.pattern(113.4,128.2,MAJ,[48,53,55,48],116,g=.10)
m.drone(128.4,34,g=.12); m.pattern(128.6,162.0,MIN,[45,45,41,43],96,g=.07)
m.musicbox(162.1,184.7,[76,79,84,79,77,81,84,81],step=0.5,g=.09,bass=[48,53,55,48])
m.pattern(184.9,210.8,MAJ,[48,53,55,60],110,g=.10)
m.chord(211.0,[48,55,60,64,67,72],dur=4.2,g=.11)
# efektler
m.swish(T(1,0)-0.2,0.5,0.2); m.kut(T(1,3),0.5); m.kut(T(1,9),1.0); m.pop(T(2,1)); m.applause(T(2,3),1.6,0.12); [m.ding(T(2,3)+k*0.12,84+k%7,0.05) for k in range(8)]
m.pop(T(3,0)); m.kut(T(3,7),0.8); [m.add(m.sfx,T(3,19)+i*0.2,m.thump(70+i*6,0.12,0.4)) for i in range(4)]
m.swish(T(4,0)-0.3,0.7,0.3); m.pop(T(4,3)); m.pop(T(5,7))
for k in range(9): m.add(m.sfx,32.5+k*1.1+(k%3)*0.2,m.tone(380+40*(k%3),0.25,d=0.15,harm=(1,.5)),0.06)  # korna
for k in range(4): n=int(0.35*m.N/m.N*ses.SR); tt=np.arange(int(0.35*ses.SR))/ses.SR; m.add(m.sfx,34.2+k*1.6,np.sin(2*np.pi*(2600+120*np.sin(2*np.pi*30*tt))*tt)*np.exp(-tt/0.2),0.05)  # düdük
m.kut(T(5,31),0.7); m.swish(T(6,9),0.8,0.25); m.add(m.sfx,T(6,10),m.tone(m.hz(55),0.5,d=0.3,harm=(1,.7,.4)),0.10); m.add(m.sfx,T(6,10)+0.45,m.tone(m.hz(52),0.9,d=0.5,harm=(1,.7,.4)),0.10)
m.pop(T(7,0)); m.chalk(T(8,1),0.35,0.05); m.add(m.sfx,T(8,10)+0.5,m.thump(40,0.4,0.8)); m.pop(T(8,18)); m.kut(T(8,25),0.6); m.ding(T(8,25)+0.05,88)
m.pop(T(9,0)); sp=T(9,17); d=T(10,0)-sp; k=0; t=sp
while t<T(10,0): m.tick(t,0.08,1800); k+=1; t=sp+d*(k/24)**1.6
m.ding(T(10,0),84); m.ding(T(10,8),79)
m.pop(T(12,0)); t=T(13,0)
while t<T(16,0)-0.4: m.tick(t,0.07,1300); t+=0.5
m.swish(T(15,5),0.6,0.25); m.ding(T(15,5)+0.1,91,0.08)
m.pop(T(16,0)); m.swish(T(18,10),0.6,0.2); m.pop(T(18,10)+0.7,0.1,1200); m.ding(T(18,10)+0.8,88,0.1); m.add(m.sfx,T(18,16),m.tone(m.hz(55),0.5,d=0.3,harm=(1,.7,.4)),0.09)
m.pop(T(19,0)); m.kut(T(20,0),1.0); m.pop(T(20,7)); [m.tick(T(20,17)+i*0.12,0.08,1200+i*60) for i in range(10)]; m.ding(T(20,28),88); m.kut(T(21,12),0.8); m.kut(T(22,4),0.9); m.pop(T(22,13))
m.swish(T(23,0),0.6,0.2); m.swish(T(25,0),0.5,0.2); m.ding(T(25,16),88)
[m.chalk(T(l,0),0.9,0.04) for l in (27,28,29)]; m.kut(T(30,10),0.8); m.pop(T(31,0))
m.swish(V['END']-4.6,0.5,0.25); m.kut(V['END']-4.2,0.9)
m.save('mix_uzun.wav',stems='/tmp/claude-0/-home-user-lexis-hukuk/ddfe0a26-5f62-5832-82ca-52fc14b1a58b/scratchpad/kasim')
print('ok')
