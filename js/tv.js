/* Game Night – TV (host). Beheert de engine, de verbindingen en het TV-beeld. */
(function () {
  const GN = window.GN;
  const $ = (s, el = document) => el.querySelector(s);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const LETTERS = 'ABCDEFGH';
  const params = new URLSearchParams(location.search);
  const LOCAL = GN.Net.LOCAL;

  // ---------- opslag ----------
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
    del(k) { try { localStorage.removeItem(k); } catch (e) {} },
  };
  const seen = store.get('gn.seen', {});
  let seenDirty = false;

  const newCode = () => {
    const A = 'ABCDEFGHJKLMNPQRSTUVWXYZ'; // geen I/O om verwarring te voorkomen
    let c = '';
    for (let i = 0; i < 4; i++) c += A[Math.floor(Math.random() * A.length)];
    return c;
  };

  // ---------- opstarten ----------
  const saved = store.get('gn.host', null);
  let code = (params.get('c') || '').toUpperCase();
  let restored = false;
  const fresh = !saved || Date.now() - saved.at > 6 * 3600e3;
  if (!code || !/^[A-Z]{4}$/.test(code)) code = !fresh && saved.code ? saved.code : newCode();

  const engine = new GN.Engine({
    code,
    seen,
    onChange: () => schedule(),
    onSeen: () => { seenDirty = true; },
  });
  if (!fresh && saved.code === code && saved.state) {
    try { engine.restore(saved.state); restored = true; } catch (e) { console.warn('herstellen mislukt', e); }
  }
  engine.s.code = code;
  const bootRestored = restored;
  history.replaceState(null, '', location.pathname + '?c=' + code + (LOCAL ? '&local=1' : ''));

  const joinUrl = () => {
    const base = location.href.replace(/tv\.html.*$/, '').replace(/\?.*$/, '');
    return base + 'play.html?c=' + code + (LOCAL ? '&local=1' : '');
  };

  // ---------- netwerk ----------
  const bind = new Map(); // connId -> playerId
  const lastSent = new Map(); // connId -> json
  let netStatus = 'connecting';
  const net = GN.Net.createHost(code, {
    status(s) {
      // nieuwe sessie en de code is toevallig al bezet: kies meteen een andere code
      if (s === 'waiting-id' && !bootRestored) {
        store.del('gn.host');
        location.replace(location.pathname + (LOCAL ? '?local=1' : ''));
        return;
      }
      netStatus = s;
      renderTop();
    },
    open(id) { /* wacht op join-bericht */ },
    data(id, m) {
      if (!m || typeof m !== 'object') return;
      if (m.t === 'join') {
        const pid = engine.join({ token: String(m.token || '').slice(0, 64), name: m.name, avatar: m.avatar });
        // oude verbinding van dezelfde speler loslaten
        bind.forEach((p, c) => { if (p === pid && c !== id) { bind.delete(c); lastSent.delete(c); net.drop(c); } });
        bind.set(id, pid);
        lastSent.delete(id);
        engine.setConnected(pid, true);
        flush();
        return;
      }
      const pid = bind.get(id);
      if (!pid) return net.send(id, { t: 'rejoin' });
      if (m.t === 'act') engine.action(pid, m);
    },
    close(id) {
      const pid = bind.get(id);
      bind.delete(id);
      lastSent.delete(id);
      if (pid && ![...bind.values()].includes(pid)) engine.setConnected(pid, false);
    },
  });

  // ---------- update-lus ----------
  let queued = false;
  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; flush(); });
  }
  let saveT = null;
  function flush() {
    // telefoons
    bind.forEach((pid, cid) => {
      const v = engine.phoneView(pid);
      const json = JSON.stringify(v);
      if (lastSent.get(cid) === json) return;
      lastSent.set(cid, json);
      net.send(cid, { t: 'view', v });
      if (v.screen === 'kicked') { setTimeout(() => net.drop(cid), 500); bind.delete(cid); }
    });
    render();
    clearTimeout(saveT);
    saveT = setTimeout(() => {
      store.set('gn.host', { at: Date.now(), code, state: engine.serialize() });
      if (seenDirty) { seenDirty = false; store.set('gn.seen', engine.seen); }
    }, 800);
  }
  setInterval(() => engine.tick(), 200);
  // timers verversen op telefoons die net zijn heropend: elke 5s een sync van "remaining"
  setInterval(() => { lastSent.clear(); flush(); }, 5000);

  // ---------- QR ----------
  let qrLoaded = null;
  function loadQr() {
    if (window.QRCode) return Promise.resolve();
    if (!qrLoaded) qrLoaded = new Promise((res, rej) => {
      const s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
      s.onload = res; s.onerror = rej;
      document.head.appendChild(s);
    });
    return qrLoaded;
  }
  function drawQr(el) {
    loadQr().then(() => {
      if (!el.isConnected || el.dataset.done) return;
      el.dataset.done = '1';
      el.innerHTML = '';
      new window.QRCode(el, { text: joinUrl(), width: 512, height: 512, colorDark: '#0d0b1f', colorLight: '#fff8ec', correctLevel: window.QRCode.CorrectLevel.M });
    }).catch(() => { el.innerHTML = '<div style="font-size:4em">📱</div>'; });
  }

  // ---------- stem ----------
  let lastSpoken = 0;
  function say(text) {
    if (!engine.s.settings.voice || !('speechSynthesis' in window) || !text) return;
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text.replace(/_{2,}/g, 'puntje puntje'));
      u.lang = 'nl-NL';
      const voice = speechSynthesis.getVoices().find((v) => /^nl(-|_)NL/i.test(v.lang)) || speechSynthesis.getVoices().find((v) => /^nl/i.test(v.lang));
      if (voice) u.voice = voice;
      u.rate = 1.02;
      speechSynthesis.speak(u);
    } catch (e) {}
  }

  // ---------- render ----------
  const stage = $('#stage');
  const board = $('#board');
  const overlay = $('#overlay');
  let shownKey = null;
  let lastView = null;

  const pmap = (v) => { const m = {}; v.players.forEach((p) => (m[p.id] = p)); return m; };
  const av = (p, extra = '') => p ? `<span class="chipav ${extra}" style="--c:${p.color}" title="${esc(p.name)}">${p.avatar}</span>` : '';
  const qClass = (t) => (String(t).length > 90 ? 'qtext long' : 'qtext');
  const fmtQ = (t) => esc(t).replace(/_{2,}/g, '<u style="text-decoration-color:var(--amber);text-underline-offset:.2em">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>');
  const numFmt = (n) => GN.fmtNum(n);
  const valFmt = (q, v) => (q.fmt ? q.fmt.replace('{v}', numFmt(v)) : numFmt(v));

  function render() {
    const v = engine.tvView();
    lastView = v;
    renderTop();
    renderBoard(v);
    overlay.classList.toggle('hidden', !v.paused);
    if (v.paused) {
      const rec = restored ? `Het spel is hersteld. Telefoons verbinden vanzelf opnieuw (code <b>${code}</b>). ` : '';
      const html = `<div class="box"><div class="big">⏸️</div><h2>${restored ? 'Spel hersteld' : 'Pauze'}</h2><p>${rec}De spelleider 👑 hervat vanaf zijn telefoon.</p></div>`;
      if (overlay.dataset.html !== html) { overlay.innerHTML = html; overlay.dataset.html = html; }
    } else restored = false;
    const key = v.kind + ':' + v.stepId;
    if (key !== shownKey) {
      shownKey = key;
      stage.innerHTML = VIEWS[v.kind] ? VIEWS[v.kind](v) : '';
      const qr = $('.qr', stage);
      if (qr) drawQr(qr);
      speakFor(v);
    } else {
      updateLive(v);
    }
  }

  function speakFor(v) {
    if (v.stepId === lastSpoken) return;
    lastSpoken = v.stepId;
    if (v.kind === 'intro') say(v.title);
    else if (['mc', 'tf', 'num', 'bluffWrite', 'order', 'final'].includes(v.kind) && v.q) say(v.q.q);
    else if (v.kind === 'ken' || v.kind === 'wie' || v.kind === 'poll' || v.kind === 'wzWrite') say(v.text);
    else if (v.kind === 'wzGuess') say('Wie zei dit? ' + v.entry);
    else if (v.kind === 'reveal' && v.reveal.options && v.reveal.correct !== undefined && v.reveal.of !== 'ken') say('Het juiste antwoord is: ' + v.reveal.options[v.reveal.correct]);
    else if (v.kind === 'reveal' && v.reveal.of === 'num') say('Het antwoord is ' + v.reveal.q.answer);
  }

  function renderTop() {
    const v = lastView;
    const r = v && v.round && v.kind !== 'lobby' && v.kind !== 'end' ? v.round : null;
    const stat = { online: '', connecting: 'verbinden…', reconnecting: 'opnieuw verbinden…', 'waiting-id': 'code vrijmaken…', taken: 'code bezet: herlaad', nolib: 'geen internet?' }[netStatus] || '';
    $('#roundinfo').innerHTML = r
      ? `<span class="chip">${r.emoji} ${esc(r.title)}</span><span>Ronde ${r.roundNo}/${r.rounds}</span>${v.qno ? `<span>· Vraag ${v.qno}/${v.qcount}</span>` : ''}`
      : '';
    $('#net').textContent = stat;
    $('#net').className = 'net' + (stat ? ' bad' : '');
    $('#code').textContent = code;
  }

  function renderBoard(v) {
    const players = v.players.filter((p) => p.playing);
    const gains = v.kind === 'reveal' ? v.reveal.gains || {} : {};
    const need = new Set(v.need);
    const chip = (p) => {
      const done = need.has(p.id) && v.answered.includes(p.id);
      const g = gains[p.id];
      return `<div class="pchip ${done ? 'done' : ''} ${p.connected || p.isBot ? '' : 'off'}" style="--c:${p.color}">
        ${p.gm ? '<span class="crown">👑</span>' : ''}${v.powerupsUsed.includes(p.id) ? '<span class="pu">⚡</span>' : ''}
        <span class="av">${p.avatar}</span><span class="nm">${esc(p.name)}</span>
        <span class="sc">${p.score}${g ? ` <small style="color:${g > 0 ? 'var(--mint)' : 'var(--bad)'}">${g > 0 ? '+' : ''}${g}</small>` : ''}</span></div>`;
    };
    const html = v.kind === 'end' ? '' : v.teams
      ? v.teams.map((t) => `<div class="teamgroup" style="--t:${t.color}"><div class="teamhead">${t.emoji} ${esc(t.name)} <b>${t.score}</b></div><div class="teamchips">${players.filter((p) => p.team === t.id).map(chip).join('') || '<span class="sub">nog leeg</span>'}</div></div>`).join('')
      : players.map(chip).join('');
    if (board.dataset.html !== html) { board.innerHTML = html; board.dataset.html = html; }
  }

  function waitLine(v) {
    const m = pmap(v);
    const left = v.need.filter((id) => !v.answered.includes(id)).map((id) => m[id]).filter(Boolean);
    if (!left.length) return '<div class="waitline">Iedereen is klaar!</div>';
    if (left.length > 4) return `<div class="waitline">Nog ${left.length} spelers bezig…</div>`;
    return `<div class="waitline">Wachten op ${left.map((p) => `<b>${esc(p.name)}</b>`).join(', ')}</div>`;
  }
  function updateLive(v) {
    const w = $('.waitline', stage);
    if (w) w.outerHTML = waitLine(v);
    if (v.kind === 'lobby') {
      const h = $('#lobbyhint', stage);
      if (h) h.innerHTML = lobbyHint(v);
      const st = $('#lobbysettings', stage);
      if (st) st.innerHTML = settingsChips(v);
    }
  }
  function head(v, extra = '') {
    return `<div class="qhead">${v.cat ? `<span class="cat">${v.cat.emoji} ${esc(v.cat.name)}</span>` : ''}${extra}</div>${v.skippedNote ? `<div class="skipnote">${esc(v.skippedNote)}</div>` : ''}`;
  }
  const settingsChips = (v) => {
    const sp = GN.SPICE[v.settings.spice];
    const off = Object.keys(v.settings.rounds || {}).filter((k) => v.settings.rounds[k] === false).map((k) => GN.ROUNDS[k].title);
    return `<span>${sp.emoji} ${sp.name}</span><span>⏱️ ${esc(v.settings.length)} (${GN.LENGTHS[v.settings.length]})</span>${v.settings.teams ? `<span>👥 ${v.settings.teams} teams</span>` : ''}${v.settings.voice ? '<span>🔊 Voorlezen</span>' : ''}${!v.settings.gmPlays ? '<span>🎙️ Spelleider presenteert</span>' : ''}${off.length ? `<span>🚫 Zonder: ${esc(off.join(', '))}</span>` : ''}`;
  };
  const lobbyHint = (v) => {
    const gm = v.players.find((p) => p.gm);
    if (!v.players.length) return 'Nog niemand binnen. Pak je telefoon! 📱';
    return gm ? `👑 <b>${esc(gm.name)}</b> is spelleider en start het spel.` : '';
  };

  const VIEWS = {
    lobby: (v) => `
      <div class="lobby rise">
        <div>
          <h1 class="logo"><span class="g">Game</span> <span class="n">Night</span> <span class="moon">🌙</span></h1>
          <div class="tag">De quizavond in je eigen woonkamer</div>
          <div class="steps">
            <div><i>1</i> Scan de QR-code of ga naar de link</div>
            <div><i>2</i> Kies je naam en avatar</div>
            <div><i>3</i> De spelleider 👑 kiest de instellingen en start</div>
          </div>
          <div class="settings" id="lobbysettings">${settingsChips(v)}</div>
          <div class="hint" id="lobbyhint">${lobbyHint(v)}</div>
        </div>
        <div class="joinbox pop">
          <div class="qr"><div class="spinner"></div></div>
          <div class="code">${code}</div>
          <div class="url">${esc(joinUrl().replace(/^https?:\/\//, ''))}</div>
        </div>
      </div>`,

    intro: (v) => `
      <div class="intro center">
        <div class="big">${v.emoji}</div>
        <div class="rno">Ronde ${v.roundNo} van ${v.rounds}</div>
        <h2 class="pop">${esc(v.title)}</h2>
        <p class="rise">${esc(v.desc)}</p>
      </div>`,

    catpick: (v) => {
      const m = pmap(v);
      const p = m[v.picker];
      return `<div class="catpick center panel">
        <h2>${p ? `${p.avatar} ${esc(p.name)} staat laatst en kiest…` : 'Categorie kiezen…'}</h2>
        <div class="cats">${v.options.map((c, i) => `<div class="catcard pop" style="animation-delay:${i * 0.15}s"><div class="e">${c.emoji}</div><div class="n">${esc(c.name)}</div><div class="g">${esc(c.group)}</div></div>`).join('')}</div>
      </div>`;
    },

    mc: (v) => `<div class="panel">${head(v)}
      <div class="${qClass(v.q.q)} pop">${fmtQ(v.q.q)}</div>
      <div class="opts">${v.options.map((o, i) => `<div class="opt rise" style="animation-delay:${0.3 + i * 0.1}s"><span class="l">${LETTERS[i]}</span>${esc(o)}</div>`).join('')}</div>
      ${waitLine(v)}</div>`,

    final: (v) => `<div class="panel">${head(v, '<span class="chip" style="color:var(--amber)">💰 FINALE</span>')}
      <div class="${qClass(v.q.q)} pop">${fmtQ(v.q.q)}</div>
      <div class="opts">${v.options.map((o, i) => `<div class="opt rise" style="animation-delay:${0.3 + i * 0.1}s"><span class="l">${LETTERS[i]}</span>${esc(o)}</div>`).join('')}</div>
      ${waitLine(v)}</div>`,

    num: (v) => `<div class="panel center">${head(v)}
      <div class="${qClass(v.q.q)} pop">${fmtQ(v.q.q)}</div>
      <div class="answerbig" style="animation:pulse 1.4s infinite">?${v.q.unit ? ` <small style="font-size:.4em;color:var(--muted)">${esc(v.q.unit)}</small>` : ''}</div>
      <div class="qsub">Typ je schatting op je telefoon</div>
      ${waitLine(v)}</div>`,

    bet: (v) => {
      const m = pmap(v);
      return `<div class="panel center">${head(v, '<span>Wedden!</span>')}
      <div class="${qClass(v.q.q)}" style="font-size:2.2em">${fmtQ(v.q.q)}</div>
      <div class="guesses">${v.guesses.map((g, i) => `<div class="guess pop" style="animation-delay:${i * 0.12}s"><div class="v">${numFmt(g.v)}</div><div class="by">${g.authors.map((a) => av(m[a])).join('')}</div></div>`).join('')}</div>
      <div class="qsub" style="margin-top:1em">Wed op de schatting die volgens jou het dichtst zit (+50)</div>
      ${waitLine(v)}</div>`;
    },

    bluffWrite: (v) => `<div class="panel center">${head(v)}
      <div class="${qClass(v.q.q)} pop">${fmtQ(v.q.q)}</div>
      <div class="qsub">🤥 Verzin een geloofwaardig nep-antwoord op je telefoon</div>
      ${waitLine(v)}</div>`,

    bluffVote: (v) => `<div class="panel">${head(v)}
      <div class="${qClass(v.q.q)}" style="font-size:2.3em">${fmtQ(v.q.q)}</div>
      <div class="opts">${v.options.map((o, i) => `<div class="opt pop" style="animation-delay:${i * 0.1}s"><span class="l">${LETTERS[i]}</span>${esc(o)}</div>`).join('')}</div>
      <div class="qsub" style="margin-top:1em">Welke is echt? 🔍</div>
      ${waitLine(v)}</div>`,

    order: (v) => `<div class="panel">${head(v)}
      <div class="${qClass(v.q.q)} pop">${fmtQ(v.q.q)}</div>
      <div class="endlabels"><span>⬆️ ${esc(v.q.lo || 'Eerst')}</span><span>${esc(v.q.hi || 'Laatst')} ⬇️</span></div>
      <div class="orderlist">${v.items.map((t, i) => `<div class="orow" style="animation-delay:${i * 0.1}s"><span class="num">•</span>${esc(t)}</div>`).join('')}</div>
      ${waitLine(v)}</div>`,

    ken: (v) => {
      const hot = pmap(v)[v.hot];
      return `<div class="panel">
      <div class="hotseat"><span class="av" style="--c:${hot ? hot.color : '#444'}">${hot ? hot.avatar : '?'}</span><span><b>${hot ? esc(hot.name) : ''}</b> in de hete stoel 🔥</span></div>
      <div class="${qClass(v.text)} pop">${esc(v.text)}</div>
      <div class="opts">${v.options.map((o, i) => `<div class="opt rise" style="animation-delay:${0.3 + i * 0.1}s"><span class="l">${LETTERS[i]}</span>${esc(o)}</div>`).join('')}</div>
      ${waitLine(v)}</div>`;
    },

    wie: (v) => `<div class="panel center">
      <div class="qhead"><span class="cat">🫵 Wie van ons…</span></div>
      <div class="${qClass(v.text)} pop">${esc(v.text)}</div>
      <div class="wiegrid">${v.players.filter((p) => p.playing).map((p, i) => `<div class="wiecard rise" style="--c:${p.color};animation-delay:${i * 0.08}s"><div class="av">${p.avatar}</div><div class="nm">${esc(p.name)}</div></div>`).join('')}</div>
      ${waitLine(v)}</div>`,

    tf: (v) => `<div class="panel">${head(v, '<span>🕵️ Waar of nep?</span>')}
      <div class="${qClass(v.q.q)} pop">${fmtQ(v.q.q)}</div>
      <div class="tfopts"><div class="tfo waar rise">✅ Waar</div><div class="tfo nep rise" style="animation-delay:.1s">❌ Nep</div></div>
      ${waitLine(v)}</div>`,

    wzWrite: (v) => `<div class="panel center">
      <div class="qhead"><span class="cat">🗯️ Wie zei dit?</span></div>
      <div class="${qClass(v.text)} pop">${esc(v.text)}</div>
      <div class="qsub">✍️ Schrijf anoniem je antwoord op je telefoon. Straks raadt iedereen wie wat schreef.</div>
      ${waitLine(v)}</div>`,

    wzGuess: (v) => `<div class="panel center">
      <div class="qhead"><span class="cat">🗯️ Wie zei dit?</span><span>${v.eno} van ${v.etotal}</span></div>
      <div class="qsub" style="margin:0 0 .4em">${esc(v.text)}</div>
      <div class="quote pop">“${esc(v.entry)}”</div>
      <div class="wiegrid">${v.players.filter((p) => p.playing).map((p, i) => `<div class="wiecard rise" style="--c:${p.color};animation-delay:${i * 0.06}s"><div class="av">${p.avatar}</div><div class="nm">${esc(p.name)}</div></div>`).join('')}</div>
      ${waitLine(v)}</div>`,

    poll: (v) => `<div class="panel center">
      <div class="qhead"><span class="cat">🙈 Gênante enquête</span></div>
      <div class="${qClass(v.text)} pop">${esc(v.text)}</div>
      <div class="qsub">Antwoord anoniem met ja of nee, en gok hoeveel van de ${v.n} spelers ja zeggen</div>
      ${waitLine(v)}</div>`,

    wager: (v) => `<div class="intro center">
      <div class="big">💰</div>
      <div class="rno">De finale</div>
      <h2 class="pop">${v.cat ? `${v.cat.emoji} ${esc(v.cat.name)}` : ''}</h2>
      <p class="rise">Hoeveel van je punten durf je in te zetten? Goed = erbij, fout = eraf.</p>
      ${waitLine(v)}</div>`,

    reveal: (v) => REVEALS[v.reveal.of](v, v.reveal),

    scores: (v) => {
      const ps = v.players.filter((p) => p.playing).slice().sort((a, b) => b.score - a.score);
      const m = pmap(v);
      return `<div class="panel center">
        <div class="intro"><h2 style="font-size:3.2em;margin-bottom:.5em">Tussenstand 📊</h2></div>
        ${v.teams ? `<div class="teamscores">${v.teams.slice().sort((a, b) => b.score - a.score).map((t, i) => `<div class="tscore pop" style="--t:${t.color};animation-delay:${i * 0.2}s"><span class="e">${t.emoji}</span><span>${esc(t.name)}</span><b>${t.score}</b></div>`).join('')}</div>` : ''}
        <div class="scoreboard">${ps.map((p, i) => `<div class="srow" style="--c:${p.color};animation-delay:${(ps.length - i) * 0.12}s"><span class="pos">${i + 1}</span><span class="av">${p.avatar}</span><span class="nm">${esc(p.name)}</span><span class="sc">${p.score}</span></div>`).join('')}</div>
        ${v.bonus && m[v.bonus.id] ? `<div class="bonus">${m[v.bonus.id].avatar} ${esc(m[v.bonus.id].name)} krijgt een troost-power-up: ${GN.POWERUPS[v.bonus.type].emoji} ${GN.POWERUPS[v.bonus.type].name}</div>` : ''}
        ${v.nextRound ? `<div class="note">Volgende ronde: <b>${esc(v.nextRound)}</b></div>` : ''}
      </div>`;
    },

    end: (v) => {
      const m = pmap(v);
      const r = v.ranking.map((id) => m[id]).filter(Boolean);
      const pod = [r[1], r[0], r[2]].map((p, i) => (p ? `<div class="pl p${[2, 1, 3][i]}" style="--c:${p.color}"><div class="av">${p.avatar}</div><div class="nm">${esc(p.name)}</div><div class="block">${p.score}</div></div>` : '')).join('');
      return `<div class="panel center">
        ${(() => {
          const tw = v.teamRanking && v.teams ? v.teams.find((t) => t.id === v.teamRanking[0]) : null;
          const title = tw ? `${tw.emoji} ${esc(tw.name)} wint! 🏆` : r[0] ? `${esc(r[0].name)} wint! 🏆` : 'Klaar!';
          const sub = tw ? `<div class="teamscores" style="margin-top:.6em">${v.teamRanking.map((id) => v.teams.find((t) => t.id === id)).map((t) => `<div class="tscore" style="--t:${t.color}"><span class="e">${t.emoji}</span><span>${esc(t.name)}</span><b>${t.score}</b></div>`).join('')}</div><div class="note" style="margin-top:.4em">Beste speler: ${r[0] ? esc(r[0].name) : ''}</div>` : '';
          return `<div class="intro"><div class="rno">Einde van de avond</div><h2 class="pop" style="font-size:3.6em">${title}</h2>${sub}</div>`;
        })()}
        <div class="podium ${v.teamRanking ? 'small' : ''}">${pod}</div>
        <div class="awards">${v.awards.map((a, i) => `<div class="award" style="animation-delay:${2 + i * 0.25}s"><span class="e">${a.emoji}</span><div><b>${esc(a.title)}: ${esc(m[a.id] ? m[a.id].name : '?')}</b><small>${esc(a.text)}</small></div></div>`).join('')}</div>
        <div class="note">De spelleider kan opnieuw starten 👑</div>
      </div>`;
    },
  };

  const voters = (ids, m) => `<span class="who">${ids.map((id) => (m[id] ? `<span style="--c:${m[id].color}">${m[id].avatar}</span>` : '')).join('')}</span>`;
  const factBox = (q) => (q && q.fact ? `<div class="fact">${esc(q.fact)}</div>` : '');
  const eventsBox = (r) => (r.events && r.events.length ? `<div class="events">${r.events.map((e) => `<span>${esc(e)}</span>`).join('')}</div>` : '');

  const REVEALS = {
    tf: (v, r) => {
      const m = pmap(v);
      const by = (i) => Object.keys(m).filter((id) => r.picks && r.picks[id] === i);
      return `<div class="panel">${head(v, '<span>🕵️ Waar of nep?</span>')}
        <div class="${qClass(r.q.q)}" style="font-size:2.4em">${fmtQ(r.q.q)}</div>
        <div class="tfopts">${['✅ Waar', '❌ Nep'].map((t, i) => `<div class="tfo ${i ? 'nep' : 'waar'} ${i === r.correct ? 'right' : 'wrong'}">${t}${voters(by(i), m)}</div>`).join('')}</div>
        ${eventsBox(r)}${factBox(r.q)}</div>`;
    },
    wz: (v, r) => {
      const m = pmap(v);
      const a = m[r.author];
      const ps = v.players.filter((p) => p.playing);
      const vot = (id) => Object.keys(r.votes).filter((x) => r.votes[x] === id);
      return `<div class="panel center">
        <div class="qhead"><span class="cat">🗯️ Wie zei dit?</span><span>${r.eno} van ${r.etotal}</span></div>
        <div class="quote">“${esc(r.entry)}”</div>
        <div class="wiegrid">${ps.map((p) => `<div class="wiecard ${p.id === r.author ? 'top' : ''}" style="--c:${p.color}"><div class="av">${p.avatar}</div><div class="nm">${esc(p.name)}</div><div class="voters" style="justify-content:center;min-height:1.6em">${vot(p.id).map((x) => av(m[x])).join('')}</div></div>`).join('')}</div>
        <div class="bonus">${a ? `Het was ${a.avatar} <b>${esc(a.name)}</b>!` : ''} ${r.right.length ? '' : '😈 Niemand had het door'}</div></div>`;
    },
    mc: (v, r) => {
      const m = pmap(v);
      const by = (i) => Object.keys(m).filter((id) => r.picks && r.picks[id] === i);
      return `<div class="panel">${head(v)}
        <div class="${qClass(r.q.q)}" style="font-size:2.3em">${fmtQ(r.q.q)}</div>
        <div class="opts">${r.options.map((o, i) => `<div class="opt ${i === r.correct ? 'right' : 'wrong'}"><span class="l">${LETTERS[i]}</span>${esc(o)}${voters(by(i), m)}</div>`).join('')}</div>
        ${eventsBox(r)}${factBox(r.q)}</div>`;
    },
    final: (v, r) => {
      const m = pmap(v);
      const by = (i) => Object.keys(m).filter((id) => r.picks && r.picks[id] === i);
      return `<div class="panel">${head(v, '<span style="color:var(--amber)">💰 FINALE</span>')}
        <div class="${qClass(r.q.q)}" style="font-size:2.3em">${fmtQ(r.q.q)}</div>
        <div class="opts">${r.options.map((o, i) => `<div class="opt ${i === r.correct ? 'right' : 'wrong'}"><span class="l">${LETTERS[i]}</span>${esc(o)}${voters(by(i), m)}</div>`).join('')}</div>
        <div class="events">${Object.entries(r.wagers).map(([id, w]) => (m[id] ? `<span style="background:${r.right.includes(id) ? 'rgba(61,220,151,.2)' : 'rgba(255,93,93,.2)'};border-color:${r.right.includes(id) ? 'var(--mint)' : 'var(--bad)'}">${m[id].avatar} ${esc(m[id].name)} ${r.right.includes(id) ? '+' : '−'}${w}</span>` : '')).join('')}</div>
        ${factBox(r.q)}</div>`;
    },
    num: (v, r) => {
      const m = pmap(v);
      const betters = (i) => Object.keys(r.bets || {}).filter((id) => r.bets[id] === i);
      return `<div class="panel center">${head(v)}
        <div class="${qClass(r.q.q)}" style="font-size:2.2em">${fmtQ(r.q.q)}</div>
        <div class="answerbig pop">${numFmt(r.q.answer)}${r.q.unit ? ` <small style="font-size:.4em">${esc(r.q.unit)}</small>` : ''}</div>
        <div class="guesses">${r.guesses.map((g, i) => `<div class="guess ${r.closest.includes(i) ? 'win' : 'lose'}"><div class="v">${numFmt(g.v)}</div><div class="by">${g.authors.map((a) => av(m[a])).join('')}</div><div class="bets">${betters(i).length ? '🎲 ' + betters(i).map((a) => av(m[a])).join('') : ''}</div></div>`).join('')}</div>
        ${r.exact ? '<div class="bonus">🎯 Precies goed! +50 bonus</div>' : ''}
        ${eventsBox(r)}${factBox(r.q)}</div>`;
    },
    bluff: (v, r) => {
      const m = pmap(v);
      const vot = (i) => Object.keys(r.votes).filter((id) => r.votes[id] === i);
      return `<div class="panel">${head(v)}
        <div class="${qClass(r.q.q)}" style="font-size:2.2em">${fmtQ(r.q.q)}</div>
        <div class="opts">${r.options.map((o, i) => `<div class="opt ${i === r.truth ? 'right' : ''}" style="flex-wrap:wrap">
          ${i === r.truth ? '<span class="tag" style="background:var(--mint);color:var(--ink)">ECHT</span>' : o.authors.length ? `<span class="tag">nep van ${o.authors.map((a) => esc(m[a] ? m[a].name : '?')).join(' & ')}</span>` : '<span class="tag" style="background:var(--ink-3)">nep van de quizmaster</span>'}
          <span class="l">${LETTERS[i]}</span>${esc(o.text)}${voters(vot(i), m)}</div>`).join('')}</div>
        ${factBox(r.q)}</div>`;
    },
    order: (v, r) => {
      const m = pmap(v);
      const perfect = Object.keys(r.scoresBy || {}).filter((id) => r.scoresBy[id] === 4);
      return `<div class="panel">${head(v)}
        <div class="${qClass(r.q.q)}" style="font-size:2.2em">${fmtQ(r.q.q)}</div>
        <div class="endlabels"><span>⬆️ ${esc(r.q.lo || 'Eerst')}</span><span>${esc(r.q.hi || 'Laatst')} ⬇️</span></div>
        <div class="orderlist">${r.correct.map((idx, i) => `<div class="orow" style="animation-delay:${i * 0.35}s"><span class="num">${i + 1}</span>${esc(r.items[idx])}<span class="val">${esc(r.shows && r.shows[idx] ? r.shows[idx] : valFmt(r.q, r.values[idx]))}</span></div>`).join('')}</div>
        ${perfect.length ? `<div class="bonus">💯 Alles goed: ${perfect.map((id) => esc(m[id] ? m[id].name : '')).join(', ')}</div>` : ''}
        ${eventsBox(r)}${factBox(r.q)}</div>`;
    },
    ken: (v, r) => {
      const m = pmap(v);
      const hot = m[r.hot];
      const by = (i) => Object.keys(r.picks || {}).filter((id) => id !== r.hot && r.picks[id] === i);
      return `<div class="panel">
        <div class="hotseat"><span class="av" style="--c:${hot ? hot.color : '#444'}">${hot ? hot.avatar : '?'}</span><span><b>${hot ? esc(hot.name) : ''}</b> koos…</span></div>
        <div class="${qClass(r.text)}" style="font-size:2.3em">${esc(r.text)}</div>
        <div class="opts">${r.options.map((o, i) => `<div class="opt ${r.hotAns === undefined ? '' : i === r.hotAns ? 'right' : 'wrong'}"><span class="l">${LETTERS[i]}</span>${esc(o)}${voters(by(i), m)}</div>`).join('')}</div>
        ${r.hotAns === undefined ? '<div class="note">De hete stoel gaf geen antwoord 🤐</div>' : ''}</div>`;
    },
    poll: (v, r) => {
      const m = pmap(v);
      const best = Math.min(...Object.values(r.guesses).map((g) => Math.abs(g - r.yes)));
      return `<div class="panel center">
        <div class="qhead"><span class="cat">🙈 Gênante enquête</span></div>
        <div class="${qClass(r.text)}" style="font-size:2.3em">${esc(r.text)}</div>
        <div class="answerbig pop">${r.yes} <small style="font-size:.4em;color:var(--muted)">van de ${r.total} zei ja</small></div>
        <div class="guesses">${Object.entries(r.guesses).map(([id, g]) => (m[id] ? `<div class="guess ${Math.abs(g - r.yes) === best ? 'win' : 'lose'}"><div class="v">${g}</div><div class="by">${av(m[id])}</div></div>` : '')).join('')}</div>
        <div class="qsub" style="margin-top:1em">Wie het dichtst zat: +100 (precies goed: +150). Wie ja zei blijft geheim 🤐</div></div>`;
    },
    wie: (v, r) => {
      const ps = v.players.filter((p) => p.playing);
      return `<div class="panel center">
        <div class="qhead"><span class="cat">🫵 Wie van ons…</span></div>
        <div class="${qClass(r.text)}" style="font-size:2.3em">${esc(r.text)}</div>
        <div class="wiegrid">${ps.map((p) => `<div class="wiecard ${r.top.includes(p.id) && (r.count[p.id] || 0) > 0 ? 'top' : ''}" style="--c:${p.color}"><div class="av">${p.avatar}</div><div class="nm">${esc(p.name)}</div><div class="cnt">${r.count[p.id] || 0}</div></div>`).join('')}</div>
        <div class="qsub" style="margin-top:1em">Wie met de meerderheid meestemde krijgt +100</div></div>`;
    },
  };

  // ---------- timer ----------
  const timerEl = $('#timer');
  function frame() {
    const v = lastView;
    if (v && v.deadline && v.duration) {
      const ref = engine.s.paused ? engine.s.paused.at : Date.now();
      const left = Math.max(0, v.deadline - ref);
      const showTimer = !['intro', 'reveal', 'scores'].includes(v.kind);
      timerEl.classList.toggle('hidden', !showTimer);
      if (showTimer) {
        const frac = left / (v.duration * 1000);
        const c = 2 * Math.PI * 26;
        $('.fg', timerEl).setAttribute('stroke-dasharray', c);
        $('.fg', timerEl).setAttribute('stroke-dashoffset', c * (1 - frac));
        $('span', timerEl).textContent = Math.ceil(left / 1000);
        timerEl.classList.toggle('low', left < 6000);
      }
    } else timerEl.classList.add('hidden');
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  // TV-browser: scherm niet laten slapen
  async function wake() { try { if (navigator.wakeLock) await navigator.wakeLock.request('screen'); } catch (e) {} }
  wake();
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') wake(); });
  // stemmen laden (Chrome laadt ze async)
  if ('speechSynthesis' in window) speechSynthesis.getVoices();

  // toetsenbord-noodknoppen op de TV
  document.addEventListener('keydown', (e) => {
    if (e.key === 'n' && e.ctrlKey) { store.del('gn.host'); location.href = location.pathname + (LOCAL ? '?local=1' : ''); }
  });

  window.GN_TV = { engine };
  render();
})();
