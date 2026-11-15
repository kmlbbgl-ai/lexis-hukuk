"""Bölüm 1 tam video kurgusu: ses parçaları + duraklamalar, altyazı ve kelime zamanları (çıktı saniyesi)."""
import json, re
# (kaynak_baş, kaynak_son, çıktı_baş)
SEG=[(0.0,8.75,0.0),(8.75,27.6,9.75),(27.6,58.7,31.4),(58.7,85.7,64.3),(85.7,116.4,93.1),(116.4,159.0,125.6),(159.0,214.8,170.0)]
TITLE=(28.6,31.4)
GAPS=[(62.5,64.3),(91.3,93.1),(123.8,125.6),(168.2,170.0)]   # cevap defteri 1-4
END=230.8
DEFTER=["Para çoğalır, mal çoğalmaz → fiyat artar.","Önde olan kazanır, sonda olan kaybeder.","Zam korkusu, zammı hızlandırır.","Güven biterse para, kâğıda döner."]
def out_t(t):
    for a,b,o in SEG:
        if a-0.02<=t<b: return o+(t-a)
    return None
if __name__=='__main__':
    d=json.load(open('zamanlama.json'))
    LW={}
    for w in d['words']:
        LW.setdefault(w['line'],[]).append(round(out_t(w['t0']),3))
    chunks=[]
    for ln in d['lines']:
        ws=[w for w in d['words'] if w['line']==ln['i']]
        cur=[]
        for w in ws:
            if cur and (sum(len(x['w'])+1 for x in cur)+len(w['w'])>38 or re.search(r'[.?…:!]$',cur[-1]['w'])):
                chunks.append(cur); cur=[]
            cur.append(w)
        if cur: chunks.append(cur)
    sub=[]
    for c in chunks:
        sub.append({'t0':round(out_t(c[0]['t0']),3),'t1':round(out_t(c[-1]['t1'])+0.25,3),
                    'w':[[x['w'].replace('"',''),round(out_t(x['t0']),3),round(out_t(x['t1']),3)] for x in c]})
    for i in range(len(sub)-1): sub[i]['t1']=min(sub[i]['t1']+0.6,sub[i+1]['t0'])
    veri={'LW':[LW[i] for i in range(len(LW))],'SUB':sub,'SEG':SEG,'GAPS':GAPS,'TITLE':TITLE,'END':END,'DEFTER':DEFTER}
    json.dump(veri,open('bolum1_veri.json','w'),ensure_ascii=False)
    open('bolum1_veri.js','w').write('window.V='+json.dumps(veri,ensure_ascii=False)+';window.SUB=V.SUB;window.LW=V.LW;')
    for i in range(6,34): print(i, LW[i][0], LW[i][-1])
