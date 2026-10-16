# Lexİş v0.3 — Çalıştırma

Gereksinim: Node.js 20 veya üzeri, OpenAI API anahtarı.

1. ZIP'i açın ve terminalde `LexIs_v03` klasörüne girin.
2. macOS/Linux: `export OPENAI_API_KEY="..."`; Windows PowerShell: `$env:OPENAI_API_KEY="..."`.
3. `node server.mjs` komutunu çalıştırın.
4. Aynı bilgisayarda `http://127.0.0.1:3000` adresini açın.

API anahtarını HTML içine veya kaynak koduna yazmayın. Anahtarı kimseyle paylaşmayın.

Telefon üzerinden kullanmak için HTTPS'li, erişim kontrollü bir sunucu dağıtımı gereklidir. Bu örnek varsayılan olarak yalnızca bilgisayarınızdan erişilebilir. Kimlik doğrulaması, dosya erişim denetimi, şifreli veritabanı ve KVKK süreçleri henüz yoktur. Gerçek müvekkil verilerini kullanmayın.

API erişimi ücretli olabilir. Yargıtay karar araması ve UDF henüz eklenmemiştir. Var olan Word indirme yöntemi HTML tabanlı `.doc` üretir, gerçek `.docx` değildir.
