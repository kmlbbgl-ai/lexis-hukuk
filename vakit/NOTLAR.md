# Vakit — proje notları (yeni sohbette buradan devam edin)

Kod: `vakit/www` (index.html, style.css, app.js) · Android: `vakit/android` (Capacitor 8)
Geliştirme dalı: `ccr-a4378f93-x1qu3v` · APK linki (her push'ta otomatik):
https://github.com/kmlbbgl-ai/lexis-hukuk/releases/download/vakit-latest/vakit.apk

## Alınan kararlar
- Hedef: milyonlara hitap eden, çok dilli (önce TR/EN) dini uygulama. Reklam + ileride Pro abonelik.
- Rakip uygulama birebir kopyalanmaz; genel düzen alınır, renk/ikon/isimler bize ait (zümrüt yeşili + altın, mihrap logosu).
- Konumlanma: hesapsız, verisi telefonda kalan, yapay zekâya veri göndermeyen uygulama.
- Dini hüküm/fetva veren yapay zekâ özelliği YOK. Kur'an tilaveti/ezan için yapay zekâ sesi YOK (yalnızca gerçek, izinli kayıtlar).
- Reklamda alkol, kumar, flört vb. kategoriler engellenecek.

## Teknik notlar
- Vakit hesabı: adhan kütüphanesi, Diyanet yöntemi; ikindiye +1 dk düzeltme (Diyanet ile İstanbul/Ankara karşılaştırması, 17.11.2026).
  Yatsı İstanbul'da 1 dk erken kalıyor, Ankara'da akşam 2 dk fark var (Diyanet'in şehir referans noktaları farklı olabilir) — daha fazla şehir/tarih ile doğrulanmalı. Kullanıcı için "İnce ayar" var.
- Hicri tarih: Türkiye'de Intl `islamic` takvimi (bugün Diyanet ile aynı). Mübarek günler: 2027-08'e kadar Diyanet'in ilan ettiği tarihler (`DIYANET_DAYS`), sonrası hesap.
- Kur'an: Arapça metin QuranEnc (quran-json paketi, değiştirilmeden, kaynak gösterilerek), 6236 ayet (Kûfe sayımı). Yazı tipi Amiri Quran (OFL).
- Ezan bildirimi: @capacitor/local-notifications, 10 gün ileriye kurulur, açılışta/devam edişte yeniden kurulur.
- Yerel derleme: Android SDK `/root/android-sdk` (kullanıcı lisansı onayladı), `gradle assembleDebug` (`/opt/gradle-8.14.3`). Ortam geçici; yeni oturumda yeniden kurulması gerekebilir. GitHub Actions da derliyor.

## Bekleyenler
1. Telefonda test: deneme bildirimi, kıble pusulası (son düzeltmeden sonra), geri tuşu.
2. Ezan sesi: telifsiz/izinli gerçek ezan kaydı bulunacak (kullanıcı müezzin kaydı getirebilir). Tam ezan için arka plan servisi.
3. Meal: beklemede. Seçenekler: QuranEnc Türkçe meali (şartlı ücretsiz, teyit e-postası) veya yayınevinden ücretli lisans. Diyanet meali izinsiz kullanılmayacak.
4. Eklendi: namaz takibi, kaza takibi (namaz takibinden kazaya aktarma), Esmâü'l-Hüsnâ (99 isim, kendi anlamlarımız), 30 hadis (kendi sadeleştirilmiş çevirimiz + temel kaynak adı), Kur'an'dan 12 dua; ana sayfada günün hadisi/duası/esması. Ayrıca: günlük iyilikler (21.00 hatırlatma), bebek isimleri (54), bilgi yarışması (36 soru). Ramazan ekranı (geri sayım, iftar/sahur sayacı, imsakiye, oruç takibi, bitince kazaya aktarma, bildirimde İftar vakti) ve nafile oruç eklendi. İlmihal (10 konu, Hanefi özet, kendi metnimiz) eklendi. Sonra: ortak hatim (sunucu gerekiyor: kullanıcının hesabıyla Firebase vb.). Kâbe canlı / Kur'an radyo yayın hakkı gerektirir.
5. Google Play: kullanıcı geliştirici hesabı açacak (25 $), imzalı sürüm, gizlilik politikası, AdMob.

## Kullanıcı geri bildirimi (telefon testi)
YAPILDI: 1 (kaydırma), 4 (açıklama), 5 (212 isim), 6 (alt menü: sabit iskelet + Capacitor --safe-area-inset-*), 10 (il+ilçe: data/ilce.json, kaynak data/ILCE-KAYNAK.txt), 12 (7 tema).
SIRADA: 11 kart paylaşımı → 9 Kur'an okuyucu (Elmalılı meali lisans kontrolü) → 3/7 sesler → 8 dua kardeşliği + hatim (Firebase) → 13 asistan (sonra, kullanıcı kararı).
1. Ana sekmeler arasında sağa-sola kaydırarak geçiş (kurulum ekranında da).
2. Günün ayetine Türkçe meal (meal lisansına bağlı).
3. Bildirim sesi seçimi; ezan vaktinde ezan okunması (izinli kayıt gerekli).
4. "Akşam hatırlatması" = Günlük iyilikler 21.00 hatırlatması (açıklama netleştirilecek).
5. İsim listesini çok genişlet.
6. Alt menü: kıble sayfasında kaydırınca kayboluyor; telefonun alt tuşlarının arkasında kalıyor (edge-to-edge/safe-area düzeltmesi).
7. Ayetlerin sesli okunması (kıraat kaydı lisansı).
8. "Dua kardeşliği" benzeri bölüm (sunucu + moderasyon; kullanıcı fotoğraf gönderecek).
9. Kur'an okuyucuda ayet ayet kutucuk, meal ve ayet numarası (kullanıcı fotoğraf gönderecek).
10. Namaz vakitlerinde il + ilçe seçimi.
11. Günün ayeti/hadisi/duası paylaşılabilir kart: 9:16, 16:9, 1:1; tek renk ve hazır temalar; WhatsApp ile yayılma (kullanıcı fotoğraf gönderecek).
12. Uygulama tema seçimi (açık, koyu, yeşil, pembe vb.).
13. "Soru sor" yapay zekâ bölümü — maliyet ve dini risk değerlendirilecek.
Kural: kullanıcıya sormadan ücretli bir şey (API, görsel üretimi vb.) kullanılmayacak.
