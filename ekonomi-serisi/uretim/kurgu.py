"""Kanca bölümü (ilk ~31 sn) için ses kurgusu ve altyazı verisi.
SEG: (kaynak_baş, kaynak_son, çıktı_baş) — araya görsel duraklama boşlukları girer."""
import json, re
SEG=[(0.0,8.75,0.0),(8.75,27.6,9.75)]
END=31.4
def out_t(t):
    for a,b,o in SEG:
        if a<=t<b+0.05: return o+(t-a)
    return None
if __name__=='__main__':
    d=json.load(open('zamanlama.json'))
    chunks=[]
    for ln in d['lines']:
        ws=[w for w in d['words'] if w['line']==ln['i'] and out_t(w['t0']) is not None and w['t0']<27.6]
        if not ws: continue
        cur=[]
        for w in ws:
            if cur and (sum(len(x['w'])+1 for x in cur)+len(w['w'])>38 or re.search(r'[.?…:]$',cur[-1]['w'])):
                chunks.append(cur); cur=[]
            cur.append(w)
        if cur: chunks.append(cur)
    sub=[]
    for i,c in enumerate(chunks):
        sub.append({'t0':round(out_t(c[0]['t0']),3),'t1':round(out_t(c[-1]['t1'])+0.25,3),
                    'w':[[x['w'],round(out_t(x['t0']),3),round(out_t(x['t1']),3)] for x in c]})
    for i in range(len(sub)-1): sub[i]['t1']=min(sub[i]['t1']+0.6,sub[i+1]['t0'])
    open('kanca_sub.js','w').write('window.SUB='+json.dumps(sub,ensure_ascii=False)+';')
    W={w['w']+'@'+str(i):round(out_t(w['t0']),2) for i,w in enumerate(d['words']) if w['t0']<27.6}
    print(len(sub),'altyazı parçası'); print(W)
