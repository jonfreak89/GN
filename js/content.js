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
    // Grappig & raar
    { id: 'weetjes', name: 'Rare weetjes', emoji: '🤯', group: 'Grappig & raar', spice: 1 },
    { id: 'echtgebeurd', name: 'Echt gebeurd', emoji: '📰', group: 'Grappig & raar', spice: 1 },
    { id: 'flop', name: 'Flopproducten', emoji: '📉', group: 'Grappig & raar', spice: 1 },
    { id: 'uitvindingen', name: 'Mislukte uitvindingen', emoji: '🛠️', group: 'Grappig & raar', spice: 1 },
    { id: 'internet', name: 'Internet & memes', emoji: '📱', group: 'Grappig & raar', spice: 1 },
    { id: 'records', name: 'Gekke records', emoji: '🏆', group: 'Grappig & raar', spice: 1 },
    // Donker
    { id: 'morbide', name: 'Morbide weetjes', emoji: '💀', group: 'Donker', spice: 2 },
    { id: 'middeleeuwen', name: 'Middeleeuwse ellende', emoji: '🐀', group: 'Donker', spice: 2 },
    { id: 'rampen', name: 'Rampen & blunders', emoji: '🔥', group: 'Donker', spice: 2 },
    { id: 'truecrime', name: 'True crime light', emoji: '🔪', group: 'Donker', spice: 2 },
    { id: 'laatstewoorden', name: 'Laatste woorden', emoji: '🕯️', group: 'Donker', spice: 2 },
    // Stout
    { id: 'lichaam', name: 'Het lichaam', emoji: '🍑', group: 'Stout', spice: 3 },
    { id: 'liefde', name: 'Liefde & seks', emoji: '🌶️', group: 'Stout', spice: 3 },
    { id: 'dating', name: 'Dating-ellende', emoji: '💔', group: 'Stout', spice: 3 },
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
      if (!q.id) q.id = q.cat + ':' + q.type + ':' + GN.hash(q.q);
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

  if (typeof module !== 'undefined') module.exports = GN;
})(typeof window !== 'undefined' ? window : globalThis);
