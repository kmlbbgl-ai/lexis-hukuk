import json,subprocess,urllib.parse,re,sys,time
out=[];seen=set()
for q in sys.argv[1:]:
    u='https://commons.wikimedia.org/w/api.php?'+urllib.parse.urlencode({'action':'query','format':'json','generator':'search','gsrsearch':q+' filetype:bitmap','gsrnamespace':6,'gsrlimit':40,'prop':'imageinfo','iiprop':'url|extmetadata|size','iiurlwidth':1080,'iiextmetadatafilter':'LicenseShortName|Artist'})
    for k in range(8):
        o=subprocess.run(['curl','-s','-A','VakitApp/0.1 (https://github.com/kmlbbgl-ai)',u],capture_output=True,text=True).stdout
        try: r=json.loads(o); break
        except Exception: time.sleep(35)
    else: r={}
    n=0
    for p in (r.get('query',{}).get('pages',{}) or {}).values():
        ii=p['imageinfo'][0];m=ii.get('extmetadata',{})
        lic=m.get('LicenseShortName',{}).get('value','')
        if not re.match(r'(CC0|Public domain|PD|CC BY \d)',lic) or 'SA' in lic: continue
        if ii['width']<1200 or p['title'] in seen: continue
        seen.add(p['title']);n+=1
        art=re.sub('<[^>]+>','',m.get('Artist',{}).get('value',''))[:80].strip()
        out.append({'q':q,'title':p['title'],'thumb':ii['thumburl'],'page':ii['descriptionurl'],'license':lic,'artist':art})
    print(q,n,flush=True); json.dump(out,open("cands.json","w"),ensure_ascii=False); time.sleep(8)
json.dump(out,open('cands.json','w'),ensure_ascii=False,indent=0)
