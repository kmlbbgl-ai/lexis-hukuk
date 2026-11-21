import json,subprocess,re,time,unicodedata
st=json.load(open('states.json')); out={}
def get(u):
    return subprocess.run(['curl','-s','-m','25','-A','Mozilla/5.0',u],capture_output=True,text=True).stdout
def norm(s): return s.replace('İ','I').replace('Ş','S').replace('Ğ','G').replace('Ü','U').replace('Ö','O').replace('Ç','C').upper()
for sid,name in st:
    try:
        L=json.loads(get(f'https://namazvakitleri.diyanet.gov.tr/tr-TR/home/GetRegList?ChangeType=state&CountryId=2&Culture=tr-TR&StateId={sid}'))['StateRegionList']
        c=[x for x in L if norm(x['IlceAdi'])==norm(name)] or [x for x in L if 'MERKEZ' in x['IlceAdi']] or L[:1]
        x=c[0]; h=get('https://namazvakitleri.diyanet.gov.tr'+x['IlceUrl'])
        t=re.findall(r'tpt-time"[^>]*>\s*(\d\d:\d\d)',h)[:6]
        out[name]={'id':x['IlceID'],'t':t,'all':[(y['IlceID'],y['IlceAdi']) for y in L]}
        print(name,x['IlceAdi'],t,flush=True)
    except Exception as e: print('ERR',name,e,flush=True)
    time.sleep(0.5)
json.dump(out,open('diyanet-today.json','w'),ensure_ascii=False)
