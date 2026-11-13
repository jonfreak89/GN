/* Game Night – de quiz-engine. Draait op de TV (host). Puur spelregels, geen DOM.
   De TV-laag roept tick() aan, stuurt acties door en rendert tvView()/phoneView(). */
(function (root) {
  const GN = (root.GN = root.GN || (typeof require !== 'undefined' ? require('./content.js') : {}));

  const TIME = { catpick: 15, mc: 30, tf: 15, num: 40, bet: 25, bluffWrite: 60, bluffVote: 30, order: 45, ken: 35, wie: 30, poll: 40, wzWrite: 60, wzGuess: 20, hl: 15, lingo: 120, puzzel: 120, tkDraw: 90, tkFake: 40, tkVote: 25, lgWrite: 120, lgGuess: 25, top5: 45, roll: 20, ivWrite: 90, ivVote: 40, ktWrite: 50, ktVote: 40, wager: 30, final: 35 };
  const SHOW = { intro: 6, reveal: 9, revealShort: 6, revealLong: 12, scores: 9 };

  const ROUNDS = {
    mc: { title: 'Meerkeuze', emoji: '🅰️', desc: 'Kies het juiste antwoord. Iedereen tegelijk, snelheid telt niet.', pick: 2 },
    num: { title: 'Schatten & Wedden', emoji: '🎯', desc: 'Schat een getal. Daarna wed je op het antwoord dat het dichtst zit.', pick: 1 },
    bluff: { title: 'Bluffen', emoji: '🤥', desc: 'Verzin een nep-antwoord en zoek daarna het echte. Wie je erin luist, levert punten op.', pick: 1 },
    order: { title: 'Op volgorde', emoji: '🔢', desc: 'Zet de vier dingen in de juiste volgorde.', pick: 1 },
    tf: { title: 'Waar of nep?', emoji: '🕵️', desc: 'Klopt deze stelling, of is het onzin? Snel kiezen: waar of nep.', pick: 3 },
    persoonlijk: { title: 'Hoe goed ken je elkaar?', emoji: '🫣', desc: 'Geen goede antwoorden, alleen jullie.', pick: 0 },
    hl: { title: 'Hoger of lager', emoji: '↕️', desc: 'Is het volgende getal hoger of lager? Hoe langer je goed zit, hoe meer punten.', pick: 0 },
    lingo: { title: 'Lingo', emoji: '🟩', desc: 'Raad het woord van vijf letters. De eerste letter krijg je cadeau. Hoe minder pogingen, hoe meer punten.', pick: 0 },
    puzzel: { title: 'De Puzzel', emoji: '🧩', desc: 'Twaalf woorden, drie verbanden. Vind de groepjes van vier, maar je mag maar drie keer fout zitten.', pick: 0 },
    teken: { title: 'Teken & Raad', emoji: '🎨', desc: 'Teken je geheime opdracht. Daarna verzint iedereen een nep-titel en zoek je de echte.', pick: 0 },
    leugen: { title: 'Twee waarheden en een leugen', emoji: '🤥', desc: 'Schrijf twee waarheden en één leugen over jezelf. Daarna zoekt iedereen bij elkaar de leugen.', pick: 0 },
    top5: { title: 'Top 5', emoji: '🏅', desc: 'Iemand in de hete stoel zet vijf dingen op volgorde. De rest raadt hoe.', pick: 0 },
    invul: { title: 'Invulverhaal', emoji: '📝', desc: 'Vul woorden in zonder te weten waar het verhaal over gaat. Daarna leest de TV het voor.', pick: 0 },
    ketting: { title: 'Verhalenketting', emoji: '📜', desc: 'Schrijf de volgende zin, maar je ziet alleen de zin ervoor. Aan het eind lezen we de verhalen voor.', pick: 0 },
    echt: { title: 'Echt of verzonnen?', emoji: '📰', desc: 'Je hoort het begin van een waargebeurd verhaal. Verzin hoe het afliep en zoek daarna het echte einde.', pick: 0 },
    wiezei: { title: 'Wie zei dit?', emoji: '🗯️', desc: 'Iedereen schrijft anoniem een antwoord. Daarna raad je wie wat schreef.', pick: 0 },
    final: { title: 'De Finale', emoji: '💰', desc: 'Zet zoveel punten in als je durft op één laatste vraag.', pick: 0 },
  };

  // aantal vragen per ronde, voor kort / normaal / lang
  const COUNTS = {
    mc: [3, 5, 6], tf: [4, 5, 6], hl: [5, 6, 7], num: [2, 3, 3], lingo: [2, 2, 3], bluff: [2, 3, 3], order: [2, 3, 3],
    puzzel: [1, 1, 2], teken: [1, 1, 1], persoonlijk: [3, 4, 5], top5: [2, 3, 3], leugen: [1, 1, 1], wiezei: [1, 1, 2], invul: [1, 1, 1], ketting: [1, 1, 1], echt: [2, 3, 3],
  };
  const ORDER = ['mc', 'tf', 'hl', 'num', 'lingo', 'bluff', 'echt', 'order', 'puzzel', 'invul', 'teken', 'persoonlijk', 'top5', 'leugen', 'ketting', 'wiezei'];
  // Thema-avonden: beperken de categorieën (andere rondes blijven gewoon meedoen)
  const THEMES = {
    nerd: { name: 'Nerd-avond', emoji: '🧙', cats: ['fantasy', 'scifi', 'superhelden', 'games', 'film', 'wetenschap'] },
    retro: { name: 'Jaren 80 & 90', emoji: '📼', cats: ['jaren', 'kindertv', 'reclames', 'muziek', 'games', 'film'] },
  };
  // Ganzenbord: 40 vakjes, met de klassieke speciale vakjes
  const BOARD_END = 40;
  const BOARD = {};
  [5, 9, 14, 18, 23, 27, 32, 36].forEach((i) => (BOARD[i] = 'gans'));
  [3, 11, 16, 29, 35].forEach((i) => (BOARD[i] = 'kans'));
  [8, 21, 33].forEach((i) => (BOARD[i] = 'ster'));
  Object.assign(BOARD, { 6: 'brug', 19: 'herberg', 25: 'doolhof', 31: 'put', 34: 'gevangenis', 38: 'dood' });
  const BOARD_ROUNDS = { kort: 8, normaal: 12, lang: 16 };
  const SLOTS = { kort: 6, normaal: 8, lang: 11 };
  const LENGTHS = { kort: '6 rondes, ± 25 min', normaal: '8 rondes, ± 35 min', lang: '11 rondes, ± 50 min' };
  const ROUND_KEYS = ORDER.slice();
  const TEAMS = [
    { name: 'Team Patat', emoji: '🍟', color: '#ffb627' },
    { name: 'Team Tulp', emoji: '🌷', color: '#ff4f8b' },
    { name: 'Team Kaas', emoji: '🧀', color: '#4cc9f0' },
  ];

  const POWERUPS = GN.POWERUPS;
  const PU_KEYS = Object.keys(POWERUPS);

  const AVATARS = GN.AVATARS;
  const COLORS = ['#ff5d73', '#ffb627', '#3ddc97', '#4cc9f0', '#b388ff', '#ff8fab', '#f9f871', '#62d2a2', '#ff9a3c', '#7aa2ff', '#e36bae', '#9be564'];
  const BOT_NAMES = ['Bot Bertje', 'Bot Truus', 'Bot Henk', 'Bot Ingrid', 'Bot Kees', 'Bot Greet'];
  const BOT_LIES = [
    { s: ['Ik ben een robot', 'Ik heb nog nooit geslapen', 'Ik ben dol op kaas'], lie: 2 },
    { s: ['Ik draai op stroom', 'Ik heb een rijbewijs', 'Ik kan heel snel rekenen'], lie: 1 },
    { s: ['Ik ben ooit gecrasht', 'Ik heb een kat', 'Ik praat met andere computers'], lie: 1 },
    { s: ['Ik ben in Nederland gemaakt', 'Ik weet alles van frikandellen', 'Ik droom van schapen'], lie: 2 },
  ];
  const BOT_LINES = ['Error 404: grap niet gevonden', 'Ik ben een robot, ik voel niks', 'Mijn moeder was een broodrooster', 'Bliep bloep', 'Dat zeg ik alleen tegen mijn advocaat', 'Geen commentaar'];

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
        settings: { spice: 2, length: 'normaal', gmPlays: true, voice: false, teams: 0, rounds: {}, theme: '', mode: 'quiz', music: true, sfx: true, bigText: false },
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
      if (s.settings.teams && p.playing) p.team = this.smallestTeam(id);
      this.changed();
      return id;
    }

    // ---------- teams ----------
    teamCount() { return this.s.settings.teams || 0; }
    smallestTeam(except) {
      const n = this.teamCount();
      const sizes = Array.from({ length: n }, (_, t) => this.contestants().filter((p) => p.team === t && p.id !== except).length);
      const min = Math.min(...sizes);
      return this.pick(sizes.map((v, i) => i).filter((i) => sizes[i] === min));
    }
    balanceTeams(random) {
      const n = this.teamCount();
      const ps = random ? this.shuffle(this.contestants()) : this.contestants();
      this.players.forEach((p) => (p.team = null));
      if (!n) return;
      // mensen eerst eerlijk verdelen, bots daarna aanvullen
      const humans = ps.filter((p) => !p.isBot), bots = ps.filter((p) => p.isBot);
      humans.concat(bots).forEach((p, i) => (p.team = i % n));
    }
    teamScores() {
      const n = this.teamCount();
      if (!n) return null;
      const teams = TEAMS.slice(0, n).map((t, i) => {
        const members = this.contestants().filter((p) => p.team === i);
        const sum = members.reduce((a, p) => a + p.score, 0);
        return Object.assign({ id: i, members: members.map((p) => p.id), size: members.length, sum }, t);
      });
      // kleinere teams krijgen een bonus zodat het eerlijk blijft
      const max = Math.max(1, ...teams.map((t) => t.size));
      teams.forEach((t) => (t.score = t.size ? Math.round((t.sum * max) / t.size) : 0));
      return teams;
    }
    blankStats() { return { correct: 0, fooled: 0, betWins: 0, closest: 0, kenCorrect: 0, wieVotes: 0, powerups: 0, stolen: 0, wzRight: 0, scored: 0, best: 0 }; }
    assignGm() {
      const h = this.players.find((p) => !p.isBot && p.connected) || this.players.find((p) => !p.isBot);
      this.s.gm = h ? h.id : null;
      if (h && !this.s.settings.gmPlays && this.s.step.kind === 'lobby') { h.playing = false; h.team = null; }
    }
    addBot() {
      const bots = this.players.filter((p) => p.isBot).length;
      if (bots >= BOT_NAMES.length) return;
      const id = this.join({ token: 'bot' + bots + ':' + this.rand(), name: BOT_NAMES[bots], avatar: '🤖' });
      this.s.players[id].isBot = true;
      if (this.s.gm === id) this.assignGm();
      if (this.teamCount()) this.s.players[id].team = this.smallestTeam(id);
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
      const all = GN.CATEGORIES.filter((c) => c.spice <= spice && (this.poolFor(type, c.id).length || this.gensFor(type, c.id).length));
      const th = THEMES[this.s.settings.theme];
      if (!th) return all;
      const inTheme = all.filter((c) => th.cats.includes(c.id));
      return inTheme.length ? inTheme : all;
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
          if (g && !this.seen[g.id] && !(g.base && this.seen[g.base])) q = Object.assign({ cat }, g);
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
      if (q.base) this.markSeen(q.base);
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
        p.pos = 0;
        p.skip = 0;
      });
      s.plan = this.buildPlan().map(([type, count]) => ({ type, count }));
      s.highlights = [];
      s.howtoSeen = {};
      if (this.teamCount()) this.players.forEach((p) => { if (p.playing && (p.team == null || p.team >= this.teamCount())) p.team = this.smallestTeam(p.id); });
      s.roundIdx = -1;
      this.nextRound();
    }
    buildPlan() {
      const s = this.s;
      if (s.settings.mode === 'bord') return this.buildBoardPlan();
      const on = s.settings.rounds || {};
      const L = { kort: 0, normaal: 1, lang: 2 }[s.settings.length] || 0;
      const slots = SLOTS[s.settings.length] || 6;
      let types = ORDER.filter((t) => on[t] !== false);
      if (!types.length) types = ['mc'];
      // te veel rondes aan? Dan willekeurig een paar laten vallen (meerkeuze blijft)
      while (types.length > slots) {
        const drop = types.filter((t) => t !== 'mc');
        types.splice(types.indexOf(this.pick(drop)), 1);
      }
      const plan = types.map((t) => [t, COUNTS[t][L]]);
      // plek over? Extra snelle rondes ertussen
      const extra = ['mc', 'tf', 'hl', 'num'].filter((t) => types.includes(t));
      // (elk type hooguit twee keer, anders wordt het eentonig)
      for (let k = 0; plan.length < slots && extra.length && k < 12; k++) {
        const t = extra[k % extra.length];
        if (plan.filter((x) => x[0] === t).length >= 2) continue;
        plan.splice(Math.ceil(plan.length * 0.6), 0, [t, Math.max(2, COUNTS[t][L] - 1)]);
      }
      plan.push(['final', 1]);
      return plan;
    }
    buildBoardPlan() {
      // Ganzenbord: korte rondes achter elkaar, tussendoor dobbelen. Geen finale: wie het eerst op 40 staat wint.
      const s = this.s;
      const on = s.settings.rounds || {};
      const n = BOARD_ROUNDS[s.settings.length] || 12;
      const types = ORDER.filter((t) => on[t] !== false);
      if (!types.length) types.push('mc');
      const short = { mc: 3, tf: 4, hl: 4, num: 2, lingo: 1, bluff: 2, order: 2, puzzel: 1, teken: 1, persoonlijk: 3, top5: 2, leugen: 1, wiezei: 1, invul: 1, ketting: 1, echt: 2 };
      const plan = [];
      let bag = [];
      while (plan.length < n) {
        if (!bag.length) bag = this.shuffle(types);
        const t = bag.shift();
        if (plan.length && plan[plan.length - 1][0] === t && types.length > 1) { bag.push(t); continue; }
        plan.push([t, short[t] || 2]);
      }
      return plan;
    }
    nextRound() {
      const s = this.s;
      s.roundIdx++;
      const r = s.plan[s.roundIdx];
      if (!r) return this.endGame();
      if (r.type === 'persoonlijk' && this.contestants().length < 2) return this.nextRound();
      if (r.type === 'wiezei' && this.contestants().length < 3) return this.nextRound();
      if (r.type === 'teken' && this.contestants().length < 3) return this.nextRound();
      if (r.type === 'leugen' && this.contestants().length < 3) return this.nextRound();
      if (r.type === 'top5' && this.contestants().length < 2) return this.nextRound();
      if ((r.type === 'invul' || r.type === 'ketting') && this.contestants().length < 2) return this.nextRound();
      const startScores = {};
      this.contestants().forEach((p) => (startScores[p.id] = p.score));
      s.round = { type: r.type, count: r.count, done: 0, cat: null, usedCats: [], startScores };
      const R = ROUNDS[r.type];
      s.howtoSeen = s.howtoSeen || {};
      const howto = !s.howtoSeen[r.type] && !!(GN.HOWTO && GN.HOWTO[r.type]);
      s.howtoSeen[r.type] = true;
      this.newStep('intro', { round: r.type, title: R.title, emoji: R.emoji, desc: R.desc, howto, roundNo: s.roundIdx + 1, rounds: s.plan.length, count: r.count }, howto ? SHOW.intro + 8 : SHOW.intro);
    }
    nextQuestion() {
      const s = this.s;
      const r = s.round;
      if (r.done >= r.count) return this.roundScores();
      const R = ROUNDS[r.type];
      if (r.type === 'final') return this.startFinal();
      if (r.type === 'persoonlijk') return this.askPersonal();
      if (r.type === 'wiezei') return this.askWz();
      if (r.type === 'hl') return this.askHL();
      if (r.type === 'lingo') return this.askLingo();
      if (r.type === 'puzzel') return this.askPuzzel();
      if (r.type === 'teken') return this.askTeken();
      if (r.type === 'leugen') return this.askLeugen();
      if (r.type === 'top5') return this.askTop5();
      if (r.type === 'invul') return this.askInvul();
      if (r.type === 'ketting') return this.askKetting();
      if (r.type === 'echt') return this.askEcht();
      if (R.pick && r.done % R.pick === 0) return this.catPick();
      this.ask();
    }
    lastPlace() {
      let ps = this.active();
      if (!ps.length) return null;
      const teams = this.teamScores();
      if (teams) {
        const live = teams.filter((t) => ps.some((p) => p.team === t.id));
        if (live.length) {
          const low = Math.min(...live.map((t) => t.score));
          const lt = this.pick(live.filter((t) => t.score === low));
          ps = ps.filter((p) => p.team === lt.id);
        }
      }
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
      } else if (r.type === 'tf') {
        this.newStep('tf', Object.assign(base, { options: ['Waar', 'Nep'], correct: q.a ? 0 : 1 }), TIME.tf);
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
    askWz() {
      const r = this.s.round;
      const p = this.drawPrompt('wz');
      if (!p) { r.done = r.count; return this.roundScores(); }
      r.wz = null;
      this.newStep('wzWrite', { q: p, text: p.q, qno: r.done + 1, qcount: r.count }, TIME.wzWrite);
    }
    wzStart() {
      const st = this.s.step;
      const r = this.s.round;
      const entries = this.shuffle(Object.entries(st.answers).map(([author, text]) => ({ author, text }))).slice(0, 6);
      if (entries.length < 2) {
        // te weinig antwoorden om te raden
        r.done++;
        return this.nextQuestion();
      }
      r.wz = { text: st.text, q: st.q, entries, idx: 0 };
      this.wzGuess();
    }
    wzGuess() {
      const r = this.s.round;
      const e = r.wz.entries[r.wz.idx];
      this.newStep('wzGuess', { text: r.wz.text, entry: e.text, author: e.author, eno: r.wz.idx + 1, etotal: r.wz.entries.length, qno: r.done + 1, qcount: r.count }, TIME.wzGuess);
    }
    revealWz() {
      const st = this.s.step;
      const gains = {};
      const right = [];
      let fooled = 0;
      Object.entries(st.answers).forEach(([pid, v]) => {
        if (v === st.author) {
          gains[pid] = 100;
          right.push(pid);
          const p = this.s.players[pid];
          if (p) p.stats.wzRight = (p.stats.wzRight || 0) + 1;
        } else fooled++;
      });
      if (fooled) {
        gains[st.author] = (gains[st.author] || 0) + 50 * fooled;
        const a = this.s.players[st.author];
        if (a) a.stats.fooled += fooled;
      }
      Object.entries(gains).forEach(([pid, g]) => { const p = this.s.players[pid]; if (p) p.score += g; });
      this.reveal({ of: 'wz', text: st.text, entry: st.entry, author: st.author, votes: st.answers, right, gains, events: [], eno: st.eno, etotal: st.etotal, qno: st.qno, qcount: st.qcount }, SHOW.revealShort);
    }

    // ---------- Hoger of lager ----------
    askHL() {
      const r = this.s.round;
      if (!r.hl) {
        const sets = (GN.HL_SETS || []).filter((x) => x.items.length >= r.count + 1);
        if (!sets.length) { r.done = r.count; return this.roundScores(); }
        const used = this.s.hlUsed || (this.s.hlUsed = []);
        const fresh = sets.filter((x) => !used.includes(x.id));
        const set = this.pick(fresh.length ? fresh : sets);
        used.push(set.id);
        const pool = this.shuffle(set.items);
        const chain = [];
        const okStep = (a, b) => a.v !== b.v && Math.abs(a.v - b.v) / Math.max(Math.abs(a.v), Math.abs(b.v), 1e-9) >= (set.gap || 0.08);
        for (const it of pool) {
          if (chain.length > r.count) break;
          if (!chain.length || okStep(chain[chain.length - 1], it)) chain.push(it);
        }
        if (chain.length < 2) { r.done = r.count; return this.roundScores(); }
        r.count = Math.min(r.count, chain.length - 1);
        r.hl = { set: { id: set.id, title: set.title, hi: set.hi, lo: set.lo, emoji: set.emoji || '↕️' }, chain, streak: {} };
      }
      const a = r.hl.chain[r.done];
      const b = r.hl.chain[r.done + 1];
      this.newStep('hl', { set: r.hl.set, a, b: { n: b.n }, bFull: b, correct: b.v > a.v ? 0 : 1, qno: r.done + 1, qcount: r.count }, TIME.hl);
    }
    revealHL() {
      const st = this.s.step;
      const r = this.s.round;
      const gains = {};
      const right = [];
      this.contestants().forEach((p) => {
        const ok = st.answers[p.id] === st.correct;
        r.hl.streak[p.id] = ok ? (r.hl.streak[p.id] || 0) + 1 : 0;
        if (ok) {
          right.push(p.id);
          gains[p.id] = Math.min(150, 50 + 25 * (r.hl.streak[p.id] - 1));
          p.stats.correct++;
        }
      });
      Object.entries(gains).forEach(([pid, g]) => { const p = this.s.players[pid]; if (p) p.score += g; });
      this.reveal({ of: 'hl', set: st.set, a: st.a, b: st.bFull, correct: st.correct, picks: st.answers, right, gains, streak: Object.assign({}, r.hl.streak), events: [], qno: st.qno, qcount: st.qcount }, SHOW.revealShort);
    }

    // ---------- Lingo ----------
    askLingo() {
      const words = (GN.LINGO || []).filter((w) => /^[a-z]{5}$/.test(w));
      if (!words.length) { this.s.round.done = this.s.round.count; return this.roundScores(); }
      const fresh = words.filter((w) => !this.seen['lingo:' + w]);
      const word = this.pick(fresh.length ? fresh : words);
      this.markSeen('lingo:' + word);
      const r = this.s.round;
      this.newStep('lingo', { word, first: word[0], prog: {}, qno: r.done + 1, qcount: r.count }, TIME.lingo);
    }
    lingoMarks(guess, word) {
      const m = Array(5).fill('-');
      const left = {};
      for (let i = 0; i < 5; i++) {
        if (guess[i] === word[i]) m[i] = 'g';
        else left[word[i]] = (left[word[i]] || 0) + 1;
      }
      for (let i = 0; i < 5; i++) {
        if (m[i] !== 'g' && left[guess[i]]) { m[i] = 'y'; left[guess[i]]--; }
      }
      return m.join('');
    }
    lingoGuess(p, w) {
      const st = this.s.step;
      const prog = st.prog[p.id] || (st.prog[p.id] = { g: [], solved: false });
      if (st.answers[p.id] !== undefined) return;
      w = String(w || '').toLowerCase().replace(/[^a-z]/g, '');
      if (w.length !== 5 || w[0] !== st.first) return;
      prog.g.push({ w, m: this.lingoMarks(w, st.word) });
      if (w === st.word) prog.solved = true;
      if (prog.solved || prog.g.length >= 5) st.answers[p.id] = true;
      this.changed();
      this.checkAllIn();
    }
    revealLingo() {
      const st = this.s.step;
      const gains = {};
      const right = [];
      const pts = [150, 120, 90, 60, 40];
      this.contestants().forEach((p) => {
        const pr = st.prog[p.id];
        if (pr && pr.solved) {
          gains[p.id] = pts[pr.g.length - 1] || 40;
          right.push(p.id);
          p.stats.correct++;
        }
      });
      Object.entries(gains).forEach(([pid, g]) => { const p = this.s.players[pid]; if (p) p.score += g; });
      const grids = {};
      Object.entries(st.prog).forEach(([pid, pr]) => (grids[pid] = pr.g.map((x) => x.m)));
      this.reveal({ of: 'lingo', word: st.word, grids, right, gains, events: [], qno: st.qno, qcount: st.qcount }, SHOW.reveal);
    }

    // ---------- De Puzzel ----------
    askPuzzel() {
      const all = GN.PUZZELS || [];
      const r = this.s.round;
      if (!all.length) { r.done = r.count; return this.roundScores(); }
      const fresh = all.filter((x) => !this.seen['puz:' + x.id]);
      const pz = this.pick(fresh.length ? fresh : all);
      this.markSeen('puz:' + pz.id);
      const words = this.shuffle(pz.groups.flatMap((g, gi) => g.words.map((w) => ({ w, g: gi }))));
      this.newStep('puzzel', { puzzle: { id: pz.id, groups: pz.groups.map((g) => ({ name: g.name, words: g.words })) }, words, prog: {}, qno: r.done + 1, qcount: r.count }, TIME.puzzel);
    }
    puzzelGroup(p, idx) {
      const st = this.s.step;
      if (st.answers[p.id] !== undefined) return;
      if (!Array.isArray(idx) || idx.length !== 4 || new Set(idx).size !== 4 || idx.some((i) => !(i >= 0 && i < st.words.length))) return;
      const pr = st.prog[p.id] || (st.prog[p.id] = { found: [], mistakes: 0, last: null });
      const gs = idx.map((i) => st.words[i].g);
      const g = gs[0];
      if (gs.every((x) => x === g) && !pr.found.includes(g)) {
        pr.found.push(g);
        pr.last = 'ok';
      } else {
        pr.mistakes++;
        // drie van de vier goed? Dan zeggen we dat, net als op tv
        const counts = {};
        gs.forEach((x) => (counts[x] = (counts[x] || 0) + 1));
        pr.last = Object.values(counts).some((c) => c === 3) ? 'bijna' : 'fout';
      }
      if (pr.found.length === st.puzzle.groups.length || pr.mistakes >= 3) st.answers[p.id] = true;
      this.changed();
      this.checkAllIn();
    }
    revealPuzzel() {
      const st = this.s.step;
      const gains = {};
      const found = {};
      this.contestants().forEach((p) => {
        const pr = st.prog[p.id];
        const n = pr ? pr.found.length : 0;
        found[p.id] = n;
        if (n) gains[p.id] = 50 * n + (n === st.puzzle.groups.length ? 50 : 0);
        if (n === st.puzzle.groups.length) p.stats.correct++;
      });
      Object.entries(gains).forEach(([pid, g]) => { const p = this.s.players[pid]; if (p) p.score += g; });
      this.reveal({ of: 'puzzel', puzzle: st.puzzle, found, gains, events: [], qno: st.qno, qcount: st.qcount }, SHOW.revealLong);
    }

    // ---------- Teken & Raad ----------
    askTeken() {
      const r = this.s.round;
      const spice = this.s.settings.spice;
      const pool = (GN.TEKEN || []).filter((t) => (t.spice || 1) <= spice);
      if (!pool.length) { r.done = r.count; return this.roundScores(); }
      const fresh = this.shuffle(pool.filter((t) => !this.seen['tk:' + GN.hash(t.q)]));
      const list = fresh.length >= this.contestants().length ? fresh : this.shuffle(pool);
      const prompts = {};
      this.contestants().forEach((p, i) => {
        const t = list[i % list.length];
        prompts[p.id] = t.q;
        this.markSeen('tk:' + GN.hash(t.q));
      });
      r.tk = null;
      this.newStep('tkDraw', { prompts, drawings: {}, qno: r.done + 1, qcount: r.count }, TIME.tkDraw);
    }
    cleanDrawing(v) {
      if (!Array.isArray(v)) return null;
      let pts = 0;
      const out = [];
      for (const st of v.slice(0, 400)) {
        if (!st || !Array.isArray(st.p)) continue;
        const p = st.p.slice(0, 2400).map((n) => Math.max(0, Math.min(1000, Math.round(Number(n) || 0))));
        if (p.length < 2) continue;
        pts += p.length;
        if (pts > 16000) break;
        out.push({ c: Math.max(0, Math.min(7, st.c | 0)), w: Math.max(0, Math.min(2, st.w | 0)), p: p.length % 2 ? p.slice(0, -1) : p });
      }
      return out;
    }
    tkStart() {
      const st = this.s.step;
      const r = this.s.round;
      const entries = this.shuffle(Object.keys(st.drawings).filter((pid) => st.drawings[pid].length && this.s.players[pid]))
        .slice(0, 6)
        .map((pid) => ({ artist: pid, prompt: st.prompts[pid], drawing: st.drawings[pid] }));
      if (entries.length < 1) { r.done++; return this.nextQuestion(); }
      r.tk = { entries, idx: 0 };
      this.tkFake();
    }
    tkFake() {
      const r = this.s.round;
      const e = r.tk.entries[r.tk.idx];
      this.newStep('tkFake', { artist: e.artist, prompt: e.prompt, drawing: e.drawing, eno: r.tk.idx + 1, etotal: r.tk.entries.length, rejected: {}, qno: r.done + 1, qcount: r.count }, TIME.tkFake);
    }
    tkToVote() {
      const st = this.s.step;
      const opts = [];
      const add = (text, author) => {
        const ex = opts.find((o) => norm(o.text) === norm(text));
        if (ex) { if (author) ex.authors.push(author); return; }
        opts.push({ text, authors: author ? [author] : [] });
      };
      Object.entries(st.answers).forEach(([pid, t]) => add(t, pid));
      const decoys = this.shuffle((GN.TEKEN || []).map((t) => t.q).filter((q) => norm(q) !== norm(st.prompt)));
      while (opts.length < 3 && decoys.length) add(decoys.shift(), null);
      const all = this.shuffle(opts.concat([{ text: st.prompt, authors: [], truth: true }]));
      this.newStep('tkVote', { artist: st.artist, prompt: st.prompt, drawing: st.drawing, options: all, truth: all.findIndex((o) => o.truth), eno: st.eno, etotal: st.etotal, qno: st.qno, qcount: st.qcount }, TIME.tkVote);
    }
    revealTk() {
      const st = this.s.step;
      const gains = {};
      const add = (pid, g) => (gains[pid] = (gains[pid] || 0) + g);
      Object.entries(st.answers).forEach(([pid, oi]) => {
        if (oi === st.truth) {
          add(pid, 100);
          add(st.artist, 50);
        } else {
          st.options[oi].authors.forEach((a) => {
            add(a, 50);
            const p = this.s.players[a];
            if (p) p.stats.fooled++;
          });
        }
      });
      Object.entries(gains).forEach(([pid, g]) => { const p = this.s.players[pid]; if (p) p.score += g; });
      this.reveal({ of: 'tk', artist: st.artist, prompt: st.prompt, drawing: st.drawing, options: st.options, truth: st.truth, votes: st.answers, gains, events: [], eno: st.eno, etotal: st.etotal, qno: st.qno, qcount: st.qcount }, SHOW.revealLong);
    }
    botScribble() {
      const strokes = [];
      const n = 3 + Math.floor(this.rand() * 5);
      for (let i = 0; i < n; i++) {
        const p = [];
        let x = 200 + this.rand() * 600, y = 200 + this.rand() * 600;
        for (let k = 0; k < 12; k++) {
          x = Math.max(20, Math.min(980, x + (this.rand() - 0.5) * 220));
          y = Math.max(20, Math.min(980, y + (this.rand() - 0.5) * 220));
          p.push(Math.round(x), Math.round(y));
        }
        strokes.push({ c: Math.floor(this.rand() * 6), w: Math.floor(this.rand() * 3), p });
      }
      return strokes;
    }

    // ---------- Twee waarheden en een leugen ----------
    askLeugen() {
      const r = this.s.round;
      r.lg = null;
      this.newStep('lgWrite', { qno: r.done + 1, qcount: r.count }, TIME.lgWrite);
    }
    lgStart() {
      const st = this.s.step;
      const r = this.s.round;
      const entries = this.shuffle(Object.keys(st.answers).filter((pid) => this.s.players[pid])).slice(0, 6).map((pid) => {
        const a = st.answers[pid];
        const order = this.shuffle([0, 1, 2]);
        return { author: pid, statements: order.map((i) => a.s[i]), lie: order.indexOf(a.lie) };
      });
      if (entries.length < 2) { r.done++; return this.nextQuestion(); }
      r.lg = { entries, idx: 0 };
      this.lgGuess();
    }
    lgGuess() {
      const r = this.s.round;
      const e = r.lg.entries[r.lg.idx];
      this.newStep('lgGuess', { author: e.author, statements: e.statements, lie: e.lie, eno: r.lg.idx + 1, etotal: r.lg.entries.length, qno: r.done + 1, qcount: r.count }, TIME.lgGuess);
    }
    revealLg() {
      const st = this.s.step;
      const gains = {};
      const right = [];
      let fooled = 0;
      Object.entries(st.answers).forEach(([pid, v]) => {
        if (v === st.lie) { gains[pid] = 100; right.push(pid); const p = this.s.players[pid]; if (p) p.stats.kenCorrect++; }
        else fooled++;
      });
      if (fooled) { gains[st.author] = 50 * fooled; const a = this.s.players[st.author]; if (a) a.stats.fooled += fooled; }
      Object.entries(gains).forEach(([pid, g]) => { const p = this.s.players[pid]; if (p) p.score += g; });
      this.reveal({ of: 'lg', author: st.author, statements: st.statements, lie: st.lie, votes: st.answers, right, gains, events: [], eno: st.eno, etotal: st.etotal, qno: st.qno, qcount: st.qcount }, SHOW.revealShort + 1);
    }

    // ---------- Top 5 ----------
    askTop5() {
      const r = this.s.round;
      const spice = this.s.settings.spice;
      const pool = (GN.TOP5 || []).filter((t) => (t.spice || 1) <= spice);
      if (!pool.length) { r.done = r.count; return this.roundScores(); }
      const fresh = pool.filter((t) => !this.seen['t5:' + GN.hash(t.q)]);
      const t = this.pick(fresh.length ? fresh : pool);
      this.markSeen('t5:' + GN.hash(t.q));
      const humans = this.humans().filter((h) => h.connected);
      const players = humans.length ? humans : this.contestants();
      this.s.lastHot = (this.s.lastHot + 1) % players.length;
      const hot = players[this.s.lastHot];
      this.newStep('top5', {
        hot: hot.id, q: t, text: t.q.replace(/\{naam\}/g, hot.name), self: t.self || t.q.replace(/\{naam\}/g, 'jij'),
        items: this.shuffle(t.items), lo: t.lo, hi: t.hi, qno: r.done + 1, qcount: r.count,
      }, TIME.top5);
    }
    revealTop5() {
      const st = this.s.step;
      const hotAns = st.answers[st.hot];
      const gains = {};
      const scoresBy = {};
      let good = 0;
      if (hotAns) {
        Object.entries(st.answers).forEach(([pid, a]) => {
          if (pid === st.hot) return;
          let n = 0;
          a.forEach((x, i) => { if (x === hotAns[i]) n++; });
          scoresBy[pid] = n;
          const g = n * 20 + (n === 5 ? 50 : 0);
          if (g) gains[pid] = g;
          if (n >= 3) { good++; const p = this.s.players[pid]; if (p) p.stats.kenCorrect++; }
        });
        if (good) gains[st.hot] = 25 * good;
      }
      Object.entries(gains).forEach(([pid, g]) => { const p = this.s.players[pid]; if (p) p.score += g; });
      this.reveal({ of: 'top5', hot: st.hot, text: st.text, items: st.items, hotAns, lo: st.lo, hi: st.hi, scoresBy, gains, events: [], qno: st.qno, qcount: st.qcount }, SHOW.revealLong);
    }

    // ---------- Verhalen ----------
    drawFrom(list, prefix, keyOf) {
      const spice = this.s.settings.spice;
      const pool = (list || []).filter((t) => (t.spice || 1) <= spice);
      if (!pool.length) return null;
      const id = (t) => prefix + GN.hash(keyOf(t));
      const fresh = pool.filter((t) => !this.seen[id(t)]);
      const t = this.pick(fresh.length ? fresh : pool.slice().sort((a, b) => (this.seen[id(a)] || 0) - (this.seen[id(b)] || 0)).slice(0, Math.max(2, pool.length >> 2)));
      this.markSeen(id(t));
      return t;
    }
    askEcht(skippedNote) {
      const r = this.s.round;
      const e = this.drawFrom(GN.ECHT, 'ec:', (t) => t.q);
      if (!e) { r.done = r.count; return this.roundScores(); }
      const q = { q: e.q, answer: e.answer, accept: e.accept || [], decoys: e.decoys, fact: e.fact, spice: e.spice || 1, type: 'bluff' };
      this.newStep('bluffWrite', { q, cat: null, story: true, qno: r.done + 1, qcount: r.count, skippedNote: skippedNote || null, rejected: {} }, TIME.bluffWrite + 30);
    }
    parseInvul(text) {
      const T = GN.INVUL_TYPES || {};
      const parts = [];
      const blanks = [];
      const named = {};
      let last = 0;
      text.replace(/\{([^}]+)\}/g, (m, k, at) => {
        if (at > last) parts.push(text.slice(last, at));
        last = at + m.length;
        if (k[0] === '=') { const i = named[k.slice(1)]; parts.push(i === undefined ? '…' : { b: i }); return m; }
        const [type, name] = k.split('!');
        const i = blanks.length;
        blanks.push({ type, label: T[type] ? T[type].label : type });
        if (name) named[name] = i;
        parts.push({ b: i });
        return m;
      });
      if (last < text.length) parts.push(text.slice(last));
      return { parts, blanks };
    }
    askInvul() {
      const r = this.s.round;
      const story = this.drawFrom(GN.INVUL, 'iv:', (t) => t.title);
      const players = this.shuffle(this.active().map((p) => p.id));
      if (!story || players.length < 2) { r.done = r.count; return this.roundScores(); }
      const { parts, blanks } = this.parseInvul(story.text);
      const assign = {};
      blanks.forEach((b, i) => { const pid = players[i % players.length]; (assign[pid] = assign[pid] || []).push(i); });
      this.newStep('ivWrite', { title: story.title, q: { q: story.title, spice: story.spice || 1 }, parts, blanks, assign, qno: r.done + 1, qcount: r.count }, TIME.ivWrite);
    }
    invulExample(type) {
      const t = (GN.INVUL_TYPES || {})[type];
      return t && t.ex && t.ex.length ? this.pick(t.ex) : 'iets';
    }
    ivToVote() {
      const st = this.s.step;
      const fills = st.blanks.map((b) => ({ text: this.invulExample(b.type), author: null }));
      Object.entries(st.assign).forEach(([pid, idx]) => {
        const a = st.answers[pid];
        idx.forEach((bi, k) => { if (a && a[k]) fills[bi] = { text: a[k], author: pid }; });
      });
      this.newStep('ivVote', { title: st.title, q: st.q, parts: st.parts, blanks: st.blanks, fills, qno: st.qno, qcount: st.qcount }, TIME.ivVote);
    }
    voteTally(answers) {
      const n = {};
      Object.values(answers).forEach((i) => (n[i] = (n[i] || 0) + 1));
      const max = Math.max(0, ...Object.values(n));
      return { n, top: max ? Object.keys(n).filter((k) => n[k] === max).map(Number) : [] };
    }
    revealIv() {
      const st = this.s.step;
      const gains = {};
      Object.values(st.answers).forEach((i) => { const a = st.fills[i] && st.fills[i].author; if (a) gains[a] = (gains[a] || 0) + 50; });
      const { n, top } = this.voteTally(st.answers);
      top.forEach((i) => { const a = st.fills[i].author; if (a) { gains[a] = (gains[a] || 0) + 50; const p = this.s.players[a]; if (p) p.stats.fooled++; } });
      Object.entries(gains).forEach(([pid, g]) => { const p = this.s.players[pid]; if (p) p.score += g; });
      this.reveal({ of: 'iv', title: st.title, parts: st.parts, fills: st.fills, votes: st.answers, counts: n, top, gains, events: [], qno: st.qno, qcount: st.qcount }, SHOW.revealLong + 4);
    }

    askKetting() {
      const r = this.s.round;
      const players = this.shuffle(this.active().map((p) => p.id));
      if (players.length < 2) { r.done = r.count; return this.roundScores(); }
      const S = Math.min(players.length, 4);
      const stories = [];
      for (let i = 0; i < S; i++) {
        const o = this.drawFrom(GN.KETTING, 'kt:', (t) => t.q);
        if (!o) break;
        if (stories.some((x) => x.opener === o.q)) { i--; if (stories.length >= (GN.KETTING || []).length) break; continue; }
        stories.push({ opener: o.q, lines: [] });
      }
      if (!stories.length) { r.done = r.count; return this.roundScores(); }
      r.kt = { players, stories, turn: 0, T: 4, idx: 0 };
      this.ktWrite();
    }
    ktWrite() {
      const r = this.s.round;
      const k = r.kt;
      const assign = {};
      const prev = {};
      k.stories.forEach((st, si) => {
        const pid = k.players[(si + k.turn) % k.players.length];
        assign[pid] = si;
        prev[pid] = st.lines.length ? st.lines[st.lines.length - 1].text : st.opener;
      });
      this.newStep('ktWrite', { turn: k.turn, T: k.T, assign, prev, first: k.turn === 0, last: k.turn === k.T - 1, stotal: k.stories.length, qno: r.done + 1, qcount: r.count }, TIME.ktWrite);
    }
    ktNext() {
      const st = this.s.step;
      const k = this.s.round.kt;
      Object.entries(st.assign).forEach(([pid, si]) => {
        const t = st.answers[pid];
        k.stories[si].lines.push(t ? { text: t, author: pid } : { text: this.pick(GN.KETTING_FILL || ['En toen was het stil.']), author: null });
      });
      k.turn++;
      if (k.turn < k.T) return this.ktWrite();
      k.idx = 0;
      this.ktVote();
    }
    ktVote() {
      const r = this.s.round;
      const k = r.kt;
      const story = k.stories[k.idx];
      this.newStep('ktVote', { sno: k.idx + 1, stotal: k.stories.length, opener: story.opener, lines: story.lines, qno: r.done + 1, qcount: r.count }, TIME.ktVote);
    }
    revealKt() {
      const st = this.s.step;
      const gains = {};
      Object.values(st.answers).forEach((i) => { const a = st.lines[i] && st.lines[i].author; if (a) gains[a] = (gains[a] || 0) + 50; });
      const { n, top } = this.voteTally(st.answers);
      top.forEach((i) => { const a = st.lines[i].author; if (a) { gains[a] = (gains[a] || 0) + 50; const p = this.s.players[a]; if (p) p.stats.fooled++; } });
      Object.entries(gains).forEach(([pid, g]) => { const p = this.s.players[pid]; if (p) p.score += g; });
      this.reveal({ of: 'kt', sno: st.sno, stotal: st.stotal, opener: st.opener, lines: st.lines, votes: st.answers, counts: n, top, gains, events: [], qno: st.qno, qcount: st.qcount }, SHOW.revealLong);
    }
    canVoteOn(list, id) { return list.some((x) => x.author !== id); }

    // ---------- Ganzenbord ----------
    boardTurn() {
      const s = this.s;
      const r = s.round;
      // bonusstappen voor de beste spelers van de ronde die net voorbij is
      const gained = this.contestants().map((p) => ({ id: p.id, g: p.score - ((r && r.startScores && r.startScores[p.id]) || 0) }))
        .filter((x) => x.g > 0).sort((a, b) => b.g - a.g);
      const bonus = {};
      const steps = [3, 2, 1];
      let rank = 0;
      gained.forEach((x, i) => {
        if (i > 0 && x.g < gained[i - 1].g) rank = i;
        if (rank < 3) bonus[x.id] = steps[rank];
      });
      const dice = {};
      const answers = {};
      // wie een beurt moet overslaan, gooit niet
      this.contestants().forEach((p) => { if (p.skip > 0) { dice[p.id] = 0; answers[p.id] = 'skip'; } });
      this.newStep('roll', { bonus, dice, round: r ? r.type : null }, TIME.roll);
      Object.assign(this.s.step.answers, answers);
      this.checkAllIn();
    }
    rollDice(p) {
      const st = this.s.step;
      if (st.kind !== 'roll' || st.answers[p.id] !== undefined) return;
      st.dice[p.id] = 1 + Math.floor(this.rand() * 6);
      st.answers[p.id] = true;
      this.changed();
      this.checkAllIn();
    }
    boardMove() {
      const st = this.s.step;
      const ps = this.contestants();
      ps.forEach((p) => { if (st.answers[p.id] === undefined) st.dice[p.id] = 1 + Math.floor(this.rand() * 6); });
      const moves = [];
      let winner = null;
      const bounce = (x) => (x > BOARD_END ? BOARD_END - (x - BOARD_END) : Math.max(0, x));
      ps.forEach((p) => {
        const from = p.pos || 0;
        const ev = [];
        if (p.skip > 0) {
          p.skip--;
          moves.push({ id: p.id, from, to: from, dice: 0, bonus: 0, events: ['⏸️ moet deze beurt overslaan'] });
          return;
        }
        const d = st.dice[p.id] || 0;
        const b = st.bonus[p.id] || 0;
        const steps = d + b;
        let pos = bounce(from + steps);
        if (from + steps > BOARD_END) ev.push('↩️ te ver, terug gekaatst');
        for (let guard = 0; guard < 6; guard++) {
          const sq = BOARD[pos];
          if (!sq || pos === BOARD_END) break;
          if (sq === 'gans') { ev.push(`🪿 gans: nog ${steps} verder`); pos = bounce(pos + steps); continue; }
          if (sq === 'brug') { ev.push('🌉 brug: door naar 12'); pos = 12; continue; }
          if (sq === 'doolhof') { ev.push('🌀 doolhof: terug naar 18'); pos = 18; continue; }
          if (sq === 'dood') { ev.push('💀 dood: terug naar 10'); pos = 10; continue; }
          if (sq === 'herberg') { ev.push('🍺 herberg: volgende beurt overslaan'); p.skip = 1; break; }
          if (sq === 'put') { ev.push('🕳️ in de put: volgende beurt overslaan'); p.skip = 1; break; }
          if (sq === 'gevangenis') { ev.push('🔒 gevangenis: volgende beurt overslaan'); p.skip = 1; break; }
          if (sq === 'ster') {
            if (p.powerups.length < 3) { const t = this.pick(PU_KEYS); p.powerups.push(t); ev.push(`⭐ power-up: ${POWERUPS[t].emoji} ${POWERUPS[t].name}`); }
            else ev.push('⭐ ster, maar je zakken zitten al vol');
            break;
          }
          if (sq === 'kans') {
            const k = this.pick(['vooruit', 'achteruit', 'punten', 'ruil']);
            if (k === 'vooruit') { ev.push('❓ kans: 3 vooruit'); pos = bounce(pos + 3); continue; }
            if (k === 'achteruit') { ev.push('❓ kans: 3 achteruit'); pos = Math.max(0, pos - 3); continue; }
            if (k === 'punten') { p.score += 100; ev.push('❓ kans: 100 bonuspunten'); break; }
            const others = ps.filter((x) => x.id !== p.id);
            if (others.length) {
              const o = this.pick(others);
              const op = o.pos || 0;
              o.pos = pos;
              ev.push(`❓ kans: ruilt van plek met ${o.name}!`);
              pos = op;
            }
            break;
          }
          break;
        }
        p.pos = pos;
        if (pos === BOARD_END && !winner) winner = p.id;
        moves.push({ id: p.id, from, to: pos, dice: d, bonus: b, events: ev });
      });
      // posities na ruilen kloppen al in p.pos; 'to' bijwerken voor wie geruild werd
      moves.forEach((m) => (m.to = this.s.players[m.id] ? this.s.players[m.id].pos : m.to));
      const positions = {};
      ps.forEach((p) => (positions[p.id] = p.pos || 0));
      // na alle ruilacties: wie staat er echt op de finish?
      if (winner && positions[winner] !== BOARD_END) winner = null;
      if (!winner) { const w = ps.find((p) => p.pos === BOARD_END); winner = w ? w.id : null; }
      this.newStep('board', { moves, positions, winner, last: this.s.roundIdx >= this.s.plan.length - 1 }, 12);
    }
    afterBoard() {
      const st = this.s.step;
      if (st.winner || st.last) return this.endGame();
      this.nextRound();
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
      const answering = ['catpick', 'mc', 'tf', 'num', 'bet', 'bluffWrite', 'bluffVote', 'order', 'ken', 'wie', 'poll', 'wzWrite', 'wzGuess', 'hl', 'lingo', 'puzzel', 'tkDraw', 'tkFake', 'tkVote', 'lgWrite', 'lgGuess', 'top5', 'roll', 'ivWrite', 'ivVote', 'ktWrite', 'ktVote', 'wager', 'final'];
      if (!answering.includes(st.kind)) return;
      this.players.filter((p) => p.isBot && p.playing).forEach((b) => {
        if (st.kind === 'catpick' && st.picker !== b.id) return;
        if (st.kind === 'wzGuess' && st.author === b.id) return;
        if ((st.kind === 'tkFake' || st.kind === 'tkVote') && st.artist === b.id) return;
        if (st.kind === 'lgGuess' && st.author === b.id) return;
        if (st.kind === 'roll' && st.answers[b.id] !== undefined) return;
        if (st.kind === 'ktWrite' && st.assign[b.id] === undefined) return;
        if (st.kind === 'ivWrite' && !st.assign[b.id]) return;
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
        case 'mc': case 'final': case 'tf': return this.action(id, { a: 'answer', v: R() < 0.55 ? st.correct : Math.floor(R() * st.options.length) });
        case 'wzWrite': {
          const pool = (st.q.bot || BOT_LINES).filter((t) => !Object.values(st.answers).includes(t));
          return this.action(id, { a: 'answer', v: this.pick(pool.length ? pool : BOT_LINES) });
        }
        case 'wzGuess': {
          const others = this.contestants().filter((p) => p.id !== id);
          return this.action(id, { a: 'answer', v: this.pick(others).id });
        }
        case 'hl': return this.action(id, { a: 'answer', v: R() < 0.6 ? st.correct : 1 - st.correct });
        case 'lingo': {
          // bot doet een paar willekeurige pogingen en raadt het soms
          const tries = 1 + Math.floor(R() * 5);
          const same = (GN.LINGO || []).filter((w) => w[0] === st.first && w !== st.word);
          for (let i = 0; i < tries - 1 && st.answers[id] === undefined; i++) this.lingoGuess(this.s.players[id], same.length ? this.pick(same) : st.first + 'aaaa');
          if (st.answers[id] === undefined) this.lingoGuess(this.s.players[id], R() < 0.6 ? st.word : (same.length ? this.pick(same) : st.first + 'eeee'));
          if (st.answers[id] === undefined) { st.answers[id] = true; this.changed(); this.checkAllIn(); }
          return;
        }
        case 'puzzel': {
          const n = Math.floor(R() * 4);
          for (let g = 0; g < n; g++) this.puzzelGroup(this.s.players[id], st.words.map((w, i) => (w.g === g ? i : -1)).filter((i) => i >= 0));
          if (st.answers[id] === undefined) { st.answers[id] = true; this.changed(); this.checkAllIn(); }
          return;
        }
        case 'tkDraw': return this.action(id, { a: 'draw', v: this.botScribble() });
        case 'lgWrite': {
          const set = this.pick(BOT_LIES);
          return this.action(id, { a: 'answer', v: { s: set.s.slice(), lie: set.lie } });
        }
        case 'lgGuess': return this.action(id, { a: 'answer', v: Math.floor(R() * 3) });
        case 'top5': return this.action(id, { a: 'answer', v: this.shuffle([0, 1, 2, 3, 4]) });
        case 'roll': return this.action(id, { a: 'roll' });
        case 'ivWrite': return this.action(id, { a: 'answer', v: st.assign[id].map((bi) => this.invulExample(st.blanks[bi].type)) });
        case 'ktWrite': return this.action(id, { a: 'answer', v: this.pick(GN.KETTING_FILL || ['En toen was het stil.']) });
        case 'ivVote': { const c = st.fills.map((f, i) => i).filter((i) => st.fills[i].author !== id); return c.length ? this.action(id, { a: 'answer', v: this.pick(c) }) : null; }
        case 'ktVote': { const c = st.lines.map((f, i) => i).filter((i) => st.lines[i].author !== id); return c.length ? this.action(id, { a: 'answer', v: this.pick(c) }) : null; }
        case 'tkFake': {
          const pool = (GN.TEKEN || []).map((t) => t.q).filter((q) => norm(q) !== norm(st.prompt));
          return this.action(id, { a: 'answer', v: pool.length ? this.pick(pool) : 'Een kat op een fiets' });
        }
        case 'tkVote': {
          const choices = st.options.map((o, i) => i).filter((i) => !st.options[i].authors.includes(id));
          return this.action(id, { a: 'answer', v: R() < 0.4 ? st.truth : this.pick(choices) });
        }
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
      if (act.a === 'team' && st.kind === 'lobby' && this.teamCount() && p.playing) {
        const t = Number(act.team);
        if (t >= 0 && t < this.teamCount()) { p.team = t; this.changed(); }
        return;
      }
      if (s.paused || !p.playing) return;
      if (act.a === 'pickcat') {
        if (st.kind === 'catpick' && st.picker === id) this.resolveCatPick(act.cat);
        return;
      }
      if (act.a === 'skip') {
        if (['mc', 'tf', 'num', 'bluffWrite', 'order', 'ken', 'wie', 'poll', 'wzWrite', 'hl', 'lingo', 'puzzel', 'top5'].includes(st.kind) && this.skippable()) this.skipQuestion(true);
        return;
      }
      if (act.a === 'powerup') return this.usePowerup(p, act);
      if (act.a === 'guess' && st.kind === 'lingo') return this.lingoGuess(p, act.v);
      if (act.a === 'roll') return this.rollDice(p);
      if (act.a === 'group' && st.kind === 'puzzel') return this.puzzelGroup(p, act.v);
      if (act.a === 'draw' && st.kind === 'tkDraw') {
        if (st.answers[id] !== undefined) return;
        const d = this.cleanDrawing(act.v);
        if (!d) return;
        st.drawings[id] = d;
        st.answers[id] = true;
        this.changed();
        return this.checkAllIn();
      }
      if (act.a !== 'answer') return;
      if (st.answers[id] !== undefined && st.kind !== 'bluffWrite') return;
      const v = act.v;
      switch (st.kind) {
        case 'mc': case 'final': case 'ken': case 'tf':
          if (!Number.isInteger(v) || v < 0 || v >= st.options.length) return;
          break;
        case 'wzWrite': {
          const txt = String(v || '').trim().slice(0, 80);
          if (!txt) return;
          st.answers[id] = txt;
          this.changed();
          return this.checkAllIn();
        }
        case 'wzGuess':
          if (id === st.author || !s.players[v] || v === id) return;
          break;
        case 'hl':
          if (v !== 0 && v !== 1) return;
          break;
        case 'lgWrite': {
          if (!v || !Array.isArray(v.s) || v.s.length !== 3 || ![0, 1, 2].includes(v.lie)) return;
          const ss = v.s.map((x) => String(x || '').trim().slice(0, 90));
          if (ss.some((x) => !x)) return;
          st.answers[id] = { s: ss, lie: v.lie };
          this.changed();
          return this.checkAllIn();
        }
        case 'lgGuess':
          if (id === st.author || ![0, 1, 2].includes(v)) return;
          break;
        case 'ivWrite': {
          const mine = st.assign[id];
          if (!mine || !Array.isArray(v) || v.length !== mine.length) return;
          const w = v.map((x) => String(x || '').trim().slice(0, 40));
          if (w.some((x) => !x)) return;
          st.answers[id] = w;
          this.changed();
          return this.checkAllIn();
        }
        case 'ktWrite': {
          if (st.assign[id] === undefined) return;
          const txt = String(v || '').trim().slice(0, 140);
          if (!txt) return;
          st.answers[id] = txt;
          this.changed();
          return this.checkAllIn();
        }
        case 'ivVote':
          if (!Number.isInteger(v) || !st.fills[v] || st.fills[v].author === id) return;
          break;
        case 'ktVote':
          if (!Number.isInteger(v) || !st.lines[v] || st.lines[v].author === id) return;
          break;
        case 'top5':
          if (!Array.isArray(v) || v.length !== 5 || new Set(v).size !== 5 || v.some((x) => !(x >= 0 && x < 5))) return;
          break;
        case 'tkFake': {
          if (id === st.artist) return;
          const txt = String(v || '').trim().slice(0, 60);
          if (!txt) return;
          if (norm(txt) === norm(st.prompt)) {
            st.rejected[id] = true;
            return this.changed();
          }
          delete st.rejected[id];
          st.answers[id] = txt;
          this.changed();
          return this.checkAllIn();
        }
        case 'tkVote':
          if (id === st.artist || !Number.isInteger(v) || v < 0 || v >= st.options.length || st.options[v].authors.includes(id)) return;
          break;
        case 'num':
          if (typeof v !== 'number' || !isFinite(v)) return;
          break;
        case 'bet':
          if (!Number.isInteger(v) || v < 0 || v >= st.guesses.length) return;
          break;
        case 'bluffWrite': {
          const txt = String(v || '').trim().slice(0, st.story ? 120 : 60);
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
      if (['hl', 'lingo', 'puzzel'].includes(st.kind)) return false;
      if (st.kind === 'top5') return (st.q.spice || 1) >= 3;
      if (['ken', 'wie', 'poll', 'wzWrite'].includes(st.kind)) return (st.q.spice || 1) >= 3;
      return GN.qSpice(st.q) >= 3;
    }
    skipQuestion(anonymous) {
      const st = this.s.step;
      const note = anonymous ? 'Iemand sloeg de vorige vraag over 🙈' : 'De spelleider sloeg de vorige vraag over ⏭️';
      // power-ups teruggeven die al gebruikt waren
      Object.entries(st.powerups || {}).forEach(([pid, pu]) => { const p = this.s.players[pid]; if (p) p.powerups.push(pu.type); });
      if (this.s.round.type === 'persoonlijk') return this.askPersonal();
      if (this.s.round.type === 'wiezei') return this.askWz();
      if (this.s.round.type === 'lingo') return this.askLingo();
      if (this.s.round.type === 'top5') return this.askTop5();
      if (this.s.round.type === 'echt') return this.askEcht(note);
      if (this.s.round.type === 'puzzel') return this.askPuzzel();
      if (this.s.round.type === 'hl') { this.s.round.hl = null; this.s.round.done = 0; return this.askHL(); }
      this.ask(note);
    }
    usePowerup(p, act) {
      const st = this.s.step;
      const type = act.type;
      if (!['mc', 'tf', 'num', 'order'].includes(st.kind)) return;
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
          const n = act.settings || {};
          ['music', 'sfx', 'voice', 'bigText'].forEach((k) => { if (typeof n[k] === 'boolean') s.settings[k] = n[k]; });
          if (st.kind !== 'lobby' && st.kind !== 'end') return this.changed();
          if ([1, 2, 3].includes(n.spice)) s.settings.spice = n.spice;
          if (SLOTS[n.length]) s.settings.length = n.length;
          if (typeof n.voice === 'boolean') s.settings.voice = n.voice;
          if ([0, 2, 3].includes(n.teams)) { s.settings.teams = n.teams; this.balanceTeams(false); }
          if (n.theme === '' || THEMES[n.theme]) s.settings.theme = n.theme;
          if (n.mode === 'quiz' || n.mode === 'bord') s.settings.mode = n.mode;
          if (n.rounds && typeof n.rounds === 'object') {
            ROUND_KEYS.forEach((k) => { if (typeof n.rounds[k] === 'boolean') s.settings.rounds[k] = n.rounds[k]; });
          }
          if (typeof n.gmPlays === 'boolean') {
            s.settings.gmPlays = n.gmPlays;
            const gm = s.players[s.gm];
            if (gm) gm.playing = n.gmPlays;
          }
          return this.changed();
        }
        case 'gm:addbot': if (st.kind === 'lobby') this.addBot(); return;
        case 'gm:shuffle': if (st.kind === 'lobby' && this.teamCount()) { this.balanceTeams(true); this.changed(); } return;
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
          if (['mc', 'tf', 'num', 'bluffWrite', 'order', 'ken', 'wie', 'poll', 'wzWrite', 'hl', 'lingo', 'puzzel', 'top5'].includes(st.kind)) this.skipQuestion(false);
          return;
        case 'gm:next':
          if (!s.paused && st.kind !== 'lobby' && st.kind !== 'end') this.timeout();
          return;
        case 'gm:addtime':
          if (st.deadline && this.canAddTime()) { st.deadline += 15000; st.duration = (st.duration || 0) + 15; this.changed(); }
          return;
        case 'gm:skipround':
          if (this.canSkipRound()) {
            this.botQueue = [];
            s.round.done = s.round.count;
            this.roundScores();
          }
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

    canAddTime() {
      const k = this.s.step.kind;
      return !!this.s.step.deadline && !['intro', 'reveal', 'scores', 'board', 'highlights', 'lobby', 'end'].includes(k);
    }
    canSkipRound() {
      const k = this.s.step.kind;
      return !!this.s.round && !['lobby', 'end', 'scores', 'highlights', 'roll', 'board', 'final', 'wager'].includes(k) && this.s.round.type !== 'final';
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
        case 'mc': case 'tf': case 'num': case 'bet': case 'bluffWrite': case 'bluffVote': case 'order': case 'ken': case 'wie': case 'poll': case 'wzWrite': case 'wager': case 'final':
          return this.active();
        case 'wzGuess':
          return this.active().filter((p) => p.id !== st.author);
        case 'hl': case 'lingo': case 'puzzel': case 'tkDraw':
          return this.active();
        case 'tkFake': case 'tkVote':
          return this.active().filter((p) => p.id !== st.artist);
        case 'lgWrite': case 'top5': case 'roll':
          return this.active();
        case 'lgGuess':
          return this.active().filter((p) => p.id !== st.author);
        case 'ivWrite':
          return this.active().filter((p) => st.assign[p.id]);
        case 'ktWrite':
          return this.active().filter((p) => st.assign[p.id] !== undefined);
        case 'ivVote':
          return this.active().filter((p) => this.canVoteOn(st.fills, p.id));
        case 'ktVote':
          return this.active().filter((p) => this.canVoteOn(st.lines, p.id));
        case '__never':
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
        case 'highlights': return this.newStep('end', st.endData, 0);
        case 'catpick': return this.resolveCatPick(null);
        case 'mc': return this.revealMc('mc');
        case 'tf': return this.revealMc('tf');
        case 'wzWrite': return this.wzStart();
        case 'wzGuess': return this.revealWz();
        case 'hl': return this.revealHL();
        case 'lingo': return this.revealLingo();
        case 'puzzel': return this.revealPuzzel();
        case 'tkDraw': return this.tkStart();
        case 'tkFake': return this.tkToVote();
        case 'tkVote': return this.revealTk();
        case 'lgWrite': return this.lgStart();
        case 'lgGuess': return this.revealLg();
        case 'top5': return this.revealTop5();
        case 'ivWrite': return this.ivToVote();
        case 'ivVote': return this.revealIv();
        case 'ktWrite': return this.ktNext();
        case 'ktVote': return this.revealKt();
        case 'roll': return this.boardMove();
        case 'board': return this.afterBoard();
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
        case 'reveal': {
          const r = this.s.round;
          if (st.of === 'wz' && r.wz && r.wz.idx < r.wz.entries.length - 1) { r.wz.idx++; return this.wzGuess(); }
          if (st.of === 'tk' && r.tk && r.tk.idx < r.tk.entries.length - 1) { r.tk.idx++; return this.tkFake(); }
          if (st.of === 'lg' && r.lg && r.lg.idx < r.lg.entries.length - 1) { r.lg.idx++; return this.lgGuess(); }
          if (st.of === 'kt' && r.kt && r.kt.idx < r.kt.stories.length - 1) { r.kt.idx++; return this.ktVote(); }
          r.done++;
          return this.nextQuestion();
        }
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
      Object.entries(data.gains || {}).forEach(([pid, g]) => {
        const p = this.s.players[pid];
        if (!p || !p.stats || !(g > 0)) return;
        p.stats.scored = (p.stats.scored || 0) + 1;
        p.stats.best = Math.max(p.stats.best || 0, g);
      });
      try { this.noteHighlight(data); } catch (e) {}
      this.newStep('reveal', data, secs || SHOW.reveal);
    }
    noteHighlight(r) {
      const H = (this.s.highlights = this.s.highlights || []);
      const add = (h) => { if (h.n > 0 && H.length < 200) H.push(h); };
      const count = (votes) => { const n = {}; Object.values(votes || {}).forEach((i) => (n[i] = (n[i] || 0) + 1)); return n; };
      if (r.of === 'bluff' || r.of === 'tk') {
        const n = count(r.votes);
        r.options.forEach((o, i) => { if (i !== r.truth && o.authors && o.authors.length) add({ k: r.of === 'tk' ? 'tkfake' : r.story ? 'echt' : 'bluff', text: o.text, q: r.of === 'tk' ? r.prompt : r.q.q, by: o.authors, n: n[i] || 0 }); });
        if (r.of === 'tk' && r.drawing) add({ k: 'tk', drawing: r.drawing, text: r.prompt, by: [r.artist], n: (n[r.truth] || 0) + 1 });
      } else if (r.of === 'lg') {
        const fooled = Object.values(r.votes || {}).filter((i) => i !== r.lie).length;
        add({ k: 'lg', text: r.statements[r.lie], by: [r.author], n: fooled });
      } else if (r.of === 'kt' || r.of === 'iv') {
        const list = r.of === 'kt' ? r.lines : r.fills;
        (r.top || []).forEach((i) => { const x = list[i]; if (x && x.author) add({ k: r.of, text: x.text, q: r.of === 'iv' ? r.title : r.opener, by: [x.author], n: (r.counts || {})[i] || 0 }); });
      } else if (r.of === 'wz') {
        const wrong = Object.values(r.votes || {}).filter((x) => x !== r.author).length;
        add({ k: 'wz', text: r.entry, q: r.text, by: [r.author], n: wrong + 1 });
      } else if (r.of === 'wie') {
        (r.top || []).forEach((id) => add({ k: 'wie', text: r.text, by: [id], n: (r.count || {})[id] || 0 }));
      } else if ((r.of === 'mc' || r.of === 'tf') && r.right && r.right.length === 0 && this.contestants().length > 1) {
        add({ k: 'hard', text: r.q.q, answer: r.options[r.correct], by: [], n: 1 });
      }
    }
    buildHighlights() {
      const H = this.s.highlights || [];
      const best = (k) => H.filter((h) => h.k === k && (!h.by.length || h.by.some((id) => this.s.players[id]))).sort((a, b) => b.n - a.n)[0];
      const order = ['bluff', 'tk', 'kt', 'iv', 'lg', 'echt', 'tkfake', 'wz', 'wie', 'hard'];
      return order.map(best).filter(Boolean).slice(0, 6);
    }

    revealMc(of = 'mc') {
      const st = this.s.step;
      const gains = {};
      const right = [];
      this.contestants().forEach((p) => {
        if (st.answers[p.id] === st.correct) { gains[p.id] = 100; right.push(p.id); p.stats.correct++; }
      });
      const events = this.applyGains(gains, st);
      this.reveal({ of, q: st.q, cat: st.cat, options: st.options, correct: st.correct, picks: st.answers, gains, events, right, qno: st.qno, qcount: st.qcount }, of === 'tf' ? SHOW.revealShort + (st.q.fact ? 2 : 0) : SHOW.reveal);
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
      this.newStep('bluffVote', { q: st.q, cat: st.cat, story: !!st.story, options: all, truth, qno: st.qno, qcount: st.qcount }, st.story ? TIME.bluffVote + 15 : TIME.bluffVote);
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
      this.reveal({ of: 'bluff', story: !!st.story, q: st.q, cat: st.cat, options: st.options, truth: st.truth, votes: st.answers, gains, fooledBy, events: [], qno: st.qno, qcount: st.qcount }, SHOW.revealLong);
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
      if (s.settings.mode === 'bord') return this.boardTurn();
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
      const board = this.s.settings.mode === 'bord';
      const ps = this.contestants().slice().sort((a, b) => (board ? (b.pos || 0) - (a.pos || 0) : 0) || b.score - a.score);
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
      best('wzRight', 'Detective', '🔎', (n) => `${n}× geraden wie wat zei`);
      best('scored', 'Puntenmachine', '🎯', (n) => `${n}× gescoord`);
      const teams = this.teamScores();
      const endData = { ranking: ps.map((p) => p.id), awards, teamRanking: teams ? teams.slice().sort((a, b) => b.score - a.score).map((t) => t.id) : null };
      const slides = this.buildHighlights();
      if (slides.length) return this.newStep('highlights', { slides, endData }, slides.length * 7 + 2);
      this.newStep('end', endData, 0);
    }

    // ---------- views ----------
    pub(p) {
      return { id: p.id, name: p.name, avatar: p.avatar, color: p.color, score: p.score, connected: p.connected, isBot: p.isBot, playing: p.playing, gm: this.s.gm === p.id, powerups: p.powerups.length, team: p.team == null ? null : p.team, pos: p.pos || 0, skip: p.skip || 0 };
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
        teams: this.teamScores(),
        theme: THEMES[s.settings.theme] ? Object.assign({ id: s.settings.theme }, THEMES[s.settings.theme]) : null,
        board: s.settings.mode === 'bord' ? { squares: BOARD, end: BOARD_END } : null,
      };
      const copy = (keys) => keys.forEach((k) => { if (st[k] !== undefined) v[k] = st[k]; });
      copy(['title', 'emoji', 'desc', 'roundNo', 'rounds', 'count', 'qno', 'qcount', 'skippedNote', 'story']);
      if (st.kind === 'intro') { v.howto = !!st.howto; v.roundType = st.round; }
      if (st.kind === 'intro') v.introRound = st.round;
      if (st.cat) v.cat = this.catInfo(st.cat);
      if (st.q) v.q = { q: st.q.q, unit: st.q.unit, fact: st.q.fact, lo: st.q.lo, hi: st.q.hi, fmt: st.q.fmt, img: st.q.img, emoji: st.q.emoji, answer: undefined };
      switch (st.kind) {
        case 'catpick': v.picker = st.picker; v.options = st.options.map((c) => this.catInfo(c)); v.chosen = st.chosen; break;
        case 'mc': case 'final': case 'tf': v.options = st.options; if (st.kind === 'final') v.wagers = st.wagers; break;
        case 'wzWrite': v.text = st.text; break;
        case 'wzGuess': v.text = st.text; v.entry = st.entry; v.eno = st.eno; v.etotal = st.etotal; v.author = st.author; break;
        case 'hl': v.set = st.set; v.a = st.a; v.b = st.b; break;
        case 'lingo': {
          v.first = st.first;
          v.grids = {};
          Object.entries(st.prog).forEach(([pid, pr]) => (v.grids[pid] = pr.g.map((x) => x.m)));
          break;
        }
        case 'puzzel': {
          v.words = st.words.map((w) => w.w);
          v.found = {};
          Object.entries(st.prog).forEach(([pid, pr]) => (v.found[pid] = pr.found.length));
          break;
        }
        case 'tkDraw': break;
        case 'lgWrite': break;
        case 'lgGuess': v.statements = st.statements; v.eno = st.eno; v.etotal = st.etotal; v.author = st.author; break;
        case 'top5': v.hot = st.hot; v.text = st.text; v.items = st.items; v.lo = st.lo; v.hi = st.hi; break;
        case 'roll': v.bonus = st.bonus; v.dice = st.dice; break;
        case 'ivWrite': v.title = st.title; v.nblanks = st.blanks.length; break;
        case 'ivVote': v.title = st.title; v.parts = st.parts; v.fills = st.fills.map((f) => ({ text: f.text })); break;
        case 'ktWrite': v.turn = st.turn; v.T = st.T; v.stotal = st.stotal; v.last = st.last; break;
        case 'ktVote': v.sno = st.sno; v.stotal = st.stotal; v.opener = st.opener; v.lines = st.lines.map((l) => ({ text: l.text })); break;
        case 'board': v.moves = st.moves; v.positions = st.positions; v.winner = st.winner; break;
        case 'tkFake': v.drawing = st.drawing; v.eno = st.eno; v.etotal = st.etotal; v.artist = st.artist; break;
        case 'tkVote': v.drawing = st.drawing; v.eno = st.eno; v.etotal = st.etotal; v.artist = st.artist; v.options = st.options.map((o) => o.text); break;
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
        case 'end': v.ranking = st.ranking; v.awards = st.awards; v.teamRanking = st.teamRanking; break;
        case 'highlights': v.slides = st.slides; break;
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
      const me = { id: p.id, name: p.name, avatar: p.avatar, color: p.color, score: p.score, powerups: p.powerups, isGm, playing: p.playing, team: p.team == null ? null : p.team };
      const bord = s.settings.mode === 'bord';
      const sorted = this.contestants().slice().sort((a, b) => (bord ? (b.pos || 0) - (a.pos || 0) : 0) || b.score - a.score);
      me.rank = sorted.findIndex((x) => x.id === id) + 1;
      if (p.stats) me.stats = { scored: p.stats.scored || 0, best: p.stats.best || 0, correct: p.stats.correct || 0, fooled: p.stats.fooled || 0, powerups: p.stats.powerups || 0 };
      me.of = sorted.length;
      const v = { theme: s.settings.theme, me, kind: st.kind, stepId: st.id, paused: !!s.paused, deadline: st.deadline, duration: st.duration, remaining: this.remaining(), answered, settings: s.settings };
      const teams = this.teamScores();
      if (teams) { v.teams = teams.map((t) => ({ id: t.id, name: t.name, emoji: t.emoji, color: t.color, score: t.score, size: t.size })); }
      v.gm = isGm ? { canTime: this.canAddTime(), canSkipRound: this.canSkipRound(), canSkip: ['mc', 'tf', 'num', 'bluffWrite', 'order', 'ken', 'wie', 'poll', 'wzWrite', 'hl', 'lingo', 'puzzel', 'top5'].includes(st.kind), canNext: !['lobby', 'end'].includes(st.kind), players: this.players.map((x) => this.pub(x)) } : null;
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
          v.roundList = ROUND_KEYS.map((k) => ({ id: k, title: ROUNDS[k].title, emoji: ROUNDS[k].emoji }));
          v.teamList = TEAMS;
          v.themeList = Object.entries(THEMES).map(([k, t]) => ({ id: k, name: t.name, emoji: t.emoji }));
          break;
        case 'intro':
          v.screen = 'wait';
          v.big = st.emoji; v.title = st.title; v.sub = st.desc;
          if (st.howto) v.howto = st.round;
          break;
        case 'highlights':
          v.screen = 'wait';
          v.big = '🎬'; v.title = 'Terugblik!'; v.sub = 'Kijk naar de TV: de hoogtepunten van de avond.';
          break;
        case 'catpick':
          v.screen = st.picker === id ? 'catpick' : 'wait';
          v.options = st.options.map((c) => this.catInfo(c));
          v.title = st.picker === id ? 'Jij staat laatst, jij kiest!' : `${this.name(st.picker)} kiest een categorie…`;
          v.big = '🎡';
          break;
        case 'hl':
          v.screen = 'hl';
          v.set = st.set; v.a = st.a; v.b = st.b;
          v.myAnswer = st.answers[id];
          v.streak = s.round && s.round.hl ? s.round.hl.streak[id] || 0 : 0;
          break;
        case 'lingo': {
          v.screen = 'lingo';
          const pr = st.prog[id] || { g: [], solved: false };
          v.first = st.first;
          v.rows = pr.g;
          v.solved = pr.solved;
          v.key += ':' + pr.g.length;
          break;
        }
        case 'puzzel': {
          v.screen = 'puzzel';
          const pr = st.prog[id] || { found: [], mistakes: 0, last: null };
          v.words = st.words.map((w) => w.w);
          v.foundIdx = pr.found.map((g) => ({ g, idx: st.words.map((w, i) => (w.g === g ? i : -1)).filter((i) => i >= 0) }));
          v.mistakes = pr.mistakes;
          v.last = pr.last;
          v.groups = st.puzzle.groups.length;
          v.key += ':' + pr.found.length + ':' + pr.mistakes;
          break;
        }
        case 'lgWrite':
          v.screen = 'lgwrite';
          v.myAnswer = st.answers[id];
          break;
        case 'lgGuess':
          if (st.author === id) { v.screen = 'wait'; v.big = '😇'; v.title = 'Jouw uitspraken!'; v.sub = 'Hou je gezicht in de plooi. De rest zoekt je leugen.'; v.key += ':author'; break; }
          v.screen = 'lgguess';
          v.statements = st.statements;
          v.authorName = this.name(st.author);
          v.myAnswer = st.answers[id];
          break;
        case 'top5':
          v.screen = 'top5';
          v.isHot = st.hot === id;
          v.q = st.hot === id ? st.self : st.text;
          v.sub = st.hot === id ? 'Zet ze eerlijk op volgorde. De rest raadt jouw lijstje.' : `Hoe zet ${this.name(st.hot)} dit op volgorde?`;
          v.items = st.items; v.lo = st.lo; v.hi = st.hi;
          v.myAnswer = st.answers[id];
          break;
        case 'ivWrite': {
          const mine = st.assign[id];
          if (!mine) { v.screen = 'wait'; v.big = '📝'; v.title = 'De anderen vullen in'; v.sub = 'Er zijn niet genoeg gaten voor iedereen. Straks mag je stemmen!'; break; }
          v.screen = 'ivwrite';
          v.labels = mine.map((bi) => st.blanks[bi].label);
          v.myAnswer = st.answers[id];
          break;
        }
        case 'ivVote':
          v.screen = 'bluffvote';
          v.q = st.title;
          v.voteSub = 'Kijk naar de TV. Welk ingevuld woord is het grappigst?';
          v.mineLabel = 'van jou';
          v.options = st.fills.map((f) => ({ text: f.text, mine: f.author === id }));
          v.myAnswer = st.answers[id];
          if (!this.canVoteOn(st.fills, id)) { v.screen = 'wait'; v.big = '📺'; v.title = 'Kijk naar de TV!'; v.sub = ''; }
          break;
        case 'ktWrite': {
          const si = st.assign[id];
          if (si === undefined) { v.screen = 'wait'; v.big = '📜'; v.title = 'Even pauze'; v.sub = 'Deze beurt schrijven de anderen. Volgende zin ben jij misschien.'; break; }
          v.screen = 'ktwrite';
          v.prev = st.prev[id];
          v.first = st.first; v.last = st.last; v.turn = st.turn; v.T = st.T;
          v.myAnswer = st.answers[id];
          break;
        }
        case 'ktVote':
          v.screen = 'bluffvote';
          v.q = `Verhaal ${st.sno} van ${st.stotal}`;
          v.voteSub = 'Kijk naar de TV. Wat is de beste zin?';
          v.mineLabel = 'jouw zin';
          v.options = st.lines.map((l) => ({ text: l.text, mine: l.author === id }));
          v.myAnswer = st.answers[id];
          if (!this.canVoteOn(st.lines, id)) { v.screen = 'wait'; v.big = '📺'; v.title = 'Kijk naar de TV!'; v.sub = ''; }
          break;
        case 'roll':
          v.screen = 'roll';
          v.bonus = st.bonus[id] || 0;
          v.dice = st.dice[id];
          v.skipped = st.answers[id] === 'skip';
          v.pos = p.pos || 0;
          break;
        case 'board': {
          v.screen = 'wait';
          const m = (st.moves || []).find((x) => x.id === id);
          v.big = st.winner === id ? '🏆' : '🎲';
          v.title = `Je staat op vakje ${p.pos || 0}`;
          v.sub = m && m.events.length ? m.events.join(' · ') : m ? `${m.dice} gegooid${m.bonus ? ' + ' + m.bonus + ' bonus' : ''}` : '';
          break;
        }
        case 'tkDraw':
          v.screen = 'draw';
          v.prompt = st.prompts[id] || '';
          break;
        case 'tkFake':
          if (st.artist === id) { v.screen = 'wait'; v.big = '🎨'; v.title = 'Jouw tekening!'; v.sub = 'De rest verzint nu een titel. Hou je pokerface.'; v.key += ':artist'; break; }
          v.screen = 'write';
          v.tk = true;
          v.q = 'Bedenk een titel voor de tekening op de TV';
          v.myAnswer = st.answers[id];
          v.rejected = !!st.rejected[id];
          v.key += st.rejected[id] ? ':r' : '';
          break;
        case 'tkVote':
          if (st.artist === id) { v.screen = 'wait'; v.big = '🤞'; v.title = 'Ze stemmen op jouw tekening'; v.sub = 'Hopelijk raden ze de echte titel.'; v.key += ':artist'; break; }
          v.screen = 'bluffvote';
          v.q = 'Wat is de echte titel?';
          v.options = st.options.map((o) => ({ text: o.text, mine: o.authors.includes(id) }));
          v.myAnswer = st.answers[id];
          break;
        case 'tf':
          v.screen = 'choice';
          v.tf = true;
          v.q = qtext;
          v.options = st.options;
          v.myAnswer = st.answers[id];
          v.hidden = [];
          break;
        case 'wzWrite':
          v.screen = 'write';
          v.wz = true;
          v.q = st.text;
          v.myAnswer = st.answers[id];
          break;
        case 'wzGuess':
          if (st.author === id) {
            v.screen = 'wait'; v.big = '🤫'; v.title = 'Dit is jouw antwoord!'; v.sub = 'Pokerface. De rest raadt van wie het is.';
            v.key += ':author';
            break;
          }
          v.screen = 'vote';
          v.wzq = st.text;
          v.q = '"' + st.entry + '"';
          v.sub = 'Wie zei dit?';
          v.players = this.contestants().filter((x) => x.id !== id).map((x) => this.pub(x));
          v.myAnswer = st.answers[id];
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
          v.story = !!st.story;
          v.rejected = !!st.rejected[id];
          v.key += st.rejected[id] ? ':r' : '';
          break;
        case 'bluffVote':
          v.screen = 'bluffvote';
          v.q = qtext;
          v.options = st.options.map((o) => ({ text: o.text, mine: o.authors.includes(id) }));
          v.myAnswer = st.answers[id];
          if (st.story) { v.voteSub = 'Hoe liep het echt af?'; v.mineLabel = 'jouw verzinsel'; }
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
          if (st.teamRanking && p.team != null) v.teamRank = st.teamRanking.indexOf(p.team) + 1;
          v.awards = st.awards.filter((a) => a.id === id);
          v.key = 'end:' + st.id;
          break;
      }
      // power-ups beschikbaar?
      if (['mc', 'tf', 'num', 'order'].includes(st.kind) && !st.powerups[id]) {
        v.canPowerup = p.powerups.some((x) => !POWERUPS[x].passive && (x !== 'vijftig' || st.kind === 'mc'));
        v.targets = this.contestants().filter((x) => x.id !== id).map((x) => ({ id: x.id, name: x.name, avatar: x.avatar }));
      }
      v.usedPowerup = st.powerups && st.powerups[id] ? st.powerups[id].type : null;
      v.skippable = ['mc', 'tf', 'num', 'bluffWrite', 'order', 'ken', 'wie', 'poll', 'wzWrite', 'hl', 'lingo', 'puzzel', 'top5'].includes(st.kind) && this.skippable();
      return v;
    }
    resultLine(id, st) {
      switch (st.of) {
        case 'mc': return st.right.includes(id) ? 'Goed!' : `Het was: ${st.options[st.correct]}`;
        case 'final': return st.right.includes(id) ? 'Goed! Inzet verdubbeld 💰' : `Fout… het was: ${st.options[st.correct]}`;
        case 'tf': return st.right.includes(id) ? 'Goed!' : `Fout, het was ${st.options[st.correct].toLowerCase()}`;
        case 'hl': return st.right.includes(id) ? (st.streak[id] > 1 ? `Goed! ${st.streak[id]} op rij 🔥` : 'Goed!') : `Fout: ${st.b.show}`;
        case 'lingo': return st.right.includes(id) ? `Geraden: ${st.word.toUpperCase()}` : `Het woord was ${st.word.toUpperCase()}`;
        case 'puzzel': return `${st.found[id] || 0} van de ${st.puzzle.groups.length} verbanden gevonden`;
        case 'lg': return st.author === id ? (st.gains[id] ? `Je hield er ${st.gains[id] / 50} voor de gek 😏` : 'Iedereen had je door 😅') : st.right.includes(id) ? 'Leugen gevonden!' : 'Erin getuind…';
        case 'iv': return st.fills.some((f, i) => f.author === id && st.top.includes(i)) ? 'Jouw woord was het grappigst! 🏆' : st.gains[id] ? 'Mensen vonden jouw woorden grappig' : 'Jouw woorden scoorden niet';
        case 'kt': return st.lines.some((l, i) => l.author === id && st.top.includes(i)) ? 'Jij schreef de beste zin! 🏆' : st.gains[id] ? 'Stemmen voor jouw zin' : st.lines.some((l) => l.author === id) ? 'Geen stemmen voor jouw zin' : 'Op naar het volgende verhaal';
        case 'top5': return st.hot === id ? 'Zo goed kennen ze je' : st.scoresBy[id] !== undefined ? `${st.scoresBy[id]} van de 5 op de goede plek` : 'Geen antwoord';
        case 'tk': return st.artist === id ? 'Zo deed jouw tekening het' : st.votes[id] === st.truth ? 'Je vond de echte titel!' : 'Mis!';
        case 'wz': return st.author === id ? (st.gains[id] ? `Je luisde er ${st.gains[id] / 50} in 😏` : 'Iedereen had je door 😅') : st.right.includes(id) ? 'Goed geraden!' : `Het was ${this.name(st.author)}`;
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
  GN.TEAMS = TEAMS;
  GN.THEMES = THEMES;
  GN.BOARD = BOARD;
  GN.BOARD_END = BOARD_END;
  GN.LENGTHS = LENGTHS;
  GN.fmtNum = fmtNum;
  GN.norm = norm;
  if (typeof module !== 'undefined') module.exports = GN;
})(typeof window !== 'undefined' ? window : globalThis);
