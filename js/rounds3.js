/* Game Night – nog meer rondes:
   Wie van ons…?, Liever… of…?, Grapjas-duel en Kaartenkoning (grove kaarten, zwarte humor). */
(function (root) {
  const GN = root.GN || (typeof require !== 'undefined' ? require('./engine.js') : {});
  const { SHOW, TIME } = GN.ENG;
  const txt = (v, max) => String(v == null ? '' : v).replace(/\s+/g, ' ').trim().slice(0, max);
  const skipRound = (eng) => { const r = eng.s.round; r.done = r.count; return eng.roundScores(); };
  const pay = (eng, gains) => Object.entries(gains).forEach(([pid, g]) => { const p = eng.s.players[pid]; if (p) p.score += g; });
  const add = (gains, pid, g) => { if (pid) gains[pid] = (gains[pid] || 0) + g; };

  // =====================================================================
  // WIE VAN ONS…?  (iedereen wijst iemand aan; met de meerderheid meestemmen levert punten op)
  // =====================================================================
  GN.addRound('waarsch', {
    title: 'Wie van ons…?', emoji: '👉', counts: [4, 5, 7], short: 3, min: 3, after: 'persoonlijk',
    desc: 'Wie van jullie zou het eerst… ? Wijs iemand aan. Stem je met de meerderheid mee, dan krijg je punten.',
    ask() {
      const r = this.s.round;
      const t = this.drawFrom(GN.WAARSCH, 'ws:', (x) => x.q);
      if (!t) return skipRound(this);
      this.newStep('wie', { q: { q: t.q, spice: t.spice || 1, type: 'wie' }, text: t.q, qno: r.done + 1, qcount: r.count }, TIME.wie);
    },
  });

  // =====================================================================
  // LIEVER… OF…?  (kies zelf, en voorspel wat de meerderheid kiest)
  // =====================================================================
  GN.addRound('liever', {
    title: 'Liever… of…?', emoji: '⚖️', counts: [4, 5, 6], short: 3, min: 2, after: 'waarsch',
    desc: 'Twee nare (of heerlijke) keuzes. Kies wat jij liever hebt en voorspel wat de meesten kiezen.',
    ask() {
      const r = this.s.round;
      const t = this.drawFrom(GN.LIEVER, 'lv:', (x) => x.a + '|' + x.b);
      if (!t) return skipRound(this);
      const flip = this.rand() < 0.5;
      this.newStep('lvPick', { a: flip ? t.b : t.a, b: flip ? t.a : t.b, q: { q: 'Wat heb je liever?', spice: t.spice || 1 }, qno: r.done + 1, qcount: r.count }, 30);
    },
  });
  GN.addStep('lvPick', {
    need() { return this.active(); },
    action(id, act) {
      const st = this.s.step;
      if (act.a !== 'answer' || st.answers[id] !== undefined) return;
      const v = act.v || {};
      if (![0, 1].includes(v.me) || ![0, 1].includes(v.guess)) return;
      st.answers[id] = { me: v.me, guess: v.guess };
      this.changed();
      this.checkAllIn();
    },
    bot(id) { this.action(id, { a: 'answer', v: { me: this.rand() < 0.5 ? 0 : 1, guess: this.rand() < 0.5 ? 0 : 1 } }); },
    timeout(st) {
      const n = [0, 0];
      Object.entries(st.answers).forEach(([pid, x]) => { if (this.s.players[pid]) n[x.me]++; });
      const tie = n[0] === n[1];
      const win = tie ? -1 : n[0] > n[1] ? 0 : 1;
      const gains = {};
      Object.entries(st.answers).forEach(([pid, x]) => { if (!this.s.players[pid]) return; if (tie) add(gains, pid, 50); else if (x.guess === win) add(gains, pid, 100); });
      pay(this, gains);
      this.reveal({ of: 'lv', judged: false, a: st.a, b: st.b, picks: st.answers, n, win, tie, gains, events: [], qno: st.qno, qcount: st.qcount }, SHOW.reveal);
    },
    tv(st, v) { v.a = st.a; v.b = st.b; },
    phone(st, v, id) {
      v.screen = 'liever';
      v.a = st.a; v.b = st.b;
      v.myAnswer = st.answers[id];
    },
  });
  GN.addReveal('lv', {
    line(id, st) {
      const x = st.picks[id];
      if (!x) return 'Niks gekozen';
      if (st.tie) return 'Precies gelijk! Iedereen 50 punten';
      return x.guess === st.win ? 'Goed voorspeld wat de meesten kozen' : 'De meesten kozen het andere';
    },
  });

  // =====================================================================
  // GRAPJAS-DUEL  (iedereen beantwoordt twee vragen; per vraag een duel, de rest stemt)
  // =====================================================================
  const BOT_DUEL = ['Mijn schoonmoeder', 'Een natte sok', 'Drie kabouters in een trenchcoat', 'Belastingaangifte', 'Een lauwe frikandel', 'Opa zijn kunstgebit', 'Een boze zwaan', 'Carnaval in Oss'];
  GN.addRound('duel', {
    title: 'Grapjas-duel', emoji: '🤺', counts: [1, 1, 2], short: 1, min: 3, after: 'wiezei',
    desc: 'Je krijgt twee vragen. Verzin het grappigste antwoord. Daarna duel je steeds met één ander, en de rest stemt wie de grapjas is.',
    ask() {
      const r = this.s.round;
      const ids = this.shuffle(this.active().map((p) => p.id));
      if (ids.length < 3) return skipRound(this);
      const N = Math.min(ids.length, 8);
      const players = ids.slice(0, N);
      const prompts = [];
      for (let i = 0; i < N; i++) {
        const t = this.drawFrom(GN.DUEL, 'du:', (x) => x.q);
        if (!t) return skipRound(this);
        prompts.push({ q: t.q, spice: t.spice || 1, by: [players[i], players[(i + 1) % N]] });
      }
      const mine = {};
      prompts.forEach((pr, i) => pr.by.forEach((pid) => (mine[pid] = mine[pid] || []).push(i)));
      r.du = { prompts, idx: 0 };
      this.newStep('dlWrite', { prompts: prompts.map((p) => ({ q: p.q, spice: p.spice })), mine, texts: {}, q: { q: 'Grapjas-duel', spice: Math.max(...prompts.map((p) => p.spice)) }, qno: r.done + 1, qcount: r.count }, 90);
    },
  });
  GN.addStep('dlWrite', {
    need(st) { return this.active().filter((p) => st.mine[p.id]); },
    action(id, act) {
      const st = this.s.step;
      if (act.a !== 'answer' || !st.mine[id] || st.answers[id] !== undefined) return;
      const t = txt(act.v, 80);
      if (!t) return;
      const my = (st.texts[id] = st.texts[id] || {});
      const next = st.mine[id].find((i) => my[i] === undefined);
      if (next === undefined) return;
      my[next] = t;
      if (st.mine[id].every((i) => my[i] !== undefined)) st.answers[id] = true;
      this.changed();
      this.checkAllIn();
    },
    bot(id, st) {
      st.mine[id].forEach(() => this.action(id, { a: 'answer', v: this.pick(BOT_DUEL) }));
    },
    timeout(st) {
      const du = this.s.round.du;
      du.prompts.forEach((pr, i) => {
        pr.ans = pr.by.map((pid) => ({ author: pid, text: (st.texts[pid] && st.texts[pid][i]) || null }));
      });
      du.idx = 0;
      dlVote(this);
    },
    tv(st, v) { v.n = st.prompts.length; v.done = Object.keys(st.answers).length; },
    phone(st, v, id) {
      const list = st.mine[id];
      if (!list) { v.screen = 'wait'; v.big = '🤺'; v.title = 'Even pauze'; v.sub = 'De anderen zijn aan het duelleren.'; return; }
      const my = st.texts[id] || {};
      const next = list.find((i) => my[i] === undefined);
      const k = list.filter((i) => my[i] !== undefined).length;
      v.key += ':' + k;
      v.screen = 'textin';
      if (next === undefined) { v.answered = true; v.myAnswer = null; return; }
      v.head = `🤺 Grapjas-duel · vraag ${k + 1} van ${list.length}`;
      v.q = st.prompts[next].q;
      v.sub = 'Verzin het grappigste antwoord. Iemand anders krijgt dezelfde vraag.';
      v.max = 80; v.placeholder = 'Jouw antwoord'; v.area = true;
      v.myAnswer = undefined;
    },
  });
  function dlVote(eng) {
    const r = eng.s.round;
    const du = r.du;
    const pr = du.prompts[du.idx];
    // wie niks invulde, verliest walkover
    const live = pr.ans.filter((a) => a.text);
    if (live.length < 2) {
      const gains = {};
      live.forEach((a) => add(gains, a.author, 100));
      pay(eng, gains);
      return eng.reveal({ of: 'dl', judged: false, prompt: pr.q, ans: pr.ans, order: [0, 1], votes: {}, counts: {}, winner: live.length ? pr.ans.indexOf(live[0]) : -1, sweep: false, walkover: true, gains, events: [], dno: du.idx + 1, dtotal: du.prompts.length, qno: r.done + 1, qcount: r.count }, SHOW.revealShort);
    }
    const order = eng.rand() < 0.5 ? [0, 1] : [1, 0];
    eng.newStep('dlVote', { q: { q: pr.q, spice: pr.spice }, prompt: pr.q, items: order.map((i) => ({ text: pr.ans[i].text, author: pr.ans[i].author })), order, dno: du.idx + 1, dtotal: du.prompts.length, qno: r.done + 1, qcount: r.count }, 25);
  }
  GN.addStep('dlVote', {
    need(st) { return this.active().filter((p) => !st.items.some((x) => x.author === p.id)); },
    action(id, act) {
      const st = this.s.step;
      if (act.a !== 'answer' || st.answers[id] !== undefined) return;
      if (st.items.some((x) => x.author === id) || ![0, 1].includes(act.v)) return;
      st.answers[id] = act.v;
      this.changed();
      this.checkAllIn();
    },
    bot(id, st) { if (!st.items.some((x) => x.author === id)) this.action(id, { a: 'answer', v: this.rand() < 0.5 ? 0 : 1 }); },
    timeout(st) {
      const du = this.s.round.du;
      const pr = du.prompts[du.idx];
      const c = [0, 0];
      Object.values(st.answers).forEach((i) => c[i]++);
      const gains = {};
      st.items.forEach((x, i) => add(gains, x.author, c[i] * 50));
      const total = c[0] + c[1];
      let winner = -1, sweep = false;
      if (c[0] !== c[1]) {
        const w = c[0] > c[1] ? 0 : 1;
        winner = pr.ans.findIndex((a) => a.author === st.items[w].author);
        add(gains, st.items[w].author, 50);
        if (total >= 2 && c[1 - w] === 0) { sweep = true; add(gains, st.items[w].author, 100); }
      }
      pay(this, gains);
      const counts = {};
      st.items.forEach((x, i) => (counts[pr.ans.findIndex((a) => a.author === x.author)] = c[i]));
      const votes = {};
      Object.entries(st.answers).forEach(([pid, i]) => (votes[pid] = pr.ans.findIndex((a) => a.author === st.items[i].author)));
      if (sweep) { const p = this.s.players[st.items[c[0] > c[1] ? 0 : 1].author]; if (p) p.stats.duelSweeps = (p.stats.duelSweeps || 0) + 1; }
      this.reveal({ of: 'dl', judged: false, prompt: pr.q, ans: pr.ans, votes, counts, winner, sweep, walkover: false, gains, events: [], dno: st.dno, dtotal: st.dtotal, qno: st.qno, qcount: st.qcount }, SHOW.reveal);
    },
    tv(st, v) { v.prompt = st.prompt; v.items = st.items.map((x) => ({ text: x.text })); v.dno = st.dno; v.dtotal = st.dtotal; },
    phone(st, v, id) {
      if (st.items.some((x) => x.author === id)) { v.screen = 'wait'; v.big = '🤺'; v.title = 'Dit is jouw duel!'; v.sub = 'De anderen stemmen nu. Duimen maar.'; return; }
      v.screen = 'bluffvote';
      v.q = st.prompt;
      v.voteSub = 'Welk antwoord is het grappigst?';
      v.options = st.items.map((x) => ({ text: x.text }));
      v.myAnswer = st.answers[id];
    },
  });
  GN.addReveal('dl', {
    next(st, r) {
      if (r.du && r.du.idx < r.du.prompts.length - 1) { r.du.idx++; dlVote(this); return true; }
      return false;
    },
    line(id, st) {
      const i = st.ans.findIndex((a) => a.author === id);
      if (i < 0) return st.votes[id] !== undefined ? 'Stem geteld' : 'Op naar het volgende duel';
      if (st.winner === i) return st.sweep ? 'GRAPJAS! Alle stemmen voor jou 🃏' : 'Duel gewonnen! 🤺';
      return st.winner === -1 ? 'Gelijkspel' : 'Duel verloren… volgende keer beter';
    },
  });

  // =====================================================================
  // KAARTENKONING  (zwarte kaart met een gat, iedereen legt een witte kaart, de koning kiest)
  // =====================================================================
  const HAND = 7;
  const fillHand = (eng, kk, pid) => {
    const h = (kk.hands[pid] = kk.hands[pid] || []);
    while (h.length < HAND) {
      if (!kk.deck.length) kk.deck = eng.shuffle(kk.pool.filter((c) => !Object.values(kk.hands).some((x) => x.includes(c))));
      if (!kk.deck.length) break;
      h.push(kk.deck.pop());
    }
  };
  GN.addRound('kaarten', {
    title: 'Kaartenkoning', emoji: '🃏', counts: [3, 4, 6], short: 2, min: 3, after: 'duel',
    desc: 'Een zwarte kaart met een gat. Iedereen legt de grofste of grappigste witte kaart. De koning van de beurt kiest de winnaar.',
    ask() {
      const r = this.s.round;
      const ids = this.active().map((p) => p.id);
      if (ids.length < 3) return skipRound(this);
      const spice = this.s.settings.spice;
      if (!r.kk) {
        const pool = (GN.WIT || []).filter((c) => (c.spice || 1) <= spice).map((c) => c.t);
        r.kk = { pool, deck: this.shuffle(pool.slice()), hands: {}, king: -1 };
      }
      const kk = r.kk;
      const black = this.drawFrom(GN.ZWART, 'zw:', (x) => x.q);
      if (!black) return skipRound(this);
      const humans = this.humans().filter((h) => h.connected && h.playing).map((h) => h.id);
      const kings = humans.length ? humans : ids;
      kk.king = (kk.king + 1) % kings.length;
      const king = kings[kk.king];
      ids.forEach((pid) => fillHand(this, kk, pid));
      const hands = {};
      ids.forEach((pid) => (hands[pid] = kk.hands[pid].slice()));
      this.newStep('kkPlay', { black: black.q, q: { q: black.q, spice: black.spice || 1 }, king, hands, own: {}, qno: r.done + 1, qcount: r.count }, 45);
    },
  });
  GN.addStep('kkPlay', {
    need(st) { return this.active().filter((p) => p.id !== st.king && st.hands[p.id]); },
    action(id, act) {
      const st = this.s.step;
      if (act.a !== 'answer' || id === st.king || !st.hands[id] || st.answers[id] !== undefined) return;
      const v = act.v;
      if (Number.isInteger(v) && st.hands[id][v] !== undefined) st.answers[id] = v;
      else if (v && typeof v === 'object' && typeof v.own === 'string' && txt(v.own, 60)) { st.answers[id] = -1; st.own[id] = txt(v.own, 60); }
      else return;
      this.changed();
      this.checkAllIn();
    },
    bot(id, st) { if (id !== st.king && st.hands[id]) this.action(id, { a: 'answer', v: Math.floor(this.rand() * st.hands[id].length) }); },
    timeout(st) {
      const kk = this.s.round.kk;
      const cards = [];
      Object.entries(st.answers).forEach(([pid, i]) => {
        if (!this.s.players[pid]) return;
        let text;
        if (i === -1) text = st.own[pid];
        else { text = st.hands[pid][i]; const h = kk.hands[pid]; const k = h.indexOf(text); if (k >= 0) h.splice(k, 1); }
        if (text) cards.push({ text, author: pid, own: i === -1 });
      });
      if (!cards.length) { this.s.round.done++; return this.nextQuestion(); }
      const order = this.shuffle(cards);
      const king = this.s.players[st.king];
      const kingOk = king && king.connected && !king.isBot;
      this.newStep('kkJudge', { black: st.black, q: st.q, king: st.king, cards: order, kingOk, qno: st.qno, qcount: st.qcount }, kingOk ? 35 : 25);
    },
    tv(st, v) { v.black = st.black; v.king = st.king; },
    phone(st, v, id) {
      if (id === st.king) { v.screen = 'wait'; v.big = '👑'; v.title = 'Jij bent de koning!'; v.sub = 'De anderen kiezen een kaart. Straks kies jij de beste.'; return; }
      v.screen = 'cards';
      v.black = st.black;
      v.hand = st.hands[id] || [];
      v.myAnswer = st.answers[id] === -1 ? st.own[id] : st.answers[id] !== undefined ? v.hand[st.answers[id]] : undefined;
    },
  });
  GN.addStep('kkJudge', {
    // de koning kiest; is de koning er niet (of een bot), dan stemt de rest
    need(st) { return st.kingOk ? this.active().filter((p) => p.id === st.king) : this.active().filter((p) => st.cards.some((c) => c.author !== p.id)); },
    action(id, act) {
      const st = this.s.step;
      if (act.a !== 'answer' || st.answers[id] !== undefined) return;
      if (st.kingOk ? id !== st.king : st.cards[act.v] && st.cards[act.v].author === id) return;
      if (!Number.isInteger(act.v) || !st.cards[act.v]) return;
      st.answers[id] = act.v;
      this.changed();
      this.checkAllIn();
    },
    bot(id, st) {
      const ok = st.cards.map((_, i) => i).filter((i) => st.kingOk || st.cards[i].author !== id);
      if (ok.length) this.action(id, { a: 'answer', v: this.pick(ok) });
    },
    timeout(st) {
      let win = -1;
      if (st.kingOk) win = st.answers[st.king] !== undefined ? st.answers[st.king] : -1;
      else { const { top } = this.voteTally(st.answers); win = top.length ? this.pick(top) : -1; }
      if (win === -1 && st.cards.length) win = Math.floor(this.rand() * st.cards.length); // koning sliep: het lot beslist
      const gains = {};
      if (win >= 0) { add(gains, st.cards[win].author, 100); const p = this.s.players[st.cards[win].author]; if (p) p.stats.kkWins = (p.stats.kkWins || 0) + 1; }
      pay(this, gains);
      this.reveal({ of: 'kk', judged: false, black: st.black, king: st.king, kingOk: st.kingOk, picked: st.answers[st.king] !== undefined, cards: st.cards, win, gains, events: [], qno: st.qno, qcount: st.qcount }, SHOW.reveal);
    },
    tv(st, v) { v.black = st.black; v.king = st.king; v.kingOk = st.kingOk; v.cards = st.cards.map((c) => ({ text: c.text })); },
    phone(st, v, id) {
      if (st.kingOk && id !== st.king) { v.screen = 'wait'; v.big = '👑'; v.title = 'De koning kiest…'; v.sub = 'Kijk naar de TV. Zet je pokerface op.'; return; }
      v.screen = 'cards';
      v.judge = true;
      v.black = st.black;
      v.hand = st.cards.map((c) => c.text);
      v.mine = st.cards.map((c) => c.author === id);
      v.judgeHead = st.kingOk ? '👑 Jij bent de koning: kies de beste kaart' : '👑 De koning is weg. Stem jij maar!';
      v.myAnswer = st.answers[id] !== undefined ? v.hand[st.answers[id]] : undefined;
    },
  });
  GN.addReveal('kk', {
    line(id, st) {
      if (id === st.king && st.kingOk) return 'Jij was de koning 👑';
      const c = st.cards[st.win];
      if (c && c.author === id) return 'Jouw kaart wint! 🃏';
      return st.cards.some((x) => x.author === id) ? 'Niet gekozen. Smaakloos van de koning.' : 'Op naar de volgende kaart';
    },
  });

  // zwarte kaart invullen: het gat (___) vervangen door de witte kaart
  // midden in een zin: eerste letter klein ("…over je schoonmoeder"), behalve bij namen
  const KEEP = /^(Satan|God|Lingo|Belgische|Sinterklaas|Nederland|Amsterdam|Brabant|Oss|Texel|Albert|Frans|Andr[eé]|Ikea|IKEA|Tinder|Instagram|Excel|Crocs|Durex)\b/;
  GN.fillWhite = (black, white) => {
    let w = String(white || '').replace(/[.!]+$/, '');
    const i = String(black).search(/_{3,}/);
    const before = i > 0 ? black.slice(0, i).trimEnd() : '';
    const start = i <= 0 || /[.!?:"“]$/.test(before);
    if (!start && !KEEP.test(w) && !/^[A-Z]{2}/.test(w)) w = w.charAt(0).toLowerCase() + w.slice(1);
    return w;
  };
  GN.fillBlack = (black, white) => {
    const w = GN.fillWhite(black, white);
    return /_{3,}/.test(black) ? black.replace(/_{3,}/, w) : black + ' ' + w;
  };

  if (typeof module !== 'undefined') module.exports = GN;
})(typeof window !== 'undefined' ? window : globalThis);
