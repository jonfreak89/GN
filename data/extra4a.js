/* Extra vragen voor bestaande categorieën: Kennis, Nerd en Nostalgie */

GN.addQuestions('nederland', [
  { type: 'mc', q: 'Wat is een doorzonwoning?', a: ['Een huis waarbij de woonkamer van voor naar achter loopt', 'Een huis met een glazen dak', 'Een vakantiehuis in de zon', 'Een huis zonder gordijnen'] },
  { type: 'mc', q: 'Welke stad heeft de bijnaam "Sleutelstad"?', a: ['Leiden', 'Utrecht', 'Haarlem', 'Delft'] },
  { type: 'num', q: 'Hoeveel Nederlandse Waddeneilanden zijn bewoond?', answer: 5 },
  { type: 'bluff', q: 'Het woord "sinaasappel" betekent eigenlijk appel uit ___.', answer: 'China', decoys: ['Spanje', 'de Sinaï', 'Siam'] },
  { type: 'tf', q: 'Nederland heeft nog meer dan duizend molens.', a: true },
]);

GN.addQuestions('geschiedenis', [
  { type: 'mc', q: 'Hoe heette de hoofdstad van Nederlands-Indië?', a: ['Batavia', 'Soerabaja', 'Malakka', 'Paramaribo'] },
  { type: 'bluff', q: 'Volgens een bekende anekdote stelde Lodewijk Napoleon, koning van Holland, zich per ongeluk voor als "Ik ben uw ___".', answer: 'konijn', decoys: ['kanon', 'knecht', 'kaasboer'], fact: 'Hij bedoelde natuurlijk "koning".' },
  { type: 'tf', q: 'Julius Caesar was keizer van Rome.', a: false, fact: 'Hij was dictator. Augustus werd de eerste keizer.' },
]);

GN.addQuestions('aardrijkskunde', [
  { type: 'mc', q: 'Wat is de hoofdstad van Nieuw-Zeeland?', a: ['Wellington', 'Auckland', 'Christchurch', 'Queenstown'] },
  { type: 'mc', q: 'Welke rivier stroomt door Bagdad?', a: ['De Tigris', 'De Eufraat', 'De Nijl', 'De Jordaan'] },
  { type: 'mc', q: 'In welk land ligt de Kilimanjaro?', a: ['Tanzania', 'Kenia', 'Oeganda', 'Ethiopië'] },
  { type: 'num', q: 'Aan hoeveel landen grenst Duitsland?', answer: 9 },
  { type: 'bluff', q: 'Bangkok heet in het Thai eigenlijk Krung ___.', answer: 'Thep', decoys: ['Siam', 'Bangra', 'Mahan'] },
  { type: 'tf', q: 'Rusland grenst aan Noord-Korea.', a: true },
  { type: 'tf', q: 'Afrika is het grootste continent.', a: false, fact: 'Azië is groter.' },
]);

GN.addQuestions('wetenschap', [
  { type: 'mc', q: 'Welk element heeft het symbool Fe?', a: ['IJzer', 'Fluor', 'Fosfor', 'Francium'] },
  { type: 'mc', q: 'Wat maken planten overdag van koolstofdioxide, water en licht?', a: ['Suiker en zuurstof', 'Stikstof en zout', 'Alleen water', 'Koolmonoxide'] },
  { type: 'tf', q: 'Een bliksemflits is heter dan het oppervlak van de zon.', a: true, fact: 'Bliksem kan zo\'n 30.000 graden worden, de zon aan de buitenkant ongeveer 5.500.' },
  { type: 'tf', q: 'Oud glas in kerkramen is onderaan dikker omdat glas heel langzaam stroomt.', a: false, fact: 'Dat komt door hoe het glas vroeger werd gemaakt en geplaatst.' },
]);

GN.addQuestions('dieren', [
  { type: 'tf', q: 'Een slak heeft duizenden piepkleine tandjes.', a: true, fact: 'Ze zitten op een soort raspende tong.' },
  { type: 'tf', q: 'Pinguïns leven op de Noordpool.', a: false, fact: 'Ze leven op het zuidelijk halfrond.' },
]);

GN.addQuestions('eten', [
  { type: 'mc', q: 'Welke kaas hoort traditioneel in een Griekse salade?', a: ['Feta', 'Mozzarella', 'Halloumi', 'Ricotta'] },
  { type: 'mc', q: 'Wat is een kapsalon?', a: ['Patat met shoarma, gesmolten kaas en salade', 'Een broodje met haring', 'Een Turkse pizza', 'Een kaassoufflé met saus'] },
  { type: 'mc', q: 'Wat is umami?', a: ['De vijfde smaak: hartig', 'Een Japans dessert', 'Een soort zeewier', 'Een Thaise kruidenmix'] },
  { type: 'bluff', q: 'De kapsalon is vernoemd naar een ___ in Rotterdam.', answer: 'kapperszaak', accept: ['kapper', 'kapsalon'], decoys: ['kroeg', 'voetbalclub', 'havenkantine'], fact: 'Een kapper bestelde het steeds bij de shoarmazaak om de hoek.' },
]);

GN.addQuestions('film', [
  { type: 'mc', q: 'In welke film roept iemand "Here\'s Johnny!" door een kapotgeslagen deur?', a: ['The Shining', 'Psycho', 'Halloween', 'Scream'] },
  { type: 'mc', q: 'Welke Nederlandse regisseur maakte RoboCop en Basic Instinct?', a: ['Paul Verhoeven', 'Jan de Bont', 'Dick Maas', 'Anton Corbijn'] },
  { type: 'mc', q: 'Welke Nederlandse film won in 1998 de Oscar voor beste buitenlandse film?', a: ['Karakter', 'Antonia', 'De Aanslag', 'Turks Fruit'] },
  { type: 'bluff', q: 'De filmploeg van Jaws noemde de mechanische haai "___".', answer: 'Bruce', decoys: ['Steve', 'Big Bob', 'Chompy'], fact: 'Vernoemd naar de advocaat van Spielberg.' },
  { type: 'tf', q: 'Sean Connery was de eerste James Bond in een bioscoopfilm.', a: true, fact: 'In Dr. No uit 1962.' },
]);

GN.addQuestions('games', [
  { type: 'mc', q: 'In welk spel bouw je met blokken en kun je \'s nachts creepers tegenkomen?', a: ['Minecraft', 'Roblox', 'Terraria', 'Fortnite'] },
  { type: 'mc', q: 'In welk spel is een "Victory Royale" het doel?', a: ['Fortnite', 'PUBG', 'Apex Legends', 'Call of Duty'] },
  { type: 'mc', q: 'Wat was het beroep van Mario in Donkey Kong (1981)?', a: ['Timmerman', 'Loodgieter', 'Kok', 'Brandweerman'] },
  { type: 'num', q: 'Hoeveel vakjes breed is een standaard Tetris-speelveld?', answer: 10 },
]);

GN.addQuestions('muziek', [
  { type: 'mc', q: 'Welke zanger heette eigenlijk Reginald Dwight?', a: ['Elton John', 'Freddie Mercury', 'Rod Stewart', 'David Bowie'] },
  { type: 'mc', q: 'Wie zong "Purple Rain"?', a: ['Prince', 'Michael Jackson', 'Lenny Kravitz', 'Stevie Wonder'] },
  { type: 'num', q: 'In welk jaar won Nederland het songfestival met "Ding-a-dong"?', answer: 1975 },
  { type: 'tf', q: 'Elvis Presley schreef al zijn hits zelf.', a: false, fact: 'Hij schreef bijna niets zelf.' },
  { type: 'tf', q: '"Ding-a-dong" werd gezongen door Teach-In.', a: true },
]);

GN.addQuestions('fantasy', [
  { type: 'mc', q: 'Hoe heet de elfenvallei waar Elrond woont?', a: ['Rivendel', 'Lothlórien', 'Mirkwood', 'Edoras'] },
  { type: 'mc', q: 'Hoe heet de driekoppige hond van Hagrid in de Nederlandse vertaling?', a: ['Pluisje', 'Knor', 'Muil', 'Woef'] },
  { type: 'mc', q: 'Hoe heet het zwaard van Aragorn nadat het opnieuw is gesmeed?', a: ['Andúril', 'Narsil', 'Glamdring', 'Prik'] },
  { type: 'mc', q: 'Hoe heet een Horcrux in de Nederlandse vertaling?', a: ['Gruzielement', 'Zielensplinter', 'Duistersteen', 'Levensstuk'] },
  { type: 'num', q: 'Uit hoeveel leden bestond het Reisgenootschap van de Ring?', answer: 9 },
  { type: 'bluff', q: 'Huiself Dobby werd vrij doordat hij een ___ kreeg.', answer: 'sok', accept: ['sokje', 'sokken'], decoys: ['handschoen', 'das', 'muts'] },
  { type: 'tf', q: 'In het Nederlands heet Dumbledore Perkamentus.', a: true },
  { type: 'tf', q: 'Gimli is een elf.', a: false, fact: 'Gimli is een dwerg, Legolas is de elf.' },
]);

GN.addQuestions('scifi', [
  { type: 'mc', q: 'Hoe heet de Wookiee-copiloot van Han Solo?', a: ['Chewbacca', 'Lando', 'Greedo', 'Wicket'] },
  { type: 'mc', q: 'Welke acteur speelt Neo in The Matrix?', a: ['Keanu Reeves', 'Tom Cruise', 'Will Smith', 'Brad Pitt'] },
  { type: 'mc', q: 'Welke pil kiest Neo?', a: ['De rode', 'De blauwe', 'De groene', 'Allebei'] },
  { type: 'mc', q: 'Wat zijn de Borg in Star Trek?', a: ['Cyborgs die andere wezens assimileren', 'Vriendelijke handelaren', 'Een ras van telepaten', 'Ruimtepiraten met hoorns'] },
  { type: 'num', q: 'Hoe oud is Luke Skywalker in de eerste Star Wars-film (1977)?', answer: 19, unit: 'jaar' },
  { type: 'tf', q: 'De bekende slogan van Alien is "In space no one can hear you scream".', a: true },
]);

GN.addQuestions('superhelden', [
  { type: 'mc', q: 'Wat is de echte naam van Wonder Woman?', a: ['Diana Prince', 'Barbara Gordon', 'Selina Kyle', 'Lois Lane'] },
  { type: 'mc', q: 'Hoe heet de oom van Peter Parker die zegt dat grote kracht grote verantwoordelijkheid brengt?', a: ['Ben', 'Harry', 'Frank', 'Jonah'] },
  { type: 'mc', q: 'Welke held kan krimpen tot het formaat van een mier?', a: ['Ant-Man', 'The Wasp', 'Hawkeye', 'Falcon'] },
  { type: 'mc', q: 'Wat is de echte naam van Captain America?', a: ['Steve Rogers', 'Bucky Barnes', 'Sam Wilson', 'Nick Fury'] },
  { type: 'num', q: 'Uit hoeveel films bestaat de "Infinity Saga" van Marvel?', answer: 23 },
  { type: 'bluff', q: 'De Kryptoonse naam van Superman is Kal-___.', answer: 'El', decoys: ['Zor', 'Tor', 'Rem'] },
  { type: 'tf', q: 'Batman en Superman zijn allebei helden van DC.', a: true },
]);

GN.addQuestions('jaren', [
  { type: 'mc', q: 'Wat was een walkman?', a: ['Een draagbare cassettespeler', 'Een stappenteller', 'Een walkietalkie', 'Een loopband'] },
  { type: 'mc', q: 'Welke Spaanse meidengroep had in 2002 een hit met "Aserejé"?', a: ['Las Ketchup', 'Las Chicas', 'Ketchup Girls', 'Bellini'] },
  { type: 'num', q: 'In welk jaar kwam de eerste iPhone uit?', answer: 2007 },
  { type: 'bluff', q: 'De beltoonhit "Crazy Frog" heette eerst "The Annoying ___".', answer: 'Thing', decoys: ['Frog', 'Noise', 'Bug'] },
  { type: 'tf', q: 'Friends liep tien seizoenen.', a: true },
  { type: 'tf', q: 'Gele siliconen polsbandjes waren rond 2004 een rage om een goed doel te steunen.', a: true },
]);

GN.addQuestions('kindertv', [
  { type: 'mc', q: 'In welke serie zeggen de figuren "Eh-oh!"?', a: ['Teletubbies', 'Tweenies', 'Boohbah', 'Barney'] },
  { type: 'mc', q: 'Hoe heet de Smurf met de bril?', a: ['Brilsmurf', 'Knutselsmurf', 'Lolsmurf', 'Grote Smurf'] },
  { type: 'mc', q: 'Welke hond lost met vier vrienden mysteries op in een busje?', a: ['Scooby-Doo', 'Snoopy', 'Pluto', 'Lassie'] },
  { type: 'bluff', q: 'De kat van Gargamel in De Smurfen heet ___.', answer: 'Azraël', accept: ['azrael'], decoys: ['Lucifer', 'Mauw', 'Brutus'] },
  { type: 'tf', q: 'Scooby-Doo is een Duitse dog.', a: true },
  { type: 'tf', q: 'De Smurfen zijn bedacht door een Nederlander.', a: false, fact: 'Door de Belg Peyo.' },
]);

GN.addQuestions('reclames', [
  { type: 'mc', q: 'Bij welk merk hoort "I\'m lovin\' it"?', a: ['McDonald\'s', 'Burger King', 'KFC', 'Subway'] },
  { type: 'mc', q: 'Bij welk merk hoort "The best a man can get"?', a: ['Gillette', 'Philips', 'Axe', 'Old Spice'] },
  { type: 'mc', q: 'Bij welk merk hoort "Because you\'re worth it"?', a: ['L\'Oréal', 'Nivea', 'Dove', 'Garnier'] },
  { type: 'mc', q: 'Welk merk gebruikte de slogan "Think different"?', a: ['Apple', 'IBM', 'Microsoft', 'Sony'] },
  { type: 'num', q: 'Hoeveel strepen zitten er in het logo van Adidas?', answer: 3 },
  { type: 'bluff', q: 'M&M\'s is vernoemd naar de achternamen Mars en ___.', answer: 'Murrie', decoys: ['Miller', 'Morgan', 'Martin'] },
  { type: 'tf', q: 'De slogan "Red Bull geeft je vleugels" leidde in de VS tot een rechtszaak.', a: true, fact: 'Red Bull schikte in 2014 voor miljoenen dollars.' },
  { type: 'tf', q: 'McDonald\'s begon als hamburgerkraam in Chicago.', a: false, fact: 'In San Bernardino, Californië.' },
]);
