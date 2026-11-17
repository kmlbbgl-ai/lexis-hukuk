/* Vakit — namaz vakitleri, kıble, zikirmatik. Tüm hesaplamalar cihazda yapılır. */
(() => {
  'use strict';
  const A = window.adhan;

  // ---------- Kalıcı ayarlar (yalnızca bu cihazda) ----------
  const store = {
    get(k, d) { try { const v = localStorage.getItem('vakit.' + k); return v === null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem('vakit.' + k, JSON.stringify(v)); } catch { /* yoksay */ } }
  };

  // ---------- Diller ----------
  const T = {
    tr: {
      appName: 'Vakit', nextPrayer: 'Sonraki vakit', tabTimes: 'Vakitler', tabQibla: 'Kıble', tabDhikr: 'Zikirmatik', tabSettings: 'Ayarlar',
      fajr: 'İmsak', sunrise: 'Güneş', dhuhr: 'Öğle', asr: 'İkindi', maghrib: 'Akşam', isha: 'Yatsı',
      qiblaHint: 'Telefonu düz tutun ve kendi etrafınızda yavaşça dönün. Üstteki ok Kâbe simgesinin üzerine gelince kıbleye dönmüşsünüz demektir.',
      enableCompass: 'Pusulayı başlat', compassNA: 'Bu cihazda pusula yok. Kıble, kuzeyden saat yönünde gösterilen açıdadır.',
      qiblaFromNorth: 'Kuzeyden', reset: 'Sıfırla', total: 'Toplam',
      method: 'Hesaplama yöntemi', madhab: 'İkindi (Asr) hesabı', city: 'Şehir', useGps: 'Konumumu kullan',
      shafi: 'Standart (Diyanet)', hanafi: 'Hanefi (asr-ı sani)',
      privacy: 'Konumunuz yalnızca bu telefonda kullanılır; hiçbir sunucuya gönderilmez.',
      myLocation: 'Konumum', gpsFail: 'Konum alınamadı. Listeden şehir seçebilirsiniz.',
      methodNote: m => `Hesaplama: ${m}. Vakitler Diyanet takviminden 1–2 dakika farklı olabilir.`,
      tomorrow: 'yarın', monthly: 'Aylık namaz vakitleri', day: 'Gün',
      fineTune: 'İnce ayar (dakika) — vakitleri camiinizin takvimine eşitlemek için',
      turnRight: d => `${d}° sağa dönün`, turnLeft: d => `${d}° sola dönün`, aligned: 'Kıbleye döndünüz ✓',
      hijriMonths: ['Muharrem','Safer','Rebiülevvel','Rebiülahir','Cemaziyelevvel','Cemaziyelahir','Recep','Şaban','Ramazan','Şevval','Zilkade','Zilhicce'], hijriSuffix: 'Hicri'
    },
    en: {
      appName: 'Vakit', nextPrayer: 'Next prayer', tabTimes: 'Times', tabQibla: 'Qibla', tabDhikr: 'Tasbih', tabSettings: 'Settings',
      fajr: 'Fajr', sunrise: 'Sunrise', dhuhr: 'Dhuhr', asr: 'Asr', maghrib: 'Maghrib', isha: 'Isha',
      qiblaHint: 'Hold the phone flat and turn slowly. When the top arrow is over the Kaaba icon, you are facing the qibla.',
      enableCompass: 'Start compass', compassNA: 'No compass on this device. The qibla is at the angle shown, clockwise from north.',
      qiblaFromNorth: 'From north', reset: 'Reset', total: 'Total',
      method: 'Calculation method', madhab: 'Asr calculation', city: 'City', useGps: 'Use my location',
      shafi: 'Standard (Shafi, Maliki, Hanbali)', hanafi: 'Hanafi',
      privacy: 'Your location is used only on this phone and is never sent to any server.',
      myLocation: 'My location', gpsFail: 'Could not get your location. Please pick a city from the list.',
      methodNote: m => `Method: ${m}. Times may differ by 1–2 minutes from your local mosque calendar.`,
      tomorrow: 'tomorrow', monthly: 'Monthly prayer times', day: 'Day',
      fineTune: 'Fine-tune (minutes) — to match your local mosque calendar',
      turnRight: d => `Turn ${d}° right`, turnLeft: d => `Turn ${d}° left`, aligned: 'You are facing the qibla ✓',
      hijriMonths: ['Muharram','Safar','Rabi al-Awwal','Rabi al-Thani','Jumada al-Ula','Jumada al-Akhirah','Rajab','Shaban','Ramadan','Shawwal','Dhu al-Qadah','Dhu al-Hijjah'], hijriSuffix: 'AH'
    }
  };
  let lang = store.get('lang', (navigator.language || 'tr').startsWith('tr') ? 'tr' : 'en');
  const t = k => T[lang][k];

  // ---------- Veriler ----------
  const METHODS = {
    Turkey: 'Diyanet (Türkiye)', MuslimWorldLeague: 'Muslim World League', UmmAlQura: 'Umm al-Qura (Makkah)',
    Egyptian: 'Egyptian General Authority', Karachi: 'University of Karachi', NorthAmerica: 'ISNA (North America)',
    Dubai: 'Dubai', Qatar: 'Qatar', Kuwait: 'Kuwait', Singapore: 'Singapore', MoonsightingCommittee: 'Moonsighting Committee'
  };
  const CITIES = [
    ['İstanbul', 41.0082, 28.9784], ['Ankara', 39.9334, 32.8597], ['İzmir', 38.4237, 27.1428], ['Bursa', 40.1885, 29.0610],
    ['Antalya', 36.8969, 30.7133], ['Konya', 37.8746, 32.4932], ['Adana', 37.0000, 35.3213], ['Gaziantep', 37.0662, 37.3833],
    ['Diyarbakır', 37.9144, 40.2306], ['Erzurum', 39.9043, 41.2679], ['Trabzon', 41.0027, 39.7168], ['Samsun', 41.2867, 36.33],
    ['Kayseri', 38.7312, 35.4787], ['Van', 38.4891, 43.4089], ['Mekke / Makkah', 21.4225, 39.8262], ['Medine / Madinah', 24.4672, 39.6111],
    ['London', 51.5074, -0.1278], ['Berlin', 52.52, 13.405], ['Paris', 48.8566, 2.3522], ['Amsterdam', 52.3676, 4.9041],
    ['New York', 40.7128, -74.006], ['Jakarta', -6.2088, 106.8456], ['Kuala Lumpur', 3.139, 101.6869], ['Cairo', 30.0444, 31.2357],
    ['Dubai', 25.2048, 55.2708], ['Karachi', 24.8607, 67.0011], ['Dhaka', 23.8103, 90.4125]
  ];
  const DHIKRS = [
    ['Sübhânallah', 'سُبْحَانَ اللّٰهِ'], ['Elhamdülillah', 'اَلْحَمْدُ لِلّٰهِ'], ['Allâhu Ekber', 'اَللّٰهُ أَكْبَرُ'],
    ['Lâ ilâhe illallah', 'لَا إِلٰهَ إِلَّا اللّٰهُ'], ['Estağfirullah', 'أَسْتَغْفِرُ اللّٰهَ'], ['Salavat', 'اَللّٰهُمَّ صَلِّ عَلٰى مُحَمَّدٍ']
  ];
  const PRAYERS = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'];

  let settings = Object.assign({ method: 'Turkey', madhab: 'Shafi', place: { name: 'İstanbul', lat: 41.0082, lng: 28.9784 }, fine: {} }, store.get('settings', {}));
  settings.fine = settings.fine || {};
  const $ = id => document.getElementById(id);

  // ---------- Namaz vakitleri ----------
  function params() {
    const p = A.CalculationMethod[settings.method]();
    p.madhab = A.Madhab[settings.madhab];
    // Diyanet'in yayımladığı ikindi vakitleri, kütüphanenin Diyanet ayarından ~1 dk sonra
    // (İstanbul ve Ankara, 17.11.2026 karşılaştırması). Bu yüzden ikindiye 1 dk eklenir.
    if (settings.method === 'Turkey') p.methodAdjustments = Object.assign({}, p.methodAdjustments, { asr: p.methodAdjustments.asr + 1 });
    for (const k of PRAYERS) p.adjustments[k] = +(settings.fine[k] || 0);
    return p;
  }
  function timesFor(date) {
    return new A.PrayerTimes(new A.Coordinates(settings.place.lat, settings.place.lng), date, params());
  }
  const fmt = d => d.toLocaleTimeString(lang === 'tr' ? 'tr-TR' : 'en-GB', { hour: '2-digit', minute: '2-digit' });

  function nextPrayer(now) {
    const today = timesFor(now);
    for (const p of PRAYERS) if (p !== 'sunrise' && today[p] > now) return { key: p, time: today[p] };
    const tm = new Date(now); tm.setDate(tm.getDate() + 1);
    return { key: 'fajr', time: timesFor(tm).fajr, tomorrow: true };
  }

  function renderTimes() {
    const now = new Date();
    const pt = timesFor(now);
    const cur = pt.currentPrayer(now);
    $('timesList').innerHTML = PRAYERS.map(p =>
      `<li class="${p === cur ? 'current' : ''}${p === 'sunrise' ? ' muted' : ''}"><span>${t(p)}</span><b>${fmt(pt[p])}</b></li>`).join('');
    $('today').textContent = now.toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    $('methodNote').textContent = t('methodNote')(METHODS[settings.method]);
    $('locName').textContent = settings.place.name;
    $('hijri').textContent = hijriText(now);
    renderMonth(now);
  }

  // Hicri tarih: sayıları cihazdan alıp ay adlarını kendimiz yazıyoruz (bazı telefonlar "MÖ" gibi yanlış ekler gösteriyor).
  // Türkiye için astronomik takvim (Diyanet ile uyumlu), diğer yöntemlerde Ümmü'l-Kurâ.
  function hijriText(date) {
    try {
      const cal = settings.method === 'Turkey' ? 'islamic' : 'islamic-umalqura';
      const parts = new Intl.DateTimeFormat('en-u-ca-' + cal + '-nu-latn', { day: 'numeric', month: 'numeric', year: 'numeric' }).formatToParts(date);
      const get = type => parseInt((parts.find(p => p.type === type) || {}).value, 10);
      const d = get('day'), m = get('month'), y = get('year');
      if (!(y > 1300 && y < 1700 && m >= 1 && m <= 12)) return '';
      return `${d} ${t('hijriMonths')[m - 1]} ${y} ${t('hijriSuffix')}`;
    } catch { return ''; }
  }

  function renderMonth(now) {
    const loc = lang === 'tr' ? 'tr-TR' : 'en-GB';
    const y = now.getFullYear(), m = now.getMonth();
    const days = new Date(y, m + 1, 0).getDate();
    let rows = `<tr><th>${t('day')}</th>${PRAYERS.map(p => `<th>${t(p)}</th>`).join('')}</tr>`;
    for (let d = 1; d <= days; d++) {
      const date = new Date(y, m, d, 12);
      const pt = timesFor(date);
      rows += `<tr class="${d === now.getDate() ? 'today' : ''}"><td>${date.toLocaleDateString(loc, { day: '2-digit', month: '2-digit' })}</td>${PRAYERS.map(p => `<td>${fmt(pt[p])}</td>`).join('')}</tr>`;
    }
    $('monthTable').innerHTML = rows;
  }

  function tick() {
    const now = new Date();
    const n = nextPrayer(now);
    let s = Math.max(0, Math.floor((n.time - now) / 1000));
    const hh = String(Math.floor(s / 3600)).padStart(2, '0'); s %= 3600;
    const mm = String(Math.floor(s / 60)).padStart(2, '0');
    const ss = String(s % 60).padStart(2, '0');
    $('nextName').textContent = t(n.key) + (n.tomorrow ? ` (${t('tomorrow')})` : '') + ' · ' + fmt(n.time);
    $('nextCount').textContent = `${hh}:${mm}:${ss}`;
    if (now.getSeconds() === 0) renderTimes(); // vakit geçişlerinde listeyi güncelle
  }

  // ---------- Kıble ----------
  let qibla = 0;
  function renderQibla() {
    qibla = A.Qibla(new A.Coordinates(settings.place.lat, settings.place.lng));
    $('arm').style.transform = `rotate(${qibla}deg)`;
    $('qiblaDeg').textContent = `${t('qiblaFromNorth')} ${Math.round(qibla)}°`;
  }
  // Pusula: titremeyi yumuşatır ve 359°→0° geçişinde kadranın bir tur dönmesini engeller.
  let shown = null, wasAligned = false;
  const wrap = a => ((a % 360) + 540) % 360 - 180; // -180..180
  function onOrientation(e) {
    let heading = null;
    if (typeof e.webkitCompassHeading === 'number') heading = e.webkitCompassHeading; // iOS
    else if (e.absolute && typeof e.alpha === 'number') heading = 360 - e.alpha;      // Android
    if (heading === null) return;
    const so = (screen.orientation && screen.orientation.angle) || 0;
    heading = (heading + so + 360) % 360;
    if (shown === null) shown = heading;
    else shown += wrap(heading - shown) * 0.2; // yumuşatma
    $('dial').style.transform = `rotate(${-shown}deg)`;
    const diff = wrap(qibla - shown); // + ise sağa dönülmeli
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
    } catch {
      $('qiblaHint').textContent = t('compassNA');
    }
  }

  // ---------- Zikirmatik ----------
  let dz = Object.assign({ idx: 0, count: 0, target: 33, total: 0 }, store.get('dhikr', {}));
  function renderDhikr() {
    $('dhikrSel').innerHTML = DHIKRS.map((d, i) => `<option value="${i}" ${i === dz.idx ? 'selected' : ''}>${d[0]} — ${d[1]}</option>`).join('');
    $('targetSel').value = String(dz.target);
    $('count').textContent = dz.count;
    $('target').textContent = dz.target ? `/ ${dz.target}` : '';
    $('total').textContent = dz.total;
    $('counter').classList.toggle('done', dz.target > 0 && dz.count >= dz.target);
  }
  function bump() {
    dz.count++; dz.total++;
    if (dz.target && dz.count === dz.target) { if (navigator.vibrate) navigator.vibrate([80, 60, 80]); }
    else if (navigator.vibrate) navigator.vibrate(15);
    store.set('dhikr', dz); renderDhikr();
  }

  // ---------- Ayarlar ----------
  function renderSettings() {
    $('methodSel').innerHTML = Object.entries(METHODS).map(([k, v]) => `<option value="${k}" ${k === settings.method ? 'selected' : ''}>${v}</option>`).join('');
    $('madhabSel').value = settings.madhab;
    const inList = CITIES.some(c => c[0] === settings.place.name);
    $('citySel').innerHTML = (inList ? '' : `<option selected>${settings.place.name}</option>`) +
      CITIES.map(c => `<option ${c[0] === settings.place.name ? 'selected' : ''}>${c[0]}</option>`).join('');
  }
  function renderFine() {
    const opts = v => Array.from({ length: 21 }, (_, i) => i - 10).map(n => `<option value="${n}" ${n === v ? 'selected' : ''}>${n > 0 ? '+' + n : n}</option>`).join('');
    $('fineBox').innerHTML = PRAYERS.map(p => `<label>${t(p)}<select data-fine="${p}">${opts(+(settings.fine[p] || 0))}</select></label>`).join('');
  }
  function save() { store.set('settings', settings); renderAll(); }
  function useGps() {
    if (!navigator.geolocation) return alert(t('gpsFail'));
    navigator.geolocation.getCurrentPosition(
      pos => { settings.place = { name: t('myLocation'), lat: pos.coords.latitude, lng: pos.coords.longitude }; save(); },
      () => alert(t('gpsFail')), { enableHighAccuracy: false, timeout: 15000, maximumAge: 600000 });
  }

  // ---------- Genel ----------
  function applyLang() {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => { const v = T[lang][el.dataset.i18n]; if (typeof v === 'string') el.textContent = v; });
    $('langBtn').textContent = lang === 'tr' ? 'EN' : 'TR';
  }
  function renderAll() { applyLang(); renderTimes(); tick(); renderQibla(); renderDhikr(); renderSettings(); renderFine(); }
  const tabHistory = [];
  let currentTab = 'times';
  function showTab(name, fromBack) {
    if (name === currentTab) return;
    if (!fromBack) tabHistory.push(currentTab);
    currentTab = name;
    document.querySelectorAll('.tab').forEach(s => s.classList.toggle('active', s.id === 'tab-' + name));
    document.querySelectorAll('.bottom button').forEach(b => b.classList.toggle('active', b.dataset.tab === name));
  }

  document.querySelectorAll('.bottom button').forEach(b => b.addEventListener('click', () => showTab(b.dataset.tab)));
  $('locBtn').addEventListener('click', () => showTab('settings'));
  $('langBtn').addEventListener('click', () => { lang = lang === 'tr' ? 'en' : 'tr'; store.set('lang', lang); renderAll(); });
  $('compassBtn').addEventListener('click', startCompass);
  $('counter').addEventListener('click', bump);
  $('resetBtn').addEventListener('click', () => { dz.count = 0; store.set('dhikr', dz); renderDhikr(); });
  $('dhikrSel').addEventListener('change', e => { dz.idx = +e.target.value; dz.count = 0; store.set('dhikr', dz); renderDhikr(); });
  $('targetSel').addEventListener('change', e => { dz.target = +e.target.value; store.set('dhikr', dz); renderDhikr(); });
  $('methodSel').addEventListener('change', e => { settings.method = e.target.value; save(); });
  $('madhabSel').addEventListener('change', e => { settings.madhab = e.target.value; save(); });
  $('citySel').addEventListener('change', e => { const c = CITIES.find(x => x[0] === e.target.value); if (c) { settings.place = { name: c[0], lat: c[1], lng: c[2] }; save(); } });
  $('gpsBtn').addEventListener('click', useGps);
  $('fineBox').addEventListener('change', e => { const k = e.target.dataset.fine; if (k) { settings.fine[k] = +e.target.value; save(); } });

  // Android geri tuşu: önce bir önceki sekmeye döner, ana ekrandayken uygulamadan çıkar.
  const CapApp = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App;
  if (CapApp) {
    CapApp.addListener('backButton', () => {
      if (tabHistory.length) showTab(tabHistory.pop(), true);
      else if (currentTab !== 'times') showTab('times', true);
      else CapApp.exitApp();
    });
  }

  renderAll();
  setInterval(tick, 1000);
})();
