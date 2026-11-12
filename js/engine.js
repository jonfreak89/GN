/* Game Night – de quiz-engine. Draait op de TV (host). Puur spelregels, geen DOM.
   De TV-laag roept tick() aan, stuurt acties door en rendert tvView()/phoneView(). */
(function (root) {
  const GN = (root.GN = root.GN || (typeof require !== 'undefined' ? require('./content.js') : {}));

  const TIME = { catpick: 15, mc: 30, num: 40, bet: 25, bluffWrite: 60, bluffVote: 30, order: 45, ken: 35, wie: 30, poll: 40, wager: 30, final: 35 };
  const SHOW = { intro: 6, reveal: 9, revealLong: 12, scores: 9 };

  const ROUNDS = {
    mc: { title: 'Meerkeuze', emoji: '🅰️', desc: 'Kies het juiste antwoord. Iedereen tegelijk, snelheid telt niet.', pick: 2 },
    num: { title: 'Schatten & Wedden', emoji: '🎯', desc: 'Schat een getal. Daarna wed je op het antwoord dat het dichtst zit.', pick: 1 },
    bluff: { title: 'Bluffen', emoji: '🤥', desc: 'Verzin een nep-antwoord en zoek daarna het echte. Wie je erin luist, levert punten op.', pick: 1 },
    order: { title: 'Op volgorde', emoji: '🔢', desc: 'Zet de vier dingen in de juiste volgorde.', pick: 1 },
    persoonlijk: { title: 'Hoe goed ken je elkaar?', emoji: '🫣', desc: 'Geen goede antwoorden, alleen jullie.', pick: 0 },
    final: { title: 'De Finale', emoji: '💰', desc: 'Zet zoveel punten in als je durft op één laatste vraag.', pick: 0 },
  };

  const PLANS = {
    kort: [['mc', 4], ['num', 2], ['bluff', 2], ['order', 2], ['persoonlijk', 3], ['final', 1]],
    normaal: [['mc', 5], ['num', 3], ['bluff', 3], ['order', 3], ['persoonlijk', 4], ['mc', 4], ['final', 1]],
    lang: [['mc', 6], ['num', 3], ['bluff', 3], ['order', 3], ['persoonlijk', 5], ['mc', 5], ['num', 2], ['bluff', 2], ['final', 1]],
  };
  const LENGTHS = { kort: '± 15 min', normaal: '± 25 min', lang: '± 40 min' };

  const POWERUPS = {
    dubbel: { name: 'Dubbel', emoji: '✖️2', desc: 'Jouw punten voor deze vraag tellen dubbel.' },
    vijftig: { name: '50/50', emoji: '✂️', desc: 'Twee foute antwoorden verdwijnen (alleen bij meerkeuze).' },
    stelen: { name: 'Stelen', emoji: '🦝', desc: 'Je pikt de helft van wat iemand bij deze vraag verdient.', target: true },
    sabotage: { name: 'Sabotage', emoji: '💣', desc: 'Iemand krijgt maar de helft van zijn punten bij deze vraag.', target: true },
    schild: { name: 'Schild', emoji: '🛡️', desc: 'Blokkeert automatisch de eerste steel- of sabotage-actie tegen jou.', passive: true },
  };
  const PU_KEYS = Object.keys(POWERUPS);

  const AVATARS = ['🦊', '🐸', '🐙', '🦄', '🐻', '🐼', '🐯', '🦁', '🐷', '🐵', '🦉', '🐔', '🦖', '🐢', '🦀', '🐝', '👽', '🤖', '👻', '🎃', '🧙', '🧛', '🧟', '🥷', '🤠', '🦩', '🦦', '🐌', '🥨', '🍄'];
  const COLORS = ['#ff5d73', '#ffb627', '#3ddc97', '#4cc9f0', '#b388ff', '#ff8fab', '#f9f871', '#62d2a2', '#ff9a3c', '#7aa2ff', '#e36bae', '#9be564'];
  const BOT_NAMES = ['Bot Bertje', 'Bot Truus', 'Bot Henk', 'Bot Ingrid', 'Bot Kees', 'Bot Greet'];

  const norm = (s) =>
    String(s || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/^(de|het|een|the|a|an)\s+/, '')
      .replace(/[^a-z0-9]/g, '');

  class Engine {
    constructor(opts = {}) {
      this.now = opts.now || (() => Date.now());
      this.rand = opts.rand || Math.random;
      this.seen = opts.seen || {};
      this.onChange = opts.onChange || (() => {});
      this.onSeen = opts.onSeen || (() => {});
      this.botQueue = [];
      this.s = {
        code: opts.code || '',
        players: {},
        order: [],
        gm: null,
        settings: { spice: 2, length: 'normaal', gmPlays: true, voice: false },
        step: { kind: 'lobby', id: 0 },
        paused: null,
        plan: [],
        roundIdx: -1,
        round: null,
        stepCounter: 0,
        lastHot: -1,
      };
    }

    // ---------- helpers ----------
    pick(arr) { return arr[Math.floor(this.rand() * arr.length)]; }
    shuffle(arr) {
      const a = arr.slice();
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(this.rand() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }
    changed() { this.onChange(); }
    get players() { return this.s.order.map((id) => this.s.players[id]).filter(Boolean); }
    // spelers die punten kunnen scoren
    contestants() { return this.players.filter((p) => p.playing); }
    // spelers van wie we nog een antwoord verwachten
    active() { return this.contestants().filter((p) => p.isBot || p.connected); }
    humans() { return this.contestants().filter((p) => !p.isBot); }
    name(id) { const p = this.s.players[id]; return p ? p.name : '?'; }

    // ---------- spelers ----------
    join({ token, name, avatar }) {
      const s = this.s;
      let p = Object.values(s.players).find((x) => x.token === token && token);
      name = String(name || '').trim().slice(0, 16) || 'Speler';
      if (p) {
        p.connected = true;
        p.lastSeen = this.now();
        if (s.step.kind === 'lobby') { p.name = name; if (avatar) p.avatar = avatar; }
        if (!s.gm || !s.players[s.gm]) this.assignGm();
        this.changed();
        return p.id;
      }
      const id = 'p' + Math.floor(this.rand() * 1e9).toString(36) + s.order.length;
      const used = new Set(this.players.map((x) => x.color));
      const color = COLORS.find((c) => !used.has(c)) || this.pick(COLORS);
      const inGame = s.step.kind !== 'lobby';
      const scores = this.contestants().map((x) => x.score);
      p = {
        id, token, name, color,
        avatar: avatar || this.pick(AVATARS),
        score: inGame && scores.length ? Math.min(...scores) : 0,
        connected: true, isBot: false, playing: true,
        powerups: inGame ? [this.pick(PU_KEYS)] : [],
        stats: this.blankStats(), lastSeen: this.now(),
      };
      s.players[id] = p;
      s.order.push(id);
      if (!s.gm) this.assignGm();
      this.changed();
      return id;
    }
    blankStats() { return { correct: 0, fooled: 0, betWins: 0, closest: 0, kenCorrect: 0, wieVotes: 0, powerups: 0, stolen: 0 }; }
    assignGm() {
      const h = this.players.find((p) => !p.isBot && p.connected) || this.players.find((p) => !p.isBot);
      this.s.gm = h ? h.id : null;
      if (h && !this.s.settings.gmPlays && this.s.step.kind === 'lobby') h.playing = false;
    }
    addBot() {
      const bots = this.players.filter((p) => p.isBot).length;
      if (bots >= BOT_NAMES.length) return;
      const id = this.join({ token: 'bot' + bots + ':' + this.rand(), name: BOT_NAMES[bots], avatar: '🤖' });
      this.s.players[id].isBot = true;
      if (this.s.gm === id) this.assignGm();
      this.changed();
    }
    setConnected(id, on) {
      const p = this.s.players[id];
      if (!p || p.connected === on) return;
      p.connected = on;
      if (on) p.lastSeen = this.now();
      this.changed();
      if (!on) this.checkAllIn();
    }
    kick(id) {
      const s = this.s;
      if (!s.players[id]) return;
      delete s.players[id];
      s.order = s.order.filter((x) => x !== id);
      if (s.gm === id) this.assignGm();
      this.changed();
      this.checkAllIn();
    }

    // ---------- inhoud kiezen ----------
    poolFor(type, cat) {
      const spice = this.s.settings.spice;
      return GN.QUESTIONS.filter((q) => q.type === type && q.cat === cat && GN.qSpice(q) <= spice);
    }
    gensFor(type, cat) { return GN.GENERATORS.filter((g) => g.type === type && g.cat === cat); }
    unseenCount(type, cat) { return this.poolFor(type, cat).filter((q) => !this.seen[q.id]).length + this.gensFor(type, cat).length * 50; }
    eligibleCats(type) {
      const spice = this.s.settings.spice;
      return GN.CATEGORIES.filter((c) => c.spice <= spice && (this.poolFor(type, c.id).length || this.gensFor(type, c.id).length));
    }
    catOptions(type, n = 3) {
      const cats = this.eligibleCats(type);
      const fresh = cats.filter((c) => this.unseenCount(type, c.id) > 0);
      const base = this.shuffle(fresh.length >= n ? fresh : cats);
      // probeer verschillende groepen te tonen, en niet steeds dezelfde categorie
      const recent = this.s.round && this.s.round.usedCats ? this.s.round.usedCats : [];
      base.sort((a, b) => (recent.includes(a.id) ? 1 : 0) - (recent.includes(b.id) ? 1 : 0));
      const out = [];
      for (const c of base) {
        if (out.length >= n) break;
        if (out.some((o) => o.group === c.group) && base.filter((x) => !out.includes(x) && !out.some((o) => o.group === x.group)).length) continue;
        out.push(c);
      }
      for (const c of base) if (out.length < n && !out.includes(c)) out.push(c);
      return out.map((c) => c.id);
    }
    markSeen(id) { this.seen[id] = this.now(); this.onSeen(id); }
    draw(type, cat, filter) {
      let pool = this.poolFor(type, cat);
      if (filter) pool = pool.filter(filter);
      const unseen = pool.filter((q) => !this.seen[q.id]);
      let q = unseen.length ? this.pick(unseen) : null;
      if (!q) {
        const gens = this.gensFor(type, cat);
        for (let i = 0; i < 40 && gens.length && !q; i++) {
          const g = this.pick(gens).make(this.rand);
          if (g && !this.seen[g.id]) q = Object.assign({ cat }, g);
        }
      }
      if (!q && pool.length) q = pool.slice().sort((a, b) => this.seen[a.id] - this.seen[b.id])[0];
      if (!q) {
        const gens = this.gensFor(type, cat);
        if (gens.length) { const g = this.pick(gens).make(this.rand); if (g) q = Object.assign({ cat }, g); }
      }
      if (!q) {
        // noodgeval: ander categorie van hetzelfde type
        const cats = this.eligibleCats(type).filter((c) => c.id !== cat);
        if (cats.length) return this.draw(type, this.pick(cats).id, filter);
        return null;
      }
      this.markSeen(q.id);
      return q;
    }
    drawPrompt(type) {
      const spice = this.s.settings.spice;
      const pool = GN.PROMPTS.filter((p) => p.type === type && (p.spice || 1) <= spice);
      if (!pool.length) return null;
      const unseen = pool.filter((p) => !this.seen[p.id]);
      // bij hogere spice liefst ook de pittigere vragen
      let src = unseen.length ? unseen : pool.slice().sort((a, b) => this.seen[a.id] - this.seen[b.id]).slice(0, Math.max(3, pool.length >> 2));
      const q = this.pick(src);
      this.markSeen(q.id);
      return q;
    }

    // ---------- spelverloop ----------
    newStep(kind, data, secs) {
      const s = this.s;
      s.stepCounter++;
      s.step = Object.assign({ kind, id: s.stepCounter, answers: {}, powerups: {} }, data);
      s.step.deadline = secs ? this.now() + secs * 1000 : null;
      s.step.duration = secs || 0;
      this.scheduleBots();
      this.changed();
    }
    startGame() {
      const s = this.s;
      if (s.step.kind !== 'lobby' && s.step.kind !== 'end') return;
      if (!this.contestants().length) return;
      this.players.forEach((p) => {
        p.score = 0;
        p.stats = this.blankStats();
        p.powerups = [this.pick(PU_KEYS)];
      });
      s.plan = PLANS[s.settings.length].map(([type, count]) => ({ type, count }));
      s.roundIdx = -1;
      this.nextRound();
    }
    nextRound() {
      const s = this.s;
      s.roundIdx++;
      const r = s.plan[s.roundIdx];
      if (!r) return this.endGame();
      if (r.type === 'persoonlijk' && this.humans().length + this.contestants().filter((p) => p.isBot).length < 2) return this.nextRound();
      s.round = { type: r.type, count: r.count, done: 0, cat: null, usedCats: [] };
      const R = ROUNDS[r.type];
      this.newStep('intro', { round: r.type, title: R.title, emoji: R.emoji, desc: R.desc, roundNo: s.roundIdx + 1, rounds: s.plan.length, count: r.count }, SHOW.intro);
    }
    nextQuestion() {
      const s = this.s;
      const r = s.round;
      if (r.done >= r.count) return this.roundScores();
      const R = ROUNDS[r.type];
      if (r.type === 'final') return this.startFinal();
      if (r.type === 'persoonlijk') return this.askPersonal();
      if (R.pick && r.done % R.pick === 0) return this.catPick();
      this.ask();
    }
    lastPlace() {
      const ps = this.active();
      if (!ps.length) return null;
      const min = Math.min(...ps.map((p) => p.score));
      const low = ps.filter((p) => p.score === min);
      const humans = low.filter((p) => !p.isBot);
      return this.pick(humans.length ? humans : low);
    }
    catPick() {
      const r = this.s.round;
      const picker = this.lastPlace();
      const options = this.catOptions(r.type, 3);
      if (!options.length) { r.done = r.count; return this.roundScores(); }
      this.newStep('catpick', { picker: picker ? picker.id : null, options, chosen: null }, TIME.catpick);
    }
    resolveCatPick(choice) {
      const st = this.s.step;
      if (st.chosen) return;
      st.chosen = choice && st.options.includes(choice) ? choice : this.pick(st.options);
      this.s.round.cat = st.chosen;
      this.s.round.usedCats.push(st.chosen);
      this.ask();
    }
    ask(skippedNote) {
      const r = this.s.round;
      const cat = r.cat || this.pick(this.catOptions(r.type, 1));
      r.cat = cat;
      const q = this.draw(r.type, cat);
      if (!q) { r.done = r.count; return this.roundScores(); }
      const base = { q, cat: q.cat, qno: r.done + 1, qcount: r.count, skippedNote: skippedNote || null };
      if (r.type === 'mc') {
        const opts = this.shuffle(q.a.map((t, i) => ({ t, ok: i === 0 })));
        this.newStep('mc', Object.assign(base, { options: opts.map((o) => o.t), correct: opts.findIndex((o) => o.ok) }), TIME.mc);
      } else if (r.type === 'num') {
        this.newStep('num', base, TIME.num);
      } else if (r.type === 'bluff') {
        this.newStep('bluffWrite', Object.assign(base, { rejected: {} }), TIME.bluffWrite);
      } else if (r.type === 'order') {
        const items = this.shuffle(this.shuffle(q.items).slice(0, 4));
        this.newStep('order', Object.assign(base, { items: items.map((x) => x[0]), values: items.map((x) => x[1]), shows: items.map((x) => x[2] || null) }), TIME.order);
      }
    }
    askPersonal() {
    const r = this.s.round;
    const players = this.contestants();
    const types = ['ken', 'wie', 'poll'].filter((t) => (t === 'ken' ? players.length >= 2 : players.length >= 3));
    if (!types.length) { r.done = r.count; return this.roundScores(); }
    const type = types[r.done % types.length];
    const p = this.drawPrompt(type) || this.drawPrompt('ken');
    if (!p) { r.done = r.count; return this.roundScores(); }
    const base = { q: p, qno: r.done + 1, qcount: r.count };
    if (p.type === 'ken') {
      const humans = this.humans().filter((h) => h.connected);
      const pool = humans.length ? humans : players;
      this.s.lastHot = (this.s.lastHot + 1) % pool.length;
      const hot = pool[this.s.lastHot];
      const text = p.q.replace(/\{naam\}/g, hot.name);
      this.newStep('ken', Object.assign(base, { hot: hot.id, text, options: p.options.slice() }), TIME.ken);
    } else if (p.type === 'poll') {
      this.newStep('poll', Object.assign(base, { text: p.q, n: players.length }), TIME.poll);
    } else {
      this.newStep('wie', Object.assign(base, { text: p.q }), TIME.wie);
    }
  }
  startFinal() {
      const cats = this.eligibleCats('mc');
      const cat = this.pick(cats).id;
      this.s.round.cat = cat;
      this.newStep('wager', { cat }, TIME.wager);
    }

    // ---------- bots ----------
    scheduleBots() {
      this.botQueue = [];
      const st = this.s.step;
      const answering = ['catpick', 'mc', 'num', 'bet', 'bluffWrite', 'bluffVote', 'order', 'ken', 'wie', 'poll', 'wager', 'final'];
      if (!answering.includes(st.kind)) return;
      this.players.filter((p) => p.isBot && p.playing).forEach((b) => {
        if (st.kind === 'catpick' && st.picker !== b.id) return;
        this.botQueue.push({ at: this.now() + (1.5 + this.rand() * 6) * 1000, id: b.id, step: st.id });
      });
    }
    runBots() {
      const now = this.now();
      const due = this.botQueue.filter((b) => b.at <= now);
      if (!due.length) return;
      this.botQueue = this.botQueue.filter((b) => b.at > now);
      due.forEach((b) => { if (b.step === this.s.step.id) this.botAct(b.id); });
    }
    botAct(id) {
      const st = this.s.step;
      const R = () => this.rand();
      switch (st.kind) {
        case 'catpick': return this.action(id, { a: 'pickcat', cat: this.pick(st.options) });
        case 'mc': case 'final': return this.action(id, { a: 'answer', v: R() < 0.55 ? st.correct : Math.floor(R() * st.options.length) });
        case 'num': {
          const ans = st.q.answer;
          return this.action(id, { a: 'answer', v: Math.max(0, Math.round(ans * (0.4 + R() * 1.3))) });
        }
        case 'bet': return this.action(id, { a: 'answer', v: Math.floor(R() * st.guesses.length) });
        case 'bluffWrite': {
          const pool = (st.q.decoys || []).filter((d) => !Object.values(st.answers).some((a) => norm(a) === norm(d)));
          return this.action(id, { a: 'answer', v: pool.length ? this.pick(pool) : 'Geen idee' });
        }
        case 'bluffVote': {
          const choices = st.options.map((o, i) => i).filter((i) => !st.options[i].authors.includes(id));
          return this.action(id, { a: 'answer', v: R() < 0.4 ? st.truth : this.pick(choices) });
        }
        case 'order': return this.action(id, { a: 'answer', v: this.shuffle([0, 1, 2, 3]) });
        case 'ken': return this.action(id, { a: 'answer', v: Math.floor(R() * st.options.length) });
        case 'wie': {
          const others = this.contestants().filter((p) => p.id !== id);
          return this.action(id, { a: 'answer', v: this.pick(others).id });
        }
        case 'poll': return this.action(id, { a: 'answer', v: { yes: R() < 0.5, guess: Math.floor(R() * (st.n + 1)) } });
        case 'wager': return this.action(id, { a: 'answer', v: Math.round(this.s.players[id].score * R()) });
      }
    }

    // ---------- acties van telefoons ----------
    action(id, act) {
      const s = this.s;
      const p = s.players[id];
      if (!p) return;
      p.lastSeen = this.now();
      const isGm = s.gm === id;
      const st = s.step;
      if (act.a && act.a.startsWith('gm:')) {
        if (!isGm) return;
        return this.gmAction(act);
      }
      if (act.a === 'profile' && st.kind === 'lobby') {
        p.name = String(act.name || p.name).trim().slice(0, 16) || p.name;
        if (act.avatar) p.avatar = act.avatar;
        return this.changed();
      }
      if (s.paused || !p.playing) return;
      if (act.a === 'pickcat') {
        if (st.kind === 'catpick' && st.picker === id) this.resolveCatPick(act.cat);
        return;
      }
      if (act.a === 'skip') {
        if (['mc', 'num', 'bluffWrite', 'order', 'ken', 'wie', 'poll'].includes(st.kind) && this.skippable()) this.skipQuestion(true);
        return;
      }
      if (act.a === 'powerup') return this.usePowerup(p, act);
      if (act.a !== 'answer') return;
      if (st.answers[id] !== undefined && st.kind !== 'bluffWrite') return;
      const v = act.v;
      switch (st.kind) {
        case 'mc': case 'final': case 'ken':
          if (!Number.isInteger(v) || v < 0 || v >= st.options.length) return;
          break;
        case 'num':
          if (typeof v !== 'number' || !isFinite(v)) return;
          break;
        case 'bet':
          if (!Number.isInteger(v) || v < 0 || v >= st.guesses.length) return;
          break;
        case 'bluffWrite': {
          const txt = String(v || '').trim().slice(0, 60);
          if (!txt) return;
          if (norm(txt) === norm(st.q.answer) || (st.q.accept || []).some((x) => norm(x) === norm(txt))) {
            st.rejected[id] = true;
            if (!p.isBot) return this.changed();
            return this.action(id, { a: 'answer', v: 'Echt geen idee' });
          }
          delete st.rejected[id];
          st.answers[id] = txt;
          this.changed();
          return this.checkAllIn();
        }
        case 'bluffVote':
          if (!Number.isInteger(v) || v < 0 || v >= st.options.length || st.options[v].authors.includes(id)) return;
          break;
        case 'order':
          if (!Array.isArray(v) || v.length !== 4 || new Set(v).size !== 4 || v.some((x) => !(x >= 0 && x < 4))) return;
          break;
        case 'wie':
          if (!s.players[v] || v === id) return;
          break;
        case 'poll':
          if (!v || typeof v.yes !== 'boolean' || !Number.isInteger(v.guess) || v.guess < 0 || v.guess > st.n) return;
          break;
        case 'wager': {
          const max = Math.max(p.score, 0);
          st.answers[id] = Math.max(0, Math.min(max, Math.round(Number(v) || 0)));
          this.changed();
          return this.checkAllIn();
        }
        default:
          return;
      }
      st.answers[id] = v;
      this.changed();
      this.checkAllIn();
    }
    skippable() {
      const st = this.s.step;
      if (!st.q) return false;
      if (st.kind === 'ken' || st.kind === 'wie' || st.kind === 'poll') return (st.q.spice || 1) >= 3;
      return GN.qSpice(st.q) >= 3;
    }
    skipQuestion(anonymous) {
      const st = this.s.step;
      const note = anonymous ? 'Iemand sloeg de vorige vraag over 🙈' : 'De spelleider sloeg de vorige vraag over ⏭️';
      // power-ups teruggeven die al gebruikt waren
      Object.entries(st.powerups || {}).forEach(([pid, pu]) => { const p = this.s.players[pid]; if (p) p.powerups.push(pu.type); });
      if (this.s.round.type === 'persoonlijk') return this.askPersonal();
      this.ask(note);
    }
    usePowerup(p, act) {
      const st = this.s.step;
      const type = act.type;
      if (!['mc', 'num', 'order'].includes(st.kind)) return;
      if (st.powerups[p.id] || st.answers[p.id] !== undefined && type === 'vijftig') return;
      const idx = p.powerups.indexOf(type);
      if (idx < 0 || POWERUPS[type].passive) return;
      if (type === 'vijftig' && st.kind !== 'mc') return;
      let target = null;
      if (POWERUPS[type].target) {
        target = act.target;
        if (!this.s.players[target] || target === p.id || !this.s.players[target].playing) return;
      }
      p.powerups.splice(idx, 1);
      p.stats.powerups++;
      const pu = { type, target };
      if (type === 'vijftig') {
        const wrong = this.shuffle(st.options.map((o, i) => i).filter((i) => i !== st.correct));
        pu.hidden = wrong.slice(0, Math.max(0, st.options.length - 2));
      }
      st.powerups[p.id] = pu;
      this.changed();
    }

    gmAction(act) {
      const s = this.s;
      const st = s.step;
      switch (act.a) {
        case 'gm:settings': {
          if (st.kind !== 'lobby' && st.kind !== 'end') return;
          const n = act.settings || {};
          if ([1, 2, 3].includes(n.spice)) s.settings.spice = n.spice;
          if (PLANS[n.length]) s.settings.length = n.length;
          if (typeof n.voice === 'boolean') s.settings.voice = n.voice;
          if (typeof n.gmPlays === 'boolean') {
            s.settings.gmPlays = n.gmPlays;
            const gm = s.players[s.gm];
            if (gm) gm.playing = n.gmPlays;
          }
          return this.changed();
        }
        case 'gm:addbot': if (st.kind === 'lobby') this.addBot(); return;
        case 'gm:kick': if (act.id !== s.gm) this.kick(act.id); return;
        case 'gm:transfer': {
          const t = s.players[act.id];
          if (!t || t.isBot) return;
          const old = s.players[s.gm];
          s.gm = t.id;
          if (st.kind === 'lobby') { if (old) old.playing = true; t.playing = s.settings.gmPlays; }
          return this.changed();
        }
        case 'gm:start': return this.startGame();
        case 'gm:pause':
          if (s.paused) {
            const d = this.now() - s.paused.at;
            if (st.deadline) st.deadline += d;
            this.botQueue.forEach((b) => (b.at += d));
            s.paused = null;
          } else s.paused = { at: this.now() };
          return this.changed();
        case 'gm:skip':
          if (['mc', 'num', 'bluffWrite', 'order', 'ken', 'wie', 'poll'].includes(st.kind)) this.skipQuestion(false);
          return;
        case 'gm:next':
          if (!s.paused && st.kind !== 'lobby' && st.kind !== 'end') this.timeout();
          return;
        case 'gm:clearseen':
          Object.keys(this.seen).forEach((k) => delete this.seen[k]);
          this.onSeen(null);
          return this.changed();
        case 'gm:stop': case 'gm:lobby':
          s.step = { kind: 'lobby', id: ++s.stepCounter };
          s.paused = null;
          s.round = null;
          this.botQueue = [];
          this.players.forEach((p) => { p.score = 0; p.powerups = []; });
          return this.changed();
      }
    }

    // ---------- timers ----------
    tick() {
      if (this.s.paused) return;
      this.runBots();
      const st = this.s.step;
      if (st.deadline && this.now() >= st.deadline) this.timeout();
    }
    checkAllIn() {
      const st = this.s.step;
      if (this.s.paused) return;
      const need = this.needAnswers();
      if (!need) return;
      if (need.every((p) => st.answers[p.id] !== undefined)) this.timeout();
    }
    needAnswers() {
      const st = this.s.step;
      switch (st.kind) {
        case 'mc': case 'num': case 'bet': case 'bluffWrite': case 'bluffVote': case 'order': case 'ken': case 'wie': case 'poll': case 'wager': case 'final':
          return this.active();
        case 'catpick': {
          const p = this.s.players[st.picker];
          return p && (p.connected || p.isBot) ? [p] : [];
        }
      }
      return null;
    }
    timeout() {
      const st = this.s.step;
      switch (st.kind) {
        case 'intro': return this.nextQuestion();
        case 'catpick': return this.resolveCatPick(null);
        case 'mc': return this.revealMc();
        case 'num': return this.toBet();
        case 'bet': return this.revealNum();
        case 'bluffWrite': return this.toBluffVote();
        case 'bluffVote': return this.revealBluff();
        case 'order': return this.revealOrder();
        case 'ken': return this.revealKen();
        case 'wie': return this.revealWie();
        case 'poll': return this.revealPoll();
        case 'wager': return this.finalQuestion();
        case 'final': return this.revealFinal();
        case 'reveal': this.s.round.done++; return this.nextQuestion();
        case 'scores': return this.nextRound();
      }
    }

    // ---------- punten ----------
    applyGains(gains, st) {
      // power-ups: dubbel -> sabotage -> stelen
      const events = [];
      const pus = st.powerups || {};
      const shield = (t, by, what) => {
        const tp = this.s.players[t];
        const i = tp ? tp.powerups.indexOf('schild') : -1;
        if (i >= 0) { tp.powerups.splice(i, 1); events.push(`🛡️ ${tp.name} blokkeerde ${what} van ${this.name(by)}`); return true; }
        return false;
      };
      Object.entries(pus).forEach(([pid, pu]) => {
        if (pu.type === 'dubbel' && gains[pid]) { gains[pid] *= 2; events.push(`✖️2 ${this.name(pid)} verdubbelde naar ${gains[pid]}`); }
        else if (pu.type === 'dubbel') events.push(`✖️2 ${this.name(pid)} verdubbelde… niks 😬`);
      });
      Object.entries(pus).forEach(([pid, pu]) => {
        if (pu.type !== 'sabotage') return;
        if (shield(pu.target, pid, 'sabotage')) return;
        const g = gains[pu.target] || 0;
        gains[pu.target] = Math.floor(g / 2);
        events.push(`💣 ${this.name(pid)} saboteerde ${this.name(pu.target)}${g ? ` (−${g - gains[pu.target]})` : ' (die had toch niks)'}`);
      });
      Object.entries(pus).forEach(([pid, pu]) => {
        if (pu.type !== 'stelen') return;
        if (shield(pu.target, pid, 'een steelpoging')) return;
        const g = gains[pu.target] || 0;
        const take = Math.floor(g / 2);
        gains[pu.target] = g - take;
        gains[pid] = (gains[pid] || 0) + take;
        this.s.players[pid].stats.stolen += take;
        events.push(take ? `🦝 ${this.name(pid)} stal ${take} van ${this.name(pu.target)}` : `🦝 ${this.name(pid)} wilde stelen van ${this.name(pu.target)}, maar daar viel niks te halen`);
      });
      Object.entries(gains).forEach(([pid, g]) => { const p = this.s.players[pid]; if (p) p.score += g; });
      return events;
    }
    reveal(data, secs) {
      this.newStep('reveal', data, secs || SHOW.reveal);
    }

    revealMc() {
      const st = this.s.step;
      const gains = {};
      const right = [];
      this.contestants().forEach((p) => {
        if (st.answers[p.id] === st.correct) { gains[p.id] = 100; right.push(p.id); p.stats.correct++; }
      });
      const events = this.applyGains(gains, st);
      this.reveal({ of: 'mc', q: st.q, cat: st.cat, options: st.options, correct: st.correct, picks: st.answers, gains, events, right, qno: st.qno, qcount: st.qcount });
    }

    toBet() {
      const st = this.s.step;
      const map = new Map();
      Object.entries(st.answers).forEach(([pid, v]) => {
        if (!map.has(v)) map.set(v, []);
        map.get(v).push(pid);
      });
      if (!map.size) {
        // niemand schatte iets: meteen onthullen
        return this.reveal({ of: 'num', q: st.q, cat: st.cat, guesses: [], closest: [], gains: {}, events: [], qno: st.qno, qcount: st.qcount });
      }
      const guesses = [...map.entries()].sort((a, b) => a[0] - b[0]).map(([v, authors]) => ({ v, authors }));
      this.newStep('bet', { q: st.q, cat: st.cat, guesses, guessAnswers: st.answers, powerupsPrev: st.powerups, qno: st.qno, qcount: st.qcount }, TIME.bet);
    }
    revealNum() {
      const st = this.s.step;
      const ans = st.q.answer;
      const dist = st.guesses.map((g) => Math.abs(g.v - ans));
      const best = Math.min(...dist);
      const closest = st.guesses.map((g, i) => i).filter((i) => dist[i] === best);
      const gains = {};
      const events = [];
      closest.forEach((i) => st.guesses[i].authors.forEach((pid) => {
        gains[pid] = (gains[pid] || 0) + (best === 0 ? 150 : 100);
        const p = this.s.players[pid];
        if (p) p.stats.closest++;
      }));
      // power-ups uit de schatfase gelden voor de schatpunten
      const puEvents = this.applyGains(gains, { powerups: st.powerupsPrev || {} });
      const betGains = {};
      Object.entries(st.answers).forEach(([pid, gi]) => {
        if (closest.includes(gi)) {
          betGains[pid] = 50;
          const p = this.s.players[pid];
          if (p) { p.score += 50; p.stats.betWins++; }
        }
      });
      const total = {};
      [gains, betGains].forEach((o) => Object.entries(o).forEach(([k, v]) => (total[k] = (total[k] || 0) + v)));
      this.reveal({ of: 'num', q: st.q, cat: st.cat, guesses: st.guesses, bets: st.answers, closest, exact: best === 0, gains: total, events: events.concat(puEvents), qno: st.qno, qcount: st.qcount }, SHOW.revealLong);
    }

    toBluffVote() {
      const st = this.s.step;
      const opts = [];
      const add = (text, author) => {
        const ex = opts.find((o) => norm(o.text) === norm(text));
        if (ex) { if (author) ex.authors.push(author); return; }
        opts.push({ text, authors: author ? [author] : [], decoy: !author });
      };
      Object.entries(st.answers).forEach(([pid, t]) => add(t, pid));
      const decoys = this.shuffle(st.q.decoys || []);
      while (opts.length < 3 && decoys.length) add(decoys.shift(), null);
      const all = this.shuffle(opts.concat([{ text: st.q.answer, authors: [], truth: true }]));
      const truth = all.findIndex((o) => o.truth);
      this.newStep('bluffVote', { q: st.q, cat: st.cat, options: all, truth, qno: st.qno, qcount: st.qcount }, TIME.bluffVote);
    }
    revealBluff() {
      const st = this.s.step;
      const gains = {};
      const fooledBy = {};
      Object.entries(st.answers).forEach(([pid, oi]) => {
        if (oi === st.truth) {
          gains[pid] = (gains[pid] || 0) + 100;
          const p = this.s.players[pid];
          if (p) p.stats.correct++;
        } else {
          st.options[oi].authors.forEach((a) => {
            gains[a] = (gains[a] || 0) + 50;
            const p = this.s.players[a];
            if (p) p.stats.fooled++;
            (fooledBy[a] = fooledBy[a] || []).push(pid);
          });
        }
      });
      Object.entries(gains).forEach(([pid, g]) => { const p = this.s.players[pid]; if (p) p.score += g; });
      this.reveal({ of: 'bluff', q: st.q, cat: st.cat, options: st.options, truth: st.truth, votes: st.answers, gains, fooledBy, events: [], qno: st.qno, qcount: st.qcount }, SHOW.revealLong);
    }

    revealOrder() {
      const st = this.s.step;
      // juiste volgorde: indexen gesorteerd op waarde (laag -> hoog)
      const correct = st.items.map((t, i) => i).sort((a, b) => st.values[a] - st.values[b]);
      const gains = {};
      const scoresBy = {};
      this.contestants().forEach((p) => {
        const a = st.answers[p.id];
        if (!a) return;
        let n = 0;
        a.forEach((x, i) => { if (x === correct[i]) n++; });
        scoresBy[p.id] = n;
        const g = n * 25 + (n === 4 ? 50 : 0);
        if (g) gains[p.id] = g;
        if (n === 4) p.stats.correct++;
      });
      const events = this.applyGains(gains, st);
      this.reveal({ of: 'order', q: st.q, cat: st.cat, items: st.items, values: st.values, shows: st.shows, correct, picks: st.answers, scoresBy, gains, events, qno: st.qno, qcount: st.qcount });
    }

    revealKen() {
      const st = this.s.step;
      const hotAns = st.answers[st.hot];
      const gains = {};
      const right = [];
      if (hotAns !== undefined) {
        Object.entries(st.answers).forEach(([pid, v]) => {
          if (pid === st.hot) return;
          if (v === hotAns) {
            gains[pid] = 100;
            right.push(pid);
            const p = this.s.players[pid];
            if (p) p.stats.kenCorrect++;
          }
        });
        if (right.length) gains[st.hot] = 50 * right.length;
      }
      Object.entries(gains).forEach(([pid, g]) => { const p = this.s.players[pid]; if (p) p.score += g; });
      this.reveal({ of: 'ken', q: st.q, text: st.text, hot: st.hot, options: st.options, hotAns, picks: st.answers, right, gains, events: [], qno: st.qno, qcount: st.qcount });
    }

    revealWie() {
      const st = this.s.step;
      const count = {};
      Object.values(st.answers).forEach((t) => (count[t] = (count[t] || 0) + 1));
      const max = Math.max(0, ...Object.values(count));
      const top = Object.keys(count).filter((k) => count[k] === max);
      const gains = {};
      Object.entries(st.answers).forEach(([pid, t]) => { if (top.includes(t) && max > 1) gains[pid] = 100; });
      top.forEach((t) => { const p = this.s.players[t]; if (p) p.stats.wieVotes += max; });
      Object.entries(gains).forEach(([pid, g]) => { const p = this.s.players[pid]; if (p) p.score += g; });
      this.reveal({ of: 'wie', q: st.q, text: st.text, votes: st.answers, count, top, gains, events: [], qno: st.qno, qcount: st.qcount });
    }

    revealPoll() {
      const st = this.s.step;
      const ans = Object.values(st.answers);
      const yes = ans.filter((a) => a.yes).length;
      const gains = {};
      const guesses = {};
      let best = Infinity;
      Object.entries(st.answers).forEach(([pid, a]) => { guesses[pid] = a.guess; best = Math.min(best, Math.abs(a.guess - yes)); });
      Object.entries(st.answers).forEach(([pid, a]) => {
        if (Math.abs(a.guess - yes) === best) {
          gains[pid] = best === 0 ? 150 : 100;
          const p = this.s.players[pid];
          if (p) p.stats.closest++;
        }
      });
      Object.entries(gains).forEach(([pid, g]) => { const p = this.s.players[pid]; if (p) p.score += g; });
      this.reveal({ of: 'poll', q: st.q, text: st.text, yes, total: ans.length, guesses, gains, events: [], qno: st.qno, qcount: st.qcount });
    }

    finalQuestion() {
      const st = this.s.step;
      const wagers = {};
      this.contestants().forEach((p) => (wagers[p.id] = st.answers[p.id] !== undefined ? st.answers[p.id] : 0));
      const q = this.draw('mc', st.cat, (x) => (x.d || 1) >= 2) || this.draw('mc', st.cat);
      const opts = this.shuffle(q.a.map((t, i) => ({ t, ok: i === 0 })));
      this.newStep('final', { q, cat: q.cat, wagers, options: opts.map((o) => o.t), correct: opts.findIndex((o) => o.ok) }, TIME.final);
    }
    revealFinal() {
      const st = this.s.step;
      const gains = {};
      const right = [];
      this.contestants().forEach((p) => {
        const w = st.wagers[p.id] || 0;
        const ok = st.answers[p.id] === st.correct;
        if (ok) right.push(p.id);
        gains[p.id] = ok ? w : -w;
        p.score = Math.max(0, p.score + gains[p.id]);
      });
      this.reveal({ of: 'final', q: st.q, cat: st.cat, options: st.options, correct: st.correct, picks: st.answers, wagers: st.wagers, right, gains, events: [] }, SHOW.revealLong);
    }

    roundScores() {
      const s = this.s;
      // laatste plaats krijgt een power-up (max 3), behalve na de finale
      let bonus = null;
      const isLast = s.roundIdx >= s.plan.length - 1 || s.round.type === 'final';
      if (!isLast) {
        const lp = this.lastPlace();
        if (lp && lp.powerups.length < 3) {
          const type = this.pick(PU_KEYS);
          lp.powerups.push(type);
          bonus = { id: lp.id, type };
        }
      }
      if (isLast) return this.endGame();
      this.newStep('scores', { bonus, nextRound: s.plan[s.roundIdx + 1] ? ROUNDS[s.plan[s.roundIdx + 1].type].title : null }, SHOW.scores);
    }

    endGame() {
      const ps = this.contestants().slice().sort((a, b) => b.score - a.score);
      const awards = [];
      const best = (key, title, emoji, fmt) => {
        const top = this.contestants().slice().sort((a, b) => b.stats[key] - a.stats[key])[0];
        if (top && top.stats[key] > 0) awards.push({ id: top.id, title, emoji, text: fmt(top.stats[key]) });
      };
      best('fooled', 'Bluffkoning', '🤥', (n) => `${n}× iemand erin geluisd`);
      best('closest', 'Helderziende', '🔮', (n) => `${n}× het dichtst bij`);
      best('betWins', 'Gokker van de avond', '🎰', (n) => `${n} gewonnen weddenschappen`);
      best('kenCorrect', 'Mensenkenner', '🫶', (n) => `${n}× de ander goed ingeschat`);
      best('wieVotes', 'Verdachte van de avond', '🕵️', (n) => `${n} stemmen bij "Wie van ons…"`);
      best('stolen', 'Zakkenroller', '🦝', (n) => `${n} punten gestolen`);
      best('powerups', 'Chaosmaker', '💥', (n) => `${n} power-ups gebruikt`);
      this.newStep('end', { ranking: ps.map((p) => p.id), awards }, 0);
    }

    // ---------- views ----------
    pub(p) {
      return { id: p.id, name: p.name, avatar: p.avatar, color: p.color, score: p.score, connected: p.connected, isBot: p.isBot, playing: p.playing, gm: this.s.gm === p.id, powerups: p.powerups.length };
    }
    remaining() {
      const st = this.s.step;
      if (!st.deadline) return null;
      const ref = this.s.paused ? this.s.paused.at : this.now();
      return Math.max(0, st.deadline - ref);
    }
    catInfo(id) { const c = GN.CAT[id]; return c ? { id: c.id, name: c.name, emoji: c.emoji, group: c.group } : null; }

    tvView() {
      const s = this.s;
      const st = s.step;
      const v = {
        kind: st.kind, stepId: st.id, code: s.code, settings: s.settings, paused: !!s.paused,
        players: this.players.map((p) => this.pub(p)),
        deadline: st.deadline, duration: st.duration, remaining: this.remaining(),
        round: s.round ? { type: s.round.type, title: ROUNDS[s.round.type].title, emoji: ROUNDS[s.round.type].emoji, roundNo: s.roundIdx + 1, rounds: s.plan.length } : null,
        answered: Object.keys(st.answers || {}),
        need: (this.needAnswers() || []).map((p) => p.id),
        powerupsUsed: Object.keys(st.powerups || {}),
      };
      const copy = (keys) => keys.forEach((k) => { if (st[k] !== undefined) v[k] = st[k]; });
      copy(['title', 'emoji', 'desc', 'roundNo', 'rounds', 'count', 'qno', 'qcount', 'skippedNote']);
      if (st.kind === 'intro') v.introRound = st.round;
      if (st.cat) v.cat = this.catInfo(st.cat);
      if (st.q) v.q = { q: st.q.q, unit: st.q.unit, fact: st.q.fact, lo: st.q.lo, hi: st.q.hi, fmt: st.q.fmt, img: st.q.img, emoji: st.q.emoji, answer: undefined };
      switch (st.kind) {
        case 'catpick': v.picker = st.picker; v.options = st.options.map((c) => this.catInfo(c)); v.chosen = st.chosen; break;
        case 'mc': case 'final': v.options = st.options; if (st.kind === 'final') v.wagers = st.wagers; break;
        case 'bet': v.guesses = st.guesses; break;
        case 'bluffVote': v.options = st.options.map((o) => o.text); break;
        case 'order': v.items = st.items; break;
        case 'ken': v.hot = st.hot; v.text = st.text; v.options = st.options; break;
        case 'wie': v.text = st.text; break;
        case 'poll': v.text = st.text; v.n = st.n; break;
        case 'wager': v.cat = this.catInfo(st.cat); break;
        case 'reveal': {
          const r = Object.assign({}, st);
          delete r.answers; delete r.powerups;
          if (st.q) r.q = Object.assign({}, st.q);
          if (st.cat) r.cat = this.catInfo(st.cat);
          v.reveal = r;
          break;
        }
        case 'scores': v.bonus = st.bonus; v.nextRound = st.nextRound; break;
        case 'end': v.ranking = st.ranking; v.awards = st.awards; break;
      }
      return v;
    }

    phoneView(id) {
      const s = this.s;
      const st = s.step;
      const p = s.players[id];
      if (!p) return { screen: 'kicked', key: 'kicked' };
      const isGm = s.gm === id;
      const answered = st.answers ? st.answers[id] !== undefined : false;
      const me = { id: p.id, name: p.name, avatar: p.avatar, color: p.color, score: p.score, powerups: p.powerups, isGm, playing: p.playing };
      const sorted = this.contestants().slice().sort((a, b) => b.score - a.score);
      me.rank = sorted.findIndex((x) => x.id === id) + 1;
      const v = { me, kind: st.kind, stepId: st.id, paused: !!s.paused, deadline: st.deadline, duration: st.duration, remaining: this.remaining(), answered, settings: s.settings };
      v.gm = isGm ? { canSkip: ['mc', 'num', 'bluffWrite', 'order', 'ken', 'wie', 'poll'].includes(st.kind), canNext: !['lobby', 'end'].includes(st.kind), players: this.players.map((x) => this.pub(x)) } : null;
      if (st.cat) v.cat = this.catInfo(st.cat);
      const qtext = st.q ? st.q.q : null;
      v.key = st.kind + ':' + st.id + ':' + (answered ? 'a' : 'n') + (p.playing ? '' : ':gm');
      if (!p.playing && !['lobby', 'end'].includes(st.kind)) {
        v.screen = 'host';
        v.q = qtext; v.text = st.text;
        v.key = 'host:' + st.id;
        return v;
      }
      switch (st.kind) {
        case 'lobby':
          v.screen = 'lobby';
          v.players = this.players.map((x) => this.pub(x));
          v.key = 'lobby';
          v.spiceList = GN.SPICE.filter(Boolean);
          v.lengths = LENGTHS;
          break;
        case 'intro':
          v.screen = 'wait';
          v.big = st.emoji; v.title = st.title; v.sub = st.desc;
          break;
        case 'catpick':
          v.screen = st.picker === id ? 'catpick' : 'wait';
          v.options = st.options.map((c) => this.catInfo(c));
          v.title = st.picker === id ? 'Jij staat laatst, jij kiest!' : `${this.name(st.picker)} kiest een categorie…`;
          v.big = '🎡';
          break;
        case 'mc': case 'final': {
          v.screen = 'choice';
          v.q = qtext;
          v.options = st.options;
          v.myAnswer = st.answers[id];
          const pu = st.powerups[id];
          v.hidden = pu && pu.hidden ? pu.hidden : [];
          if (st.kind === 'final') v.sub = `Inzet: ${st.wagers[id] || 0}`;
          break;
        }
        case 'num': v.screen = 'number'; v.q = qtext; v.unit = st.q.unit; v.myAnswer = st.answers[id]; break;
        case 'bet':
          v.screen = 'bet';
          v.q = qtext;
          v.guesses = st.guesses.map((g) => ({ v: g.v, mine: g.authors.includes(id), n: g.authors.length }));
          v.unit = st.q.unit;
          v.myAnswer = st.answers[id];
          break;
        case 'bluffWrite':
          v.screen = 'write';
          v.q = qtext;
          v.myAnswer = st.answers[id];
          v.rejected = !!st.rejected[id];
          v.key += st.rejected[id] ? ':r' : '';
          break;
        case 'bluffVote':
          v.screen = 'bluffvote';
          v.q = qtext;
          v.options = st.options.map((o) => ({ text: o.text, mine: o.authors.includes(id) }));
          v.myAnswer = st.answers[id];
          break;
        case 'order':
          v.screen = 'order';
          v.q = qtext; v.items = st.items; v.lo = st.q.lo; v.hi = st.q.hi;
          v.myAnswer = st.answers[id];
          break;
        case 'ken':
          v.screen = 'choice';
          v.isHot = st.hot === id;
          v.q = st.hot === id ? (st.q.self || st.q.q.replace(/\{naam\}/g, 'jij')) : st.text;
          v.sub = st.hot === id ? 'Antwoord eerlijk, de anderen raden wat jij kiest' : `Wat kiest ${this.name(st.hot)}?`;
          v.options = st.options;
          v.myAnswer = st.answers[id];
          break;
        case 'wie':
          v.screen = 'vote';
          v.q = st.text;
          v.players = this.contestants().filter((x) => x.id !== id).map((x) => this.pub(x));
          v.myAnswer = st.answers[id];
          break;
        case 'poll':
          v.screen = 'poll';
          v.q = st.text;
          v.n = st.n;
          v.myAnswer = st.answers[id];
          break;
        case 'wager':
          v.screen = 'wager';
          v.max = Math.max(p.score, 0);
          v.myAnswer = st.answers[id];
          break;
        case 'reveal': {
          v.screen = 'result';
          const g = st.gains[id] || 0;
          v.delta = g;
          v.big = g > 0 ? '🎉' : g < 0 ? '💸' : '😶';
          v.title = g > 0 ? `+${g}` : g < 0 ? `${g}` : 'Geen punten';
          v.sub = this.resultLine(id, st);
          break;
        }
        case 'scores':
          v.screen = 'wait';
          v.big = me.rank === 1 ? '👑' : '📊';
          v.title = `Je staat ${me.rank}e`;
          v.sub = st.bonus && st.bonus.id === id ? `Troostprijs: power-up ${POWERUPS[st.bonus.type].emoji} ${POWERUPS[st.bonus.type].name}!` : `${p.score} punten`;
          break;
        case 'end':
          v.screen = 'end';
          v.rank = st.ranking.indexOf(id) + 1;
          v.awards = st.awards.filter((a) => a.id === id);
          v.key = 'end:' + st.id;
          break;
      }
      // power-ups beschikbaar?
      if (['mc', 'num', 'order'].includes(st.kind) && !st.powerups[id]) {
        v.canPowerup = p.powerups.some((x) => !POWERUPS[x].passive && (x !== 'vijftig' || st.kind === 'mc'));
        v.targets = this.contestants().filter((x) => x.id !== id).map((x) => ({ id: x.id, name: x.name, avatar: x.avatar }));
      }
      v.usedPowerup = st.powerups && st.powerups[id] ? st.powerups[id].type : null;
      v.skippable = ['mc', 'num', 'bluffWrite', 'order', 'ken', 'wie', 'poll'].includes(st.kind) && this.skippable();
      return v;
    }
    resultLine(id, st) {
      switch (st.of) {
        case 'mc': return st.right.includes(id) ? 'Goed!' : `Het was: ${st.options[st.correct]}`;
        case 'final': return st.right.includes(id) ? 'Goed! Inzet verdubbeld 💰' : `Fout… het was: ${st.options[st.correct]}`;
        case 'num': return `Het antwoord: ${fmtNum(st.q.answer)}${st.q.unit ? ' ' + st.q.unit : ''}`;
        case 'bluff': {
          const n = (st.fooledBy[id] || []).length;
          const found = st.votes[id] === st.truth;
          return [found ? 'Je vond het echte antwoord!' : 'Erin getuind…', n ? `Je luisde er ${n} in 😏` : ''].filter(Boolean).join(' ');
        }
        case 'order': return st.scoresBy[id] !== undefined ? `${st.scoresBy[id]} van de 4 goed` : 'Niet ingevuld';
        case 'ken': return st.hot === id ? `${st.right.length} ${st.right.length === 1 ? 'persoon kent' : 'mensen kennen'} je goed` : st.right.includes(id) ? 'Goed ingeschat!' : 'Mis!';
        case 'wie': return st.top.includes(id) ? 'De groep wees naar jou 😅' : st.gains[id] ? 'Je zat bij de meerderheid' : 'Je zat ernaast';
        case 'poll': return `${st.yes} van de ${st.total} zei ja` + (st.guesses[id] !== undefined ? ` (jij gokte ${st.guesses[id]})` : '');
      }
      return '';
    }

    // ---------- opslaan / herstellen ----------
    serialize() { return JSON.stringify(this.s); }
    restore(json) {
      this.s = JSON.parse(json);
      this.players.forEach((p) => { if (!p.isBot) p.connected = false; });
      if (!this.s.paused && this.s.step.deadline) this.s.paused = { at: this.now() };
      this.scheduleBots();
    }
  }

  function fmtNum(n) {
    if (typeof n !== 'number') return n;
    // jaartallen en kleine getallen zonder punt (1932, niet 1.932)
    if (Number.isInteger(n) && Math.abs(n) < 10000) return String(n);
    return n.toLocaleString('nl-NL');
  }

  GN.Engine = Engine;
  GN.ROUNDS = ROUNDS;
  GN.POWERUPS = POWERUPS;
  GN.AVATARS = AVATARS;
  GN.LENGTHS = LENGTHS;
  GN.fmtNum = fmtNum;
  GN.norm = norm;
  if (typeof module !== 'undefined') module.exports = GN;
})(typeof window !== 'undefined' ? window : globalThis);
