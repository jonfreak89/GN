/* Game Night – extra inhoud (deel 1): De Puzzel, Hoger of lager, Top 5, Echt of verzonnen,
   Invulverhaal en Verhalenketting. Laadt na de oorspronkelijke bestanden en vult ze aan. */
(function (root) {
  const GN = root.GN;

  // ---------------- De Puzzel ----------------
  GN.PUZZELS.push(
    { id: 'p25', groups: [
      { name: 'Soorten pasta', words: ['Penne', 'Fusilli', 'Farfalle', 'Lasagne'] },
      { name: 'Italiaanse voetbalclubs', words: ['Juventus', 'Lazio', 'Napoli', 'Fiorentina'] },
      { name: 'Italiaanse automerken', words: ['Ferrari', 'Fiat', 'Lancia', 'Maserati'] },
    ] },
    { id: 'p26', groups: [
      { name: 'Snacks uit de muur', words: ['Frikandel', 'Kroket', 'Kaassoufflé', 'Bamischijf'] },
      { name: 'Zoetigheid bij de bakker', words: ['Tompoes', 'Moorkop', 'Bossche bol', 'Appelflap'] },
      { name: 'Broodbeleg', words: ['Hagelslag', 'Pindakaas', 'Appelstroop', 'Muisjes'] },
    ] },
    { id: 'p27', groups: [
      { name: '… + pot', words: ['Bloem', 'Pis', 'Kook', 'Spaar'] },
      { name: '… + boom', words: ['Kerst', 'Appel', 'Stam', 'Slag'] },
      { name: '… + bank', words: ['Zand', 'Thee', 'Bloed', 'Tuin'] },
    ] },
    { id: 'p28', groups: [
      { name: 'Beatles', words: ['John', 'Paul', 'George', 'Ringo'] },
      { name: 'Teletubbies', words: ['Tinky Winky', 'Dipsy', 'Laa-Laa', 'Po'] },
      { name: 'Spice Girls (bijnamen)', words: ['Scary', 'Sporty', 'Baby', 'Posh'] },
    ] },
    { id: 'p29', groups: [
      { name: 'Kledingstukken', words: ['Trui', 'Rok', 'Jas', 'Broek'] },
      { name: 'Schoenen', words: ['Sneaker', 'Laars', 'Pump', 'Klomp'] },
      { name: 'Hoofddeksels', words: ['Pet', 'Muts', 'Baret', 'Bolhoed'] },
    ] },
    { id: 'p30', groups: [
      { name: 'Provincies', words: ['Drenthe', 'Zeeland', 'Flevoland', 'Limburg'] },
      { name: 'Belgische provincies', words: ['Antwerpen', 'Henegouwen', 'Namen', 'Luik'] },
      { name: 'Duitse deelstaten', words: ['Beieren', 'Saksen', 'Hessen', 'Brandenburg'] },
    ] },
    { id: 'p31', groups: [
      { name: 'Dingen met een kater', words: ['Hoofdpijn', 'Dorst', 'Spijt', 'Misselijkheid'] },
      { name: 'Op een festival', words: ['Dixi', 'Polsbandje', 'Muntjes', 'Tent'] },
      { name: 'In de kroeg', words: ['Tap', 'Bierviltje', 'Barkruk', 'Dartbord'] },
    ] },
    { id: 'p32', groups: [
      { name: 'Edelstenen', words: ['Robijn', 'Saffier', 'Smaragd', 'Diamant'] },
      { name: 'Metalen', words: ['Koper', 'IJzer', 'Zink', 'Tin'] },
      { name: 'Huwelijksjubilea', words: ['Papier', 'Katoen', 'Hout', 'Porselein'] },
    ] },
    { id: 'p33', groups: [
      { name: 'Vingers', words: ['Duim', 'Wijsvinger', 'Middelvinger', 'Pink'] },
      { name: 'Botten', words: ['Dijbeen', 'Sleutelbeen', 'Schedel', 'Kaak'] },
      { name: 'Organen', words: ['Lever', 'Milt', 'Nier', 'Long'] },
    ] },
    { id: 'p34', groups: [
      { name: 'Muziekinstrumenten', words: ['Viool', 'Trompet', 'Harp', 'Fagot'] },
      { name: 'Dansstijlen', words: ['Breakdance', 'Ballet', 'Flamenco', 'Twerken'] },
      { name: 'Zangstemmen', words: ['Sopraan', 'Alt', 'Tenor', 'Bas'] },
    ] },
    { id: 'p35', groups: [
      { name: 'Huisdieren', words: ['Hamster', 'Cavia', 'Konijn', 'Parkiet'] },
      { name: 'Dieren op de boerderij', words: ['Varken', 'Geit', 'Schaap', 'Koe'] },
      { name: 'Dieren in de Afrikaanse savanne', words: ['Leeuw', 'Zebra', 'Giraf', 'Neushoorn'] },
    ] },
    { id: 'p36', groups: [
      { name: '… + zak', words: ['Vuilnis', 'Slaap', 'Rug', 'Zit'] },
      { name: '… + doos', words: ['Schoenen', 'Brood', 'Speel', 'Muziek'] },
      { name: '… + mand', words: ['Was', 'Picknick', 'Fiets', 'Hengsel'] },
    ] },
    { id: 'p37', groups: [
      { name: 'Rollen in Wie is de Mol', words: ['Mol', 'Kandidaat', 'Presentator', 'Afvaller'] },
      { name: 'Schaaktermen', words: ['Rokade', 'Schaak', 'Mat', 'Pat'] },
      { name: 'Voetbaltermen', words: ['Buitenspel', 'Penalty', 'Corner', 'Doelpunt'] },
    ] },
    { id: 'p38', groups: [
      { name: 'Begrafenis', words: ['Kist', 'Urn', 'Rouwkaart', 'Lijkwagen'] },
      { name: 'Bruiloft', words: ['Sluier', 'Ringen', 'Bruidstaart', 'Ja-woord'] },
      { name: 'Geboorte', words: ['Beschuit', 'Kraamvisite', 'Luier', 'Ooievaar'] },
    ] },
    { id: 'p39', groups: [
      { name: 'Smurfen', words: ['Grote Smurf', 'Smurfin', 'Brilsmurf', 'Knutselsmurf'] },
      { name: 'Familie Flodder', words: ['Ma', 'Kees', 'Johnnie', 'Sjakie'] },
      { name: 'Efteling-figuren', words: ['Holle Bolle Gijs', 'Langnek', 'Pardoes', 'Jokie'] },
    ] },
    { id: 'p40', groups: [
      { name: 'Kaartspellen', words: ['Pesten', 'Klaverjassen', 'Toepen', 'Hartenjagen'] },
      { name: 'Buitenspellen', words: ['Tikkertje', 'Verstoppertje', 'Hinkelen', 'Touwtjespringen'] },
      { name: 'Drankspellen', words: ['Beerpong', 'Mexen', 'Kingsen', 'Bussen'] },
    ] },
    { id: 'p41', groups: [
      { name: 'Valuta', words: ['Euro', 'Dollar', 'Yen', 'Roebel'] },
      { name: 'Oude Nederlandse munten', words: ['Gulden', 'Rijksdaalder', 'Dubbeltje', 'Stuiver'] },
      { name: 'Cryptomunten', words: ['Bitcoin', 'Ethereum', 'Dogecoin', 'Litecoin'] },
    ] },
    { id: 'p42', groups: [
      { name: 'Zweedse merken', words: ['IKEA', 'Volvo', 'Spotify', 'H&M'] },
      { name: 'Nederlandse merken', words: ['Philips', 'Heineken', 'Gazelle', 'Hema'] },
      { name: 'Duitse merken', words: ['Adidas', 'Haribo', 'Nivea', 'Miele'] },
    ] },
  );

  // ---------------- Hoger of lager ----------------
  const nf = (v) => GN.fmtNum(v);
  const L = (rows, unit, pre) => rows.map(([n, v]) => ({ n, v, show: (pre || '') + nf(v) + (unit ? ' ' + unit : '') }));
  const set = (id, title, emoji, hi, lo, items, gap) => GN.HL_SETS.push({ id, title, emoji, hi, lo, gap, items });
  set('uitvinding', 'Wat werd later uitgevonden?', '💡', 'Later', 'Eerder', [
    ['Boekdrukkunst (Gutenberg)', 1440], ['Stoommachine van Watt', 1769], ['Loopfiets', 1817], ['Telefoon', 1876], ['Gloeilamp van Edison', 1879],
    ['Auto van Benz', 1886], ['Radio', 1895], ['Vliegtuig van de gebroeders Wright', 1903], ['Televisie', 1926], ['Penicilline', 1928],
    ['Magnetron', 1945], ['Walkman', 1979], ['Cd', 1982], ['Gameboy', 1989], ['World Wide Web', 1989], ['Google', 1998],
    ['Facebook', 2004], ['YouTube', 2005], ['iPhone', 2007], ['Post-it-briefje', 1980],
  ].map(([n, v]) => ({ n, v, show: String(v) })), 0.0001);
  set('afstand', 'Welke stad ligt verder van Amsterdam (hemelsbreed)?', '✈️', 'Verder', 'Dichterbij', L([
    ['Londen', 360], ['Parijs', 430], ['Berlijn', 575], ['Kopenhagen', 620], ['Praag', 710], ['Oslo', 915], ['Wenen', 935],
    ['Barcelona', 1240], ['Rome', 1295], ['Madrid', 1480], ['Lissabon', 1860], ['Istanbul', 2210], ['New York', 5860],
    ['Bangkok', 9200], ['Tokio', 9300], ['Rio de Janeiro', 9550], ['Kaapstad', 9650], ['Sydney', 16650],
  ], 'km', '± '), 0.12);
  set('draagtijd', 'Welk dier is langer zwanger?', '🤰', 'Langer', 'Korter', L([
    ['Muis', 20], ['Konijn', 31], ['Hond', 63], ['Leeuw', 110], ['Varken', 114], ['Schaap', 150], ['Gorilla', 255],
    ['Mens', 280], ['Paard', 340], ['Giraf', 450], ['Olifant', 650],
  ], 'dagen', '± '), 0.15);
  set('stadions', 'Welk stadion heeft meer plaatsen?', '🏟️', 'Meer', 'Minder', L([
    ['Camp Nou (Barcelona)', 99000], ['Wembley (Londen)', 90000], ['Santiago Bernabéu (Madrid)', 83000], ['Signal Iduna Park (Dortmund)', 81000],
    ['Allianz Arena (München)', 75000], ['Old Trafford (Manchester)', 74000], ['Johan Cruijff ArenA', 55000], ['De Kuip', 47500],
    ['Philips Stadion', 35000], ['Abe Lenstra Stadion', 26000], ['GelreDome', 21000], ['Stadion Galgenwaard', 23000],
  ], 'plaatsen', '± '), 0.07);
  set('levensduur', 'Wie werd ouder?', '🪦', 'Ouder', 'Jonger', L([
    ['Kurt Cobain', 27], ['Mozart', 35], ['Vincent van Gogh', 37], ['John Lennon', 40], ['Elvis Presley', 42], ['Freddie Mercury', 45],
    ['Michael Jackson', 50], ['Napoleon', 51], ['William Shakespeare', 52], ['Prince', 57], ['Rembrandt', 63], ['Charles Darwin', 73],
    ['Albert Einstein', 76], ['Winston Churchill', 90], ['Pablo Picasso', 91], ['Koningin Elizabeth II', 96],
  ], 'jaar'), 0.05);

  // ---------------- Top 5 ----------------
  GN.TOP5.push(
    { q: 'Welke klus stelt {naam} het langst uit?', self: 'Welke klus stel jij het langst uit?', items: ['Belastingaangifte', 'Tandarts bellen', 'Kledingkast opruimen', 'Ramen lappen', 'Banden oppompen'], lo: 'Het langst', hi: 'Doet het meteen' },
    { q: 'Welke app opent {naam} het vaakst?', self: 'Welke app open jij het vaakst?', items: ['WhatsApp', 'Instagram', 'TikTok', 'Buienradar', 'Bank-app'], lo: 'Het vaakst', hi: 'Bijna nooit' },
    { q: 'Wat drinkt {naam} het liefst?', self: 'Wat drink jij het liefst?', items: ['Bier', 'Wijn', 'Cola', 'Koffie', 'Water'], lo: 'Favoriet', hi: 'Hoeft niet' },
    { q: 'Welk tv-programma kijkt {naam} het liefst?', self: 'Welk tv-programma kijk jij het liefst?', items: ['Wie is de Mol', 'Boer zoekt vrouw', 'Het journaal', 'Voetbal', 'Een kookprogramma'], lo: 'Liefst', hi: 'Zapt weg' },
    { q: 'Welke Nederlandse stad vindt {naam} het leukst?', self: 'Welke Nederlandse stad vind jij het leukst?', items: ['Amsterdam', 'Rotterdam', 'Utrecht', 'Maastricht', 'Groningen'], lo: 'Leukst', hi: 'Hoeft niet' },
    { q: 'Wat doet {naam} het liefst op zondag?', self: 'Wat doe jij het liefst op zondag?', items: ['Uitslapen', 'Wandelen', 'Netflixen', 'Familiebezoek', 'Sporten'], lo: 'Liefst', hi: 'Nooit' },
    { q: 'Wat neemt {naam} mee naar een onbewoond eiland?', self: 'Wat neem jij mee naar een onbewoond eiland?', items: ['Mes', 'Aansteker', 'Telefoon met zonnelader', 'Een goed boek', 'Een kist bier'], lo: 'Eerst', hi: 'Laatst' },
    { q: 'Welke klus kan {naam} het best?', self: 'Welke klus kun jij het best?', items: ['Koken', 'Klussen', 'Schoonmaken', 'Tuinieren', 'Regelen en plannen'], lo: 'Het best', hi: 'Hopeloos' },
    { q: 'Waar wordt {naam} het blijst van?', self: 'Waar word jij het blijst van?', items: ['Een cadeautje', 'Een compliment', 'Een vrije dag', 'Lekker eten', 'Een knuffel'], lo: 'Het blijst', hi: 'Mwah' },
    { q: 'Welk dier zou {naam} het liefst zijn?', self: 'Welk dier zou jij het liefst zijn?', items: ['Kat', 'Arend', 'Dolfijn', 'Luiaard', 'Leeuw'], lo: 'Liefst', hi: 'Nooit' },
    { q: 'Wat ergert {naam} het meest in het verkeer?', self: 'Wat ergert jou het meest in het verkeer?', items: ['Bumperklevers', 'Fietsers zonder licht', 'Mensen die niet ritsen', 'Rotondes', 'Parkeren'], lo: 'Het ergst', hi: 'Boeit niet' },
    { q: 'Welk snoepje kiest {naam} het eerst?', self: 'Welk snoepje kies jij het eerst?', items: ['Drop', 'Winegums', 'Chocola', 'Spekjes', 'Zure matten'], lo: 'Eerste keus', hi: 'Laatste keus' },
    { q: 'Hoe komt {naam} het liefst op het werk?', self: 'Hoe kom jij het liefst op het werk?', items: ['Fiets', 'Auto', 'Trein', 'Lopen', 'Thuiswerken'], lo: 'Liefst', hi: 'Nooit' },
    { q: 'Welke muziek zet {naam} het eerst op?', self: 'Welke muziek zet jij het eerst op?', items: ['Nederlandstalig', 'Pop', 'Rock', 'Dance', 'Hiphop'], lo: 'Eerst', hi: 'Nooit' },
    // pittig
    { q: 'Waar zou {naam} het eerst stiekem op bezuinigen?', self: 'Waar zou jij het eerst stiekem op bezuinigen?', items: ['Cadeaus', 'Boodschappen', 'Kleding', 'Uitgaan', 'Vakantie'], lo: 'Het eerst', hi: 'Nooit', spice: 2 },
    { q: 'Wat zou {naam} het eerst doen als de wereld morgen vergaat?', self: 'Wat zou jij het eerst doen als de wereld morgen vergaat?', items: ['Dronken worden', 'Familie bellen', 'Opbiechten wat ik ooit deed', 'Mijn baas de waarheid zeggen', 'Gewoon slapen'], lo: 'Eerst', hi: 'Laatst', spice: 2 },
    { q: 'Wie zou {naam} het eerst uit de groepsapp gooien?', self: 'Wie zou jij het eerst uit de groepsapp gooien?', items: ['Wie alleen memes stuurt', 'Wie spraakberichten stuurt', 'Wie nooit reageert', 'Wie alles met emoji\'s zegt', 'Wie om 6 uur \'s ochtends appt'], lo: 'Eerst eruit', hi: 'Mag blijven', spice: 2 },
    { q: 'Wat is voor {naam} de ergste kater-activiteit?', self: 'Wat is voor jou de ergste kater-activiteit?', items: ['Verjaardag bij de schoonfamilie', 'Werken', 'Autorijden', 'Sporten', 'Boodschappen doen'], lo: 'Het ergst', hi: 'Valt mee', spice: 2 },
    { q: 'Welke leugen vertelt {naam} het vaakst?', self: 'Welke leugen vertel jij het vaakst?', items: ['"Ik ben onderweg"', '"Leuk cadeau!"', '"Ik heb je appje niet gezien"', '"Ik drink niet zoveel"', '"Ik heb al gegeten"'], lo: 'Het vaakst', hi: 'Nooit', spice: 2 },
    { q: 'Hoe wil {naam} het liefst begraven worden?', self: 'Hoe wil jij het liefst begraven worden?', items: ['Gewoon in een kist', 'Gecremeerd en uitgestrooid op zee', 'Als boom geplant', 'Opgezet in de huiskamer', 'In een kist vol bier'], lo: 'Liefst', hi: 'Nooit', spice: 2 },
    // stout
    { q: 'Wat vindt {naam} het ergst om betrapt op te worden?', self: 'Wat vind jij het ergst om betrapt op te worden?', items: ['Zoekgeschiedenis', 'Dansen voor de spiegel', 'Praten tegen jezelf', 'Neuspeuteren', 'Een scheet in de lift'], lo: 'Het ergst', hi: 'Boeit niet', spice: 3 },
    { q: 'Waar zou {naam} het eerst een onenightstand mee hebben?', self: 'Met wie zou jij het eerst een onenightstand hebben?', items: ['Een barman', 'Een collega', 'Een ex', 'Een buitenlandse toerist', 'De beste vriend van een ex'], lo: 'Eerst', hi: 'Nooit', spice: 3 },
    { q: 'Welk gênant moment herinnert {naam} zich het liefst niet?', self: 'Welk gênant moment herinner jij je liever niet?', items: ['Dronken overgeven', 'Verkeerde naam in bed', 'Naaktfoto naar verkeerde persoon', 'Struikelen op een podium', 'Huilen op een feestje'], lo: 'Het ergst', hi: 'Kan erom lachen', spice: 3 },
    { q: 'Wat doet {naam} het liefst in bed (behalve slapen)?', self: 'Wat doe jij het liefst in bed (behalve slapen)?', items: ['Seks', 'Netflixen', 'Eten', 'Scrollen op je telefoon', 'Lezen'], lo: 'Liefst', hi: 'Nooit', spice: 3 },
    { q: 'Hoe zou {naam} het liefst dood gevonden worden?', self: 'Hoe zou jij het liefst dood gevonden worden?', items: ['Vredig in bed', 'Op de wc', 'Met een fles whisky in de hand', 'In de armen van een minnaar', 'Midden in een feestje'], lo: 'Liefst', hi: 'Echt niet', spice: 3 },
  );

  // ---------------- Echt of verzonnen ----------------
  GN.ECHT.push(
    { q: 'In 1925 verkocht de oplichter Victor Lustig in Parijs ___.', answer: 'de Eiffeltoren, als oud ijzer, aan een schroothandelaar', decoys: ['de Mona Lisa aan een Amerikaanse miljonair', 'de Arc de Triomphe aan een Engelse lord', 'de Seine aan een Belgisch waterbedrijf'], fact: 'Hij deed zich voor als regeringsambtenaar. De koper schaamde zich zo dat hij niet eens aangifte deed.' },
    { q: 'In 1859 ontstond tussen de VS en Groot-Brittannië de "Varkensoorlog" om een eiland. De enige dode was ___.', answer: 'een varken', decoys: ['een Britse generaal die van zijn paard viel', 'een boer die een kanonskogel opving', 'een soldaat die zich doodlachte'], fact: 'Een Amerikaanse boer schoot een Brits varken dat zijn aardappels opat. Daarna stonden er jarenlang soldaten tegenover elkaar, zonder te schieten.' },
    { q: 'In 2007 kwamen 170 Zwitserse soldaten tijdens een nachtelijke oefening per ongeluk ___.', answer: 'een paar kilometer Liechtenstein binnen', decoys: ['in het Vaticaan terecht', 'midden in een Duitse kerstmarkt uit', 'vast te zitten in een skilift'], fact: 'Ze waren in het donker verdwaald. Liechtenstein heeft geen leger en merkte het pas later. Het werd met een telefoontje opgelost.' },
    { q: 'In 1923 won de jockey Frank Hayes in New York een paardenrace, ook al ___.', answer: 'was hij tijdens de race overleden aan een hartaanval', decoys: ['zat hij achterstevoren op zijn paard', 'was zijn paard halverwege gestopt om te grazen', 'had hij nog nooit eerder op een paard gezeten'], fact: 'Hij bleef in het zadel hangen tot over de finish. Het paard heette Sweet Kiss en kreeg daarna de bijnaam "Sweet Kiss of Death".' },
    { q: 'Hans Steininger had in de 16e eeuw een van de langste baarden ter wereld. Hij overleed toen hij ___.', answer: 'tijdens een brand over zijn eigen baard struikelde', decoys: ['zijn baard per ongeluk in een molen liet vastlopen', 'erin verstrikt raakte tijdens het zwemmen', 'erin stikte tijdens zijn slaap'], fact: 'Normaal droeg hij de baard opgerold in een leren buidel. Zijn baard ligt nog altijd in een museum in Braunau.' },
    { q: 'De Zweedse koning Adolf Frederik stierf in 1771 nadat hij ___.', answer: 'een enorm diner had gegeten met als toetje veertien semla-broodjes', decoys: ['een weddenschap verloor wie de meeste haring kon eten', 'een hele fles brandewijn in één teug opdronk', 'vergiftigde kaas had gekregen van zijn kok'], fact: 'Semla is een broodje met amandelspijs en slagroom. In Zweden kennen ze hem nog als "de koning die zich doodat".' },
    { q: 'Tijdens de Tweede Wereldoorlog had het Poolse leger een officiële soldaat die ___ was.', answer: 'een bruine beer, Wojtek, die munitiekisten sjouwde', decoys: ['een chimpansee die de radio bediende', 'een hond die tot korporaal werd bevorderd', 'een papegaai die codes kon onthouden'], fact: 'Wojtek dronk bier, rookte (at) sigaretten en kreeg een eigen soldijboek. Hij overleed in 1963 in de dierentuin van Edinburgh.' },
    { q: 'Omdat honden op zijn universiteit in Cambridge verboden waren, nam de dichter Lord Byron ___.', answer: 'een tamme beer mee naar zijn kamer', decoys: ['een wolf mee die hij als kat liet registreren', 'een geit mee die hij "mijn hond" noemde', 'een krokodil mee in zijn badkuip'], fact: 'Er stond niets over beren in de regels. Byron stelde voor de beer als student in te schrijven.' },
    { q: 'De Britse officier "Mad Jack" Churchill vocht in de Tweede Wereldoorlog met ___.', answer: 'pijl en boog, een zwaard en een doedelzak', decoys: ['alleen een kruisboog en een paraplu', 'een hockeystick en een kogelvrije bolhoed', 'een speer en een trompet'], fact: 'Hij schoot in 1940 een Duitse soldaat neer met een pijl. Hij zei: "Een officier die zonder zwaard ten strijde trekt, is niet goed gekleed."' },
    { q: 'Mark Twain werd in 1835 geboren toen de komeet van Halley langskwam. Hij voorspelde dat ___.', answer: 'hij zou sterven als de komeet terugkwam, en dat gebeurde in 1910', decoys: ['hij de komeet ooit zelf met een telescoop zou ontdekken', 'het einde van de wereld zou komen bij de volgende komeet', 'hij een boek over de komeet zou schrijven, wat nooit lukte'], fact: 'Hij overleed een dag nadat de komeet het dichtst bij de aarde was.' },
    { q: 'Tsaar Peter de Grote van Rusland voerde in 1698 een belasting in op ___.', answer: 'baarden', decoys: ['hoeden', 'katten', 'te dikke buiken'], fact: 'Wie zijn baard wilde houden, moest betalen en kreeg een penning als bewijs. Hij wilde dat Russen er moderner, Europeser uitzagen.' },
    { q: 'De Zweedse koning Gustaaf III liet volgens de overlevering een experiment doen met twee gevangenen: de een moest elke dag koffie drinken, de ander thee. ___.', answer: 'De artsen die het onderzoek leidden, stierven het eerst, en de koning werd vermoord voor het af was', decoys: ['Beide gevangenen werden honderd en kregen gratie', 'De koffiedrinker ontsnapte omdat hij zo energiek werd', 'De koning dronk daarna alleen nog warme melk'], fact: 'Gustaaf wilde bewijzen dat koffie giftig was. De theedrinker zou het eerst zijn gestorven, op hoge leeftijd.' },
    { q: 'In de Eerste Wereldoorlog bracht de duif Cher Ami een bericht over de linies, ondanks dat ___.', answer: 'ze was neergeschoten, een oog kwijt was en een poot half hing', decoys: ['ze de verkeerde kant op vloog en via Parijs kwam', 'het bericht onderweg door een havik werd gegeten', 'ze onderweg eieren legde'], fact: 'Het bericht redde bijna 200 Amerikaanse soldaten. De duif kreeg een houten pootje en een medaille, en staat nu opgezet in een museum.' },
    { q: 'In 1858 stonk de Theems in Londen zo erg ("The Great Stink") dat ___.', answer: 'het parlement eindelijk geld gaf voor een groot riool', decoys: ['de koningin een maand naar Schotland vluchtte', 'Londenaren tijdelijk naar Brighton werden verhuisd', 'het water in de rivier werd geverfd om het te verbergen'], fact: 'De gordijnen van het parlement werden gedrenkt in kalk tegen de stank. Ingenieur Bazalgette bouwde daarna een riool dat nog steeds wordt gebruikt.' },
    { q: 'Keizer Caligula gaf zijn lievelingspaard Incitatus volgens de Romeinse verhalen ___.', answer: 'een marmeren stal, een ivoren voerbak en bijna een plaats in de Senaat', decoys: ['een eigen leger van honderd soldaten', 'het recht om in het Colosseum te vechten', 'een gouden graf naast dat van zijn vader'], fact: 'Hij zou het paard zelfs tot consul hebben willen benoemen, misschien vooral om de senatoren te pesten.' },
  );

  // ---------------- Invulverhaal ----------------
  GN.INVUL.push(
    { title: 'Het weerbericht', spice: 1, text: 'Goedenavond, hier is het weerbericht. Morgen wordt het {bijv} in {plaats}. Er valt {getal} millimeter {eten} uit de lucht, dus neem een {voorwerp} mee. In het zuiden waait een harde wind uit de richting van {bn}. Mensen met {kwaal} kunnen beter binnen blijven en {werkwoord}. Volgende week verwachten we een {dier} van {getal} meter hoog. {uitroep}!' },
    { title: 'Brief aan Sinterklaas', spice: 1, text: 'Lieve Sint, dit jaar ben ik heel {bijv} geweest. Ik heb maar {getal} keer {werkwoord} in de klas en ik heb de {dier} van de buren met rust gelaten. Mag ik dit jaar een {voorwerp}, een {voertuig} en een zak {eten}? Mijn broertje wil graag {bn} in zijn schoen. Groetjes van {naam}. PS: de wortel voor het paard ligt in de {plek}.' },
    { title: 'De reclame', spice: 1, text: 'Heeft u ook last van {kwaal}? Probeer dan de nieuwe {voorwerp} van {winkel}! Met één druk op de knop gaat hij {werkwoord}, en binnen {getal} seconden voelt u zich weer {bijv}. {bn} gebruikt hem elke dag: "{uitroep}, dit is beter dan {eten}!" Nu tijdelijk met gratis {kleding}. Bel snel!' },
    { title: 'Het schoolreisje', spice: 1, text: 'Op schoolreisje gingen we met een {voertuig} naar {plaats}. Meester {naam} had {getal} boterhammen met {eten} mee. In de bus zong iedereen {liedje}, tot de chauffeur "{uitroep}!" riep. In het pretpark zat een {dier} in de achtbaan en iemand verloor zijn {kleding}. Op de terugweg moest {naam} {werkwoord} in een {voorwerp}. Het was {bijv}.' },
    { title: 'De rouwadvertentie', spice: 2, text: 'Tot ons {bijv} verdriet is op {getal}-jarige leeftijd overleden: {naam}. Hij/zij stierf zoals hij/zij leefde: {werkwoord} in de {plek}, met een {voorwerp} in de hand. Wij zullen vooral zijn/haar {lichaamsdeel} missen, en de geur van {eten}. Tijdens de uitvaart in {plaats} draait {bn} {liedje}. Geen bloemen, wel {drank}.' },
    { title: 'Klacht aan de klantenservice', spice: 2, text: 'Geachte {winkel}, gisteren kocht ik bij u een {voorwerp}. Thuis bleek er een {dier} in te zitten dat de hele nacht "{geluid}" deed. Mijn partner werd er {emotie} van en mijn {lichaamsdeel} is nog steeds opgezwollen. Ik eis {getal} euro terug, plus een levenslange voorraad {eten}. Zo niet, dan stuur ik {bn} op u af. Met {bijv} groet, {naam}.' },
    { title: 'De bedrijfsborrel', spice: 2, text: 'Op de borrel van het werk dronk de directeur {getal} glazen {drank}. Daarna ging hij op de bar {werkwoord} in zijn {kleding}. Collega {naam} kreeg {kwaal} van de bitterballen en verstopte zich in de {plek}. Om middernacht riep iemand "{uitroep}!" en kwam {bn} binnen op een {voertuig}. Maandag deed iedereen heel {bijv}.' },
    { title: 'Mijn ex', spice: 3, text: 'Mijn ex was echt een {scheld}. In bed riep hij/zij altijd "{uitroep}!" en deed het altijd met een {kleding} aan. Hij/zij had een rare obsessie met {eten} en mijn {lichaamsdeel}. Na {getal} minuten was het al voorbij en ging hij/zij {werkwoord}. Het laatste wat ik hoorde: hij/zij woont nu in {plaats} met een {dier} en {bn}. Ik voel me vooral {emotie}.' },
    { title: 'Het wilde weekend', spice: 3, text: 'Vrijdagavond begon met {getal} shotjes {drank} in {plaats}. Om {tijd} stond ik ineens op de bar te {werkwoord} in alleen een {kleding}. Ik zoende met een {beroep} die naar {eten} smaakte. Zaterdag werd ik wakker in een {plek} naast een {dier} en een {voorwerp}. Mijn {lichaamsdeel} deed pijn en mijn telefoon stond vol met foto\'s van {bn}. {uitroep}.' },
    { title: 'De keuring bij de dokter', spice: 3, text: 'De dokter keek {bijv} naar mijn {lichaamsdeel} en zei: "{uitroep}! Dat heb ik in {getal} jaar nog niet gezien." Volgens hem kwam het door te veel {eten} en te weinig {werkwoord}. Hij schreef me een {voorwerp} voor, drie keer per dag in te nemen met {drank}. Bij het weggaan fluisterde de assistente: "Doe {bn} de groeten."' },
  );

  // ---------------- Verhalenketting ----------------
  GN.KETTING.push(
    { q: 'De Efteling ging dicht. Toen de laatste bezoeker weg was, kwam Holle Bolle Gijs langzaam overeind.' },
    { q: 'Mijn navigatie zei "sla rechtsaf" en ineens stond ik in het jaar 1672.' },
    { q: 'Het was de saaiste verjaardag ooit, tot tante Riek op tafel klom.' },
    { q: 'De kat keek me aan en zei, heel duidelijk: "We moeten praten."' },
    { q: 'In de vriezer van de nieuwe buren lag iets wat daar echt niet hoorde.' },
    { q: 'De burgemeester van Urk kondigde aan dat het dorp voortaan een eigen land was.' },
    { q: 'Op de bodem van de Amsterdamse gracht vonden duikers een kist met een slot en een briefje: "Niet openen, Henk."' },
    { q: 'Ik won de Staatsloterij, maar er stond een voorwaarde op het lot.' },
    { q: 'De tijdmachine werkte, alleen ging hij alleen maar naar verjaardagen.' },
    { q: 'Het eerste wat de astronauten op Mars vonden, was een Albert Heijn-bonnetje.' },
    { q: 'Opa was 104 en had nog één laatste wens.' },
    { q: 'Midden in de vergadering ging het brandalarm, en de baas sprong uit het raam.' },
    { q: 'Het spookhuis op de kermis bleek echt te spoken.' },
    { q: 'De sneeuwpop in de tuin stond elke ochtend een stukje dichter bij het raam.' },
    { q: 'Op de bruiloft stond de ex van de bruid ineens op met een microfoon.', spice: 2 },
    { q: 'De begrafenis van oom Gerrit liep al vanaf de eerste minuut uit de hand.', spice: 2 },
    { q: 'Na de twaalfde tequila had iemand het geniale idee om naar België te zwemmen.', spice: 2 },
    { q: 'Mijn Tinder-date bleek mijn nieuwe baas te zijn.', spice: 2 },
    { q: 'Het swingersfeest in Apeldoorn begon heel netjes met koffie en cake.', spice: 3 },
    { q: 'Ik werd wakker in een vreemd bed, met een tatoeage die ik niet kende.', spice: 3 },
    { q: 'De pastoor biechtte iets op aan mij, en ik wou dat hij dat niet had gedaan.', spice: 3 },
  );
})(typeof window !== 'undefined' ? window : globalThis);
