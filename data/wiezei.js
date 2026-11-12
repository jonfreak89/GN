/* Wie zei dit? Iedereen schrijft anoniem een antwoord, daarna raadt de groep wie wat schreef.
   bot = optionele antwoorden voor bots. */

GN.addPrompts([
  // braaf
  { type: 'wz', spice: 1, q: 'Wat zou je als eerste doen als je een dag onzichtbaar bent?', bot: ['Gratis de bioscoop in', 'Mijn baas bespieden', 'Taart uit de bakkerij pakken'] },
  { type: 'wz', spice: 1, q: 'Maak de zin af: mijn grootste talent dat niemand kent is…', bot: ['Met mijn oren wiebelen', 'Precies weten hoe laat het is zonder klok', 'Ruiken wat er voor eten is'] },
  { type: 'wz', spice: 1, q: 'Wat is je meest irritante gewoonte?', bot: ['Ik laat overal halflege glazen staan', 'Ik zing liedjes verkeerd mee', 'Ik zeg "nog vijf minuutjes"'] },
  { type: 'wz', spice: 1, q: 'Wat zou de titel van jouw autobiografie zijn?', bot: ['Het Kon Erger', 'Bijna Op Tijd', 'Wie Heeft Mijn Sleutels?'] },
  { type: 'wz', spice: 1, q: 'Wat is het raarste dat je ooit hebt gegeten?', bot: ['Kikkerbilletjes', 'Een sprinkhaan', 'Drop met kaas'] },
  { type: 'wz', spice: 1, q: 'Welke smoes heb je ooit gebruikt om ergens onderuit te komen?', bot: ['Mijn kat was ziek', 'Ik had een afspraak bij de tandarts', 'Mijn fietsband was lek'] },
  { type: 'wz', spice: 1, q: 'Wat is je guilty pleasure?', bot: ['Datingprogramma\'s kijken', 'Stiekem frikandellen', 'Schlagers'] },
  { type: 'wz', spice: 1, q: 'Wat is het domste dat je ooit hebt gekocht?', bot: ['Een fondueset die ik nooit gebruik', 'Een sportabonnement', 'Een bananenhouder'] },
  { type: 'wz', spice: 1, q: 'Welke wet zou je invoeren als je één dag de baas bent?', bot: ['Verplichte middagdutjes', 'Gratis patat op vrijdag', 'Maandag wordt afgeschaft'] },
  { type: 'wz', spice: 1, q: 'Waar was je als kind bang voor?', bot: ['Het putje van het bad', 'Clowns', 'De stofzuiger'] },
  { type: 'wz', spice: 1, q: 'Welke beroemdheid zou je willen zijn voor een dag, en waarom?', bot: ['De koning, voor de koekjes bij de thee', 'Beyoncé, voor de stem', 'Messi, om één keer goed te kunnen voetballen'] },
  { type: 'wz', spice: 1, q: 'Wat staat er in je zoekgeschiedenis van gisteren?', bot: ['Hoe lang kook je een ei', 'Weer morgen', 'Is mijn plant dood'] },
  // pittig
  { type: 'wz', spice: 2, q: 'Wat is je meest gênante moment ooit?', bot: ['Zwaaien naar iemand die niet naar mij zwaaide', 'Struikelen op een podium', 'Juf "mama" noemen'] },
  { type: 'wz', spice: 2, q: 'Welke regel heb je ooit gebroken waar niemand van weet?', bot: ['Zwartrijden in de trein', 'Snoep gejat bij de buurtsuper', 'Onder de 18 een biertje gedronken'] },
  { type: 'wz', spice: 2, q: 'Wat moet er op je grafsteen staan?', bot: ['Ik zei toch dat ik moe was', 'Eindelijk uitgeslapen', 'Terug na de reclame'] },
  { type: 'wz', spice: 2, q: 'Wat is het kinderachtigste dat je nog steeds doet?', bot: ['Snel de trap op rennen als het licht uit is', 'Kleuren in kleurboeken', 'Mijn knuffel meenemen op reis'] },
  { type: 'wz', spice: 2, q: 'Welke leugen vertel je het vaakst?', bot: ['Ik ben er over vijf minuten', 'Ik heb het gelezen', 'Lekker!'] },
  { type: 'wz', spice: 2, q: 'Wie zou je bellen om een lijk te helpen verstoppen, en waarom?', bot: ['Mijn oma, die vraagt niks', 'Mijn buurman, die heeft een schep', 'Niemand, ik doe het zelf'] },
  { type: 'wz', spice: 2, q: 'Wat is het ergste dat je ooit tegen een leraar of baas hebt gezegd?', bot: ['Dat zijn das lelijk was', 'Ik hoor u niet, de verbinding is slecht', 'Doe zelf eens normaal'] },
  { type: 'wz', spice: 2, q: 'Wat zou je doen met €10.000 die je aan iets compleet nutteloos moet uitgeven?', bot: ['Een gouden wc-bril', 'Duizend rubberen eendjes', 'Een ster naar mijn kat vernoemen'] },
  // stout
  { type: 'wz', spice: 3, q: 'Wat is de slechtste openingszin die je ooit hebt gehoord (of gebruikt)?', bot: ['Heb je een plattegrond? Ik ben verdwaald in je ogen', 'Kom je hier vaker?', 'Mijn moeder vindt je vast leuk'] },
  { type: 'wz', spice: 3, q: 'Wat is het gekste dat je ooit deed om indruk te maken op een date?', bot: ['Doen alsof ik sushi lekker vind', 'Een gedicht voorlezen', 'Een spinazie-smoothie drinken'] },
  { type: 'wz', spice: 3, q: 'Wat was je meest gênante date?', bot: ['Mijn date nam haar moeder mee', 'Ik viel in slaap in de bioscoop', 'We kwamen mijn ex tegen'] },
  { type: 'wz', spice: 3, q: 'Waar heb je ooit gezoend waar het eigenlijk niet kon?', bot: ['In een kerk', 'Op het werk, in het archief', 'In de rij bij de Efteling'] },
  { type: 'wz', spice: 3, q: 'Wat zou je nooit aan je ouders vertellen?', bot: ['Waar ik écht was op schoolreis', 'Hoeveel ik uitgeef aan afhaal', 'Wie die vlek in de bank heeft gemaakt'] },
  { type: 'wz', spice: 3, q: 'Wat is de vreemdste plek waar je ooit wakker werd?', bot: ['In een badkuip', 'Op een camping die niet de mijne was', 'In de trein naar Groningen'] },
  { type: 'wz', spice: 3, q: 'Welke datingapp-bio zou het meest eerlijk over jou zijn?', bot: ['Kan niet koken, wel bestellen', 'Snurk, maar alleen soms', 'Op zoek naar iemand die mijn planten water geeft'] },
]);
