import re
# ---- sayıları rakama çevir (yalnızca ekranda) ----
NUM={'sıfır':0,'bir':1,'iki':2,'üç':3,'dört':4,'beş':5,'altı':6,'yedi':7,'sekiz':8,'dokuz':9,'on':10,'yirmi':20,'otuz':30,'kırk':40,'elli':50,'altmış':60,'yetmiş':70,'seksen':80,'doksan':90,'yüz':100,'bin':1000}
ROOTS=sorted(NUM,key=len,reverse=True)
SUF={'','de','da','te','ta','den','dan','ten','tan','e','a','ye','ya','i','ı','u','ü','yi','yı','yu','yü','in','ın','un','ün','lar','ler','larda','lerde','ları','leri','lık','lik','luk','lük'}
ORD={'üncü','ıncı','inci','uncu','ncı','nci','ncu','ncü'}
AYLAR=('ocak','şubat','mart','nisan','mayıs','haziran','temmuz','ağustos','eylül','ekim','kasım','aralık')
def split(wd):
    lw=wd.lower().replace('İ','i')
    core=re.sub(r'[^\wçğıöşü]','',lw)
    for r in ROOTS:
        if core.startswith(r):
            s=core[len(r):]
            if s in SUF: return r,s,False
            if s in ORD: return r,'',True
    return None
def fmt(n,year): 
    if year or n<1000: return str(n)
    return f"{n:,}".replace(',','.')
def donustur(ws):  # ws: [[kelime,t0,t1],...]
    out=[];i=0
    while i<len(ws):
        w=ws[i][0]; lw=w.lower()
        if re.sub(r'[^\wçğıöşü]','',lw)=='yüzde':   # yüzde X
            j=i+1;seq=[]
            while j<len(ws) and split(ws[j][0]) and not split(ws[j][0])[2]:
                seq.append(j); 
                if split(ws[j][0])[1] or re.search(r'[^\wçğıöşü]$',ws[j][0]): j+=1;break
                j+=1
            if seq:
                n=sum_seq([ws[k][0] for k in seq]); last=ws[seq[-1]][0]; tr=re.search(r'[^\wçğıöşü]+$',last)
                out.append(['%'+str(n)+(tr.group(0) if tr else ''),ws[i][1],ws[seq[-1]][2]]); i=seq[-1]+1; continue
        seq=[];j=i
        while j<len(ws):
            sp=split(ws[j][0])
            if not sp: break
            seq.append(j)
            if sp[1] or sp[2] or re.search(r'[^\wçğıöşü]$',ws[j][0]): break
            j+=1
        conv=False
        if seq:
            words=[ws[k][0] for k in seq]; r,s,o=split(words[-1])
            if len(seq)>=2 and words[0].lower()!='bir': conv=True
            elif len(seq)>=2 and words[0].lower()=='bir' and split(words[1])[0] in ('bin','milyon'): conv=True
            elif len(seq)==1:
                r0=split(words[0])[0]
                if NUM[r0]>=20 and r0 not in ('yüz','bin'): conv=True
                if r0=='on' and s=='' and not o: conv=True
                if r0=='yüz' and o: conv=True
            nxt=ws[seq[-1]+1][0].lower() if seq[-1]+1<len(ws) else ''
            if nxt.startswith(AYLAR) and not s: conv=True
            if len(seq)>=2 and words[0].lower()=='bir' and not split(words[1])[0] in ('bin',) and not nxt.startswith(AYLAR): conv=False
        if conv:
            words=[ws[k][0] for k in seq]; n=sum_seq(words); r,s,o=split(words[-1])
            nxt=ws[seq[-1]+1][0].lower() if seq[-1]+1<len(ws) else ''
            year=1900<=n<=2099 and (s in ('de','da','te','ta','den','dan','ten','tan','larda','lerde','lar','ler','ları','leri') or nxt=='ve' or (seq[0]>0 and ws[seq[0]-1][0].lower().startswith(AYLAR)))
            # virgül: 39 virgül 9
            if nxt.startswith('virgül') and seq[-1]+2<len(ws) and split(ws[seq[-1]+2][0]):
                k=seq[-1]+2; frac=[k]
                while k+1<len(ws) and split(ws[k][0]) and not split(ws[k][0])[1] and split(ws[k+1][0]): k+=1; frac.append(k)
                fn=sum_seq([ws[q][0] for q in frac]); last=ws[frac[-1]][0]; r2,s2,o2=split(last)
                tr2=re.search(r'[^\wçğıöşü]+$',last); tr2=tr2.group(0) if tr2 else ''
                out.append([f"{n},{fn}"+(("'"+s2) if s2 else '')+tr2,ws[seq[0]][1],ws[frac[-1]][2]]); i=frac[-1]+1; continue
            tr=re.search(r'[^\wçğıöşü]+$',words[-1]); tr=tr.group(0) if tr else ''
            txt=fmt(n,year)+('.' if o else '')+(("'"+s) if s else '')+tr
            out.append([txt,ws[seq[0]][1],ws[seq[-1]][2]]); i=seq[-1]+1
        else:
            out.append(ws[i]); i+=1
    return out
def sum_seq(words):
    total=0;cur=0
    for w in words:
        n=NUM[split(w)[0]]
        if n==1000: total+=(cur or 1)*1000;cur=0
        elif n==100: cur=(cur or 1)*100
        else: cur+=n
    return total+cur

def donustur_ws(ws): return donustur(ws)
