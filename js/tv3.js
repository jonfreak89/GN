/* Game Night – TV-schermen voor Wie van ons…?, Liever… of…?, Grapjas-duel en Kaartenkoning.
   Haakt in op GN.TVX uit tv2.js (en wordt daarna geladen). */
(function () {
  const GN = (window.GN = window.GN || {});
  const base = GN.TVX;
  GN.TVX = function (h) {
    const a = base ? base(h) : { views: {}, reveals: {}, onStep: () => false };
    const { esc, waitLine, pmap, voters, qClass, stage, Show, host, say } = h;
    const chip = (t) => `<div class="qhead"><span class="cat">${t}</span></div>`;
    const tag = (p) => (p ? `<span class="ptag" style="--c:${p.color}"><i>${p.avatar}</i>${esc(p.name)}</span>` : '<span class="ptag">🤖 niemand</span>');
    const fill = (b, w) => (GN.fillBlack ? GN.fillBlack(b, w) : b + ' ' + w);
    const blackHtml = (b, w) => esc(b).replace(/_{3,}/, w ? `<u>${esc(GN.fillWhite ? GN.fillWhite(b, w) : w)}</u>` : '<span class="gap">_____</span>');

    const views = {
      lvPick: (v) => `<div class="panel center">${chip(`⚖️ Liever… of…? <small>${v.qno}/${v.qcount}</small>`)}
        <div class="lvduo">
          <div class="lvopt a pop"><b>A</b><span>${esc(v.a)}</span></div>
          <div class="lvor">of</div>
          <div class="lvopt b pop" style="animation-delay:.25s"><b>B</b><span>${esc(v.b)}</span></div>
        </div>
        <div class="qsub">Kies op je telefoon wat jij liever hebt, en voorspel wat de meesten kiezen</div>
        ${waitLine(v)}</div>`,

      dlWrite: (v) => `<div class="intro center">
        <div class="big">🤺</div>
        <div class="rno">Grapjas-duel</div>
        <h2 class="pop">Verzin de grappigste antwoorden</h2>
        <p class="rise">Iedereen krijgt twee vragen op de telefoon. Een ander krijgt steeds dezelfde vraag: dat wordt je tegenstander.</p>
        ${waitLine(v)}</div>`,
      dlVote: (v) => `<div class="panel center">${chip(`🤺 Duel ${v.dno} van ${v.dtotal}`)}
        <div class="${qClass(v.prompt)} pop">${esc(v.prompt)}</div>
        <div class="duelduo">
          ${v.items.map((x, i) => `<div class="duelcard ${i ? 'r' : 'l'} pop" style="animation-delay:${0.6 + i * 0.9}s"><b>${i ? 'B' : 'A'}</b><span>${esc(x.text)}</span></div>`).join('<div class="duelvs pop" style="animation-delay:1.1s">VS</div>')}
        </div>
        <div class="qsub">Stem op je telefoon op het grappigste antwoord</div>
        ${waitLine(v)}</div>`,

      kkPlay: (v) => {
        const k = pmap(v)[v.king];
        return `<div class="panel center">${chip(`🃏 Kaartenkoning <small>${v.qno}/${v.qcount}</small>`)}
          <div class="kkblack pop">${blackHtml(v.black)}</div>
          <div class="kkking">👑 Koning van deze beurt: ${tag(k)}</div>
          <div class="qsub">Kies op je telefoon de witte kaart die het best (of het slechtst) past</div>
          ${waitLine(v)}</div>`;
      },
      kkJudge: (v) => {
        const k = pmap(v)[v.king];
        return `<div class="panel wide center">${chip('🃏 Kaartenkoning')}
          <div class="kkblack small">${blackHtml(v.black)}</div>
          <div class="kkcards n${v.cards.length}">${v.cards.map((c, i) => `<div class="kkwhite pop" style="animation-delay:${0.3 + i * 0.5}s"><span>${esc(c.text)}</span></div>`).join('')}</div>
          <div class="qsub">${v.kingOk ? `👑 ${k ? esc(k.name) : 'De koning'} kiest de winnaar…` : '👑 De koning is weg: iedereen stemt mee!'}</div>
          ${waitLine(v)}</div>`;
      },
    };

    const reveals = {
      lv: (v, r) => {
        const m = pmap(v);
        const side = (i) => Object.keys(r.picks).filter((id) => r.picks[id].me === i && m[id]);
        const total = Math.max(1, r.n[0] + r.n[1]);
        return `<div class="panel center">${chip('⚖️ Liever… of…?')}
          <div class="lvduo res">
            ${[0, 1].map((i) => `<div class="lvopt ${i ? 'b' : 'a'} ${r.win === i ? 'win' : r.win === -1 ? '' : 'lose'}"><b>${i ? 'B' : 'A'}</b><span>${esc(i ? r.b : r.a)}</span>
              <div class="lvpct">${Math.round((r.n[i] / total) * 100)}%</div>${voters(side(i), m)}</div>`).join('<div class="lvor">of</div>')}
          </div>
          <div class="bonus">${r.tie ? '⚖️ Precies gelijk! Iedereen 50 punten.' : `🔮 Goed voorspeld: ${Object.keys(r.gains).filter((id) => m[id]).map((id) => esc(m[id].name)).join(', ') || 'niemand'}`}</div></div>`;
      },
      dl: (v, r) => {
        const m = pmap(v);
        return `<div class="panel center">${chip(`🤺 Duel ${r.dno} van ${r.dtotal}`)}
          <div class="${qClass(r.prompt)}" style="font-size:2em">${esc(r.prompt)}</div>
          <div class="duelduo res">${r.ans.map((x, i) => {
            const p = m[x.author];
            const vs = Object.keys(r.votes).filter((id) => r.votes[id] === i);
            return `<div class="duelcard ${i ? 'r' : 'l'} ${r.winner === i ? 'win' : r.winner === -1 ? '' : 'lose'}">${r.winner === i ? '<div class="crown">👑</div>' : ''}
              <span>${x.text ? esc(x.text) : '<i>(geen antwoord)</i>'}</span>
              <div class="duelby">${tag(p)} ${r.walkover ? '' : `<em>${r.counts[i] || 0} ${(r.counts[i] || 0) === 1 ? 'stem' : 'stemmen'}</em>`}</div>${voters(vs, m)}</div>`;
          }).join('<div class="duelvs">VS</div>')}</div>
          <div class="bonus">${r.walkover ? '🏳️ Walkover: de ander vulde niks in' : r.sweep ? '🃏 GRAPJAS! Alle stemmen voor één antwoord: +100 bonus' : r.winner === -1 ? '🤝 Gelijkspel!' : `🤺 Duel gewonnen door ${esc((m[r.ans[r.winner].author] || {}).name || '')}`}</div></div>`;
      },
      kk: (v, r) => {
        const m = pmap(v);
        const w = r.cards[r.win];
        const p = w ? m[w.author] : null;
        const k = m[r.king];
        return `<div class="panel wide center">${chip('🃏 Kaartenkoning')}
          <div class="kkblack win">${blackHtml(r.black, w && w.text)}</div>
          <div class="kkwinner">${w ? `🏆 ${tag(p)} wint${w.own ? ' met een zelfgeschreven kaart ✏️' : ''}` : 'Niemand legde een kaart'}${r.kingOk && !r.picked ? ' <small>(de koning sliep, dus het lot koos)</small>' : ''}</div>
          <div class="kkcards small n${r.cards.length}">${r.cards.map((c, i) => `<div class="kkwhite ${i === r.win ? 'win' : ''}"><span>${esc(c.text)}</span><small>${m[c.author] ? m[c.author].avatar + ' ' + esc(m[c.author].name) : ''}</small></div>`).join('')}</div>
          ${r.kingOk && k ? `<div class="qsub">Gekozen door koning ${esc(k.name)} 👑</div>` : ''}</div>`;
      },
    };

    function onStep(v, x) {
      if (a.onStep(v, x)) return true;
      const { sfx, later, m } = x;
      const k = v.kind;
      if (k === 'lvPick') { sfx('whoosh'); say(`Wat heb je liever: ${v.a}, of ${v.b}?`); return false; }
      if (k === 'dlVote') { sfx('whoosh'); say(v.prompt); v.items.forEach((it, i) => later(() => { sfx('pop', 0, i); }, 600 + i * 900)); later(() => say(v.items.map((it) => it.text).join('. Of: ')), 1600); return true; }
      if (k === 'kkPlay') { sfx('whoosh'); say(String(v.black).replace(/_{3,}/, 'piep')); return false; }
      if (k === 'kkJudge') { v.cards.forEach((c, i) => later(() => sfx('pop', 0, i), 300 + i * 500)); return true; }
      if (k === 'reveal' && v.reveal.of === 'kk') {
        const r = v.reveal; const w = r.cards[r.win];
        sfx('drumroll');
        later(() => { sfx('ding'); Show.confetti(70); if (w) say(fill(r.black, w.text)); }, 900);
        return true;
      }
      if (k === 'reveal' && v.reveal.of === 'dl') {
        const r = v.reveal;
        if (r.sweep) { later(() => { sfx('applause'); Show.confetti(110); host(['GRAPJAS! Allemaal op één antwoord.', 'Unaniem! Wat een grapjas.', 'Alle stemmen! Ik lig dubbel.'], {}, 'party'); }, 500); return true; }
        return false;
      }
      return false;
    }
    return { views: Object.assign({}, a.views, views), reveals: Object.assign({}, a.reveals, reveals), onStep };
  };
})();
