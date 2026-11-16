import sys,json; sys.path.insert(0,'../lib'); import ses
VER=sys.argv[1]; V=json.load(open(f'veri_{VER}.json')); Z=json.load(open('zamanlama.json'))
src={}; [src.setdefault(w['line'],[]).append(w['t0']) for w in Z['words']]
T=lambda l,i: src[l][i]          # 0–98 sn arası kaynak = çıktı
m=ses.Mix(V['END']); m.voice('../../merakoloji-senaryolar/seslendirme/01-ogretmenler.mp3',V['SEG'])
oyun=[72,76,79,76,74,77,81,77,72,76,79,84,83,79,77,74]; bas=[48,53,55,48]
m.pattern(0.3,31.8,oyun,bas,112,g=0.10)
m.chord(32.0,[53,60,65,69],dur=7,g=.08); m.chord(39.2,[53,60,65,69,72],dur=7,g=.08)
m.musicbox(32.2,46.2,[77,81,84,81,79,77,76,72],step=0.55,g=.08)
m.pattern(46.4,61.2,oyun,bas,118,g=0.10)
m.musicbox(61.3,69.3,[84,88,91,88,86,84,83,79],step=0.42,g=.11,bass=[48,53,55,48])
m.pattern(69.4,97.9,oyun,bas,112,g=0.10)
m.chord(98.0,[48,55,60,64,67,72],dur=3.2,g=.11)
# efektler
m.chalk(0.15,1.4); [m.chalk(T(0,i),0.5) for i in (6,9,13)]; [m.chalk(T(0,i),0.18,0.09) for i in (8,12,15)]; m.chalk(T(0,15)+0.25,0.18,.09); m.chalk(T(0,15)+0.5,0.18,.09)
[m.pop(T(1,i),0.12,1000) for i in (0,6,7)]
m.chalk(T(2,0),1.0); [m.tick(T(2,5)+i*0.28,0.10,1300+i*80) for i in range(6)]
[m.pop(T(2,11)+i*0.1,0.06,800+i*40) for i in range(10)]; [m.ding(T(2,13)+i*0.35,84+i%5,0.05) for i in range(10)]; m.pop(T(2,21),0.14,1200); m.ding(T(2,21)+0.1,91,0.08)
m.chalk(T(3,6),0.8); m.pop(T(3,16),0.12,1100)
m.chalk(T(4,6),0.6); m.chalk(T(4,8),2.2,0.04)
m.kut(T(5,9),0.8); m.ding(T(5,13),84,0.10)
[m.tick(T(6,12)+i*0.09,0.08,1500) for i in range(int((T(6,16)+0.4-T(6,12))/0.09))]; m.ding(T(6,19),88,0.12); m.ding(T(6,19)+0.12,93,0.08)
m.bell(T(7,1),1.3); [m.add(m.sfx,T(7,1)+0.1+k*0.17,m.click(0.4)) for k in range(18)]; m.kut(T(7,11),0.6)
m.swish(T(8,0),0.6,0.3); m.chalk(T(8,3),2.5,0.04); m.chalk(T(8,15),1.0); m.applause(T(8,16),2.4)
[m.pop(T(9,i),0.12,1000+i*20) for i in (4,7,11)]; m.swish(T(9,24)-0.2,0.5,0.2); m.ding(T(9,24),88,0.10)
[m.swish(T(10,0)+k*0.55,0.35,0.15) for k in range(3)]
m.swish(T(11,3),0.5,0.15); m.clatter(T(11,12)-0.3,18,0.06); m.pop(T(11,15),0.14,1200)
m.swish(T(12,5),1.2,0.2); m.pop(T(12,7),0.1,1000); m.pop(T(12,10),0.1,1100); m.kut(T(12,13),0.7)
m.pop(98.6,0.12,1100); m.kut(99.4,0.8); m.ding(99.45,96,0.10)
m.save(f'mix_{VER}.wav')
print('ok',VER,V['END'])
