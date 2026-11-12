/* Gegenereerde vragen uit datatabellen: duizenden combinaties, zodat schatten,
   volgorde en meerkeuze niet snel herhalen. Elke vraag krijgt een vaste id. */
(function () {
  const pick = (rand, arr) => arr[Math.floor(rand() * arr.length)];
  const sample = (rand, arr, n) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a.slice(0, n);
  };
  // n items waarvan de waarden duidelijk verschillen (factor of afstand)
  const spread = (rand, arr, n, key, ok) => {
    for (let t = 0; t < 60; t++) {
      const s = sample(rand, arr, n).sort((a, b) => key(a) - key(b));
      let good = true;
      for (let i = 1; i < s.length; i++) if (!ok(key(s[i - 1]), key(s[i]))) good = false;
      if (good) return s;
    }
    return null;
  };
  const ratio = (r) => (a, b) => (b > 0 && a > 0 ? b / a >= r : b - a > 0);
  const gap = (g) => (a, b) => b - a >= g;
  const idOf = (pre, list, f) => pre + ':' + list.map(f).sort().join('-');

  // ---------- landen ----------
  // [naam, hoofdstad, inwoners (miljoen, ± 2024), oppervlakte km², werelddeel, hoofdstad eenduidig?]
  const C = [
    ['Nederland', 'Amsterdam', 18, 41850, 'eu'], ['België', 'Brussel', 11.8, 30689, 'eu'], ['Duitsland', 'Berlijn', 84.5, 357588, 'eu'],
    ['Frankrijk', 'Parijs', 68.4, 551695, 'eu'], ['Spanje', 'Madrid', 48.6, 505990, 'eu'], ['Italië', 'Rome', 59, 302073, 'eu'],
    ['Portugal', 'Lissabon', 10.6, 92212, 'eu'], ['Verenigd Koninkrijk', 'Londen', 68.3, 242495, 'eu'], ['Ierland', 'Dublin', 5.3, 70273, 'eu'],
    ['Zweden', 'Stockholm', 10.6, 450295, 'eu'], ['Noorwegen', 'Oslo', 5.6, 385207, 'eu'], ['Denemarken', 'Kopenhagen', 6, 42933, 'eu'],
    ['Finland', 'Helsinki', 5.6, 338455, 'eu'], ['IJsland', 'Reykjavik', 0.39, 103000, 'eu'], ['Polen', 'Warschau', 36.6, 312696, 'eu'],
    ['Oostenrijk', 'Wenen', 9.2, 83879, 'eu'], ['Zwitserland', 'Bern', 9, 41285, 'eu'], ['Griekenland', 'Athene', 10.4, 131957, 'eu'],
    ['Tsjechië', 'Praag', 10.9, 78871, 'eu'], ['Hongarije', 'Boedapest', 9.6, 93030, 'eu'], ['Roemenië', 'Boekarest', 19, 238397, 'eu'],
    ['Kroatië', 'Zagreb', 3.9, 56594, 'eu'], ['Luxemburg', 'Luxemburg', 0.67, 2586, 'eu'], ['Malta', 'Valletta', 0.54, 316, 'eu'],
    ['Turkije', 'Ankara', 85.4, 783562, 'as'], ['Rusland', 'Moskou', 144, 17098246, 'eu'],
    ['Verenigde Staten', 'Washington D.C.', 335, 9833520, 'am'], ['Canada', 'Ottawa', 41, 9984670, 'am'], ['Mexico', 'Mexico-Stad', 130, 1964375, 'am'],
    ['Brazilië', 'Brasília', 212, 8515767, 'am'], ['Argentinië', 'Buenos Aires', 46, 2780400, 'am'], ['Chili', 'Santiago', 19.8, 756102, 'am'],
    ['Peru', 'Lima', 34, 1285216, 'am'], ['Colombia', 'Bogota', 53, 1141748, 'am'], ['Cuba', 'Havana', 10, 109884, 'am'],
    ['China', 'Peking', 1410, 9596961, 'as'], ['India', 'New Delhi', 1440, 3287263, 'as'], ['Japan', 'Tokio', 124, 377975, 'as'],
    ['Zuid-Korea', 'Seoel', 51.7, 100210, 'as'], ['Vietnam', 'Hanoi', 100, 331212, 'as'], ['Filipijnen', 'Manilla', 115, 300000, 'as'],
    ['Iran', 'Teheran', 89, 1648195, 'as'], ['Saoedi-Arabië', 'Riyad', 35, 2149690, 'as'], ['Bangladesh', 'Dhaka', 173, 147570, 'as'],
    ['Pakistan', 'Islamabad', 240, 796095, 'as'], ['Nepal', 'Kathmandu', 30, 147516, 'as'], ['Mongolië', 'Ulaanbaatar', 3.4, 1564116, 'as'],
    ['Australië', 'Canberra', 27, 7692024, 'oc'], ['Nieuw-Zeeland', 'Wellington', 5.3, 268021, 'oc'],
    ['Egypte', 'Caïro', 107, 1002450, 'af'], ['Nigeria', 'Abuja', 225, 923768, 'af'], ['Kenia', 'Nairobi', 55, 580367, 'af'],
    ['Marokko', 'Rabat', 37.5, 446550, 'af'], ['Ethiopië', 'Addis Abeba', 125, 1104300, 'af'], ['Ghana', 'Accra', 34, 238533, 'af'],
    ['Zuid-Afrika', null, 63, 1221037, 'af'],
  ].map(([name, cap, pop, area, cont]) => ({ name, cap, pop, area, cont, key: name.replace(/\W/g, '').slice(0, 6) }));

  const fmtPop = (m) => (m >= 1 ? GN.fmtNum(Math.round(m * 10) / 10) + ' miljoen' : GN.fmtNum(Math.round(m * 1000)) + '.000');

  GN.addGenerator('aardrijkskunde', 'mc', (rand) => {
    const withCap = C.filter((c) => c.cap);
    const c = pick(rand, withCap);
    const same = withCap.filter((x) => x !== c && x.cont === c.cont);
    const others = sample(rand, same.length >= 3 ? same : withCap.filter((x) => x !== c), 3).map((x) => x.cap);
    // extra uitdaging: bij landen met een bekende "valse" hoofdstad die als foutoptie
    const trap = { Turkije: 'Istanbul', Australië: 'Sydney', Canada: 'Toronto', Brazilië: 'Rio de Janeiro', Marokko: 'Casablanca', Nigeria: 'Lagos', Zwitserland: 'Zürich', 'Nieuw-Zeeland': 'Auckland', 'Verenigde Staten': 'New York', Pakistan: 'Karachi', Vietnam: 'Ho Chi Minhstad' }[c.name];
    if (trap) others[0] = trap;
    return { id: 'g:cap:' + c.key, type: 'mc', q: `Wat is de hoofdstad van ${c.name}?`, a: [c.cap].concat(others), d: trap ? 2 : 1 };
  });
  GN.addGenerator('aardrijkskunde', 'num', (rand) => {
    const c = pick(rand, C.filter((x) => x.pop >= 1));
    if (rand() < 0.5) return { id: 'g:pop:' + c.key, type: 'num', q: `Hoeveel inwoners heeft ${c.name} ongeveer?`, answer: c.pop, unit: 'miljoen', fact: 'Afgeronde schatting rond 2024.' };
    return { id: 'g:area:' + c.key, type: 'num', q: `Hoe groot is ${c.name} ongeveer?`, answer: c.area, unit: 'km²', fact: `Ter vergelijking: Nederland is zo'n 41.850 km².` };
  });
  GN.addGenerator('aardrijkskunde', 'order', (rand) => {
    if (rand() < 0.5) {
      const s = spread(rand, C, 4, (c) => c.pop, ratio(1.25));
      if (!s) return null;
      return { id: idOf('g:opop', s, (c) => c.key), type: 'order', q: 'Zet deze landen op aantal inwoners', lo: 'Minste', hi: 'Meeste', items: s.map((c) => [c.name, c.pop, fmtPop(c.pop)]) };
    }
    const s = spread(rand, C, 4, (c) => c.area, ratio(1.3));
    if (!s) return null;
    return { id: idOf('g:oarea', s, (c) => c.key), type: 'order', q: 'Zet deze landen op oppervlakte', lo: 'Kleinste', hi: 'Grootste', fmt: '{v} km²', items: s.map((c) => [c.name, c.area]) };
  });

  // ---------- geschiedenis ----------
  const H = [
    ['De piramide van Cheops wordt gebouwd', -2560, '± 2560 v.Chr.'], ['Rome wordt gesticht (volgens de legende)', -753, '753 v.Chr.'],
    ['Julius Caesar wordt vermoord', -44, '44 v.Chr.'], ['De Vesuvius begraaft Pompeii', 79], ['Het West-Romeinse Rijk valt', 476],
    ['Karel de Grote wordt tot keizer gekroond', 800], ['De Slag bij Hastings', 1066], ['De Magna Carta', 1215],
    ['De Zwarte Dood bereikt Europa', 1347], ['Gutenberg drukt zijn bijbel', 1455, '± 1455'], ['Columbus bereikt Amerika', 1492],
    ['De Tachtigjarige Oorlog begint', 1568], ['De VOC wordt opgericht', 1602], ['De Vrede van Münster', 1648],
    ['Rembrandt schildert De Nachtwacht', 1642], ['De bestorming van de Bastille', 1789], ['De Slag bij Waterloo', 1815],
    ['Nederland schaft de slavernij af', 1863], ['De gebroeders Wright vliegen voor het eerst', 1903], ['De Titanic zinkt', 1912],
    ['De Eerste Wereldoorlog begint', 1914], ['Vrouwen in Nederland krijgen kiesrecht', 1919], ['De beurskrach op Wall Street', 1929],
    ['De Tweede Wereldoorlog begint', 1939], ['Nederland wordt bevrijd', 1945], ['De Watersnoodramp', 1953], ['De eerste mens op de maan', 1969],
    ['De Berlijnse Muur valt', 1989], ['De euro wordt ons contante geld', 2002], ['De eerste iPhone verschijnt', 2007],
    ['Willem-Alexander wordt koning', 2013], ['Elfstedentocht: de laatste tot nu toe', 1997], ['Het Deltaplan: de Oosterscheldekering opent', 1986],
  ].map(([t, y, show], i) => ({ t, y, show: show || String(y), key: 'h' + GN.hash(t) }));
  GN.addGenerator('geschiedenis', 'order', (rand) => {
    const s = spread(rand, H, 4, (e) => e.y, gap(8));
    if (!s) return null;
    return { id: idOf('g:hist', s, (e) => e.key), type: 'order', q: 'Zet deze gebeurtenissen in de tijd', lo: 'Eerst', hi: 'Laatst', items: s.map((e) => [e.t, e.y, e.show]) };
  });
  GN.addGenerator('geschiedenis', 'num', (rand) => {
    const e = pick(rand, H.filter((x) => x.y > 1000));
    return { id: 'g:hy:' + e.key, type: 'num', q: `In welk jaar? ${e.t}.`, answer: e.y };
  });

  // ---------- wetenschap: elementen ----------
  const E = [['goud', 'Au'], ['zilver', 'Ag'], ['ijzer', 'Fe'], ['koper', 'Cu'], ['lood', 'Pb'], ['natrium', 'Na'], ['kalium', 'K'], ['kwik', 'Hg'],
    ['tin', 'Sn'], ['waterstof', 'H'], ['zuurstof', 'O'], ['stikstof', 'N'], ['koolstof', 'C'], ['helium', 'He'], ['uranium', 'U'],
    ['wolfraam', 'W'], ['platina', 'Pt'], ['calcium', 'Ca'], ['zwavel', 'S'], ['chloor', 'Cl'], ['neon', 'Ne'], ['fosfor', 'P'],
    ['magnesium', 'Mg'], ['aluminium', 'Al'], ['silicium', 'Si'], ['zink', 'Zn'], ['nikkel', 'Ni'], ['antimoon', 'Sb']];
  const fakeSym = (n) => n[0].toUpperCase() + n[1];
  GN.addGenerator('wetenschap', 'mc', (rand) => {
    const [name, sym] = pick(rand, E);
    const pool = E.filter((e) => e[1] !== sym).map((e) => e[1]);
    const opts = new Set();
    const fake = fakeSym(name);
    if (fake !== sym) opts.add(fake);
    sample(rand, pool, 4).forEach((x) => opts.size < 3 && opts.add(x));
    const hard = ['Fe', 'Cu', 'Pb', 'Na', 'K', 'Hg', 'Sn', 'W', 'Sb', 'Ag', 'Au'].includes(sym);
    return { id: 'g:el:' + sym, type: 'mc', q: `Wat is het scheikundige symbool van ${name}?`, a: [sym].concat([...opts].slice(0, 3)), d: hard ? 2 : 1 };
  });

  // ---------- dieren ----------
  // [naam, levensduur in jaren (typisch), topsnelheid km/u, gewicht kg (volwassen, typisch)]
  const A = [
    ['Muis', 2, 13, 0.02], ['Hamster', 2.5, 10, 0.15], ['Konijn', 9, 56, 2], ['Kat', 15, 48, 4.5], ['Hond (labrador)', 12, 35, 30],
    ['Paard', 28, 70, 500], ['Koe', 20, 40, 700], ['Varken', 15, 17, 150], ['Olifant (Afrikaans)', 65, 40, 6000], ['Giraffe', 25, 60, 1200],
    ['Leeuw', 14, 80, 190], ['Ijsbeer', 25, 40, 450], ['Struisvogel', 40, 70, 110], ['Jachtluipaard', 12, 110, 50], ['Nijlpaard', 45, 30, 1500],
    ['Gorilla', 40, 40, 160], ['Reuzenschildpad', 120, 0.3, 250], ['Blauwe vinvis', 85, 50, 120000], ['Zwarte weduwe-spin', 1.5, 1, 0.001], ['Koolmees', 2, 30, 0.018],
  ].map(([n, life, speed, kg]) => ({ n, life, speed, kg, key: n.replace(/\W/g, '').slice(0, 7) }));
  const kgShow = (k) => (k >= 1000 ? GN.fmtNum(k / 1000) + ' ton' : k >= 1 ? GN.fmtNum(k) + ' kg' : GN.fmtNum(Math.round(k * 1000)) + ' gram');
  GN.addGenerator('dieren', 'order', (rand) => {
    const mode = pick(rand, ['life', 'speed', 'kg']);
    const s = spread(rand, A, 4, (a) => a[mode], ratio(mode === 'kg' ? 2 : 1.5));
    if (!s) return null;
    const meta = {
      life: ['Zet deze dieren op hoe oud ze meestal worden', 'Kortst', 'Langst', (a) => '± ' + GN.fmtNum(a.life) + ' jaar'],
      speed: ['Zet deze dieren op topsnelheid', 'Traagst', 'Snelst', (a) => '± ' + GN.fmtNum(a.speed) + ' km/u'],
      kg: ['Zet deze dieren op gewicht', 'Lichtst', 'Zwaarst', (a) => '± ' + kgShow(a.kg)],
    }[mode];
    return { id: idOf('g:an' + mode, s, (a) => a.key), type: 'order', q: meta[0], lo: meta[1], hi: meta[2], items: s.map((a) => [a.n, a[mode], meta[3](a)]) };
  });

  // ---------- films ----------
  const F = [
    ['Turks Fruit', 1973], ['Jaws', 1975], ['Star Wars', 1977], ['Soldaat van Oranje', 1977], ['Alien', 1979], ['The Shining', 1980],
    ['E.T.', 1982], ['Ghostbusters', 1984], ['Back to the Future', 1985], ['Flodder', 1986], ['Home Alone', 1990], ['Terminator 2', 1991],
    ['Jurassic Park', 1993], ['The Lion King', 1994], ['Pulp Fiction', 1994], ['Forrest Gump', 1994], ['Toy Story', 1995], ['Titanic', 1997],
    ['The Matrix', 1999], ['Gladiator', 2000], ['Shrek', 2001], ['Harry Potter en de Steen der Wijzen', 2001], ['Finding Nemo', 2003],
    ['Zwartboek', 2006], ['Alles is Liefde', 2007], ['The Dark Knight', 2008], ['Avatar', 2009], ['Inception', 2010], ['The Avengers', 2012],
    ['Frozen', 2013], ['Mad Max: Fury Road', 2015], ['Get Out', 2017], ['Joker', 2019], ['Parasite', 2019], ['Dune', 2021],
    ['Oppenheimer', 2023], ['Barbie', 2023],
  ].map(([t, y]) => ({ t, y, key: 'f' + GN.hash(t) }));
  GN.addGenerator('film', 'order', (rand) => {
    const s = spread(rand, F, 4, (f) => f.y, gap(3));
    if (!s) return null;
    return { id: idOf('g:film', s, (f) => f.key), type: 'order', q: 'Zet deze films op jaar van verschijnen', lo: 'Oudst', hi: 'Nieuwst', items: s.map((f) => [f.t, f.y, String(f.y)]) };
  });
  GN.addGenerator('film', 'num', (rand) => {
    const f = pick(rand, F);
    return { id: 'g:fy:' + f.key, type: 'num', q: `In welk jaar kwam "${f.t}" uit?`, answer: f.y };
  });
})();
