/* Game Night – vragen- en categorieënregister.
   Vragenpakketten in /data roepen GN.addQuestions(...) aan.
   Generatoren (gegenereerde vragen uit datatabellen) roepen GN.addGenerator(...) aan. */
(function (root) {
  const GN = (root.GN = root.GN || {});

  // spice: 1 = Braaf, 2 = Pittig, 3 = Stout
  GN.CATEGORIES = [
    // Kennis
    { id: 'nederland', name: 'Nederland & taal', emoji: '🌷', group: 'Kennis', spice: 1 },
    { id: 'geschiedenis', name: 'Geschiedenis', emoji: '🏰', group: 'Kennis', spice: 1 },
    { id: 'aardrijkskunde', name: 'Aardrijkskunde', emoji: '🌍', group: 'Kennis', spice: 1 },
    { id: 'wetenschap', name: 'Wetenschap', emoji: '🔬', group: 'Kennis', spice: 1 },
    { id: 'dieren', name: 'Dieren', emoji: '🦒', group: 'Kennis', spice: 1 },
    { id: 'eten', name: 'Eten, drinken & bier', emoji: '🍺', group: 'Kennis', spice: 1 },
    { id: 'film', name: 'Films & series', emoji: '🎬', group: 'Kennis', spice: 1 },
    { id: 'games', name: 'Games', emoji: '🎮', group: 'Kennis', spice: 1 },
    { id: 'muziek', name: 'Muziek', emoji: '🎵', group: 'Kennis', spice: 1 },
    { id: 'kunst', name: 'Kunst & cultuur', emoji: '🖼️', group: 'Kennis', spice: 1 },
    { id: 'merken', name: 'Merken & bedrijven', emoji: '🏷️', group: 'Kennis', spice: 1 },
    { id: 'reizen', name: 'Reizen & vakantie', emoji: '✈️', group: 'Kennis', spice: 1 },
    // Nerd
    { id: 'fantasy', name: 'Fantasy (Tolkien, Potter & co)', emoji: '🧙', group: 'Nerd', spice: 1 },
    { id: 'scifi', name: 'Sci-fi (Dune, Star Wars & co)', emoji: '🚀', group: 'Nerd', spice: 1 },
    { id: 'superhelden', name: 'Superhelden', emoji: '🦸', group: 'Nerd', spice: 1 },
    // Nostalgie
    { id: 'jaren', name: 'Jaren 80, 90 & 00', emoji: '📼', group: 'Nostalgie', spice: 1 },
    { id: 'kindertv', name: 'Kinder-tv van vroeger', emoji: '📺', group: 'Nostalgie', spice: 1 },
    { id: 'reclames', name: 'Oude reclames & producten', emoji: '🛒', group: 'Nostalgie', spice: 1 },
    // Grappig & raar
    { id: 'weetjes', name: 'Rare weetjes', emoji: '🤯', group: 'Grappig & raar', spice: 1 },
    { id: 'echtgebeurd', name: 'Echt gebeurd', emoji: '📰', group: 'Grappig & raar', spice: 1 },
    { id: 'flop', name: 'Flopproducten', emoji: '📉', group: 'Grappig & raar', spice: 1 },
    { id: 'uitvindingen', name: 'Mislukte uitvindingen', emoji: '🛠️', group: 'Grappig & raar', spice: 1 },
    { id: 'internet', name: 'Internet & memes', emoji: '📱', group: 'Grappig & raar', spice: 1 },
    { id: 'records', name: 'Gekke records', emoji: '🏆', group: 'Grappig & raar', spice: 1 },
    { id: 'criminelen', name: 'Domme criminelen', emoji: '🚔', group: 'Grappig & raar', spice: 1 },
    { id: 'bier', name: 'Bier & kroeg', emoji: '🍻', group: 'Grappig & raar', spice: 1 },
    // Donker
    { id: 'morbide', name: 'Morbide weetjes', emoji: '💀', group: 'Donker', spice: 2 },
    { id: 'middeleeuwen', name: 'Middeleeuwse ellende', emoji: '🐀', group: 'Donker', spice: 2 },
    { id: 'rampen', name: 'Rampen & blunders', emoji: '🔥', group: 'Donker', spice: 2 },
    { id: 'truecrime', name: 'True crime light', emoji: '🔪', group: 'Donker', spice: 2 },
    { id: 'laatstewoorden', name: 'Laatste woorden', emoji: '🕯️', group: 'Donker', spice: 2 },
    { id: 'hoaxes', name: 'Hoaxes & complotten', emoji: '🛸', group: 'Donker', spice: 2 },
    { id: 'spook', name: 'Spookverhalen & urban legends', emoji: '👻', group: 'Donker', spice: 2 },
    { id: 'schandalen', name: 'Beruchte schandalen', emoji: '🗞️', group: 'Donker', spice: 2 },
    { id: 'mysteries', name: 'Onopgeloste mysteries', emoji: '🔍', group: 'Donker', spice: 2 },
    { id: 'oorlog', name: 'Oorlog & spionage', emoji: '🕵️', group: 'Donker', spice: 2 },
    { id: 'kater', name: 'Kater & feestjes', emoji: '🥴', group: 'Pittig', spice: 2 },
    // Stout
    { id: 'lichaam', name: 'Het lichaam', emoji: '🍑', group: 'Stout', spice: 3 },
    { id: 'liefde', name: 'Liefde & seks', emoji: '🌶️', group: 'Stout', spice: 3 },
    { id: 'dating', name: 'Dating-ellende', emoji: '💔', group: 'Stout', spice: 3 },
    { id: 'stoutgeschiedenis', name: 'Stoute geschiedenis', emoji: '👑', group: 'Stout', spice: 3 },
    ];
  GN.CAT = {};
  GN.CATEGORIES.forEach((c) => (GN.CAT[c.id] = c));

  GN.SPICE = [
    null,
    { id: 1, name: 'Braaf', emoji: '😇', desc: 'Kennis en rare weetjes' },
    { id: 2, name: 'Pittig', emoji: '😈', desc: '+ donkere humor' },
    { id: 3, name: 'Stout', emoji: '🌶️', desc: '+ 18+ vragen' },
  ];

  GN.QUESTIONS = [];
  GN.PROMPTS = []; // persoonlijke vragen: type 'ken' en 'wie'
  GN.GENERATORS = []; // { cat, type, make(rand) -> vraag of null }

  // Stabiele id's op basis van de vraagtekst, zodat het "al gezien"-geheugen
  // blijft kloppen als er later vragen bijkomen.
  GN.hash = function (s) {
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return (h >>> 0).toString(36);
  };
  GN.addQuestions = function (cat, list) {
    list.forEach((q) => {
      q.cat = q.cat || cat;
      // volgorde-vragen delen vaak dezelfde vraagtekst: dan tellen de items mee
      if (!q.id) q.id = q.cat + ':' + q.type + ':' + GN.hash(q.q + (q.items ? '|' + q.items.map((i) => i[0]).join(',') : ''));
      GN.QUESTIONS.push(q);
    });
  };
  GN.addPrompts = function (list) {
    list.forEach((p) => {
      if (!p.id) p.id = 'p:' + p.type + ':' + GN.hash(p.q);
      GN.PROMPTS.push(p);
    });
  };
  GN.addGenerator = function (cat, type, make) {
    GN.GENERATORS.push({ cat, type, make });
  };

  GN.qSpice = function (q) {
    const c = GN.CAT[q.cat];
    return Math.max(c ? c.spice : 1, q.spice || 1);
  };

  // Teken & Raad: kleuren en lijndiktes (in een 1000x1000 vlak)
  /* power-ups en avatars: ook nodig op de telefoon */
  GN.POWERUPS = {
    dubbel: { name: 'Dubbel', emoji: '✖️2', desc: 'Jouw punten voor deze vraag tellen dubbel.' },
    vijftig: { name: '50/50', emoji: '✂️', desc: 'Twee foute antwoorden verdwijnen (alleen bij meerkeuze).' },
    stelen: { name: 'Stelen', emoji: '🦝', desc: 'Je pikt de helft van wat iemand bij deze vraag verdient.', target: true },
    sabotage: { name: 'Sabotage', emoji: '💣', desc: 'Iemand krijgt maar de helft van zijn punten bij deze vraag.', target: true },
    schild: { name: 'Schild', emoji: '🛡️', desc: 'Blokkeert automatisch de eerste steel- of sabotage-actie tegen jou.', passive: true },
  };
  GN.AVATARS = ['🦊', '🐸', '🐙', '🦄', '🐻', '🐼', '🐯', '🦁', '🐷', '🐵', '🦉', '🐔', '🦖', '🐢', '🦀', '🐝', '👽', '🤖', '👻', '🎃', '🧙', '🧛', '🧟', '🥷', '🤠', '🦩', '🦦', '🐌', '🥨', '🍄'];
  GN.PALETTE = ['#1d1a2f', '#ff4f8b', '#4cc9f0', '#ffb627', '#3ddc97', '#9b7bff', '#8b5a2b', '#ffffff'];
  GN.WIDTHS = [7, 16, 34];
  GN.drawingSvg = function (d, cls) {
    const lines = (d || []).map((st) => {
      const pts = [];
      for (let i = 0; i + 1 < st.p.length; i += 2) pts.push(st.p[i] + ',' + st.p[i + 1]);
      if (pts.length === 1) pts.push(pts[0]);
      return '<polyline points="' + pts.join(' ') + '" fill="none" stroke="' + (GN.PALETTE[st.c] || '#000') + '" stroke-width="' + (GN.WIDTHS[st.w] || 16) + '" stroke-linecap="round" stroke-linejoin="round"/>';
    }).join('');
    return '<svg class="' + (cls || 'drawing') + '" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><rect width="1000" height="1000" rx="40" fill="#fffaf0"/>' + lines + '</svg>';
  };

  // getallen netjes in het Nederlands (jaartallen zonder punt)
  GN.fmtNum = function (n) {
    if (typeof n !== 'number') return n;
    if (Number.isInteger(n) && Math.abs(n) < 10000) return String(n);
    return n.toLocaleString('nl-NL');
  };

  if (typeof module !== 'undefined') module.exports = GN;
})(typeof window !== 'undefined' ? window : globalThis);

/* ---------- Zo werkt het: uitleg per ronde (TV en telefoon) ---------- */
GN.HOWTO = {
  mc: [['📱', 'Kies A, B, C of D op je telefoon'], ['🐢', 'Rustig nadenken: snelheid telt niet'], ['✅', 'Goed = 100 punten']],
  tf: [['🕵️', 'Je ziet een stelling'], ['👍', 'Tik op Waar of Nep'], ['✅', 'Goed = punten, vaak met een raar weetje erbij']],
  num: [['🔢', 'Schat het getal op je telefoon'], ['🎲', 'Wed daarna op de schatting die volgens jou het dichtst zit'], ['🏆', 'Dichtstbij én goed gewed = dubbel feest']],
  hl: [['↕️', 'Is het volgende getal hoger of lager?'], ['🔥', 'Elke goede gok achter elkaar levert meer op'], ['💥', 'Eén keer fout en je reeks is weg']],
  lingo: [['🟩', 'Raad het woord van vijf letters'], ['🟨', 'Groen = goede plek, geel = zit erin maar op een andere plek'], ['⚡', 'Hoe minder pogingen, hoe meer punten']],
  bluff: [['✍️', 'Verzin een nep-antwoord dat echt klinkt'], ['🔍', 'Zoek daarna het échte antwoord tussen alle bluffen'], ['😈', 'Trapt iemand in jouw bluf? Punten voor jou!']],
  echt: [['📰', 'Je hoort het begin van een waargebeurd verhaal'], ['✍️', 'Verzin hoe het afliep'], ['🔍', 'Zoek het echte einde, en luis anderen erin']],
  order: [['🔢', 'Tik de dingen aan in de goede volgorde'], ['↩️', 'Foutje? Tik op opnieuw'], ['✅', 'Elk ding op de goede plek = punten, alles goed = bonus']],
  puzzel: [['🧩', 'Twaalf woorden, drie groepjes van vier'], ['👆', 'Tik vier woorden aan die bij elkaar horen'], ['❌', 'Maar drie keer fout mag']],
  invul: [['📝', 'Vul de gevraagde woorden in'], ['🙈', 'Je weet niet waar het verhaal over gaat'], ['😂', 'De TV leest het voor, stem op het grappigste woord']],
  teken: [['🎨', 'Teken je geheime opdracht op je telefoon'], ['✍️', 'Verzin een nep-titel bij de tekening van een ander'], ['🔍', 'Zoek de echte titel. Goed tekenen loont!']],
  persoonlijk: [['🫣', 'Vragen over jullie zelf'], ['🔥', 'Soms zit iemand in de hete stoel, soms stem je op elkaar'], ['🤐', 'Te pikant? Overslaan kan anoniem']],
  top5: [['🔥', 'Iemand zit in de hete stoel'], ['🏅', 'Die zet vijf dingen eerlijk op volgorde'], ['🔮', 'De rest raadt die volgorde']],
  leugen: [['✍️', 'Schrijf drie dingen over jezelf'], ['🤥', 'Twee zijn waar, één is gelogen'], ['🔍', 'Zoek bij de anderen de leugen']],
  ketting: [['📜', 'Schrijf de volgende zin van een verhaal'], ['🙈', 'Je ziet alleen de zin ervoor'], ['😂', 'Aan het eind lezen we alles voor en stemmen we']],
  wiezei: [['✍️', 'Iedereen beantwoordt dezelfde vraag, anoniem'], ['🗯️', 'Per antwoord raad je wie het schreef'], ['😈', 'Niemand die jou raadt? Punten voor jou']],
  final: [['💰', 'Eén laatste vraag'], ['🎲', 'Zet zoveel van je punten in als je durft'], ['🏆', 'Goed = je inzet erbij, fout = je inzet kwijt']],
};
