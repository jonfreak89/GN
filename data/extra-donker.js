/* Aanvulling 1: Donker */

GN.addQuestions('morbide', [
  { type: 'mc', q: 'Waarvoor kreeg een dode in de Griekse mythologie een muntje mee?', a: ['Om de veerman Charon te betalen', 'Om in de hemel eten te kopen', 'Als geluksbrenger', 'Om de goden om te kopen'] },
  { type: 'mc', q: 'Wat is een "body farm"?', a: ['Een terrein waar lichamen ontbinden voor forensisch onderzoek', 'Een sportschool', 'Een orgaanbank', 'Een begraafplaats voor dieren'] },
  { type: 'mc', q: 'Wat is "rigor mortis"?', a: ['Lijkstijfheid', 'Lijkgeur', 'Lijkvlekken', 'Lijkverbranding'] },
  { type: 'mc', q: 'Van welke componist werd na zijn dood het hoofd gestolen door schedelkundigen?', a: ['Joseph Haydn', 'Ludwig van Beethoven', 'Johann Sebastian Bach', 'Frédéric Chopin'], d: 3 },
  { type: 'mc', q: 'Waar hangen de botten van tienduizenden mensen als versiering in een kerk, inclusief een kroonluchter?', a: ['In Sedlec, Tsjechië', 'In Rome, Italië', 'In Parijs, Frankrijk', 'In Brugge, België'], d: 2 },
  { type: 'mc', q: 'Wat is een Darwin Award?', a: ['Een spotprijs voor wie op een extreem domme manier om het leven komt', 'Een prijs voor biologen', 'Een prijs voor het oudste huisdier', 'Een prijs voor overlevers'] },
  { type: 'mc', q: 'Welke Amerikaanse president overleed 32 dagen na een urenlange inauguratiespeech in de kou?', a: ['William Henry Harrison', 'Abraham Lincoln', 'John F. Kennedy', 'James Garfield'], d: 2 },
  { type: 'mc', q: 'Wat gebeurde er met de hersenen van Albert Einstein?', a: ['De patholoog nam ze zonder toestemming mee naar huis', 'Ze werden met hem begraven', 'Ze liggen in een museum in Bern', 'Ze werden verbrand'] },
  { type: 'mc', q: 'Wat is de wetenschappelijke naam van de angst voor de dood?', a: ['Thanatofobie', 'Tafofobie', 'Nyctofobie', 'Hemofobie'] },
  { type: 'mc', q: 'Wat deden Victorianen soms met het haar van overleden geliefden?', a: ['Er sieraden van maken', 'Het opeten', 'Het in de tuin begraven', 'Er kussens mee vullen'] },
  { type: 'num', q: 'Hoeveel dagen was William Henry Harrison president voordat hij stierf?', answer: 32, unit: 'dagen' },
  { type: 'num', q: 'Van hoeveel mensen ongeveer liggen de botten in het knekelhuis van Sedlec?', answer: 40000, unit: 'mensen', fact: 'Schattingen lopen van 40.000 tot 70.000.' },
  { type: 'bluff', q: 'Het gestolen hoofd van componist Haydn werd pas in ___ herenigd met zijn lichaam.', answer: '1954', decoys: ['1820', '1899', '2009'] },
  { type: 'bluff', q: 'In de knekelkerk van Sedlec hangt een kroonluchter met in elk geval één exemplaar van elk ___.', answer: 'bot uit het menselijk lichaam', accept: ['bot', 'menselijk bot', 'botje'], decoys: ['soort schedel', 'land ter wereld', 'kerkgebed'] },
]);

GN.addQuestions('middeleeuwen', [
  { type: 'mc', q: 'Wat was een nar?', a: ['Een grappenmaker aan het hof', 'Een soort beul', 'Een rondtrekkende monnik', 'Een belastinginner'] },
  { type: 'mc', q: 'Wat was "Sint-Antoniusvuur"?', a: ['Vergiftiging door een schimmel op rogge', 'Een heksenverbranding', 'Een feest met vreugdevuren', 'Een stadsbrand'] },
  { type: 'mc', q: 'Wat waren flagellanten?', a: ['Mensen die zichzelf geselden om de pest af te wenden', 'Vlaggendragers in een leger', 'Pestdokters', 'Rondtrekkende muzikanten'] },
  { type: 'mc', q: 'Waarvan maakten middeleeuwse monniken vaak inkt?', a: ['Galnoten (gallen van eikenbomen)', 'Inktvissen', 'Bessen en honing', 'Teer'], d: 2 },
  { type: 'mc', q: 'Wat proefden middeleeuwse artsen soms om een diagnose te stellen?', a: ['Urine', 'Bloed', 'Zweet', 'Oorsmeer'] },
  { type: 'mc', q: 'Wat was een "ordeal" of godsoordeel?', a: ['Een proef waarbij God je schuld of onschuld zou tonen', 'Een gebed voor de oogst', 'Een rechtszaak in de kerk', 'Een toernooi voor ridders'] },
  { type: 'mc', q: 'Waar sliepen veel arme middeleeuwse gezinnen?', a: ['Met z\'n allen in één bed of op stro', 'In hangmatten', 'Elk in een eigen kamer', 'Buiten onder de sterren'] },
  { type: 'mc', q: 'Waarom liepen middeleeuwse mensen op hoge houten zolen ("patijnen") door de stad?', a: ['Om niet door de modder en uitwerpselen te lopen', 'Om langer te lijken', 'Uit de mode', 'Om sneller te lopen'] },
  { type: 'mc', q: 'Wat was de dodendans (danse macabre)?', a: ['Een kunstthema waarin de dood met iedereen danst', 'Een feest na begrafenissen', 'Een ziekte', 'Een martelmethode'] },
  { type: 'num', q: 'In welk jaar begon de bouw van de Dom van Keulen?', answer: 1248 },
  { type: 'num', q: 'Hoeveel jaar duurde de bouw van de Dom van Keulen?', answer: 632, unit: 'jaar', fact: 'Van 1248 tot 1880, met een pauze van eeuwen.' },
  { type: 'bluff', q: 'Bij een "godsoordeel" moest een verdachte soms een gloeiend stuk ___ vasthouden.', answer: 'ijzer', decoys: ['steen', 'glas', 'hout'], fact: 'Genas de wond netjes, dan was je onschuldig.' },
  { type: 'bluff', q: 'Sint-Antoniusvuur veroorzaakte hallucinaties, omdat de schimmel lijkt op de stof in ___.', answer: 'LSD', accept: ['lsd', 'acid'], decoys: ['koffie', 'tabak', 'cacao'] },
  {
    type: 'order', q: 'Zet deze gebeurtenissen in de tijd', lo: 'Eerst', hi: 'Laatst',
    items: [['Karel de Grote keizer', 800], ['Slag bij Hastings', 1066], ['Bouw Dom van Keulen begint', 1248], ['Jeanne d\'Arc op de brandstapel', 1431], ['Gutenberg drukt zijn bijbel', 1455, '± 1455']],
  },
]);

GN.addQuestions('rampen', [
  { type: 'mc', q: 'Welke IJslandse vulkaan legde in 2010 het Europese luchtverkeer plat?', a: ['Eyjafjallajökull', 'Hekla', 'Katla', 'Grímsvötn'] },
  { type: 'mc', q: 'Welk VOC-schip leed in 1629 schipbreuk, gevolgd door een bloedige muiterij?', a: ['De Batavia', 'De Halve Maen', 'De Amsterdam', 'De Zeven Provinciën'] },
  { type: 'mc', q: 'Welke kerncentrale raakte in 2011 zwaar beschadigd door een tsunami?', a: ['Fukushima', 'Tsjernobyl', 'Three Mile Island', 'Borssele'] },
  { type: 'mc', q: 'Welk cruiseschip liep in 2012 op de rotsen bij het Italiaanse eiland Giglio?', a: ['De Costa Concordia', 'De Queen Mary 2', 'De Oasis of the Seas', 'De Carnival Splendor'] },
  { type: 'mc', q: 'Wat was de "millenniumbug"?', a: ['De angst dat computers 2000 als 1900 zouden lezen', 'Een virus uit 1999', 'Een insectenplaag', 'Een fout in de euro'] },
  { type: 'mc', q: 'Welke stad werd in 1906 verwoest door een aardbeving en branden?', a: ['San Francisco', 'Lissabon', 'Tokio', 'Los Angeles'] },
  { type: 'mc', q: 'Welke Amerikaanse spaceshuttle explodeerde in 1986 kort na de lancering?', a: ['De Challenger', 'De Columbia', 'De Discovery', 'De Atlantis'] },
  { type: 'mc', q: 'Wat gebeurde er in 1940 met de Tacoma Narrows-brug?', a: ['Hij ging golven in de wind en stortte in', 'Hij werd door een schip geramd', 'Hij zakte weg in de modder', 'Hij werd opgeblazen in de oorlog'] },
  { type: 'mc', q: 'Wat stortte in 1992 neer op flats in de Bijlmer?', a: ['Een vrachtvliegtuig van El Al', 'Een helikopter', 'Een militaire jet', 'Een satelliet'] },
  { type: 'mc', q: 'Welke Nederlandse plaats werd in 2001 getroffen door een cafébrand op oudejaarsnacht?', a: ['Volendam', 'Enschede', 'Urk', 'Edam'] },
  { type: 'num', q: 'In welk jaar was de Bijlmerramp?', answer: 1992 },
  { type: 'num', q: 'Na hoeveel seconden viel de Challenger in 1986 uit elkaar?', answer: 73, unit: 'seconden' },
  { type: 'num', q: 'Hoeveel mensen waren er ongeveer aan boord van de Costa Concordia?', answer: 4200, unit: 'mensen' },
  { type: 'bluff', q: 'De Tacoma Narrows-brug kreeg al voor de instorting de bijnaam "___ Gertie".', answer: 'Galloping', accept: ['galloping'], decoys: ['Wobbly', 'Dancing', 'Swinging'] },
  { type: 'bluff', q: 'De kapitein van de Costa Concordia zei dat hij per ongeluk in een ___ was gevallen.', answer: 'reddingsboot', accept: ['sloep', 'reddingssloep'], decoys: ['slaap', 'zwembad', 'trap'], fact: 'Hij werd later veroordeeld tot 16 jaar cel.' },
  {
    type: 'order', q: 'Zet deze rampen in de tijd', lo: 'Eerst', hi: 'Laatst',
    items: [['Aardbeving San Francisco', 1906], ['Tacoma Narrows-brug', 1940], ['Challenger', 1986], ['Bijlmerramp', 1992], ['Eyjafjallajökull', 2010], ['Fukushima', 2011]],
  },
]);

GN.addQuestions('truecrime', [
  { type: 'mc', q: 'Welk schilderij van Vermeer is sinds een museumroof in 1990 spoorloos?', a: ['Het concert', 'Het melkmeisje', 'Meisje met de parel', 'Het straatje'] },
  { type: 'mc', q: 'Waar werden in 2012 zeven schilderijen gestolen, onder meer van Picasso en Monet?', a: ['In de Kunsthal in Rotterdam', 'In het Rijksmuseum', 'In het Van Gogh Museum', 'In het Kröller-Müller Museum'] },
  { type: 'mc', q: 'Wat was de specialiteit van de Nederlandse vervalser Han van Meegeren?', a: ['Nep-Vermeers', 'Nep-bankbiljetten', 'Nep-paspoorten', 'Nep-diamanten'] },
  { type: 'mc', q: 'Hoe ontsnapte Han van Meegeren aan een veroordeling voor het verkopen van kunst aan Göring?', a: ['Door te bewijzen dat de "Vermeer" nep was', 'Door te vluchten naar Argentinië', 'Door gratie van de koningin', 'Hij werd nooit opgepakt'] },
  { type: 'mc', q: 'Welke beruchte seriemoordenaar in Californië stuurde gecodeerde brieven naar kranten en werd nooit gepakt?', a: ['De Zodiac Killer', 'Ted Bundy', 'The Night Stalker', 'De Green River Killer'] },
  { type: 'mc', q: 'Wat werd er buitgemaakt bij de Great Train Robbery van 1963 in Engeland?', a: ['Geld uit een posttrein', 'Goud uit de Bank of England', 'Kroonjuwelen', 'Een kist diamanten'] },
  { type: 'mc', q: 'Welke Britse moordenares werd in 1955 als laatste vrouw in het VK opgehangen?', a: ['Ruth Ellis', 'Myra Hindley', 'Mary Ann Cotton', 'Edith Thompson'], d: 3 },
  { type: 'mc', q: 'Welke Amerikaanse maffiabaas had de bijnaam "Scarface"?', a: ['Al Capone', 'Lucky Luciano', 'John Gotti', 'Bugsy Siegel'] },
  { type: 'mc', q: 'Wie was "de Teflon Don" (omdat aanklachten nooit bleven plakken)?', a: ['John Gotti', 'Al Capone', 'Frank Costello', 'Meyer Lansky'], d: 2 },
  { type: 'num', q: 'Hoeveel kunstwerken werden er in 1990 gestolen uit het Isabella Stewart Gardner Museum?', answer: 13 },
  { type: 'num', q: 'Hoeveel schilderijen werden er in 2012 gestolen uit de Kunsthal?', answer: 7 },
  { type: 'bluff', q: 'De Mexicaanse drugsbaron El Chapo ontsnapte in 2015 via een tunnel die begon onder zijn ___.', answer: 'douche', decoys: ['bed', 'wc', 'bureau'] },
  { type: 'bluff', q: 'Het Gardner Museum looft voor de gestolen kunst een beloning uit van ___ miljoen dollar.', answer: '10', accept: ['tien'], decoys: ['1', '50', '250'] },
  {
    type: 'order', q: 'Zet deze misdaden in de tijd', lo: 'Eerst', hi: 'Laatst',
    items: [['Proces tegen Han van Meegeren', 1947], ['Great Train Robbery', 1963], ['Eerste moorden Zodiac Killer', 1968], ['Gardner Museumroof', 1990], ['Kunstroof Kunsthal', 2012], ['Ontsnapping El Chapo', 2015]],
  },
]);

GN.addQuestions('laatstewoorden', [
  { type: 'mc', q: 'Welke beroemde "laatste woorden" komen eigenlijk uit een toneelstuk van Shakespeare?', a: ['"Ook jij, Brutus?"', '"Ik ben er nog niet klaar mee"', '"Het is volbracht"', '"Licht, meer licht!"'] },
  { type: 'mc', q: 'Waarover gingen de laatste woorden van Napoleon volgens de overlevering?', a: ['Frankrijk, het leger en Joséphine', 'Zijn verloren slag bij Waterloo', 'Zijn moeder', 'Het eten op Sint-Helena'] },
  { type: 'mc', q: 'Welke Franse taalkundige zei op zijn sterfbed dat "ik ga sterven" en "ik zal sterven" allebei correct zijn?', a: ['Dominique Bouhours', 'Voltaire', 'Victor Hugo', 'Molière'], d: 3 },
  { type: 'mc', q: 'Wie zei volgens de overlevering als laatste: "Meer licht!"?', a: ['Goethe', 'Thomas Edison', 'Galileo Galilei', 'Rembrandt'], d: 2 },
  { type: 'mc', q: 'Welke schrijver zei als laatste tegen zijn vrouw: "Je bent geweldig"?', a: ['Arthur Conan Doyle', 'Charles Dickens', 'Mark Twain', 'Roald Dahl'], d: 2 },
  { type: 'mc', q: 'Wie zei volgens de overlevering: "Ik heb God en de mensheid beledigd, omdat mijn werk niet de kwaliteit had die het had moeten hebben"?', a: ['Leonardo da Vinci', 'Michelangelo', 'Rembrandt', 'Van Gogh'], d: 2 },
  { type: 'mc', q: 'Wie zei volgens zijn broer Theo als laatste: "De droefheid zal eeuwig duren"?', a: ['Vincent van Gogh', 'Rembrandt', 'Johannes Vermeer', 'Piet Mondriaan'] },
  { type: 'num', q: 'Hoe oud werd Napoleon?', answer: 51, unit: 'jaar' },
  { type: 'num', q: 'In welk jaar stierf Vincent van Gogh?', answer: 1890 },
  { type: 'bluff', q: 'Archimedes zou als laatste tegen een Romeinse soldaat hebben gezegd: "Verstoor mijn ___ niet."', answer: 'cirkels', accept: ['cirkel', 'tekeningen'], decoys: ['formules', 'badkuip', 'slaap'] },
  { type: 'bluff', q: 'Op de grafsteen van komiek Spike Milligan staat: "Ik zei toch dat ik ___ was."', answer: 'ziek', decoys: ['grappig', 'beroemd', 'onsterfelijk'] },
  { type: 'bluff', q: 'Stan Laurel zei vlak voor zijn dood tegen zijn verpleegster dat hij nu liever aan het ___ was.', answer: 'skiën', accept: ['skien', 'skiën was'], decoys: ['zwemmen', 'dansen', 'vissen'], fact: 'Toen zij vroeg of hij skiede: "Nee, maar ik doe het liever dan dit."' },
  {
    type: 'order', q: 'Zet deze mensen op sterfjaar', lo: 'Eerst', hi: 'Laatst',
    items: [['Archimedes', -212, '212 v.Chr.'], ['Julius Caesar', -44, '44 v.Chr.'], ['Napoleon', 1821], ['Vincent van Gogh', 1890], ['Arthur Conan Doyle', 1930], ['Stan Laurel', 1965], ['Spike Milligan', 2002]],
  },
]);
