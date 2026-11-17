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
      appName: 'Vakit', back: 'Geri', skip: 'Atla', continue: 'Devam et', finish: 'Başla', or: 'veya',
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
      qiblaHint: 'Telefonu düz tutun ve kendi etrafınızda yavaşça dönün. Üstteki ok Kâbe simgesinin üzerine gelince kıbleye dönmüşsünüz demektir.',
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
      appName: 'Vakit', back: 'Back', skip: 'Skip', continue: 'Continue', finish: 'Start', or: 'or',
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
      qiblaHint: 'Hold the phone flat and turn slowly. When the top arrow is over the Kaaba icon, you are facing the qibla.',
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
  const TITLES = { home: 'appName', qibla: 'tabQibla', quran: 'tabQuran', dhikr: 'tabDhikr', menu: 'tabMenu', settings: 'tSettings', monthly: 'tMonthly', days: 'tDays', notif: 'mNotif' };
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

  // ---------------- Kur'an ----------------
  let surahs = null, quran = null, readerSurah = 1;
  const surahName = s => (lang === 'tr' ? s.tr : s.tl);
  async function loadQuran() {
    try {
      const [a, b] = await Promise.all([fetch('data/surahs.json').then(r => r.json()), fetch('data/quran-ar.json').then(r => r.json())]);
      surahs = a; quran = b; renderSurahList(); renderHome();
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
  let qibla = 0, shown = null, wasAligned = false;
  const wrap = a => ((a % 360) + 540) % 360 - 180;
  function renderQibla() {
    qibla = A.Qibla(new A.Coordinates(settings.place.lat, settings.place.lng));
    $('arm').style.transform = `rotate(${qibla}deg)`;
    $('qiblaDeg').textContent = `${t('qiblaFromNorth')} ${Math.round(qibla)}°`;
  }
  function onOrientation(e) {
    let heading = null;
    if (typeof e.webkitCompassHeading === 'number') heading = e.webkitCompassHeading;
    else if (e.absolute && typeof e.alpha === 'number') heading = 360 - e.alpha;
    if (heading === null) return;
    heading = (heading + ((screen.orientation && screen.orientation.angle) || 0) + 360) % 360;
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
    { go: 'monthly', ic: 'i-table', t: 'mMonthly', s: 'mMonthlySub' },
    { go: 'days', ic: 'i-moon', t: 'mDays', s: 'mDaysSub' },
    { go: 'quran', ic: 'i-book', t: 'tabQuran' },
    { go: 'qibla', ic: 'i-qibla', t: 'tabQibla' },
    { go: 'dhikr', ic: 'i-beads', t: 'tabDhikr' },
    { go: 'settings', ic: 'i-gear', t: 'mSettings', s: 'mSettingsSub' },
    { soon: 1, ic: 'i-check', t: 'mPrayerLog' },
    { soon: 1, ic: 'i-cal', t: 'mKaza' }, { soon: 1, ic: 'i-people', t: 'mHatim' },
    { soon: 1, ic: 'i-star', t: 'mEsma' }, { soon: 1, ic: 'i-book', t: 'mDua' }
  ];
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
      if (!nf.on || (await LN.checkPermissions()).display !== 'granted') { $('nfStatus').textContent = t('nfOff'); return 0; }
      await ensureChannels();
      const exact = await exactGranted();
      const now = new Date(), DAYS = 10, list = [];
      for (let d = 0; d < DAYS; d++) {
        const pt = timesFor(new Date(now.getFullYear(), now.getMonth(), now.getDate() + d, 12));
        PRAYERS.forEach((p, i) => {
          const at = pt[p], sun = p === 'sunrise';
          if (nf.at[p] && at > now) list.push({ id: d * 20 + i * 2 + 1, title: sun ? t('nfSunTitle') : t('nfTitle')(t(p)), body: `${settings.place.name} · ${hm(at)}`,
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
  $('rdPrev').addEventListener('click', () => { stack.pop(); openSurah(readerSurah - 1); });
  $('rdNext').addEventListener('click', () => { stack.pop(); openSurah(readerSurah + 1); });
  $('mPrev').addEventListener('click', () => { mOffset--; renderMonth(); });
  $('mNext').addEventListener('click', () => { mOffset++; renderMonth(); });
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
