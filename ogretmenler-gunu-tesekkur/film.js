// THE FILM — Öğretmenler Günü teşekkür videosu. Every visual is a pure function of t.
(function () {
  const U = globalThis.U, G = globalThis.G, Ch = globalThis.Ch, S = globalThis.SCORE, Studio = globalThis.Studio, Subs = globalThis.Subs, UI = globalThis.UI;
  const { ev, clock } = S;
  const { clamp, lerp, ease, pulse } = U;
  const W = G.W, H = G.H, CX = W / 2;
  const SAFE = G.SAFE;
  const pop = (t, t0, d = 0.3) => ease.outBack(clamp((t - t0) / d), 2.2);
  const fade = (t, t0, d = 0.3) => clamp((t - t0) / d);
  const hop = (t, amp) => amp * Math.abs(Math.sin(Math.PI * clock.phase(t)));
  const INK = '#2A2320', CREAM = '#F6F0E2', GOLD = '#F2B84B', RED = '#D9483B', TEAL = '#3D7A74';

  // ---------------- backgrounds ----------------
  function space(ctx, t, top = '#141A3E', bot = '#2E2A5C') {
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, top); g.addColorStop(1, bot);
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    for (let i = 0; i < 90; i++) {
      const x = U.hash(i, 1) * W, y = U.hash(i, 2) * H, r = 1.5 + U.hash(i, 3) * 3;
      const tw = 0.5 + 0.5 * Math.sin(t * (1 + U.hash(i, 4) * 2) + i);
      ctx.fillStyle = `rgba(255,245,215,${0.25 + 0.6 * tw})`;
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    }
  }
  function warm(ctx, t) {
    const g = ctx.createRadialGradient(CX, H * 0.4, 50, CX, H * 0.45, H * 0.8);
    g.addColorStop(0, '#FFE9C7'); g.addColorStop(1, '#E9A97A');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  }
  function paperBg(ctx, c = '#F4EDE0') { G.bg(ctx, c); }

  // ---------------- props ----------------
  const PLANETS = [
    { name: 'Merkür', c: '#A89F94' }, { name: 'Venüs', c: '#E3B866' }, { name: 'Dünya', c: '#3F86C9', land: '#4FA35B' },
    { name: 'Mars', c: '#D2603A' }, { name: 'Jüpiter', c: '#D9A273', band: '#B5774E' }, { name: 'Satürn', c: '#E8CF95', ring: true },
    { name: 'Uranüs', c: '#8FD3DE' }, { name: 'Neptün', c: '#3E5FC4' },
  ];

  // a cute planet with a face
  function planet(ctx, x, y, r, p, o = {}) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(o.sx || 1, o.sy || 1);
    const seed = o.seed || 1;
    if (p.ring) G.ellipse(ctx, 0, 0, r * 1.75, r * 0.42, { fill: 'rgba(0,0,0,0)', stroke: '#C9A867', lw: 9, seed: seed + 50 });
    G.ellipse(ctx, 0, 0, r, r, { fill: p.c, seed, hatch: { color: 'rgba(0,0,0,0.16)', gap: 9 } });
    if (p.band) for (const k of [-0.35, 0.15, 0.5]) G.line(ctx, [[-r * Math.sqrt(1 - k * k) * 0.95, k * r], [r * Math.sqrt(1 - k * k) * 0.95, k * r]], { color: p.band, lw: r * 0.1, seed: seed + k * 10 });
    if (p.land) { G.ellipse(ctx, -r * 0.35, -r * 0.3, r * 0.3, r * 0.22, { fill: p.land, lw: 3, seed: seed + 3 }); G.ellipse(ctx, r * 0.4, r * 0.35, r * 0.25, r * 0.3, { fill: p.land, lw: 3, seed: seed + 4 }); }
    if (p.ring) { // front half of the ring
      ctx.save(); ctx.beginPath(); ctx.rect(-r * 2, 0, r * 4, r); ctx.clip();
      G.ellipse(ctx, 0, 0, r * 1.75, r * 0.42, { fill: 'rgba(0,0,0,0)', stroke: '#C9A867', lw: 9, seed: seed + 50 });
      ctx.restore();
    }
    if (o.face !== false) face(ctx, r, o);
    if (o.hat) { // party hat
      G.poly(ctx, [[-r * 0.32, -r * 0.88], [r * 0.32, -r * 0.88], [0, -r * 1.7]], { fill: '#E8718D', lw: 4, seed: seed + 9 });
      G.ellipse(ctx, 0, -r * 1.72, r * 0.1, r * 0.1, { fill: GOLD, lw: 3 });
    }
    ctx.restore();
  }
  function face(ctx, r, o) {
    const ey = -r * 0.12 + (o.lookY || 0) * r * 0.05, ex = r * 0.3, er = r * 0.17;
    const lx = (o.look || 0) * er * 0.4, ly = (o.lookY || 0) * er * 0.4;
    if (o.shades) {
      const sy = ey - (1 - o.shades) * r * 1.4;
      ctx.save(); ctx.globalAlpha = Math.min(1, o.shades * 3);
      G.rrect(ctx, -ex - er * 1.3, sy - er * 0.9, er * 2.6, er * 1.8, er * 0.6, { fill: '#1B1B22', lw: 4, seed: 7 });
      G.rrect(ctx, ex - er * 1.3, sy - er * 0.9, er * 2.6, er * 1.8, er * 0.6, { fill: '#1B1B22', lw: 4, seed: 8 });
      G.line(ctx, [[-ex + er * 1.3, sy - er * 0.3], [ex - er * 1.3, sy - er * 0.3]], { color: '#1B1B22', lw: 6 });
      ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.fillRect(-ex - er * 0.9, sy - er * 0.6, er * 0.5, er * 0.25); ctx.fillRect(ex - er * 0.9, sy - er * 0.6, er * 0.5, er * 0.25);
      ctx.restore();
    }
    if (!o.shades || o.shades < 0.95) {
      for (const s of [-1, 1]) {
        const x = s * ex;
        if (o.eyes === 'happy') G.line(ctx, [[x - er, ey + er * 0.2], [x, ey - er * 0.6], [x + er, ey + er * 0.2]], { color: INK, lw: 6, seed: s + 3 });
        else if (o.eyes === 'closed') G.line(ctx, [[x - er, ey], [x, ey + er * 0.5], [x + er, ey]], { color: INK, lw: 6, seed: s + 3 });
        else {
          const sq = o.eyes === 'grumpy' ? 0.55 : 1;
          G.ellipse(ctx, x, ey, er, er * sq, { fill: '#fff', lw: 4, seed: s + 5 });
          ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(x + lx, ey + ly * sq, er * 0.5 * sq + 1, 0, Math.PI * 2); ctx.fill();
        }
        if (o.eyes === 'grumpy') G.line(ctx, [[x - s * er * 1.2, ey - er * 1.3], [x + s * er * 0.9, ey - er * 0.6]], { color: INK, lw: 7, seed: s + 9 });
      }
    }
    const my = r * 0.32;
    if (o.mouth === 'open') G.ellipse(ctx, 0, my, r * 0.14, r * 0.12, { fill: '#7A2B2B', lw: 4 });
    else if (o.mouth === 'pout') G.line(ctx, [[-r * 0.12, my + 4], [0, my - 6], [r * 0.12, my + 4]], { color: INK, lw: 6 });
    else if (o.mouth === 'smirk') G.line(ctx, [[-r * 0.15, my], [r * 0.05, my + 6], [r * 0.2, my - 8]], { color: INK, lw: 6 });
    else G.line(ctx, [[-r * 0.18, my - 4], [0, my + 10], [r * 0.18, my - 4]], { color: INK, lw: 6 });
    if (o.blush) for (const s of [-1, 1]) { ctx.fillStyle = `rgba(232,113,141,${0.45 * o.blush})`; ctx.beginPath(); ctx.ellipse(s * r * 0.5, r * 0.15, r * 0.12, r * 0.07, 0, 0, Math.PI * 2); ctx.fill(); }
  }

  function apple(ctx, x, y, r, seed = 1) {
    G.line(ctx, [[x, y - r * 0.75], [x + r * 0.08, y - r * 1.15]], { color: '#6B4226', lw: r * 0.09, seed });
    G.shape(ctx, G.ellPts(x + r * 0.28, y - r * 1.0, r * 0.28, r * 0.13), { fill: '#4FA35B', lw: 4, seed: seed + 1 });
    G.shape(ctx, G.ellPts(x - r * 0.42, y, r * 0.62, r * 0.85), { fill: RED, lw: 5, seed: seed + 2, hatch: { color: 'rgba(0,0,0,0.15)', gap: 9 } });
    G.shape(ctx, G.ellPts(x + r * 0.42, y, r * 0.62, r * 0.85), { fill: RED, lw: 5, seed: seed + 3, hatch: { color: 'rgba(0,0,0,0.15)', gap: 9 } });
    ctx.fillStyle = 'rgba(255,255,255,0.55)'; ctx.beginPath(); ctx.ellipse(x - r * 0.5, y - r * 0.3, r * 0.12, r * 0.25, -0.4, 0, Math.PI * 2); ctx.fill();
  }


  // flower bouquet: (x, y) = centre of the blooms, r = overall size
  function bouquet(ctx, x, y, r, seed = 1) {
    // stems + wrapping cone
    for (let i = -2; i <= 2; i++) G.line(ctx, [[x + i * r * 0.12, y], [x + i * r * 0.03, y + r * 1.1]], { color: '#4F8A3B', lw: r * 0.05, seed: seed + i });
    for (const s of [-1, 1]) G.shape(ctx, G.ellPts(x + s * r * 0.55, y + r * 0.15, r * 0.32, r * 0.13), { fill: '#5FA34A', lw: 4, seed: seed + 20 + s });
    G.poly(ctx, [[x - r * 0.75, y + r * 0.15], [x + r * 0.75, y + r * 0.15], [x + r * 0.12, y + r * 1.35], [x - r * 0.12, y + r * 1.35]], { fill: '#F6E7C8', lw: 5, seed: seed + 30, hatch: { color: 'rgba(160,110,60,0.18)', gap: 10 } });
    G.poly(ctx, [[x - r * 0.75, y + r * 0.15], [x - r * 0.2, y + r * 0.15], [x - r * 0.05, y + r * 1.35], [x - r * 0.12, y + r * 1.35]], { fill: '#EED7A8', lw: 4, seed: seed + 31 });
    // ribbon
    G.ellipse(ctx, x - r * 0.18, y + r * 0.88, r * 0.17, r * 0.09, { fill: '#D9483B', lw: 4, seed: seed + 40 });
    G.ellipse(ctx, x + r * 0.18, y + r * 0.88, r * 0.17, r * 0.09, { fill: '#D9483B', lw: 4, seed: seed + 41 });
    G.ellipse(ctx, x, y + r * 0.88, r * 0.07, r * 0.07, { fill: '#B5362B', lw: 3, seed: seed + 42 });
    // blooms
    const F = [[-0.42, -0.05, '#E8718D'], [0.42, -0.02, '#F2B84B'], [0, -0.38, '#D9483B'], [-0.22, -0.58, '#F6F0E2'], [0.25, -0.55, '#E8718D'], [0, 0.05, '#F6F0E2'], [-0.55, -0.4, '#B28DE0'], [0.56, -0.38, '#B28DE0']];
    F.forEach(([dx, dy, c], i) => {
      const fx = x + dx * r, fy = y + dy * r, pr = r * 0.13;
      for (let k = 0; k < 6; k++) { const a = (k / 6) * Math.PI * 2 + i; G.ellipse(ctx, fx + Math.cos(a) * pr, fy + Math.sin(a) * pr, pr * 0.85, pr * 0.85, { fill: c, lw: 3, seed: seed + 50 + i * 7 + k }); }
      G.ellipse(ctx, fx, fy, pr * 0.6, pr * 0.6, { fill: c === '#F2B84B' ? '#B5774E' : '#F2B84B', lw: 3, seed: seed + 99 + i });
    });
  }

  function title(ctx, str, x, y, size, o = {}) {
    G.text(ctx, str, x, y, { size, fam: o.fam || 'Bungee', color: o.color || CREAM, align: 'center', stroke: o.stroke ?? INK, strokeW: o.strokeW ?? size * 0.12, alpha: o.alpha ?? 1 });
  }
  function popText(ctx, t, t0, str, x, y, size, o = {}) {
    const p = pop(t, t0); if (p <= 0) return;
    ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(p, p);
    title(ctx, str, 0, 0, size, o); ctx.restore();
  }

  function chalkboard(ctx, x, y, w, h) {
    G.rrect(ctx, x - 18, y - 18, w + 36, h + 36, 14, { fill: '#8A5A34', lw: 5, seed: 31, hatch: { color: 'rgba(0,0,0,0.2)', gap: 7 } });
    ctx.fillStyle = '#2F5A46'; ctx.fillRect(x, y, w, h);
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    for (let i = 0; i < 30; i++) ctx.fillRect(x + U.hash(i, 9) * w, y + U.hash(i, 8) * h, 60 + U.hash(i, 7) * 120, 3);
  }
  function chalkText(ctx, str, x, y, size, t, t0, dur, color = '#F4F1E6') {
    const p = clamp((t - t0) / dur); if (p <= 0) return;
    const w = G.measure(ctx, str, size, 'Caveat', 700);
    ctx.save(); ctx.beginPath(); ctx.rect(x - w / 2 - 10, y - size, (w + 20) * p, size * 1.6); ctx.clip();
    G.text(ctx, str, x, y, { size, fam: 'Caveat', weight: 700, color, align: 'center' });
    ctx.restore();
  }

  function card(ctx, x, y, w, h, o = {}) {
    ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.25)'; ctx.shadowBlur = 24; ctx.shadowOffsetY = 8;
    ctx.fillStyle = o.fill || '#FFFFFF'; ctx.beginPath(); ctx.roundRect(x, y, w, h, o.r ?? 28); ctx.fill(); ctx.restore();
  }
  function avatar(ctx, x, y, r, letter, color) {
    ctx.fillStyle = color; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    UI.text(ctx, letter, x, y + r * 0.38, { size: r * 1.05, weight: 800, color: '#fff', align: 'center' });
  }

  // ---------------- scenes ----------------
  const MARS = { c: '#D2603A' };
  function sceneSlice(ctx, t) {
    space(ctx, t);
    const x = CX, y = 820, r = 300;
    if (t < ev.split) {
      planet(ctx, x, y, r, MARS, { eyes: t > ev.slice - 0.4 ? 'closed' : 'normal', mouth: t > ev.slice - 0.4 ? 'pout' : 'smile', lookY: -1, seed: 3 });
    } else {
      const d = ease.outCubic(clamp((t - ev.split) / 0.5)) * 150;
      const layers = [['#8E3B22', 1], ['#E0703E', 0.78], ['#F2B84B', 0.5], ['#FFF4C2', 0.26]];
      for (const s of [-1, 1]) {
        ctx.save(); ctx.translate(x + s * d, y); ctx.rotate(s * 0.08 * clamp((t - ev.split) / 0.5));
        ctx.beginPath(); ctx.rect(s < 0 ? -r - 40 : 0, -r - 40, r + 40, 2 * r + 80); ctx.clip();
        for (const [c, k] of layers) G.ellipse(ctx, 0, 0, r * k, r * k, { fill: c, lw: 5, seed: 20 + k * 10 + s });
        ctx.restore();
      }
      const gl = ctx.createRadialGradient(x, y, 0, x, y, 260);
      gl.addColorStop(0, `rgba(255,230,150,${0.6 * Math.exp(-(t - ev.split) * 2)})`); gl.addColorStop(1, 'rgba(255,230,150,0)');
      ctx.fillStyle = gl; ctx.fillRect(x - 300, y - 300, 600, 600);
    }
    // knife
    const kp = clamp((t - (ev.slice - 0.35)) / 0.55);
    if (kp > 0 && kp < 1) {
      const ky = lerp(250, 1400, ease.inOutQuad(kp));
      G.poly(ctx, [[x - 14, ky - 380], [x + 14, ky - 380], [x + 14, ky], [x, ky + 40], [x - 14, ky]], { fill: '#D7DCE3', lw: 4, seed: 40 });
      G.rrect(ctx, x - 22, ky - 600, 44, 220, 14, { fill: '#5A3A22', lw: 4, seed: 41 });
    }
    if (t >= ev.million - 0.05) {
      popText(ctx, t, ev.million - 0.05, '1.000.000+', CX, 380, 120, { color: GOLD, rot: -0.04 });
      popText(ctx, t, ev.million + 0.2, 'İZLENME', CX, 470, 64, { rot: -0.04 });
    }
  }

  function sceneProud(ctx, t) {
    space(ctx, t, '#1B2150', '#3A2F66');
    // rising chart of followers
    const bars = 6, bx = 190, by = 640, bw = 90;
    G.text(ctx, 'TAKİPÇİLER', CX, 330, { size: 70, fam: 'Bungee', color: GOLD, align: 'center', stroke: INK, strokeW: 8 });
    for (let i = 0; i < bars; i++) {
      const h = (60 + i * i * 14) * ease.outBack(clamp((t - S.S.proud[0] - 0.15 * i) / 0.5), 1.6);
      G.rrect(ctx, bx + i * (bw + 30), by - h, bw, h, 10, { fill: i === bars - 1 ? GOLD : '#E8718D', lw: 4, seed: 60 + i });
    }
    G.line(ctx, [[bx - 20, by], [bx + bars * (bw + 30), by]], { color: CREAM, lw: 5 });
    const ap = clamp((t - S.S.proud[0] - 0.9) / 0.6);
    if (ap > 0) G.line(ctx, [[bx, by - 120], [lerp(bx, 880, ap), lerp(by - 120, 260, ap)]], { color: CREAM, lw: 10, seed: 70 });
    // planets lining up, bopping; sunglasses drop on "havaya girdi"
    const list = [PLANETS[2], PLANETS[3], PLANETS[5], PLANETS[4], PLANETS[7]];
    list.forEach((p, i) => {
      const x = 150 + i * 195, r = p.ring ? 62 : 75;
      const sh = clamp((t - ev.shades - i * 0.12) / 0.35);
      const smug = sh >= 1;
      const y = 1020 - hop(t + i * 0.1, smug ? 10 : 25);
      planet(ctx, x, y, r, p, { shades: sh > 0 ? ease.outBounce(sh) : 0, mouth: smug ? 'smirk' : 'smile', eyes: 'happy', rot: smug ? -0.15 + 0.05 * Math.sin(t * 3 + i) : 0, seed: 80 + i });
    });
    if (t > ev.shades + 0.6) G.caption(ctx, { t: ev.shades + 0.6, end: 99, text: 'havalı gezegenler', x: 560, y: 1170, rot: -0.04, size: 58 }, t);
  }

  function sceneBoard(ctx, t) {
    paperBg(ctx, '#EFE3CC');
    const up = ease.inOutCubic(clamp((t - 14.4) / 0.6));
    const bw = 900, bh = lerp(560, 330, up), bx = CX - bw / 2, by = lerp(420, 250, up);
    chalkboard(ctx, bx, by, bw, bh);
    const ts = lerp(1, 0.7, up);
    ctx.save(); ctx.translate(CX, by + bh / 2); ctx.scale(ts, ts);
    chalkText(ctx, 'Öğretmenler Günü', 0, -90, 110, t, ev.boardWrite, 1.1);
    chalkText(ctx, 'neden 24 Kasım?', 0, 40, 110, t, ev.boardWrite + 1.1, 1.1, GOLD);
    if (t > ev.boardWrite + 2.4) chalkText(ctx, 'ABC', 0, 170, 80, t, ev.boardWrite + 2.4, 0.6);
    ctx.restore();
    if (t < 14.4) bouquet(ctx, bx + bw - 40, by + bh - 10, 70, 5);
    // follow notifications
    ev.follows.forEach((tf, i) => {
      const p = pop(t, tf, 0.35); if (p <= 0) return;
      const y = 660 + i * 125;
      ctx.save(); ctx.translate(CX, y + 50); ctx.scale(p, p); ctx.translate(-CX, -(y + 50));
      card(ctx, 90, y, 900, 104, { r: 26 });
      ctx.fillStyle = '#FDECEA'; ctx.beginPath(); ctx.arc(150, y + 52, 36, 0, Math.PI * 2); ctx.fill();
      bouquet(ctx, 150, y + 44, 30, 90 + i);
      UI.text(ctx, 'Bir öğretmen', 205, y + 44, { size: 32, weight: 800, color: '#111' });
      UI.text(ctx, 'seni takip etmeye başladı', 205, y + 82, { size: 30, weight: 400, color: '#444' });
      ctx.fillStyle = '#4F5BD5'; ctx.beginPath(); ctx.roundRect(800, y + 30, 160, 46, 12); ctx.fill();
      UI.text(ctx, 'Takip et', 880, y + 62, { size: 26, weight: 700, color: '#fff', align: 'center' });
      ctx.restore();
    });
  }

  function sceneChild(ctx, t) {
    warm(ctx, t);
    const t0 = S.S.child[0];
    if (t < 21.6) {
      // the big heart: happier than a million views
      const s = 1 + 0.06 * Math.sin(t * 7) + 0.25 * pulse(t, 19.0, 3);
      ctx.save(); ctx.translate(CX, 800); ctx.scale(s * 14 * pop(t, t0 + 0.1, 0.5), s * 14 * pop(t, t0 + 0.1, 0.5));
      G.heart(ctx, 0, 0, 1);
      ctx.restore();
      popText(ctx, t, 19.0, 'MİLYON İZLENMEDEN', CX, 380, 64, { color: CREAM });
      popText(ctx, t, 19.6, 'DAHA ÇOK SEVİNDİK', CX, 470, 64, { color: GOLD });
      return;
    }
    // classroom: a child watches the planet video and starts wondering
    const enter = pop(t, 21.6, 0.4);
    ctx.save(); ctx.globalAlpha = clamp((t - 21.6) / 0.25);
    chalkboard(ctx, 120, 300, 840, 380);
    chalkText(ctx, 'Merak = Bilim', CX, 520, 100, t, 22.0, 1.0);
    // desk
    G.rrect(ctx, 220, 1090, 640, 40, 8, { fill: '#B07B4C', lw: 5, seed: 101 });
    G.line(ctx, [[260, 1130], [260, 1290]], { color: INK, lw: 10 }); G.line(ctx, [[820, 1130], [820, 1290]], { color: INK, lw: 10 });
    Ch.person(ctx, {
      x: CX, y: 1120, pose: 'sit', s: 0.95 * enter,
      eyes: t > ev.bulb ? 'wide' : 'normal', mouth: t > ev.bulb ? 'o' : 'smile', brows: t > ev.bulb ? 'up' : 'neutral', lookY: 0.6,
      handL: [CX - 90, 1060], handR: [CX + 90, 1060],
      style: { hairStyle: 'ponytail', hair: '#3B2416', outfit: 'tee', shirt: '#3D7A74', bottoms: 'pants', shorts: '#27305C', skin: '#E9B98F' },
    });
    // tablet with a sliced planet on it
    G.rrect(ctx, CX - 110, 1000, 220, 140, 14, { fill: '#222', lw: 4, seed: 105 });
    ctx.fillStyle = '#141A3E'; ctx.fillRect(CX - 98, 1012, 196, 116);
    for (const s of [-1, 1]) { ctx.save(); ctx.beginPath(); ctx.rect(s < 0 ? CX - 98 : CX + 4, 1012, 94, 116); ctx.clip();
      for (const [c, k] of [['#8E3B22', 44], ['#E0703E', 32], ['#F2B84B', 18]]) { ctx.fillStyle = c; ctx.beginPath(); ctx.arc(CX + s * 8, 1070, k, 0, Math.PI * 2); ctx.fill(); }
      ctx.restore(); }
    ctx.restore();
    // light bulb + question marks on "merak"
    if (t > ev.bulb - 0.05) {
      const p = pop(t, ev.bulb - 0.05, 0.35);
      const bx = CX + 10, by = 760;
      G.rays(ctx, bx, by, { n: 12, r0: 80 * p, r1: 140 * p, color: GOLD, lw: 7, alpha: 0.9, spin: t * 0.5 });
      G.ellipse(ctx, bx, by, 60 * p, 64 * p, { fill: '#FFE27A', lw: 5, seed: 110 });
      G.rrect(ctx, bx - 26 * p, by + 55 * p, 52 * p, 34 * p, 6, { fill: '#9AA3AE', lw: 4, seed: 111 });
      popText(ctx, t, ev.bulb + 0.3, '?', bx - 190, by + 40, 110, { color: GOLD, rot: -0.2 });
      popText(ctx, t, ev.bulb + 0.5, '?', bx + 190, by - 20, 90, { color: CREAM, rot: 0.2 });
    }
  }

  function sceneJealous(ctx, t) {
    if (t < ev.lesson) {
      space(ctx, t, '#2A1E44', '#4A2E58');
      const list = [PLANETS[2], PLANETS[5], PLANETS[4]];
      list.forEach((p, i) => {
        const x = 230 + i * 310, r = p.ring ? 95 : 115;
        const puff = 1 + 0.08 * Math.sin(t * 9 + i);
        planet(ctx, x, 880 + (i === 1 ? -40 : 0), r, p, { eyes: 'grumpy', mouth: 'pout', look: i === 0 ? 1 : i === 2 ? -1 : 0, sx: puff, sy: 2 - puff, rot: (i - 1) * 0.12, seed: 120 + i });
      });
      popText(ctx, t, ev.huff + 0.1, 'HMPF!', 300, 560, 100, { color: '#E8718D', rot: -0.12 });
      popText(ctx, t, ev.huff + 0.6, 'kıskançlık', 760, 640, 64, { fam: 'Caveat', rot: 0.08, color: CREAM, strokeW: 0 });
      return;
    }
    // lesson: the planets as students in front of the board, a teacher pointing
    paperBg(ctx, '#EFE3CC');
    chalkboard(ctx, 110, 280, 860, 520);
    const sx = 250, sy = 540;
    ctx.save(); ctx.globalAlpha = 0.9;
    G.ellipse(ctx, sx, sy, 70, 70, { fill: GOLD, lw: 4, seed: 130 });
    for (let i = 0; i < 4; i++) { ctx.strokeStyle = 'rgba(244,241,230,0.55)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(sx, sy, 130 + i * 160, 60 + i * 50, 0, -0.9, 0.9); ctx.stroke(); }
    ctx.restore();
    chalkText(ctx, 'Güneş Sistemi', 640, 380, 80, t, ev.lesson + 0.2, 1.0);
    [[380, 560, '#3F86C9'], [540, 520, '#D2603A'], [700, 600, '#D9A273'], [860, 520, '#E8CF95']].forEach(([x, y, c], i) => {
      if (t > ev.lesson + 1.2 + i * 0.25) { ctx.fillStyle = c; ctx.beginPath(); ctx.arc(x, y, 18 + i * 3, 0, Math.PI * 2); ctx.fill(); }
    });
    Ch.person(ctx, {
      x: 230, y: 1240, pose: 'stand', s: 0.85, gesture: 'point', eyes: 'happy', mouth: 'open', headRot: 0.1,
      handR: [420, 700],
      style: { hairStyle: 'bun', hair: '#5A3A22', glasses: 'round', outfit: 'shirt', shirt: '#E8718D', bottoms: 'skirt', shorts: '#27305C', skin: '#F0C7A0' },
    });
    const kids = [PLANETS[2], PLANETS[3], PLANETS[5], PLANETS[7]];
    kids.forEach((p, i) => {
      const x = 470 + i * 150, y = 1150 - hop(t + i * 0.13, 8);
      G.rrect(ctx, x - 62, y + 40, 124, 22, 6, { fill: '#B07B4C', lw: 4, seed: 140 + i });
      planet(ctx, x, y, p.ring ? 46 : 55, p, { eyes: 'normal', lookY: -1, look: -0.6, mouth: 'smile', seed: 150 + i });
    });
  }

  function sceneCelebrate(ctx, t) {
    warm(ctx, t);
    G.rays(ctx, CX, 820, { n: 18, r0: 260, r1: 900, color: '#FFF4D6', lw: 26, alpha: 0.55, spin: t * 0.15 });
    const p = pop(t, ev.apple, 0.45);
    ctx.save(); ctx.translate(CX, 840); ctx.scale(p, p); bouquet(ctx, 0, -90, 300, 200); ctx.restore();
    popText(ctx, t, ev.apple + 0.3, 'İYİ Kİ', CX, 330, 100, { color: CREAM });
    popText(ctx, t, ev.apple + 0.6, 'VARSINIZ!', CX, 450, 110, { color: GOLD });
    // little planets around, bowing
    PLANETS.slice(0, 6).forEach((pl, i) => {
      const a = (i / 6) * Math.PI * 2 + t * 0.4;
      const x = CX + Math.cos(a) * 380, y = 840 + Math.sin(a) * 330;
      const bow = t > ev.kutlu ? 0.35 * Math.sin(Math.min(Math.PI, (t - ev.kutlu) * 3)) : 0;
      planet(ctx, x, y, pl.ring ? 34 : 42, pl, { eyes: 'happy', mouth: 'open', rot: bow, blush: 1, seed: 210 + i });
    });
    if (t >= ev.kutlu) {
      ctx.fillStyle = 'rgba(39,48,92,0.55)'; ctx.fillRect(0, 1075, W, 240 * fade(t, ev.kutlu, 0.2));
      popText(ctx, t, ev.kutlu, 'ÖĞRETMENLER GÜNÜNÜZ', CX, 1160, 66, { color: CREAM });
      popText(ctx, t, ev.kutlu + 0.3, 'KUTLU OLSUN!', CX, 1265, 80, { color: GOLD });
      G.confetti(ctx, t, ev.kutlu, { n: 140, seed: 7, spawn: 2 });
    }
  }

  function sceneRoll(ctx, t) {
    paperBg(ctx, '#DCCDB0');
    const x = 110, y = 240, w = 860, h = 990;
    ctx.save(); ctx.translate(CX, y + h / 2); ctx.rotate(-0.015); ctx.translate(-CX, -(y + h / 2));
    card(ctx, x, y, w, h, { fill: '#FBF8EF', r: 12 });
    ctx.strokeStyle = 'rgba(80,120,200,0.35)'; ctx.lineWidth = 2;
    for (let ly = y + 190; ly < y + h - 20; ly += 88) { ctx.beginPath(); ctx.moveTo(x + 10, ly); ctx.lineTo(x + w - 10, ly); ctx.stroke(); }
    ctx.strokeStyle = 'rgba(217,72,59,0.6)'; ctx.beginPath(); ctx.moveTo(x + 120, y); ctx.lineTo(x + 120, y + h); ctx.stroke();
    G.text(ctx, 'YOKLAMA', CX + 40, y + 120, { size: 92, fam: 'Bungee', color: RED, align: 'center' });
    PLANETS.forEach((p, i) => {
      const ly = y + 260 + i * 88;
      ctx.fillStyle = p.c; ctx.beginPath(); ctx.arc(x + 70, ly - 18, 24, 0, Math.PI * 2); ctx.fill();
      G.text(ctx, p.name, x + 150, ly, { size: 58, fam: 'Caveat', weight: 700, color: '#27305C' });
      const tk = clamp((t - ev.ticks[i]) / 0.18);
      if (tk > 0) {
        const pts = [[x + 470, ly - 25], [x + 495, ly], [x + 545, ly - 55]];
        const n = tk < 0.5 ? [pts[0], lerp2(pts[0], pts[1], tk * 2)] : [pts[0], pts[1], lerp2(pts[1], pts[2], (tk - 0.5) * 2)];
        G.line(ctx, n, { color: '#2E9E5B', lw: 9, seed: 300 + i });
        if (tk >= 1) G.text(ctx, 'burada', x + 580, ly, { size: 46, fam: 'Caveat', weight: 700, color: '#2E9E5B' });
      }
    });
    // Plüton, small and unsure
    const ply = y + 260 + 8 * 88;
    if (t > ev.pluto) {
      const pp = pop(t, ev.pluto, 0.3);
      ctx.save(); ctx.globalAlpha = clamp((t - ev.pluto) / 0.2);
      ctx.fillStyle = '#B9A89A'; ctx.beginPath(); ctx.arc(x + 70, ply - 18, 14 * pp, 0, Math.PI * 2); ctx.fill();
      G.text(ctx, 'Plüton', x + 150, ply, { size: 46, fam: 'Caveat', weight: 700, color: '#8A7F76' });
      G.text(ctx, '…ben de?', x + 480, ply, { size: 46, fam: 'Caveat', weight: 700, color: '#8A7F76' });
      ctx.restore();
    }
    ctx.restore();
    // the rule, stamped at the top
    const sp = pop(t, 41.0, 0.3);
    if (sp > 0) {
      ctx.save(); ctx.translate(CX, 1310); ctx.rotate(0.03); ctx.scale(sp, sp);
      ctx.fillStyle = GOLD; ctx.beginPath(); ctx.roundRect(-420, -70, 840, 110, 24); ctx.fill();
      ctx.lineWidth = 6; ctx.strokeStyle = INK; ctx.stroke();
      G.text(ctx, 'TAKİP ET = BURADA', 0, 8, { size: 62, fam: 'Bungee', color: INK, align: 'center' });
      ctx.restore();
    }
  }
  const lerp2 = (a, b, k) => [lerp(a[0], b[0], k), lerp(a[1], b[1], k)];

  function comment(ctx, t, t0, y, user, text, hearts) {
    const p = clamp((t - t0) / 0.35); if (p <= 0) return;
    const e = ease.outBack(p, 1.6);
    ctx.save(); ctx.globalAlpha = Math.min(1, p * 2); ctx.translate((1 - e) * 300, 0);
    card(ctx, 70, y, 940, 210, { r: 30 });
    avatar(ctx, 150, y + 80, 48, 'B', '#C96B9B');
    UI.text(ctx, user, 225, y + 68, { size: 36, weight: 800, color: '#111' });
    UI.text(ctx, '24 Kasım', 225 + UI.measure(ctx, user, 36, 800) + 20, y + 68, { size: 28, weight: 400, color: '#999' });
    UI.text(ctx, text, 225, y + 128, { size: 40, weight: 400, color: '#222', maxW: 740 });
    if (hearts) for (let i = 0; i < hearts; i++) { ctx.save(); ctx.translate(250 + i * 58, y + 172); ctx.scale(1.4, 1.4); G.heart(ctx, 0, 0, 1); ctx.restore(); }
    ctx.restore();
  }

  function sceneBusra(ctx, t) {
    space(ctx, t, '#2B2458', '#6A3F6E');
    popText(ctx, t, ev.comment1 - 0.15, 'BİR DAKİKA…', CX, 330, 84, { color: GOLD, rot: -0.03 });
    comment(ctx, t, ev.comment1 + 0.1, 470, 'busranurguler21', 'Doğummm günüm 24 kasımmmmm', 4);
    comment(ctx, t, ev.comment2, 720, 'busranurguler21', 'umarım unutmazlar', 0);
    // stamp
    const st = ev.unutmadik;
    if (t >= st) {
      const k = clamp((t - st) / 0.14);
      const s = lerp(2.6, 1, ease.outQuad(k));
      ctx.save(); ctx.translate(CX, 1120); ctx.rotate(-0.12); ctx.scale(s, s); ctx.globalAlpha = Math.min(1, k * 2);
      ctx.strokeStyle = RED; ctx.lineWidth = 12; ctx.beginPath(); ctx.roundRect(-400, -95, 800, 170, 20); ctx.stroke();
      G.text(ctx, 'UNUTMADIK!', 0, 30, { size: 120, fam: 'Bungee', color: RED, align: 'center' });
      ctx.restore();
    }
  }

  function cake(ctx, x, y, t) {
    G.ellipse(ctx, x, y + 10, 360, 50, { fill: '#D9D2C4', lw: 5, seed: 400 });
    const tiers = [[330, 170, '#E8718D'], [250, 140, '#F6F0E2'], [170, 120, '#8FD3DE']];
    let ty = y;
    tiers.forEach(([w, h, c], i) => {
      G.rrect(ctx, x - w, ty - h, w * 2, h, 24, { fill: c, lw: 5, seed: 410 + i, hatch: { color: 'rgba(0,0,0,0.08)', gap: 10 } });
      for (let k = 0; k < 9; k++) { ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(x - w + 20 + k * (w * 2 - 40) / 8, ty - h + 8, 18, 0, Math.PI); ctx.fill(); }
      ty -= h;
    });
    for (let i = 0; i < 5; i++) {
      const cx = x - 120 + i * 60;
      G.rrect(ctx, cx - 10, ty - 90, 20, 90, 6, { fill: i % 2 ? GOLD : '#3F86C9', lw: 3, seed: 430 + i });
      const f = 1 + 0.15 * U.noise1(t * 8 + i, i);
      ctx.save(); ctx.globalCompositeOperation = 'lighter';
      const g = ctx.createRadialGradient(cx, ty - 115, 0, cx, ty - 115, 50); g.addColorStop(0, 'rgba(255,220,120,0.6)'); g.addColorStop(1, 'rgba(255,220,120,0)');
      ctx.fillStyle = g; ctx.fillRect(cx - 50, ty - 165, 100, 100); ctx.restore();
      ctx.fillStyle = '#FFB347'; ctx.beginPath(); ctx.ellipse(cx, ty - 112, 11 * f, 22 * f, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#FFF3B0'; ctx.beginPath(); ctx.ellipse(cx, ty - 106, 5, 11, 0, 0, Math.PI * 2); ctx.fill();
    }
  }

  function sceneOutro(ctx, t) {
    warm(ctx, t);
    G.rays(ctx, CX, 900, { n: 16, r0: 300, r1: 1000, color: '#FFF4D6', lw: 30, alpha: 0.5, spin: -t * 0.12 });
    const p = pop(t, ev.cake, 0.4);
    ctx.save(); ctx.translate(CX, 1060); ctx.scale(p, p); ctx.translate(-CX, -1060); cake(ctx, CX, 1060, t); ctx.restore();
    planet(ctx, 160, 1000 - hop(t, 20), 55, PLANETS[5], { hat: true, eyes: 'happy', mouth: 'open', blush: 1, seed: 500 });
    planet(ctx, 920, 980 - hop(t + 0.25, 20), 62, PLANETS[2], { hat: true, eyes: 'happy', mouth: 'open', blush: 1, seed: 501 });
    popText(ctx, t, ev.cake + 0.1, 'İYİ Kİ DOĞDUN', CX, 320, 96, { color: CREAM });
    popText(ctx, t, ev.cake + 0.35, 'BÜŞRA!', CX, 450, 130, { color: GOLD, rot: -0.03 });
    G.confetti(ctx, t, ev.cake, { n: 160, seed: 11, spawn: 3 });
    // the comment box being typed
    if (t > ev.typing - 0.4) {
      const a = fade(t, ev.typing - 0.4, 0.3);
      ctx.save(); ctx.globalAlpha = a;
      card(ctx, 90, 1180, 900, 100, { r: 50 });
      const msg = 'İyi ki doğdun Büşra!';
      const n = Math.floor(clamp((t - ev.typing) / 1.1) * msg.length);
      UI.text(ctx, n > 0 ? msg.slice(0, n) : 'Yorum ekle…', 140, 1243, { size: 38, weight: n > 0 ? 700 : 400, color: n > 0 ? '#111' : '#999' });
      if (Math.floor(t * 2.5) % 2 === 0) { const cw = UI.measure(ctx, msg.slice(0, n), 38, 700); ctx.fillStyle = '#4F5BD5'; ctx.fillRect(144 + cw, 1210, 4, 44); }
      ctx.fillStyle = '#4F5BD5'; ctx.beginPath(); ctx.arc(930, 1230, 34, 0, Math.PI * 2); ctx.fill();
      G.line(ctx, [[915, 1230], [945, 1230]], { color: '#fff', lw: 6 }); G.line(ctx, [[932, 1215], [946, 1230], [932, 1245]], { color: '#fff', lw: 6 });
      ctx.restore();
    }
    if (t > ev.end) {
      ctx.fillStyle = `rgba(20,26,62,${0.75 * fade(t, ev.end, 0.4)})`; ctx.fillRect(0, 0, W, H);
      popText(ctx, t, ev.end + 0.1, 'Öğretmenler Gününüz', CX, 760, 74, { color: CREAM });
      popText(ctx, t, ev.end + 0.35, 'Kutlu Olsun!', CX, 870, 96, { color: GOLD });
      ctx.save(); ctx.translate(CX, 1050); ctx.scale(pop(t, ev.end + 0.5), pop(t, ev.end + 0.5)); bouquet(ctx, 0, -40, 110, 600); ctx.restore();
      popText(ctx, t, ev.end + 0.8, '@merakolojistudyo', CX, 1250, 54, { fam: 'Inter', color: CREAM, strokeW: 0 });
    }
  }

  const SCENES = [
    ['slice', sceneSlice], ['proud', sceneProud], ['board', sceneBoard], ['child', sceneChild], ['jealous', sceneJealous],
    ['celebrate', sceneCelebrate], ['roll', sceneRoll], ['busra', sceneBusra], ['outro', sceneOutro],
  ];

  const SUBS = S.subtitles;

  Studio.film({
    draw(ctx, t) {
      const sc = SCENES.find(([k]) => t >= S.S[k][0] && t < S.S[k][1]) || SCENES[SCENES.length - 1];
      const t0 = S.S[sc[0]][0];
      const punch = 1 + 0.05 * Math.exp(-(t - t0) * 9); // a small zoom punch on every cut
      ctx.save(); ctx.translate(CX, H / 2); ctx.scale(punch, punch); ctx.translate(-CX, -H / 2);
      sc[1](ctx, t);
      ctx.restore();
      const flash = 0.5 * Math.exp(-(t - t0) * 14);
      if (t0 > 0 && flash > 0.02) { ctx.fillStyle = `rgba(255,250,235,${flash})`; ctx.fillRect(0, 0, W, H); }
      if (t < ev.end) Subs.draw(ctx, t, SUBS, { style: 'pop', size: 62, highlight: '#FFD23F', y: SAFE.y + SAFE.h + 50, maxW: 900 });
    },
    post: { paper: 0.35, vignette: 0.3, grain: 0.05 },
    fadeOut: 1.0,
  });
})();
