# Vakit — İlk sürüm (prototip)

Namaz vakitleri, kıble pusulası ve zikirmatik. Türkçe / İngilizce.

- Tüm hesaplamalar telefonda yapılır; sunucu, yapay zekâ ve konum paylaşımı yoktur.
- Vakit hesaplama: açık kaynak `adhan` kütüphanesi (MIT lisansı, `lib/ADHAN-LICENSE`).
- Varsayılan yöntem Diyanet (Türkiye). Yayından önce vakitler birkaç şehirde Diyanet takvimiyle karşılaştırılmalıdır.

Tarayıcıda denemek için `www/index.html` dosyasını açmanız yeterli.

## Telefonda denemek (Android)
Her değişiklikte GitHub Actions uygulamayı otomatik derler:
1. GitHub'da depoya girin → **Actions** → **Vakit Android APK** → en üstteki çalıştırma.
2. Sayfanın altındaki **vakit-debug-apk** dosyasını indirin, zip'i açın.
3. `app-debug.apk` dosyasını telefona atıp açın ("bilinmeyen kaynaklara izin ver" demeniz gerekir).

Bu deneme (debug) sürümüdür; Google Play için imzalı sürüm ayrıca hazırlanacak.

Sıradaki adımlar: ezan bildirimi, Kur'an (metin + meal + ses), imsakiye ve dini günler, ortak hatim, kaza takibi, Android paketi (Capacitor) ve Google Play.
