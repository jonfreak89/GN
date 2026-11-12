/* Hoger of lager: reeksen met getallen. Elke set: { id, title, emoji, hi, lo, gap?, items:[{n, v, show}] }
   gap = minimale relatieve afstand tussen twee opeenvolgende waarden (standaard 8%). */
(function () {
  const D = GN.DATA || {};
  const sets = [];
  const nf = (v) => GN.fmtNum(v);
  const add = (id, title, emoji, hi, lo, items, gap) => sets.push({ id, title, emoji, hi, lo, gap, items });

  if (D.countries) {
    add('pop', 'Welk land heeft meer inwoners?', '👥', 'Meer', 'Minder',
      D.countries.filter((c) => c.pop >= 0.3).map((c) => ({ n: c.name, v: c.pop, show: D.fmtPop(c.pop) })), 0.1);
    add('area', 'Welk land is groter?', '🗺️', 'Groter', 'Kleiner',
      D.countries.map((c) => ({ n: c.name, v: c.area, show: nf(c.area) + ' km²' })), 0.1);
  }
  if (D.films) add('films', 'Welke film is nieuwer?', '🎬', 'Later', 'Eerder', D.films.map((f) => ({ n: f.t, v: f.y, show: String(f.y) })), 0.0001);
  if (D.history) add('hist', 'Wat gebeurde later?', '📜', 'Later', 'Eerder', D.history.map((e) => ({ n: e.t, v: e.y, show: e.show })), 0.0001);
  if (D.animals) {
    add('kg', 'Welk dier is zwaarder?', '🐘', 'Zwaarder', 'Lichter', D.animals.map((a) => ({ n: a.n, v: a.kg, show: '± ' + D.kgShow(a.kg) })), 0.3);
    add('life', 'Welk dier wordt ouder?', '🐢', 'Ouder', 'Jonger', D.animals.map((a) => ({ n: a.n, v: a.life, show: '± ' + nf(a.life) + ' jaar' })), 0.25);
    add('speed', 'Welk dier is sneller?', '🐆', 'Sneller', 'Trager', D.animals.map((a) => ({ n: a.n, v: a.speed, show: '± ' + nf(a.speed) + ' km/u' })), 0.25);
  }
  const L = (rows, unit, pre) => rows.map(([n, v]) => ({ n, v, show: (pre || '') + nf(v) + (unit ? ' ' + unit : '') }));
  add('steden', 'Welke stad heeft meer inwoners?', '🏙️', 'Meer', 'Minder', L([
    ['Amsterdam', 930000], ['Rotterdam', 670000], ['Den Haag', 560000], ['Utrecht', 375000], ['Eindhoven', 245000], ['Groningen', 240000],
    ['Tilburg', 228000], ['Almere', 220000], ['Breda', 185000], ['Nijmegen', 185000], ['Apeldoorn', 167000], ['Zwolle', 133000],
    ['Leiden', 127000], ['Maastricht', 122000], ['Delft', 105000], ['Venlo', 102000], ['Helmond', 94000], ['Oss', 93000],
    ['Hilversum', 92000], ['Middelburg', 49000], ['Lelystad', 82000], ['Den Helder', 56000], ['Assen', 69000], ['Vlissingen', 45000],
  ], 'inwoners', '± '), 0.12);
  add('gebouwen', 'Welk bouwwerk is hoger?', '🏢', 'Hoger', 'Lager', L([
    ['Burj Khalifa', 828], ['Eiffeltoren', 330], ['Euromast', 185], ['Domtoren', 112], ['Vrijheidsbeeld (met sokkel)', 93],
    ['Big Ben (klokkentoren)', 96], ['Empire State Building', 443], ['Piramide van Cheops', 139], ['Atomium', 102], ['Shanghai Tower', 632],
    ['Martinitoren', 97], ['Taipei 101', 508], ['Toren van Pisa', 56], ['Sagrada Família', 172], ['De Rotterdam', 149], ['Erasmusbrug (pyloon)', 139],
  ], 'm'), 0.08);
  add('bergen', 'Welke berg is hoger?', '🏔️', 'Hoger', 'Lager', L([
    ['Mount Everest', 8849], ['K2', 8611], ['Kilimanjaro', 5895], ['Mont Blanc', 4806], ['Matterhorn', 4478], ['Zugspitze', 2962],
    ['Vesuvius', 1281], ['Etna', 3357], ['Mount Fuji', 3776], ['Ben Nevis', 1345], ['Vaalserberg', 322], ['Aconcagua', 6961], ['Denali', 6190],
  ], 'm'), 0.08);
  add('kcal', 'Wat heeft meer calorieën per 100 gram?', '🍫', 'Meer', 'Minder', L([
    ['Komkommer', 15], ['Tomaat', 18], ['Appel', 52], ['Banaan', 89], ['Gekookte aardappel', 77], ['Witte rijst (gekookt)', 130],
    ['Volkorenbrood', 250], ['Patat', 310], ['Goudse kaas', 380], ['Chips', 540], ['Melkchocola', 540], ['Pindakaas', 600], ['Olijfolie', 884],
    ['Frikandel', 280], ['Kroket', 230], ['Stroopwafel', 470], ['Hagelslag', 500], ['Avocado', 160], ['Ei', 143], ['Drop', 370],
  ], 'kcal'), 0.12);
  add('alcohol', 'Welke drank heeft meer alcohol?', '🍺', 'Meer', 'Minder', L([
    ['Radler', 2], ['Pils', 5], ['Witbier', 5], ['Tripel', 8.5], ['Quadrupel', 10], ['Wijn', 12], ['Port', 20], ['Advocaat', 15],
    ['Jonge jenever', 35], ['Wodka', 40], ['Whisky', 40], ['Absint', 70], ['Cider', 4.5], ['Baileys', 17],
  ], '%'), 0.15);
  add('rivieren', 'Welke rivier is langer?', '🌊', 'Langer', 'Korter', L([
    ['Nijl', 6650], ['Amazone', 6400], ['Jangtse', 6300], ['Mississippi', 3730], ['Wolga', 3530], ['Donau', 2850], ['Rijn', 1230],
    ['Elbe', 1094], ['Maas', 925], ['Loire', 1006], ['Theems', 346], ['Seine', 777], ['Schelde', 350], ['Ganges', 2525], ['Rhône', 813],
  ], 'km'), 0.08);
  add('planeten', 'Welke planeet is groter?', '🪐', 'Groter', 'Kleiner', L([
    ['Mercurius', 4879], ['Mars', 6779], ['Venus', 12104], ['Aarde', 12742], ['Neptunus', 49244], ['Uranus', 50724], ['Saturnus', 116460], ['Jupiter', 139820], ['De maan', 3474], ['De zon', 1392700],
  ], 'km doorsnee'), 0.08);
  GN.HL_SETS = sets;
})();
