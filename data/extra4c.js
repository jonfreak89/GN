/* Nog meer extra vragen voor bestaande categorieën */

GN.addQuestions('nederland', [
  { type: 'mc', q: 'Wat is een "uitsmijter"?', a: ['Brood met ham of kaas en gebakken eieren', 'Een dansje aan het eind van een feest', 'Een kaartspel', 'Een soort pannenkoek met spek'] },
  { type: 'mc', q: 'Welke stad heeft de bijnaam "de Hofstad"?', a: ['Den Haag', 'Utrecht', '\'s-Hertogenbosch', 'Apeldoorn'] },
]);

GN.addQuestions('geschiedenis', [
  { type: 'mc', q: 'Wie was de eerste vrouw die regerend koningin van Nederland werd?', a: ['Wilhelmina', 'Emma', 'Juliana', 'Beatrix'] },
  { type: 'mc', q: 'Welk land verkocht Louisiana in 1803 aan de Verenigde Staten?', a: ['Frankrijk', 'Spanje', 'Engeland', 'Mexico'] },
  { type: 'num', q: 'In welk jaar werd Wilhelmina koningin (onder voogdij van haar moeder)?', answer: 1890 },
  { type: 'bluff', q: 'De Vikingen noemden het Amerikaanse land dat zij rond het jaar 1000 bereikten ___.', answer: 'Vinland', decoys: ['Groenland', 'Westland', 'Leifsland'] },
  { type: 'tf', q: 'De Vikingen kwamen eerder in Amerika dan Columbus.', a: true },
]);

GN.addQuestions('wetenschap', [
]);

GN.addQuestions('dieren', [
  { type: 'bluff', q: 'Een kangoeroe kan niet ___ lopen.', answer: 'achteruit', decoys: ['zijwaarts', 'langzaam', 'op drie poten'] },
  { type: 'tf', q: 'Zeepaardjes-mannetjes worden zwanger.', a: true },
]);

GN.addQuestions('eten', [
  { type: 'mc', q: 'Uit welk land komt de croissant oorspronkelijk (als "kipferl")?', a: ['Oostenrijk', 'Frankrijk', 'België', 'Zwitserland'] },
  { type: 'mc', q: 'Wat is "draadjesvlees"?', a: ['Lang gestoofd rundvlees dat uit elkaar valt', 'Vlees met touwtjes eromheen', 'Gedroogde worst', 'Vlees van de draadjesgrill'] },
  { type: 'tf', q: 'Ketchup heet zo naar een Chinese vissaus.', a: true, fact: 'Het woord komt waarschijnlijk van "ke-tsiap" uit Zuid-China.' },
]);

GN.addQuestions('film', [
  { type: 'mc', q: 'Welk dier zit er in de beroemde scène van The Godfather in het bed van een filmbaas?', a: ['Het hoofd van een paard', 'Een levende slang', 'Een dode vis', 'Een kat'] },
  { type: 'mc', q: 'In welke Pixar-film is een rat een topkok in Parijs?', a: ['Ratatouille', 'Coco', 'Luca', 'Soul'] },
  { type: 'tf', q: 'In de film Psycho uit 1960 werd chocoladesiroop gebruikt als nepbloed.', a: true },
]);

GN.addQuestions('games', [
  { type: 'mc', q: 'In welk spel race je als Mario met schildpadschilden en bananen?', a: ['Mario Kart', 'Mario Party', 'Super Smash Bros.', 'Crash Team Racing'] },
  { type: 'tf', q: 'Sonic de egel is blauw omdat dat de kleur van het Sega-logo is.', a: true },
]);

GN.addQuestions('muziek', [
  { type: 'tf', q: 'Mozart was al als kind een beroemde componist.', a: true },
]);

GN.addQuestions('weetjes', [
  { type: 'mc', q: 'Hoeveel kleuren heeft een regenboog volgens het klassieke rijtje?', a: ['Zeven', 'Vijf', 'Zes', 'Negen'] },
]);

GN.addQuestions('uitvindingen', [
  { type: 'mc', q: 'Wat was de "Dymaxion-auto" uit 1933?', a: ['Een driewielige druppelvormige auto die nooit in productie ging', 'De eerste elektrische auto', 'Een vliegende auto', 'Een auto zonder stuur'] },
]);

GN.addQuestions('internet', [
  { type: 'mc', q: 'Welke kat met een chagrijnig gezicht werd rond 2012 wereldberoemd?', a: ['Grumpy Cat', 'Nyan Cat', 'Keyboard Cat', 'Garfield'] },
  { type: 'mc', q: 'Wat is een "captcha"?', a: ['Een testje om te bewijzen dat je geen robot bent', 'Een virus', 'Een soort wachtwoord', 'Een online winkelmandje'] },
  { type: 'tf', q: 'Het woord "emoji" komt uit het Japans.', a: true, fact: 'Het betekent ongeveer "plaatje-teken" en heeft niets met "emotie" te maken.' },
]);

GN.addQuestions('records', [
  { type: 'tf', q: 'De Burj Khalifa staat in Dubai.', a: true },
]);

GN.addQuestions('morbide', [
  { type: 'tf', q: 'Je kunt na je dood je lichaam laten composteren tot aarde, in sommige Amerikaanse staten.', a: true },
]);

GN.addQuestions('middeleeuwen', [
  { type: 'mc', q: 'Wat was een "privaat" op een kasteel?', a: ['Een toilet dat uitkwam boven de gracht', 'Een geheime kamer', 'Een privékapel', 'Een lijfwacht'] },
  { type: 'mc', q: 'Wat kregen middeleeuwse kinderen soms tegen kiespijn?', a: ['Een gebed tot de heilige Apollonia', 'Een fluor-tandpasta', 'Suikerwater', 'Niets: kiespijn bestond niet'] },
]);

GN.addQuestions('rampen', [
  { type: 'mc', q: 'Welk schip kapseisde in 1987 bij Zeebrugge omdat de boegdeuren openstonden?', a: ['De Herald of Free Enterprise', 'De Estonia', 'De Costa Concordia', 'De Prinses Juliana'] },
  { type: 'tf', q: 'De kapitein van de Costa Concordia verliet het schip voordat iedereen eraf was.', a: true },
]);

GN.addQuestions('truecrime', [
  { type: 'mc', q: 'Welk beroemd Amerikaans gevangeniseiland bij San Francisco gold als onontsnapbaar?', a: ['Alcatraz', 'Rikers Island', 'Sing Sing', 'Riker\'s Rock'] },
  { type: 'mc', q: 'Hoe ontsnapten drie gevangenen in 1962 mogelijk van Alcatraz?', a: ['Met een zelfgemaakt vlot van regenjassen', 'Via een tunnel onder de zee', 'Verstopt in de vuilniswagen', 'Met een helikopter'] },
  { type: 'tf', q: 'Van de drie Alcatraz-ontsnappers uit 1962 is nooit bewezen of ze het overleefden.', a: true },
]);

GN.addQuestions('laatstewoorden', [
  { type: 'mc', q: 'Welke componist zou op zijn sterfbed hebben gezegd: "Ik zal in de hemel horen"?', a: ['Ludwig van Beethoven', 'Mozart', 'Bach', 'Chopin'] },
  { type: 'num', q: 'In welk jaar overleed Thomas Edison?', answer: 1931 },
  { type: 'tf', q: 'Thomas Edisons laatste adem zou in een reageerbuisje zijn bewaard.', a: true, fact: 'Het buisje ligt in het Henry Ford Museum.' },
]);

GN.addQuestions('schandalen', [
  { type: 'mc', q: 'Welk Nederlands bankschandaal draaide in 2013 om het sjoemelen met rentetarieven (Libor)?', a: ['Rabobank', 'ING', 'ABN AMRO', 'SNS'] },
  { type: 'tf', q: 'Het Watergate-schandaal begon met een inbraak in een kantoorgebouw.', a: true },
]);

GN.addQuestions('lichaam', [
  { type: 'mc', q: 'Welk bot is het langste van het lichaam?', a: ['Het dijbeen', 'Het scheenbeen', 'De opperarm', 'Het ruggengraat'] },
  { type: 'mc', q: 'Waarom rommelt je buik?', a: ['Gas en vocht schuiven door je darmen', 'Je maag praat tegen je hersenen', 'Je ribben wrijven langs elkaar', 'Je lever krimpt'] },
]);

GN.addQuestions('liefde', [
  { type: 'tf', q: 'In Nederland werd in 2001 als eerste land ter wereld het homohuwelijk mogelijk.', a: true },
]);

GN.addQuestions('dating', [
  { type: 'mc', q: 'Wat is "haunting"?', a: ['Een ex die na ghosting ineens weer opduikt', 'Een date in een spookhuis', 'Iemand stalken op straat', 'Een eng sms\'je sturen'] },
]);
