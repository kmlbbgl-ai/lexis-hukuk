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
4. Namaz takibi eklendi. Sıradaki: kaza takibi, sonra Esmâü'l-Hüsnâ. Menüde "Yakında": kaza takibi, ortak hatim, Esmâü'l-Hüsnâ, dualar.
5. Google Play: kullanıcı geliştirici hesabı açacak (25 $), imzalı sürüm, gizlilik politikası, AdMob.
