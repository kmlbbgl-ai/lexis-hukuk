const { chromium } = require('playwright'); const fs = require('fs');
const OUT = '/home/user/lexis-hukuk/vakit/magaza/en'; fs.mkdirSync(OUT,{recursive:true});
const logo = s => `<svg viewBox="0 0 64 64" width="${s}" height="${s}"><g fill="none" stroke="#e2c47d" stroke-linejoin="round" stroke-linecap="round"><path d="M14 56V30c0-10 8-18 18-22 10 4 18 12 18 22v26" stroke-width="3.2"/><path d="M22 56V33c0-6 4.5-10.5 10-13 5.5 2.5 10 7 10 13v23" stroke-width="2.4" opacity=".7"/><path d="M8 56h48" stroke-width="3.2"/></g><circle cx="32" cy="38" r="2.6" fill="#e2c47d"/></svg>`;
const BG = 'linear-gradient(155deg,#13675a 0%,#0d4a3e 55%,#0a3a31 100%)';
(async () => {
  const b = await chromium.launch();
  // 1) uygulama ekranları
  const ctx = await b.newContext({ viewport: { width: 360, height: 720 }, deviceScaleFactor: 3, locale: 'en-US', timezoneId: 'Europe/Istanbul' });
  const p = await ctx.newPage();
  await p.addInitScript(() => { localStorage.setItem('vakit.onboarded', 'true'); localStorage.setItem('vakit.lang', '"en"'); localStorage.setItem('vakit.plog', JSON.stringify((() => { const o = {}; for (let i = 1; i < 6; i++) { const d = new Date(); d.setDate(d.getDate() - i); o[`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`] = 31; } return o; })())); localStorage.setItem('vakit.favs', '["2:255"]'); });
  await p.goto('http://localhost:8765/index.html'); await p.waitForTimeout(1500);
  const shots = [];
  const snap = async n => { const f = `/tmp/claude-0/-home-user-lexis-hukuk/6a89a04b-6465-5170-afca-6b30835d8ac0/scratchpad/en-${n}.png`; await p.screenshot({ path: f }); shots.push(f); };
  await snap('home');
  await p.click('.tabbar [data-tab=quran]'); await p.click('#surahList li[data-s="36"]'); await p.waitForTimeout(600); await snap('quran');
  await p.click('.tabbar [data-tab=qibla]'); await p.waitForTimeout(300);
  await p.evaluate(() => { document.getElementById('dial').style.transform = 'rotate(-146deg)'; document.getElementById('compass').classList.add('aligned'); document.getElementById('turnHint').textContent = 'Facing the Qibla ✓'; document.getElementById('compassBtn').hidden = true; }); await snap('qibla');
  await p.click('.tabbar [data-tab=menu]'); await p.click('.tile[data-go=hatim]'); await p.evaluate(() => { const g = document.getElementById('htGrid'); document.getElementById('htHome').hidden = true; document.getElementById('htDetail').hidden = false; document.getElementById('htDTitle').textContent = 'Khatm for my father'; document.getElementById('htDInfo').textContent = 'Code: K7M2QX · 12/30 read · 21 taken'; const nn = ['Sabr 80','Nur 649','Wafa 212','Huzur 31','Umut 77']; g.innerHTML = Array.from({length:30},(_,i)=>{const s=i<12?'done':i<21?'taken':''; return `<button class="${s}">${i+1}<small>${s?nn[i%5]:''}</small></button>`;}).join(''); }); await snap('hatim');
  await p.click('#barBack'); await p.click('#barBack').catch(()=>{}); await p.click('.tabbar [data-tab=menu]'); await p.click('.tile[data-go=ramazan]'); await p.waitForTimeout(500); await snap('ramazan');
  await p.click('#barBack'); await p.click('.tile[data-go=log]'); await p.waitForTimeout(300); await snap('log');
  await ctx.close();
  // 2) başlıklı çerçeveler (1080x1920)
  const caps = [['Prayer times','Accurate times worldwide with adhan alerts'],['The Holy Quran','Arabic text and recitation by 4 reciters'],['Precise Qibla','Compass with magnetic declination correction'],['Group khatm','Share a code, read the juz together'],['Ramadan','Fasting timetable, iftar countdown, tracking'],['Prayer tracker','Streaks, stats and qada tracking']];
  const f = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  for (let i = 0; i < shots.length; i++) {
    const img = fs.readFileSync(shots[i]).toString('base64');
    await f.setContent(`<html><body style="margin:0;width:1080px;height:1920px;background:${BG};font-family:system-ui,sans-serif;color:#fff;display:flex;flex-direction:column;align-items:center;overflow:hidden">
      <div style="margin-top:110px;font-size:76px;font-weight:800;letter-spacing:-1px">${caps[i][0]}</div>
      <div style="margin-top:18px;font-size:38px;color:#f0d79a;text-align:center;padding:0 80px">${caps[i][1]}</div>
      <img src="data:image/png;base64,${img}" style="margin-top:80px;width:760px;border-radius:56px;border:14px solid #08261f;box-shadow:0 30px 80px rgba(0,0,0,.45)"></body></html>`);
    await f.screenshot({ path: `${OUT}/ekran-${i + 1}.png` });
  }
  // 3) öne çıkan görsel 1024x500
  await f.setViewportSize({ width: 1024, height: 500 });
  await f.setContent(`<html><body style="margin:0;width:1024px;height:500px;background:${BG};font-family:system-ui,sans-serif;color:#fff;display:flex;align-items:center;gap:56px;padding:0 80px;box-sizing:border-box">${logo(200)}<div><div style="font-size:92px;font-weight:800;letter-spacing:-2px">Vakit</div><div style="font-size:34px;color:#f0d79a;margin-top:6px">Adhan · Qibla · Quran · Khatm</div><div style="font-size:24px;opacity:.85;margin-top:18px">No account, simple, your data stays on your phone</div></div></body></html>`);
  await f.screenshot({ path: `${OUT}/feature-graphic.png` });
  await b.close(); console.log('ok', fs.readdirSync(OUT));
})();
