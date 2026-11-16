---
name: merakoloji-video
description: Merakoloji (YouTube + Instagram @merakolojistudyo) kanalı için uçtan uca video üretim hattı. Bir konu, gündem başlığı veya hazır senaryodan Türkçe senaryo, ElevenLabs seslendirme (Kenan sesi, kredi onayıyla), kodla çizilmiş SVG animasyon (Banknot Gravürü, Kara Tahta veya Gece Grafiği; çöp adam + dolu renkli eşyalar), kelime vurgulu altyazı, kodla üretilmiş müzik/efekt, 16:9 ana video, 9:16 YouTube Short ve Instagram Reels, 16:9 ve 9:16 kapak, SEO paketi ve teslim klasörleri üretir. Kullanıcı Merakoloji için yeni video, "Ekonomi Serisi" bölümü, "Banknot / Kara Tahta / Gece tarzı" video, Short/Reels, kapak ya da SEO paketi istediğinde, "bu konudan video yap", "4 videoyu hazırla", "senaryo yaz ve üret" dediğinde bu beceriyi kullan; kanal adı geçmese bile bu tarz Türkçe animasyon açıklayıcı video isteniyorsa kullan.
---

# Merakoloji video üretim hattı

Bu beceri, Kasım 2026'da 5 videoyu (Ekonomi Serisi Bölüm 1–2, Kasım indirimleri, Yapay zekâ ses taklidi, Öğretmenler Günü) üretmek için kurulan hattın kaydıdır. Kodlar `scripts/lib/`, çalışan örnek sahneler `assets/`, kanal kuralları `references/` içinde.

## 0. Kullanıcıyla çalışma kuralları (çok önemli)

Bu kurallar kullanıcının açık talimatlarıdır; güveni korumak için harfiyen uy:

- **ElevenLabs kredisi:** Kredi harcayan her işlemden önce tahmini krediyi (≈ 1 kredi/karakter, eleven_v4) söyle ve **onay bekle**. Kullanıcı "sormadan hazırla" diye toplu yetki verirse yalnızca o kapsam için geçerlidir. vidIQ kredisi için de aynı kural.
- **Senaryolar tek tek onaylanır:** Birden fazla konu varsa senaryoları sırayla sun; biri "tamam" almadan diğerine geçme.
- **Instagram sürümlerinde "YouTube" kelimesi/logosu yok.** YT: "kanalımızda", "Abone ol"; IG: "profildeki bağlantıda", "Takip et".
- **Hassas konular:** Atatürk yalnızca saygılı, hareketsiz kalpaklı silüet; espri yok. Davalarda sanık adı verilmez, "iddiaya göre" denir. Diziler/markalar yalnızca adıyla anılır; görsel/logo kullanılmaz.
- **Büyük dosyalar (mp4, wav, npy, zip) git'e girmez** (`.gitignore`). Kullanıcı açıkça isterse ayrı bir `merakoloji-teslim/` klasörüne konur. PR açma.
- Kullanıcı uyurken "sormadan devam et" demişse soru sorma; sabah için `SABAH-OZETI.md` yaz (teslim tablosu, kredi dökümü, yükleme notları).

## 1. Senaryo

Örnek: `references/senaryo-ornegi.md`. Yapı:
- Kanca (ilk 3–5 sn bir sahne/soru) → 3–5 bölüm → kapanış (yorum sorusu + esprili CTA).
- Köşeli parantez `[ ]` = ekranda görünen, seslendirilmez.
- Uzun video ~3:30–4:10 (≈ 600–650 kelime). Short/Reels uzun videodan kesilir; yalnızca **iki kapanış cümlesi** (YT ve IG) yeni seslendirilir.
- Kanalın sesi: samimi, "sen" diye hitap, her bölümde 1 hafif espri. Kapanış esprisi konuya bağlanır ("Üstelik kargo da bedava!", "Kimseyle organize olmana gerek yok, tek tık yeter!", "Bu ses de yapay zekâ… o da bedava!").
- Her senaryonun sonunda **Doğrulanan bilgiler** tablosu (bilgi | kaynak). Emin olunmayan bilgi "iddiaya göre / anlatıldığına göre / yaygın olarak atfedilen" diye verilir. Güncel bilgiler için web araması yap.

## 2. Seslendirme (ElevenLabs)

- Ses: **Kenan**, voice_id `dVd0jss7LBpnOXAK1eqo`, model `eleven_v4`, generations_count 1 (yalnızca bir varyasyon; kredi tasarrufu).
- Metin dosyası `seslendirme/NN-konu.txt`: her satır bir cümle/paragraf; **son iki satır** alternatif kapanışlar (önce YT, sonra IG). Tek seferde üretilir; Short/Reels kapanışları bu iki satırdan kesilir. Örnek: `references/seslendirme-ornegi.txt`.
- Sayıları yazıyla yaz ("bin dokuz yüz seksen yedide", "yüzde elli"); altyazıda `kurgu.py` rakama çevirir.
- Üretimden önce kredi tahminini söyle, onay al. Üretimi `creative_generate_speech` ile başlat, `creative_get_flow_run_status` ile bekle, sesi indirip `seslendirme/NN-konu.mp3` olarak kaydet.

## 3. Klasör düzeni

```
uretim/
├── lib/                 ← scripts/lib/ içeriğini buraya kopyala
├── NN-konu/             ← her video için
│   ├── zamanlama.json, kurgu_uzun.json, veri_uzun.js/json
│   ├── sahne.html (lib'i ../lib/ ile yükler), sahne.js
│   ├── ses_uzun.py, mix_uzun.wav, dikey_plan.json, mix_yt.wav, mix_ig.wav
├── kapak/  seo/  cikti/
```

## 4. Hat adımları (komutlar)

```bash
# 1) Kelime hizalama (ASR yok; sessizlik + dinamik programlama)
python3 lib/align.py ../seslendirme/NN.mp3 ../seslendirme/NN.txt NN-konu/zamanlama.json
# satır/kelime zamanlarını görmek için veri_uzun.json'daki LW'yi satır metinleriyle eşleştirip yazdır

# 2) Kurgu: kapanış satırlarını dışarıda bırak
echo '{"seg":[[0,<son_icerik_satiri_bitisi>,0]],"end":<+4.5 sn kapanış kartı>}' > NN-konu/kurgu_uzun.json
python3 lib/kurgu.py NN-konu uzun     # → veri_uzun.js (V, SUB, LW)

# 3) Sahneler: NN-konu/sahne.js  (T(satır,kelime) = o kelimenin zamanı)
node lib/kare.js NN-konu/sahne.html "" 1920 1080 <test_klasörü> 4 9 14 ...   # test kareleri
# test karelerini ffmpeg hstack/vstack ile tek görselde birleştirip Read ile KONTROL ET

# 4) Ses: müzik + efekt + ses (stems Short'lar için kaydedilir)
cd NN-konu && python3 ses_uzun.py      # m.save('mix_uzun.wav', stems='<scratch>/konu')

# 5) Ana video render (arka planda; run_in_background kullan, & değil)
bash lib/paralel.sh NN-konu/sahne.html "" 1920 1080 <END*30> <kare_klasörü> 4 0 \
 && bash lib/encode.sh <kare_klasörü> NN-konu/mix_uzun.wav cikti/NN-konu-YOUTUBE-ANA-VIDEO.mp4

# 6) Dikey Short/Reels
python3 lib/dikey_ses.py NN-konu ../seslendirme/NN.mp3 <scratch>/konu   # → mix_yt/ig.wav, dikey_plan.js
node lib/dikey_render.js NN-konu yt test <klasör> 2 10 30 ...          # test
node lib/dikey_render.js NN-konu yt 0 <süre*30> <kare_klasörü>          # render (ig için aynı)
bash lib/encode.sh <kare_klasörü> NN-konu/mix_yt.wav cikti/NN-konu-YOUTUBE-SHORT.mp4
```

`dikey_plan.json` (örnek: `assets/ornek-banknot/dikey_plan.json`):
```json
{"ust":["Üst başlık satır 1","satır 2"],
 "kapanis":{"satir":["KALAN","3 TAKTİK"],"yt":"Tamamı kanalda ▶","ig":"Devamı profilde 👆","damga":"KARGO BEDAVA!","dz":2.1,"tema":"gece (isteğe bağlı)"},
 "yt":[[kaynak_bas,kaynak_son,"sahne"],...,[yt_kapanis_bas,son,"kapanis"]],
 "ig":[...aynı sahneler...,[ig_kapanis_bas,son,"kapanis"]]}
```
Kesimleri cümle aralarındaki sessizliklere koy; Short ~50–70 sn. `dz` = damganın kapanış segmentinde çıkacağı saniye (espri kelimesine denk getir).

## 5. Görsel dil

`references/karakter-kurallari.md`'yi oku. Özet:
- **Çöp adam** (`cop(x,y,s,{poz,head,front,back,tema})`), yüz yok, maskot yok. Kimlik **eşyadan** anlaşılır; eşyalar dolu ve renkli (`ES.tac()`, `ES.pelerin()`, `ES.topuz()`, `ES.kapuson()`, `ES.fener()`…). Pozlar: `POZ.dur/elsalla/parmak/goster/zipla/basielinde/telefon/uzgun/yuru1-2/kos1-2/kucakla/omuzsilk/kalkan`.
- Renk hikâye anlatır: kazanan altın baş, kaybeden griye döner.
- Tarzlar:
  - **Banknot Gravürü** (ekonomi/para): krem kâğıt, rozet desenleri, çam yeşili/bordo/altın. Örnek: `assets/ornek-banknot/sahne.js`.
  - **Kara Tahta** (eğitim/tarih Short): yeşil tahta, tebeşir filtresi `#chalk`, `tema:'tahta'`. Örnek: `assets/ornek-karatahta/sahne.html`.
  - **Gece Grafiği** (teknoloji/güvenlik): `GECE_BG`, parlayan ses dalgaları, `tema:'gece'`, dikey planda `"tema":"gece"`. Örnek: `assets/ornek-gece/sahne.js`.
- Sahne iskeleti: `if(S(t,a,b)){o+=\`<g opacity="${F(t,a,b)}">\`; ...}`; anahtar kelimede `damga()`, `etiket()`, `balon()`, `banner()`; animasyonlar `pop/back/cl/out3`.
- Her ~3–6 sn'de görsel değişim; her seslendirilen anahtar bilgi ekranda yazıyla da görünsün.

## 6. Kapaklar ve SEO

- Kapak: `assets/kapak/cek.js` ile videonun kendi `sahne.html`'ini açıp `kapak.js` enjekte et (`node cek.js NN/sahne.html kNN.js <önek> y d`). 16:9 → 1280×720 jpg, 9:16 → 1080×1920 jpg. Kalın, 2 satırlık başlık + büyük karakter + bir damga; 9:16'da ana metin ortadaki 4:5 alanda kalsın (IG ızgarası kırpar).
- SEO paketi (`references/seo-ornegi.md` şablonu): YT ana video (3 başlık, açıklama + bölümler/zaman damgaları + kaynaklar, 15 etiket, sabit yorum, son ekran, oynatma listesi), Shorts (başlık, açıklama, ilgili video), Instagram Reels (anahtar kelimeli ilk cümle, 3–5 hashtag, alternatif metin). Bölüm zamanlarını gerçek satır başlangıçlarından al. Yapay zekâ sesi ve sentetik içerik için "Değiştirilmiş veya sentetik içerik → Evet" notu.

## 7. Kontrol listesi (teslimden önce)

1. Her mp4'ü uçtan uca çöz: `ffmpeg -v error -i X.mp4 -f null -` çıktısı **boş** olmalı (bir kez bozuk dosya çıktı; yeniden encode gerekti).
2. Süre ve ses: `ffprobe` süresi, `ebur128` ≈ -15…-16 LUFS.
3. Test karelerine bak: yazılar kutudan taşıyor mu (`etiket` genişliği ≈ uzunluk × fs × 0.66), altyazıyla üst üste binen var mı, sahne geçişleri doğru mu.
4. Teslim: `cikti/` dosya adları `NN-konu-YOUTUBE-ANA-VIDEO.mp4`, `-YOUTUBE-SHORT.mp4`, `-INSTAGRAM-REELS.mp4`, `-KAPAK-16x9.jpg`, `-KAPAK-9x16.jpg` + `seo/NN-konu-SEO.md`. Dosyaları kullanıcıya gönder; istenirse her senaryo için ayrı klasör (ZIP, Drive klasörleri veya GitHub'da `merakoloji-teslim/NN-konu/`).

## 8. Bilinen tuzaklar

- Bash'te `&` ile başlatılan arka plan işleri ölür → `run_in_background` kullan.
- `rm -f $DEĞİŞKEN/*` güvenlik kontrolüne takılır → literal yol veya `"${VAR:?}"`.
- Tebeşir filtresi tam yatay çizgide görünmez → y2'ye +3 ekle.
- Altyazı sayı çevirisi: yıl/fiyat ayrımı ek (`'de/'te/'larda`) ile yapılır; sayı iki altyazı parçasına bölünmemeli (kurgu.py halleder; yine de çıktıyı oku).
- Kare klasörleri GB'larca yer tutar; bittikten sonra eski kare klasörlerini sil.
- Drive bağlantısı ile büyük video yüklenirken dosyayı base64 yazma; bağlantı dosya referansını (`sha256:<hash>:<yol>`) destekliyorsa onu kullan.
