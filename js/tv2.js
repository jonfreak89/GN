/* Game Night – TV-schermen voor de extra rondes en de show-onderdelen
   (voorstelronde, Rad van Fortuin, De kudde, Golflengte, Eén woord, Teken-telefoon). */
(function () {
  const GN = (window.GN = window.GN || {});
  GN.TVX = function (h) {
    const { esc, waitLine, pmap, voters, qClass, stage, Sound, Show, host, say } = h;
    const chip = (t) => `<div class="qhead"><span class="cat">${t}</span></div>`;
    const seat = (p, txt) => `<div class="hotseat"><span class="av" style="--c:${p ? p.color : '#444'}">${p ? p.avatar : '?'}</span><span>${txt}</span></div>`;
    const who = (p) => (p ? `<b>${esc(p.name)}</b>` : '');

    // ---------- Rad van Fortuin ----------
    const WCOL = ['#ff4f8b', '#4cc9f0', '#ffb627', '#3a2f6b', '#3ddc97', '#9b7bff', '#ff8a3d', '#ffd46b'];
    function wheelSvg(segs) {
      const n = segs.length;
      const pt = (deg, r) => { const a = ((deg - 90) * Math.PI) / 180; return [Math.cos(a) * r, Math.sin(a) * r]; };
      const parts = segs.map((label, i) => {
        const a0 = (i * 360) / n, a1 = ((i + 1) * 360) / n, mid = (a0 + a1) / 2;
        const [x0, y0] = pt(a0, 96), [x1, y1] = pt(a1, 96);
        const [tx, ty] = pt(mid, 60);
        const dark = WCOL[i % WCOL.length] === '#3a2f6b';
        return `<path d="M0 0 L${x0.toFixed(2)} ${y0.toFixed(2)} A96 96 0 0 1 ${x1.toFixed(2)} ${y1.toFixed(2)} Z" fill="${WCOL[i % WCOL.length]}" stroke="#1b1440" stroke-width="1.5"/>
          <text x="${tx.toFixed(2)}" y="${ty.toFixed(2)}" transform="rotate(${mid} ${tx.toFixed(2)} ${ty.toFixed(2)})" text-anchor="middle" dominant-baseline="middle" font-size="${label.length > 9 ? 7 : label.length > 6 ? 8.2 : 9.5}" font-weight="800" fill="${dark ? '#fff8ec' : '#1b1440'}">${esc(label)}</text>`;
      }).join('');
      return `<div class="wheelbox"><div class="pointer">▼</div><svg class="wheel" viewBox="-100 -100 200 200">${parts}<circle r="12" fill="#1b1440" stroke="#ffb627" stroke-width="3"/></svg></div>`;
    }

    // ---------- Golflengte ----------
    function scale(v, inner = '') {
      return `<div class="gscale"><div class="glabels"><span>◀ ${esc(v.lo)}</span><span>${esc(v.hi)} ▶</span></div><div class="gbar">${inner}</div></div>`;
    }

    // ---------- Teken-telefoon ----------
    function chain(items, opts = {}) {
      const m = opts.m || {};
      return `<div class="ttchain n${items.length}">${items.map((it, i) => {
        const p = it.author ? m[it.author] : null;
        const top = opts.top && opts.top.includes(i);
        const body = it.t === 'draw' ? `<div class="ttdraw">${GN.drawingSvg(it.d)}</div>` : `<div class="tttext">${esc(it.text)}</div>`;
        const foot = opts.m ? `<div class="ttby" style="--c:${p ? p.color : '#555'}"><i>${p ? p.avatar : '🤖'}</i>${p ? esc(p.name) : 'niemand'}${opts.counts && opts.counts[i] ? ` <b>${'⭐'.repeat(Math.min(5, opts.counts[i]))}</b>` : ''}</div>` : `<div class="ttstep">Stap ${i + 1}</div>`;
        return `${i ? `<div class="ttarrow" style="animation-delay:${opts.m ? 0 : i * 2.4 - 0.4}s">➜</div>` : ''}<div class="ttcard ${top ? 'top' : ''}" style="animation-delay:${opts.m ? 0 : i * 2.4}s">${body}${foot}</div>`;
      }).join('')}</div>`;
    }

    const views = {
      cast: (v) => {
        const m = pmap(v);
        return `<div class="castshow">
          <div class="rno">Vanavond in de arena</div>
          <div class="castgrid ${v.cast.length > 6 ? 'many' : ''}">${v.cast.map((c, i) => {
            const p = m[c.id];
            return p ? `<div class="castcard" style="--c:${p.color};animation-delay:${0.8 + i * 2}s"><span class="av">${p.avatar}</span><b>${esc(p.name)}</b><small>${esc(c.nick)}</small></div>` : '';
          }).join('')}</div></div>`;
      },

      rad: (v) => {
        const p = pmap(v)[v.spinner];
        return `<div class="radshow">
          ${wheelSvg(v.segs)}
          <div class="radside">
            <div class="rno">Rad van Fortuin</div>
            ${seat(p, `${who(p)} staat laatst…`)}
            <h2 class="pop">…en mag draaien!</h2>
            <p class="qsub" style="margin:0">Tik op je telefoon op de grote knop</p>
          </div></div>`;
      },
      radSpin: (v) => {
        const p = pmap(v)[v.spinner];
        return `<div class="radshow">
          ${wheelSvg(v.segs)}
          <div class="radside">
            <div class="rno">Rad van Fortuin</div>
            ${seat(p, `${who(p)} draait…`)}
            <h2 class="radresult">${esc(v.segs[v.idx])}</h2>
            <p class="radtext">${esc(v.text)}</p>
          </div></div>`;
      },

      kdWrite: (v) => `<div class="panel center">${chip('🐑 De kudde')}
        <div class="${qClass(v.text)} pop">${esc(v.text)}</div>
        <div class="qsub">Typ wat volgens jou de meeste anderen ook antwoorden</div>
        ${waitLine(v)}</div>`,

      gfClue: (v) => {
        const p = pmap(v)[v.hot];
        return `<div class="panel center">${chip('📡 Golflengte')}
          ${seat(p, `${who(p)} ziet een geheim punt en bedenkt een hint…`)}
          ${scale(v, '<div class="gq">?</div>')}
          ${waitLine(v)}</div>`;
      },
      gfGuess: (v) => {
        const p = pmap(v)[v.hot];
        return `<div class="panel center">${chip('📡 Golflengte')}
          ${seat(p, `De hint van ${who(p)}:`)}
          <div class="gclue pop">“${esc(v.clue)}”</div>
          ${scale(v, '<div class="gq">?</div>')}
          <div class="qsub" style="margin-top:.6em">Schuif op je telefoon naar waar het geheime punt ligt</div>
          ${waitLine(v)}</div>`;
      },

      ewClue: (v) => {
        const p = pmap(v)[v.hot];
        return `<div class="panel center">${chip('☝️ Eén woord')}
          ${seat(p, `${who(p)} moet straks raden`)}
          <div class="qtext pop">🙈 Niet spieken, ${p ? esc(p.name) : ''}!</div>
          <div class="qsub">De rest ziet het geheime woord op de telefoon en geeft elk één hint van één woord.<br>Dubbele hints vallen weg.</div>
          ${waitLine(v)}</div>`;
      },
      ewGuess: (v) => {
        const p = pmap(v)[v.hot];
        const open = v.clues.filter((c) => !c.x);
        const gone = v.clues.length - open.length;
        return `<div class="panel center">${chip('☝️ Eén woord')}
          ${seat(p, `${who(p)} raadt het woord`)}
          <div class="ewclues">${open.map((c, i) => `<span class="ewclue pop" style="animation-delay:${0.3 + i * 0.35}s">${esc(c.text)}</span>`).join('')}${Array.from({ length: gone }, (_, i) => `<span class="ewclue gone pop" style="animation-delay:${0.3 + (open.length + i) * 0.35}s">✖ dubbel</span>`).join('')}</div>
          ${open.length ? '' : '<div class="qsub">Alle hints waren dubbel… dat wordt gokken!</div>'}
          ${waitLine(v)}</div>`;
      },

      tt: (v) => {
        const T = { write: ['✍️', 'Schrijf een zin', 'Iets wat de volgende moet tekenen. Hoe gekker, hoe leuker.'], draw: ['🎨', 'Teken wat je leest', 'Je ziet de zin van iemand anders. Maak er wat moois van.'], desc: ['👀', 'Wat zie jij hierin?', 'Je ziet een tekening. Beschrijf wat het volgens jou is.'] }[v.mode];
        return `<div class="intro center">
          <div class="big">${T[0]}</div>
          <div class="rno">Teken-telefoon · stap ${v.turn + 1} van ${v.T}</div>
          <h2 class="pop">${T[1]}</h2>
          <p class="rise">${T[2]}</p>
          <div class="ktdots">${Array.from({ length: v.T }, (_, i) => `<i class="${i < v.turn ? 'done' : i === v.turn ? 'now' : ''}"></i>`).join('')}</div>
          ${waitLine(v)}</div>`;
      },
      ttShow: (v) => `<div class="panel wide">${chip(`☎️ Ketting ${v.sno} van ${v.stotal}`)}
        ${chain(v.items)}
        <div class="qsub" style="margin-top:1em">Stem op je telefoon op de leukste stap</div>
        ${waitLine(v)}</div>`,
    };

    const reveals = {
      kd: (v, r) => {
        const m = pmap(v);
        const max = r.groups.length ? r.groups[0].ids.length : 1;
        const cow = r.cow ? m[r.cow] : null;
        return `<div class="panel">${chip('🐑 De kudde')}
          <div class="${qClass(r.text)}" style="font-size:2.2em">${esc(r.text)}</div>
          <div class="herd">${r.groups.map((g, i) => `<div class="herdrow ${r.top.includes(i) ? 'top' : ''} ${cow && g.ids[0] === r.cow && g.ids.length === 1 ? 'cow' : ''}" style="animation-delay:${0.3 + (r.groups.length - i) * 0.25}s">
            <span class="hbar" style="width:${Math.max(18, (g.ids.length / max) * 100)}%"><b>${esc(g.text)}</b><em>${g.ids.length}×</em></span>${voters(g.ids, m)}</div>`).join('')}</div>
          <div class="bonus">${r.top.length ? `🐑 De kudde zei: <b>${r.top.map((i) => esc(r.groups[i].text)).join(' en ')}</b>` : '🤷 Iedereen zei iets anders: geen kudde!'}${cow ? ` &nbsp;·&nbsp; 🐄 Roze koe voor <b>${esc(cow.name)}</b>` : ''}</div></div>`;
      },
      gf: (v, r) => {
        const m = pmap(v);
        const p = m[r.hot];
        const zone = (w, cls) => `<div class="gzone ${cls}" style="left:${Math.max(0, r.target - w)}%;width:${Math.min(100, r.target + w) - Math.max(0, r.target - w)}%"></div>`;
        const marks = Object.entries(r.guesses).map(([id, g], i) => (m[id] ? `<div class="gmark" style="left:${g}%;--c:${m[id].color};animation-delay:${0.4 + i * 0.2}s;top:${i % 2 ? 58 : -8}%">${m[id].avatar}</div>` : '')).join('');
        return `<div class="panel center">${chip('📡 Golflengte')}
          ${seat(p, `De hint van ${who(p)}:`)}
          <div class="gclue">“${esc(r.clue)}”</div>
          ${scale(r, `${zone(18, 'z3')}${zone(10, 'z2')}${zone(4, 'z1')}<div class="gtarget" style="left:${r.target}%">🎯</div>${marks}`)}
          <div class="bonus">${Object.values(r.gains).some((g) => g >= 100) ? '🎯 Precies op dezelfde golflengte!' : Object.keys(r.gains).length ? '📡 Aardig in de buurt' : '📴 Totaal geen ontvangst…'}</div></div>`;
      },
      ew: (v, r) => {
        const m = pmap(v);
        const p = m[r.hot];
        return `<div class="panel center">${chip('☝️ Eén woord')}
          <div class="answerbig" style="text-transform:uppercase">${esc(r.word)}</div>
          <div class="ewguess ${r.ok ? 'ok' : 'no'}">${p ? p.avatar : ''} ${p ? esc(p.name) : ''} ${r.guess ? `gokte: <b>${esc(r.guess)}</b>` : 'gokte niks'} ${r.ok ? '✅' : '❌'}</div>
          <div class="ewclues">${r.clues.map((c) => `<span class="ewclue ${c.x ? 'gone' : ''}">${esc(c.text)}${voters(c.ids, m)}</span>`).join('')}</div>
          <div class="bonus">${r.ok ? '🙌 Samen geraden!' : '😬 Net niet…'}</div></div>`;
      },
      tt: (v, r) => `<div class="panel wide">${chip(`☎️ Ketting ${r.sno} van ${r.stotal}`)}
        ${chain(r.items, { m: pmap(v), top: r.top, counts: r.counts })}</div>`,
    };

    // geluid, Joep en animaties bij de nieuwe schermen. Geeft true terug als het scherm hier is afgehandeld.
    function onStep(v, x) {
      const { sfx, later, m } = x;
      const k = v.kind;
      if (k === 'cast') {
        host(['Dames en heren… hier zijn ze dan: de kandidaten van vanavond!', 'Mag ik een warm applaus voor onze spelers!', 'Welkom bij Game Night! Even voorstellen…'], {}, 'party');
        sfx('fanfare');
        v.cast.forEach((c, i) => later(() => {
          const p = m[c.id];
          sfx('boing'); sfx('pop', 0.15, i);
          if (p) { Show.say(`${p.name}, ${c.nick}!`, 'happy', 1900); say(`${p.name}, ${c.nick}`); }
        }, 800 + i * 2000));
        later(() => { sfx('applause'); Show.confetti(90); }, 800 + v.cast.length * 2000);
        return true;
      }
      if (k === 'rad') {
        const p = m[v.spinner];
        sfx('whoosh');
        host(['Tijd voor het Rad van Fortuin! Een kansje voor wie achteraan bungelt.', 'Het rad! {naam}, dit is je moment.', 'Comeback-tijd, {naam}. Draaien maar!'], { naam: p ? p.name : 'de laatste' }, 'party', 'scores');
        return true;
      }
      if (k === 'radSpin') {
        const w = stage.querySelector('.wheel');
        const n = v.segs.length;
        const rot = 360 * 6 - (v.idx + 0.5) * (360 / n) + (Math.random() - 0.5) * (360 / n) * 0.6;
        if (w) requestAnimationFrame(() => requestAnimationFrame(() => { w.style.transition = Show.reduce ? 'none' : 'transform 5.2s cubic-bezier(.12,.6,.1,1)'; w.style.transform = `rotate(${rot}deg)`; }));
        // tikken van het rad: eerst snel, dan steeds trager
        let t = 0, gap = 70;
        while (t < 5000) { sfx('tick', t / 1000); t += gap; gap *= 1.11; }
        const good = Object.values(v.gains || {}).some((g) => g > 0) || /Power-up/.test(v.segs[v.idx]);
        later(() => {
          stage.querySelector('.radshow') && stage.querySelector('.radshow').classList.add('done');
          sfx('crash');
          if (good) { sfx('ding', 0.1); Show.confetti(120); } else sfx('aww', 0.1);
          host([v.text], {}, good ? 'party' : 'shock', 'scores');
        }, 5400);
        return true;
      }
      if (k === 'ttShow') {
        sfx('whoosh');
        v.items.forEach((it, i) => later(() => { sfx('pop', 0, i); if (it.t === 'text') say(it.text); }, i * 2400 + 200));
        return true;
      }
      return false;
    }

    return { views, reveals, onStep };
  };
})();
