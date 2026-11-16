import sys,json; sys.path.insert(0,'../lib'); import ses, numpy as np
V=json.load(open('veri_uzun.json')); Z=json.load(open('zamanlama.json'))
src={}; [src.setdefault(w['line'],[]).append(w['t0']) for w in Z['words']]
T=lambda l,i: src[l][i]
m=ses.Mix(V['END']); m.voice('../../merakoloji-senaryolar/seslendirme/03-karun.mp3',V['SEG'])
MAJ=[72,76,79,76,74,77,81,77,72,76,79,84,83,79,77,74]; MIN=[69,72,76,72,69,71,72,67,69,72,76,79,77,76,72,71]
DOGU=[69,70,73,74,76,74,73,70,69,None,73,74,76,77,76,73]   # hicaz havası
m.pattern(0.3,25.6,DOGU,[45,45,46,45],112,g=.09)
m.chord(25.9,[48,55,60,64,67],dur=2.5,g=.08); m.pattern(27.0,40.6,MAJ,[48,53,55,48],96,g=.09)
m.musicbox(40.9,65.2,[81,84,88,84,86,89,93,89],step=0.45,g=.08,bass=[45,50,52,45])
m.pattern(65.5,80.2,[72,None,76,79,None,76,74,None,72,74,76,None,79,77,74,None],[48,43,48,43],120,g=.10)
m.pattern(80.4,126.0,MAJ,[48,53,55,48],100,g=.08)
m.drone(126.3,28,g=.12); m.pattern(126.5,154.6,DOGU,[45,45,41,43],88,g=.07)
m.drone(154.8,14.6,g=.14); m.pattern(157.9,187.2,MIN,[45,45,48,43],108,g=.08,d=.08)
m.pattern(187.4,206.8,MIN,[45,48,43,45],140,g=.08,d=.08)
m.pattern(207.0,236.8,MAJ,[48,53,55,60],112,g=.10)
m.chord(237.0,[48,55,60,64,67,72],dur=4.2,g=.11)
# efektler
m.swish(0.2,0.6,0.2); m.pop(T(0,9)-0.3); m.pop(T(1,5)); m.kut(T(2,1),0.9); m.ding(T(2,7),84)
[m.pop(T(3,i)) for i in (5,6,10,14)]; m.kut(T(3,19),0.7)
m.swish(T(4,0)-0.3,0.6,0.25); m.pop(T(4,2)); m.pop(T(4,16)); [m.ding(T(5,0)+i*0.12,84+i%5,0.05) for i in range(12)]; m.pop(T(5,12))
m.pop(T(6,0)); m.swish(T(7,0)-0.3,0.8,0.2); [m.ding(T(7,12)+i*0.2,91+i%3,0.04) for i in range(6)]
m.pop(T(8,7)); m.melt(T(8,17)) if hasattr(m,'melt') else None; [m.ding(T(8,17)+i*0.15,88+i%4,0.05) for i in range(6)]
m.kut(T(9,0),0.6); m.kut(T(9,4),0.8)
m.swish(T(10,0),0.5,0.2); m.ding(T(10,13),84,0.14); m.ding(T(10,13)+0.15,91,0.1)
m.pop(T(11,3)); m.pop(T(11,5)); m.pop(T(11,10)); m.kut(T(11,16),0.8)
m.swish(T(12,0),0.5,0.2); m.pop(T(12,12)); m.ding(T(12,15),86); m.pop(T(12,18)); m.pop(T(12,26))
[m.pop(T(13,4)+i*0.2) for i in range(3)]; m.pop(T(13,9),0.1,600)
m.pop(T(14,6)); m.swish(T(14,10),0.6,0.2); m.kut(T(15,3),0.9); m.pop(T(15,8))
m.pop(T(16,4)); m.ding(T(16,9),84); m.kut(T(16,14),0.8)
[m.pop(T(17,i)) for i in (1,4,5,6)]; m.kut(T(17,8),0.8)
m.swish(T(18,0),0.6,0.2); m.pop(T(18,13)); m.swish(T(18,19),1.0,0.15); m.pop(T(19,3))
m.swish(T(20,2),0.9,0.25); m.kut(T(20,10),1.0); m.add(m.sfx,T(20,11),m.tone(m.hz(55),0.5,d=0.3,harm=(1,.7,.4)),0.10); m.add(m.sfx,T(20,11)+0.45,m.tone(m.hz(52),0.9,d=0.5,harm=(1,.7,.4)),0.10)
m.pop(T(21,0)); m.pop(T(21,3))
m.pop(T(22,5)); m.swish(T(23,0),0.6,0.2); t=T(23,8)
while t<T(23,14): m.add(m.sfx,t,m.thump(60,0.15,0.5)); t+=0.35
[m.ding(T(23,14)+i*0.12,84+i%5,0.05) for i in range(10)]; m.swish(T(23,21),1.2,0.2)
m.swish(T(24,0),0.6,0.2); m.pop(T(24,7)); m.pop(T(25,0)); m.kut(T(25,4),0.8)
[m.kut(T(25,13)+i*0.22,0.7) for i in range(3)]; m.swish(T(26,9),1.0,0.2); m.ding(T(26,10),84); m.ding(T(26,10)+0.15,88); m.ding(T(26,10)+0.3,91)
m.pop(T(27,0)); m.ding(T(28,4),91); m.kut(T(28,13),0.9); m.kut(T(28,16),0.8)
m.pop(T(29,5)); m.pop(T(29,7)); m.kut(T(29,14),0.7); m.ding(T(29,17),88)
[m.tick(T(30,i),0.12,1400) for i in (0,1,4,8,12)]; m.kut(T(30,15),0.6); m.add(m.sfx,T(30,20),m.click(1.2)); m.kut(T(30,20),0.6)
m.swish(T(31,0),0.6,0.2); m.ding(T(31,6),84); m.pop(T(32,1)); m.pop(T(32,6)); m.kut(T(32,15),0.8)
m.pop(T(33,0)); m.kut(T(33,10),0.7)
m.swish(V['END']-4.6,0.5,0.25); m.kut(V['END']-4.2,0.9)
m.save('mix_uzun.wav',stems='/tmp/claude-0/-home-user-lexis-hukuk/ddfe0a26-5f62-5832-82ca-52fc14b1a58b/scratchpad/karun')
print('ok')
