import json,re,subprocess,time,html,os
D=json.load(open('diyanet-today.json'))
M={'Ocak':1,'Şubat':2,'Mart':3,'Nisan':4,'Mayıs':5,'Haziran':6,'Temmuz':7,'Ağustos':8,'Eylül':9,'Ekim':10,'Kasım':11,'Aralık':12}
out=json.load(open('allyear.json')) if os.path.exists('allyear.json') else {}
n=0
for il,v in D.items():
    for iid,ad in v['all']:
        key=f"{html.unescape(il)}|{html.unescape(ad)}"
        if key in out: continue
        for k in range(3):
            h=subprocess.run(['curl','-s','-m','30','-A','Mozilla/5.0',f"https://namazvakitleri.diyanet.gov.tr/tr-TR/{iid}/x-icin-namaz-vakti"],capture_output=True,text=True).stdout
            t=re.search(r'id="yourTable".*?</table>',h,re.S)
            if t: break
            time.sleep(5)
        if not t: print('ERR',key,flush=True); continue
        rows=[]
        for r in re.findall(r'<tr>(.*?)</tr>',t.group(0),re.S):
            c=[html.unescape(x).strip() for x in re.findall(r'<td>(.*?)</td>',r,re.S)]
            if len(c)<8: continue
            d,mo,y=c[0].split()[:3]; rows.append([int(y),M[mo],int(d)]+c[2:8])
        out[key]={'id':iid,'rows':rows}; n+=1
        if n%25==0: json.dump(out,open('allyear.json','w'),ensure_ascii=False); print(n,key,flush=True)
        time.sleep(0.6)
json.dump(out,open('allyear.json','w'),ensure_ascii=False); print('BITTI',len(out),flush=True)
