/* Vakit — namaz vakitleri, kıble, Kur'an, zikirmatik. Tüm hesaplamalar cihazda yapılır. */
(() => {
  'use strict';
  const A = window.adhan;
  const $ = id => document.getElementById(id);
  const store = {
    get(k, d) { try { const v = localStorage.getItem('vakit.' + k); return v === null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem('vakit.' + k, JSON.stringify(v)); } catch { /* yoksay */ } }
  };

  // ---------------- Diller ----------------
  const T = {
    tr: {
      appName: 'Vakit', cN: 'K', cE: 'D', cS: 'G', cW: 'B', back: 'Geri', skip: 'Atla', continue: 'Devam et', finish: 'Başla', or: 'veya',
      obWelcome: 'Hoş geldiniz', obWelcomeText: "Namaz vakitleri, kıble, Kur'an-ı Kerim ve zikirmatik tek yerde. Reklamlar sade, verileriniz telefonunuzda kalır.",
      obP1: 'Konumunuz hiçbir sunucuya gönderilmez', obP2: 'Hesap açmanız gerekmez', obP3: 'İnternetsiz de çalışır',
      obLocTitle: 'Konumunuz', obLocText: 'Vakitler bulunduğunuz yere göre hesaplanır.', obCalcTitle: 'Hesaplama',
      obCalcText: "Türkiye'de Diyanet yöntemi kullanılır. Dilerseniz sonra Ayarlar'dan değiştirebilirsiniz.",
      locOk: n => `Seçildi: ${n}`, locWait: 'Konum alınıyor…',
      tabHome: 'Ana sayfa', tabQibla: 'Kıble', tabQuran: "Kur'an", tabDhikr: 'Zikirmatik', tabMenu: 'Menü',
      tSettings: 'Ayarlar', tMonthly: 'Aylık namaz vakitleri', tDays: 'Mübarek günler', monthlyShort: 'Aylık',
      fajr: 'İmsak', sunrise: 'Güneş', dhuhr: 'Öğle', asr: 'İkindi', maghrib: 'Akşam', isha: 'Yatsı',
      nextPrayer: 'Sonraki vakit', tomorrow: 'yarın', upcoming: 'Yaklaşan mübarek gün', dailyVerse: 'Günün ayeti', readSurah: 'Sureyi oku',
      continueReading: 'Okumaya devam et', searchSurah: 'Sure ara (ör. Yâsîn, 36)', verses: 'ayet', meccan: 'Mekkî', medinan: 'Medenî',
      quranSource: "Arapça metin: Kur'an Meâlleri Ansiklopedisi (QuranEnc.com). Meal yakında eklenecek.",
      prevSurah: 'Önceki sure', nextSurah: 'Sonraki sure', surah: 'Suresi', ayah: 'âyet',
      qiblaHint: 'Telefonu yere paralel tutun ve yavaşça dönün. Üstteki ok Kâbe simgesinin üzerine gelince kıbleye dönmüşsünüz demektir. Yön şaşıyorsa telefonu havada birkaç kez 8 çizerek pusulayı ayarlayın; mıknatıslı kılıf ve metal eşyalardan uzak durun.',
      enableCompass: 'Pusulayı başlat', compassNA: 'Bu cihazda pusula yok. Kıble, kuzeyden saat yönünde gösterilen açıdadır.',
      qiblaFromNorth: 'Kuzeyden', turnRight: d => `${d}° sağa dönün`, turnLeft: d => `${d}° sola dönün`, aligned: 'Kıbleye döndünüz ✓',
      reset: 'Sıfırla', total: 'Toplam', method: 'Hesaplama yöntemi', madhab: 'İkindi (Asr) hesabı', city: 'Şehir', useGps: 'Konumumu kullan',
      asrStd: 'Standart', asrStdSub: 'Diyanet, Şafii, Maliki, Hanbeli', asrHan: 'Hanefi', asrHanSub: 'Asr-ı sani (daha geç)',
      fineTune: 'İnce ayar (dakika)', fineNote: 'Vakitleri camiinizin takvimine birebir eşitlemek için kullanın.',
      privacy: 'Konumunuz yalnızca bu telefonda kullanılır; hiçbir sunucuya gönderilmez.',
      myLocation: 'Konumum', gpsFail: 'Konum alınamadı. Listeden şehir seçebilirsiniz.', replayOb: 'Kurulumu yeniden başlat',
      credits: 'Vakit hesabı: adhan (MIT). Arapça metin: QuranEnc.com. Yazı tipi: Amiri Quran (OFL).',
      daysNote: "Tarihler astronomik hesapla bulunur; Diyanet'in ilan ettiği tarihle 1 gün farklı olabilir.",
      day: 'Gün', soon: 'YAKINDA', inDays: n => n === 0 ? 'Bugün' : n === 1 ? 'Yarın' : `${n} gün`, evening: 'akşamı',
      mMonthly: 'Aylık vakitler', mDays: 'Mübarek günler', mSettings: 'Ayarlar', mNotif: 'Ezan bildirimi', mKaza: 'Kaza takibi',
      mHatim: 'Ortak hatim', mEsma: "Esmâü'l-Hüsnâ", mPrayerLog: 'Namaz takibi', mDua: 'Dualar',
      logToday: 'Bugünkü namazlarım', streak: n => `🔥 ${n} gün seri`, prayed: 'Kıldım', notYet: 'Vakti girmedi', mark: 'İşaretle',
      stStreak: 'günlük seri', stBest: 'en uzun seri', stMonth: 'bu ay', last7: 'Son 7 gün', logNote: 'Kayıtlarınız yalnızca bu telefonda tutulur.', today: 'Bugün', tLog: 'Namaz takibi', mPrayerLogSub: 'Kıldığınız vakitler',
      tIlmihal: 'İlmihal', mIlmihal: 'İlmihal', mIlmihalSub: 'Temel dini bilgiler', ilmihalNote: "Hanefi mezhebine göre temel bilgilerin özetidir. Ayrıntı ve özel durumlar için Diyanet İlmihali'ne veya bir din görevlisine başvurun.",
      ramLeft: "Ramazan'a kalan", dayShort: 'gün', sahur: 'Sahur (imsak)', iftar: 'İftar', iftarDua: 'İftar duası', iftarDuaTr: "Allah'ım! Senin rızan için oruç tuttum ve senin rızkınla orucumu açtım.",
      ramNote: "Tarihler Diyanet'in ilan ettiği takvime göredir. Tuttuğunuz günleri tablodan işaretleyebilirsiniz.", tRamazan: 'Ramazan', mRamazan: 'Ramazan', mRamazanSub: 'İmsakiye ve oruç takibi',
      ramTo: n => `Ramazan'a ${n} gün`, ramStarts: d => `1 Ramazan: ${d}`, ramDay: n => `Ramazan'ın ${n}. günü`, toIftar: 'İftara kalan', toSahur: 'Sahura kalan', ramEnded: 'Ramazan sona erdi. Bayramınız mübarek olsun!',
      ramUpcoming: 'Ramazan yaklaşıyor', ramNow: 'Hayırlı Ramazanlar', fastCol: 'Oruç', ramToKaza: n => `Tutulamayan ${n} günü kaza borcuna ekle`, ramToKazaDone: 'Tutulamayan günler kaza borcuna eklendi ✓',
      tNafile: 'Nafile oruç', mNafile: 'Nafile oruç', mNafileSub: 'Sünnet oruç günleri', nafileYear: 'bu yıl tutulan nafile oruç', fasted: 'Tuttum', fastMark: 'İşaretle',
      forbiddenTitle: 'Oruç tutulmayan günler', forbiddenText: "Ramazan Bayramı'nın 1. günü ile Kurban Bayramı'nın 4 gününde oruç tutulmaz.", nafileNote: 'Hicrî ay başları astronomik hesapla bulunur; 1 gün farklı olabilir.',
      nfIftar: 'İftar vakti', nfSahurEnd: 'İmsak vakti · sahur sona erdi',
      fType: { mon: 'Pazartesi orucu', thu: 'Perşembe orucu', biyd: 'Eyyâm-ı bîd orucu', ashura: 'Aşure orucu', arafa: 'Arefe orucu', shawwal: 'Şevval orucu' },
      deedsQ: 'Bugün Allah için ne yaptınız?', deedsSub: (n, s) => `Bugün ${n} iyilik${s ? ` · 🔥 ${s} gün` : ''}`, deedsToday: 'bugünkü iyilik', deedAddPh: 'Kendi iyiliğinizi ekleyin', add: 'Ekle',
      deedRemind: 'Akşam hatırlatması', deedRemindSub: "Her akşam 21.00'de", deedStreak: n => `🔥 ${n} gündür iyilik yapıyorsunuz`, tDeeds: 'Günlük iyilikler', mDeeds: 'Günlük iyilikler', mDeedsSub: 'Bugün Allah için',
      deedNotifTitle: 'Bugün Allah için ne yaptınız?', deedNotifBody: 'Günün iyiliklerini işaretlemeyi unutmayın.',
      deedList: ["Kur'an okudum", 'Zikir çektim', 'Sadaka verdim', 'Anne babamı aradım veya ziyaret ettim', 'Bir akrabamı aradım', 'Birine yardım ettim', 'Başkası için dua ettim', 'Güzel söz söyledim, gülümsedim', 'Nafile namaz kıldım', 'Faydalı bir şey öğrendim', 'Bir hayvanı veya doğayı gözettim', 'Kimsenin gıybetini yapmadım'],
      dailyNames: 'Günün isimleri', allNames: 'Tümü', searchName: 'İsim veya anlam ara', all: 'Tümü', boy: 'Erkek', girl: 'Kız', unisex: 'Her ikisi', tNames: 'İsimler', mNames: 'İsimler', mNamesSub: 'Anlamlarıyla isimler',
      tQuiz: 'Bilgi yarışması', mQuiz: 'Bilgi yarışması', mQuizSub: '5 soruluk turlar', qOf: (i, n) => `Soru ${i} / ${n}`, qNext: 'Sonraki soru', qFinish: 'Sonucu gör', qScore: 'Doğru cevap', qAgain: 'Yeni tur', qBest: n => `En iyi skorunuz: ${n} / 5`,
      fajrPrayer: 'Sabah', dailyHadis: 'Günün hadisi', dailyDua: 'Günün duası', allDuas: 'Tüm dualar', esma: "Esmâü'l-Hüsnâ", searchEsma: 'İsim veya anlam ara',
      hadisNote: 'Türkçe ifadeler uygulamaya özel sadeleştirilmiş anlamdır; kaynak olarak hadisin geçtiği temel eserler belirtilmiştir.',
      duaNote: "Dualar Kur'an-ı Kerim'den alınmıştır; Türkçe ifadeler anlamdır.", tHadis: 'Hadisler', tDua: 'Dualar', mHadis: 'Hadisler', mHadisSub: '30 seçme hadis', mEsmaSub: '99 güzel isim', mDuaSub: "Kur'an'dan dualar",
      kzLeft: 'kalan kaza namazı', kzDone: 'kılınan kaza', kzCalc: 'Borç hesapla', kzCalcText: 'Kılınmayan süreyi girin; her vakit için o kadar gün eklenir.',
      years: 'Yıl', months: 'Ay', days: 'Gün', kzWitr: 'Vitir de eklensin (Hanefi)', kzAddBtn: 'Kaza borcuna ekle', kzAdded: n => `${n} vakit kaza borcuna eklendi.`,
      kzNote: 'Kaza borcunuzu bilmiyorsanız en iyi tahmininizi girin. Kesin hüküm için bir din görevlisine danışabilirsiniz.',
      witr: 'Vitir', fast: 'Oruç', kzPrayed: 'Kıldım', kzFasted: 'Tuttum', kzPrayedSub: n => `${n} kılındı`, kzFastedSub: n => `${n} tutuldu`,
      toKaza: n => `İşaretlenmemiş ${n} vakti kazaya ekle`, toKazaDone: 'Bu günün eksikleri kazaya eklendi ✓', tKaza: 'Kaza takibi', mKazaSub: 'Namaz ve oruç borcu',
      mMonthlySub: 'Ay ay tüm vakitler', mDaysSub: 'Kandiller ve bayramlar', mSettingsSub: 'Konum ve hesaplama', mNotifSub: 'Vakit hatırlatmaları',
      obNotifTitle: 'Ezan bildirimleri', obNotifText: 'Vakit girdiğinde haber verelim mi? Her vakit için ayrı ayrı açıp kapatabilirsiniz.', obNotifBtn: 'Bildirimleri aç',
      nfWebOnly: 'Bildirimler yalnızca telefondaki uygulamada çalışır.', nfPermTitle: 'Bildirim izni kapalı', nfPermText: 'Ezan vakitlerinde haber verebilmemiz için bildirim izni gerekiyor.',
      nfExactTitle: 'Tam zamanlı alarm izni', nfExactText: 'Bu izin olmadan telefon bildirimi birkaç dakika geciktirebilir.', allow: 'İzin ver',
      nfMaster: 'Ezan bildirimleri', nfMasterSub: 'Vakit girdiğinde bildirim gelir', nfBefore: 'Vakit öncesi hatırlatma süresi (dakika)',
      nfTest: 'Deneme bildirimi gönder', nfBattery: 'Bazı telefonlar pil tasarrufu için bildirimleri durdurabilir. Bildirim gelmezse telefon ayarlarından Vakit için pil kısıtlamasını kaldırın.',
      nfAt: 'Vaktinde', nfPre: m => `${m} dk önce`, nfOk: n => `${n} bildirim kuruldu (önümüzdeki 10 gün).`, nfOff: 'Bildirimler kapalı.', nfDenied: 'Bildirim izni verilmedi.',
      nfTestSent: '5 saniye içinde deneme bildirimi gelecek.', nfOnOk: 'Bildirimler açıldı ✓',
      nfTitle: p => `${p} vakti`, nfPreTitle: (p, m) => `${p} vaktine ${m} dakika`, nfSunTitle: 'Güneş doğdu', nfSunPre: m => `Güneşin doğmasına ${m} dakika`,
      nfKeepTitle: 'Bildirimleriniz devam etsin', nfKeepBody: 'Ezan bildirimlerinin sürmesi için Vakit uygulamasını açın.', nfTestTitle: 'Vakit · deneme', nfTestBody: 'Ezan bildirimleri çalışıyor.',
      hijriMonths: ['Muharrem', 'Safer', 'Rebîülevvel', 'Rebîülâhir', 'Cemâziyelevvel', 'Cemâziyelâhir', 'Receb', 'Şâban', 'Ramazan', 'Şevvâl', 'Zilkade', 'Zilhicce'],
      ev: { hijriNY: 'Hicrî yılbaşı', ashura: 'Aşure günü', mawlid: 'Mevlid Kandili', ragaib: 'Regaib Kandili', miraj: 'Mirac Kandili', barat: 'Berat Kandili', ramadan: 'Ramazan başlangıcı', qadr: 'Kadir Gecesi', arafaF: 'Ramazan Bayramı arifesi', eidF: 'Ramazan Bayramı', arafa: 'Kurban Bayramı arifesi', eidA: 'Kurban Bayramı' }
    },
    en: {
      appName: 'Vakit', cN: 'N', cE: 'E', cS: 'S', cW: 'W', back: 'Back', skip: 'Skip', continue: 'Continue', finish: 'Start', or: 'or',
      obWelcome: 'Welcome', obWelcomeText: 'Prayer times, qibla, the Holy Quran and a tasbih counter in one place. Simple ads, your data stays on your phone.',
      obP1: 'Your location is never sent to a server', obP2: 'No account needed', obP3: 'Works offline',
      obLocTitle: 'Your location', obLocText: 'Prayer times are calculated for where you are.', obCalcTitle: 'Calculation',
      obCalcText: 'Pick the method used in your country. You can change it later in Settings.',
      locOk: n => `Selected: ${n}`, locWait: 'Getting location…',
      tabHome: 'Home', tabQibla: 'Qibla', tabQuran: 'Quran', tabDhikr: 'Tasbih', tabMenu: 'Menu',
      tSettings: 'Settings', tMonthly: 'Monthly prayer times', tDays: 'Islamic days', monthlyShort: 'Monthly',
      fajr: 'Fajr', sunrise: 'Sunrise', dhuhr: 'Dhuhr', asr: 'Asr', maghrib: 'Maghrib', isha: 'Isha',
      nextPrayer: 'Next prayer', tomorrow: 'tomorrow', upcoming: 'Upcoming Islamic day', dailyVerse: 'Verse of the day', readSurah: 'Read surah',
      continueReading: 'Continue reading', searchSurah: 'Search surah (e.g. Yasin, 36)', verses: 'verses', meccan: 'Meccan', medinan: 'Medinan',
      quranSource: 'Arabic text: The Noble Quran Encyclopedia (QuranEnc.com). Translation coming soon.',
      prevSurah: 'Previous surah', nextSurah: 'Next surah', surah: '', ayah: 'verse',
      qiblaHint: 'Hold the phone flat and turn slowly. When the top arrow is over the Kaaba icon, you are facing the qibla. If the direction drifts, move the phone in a figure 8 a few times to calibrate, and keep away from magnetic cases and metal.',
      enableCompass: 'Start compass', compassNA: 'No compass on this device. The qibla is at the angle shown, clockwise from north.',
      qiblaFromNorth: 'From north', turnRight: d => `Turn ${d}° right`, turnLeft: d => `Turn ${d}° left`, aligned: 'You are facing the qibla ✓',
      reset: 'Reset', total: 'Total', method: 'Calculation method', madhab: 'Asr calculation', city: 'City', useGps: 'Use my location',
      asrStd: 'Standard', asrStdSub: 'Shafi, Maliki, Hanbali', asrHan: 'Hanafi', asrHanSub: 'Later Asr',
      fineTune: 'Fine-tune (minutes)', fineNote: 'Use this to match your local mosque calendar exactly.',
      privacy: 'Your location is used only on this phone and is never sent to any server.',
      myLocation: 'My location', gpsFail: 'Could not get your location. Please pick a city from the list.', replayOb: 'Restart setup',
      credits: 'Prayer times: adhan (MIT). Arabic text: QuranEnc.com. Font: Amiri Quran (OFL).',
      daysNote: 'Dates are calculated astronomically and may differ by one day from local announcements.',
      day: 'Day', soon: 'SOON', inDays: n => n === 0 ? 'Today' : n === 1 ? 'Tomorrow' : `${n} days`, evening: 'evening',
      mMonthly: 'Monthly times', mDays: 'Islamic days', mSettings: 'Settings', mNotif: 'Adhan alerts', mKaza: 'Missed prayers',
      mHatim: 'Group khatm', mEsma: '99 Names', mPrayerLog: 'Prayer log', mDua: 'Duas',
      logToday: "Today's prayers", streak: n => `🔥 ${n}-day streak`, prayed: 'Prayed', notYet: 'Not yet', mark: 'Mark',
      stStreak: 'day streak', stBest: 'best streak', stMonth: 'this month', last7: 'Last 7 days', logNote: 'Your records stay on this phone only.', today: 'Today', tLog: 'Prayer log', mPrayerLogSub: 'Prayers you performed',
      tIlmihal: 'Basics of worship', mIlmihal: 'Basics', mIlmihalSub: 'Worship basics (Turkish)', ilmihalNote: 'A Hanafi summary of the basics (in Turkish). For details, consult a qualified scholar.',
      ramLeft: 'Time to Ramadan', dayShort: 'd', sahur: 'Suhoor (Fajr)', iftar: 'Iftar', iftarDua: 'Iftar dua', iftarDuaTr: 'O Allah, for You I have fasted and with Your provision I break my fast.',
      ramNote: 'Dates follow the announced calendar. Mark the days you fasted in the table.', tRamazan: 'Ramadan', mRamazan: 'Ramadan', mRamazanSub: 'Timetable and fasting log',
      ramTo: n => `${n} days to Ramadan`, ramStarts: d => `1 Ramadan: ${d}`, ramDay: n => `Day ${n} of Ramadan`, toIftar: 'Time to iftar', toSahur: 'Time to suhoor ends', ramEnded: 'Ramadan has ended. Eid Mubarak!',
      ramUpcoming: 'Ramadan is coming', ramNow: 'Ramadan Mubarak', fastCol: 'Fast', ramToKaza: n => `Add ${n} missed days to make-up fasts`, ramToKazaDone: 'Missed days were added to make-up fasts ✓',
      tNafile: 'Voluntary fasts', mNafile: 'Voluntary fasts', mNafileSub: 'Sunnah fasting days', nafileYear: 'voluntary fasts this year', fasted: 'Fasted', fastMark: 'Mark',
      forbiddenTitle: 'Days not to fast', forbiddenText: 'Do not fast on the first day of Eid al-Fitr or the four days of Eid al-Adha.', nafileNote: 'Hijri month starts are calculated and may differ by one day.',
      nfIftar: 'Iftar time', nfSahurEnd: 'Fajr · suhoor has ended',
      fType: { mon: 'Monday fast', thu: 'Thursday fast', biyd: 'White days fast', ashura: 'Ashura fast', arafa: 'Day of Arafah fast', shawwal: 'Shawwal fast' },
      deedsQ: 'What did you do for Allah today?', deedsSub: (n, s) => `${n} good deeds today${s ? ` · 🔥 ${s} days` : ''}`, deedsToday: 'good deeds today', deedAddPh: 'Add your own good deed', add: 'Add',
      deedRemind: 'Evening reminder', deedRemindSub: 'Every evening at 21:00', deedStreak: n => `🔥 ${n}-day good deed streak`, tDeeds: 'Daily good deeds', mDeeds: 'Good deeds', mDeedsSub: 'For Allah today',
      deedNotifTitle: 'What did you do for Allah today?', deedNotifBody: "Don't forget to mark today's good deeds.",
      deedList: ['I read the Quran', 'I did dhikr', 'I gave charity', 'I called or visited my parents', 'I called a relative', 'I helped someone', 'I prayed for someone else', 'I said a kind word, I smiled', 'I prayed a voluntary prayer', 'I learned something useful', 'I cared for an animal or nature', 'I avoided backbiting'],
      dailyNames: 'Names of the day', allNames: 'All', searchName: 'Search name or meaning', all: 'All', boy: 'Boy', girl: 'Girl', unisex: 'Unisex', tNames: 'Names', mNames: 'Baby names', mNamesSub: 'Names with meanings',
      tQuiz: 'Quiz', mQuiz: 'Quiz', mQuizSub: '5-question rounds', qOf: (i, n) => `Question ${i} of ${n}`, qNext: 'Next question', qFinish: 'See result', qScore: 'Correct answers', qAgain: 'New round', qBest: n => `Your best score: ${n} / 5`,
      fajrPrayer: 'Fajr', dailyHadis: 'Hadith of the day', dailyDua: 'Dua of the day', allDuas: 'All duas', esma: '99 Names', searchEsma: 'Search name or meaning',
      hadisNote: 'English wording is a simplified meaning; the main collections containing each hadith are cited.',
      duaNote: 'Duas are from the Holy Quran; English wording is the meaning.', tHadis: 'Hadiths', tDua: 'Duas', mHadis: 'Hadiths', mHadisSub: '30 selected hadiths', mEsmaSub: 'Names of Allah', mDuaSub: 'Duas from the Quran',
      kzLeft: 'missed prayers left', kzDone: 'made up', kzCalc: 'Estimate debt', kzCalcText: 'Enter the period you missed; that many days are added for each prayer.',
      years: 'Years', months: 'Months', days: 'Days', kzWitr: 'Include Witr (Hanafi)', kzAddBtn: 'Add to missed prayers', kzAdded: n => `${n} prayers added.`,
      kzNote: 'If you do not know your exact count, enter your best estimate. Ask a scholar for a definitive ruling.',
      witr: 'Witr', fast: 'Fasting', kzPrayed: 'Prayed', kzFasted: 'Fasted', kzPrayedSub: n => `${n} made up`, kzFastedSub: n => `${n} made up`,
      toKaza: n => `Add ${n} unmarked prayers to missed list`, toKazaDone: "This day's missed prayers were added ✓", tKaza: 'Missed prayers', mKazaSub: 'Prayers and fasts to make up',
      mMonthlySub: 'All times by month', mDaysSub: 'Holy nights and Eids', mSettingsSub: 'Location and method', mNotifSub: 'Prayer reminders',
      obNotifTitle: 'Adhan alerts', obNotifText: 'Shall we notify you at each prayer time? You can turn each prayer on or off.', obNotifBtn: 'Turn on alerts',
      nfWebOnly: 'Notifications work only in the phone app.', nfPermTitle: 'Notifications are off', nfPermText: 'Allow notifications so we can alert you at prayer times.',
      nfExactTitle: 'Exact alarm permission', nfExactText: 'Without it the phone may delay alerts by a few minutes.', allow: 'Allow',
      nfMaster: 'Adhan alerts', nfMasterSub: 'Get notified when a prayer time begins', nfBefore: 'Reminder before prayer (minutes)',
      nfTest: 'Send test notification', nfBattery: 'Some phones stop notifications to save battery. If alerts do not arrive, remove battery restrictions for Vakit in phone settings.',
      nfAt: 'At prayer time', nfPre: m => `${m} min before`, nfOk: n => `${n} alerts scheduled (next 10 days).`, nfOff: 'Alerts are off.', nfDenied: 'Notification permission was not granted.',
      nfTestSent: 'A test notification will arrive in 5 seconds.', nfOnOk: 'Alerts are on ✓',
      nfTitle: p => `${p} time`, nfPreTitle: (p, m) => `${m} minutes to ${p}`, nfSunTitle: 'Sunrise', nfSunPre: m => `${m} minutes to sunrise`,
      nfKeepTitle: 'Keep your alerts running', nfKeepBody: 'Open Vakit so your adhan alerts continue.', nfTestTitle: 'Vakit · test', nfTestBody: 'Adhan alerts are working.',
      hijriMonths: ['Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani', 'Jumada al-Ula', 'Jumada al-Akhirah', 'Rajab', 'Shaban', 'Ramadan', 'Shawwal', 'Dhu al-Qadah', 'Dhu al-Hijjah'],
      ev: { hijriNY: 'Islamic New Year', ashura: 'Day of Ashura', mawlid: 'Mawlid', ragaib: 'Laylat al-Raghaib', miraj: "Isra and Mi'raj", barat: 'Laylat al-Baraat', ramadan: 'Start of Ramadan', qadr: 'Laylat al-Qadr', arafaF: 'Eve of Eid al-Fitr', eidF: 'Eid al-Fitr', arafa: 'Day of Arafah', eidA: 'Eid al-Adha' }
    }
  };
  let lang = store.get('lang', (navigator.language || 'tr').toLowerCase().startsWith('tr') ? 'tr' : 'en');
  const t = k => T[lang][k];
  const loc = () => (lang === 'tr' ? 'tr-TR' : 'en-GB');

  // ---------------- Veriler ----------------
  const METHODS = {
    Turkey: 'Diyanet (Türkiye)', MuslimWorldLeague: 'Muslim World League', UmmAlQura: 'Umm al-Qura (Makkah)',
    Egyptian: 'Egyptian General Authority', Karachi: 'University of Karachi', NorthAmerica: 'ISNA (North America)',
    Dubai: 'Dubai', Qatar: 'Qatar', Kuwait: 'Kuwait', Singapore: 'Singapore', MoonsightingCommittee: 'Moonsighting Committee'
  };
  const CITIES = [
    ['İstanbul', 41.0082, 28.9784], ['Ankara', 39.9334, 32.8597], ['İzmir', 38.4237, 27.1428], ['Bursa', 40.1885, 29.0610],
    ['Antalya', 36.8969, 30.7133], ['Konya', 37.8746, 32.4932], ['Adana', 37.0000, 35.3213], ['Gaziantep', 37.0662, 37.3833],
    ['Şanlıurfa', 37.1591, 38.7969], ['Diyarbakır', 37.9144, 40.2306], ['Erzurum', 39.9043, 41.2679], ['Trabzon', 41.0027, 39.7168],
    ['Samsun', 41.2867, 36.33], ['Kayseri', 38.7312, 35.4787], ['Eskişehir', 39.7767, 30.5206], ['Malatya', 38.3552, 38.3095],
    ['Van', 38.4891, 43.4089], ['Kocaeli', 40.7654, 29.9408], ['Sakarya', 40.7569, 30.3783], ['Denizli', 37.7765, 29.0864],
    ['Mekke / Makkah', 21.4225, 39.8262], ['Medine / Madinah', 24.4672, 39.6111], ['London', 51.5074, -0.1278], ['Berlin', 52.52, 13.405],
    ['Paris', 48.8566, 2.3522], ['Amsterdam', 52.3676, 4.9041], ['Brussels', 50.8503, 4.3517], ['Vienna', 48.2082, 16.3738],
    ['New York', 40.7128, -74.006], ['Jakarta', -6.2088, 106.8456], ['Kuala Lumpur', 3.139, 101.6869], ['Cairo', 30.0444, 31.2357],
    ['Dubai', 25.2048, 55.2708], ['Karachi', 24.8607, 67.0011], ['Dhaka', 23.8103, 90.4125]
  ];
  const DHIKRS = [
    ['Sübhânallah', 'سُبْحَانَ اللّٰهِ'], ['Elhamdülillâh', 'اَلْحَمْدُ لِلّٰهِ'], ['Allâhu ekber', 'اَللّٰهُ أَكْبَرُ'],
    ['Lâ ilâhe illallâh', 'لَا إِلٰهَ إِلَّا اللّٰهُ'], ['Estağfirullâh', 'أَسْتَغْفِرُ اللّٰهَ'], ['Salavat', 'اَللّٰهُمَّ صَلِّ عَلٰى مُحَمَّدٍ']
  ];
  // Günün ayeti: [sure, ayet]
  const DAILY = [[94, 6], [2, 152], [2, 186], [13, 28], [65, 3], [3, 139], [39, 53], [2, 153], [40, 60], [20, 114],
    [33, 41], [9, 51], [12, 87], [93, 5], [2, 286], [3, 173], [29, 69], [14, 7], [57, 4], [50, 16], [8, 46], [17, 82], [21, 87], [3, 8]];
  const PRAYERS = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'];

  let settings = Object.assign({ method: 'Turkey', madhab: 'Shafi', place: { name: 'İstanbul', lat: 41.0082, lng: 28.9784 }, fine: {} }, store.get('settings', {}));
  settings.fine = settings.fine || {};
  const save = () => { store.set('settings', settings); refresh(); queueReschedule(); };

  // ---------------- Vakit hesabı ----------------
  function params() {
    const p = A.CalculationMethod[settings.method]();
    p.madhab = A.Madhab[settings.madhab];
    // Diyanet'in yayımladığı ikindi vakti, kütüphanenin Diyanet ayarından ~1 dk sonra (İstanbul ve Ankara, 17.11.2026).
    if (settings.method === 'Turkey') p.methodAdjustments = Object.assign({}, p.methodAdjustments, { asr: p.methodAdjustments.asr + 1 });
    for (const k of PRAYERS) p.adjustments[k] = +(settings.fine[k] || 0);
    return p;
  }
  const timesFor = date => new A.PrayerTimes(new A.Coordinates(settings.place.lat, settings.place.lng), date, params());
  const hm = d => d.toLocaleTimeString(loc(), { hour: '2-digit', minute: '2-digit' });

  function nextPrayer(now) {
    const today = timesFor(now);
    let prev = null;
    for (const p of PRAYERS) {
      if (p === 'sunrise') continue;
      if (today[p] > now) {
        if (!prev) { const y = new Date(now); y.setDate(y.getDate() - 1); prev = timesFor(y).isha; }
        return { key: p, time: today[p], prev };
      }
      prev = today[p];
    }
    const tm = new Date(now); tm.setDate(tm.getDate() + 1);
    return { key: 'fajr', time: timesFor(tm).fajr, tomorrow: true, prev: today.isha };
  }

  // ---------------- Hicri takvim ----------------
  // Türkiye için astronomik takvim (Diyanet ile uyumlu); diğer yöntemlerde Ümmü'l-Kurâ.
  const hijriFmt = {};
  function hijri(date) {
    const cal = settings.method === 'Turkey' ? 'islamic' : 'islamic-umalqura';
    try {
      const f = hijriFmt[cal] || (hijriFmt[cal] = new Intl.DateTimeFormat('en-u-ca-' + cal + '-nu-latn', { day: 'numeric', month: 'numeric', year: 'numeric' }));
      const parts = f.formatToParts(date);
      const get = type => parseInt((parts.find(p => p.type === type) || {}).value, 10);
      const h = { d: get('day'), m: get('month'), y: get('year') };
      return h.y > 1300 && h.y < 1700 && h.m >= 1 && h.m <= 12 ? h : null;
    } catch { return null; }
  }
  const hijriText = date => { const h = hijri(date); return h ? `${h.d} ${t('hijriMonths')[h.m - 1]} ${h.y}` : ''; };

  // Diyanet'in ilan ettiği tarihler (Türkiye). Astronomik hesap bazı aylarda 1 gün sapar.
  // [anahtar, miladi tarih (akşamı/günü), gece mi, hicri gün, hicri ay, hicri yıl]
  const DIYANET_DAYS = [
    ['ragaib', '2026-12-10', 1, 1, 7, 1448], ['miraj', '2027-01-04', 1, 27, 7, 1448], ['barat', '2027-01-22', 1, 15, 8, 1448],
    ['ramadan', '2027-02-08', 0, 1, 9, 1448], ['qadr', '2027-03-05', 1, 27, 9, 1448], ['arafaF', '2027-03-08', 0, 29, 9, 1448],
    ['eidF', '2027-03-09', 0, 1, 10, 1448], ['arafa', '2027-05-15', 0, 9, 12, 1448], ['eidA', '2027-05-16', 0, 10, 12, 1448],
    ['hijriNY', '2027-06-06', 0, 1, 1, 1449], ['ashura', '2027-06-15', 0, 10, 1, 1449], ['mawlid', '2027-08-13', 1, 12, 3, 1449]
  ];
  function holyDays(from, count) {
    if (settings.method !== 'Turkey') return holyDaysCalc(from, count);
    const today = new Date(from.getFullYear(), from.getMonth(), from.getDate());
    const list = DIYANET_DAYS.map(([key, iso, night, d, m, y]) => { const [Y, M, D] = iso.split('-').map(Number); return { key, date: new Date(Y, M - 1, D, 12), night: !!night, h: { d, m, y } }; })
      .filter(e => e.date >= today);
    const lastIso = DIYANET_DAYS[DIYANET_DAYS.length - 1][1].split('-').map(Number);
    const after = new Date(lastIso[0], lastIso[1] - 1, lastIso[2] + 1);
    if (list.length < count) list.push(...holyDaysCalc(after > today ? after : today, count - list.length));
    return list.slice(0, count);
  }
  // Mübarek günler (hesapla): gece ile başlayanlar bir önceki günün akşamı olarak gösterilir.
  function holyDaysCalc(from, count) {
    const out = [];
    const start = new Date(from.getFullYear(), from.getMonth(), from.getDate(), 12);
    const ragaibDone = {};
    for (let i = 0; i < 400 && out.length < count; i++) {
      const d = new Date(start); d.setDate(d.getDate() + i);
      const h = hijri(d); if (!h) break;
      const nx = new Date(d); nx.setDate(nx.getDate() + 1); const hn = hijri(nx);
      const add = (key, night) => out.push({ key, date: d, night, h: night ? hn : h });
      if (h.m === 1 && h.d === 1) add('hijriNY', false);
      if (h.m === 1 && h.d === 10) add('ashura', false);
      if (hn && hn.m === 3 && hn.d === 12) add('mawlid', true);
      // Regaib: Receb ayının ilk cuma gecesi (perşembe akşamı)
      if (hn && hn.m === 7 && nx.getDay() === 5 && !ragaibDone[hn.y]) { ragaibDone[hn.y] = 1; add('ragaib', true); }
      if (hn && hn.m === 7 && hn.d === 27) add('miraj', true);
      if (hn && hn.m === 8 && hn.d === 15) add('barat', true);
      if (h.m === 9 && h.d === 1) add('ramadan', false);
      if (hn && hn.m === 9 && hn.d === 27) add('qadr', true);
      if (hn && hn.m === 10 && hn.d === 1) add('arafaF', false);
      if (h.m === 10 && h.d === 1) add('eidF', false);
      if (h.m === 12 && h.d === 9) add('arafa', false);
      if (h.m === 12 && h.d === 10) add('eidA', false);
    }
    return out;
  }

  // ---------------- Görünümler ve gezinme ----------------
  const ROOTS = ['home', 'qibla', 'quran', 'dhikr', 'menu'];
  const TITLES = { home: 'appName', qibla: 'tabQibla', quran: 'tabQuran', dhikr: 'tabDhikr', menu: 'tabMenu', settings: 'tSettings', monthly: 'tMonthly', days: 'tDays', notif: 'mNotif', log: 'tLog', kaza: 'tKaza', esma: 'mEsma', hadis: 'tHadis', dua: 'tDua', deeds: 'tDeeds', names: 'tNames', quiz: 'tQuiz', ramazan: 'tRamazan', nafile: 'tNafile', ilmihal: 'tIlmihal' };
  let stack = ['home'];
  const cur = () => stack[stack.length - 1];
  function render(view) {
    document.querySelectorAll('.view').forEach(s => { s.hidden = s.dataset.view !== view; });
    let root = 'home';
    for (const v of stack) if (ROOTS.includes(v)) root = v;
    document.querySelectorAll('.tabbar button').forEach(b => b.classList.toggle('active', b.dataset.tab === root));
    $('barBack').hidden = stack.length <= 1 || ROOTS.includes(view);
    $('barTitle').textContent = view === 'reader' ? readerTitle() : t(TITLES[view] || 'appName');
    if (view === 'home') renderHome();
    if (view === 'monthly') renderMonth();
    if (view === 'days') renderDays();
    if (view === 'notif') renderNotif();
    if (view === 'log') { logDay = 0; renderLog(); }
    if (view === 'kaza') renderKaza();
    if (view === 'esma') renderEsma();
    if (view === 'hadis') renderTextList('hadis');
    if (view === 'dua') renderTextList('dua');
    if (view === 'deeds') renderDeeds();
    if (view === 'ramazan') renderRamazan();
    if (view === 'ilmihal') renderIlmihal();
    if (view === 'nafile') renderNafile();
    if (view === 'names') renderNames();
    if (view === 'quiz') { if (!quiz) newQuiz(); renderQuiz(); }
    if (view !== 'reader') window.scrollTo(0, 0);
  }
  function go(view) { if (cur() !== view) stack.push(view); render(view); }
  function tab(view) { stack = view === 'home' ? ['home'] : ['home', view]; render(view); }
  function back() {
    if (!$('onboard').hidden) { if (obStep > 0) obGo(obStep - 1); return true; }
    if (stack.length > 1) { stack.pop(); render(cur()); return true; }
    return false;
  }

  // ---------------- Ana sayfa ----------------
  function renderHome() {
    const now = new Date();
    const pt = timesFor(now);
    const n = nextPrayer(now);
    const curP = pt.currentPrayer(now);
    $('locName').textContent = settings.place.name;
    $('today').textContent = now.toLocaleDateString(loc(), { weekday: 'long', day: 'numeric', month: 'long' });
    $('hijri').textContent = hijriText(now);
    $('heroTimes').innerHTML = PRAYERS.map(p => `<li class="${p === curP && !n.tomorrow ? 'cur' : ''}"><span>${t(p)}</span><b>${hm(pt[p])}</b></li>`).join('');
    const next = holyDays(now, 1)[0];
    if (next) {
      $('nextDayName').textContent = t('ev')[next.key];
      const days = Math.round((new Date(next.date.getFullYear(), next.date.getMonth(), next.date.getDate()) - new Date(now.getFullYear(), now.getMonth(), now.getDate())) / 864e5);
      $('nextDayDate').textContent = `${next.date.toLocaleDateString(loc(), { day: 'numeric', month: 'long', weekday: 'long' })}${next.night ? ' ' + t('evening') : ''} · ${t('inDays')(days)}`;
    }
    renderVerse(now);
    renderHomeLog(now);
    renderDaily(now);
    renderHomeDeeds();
    renderRamCard(now);
    const last = store.get('lastRead', null);
    $('continueCard').hidden = !last || !surahs;
    if (last && surahs) $('continueName').textContent = `${surahName(surahs[last.s - 1])} · ${last.v}. ${t('ayah')}`;
    tick();
  }
  function tick() {
    const now = new Date();
    const n = nextPrayer(now);
    let s = Math.max(0, Math.floor((n.time - now) / 1000));
    const hh = String(Math.floor(s / 3600)).padStart(2, '0'); s %= 3600;
    $('nextCount').textContent = `${hh}:${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
    $('nextName').textContent = t(n.key) + (n.tomorrow ? ` (${t('tomorrow')})` : '') + ' ' + hm(n.time);
    const done = Math.min(1, Math.max(0, (now - n.prev) / (n.time - n.prev)));
    $('nextBar').style.width = (done * 100).toFixed(1) + '%';
    if (now.getSeconds() === 0) renderHome();
  }
  setInterval(() => { if (cur() === 'ramazan') ramTick(); }, 1000);

  // ---------------- Kur'an ----------------
  let surahs = null, quran = null, readerSurah = 1;
  const surahName = s => (lang === 'tr' ? s.tr : s.tl);
  async function loadQuran() {
    try {
      const [a, b] = await Promise.all([fetch('data/surahs.json').then(r => r.json()), fetch('data/quran-ar.json').then(r => r.json())]);
      surahs = a; quran = b;
      [esmaData, hadisData, duaData, namesData, quizData, ilmihalData] = await Promise.all(['esma', 'hadis', 'dua', 'isimler', 'quiz', 'ilmihal'].map(n => fetch(`data/${n}.json`).then(r => r.json())));
      renderSurahList(); renderHome();
    } catch (e) { console.error("Kur'an verisi yüklenemedi", e); }
  }
  const arNum = n => String(n).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
  const norm = s => s.toLocaleLowerCase(loc()).normalize('NFD').replace(/[̀-ͯ'’\-\s]/g, '').replace(/ı/g, 'i');
  function renderSurahList() {
    if (!surahs) return;
    const q = ($('surahSearch').value || '').trim();
    const nq = norm(q);
    $('surahList').innerHTML = surahs.filter(s => !q || String(s.n) === q || norm(s.tr).includes(nq) || norm(s.tl).includes(nq))
      .map(s => `<li data-s="${s.n}"><span class="num"><span>${s.n}</span></span><span class="s-body"><b>${surahName(s)}</b><small>${s.mk ? t('meccan') : t('medinan')} · ${s.v} ${t('verses')}${lang === 'en' ? ' · ' + s.en : ''}</small></span><span class="s-ar">${s.ar}</span></li>`).join('');
  }
  function readerTitle() { return surahs ? surahName(surahs[readerSurah - 1]) : ''; }
  function openSurah(n, verse) {
    if (!quran) return;
    readerSurah = n;
    const s = surahs[n - 1];
    $('rdAr').textContent = 'سورة ' + s.ar;
    $('rdMeta').textContent = `${surahName(s)} ${t('surah')} · ${s.mk ? t('meccan') : t('medinan')} · ${s.v} ${t('verses')}`.replace(/\s+·/, ' ·');
    $('rdBasmala').hidden = n === 1 || n === 9;
    $('rdVerses').innerHTML = quran[n - 1].map((v, i) => `<span class="v" id="v${i + 1}" data-v="${i + 1}">${v}<span class="vn">﴿${arNum(i + 1)}﴾</span></span> `).join('');
    $('rdPrev').disabled = n === 1; $('rdNext').disabled = n === 114;
    go('reader');
    store.set('lastRead', { s: n, v: verse || 1 });
    requestAnimationFrame(() => {
      if (verse && verse > 1) { const el = $('v' + verse); el.classList.add('hl'); el.scrollIntoView({ block: 'center' }); }
      else window.scrollTo(0, 0);
    });
  }
  function renderVerse(now) {
    $('verseCard').hidden = !quran;
    if (!quran) return;
    const dayIdx = Math.floor((now - new Date(now.getFullYear(), 0, 1)) / 864e5);
    const [s, v] = DAILY[dayIdx % DAILY.length];
    $('verseAr').textContent = quran[s - 1][v - 1];
    $('verseRef').textContent = `${surahName(surahs[s - 1])} ${t('surah')}, ${v}. ${t('ayah')}`.replace(' ,', ',');
    $('verseOpen').onclick = () => openSurah(s, v);
  }
  // Okunan ayeti hatırla
  let readTimer = null;
  window.addEventListener('scroll', () => {
    if (cur() !== 'reader') return;
    clearTimeout(readTimer);
    readTimer = setTimeout(() => {
      for (const el of $('rdVerses').querySelectorAll('.v')) {
        if (el.getBoundingClientRect().bottom > 100) { store.set('lastRead', { s: readerSurah, v: +el.dataset.v }); break; }
      }
    }, 400);
  }, { passive: true });

  // ---------------- Kıble ----------------
  let qibla = 0, decl = 0, shown = null, wasAligned = false;
  const wrap = a => ((a % 360) + 540) % 360 - 180;
  function renderQibla() {
    qibla = A.Qibla(new A.Coordinates(settings.place.lat, settings.place.lng));
    decl = window.vakitDeclination ? window.vakitDeclination(settings.place.lat, settings.place.lng, new Date()) : 0;
    $('arm').style.transform = `rotate(${qibla}deg)`;
    $('qiblaDeg').textContent = `${t('qiblaFromNorth')} ${Math.round(qibla)}°`;
  }
  function onOrientation(e) {
    let heading = null;
    if (typeof e.webkitCompassHeading === 'number') heading = e.webkitCompassHeading;
    else if (e.absolute && typeof e.alpha === 'number') heading = 360 - e.alpha;
    if (heading === null) return;
    // Pusula manyetik kuzeyi verir; manyetik sapma eklenerek gerçek kuzeye çevrilir.
    heading = (heading + decl + ((screen.orientation && screen.orientation.angle) || 0) + 720) % 360;
    shown = shown === null ? heading : shown + wrap(heading - shown) * 0.2;
    $('dial').style.transform = `rotate(${-shown}deg)`;
    const diff = wrap(qibla - shown);
    const aligned = Math.abs(diff) <= 3;
    $('compass').classList.toggle('aligned', aligned);
    $('turnHint').textContent = aligned ? t('aligned') : (diff > 0 ? t('turnRight')(Math.round(diff)) : t('turnLeft')(Math.round(-diff)));
    if (aligned && !wasAligned && navigator.vibrate) navigator.vibrate(60);
    wasAligned = aligned;
  }
  async function startCompass() {
    try {
      if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        if (await DeviceOrientationEvent.requestPermission() !== 'granted') throw new Error('denied');
      }
      if (!('ondeviceorientationabsolute' in window) && !('ondeviceorientation' in window)) throw new Error('na');
      window.addEventListener('ondeviceorientationabsolute' in window ? 'deviceorientationabsolute' : 'deviceorientation', onOrientation);
      $('compassBtn').hidden = true;
    } catch { $('qiblaHint').textContent = t('compassNA'); }
  }

  // ---------------- Zikirmatik ----------------
  const dz = Object.assign({ idx: 0, count: 0, target: 33, total: 0 }, store.get('dhikr', {}));
  function renderDhikr() {
    $('dhikrSel').innerHTML = DHIKRS.map((d, i) => `<option value="${i}" ${i === dz.idx ? 'selected' : ''}>${d[0]}</option>`).join('');
    $('dhikrAr').textContent = DHIKRS[dz.idx][1];
    $('targetSel').value = String(dz.target);
    $('count').textContent = dz.count;
    $('target').textContent = dz.target ? `/ ${dz.target}` : '';
    $('total').textContent = dz.total;
    const frac = dz.target ? Math.min(1, dz.count / dz.target) : (dz.count % 100) / 100;
    $('ringFg').style.strokeDashoffset = (282.7 * (1 - frac)).toFixed(1);
    $('counter').classList.toggle('done', dz.target > 0 && dz.count >= dz.target);
  }
  function bump() {
    dz.count++; dz.total++;
    if (navigator.vibrate) navigator.vibrate(dz.target && dz.count === dz.target ? [80, 60, 80] : 12);
    store.set('dhikr', dz); renderDhikr();
  }

  // ---------------- Menü ----------------
  const MENU = [
    { go: 'notif', ic: 'i-bell', t: 'mNotif', s: 'mNotifSub' },
    { go: 'log', ic: 'i-check', t: 'mPrayerLog', s: 'mPrayerLogSub' },
    { go: 'kaza', ic: 'i-cal', t: 'mKaza', s: 'mKazaSub' },
    { go: 'monthly', ic: 'i-table', t: 'mMonthly', s: 'mMonthlySub' },
    { go: 'days', ic: 'i-moon', t: 'mDays', s: 'mDaysSub' },
    { go: 'quran', ic: 'i-book', t: 'tabQuran' },
    { go: 'qibla', ic: 'i-qibla', t: 'tabQibla' },
    { go: 'dhikr', ic: 'i-beads', t: 'tabDhikr' },
    { go: 'settings', ic: 'i-gear', t: 'mSettings', s: 'mSettingsSub' },

 { soon: 1, ic: 'i-people', t: 'mHatim' },
    { go: 'esma', ic: 'i-star', t: 'mEsma', s: 'mEsmaSub' }, { go: 'hadis', ic: 'i-book', t: 'mHadis', s: 'mHadisSub' },
    { go: 'dua', ic: 'i-moon', t: 'mDua', s: 'mDuaSub' },
    { go: 'ilmihal', ic: 'i-book', t: 'mIlmihal', s: 'mIlmihalSub' },
    { go: 'ramazan', ic: 'i-moon', t: 'mRamazan', s: 'mRamazanSub' }, { go: 'nafile', ic: 'i-cal', t: 'mNafile', s: 'mNafileSub' },
    { go: 'deeds', ic: 'i-heart', t: 'mDeeds', s: 'mDeedsSub' }, { go: 'quiz', ic: 'i-quiz', t: 'mQuiz', s: 'mQuizSub' },
    { go: 'names', ic: 'i-baby', t: 'mNames', s: 'mNamesSub' }
  ];
  // Sıra: içerik → ayarlar → yakında
  MENU.sort((x, y) => (x.soon ? 2 : x.go === 'settings' ? 1 : 0) - (y.soon ? 2 : y.go === 'settings' ? 1 : 0));
  function renderMenu() {
    $('menuGrid').innerHTML = MENU.map(m => `<button type="button" class="tile${m.soon ? ' soon' : ''}" ${m.go ? `data-go="${m.go}"` : 'disabled'}>${m.soon ? `<span class="badge">${t('soon')}</span>` : ''}<span class="t-ic"><svg><use href="#${m.ic}"/></svg></span><b>${t(m.t)}</b>${m.s ? `<small>${t(m.s)}</small>` : ''}</button>`).join('');
  }

  // ---------------- Aylık vakitler ----------------
  let mOffset = 0;
  function renderMonth() {
    const now = new Date();
    const base = new Date(now.getFullYear(), now.getMonth() + mOffset, 1);
    const y = base.getFullYear(), m = base.getMonth();
    $('mTitle').textContent = base.toLocaleDateString(loc(), { month: 'long', year: 'numeric' });
    const days = new Date(y, m + 1, 0).getDate();
    let rows = `<tr><th>${t('day')}</th>${PRAYERS.map(p => `<th>${t(p)}</th>`).join('')}</tr>`;
    for (let d = 1; d <= days; d++) {
      const date = new Date(y, m, d, 12);
      const pt = timesFor(date);
      const isToday = mOffset === 0 && d === now.getDate();
      rows += `<tr class="${isToday ? 'today' : ''}"><td>${date.toLocaleDateString(loc(), { day: '2-digit', month: '2-digit' })}</td>${PRAYERS.map(p => `<td>${hm(pt[p])}</td>`).join('')}</tr>`;
    }
    $('monthTable').innerHTML = rows;
  }

  // ---------------- Mübarek günler ----------------
  function renderDays() {
    const now = new Date();
    $('hijriBig').textContent = hijriText(now);
    $('gregBig').textContent = now.toLocaleDateString(loc(), { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    const today0 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    $('daysList').innerHTML = holyDays(now, 14).map(e => {
      const n = Math.round((new Date(e.date.getFullYear(), e.date.getMonth(), e.date.getDate()) - today0) / 864e5);
      return `<li><span class="d-date"><b>${e.date.getDate()}</b><small>${e.date.toLocaleDateString(loc(), { month: 'short' })}</small></span><span class="d-body"><b>${t('ev')[e.key]}</b><small>${e.h ? `${e.h.d} ${t('hijriMonths')[e.h.m - 1]} ${e.h.y}` : ''} · ${e.date.toLocaleDateString(loc(), { weekday: 'long' })}${e.night ? ' ' + t('evening') : ''}</small></span><span class="d-left">${t('inDays')(n)}</span></li>`;
    }).join('');
  }

  // ---------------- Namaz takibi ----------------
  const FARZ = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
  const pname = p => (p === 'fajr' ? t('fajrPrayer') : t(p)); // namazın adı (imsak vaktinde kılınan: sabah)
  const plog = store.get('plog', {}); // { 'YYYY-MM-DD': bitmask (fajr=1 ... isha=16) }
  const dkey = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const dayAt = off => { const n = new Date(); return new Date(n.getFullYear(), n.getMonth(), n.getDate() + off, 12); };
  const isOn = (d, i) => !!((plog[dkey(d)] || 0) & (1 << i));
  const countDay = d => FARZ.reduce((s, _, i) => s + (isOn(d, i) ? 1 : 0), 0);
  function togglePrayer(d, i) {
    const k = dkey(d); plog[k] = (plog[k] || 0) ^ (1 << i);
    if (!plog[k]) delete plog[k];
    store.set('plog', plog);
    if (navigator.vibrate && plog[k] & (1 << i)) navigator.vibrate(15);
  }
  // Vakti girmiş mi? (bugün için)
  const started = (d, p) => timesFor(d)[p] <= new Date();
  function streaks() {
    // Bugün henüz tamamlanmadıysa seri dünden sayılır
    let cur = 0, off = countDay(dayAt(0)) === 5 ? 0 : -1;
    while (countDay(dayAt(off)) === 5) { cur++; off--; }
    let best = 0, run = 0;
    const keys = Object.keys(plog).sort();
    if (keys.length) {
      const [y, m, d] = keys[0].split('-').map(Number);
      for (let t0 = new Date(y, m - 1, d, 12); t0 <= dayAt(0); t0.setDate(t0.getDate() + 1)) {
        run = countDay(t0) === 5 ? run + 1 : 0; best = Math.max(best, run);
      }
    }
    return { cur, best: Math.max(best, cur) };
  }
  function renderHomeLog(now) {
    const d = dayAt(0);
    $('homeLog').innerHTML = FARZ.map((p, i) => `<button type="button" data-hp="${i}" class="${isOn(d, i) ? 'on' : ''}" ${started(d, p) || isOn(d, i) ? '' : 'disabled'}><i>${isOn(d, i) ? '✓' : ''}</i>${pname(p)}</button>`).join('');
    const s = streaks().cur;
    $('logStreak').textContent = s ? t('streak')(s) : `${countDay(d)}/5`;
  }
  let logDay = 0;
  function renderLog() {
    const d = dayAt(logDay), pt = timesFor(d);
    $('logDate').textContent = logDay === 0 ? `${t('today')} · ${d.toLocaleDateString(loc(), { day: 'numeric', month: 'long' })}` : d.toLocaleDateString(loc(), { weekday: 'long', day: 'numeric', month: 'long' });
    $('logHijri').textContent = hijriText(d);
    $('logNext').disabled = logDay >= 0;
    $('logList').innerHTML = FARZ.map((p, i) => {
      const on = isOn(d, i), can = logDay < 0 || started(d, p) || on;
      return `<li><span class="l-name"><b>${pname(p)}</b><small>${hm(pt[p])}</small></span><button type="button" data-lp="${i}" class="${on ? 'on' : ''}" ${can ? '' : 'disabled'}>${on ? '✓ ' + t('prayed') : can ? t('mark') : t('notYet')}</button></li>`;
    }).join('');
    const s = streaks();
    $('stStreak').textContent = s.cur; $('stBest').textContent = s.best;
    // Geçmiş günlerde işaretlenmemiş vakitleri kazaya ekleme
    const missing = FARZ.filter((_, i) => !isOn(d, i)).length;
    const added = !!kz.fromLog[dkey(d)];
    $('logToKaza').hidden = logDay >= 0 || (!missing && !added);
    $('logToKaza').disabled = added;
    $('logToKaza').textContent = added ? t('toKazaDone') : t('toKaza')(missing);
    // Bu ay: bugüne kadar geçen günlerdeki kılınan / toplam
    const now = new Date(); let done = 0, total = 0;
    for (let i = 1; i <= now.getDate(); i++) {
      const dd = new Date(now.getFullYear(), now.getMonth(), i, 12);
      FARZ.forEach((p, k) => { if (i < now.getDate() || started(dd, p)) { total++; if (isOn(dd, k)) done++; } });
    }
    $('stMonth').textContent = total ? Math.round(done * 100 / total) + '%' : '0%';
    $('logWeek').innerHTML = Array.from({ length: 7 }, (_, k) => {
      const dd = dayAt(k - 6), c = countDay(dd);
      return `<div><span class="bar${c === 5 ? ' full' : ''}"><i style="height:${c * 20}%"></i></span>${dd.toLocaleDateString(loc(), { weekday: 'short' })}</div>`;
    }).join('');
  }

  // ---------------- Günlük içerik: hadis, dua, esma ----------------
  let esmaData = null, hadisData = null, duaData = null;
  const dayOfYear = now => Math.floor((new Date(now.getFullYear(), now.getMonth(), now.getDate()) - new Date(now.getFullYear(), 0, 1)) / 864e5);
  const duaAr = d => quran ? quran[d.s - 1].slice(d.a - 1, d.b).join(' ') : '';
  const duaRef = d => `${surahName(surahs[d.s - 1])} ${t('surah')}, ${d.a}${d.b > d.a ? '-' + d.b : ''}. ${t('ayah')}`.replace(' ,', ',');
  function renderDaily(now) {
    if (!esmaData) return;
    const n = dayOfYear(now);
    const h = hadisData[n % hadisData.length];
    $('hadisTr').textContent = lang === 'tr' ? h.tr : h.en; $('hadisSrc').textContent = h.src;
    const ei = n % 99, e = esmaData[ei];
    $('esmaNo').textContent = `${ei + 1}/99`; $('esmaAr').textContent = e.ar; $('esmaTl').textContent = e.tl; $('esmaTr').textContent = lang === 'tr' ? e.tr : e.en;
    const nb = namesData.filter(x => x.g !== 'k'), ng = namesData.filter(x => x.g === 'k');
    $('namesToday').innerHTML = [nb[(n * 2) % nb.length], ng[(n * 2) % ng.length], nb[(n * 2 + 1) % nb.length], ng[(n * 2 + 1) % ng.length]].map(nameRow).join('');
    const d = duaData[n % duaData.length];
    $('duaAr').textContent = duaAr(d); $('duaTr').textContent = lang === 'tr' ? d.tr : d.en; $('duaRef').textContent = duaRef(d);
  }
  function renderEsma() {
    if (!esmaData) return;
    const q = norm(($('esmaSearch').value || '').trim()), today = dayOfYear(new Date()) % 99;
    $('esmaList').innerHTML = esmaData.map((e, i) => ({ e, i })).filter(({ e }) => !q || norm(e.tl).includes(q) || norm(lang === 'tr' ? e.tr : e.en).includes(q))
      .map(({ e, i }) => `<div class="${i === today ? 'hl' : ''}"><i>${i + 1}</i><span class="ar" dir="rtl" lang="ar">${e.ar}</span><b>${e.tl}</b><small>${lang === 'tr' ? e.tr : e.en}</small></div>`).join('');
  }
  function renderTextList(kind) {
    if (!esmaData) return;
    const n = dayOfYear(new Date());
    if (kind === 'hadis') $('hadisList').innerHTML = hadisData.map((h, i) => `<li class="${i === n % hadisData.length ? 'hl' : ''}"><p>${lang === 'tr' ? h.tr : h.en}</p><small>${h.src}</small></li>`).join('');
    else $('duaList').innerHTML = duaData.map((d, i) => `<li class="${i === n % duaData.length ? 'hl' : ''}"><p class="ar" dir="rtl" lang="ar">${duaAr(d)}</p><p>${lang === 'tr' ? d.tr : d.en}</p><small>${duaRef(d)}</small></li>`).join('');
  }

  // ---------------- Ramazan ----------------
  // Ramazan'ın ilk günü ve bayramın ilk günü (Diyanet tarihi varsa onu, yoksa hesabı kullanır)
  const ramMemo = {};
  function ramadanRange(now) {
    const mk = settings.method + dkey(now);
    if (!(mk in ramMemo)) ramMemo[mk] = ramadanRangeCalc(now);
    return ramMemo[mk];
  }
  function ramadanRangeCalc(now) {
    const ev = holyDays(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 60), 40);
    const start = ev.find(e => e.key === 'ramadan'); if (!start) return null;
    const eid = ev.find(e => e.key === 'eidF' && e.date > start.date);
    const end = eid ? eid.date : new Date(start.date.getFullYear(), start.date.getMonth(), start.date.getDate() + 30, 12);
    const days = Math.round((end - start.date) / 864e5);
    return { start: start.date, end, days, year: start.h ? start.h.y : '' };
  }
  const day0 = d => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const ramIndex = (r, d) => Math.round((day0(d) - day0(r.start)) / 864e5); // 0 = 1 Ramazan
  const fasts = Object.assign({ ram: {}, nafile: {}, ramKaza: {} }, store.get('fasts', {}));
  const saveFasts = () => store.set('fasts', fasts);
  function renderRamCard(now) {
    const r = ramadanRange(now);
    if (!r) { $('ramCard').hidden = true; return; }
    const i = ramIndex(r, now);
    const until = -i;
    $('ramCard').hidden = !(until <= 90 && i < r.days);
    if (i < 0) { $('ramCardSmall').textContent = t('ramUpcoming'); $('ramCardBig').textContent = t('ramTo')(until); $('ramCardSub').textContent = t('ramStarts')(r.start.toLocaleDateString(loc(), { day: 'numeric', month: 'long', weekday: 'long' })); }
    else { const pt = timesFor(now); $('ramCardSmall').textContent = t('ramNow'); $('ramCardBig').textContent = t('ramDay')(i + 1); $('ramCardSub').textContent = `${t('sahur')} ${hm(pt.fajr)} · ${t('iftar')} ${hm(pt.maghrib)}`; }
  }
  function ramTick() {
    const now = new Date(), r = ramadanRange(now); if (!r) return;
    const i = ramIndex(r, now);
    let target, label;
    if (i < 0) { target = timesFor(r.start).fajr; label = t('ramLeft'); }
    else if (i >= r.days) { $('ramNext').textContent = t('ramEnded'); $('ramCount').textContent = ''; return; }
    else {
      const pt = timesFor(now);
      if (now < pt.fajr) { target = pt.fajr; label = t('toSahur'); }
      else if (now < pt.maghrib) { target = pt.maghrib; label = t('toIftar'); }
      else { const tm = new Date(now); tm.setDate(tm.getDate() + 1); target = timesFor(tm).fajr; label = ramIndex(r, tm) < r.days ? t('toSahur') : t('ramEnded'); }
    }
    let s = Math.max(0, Math.floor((target - now) / 1000));
    const dd = Math.floor(s / 86400); s %= 86400;
    const hh = String(Math.floor(s / 3600)).padStart(2, '0'); s %= 3600;
    $('ramNext').textContent = label;
    $('ramCount').textContent = `${dd ? dd + ' ' + t('dayShort') + ' ' : ''}${hh}:${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  }
  function renderRamazan() {
    const now = new Date(), r = ramadanRange(now); if (!r) return;
    const i = ramIndex(r, now);
    $('ramTitle').textContent = `${t('tRamazan')} ${r.year}`;
    $('ramDayNo').textContent = i >= 0 && i < r.days ? t('ramDay')(i + 1) : r.start.toLocaleDateString(loc(), { day: 'numeric', month: 'long' });
    const ptToday = timesFor(i >= 0 && i < r.days ? now : r.start);
    $('ramSahur').textContent = hm(ptToday.fajr); $('ramIftar').textContent = hm(ptToday.maghrib);
    let rows = `<tr><th>#</th><th>${t('day')}</th><th>${t('sahur')}</th><th>${t('iftar')}</th><th>${t('fastCol')}</th></tr>`;
    let missed = 0;
    for (let k = 0; k < r.days; k++) {
      const d = new Date(r.start.getFullYear(), r.start.getMonth(), r.start.getDate() + k, 12), pt = timesFor(d), key = dkey(d);
      const past = day0(d) < day0(now), isToday = k === i, can = day0(d) <= day0(now);
      if (past && !fasts.ram[key]) missed++;
      rows += `<tr class="${isToday ? 'today' : ''}${past ? ' past' : ''}"><td>${k + 1}</td><td>${d.toLocaleDateString(loc(), { day: '2-digit', month: '2-digit' })}</td><td>${hm(pt.fajr)}</td><td>${hm(pt.maghrib)}</td><td class="${can ? 'chk' : ''}" data-rd="${can ? key : ''}">${fasts.ram[key] ? '✓' : can ? '○' : ''}</td></tr>`;
    }
    $('ramTable').innerHTML = rows; $('ramTable').classList.add('ram-table');
    const kKey = dkey(r.start), done = !!fasts.ramKaza[kKey];
    $('ramToKaza').hidden = !(missed || done) || i < r.days;
    $('ramToKaza').disabled = done;
    $('ramToKaza').textContent = done ? t('ramToKazaDone') : t('ramToKaza')(missed);
    ramTick();
  }

  // ---------------- İlmihal ----------------
  let ilmihalData = null;
  function renderIlmihal() {
    if (!ilmihalData || $('ilmihalList').childElementCount) return;
    const esc = s => s.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
    $('ilmihalList').innerHTML = ilmihalData.map((s, i) => `<details class="ilm"${i === 0 ? ' open' : ''}><summary>${esc(s.t)}</summary><div class="ilm-body">${s.b.map(([k, v]) =>
      k === 'h' ? `<h4>${esc(v)}</h4>` : k === 'p' ? `<p>${esc(v)}</p>` : `<${k}>${v.map(x => `<li>${esc(x)}</li>`).join('')}</${k}>`).join('')}</div></details>`).join('');
  }

  // ---------------- Nafile oruç ----------------
  function nafileDays(from, n) {
    const out = [], hd = holyDays(from, 20);
    const ashura = hd.find(e => e.key === 'ashura'), arafa = hd.find(e => e.key === 'arafa'), eidF = hd.find(e => e.key === 'eidF');
    for (let k = 0; k < 60 && out.length < n; k++) {
      const d = new Date(from.getFullYear(), from.getMonth(), from.getDate() + k, 12), h = hijri(d), types = [];
      if (h && h.m === 9) continue; // Ramazan
      const same = e => e && dkey(e.date) === dkey(d);
      if (same(eidF)) continue;
      if (hd.some(e => e.key === 'eidA' && Math.round((day0(d) - day0(e.date)) / 864e5) >= 0 && Math.round((day0(d) - day0(e.date)) / 864e5) < 4)) continue;
      if (d.getDay() === 1) types.push('mon');
      if (d.getDay() === 4) types.push('thu');
      if (h && h.d >= 13 && h.d <= 15) types.push('biyd');
      if (ashura && Math.abs(Math.round((day0(d) - day0(ashura.date)) / 864e5)) <= 1) types.push('ashura');
      if (same(arafa)) types.push('arafa');
      if (eidF && Math.round((day0(d) - day0(eidF.date)) / 864e5) >= 1 && Math.round((day0(d) - day0(eidF.date)) / 864e5) <= 29) types.push('shawwal');
      if (types.length) out.push({ d, h, types });
    }
    return out;
  }
  function renderNafile() {
    const now = new Date(), y = String(now.getFullYear());
    $('nfCountYear').textContent = Object.keys(fasts.nafile).filter(k => k.startsWith(y)).length;
    const today0 = day0(now);
    $('nafileList').innerHTML = nafileDays(now, 12).map(x => {
      const n = Math.round((day0(x.d) - today0) / 864e5), key = dkey(x.d), on = !!fasts.nafile[key];
      return `<li><span class="d-date"><b>${x.d.getDate()}</b><small>${x.d.toLocaleDateString(loc(), { month: 'short' })}</small></span><span class="d-body"><b>${x.types.map(k => t('fType')[k]).join(' · ')}</b><small>${x.h ? `${x.h.d} ${t('hijriMonths')[x.h.m - 1]}` : ''} · ${x.d.toLocaleDateString(loc(), { weekday: 'long' })} · ${t('inDays')(n)}</small></span>${n === 0 ? `<button type="button" class="fchk${on ? ' on' : ''}" data-nf-day="${key}">${on ? '✓ ' + t('fasted') : t('fastMark')}</button>` : ''}</li>`;
    }).join('');
  }

  // ---------------- Günlük iyilikler ----------------
  const deeds = Object.assign({ custom: [], days: {}, remind: false }, store.get('deeds', {}));
  const saveDeeds = () => store.set('deeds', deeds);
  const deedItems = () => [...t('deedList').map((x, i) => ({ id: 'b' + i, t: x })), ...deeds.custom.map(c => ({ id: c.id, t: c.t, custom: 1 }))];
  const deedsOn = d => deeds.days[dkey(d)] || [];
  function deedStreak() { let s = 0, off = deedsOn(dayAt(0)).length ? 0 : -1; while (deedsOn(dayAt(off)).length) { s++; off--; } return s; }
  function renderHomeDeeds() { $('deedsSub').textContent = t('deedsSub')(deedsOn(dayAt(0)).length, deedStreak()); }
  function renderDeeds() {
    const on = deedsOn(dayAt(0));
    $('deedsCount').textContent = on.length;
    const s = deedStreak(); $('deedsStreak').textContent = s ? t('deedStreak')(s) : '';
    $('deedsList').innerHTML = deedItems().map(x => `<li data-deed="${x.id}" class="${on.includes(x.id) ? 'on' : ''}"><span class="box">${on.includes(x.id) ? '✓' : ''}</span><span class="t"></span>${x.custom ? `<button class="del" type="button" data-del="${x.id}" aria-label="Sil">×</button>` : ''}</li>`).join('');
    // Kullanıcı metni güvenli şekilde eklenir
    deedItems().forEach((x, i) => { $('deedsList').children[i].querySelector('.t').textContent = x.t; });
    $('deedRemindOn').checked = !!deeds.remind;
  }

  // ---------------- İsimler ----------------
  let namesData = null, quizData = null, nameG = '';
  const nameRow = x => `<li><b>${x.n}</b><small>${x.m}</small><span class="tag ${x.g}">${x.g === 'e' ? t('boy') : x.g === 'k' ? t('girl') : t('unisex')} · ${x.o}</span></li>`;
  function renderNames() {
    if (!namesData) return;
    const q = norm(($('nameSearch').value || '').trim());
    $('nameList').innerHTML = namesData.filter(x => (!nameG || x.g === nameG || x.g === 'u') && (!q || norm(x.n).includes(q) || norm(x.m).includes(q))).map(nameRow).join('');
    document.querySelectorAll('#nameSeg button').forEach(b => b.classList.toggle('on', b.dataset.g === nameG));
  }

  // ---------------- Bilgi yarışması ----------------
  let quiz = null;
  function newQuiz() {
    if (!quizData) return;
    const idx = quizData.map((_, i) => i).sort(() => Math.random() - 0.5).slice(0, 5);
    quiz = { qs: idx.map(i => { const q = quizData[i]; return { q, opts: [q.c, ...q.w].sort(() => Math.random() - 0.5) }; }), i: 0, score: 0, picked: null };
  }
  function renderQuiz() {
    if (!quiz) { $('quizBox').innerHTML = ''; return; }
    const best = store.get('quizBest', 0);
    $('quizBest').textContent = best ? t('qBest')(best) : '';
    if (quiz.i >= quiz.qs.length) {
      $('quizBox').innerHTML = `<div class="qn">${t('qScore')}</div><div class="bigscore">${quiz.score} / ${quiz.qs.length}</div><button class="btn" type="button" id="qAgain">${t('qAgain')}</button>`;
      return;
    }
    const cur = quiz.qs[quiz.i], answered = quiz.picked !== null;
    $('quizBox').innerHTML = `<div class="qn">${t('qOf')(quiz.i + 1, quiz.qs.length)}</div><h3>${lang === 'tr' ? cur.q.q : cur.q.en}</h3>
      <div class="opts">${cur.opts.map((o, k) => `<button type="button" data-opt="${k}" class="${answered ? (o === cur.q.c ? 'ok' : (k === quiz.picked ? 'no' : '')) : ''}" ${answered ? 'disabled' : ''}>${o}</button>`).join('')}</div>
      ${answered ? `<button class="btn" type="button" id="qNext">${quiz.i === quiz.qs.length - 1 ? t('qFinish') : t('qNext')}</button>` : ''}`;
  }

  // ---------------- Kaza takibi ----------------
  const KZ = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha', 'witr'];
  const kz = Object.assign({ left: { fajr: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0, witr: 0, fast: 0 }, done: { fajr: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0, witr: 0, fast: 0 }, fromLog: {} }, store.get('kaza', {}));
  const saveKz = () => { store.set('kaza', kz); renderKaza(); };
  function kzRow(k, isFast) {
    const name = isFast ? t('fast') : (k === 'witr' ? t('witr') : pname(k));
    const sub = isFast ? t('kzFastedSub')(kz.done[k]) : t('kzPrayedSub')(kz.done[k]);
    return `<li><span class="k-name"><b>${name}</b><small>${sub}</small></span>
      <button class="k-btn" type="button" data-kz="${k}" data-d="-1" aria-label="−">−</button>
      <span class="k-num">${kz.left[k]}</span>
      <button class="k-btn" type="button" data-kz="${k}" data-d="1" aria-label="+">+</button>
      <button class="k-done" type="button" data-kzdone="${k}" ${kz.left[k] ? '' : 'disabled'}>${isFast ? t('kzFasted') : t('kzPrayed')}</button></li>`;
  }
  function renderKaza() {
    $('kzList').innerHTML = KZ.map(k => kzRow(k, false)).join('');
    $('kzFast').innerHTML = kzRow('fast', true);
    $('kzLeft').textContent = KZ.reduce((s, k) => s + kz.left[k], 0);
    $('kzDone').textContent = KZ.reduce((s, k) => s + kz.done[k], 0);
  }

  // ---------------- Ezan bildirimleri ----------------
  const LN = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.LocalNotifications;
  const nf = Object.assign({ on: false, mins: 15,
    at: { fajr: true, sunrise: false, dhuhr: true, asr: true, maghrib: true, isha: true },
    pre: { fajr: false, sunrise: false, dhuhr: false, asr: false, maghrib: false, isha: false } }, store.get('notif', {}));
  const saveNf = () => { store.set('notif', nf); queueReschedule(); renderNotif(); };
  let channelsReady = false, rsTimer = null;
  const queueReschedule = () => { clearTimeout(rsTimer); rsTimer = setTimeout(reschedule, 400); };
  async function ensureChannels() {
    if (!LN || channelsReady) return;
    try {
      await LN.createChannel({ id: 'ezan', name: lang === 'tr' ? 'Ezan vakitleri' : 'Prayer times', importance: 5, visibility: 1, vibration: true });
      await LN.createChannel({ id: 'hatirlatma', name: lang === 'tr' ? 'Vakit öncesi hatırlatma' : 'Reminders', importance: 4, visibility: 1, vibration: true });
      channelsReady = true;
    } catch (e) { console.error('channel', e); }
  }
  async function exactGranted() { try { return (await LN.checkExactNotificationSetting()).exact_alarm === 'granted'; } catch { return true; } }
  async function enableNotif() {
    if (!LN) { nf.on = true; saveNf(); return false; }
    let p = await LN.checkPermissions();
    if (p.display !== 'granted') p = await LN.requestPermissions();
    nf.on = p.display === 'granted';
    store.set('notif', nf); await reschedule(); renderNotif();
    return nf.on;
  }
  async function reschedule() {
    if (!LN) return 0;
    try {
      const pending = await LN.getPending();
      if (pending.notifications.length) await LN.cancel({ notifications: pending.notifications.map(n => ({ id: n.id })) });
      const granted = (await LN.checkPermissions()).display === 'granted';
      if (granted && deeds.remind) {
        await ensureChannels();
        const now0 = new Date(), dl = [];
        for (let d = 0; d < 10; d++) { const at = new Date(now0.getFullYear(), now0.getMonth(), now0.getDate() + d, 21, 0); if (at > now0) dl.push({ id: 800 + d, title: t('deedNotifTitle'), body: t('deedNotifBody'), schedule: { at, allowWhileIdle: true }, channelId: 'hatirlatma', isExactNotification: false }); }
        if (dl.length) await LN.schedule({ notifications: dl });
      }
      if (!nf.on || !granted) { $('nfStatus').textContent = t('nfOff'); return 0; }
      await ensureChannels();
      const exact = await exactGranted();
      const now = new Date(), DAYS = 10, list = [];
      for (let d = 0; d < DAYS; d++) {
        const pt = timesFor(new Date(now.getFullYear(), now.getMonth(), now.getDate() + d, 12));
        PRAYERS.forEach((p, i) => {
          const at = pt[p], sun = p === 'sunrise';
          const rr = ramadanRange(at), inRam = rr && ramIndex(rr, at) >= 0 && ramIndex(rr, at) < rr.days;
          const title = sun ? t('nfSunTitle') : inRam && p === 'maghrib' ? t('nfIftar') : inRam && p === 'fajr' ? t('nfSahurEnd') : t('nfTitle')(t(p));
          if (nf.at[p] && at > now) list.push({ id: d * 20 + i * 2 + 1, title, body: `${settings.place.name} · ${hm(at)}`,
            schedule: { at, allowWhileIdle: true }, channelId: 'ezan', isExactNotification: exact });
          const b = new Date(at - nf.mins * 60000);
          if (nf.pre[p] && b > now) list.push({ id: d * 20 + i * 2 + 2, title: sun ? t('nfSunPre')(nf.mins) : t('nfPreTitle')(t(p), nf.mins), body: `${t(p)} ${hm(at)} · ${settings.place.name}`,
            schedule: { at: b, allowWhileIdle: true }, channelId: 'hatirlatma', isExactNotification: exact });
        });
      }
      // Uygulama uzun süre açılmazsa hatırlat (bildirimler 10 gün ileriye kurulur)
      list.push({ id: 9000, title: t('nfKeepTitle'), body: t('nfKeepBody'), schedule: { at: new Date(now.getTime() + (DAYS - 1) * 864e5), allowWhileIdle: true }, channelId: 'hatirlatma', isExactNotification: false });
      await LN.schedule({ notifications: list });
      $('nfStatus').textContent = t('nfOk')(list.length - 1);
      return list.length - 1;
    } catch (e) { console.error('reschedule', e); $('nfStatus').textContent = String(e && e.message || e); return 0; }
  }
  async function renderNotif() {
    $('nfOn').checked = nf.on;
    $('nfMins').value = String(nf.mins);
    const pt = timesFor(new Date());
    $('nfList').classList.toggle('off', !nf.on);
    $('nfList').innerHTML = PRAYERS.map(p => `<li><div class="nf-name"><span>${t(p)}</span><em>${hm(pt[p])}</em></div>
      <label class="switch-row"><span>${t('nfAt')}</span><input type="checkbox" data-nf="at" data-p="${p}" ${nf.at[p] ? 'checked' : ''}><i></i></label>
      <label class="switch-row"><span>${t('nfPre')(nf.mins)}</span><input type="checkbox" data-nf="pre" data-p="${p}" ${nf.pre[p] ? 'checked' : ''}><i></i></label></li>`).join('');
    $('nfWeb').hidden = !!LN;
    if (!LN) { $('nfPerm').hidden = true; $('nfExact').hidden = true; return; }
    const perm = await LN.checkPermissions();
    $('nfPerm').hidden = !nf.on || perm.display === 'granted';
    $('nfExact').hidden = !nf.on || perm.display !== 'granted' || await exactGranted();
  }

  // ---------------- Ayarlar ----------------
  const methodOptions = sel => Object.entries(METHODS).map(([k, v]) => `<option value="${k}" ${k === sel ? 'selected' : ''}>${v}</option>`).join('');
  const cityOptions = () => (CITIES.some(c => c[0] === settings.place.name) ? '' : `<option selected>${settings.place.name}</option>`) +
    CITIES.map(c => `<option ${c[0] === settings.place.name ? 'selected' : ''}>${c[0]}</option>`).join('');
  function renderSettings() {
    $('methodSel').innerHTML = methodOptions(settings.method);
    $('madhabSel').value = settings.madhab;
    $('citySel').innerHTML = cityOptions();
    const opts = v => Array.from({ length: 21 }, (_, i) => i - 10).map(n => `<option value="${n}" ${n === v ? 'selected' : ''}>${n > 0 ? '+' + n : n}</option>`).join('');
    $('fineBox').innerHTML = PRAYERS.map(p => `<label>${t(p)}<select data-fine="${p}">${opts(+(settings.fine[p] || 0))}</select></label>`).join('');
  }
  function setCity(name) { const c = CITIES.find(x => x[0] === name); if (c) { settings.place = { name: c[0], lat: c[1], lng: c[2] }; save(); } }
  function useGps(onDone) {
    if (!navigator.geolocation) { alert(t('gpsFail')); return; }
    navigator.geolocation.getCurrentPosition(
      pos => { settings.place = { name: t('myLocation'), lat: pos.coords.latitude, lng: pos.coords.longitude }; save(); if (onDone) onDone(true); },
      () => { alert(t('gpsFail')); if (onDone) onDone(false); }, { enableHighAccuracy: false, timeout: 15000, maximumAge: 600000 });
  }

  // ---------------- İlk açılış kurulumu ----------------
  let obStep = 0;
  function obGo(n) {
    if (n < 0) return;
    if (n > 3) { store.set('onboarded', true); $('onboard').hidden = true; refresh(); return; }
    obStep = n;
    document.querySelectorAll('.ob-step').forEach(s => { s.hidden = +s.dataset.step !== n; });
    document.querySelectorAll('#obDots i').forEach((d, i) => d.classList.toggle('on', i === n));
    $('obBack').style.visibility = n === 0 ? 'hidden' : 'visible';
    $('obNext').textContent = n === 3 ? t('finish') : t('continue');
    $('obCity').innerHTML = cityOptions();
    $('obMethod').innerHTML = methodOptions(settings.method);
    document.querySelectorAll('#obMadhab button').forEach(b => b.classList.toggle('on', b.dataset.v === settings.madhab));
  }
  function showOnboarding() { $('onboard').hidden = false; applyLang(); obGo(0); }

  // ---------------- Genel ----------------
  function applyLang() {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => { const v = T[lang][el.dataset.i18n]; if (typeof v === 'string') el.textContent = v; });
    document.querySelectorAll('[data-i18n-ph]').forEach(el => { el.placeholder = T[lang][el.dataset.i18nPh]; });
    $('langBtn').textContent = lang === 'tr' ? 'EN' : 'TR';
  }
  function refresh() {
    applyLang(); renderHome(); renderQibla(); renderDhikr(); renderMenu(); renderSettings(); renderSurahList();
    if (cur() === 'monthly') renderMonth();
    if (cur() === 'days') renderDays();
    $('barTitle').textContent = cur() === 'reader' ? readerTitle() : t(TITLES[cur()] || 'appName');
    if (!$('onboard').hidden) obGo(obStep);
  }

  // Olaylar
  $('continueCard').addEventListener('click', e => { e.stopPropagation(); const l = store.get('lastRead', null); if (l) openSurah(l.s, l.v); });
  document.addEventListener('click', e => {
    const g = e.target.closest('[data-go]'); if (g && !g.disabled) { go(g.dataset.go); return; }
    const tb = e.target.closest('.tabbar button'); if (tb) { tab(tb.dataset.tab); return; }
    const li = e.target.closest('#surahList li'); if (li) openSurah(+li.dataset.s);
  });
  $('barBack').addEventListener('click', back);
  $('locChip').addEventListener('click', () => go('settings'));
  $('langBtn').addEventListener('click', () => { lang = lang === 'tr' ? 'en' : 'tr'; store.set('lang', lang); refresh(); });
  $('compassBtn').addEventListener('click', startCompass);
  $('counter').addEventListener('click', bump);
  $('resetBtn').addEventListener('click', () => { dz.count = 0; store.set('dhikr', dz); renderDhikr(); });
  $('dhikrSel').addEventListener('change', e => { dz.idx = +e.target.value; dz.count = 0; store.set('dhikr', dz); renderDhikr(); });
  $('targetSel').addEventListener('change', e => { dz.target = +e.target.value; store.set('dhikr', dz); renderDhikr(); });
  $('methodSel').addEventListener('change', e => { settings.method = e.target.value; save(); });
  $('madhabSel').addEventListener('change', e => { settings.madhab = e.target.value; save(); });
  $('citySel').addEventListener('change', e => setCity(e.target.value));
  $('gpsBtn').addEventListener('click', () => useGps());
  $('fineBox').addEventListener('change', e => { const k = e.target.dataset.fine; if (k) { settings.fine[k] = +e.target.value; save(); } });
  $('replayOb').addEventListener('click', showOnboarding);
  $('surahSearch').addEventListener('input', renderSurahList);
  $('esmaSearch').addEventListener('input', renderEsma);
  $('rdPrev').addEventListener('click', () => { stack.pop(); openSurah(readerSurah - 1); });
  $('rdNext').addEventListener('click', () => { stack.pop(); openSurah(readerSurah + 1); });
  $('mPrev').addEventListener('click', () => { mOffset--; renderMonth(); });
  $('mNext').addEventListener('click', () => { mOffset++; renderMonth(); });
  // Namaz takibi olayları
  $('homeLog').addEventListener('click', e => { const b = e.target.closest('[data-hp]'); if (!b) return; togglePrayer(dayAt(0), +b.dataset.hp); renderHomeLog(new Date()); });
  $('logList').addEventListener('click', e => { const b = e.target.closest('[data-lp]'); if (!b) return; togglePrayer(dayAt(logDay), +b.dataset.lp); renderLog(); });
  $('logPrev').addEventListener('click', () => { logDay--; renderLog(); });
  $('logNext').addEventListener('click', () => { if (logDay < 0) { logDay++; renderLog(); } });
  // İyilik, isim ve yarışma olayları
  $('deedsList').addEventListener('click', e => {
    const del = e.target.closest('[data-del]');
    if (del) { deeds.custom = deeds.custom.filter(c => c.id !== del.dataset.del); saveDeeds(); renderDeeds(); return; }
    const li = e.target.closest('[data-deed]'); if (!li) return;
    const k = dkey(dayAt(0)), on = deeds.days[k] || [], id = li.dataset.deed;
    deeds.days[k] = on.includes(id) ? on.filter(x => x !== id) : [...on, id];
    if (!deeds.days[k].length) delete deeds.days[k];
    if (navigator.vibrate && deeds.days[k] && deeds.days[k].includes(id)) navigator.vibrate(15);
    saveDeeds(); renderDeeds();
  });
  $('deedAdd').addEventListener('click', () => { const v = $('deedNew').value.trim(); if (!v) return; deeds.custom.push({ id: 'c' + Date.now(), t: v.slice(0, 60) }); $('deedNew').value = ''; saveDeeds(); renderDeeds(); });
  $('deedRemindOn').addEventListener('change', async e => { deeds.remind = e.target.checked; saveDeeds(); if (deeds.remind && LN) { const p = await LN.checkPermissions(); if (p.display !== 'granted') await LN.requestPermissions(); } queueReschedule(); });
  $('nameSearch').addEventListener('input', renderNames);
  $('nameSeg').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; nameG = b.dataset.g; renderNames(); });
  $('quizBox').addEventListener('click', e => {
    const o = e.target.closest('[data-opt]');
    if (o && quiz.picked === null) { quiz.picked = +o.dataset.opt; const cur = quiz.qs[quiz.i]; if (cur.opts[quiz.picked] === cur.q.c) { quiz.score++; if (navigator.vibrate) navigator.vibrate(20); } else if (navigator.vibrate) navigator.vibrate([40, 40, 40]); renderQuiz(); return; }
    if (e.target.id === 'qNext') { quiz.i++; quiz.picked = null; if (quiz.i >= quiz.qs.length && quiz.score > store.get('quizBest', 0)) store.set('quizBest', quiz.score); renderQuiz(); return; }
    if (e.target.id === 'qAgain') { newQuiz(); renderQuiz(); }
  });
  // Ramazan ve nafile olayları
  $('ramTable').addEventListener('click', e => { const td = e.target.closest('[data-rd]'); if (!td || !td.dataset.rd) return; const k = td.dataset.rd; if (fasts.ram[k]) delete fasts.ram[k]; else fasts.ram[k] = 1; saveFasts(); renderRamazan(); });
  $('ramToKaza').addEventListener('click', () => {
    const now = new Date(), r = ramadanRange(now); if (!r || fasts.ramKaza[dkey(r.start)]) return;
    let n = 0;
    for (let k = 0; k < r.days; k++) { const d = new Date(r.start.getFullYear(), r.start.getMonth(), r.start.getDate() + k, 12); if (day0(d) < day0(now) && !fasts.ram[dkey(d)]) n++; }
    kz.left.fast += n; store.set('kaza', kz); fasts.ramKaza[dkey(r.start)] = n; saveFasts(); renderRamazan();
  });
  $('nafileList').addEventListener('click', e => { const b = e.target.closest('[data-nf-day]'); if (!b) return; const k = b.dataset.nfDay; if (fasts.nafile[k]) delete fasts.nafile[k]; else fasts.nafile[k] = 1; saveFasts(); renderNafile(); });
  // Kaza olayları
  document.querySelector('[data-view="kaza"]').addEventListener('click', e => {
    const b = e.target.closest('[data-kz]'); const dn = e.target.closest('[data-kzdone]');
    if (b) { const k = b.dataset.kz; kz.left[k] = Math.max(0, kz.left[k] + +b.dataset.d); saveKz(); }
    if (dn) { const k = dn.dataset.kzdone; if (kz.left[k] > 0) { kz.left[k]--; kz.done[k]++; if (navigator.vibrate) navigator.vibrate(15); saveKz(); } }
  });
  $('kzAdd').addEventListener('click', () => {
    const n = (+$('kzY').value || 0) * 365 + (+$('kzM').value || 0) * 30 + (+$('kzD').value || 0);
    if (n <= 0) return;
    KZ.forEach(k => { if (k !== 'witr' || $('kzWitr').checked) kz.left[k] += n; });
    $('kzMsg').textContent = t('kzAdded')(n * (KZ.length - ($('kzWitr').checked ? 0 : 1)));
    $('kzY').value = $('kzM').value = $('kzD').value = '';
    saveKz();
  });
  $('logToKaza').addEventListener('click', () => {
    const d = dayAt(logDay), k = dkey(d);
    if (kz.fromLog[k]) return;
    let mask = 0;
    FARZ.forEach((p, i) => { if (!isOn(d, i)) { kz.left[p]++; mask |= 1 << i; } });
    kz.fromLog[k] = mask || -1; store.set('kaza', kz); renderLog();
  });
  // Bildirim olayları
  $('nfOn').addEventListener('change', async e => { if (e.target.checked) await enableNotif(); else { nf.on = false; saveNf(); } });
  $('nfList').addEventListener('change', e => { const el = e.target; if (!el.dataset.nf) return; nf[el.dataset.nf][el.dataset.p] = el.checked; saveNf(); });
  $('nfMins').addEventListener('change', e => { nf.mins = +e.target.value; saveNf(); });
  $('nfPermBtn').addEventListener('click', enableNotif);
  $('nfExactBtn').addEventListener('click', async () => { try { await LN.changeExactNotificationSetting(); } catch { /* yoksay */ } await reschedule(); renderNotif(); });
  $('nfTest').addEventListener('click', async () => {
    if (!LN) { $('nfStatus').textContent = t('nfWebOnly'); return; }
    if (!(await enableNotif())) { $('nfStatus').textContent = t('nfDenied'); return; }
    await ensureChannels();
    await LN.schedule({ notifications: [{ id: 9999, title: t('nfTestTitle'), body: t('nfTestBody'), schedule: { at: new Date(Date.now() + 5000), allowWhileIdle: true }, channelId: 'ezan', isExactNotification: await exactGranted() }] });
    $('nfStatus').textContent = t('nfTestSent');
  });
  // Kurulum olayları
  $('obNext').addEventListener('click', () => obGo(obStep + 1));
  $('obBack').addEventListener('click', () => obGo(obStep - 1));
  $('obSkip').addEventListener('click', () => obGo(4));
  $('obNotif').addEventListener('click', async () => { const ok = await enableNotif(); $('obNotifStatus').textContent = ok ? t('nfOnOk') : t('nfDenied'); });
  $('obCity').addEventListener('change', e => { setCity(e.target.value); $('obLocStatus').textContent = t('locOk')(settings.place.name); });
  $('obGps').addEventListener('click', () => { $('obLocStatus').textContent = t('locWait'); useGps(ok => { $('obLocStatus').textContent = ok ? t('locOk')(settings.place.name) : ''; }); });
  $('obMethod').addEventListener('change', e => { settings.method = e.target.value; save(); });
  $('obMadhab').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; settings.madhab = b.dataset.v; save(); });

  // Android geri tuşu
  const CapApp = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App;
  if (CapApp) {
    CapApp.addListener('backButton', () => { if (!back()) CapApp.exitApp(); });
    CapApp.addListener('resume', () => { refresh(); if (cur() === 'notif') renderNotif(); queueReschedule(); });
  }

  refresh();
  render('home');
  loadQuran();
  if (!store.get('onboarded', false)) showOnboarding();
  queueReschedule();
  setInterval(() => { if (cur() === 'home') tick(); }, 1000);
})();
