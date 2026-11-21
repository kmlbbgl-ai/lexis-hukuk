# Diyanet uyumu (vakit hesabı ve ilçe koordinatları)

Uygulama vakitleri adhan kütüphanesiyle (Diyanet yöntemi) hesaplar; `www/app.js` içindeki `DIY_FIX` mevsimsel düzeltmesi
ve `www/data/ilce.json` koordinatları, Diyanet'in yayımladığı yıllık takvime göre ayarlanmıştır (22.11.2026, 2026 takvimi,
869 Diyanet ilçesi × 365 gün): tam eşleşme %94-98, ±1 dk %99,8+.

Yeni yıl takvimi yayımlanınca (ağda namazvakitleri.diyanet.gov.tr izni gerekir):
1. `python3 fetch.py` → diyanet-today.json (il listesi ve ilçe kimlikleri)
2. `python3 allyear.py` → allyear.json (her ilçenin yıllık takvimi; ~15 dk, siteyi yormadan)
3. 12 şehirle başlangıç düzeltmesi: fit12.json gerekir (yoksa DIY_FIX'i {"fajr":[...]} biçiminde fit12.json'a yazın)
4. `for i in 0 1 2 3; do node geofit2.js allyear.json shard$i.json $i 4 fit & done; wait`
5. `node geofit2.js allyear.json fitall.json 0 1 combine shard*.json` → yeni FIX ve koordinatlar
6. FIX'i app.js'deki DIY_FIX'e, koordinatları data/ilce.json'a aktarın.
