/* Game Night – extra rondes, bovenop de engine:
   De kudde, Golflengte, Eén woord, Emoji-raadsel en Teken-telefoon. */
(function (root) {
  const GN = root.GN || (typeof require !== 'undefined' ? require('./engine.js') : {});
  const { SHOW, norm } = GN.ENG;
  const txt = (v, max) => String(v == null ? '' : v).replace(/\s+/g, ' ').trim().slice(0, max);

  // wie zit er in de hete stoel? (om de beurt)
  function nextHot(eng) {
    const humans = eng.humans().filter((h) => h.connected);
    const players = humans.length ? humans : eng.contestants();
    eng.s.lastHot = (eng.s.lastHot + 1) % players.length;
    return players[eng.s.lastHot];
  }
  const skipRound = (eng) => { const r = eng.s.round; r.done = r.count; return eng.roundScores(); };
  const pay = (eng, gains) => Object.entries(gains).forEach(([pid, g]) => { const p = eng.s.players[pid]; if (p) p.score += g; });
  const add = (gains, pid, g) => { if (pid) gains[pid] = (gains[pid] || 0) + g; };
  // simpele bewerkafstand, voor tikfoutjes
  function lev(a, b) {
    const m = a.length, n = b.length;
    if (Math.abs(m - n) > 2) return 9;
    let prev = Array.from({ length: n + 1 }, (_, j) => j);
    for (let i = 1; i <= m; i++) {
      const cur = [i];
      for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = cur;
    }
    return prev[n];
  }
  const sameWord = (g, w) => {
    const a = norm(g), b = norm(w);
    if (!a) return false;
    if (a === b) return true;
    if (b.length >= 5 && lev(a, b) <= 1) return true;
    if (b.length >= 9 && lev(a, b) <= 2) return true;
    return [b + 'en', b + 's', b + 'je', b + 'tje', b + 'n'].includes(a) || [a + 'en', a + 's', a + 'n'].includes(b);
  };

  // =====================================================================
  // DE KUDDE
  // =====================================================================
  const herdKey = (t) => {
    let k = norm(t);
    if (k.length > 5) k = k.replace(/(en|s)$/, '');
    return k;
  };
  const BOT_HERD = ['pizza', 'bier', 'kaas'];
  GN.addRound('kudde', {
    title: 'De kudde', emoji: '🐑', counts: [3, 4, 5], short: 2, min: 3, after: 'persoonlijk',
    desc: 'Geef hetzelfde antwoord als de meeste anderen. Wie als enige iets anders zegt, krijgt de roze koe.',
    ask() {
      const r = this.s.round;
      const t = this.drawFrom(GN.KUDDE, 'kd:', (x) => x.q);
      if (!t) return skipRound(this);
      this.newStep('kdWrite', { text: t.q, q: { q: t.q, spice: t.spice || 1 }, bot: t.b || null, qno: r.done + 1, qcount: r.count }, 35);
    },
  });
  GN.addStep('kdWrite', {
    need() { return this.active(); },
    action(id, act) {
      const st = this.s.step;
      if (act.a !== 'answer' || st.answers[id] !== undefined) return;
      const t = txt(act.v, 24);
      if (!t) return;
      st.answers[id] = t;
      this.changed();
      this.checkAllIn();
    },
    bot(id, st) { this.action(id, { a: 'answer', v: this.pick((st.bot || BOT_HERD).slice(0, 3)) }); },
    timeout(st) {
      const map = {};
      Object.entries(st.answers).forEach(([pid, t]) => {
        if (!this.s.players[pid]) return;
        const k = herdKey(t) || t;
        (map[k] = map[k] || { text: t, ids: [] }).ids.push(pid);
      });
      const groups = Object.values(map).sort((a, b) => b.ids.length - a.ids.length);
      const max = groups.length ? groups[0].ids.length : 0;
      const gains = {};
      const top = [];
      if (max >= 2) groups.forEach((g, i) => { if (g.ids.length === max) { top.push(i); g.ids.forEach((pid) => add(gains, pid, 100)); } });
      const loners = groups.filter((g) => g.ids.length === 1);
      let cow = null;
      if (max >= 2 && loners.length === 1) {
        cow = loners[0].ids[0];
        const p = this.s.players[cow];
        const loss = Math.min(50, Math.max(0, p.score));
        if (loss) gains[cow] = -loss;
      }
      pay(this, gains);
      this.reveal({ of: 'kd', text: st.text, groups, top, cow, gains, events: [], qno: st.qno, qcount: st.qcount }, SHOW.revealLong);
    },
    tv(st, v) { v.text = st.text; },
    phone(st, v, id) {
      v.screen = 'textin';
      v.head = '🐑 De kudde';
      v.q = st.text;
      v.sub = 'Typ wat volgens jou de meeste anderen ook antwoorden. Kort en simpel!';
      v.max = 24; v.placeholder = 'Jouw antwoord';
      v.myAnswer = st.answers[id];
    },
  });
  GN.addReveal('kd', {
    line(id, st) {
      if (st.cow === id) return 'Jij krijgt de roze koe 🐄';
      const gi = st.groups.findIndex((g) => g.ids.includes(id));
      if (gi < 0) return 'Niks ingevuld';
      return st.top.includes(gi) ? `Je zat bij de kudde: "${st.groups[gi].text}"` : 'Je zat niet bij de grootste groep';
    },
  });

  // =====================================================================
  // GOLFLENGTE
  // =====================================================================
  const golfPoints = (d) => (d <= 4 ? 100 : d <= 10 ? 70 : d <= 18 ? 40 : d <= 28 ? 15 : 0);
  GN.addRound('golf', {
    title: 'Golflengte', emoji: '📡', counts: [2, 3, 4], short: 1, min: 2, after: 'kudde',
    desc: 'Eén speler ziet een geheim punt op een schaal en geeft een hint. De rest schuift zo dicht mogelijk bij dat punt.',
    ask() {
      const r = this.s.round;
      const t = this.drawFrom(GN.GOLF, 'gf:', (x) => x.lo + x.hi);
      if (!t) return skipRound(this);
      const hot = nextHot(this);
      this.newStep('gfClue', { hot: hot.id, lo: t.lo, hi: t.hi, target: 5 + Math.floor(this.rand() * 91), q: { q: `${t.lo} ↔ ${t.hi}`, spice: t.spice || 1 }, qno: r.done + 1, qcount: r.count }, 50);
    },
  });
  GN.addStep('gfClue', {
    need(st) { return this.active().filter((p) => p.id === st.hot); },
    action(id, act) {
      const st = this.s.step;
      if (act.a !== 'answer' || id !== st.hot || st.answers[id] !== undefined) return;
      const t = txt(act.v, 40);
      if (!t) return;
      st.answers[id] = t;
      this.changed();
      this.checkAllIn();
    },
    bot(id, st) { this.action(id, { a: 'answer', v: `Ongeveer ${Math.round(st.target / 10) * 10} op 100` }); },
    timeout(st) {
      const clue = st.answers[st.hot] || 'Geen hint… gok maar!';
      this.newStep('gfGuess', { hot: st.hot, lo: st.lo, hi: st.hi, target: st.target, clue, q: st.q, qno: st.qno, qcount: st.qcount }, 30);
    },
    tv(st, v) { v.hot = st.hot; v.lo = st.lo; v.hi = st.hi; },
    phone(st, v, id) {
      if (st.hot !== id) { v.screen = 'wait'; v.big = '📡'; v.title = `${this.name(st.hot)} bedenkt een hint`; v.sub = `Schaal: ${st.lo} ↔ ${st.hi}`; return; }
      v.screen = 'gfclue';
      v.lo = st.lo; v.hi = st.hi; v.target = st.target;
      v.myAnswer = st.answers[id];
    },
  });
  GN.addStep('gfGuess', {
    need(st) { return this.active().filter((p) => p.id !== st.hot); },
    action(id, act) {
      const st = this.s.step;
      if (act.a !== 'answer' || id === st.hot || st.answers[id] !== undefined) return;
      const v = Math.round(Number(act.v));
      if (!(v >= 0 && v <= 100)) return;
      st.answers[id] = v;
      this.changed();
      this.checkAllIn();
    },
    bot(id, st) { this.action(id, { a: 'answer', v: Math.max(0, Math.min(100, Math.round(st.target + (this.rand() - 0.5) * 50))) }); },
    timeout(st) {
      const gains = {};
      let sum = 0, n = 0;
      Object.entries(st.answers).forEach(([pid, v]) => {
        const g = golfPoints(Math.abs(v - st.target));
        if (g) add(gains, pid, g);
        sum += g; n++;
        if (g >= 70) { const p = this.s.players[pid]; if (p) p.stats.kenCorrect++; }
      });
      const hg = n ? Math.round(sum / n / 5) * 5 : 0;
      if (hg) add(gains, st.hot, hg);
      pay(this, gains);
      this.reveal({ of: 'gf', hot: st.hot, lo: st.lo, hi: st.hi, clue: st.clue, target: st.target, guesses: st.answers, gains, events: [], qno: st.qno, qcount: st.qcount }, SHOW.revealLong);
    },
    tv(st, v) { v.hot = st.hot; v.lo = st.lo; v.hi = st.hi; v.clue = st.clue; },
    phone(st, v, id) {
      if (st.hot === id) { v.screen = 'wait'; v.big = '🤞'; v.title = 'Ze raden jouw hint'; v.sub = `"${st.clue}"`; return; }
      v.screen = 'slider';
      v.lo = st.lo; v.hi = st.hi; v.clue = st.clue; v.hotName = this.name(st.hot);
      v.myAnswer = st.answers[id];
    },
  });
  GN.addReveal('gf', {
    line(id, st) {
      if (st.hot === id) return st.gains[id] ? 'De groep zat op jouw golflengte!' : 'Niemand snapte je hint…';
      const g = st.guesses[id];
      if (g === undefined) return 'Niet geschoven';
      const d = Math.abs(g - st.target);
      return d <= 4 ? 'Precies raak! 🎯' : `Je zat er ${d} naast`;
    },
  });

  // =====================================================================
  // EÉN WOORD
  // =====================================================================
  const BOT_CLUES = ['ding', 'bekend', 'vaak', 'groot', 'mooi', 'thuis', 'buiten', 'lekker'];
  GN.addRound('woord', {
    title: 'Eén woord', emoji: '☝️', counts: [2, 3, 4], short: 1, min: 3, after: 'golf',
    desc: 'Samen helpen jullie één speler een geheim woord te raden. Iedereen geeft één hint van één woord, maar dubbele hints vallen weg.',
    ask() {
      const r = this.s.round;
      const t = this.drawFrom(GN.WOORDEN, 'ew:', (x) => x.w);
      if (!t) return skipRound(this);
      const hot = nextHot(this);
      this.newStep('ewClue', { hot: hot.id, word: t.w, rejected: {}, qno: r.done + 1, qcount: r.count }, 40);
    },
  });
  GN.addStep('ewClue', {
    need(st) { return this.active().filter((p) => p.id !== st.hot); },
    action(id, act, p) {
      const st = this.s.step;
      if (act.a !== 'answer' || id === st.hot || st.answers[id] !== undefined) return;
      const t = txt(act.v, 20);
      const k = norm(t), w = norm(st.word);
      // één woord, en niet (een stuk van) het geheime woord zelf
      if (!t || /\s/.test(t) || !k || k === w || (k.length >= 3 && (w.includes(k) || k.includes(w)))) {
        st.rejected[id] = true;
        if (p.isBot) { st.answers[id] = 'ding'; this.changed(); return this.checkAllIn(); }
        return this.changed();
      }
      delete st.rejected[id];
      st.answers[id] = t;
      this.changed();
      this.checkAllIn();
    },
    bot(id, st) { this.action(id, { a: 'answer', v: BOT_CLUES[this.players.findIndex((p) => p.id === id) % BOT_CLUES.length] }); },
    timeout(st) {
      const map = {};
      Object.entries(st.answers).forEach(([pid, t]) => { const k = herdKey(t); (map[k] = map[k] || { text: t, ids: [] }).ids.push(pid); });
      const clues = this.shuffle(Object.values(map)).map((c) => ({ text: c.text, ids: c.ids, x: c.ids.length > 1 }));
      this.newStep('ewGuess', { hot: st.hot, word: st.word, clues, qno: st.qno, qcount: st.qcount }, 40);
    },
    tv(st, v) { v.hot = st.hot; },
    phone(st, v, id) {
      if (st.hot === id) { v.screen = 'wait'; v.big = '🙈'; v.title = 'Jij moet straks raden'; v.sub = 'De anderen bedenken hints. Niet spieken op andermans telefoon!'; v.noRoom = true; return; }
      v.screen = 'textin';
      v.head = `☝️ Eén woord · help ${this.name(st.hot)}`;
      v.q = `Het geheime woord is: ${st.word.toUpperCase()}`;
      v.sub = 'Geef één hint van precies één woord. Geeft iemand dezelfde hint? Dan vallen ze allebei weg.';
      v.max = 20; v.placeholder = 'Eén woord'; v.oneWord = true;
      v.rejected = !!st.rejected[id];
      if (v.rejected) v.key += ':r';
      v.rejectText = 'Dat mag niet: precies één woord, en niet het woord zelf.';
      v.myAnswer = st.answers[id];
    },
  });
  GN.addStep('ewGuess', {
    need(st) { return this.active().filter((p) => p.id === st.hot); },
    action(id, act) {
      const st = this.s.step;
      if (act.a !== 'answer' || id !== st.hot || st.answers[id] !== undefined) return;
      const t = txt(act.v, 30);
      if (!t) return;
      st.answers[id] = t;
      this.changed();
      this.checkAllIn();
    },
    bot(id, st) { this.action(id, { a: 'answer', v: this.rand() < 0.4 ? st.word : 'geen idee' }); },
    timeout(st) {
      const guess = st.answers[st.hot] || '';
      const ok = sameWord(guess, st.word);
      const gains = {};
      if (ok) {
        add(gains, st.hot, 100);
        st.clues.forEach((c) => c.ids.forEach((pid) => add(gains, pid, c.x ? 20 : 60)));
        const p = this.s.players[st.hot];
        if (p) p.stats.correct++;
      }
      pay(this, gains);
      this.reveal({ of: 'ew', hot: st.hot, word: st.word, clues: st.clues, guess, ok, gains, events: [], qno: st.qno, qcount: st.qcount }, SHOW.revealLong);
    },
    tv(st, v) { v.hot = st.hot; v.clues = st.clues.map((c) => (c.x ? { x: true } : { text: c.text })); },
    phone(st, v, id) {
      if (st.hot !== id) { v.screen = 'wait'; v.big = '🤞'; v.title = `${this.name(st.hot)} raadt…`; v.sub = `Het woord is ${st.word.toUpperCase()}. Niks verklappen!`; v.noRoom = true; return; }
      const open = st.clues.filter((c) => !c.x).map((c) => c.text);
      v.screen = 'textin';
      v.head = '☝️ Eén woord · jij raadt!';
      v.q = 'Welk woord zoeken we?';
      v.chips = open;
      v.sub = open.length ? 'Dit zijn de hints die overbleven:' : 'Alle hints waren dubbel… gok maar!';
      v.max = 30; v.placeholder = 'Jouw gok';
      v.myAnswer = st.answers[id];
    },
  });
  GN.addReveal('ew', {
    line(id, st) {
      if (st.hot === id) return st.ok ? `Geraden: ${st.word}!` : `Het was: ${st.word}`;
      const c = st.clues.find((x) => x.ids.includes(id));
      if (!c) return st.ok ? 'Geraden!' : `Niet geraden: ${st.word}`;
      return (c.x ? 'Jouw hint viel weg (dubbel). ' : '') + (st.ok ? 'Geraden!' : 'Niet geraden…');
    },
  });

  // =====================================================================
  // EMOJI-RAADSEL (loopt verder als gewone meerkeuzevraag)
  // =====================================================================
  const EMOJI_Q = { film: 'Welke film of serie is dit?', lied: 'Welk liedje is dit?', gezegde: 'Welk spreekwoord of gezegde is dit?', ding: 'Wat wordt hier bedoeld?', bn: 'Welke bekende persoon is dit?', plek: 'Welke plek is dit?' };
  GN.addRound('emoji', {
    title: 'Emoji-raadsel', emoji: '😎', counts: [3, 4, 5], short: 3, after: 'tf',
    desc: 'Raad de film, het liedje of het spreekwoord uit de emoji\'s.',
    ask() {
      const r = this.s.round;
      const e = this.drawFrom(GN.EMOJI, 'em:', (x) => x.e + x.a[0]);
      if (!e) return skipRound(this);
      const q = { q: EMOJI_Q[e.k] || EMOJI_Q.ding, emoji: e.e, a: e.a, spice: e.spice || 1, fact: e.fact, type: 'mc' };
      const opts = this.shuffle(q.a.map((t, i) => ({ t, ok: i === 0 })));
      this.newStep('mc', { q, cat: null, options: opts.map((o) => o.t), correct: opts.findIndex((o) => o.ok), qno: r.done + 1, qcount: r.count, skippedNote: null }, 30);
    },
  });

  // =====================================================================
  // TEKEN-TELEFOON
  // =====================================================================
  GN.addRound('telefoon', {
    title: 'Teken-telefoon', emoji: '☎️', counts: [1, 1, 1], short: 1, min: 3, after: 'teken',
    desc: 'Schrijf een zin, de volgende tekent hem, de volgende beschrijft die tekening… Aan het eind zie je hoe het ontspoorde.',
    ask() {
      const r = this.s.round;
      const players = this.shuffle(this.active().map((p) => p.id));
      if (players.length < 3) return skipRound(this);
      const C = Math.min(players.length, 6);
      r.tt = { players, chains: Array.from({ length: C }, () => ({ items: [] })), turn: 0, T: players.length >= 4 ? 4 : 3, idx: 0 };
      ttTurn(this);
    },
  });
  function ttTurn(eng) {
    const r = eng.s.round;
    const k = r.tt;
    const mode = k.turn === 0 ? 'write' : k.turn % 2 === 1 ? 'draw' : 'desc';
    const assign = {}, prev = {}, sugg = {};
    const pool = eng.shuffle((GN.TEKEN || []).filter((t) => (t.spice || 1) <= eng.s.settings.spice).map((t) => t.q));
    k.chains.forEach((ch, ci) => {
      const pid = k.players[(ci + k.turn) % k.players.length];
      assign[pid] = ci;
      const last = ch.items[ch.items.length - 1];
      if (last) prev[pid] = last.t === 'draw' ? { d: last.d } : { text: last.text };
      if (mode === 'write') sugg[pid] = pool[ci % Math.max(1, pool.length)] || 'Een kat op een fiets';
    });
    eng.newStep('tt', { mode, turn: k.turn, T: k.T, assign, prev, sugg, drawings: {}, qno: r.done + 1, qcount: r.count }, mode === 'draw' ? 80 : 50);
  }
  function ttShow(eng) {
    const r = eng.s.round;
    const k = r.tt;
    const items = k.chains[k.idx].items.map((it) => Object.assign({ author: it.by }, it));
    eng.newStep('ttShow', { items, sno: k.idx + 1, stotal: k.chains.length, qno: r.done + 1, qcount: r.count }, 22 + items.length * 4);
  }
  GN.addStep('tt', {
    need(st) { return this.active().filter((p) => st.assign[p.id] !== undefined); },
    action(id, act) {
      const st = this.s.step;
      if (st.assign[id] === undefined || st.answers[id] !== undefined) return;
      if (st.mode === 'draw') {
        if (act.a !== 'draw') return;
        const d = this.cleanDrawing(act.v);
        if (!d) return;
        st.drawings[id] = d;
        st.answers[id] = true;
      } else {
        if (act.a !== 'answer') return;
        const t = txt(act.v, 70);
        if (!t) return;
        st.answers[id] = t;
      }
      this.changed();
      this.checkAllIn();
    },
    bot(id, st) {
      if (st.mode === 'draw') return this.action(id, { a: 'draw', v: this.botScribble() });
      this.action(id, { a: 'answer', v: st.mode === 'write' ? st.sugg[id] : this.pick(['Een soort wolk met pootjes?', 'Bliep. Ik zie een aardappel.', 'Abstracte kunst']) });
    },
    timeout(st) {
      const k = this.s.round.tt;
      Object.entries(st.assign).forEach(([pid, ci]) => {
        const done = st.answers[pid] !== undefined;
        if (st.mode === 'draw') k.chains[ci].items.push({ t: 'draw', d: done && st.drawings[pid] && st.drawings[pid].length ? st.drawings[pid] : this.botScribble(), by: done ? pid : null });
        else k.chains[ci].items.push({ t: 'text', text: done ? st.answers[pid] : st.mode === 'write' ? st.sugg[pid] : 'Geen idee wat dit moet voorstellen', by: done ? pid : null });
      });
      k.turn++;
      if (k.turn < k.T) return ttTurn(this);
      k.idx = 0;
      ttShow(this);
    },
    tv(st, v) { v.mode = st.mode; v.turn = st.turn; v.T = st.T; },
    phone(st, v, id) {
      const ci = st.assign[id];
      if (ci === undefined) { v.screen = 'wait'; v.big = '☎️'; v.title = 'Even pauze'; v.sub = 'Deze beurt zijn de anderen bezig.'; return; }
      const pv = st.prev[id];
      if (st.mode === 'write') {
        v.screen = 'textin';
        v.head = '☎️ Teken-telefoon · stap 1';
        v.q = 'Bedenk een zin die iemand anders moet tekenen';
        v.sub = 'Hoe gekker, hoe leuker. Geen inspiratie? Gebruik het voorbeeld.';
        v.max = 70; v.placeholder = 'Bijv. een kat op een fiets'; v.suggest = st.sugg[id]; v.area = true;
      } else if (st.mode === 'draw') {
        v.screen = 'draw';
        v.prompt = pv ? pv.text : '';
        v.drawHead = '☎️ Teken dit zo goed als je kunt';
      } else {
        v.screen = 'textin';
        v.head = '☎️ Teken-telefoon';
        v.q = 'Wat is dit volgens jou?';
        v.sub = 'Beschrijf in één zin wat je ziet. De volgende moet het weer natekenen.';
        v.max = 70; v.placeholder = 'Ik zie…'; v.drawing = pv ? pv.d : null; v.area = true;
      }
      v.myAnswer = st.answers[id];
    },
  });
  GN.addStep('ttShow', {
    need(st) { return this.active().filter((p) => this.canVoteOn(st.items, p.id)); },
    action(id, act) {
      const st = this.s.step;
      if (act.a !== 'answer' || st.answers[id] !== undefined) return;
      const v = act.v;
      if (!Number.isInteger(v) || !st.items[v] || st.items[v].author === id) return;
      st.answers[id] = v;
      this.changed();
      this.checkAllIn();
    },
    bot(id, st) {
      const c = st.items.map((_, i) => i).filter((i) => st.items[i].author !== id);
      if (c.length) this.action(id, { a: 'answer', v: this.pick(c) });
    },
    timeout(st) {
      const gains = {};
      Object.values(st.answers).forEach((i) => add(gains, st.items[i] && st.items[i].author, 50));
      const { n, top } = this.voteTally(st.answers);
      top.forEach((i) => add(gains, st.items[i].author, 50));
      pay(this, gains);
      this.reveal({ of: 'tt', judged: false, items: st.items, votes: st.answers, counts: n, top, gains, events: [], sno: st.sno, stotal: st.stotal, qno: st.qno, qcount: st.qcount }, SHOW.revealLong);
    },
    tv(st, v) { v.items = st.items.map((it) => (it.t === 'draw' ? { t: 'draw', d: it.d } : { t: 'text', text: it.text })); v.sno = st.sno; v.stotal = st.stotal; },
    phone(st, v, id) {
      if (!this.canVoteOn(st.items, id)) { v.screen = 'wait'; v.big = '📺'; v.title = 'Kijk naar de TV!'; v.sub = ''; return; }
      v.screen = 'bluffvote';
      v.q = `Ketting ${st.sno} van ${st.stotal}`;
      v.voteSub = 'Kijk naar de TV. Welke stap is het leukst?';
      v.mineLabel = 'van jou';
      v.options = st.items.map((it, i) => ({ text: it.t === 'draw' ? `🎨 Tekening (stap ${i + 1})` : `✍️ ${it.text}`, mine: it.author === id }));
      v.myAnswer = st.answers[id];
    },
  });
  GN.addReveal('tt', {
    next(st, r) {
      if (r.tt && r.tt.idx < r.tt.chains.length - 1) { r.tt.idx++; ttShow(this); return true; }
      return false;
    },
    line(id, st) {
      return st.items.some((it, i) => it.author === id && st.top.includes(i)) ? 'Jouw stap was het leukst! 🏆' : st.gains[id] ? 'Stemmen voor jouw stap' : 'Op naar de volgende ketting';
    },
  });

  GN.ROUNDS2 = { sameWord, herdKey, golfPoints };
  if (typeof module !== 'undefined') module.exports = GN;
})(typeof window !== 'undefined' ? window : globalThis);
