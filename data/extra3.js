/* Aanvulling 2: extra vragen voor de nieuwste en kleinste categorieën */

GN.addQuestions('games', [
  { type: 'mc', q: 'Wie is de hoofdpersoon van de God of War-reeks?', a: ['Kratos', 'Ares', 'Atreus', 'Zeus'] },
  { type: 'mc', q: 'Hoe heet de witharige monsterjager uit The Witcher?', a: ['Geralt', 'Dandelion', 'Ciri', 'Vesemir'] },
  { type: 'mc', q: 'Hoe heet de verrader in Among Us?', a: ['De impostor', 'De traitor', 'De mol', 'De saboteur'] },
  { type: 'mc', q: 'Bij welke spelcomputer hoorde de Wiimote?', a: ['Nintendo Wii', 'Xbox 360', 'PlayStation 3', 'GameCube'] },
  { type: 'mc', q: 'In welk spel betaal je een lening af aan de wasbeer Tom Nook?', a: ['Animal Crossing', 'Stardew Valley', 'Harvest Moon', 'The Sims'] },
  { type: 'mc', q: 'In welk spel spring je uit de Battle Bus?', a: ['Fortnite', 'PUBG', 'Apex Legends', 'Call of Duty: Warzone'] },
  { type: 'mc', q: 'Hoe heet het koninkrijk in The Legend of Zelda?', a: ['Hyrule', 'Tamriel', 'Azeroth', 'Mushroom Kingdom'] },
  { type: 'mc', q: 'Welke kleur heeft het spookje Blinky in Pac-Man?', a: ['Rood', 'Roze', 'Blauw', 'Oranje'], d: 2 },
  { type: 'mc', q: 'Welk bedrijf maakte Fortnite?', a: ['Epic Games', 'Valve', 'Activision', 'Riot Games'] },
  { type: 'mc', q: 'Wat verzamelt Sonic tijdens het rennen?', a: ['Gouden ringen', 'Muntjes', 'Sterren', 'Bananen'] },
  { type: 'num', q: 'In welk jaar kwam de Nintendo Switch uit?', answer: 2017 },
  { type: 'num', q: 'Met hoeveel spelers begint een standaard potje Fortnite Battle Royale?', answer: 100, unit: 'spelers' },
  { type: 'tf', q: 'Kratos is de hoofdpersoon van God of War.', a: true },
  { type: 'tf', q: 'Fortnite is gemaakt door Nintendo.', a: false, fact: 'Door Epic Games.' },
]);

GN.addQuestions('muziek', [
  { type: 'mc', q: 'Welke band bracht het album Abbey Road uit?', a: ['The Beatles', 'The Rolling Stones', 'Pink Floyd', 'Queen'] },
  { type: 'mc', q: 'Welke zangeres heeft fans die zich "Swifties" noemen?', a: ['Taylor Swift', 'Ariana Grande', 'Billie Eilish', 'Dua Lipa'] },
  { type: 'mc', q: 'Welk instrument met meestal vier snaren speelt de lage tonen in een band?', a: ['De basgitaar', 'De viool', 'De ukelele', 'De banjo'] },
  { type: 'mc', q: 'Welke Nederlandse band had in 1982 een hit met "Twilight Zone"?', a: ['Golden Earring', 'Doe Maar', 'Normaal', 'Kayak'] },
  { type: 'mc', q: 'Welke Amerikaanse rocker heeft de bijnaam "The Boss"?', a: ['Bruce Springsteen', 'Bon Jovi', 'Bob Dylan', 'Tom Petty'] },
  { type: 'mc', q: 'Welke twee landen wonnen het Songfestival het vaakst (elk 7 keer)?', a: ['Ierland en Zweden', 'Engeland en Frankrijk', 'Nederland en Noorwegen', 'Italië en Israël'], d: 2 },
  { type: 'mc', q: 'Welke componist schreef de opera Die Zauberflöte?', a: ['Mozart', 'Beethoven', 'Verdi', 'Wagner'] },
  { type: 'mc', q: 'Uit hoeveel leden bestonden The Beatles?', a: ['4', '3', '5', '6'] },
  { type: 'mc', q: 'Wat is het best verkochte album aller tijden?', a: ['Thriller van Michael Jackson', 'Abbey Road van The Beatles', 'Back in Black van AC/DC', '1989 van Taylor Swift'] },
  { type: 'num', q: 'Hoe vaak won Nederland het Eurovisiesongfestival?', answer: 5, fact: '1957, 1959, 1969 (gedeeld), 1975 en 2019.' },
  { type: 'tf', q: 'Nederland won het Songfestival vijf keer.', a: true },
  { type: 'tf', q: 'Taylor Swift begon haar carrière in de countrymuziek.', a: true },
]);

GN.addQuestions('jaren', [
  { type: 'mc', q: 'Hoe heette RTL 4 toen het in 1989 begon?', a: ['RTL-Véronique', 'RTL Holland', 'Veronica 4', 'Radio Luxemburg TV'], d: 2 },
  { type: 'mc', q: 'Wat was Teletekst?', a: ['Pagina\'s met tekst op je tv', 'Sms\'jes via de vaste telefoon', 'Een telefoonboek op cd', 'Ondertiteling voor films'] },
  { type: 'mc', q: 'Welke Spice Girl had de bijnaam "Posh"?', a: ['Victoria', 'Geri', 'Emma', 'Melanie B'] },
  { type: 'mc', q: 'Wie presenteerde De Soundmixshow?', a: ['Henny Huisman', 'Linda de Mol', 'Paul de Leeuw', 'Ivo Niehe'] },
  { type: 'mc', q: 'Wat was Jiskefet?', a: ['Een absurdistisch comedyprogramma', 'Een kinderprogramma', 'Een spelshow', 'Een soap'] },
  { type: 'mc', q: 'Welke Disneyfilm met een leeuwenwelpje kwam uit in 1994?', a: ['The Lion King', 'Aladdin', 'Tarzan', 'Mulan'] },
  { type: 'mc', q: 'Welke serie over zes vrienden in New York begon in 1994?', a: ['Friends', 'Seinfeld', 'How I Met Your Mother', 'Sex and the City'] },
  { type: 'mc', q: 'Welk besturingssysteem kwam in 1995 uit met de bekende Start-knop?', a: ['Windows 95', 'Windows XP', 'Mac OS X', 'Windows 3.1'] },
  { type: 'num', q: 'In welk jaar begon RTL-Véronique (nu RTL 4)?', answer: 1989 },
  { type: 'num', q: 'Uit hoeveel leden bestonden de Spice Girls?', answer: 5 },
  { type: 'tf', q: 'Teletekst bestaat nog steeds.', a: true },
  { type: 'tf', q: 'De Spice Girls waren met z\'n zessen.', a: false, fact: 'Met z\'n vijven.' },
]);

GN.addQuestions('kindertv', [
  { type: 'mc', q: 'Hoe heet de beste vriend van Bert in Sesamstraat?', a: ['Ernie', 'Elmo', 'Grover', 'Tommie'] },
  { type: 'mc', q: 'Welke tekenfilmfiguur roept "Jabadabadoe!"?', a: ['Fred Flintstone', 'Scooby-Doo', 'Yogi Beer', 'Popeye'] },
  { type: 'mc', q: 'Hoe heet de hond van Kuifje in het Nederlands?', a: ['Bobbie', 'Bolke', 'Snoopy', 'Pluto'] },
  { type: 'mc', q: 'Welke beer woont in het Honderd Bunderbos?', a: ['Winnie de Poeh', 'Paddington', 'Baloe', 'Bruintje Beer'] },
  { type: 'mc', q: 'In welk land woont Heidi?', a: ['Zwitserland', 'Oostenrijk', 'Duitsland', 'Italië'] },
  { type: 'mc', q: 'Welke kleur heeft Barbapapa?', a: ['Roze', 'Zwart', 'Blauw', 'Geel'] },
  { type: 'mc', q: 'Wie woont er in een ananas onder de zee?', a: ['SpongeBob', 'Nemo', 'Ariël', 'Patrick'] },
  { type: 'mc', q: 'Wat is Paulus uit de verhalen van Jean Dulieu?', a: ['Een boskabouter', 'Een uil', 'Een reus', 'Een heks'] },
  { type: 'mc', q: 'Welke Teletubbie is groen?', a: ['Dipsy', 'Tinky Winky', 'Laa-Laa', 'Po'] },
  { type: 'num', q: 'Hoeveel kinderen hebben Barbapapa en Barbamama?', answer: 7 },
  { type: 'tf', q: 'De hond van Kuifje heet in het Nederlands Bobbie.', a: true },
  { type: 'tf', q: 'Heidi woont in de Oostenrijkse Alpen.', a: false, fact: 'In de Zwitserse Alpen.' },
]);

GN.addQuestions('reclames', [
  { type: 'mc', q: 'Welke kleur heeft het logo van Albert Heijn?', a: ['Blauw', 'Rood', 'Groen', 'Oranje'] },
  { type: 'mc', q: 'Waar staat KLM voor?', a: ['Koninklijke Luchtvaart Maatschappij', 'Koninklijke Lucht Machines', 'Kapitein Luchtvaart Middelen', 'Koninklijke Lijnvlucht Maatschappij'] },
  { type: 'mc', q: 'Welk biermerk heeft een rode ster in het logo?', a: ['Heineken', 'Grolsch', 'Amstel', 'Bavaria'] },
  { type: 'mc', q: 'Welk merk deelt bij de Nieuwjaarsduik de bekende oranje mutsen uit?', a: ['Unox', 'HEMA', 'Albert Heijn', 'Heineken'] },
  { type: 'mc', q: 'Welk bedrijf maakt Kinder Bueno?', a: ['Ferrero', 'Nestlé', 'Mars', 'Milka'] },
  { type: 'mc', q: 'Welke fastfoodketen heeft een grote gele M als logo?', a: ['McDonald\'s', 'Burger King', 'KFC', 'Subway'] },
  { type: 'mc', q: 'Voor welk product is Douwe Egberts bekend?', a: ['Koffie', 'Thee', 'Koekjes', 'Kaas'] },
  { type: 'num', q: 'In welk jaar werd KLM opgericht?', answer: 1919 },
  { type: 'tf', q: 'KLM is de oudste luchtvaartmaatschappij die nog onder haar oorspronkelijke naam vliegt.', a: true },
  { type: 'tf', q: 'Heineken heeft een blauwe ster in het logo.', a: false, fact: 'Een rode ster.' },
]);

GN.addQuestions('hoaxes', [
  { type: 'mc', q: 'Wat beweerde het gerucht "Paul is dead"?', a: ['Dat Paul McCartney in 1966 was overleden en vervangen door een dubbelganger', 'Dat Paul Gascoigne nooit had bestaan', 'Dat Paul de Leeuw een robot is', 'Dat Paus Paulus nog leeft'] },
  { type: 'mc', q: 'Wat is een "broodje aap"?', a: ['Een sterk verhaal dat als waar wordt doorverteld', 'Een snack uit de dierentuin', 'Een nepnieuwssite', 'Een grap op 1 april'] },
  { type: 'mc', q: 'Wat beweren complotdenkers over "reptielmensen"?', a: ['Dat wereldleiders vermomde hagedismensen zijn', 'Dat dinosaurussen nog leven', 'Dat krokodillen kunnen praten', 'Dat slangen de piramides bouwden'] },
  { type: 'mc', q: 'Wat is het Mandela-effect?', a: ['Veel mensen herinneren zich hetzelfde ding verkeerd', 'Een vredesbeweging', 'Een hoax over Afrika', 'Een psychologische test'] },
  { type: 'mc', q: 'Wat was de "Balloon Boy"-hoax uit 2009?', a: ['Ouders deden alsof hun zoon in een weggevlogen ballon zat', 'Een jongen vloog met ballonnen over de Alpen', 'Een ballon met een spook erin', 'Een jongen die een luchtballon stal'] },
  { type: 'mc', q: 'Welke oplichter "verkocht" twee keer de Eiffeltoren?', a: ['Victor Lustig', 'Charles Ponzi', 'Frank Abagnale', 'George Parker'] },
  { type: 'mc', q: 'Wat was de hoax "De Grote Ontdekking van de Maan" (1835) in een New Yorkse krant?', a: ['Dat er vleermuismensen op de maan leefden', 'Dat de maan van ijs was', 'Dat er een stad op de maan stond', 'Dat de maan hol was'], d: 3 },
  { type: 'num', q: 'Hoe vaak "verkocht" Victor Lustig de Eiffeltoren?', answer: 2 },
  { type: 'num', q: 'In welk jaar was de Balloon Boy-hoax?', answer: 2009 },
  { type: 'tf', q: 'Victor Lustig verkocht de Eiffeltoren als oud ijzer aan schroothandelaren.', a: true },
  { type: 'tf', q: 'Het Mandela-effect is vernoemd naar Nelson Mandela.', a: true, fact: 'Veel mensen "herinnerden" zich dat hij in de jaren 80 in de gevangenis was overleden.' },
]);

GN.addQuestions('spook', [
  { type: 'mc', q: 'Wat is een banshee in Ierse verhalen?', a: ['Een geest die krijst als er iemand gaat sterven', 'Een kabouter met een pot goud', 'Een zeemonster', 'Een weerwolf'] },
  { type: 'mc', q: 'Wie is Krampus?', a: ['Een gehoornde figuur die stoute kinderen straft', 'Een elfje van de kerstman', 'Een sneeuwmonster', 'Een spookschip'] },
  { type: 'mc', q: 'Hoeveel jaar ongeluk krijg je volgens het bijgeloof als je een spiegel breekt?', a: ['7', '3', '10', '13'] },
  { type: 'mc', q: 'Welk getal geldt in China en Japan als ongeluksgetal?', a: ['4', '13', '7', '9'] },
  { type: 'mc', q: 'Uit welk Keltisch feest is Halloween ontstaan?', a: ['Samhain', 'Beltane', 'Yule', 'Ostara'] },
  { type: 'mc', q: 'Wat is een wendigo in Noord-Amerikaanse verhalen?', a: ['Een wezen dat honger heeft naar mensenvlees', 'Een vriendelijke bosgeest', 'Een windgod', 'Een vliegende slang'], d: 2 },
  { type: 'mc', q: 'Welke kleur heeft een kat die volgens bijgeloof ongeluk brengt als hij je pad kruist?', a: ['Zwart', 'Wit', 'Rood', 'Grijs'] },
  { type: 'num', q: 'Op welke datum in oktober is Halloween?', answer: 31 },
  { type: 'tf', q: 'Halloween is ontstaan uit het Keltische feest Samhain.', a: true },
  { type: 'tf', q: 'In China en Japan is 13 het grote ongeluksgetal.', a: false, fact: 'Daar is het 4, omdat het klinkt als het woord voor "dood".' },
]);

GN.addQuestions('schandalen', [
  { type: 'mc', q: 'Welke Britse krant hield in 2011 op te bestaan na een afluisterschandaal?', a: ['News of the World', 'The Sun', 'Daily Mail', 'The Mirror'] },
  { type: 'mc', q: 'Welke FIFA-voorzitter moest in 2015 weg na een corruptieschandaal?', a: ['Sepp Blatter', 'Michel Platini', 'Gianni Infantino', 'Joseph Havelange'] },
  { type: 'mc', q: 'Waar gingen de Panama Papers (2016) over?', a: ['Geheime bedrijven in belastingparadijzen', 'Smokkel door het Panamakanaal', 'Een vervalst paspoort van een president', 'Doping in de sport'] },
  { type: 'mc', q: 'Welke klokkenluider lekte in 2013 geheime documenten van de NSA?', a: ['Edward Snowden', 'Julian Assange', 'Chelsea Manning', 'Mark Felt'] },
  { type: 'mc', q: 'Wat was de bijnaam van de geheime bron van het Watergate-schandaal?', a: ['Deep Throat', 'Big Brother', 'The Mole', 'Mr. X'] },
  { type: 'mc', q: 'Welk bedrijf ging in 2008 failliet, wat de kredietcrisis in een stroomversnelling bracht?', a: ['Lehman Brothers', 'Goldman Sachs', 'JPMorgan', 'ING'] },
  { type: 'num', q: 'In welk jaar lekte Edward Snowden de NSA-documenten?', answer: 2013 },
  { type: 'num', q: 'Hoeveel miljoen documenten zaten er ongeveer in de Panama Papers?', answer: 11.5, unit: 'miljoen' },
  { type: 'tf', q: 'News of the World stopte na een afluisterschandaal.', a: true },
  { type: 'tf', q: 'De geheime bron van Watergate werd nooit bekend.', a: false, fact: 'In 2005 maakte Mark Felt, oud-topman van de FBI, bekend dat hij Deep Throat was.' },
]);

GN.addQuestions('records', [
  { type: 'mc', q: 'Welk land won ooit de meeste olympische medailles?', a: ['De Verenigde Staten', 'Rusland', 'China', 'Duitsland'] },
  { type: 'mc', q: 'Welke single is volgens Guinness de best verkochte ooit?', a: ['White Christmas van Bing Crosby', 'Candle in the Wind van Elton John', 'Thriller van Michael Jackson', 'Shape of You van Ed Sheeran'] },
  { type: 'num', q: 'Hoeveel gouden medailles won Michael Phelps in Peking 2008?', answer: 8 },
  { type: 'tf', q: 'White Christmas is volgens Guinness de best verkochte single ooit.', a: true },
]);

GN.addQuestions('dating', [
  { type: 'mc', q: 'Waar staat LAT-relatie voor?', a: ['Living Apart Together', 'Love At Twenty', 'Long And Tender', 'Late Afternoon Tea'] },
  { type: 'mc', q: 'Wat is speeddaten?', a: ['In korte rondes van een paar minuten veel mensen ontmoeten', 'Daten tijdens het hardlopen', 'Binnen een week trouwen', 'Daten in de auto'] },
  { type: 'mc', q: 'In welk tv-programma trouwen kandidaten met iemand die ze nog nooit hebben ontmoet?', a: ['Married at First Sight', 'Boer zoekt Vrouw', 'Love Island', 'First Dates'] },
  { type: 'tf', q: 'In een LAT-relatie woon je samen in één huis.', a: false, fact: 'Juist niet: Living Apart Together.' },
]);
