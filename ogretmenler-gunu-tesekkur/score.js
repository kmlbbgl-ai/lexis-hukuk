// THE SCORE — single source of truth for music AND picture.
// Voiceover (assets/vo.mp3) segment times were measured with ffmpeg silencedetect.
(function () {
  const node = typeof require !== 'undefined';
  const U = node ? require('./engine/util') : globalThis.U;
  const MU = node ? require('./engine/music') : globalThis.MUSIC;
  const { m, makeClock, makeChords } = MU;

  const FPS = 30;
  const FORMAT = U.pickFormat('9:16');
  const [W, H] = U.formatSize(FORMAT);
  const SAFE = U.safeArea(W, H);
  const WIDE = W / H > 1.2;
  const clock = makeClock({ bpm: 96, offset: 0 }); // 1 bar = 2.5s
  const { T, BEAT } = clock;
  const DURATION = 54.5;

  // ---------- voiceover segments [start, end, text] ----------
  const SEG = [
    [0.12, 3.30, 'Gezegenleri kestik… milyonlarca kişi izledi!'],
    [3.76, 6.39, 'Takipçilerimizin çoğu bu videolardan geldi.'],
    [6.94, 9.46, 'Gezegenler de biraz havaya girdi açıkçası.'],
    [9.99, 12.77, 'Sonra Öğretmenler Günü için bir video hazırladık.'],
    [13.25, 14.15, 'Ve bir şey oldu:'],
    [14.74, 17.00, 'öğretmenler bizi takip etmeye başladı.'],
    [17.60, 18.40, 'İtiraf edelim:'],
    [19.00, 21.33, 'milyon izlenmeden daha çok buna sevindik.'],
    [21.79, 24.12, 'Çünkü bir öğretmen bizi takip ediyorsa,'],
    [24.48, 26.92, 'belki yarın bir sınıfta bir çocuk merak edecek.'],
    [27.39, 29.43, 'Gezegenler biraz kıskandı tabii…'],
    [29.79, 30.82, 'Ama onlar da biliyor:'],
    [31.25, 34.06, "Güneş Sistemi'ni herkese bir öğretmen öğretti."],
    [34.43, 36.97, 'Bütün öğretmenlerimiz, iyi ki varsınız!'],
    [37.32, 39.23, 'Öğretmenler Gününüz kutlu olsun!'],
    [39.55, 43.21, 'Şimdi yoklama alıyoruz! Takip etmeyenler "yok" yazılacak!'],
    [43.76, 44.33, 'Bir dakika…'],
    [44.78, 46.35, 'Yoklamada bir kişi daha var.'],
    [46.70, 47.99, 'Büşra, unutmadık!'],
    [48.31, 49.10, 'İyi ki doğdun!'],
    [49.42, 52.55, 'Hadi, yorumlara bir "İyi ki doğdun Büşra" bırakın!'],
  ];
  const vowels = (w) => (w.match(/[aeıioöuüAEIİOÖUÜ]/g) || []).length || 1;
  const subtitles = SEG.map(([t0, t1, text]) => {
    const ws = text.split(' ');
    const wt = ws.map((w) => vowels(w) + 0.6);
    const tot = wt.reduce((a, b) => a + b, 0);
    let acc = t0;
    const words = ws.map((w, i) => { const o = { w, t: acc, end: acc + ((t1 - t0) * wt[i]) / tot }; acc = o.end; return o; });
    return { t: t0, end: t1 + 0.35, text, words };
  });
  const wordAt = (seg, i) => subtitles[seg].words[i].t;

  // ---------- scenes ----------
  const S = {
    slice: [0, 3.6],
    proud: [3.6, 9.8],
    board: [9.8, 17.4],
    child: [17.4, 27.2],
    jealous: [27.2, 34.3],
    celebrate: [34.3, 39.45],
    roll: [39.45, 43.6],
    busra: [43.6, 49.3],
    outro: [49.3, DURATION],
  };

  const ev = {
    slice: 0.9, // knife goes through
    split: 1.05,
    million: wordAt(0, 2), // "milyonlarca"
    shades: wordAt(2, 4), // "havaya girdi" -> sunglasses drop
    boardWrite: 10.1,
    follows: [14.85, 15.35, 15.8, 16.25, 16.7, 17.05],
    bulb: wordAt(9, 7), // "merak"
    huff: 27.45,
    lesson: 29.8,
    apple: 34.43,
    kutlu: 37.32,
    ticks: [39.9, 40.25, 40.6, 40.95, 41.3, 41.65, 42.0, 42.35],
    pluto: 42.8,
    comment1: 43.76,
    comment2: 44.78,
    unutmadik: wordAt(18, 1), // "unutmadık!"
    cake: 48.31,
    typing: 50.3,
    end: 52.7,
  };

  const { chords, chordAt } = makeChords(clock, {
    F: { notes: ['A3', 'C4', 'F4'], bass: 'F2' },
    C: { notes: ['G3', 'C4', 'E4'], bass: 'C2' },
    Dm: { notes: ['A3', 'D4', 'F4'], bass: 'D2' },
    Bb: { notes: ['Bb3', 'D4', 'F4'], bass: 'Bb1' },
  }, Array.from({ length: 23 }, (_, b) => [b, 0, 4, ['F', 'C', 'Dm', 'Bb'][b % 4]]));

  const markers = {
    slice: { t: ev.split, sync: 'v' },
    board: 10.1,
    child: 17.6,
    apple: { t: ev.apple, sync: 'v' },
    roll: 41,
    unutmadik: { t: ev.unutmadik, sync: 'v' },
    cake: { t: ev.cake, sync: 'v' },
    end: 51.5,
  };

  const SCORE = { FPS, FORMAT, W, H, SAFE, WIDE, DURATION, clock, T, BEAT, S, m, chords, chordAt, ev, markers, subtitles, SEG };
  if (node) module.exports = SCORE; else globalThis.SCORE = SCORE;
})();
