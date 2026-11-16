import sys,json; sys.path.insert(0,'../lib'); import ses, numpy as np
V=json.load(open('veri_uzun.json')); Z=json.load(open('zamanlama.json'))
src={}; [src.setdefault(w['line'],[]).append(w['t0']) for w in Z['words']]
T=lambda l,i: src[l][i]
m=ses.Mix(V['END']); m.voice('../../merakoloji-senaryolar/seslendirme/04-yapayzeka.mp3',V['SEG'])
MIN=[69,72,76,72,69,71,72,67,69,72,76,79,77,76,72,71]; MAJ=[72,76,79,76,74,77,81,77,72,76,79,84,83,79,77,74]
ELEK=[57,None,64,None,60,None,67,64,57,None,64,None,62,None,60,59]
m.drone(0.0,15.6,g=.14); m.buzz(0.6,2.6,0.06); m.ring(1.0,2.4,0.05)
m.glitch(T(1,0)-0.1,0.3,0.12); m.add(m.sfx,T(3,4),m.tone(90,0.8,d=0.6,harm=(1,.5)),0.05); m.add(m.sfx,T(3,4)+1.0,m.tone(80,0.8,d=0.6,harm=(1,.5)),0.05)
m.pattern(15.7,52.6,ELEK,[45,45,41,43],108,g=.08,d=.08)
m.pattern(52.7,98.9,MIN,[45,45,48,43],100,g=.07)
m.pattern(99.2,118.3,ELEK,[45,41,43,45],108,g=.07,d=.08)
m.drone(118.5,21,g=.11); m.pattern(118.6,139.4,MIN,[45,45,41,43],120,g=.07,d=.08)
m.pattern(139.7,185.2,MAJ,[48,53,55,48],100,g=.08)
m.musicbox(185.5,196.4,[76,79,84,79,77,81,84,81],step=0.45,g=.08,bass=[48,53,55,48])
m.pattern(196.5,213.4,MAJ,[48,53,55,60],116,g=.10)
m.chord(213.6,[48,55,60,64,67,72],dur=4.2,g=.11)
m.swish(T(4,0),0.6,0.2); m.pop(T(4,2)); [m.pop(T(4,13)+i*0.15) for i in range(3)]
m.pop(T(5,0)); m.kut(T(5,13),0.7); m.ding(T(6,7),88); m.pop(T(6,14))
[m.pop(T(7,i)) for i in (0,3,5)]; m.kut(T(7,8),0.6); m.pop(T(8,2)); m.pop(T(8,6)); m.swish(T(8,12),0.6,0.2); m.kut(T(8,16),0.7)
m.swish(T(9,0),0.6,0.2); m.ding(T(10,4),84); m.pop(T(10,6)); [m.pop(T(10,12)+i*0.12,0.1,1100) for i in range(6)]
[m.kut(T(11,9)+i*0.2,0.5) for i in range(5)]; m.swish(T(12,4),1.2,0.2); m.kut(T(12,5),0.7)
[m.kut(T(13,12)+i*0.22,0.8) for i in range(3)]; m.pop(T(13,6)); m.pop(T(13,9)); m.pop(T(13,14)); m.glitch(T(13,23),0.4,0.1); m.kut(T(13,31),0.8)
[m.pop(T(14,i)) for i in (1,2,3)]; m.kut(T(14,7),0.7)
m.swish(T(15,0),0.6,0.2); m.pop(T(15,2)); [m.pop(T(16,i)) for i in (2,5,9)]; m.glitch(T(17,4),0.3,0.08); m.kut(T(17,7),0.7)
m.pop(T(18,0)); [m.kut(T(l,0),0.6) for l in (19,20,21)]; t=T(22,11)
for k in range(4): m.add(m.sfx,t+k*0.35,m.tone(880 if k%2 else 660,0.3,d=0.25,harm=(1,.5)),0.06)
m.swish(T(23,0),0.6,0.2); m.ding(T(23,3),84); m.pop(T(24,1)); m.pop(T(24,12)); m.pop(T(25,5)); m.ding(T(25,6),91); m.pop(T(25,8),0.1,600)
m.swish(T(26,0),0.5,0.2); m.click(1); m.pop(T(26,5)); m.ring(T(26,11),1.2,0.04); m.ding(T(26,15),88)
m.swish(T(27,0),0.5,0.2); m.pop(T(27,6)); m.pop(T(27,11)); m.ding(T(27,15),88)
m.swish(T(28,0),0.5,0.2); m.kut(T(28,0),0.6); m.pop(T(28,16)); m.pop(T(28,23))
m.swish(T(29,0),0.8,0.15); m.glitch(T(30,9),0.5,0.12); m.kut(T(30,9),0.8); m.kut(T(31,3),0.7); m.ding(T(31,6),88)
m.swish(T(32,0),0.6,0.2); m.pop(T(32,5))
m.pop(T(33,0)); [m.tick(T(33,3)+i*0.08,0.08,1600) for i in range(18)]; m.kut(T(33,10),0.8)
[m.tick(T(34,5)+i*0.08,0.08,1600) for i in range(10)]; m.pop(T(34,7),0.1,600); m.add(m.sfx,T(34,12)+0.5,m.thump(50,0.3,0.7)); m.ding(T(34,13),91)
m.swish(V['END']-4.6,0.5,0.25); m.kut(V['END']-4.2,0.9)
m.save('mix_uzun.wav',stems='/tmp/claude-0/-home-user-lexis-hukuk/ddfe0a26-5f62-5832-82ca-52fc14b1a58b/scratchpad/yz')
print('ok')
