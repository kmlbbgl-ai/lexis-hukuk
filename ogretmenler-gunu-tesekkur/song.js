// THE SONG — soft music bed + SFX from score events + the ElevenLabs voiceover, ducked.
const path = require('path');
const { SR, Bus, reverb } = require('./engine/audio/dsp');
const I = require('./engine/audio/instruments');
const MIX = require('./engine/audio/mix');
const sc = require('./score');
const { BEAT, DURATION, m, ev, clock } = sc;

const N = Math.ceil(DURATION * SR);
const bus = () => new Bus(N);
const drums = bus(), bass = bus(), pad = bus(), keys = bus(), fx = bus(), verb = bus();
const BARS = Math.ceil(DURATION / clock.BAR);

// pads all the way
for (const c of sc.chords) {
  if (c.t0 >= DURATION) continue;
  for (const n of c.notes) { const { L, R } = I.padNote(n, Math.min(c.t1, DURATION) - c.t0, { cutoff: 1300, attack: 0.4, release: 1.2 }); pad.addStereo(L, R, c.t0, 0.08); }
}
// music box arpeggio (8ths), brighter in the celebration
clock.eachStep(0, BARS, 8, (t, b, s) => {
  if (t > DURATION - 1.5) return;
  const c = sc.chordAt(t); if (!c) return;
  const pat = [0, 1, 2, 1, 2, 1, 0, 2];
  const midi = c.notes[pat[s]] + 12 + (s === 6 ? 12 : 0);
  const mb = I.musicBox(midi);
  const g = (t > sc.S.celebrate[0] && t < sc.S.celebrate[1]) || t > sc.S.busra[0] + 4 ? 0.2 : 0.12;
  keys.addMono(mb, t, g, s % 2 ? 0.3 : -0.3); verb.addMono(mb, t, 0.12);
});
// gentle groove from the "proud" scene on
const K = I.kick({ punch: 0.4 }), HC = I.hat(false, 11), SH = I.shaker(1, 15), CL = I.clap();
clock.eachStep(0, BARS, 8, (t, b, s) => {
  if (t < sc.S.proud[0] || t > DURATION - 1.8) return;
  if (t > sc.S.child[0] && t < sc.S.jealous[0]) { if (s % 4 === 0) drums.addMono(SH, t, 0.12); return; } // tender part
  if (s === 0 || s === 5) drums.addMono(K, t, 0.6);
  if (s === 2 || s === 6) { drums.addMono(CL, t, 0.25); verb.addMono(CL, t, 0.1); }
  drums.addMono(s % 2 ? SH : HC, t, 0.1, s % 2 ? 0.3 : -0.3);
});
// bass
clock.eachStep(0, BARS, 2, (t) => {
  if (t < sc.S.proud[0] || t > DURATION - 1.5) return;
  const c = sc.chordAt(t); if (!c) return;
  bass.addMono(I.bass(c.bass + 12, BEAT * 1.6), t, 0.4);
});

// ---------- SFX tied to events ----------
fx.addMono(I.noiseSweep(0.35, 6000, 900, { q: 1.2 }), ev.slice - 0.15, 0.35); // knife swish
fx.addMono(I.thwack(), ev.split, 0.45);
fx.addMono(I.pop(1.3), ev.million, 0.3);
fx.addMono(I.boing(), ev.shades, 0.3);
fx.addMono(I.scribble(1.6, 3), ev.boardWrite, 0.25);
ev.follows.forEach((t, i) => fx.addMono(I.ting(m('E6') + (i % 2) * 3), t, 0.22));
fx.addMono(I.bell(1568, 1.2, 2, 3.5), ev.bulb, 0.18);
fx.addMono(I.bwomp(), ev.huff, 0.3);
fx.addMono(I.subBoom(1.2), ev.apple, 0.35);
fx.addMono(I.fireworkBurst(5, 1), ev.kutlu, 0.25);
ev.ticks.forEach((t, i) => fx.addMono(I.woodTick(1 + i * 0.05), t, 0.35));
fx.addMono(I.whistle(0.4), ev.pluto, 0.15);
fx.addMono(I.paperFwip(1.1, 4), ev.comment1, 0.3);
fx.addMono(I.paperFwip(0.95, 5), ev.comment2, 0.3);
fx.addMono(I.thud(90, 0.1), ev.unutmadik, 0.5);
fx.addMono(I.fireworkBurst(9, 1.2), ev.cake, 0.3);
for (let i = 0; i < 10; i++) fx.addMono(I.woodTick(1.6), ev.typing + i * 0.11, 0.08);

// ---------- voiceover ----------
const vo = MIX.loadAudio(path.join(__dirname, 'assets/vo.mp3'), { at: 0, gain: 1.0, length: DURATION });
const music = bus();
for (const [b, g] of [[drums, 0.3], [bass, 0.35], [pad, 1.2], [keys, 0.45]]) b.mixInto(music, g);
const wet = reverb(verb, { room: 0.8, damp: 0.35 });
wet.mixInto(music, 0.8);
MIX.duck([music], vo, { depth: 0.55 });

const out = path.join(__dirname, 'out');
const mix = MIX.mixdown({ music, fx, vo }, { music: 0.5, fx: 0.9, vo: 1.6 }, { stemDir: process.env.STEMS ? out : null });
MIX.highpass(mix, 30);
MIX.fadeOut(mix, DURATION - 1.5, DURATION);
const M = MIX.master(mix, 0.8, undefined, { lufs: -14 });
MIX.writeWav(path.join(out, 'music.wav'), mix);
console.log(`wrote out/music.wav (${DURATION.toFixed(2)}s, ${M.lufs?.toFixed(1)} LUFS)`);
