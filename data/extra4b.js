/* Extra vragen voor bestaande categorieën: Grappig & raar, Donker en Stout */

GN.addQuestions('weetjes', [
  { type: 'mc', q: 'Welke kleur hebben de haren van een ijsbeer eigenlijk?', a: ['Ze zijn kleurloos en doorzichtig', 'Wit', 'Lichtgeel', 'Lichtgrijs'] },
  { type: 'mc', q: 'Wat lukt bijna niemand als je je neus dichtknijpt?', a: ['Neuriën', 'Fluiten', 'Praten', 'Slikken'] },
  { type: 'num', q: 'Hoeveel dagen bleef scholier Randy Gardner in 1964 wakker voor een wetenschappelijk experiment?', answer: 11, unit: 'dagen' },
  { type: 'bluff', q: 'Het puntje op de i heet officieel een ___.', answer: 'tittel', decoys: ['stipje', 'iota', 'punctum'] },
  { type: 'tf', q: 'Bananen zijn botanisch gezien bessen.', a: true },
  { type: 'tf', q: 'Aardbeien zijn botanisch gezien bessen.', a: false, fact: 'De zaadjes zitten aan de buitenkant: het is een schijnvrucht.' },
]);

GN.addQuestions('echtgebeurd', [
  { type: 'mc', q: 'Wat bleek de deurstopper te zijn die een man in Michigan jarenlang gebruikte?', a: ['Een meteoriet van zo\'n 100.000 dollar', 'Een stuk goud', 'Een dinosaurusei', 'Een Romeins gewicht'] },
  { type: 'mc', q: 'Van welk land kochten de Verenigde Staten in 1867 Alaska?', a: ['Rusland', 'Canada', 'Engeland', 'Spanje'] },
  { type: 'mc', q: 'Welke rekenfout zorgde ervoor dat een Canadees passagiersvliegtuig in 1983 zonder brandstof kwam te zitten?', a: ['Er werd met ponden gerekend in plaats van kilo\'s', 'Er werd water getankt', 'De meter stond op Fahrenheit', 'Er was diesel getankt'] },
  { type: 'mc', q: 'Waar bestaat een eiland in een meer op een eiland in een meer op een eiland?', a: ['In het noorden van Canada', 'In Finland', 'In Nieuw-Zeeland', 'In Schotland'] },
  { type: 'num', q: 'Voor hoeveel miljoen dollar kochten de Verenigde Staten Alaska?', answer: 7.2, unit: 'miljoen dollar' },
  { type: 'bluff', q: 'In 2004 werd een tosti met de afbeelding van de Maagd Maria erop verkocht voor ___ dollar.', answer: '28000', accept: ['28.000', '28 000'], decoys: ['500', '2.000', '250.000'] },
  { type: 'tf', q: 'Het Canadese vliegtuig dat in 1983 zonder brandstof kwam te zitten, landde veilig in zweefvlucht.', a: true, fact: 'Het toestel kreeg de bijnaam de Gimli Glider.' },
  { type: 'tf', q: 'Alaska is groter dan Texas.', a: true, fact: 'Ruim twee keer zo groot.' },
]);

GN.addQuestions('flop', [
  { type: 'mc', q: 'Welk automodel van Ford werd eind jaren 50 een beroemde flop?', a: ['De Edsel', 'De Mustang', 'De Model T', 'De Thunderbird'] },
  { type: 'mc', q: 'Welk sociaal netwerk van Google stopte in 2019?', a: ['Google+', 'Google Wave', 'Google Buzz', 'Orkut'] },
  { type: 'mc', q: 'Wat was de Segway?', a: ['Een tweewielige zelfbalancerende step', 'Een vliegende auto', 'Een elektrische rolschaats', 'Een zonnecel-fiets'] },
  { type: 'num', q: 'In welk jaar stopte Google+ voor gewone gebruikers?', answer: 2019 },
  { type: 'bluff', q: 'De Ford Edsel was vernoemd naar de ___ van Henry Ford.', answer: 'zoon', decoys: ['hond', 'vader', 'vrouw'] },
  { type: 'tf', q: 'De Segway werd aangekondigd als uitvinding die steden zou veranderen.', a: true },
  { type: 'tf', q: 'Google Glass is nooit te koop geweest.', a: false, fact: 'Er was een dure "Explorer Edition" en later een versie voor bedrijven.' },
]);

GN.addQuestions('uitvindingen', [
  { type: 'mc', q: 'Wat ontbrak er aan de allereerste fietsen (de loopfiets van Drais)?', a: ['Pedalen', 'Een stuur', 'Wielen van hout', 'Een zadel'] },
  { type: 'bluff', q: 'Edisons pratende pop lag maar zo\'n ___ weken in de winkel voordat hij werd teruggetrokken.', answer: 'zes', accept: ['6'], decoys: ['twee', 'tien', 'twaalf'] },
  { type: 'tf', q: 'De Sinclair C5 had een topsnelheid van ongeveer 24 kilometer per uur.', a: true },
  { type: 'tf', q: 'De loopfiets werd uitgevonden in de 20e eeuw.', a: false, fact: 'In 1817, door Karl Drais.' },
]);

GN.addQuestions('internet', [
  { type: 'mc', q: 'Wat is een "influencer"?', a: ['Iemand die met online bereik anderen beïnvloedt', 'Een computervirus', 'Een soort griep van internet', 'Een moderator op een forum'] },
  { type: 'num', q: 'In welk jaar werd YouTube opgericht?', answer: 2005 },
  { type: 'bluff', q: 'Het @-teken heet in het Nederlands vaak een ___.', answer: 'apenstaartje', decoys: ['slakje', 'krulletje', 'spinnetje'] },
  { type: 'tf', q: 'Het woord "spam" voor ongewenste mail komt van een sketch van Monty Python.', a: true },
  { type: 'tf', q: 'De eerste tweet ooit werd verstuurd door Elon Musk.', a: false, fact: 'Door medeoprichter Jack Dorsey, in 2006.' },
]);

GN.addQuestions('records', [
  { type: 'mc', q: 'Welke berg is van voet tot top het hoogst, als je onder water meetelt?', a: ['Mauna Kea', 'Mount Everest', 'K2', 'Kilimanjaro'] },
  { type: 'mc', q: 'Welk gewerveld dier kan waarschijnlijk het oudst worden, wel vierhonderd jaar?', a: ['De Groenlandse haai', 'De reuzenschildpad', 'De walvishaai', 'De koi-karper'] },
  { type: 'bluff', q: 'De Groenlandse haai zwemt gemiddeld nog geen ___ kilometer per uur.', answer: '3', accept: ['drie', '2', 'twee'], decoys: ['15', '30', '60'] },
  { type: 'tf', q: 'Brazilië werd vijf keer wereldkampioen voetbal.', a: true },
]);

GN.addQuestions('morbide', [
  { type: 'mc', q: 'Wat deed een "zondeneter" bij oude Britse begrafenissen?', a: ['Eten bij de dode om diens zonden over te nemen', 'De resten van het feestmaal opeten', 'De kist dragen', 'Bidden voor geld'] },
  { type: 'mc', q: 'Wat was een veiligheidskist in de 19e eeuw?', a: ['Een doodskist met een belletje voor als je levend begraven was', 'Een kist met een slot tegen grafrovers', 'Een kist van ijzer', 'Een kluis voor het testament'] },
  { type: 'mc', q: 'Wat is lijkenvet (adipocere)?', a: ['Een wasachtige stof die ontstaat in vochtige graven', 'Balsem van mummies', 'Kaarsvet uit oude kerken', 'Een soort zeep van de begrafenisondernemer'] },
  { type: 'bluff', q: 'In de 16e en 17e eeuw werden Egyptische mummies in Europa vermalen en verkocht als ___.', answer: 'medicijn', accept: ['geneesmiddel'], decoys: ['kruiderij', 'meststof', 'tandpasta'] },
  { type: 'tf', q: 'Er bestond echt een bruine verf die gemaakt werd van vermalen mummies.', a: true, fact: 'Het heette "mummiebruin".' },
  { type: 'tf', q: 'Haar blijft na je dood nog wekenlang doorgroeien.', a: false },
]);

GN.addQuestions('middeleeuwen', [
  { type: 'mc', q: 'Wat deden middeleeuwse artsen vaak bij allerlei ziektes?', a: ['Aderlaten', 'Antibiotica geven', 'Röntgenfoto\'s maken', 'Vaccineren'] },
  { type: 'mc', q: 'Wat was een godsoordeel (ordalie)?', a: ['Een pijnlijke proef om te bepalen of iemand schuldig was', 'Een uitspraak van de paus', 'Een feestdag', 'Een belasting voor de kerk'] },
  { type: 'mc', q: 'Waar staat de pestdokter met snavelmasker om bekend?', a: ['Een masker vol kruiden tegen de "kwade lucht"', 'Een masker om de duivel af te schrikken', 'Een masker tegen de kou', 'Een vogelkostuum voor carnaval'] },
  { type: 'bluff', q: 'Het woord "quarantaine" komt van het Italiaanse woord voor ___ dagen.', answer: 'veertig', accept: ['40'], decoys: ['tien', 'dertig', 'honderd'] },
  { type: 'tf', q: 'De pestdokters met snavelmaskers dateren vooral uit de 17e eeuw.', a: true },
]);

GN.addQuestions('rampen', [
  { type: 'mc', q: 'Wat gebeurde er in de nieuwjaarsnacht van 2001 in Volendam?', a: ['Een brand in een café', 'Een dijkdoorbraak', 'Een vuurwerkopslag ontplofte', 'Een boot zonk in de haven'] },
  { type: 'mc', q: 'Wat ontplofte er in 2000 in Enschede?', a: ['Een vuurwerkopslag', 'Een gasfabriek', 'Een kerncentrale', 'Een munitiedepot'] },
  { type: 'bluff', q: 'Eyjafjallajökull betekent ongeveer "___-gletsjer".', answer: 'eilandberg', accept: ['eilandenberg', 'eilanden-berg', 'eiland-berg'], decoys: ['vuurberg', 'zwarte', 'rokende'] },
  { type: 'tf', q: 'Het vliegtuig van de Bijlmerramp was van de Israëlische maatschappij El Al.', a: true },
  { type: 'tf', q: 'Na de Watersnoodramp van 1953 werden de Deltawerken gebouwd.', a: true },
]);

GN.addQuestions('truecrime', [
  { type: 'mc', q: 'Wat gebeurde er bij de "Great Train Robbery" in Engeland in 1963?', a: ['Een postrein werd beroofd van miljoenen', 'Een trein werd gekaapt en naar Schotland gereden', 'Er werd een hele locomotief gestolen', 'Een trein vol goud verdween'] },
  { type: 'bluff', q: 'Ronnie Biggs van de Great Train Robbery ontsnapte uit de gevangenis en leefde jarenlang in ___.', answer: 'Brazilië', decoys: ['Spanje', 'Mexico', 'Marokko'] },
  { type: 'tf', q: 'De kunstroof uit het Gardner Museum (1990) is nog altijd niet opgelost.', a: true, fact: 'De lege lijsten hangen er nog steeds.' },
  { type: 'tf', q: 'Al Capone werd veroordeeld voor moord.', a: false },
]);

GN.addQuestions('laatstewoorden', [
  { type: 'mc', q: 'Welke schrijver zou op zijn sterfbed over het lelijke behang hebben geklaagd?', a: ['Oscar Wilde', 'Charles Dickens', 'Mark Twain', 'Edgar Allan Poe'] },
  { type: 'num', q: 'In welk jaar overleed Steve Jobs?', answer: 2011 },
  { type: 'tf', q: 'De laatste woorden van beroemdheden zijn altijd betrouwbaar opgeschreven.', a: false, fact: 'Veel bekende "laatste woorden" zijn later verzonnen of mooier gemaakt.' },
]);

GN.addQuestions('hoaxes', [
  { type: 'mc', q: 'Wat was de "Cardiff-reus" uit 1869?', a: ['Een nep-versteende reus, uitgehakt uit steen', 'Een enorme vis uit de rivier', 'Een reusachtige pompoen', 'Een robot op een kermis'] },
  { type: 'mc', q: 'Wat was de "Mechanische Turk" uit de 18e eeuw?', a: ['Een schaakautomaat waarin stiekem een mens zat', 'Een stoommachine die kon praten', 'Een klok die de toekomst voorspelde', 'Een robot die thee schonk'] },
  { type: 'mc', q: 'Wat beweert de "holle aarde"-theorie?', a: ['Dat er binnenin de aarde een bewoonbare wereld is', 'Dat de aarde van kaas is', 'Dat de aarde een ei is', 'Dat er geen kern in de aarde zit'] },
  { type: 'mc', q: 'Wat beweren "flat earthers"?', a: ['Dat de aarde plat is', 'Dat de aarde stilstaat', 'Dat de maan van ijs is', 'Dat de zon om de aarde draait'] },
  { type: 'num', q: 'In welk jaar werd de Mechanische Turk gebouwd?', answer: 1770 },
  { type: 'bluff', q: 'De Cardiff-reus was uitgehakt uit een blok ___.', answer: 'gips', accept: ['gipssteen', 'albast'], decoys: ['was', 'klei', 'hout'] },
  { type: 'tf', q: 'Napoleon heeft volgens de verhalen tegen de Mechanische Turk geschaakt (en verloren).', a: true },
  { type: 'tf', q: 'De Cardiff-reus was een echt versteend mens.', a: false },
]);

GN.addQuestions('spook', [
  { type: 'mc', q: 'Welk monster zou volgens de legende in de Himalaya wonen?', a: ['De yeti', 'De wendigo', 'De chupacabra', 'De kraken'] },
  { type: 'mc', q: 'Hoe heet de grote mensaap die in Noord-Amerikaanse bossen zou leven?', a: ['Bigfoot', 'King Kong', 'De yeti', 'Mothman'] },
  { type: 'mc', q: 'Waarmee kun je volgens de verhalen een weerwolf doden?', a: ['Een zilveren kogel', 'Een houten paal', 'Wijwater', 'Knoflook'] },
  { type: 'mc', q: 'Wat zou volgens de verhalen vampiers op afstand houden?', a: ['Knoflook', 'Uien', 'Zout', 'Peterselie'] },
  { type: 'num', q: 'Hoeveel levens heeft een kat volgens het Nederlandse gezegde?', answer: 9 },
  { type: 'bluff', q: 'Graaf Dracula zou deels gebaseerd zijn op Vlad de ___.', answer: 'Spietser', accept: ['spiesser', 'tepes', 'țepeș'], decoys: ['Verschrikkelijke', 'Bloeddorstige', 'Grote'] },
  { type: 'tf', q: 'Bram Stoker, de schrijver van Dracula, is zelf nooit in Transsylvanië geweest.', a: true },
  { type: 'tf', q: 'Bigfoot wordt ook wel Sasquatch genoemd.', a: true },
]);

GN.addQuestions('schandalen', [
  { type: 'mc', q: 'Welk schandaal draaide om onterecht als fraudeurs bestempelde ouders in Nederland?', a: ['De toeslagenaffaire', 'De bouwfraude', 'De parlementaire enquête Fyra', 'De Bijlmerenquête'] },
  { type: 'bluff', q: 'De sjoemelsoftware van Volkswagen heet in het Engels een "___ device".', answer: 'defeat', decoys: ['cheat', 'ghost', 'trick'] },
  { type: 'tf', q: 'Ahold is het moederbedrijf van Albert Heijn.', a: true },
  { type: 'tf', q: 'Enron was een technologiebedrijf uit Silicon Valley.', a: false, fact: 'Het was een energiebedrijf uit Houston.' },
]);

GN.addQuestions('lichaam', [
  { type: 'mc', q: 'Waarom krijg je kippenvel?', a: ['Het is een overblijfsel van het opzetten van een vacht', 'Je bloed wordt kouder', 'Je huid krimpt door vocht', 'Je zenuwen schrikken'] },
  { type: 'mc', q: 'Waar zitten de meeste zweetklieren?', a: ['Op je voetzolen en handpalmen', 'In je oksels', 'Op je rug', 'Op je hoofd'] },
  { type: 'mc', q: 'Waarom ruiken scheten?', a: ['Door zwavelhoudende gassen', 'Door zuurstof', 'Door stikstof', 'Door koolzuur'] },
  { type: 'bluff', q: 'De huig heet in het Latijn de ___.', answer: 'uvula', decoys: ['palatina', 'faucia', 'linguala'] },
  { type: 'tf', q: 'Je neus en oren lijken met de jaren groter te worden.', a: true, fact: 'Kraakbeen en huid zakken en veranderen mee.' },
]);

GN.addQuestions('liefde', [
  { type: 'mc', q: 'Wat is een "walk of shame"?', a: ['De terugweg naar huis \'s ochtends na een onverwachte nacht', 'Een mislukt huwelijksaanzoek', 'De weg naar je ex', 'Een wandeling na een ruzie'] },
  { type: 'mc', q: 'Welk dier geldt als liefdessymbool omdat het vaak levenslang bij één partner blijft?', a: ['De zwaan', 'Het konijn', 'De pauw', 'De leeuw'] },
  { type: 'mc', q: 'Naar wie is Valentijnsdag vernoemd?', a: ['Een christelijke martelaar uit Rome', 'Een Franse dichter', 'Een Engelse koningin', 'Een Griekse liefdesgod'] },
  { type: 'num', q: 'Hoeveel minuten duurt de daad zelf volgens een bekend internationaal onderzoek gemiddeld?', answer: 5.4, unit: 'minuten' },
  { type: 'bluff', q: 'Het woord "afrodisiacum" komt van de Griekse godin ___.', answer: 'Aphrodite', accept: ['afrodite'], decoys: ['Athena', 'Hera', 'Artemis'] },
  { type: 'tf', q: 'Valentijnsdag valt op 14 februari.', a: true },
  { type: 'tf', q: 'Zwanen kiezen nooit een nieuwe partner.', a: false, fact: 'Meestal blijven ze samen, maar "scheidingen" komen wel voor.' },
]);

GN.addQuestions('dating', [
]);
