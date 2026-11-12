/* Game Night – telefoon-controller */
(function () {
  const GN = window.GN;
  const $ = (s, el = document) => el.querySelector(s);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const LETTERS = 'ABCDEFGH';
  const params = new URLSearchParams(location.search);
  const LOCAL = GN.Net.LOCAL;

  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
  };
  // in lokale testmodus heeft elk tabblad een eigen speler
  const tokKey = LOCAL ? 'gn.token.' + (sessionStorage.getItem('gn.tab') || (sessionStorage.setItem('gn.tab', Math.random().toString(36).slice(2)), sessionStorage.getItem('gn.tab'))) : 'gn.token';
  let token = store.get(tokKey, null);
  if (!token) { token = Math.random().toString(36).slice(2) + Date.now().toString(36); store.set(tokKey, token); }
  let profile = store.get(LOCAL ? tokKey + '.profile' : 'gn.profile', null);
  const saveProfile = () => store.set(LOCAL ? tokKey + '.profile' : 'gn.profile', profile);

  let code = (params.get('c') || '').toUpperCase().replace(/[^A-Z]/g, '').slice(0, 4);
  let client = null;
  let view = null;
  let viewAt = 0;
  let shownKey = null;
  let shownJson = null;
  let status = 'idle';
  let ui = {}; // tijdelijke invoer per scherm
  let sheet = null; // 'gm' | 'pu' | 'profile' | 'players'

  const screen = $('#screen');
  const bar = $('#bar');

  // ---------- verbinden ----------
  function connect() {
    if (client) client.destroy();
    view = null;
    shownKey = null;
    history.replaceState(null, '', location.pathname + '?c=' + code + (LOCAL ? '&local=1' : ''));
    client = GN.Net.createClient(code, {
      status(s) { status = s; renderBanner(); if (!view) render(); },
      open() { client.send({ t: 'join', token, name: profile.name, avatar: profile.avatar }); },
      data(m) {
        if (!m) return;
        if (m.t === 'rejoin') return client.send({ t: 'join', token, name: profile.name, avatar: profile.avatar });
        if (m.t === 'view') {
          const prevKind = view && view.kind;
          view = m.v;
          viewAt = Date.now();
          if (view.kind !== prevKind && ['mc', 'num', 'bluffWrite', 'order', 'ken', 'wie', 'catpick', 'final'].includes(view.kind)) buzz();
          render();
        }
      },
    });
    wake();
  }
  const act = (a, extra = {}) => {
    const ok = client && client.send(Object.assign({ t: 'act', a }, extra));
    if (!ok) { status = 'lost'; renderBanner(); }
    return ok;
  };
  function buzz() { try { navigator.vibrate && navigator.vibrate(60); } catch (e) {} }

  let lock = null;
  async function wake() {
    try { if (navigator.wakeLock && !lock) { lock = await navigator.wakeLock.request('screen'); lock.addEventListener('release', () => (lock = null)); } } catch (e) {}
  }
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') { wake(); if (client) client.kick(); }
  });

  function renderBanner() {
    const b = $('#banner');
    const map = { lost: 'Verbinding kwijt, opnieuw verbinden…', connecting: 'Verbinden met de TV…', nohost: 'TV niet gevonden. Klopt de code?', nolib: 'Geen internet?' };
    const txt = view || status === 'nohost' ? (status === 'open' ? '' : map[status] || '') : '';
    b.textContent = txt;
    b.classList.toggle('hidden', !txt);
  }

  // ---------- render ----------
  function render() {
    renderBanner();
    if (!profile || !code) { bar.innerHTML = ''; return renderSetup(); }
    if (!view) {
      bar.innerHTML = '';
      screen.innerHTML = `<div class="big">📡</div><div class="title">${status === 'nohost' ? 'TV niet gevonden' : 'Verbinden…'}</div>
        <p class="sub center">${status === 'nohost' ? `Staat de TV aan met code <b>${esc(code)}</b>?` : `Code <b>${esc(code)}</b>`}</p>
        <button class="cta ghost" id="chg">Andere code</button>`;
      $('#chg').onclick = () => { code = ''; if (client) client.destroy(); client = null; render(); };
      return;
    }
    renderBar();
    const v = view;
    const json = JSON.stringify(Object.assign({}, v, { remaining: 0, deadline: 0 }));
    const live = v.screen === 'lobby' || v.screen === 'host' || v.screen === 'end';
    if (v.key !== shownKey || (live && json !== shownJson)) {
      if (v.key !== shownKey) ui = {};
      shownKey = v.key;
      shownJson = json;
      const f = SCREENS[v.screen] || SCREENS.wait;
      const focusId = document.activeElement && document.activeElement.id;
      screen.innerHTML = (v.deadline && !['wait', 'result', 'lobby', 'end'].includes(v.screen) ? '<div class="tbar"><i id="tb"></i></div>' : '') + f(v);
      wire(v);
      if (focusId && $('#' + focusId)) $('#' + focusId).focus();
    }
    renderSheet();
  }

  function renderBar() {
    const me = view.me;
    bar.innerHTML = `<div class="me"><span class="av" style="--c:${me.color}">${me.avatar}</span>
      <div style="min-width:0"><div class="nm">${esc(me.name)}${me.isGm ? ' 👑' : ''}</div>
      <div>${teamBadge()}<span class="sc">${me.score}</span> <span class="rank">${me.playing && view.kind !== 'lobby' && me.rank ? `· ${me.rank}e plaats` : ''}${me.powerups && me.powerups.length ? ` · ${me.powerups.map((p) => GN.POWERUPS[p].emoji).join(' ')}` : ''}</span></div></div></div>
      ${me.isGm && view.kind !== 'lobby' ? '<button class="iconbtn" id="gmbtn" aria-label="Spelleider">👑</button>' : ''}`;
    const g = $('#gmbtn');
    if (g) g.onclick = () => { sheet = 'gm'; renderSheet(); };
  }

  function teamBadge() {
    if (!view.teams || view.me.team == null) return '';
    const t = view.teams.find((x) => x.id === view.me.team);
    return t ? `<span class="tbadge" style="--t:${t.color}">${t.emoji} ${t.score}</span> ` : '';
  }
  const teamPicker = (v) => (v.teams && v.me.playing ? `<div class="card"><div class="label">Jouw team</div><div class="seg" id="teampick">${v.teams.map((t) => `<button data-team="${t.id}" class="${v.me.team === t.id ? 'on' : ''}" style="--t:${t.color}"><b>${t.emoji}</b>${esc(t.name.replace('Team ', ''))}<br><small>${t.size} speler${t.size === 1 ? '' : 's'}</small></button>`).join('')}</div></div>` : '');

  // ---------- eerste keer: code, naam, avatar ----------
  function renderSetup() {
    if (!code) {
      screen.innerHTML = `<div class="landing">
        <h1 class="logo"><span class="g">Game</span> <span class="n">Night</span> 🌙</h1>
        <p class="sub center">Vul de code in die op de TV staat</p>
        <input class="field code" id="code" maxlength="4" autocomplete="off" autocapitalize="characters" placeholder="ABCD">
        <button class="cta" id="go" disabled>Verder</button></div>`;
      const inp = $('#code');
      inp.oninput = () => { inp.value = inp.value.toUpperCase().replace(/[^A-Z]/g, ''); $('#go').disabled = inp.value.length !== 4; };
      $('#go').onclick = () => { code = inp.value; render(); };
      inp.focus();
      return;
    }
    screen.innerHTML = profileForm(profile || {}) + `<button class="cta" id="go">Meedoen 🎉</button>`;
    wireProfile(() => {
      $('#go').onclick = () => {
        const name = $('#pname').value.trim();
        if (!name) return $('#pname').focus();
        profile = { name: name.slice(0, 16), avatar: ui.avatar };
        saveProfile();
        connect();
        render();
      };
    }, profile || {});
  }
  function profileForm(p) {
    return `<div class="landing" style="margin-top:2vh">
      <div class="title">Wie ben jij?</div>
      <input class="field" id="pname" maxlength="16" placeholder="Je naam" value="${esc(p.name || '')}" autocomplete="nickname">
      <div class="label">Kies je avatar</div>
      <div class="avgrid">${GN.AVATARS.map((a) => `<button data-av="${a}">${a}</button>`).join('')}</div></div>`;
  }
  function wireProfile(done, p) {
    ui.avatar = p.avatar || GN.AVATARS[Math.floor(Math.random() * GN.AVATARS.length)];
    const mark = () => document.querySelectorAll('[data-av]').forEach((b) => b.classList.toggle('on', b.dataset.av === ui.avatar));
    document.querySelectorAll('[data-av]').forEach((b) => (b.onclick = () => { ui.avatar = b.dataset.av; mark(); }));
    mark();
    done();
  }

  // ---------- schermen ----------
  const optionButtons = (opts, hidden = [], extra = () => '') =>
    `<div class="choices">${opts.map((o, i) => `<button class="ch" data-i="${i}" ${hidden.includes(i) ? 'disabled' : ''}><span class="l">${LETTERS[i]}</span><span>${esc(o)}</span>${extra(i)}</button>`).join('')}</div>`;
  const waitBox = (title, sub = '') => `<div class="big">⏳</div><div class="title">${title}</div><p class="sub center">${sub}</p>`;
  const catLine = (v) => (v.cat ? `<div class="catline">${v.cat.emoji} ${esc(v.cat.name)}</div>` : '');
  const qHtml = (t) => `<div class="q">${esc(t).replace(/_{2,}/g, '<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>')}</div>`;
  const foot = (v) => {
    const parts = [];
    if (v.usedPowerup) parts.push(`<div class="puactive">⚡ ${GN.POWERUPS[v.usedPowerup].emoji} ${GN.POWERUPS[v.usedPowerup].name} actief</div>`);
    else if (v.canPowerup) parts.push('<button class="pubtn" id="pubtn">⚡ Power-up gebruiken</button>');
    if (v.skippable && !v.answered) parts.push('<button class="skipbtn" id="skipbtn">🙈 Overslaan</button>');
    return parts.length ? `<div class="foot">${parts.join('')}</div>` : '';
  };

  const SCREENS = {
    lobby(v) {
      const me = v.me;
      if (!me.isGm) {
        const gm = v.players.find((p) => p.gm);
        return `<div class="big" style="font-size:96px">${me.avatar}</div>
          <div class="title">Je bent binnen!</div>
          <p class="sub center">${gm ? `👑 ${esc(gm.name)} start het spel` : 'Wachten op de spelleider'}<span class="waitdots"></span></p>
          ${teamPicker(v)}
          <div class="card"><div class="label">Spelers (${v.players.length})</div><div class="mylist">${v.players.map((p) => `<span>${p.team != null && v.teams ? v.teams[p.team].emoji + ' ' : ''}${p.avatar} ${esc(p.name)}</span>`).join('')}</div></div>
          <button class="cta ghost" id="editp">Naam of avatar aanpassen</button>`;
      }
      const s = v.settings;
      return `<div class="title" style="text-align:left;font-size:26px">Jij bent de spelleider 👑</div>
        <div class="card"><div class="label">Spice level</div><div class="seg" id="spice">${v.spiceList.map((x) => `<button data-v="${x.id}" class="${s.spice === x.id ? 'on' : ''}"><b>${x.emoji}</b>${x.name}</button>`).join('')}</div>
        <p class="sub" style="font-size:13px;margin:8px 0 0">${esc(GN.SPICE[s.spice].desc)}${s.spice === 3 ? ' · stoute vragen kun je anoniem overslaan' : ''}</p></div>
        <div class="card"><div class="label">Lengte</div><div class="seg" id="len">${Object.keys(v.lengths).map((k) => `<button data-v="${k}" class="${s.length === k ? 'on' : ''}"><b>${{ kort: '⚡', normaal: '🎲', lang: '🌙' }[k]}</b>${k}<br><small>${v.lengths[k]}</small></button>`).join('')}</div></div>
        <div class="card"><div class="label">Teams</div><div class="seg" id="teams">${[[0, '🙋', 'Ieder voor zich'], [2, '⚔️', '2 teams'], [3, '🔱', '3 teams']].map(([n, e, t]) => `<button data-v="${n}" class="${(s.teams || 0) === n ? 'on' : ''}"><b>${e}</b>${t}</button>`).join('')}</div>
          ${s.teams ? '<button class="cta ghost small" id="shuffle" style="margin-top:8px">🎲 Teams eerlijk husselen</button>' : ''}</div>
        ${teamPicker(v)}
        <div class="card"><div class="label">Rondes (tik om aan of uit te zetten)</div><div class="rounds">${v.roundList.map((r) => `<button data-round="${r.id}" class="${s.rounds && s.rounds[r.id] === false ? '' : 'on'}">${r.emoji} ${esc(r.title)}</button>`).join('')}<button class="on" disabled>💰 De Finale</button></div></div>
        <div class="card">
          <div class="toggle"><span>Ik speel zelf mee</span><button class="sw ${s.gmPlays ? 'on' : ''}" id="gmplays" aria-label="Meespelen"></button></div>
          <div class="toggle"><span>TV leest vragen voor 🔊</span><button class="sw ${s.voice ? 'on' : ''}" id="voice" aria-label="Voorlezen"></button></div>
        </div>
        <div class="card"><div class="label">Spelers (${v.players.length})</div><div class="plist">${playerRows(v)}</div>
          <div class="row" style="margin-top:10px"><button class="cta ghost small" id="addbot">+ Bot</button><button class="cta ghost small" id="editp">Mijn profiel</button></div></div>
        <button class="cta" id="start" ${v.players.some((p) => p.playing) ? '' : 'disabled'}>Start de quiz 🚀</button>
        <button class="cta ghost small" id="clearseen">Vragengeheugen wissen</button>`;
    },
    host(v) {
      return `<div class="card"><div class="label">Jij presenteert 🎙️</div>${v.q || v.text ? qHtml(v.text || v.q) : `<div class="sub">${esc(v.kind)}</div>`}</div>${gmControls(v)}`;
    },
    wait(v) {
      return `<div class="big">${v.big || '⏳'}</div><div class="title">${esc(v.title || 'Even wachten')}</div><p class="sub center">${esc(v.sub || '')}</p>`;
    },
    catpick(v) {
      return `<div class="title">${esc(v.title)}</div><p class="sub center">Kies de categorie voor de volgende vraag</p>
        <div class="choices">${v.options.map((c) => `<button class="ch" data-cat="${c.id}" style="font-size:20px"><span style="font-size:32px">${c.emoji}</span><span>${esc(c.name)}<br><small class="sub">${esc(c.group)}</small></span></button>`).join('')}</div>`;
    },
    choice(v) {
      if (v.tf) {
        if (v.answered) return waitBox('Antwoord binnen!', `Jij zegt: <b>${v.myAnswer === 0 ? '✅ Waar' : '❌ Nep'}</b>`) + foot(v);
        return `${catLine(v)}<div class="catline">🕵️ Waar of nep?</div>${qHtml(v.q)}
          <div class="tfbtns"><button class="ch tfw" data-i="0">✅<b>Waar</b></button><button class="ch tfn" data-i="1">❌<b>Nep</b></button></div>${foot(v)}`;
      }
      if (v.answered) return waitBox('Antwoord binnen!', `Je koos <b>${LETTERS[v.myAnswer]}: ${esc(v.options[v.myAnswer])}</b>`) + foot(v);
      return `${catLine(v)}${v.isHot ? '<div class="catline">🔥 Jij zit in de hete stoel</div>' : ''}${qHtml(v.q)}${v.sub ? `<div class="sub">${esc(v.sub)}</div>` : ''}${optionButtons(v.options, v.hidden)}${foot(v)}`;
    },
    number(v) {
      if (v.answered) return waitBox('Schatting binnen!', `Jij zei <b>${GN.fmtNum(v.myAnswer)}${v.unit ? ' ' + esc(v.unit) : ''}</b>`) + foot(v);
      return `${catLine(v)}${qHtml(v.q)}
        <input class="field" id="num" inputmode="decimal" autocomplete="off" placeholder="Jouw schatting${v.unit ? ' (' + esc(v.unit) + ')' : ''}">
        <div class="preview" id="prev"></div>
        <button class="cta" id="send" disabled>Verstuur</button>${foot(v)}`;
    },
    bet(v) {
      if (v.answered) return waitBox('Weddenschap staat!', `Op <b>${GN.fmtNum(v.guesses[v.myAnswer].v)}</b>`);
      return `${qHtml(v.q)}<div class="sub">Op welke schatting wed jij? Zit die het dichtst bij: +50</div>
        <div class="choices">${v.guesses.map((g, i) => `<button class="ch" data-i="${i}"><span class="l" style="background:var(--violet)">🎲</span><span style="font-family:var(--display);font-weight:800;font-size:22px">${GN.fmtNum(g.v)}</span>${g.mine ? '<small class="sub" style="margin-left:auto">jouw schatting</small>' : ''}</button>`).join('')}</div>`;
    },
    write(v) {
      if (v.wz) {
        if (v.answered) return waitBox('Anoniem ingeleverd 🤫', `<b>"${esc(v.myAnswer)}"</b><br>Straks moet iedereen raden dat dit van jou is.`);
        return `<div class="catline">🗯️ Wie zei dit? · anoniem</div>${qHtml(v.q)}
          <div class="sub">Schrijf iets grappigs of eerlijks. Tip: schrijf als iemand anders om ze op het verkeerde been te zetten.</div>
          <input class="field" id="txt" maxlength="80" autocomplete="off" placeholder="Jouw antwoord">
          <button class="cta" id="send" disabled>Insturen</button>${foot(v)}`;
      }
      if (v.answered) return waitBox('Bluf ingeleverd 😏', `<b>"${esc(v.myAnswer)}"</b>`);
      return `${catLine(v)}${qHtml(v.q)}
        <div class="sub">Verzin een geloofwaardig nep-antwoord. Hoe meer mensen erin trappen, hoe beter.</div>
        ${v.rejected ? '<div class="card" style="border-color:var(--pink)">😱 Dat is het échte antwoord! Verzin iets anders.</div>' : ''}
        <input class="field" id="txt" maxlength="60" autocomplete="off" placeholder="Jouw nep-antwoord">
        <button class="cta pink" id="send" disabled>Bluf insturen</button>${foot(v)}`;
    },
    bluffvote(v) {
      if (v.answered) return waitBox('Stem binnen!', `Jij denkt: <b>${esc(v.options[v.myAnswer].text)}</b>`);
      return `${qHtml(v.q)}<div class="sub">Welke is echt?</div>
        <div class="choices">${v.options.map((o, i) => `<button class="ch ${o.mine ? 'mine' : ''}" data-i="${i}" ${o.mine ? 'disabled' : ''}><span class="l">${LETTERS[i]}</span><span>${esc(o.text)}</span>${o.mine ? '<small class="sub" style="margin-left:auto">jouw bluf</small>' : ''}</button>`).join('')}</div>`;
    },
    order(v) {
      if (v.answered) return waitBox('Volgorde binnen!', v.myAnswer.map((i, n) => `${n + 1}. ${esc(v.items[i])}`).join('<br>')) + foot(v);
      ui.order = ui.order || [];
      return `${catLine(v)}${qHtml(v.q)}
        <div class="sub">Tik ze aan in volgorde: eerst <b>${esc(v.lo || 'de eerste')}</b>, als laatste <b>${esc(v.hi || 'de laatste')}</b>. Nog eens tikken = terugnemen.</div>
        <div class="choices">${v.items.map((t, i) => `<button class="ch" data-o="${i}"><span>${esc(t)}</span></button>`).join('')}</div>
        <div class="row"><button class="cta ghost" id="reset">Opnieuw</button><button class="cta" id="send" disabled>Verstuur</button></div>${foot(v)}`;
    },
    vote(v) {
      if (v.answered) {
        const t = v.players.find((p) => p.id === v.myAnswer);
        return waitBox('Stem binnen!', t ? `Jij wees naar <b>${t.avatar} ${esc(t.name)}</b>` : '');
      }
      if (v.wzq) return `<div class="catline">🗯️ ${esc(v.wzq)}</div><div class="q" style="color:var(--amber)">${esc(v.q)}</div><div class="sub">${esc(v.sub)}</div>
        <div class="vote">${v.players.map((p) => `<button data-p="${p.id}" style="--c:${p.color}"><span class="av">${p.avatar}</span><b>${esc(p.name)}</b></button>`).join('')}</div>`;
      return `<div class="catline">🫵 Wie van ons…</div>${qHtml(v.q)}${v.skippable ? foot(v) : ''}
        <div class="vote">${v.players.map((p) => `<button data-p="${p.id}" style="--c:${p.color}"><span class="av">${p.avatar}</span><b>${esc(p.name)}</b></button>`).join('')}</div>`;
    },
    poll(v) {
      if (v.answered) return waitBox('Anoniem ingeleverd 🤐', `Jouw gok: <b>${v.myAnswer.guess}</b> van de ${v.n} zegt ja`);
      return `<div class="catline">🙈 Gênante enquête · niemand ziet jouw antwoord</div>${qHtml(v.q)}
        <div class="label">1. Jouw eerlijke antwoord</div>
        <div class="seg" id="yn"><button data-yn="1"><b>👍</b>Ja</button><button data-yn="0"><b>👎</b>Nee</button></div>
        <div class="label" style="margin-top:6px">2. Hoeveel van de ${v.n} zeggen ja?</div>
        <div class="seg" id="gs" style="flex-wrap:wrap">${Array.from({ length: v.n + 1 }, (_, i) => `<button data-g="${i}" style="min-width:44px;flex:0 0 calc(${100 / Math.min(v.n + 1, 7)}% - 6px)"><b>${i}</b></button>`).join('')}</div>
        <button class="cta" id="send" disabled>Verstuur</button>${foot(v)}`;
    },
    wager(v) {
      if (v.answered) return waitBox('Inzet staat!', `<b>${v.myAnswer}</b> punten op het spel 😬`);
      ui.wager = ui.wager == null ? Math.round(v.max / 2) : ui.wager;
      return `<div class="title">💰 Finale</div><div class="sub center">${v.cat ? `${v.cat.emoji} ${esc(v.cat.name)}` : ''}<br>Goed = je inzet erbij. Fout = eraf.</div>
        <div class="wagerval" id="wv">${ui.wager}</div>
        <input type="range" id="wr" min="0" max="${v.max}" step="${v.max > 200 ? 10 : 1}" value="${ui.wager}" ${v.max ? '' : 'disabled'}>
        <div class="row"><button class="cta ghost small" data-w="0">Niks</button><button class="cta ghost small" data-w="0.5">Helft</button><button class="cta ghost small" data-w="1">Alles 🔥</button></div>
        <button class="cta" id="send">Inzetten</button>`;
    },
    result(v) {
      return `<div class="big">${v.big}</div><div class="title" style="color:${v.delta > 0 ? 'var(--mint)' : v.delta < 0 ? 'var(--bad)' : 'var(--text)'}">${esc(v.title)}</div><p class="sub center">${esc(v.sub)}</p><p class="center">Totaal: <b>${v.me.score}</b> · ${v.me.rank}e plaats</p>`;
    },
    end(v) {
      const medal = ['🥇', '🥈', '🥉'][v.rank - 1] || '🎈';
      const team = v.teamRank && v.teams ? v.teams.find((t) => t.id === v.me.team) : null;
      return `<div class="big">${team && v.teamRank === 1 ? '🏆' : medal}</div><div class="title">${team ? (v.teamRank === 1 ? `${team.emoji} Jullie winnen!` : `${team.emoji} Team ${v.teamRank}e`) : v.rank ? `${v.rank}e plaats` : 'Klaar!'}</div><p class="center">${team ? `Jij werd ${v.rank}e met ` : ''}${v.me.score} punten</p>
        ${v.awards.map((a) => `<div class="awardline">${a.emoji} <b>${esc(a.title)}</b><br><small class="sub">${esc(a.text)}</small></div>`).join('')}
        ${v.me.isGm ? '<button class="cta" id="again">Nog een keer! 🔁</button><button class="cta ghost" id="tolobby">Terug naar lobby</button>' : '<p class="sub center">De spelleider beslist of er nog een potje komt</p>'}`;
    },
    kicked() {
      return `<div class="big">👋</div><div class="title">Je bent uit het spel gehaald</div><button class="cta ghost" id="rejoin">Opnieuw meedoen</button>`;
    },
  };

  function playerRows(v) {
    return v.players.map((p) => `<div class="prow"><span class="av" style="--c:${p.color}">${p.avatar}</span><span class="nm">${p.team != null && view && view.teams && view.teams[p.team] ? view.teams[p.team].emoji + ' ' : ''}${esc(p.name)}${p.gm ? ' 👑' : ''}${p.playing ? '' : ' <small class="sub">(presenteert)</small>'} ${p.connected || p.isBot ? '' : '<span class="off">weg</span>'}</span>
      ${!p.gm && !p.isBot ? `<button data-gmto="${p.id}">👑</button>` : ''}${!p.gm ? `<button data-kick="${p.id}">✕</button>` : ''}</div>`).join('');
  }
  function gmControls(v) {
    if (!v.gm) return '';
    return `<div class="card" style="display:grid;gap:8px"><div class="label">Spelleider</div>
      <button class="cta ghost" data-gm="gm:pause">${v.paused ? '▶️ Hervatten' : '⏸️ Pauze'}</button>
      ${v.gm.canSkip ? '<button class="cta ghost" data-gm="gm:skip">⏭️ Vraag overslaan</button>' : ''}
      ${v.gm.canNext ? '<button class="cta ghost" data-gm="gm:next">⏩ Door naar volgende stap</button>' : ''}
      <button class="cta ghost" data-sheet="players">👥 Spelers beheren</button>
      <button class="cta ghost" data-gm="gm:stop" data-confirm="Spel stoppen en terug naar de lobby?">🛑 Stoppen</button></div>`;
  }

  // ---------- interactie ----------
  function wire(v) {
    const on = (sel, fn) => { const el = $(sel, screen); if (el) el.onclick = fn; };
    screen.querySelectorAll('[data-gm]').forEach((b) => (b.onclick = () => { if (b.dataset.confirm && !confirm(b.dataset.confirm)) return; act(b.dataset.gm); sheet = null; renderSheet(); }));
    screen.querySelectorAll('[data-sheet]').forEach((b) => (b.onclick = () => { sheet = b.dataset.sheet; renderSheet(); }));
    on('#pubtn', () => { sheet = 'pu'; ui.puType = null; renderSheet(); });
    on('#skipbtn', () => { if (confirm('Deze vraag anoniem overslaan? Niemand ziet wie het was.')) act('skip'); });
    on('#editp', () => { sheet = 'profile'; renderSheet(); });
    on('#rejoin', () => { view = null; connect(); });
    wireGmPlayers(screen);
    switch (v.screen) {
      case 'lobby':
        screen.querySelectorAll('#teampick button').forEach((b) => (b.onclick = () => act('team', { team: +b.dataset.team })));
        if (!v.me.isGm) break;
        screen.querySelectorAll('#spice button').forEach((b) => (b.onclick = () => act('gm:settings', { settings: { spice: +b.dataset.v } })));
        screen.querySelectorAll('#len button').forEach((b) => (b.onclick = () => act('gm:settings', { settings: { length: b.dataset.v } })));
        on('#gmplays', () => act('gm:settings', { settings: { gmPlays: !v.settings.gmPlays } }));
        on('#voice', () => act('gm:settings', { settings: { voice: !v.settings.voice } }));
        on('#addbot', () => act('gm:addbot'));
        on('#shuffle', () => act('gm:shuffle'));
        screen.querySelectorAll('#teams button').forEach((b) => (b.onclick = () => act('gm:settings', { settings: { teams: +b.dataset.v } })));
        screen.querySelectorAll('[data-round]').forEach((b) => (b.onclick = () => act('gm:settings', { settings: { rounds: { [b.dataset.round]: !b.classList.contains('on') } } })));
        on('#start', () => act('gm:start'));
        on('#clearseen', () => { if (confirm('Alle vragen weer als nieuw markeren?')) act('gm:clearseen'); });
        break;
      case 'catpick':
        screen.querySelectorAll('[data-cat]').forEach((b) => (b.onclick = () => act('pickcat', { cat: b.dataset.cat })));
        break;
      case 'choice': case 'bet': case 'bluffvote':
        screen.querySelectorAll('.ch[data-i]').forEach((b) => (b.onclick = () => act('answer', { v: +b.dataset.i })));
        break;
      case 'vote':
        screen.querySelectorAll('[data-p]').forEach((b) => (b.onclick = () => act('answer', { v: b.dataset.p })));
        break;
      case 'number': {
        const inp = $('#num');
        if (!inp) break;
        const parse = () => { const t = inp.value.replace(/\s/g, '').replace(/\.(?=\d{3}(\D|$))/g, '').replace(',', '.'); const n = parseFloat(t); return isFinite(n) ? n : null; };
        inp.oninput = () => { const n = parse(); $('#prev').textContent = n == null ? '' : GN.fmtNum(n) + (v.unit ? ' ' + v.unit : ''); $('#send').disabled = n == null; };
        const send = () => { const n = parse(); if (n != null) act('answer', { v: n }); };
        on('#send', send);
        inp.onkeydown = (e) => { if (e.key === 'Enter') send(); };
        break;
      }
      case 'write': {
        const inp = $('#txt');
        if (!inp) break;
        inp.oninput = () => ($('#send').disabled = !inp.value.trim());
        const send = () => { if (inp.value.trim()) act('answer', { v: inp.value.trim() }); };
        on('#send', send);
        inp.onkeydown = (e) => { if (e.key === 'Enter') send(); };
        break;
      }
      case 'order': {
        const paint = () => {
          screen.querySelectorAll('[data-o]').forEach((b) => {
            const i = +b.dataset.o;
            const pos = ui.order.indexOf(i);
            b.classList.toggle('picked', pos >= 0);
            const old = $('.ord', b);
            if (old) old.remove();
            if (pos >= 0) b.insertAdjacentHTML('beforeend', `<span class="ord">${pos + 1}</span>`);
          });
          const s = $('#send');
          if (s) s.disabled = ui.order.length !== 4;
        };
        screen.querySelectorAll('[data-o]').forEach((b) => (b.onclick = () => {
          const i = +b.dataset.o;
          const pos = ui.order.indexOf(i);
          if (pos >= 0) ui.order.splice(pos, 1); else ui.order.push(i);
          paint();
        }));
        on('#reset', () => { ui.order = []; paint(); });
        on('#send', () => act('answer', { v: ui.order }));
        paint();
        break;
      }
      case 'wager': {
        const r = $('#wr');
        const show = () => ($('#wv').textContent = ui.wager);
        if (r) r.oninput = () => { ui.wager = +r.value; show(); };
        screen.querySelectorAll('[data-w]').forEach((b) => (b.onclick = () => { ui.wager = Math.round(v.max * +b.dataset.w); if (r) r.value = ui.wager; show(); }));
        on('#send', () => act('answer', { v: ui.wager }));
        break;
      }
      case 'poll': {
        const paint = () => {
          screen.querySelectorAll('[data-yn]').forEach((b) => b.classList.toggle('on', ui.yes === (b.dataset.yn === '1')));
          screen.querySelectorAll('[data-g]').forEach((b) => b.classList.toggle('on', ui.guess === +b.dataset.g));
          const sb = $('#send');
          if (sb) sb.disabled = ui.yes === undefined || ui.guess === undefined;
        };
        screen.querySelectorAll('[data-yn]').forEach((b) => (b.onclick = () => { ui.yes = b.dataset.yn === '1'; paint(); }));
        screen.querySelectorAll('[data-g]').forEach((b) => (b.onclick = () => { ui.guess = +b.dataset.g; paint(); }));
        on('#send', () => act('answer', { v: { yes: ui.yes, guess: ui.guess } }));
        break;
      }
      case 'end':
        on('#again', () => act('gm:start'));
        on('#tolobby', () => act('gm:lobby'));
        break;
    }
  }
  function wireGmPlayers(root) {
    root.querySelectorAll('[data-kick]').forEach((b) => (b.onclick = () => { if (confirm('Deze speler verwijderen?')) act('gm:kick', { id: b.dataset.kick }); }));
    root.querySelectorAll('[data-gmto]').forEach((b) => (b.onclick = () => { if (confirm('Spelleider doorgeven?')) { act('gm:transfer', { id: b.dataset.gmto }); sheet = null; renderSheet(); } }));
  }

  // ---------- sheets ----------
  function renderSheet() {
    const el = $('#sheet');
    if (!sheet || !view) { el.classList.add('hidden'); el.innerHTML = ''; return; }
    el.classList.remove('hidden');
    let html = '';
    if (sheet === 'gm') html = `<h3>Spelleider 👑</h3>${gmControls(view)}`;
    else if (sheet === 'players') html = `<h3>Spelers</h3><div class="plist">${playerRows({ players: view.gm ? view.gm.players : [] })}</div>`;
    else if (sheet === 'profile') html = profileForm(view.me).replace('Wie ben jij?', 'Profiel aanpassen') + '<button class="cta" id="psave">Opslaan</button>';
    else if (sheet === 'pu') {
      if (!view.canPowerup) { sheet = null; return renderSheet(); }
      if (ui.puType) {
        html = `<h3>${GN.POWERUPS[ui.puType].emoji} ${GN.POWERUPS[ui.puType].name}: op wie?</h3>
          <div class="vote">${view.targets.map((t) => `<button data-t="${t.id}"><span class="av" style="--c:#444">${t.avatar}</span><b>${esc(t.name)}</b></button>`).join('')}</div>`;
      } else {
        const mine = view.me.powerups.filter((p, i, a) => a.indexOf(p) === i);
        html = `<h3>Power-ups</h3>${mine.map((p) => {
          const P = GN.POWERUPS[p];
          const off = P.passive || (p === 'vijftig' && view.screen !== 'choice') || (p === 'vijftig' && view.kind === 'final');
          return `<button class="pu" data-pu="${p}" ${off ? 'disabled style="opacity:.5"' : ''}><span class="e">${P.emoji}</span><span><b>${P.name}</b><small>${esc(P.desc)}${P.passive ? ' (werkt vanzelf)' : ''}</small></span></button>`;
        }).join('')}`;
      }
    }
    el.innerHTML = `<div class="in">${html}<button class="cta ghost" id="close">Sluiten</button></div>`;
    el.onclick = (e) => { if (e.target === el) { sheet = null; renderSheet(); } };
    $('#close', el).onclick = () => { sheet = null; renderSheet(); };
    el.querySelectorAll('[data-gm]').forEach((b) => (b.onclick = () => { if (b.dataset.confirm && !confirm(b.dataset.confirm)) return; act(b.dataset.gm); sheet = null; renderSheet(); }));
    el.querySelectorAll('[data-sheet]').forEach((b) => (b.onclick = () => { sheet = b.dataset.sheet; renderSheet(); }));
    wireGmPlayers(el);
    el.querySelectorAll('[data-pu]').forEach((b) => (b.onclick = () => {
      const t = b.dataset.pu;
      if (GN.POWERUPS[t].target) { ui.puType = t; renderSheet(); }
      else { act('powerup', { type: t }); sheet = null; renderSheet(); }
    }));
    el.querySelectorAll('[data-t]').forEach((b) => (b.onclick = () => { act('powerup', { type: ui.puType, target: b.dataset.t }); sheet = null; ui.puType = null; renderSheet(); }));
    if (sheet === 'profile') {
      wireProfile(() => {
        $('#psave', el).onclick = () => {
          const name = $('#pname', el).value.trim();
          if (!name) return;
          profile = { name: name.slice(0, 16), avatar: ui.avatar };
          saveProfile();
          act('profile', profile);
          sheet = null;
          renderSheet();
        };
      }, view.me);
    }
  }

  // ---------- timer ----------
  function frame() {
    const tb = document.getElementById('tb');
    if (tb && view && view.remaining != null && view.duration) {
      const left = view.paused ? view.remaining : Math.max(0, view.remaining - (Date.now() - viewAt));
      tb.style.transform = `scaleX(${Math.max(0, Math.min(1, left / (view.duration * 1000)))})`;
      tb.style.background = left < 6000 ? 'var(--pink)' : 'var(--amber)';
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  if (profile && code) connect();
  render();
})();
